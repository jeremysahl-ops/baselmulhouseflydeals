-- ============================================================================
-- fix-benchmark — restauration des benchmarks + désactivation des faux deals
-- Généré le 2026-11-12 à partir d'une lecture (GET) de Supabase. NON EXÉCUTÉ.
-- À relire puis coller dans Supabase > SQL Editor. Idempotent : chaque UPDATE
-- vérifie la valeur actuelle, une 2e exécution ne change rien.
-- ============================================================================

BEGIN;

-- 1) Annule le « avg_price * 1.2 » appliqué à 132 lignes (36 destinations).
--    Preuve : après /1.2, 130/132 valeurs retombent sur un multiple de 10, comme les 244 lignes non touchées.
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'd310fadc-9533-4511-b440-54eb0f59350f' AND avg_price = 120; -- Agadir / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'ed4ac4c9-805e-4e48-a4d2-884d6a4fac44' AND avg_price = 180; -- Agadir / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '0b915e2e-04fc-4ba4-b723-5ba1589be6fd' AND avg_price = 120; -- Agadir / hiver
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'e35b50a9-28ae-43cf-8772-21835cdb5748' AND avg_price = 180; -- Agadir / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '2bd6a737-305c-4194-896e-f209b753bb74' AND avg_price = 120; -- Alicante / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'c596c6b5-c6ed-4714-882b-43b62419be9d' AND avg_price = 180; -- Alicante / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '0c05f6af-ab65-4954-b663-73df1872a00a' AND avg_price = 120; -- Alicante / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '08ebcba7-ebbe-4748-b681-1303e605acdc' AND avg_price = 120; -- Alicante / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '0c2c6c42-d897-462d-81fa-3a6bcfa57659' AND avg_price = 96; -- Amsterdam / automne
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'ebc313be-8712-4815-acbe-4f771f176e9d' AND avg_price = 120; -- Amsterdam / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '45684412-cbc7-4432-8fde-4e66616cc0b1' AND avg_price = 96; -- Amsterdam / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '1b4ed2c0-e3db-480f-ad11-0e387469ea54' AND avg_price = 120; -- Amsterdam / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '73b6c3f2-18d7-4e1e-9516-0e1f0391f9f6' AND avg_price = 120; -- Casablanca / automne
UPDATE public.destination_benchmarks SET avg_price = 130 WHERE id = 'e732b350-156e-4cec-9a0b-d9c3e7a77dce' AND avg_price = 156; -- Casablanca / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '72690fe1-3e42-4747-95ee-fe62af5b4f71' AND avg_price = 120; -- Casablanca / hiver
UPDATE public.destination_benchmarks SET avg_price = 130 WHERE id = '8680ce85-b246-48ce-b8ef-45d923073f01' AND avg_price = 156; -- Casablanca / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '74e30908-170d-4c69-a7d0-ad32981e8adb' AND avg_price = 96; -- Copenhague / automne
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'ddf5615a-0bca-41e0-a7a7-18fce78bdb1d' AND avg_price = 120; -- Copenhague / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '23958f62-8e36-4aa8-b489-8ff577e9dd88' AND avg_price = 96; -- Copenhague / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '6bd278d3-1f37-4fbe-a68a-b73fda0be6a4' AND avg_price = 120; -- Copenhague / printemps
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '223b18c5-156d-4cdd-b01a-a0b6d67f300e' AND avg_price = 144; -- Djerba / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '53f9177a-3091-4731-b7f3-a06d14c35481' AND avg_price = 120; -- Djerba / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '43bb8851-f19d-48f5-8bf2-9174dc25df09' AND avg_price = 96; -- Dublin / automne
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '4e82bd9c-87cb-4e9d-a3b8-2dda4612d61e' AND avg_price = 144; -- Dublin / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = 'b4189694-3e61-41a3-9a08-e7a8d4812363' AND avg_price = 96; -- Dublin / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '91b3badf-07f4-4b84-8a6f-88defcc2dd71' AND avg_price = 144; -- Dublin / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '0012f80f-1df6-4e44-ac04-4947318f4565' AND avg_price = 120; -- Dubrovnik / automne
UPDATE public.destination_benchmarks SET avg_price = 160 WHERE id = 'c3afd181-9410-49ca-9c6d-f73462c78b31' AND avg_price = 192; -- Dubrovnik / ete
UPDATE public.destination_benchmarks SET avg_price = 110 WHERE id = 'c3c0fc29-9284-4eab-8ac9-ffde7a3e5e8c' AND avg_price = 132; -- Dubrovnik / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '5501f694-80c2-4993-9da2-46e882f21af1' AND avg_price = 120; -- Edimbourg / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '86638e92-8d38-4588-81c2-95124fd2ee8e' AND avg_price = 120; -- Edimbourg / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '8bd27a6f-4654-42ae-8cf2-0995618caff4' AND avg_price = 120; -- Faro / automne
UPDATE public.destination_benchmarks SET avg_price = 160 WHERE id = 'ed8e0256-ecc4-4a5c-b2e7-75f680eea399' AND avg_price = 192; -- Faro / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '944dec1a-63d1-4cfa-a416-f7e82416d8e6' AND avg_price = 120; -- Faro / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'e31964b0-6b7d-4f58-9c68-ea5d1f8c91e5' AND avg_price = 120; -- Faro / printemps
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'fccb8b2c-204a-4d3d-8ad7-58e5e8596f49' AND avg_price = 144; -- Fuerteventura / automne
UPDATE public.destination_benchmarks SET avg_price = 180 WHERE id = '656c19dc-ff2b-4c2e-b9fb-c32c042d15e7' AND avg_price = 216; -- Fuerteventura / ete
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'f6e3ee41-f7fc-4c1e-b1af-34aa89b3529a' AND avg_price = 144; -- Fuerteventura / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '126e1450-ea33-4733-be34-3656cea98eab' AND avg_price = 144; -- Fuerteventura / printemps
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '3abccae2-0694-4df5-b86d-1f34d731f776' AND avg_price = 144; -- Grande Canarie / automne
UPDATE public.destination_benchmarks SET avg_price = 160 WHERE id = '27480ea6-80d7-4e6c-9dbb-d26c456d9df1' AND avg_price = 192; -- Grande Canarie / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'dae354dd-07b7-43a9-a1b3-c9632ad1d8fc' AND avg_price = 120; -- Grande Canarie / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'c14cf45f-27d1-4e89-a4fe-f3de49f582ec' AND avg_price = 144; -- Grande Canarie / printemps
UPDATE public.destination_benchmarks SET avg_price = 130 WHERE id = '8163ba54-41b0-4f72-999e-310e0c7867b6' AND avg_price = 156; -- Heraklion / automne
UPDATE public.destination_benchmarks SET avg_price = 190 WHERE id = '4f026776-2183-49f6-8038-4605e175ec24' AND avg_price = 228; -- Heraklion / ete
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '397d7a3f-c927-4637-b8df-f06238ce8829' AND avg_price = 144; -- Heraklion / printemps
UPDATE public.destination_benchmarks SET avg_price = 140 WHERE id = 'ec85f37e-8832-4ab7-92f7-a9e6773ee949' AND avg_price = 168; -- Hurghada / automne
UPDATE public.destination_benchmarks SET avg_price = 160 WHERE id = '345e5399-ad8e-4d2d-94c2-6e728b86294b' AND avg_price = 192; -- Hurghada / ete
UPDATE public.destination_benchmarks SET avg_price = 140 WHERE id = 'c59a5922-ea5e-4f34-8b21-263c7dbe1a0b' AND avg_price = 168; -- Hurghada / hiver
UPDATE public.destination_benchmarks SET avg_price = 160 WHERE id = '44905481-e412-492a-a442-e293302df682' AND avg_price = 192; -- Hurghada / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '47d8b6c3-975f-4225-80a9-f2935e816a26' AND avg_price = 120; -- Ibiza / automne
UPDATE public.destination_benchmarks SET avg_price = 180 WHERE id = '41945705-ba41-44ae-ae47-2d48dab91da5' AND avg_price = 216; -- Ibiza / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'b2bdccf9-eec8-447e-add6-54618dcfc6d5' AND avg_price = 120; -- Ibiza / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'de697c7f-6c39-4d83-ae87-2022c8cf59b1' AND avg_price = 144; -- Ibiza / printemps
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '0c3cb5a3-ff98-44b7-a2ce-0cee760023b2' AND avg_price = 144; -- Istanbul / automne
UPDATE public.destination_benchmarks SET avg_price = 180 WHERE id = 'c45ba38f-3cb7-4e26-b06a-0e0b6e36f9eb' AND avg_price = 216; -- Istanbul / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '4f56290e-1813-44b3-8b8b-aea8253410c3' AND avg_price = 120; -- Istanbul / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'cdcd62ce-5389-4a61-8117-aa2e90d1d654' AND avg_price = 144; -- Istanbul / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'eca7c41e-753f-46ec-a0ae-c4eb8b8fb10f' AND avg_price = 120; -- Lanzarote / automne
UPDATE public.destination_benchmarks SET avg_price = 160 WHERE id = '5e7cbbe8-ee67-45f3-b9b3-796b5428a850' AND avg_price = 192; -- Lanzarote / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '123eccde-d8cf-433a-bd44-0d67385c9c08' AND avg_price = 120; -- Lanzarote / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'c6de9bf6-5663-46c6-9b5e-43743c067095' AND avg_price = 144; -- Lanzarote / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'b0552b53-1187-45fc-aa62-6eb44ec3e3a7' AND avg_price = 120; -- Lisbonne / automne
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'a848870d-7f3e-4752-8854-e43cd322ea75' AND avg_price = 144; -- Lisbonne / ete
UPDATE public.destination_benchmarks SET avg_price = 90 WHERE id = '891a7186-65a7-42ee-8c53-1b219ddc673f' AND avg_price = 108; -- Lisbonne / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '88858f53-7009-465b-82c6-7e05094de054' AND avg_price = 120; -- Lisbonne / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '99f1a8c3-5469-4ef4-8d96-3fbfff49e63c' AND avg_price = 96; -- Londres / automne
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'e6c3cf1c-aa3f-4bd7-b683-ba0dd91da163' AND avg_price = 120; -- Londres / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = 'e304988f-b35c-40eb-9b5f-644de4b9b325' AND avg_price = 96; -- Londres / hiver
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = 'b60acd3e-c9cf-4e90-9f14-9f0ea5841bb0' AND avg_price = 96; -- Londres / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '2531c84f-665f-4c4e-a2f2-d8de7a5438b5' AND avg_price = 120; -- Madrid / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'db8a6f1b-fba9-4000-991e-8c4fb13d83f2' AND avg_price = 180; -- Madrid / ete
UPDATE public.destination_benchmarks SET avg_price = 90 WHERE id = '3e474bd5-3cb9-4854-b8eb-ae408870c8a5' AND avg_price = 108; -- Madrid / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '1c4afe9f-3909-4b4d-9f83-c77b80e84a12' AND avg_price = 120; -- Madrid / printemps
UPDATE public.destination_benchmarks SET avg_price = 90 WHERE id = '9778d7f8-8b93-4543-bea6-da6b2af6438b' AND avg_price = 108; -- Malaga / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'b902ada8-d9ce-4c4a-98a4-0bd0c6bf01aa' AND avg_price = 180; -- Malaga / ete
UPDATE public.destination_benchmarks SET avg_price = 90 WHERE id = '79aa147f-0845-419e-9b39-be7bd28d8b72' AND avg_price = 108; -- Malaga / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '64aa2c22-5c2f-48c3-b24b-7eaa6f15873d' AND avg_price = 120; -- Malaga / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'd9d60c73-8926-4fc4-8891-fd027fe060bb' AND avg_price = 120; -- Manchester / automne
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'af598970-6fdb-4f51-ba3c-83178ad37070' AND avg_price = 120; -- Manchester / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '01fa57c7-386f-4b07-a9d5-85808daceeba' AND avg_price = 120; -- Manchester / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'ca356bf7-bc52-4fbe-8043-418c9b250423' AND avg_price = 120; -- Marrakech / automne
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '58803466-09a1-48d3-ae17-6bb32c351ce0' AND avg_price = 144; -- Marrakech / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'dc9ccb2b-88e9-4963-b223-2af5a1fa0ebc' AND avg_price = 120; -- Marrakech / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'a2d00d39-2847-4ac9-bad8-df0939bc6c2e' AND avg_price = 120; -- Marrakech / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '9ab0ba30-278e-49c9-b0fd-e5ef37cc23a2' AND avg_price = 96; -- Marseille / automne
UPDATE public.destination_benchmarks SET avg_price = 110 WHERE id = 'd67afbd2-9116-44da-859a-5ace03c11c50' AND avg_price = 132; -- Marseille / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '45735fbd-9473-4b12-80d8-e2656b57e9ee' AND avg_price = 96; -- Marseille / hiver
UPDATE public.destination_benchmarks SET avg_price = 110 WHERE id = 'b7406022-c0ac-4863-8dc9-8a0e4aaf2a0f' AND avg_price = 132; -- Marseille / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '25f195ef-c8da-4c79-ab31-56d441925f5e' AND avg_price = 96; -- Munich / automne
UPDATE public.destination_benchmarks SET avg_price = 105 WHERE id = '7b4ecc8e-58dd-4d03-8306-a439a90af464' AND avg_price = 126; -- Munich / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = 'b347b286-30cc-4153-a557-f3218de5203d' AND avg_price = 96; -- Munich / hiver
UPDATE public.destination_benchmarks SET avg_price = 105 WHERE id = '2241f78d-35dc-44cb-a34f-fe30d5c3bdb9' AND avg_price = 126; -- Munich / printemps
UPDATE public.destination_benchmarks SET avg_price = 180 WHERE id = '1a368fda-1602-4254-9942-16a6b7fe31e7' AND avg_price = 216; -- Mykonos / ete
UPDATE public.destination_benchmarks SET avg_price = 180 WHERE id = '542411d1-76a1-4657-bfd5-c9c7247cc882' AND avg_price = 216; -- Mykonos / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'b59b9e44-ee2a-46c4-9849-3e2beffa8706' AND avg_price = 120; -- Naples / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'e8005897-64a1-4014-b953-05801d2cf6dc' AND avg_price = 180; -- Naples / ete
UPDATE public.destination_benchmarks SET avg_price = 90 WHERE id = '6588fda1-5519-4f83-a670-2ad4499aa1a3' AND avg_price = 108; -- Naples / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '48743255-a4a7-47cb-bb0b-e1930cc6a7ed' AND avg_price = 120; -- Naples / printemps
UPDATE public.destination_benchmarks SET avg_price = 110 WHERE id = 'af4ed7f8-2104-448e-b2cf-8a2093d7c3c2' AND avg_price = 132; -- Oslo / ete
UPDATE public.destination_benchmarks SET avg_price = 110 WHERE id = 'a86dbff8-0d1c-444c-bf85-5f1ba5e059bc' AND avg_price = 132; -- Oslo / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '6a2ddd7a-5b1c-4e2d-9974-c41e50f51225' AND avg_price = 96; -- Paris / automne
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'd0b8309e-39b4-42ca-92a8-50a65e78bf75' AND avg_price = 144; -- Paris / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '0e01ea7d-a5d5-4bd9-8158-0631c8aec3e3' AND avg_price = 96; -- Paris / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '3450fd5e-7136-40e3-9a28-19f3ff411b8a' AND avg_price = 120; -- Paris / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '95561b08-edb5-4289-bbb7-73490738417f' AND avg_price = 120; -- Rhodes / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = '17f33bcf-b986-46fb-9b37-5476136506a6' AND avg_price = 180; -- Rhodes / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '7b487cbb-569c-4307-beeb-ec8472da1cea' AND avg_price = 120; -- Rhodes / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = 'dd25afc3-fc7b-47a6-84ae-2d0e75148ecc' AND avg_price = 96; -- Sofia / automne
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'ef9fc6b7-6a06-4645-9a75-1479e929cc9b' AND avg_price = 144; -- Sofia / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = 'b15250fa-ee1e-4d10-9c18-b33a6215e042' AND avg_price = 96; -- Sofia / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '8abb4c52-c156-48a3-b684-8ece8b2c4805' AND avg_price = 144; -- Sofia / printemps
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '5f0e1577-94fa-4de0-b0be-908ad45ff658' AND avg_price = 144; -- Tenerife / automne
UPDATE public.destination_benchmarks SET avg_price = 160 WHERE id = 'f6fc54f1-ad61-412a-a874-6c94c2d4311b' AND avg_price = 192; -- Tenerife / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'ea152126-dedd-4f47-9c95-3efbe71aad63' AND avg_price = 120; -- Tenerife / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '7711e6e5-cc08-4200-9389-7d22d43c2e2c' AND avg_price = 144; -- Tenerife / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'bf252d08-ba7b-43df-8eed-aa87581ab841' AND avg_price = 120; -- Tunis / automne
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'dae98a7f-28e4-4bbf-8ddf-e653d294b196' AND avg_price = 144; -- Tunis / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '4ed1cbdf-6804-4bce-9d16-2fa161dfa2d1' AND avg_price = 120; -- Tunis / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '72b3a3d8-d7ac-4a06-a0ce-c11f6a9d8139' AND avg_price = 144; -- Tunis / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'b5ba941b-7e31-4664-9a1b-83a5ebec1f98' AND avg_price = 120; -- Venise / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'ffc6e50a-852b-410e-8a6e-657eac76daae' AND avg_price = 180; -- Venise / ete
UPDATE public.destination_benchmarks SET avg_price = 90 WHERE id = 'd7efd86f-0f27-4ad1-a007-354958b256a8' AND avg_price = 108; -- Venise / hiver
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '7ab88e0c-541b-4982-bdde-6a6d75616e81' AND avg_price = 120; -- Venise / printemps
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = '3d590fec-d1e4-442a-a29e-692f2c117cc0' AND avg_price = 96; -- Vienne / automne
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = 'bf6eb096-0170-4251-8a33-b7ccf7817606' AND avg_price = 144; -- Vienne / ete
UPDATE public.destination_benchmarks SET avg_price = 80 WHERE id = 'fc468de7-5fe9-4e28-8aea-ee8ebe6f408a' AND avg_price = 96; -- Vienne / hiver
UPDATE public.destination_benchmarks SET avg_price = 120 WHERE id = '6811a27c-2b06-4177-984a-35b7a2b2cd84' AND avg_price = 144; -- Vienne / printemps
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = 'bb248c46-83fc-4e10-a4fe-73e0d375bf41' AND avg_price = 120; -- Zagreb / automne
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'd6fd09d6-79cd-4297-a509-30817fba9c2c' AND avg_price = 180; -- Zagreb / ete
UPDATE public.destination_benchmarks SET avg_price = 100 WHERE id = '79cd0610-6e9c-499c-b601-c6b8900732e6' AND avg_price = 120; -- Zagreb / hiver
UPDATE public.destination_benchmarks SET avg_price = 150 WHERE id = 'a7539f6c-2021-4cd2-bb62-64e92fff6332' AND avg_price = 180; -- Zagreb / printemps

-- 2) Désactive les 11 deals actifs dont le prix est >= au benchmark d'origine.
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = '828d27fd-859f-41b8-b42b-899f7d33c6c8' AND is_active = true; -- Dubrovnik 2026-06-06 182€ vs benchmark 160€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = '997ad7c0-ecca-4daa-a356-bb37a7eb51bd' AND is_active = true; -- Ibiza 2026-09-15 107€ vs benchmark 100€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = '98fd9b62-aca9-4a82-93c8-8ea68f1bbdd3' AND is_active = true; -- Istanbul 2026-09-05 139€ vs benchmark 120€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = 'd70ba580-6b38-4286-8845-4e80ddc68d1e' AND is_active = true; -- Istanbul 2026-08-18 212€ vs benchmark 180€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = 'cdab0ca8-d1dd-4ff8-89d9-8a43c6616d69' AND is_active = true; -- Istanbul 2026-11-01 139€ vs benchmark 120€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = '21e8e6f9-87d6-419b-9d6a-5c8459c3aede' AND is_active = true; -- Istanbul 2026-07-08 181€ vs benchmark 180€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = '27176df2-2163-4ff3-bff2-3d4abd28dced' AND is_active = true; -- Madrid 2026-06-18 159€ vs benchmark 150€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = '40ad8854-ee04-49dd-b23a-fbe71e9fa527' AND is_active = true; -- Malaga 2026-09-15 90€ vs benchmark 90€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = 'dd6edb62-467c-4546-94aa-bdefe7d97688' AND is_active = true; -- Mykonos 2026-06-03 211€ vs benchmark 180€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = 'c767c506-0d83-4f7c-b968-c9a0f5869024' AND is_active = true; -- Naples 2026-07-21 161€ vs benchmark 150€
UPDATE public.deals SET is_active = false, status = 'above_benchmark' WHERE id = '635d288c-180b-499c-82b2-ef49388e5161' AND is_active = true; -- Sofia 2026-07-20 142€ vs benchmark 120€

-- 3) (OPTIONNEL) Désactive les 4 deals sous le benchmark mais avec < 5 % de remise
--    (la règle « score < 2 → SKIP » de l'agent n'a pas été appliquée). Décommente si tu valides.
-- UPDATE public.deals SET is_active = false, status = 'below_min_discount' WHERE id = '3e5a98e6-83b0-4f22-a33d-82497c679793' AND is_active = true; -- Athenes 2026-08-09 185€ vs 190€ (-3%)
-- UPDATE public.deals SET is_active = false, status = 'below_min_discount' WHERE id = '9ec4d470-c392-472b-90a6-76e3857ddb30' AND is_active = true; -- Athenes 2026-07-27 184€ vs 190€ (-3%)
-- UPDATE public.deals SET is_active = false, status = 'below_min_discount' WHERE id = '888f4de2-b6e9-4911-a636-21e100b34d8e' AND is_active = true; -- Tenerife 2026-06-06 153€ vs 160€ (-4%)
-- UPDATE public.deals SET is_active = false, status = 'below_min_discount' WHERE id = '894dc7dd-5c00-4b4a-bd1f-ecb4c6080fb3' AND is_active = true; -- Varsovie 2026-08-17 118€ vs 120€ (-2%)

-- 4) Recalcule discount_percentage / scores des deals restants avec les vrais benchmarks.
WITH s AS (
  SELECT d.id,
         ROUND((b.avg_price - d.price)::numeric / b.avg_price * 100) AS disc
  FROM public.deals d
  JOIN public.destination_benchmarks b ON b.destination = d.destination AND b.season = d.season
  WHERE d.is_active = true AND d.source = 'travelpayouts'
), sc AS (
  SELECT id, disc,
         CASE WHEN disc >= 40 THEN 5 WHEN disc >= 25 THEN 4 WHEN disc >= 15 THEN 3
              WHEN disc >= 5 THEN 2 ELSE 1 END AS score
  FROM s
)
UPDATE public.deals d
SET discount_percentage = sc.disc, deal_score = sc.score, score_ai = sc.score, score_final = sc.score
FROM sc
WHERE d.id = sc.id;

-- 4bis) Expire les deals dont le départ est passé. Au 12/11/2026, c'est le cas des 45 deals
--       actifs (créés le 10/05/2026 ; le cron /expire échoue depuis). Étape équivalente à /expire.
UPDATE public.deals SET is_active = false, status = 'expired'
WHERE is_active = true AND departure_date < CURRENT_DATE;

-- 5) Contrôle : doit renvoyer 0 ligne avant de faire COMMIT.
SELECT d.id, d.destination, d.season, d.price, b.avg_price
FROM public.deals d JOIN public.destination_benchmarks b ON b.destination = d.destination AND b.season = d.season
WHERE d.is_active = true AND d.price >= b.avg_price;

COMMIT; -- ou ROLLBACK; si le contrôle n'est pas vide
