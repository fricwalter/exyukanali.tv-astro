import { useState } from 'react';

const categories = [
  {
    id: "sportski",
    name: "Sportski Kanali",
    icon: "⚽",
    description: "Najbolji Sport na TV - Nogomet, Košarka, MMA i Više",
    image: "/images/sports-category-compressed.webp",
    channels: [
      "Nogomet - Premier League",
      "Nogomet - Champions League",
      "Nogomet - La Liga",
      "Nogomet - Serie A",
      "Nogomet - Bundesliga",
      "Košarka - NBA",
      "Košarka - EuroLeague",
      "Borilački Sportovi",
      "Tenis - ATP/WTA",
      "Ostali Sportovi"
    ]
  },
  {
    id: "filmovi",
    name: "Filmovi i Serije",
    icon: "🎬",
    description: "Najbolji Filmovi i Serije - 10.000+ Naslova",
    image: "/images/movies-category-compressed.webp",
    channels: [
      "Premium Filmovi 4K",
      "Najnoviji Filmovi",
      "Serije sa Prevodom",
      "Dokumentarci",
      "Animirani Filmovi",
      "Akcijski Filmovi",
      "Komedije",
      "Horori",
      "Drama i Trileri",
      "VOD Videoteka"
    ]
  },
  {
    id: "nacionalna",
    name: "Nacionalna TV",
    icon: "🇧🇦",
    description: "Svi Domaći Kanali iz BiH, Srbije, Hrvatske i Regiona",
    image: "/images/nacionalni-tv-compressed.webp",
    channels: [
      "Bosanski Kanali",
      "Srpski Kanali",
      "Hrvatski Kanali",
      "Crnogorski Kanali",
      "Makedonski Kanali",
      "Slovenski Kanali",
      "Vijesti 24/7",
      "Dječiji Program",
      "Muzički Kanali",
      "Kulturni Kanali"
    ]
  }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": categories.map((cat, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": cat.name,
      "description": cat.description
    }
  }))
};

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("sportski");

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <>
      <section className="py-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Sve Što <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Želite Gledati</span>
            </h2>
            <p className="text-lg text-gray-300">
              Od domaćih vijesti do finala Lige Šampiona. Naša lista kanala pokriva sve interese i sve generacije.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-stone-800 text-white hover:bg-stone-700'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={activeCategory?.image}
                alt={activeCategory?.name}
                width={800}
                height={320}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-4xl">{activeCategory?.icon}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{activeCategory?.name}</h3>
              </div>
            </div>

            {/* Channels List */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{activeCategory?.description}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCategory?.channels.map((channel, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-stone-800 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-200 font-medium">{channel}</span>
                  </div>
                ))}
              </div>

              <a
                href="/narudzba"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                Naruči Sada →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
