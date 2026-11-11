/* Cache ONLY files served from Team Jura's origin; never copy external game-map artwork. */
const NAME='team-jura-atlas-app-v4';
const PRELOAD=['./atlas.html','./atlas.css','./atlas.js','./atlas-credits.html','./gtadb-v5.json','./gtadb-v6.json'];
self.addEventListener('install',event=>event.waitUntil(caches.open(NAME).then(c=>Promise.allSettled(PRELOAD.map(u=>c.add(u)))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('team-jura-atlas-app-')&&k!==NAME).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;if(!PRELOAD.some(p=>new URL(p,self.registration.scope).href===url.href))return;event.respondWith(fetch(req).then(resp=>{if(resp.ok){let cloned=resp.clone();caches.open(NAME).then(c=>c.put(req,cloned)).catch(()=>{})}return resp}).catch(()=>caches.match(req).then(r=>r||Response.error())))});
