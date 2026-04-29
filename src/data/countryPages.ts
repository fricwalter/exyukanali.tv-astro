export interface CountryStat {
  value: string;
  labelBks: string;
  labelLocal: string;
}

export interface CountryCard {
  titleBks: string;
  titleLocal: string;
  textBks: string;
  textLocal: string;
  href?: string;
  ctaBks?: string;
  ctaLocal?: string;
}

export interface CountryGuideLink {
  href: string;
  labelBks: string;
  labelLocal: string;
  textBks: string;
  textLocal: string;
}

export interface CountryCity {
  label: string;
  id: string;
  note: string;
}

export interface CountryPage {
  slug: string;
  flag: string;
  footerName: string;
  localName: string;
  bksName: string;
  languageLabel: string;
  image: string;
  imageAlt: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrowBks: string;
    eyebrowLocal: string;
    titleBks: string;
    titleLocal: string;
    introBks: string;
    introLocal: string;
    secondaryCtaBks: string;
    secondaryCtaLocal: string;
    secondaryCtaHref: string;
  };
  stats: CountryStat[];
  intro: {
    titleBks: string;
    titleLocal: string;
    textBks: string;
    textLocal: string;
  };
  benefits: CountryCard[];
  sport: {
    titleBks: string;
    titleLocal: string;
    textBks: string;
    textLocal: string;
    cards: CountryCard[];
  };
  devices: {
    titleBks: string;
    titleLocal: string;
    textBks: string;
    textLocal: string;
    cards: CountryCard[];
  };
  connection: {
    titleBks: string;
    titleLocal: string;
    textBks: string;
    textLocal: string;
  };
  cities: {
    titleBks: string;
    titleLocal: string;
    textBks: string;
    textLocal: string;
    items: CountryCity[];
  };
  guides: CountryGuideLink[];
  faq: CountryCard[];
}

interface CountrySeed {
  slug: string;
  flag: string;
  footerName: string;
  localName: string;
  bksName: string;
  languageLabel: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  eyebrowBks: string;
  eyebrowLocal: string;
  titleBks: string;
  titleLocal: string;
  introBks: string;
  introLocal: string;
  angleBks: string;
  angleLocal: string;
  cities: CountryCity[];
  providersBks: string;
  providersLocal: string;
  sportBks: string;
  sportLocal: string;
  deviceBks: string;
  deviceLocal: string;
  benefitOneBks: string;
  benefitOneLocal: string;
  benefitTwoBks: string;
  benefitTwoLocal: string;
  benefitThreeBks: string;
  benefitThreeLocal: string;
  extraGuides?: CountryGuideLink[];
  faqOneBks?: string;
  faqOneLocal?: string;
  faqTwoBks?: string;
  faqTwoLocal?: string;
}

const commonDeviceCards: CountryCard[] = [
  {
    titleBks: 'Smart TV',
    titleLocal: 'Smart TV',
    textBks: 'Samsung, LG, Sony i Philips rade direktno preko IPTV aplikacije kada je televizor kompatibilan.',
    textLocal: 'Runs directly through an IPTV app on compatible Samsung, LG, Sony and Philips TVs.',
    href: '/blog/kako-instalirati-iptv-na-samsung-tv/'
  },
  {
    titleBks: 'Fire TV Stick',
    titleLocal: 'Fire TV Stick',
    textBks: 'Dobar izbor za stan, sobu ili drugi televizor jer se brzo priključi preko HDMI-ja.',
    textLocal: 'A practical HDMI device for apartments, rooms and second TVs.',
    href: '/blog/fire-tv-stick-iptv-instalacija/'
  },
  {
    titleBks: 'Android Box',
    titleLocal: 'Android Box',
    textBks: 'Najbolje za TiviMate, brzi EPG, favorite i stabilno gledanje sporta na velikom ekranu.',
    textLocal: 'Best for TiviMate, fast EPG, favorites and stable sports viewing on the big screen.',
    href: '/blog/android-box-iptv-instalacija/'
  },
  {
    titleBks: 'Telefon, tablet i laptop',
    titleLocal: 'Phone, tablet and laptop',
    textBks: 'Gledaj kod kuće, u pauzi, na putu ili prebaci sliku na TV kada ti treba veći ekran.',
    textLocal: 'Watch at home, during a break, while traveling or cast to a bigger screen.',
    href: '/blog/exyu-iptv-iphone-ipad/'
  }
];

const commonGuides: CountryGuideLink[] = [
  {
    href: '/instalacija/',
    labelBks: 'Instalacija na svim uređajima',
    labelLocal: 'Device installation',
    textBks: 'Jedno mjesto za Smart TV, Fire TV Stick, Android Box, telefon i tablet.',
    textLocal: 'One starting point for Smart TV, Fire TV Stick, Android Box, phone and tablet.'
  },
  {
    href: '/blog/najbolji-sportski-kanali-exyu-iptv/',
    labelBks: 'Sport na EXYU IPTV',
    labelLocal: 'Sports on EXYU IPTV',
    textBks: 'Za fudbal, košarku, tenis, MMA i velike sportske večeri.',
    textLocal: 'For football, basketball, tennis, MMA and big sports nights.'
  },
  {
    href: '/blog/tivimate-postavke-za-exyu-iptv/',
    labelBks: 'TiviMate podešavanje',
    labelLocal: 'TiviMate setup',
    textBks: 'Za bolji EPG, favorite, grupe kanala i Catch TV.',
    textLocal: 'For better EPG, favorites, channel groups and Catch TV.'
  },
  {
    href: '/blog/kako-poboljsati-kvalitetu-iptv-streama/',
    labelBks: 'Stabilniji IPTV stream',
    labelLocal: 'More stable IPTV stream',
    textBks: 'Konkretni koraci ako slika zastaje ili se kanal sporo otvara.',
    textLocal: 'Concrete steps when the picture buffers or channels open slowly.'
  }
];

function makeCountry(seed: CountrySeed): CountryPage {
  const firstCities = seed.cities.slice(0, 4).map((city) => city.label).join(', ');

  return {
    slug: seed.slug,
    flag: seed.flag,
    footerName: seed.footerName,
    localName: seed.localName,
    bksName: seed.bksName,
    languageLabel: seed.languageLabel,
    image: seed.image,
    imageAlt: seed.imageAlt,
    seo: {
      title: seed.seoTitle,
      description: seed.seoDescription
    },
    hero: {
      eyebrowBks: seed.eyebrowBks,
      eyebrowLocal: seed.eyebrowLocal,
      titleBks: seed.titleBks,
      titleLocal: seed.titleLocal,
      introBks: seed.introBks,
      introLocal: seed.introLocal,
      secondaryCtaBks: 'Sport & Catch TV',
      secondaryCtaLocal: 'Sport & Catch TV',
      secondaryCtaHref: '#sport'
    },
    stats: [
      { value: '24h', labelBks: 'test na tvojoj mreži', labelLocal: 'test on your network' },
      { value: '0', labelBks: 'dug ugovor', labelLocal: 'long contract' },
      { value: 'Catch TV', labelBks: 'za propušten sadržaj', labelLocal: 'for missed programs' },
      { value: seed.footerName, labelBks: firstCities, labelLocal: firstCities }
    ],
    intro: {
      titleBks: `EXYU IPTV za ${seed.bksName}: stranica pisana za ljude koji stvarno gledaju`,
      titleLocal: seed.eyebrowLocal,
      textBks: seed.angleBks,
      textLocal: seed.angleLocal
    },
    benefits: [
      {
        titleBks: seed.benefitOneBks,
        titleLocal: seed.benefitOneLocal,
        textBks: 'Kreneš bez kablovske, bez satelita i bez čekanja tehničara. Pošalješ uređaj, dobiješ podatke i testiraš na svojoj mreži.',
        textLocal: 'Start without cable, satellite or a technician appointment. Send your device, get the access details and test on your own network.',
        href: '/narudzba/',
        ctaBks: 'Pokreni 24h test',
        ctaLocal: 'Start 24h test'
      },
      {
        titleBks: seed.benefitTwoBks,
        titleLocal: seed.benefitTwoLocal,
        textBks: 'Sport, vijesti, filmovi, serije i domaći program stoje na jednom mjestu, uz EPG i Catch TV kada je dostupan.',
        textLocal: 'Sports, news, movies, series and home channels are in one place, with EPG and Catch TV when available.',
        href: '/blog/najbolji-sportski-kanali-exyu-iptv/',
        ctaBks: 'Sport vodič',
        ctaLocal: 'Sports guide'
      },
      {
        titleBks: seed.benefitThreeBks,
        titleLocal: seed.benefitThreeLocal,
        textBks: 'Podrška zna šta znači gledati domaće kanale u dijaspori i pomaže oko aplikacije, liste, EPG-a i uređaja.',
        textLocal: 'Support understands diaspora TV needs and helps with the app, playlist, EPG and device setup.',
        href: '/kontakt/',
        ctaBks: 'Kontakt',
        ctaLocal: 'Contact'
      }
    ],
    sport: {
      titleBks: `Sport i Catch TV za ${seed.bksName}`,
      titleLocal: `Sports and Catch TV for ${seed.localName}`,
      textBks: seed.sportBks,
      textLocal: seed.sportLocal,
      cards: [
        {
          titleBks: 'Utakmice bez traženja linkova',
          titleLocal: 'Matches without hunting links',
          textBks: 'Otvoriš aplikaciju, izabereš kanal i gledaš. Posebno je bitno kada igra reprezentacija, klub ili derbi iz regiona.',
          textLocal: 'Open the app, choose the channel and watch. This matters most for national-team games, clubs and regional derbies.',
          href: '/blog/najbolji-sportski-kanali-exyu-iptv/'
        },
        {
          titleBks: 'Catch TV kada zakasniš',
          titleLocal: 'Catch TV when you are late',
          textBks: 'Ako si na poslu, u smjeni, na putu ili zbog vremenske razlike kasniš, vratiš sadržaj kada je Catch TV dostupan.',
          textLocal: 'If work, travel, shifts or time zones get in the way, you can return to content when Catch TV is available.',
          href: '/blog/tivimate-postavke-za-exyu-iptv/'
        }
      ]
    },
    devices: {
      titleBks: `Uređaji koji imaju najviše smisla za ${seed.bksName}`,
      titleLocal: `Best devices for ${seed.localName}`,
      textBks: seed.deviceBks,
      textLocal: seed.deviceLocal,
      cards: commonDeviceCards
    },
    connection: {
      titleBks: seed.providersBks,
      titleLocal: seed.providersLocal,
      textBks: 'IPTV najviše zavisi od stabilnog interneta, dobrog Wi-Fi signala i uređaja. Za sport koristi 5 GHz Wi-Fi ili LAN kabl, a test radi baš u vrijeme kada inače gledaš.',
      textLocal: 'IPTV depends on stable internet, good Wi-Fi and the device. For sports, use 5 GHz Wi-Fi or Ethernet and test exactly when you usually watch.'
    },
    cities: {
      titleBks: `${seed.eyebrowBks}: gradovi i regije`,
      titleLocal: `${seed.eyebrowLocal}: cities and regions`,
      textBks: `Stranica prirodno pokriva pretrage kao EXYU IPTV ${seed.footerName}, Balkan IPTV ${seed.footerName}, domaći kanali ${seed.footerName}, Serbian IPTV, Bosnian TV i Croatian IPTV, ali tekst ostaje pisan za posjetioca.`,
      textLocal: `This page naturally covers searches such as EXYU IPTV ${seed.footerName}, Balkan IPTV ${seed.footerName}, Serbian IPTV, Bosnian TV and Croatian IPTV, while keeping the content useful for real visitors.`,
      items: seed.cities
    },
    guides: [...commonGuides, ...(seed.extraGuides ?? [])],
    faq: [
      {
        titleBks: `Da li EXYU IPTV radi u ${seed.bksName}?`,
        titleLocal: `Does EXYU IPTV work in ${seed.localName}?`,
        textBks: seed.faqOneBks ?? 'Može raditi ako imaš stabilan internet i kompatibilnu IPTV aplikaciju. Zato je 24h test najbolji prvi korak.',
        textLocal: seed.faqOneLocal ?? 'It can work if you have stable internet and a compatible IPTV app. That is why the 24h test is the best first step.'
      },
      {
        titleBks: 'Koji uređaj je najbolji?',
        titleLocal: 'Which device is best?',
        textBks: seed.faqTwoBks ?? 'Za većinu korisnika najbrži start su Smart TV ili Fire TV Stick. Ako želiš više kontrole, Android Box i TiviMate su bolji izbor.',
        textLocal: seed.faqTwoLocal ?? 'For most users, Smart TV or Fire TV Stick are the fastest start. If you want more control, Android Box and TiviMate are better.'
      }
    ]
  };
}

const relatedDachGuides: CountryGuideLink[] = [
  {
    href: '/iptv/deutschland/',
    labelBks: 'EXYU IPTV u Njemačkoj',
    labelLocal: 'EXYU IPTV Germany',
    textBks: 'Za rodbinu i prijatelje u Njemačkoj.',
    textLocal: 'For family and friends in Germany.'
  },
  {
    href: '/iptv/oesterreich/',
    labelBks: 'EXYU IPTV u Austriji',
    labelLocal: 'EXYU IPTV Austria',
    textBks: 'Za Wien, Graz, Linz i Salzburg.',
    textLocal: 'For Vienna, Graz, Linz and Salzburg.'
  },
  {
    href: '/iptv/schweiz/',
    labelBks: 'EXYU IPTV u Švicarskoj',
    labelLocal: 'EXYU IPTV Switzerland',
    textBks: 'Za Zürich, Basel, Bern i St. Gallen.',
    textLocal: 'For Zurich, Basel, Bern and St. Gallen.'
  }
];

export const countryPages: CountryPage[] = [
  makeCountry({
    slug: 'deutschland',
    flag: '🇩🇪',
    footerName: 'Deutschland',
    localName: 'Deutschland',
    bksName: 'Njemačkoj',
    languageLabel: 'Deutsch',
    image: '/images/countries/deutschland-sportabend.webp',
    imageAlt: 'EXYU IPTV Deutschland Sportabend',
    seoTitle: 'EXYU IPTV Deutschland | Balkan TV, bosnische, serbische und kroatische Sender',
    seoDescription: 'EXYU IPTV Deutschland für Balkan-Diaspora: bosnische, serbische und kroatische Sender, Sport, Smart TV, Fire TV Stick, Android Box und TiviMate.',
    eyebrowBks: 'IPTV Njemačka',
    eyebrowLocal: 'IPTV Deutschland',
    titleBks: 'EXYU IPTV u Njemačkoj za TV, sport i domaće kanale',
    titleLocal: 'EXYU IPTV in Deutschland für TV, Sport und Sender aus der Heimat',
    introBks: 'Gledaj kanale iz Bosne, Srbije, Hrvatske i regiona bez kablovske, bez satelita i bez dugog ugovora. Testiraš na uređaju koji već imaš.',
    introLocal: 'Watch channels from Bosnia, Serbia, Croatia and the region without cable, satellite or long contract. Test on the device you already use.',
    angleBks: 'U Njemačkoj je najvažnije da sve radi jednostavno: aplikacija, kanal, sport i Catch TV bez stalnog traženja novih linkova.',
    angleLocal: 'In Germany, the key is simple viewing: app, channel, sports and Catch TV without constantly searching for new links.',
    cities: [
      { label: 'Berlin', id: 'berlin', note: 'EXYU IPTV Deutschland' },
      { label: 'München', id: 'muenchen', note: 'Balkan IPTV Bayern' },
      { label: 'Hamburg', id: 'hamburg', note: 'Domaći kanali online' },
      { label: 'Frankfurt', id: 'frankfurt', note: 'IPTV za dijasporu' },
      { label: 'Stuttgart', id: 'stuttgart', note: 'Sport i Catch TV' },
      { label: 'Köln', id: 'koeln', note: 'Bosanski, srpski, hrvatski TV' },
      { label: 'Dortmund', id: 'dortmund', note: 'Smart TV i Fire TV Stick' },
      { label: 'Nürnberg', id: 'nuernberg', note: 'TiviMate i Android Box' }
    ],
    providersBks: 'Telekom, Vodafone, O2, 1&1: bitna je stabilna veza',
    providersLocal: 'Telekom, Vodafone, O2, 1&1: stable connection matters',
    sportBks: 'Njemačka ima najviše smjena, putovanja i vikend obaveza. Zato sport i Catch TV moraju biti lako dostupni.',
    sportLocal: 'Germany has shifts, commuting and busy weekends. Sports and Catch TV need to be easy to reach.',
    deviceBks: 'Smart TV i Fire TV Stick su najbrži početak, Android Box je bolji za TiviMate i favorite.',
    deviceLocal: 'Smart TV and Fire TV Stick are the fastest start; Android Box is better for TiviMate and favorites.',
    benefitOneBks: 'Odmah možeš početi',
    benefitOneLocal: 'Start right away',
    benefitTwoBks: 'Bez kablovske i satelita',
    benefitTwoLocal: 'No cable or satellite',
    benefitThreeBks: 'Podrška na našem jeziku',
    benefitThreeLocal: 'Support in our language',
    extraGuides: [
      {
        href: '/blog/exyu-iptv-njemacka/',
        labelBks: 'EXYU IPTV u Njemačkoj',
        labelLocal: 'EXYU IPTV Germany guide',
        textBks: 'Detaljniji vodič za gledanje domaćih kanala u Njemačkoj.',
        textLocal: 'More detail for watching home channels in Germany.'
      }
    ]
  }),
  makeCountry({
    slug: 'oesterreich',
    flag: '🇦🇹',
    footerName: 'Österreich',
    localName: 'Österreich',
    bksName: 'Austriji',
    languageLabel: 'Deutsch',
    image: '/images/countries/deutschland-catch-tv.webp',
    imageAlt: 'EXYU IPTV Österreich auf Smart TV',
    seoTitle: 'EXYU IPTV Österreich | Balkan IPTV, Sport, Catch TV und Ex-Yu Sender',
    seoDescription: 'EXYU IPTV Österreich für Wien, Graz, Linz, Salzburg und die Balkan-Diaspora: bosnische, serbische, kroatische Sender, Sport, Catch TV und Smart-TV-Installation.',
    eyebrowBks: 'IPTV Austrija',
    eyebrowLocal: 'IPTV Österreich',
    titleBks: 'EXYU IPTV u Austriji za Wien, Graz, Linz i cijelu dijasporu',
    titleLocal: 'EXYU IPTV in Österreich für Wien, Graz, Linz und die Balkan-Diaspora',
    introBks: 'Ako živiš u Austriji i želiš domaće kanale bez kablovske i satelita, EXYU IPTV donosi sport, vijesti, filmove i Catch TV na uređaj koji već koristiš.',
    introLocal: 'If you live in Austria and want channels from home without cable or satellite, EXYU IPTV brings sports, news, movies and Catch TV to your existing device.',
    angleBks: 'Austrija je blizu Balkana, ali domaći program i dalje fali u svakodnevici, posebno kada se utakmice gledaju poslije posla ili u lokalu.',
    angleLocal: 'Austria is close to the Balkans, but home TV is still missing in everyday life, especially when matches are watched after work or in a local bar.',
    cities: [
      { label: 'Wien', id: 'wien', note: 'EXYU IPTV Wien' },
      { label: 'Graz', id: 'graz', note: 'Balkan IPTV Graz' },
      { label: 'Linz', id: 'linz', note: 'Smart TV i Fire TV' },
      { label: 'Salzburg', id: 'salzburg', note: 'Sport i Catch TV' },
      { label: 'Wels', id: 'wels', note: 'Domaći kanali' },
      { label: 'Klagenfurt', id: 'klagenfurt', note: 'IPTV za dijasporu' },
      { label: 'Innsbruck', id: 'innsbruck', note: 'Gledanje preko interneta' },
      { label: 'Villach', id: 'villach', note: 'BKS podrška' }
    ],
    providersBks: 'A1, Magenta, Drei: testiraj u svom stanu',
    providersLocal: 'A1, Magenta, Drei: test in your own home',
    sportBks: 'U Austriji se često gleda u grupi: kod kuće, u stanu s prijateljima ili u malom lokalu.',
    sportLocal: 'In Austria, people often watch together at home, with friends or in a small local bar.',
    deviceBks: 'Za Austriju su Smart TV i Fire TV Stick praktični, posebno u stanovima gdje ne želiš dodatnu opremu.',
    deviceLocal: 'For Austria, Smart TV and Fire TV Stick are practical, especially in apartments where you do not want extra hardware.',
    benefitOneBks: 'Za Wien i velike gradove',
    benefitOneLocal: 'For Vienna and major cities',
    benefitTwoBks: 'Sport poslije posla',
    benefitTwoLocal: 'Sports after work',
    benefitThreeBks: 'Na našem jeziku',
    benefitThreeLocal: 'Support in our language',
    extraGuides: relatedDachGuides
  }),
  makeCountry({
    slug: 'schweiz',
    flag: '🇨🇭',
    footerName: 'Schweiz',
    localName: 'Schweiz',
    bksName: 'Švicarskoj',
    languageLabel: 'Deutsch',
    image: '/images/countries/deutschland-geraete.webp',
    imageAlt: 'EXYU IPTV Schweiz auf mehreren Geräten',
    seoTitle: 'EXYU IPTV Schweiz | Balkan TV, Sport und Sender aus Ex-Yu',
    seoDescription: 'EXYU IPTV Schweiz für Zürich, Basel, Bern, Luzern und St. Gallen: Balkan TV, bosnische, serbische und kroatische Sender, Sport, Catch TV und Installation.',
    eyebrowBks: 'IPTV Švicarska',
    eyebrowLocal: 'IPTV Schweiz',
    titleBks: 'EXYU IPTV u Švicarskoj za Zürich, Basel, Bern i cijelu CH dijasporu',
    titleLocal: 'EXYU IPTV in der Schweiz für Zürich, Basel, Bern und die ganze CH-Diaspora',
    introBks: 'U Švicarskoj je bitno da IPTV radi uredno kroz kantone, jezike i različite internet mreže. Dobiješ domaće kanale, sport i Catch TV bez vezivanja.',
    introLocal: 'In Switzerland, IPTV needs to work across cantons, languages and different networks. Get home channels, sports and Catch TV without long commitment.',
    angleBks: 'Švicarska traži uredno rješenje: kompatibilan uređaj, stabilna mreža i jasna podrška za porodice koje žive po različitim kantonima.',
    angleLocal: 'Switzerland needs a clean setup: compatible device, stable network and clear support for families spread across cantons.',
    cities: [
      { label: 'Zürich', id: 'zuerich', note: 'Balkan IPTV Zürich' },
      { label: 'Basel', id: 'basel', note: 'EXYU IPTV Basel' },
      { label: 'Bern', id: 'bern', note: 'Domaći kanali CH' },
      { label: 'Luzern', id: 'luzern', note: 'Smart TV i Fire TV' },
      { label: 'St. Gallen', id: 'st-gallen', note: 'Sport i Catch TV' },
      { label: 'Aargau', id: 'aargau', note: 'IPTV za porodice' },
      { label: 'Lausanne', id: 'lausanne', note: 'Balkan TV online' },
      { label: 'Ticino', id: 'ticino', note: 'Gledanje preko interneta' }
    ],
    providersBks: 'Swisscom, Sunrise, Salt: testiraj u svom kantonu',
    providersLocal: 'Swisscom, Sunrise, Salt: test in your canton',
    sportBks: 'U Švicarskoj se često gleda poslije posla, vikendom ili kada dođe rodbina.',
    sportLocal: 'In Switzerland, people often watch after work, on weekends or when family visits.',
    deviceBks: 'Pošalji koji uređaj koristiš i koji internet imaš, pa dobiješ preporuku za aplikaciju.',
    deviceLocal: 'Tell us your device and internet type, then get the right app recommendation.',
    benefitOneBks: 'Za porodice u više kantona',
    benefitOneLocal: 'For families across cantons',
    benefitTwoBks: 'Bez satelita na balkonu',
    benefitTwoLocal: 'No satellite on the balcony',
    benefitThreeBks: 'Stabilno za sport vikendom',
    benefitThreeLocal: 'Stable for weekend sports',
    extraGuides: relatedDachGuides
  }),
  makeCountry({
    slug: 'usa',
    flag: '🇺🇸',
    footerName: 'USA',
    localName: 'United States',
    bksName: 'Americi',
    languageLabel: 'English',
    image: '/images/countries/deutschland-sportabend.webp',
    imageAlt: 'EXYU IPTV USA for Balkan TV and sport',
    seoTitle: 'EXYU IPTV USA | Balkan TV, Serbian, Bosnian and Croatian Channels',
    seoDescription: 'EXYU IPTV USA for Chicago, St. Louis, New York and the Balkan diaspora: Serbian, Bosnian, Croatian and regional channels, sports, Catch TV and setup support.',
    eyebrowBks: 'IPTV Amerika',
    eyebrowLocal: 'IPTV USA',
    titleBks: 'EXYU IPTV u Americi za Balkan TV, sport i kanale iz domovine',
    titleLocal: 'EXYU IPTV in the USA for Balkan TV, sports and channels from home',
    introBks: 'Za naše ljude u Americi najveći problem nije samo kanal, nego vremenska razlika. Zato su stabilan stream, Catch TV i uređaj za TV najvažniji.',
    introLocal: 'For Balkan families in the United States, the challenge is not only channels but time zones. Stable streaming, Catch TV and a TV-ready device matter most.',
    angleBks: 'USA stranica mora drugačije pričati od DACH regije: velika udaljenost, vremenske zone, porodice u više saveznih država i gledanje na velikom ekranu.',
    angleLocal: 'The USA page needs a different angle from Europe: long distance, time zones, families across states and big-screen viewing.',
    cities: [
      { label: 'Chicago', id: 'chicago', note: 'EXYU IPTV Chicago' },
      { label: 'St. Louis', id: 'st-louis', note: 'Bosnian TV USA' },
      { label: 'New York', id: 'new-york', note: 'Balkan IPTV USA' },
      { label: 'Detroit', id: 'detroit', note: 'Serbian TV USA' },
      { label: 'Phoenix', id: 'phoenix', note: 'Domaći kanali online' },
      { label: 'Los Angeles', id: 'los-angeles', note: 'Croatian IPTV USA' },
      { label: 'Jacksonville', id: 'jacksonville', note: 'Sport i Catch TV' },
      { label: 'Dallas', id: 'dallas', note: 'IPTV for Balkan diaspora' }
    ],
    providersBks: 'Xfinity, Spectrum, AT&T, Verizon: testiraj navečer',
    providersLocal: 'Xfinity, Spectrum, AT&T, Verizon: test in the evening',
    sportBks: 'U Americi je termin često veći problem od kanala. Catch TV pomaže kada utakmica ili emisija pada u nezgodno vrijeme.',
    sportLocal: 'In the USA, timing is often a bigger issue than channels. Catch TV helps when a match or show airs at a difficult time.',
    deviceBks: 'Fire TV Stick, Android Box i Smart TV aplikacije su najpraktičnije za američke dnevne sobe.',
    deviceLocal: 'Fire TV Stick, Android Box and Smart TV apps are the most practical for American living rooms.',
    benefitOneBks: 'Catch TV zbog vremenske razlike',
    benefitOneLocal: 'Catch TV for time zones',
    benefitTwoBks: 'Balkan TV bez satelita',
    benefitTwoLocal: 'Balkan TV without satellite',
    benefitThreeBks: 'Podrška za uređaje',
    benefitThreeLocal: 'Device support',
    extraGuides: [
      {
        href: '/blog/kako-gledati-exyu-kanale-u-inostranstvu/',
        labelBks: 'EXYU kanali u inostranstvu',
        labelLocal: 'EXYU channels abroad',
        textBks: 'Osnovni vodič za gledanje domaćih kanala izvan Balkana.',
        textLocal: 'A practical guide for watching channels from home outside the Balkans.'
      }
    ]
  }),
  makeCountry({
    slug: 'italija',
    flag: '🇮🇹',
    footerName: 'Italija',
    localName: 'Italia',
    bksName: 'Italiji',
    languageLabel: 'Italiano',
    image: '/images/countries/deutschland-catch-tv.webp',
    imageAlt: 'EXYU IPTV Italija za Balkan TV',
    seoTitle: 'EXYU IPTV Italija | Balkan TV, sport i domaći kanali u Italiji',
    seoDescription: 'EXYU IPTV Italija za Milano, Rim, Trst, Padovu i hrvatsku, bosansku i srpsku dijasporu: Balkan TV, sport, Catch TV i instalacija.',
    eyebrowBks: 'IPTV Italija',
    eyebrowLocal: 'IPTV Italia',
    titleBks: 'EXYU IPTV u Italiji za Milano, Rim, Trst i sjever Italije',
    titleLocal: 'EXYU IPTV in Italia per Milano, Roma, Trieste e il Nord Italia',
    introBks: 'Italija je posebna zbog Trsta, Veneta, Milana i ljudi koji su blizu domovine, ali im domaći program ipak fali svakog dana.',
    introLocal: 'In Italia, soprattutto tra Trieste, Veneto, Milano e Roma, molti vogliono canali balcanici, sport e Catch TV senza cavo o satellite.',
    angleBks: 'Za Italiju je bitan lokalni fokus: Trst i Veneto imaju jaku hrvatsku vezu, Milano i Rim su praktični za radnike, studente i porodice iz regiona.',
    angleLocal: 'Per l’Italia conta il contesto locale: Trieste e Veneto hanno un forte legame croato, Milano e Roma sono importanti per lavoratori, studenti e famiglie della regione.',
    cities: [
      { label: 'Milano', id: 'milano', note: 'Balkan IPTV Milano' },
      { label: 'Roma', id: 'roma', note: 'EXYU IPTV Roma' },
      { label: 'Trieste', id: 'trieste', note: 'Croatian TV Italy' },
      { label: 'Padova', id: 'padova', note: 'Domaći kanali Veneto' },
      { label: 'Venezia', id: 'venezia', note: 'Sport i Catch TV' },
      { label: 'Torino', id: 'torino', note: 'IPTV za dijasporu' },
      { label: 'Bologna', id: 'bologna', note: 'Smart TV i Fire TV' },
      { label: 'Verona', id: 'verona', note: 'Balkan TV online' }
    ],
    providersBks: 'TIM, Vodafone, Fastweb, WindTre: testiraj na svojoj mreži',
    providersLocal: 'TIM, Vodafone, Fastweb, WindTre: prova sulla tua rete',
    sportBks: 'U Italiji se sport često gleda kasno navečer ili vikendom, pa su brz EPG i Catch TV korisni za porodice i smjene.',
    sportLocal: 'In Italia lo sport si guarda spesso la sera o nel weekend, quindi EPG veloce e Catch TV aiutano molto.',
    deviceBks: 'Smart TV je praktičan, ali Fire TV Stick i Android Box su često bolji za stanove i iznajmljene sobe.',
    deviceLocal: 'Smart TV è comoda, ma Fire TV Stick e Android Box sono spesso migliori per appartamenti e stanze in affitto.',
    benefitOneBks: 'Za sjever Italije i veće gradove',
    benefitOneLocal: 'Per il Nord Italia e le grandi città',
    benefitTwoBks: 'Sport i domaći program bez satelita',
    benefitTwoLocal: 'Sport e canali da casa senza satellite',
    benefitThreeBks: 'Podrška za aplikaciju',
    benefitThreeLocal: 'Supporto per app e dispositivi'
  }),
  makeCountry({
    slug: 'spanija',
    flag: '🇪🇸',
    footerName: 'Španija',
    localName: 'España',
    bksName: 'Španiji',
    languageLabel: 'Español',
    image: '/images/countries/deutschland-geraete.webp',
    imageAlt: 'EXYU IPTV Španija na Smart TV i Fire TV',
    seoTitle: 'EXYU IPTV Španija | Balkan TV za Madrid, Barcelonu i obalu',
    seoDescription: 'EXYU IPTV Španija za Madrid, Barcelonu, Valenciju, Malagu i Balkan dijasporu: domaći kanali, sport, Catch TV i Smart TV instalacija.',
    eyebrowBks: 'IPTV Španija',
    eyebrowLocal: 'IPTV España',
    titleBks: 'EXYU IPTV u Španiji za Madrid, Barcelonu, Valenciju i obalu',
    titleLocal: 'EXYU IPTV en España para Madrid, Barcelona, Valencia y la costa',
    introBks: 'Španija ima drugačiji ritam: sezonski rad, obala, apartmani i ljudi koji često putuju. Zato IPTV mora raditi jednostavno na TV-u, telefonu i tabletu.',
    introLocal: 'En España el ritmo es diferente: trabajo de temporada, costa, apartamentos y viajes. Por eso IPTV debe funcionar fácil en TV, móvil y tablet.',
    angleBks: 'Za Španiju su važni mobilnost i obala: Madrid i Barcelona za posao, Valencia, Malaga i Alicante za ljude koji često borave sezonski.',
    angleLocal: 'Para España importan la movilidad y la costa: Madrid y Barcelona por trabajo, Valencia, Málaga y Alicante para estancias de temporada.',
    cities: [
      { label: 'Madrid', id: 'madrid', note: 'Balkan IPTV Madrid' },
      { label: 'Barcelona', id: 'barcelona', note: 'EXYU IPTV Barcelona' },
      { label: 'Valencia', id: 'valencia', note: 'Domaći kanali Spain' },
      { label: 'Málaga', id: 'malaga', note: 'IPTV Costa del Sol' },
      { label: 'Alicante', id: 'alicante', note: 'Balkan TV online' },
      { label: 'Palma', id: 'palma', note: 'Smart TV i tablet' },
      { label: 'Zaragoza', id: 'zaragoza', note: 'Sport i Catch TV' },
      { label: 'Sevilla', id: 'sevilla', note: 'IPTV za dijasporu' }
    ],
    providersBks: 'Movistar, Orange, Vodafone, Digi: testiraj u apartmanu ili stanu',
    providersLocal: 'Movistar, Orange, Vodafone, Digi: prueba en tu piso o apartamento',
    sportBks: 'U Španiji je korisno imati Catch TV zbog posla, putovanja i utakmica koje se gledaju kasno.',
    sportLocal: 'En España Catch TV ayuda por trabajo, viajes y partidos que muchas veces se ven tarde.',
    deviceBks: 'Fire TV Stick je praktičan za apartmane, Smart TV za stalni stan, a telefon za putovanja.',
    deviceLocal: 'Fire TV Stick es práctico para apartamentos, Smart TV para casa fija y móvil para viajar.',
    benefitOneBks: 'Za obalu i sezonski boravak',
    benefitOneLocal: 'Para la costa y estancias temporales',
    benefitTwoBks: 'Domaći kanali gdje god si',
    benefitTwoLocal: 'Canales de casa estés donde estés',
    benefitThreeBks: 'Brzo podešavanje',
    benefitThreeLocal: 'Configuración rápida'
  }),
  makeCountry({
    slug: 'velika-britanija',
    flag: '🇬🇧',
    footerName: 'Velika Britanija',
    localName: 'United Kingdom',
    bksName: 'Velikoj Britaniji',
    languageLabel: 'English',
    image: '/images/countries/deutschland-sportabend.webp',
    imageAlt: 'EXYU IPTV UK Balkan TV',
    seoTitle: 'EXYU IPTV UK | Balkan TV, Serbian, Bosnian and Croatian Channels',
    seoDescription: 'EXYU IPTV UK for London, Manchester, Birmingham and the Balkan diaspora: Serbian, Bosnian, Croatian channels, sports, Catch TV and setup support.',
    eyebrowBks: 'IPTV Velika Britanija',
    eyebrowLocal: 'IPTV UK',
    titleBks: 'EXYU IPTV u Velikoj Britaniji za London, Manchester i Birmingham',
    titleLocal: 'EXYU IPTV in the UK for London, Manchester and Birmingham',
    introBks: 'U Velikoj Britaniji su Balkan porodice često raširene između Londona, Midlands-a i sjevera. IPTV mora raditi bez kablovske, na TV-u i uz Catch TV.',
    introLocal: 'In the UK, Balkan families are often spread between London, the Midlands and the North. IPTV needs to work without cable, on TV and with Catch TV.',
    angleBks: 'UK stranica cilja ljude koji traže Balkan IPTV UK, Serbian TV UK, Bosnian TV UK i Croatian IPTV UK, ali tekst ostaje jednostavan i koristan.',
    angleLocal: 'This UK page targets searches like Balkan IPTV UK, Serbian TV UK, Bosnian TV UK and Croatian IPTV UK while staying clear and useful.',
    cities: [
      { label: 'London', id: 'london', note: 'Balkan IPTV London' },
      { label: 'Manchester', id: 'manchester', note: 'EXYU IPTV Manchester' },
      { label: 'Birmingham', id: 'birmingham', note: 'Bosnian TV UK' },
      { label: 'Leeds', id: 'leeds', note: 'Serbian IPTV UK' },
      { label: 'Liverpool', id: 'liverpool', note: 'Sport i Catch TV' },
      { label: 'Glasgow', id: 'glasgow', note: 'Balkan TV online' },
      { label: 'Coventry', id: 'coventry', note: 'Domaći kanali' },
      { label: 'Bristol', id: 'bristol', note: 'Smart TV i Fire TV' }
    ],
    providersBks: 'BT, Virgin Media, Sky, Vodafone: testiraj u večernjem terminu',
    providersLocal: 'BT, Virgin Media, Sky, Vodafone: test during evening hours',
    sportBks: 'UK ima drugačiji ritam utakmica, posla i putovanja, zato je Catch TV bitan za propušten program.',
    sportLocal: 'The UK has its own rhythm of work, travel and match times, so Catch TV matters for missed programs.',
    deviceBks: 'Fire TV Stick i Smart TV su najbolji za brzi start, Android Box za one koji žele TiviMate.',
    deviceLocal: 'Fire TV Stick and Smart TV are best for a quick start; Android Box is better for TiviMate users.',
    benefitOneBks: 'Za London i Midlands',
    benefitOneLocal: 'For London and the Midlands',
    benefitTwoBks: 'Sport nakon smjene',
    benefitTwoLocal: 'Sports after shifts',
    benefitThreeBks: 'BKS podrška preko WhatsAppa',
    benefitThreeLocal: 'BKS support via WhatsApp'
  }),
  makeCountry({
    slug: 'australia',
    flag: '🇦🇺',
    footerName: 'Australija',
    localName: 'Australia',
    bksName: 'Australiji',
    languageLabel: 'English',
    image: '/images/countries/deutschland-sportabend.webp',
    imageAlt: 'EXYU IPTV Australia Balkan TV and sport',
    seoTitle: 'EXYU IPTV Australia | Balkan TV for Melbourne, Sydney and Perth',
    seoDescription: 'EXYU IPTV Australia for Melbourne, Sydney, Brisbane, Adelaide and Perth: Balkan TV, Serbian, Bosnian, Croatian channels, sports, Catch TV and device setup.',
    eyebrowBks: 'IPTV Australija',
    eyebrowLocal: 'IPTV Australia',
    titleBks: 'EXYU IPTV u Australiji za Melbourne, Sydney, Brisbane i Perth',
    titleLocal: 'EXYU IPTV in Australia for Melbourne, Sydney, Brisbane and Perth',
    introBks: 'Australija je posebna zbog velike vremenske razlike. Catch TV, stabilan stream i uređaj za dnevnu sobu su važniji nego bilo gdje drugo.',
    introLocal: 'Australia is special because of the huge time difference. Catch TV, stable streaming and a living-room device matter more than anywhere else.',
    angleBks: 'Za Australiju se stranica fokusira na Melbourne i Sydney kao jaka Balkan središta, ali i Brisbane, Adelaide i Perth zbog porodica koje su rasute po velikoj udaljenosti.',
    angleLocal: 'For Australia, the page focuses on Melbourne and Sydney as strong Balkan hubs, plus Brisbane, Adelaide and Perth because families are spread across long distances.',
    cities: [
      { label: 'Melbourne', id: 'melbourne', note: 'Balkan IPTV Melbourne' },
      { label: 'Sydney', id: 'sydney', note: 'EXYU IPTV Sydney' },
      { label: 'Brisbane', id: 'brisbane', note: 'Bosnian TV Australia' },
      { label: 'Adelaide', id: 'adelaide', note: 'Croatian IPTV Australia' },
      { label: 'Perth', id: 'perth', note: 'Serbian TV Australia' },
      { label: 'Gold Coast', id: 'gold-coast', note: 'Sport i Catch TV' },
      { label: 'Geelong', id: 'geelong', note: 'Balkan TV online' },
      { label: 'Wollongong', id: 'wollongong', note: 'Domaći kanali' }
    ],
    providersBks: 'Telstra, Optus, TPG, Aussie Broadband: testiraj zbog udaljenosti',
    providersLocal: 'Telstra, Optus, TPG, Aussie Broadband: test because distance matters',
    sportBks: 'Vremenska razlika znači da se utakmice često gledaju rano, kasno ili naknadno. Zato je Catch TV ključan.',
    sportLocal: 'Time difference means games are often watched early, late or later. That makes Catch TV critical.',
    deviceBks: 'Android Box i Fire TV Stick su praktični za veliki ekran, telefon je dobar samo kao dopuna.',
    deviceLocal: 'Android Box and Fire TV Stick are practical for big-screen viewing; phones are only a backup.',
    benefitOneBks: 'Za Melbourne i Sydney zajednice',
    benefitOneLocal: 'For Melbourne and Sydney communities',
    benefitTwoBks: 'Catch TV zbog vremenske razlike',
    benefitTwoLocal: 'Catch TV for time zones',
    benefitThreeBks: 'Podešavanje za veliki ekran',
    benefitThreeLocal: 'Setup for the big screen'
  }),
  makeCountry({
    slug: 'belgija',
    flag: '🇧🇪',
    footerName: 'Belgija',
    localName: 'Belgique / België',
    bksName: 'Belgiji',
    languageLabel: 'FR/NL',
    image: '/images/countries/deutschland-geraete.webp',
    imageAlt: 'EXYU IPTV Belgija za Brussels i Antwerp',
    seoTitle: 'EXYU IPTV Belgija | Balkan TV za Brussels, Antwerp i Liege',
    seoDescription: 'EXYU IPTV Belgija za Brussels, Antwerp, Liege i Balkan dijasporu: domaći kanali, sport, Catch TV, Smart TV i Fire TV Stick.',
    eyebrowBks: 'IPTV Belgija',
    eyebrowLocal: 'IPTV Belgique / België',
    titleBks: 'EXYU IPTV u Belgiji za Brussels, Antwerp, Liege i okolinu',
    titleLocal: 'EXYU IPTV en Belgique / België voor Brussels, Antwerp en Liège',
    introBks: 'Belgija je mala, ali razuđena: Brussels, Antwerp, Liege i okolina imaju različite jezike, mreže i navike gledanja. IPTV mora biti jednostavan.',
    introLocal: 'La Belgique / België is compact but diverse: Brussels, Antwerp, Liège and surrounding areas use different languages, networks and viewing habits.',
    angleBks: 'Za Belgiju su ključni Brussels i Antwerp, EU posao, smjene i porodice koje žele domaći program bez satelita u stanu.',
    angleLocal: 'For Belgium, Brussels and Antwerp matter most, with EU work, shifts and families who want home channels without satellite in the apartment.',
    cities: [
      { label: 'Brussels', id: 'brussels', note: 'Balkan IPTV Brussels' },
      { label: 'Antwerp', id: 'antwerp', note: 'Croatian TV Belgium' },
      { label: 'Liège', id: 'liege', note: 'EXYU IPTV Liege' },
      { label: 'Gent', id: 'gent', note: 'Domaći kanali' },
      { label: 'Charleroi', id: 'charleroi', note: 'Sport i Catch TV' },
      { label: 'Leuven', id: 'leuven', note: 'Smart TV i tablet' },
      { label: 'Brugge', id: 'brugge', note: 'Balkan TV online' },
      { label: 'Hasselt', id: 'hasselt', note: 'IPTV za dijasporu' }
    ],
    providersBks: 'Proximus, Telenet, Orange: testiraj na kućnoj mreži',
    providersLocal: 'Proximus, Telenet, Orange: test on your home network',
    sportBks: 'U Belgiji je gledanje često vezano za smjene i vikend, pa je bitno da aplikacija brzo otvara kanale.',
    sportLocal: 'In Belgium, viewing is often tied to shifts and weekends, so the app needs to open channels quickly.',
    deviceBks: 'Smart TV je dobar za porodično gledanje, Fire TV Stick za stanove i sobe.',
    deviceLocal: 'Smart TV is good for family viewing, Fire TV Stick for apartments and rooms.',
    benefitOneBks: 'Za Brussels i Antwerp',
    benefitOneLocal: 'For Brussels and Antwerp',
    benefitTwoBks: 'Domaći program bez satelita',
    benefitTwoLocal: 'Home channels without satellite',
    benefitThreeBks: 'Podrška za više jezika',
    benefitThreeLocal: 'Support across languages'
  }),
  makeCountry({
    slug: 'francuska',
    flag: '🇫🇷',
    footerName: 'Francuska',
    localName: 'France',
    bksName: 'Francuskoj',
    languageLabel: 'Français',
    image: '/images/countries/deutschland-catch-tv.webp',
    imageAlt: 'EXYU IPTV Francuska Balkan TV',
    seoTitle: 'EXYU IPTV Francuska | Balkan TV za Paris, Lyon i Marseille',
    seoDescription: 'EXYU IPTV Francuska za Paris, Lyon, Marseille i Balkan dijasporu: bosanski, srpski, hrvatski kanali, sport, Catch TV i instalacija.',
    eyebrowBks: 'IPTV Francuska',
    eyebrowLocal: 'IPTV France',
    titleBks: 'EXYU IPTV u Francuskoj za Paris, Lyon, Marseille i Balkan dijasporu',
    titleLocal: 'EXYU IPTV en France pour Paris, Lyon, Marseille et la diaspora balkanique',
    introBks: 'Francuska ima jake zajednice u Parizu i Lyonu, ali i ljude po jugu zemlje. Domaći kanali, sport i Catch TV moraju raditi bez komplikacije.',
    introLocal: 'En France, les communautés sont fortes à Paris et Lyon, mais aussi dans le Sud. Les chaînes balkaniques, le sport et Catch TV doivent fonctionner simplement.',
    angleBks: 'Za Francusku je bitan balans između Pariza, Lyona i juga zemlje, gdje ljudi često žele sport, vijesti i porodični program na jednom mjestu.',
    angleLocal: 'For France, the focus is Paris, Lyon and the South, where people often want sports, news and family channels in one place.',
    cities: [
      { label: 'Paris', id: 'paris', note: 'Balkan IPTV Paris' },
      { label: 'Lyon', id: 'lyon', note: 'Serbian IPTV France' },
      { label: 'Marseille', id: 'marseille', note: 'EXYU IPTV Marseille' },
      { label: 'Nice', id: 'nice', note: 'Domaći kanali' },
      { label: 'Strasbourg', id: 'strasbourg', note: 'Sport i Catch TV' },
      { label: 'Toulouse', id: 'toulouse', note: 'Balkan TV online' },
      { label: 'Grenoble', id: 'grenoble', note: 'Smart TV i Fire TV' },
      { label: 'Bordeaux', id: 'bordeaux', note: 'IPTV za dijasporu' }
    ],
    providersBks: 'Orange, SFR, Bouygues, Free: testiraj u vrijeme sporta',
    providersLocal: 'Orange, SFR, Bouygues, Free: test during sports hours',
    sportBks: 'U Francuskoj je sport često vikend događaj za društvo i porodicu, zato je stabilan stream važan.',
    sportLocal: 'In France, sports often become a weekend event with friends and family, so stable streaming matters.',
    deviceBks: 'Smart TV i Android Box su dobri za kuću, Fire TV Stick za stanove i česta seljenja.',
    deviceLocal: 'Smart TV and Android Box are good for home, Fire TV Stick for apartments and frequent moves.',
    benefitOneBks: 'Za Paris i Lyon',
    benefitOneLocal: 'Pour Paris et Lyon',
    benefitTwoBks: 'Sport i kanali iz regiona',
    benefitTwoLocal: 'Sport et chaînes de la région',
    benefitThreeBks: 'Jednostavna instalacija',
    benefitThreeLocal: 'Installation simple'
  }),
  makeCountry({
    slug: 'svedska',
    flag: '🇸🇪',
    footerName: 'Švedska',
    localName: 'Sverige',
    bksName: 'Švedskoj',
    languageLabel: 'Svenska',
    image: '/images/countries/deutschland-geraete.webp',
    imageAlt: 'EXYU IPTV Švedska za Stockholm Malmö Göteborg',
    seoTitle: 'EXYU IPTV Švedska | Balkan TV za Stockholm, Malmö i Göteborg',
    seoDescription: 'EXYU IPTV Švedska za Stockholm, Malmö, Göteborg i Balkan dijasporu: bosanski, srpski, hrvatski i makedonski kanali, sport i Catch TV.',
    eyebrowBks: 'IPTV Švedska',
    eyebrowLocal: 'IPTV Sverige',
    titleBks: 'EXYU IPTV u Švedskoj za Stockholm, Malmö, Göteborg i dijasporu',
    titleLocal: 'EXYU IPTV i Sverige för Stockholm, Malmö, Göteborg och Balkan-diasporan',
    introBks: 'Švedska ima jake zajednice iz Bosne, Hrvatske, Srbije i Makedonije. IPTV treba raditi stabilno u stanu, kući i na više uređaja.',
    introLocal: 'I Sverige finns starka grupper från Bosnien, Kroatien, Serbien och Makedonien. IPTV ska fungera stabilt hemma och på flera enheter.',
    angleBks: 'Za Švedsku su bitni Malmö, Göteborg i Stockholm, uz porodice koje žele domaće vijesti, sport i dječiji program bez satelita.',
    angleLocal: 'For Sweden, Malmö, Gothenburg and Stockholm matter, with families wanting news, sports and kids programming without satellite.',
    cities: [
      { label: 'Stockholm', id: 'stockholm', note: 'Balkan IPTV Stockholm' },
      { label: 'Malmö', id: 'malmo', note: 'EXYU IPTV Malmö' },
      { label: 'Göteborg', id: 'goteborg', note: 'Balkan TV Göteborg' },
      { label: 'Helsingborg', id: 'helsingborg', note: 'Domaći kanali' },
      { label: 'Örebro', id: 'orebro', note: 'Sport i Catch TV' },
      { label: 'Växjö', id: 'vaxjo', note: 'Makedonski kanali' },
      { label: 'Uppsala', id: 'uppsala', note: 'Smart TV i Fire TV' },
      { label: 'Trelleborg', id: 'trelleborg', note: 'Balkan TV online' }
    ],
    providersBks: 'Telia, Tele2, Telenor, Bahnhof: testiraj Wi-Fi i uređaj',
    providersLocal: 'Telia, Tele2, Telenor, Bahnhof: testa Wi-Fi och enhet',
    sportBks: 'U Švedskoj se često gleda vikendom i zimi kada je porodica kod kuće, pa su EPG i favoriti bitni.',
    sportLocal: 'In Sweden, people often watch on weekends and winter evenings, so EPG and favorites matter.',
    deviceBks: 'Android Box je dobar za TiviMate, Smart TV za porodično gledanje, Fire TV Stick za brzi start.',
    deviceLocal: 'Android Box is good for TiviMate, Smart TV for family viewing and Fire TV Stick for quick setup.',
    benefitOneBks: 'Za Malmö i Göteborg',
    benefitOneLocal: 'För Malmö och Göteborg',
    benefitTwoBks: 'Domaći kanali za porodicu',
    benefitTwoLocal: 'Channels from home for families',
    benefitThreeBks: 'Stabilno zimi i vikendom',
    benefitThreeLocal: 'Stable during winter and weekends'
  }),
  makeCountry({
    slug: 'finska',
    flag: '🇫🇮',
    footerName: 'Finska',
    localName: 'Suomi',
    bksName: 'Finskoj',
    languageLabel: 'Suomi',
    image: '/images/countries/deutschland-catch-tv.webp',
    imageAlt: 'EXYU IPTV Finska Helsinki Turku Tampere',
    seoTitle: 'EXYU IPTV Finska | Balkan TV za Helsinki, Turku i Tampere',
    seoDescription: 'EXYU IPTV Finska za Helsinki, Turku, Tampere i ex-yu zajednicu: Balkan TV, sport, Catch TV, Smart TV i Fire TV instalacija.',
    eyebrowBks: 'IPTV Finska',
    eyebrowLocal: 'IPTV Suomi',
    titleBks: 'EXYU IPTV u Finskoj za Helsinki, Turku, Tampere i ex-yu zajednicu',
    titleLocal: 'EXYU IPTV Suomessa Helsingille, Turulle, Tampereelle ja ex-yu-yhteisölle',
    introBks: 'Finska nema ogromnu Balkan zajednicu kao DACH, ali ljudi koji su tamo često posebno žele stabilan dodir s domovinom: vijesti, sport i domaći program.',
    introLocal: 'Suomessa Balkan-yhteisö ei ole yhtä suuri kuin DACH-maissa, mutta yhteys kotimaan kanaviin, uutisiin ja urheiluun on tärkeä.',
    angleBks: 'Za Finsku je važna niša: Helsinki, Turku i Tampere, studenti, stručnjaci i porodice koje žele jednostavan IPTV bez kablovske.',
    angleLocal: 'For Finland, the niche matters: Helsinki, Turku and Tampere, students, professionals and families who want simple IPTV without cable.',
    cities: [
      { label: 'Helsinki', id: 'helsinki', note: 'Balkan IPTV Helsinki' },
      { label: 'Turku', id: 'turku', note: 'EXYU IPTV Turku' },
      { label: 'Tampere', id: 'tampere', note: 'Domaći kanali' },
      { label: 'Vantaa', id: 'vantaa', note: 'Smart TV i Fire TV' },
      { label: 'Espoo', id: 'espoo', note: 'Sport i Catch TV' },
      { label: 'Oulu', id: 'oulu', note: 'Balkan TV online' },
      { label: 'Raisio', id: 'raisio', note: 'BKS zajednica' },
      { label: 'Jyväskylä', id: 'jyvaskyla', note: 'IPTV za dijasporu' }
    ],
    providersBks: 'Elisa, Telia, DNA: testiraj zbog Wi-Fi signala i udaljenosti',
    providersLocal: 'Elisa, Telia, DNA: testaa Wi-Fi ja yhteys',
    sportBks: 'U Finskoj je najvažnije da stream bude stabilan kada se navečer gleda sport ili porodični program.',
    sportLocal: 'In Finland, stable streaming matters most for evening sports and family programming.',
    deviceBks: 'Fire TV Stick i Smart TV su najjednostavniji, Android Box je bolji ako želiš detaljno podešavanje.',
    deviceLocal: 'Fire TV Stick and Smart TV are simplest; Android Box is better for detailed setup.',
    benefitOneBks: 'Za Helsinki i Turku',
    benefitOneLocal: 'Helsingille ja Turulle',
    benefitTwoBks: 'Mala zajednica, jak kontakt s domovinom',
    benefitTwoLocal: 'Small community, strong home connection',
    benefitThreeBks: 'Podrška za uređaj',
    benefitThreeLocal: 'Device support'
  }),
  makeCountry({
    slug: 'norveska',
    flag: '🇳🇴',
    footerName: 'Norveška',
    localName: 'Norge',
    bksName: 'Norveškoj',
    languageLabel: 'Norsk',
    image: '/images/countries/deutschland-geraete.webp',
    imageAlt: 'EXYU IPTV Norveška Oslo Bergen Stavanger',
    seoTitle: 'EXYU IPTV Norveška | Balkan TV za Oslo, Bergen i Stavanger',
    seoDescription: 'EXYU IPTV Norveška za Oslo, Bergen, Stavanger, Trondheim i Balkan dijasporu: domaći kanali, sport, Catch TV i instalacija.',
    eyebrowBks: 'IPTV Norveška',
    eyebrowLocal: 'IPTV Norge',
    titleBks: 'EXYU IPTV u Norveškoj za Oslo, Bergen, Stavanger i Trondheim',
    titleLocal: 'EXYU IPTV i Norge for Oslo, Bergen, Stavanger og Trondheim',
    introBks: 'Norveška ima rasutu dijasporu i duge udaljenosti. IPTV mora raditi stabilno kod kuće, bez satelita i bez komplikovanog podešavanja.',
    introLocal: 'In Norway, the diaspora is spread across long distances. IPTV needs to work reliably at home without satellite or complicated setup.',
    angleBks: 'Za Norvešku su važne udaljenosti, stabilan internet i gledanje vikendom kada se porodica okupi.',
    angleLocal: 'For Norway, distance, stable internet and weekend family viewing are the main focus.',
    cities: [
      { label: 'Oslo', id: 'oslo', note: 'Balkan IPTV Oslo' },
      { label: 'Bergen', id: 'bergen', note: 'EXYU IPTV Bergen' },
      { label: 'Stavanger', id: 'stavanger', note: 'Domaći kanali' },
      { label: 'Trondheim', id: 'trondheim', note: 'Sport i Catch TV' },
      { label: 'Drammen', id: 'drammen', note: 'Bosnian TV Norway' },
      { label: 'Kristiansand', id: 'kristiansand', note: 'Smart TV i Fire TV' },
      { label: 'Fredrikstad', id: 'fredrikstad', note: 'Balkan TV online' },
      { label: 'Tromsø', id: 'tromso', note: 'IPTV za dijasporu' }
    ],
    providersBks: 'Telenor, Telia, Altibox: testiraj kod kuće u večernjem terminu',
    providersLocal: 'Telenor, Telia, Altibox: test at home in the evening',
    sportBks: 'U Norveškoj se često gleda vikendom ili navečer, pa je bitno da se kanali brzo otvaraju.',
    sportLocal: 'In Norway, people often watch on weekends or evenings, so channels need to open quickly.',
    deviceBks: 'Smart TV i Android Box su dobri za kuće, Fire TV Stick za stanove i sobe.',
    deviceLocal: 'Smart TV and Android Box suit homes; Fire TV Stick suits apartments and rooms.',
    benefitOneBks: 'Za Oslo i Bergen',
    benefitOneLocal: 'For Oslo and Bergen',
    benefitTwoBks: 'Sport uprkos udaljenosti',
    benefitTwoLocal: 'Sports despite distance',
    benefitThreeBks: 'Jednostavno podešavanje',
    benefitThreeLocal: 'Simple setup'
  }),
  makeCountry({
    slug: 'hollandija',
    flag: '🇳🇱',
    footerName: 'Hollandija',
    localName: 'Nederland',
    bksName: 'Hollandiji',
    languageLabel: 'Nederlands',
    image: '/images/countries/deutschland-catch-tv.webp',
    imageAlt: 'EXYU IPTV Hollandija Amsterdam Rotterdam Den Haag',
    seoTitle: 'EXYU IPTV Hollandija | Balkan TV za Amsterdam, Rotterdam i Den Haag',
    seoDescription: 'EXYU IPTV Hollandija/Nizozemska za Amsterdam, Rotterdam, Den Haag i Balkan dijasporu: domaći kanali, sport, Catch TV i instalacija.',
    eyebrowBks: 'IPTV Hollandija',
    eyebrowLocal: 'IPTV Nederland',
    titleBks: 'EXYU IPTV u Hollandiji za Amsterdam, Rotterdam, Den Haag i Utrecht',
    titleLocal: 'EXYU IPTV in Nederland voor Amsterdam, Rotterdam, Den Haag en Utrecht',
    introBks: 'Hollandija je praktična za IPTV jer mnogi već imaju brz internet, ali treba dobro podesiti aplikaciju, EPG i uređaj za stabilan sport.',
    introLocal: 'In Nederland hebben veel mensen snel internet, maar app, EPG and device setup still need to be right for stable sports viewing.',
    angleBks: 'Za Hollandiju su bitni Amsterdam, Rotterdam i Den Haag, ali i porodice koje žive po manjim gradovima i žele domaće kanale bez satelita.',
    angleLocal: 'For the Netherlands, Amsterdam, Rotterdam and The Hague matter, but also families in smaller cities who want home channels without satellite.',
    cities: [
      { label: 'Amsterdam', id: 'amsterdam', note: 'Balkan IPTV Amsterdam' },
      { label: 'Rotterdam', id: 'rotterdam', note: 'Serbian IPTV Netherlands' },
      { label: 'Den Haag', id: 'den-haag', note: 'EXYU IPTV Den Haag' },
      { label: 'Utrecht', id: 'utrecht', note: 'Domaći kanali' },
      { label: 'Eindhoven', id: 'eindhoven', note: 'Sport i Catch TV' },
      { label: 'Tilburg', id: 'tilburg', note: 'Smart TV i Fire TV' },
      { label: 'Groningen', id: 'groningen', note: 'Balkan TV online' },
      { label: 'Breda', id: 'breda', note: 'IPTV za dijasporu' }
    ],
    providersBks: 'KPN, Ziggo, Odido: testiraj aplikaciju i Wi-Fi',
    providersLocal: 'KPN, Ziggo, Odido: test app and Wi-Fi',
    sportBks: 'U Hollandiji je brz internet čest, ali za sport je bitan i uređaj, aplikacija i stabilan Wi-Fi.',
    sportLocal: 'Fast internet is common in the Netherlands, but sports still depend on device, app and stable Wi-Fi.',
    deviceBks: 'Smart TV i Android Box su odlični za kuću, Fire TV Stick za fleksibilno gledanje.',
    deviceLocal: 'Smart TV and Android Box are great at home, Fire TV Stick for flexible viewing.',
    benefitOneBks: 'Za Amsterdam i Rotterdam',
    benefitOneLocal: 'Voor Amsterdam en Rotterdam',
    benefitTwoBks: 'Domaći kanali bez satelita',
    benefitTwoLocal: 'Channels from home without satellite',
    benefitThreeBks: 'Podešavanje EPG-a i favorita',
    benefitThreeLocal: 'EPG and favorites setup'
  }),
  makeCountry({
    slug: 'exyu',
    flag: '🏳️',
    footerName: 'EXYU region',
    localName: 'Bosna, Hrvatska, Srbija, Makedonija i Slovenija',
    bksName: 'EXYU region',
    languageLabel: 'EXYU',
    image: '/images/countries/deutschland-sportabend.webp',
    imageAlt: 'EXYU IPTV zajednicka stranica za region',
    seoTitle: 'EXYU IPTV | Bosna, Hrvatska, Srbija, Makedonija i Slovenija TV kanali',
    seoDescription: 'EXYU IPTV zajednička stranica za Bosnu, Hrvatsku, Srbiju, Makedoniju i Sloveniju: domaći kanali, sport, filmovi, Catch TV i instalacija.',
    eyebrowBks: 'EXYU IPTV region',
    eyebrowLocal: 'EXYU region',
    titleBks: 'EXYU IPTV za Bosnu, Hrvatsku, Srbiju, Makedoniju i Sloveniju',
    titleLocal: 'EXYU IPTV za cijeli region na jednom mjestu',
    introBks: 'Ova stranica povezuje cijeli region: bosanske, hrvatske, srpske, makedonske i slovenske kanale, sport, filmove, serije i Catch TV.',
    introLocal: 'Jedna stranica za region: Bosna, Hrvatska, Srbija, Makedonija, Slovenija, sport, filmovi, serije i Catch TV.',
    angleBks: 'Zajednička EXYU stranica služi kao glavno čvorište za korisnike koji ne traže samo jednu zemlju, nego cijeli regionalni TV paket.',
    angleLocal: 'Ovo je hub stranica za sve koji žele regionalni paket, a ne samo jednu zemlju ili jednu grupu kanala.',
    cities: [
      { label: 'Bosna i Hercegovina', id: 'bosna', note: 'Bosanski kanali IPTV' },
      { label: 'Hrvatska', id: 'hrvatska', note: 'Hrvatski kanali IPTV' },
      { label: 'Srbija', id: 'srbija', note: 'Srpski kanali IPTV' },
      { label: 'Makedonija', id: 'makedonija', note: 'Makedonski kanali IPTV' },
      { label: 'Slovenija', id: 'slovenija', note: 'Slovenski kanali IPTV' },
      { label: 'Crna Gora', id: 'crna-gora', note: 'Crnogorski kanali' },
      { label: 'Dijaspora', id: 'dijaspora', note: 'EXYU TV u inostranstvu' },
      { label: 'Sport', id: 'sport-region', note: 'Sport i Catch TV' }
    ],
    providersBks: 'Region i dijaspora: najvažniji su stabilan internet i pravi uređaj',
    providersLocal: 'Region i dijaspora: stabilan internet i pravi uređaj',
    sportBks: 'Za region je sport centralan: derbiji, reprezentacije, evropska takmičenja i emisije koje se često gledaju porodično.',
    sportLocal: 'Sport je srce EXYU gledanja: derbiji, reprezentacije, evropska takmičenja i porodično gledanje.',
    deviceBks: 'EXYU paket najbolje radi kada se uređaj podesi za grupe kanala, favorite, EPG i Catch TV.',
    deviceLocal: 'Za EXYU paket je bitno dobro složiti grupe kanala, favorite, EPG i Catch TV.',
    benefitOneBks: 'Sve zemlje na jednom mjestu',
    benefitOneLocal: 'Cijeli region na jednom mjestu',
    benefitTwoBks: 'Sport, filmovi i domaći program',
    benefitTwoLocal: 'Sport, filmovi i domaći program',
    benefitThreeBks: 'Glavna stranica za internu SEO mrežu',
    benefitThreeLocal: 'Glavno čvorište za EXYU linkove',
    extraGuides: [
      ...relatedDachGuides,
      {
        href: '/blog/kako-gledati-exyu-kanale-u-inostranstvu/',
        labelBks: 'EXYU kanali u inostranstvu',
        labelLocal: 'EXYU kanali u inostranstvu',
        textBks: 'Vodič za dijasporu koja želi kanale iz cijelog regiona.',
        textLocal: 'Vodič za gledanje regiona van Balkana.'
      }
    ],
    faqOneBks: 'Da. Ova stranica je napravljena kao zajednički ulaz za ljude koji žele kanale iz više EXYU zemalja.',
    faqOneLocal: 'Da. Ovo je zajednički ulaz za kanale iz više EXYU zemalja.',
    faqTwoBks: 'Najbolje je koristiti Android Box ili Smart TV aplikaciju ako želiš uredne grupe kanala, EPG i favorite.',
    faqTwoLocal: 'Android Box ili Smart TV aplikacija su najbolji za grupe, EPG i favorite.'
  })
];

export function getCountryPage(slug: string) {
  return countryPages.find((page) => page.slug === slug);
}
