-- Alertes de prix de l'application FlyBSL (notifications sur le téléphone, sans compte ni e-mail).
-- À coller une fois dans Supabase > SQL Editor > New query, puis « Run ».
--
-- Une ligne = une alerte d'un appareil : « toutes destinations » (code nul) ou une destination, sous un prix maximum,
-- avec en option une durée et un mois. L'appareil n'est identifié que par son adresse de notification (endpoint),
-- aucune donnée personnelle. Le site n'a JAMAIS accès direct à la table : il passe par les trois fonctions
-- ci-dessous, qui ne montrent ou ne suppriment que les alertes de l'appareil qui les appelle.
-- L'envoi des notifications (scripts/envoi-alertes.mjs) lit la table avec la clé de service, sur l'ordinateur.

create table if not exists public.alertes_prix (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null check (endpoint ~ '^https://' and length(endpoint) <= 1000),
  p256dh text not null check (length(p256dh) <= 200),
  auth text not null check (length(auth) <= 100),
  lang text not null default 'fr' check (lang in ('fr', 'de', 'en')),
  code text check (code ~ '^[A-Z]{3}$'),
  prix_max integer not null check (prix_max between 10 and 5000),
  duree text check (duree in ('2-4', '5-8', '10-15')),
  mois text check (mois ~ '^[0-9]{4}-[0-9]{2}$'),
  cree_le timestamptz not null default now()
);
create index if not exists alertes_prix_endpoint on public.alertes_prix (endpoint);

alter table public.alertes_prix enable row level security;
-- Aucune règle RLS : la clé publique du site ne peut ni lire ni écrire la table directement.

create or replace function public.alerte_ajouter(
  p_endpoint text, p_p256dh text, p_auth text, p_lang text,
  p_code text, p_prix_max integer, p_duree text, p_mois text
) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  nb integer;
  nouvel uuid;
begin
  select count(*) into nb from alertes_prix where endpoint = p_endpoint;
  if nb >= 20 then
    raise exception 'Trop d''alertes sur cet appareil (20 au maximum).';
  end if;
  insert into alertes_prix (endpoint, p256dh, auth, lang, code, prix_max, duree, mois)
  values (p_endpoint, p_p256dh, p_auth, p_lang, nullif(p_code, ''), p_prix_max, nullif(p_duree, ''), nullif(p_mois, ''))
  returning id into nouvel;
  -- Les clés de chiffrement d'un appareil peuvent changer : on garde les plus récentes pour toutes ses alertes.
  update alertes_prix set p256dh = p_p256dh, auth = p_auth where endpoint = p_endpoint;
  return nouvel;
end $$;

create or replace function public.alertes_lister(p_endpoint text)
returns table (id uuid, code text, prix_max integer, duree text, mois text)
language sql security definer set search_path = public as $$
  select id, code, prix_max, duree, mois from alertes_prix where endpoint = p_endpoint order by cree_le;
$$;

create or replace function public.alerte_supprimer(p_endpoint text, p_id uuid)
returns void
language sql security definer set search_path = public as $$
  delete from alertes_prix where endpoint = p_endpoint and id = p_id;
$$;

revoke all on function public.alerte_ajouter(text, text, text, text, text, integer, text, text) from public;
revoke all on function public.alertes_lister(text) from public;
revoke all on function public.alerte_supprimer(text, uuid) from public;
grant execute on function public.alerte_ajouter(text, text, text, text, text, integer, text, text) to anon;
grant execute on function public.alertes_lister(text) to anon;
grant execute on function public.alerte_supprimer(text, uuid) to anon;
