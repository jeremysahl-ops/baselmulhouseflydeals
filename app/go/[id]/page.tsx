import { getDealById } from '@/lib/supabase';
import { buildAffiliateLink } from '@/lib/affiliate';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GoPage({ params }: Props) {
  const { id } = await params;
  const deal = await getDealById(id);

  if (!deal) notFound();

  const affiliateLink = buildAffiliateLink(
    deal.link ?? deal.deal_url,
    deal.destination,
    deal.departure_date
  );

  const dateConstat = deal.created_at
    ? new Date(deal.created_at).toLocaleDateString('fr-FR')
    : '';

  return (
    <div style={{ margin: 0, fontFamily: 'sans-serif', background: '#f5f0ff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <meta httpEquiv="refresh" content={`4;url=${affiliateLink}`} />
      <div style={{ background: 'white', borderRadius: '24px', padding: '3rem', maxWidth: '500px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✈️</div>
        <h1 style={{ color: '#2C3E50', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Vous partez vers {deal.destination} !
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>
          Nous vous redirigeons vers <strong>Kiwi.com</strong>, notre partenaire de confiance pour trouver les meilleurs vols.
        </p>
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534' }}>
            <strong>🔍 Pourquoi Kiwi.com ?</strong><br />
            Kiwi.com est un moteur de recherche de vols mondial qui compare des centaines de compagnies aériennes dont EasyJet, Ryanair et Transavia. Il trouve souvent des combinaisons invisibles ailleurs pour vous proposer le meilleur prix.
          </p>
        </div>
        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', fontSize: '0.8rem', color: '#9a3412' }}>
          ⚠️ Prix constaté le {dateConstat} — les tarifs sont dynamiques et peuvent avoir évolué.
        </div>
        <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Redirection automatique dans <strong>4 secondes</strong>...
        </p>
        
          href={affiliateLink}
          style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C9A0DC 0%, #5DADE2 100%)', color: 'white', padding: '1rem 2rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}
        >
          {'🚀'} Y aller maintenant
        </a>
      </div>
    </div>
  );
}