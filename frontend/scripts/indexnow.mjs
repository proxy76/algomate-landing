/**
 * Tell IndexNow that URLs changed.
 *
 *   node scripts/indexnow.mjs https://algomate.ro/blog https://algomate.ro/blog/<slug>
 *
 * IndexNow is the push protocol Bing, Yandex, Seznam, Naver and others share:
 * one ping reaches all of them. Bing is the one that matters here — it is the
 * index behind ChatGPT search and Copilot, so a post Bing has not crawled is a
 * post those assistants cannot cite. Google does not take part; it reads the
 * sitemap.
 *
 * The key is public by design. The file named after it, at the site root
 * (public/<key>.txt), is how the search engines verify that whoever pings for
 * algomate.ro controls algomate.ro. Changing the key means renaming that file.
 *
 * Run after a deploy, with the URLs that deploy added or changed.
 * deploy/publish-scheduled.sh does this on its own for scheduled posts.
 */

const KEY = 'ec48309018e5a8c4ea79177ea24f41ed';
const HOST = 'algomate.ro';

const urls = process.argv.slice(2).filter((u) => u.startsWith(`https://${HOST}/`));
if (urls.length === 0) {
  console.error('usage: indexnow.mjs <https://algomate.ro/...> [more URLs]');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200 = accepted, 202 = accepted and the key is still being verified.
if (res.status === 200 || res.status === 202) {
  console.log(`  ✓ IndexNow accepted ${urls.length} URL(s) (${res.status})`);
} else {
  console.error(`  ✗ IndexNow answered ${res.status}: ${await res.text()}`);
  process.exit(1);
}
