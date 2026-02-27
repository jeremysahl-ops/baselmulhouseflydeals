import Link from 'next/link';

export default function Hero() {
  return (
    <section className="gradient-hero py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block bg-white text-[#7B2FBE] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-sm">
          ✈️ EuroAirport Basel-Mulhouse-Freiburg
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2C3E50] leading-tight mb-5">
          Les meilleurs deals au départ Basel-Mulhouse ✈️
        </h1>
        <p className="text-lg text-[#555] max-w-2xl mx-auto mb-8 leading-relaxed">
          Vols secs, city trips, séjours, dernière minute.{' '}
          <strong className="text-[#2C3E50]">Les pépites aériennes</strong> dénichées pour toi 🌟
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/derniere-minute" className="btn-cta px-8 py-3 text-base shadow-lg">
            ⚡ Dernière Minute
          </Link>
          <Link href="/vol" className="px-8 py-3 rounded-full border-2 border-[#7B2FBE] text-[#7B2FBE] font-bold text-base hover:bg-[#7B2FBE]/10 transition-colors bg-white">
            Voir tous les vols
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[
            { value: '50+', label: 'Deals actifs' },
            { value: '100%', label: 'Basel-Mulhouse' },
            { value: '0€', label: 'Inscription' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 shadow-sm">
              <p className="text-xl font-black text-[#7B2FBE]">{stat.value}</p>
              <p className="text-xs text-[#555] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
