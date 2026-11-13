/* Team Jura controlled, same-origin-only offline shell. No cross-origin tiles or iframe caching. */
const VERSION='team-jura-shell-70-preview-20261113';
const SHELL=['./','./index.html','./jura-refresh.css','./jura-refresh.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('team-jura-shell-')&&k!==VERSION)await caches.delete(k);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 // Do not intercept or cache GitHub Pages other sites, query APIs, iframe content, or third-party maps.
 if(!['document','script','style','image','font'].includes(req.destination))return;
 event.respondWith((async()=>{
  const cache=await caches.open(VERSION);
  try{const response=await fetch(req);if(response.ok && response.type==='basic')await cache.put(req,response.clone());return response;}
  catch{return (await cache.match(req))||(req.mode==='navigate'?await cache.match('./index.html'):Response.error());}
 })());
});
