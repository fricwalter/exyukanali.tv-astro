import { useState } from 'react';

const plans = {
  standard: {
    name: "Standard Paket",
    features: [
      "1 Konekcija (1 Uređaj)",
      "Svi EXYU Kanali",
      "Osnovni Sportski Paket",
      "HD Kanali",
      "Standard VOD",
      "Email Podrška"
    ],
    prices: [
      { period: "1 Mjesec", price: "10€" },
      { period: "3 Mjeseca", price: "25€" },
      { period: "6 Mjeseci", price: "45€" },
      { period: "12 Mjeseci", price: "60€" }
    ]
  },
  premium: {
    name: "Premium Paket",
    popular: true,
    features: [
      "1 Konekcija (1 Uređaj)",
      "Svi EXYU + Internacionalni",
      "Premium Sportski Paket",
      "4K & Full HD Kanali",
      "Kompletan VOD + Update",
      "Prioritetna Podrška"
    ],
    prices: [
      { period: "1 Mjesec", price: "15€" },
      { period: "3 Mjeseca", price: "40€" },
      { period: "6 Mjeseci", price: "60€" },
      { period: "12 Mjeseci", price: "84€" }
    ]
  }
};

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'standard' | 'premium'>('premium');

  const currentPlan = plans[activeTab];

  return (
    <>
      <section id="pricing" className="py-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Izaberite <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Svoj Paket</span>
            </h2>
            <p className="text-lg text-gray-300">
              Fleksibilne opcije za svakoga. Bez ugovorne obveze.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'standard'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-stone-800 text-white hover:bg-stone-700'
              }`}
            >
              Standard Paket
            </button>
            <button
              onClick={() => setActiveTab('premium')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 relative ${
                activeTab === 'premium'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 shadow-lg shadow-orange-500/25'
                  : 'bg-stone-800 text-white hover:bg-stone-700'
              }`}
            >
              Premium Paket 🔥
              {activeTab === 'premium' && (
                <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  NAJPOVOLJNIJE
                </span>
              )}
            </button>
          </div>

          {/* Plan Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 md:p-12 border border-stone-700 shadow-xl">
              {/* Popular Badge */}
              {currentPlan.popular && (
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 text-sm font-bold rounded-full">
                    ⭐ Premium Opcije
                  </span>
                </div>
              )}

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      currentPlan.popular
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Prices */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentPlan.prices.map((pricing, index) => (
                  <div
                    key={index}
                    className={`relative rounded-2xl p-6 text-center border-2 transition-all duration-200 hover:-translate-y-1 ${
                      index === 3
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-stone-700 bg-stone-800 hover:border-blue-400'
                    }`}
                  >
                    {index === 3 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        NAJPOVOLJNIJE
                      </div>
                    )}
                    <div className="text-gray-400 text-sm mb-2">{pricing.period}</div>
                    <div className={`text-3xl font-bold mb-4 ${
                      currentPlan.popular ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {pricing.price}
                    </div>
                    <a
                      href="/narudzba/"
                      className={`block w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                        currentPlan.popular
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 hover:shadow-lg hover:shadow-orange-500/30'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-600/30'
                      }`}
                    >
                      Naruči
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <p className="text-gray-300">
                Nisite sigurni koji paket odabrati?{' '}
                <a href="/narudzba/" className="text-blue-400 font-semibold hover:underline">
                  🎁 Testiraj 24h Besplatno
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
