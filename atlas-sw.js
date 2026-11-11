/* Team Jura Atlas 4.1 · separate Atlas-only service worker.                 *
 * Data and tile sources: https://github.com/rolux/gtadb.org (CC BY 4.0).
 * Do not cache or scrape GTAWeb, Google Maps, or unrelated third parties.
 */
const APP='team-jura-atlas-v41', SHELL=APP+'-shell',TILES=APP+'-tiles',DATA=APP+'-data';
const SITE_FILES=['./atlas.html','./atlas.css','./atlas.js','./atlas-credits.html','./gtadb-v5.json','./gtadb-v6.json'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(SHELL);await Promise.allSettled(SITE_FILES.map(async file=>{const r=await fetch(new URL(file,self.registration.scope.replace(/atlas\.html$/,'')),{cache:'reload'});if(r.ok)await cache.put(new URL(file,self.registration.scope.replace(/atlas\.html$/,'')),r)}));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('team-jura-atlas-v4')&&![SHELL,TILES,DATA].includes(k)).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url),selfUrl=new URL(self.registration.scope);
 const tile=url.hostname==='raw.githubusercontent.com'&&url.pathname.startsWith('/rolux/gtadb.org/main/maps/tiles/');
 const data=url.hostname==='raw.githubusercontent.com'&&/^\/rolux\/gtadb\.org\/main\/map\/data\/[56]\/landmarks\.json$/.test(url.pathname);
 if(tile){event.respondWith((async()=>{const cache=await caches.open(TILES);const cached=await cache.match(req,{ignoreSearch:true});if(cached)return cached;try{const response=await fetch(req);if(response.ok||response.type==='opaque')await cache.put(req,response.clone());return response}catch{return Response.error()}})());return}
 if(data){event.respondWith((async()=>{const cache=await caches.open(DATA);const found=await cache.match(req);if(found)return found;try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}catch{return Response.error()}})());return}
 if(url.origin!==selfUrl.origin)return;
 const recognized=SITE_FILES.some(p=>new URL(p,self.registration.scope.replace(/atlas\.html$/,'')).pathname===url.pathname);
 if(!recognized)return;
 event.respondWith((async()=>{const c=await caches.open(SHELL);try{const r=await fetch(req);if(r.ok)await c.put(req,r.clone());return r}catch{return await c.match(req,{ignoreSearch:true})||Response.error()}})());
});
