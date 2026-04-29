const categories = [
  {
    name: "Sport uživo",
    eyebrow: "Nogomet, košarka, tenis, borilački sportovi",
    title: "Ne propusti utakmicu, derbi ili finale",
    text: "Gledaj sportske prijenose na TV-u, Android Boxu, Fire TV Sticku ili telefonu. Za važne utakmice preporučujemo stabilan internet i uređaj spojen preko LAN kabla kad je moguće.",
    image: "/images/channels/sport-live-tv.webp",
    href: "/blog/najbolji-sportski-kanali-exyu-iptv/",
    items: ["Arena Sport i Sport Klub tip sadržaja", "Liga prvaka, ligaški fudbal i derbiji", "Tenis, košarka, MMA i ostali sportovi"]
  },
  {
    name: "Filmovi i serije",
    eyebrow: "VOD, premijere, serije, dokumentarci",
    title: "Veče za film, seriju ili dječiji program",
    text: "Uz live kanale dobijaš i izbor sadržaja za mirnije večeri: filmovi, serije, dokumentarci i zabavni program. Sve je praktično kada ne želiš tražiti po više aplikacija.",
    image: "/images/channels/movies-series-vod.webp",
    href: "/blog/sta-je-iptv-i-kako-radi/",
    items: ["Filmovi i serije na jednom mjestu", "Sadržaj za porodicu i djecu", "Gledanje na TV-u, tabletu ili laptopu"]
  },
  {
    name: "Domaći kanali",
    eyebrow: "Bosna, Srbija, Hrvatska i region",
    title: "Vijesti, emisije i program iz domovine",
    text: "Za dijasporu je najvažnije da domaći program bude jednostavno dostupan. Otvoriš aplikaciju i pratiš vijesti, zabavu, muziku, lokalne emisije i regionalni sadržaj.",
    image: "/images/channels/exyu-home-channels.webp",
    href: "/blog/kako-gledati-exyu-kanale-u-inostranstvu/",
    items: ["Bosanski, srpski i hrvatski program", "Regionalni sadržaj i informativne emisije", "Dostupno u Njemačkoj i inostranstvu"]
  }
];

const quickLinks = [
  { label: "EXYU IPTV Deutschland", href: "/iptv/deutschland/" },
  { label: "Instalacija na uređajima", href: "/instalacija/" },
  { label: "Sport vodič", href: "/blog/najbolji-sportski-kanali-exyu-iptv/" },
  { label: "24h test", href: "/narudzba/" }
];

export default function CategoryTabs() {
  return (
    <section className="relative overflow-hidden py-20 bg-slate-950">
      <div className="absolute inset-0">
        <img src="/images/hero-bg-compressed.webp" alt="" className="h-full w-full object-cover opacity-10" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/75 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-end mb-12">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-amber-300 mb-3">Kanali i sadržaj</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              EXYU IPTV za sport, filmove i domaći program
            </h2>
          </div>
          <div>
            <p className="text-lg text-slate-300 leading-8">
              Umjesto da tražiš streamove po internetu, sve držiš u jednoj aplikaciji: utakmice, serije, filmove, vijesti i programe iz regiona.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-200 hover:border-amber-300/40 hover:text-amber-300 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <article
              key={category.name}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-xl shadow-blue-950/10"
            >
              <a href={category.href} className="group block">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    width={1400}
                    height={788}
                    loading="lazy"
                    className="w-full aspect-video object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-black uppercase tracking-wide text-amber-300">{category.eyebrow}</p>
                    <h3 className="mt-2 text-2xl font-black text-white leading-tight">{category.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-black text-white leading-snug">{category.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{category.text}</p>
                  <ul className="mt-5 space-y-3">
                    {category.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm font-semibold text-slate-200">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex text-sm font-black text-amber-300 group-hover:text-amber-200">
                    Detalje pogledaj →
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/12 to-blue-500/10 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-white">Želiš prvo provjeriti listu na svom uređaju?</h3>
            <p className="mt-2 text-slate-300 leading-7">
              Pokreni 24h test, provjeri kanale, sport i aplikaciju na svom TV-u prije nego uzmeš paket.
            </p>
          </div>
          <a
            href="/narudzba/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-7 py-4 font-black text-slate-950 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition"
          >
            Pokreni 24h test
          </a>
        </div>
      </div>
    </section>
  );
}
