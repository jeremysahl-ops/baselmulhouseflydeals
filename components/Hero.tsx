import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')"}}
      />
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block bg-white/20 backdrop-blur text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 border border-white/30">
          ✈️ EuroAirport Basel-Mulhouse-Freiburg
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5 drop-shadow-lg">
          Les meilleurs deals au départ Basel-Mulhouse ✈️
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
          Vols secs, city trips, séjours, dernière minute.{' '}
          <strong className="text-white">Les pépites aériennes</strong> dénichées pour toi 🌟
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/derniere-minute" className="btn-cta px-8 py-3 text-base shadow-lg">
            ⚡ Dernière Minute
          </Link>
          <Link href="/vol" className="px-8 py-3 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white hover:text-purple-700 transition-colors backdrop-blur">
            Voir tous les vols
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[
            { value: '50+', label: 'Deals actifs' },
            { value: '100%', label: 'Basel-Mulhouse' },
            { value: '0€', label: 'Inscription' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/20 backdrop-blur rounded-2xl p-3 border border-white/30">
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-white/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
