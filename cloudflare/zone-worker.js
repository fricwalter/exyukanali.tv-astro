const PAGES_ORIGIN = 'https://exyukanali-tv.pages.dev';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const legacyRedirects = new Map([
  ['/srpska-televizija-austrija', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/android-box-setup', '/blog/android-box-iptv-instalacija/'],
  ['/blog/balkanski-iptv-belgija-dijaspora', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/balkanski-iptv-velika-britanija-uk', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/bosanski-kanali-evropa-iptv-dijaspora', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/brzina-interneta', '/blog/kako-poboljsati-kvalitetu-iptv-streama/'],
  ['/blog/domaci-iptv-austrija-balkanski-kanali', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/ex-yu-kanali-iptv-streaming-1766134184426', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/ex-yu-tv-vrata-u-svijet-zabave-s-balkana-1766739636083', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/exyu-iptv-skandinavija-svedska-norveska', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/exyu-iptv-vodic-domaci-kanali-zabava-1766480437380', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/exyu-tv-iptv-streaming-vodic-1766826060598', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/fire-tv-stick-vodic', '/blog/fire-tv-stick-iptv-instalacija/'],
  ['/blog/hrvatski-kanali-iptv-zabava-1766160540596', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/hrvatski-kanali-svicarska-iptv-streaming-1766566836756', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/instalacija-smart-tv', '/instalacija/'],
  ['/blog/iphone-ipad-iptv', '/blog/exyu-iptv-iphone-ipad/'],
  ['/blog/iptv-balkan-francuska-domaca-tv', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/iptv-balkan-holandija-domaci-kanali', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/iptv-balkan-njemacka-domaci-kanali', '/blog/exyu-iptv-njemacka/'],
  ['/blog/iptv-dijaspora-svicarska-balkanski-kanali', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/kako-gledati-exyu-kanale-vpn-samsung-tv', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/mag-box-vodic', '/instalacija/'],
  ['/blog/srpski-kanali-iptv-streaming-1766134843086', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/srpski-kanali-online-vodic-iptv-streaming-1766394038877', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/'],
  ['/blog/srpski-kanali-u-njemackoj-iptv-1766307636687', '/blog/exyu-iptv-njemacka/'],
  ['/blog/srpski-kanali-u-njemackoj-iptv-streaming-1766381355169', '/blog/exyu-iptv-njemacka/'],
  ['/blog/sta-je-iptv', '/blog/sta-je-iptv-i-kako-radi/'],
  ['/blog/streaming-kvaliteta', '/blog/kako-poboljsati-kvalitetu-iptv-streama/'],
  ['/blog/tivimate-otkljucajte-puni-potencijal-vaseg-iptv-iskustva-1766653235148', '/blog/tivimate-postavke-za-exyu-iptv/'],
  ['/blog/vpn-iptv', '/blog/kako-gledati-exyu-kanale-u-inostranstvu/']
]);

function normalizeLegacyPath(pathname) {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function buildAdminBlockedResponse() {
  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Restricted</title>
  </head>
  <body>
    <h1>Restricted Area</h1>
    <p>Authentication is required to access this area.</p>
  </body>
</html>`,
    {
      status: 401,
      headers: {
        'cache-control': 'no-store',
        'content-type': 'text/html; charset=UTF-8',
        'www-authenticate': 'Basic realm="Restricted Area", charset="UTF-8"',
        'x-robots-tag': 'noindex, nofollow, noarchive'
      }
    }
  );
}

function redirect(url, targetPath, status = 301) {
  const target = new URL(targetPath, url.origin);
  target.search = url.search;
  return Response.redirect(target.toString(), status);
}

async function proxySeoApi(url, env) {
  const pagePath = url.searchParams.get('page_path') || '/';
  const target = `${env.SEO_API_URL}?path=${encodeURIComponent(pagePath)}`;
  const response = await fetch(target);
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(corsHeaders)) {
    headers.set(key, value);
  }

  headers.set('content-type', 'application/json; charset=UTF-8');

  return new Response(response.body, {
    status: response.status,
    headers
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const rawPathname = url.pathname;
    const normalizedPathname = normalizeLegacyPath(rawPathname);

    if (
      request.method === 'OPTIONS' &&
      (url.hostname === 'seo.exyukanali.tv' || normalizedPathname === '/seo')
    ) {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    if (url.hostname === 'seo.exyukanali.tv' || normalizedPathname === '/seo') {
      return proxySeoApi(url, env);
    }

    if (normalizedPathname === '/admin' || rawPathname.startsWith('/admin/')) {
      return buildAdminBlockedResponse();
    }

    const redirectTarget = legacyRedirects.get(normalizedPathname);
    if (redirectTarget) {
      return redirect(url, redirectTarget);
    }

    if (normalizedPathname === '/sitemap' || normalizedPathname === '/sitemap.xml') {
      return redirect(url, '/sitemap-index.xml');
    }

    if (
      (request.method === 'GET' || request.method === 'HEAD') &&
      rawPathname !== '/' &&
      !rawPathname.endsWith('/') &&
      !rawPathname.includes('.')
    ) {
      return redirect(url, `${rawPathname}/`);
    }

    return fetch(request);
  }
};
