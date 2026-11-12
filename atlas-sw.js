/* Team Jura Atlas 5.8 · separate Atlas-only service worker.                 *
 * Data and tile sources: https://github.com/rolux/gtadb.org (CC BY 4.0).
 * Do not cache or scrape GTAWeb, Google Maps, or unrelated third parties.
 */
const APP='team-jura-atlas-v41', SHELL=APP+'-shell60',TILES=APP+'-tiles',DATA=APP+'-data';
const SITE_FILES=['./index.html','./atlas.html','./atlas-online.html','./atlas-vi.html','./atlas-toolkit.html','./atlas-toolkit.js','./atlas-catalog.html','./atlas-catalog.js','./atlas-catalog.json','./atlas-catalog.csv','./atlas-collections.json','./atlas-schema.json','./atlas-completion.html','./atlas-completion.js','./atlas-test-center.html','./atlas-test-center.js','./atlas-checklist.html','./atlas-checklist.css','./atlas-checklist.js','./atlas-verification.html','./atlas-verification.js','./atlas-pack-format.html','./atlas-location-pack-example.json','./atlas.css','./atlas.js','./atlas-navigation.js','./atlas-road-core.js','./atlas-3d.js','./road-graph-example.json','./atlas-route-core.js','./atlas-sources.js','./atlas-calibration.html','./atlas-intelligence.js','./atlas-credits.html','./project.html','./elario.html','./jura-pages.css','./gtadb-v5.json','./gtadb-v6.json'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(SHELL);await Promise.allSettled(SITE_FILES.map(async file=>{const r=await fetch(new URL(file,new URL('.',self.location.href)),{cache:'reload'});if(r.ok)await cache.put(new URL(file,new URL('.',self.location.href)),r)}));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('team-jura-atlas-v4')&&![SHELL,TILES,DATA].includes(k)).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url),selfUrl=new URL(self.registration.scope);
 const tile=url.hostname==='raw.githubusercontent.com'&&url.pathname.startsWith('/rolux/gtadb.org/main/maps/tiles/');
 const data=url.hostname==='raw.githubusercontent.com'&&/^\/rolux\/gtadb\.org\/main\/map\/data\/[56]\/landmarks\.json$/.test(url.pathname);
 if(tile){event.respondWith((async()=>{const cache=await caches.open(TILES);const cached=await cache.match(req)||(url.pathname.includes('/cyber,1/')?await cache.match(req,{ignoreSearch:true}):null);if(cached)return cached;try{const response=await fetch(req);if(response.ok||response.type==='opaque')await cache.put(req,response.clone());return response}catch{return cached||Response.error()}})());return}
 if(data){event.respondWith((async()=>{const cache=await caches.open(DATA);const found=await cache.match(req,{ignoreSearch:true});if(found&&!url.searchParams.has('atlas_check')&&!url.searchParams.has('update'))return found;try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}catch{return found||Response.error()}})());return}
 if(url.origin!==selfUrl.origin)return;
 const recognized=SITE_FILES.some(p=>new URL(p,new URL('.',self.location.href)).pathname===url.pathname);
 if(!recognized)return;
 event.respondWith((async()=>{const c=await caches.open(SHELL);try{const r=await fetch(req);if(r.ok)await c.put(req,r.clone());return r}catch{return await c.match(req,{ignoreSearch:true})||Response.error()}})());
});
