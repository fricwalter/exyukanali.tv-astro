export interface CountryPage {
  slug: string;
  flag: string;
  footerName: string;
  localName: string;
  bksName: string;
  languageLabel: string;
  seo: {
    title: string;
    description: string;
  };
}

export const countryPages: CountryPage[] = [
  {
    slug: 'deutschland',
    flag: '🇩🇪',
    footerName: 'Deutschland',
    localName: 'Deutschland',
    bksName: 'Njemačka',
    languageLabel: 'Deutsch',
    seo: {
      title: 'EXYU IPTV Deutschland | Balkan TV, bosnische, serbische und kroatische Sender',
      description:
        'EXYU IPTV Deutschland für Balkan-Diaspora: bosnische, serbische und kroatische Sender, Sport, Smart TV, Fire TV Stick, Android Box und TiviMate.'
    }
  }
];

export function getCountryPage(slug: string) {
  return countryPages.find((page) => page.slug === slug);
}
