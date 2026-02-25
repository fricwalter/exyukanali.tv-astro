import { useState } from 'react';

const categories = [
  {
    id: "sportski",
    name: "Sportski Kanali",
    icon: "⚽",
    description: "Arena Sport, Sport Klub, Eurosport & Premium Lige",
    image: "/images/sports-category.webp",
    channels: [
      "Arena Sport 1-10",
      "Sport Klub HD",
      "Eurosport 1 & 2",
      "Premier League",
      "Champions League",
      "La Liga",
      "Serie A",
      "Bundesliga",
      "NBA",
      "MMA / UFC"
    ]
  },
  {
    id: "filmovi",
    name: "Filmovi i Serije",
    icon: "🎬",
    description: "HBO, CineStar, Fox Movies + VOD Videoteka",
    image: "/images/movies-category.webp",
    channels: [
      "HBO HD",
      "HBO 2 & 3",
      "CineStar TV",
      "Fox Movies",
      "Fox Crime",
      "AMC",
      "Paramount Channel",
      "VOD 10.000+ naslova",
      "Najnoviji filmovi",
      "Serije sa prevodom"
    ]
  },
  {
    id: "nacionalna",
    name: "Nacionalna TV",
    icon: "🇧🇦",
    description: "Svi kanali iz BiH, Srbije, Hrvatske, CG i Makedonije",
    image: "/images/nacionalni-tv.webp",
    channels: [
      "BHT 1",
      "FTV",
      "Nova BH",
      "Hayat TV",
      "RTRS",
      "RTV Pink",
      "RTV Belgrade",
      "HRT 1-4",
      "Nova TV",
      "DOMA TV"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sve Što <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Želite Gledati</span>
            </h2>
            <p className="text-lg text-gray-600">
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
                    : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">{activeCategory?.description}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCategory?.channels.map((channel, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{channel}</span>
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
