export function normalizeInternalURL(url: string): string {
  return url
    .replace('https://www.exyukanali.tv', 'https://exyukanali.tv')
    .replace('http://www.exyukanali.tv', 'https://exyukanali.tv')
    .replace('http://exyukanali.tv', 'https://exyukanali.tv');
}
