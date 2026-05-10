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
    deal.departure_date,
    deal.return_date
  );

  const dateConstat = deal.created_at
    ? new Date(deal.created_at).toLocaleDateString('fr-FR')
    : '';

  const depDate = deal.departure_date
    ? new Date(deal.departure_date).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
    : '';
  const retDate = deal.return_date
    ? new Date(deal.return_date).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
    : '';

  return (
    <div style={{fontFamily:'sans-serif',background:'linear-gradient(135deg,#f5f0ff 0%,#fce4ec 100%)',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{background:'white',borderRadius:'24px',padding:'2.5rem',maxWidth:'480px',width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.12)',textAlign:'center'}}>
        <div style={{fontSize:'3rem',marginBottom:'0.5rem'}}>✈️</div>
        <h1 style={{color:'#2C3E50',fontSize:'1.4rem',marginBottom:'0.25rem',fontWeight:800}}>
          {deal.destination}
        </h1>
        <p style={{color:'#C9A0DC',fontSize:'2rem',fontWeight:900,margin:'0.5rem 0'}}>
          dès {deal.price}€ <span style={{fontSize:'1rem',color:'#999',fontWeight:400}}>/ pers. A/R</span>
        </p>
        {depDate && (
          <p style={{color:'#666',fontSize:'0.85rem',marginBottom:'1.5rem'}}>
            🗓️ {depDate}{retDate ? ` → ${retDate}` : ''} · {deal.airline ?? ''}
          </p>
        )}
        <div style={{background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:'12px',padding:'0.85rem 1rem',marginBottom:'1.25rem',fontSize:'0.78rem',color:'#92400e',textAlign:'left'}}>
          ⚠️ Prix constaté le <strong>{dateConstat}</strong> — les tarifs aériens sont dynamiques. Vérifiez le prix final avant de valider.
        </div>
        <div style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'12px',padding:'0.85rem 1rem',marginBottom:'1.75rem',fontSize:'0.78rem',color:'#166534',textAlign:'left'}}>
          <strong>Kiwi.com</strong> — plateforme européenne qui compare des centaines de compagnies (EasyJet, Ryanair, Transavia...) pour trouver le meilleur tarif disponible.
        </div>
        <p style={{color:'#aaa',fontSize:'0.82rem',marginBottom:'1rem'}}>
          Redirection automatique dans <strong>6 secondes</strong>...
        </p>
        <a href={affiliateLink} style={{display:'block',background:'linear-gradient(135deg,#C9A0DC,#9B59B6)',color:'white',padding:'1rem 2rem',borderRadius:'50px',textDecoration:'none',fontWeight:700,fontSize:'1rem',boxShadow:'0 4px 15px rgba(155,89,182,0.4)'}}>
          🚀 Voir le vol maintenant
        </a>
        <p style={{marginTop:'1rem',fontSize:'0.72rem',color:'#ccc'}}>
          Lien partenaire — BaselMulhouse Fly Deals touche une commission sans surcoût pour vous.
        </p>
      </div>
      <meta httpEquiv="refresh" content={`6;url=${affiliateLink}`} />
    </div>
  );
}
