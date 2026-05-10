import { getDealById } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Script from 'next/script';

interface Props {
  params: Promise<{ id: string }>;
}

// Mapping destination → IATA
const DEST_IATA: Record<string, string> = {
  'barcelone': 'BCN', 'madrid': 'MAD', 'malaga': 'AGP', 'alicante': 'ALC',
  'ibiza': 'IBZ', 'majorque': 'PMI', 'tenerife': 'TFS', 'fuerteventura': 'FUE',
  'lanzarote': 'ACE', 'grandecanarie': 'LPA', 'lisbonne': 'LIS', 'porto': 'OPO',
  'faro': 'FAO', 'rome': 'FCO', 'naples': 'NAP', 'venise': 'VCE',
  'athenes': 'ATH', 'heraklion': 'HER', 'rhodes': 'RHO', 'mykonos': 'JMK',
  'paris': 'CDG', 'nice': 'NCE', 'marseille': 'MRS', 'berlin': 'BER',
  'munich': 'MUC', 'hambourg': 'HAM', 'londres': 'LHR', 'manchester': 'MAN',
  'edimbourg': 'EDI', 'amsterdam': 'AMS', 'dubrovnik': 'DBV', 'split': 'SPU',
  'zagreb': 'ZAG', 'dublin': 'DUB', 'istanbul': 'IST', 'antalya': 'AYT',
  'marrakech': 'RAK', 'casablanca': 'CMN', 'agadir': 'AGA', 'tunis': 'TUN',
  'djerba': 'DJE', 'hurghada': 'HRG', 'vienne': 'VIE', 'budapest': 'BUD',
  'prague': 'PRG', 'oslo': 'OSL', 'copenhague': 'CPH', 'varsovie': 'WAW',
  'cracovie': 'KRK', 'bucarest': 'OTP', 'sofia': 'SOF', 'belgrade': 'BEG',
  'dubai': 'DXB', 'singapour': 'SIN', 'montreal': 'YUL',
};

function getIATA(destination: string): string {
  const key = destination.toLowerCase().split('(')[0].trim().replace(/\s+/g, '');
  return DEST_IATA[key] ?? '';
}

export default async function GoPage({ params }: Props) {
  const { id } = await params;
  const deal = await getDealById(id);

  if (!deal) notFound();

  const dateConstat = deal.created_at
    ? new Date(deal.created_at).toLocaleDateString('fr-FR')
    : '';

  const depDate = deal.departure_date
    ? new Date(deal.departure_date).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
    : '';
  const retDate = deal.return_date
    ? new Date(deal.return_date).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
    : '';

  const iata = getIATA(deal.destination);
  const marker = '707798';

  // Paramètres widget Aviasales
  const widgetParams = new URLSearchParams({
    trs: marker,
    shmarker: marker,
    locale: 'fr',
    curr: 'eur',
    origin: 'BSL',
    ...(iata && { destination: iata }),
    ...(deal.departure_date && { depart_date: deal.departure_date }),
    ...(deal.return_date && { return_date: deal.return_date }),
    one_way: 'false',
    color_button: 'C9A0DC',
    color_icons: 'C9A0DC',
    plain: 'true',
    powered_by: 'true',
    widget: 'search-form',
    host: 'www.aviasales.fr',
  });

  const widgetSrc = `https://tp.media/content?${widgetParams.toString()}&charset=utf-8`;

  return (
    <div style={{fontFamily:'sans-serif',background:'linear-gradient(135deg,#f5f0ff 0%,#fce4ec 100%)',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{background:'white',borderRadius:'24px',padding:'2.5rem',maxWidth:'560px',width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.12)',textAlign:'center'}}>
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
        <div style={{background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:'12px',padding:'0.75rem 1rem',marginBottom:'1.5rem',fontSize:'0.78rem',color:'#92400e',textAlign:'left'}}>
          ⚠️ Prix constaté le <strong>{dateConstat}</strong> — les tarifs aériens sont dynamiques. Vérifiez le prix final avant de valider.
        </div>
        
        {/* Widget Aviasales */}
        <div style={{marginBottom:'1rem',borderRadius:'12px',overflow:'hidden'}}>
          <Script async src={widgetSrc} strategy="lazyOnload" />
        </div>

        <p style={{marginTop:'1rem',fontSize:'0.72rem',color:'#ccc'}}>
          Lien partenaire — BaselMulhouse Fly Deals touche une commission sans surcoût pour vous.
        </p>
      </div>
    </div>
  );
}
GOEO
cd /mnt/c/Users/mouto/Desktop/baselmulhouseflydeals && cat > app/go/\[id\]/page.tsx << 'GOEOF'
import { getDealById } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Script from 'next/script';

interface Props {
  params: Promise<{ id: string }>;
}

// Mapping destination → IATA
const DEST_IATA: Record<string, string> = {
  'barcelone': 'BCN', 'madrid': 'MAD', 'malaga': 'AGP', 'alicante': 'ALC',
  'ibiza': 'IBZ', 'majorque': 'PMI', 'tenerife': 'TFS', 'fuerteventura': 'FUE',
  'lanzarote': 'ACE', 'grandecanarie': 'LPA', 'lisbonne': 'LIS', 'porto': 'OPO',
  'faro': 'FAO', 'rome': 'FCO', 'naples': 'NAP', 'venise': 'VCE',
  'athenes': 'ATH', 'heraklion': 'HER', 'rhodes': 'RHO', 'mykonos': 'JMK',
  'paris': 'CDG', 'nice': 'NCE', 'marseille': 'MRS', 'berlin': 'BER',
  'munich': 'MUC', 'hambourg': 'HAM', 'londres': 'LHR', 'manchester': 'MAN',
  'edimbourg': 'EDI', 'amsterdam': 'AMS', 'dubrovnik': 'DBV', 'split': 'SPU',
  'zagreb': 'ZAG', 'dublin': 'DUB', 'istanbul': 'IST', 'antalya': 'AYT',
  'marrakech': 'RAK', 'casablanca': 'CMN', 'agadir': 'AGA', 'tunis': 'TUN',
  'djerba': 'DJE', 'hurghada': 'HRG', 'vienne': 'VIE', 'budapest': 'BUD',
  'prague': 'PRG', 'oslo': 'OSL', 'copenhague': 'CPH', 'varsovie': 'WAW',
  'cracovie': 'KRK', 'bucarest': 'OTP', 'sofia': 'SOF', 'belgrade': 'BEG',
  'dubai': 'DXB', 'singapour': 'SIN', 'montreal': 'YUL',
};

function getIATA(destination: string): string {
  const key = destination.toLowerCase().split('(')[0].trim().replace(/\s+/g, '');
  return DEST_IATA[key] ?? '';
}

export default async function GoPage({ params }: Props) {
  const { id } = await params;
  const deal = await getDealById(id);

  if (!deal) notFound();

  const dateConstat = deal.created_at
    ? new Date(deal.created_at).toLocaleDateString('fr-FR')
    : '';

  const depDate = deal.departure_date
    ? new Date(deal.departure_date).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
    : '';
  const retDate = deal.return_date
    ? new Date(deal.return_date).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
    : '';

  const iata = getIATA(deal.destination);
  const marker = '707798';

  // Paramètres widget Aviasales
  const widgetParams = new URLSearchParams({
    trs: marker,
    shmarker: marker,
    locale: 'fr',
    curr: 'eur',
    origin: 'BSL',
    ...(iata && { destination: iata }),
    ...(deal.departure_date && { depart_date: deal.departure_date }),
    ...(deal.return_date && { return_date: deal.return_date }),
    one_way: 'false',
    color_button: 'C9A0DC',
    color_icons: 'C9A0DC',
    plain: 'true',
    powered_by: 'true',
    widget: 'search-form',
    host: 'www.aviasales.fr',
  });

  const widgetSrc = `https://tp.media/content?${widgetParams.toString()}&charset=utf-8`;

  return (
    <div style={{fontFamily:'sans-serif',background:'linear-gradient(135deg,#f5f0ff 0%,#fce4ec 100%)',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{background:'white',borderRadius:'24px',padding:'2.5rem',maxWidth:'560px',width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.12)',textAlign:'center'}}>
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
        <div style={{background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:'12px',padding:'0.75rem 1rem',marginBottom:'1.5rem',fontSize:'0.78rem',color:'#92400e',textAlign:'left'}}>
          ⚠️ Prix constaté le <strong>{dateConstat}</strong> — les tarifs aériens sont dynamiques. Vérifiez le prix final avant de valider.
        </div>
        
        {/* Widget Aviasales */}
        <div style={{marginBottom:'1rem',borderRadius:'12px',overflow:'hidden'}}>
          <Script async src={widgetSrc} strategy="lazyOnload" />
        </div>

        <p style={{marginTop:'1rem',fontSize:'0.72rem',color:'#ccc'}}>
          Lien partenaire — BaselMulhouse Fly Deals touche une commission sans surcoût pour vous.
        </p>
      </div>
    </div>
  );
}
