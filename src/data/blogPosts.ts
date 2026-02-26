export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'android-box-iptv-instalacija',
    title: 'Kako instalirati IPTV na Android Box - kompletni vodic',
    excerpt: 'Naucite kako brzo instalirati IPTV aplikaciju na Android TV Box, uz jasne korake od preuzimanja do prvog pokretanja.',
    content: 'U ovom vodicu pokazujemo kako instalirati IPTV aplikaciju na Android Box uredaj. Proces je jednostavan i traje svega nekoliko minuta.',
    date: '2026-01-15',
    category: 'Instalacija',
    readTime: '5 min'
  },
  {
    slug: 'fire-tv-stick-iptv-instalacija',
    title: 'Kako instalirati IPTV na Amazon Fire TV Stick - kompletni vodic',
    excerpt: 'Pratite jednostavne korake za instalaciju IPTV aplikacije na Fire TV Stick i postavljanje liste kanala bez komplikacija.',
    content: 'Amazon Fire TV Stick je medu najpopularnijim uredajima za streaming. U ovom vodicu objasnjavamo instalaciju i osnovno podesavanje IPTV-a.',
    date: '2026-01-10',
    category: 'Instalacija',
    readTime: '4 min'
  },
  {
    slug: 'kako-instalirati-iptv-na-samsung-tv',
    title: 'Kako instalirati IPTV na Samsung TV - korak po korak',
    excerpt: 'Detaljan vodic za instalaciju IPTV aplikacija na Samsung Smart TV uredajima sa preporucenim postavkama za stabilan stream.',
    content: 'Samsung Smart TV uredaji podrzavaju vise IPTV aplikacija. U ovom clanku pokrivamo instalaciju i konfiguraciju najcesce koristenih rjesenja.',
    date: '2026-01-05',
    category: 'Instalacija',
    readTime: '6 min'
  },
  {
    slug: 'najbolji-iptv-box-2026',
    title: 'Najbolji IPTV Box u 2026 - kompletna usporedba',
    excerpt: 'Usporedujemo najpopularnije IPTV Box uredaje i pomazemo vam da odaberete model koji najbolje odgovara vasim navikama gledanja.',
    content: 'Ako trazite najbolji IPTV Box, usporedujemo kljucne opcije i njihove prednosti kako biste lakse donijeli odluku.',
    date: '2026-02-20',
    category: 'Uredaji',
    readTime: '8 min'
  },
  {
    slug: 'sta-je-iptv-i-kako-radi',
    title: 'Sta je IPTV i kako radi - sve sto trebate znati',
    excerpt: 'Objasnjavamo sto je IPTV, kako funkcionira i koje su glavne prednosti u odnosu na tradicionalnu kabelsku televiziju.',
    content: 'IPTV je tehnologija prijenosa TV sadrzaja putem interneta. U clanku objasnjavamo osnove rada, prednosti i moguce izazove.',
    date: '2026-02-18',
    category: 'Vodic',
    readTime: '6 min'
  },
  {
    slug: 'iptv-vs-kabelska-televizija',
    title: 'IPTV vs kabelska televizija - sto je bolje',
    excerpt: 'Usporedba IPTV-a i kabelske TV kroz cijenu, fleksibilnost, kvalitetu slike i dostupnost sadrzaja za dijasporu.',
    content: 'U ovom tekstu usporedujemo IPTV i kabelsku televiziju kako biste odabrali opciju koja bolje odgovara vasem budzetu i potrebama.',
    date: '2026-02-15',
    category: 'Vodic',
    readTime: '7 min'
  },
  {
    slug: 'kako-poboljsati-kvalitetu-iptv-streama',
    title: 'Kako poboljsati kvalitetu IPTV streama - 10 savjeta',
    excerpt: 'Prakticni savjeti za manje bufferiranja i stabilniji IPTV stream, od mreze i rutera do postavki aplikacije.',
    content: 'Ako imate problema sa zamrzavanjem slike, ovdje su provjereni koraci za poboljsanje kvalitete IPTV streama.',
    date: '2026-02-12',
    category: 'Savjeti',
    readTime: '5 min'
  },
  {
    slug: 'legalnost-iptv-u-njemackoj',
    title: 'Legalnost IPTV-a u Njemackoj, Austriji i Svicarskoj',
    excerpt: 'Pregled pravnog okvira IPTV-a u DACH regiji i kljucne informacije koje trebate znati prije odabira usluge.',
    content: 'Tema legalnosti IPTV-a je kompleksna. Ovdje sazimamo osnovne smjernice i razlike izmedu legalnih i rizicnih scenarija.',
    date: '2026-02-08',
    category: 'Pravno',
    readTime: '6 min'
  },
  {
    slug: 'najbolji-sportski-kanali-exyu-iptv',
    title: 'Najbolji sportski kanali na EXYU IPTV',
    excerpt: 'Popis najtrazenijih sportskih kanala na EXYU IPTV-u za nogomet, kosarku, borilacke sportove i jos mnogo toga.',
    content: 'EXYU IPTV nudi siroku ponudu sportskih kanala za regiju i dijasporu. U clanku izdvajamo najgledanije opcije.',
    date: '2026-02-05',
    category: 'Kanali',
    readTime: '4 min'
  },
  {
    slug: 'kako-gledati-exyu-kanale-u-inostranstvu',
    title: 'Kako gledati EXYU kanale u inostranstvu - dijaspora vodic',
    excerpt: 'Saznajte kako gledati EXYU kanale iz inostranstva uz stabilnu vezu, pravilnu aplikaciju i optimizirane IPTV postavke.',
    content: 'Ako zivite u inostranstvu i zelite gledati domace kanale, ovaj vodic pokriva najvaznije korake za brzo postavljanje.',
    date: '2026-02-01',
    category: 'Vodic',
    readTime: '5 min'
  }
];
