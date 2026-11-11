/* Team Jura Atlas 5.3. Original user interface and map controls.
 * GTADB landmark data and tiles © GTADB.org and contributors, CC BY 4.0.
 * GTADB repo: https://github.com/rolux/gtadb.org
 * We request the published GitHub repository, NOT GTADB's production media server.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const UPSTREAM='https://raw.githubusercontent.com/rolux/gtadb.org/main/';
const APP='team-jura-atlas-v41';
const CATEGORIES={
 collectible:['Collectibles','#e0f08c'],vehicle:['Vehicle spawns','#85ccff'],property:['Properties','#d5baff'],weapon:['Weapons & equipment','#ffc58a'],activity:['Activities & events','#89e3b4'],
 gunstore:['Gun shops · candidate','#ffc06d'],modshop:['Mod shops · candidate','#8ed6ee'],dealer:['Vehicle dealers · candidate','#a9cbff'],fuel:['Gas stations','#c7f3a4'],safehouse:['Safehouses · candidate','#d4b8f1'],marina:['Marinas','#80dbe4'],garage_site:['Garage buildings · candidate','#a8e3c1'],business_site:['Business sites · candidate','#ecd096'],
 landmark:['Landmarks','#f6c97f'],transport:['Transport','#71ddeb'],shop:['Shops','#f28c75'],food:['Food & drinks','#ffbc78'],hotel:['Hotels & homes','#eaa5ca'],nature:['Nature','#8fdfa8'],leisure:['Activities','#b9a8f5'],government:['Government','#88aefa'],office:['Offices','#81c7c1'],industry:['Industry','#d4a18a'],utility:['Utilities','#e1d17a'],other:['Other research','#bdc5d3'],user:['My pins','#ffd4a0']
};
// GTADB's mapping reference: maps/maps.js, tileSetRanges and zeroX/zeroY = 16384.
// Maps are 32768 game coordinate units wide; z0 displays them at 1/32 scale.
const BOUNDS={
 satellite:[[1,0,2,2],[2,1,5,5],[5,3,10,10],[11,7,20,20],[23,15,41,41],[47,31,83,83]],
 hybrid:[[1,0,2,2],[2,1,5,4],[5,3,11,9],[10,7,22,19],[20,15,45,39],[41,31,90,79]],
 terrain:[[1,0,2,2],[2,1,5,5],[5,3,10,10],[11,7,20,20],[23,15,41,41],[47,31,83,83]],
 roadmap:[[1,0,2,2],[2,1,5,4],[5,3,11,9],[10,7,22,19],[20,15,45,39],[41,31,90,79]],
 radar:[[1,0,2,2],[2,1,5,5],[5,3,10,10],[11,7,20,20],[23,15,41,41],[47,31,83,83]],
 'cyber,1':[[0,0,2,3],[1,1,4,6],[2,2,9,12],[5,5,19,24],[10,10,39,49],[21,21,79,99]],
 'dupzor,51':[[0,0,2,2],[0,1,4,5],[0,2,9,11],[0,4,19,23],[0,8,38,47],[0,17,77,94]],
 'yanis,15':[[0,0,2,2],[0,1,4,5],[0,2,9,11],[0,4,19,23],[0,8,38,47],[0,17,77,95]],
 'yanis,17':[[0,0,3,3],[1,1,6,6],[2,2,12,12],[5,5,25,24],[10,10,51,49],[21,21,103,99]]
};
const LAYERS={
 '5':[['radar','In-game radar'],['satellite','Satellite'],['terrain','Terrain'],['roadmap','Roadmap'],['hybrid','Hybrid']],
 '6':[['yanis,17','Leonida · YANIS 17'],['yanis,15','Leonida · YANIS 15'],['dupzor,51','Leonida · DUPZOR'],['cyber,1','Leonida · CYBER']]
};
const loadStore=(key,fallback)=>{try{let s=localStorage.getItem(key);return s?JSON.parse(s):fallback}catch{return fallback}};
const store=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{toast('Storage is unavailable or full. Export your progress to save it.')}};
let progress=loadStore('jura3-progress',{}),favorites=loadStore('jura-atlas-favorites',{}),routes=loadStore('jura-atlas-routes',{'5':[],'6':[]});
// Import earlier Atlas pin positions once. The old GTA V map used (x+4096,y+4096) pixels.
let previousPins=loadStore('jura32-pins',[]);
let personal=loadStore(APP+'-pins',null);
if(!Array.isArray(personal))personal=Array.isArray(previousPins)?previousPins.filter(p=>p&&['5','6'].includes(p.game)&&Number.isFinite(p.x)&&Number.isFinite(p.y)).map(p=>({...p,x:p.game==='5'?p.x-4096:p.x,y:p.game==='5'?p.y-4096:p.y,category:'user',source:'My pin'})):[];
if(!progress||typeof progress!=='object'||Array.isArray(progress))progress={};
if(!favorites||typeof favorites!=='object'||Array.isArray(favorites))favorites={};
if(!routes||typeof routes!=='object'||Array.isArray(routes))routes={'5':[],'6':[]};
const persist=()=>{store('jura3-progress',progress);store('jura-atlas-favorites',favorites);store('jura-atlas-routes',routes);store(APP+'-pins',personal)};
let mode='story',game='5',showUnverified=true,datasets={'5':[],'6':[]},dataOrigins={'5':'Loading…','6':'Loading…'},active={'5':null,'6':null},styles={'5':'radar','6':'yanis,17'},page=0,tab='Find',onlyUnfound=false,onlyFavorites=false,showPins=true,selected=null,addPinMode=false;
let deepLinkOpened=false;
let pendingPinCategory='user',packRecords=[],camera={x:0,y:0,z:1},canvas=$('atlasCanvas'),ctx=canvas.getContext('2d'),width=0,height=0,dpr=1,paintPending=false,hitRegions=[],tileStore=new Map(),tilesLoaded=0,tilesErrors=0,lastNotice='',offlineStop=false,offlineBusy=false;
const MIN_Z=0,MAX_Z=5.2;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function announce(s){lastNotice=s;$('mapStatus').textContent=s}
function toast(s){announce(s)}
function dataNotice(message){$('dataStatus').textContent=message;$('dataDot').classList.toggle('ready',!!datasets[game].length)}
function tagsFrom(v){return Array.isArray(v)?v.filter(t=>typeof t==='string').slice(0,30):[]}
function classify(tags,name){const t=tags.join(' ').toLowerCase(),n=name.toLowerCase();
 if(/transportation|#metro|#bus|#airport|#marina|railway|bridge|station|airport|tunnel|pier/.test(t+' '+n))return'transport';
 if(/restaurant|#food|#bar|#nightclub|cafe|diner/.test(t+' '+n))return'food';
 if(/#gas|#guns|#modshop|#supermarket|retail|service|pharmacy|shop|garage|store|bank/.test(t+' '+n))return'shop';
 if(/residential|hotel|#safehouse|housing|apartment/.test(t+' '+n))return'hotel';
 if(/natural|agriculture|mountain|lake|beach|river|forest|cave/.test(t+' '+n))return'nature';
 if(/leisure|entertainment|stadium|racetrack|arena|#tennis|#golf|recreation/.test(t+' '+n))return'leisure';
 if(/government|police|military|public/.test(t))return'government';
 if(/office|corporate/.test(t))return'office';
 if(/industrial|construction|factory|warehouse/.test(t))return'industry';
 if(/utilities|electric|power station|water tower/.test(t+' '+n))return'utility';
 if(/landmark|monument|religious/.test(t))return'landmark';
 return'other';
}
function normalize(input,g){const out=[];if(!input||typeof input!=='object')return out;
 const pairs=Array.isArray(input)?input.map(v=>[v.id,v]):Object.entries(input);
 for(const [key,v] of pairs){let name,x,y,tags,category;if(Array.isArray(v)){name=v[0];[x,y]=Array.isArray(v[1])?v[1]:[null,null];tags=tagsFrom(v[6]);category=classify(tags,String(name||''))}
 else if(v&&typeof v==='object'){name=v.name;x=v.x;y=v.y;tags=tagsFrom(v.tags);category=CATEGORIES[v.category]?v.category:classify(tags,String(name||''))}
 else continue;if(!Number.isFinite(x)||!Number.isFinite(y)||typeof name!=='string')continue;
 const id=String(key).startsWith('gtadb-')?String(key):'gtadb-'+g+'-'+key;
 const analysis=window.JuraLandmarks?.inspect(name,tags,g)||null;
 const specific=analysis?.category;
 const preserved=!!(v&&typeof v==='object'&&!Array.isArray(v)&&v.category&&CATEGORIES[v.category]);
 if(!preserved&&specific&&CATEGORIES[specific])category=specific;
 out.push({id,game:g,name:name.slice(0,180),x,y,category,tags,
    uncertain:!!analysis?.uncertain||g==='6',confidence:analysis?.confidence||(g==='6'?'provisional':'mapped'),
    evidence:analysis?.evidence||'GTADB',detail:analysis?.detail||'',landmarkId:String(key).replace(/^gtadb-[56]-/,''),
    source:'GTADB.org + contributors · CC BY 4.0'});
 }
 out.sort((a,b)=>a.name.localeCompare(b.name));return out;
}
function maybeOpenDeepLink(){
 if(deepLinkOpened)return;
 const id=new URLSearchParams(location.search).get('place');
 if(!id||!/^gtadb-[56]-L\d+$/.test(id))return;
 const target=datasets[game].find(r=>r.id===id);
 if(target){deepLinkOpened=true;choosePlace(target)}
}
function routeScope(){return game==='6'?'6':mode==='online'?'online':'5'}
function doneKey(r){return game==='5'&&mode==='online'?'online:'+r.id:r.id}
function records(){
 const custom=personal.filter(p=>p.game===game&&(game==='6'||(p.scope||'story')===mode));
 const packed=packRecords.filter(p=>p.game===game&&(game==='6'||p.scope==='both'||p.scope===mode));
 return [...datasets[game],...packed,...custom];
}
function specialized(kind){return records().filter(p=>kind==='collections'?p.category==='collectible':kind==='vehicles'?p.category==='vehicle':kind==='properties'?p.category==='property':false)}
const enabled=()=>active[game]||new Set(Object.keys(CATEGORIES));
function matches(){const query=$('search').value.trim().toLowerCase(),categories=enabled();return records().filter(r=>categories.has(r.category)&&(showUnverified||!r.uncertain)&&(!onlyUnfound||!progress[doneKey(r)])&&(!onlyFavorites||favorites[r.id])&&(!query||[r.name,r.id,r.category,...(r.tags||[])].join(' ').toLowerCase().includes(query)))}
function btn(label,callback,cls=''){const b=document.createElement('button');b.type='button';b.textContent=label;if(cls)b.className=cls;b.onclick=callback;return b}
function showTab(which){tab=which;for(const t of ['Find','Services','Collections','Vehicles','Route','Pins']){const on=t===which;$('tab'+t).classList.toggle('selected',on);$('tab'+t).setAttribute('aria-selected',String(on));$('panel'+t).classList.toggle('hidden',!on)}if(which==='Services')renderServices();if(which==='Route')renderRoute();if(which==='Pins')renderPins();if(which==='Collections'||which==='Vehicles')renderSpecial(which)}
const LEGEND_GROUPS=[
 ['Explore world',['landmark','nature','transport','government','industry','utility','other']],
 ['Game-related places · verify use',['gunstore','modshop','dealer','fuel','safehouse','marina','garage_site','business_site']],
 ['Buildings & activities',['hotel','shop','food','office','leisure','property','activity']],
 ['Special locations',['collectible','vehicle','weapon','user']]
];
function renderServices(){
 const items=records().filter(r=>window.JuraLandmarks?.isService(r) && (showUnverified||!r.uncertain));
 const root=$('serviceList');if(!root)return;root.replaceChildren();
 const needle=$('serviceSearch')?.value.trim().toLowerCase()||'';
 const cat=$('serviceType')?.value||'all';
 const filtered=items.filter(r=>(cat==='all'||r.category===cat)&&(!needle||[r.name,r.category,...(r.tags||[])].join(' ').toLowerCase().includes(needle)));
 $('serviceCount').textContent=filtered.length.toLocaleString()+' mapped candidate sites · '+items.length.toLocaleString()+' total';
 for(const r of filtered.slice(0,120))root.append(card(r));
 if(filtered.length>120){const p=document.createElement('p');p.className='hint';p.textContent='Showing first 120 sites. Refine your search or use the map legend to find more.';root.append(p)}
 if(!filtered.length){const p=document.createElement('p');p.className='hint';p.textContent='No mapped service candidates found. Update GTADB data, or change your filters.';root.append(p)}
}
function renderLegend(){
 const counts={};for(const r of records())counts[r.category]=(counts[r.category]||0)+1;
 const root=$('legend');root.replaceChildren();const chosen=enabled();
 for(const [name,keys] of LEGEND_GROUPS){if(!keys.some(k=>counts[k]))continue;
  const group=document.createElement('details');group.className='legend-group';group.open=true;
  const summary=document.createElement('summary');summary.textContent=name;group.append(summary);
  for(const cat of keys){if(!counts[cat])continue;const [title,color]=CATEGORIES[cat],on=chosen.has(cat);
   const row=document.createElement('div');row.className='legend-row';
   const toggle=btn(`${title} · ${counts[cat].toLocaleString()}`,()=>{
    if(!active[game])active[game]=new Set(Object.keys(CATEGORIES));
    if(active[game].has(cat))active[game].delete(cat);else active[game].add(cat);
    page=0;render();announce(`${title} ${active[game].has(cat)?'shown':'hidden'} on map`);
   });toggle.className='legend-choice';toggle.setAttribute('aria-pressed',String(on));toggle.title=`${on?'Hide':'Show'} ${title} pins`;
   const dot=document.createElement('i');dot.style.background=color;toggle.prepend(dot);
   const only=btn('Only',()=>{active[game]=new Set([cat]);page=0;render();announce('Showing only '+title+' on map');},'legend-only');
   row.append(toggle,only);group.append(row);
  }root.append(group);
 }
}
function choosePlace(place){selected=place;showPins=true;$('togglePins').textContent='📍 Pins on';$('togglePins').setAttribute('aria-pressed','true');
 camera.x=place.x;camera.y=place.y;camera.z=Math.max(3.4,camera.z);camera.z=clamp(camera.z,MIN_Z,MAX_Z);
 updateSelected();schedulePaint();announce('Showing '+place.name+' on the '+(game==='5'?'GTA V':'GTA VI')+' map');
 if(innerWidth<=700){$('sidebar').classList.add('mobile-collapsed');window.scrollTo({top:0,behavior:'smooth'})}
}
function updateSelected(){const card=$('selectedCard');if(!selected||selected.game!==game){card.classList.add('hidden');return}card.classList.remove('hidden');$('selectedName').textContent=selected.name;
 $('selectedInfo').textContent=(CATEGORIES[selected.category]?.[0]||'Location')+' · X '+selected.x.toFixed(0)+' · Y '+selected.y.toFixed(0)+(selected.confidence?' · '+selected.confidence.toUpperCase():(selected.uncertain?' · UNVERIFIED':''))+(selected.evidence?' · Evidence: '+selected.evidence:'')+(selected.detail?' · '+selected.detail:'')+' · '+(selected.source||'My pin');
 $('selectedFound').textContent=progress[doneKey(selected)]?'✓ Found (undo)':'Mark found';$('selectedRoute').textContent=routeIds().includes(selected.id)?'− Remove route':'+ Route';
}
function routeIds(){return Array.isArray(routes[routeScope()])?routes[routeScope()]:[]}
function routeRecords(){const by=new Map(records().map(r=>[r.id,r]));return routeIds().map(id=>by.get(id)).filter(Boolean)}
function toggleRoute(r){routes[routeScope()]=routeIds().includes(r.id)?routeIds().filter(id=>id!==r.id):[...routeIds(),r.id];persist();render();updateSelected()}
function toggleFound(r){progress[doneKey(r)]=!progress[doneKey(r)];persist();render();updateSelected()}
function card(r){const d=document.createElement('article');d.className='result'+(selected?.id===r.id?' selected':'');const head=document.createElement('div');head.className='result-head';const title=document.createElement('strong');title.textContent=(progress[doneKey(r)]?'✓ ':'')+r.name;const f=btn(favorites[r.id]?'★':'☆',()=>{favorites[r.id]=!favorites[r.id];persist();render()},'fav');f.title='Favorite';head.append(title,f);
 const desc=document.createElement('small');desc.textContent=(CATEGORIES[r.category]?.[0]||'Other')+(r.confidence?' · '+r.confidence.toUpperCase():(r.uncertain?' · Unverified':''))+(r.evidence?' · '+r.evidence:'')+' · '+r.source;
 const actions=document.createElement('div');actions.className='result-actions';actions.append(btn('📍 Find',()=>choosePlace(r),'primary'),btn(progress[doneKey(r)]?'✓ Found':'Found',()=>toggleFound(r)),btn(routeIds().includes(r.id)?'− Route':'+ Route',()=>toggleRoute(r)));d.append(head,desc,actions);return d;
}
function renderFind(){const all=matches(),root=$('results');root.replaceChildren();$('resultCount').textContent=all.length.toLocaleString()+' matching places';$('foundCount').textContent=records().filter(r=>progress[doneKey(r)]).length.toLocaleString()+' found';
 const PER_PAGE=25, pages=Math.max(1,Math.ceil(all.length/PER_PAGE));page=clamp(page,0,pages-1);for(const r of all.slice(page*PER_PAGE,(page+1)*PER_PAGE))root.append(card(r));if(!all.length){const p=document.createElement('p');p.className='hint';p.textContent='No places match. Turn a category on, clear search, or update your GTADB data.';root.append(p)}$('pageStatus').textContent=(page+1)+' / '+pages;$('prev').disabled=page===0;$('next').disabled=page>=pages-1;
}
function renderRoute(){const root=$('routeList'),list=routeRecords();root.replaceChildren();$('routeCount').textContent=list.length;if(!list.length){const p=document.createElement('p');p.className='hint';p.textContent='No stops yet. Find a place, then tap + Route.';root.append(p)}
 for(let i=0;i<list.length;i++){const r=list[i],d=document.createElement('article');d.className='result';const name=document.createElement('strong');name.textContent=(i+1)+'. '+r.name;const actions=document.createElement('div');actions.className='result-actions';actions.append(btn('↑',()=>moveStop(i,-1)),btn('↓',()=>moveStop(i,1)),btn('Find',()=>choosePlace(r)),btn('−',()=>toggleRoute(r)));d.append(name,actions);root.append(d)}
}
function moveStop(i,delta){const list=[...routeIds()],j=i+delta;if(j<0||j>=list.length)return;[list[i],list[j]]=[list[j],list[i]];routes[routeScope()]=list;persist();render()}
function renderPins(){const root=$('pinsList');root.replaceChildren();const list=personal.filter(p=>p.game===game&&(game==='6'||(p.scope||'story')===mode));if(!list.length){const p=document.createElement('p');p.className='hint';p.textContent='No custom pins for this game yet.';root.append(p)}for(const r of list){const d=card(r);d.append(btn('Delete pin',()=>{if(!confirm('Delete this pin?'))return;personal=personal.filter(p=>p.id!==r.id);routes[routeScope()]=routeIds().filter(id=>id!==r.id);if(selected?.id===r.id)selected=null;persist();render()}));root.append(d)}}

function renderSpecial(which){
 const cat=which==='Collections'?'collectible':'vehicle',root=$(which==='Collections'?'collectionList':'vehicleList');
 const data=specialized(which.toLowerCase());root.replaceChildren();
 const count=$(which==='Collections'?'collectionCount':'vehicleCount');count.textContent=data.length?`${data.length.toLocaleString()} saved / licensed coordinate records`:'No verified coordinate dataset installed';
 if(!data.length){const note=document.createElement('p');note.className='hint';note.textContent=which==='Collections'?'GTADB landmarks do not include complete collectible sets. Add your own pin or import a permitted coordinate pack. Do not mistake landmarks for collectibles.':'GTADB landmarks are not verified vehicle spawn positions. Add a personal spawn or import a properly licensed source dataset.';root.append(note);return}
 for(const r of data.slice(0,150)){root.append(card(r))}
 if(data.length>150){const note=document.createElement('p');note.className='hint';note.textContent='Showing the first 150. Use search and map legend to narrow the collection.';root.append(note)}
}
function beginSpecialPin(cat){pendingPinCategory=cat;addPinMode=true;showTab(cat==='collectible'?'Collections':cat==='vehicle'?'Vehicles':'Pins');announce('Tap the '+(game==='6'?'Leonida':'Los Santos')+' map to save a '+(cat==='vehicle'?'vehicle spawn':cat)+' location.');if(innerWidth<=700){$('sidebar').classList.add('mobile-collapsed');window.scrollTo({top:0,behavior:'smooth'})}}
function validPackRow(r,src){
 if(!r||typeof r!=='object'||!['5','6'].includes(r.game)||!Number.isFinite(r.x)||!Number.isFinite(r.y)||!CATEGORIES[r.category]||!['collectible','vehicle','property','weapon','activity','landmark','transport','shop','food','hotel','nature','leisure','government','office','industry','utility','other'].includes(r.category)||typeof r.name!=='string'||!r.name.trim())return null;
 if(r.game==='6'&&r.scope==='online')return null;
 return {id:'pack-'+src.id+'-'+String(r.id||r.name).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,70),game:r.game,name:r.name.slice(0,160),x:r.x,y:r.y,category:r.category,scope:r.game==='6'?'story':r.scope==='online'?'online':r.scope==='both'?'both':'story',source:src.attribution.slice(0,110),uncertain:!!r.uncertain,tags:Array.isArray(r.tags)?r.tags.filter(t=>typeof t==='string').slice(0,12):[]}
}
function importPackObject(pack){
 if(!pack||typeof pack!=='object'||!Array.isArray(pack.records)||pack.records.length>12000||typeof pack.id!=='string'||!/^[a-zA-Z0-9_-]{3,40}$/.test(pack.id)||typeof pack.license!=='string'||!['CC BY 4.0','CC0','MIT','Public Domain','Original / authorized'].includes(pack.license)||typeof pack.attribution!=='string'||pack.attribution.trim().length<3)throw Error('Pack must name its source, license and records. See sample format.');
 const normalized=pack.records.map(r=>validPackRow(r,pack)).filter(Boolean);if(!normalized.length)throw Error('No valid coordinates found in this pack.');
 const existing=loadStore('jura-atlas-v5-packs',{});existing[pack.id]={id:pack.id,license:pack.license,attribution:pack.attribution,sourceUrl:String(pack.sourceUrl||'').slice(0,500),records:normalized};store('jura-atlas-v5-packs',existing);readPacks();return normalized.length;
}
function readPacks(){const packs=loadStore('jura-atlas-v5-packs',{});packRecords=Object.values(packs).flatMap(v=>Array.isArray(v.records)?v.records:[]);if($('packCount'))$('packCount').textContent=packRecords.length.toLocaleString()+' imported locations';render()}
async function readPack(file){if(!file)return;try{if(file.size>2500000)throw Error('Maximum pack size is 2.5 MB');const payload=JSON.parse(await file.text());const n=importPackObject(payload);toast(`${n} source-attributed records imported. Check the locations on their correct game maps.`)}catch(e){toast('Could not import locations: '+e.message)}finally{$('packFile').value=''}}
function render(){renderLegend();renderServices();renderFind();renderRoute();renderPins();renderSpecial('Collections');renderSpecial('Vehicles');updateSelected();schedulePaint()}
function switchGame(g){if(!['5','6','online'].includes(g))return;mode=g==='online'?'online':'story';game=g==='6'?'6':'5';selected=null;addPinMode=false;$('game5').classList.toggle('active',g==='5');$('game6').classList.toggle('active',g==='6');$('gameOnline').classList.toggle('active',g==='online');$('game5').setAttribute('aria-pressed',String(g==='5'));$('game6').setAttribute('aria-pressed',String(g==='6'));$('gameOnline').setAttribute('aria-pressed',String(g==='online'));$('mapTitle').textContent=g==='6'?'GTA VI · Leonida':g==='online'?'GTA Online · Los Santos':'GTA V · Los Santos';$('mapSubtitle').textContent=g==='6'?'GTADB VI · provisional landmarks, NOT confirmed game locations':g==='online'?'Shared GTA V terrain · separate Online markers and progress':'GTADB GTA V · Story map landmarks';
 $('layer').replaceChildren();for(const [key,label] of LAYERS[game])$('layer').add(new Option(label,key));$('layer').value=styles[game];$('search').value='';onlyUnfound=false;onlyFavorites=false;showUnverified=true;$('showUnverified').checked=true;$('hideFound').checked=false;$('favoritesOnly').checked=false;page=0;fitGame();render();dataNotice(datasets[game].length?datasets[game].length.toLocaleString()+' landmarks · '+dataOrigins[game]:'Getting GTA '+game+' locations…');
 try{history.replaceState(null,'','#game'+g)}catch{}announce(g==='online'?'Online mode: GTA V base landmarks, with Online markers and progress kept separate.':'GTA '+game+' map and GTA '+game+' landmarks selected.');
}
function sourceUrl(g,style,z,tx,ty){return `${UPSTREAM}maps/tiles/${g}/${style}/${z}/${z},${ty},${tx}.jpg`}
function within(style,z,x,y){const r=BOUNDS[style]?.[z];return !!r&&x>=r[0]&&x<=r[2]&&y>=r[1]&&y<=r[3]}
function imageFor(style,z,x,y){if(!within(style,z,x,y))return null;const u=sourceUrl(game,style,z,x,y);let t=tileStore.get(u);if(t)return t;
 t={state:'loading',img:new Image(),last:Date.now()};tileStore.set(u,t);t.img.decoding='async';t.img.onload=()=>{t.state='ok';tilesLoaded++;schedulePaint();if(tilesLoaded===1)announce('Map artwork loaded from licensed GTADB repository tiles.');};t.img.onerror=()=>{t.state='error';tilesErrors++;if(tilesErrors===8&&tilesLoaded===0)announce('Map tiles are unavailable. Search and pins still work; connect online and try another map view.');schedulePaint()};t.img.src=u;
 if(tileStore.size>800){for(const [k,v] of tileStore){if(tileStore.size<=650)break;if(v.state!=='loading')tileStore.delete(k)}}return t;
}
function scale(){return 2**camera.z/32}
function toScreen(x,y){const s=scale();return{x:width/2+(x-camera.x)*s,y:height/2+(camera.y-y)*s}}
function fromScreen(x,y){const s=scale();return{x:camera.x+(x-width/2)/s,y:camera.y-(y-height/2)/s}}
function fitGame(){const area=game==='5'?[-4550,-4750,4800,8150]:[-12800,-10400,7200,8500];const [x0,y0,x1,y1]=area;camera.x=(x0+x1)/2;camera.y=(y0+y1)/2;
 const s=Math.max(.04,Math.min((Math.max(width,350)-90)/(x1-x0),(Math.max(height,420)-140)/(y1-y0)));camera.z=clamp(Math.log2(s*32),0,5);schedulePaint()}
function zoomBy(delta,x=width/2,y=height/2){const before=fromScreen(x,y);camera.z=clamp(camera.z+delta,MIN_Z,MAX_Z);const after=fromScreen(x,y);camera.x+=before.x-after.x;camera.y+=before.y-after.y;schedulePaint()}
function schedulePaint(){if(paintPending)return;paintPending=true;requestAnimationFrame(()=>{paintPending=false;draw()})}
function resize(){const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;const oldW=width,oldH=height;width=rect.width;height=rect.height;dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);if(!oldW||!oldH)fitGame();schedulePaint()}
function fallbackTile(z,x,y,dx,dy,size){for(let p=z-1;p>=0;p--){const factor=2**(z-p),xx=Math.floor(x/factor),yy=Math.floor(y/factor);const parent=imageFor(styles[game],p,xx,yy);if(parent?.state!=='ok')continue;
  const src=256/factor,originX=(x-xx*factor)*src,originY=(y-yy*factor)*src;ctx.drawImage(parent.img,originX,originY,src,src,dx,dy,size+.5,size+.5);return true}return false}
function drawTiles(){const z=Math.min(5,Math.ceil(camera.z)),s=scale(),tile=256*2**(camera.z-z),offsetX=width/2-(camera.x+16384)*s,offsetY=height/2-(16384-camera.y)*s,style=styles[game],range=BOUNDS[style][z];
 const minX=Math.max(range[0],Math.floor(-offsetX/tile)-1),maxX=Math.min(range[2],Math.ceil((width-offsetX)/tile)+1),minY=Math.max(range[1],Math.floor(-offsetY/tile)-1),maxY=Math.min(range[3],Math.ceil((height-offsetY)/tile)+1);
 for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){let dx=offsetX+x*tile,dy=offsetY+y*tile,entry=imageFor(style,z,x,y);
  if(entry?.state==='ok')ctx.drawImage(entry.img,dx,dy,tile+.5,tile+.5);else if(!fallbackTile(z,x,y,dx,dy,tile)){ctx.fillStyle='#1f4050';ctx.fillRect(dx,dy,tile+.5,tile+.5);ctx.strokeStyle='#375769';ctx.strokeRect(dx,dy,tile,tile)}}
}
function drawRoute(){const list=routeRecords();if(list.length<2)return;ctx.save();ctx.lineWidth=3;ctx.strokeStyle='#ffc36d';ctx.setLineDash([9,7]);ctx.beginPath();for(let i=0;i<list.length;i++){const p=toScreen(list[i].x,list[i].y);if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y)}ctx.stroke();ctx.setLineDash([]);for(const [i,r] of list.entries()){const p=toScreen(r.x,r.y);if(p.x<0||p.x>width||p.y<0||p.y>height)continue;ctx.beginPath();ctx.fillStyle='#ffe09c';ctx.strokeStyle='#1b3441';ctx.lineWidth=2;ctx.arc(p.x,p.y,11,0,2*Math.PI);ctx.fill();ctx.stroke();ctx.fillStyle='#172936';ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.fillText(String(i+1),p.x,p.y+4)}ctx.restore()}
function pin(x,y,color,highlight=false,number=null){ctx.save();const r=highlight?13:10;ctx.shadowColor='#000b';ctx.shadowBlur=7;ctx.shadowOffsetY=2;ctx.beginPath();ctx.moveTo(x,y+14);ctx.bezierCurveTo(x-12,y+1,x-r,y-10,x,y-r);ctx.bezierCurveTo(x+r,y-10,x+12,y+1,x,y+14);ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=highlight?'#fff2bb':'#132b3c';ctx.lineWidth=highlight?3:1.5;ctx.stroke();ctx.beginPath();ctx.arc(x,y-2,3.2,0,2*Math.PI);ctx.fillStyle='#172734';ctx.fill();if(number!==null){ctx.fillStyle='#ffffff';ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.fillText(number,x,y+3)}ctx.restore()}
function cluster(x,y,count){const n=clamp(13+Math.log2(count)*2,16,24);ctx.save();ctx.shadowColor='#000a';ctx.shadowBlur=7;ctx.beginPath();ctx.arc(x,y,n,0,Math.PI*2);ctx.fillStyle='#244959';ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='#ffe0a3';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#ffe7b8';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText(count>999?'999+':String(count),x,y+4);ctx.restore();return n}
function drawMarkers(){hitRegions=[];if(!showPins&&!selected)return;const arr=showPins?matches():[],groups=new Map(),cell=44;
 for(const r of arr){const p=toScreen(r.x,r.y);if(p.x<-30||p.x>width+30||p.y<-30||p.y>height+30)continue;const k=Math.floor(p.x/cell)+':'+Math.floor(p.y/cell);let g=groups.get(k);if(!g){g={count:0,sumX:0,sumY:0,first:r,items:[]};groups.set(k,g)}g.count++;g.sumX+=p.x;g.sumY+=p.y;g.items.push([r,p])}
 for(const g of groups.values()){const x=g.sumX/g.count,y=g.sumY/g.count;if(g.count>1&&camera.z<4.25){const r=cluster(x,y,g.count);hitRegions.push({x,y,r:r+3,cluster:g.first});}else{for(const [r,p] of g.items){pin(p.x,p.y,CATEGORIES[r.category]?.[1]||'#f7c97b');hitRegions.push({x:p.x,y:p.y,r:17,record:r})}}}
 if(selected?.game===game){const p=toScreen(selected.x,selected.y);if(p.x>-30&&p.x<width+30&&p.y>-30&&p.y<height+30){pin(p.x,p.y,'#ffe7a8',true);hitRegions.push({x:p.x,y:p.y,r:22,record:selected})}}
}
function draw(){if(!width||!height)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#163441';ctx.fillRect(0,0,width,height);ctx.save();ctx.strokeStyle='#294a56';ctx.lineWidth=1;for(let x=0;x<width;x+=96){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke()}for(let y=0;y<height;y+=96){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke()}ctx.restore();drawTiles();drawRoute();drawMarkers()}
const pointers=new Map();let gesture=null;
function position(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{...position(e),start:position(e)});canvas.classList.add('dragging');if(pointers.size===2){const ps=[...pointers.values()];gesture={distance:Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y),zoom:camera.z};}else gesture=null});
canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const last=pointers.get(e.pointerId),p=position(e),dx=p.x-last.x,dy=p.y-last.y;last.x=p.x;last.y=p.y;last.travel=(last.travel||0)+Math.hypot(dx,dy);
 if(pointers.size===1){camera.x-=dx/scale();camera.y+=dy/scale();schedulePaint()}else if(pointers.size===2&&gesture){const ps=[...pointers.values()],distance=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);if(distance>2&&gesture.distance>2){camera.z=clamp(gesture.zoom+Math.log2(distance/gesture.distance),MIN_Z,MAX_Z);schedulePaint()}}});
function endPointer(e){const p=pointers.get(e.pointerId);if(!p)return;const wasSingle=pointers.size===1;const spot=position(e);pointers.delete(e.pointerId);if(!pointers.size)canvas.classList.remove('dragging');if(wasSingle&&(p.travel||0)<7)tapMap(spot);if(pointers.size<2)gesture=null}
canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);if(!pointers.size)canvas.classList.remove('dragging');gesture=null});
canvas.addEventListener('wheel',e=>{e.preventDefault();const p=position(e);zoomBy(e.deltaY<0?.28:-.28,p.x,p.y)},{passive:false});
canvas.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){zoomBy(.45);e.preventDefault()}else if(e.key==='-'){zoomBy(-.45);e.preventDefault()}else if(e.key.startsWith('Arrow')){const step=150/scale();if(e.key==='ArrowLeft')camera.x-=step;if(e.key==='ArrowRight')camera.x+=step;if(e.key==='ArrowUp')camera.y+=step;if(e.key==='ArrowDown')camera.y-=step;schedulePaint();e.preventDefault()}});
function tapMap(p){if(addPinMode){addPinMode=false;const at=fromScreen(p.x,p.y);let name=prompt('Name this pin:');if(!name||!name.trim()){toast('Pin creation cancelled.');return}name=name.trim().slice(0,120);const r={id:'user-'+game+'-'+Date.now(),game,name,x:at.x,y:at.y,tags:[],category:pendingPinCategory,scope:game==='6'?'story':mode,source:'My saved location',uncertain:false};personal.push(r);persist();active[game]=null;choosePlace(r);render();showTab(pendingPinCategory==='collectible'?'Collections':pendingPinCategory==='vehicle'?'Vehicles':'Pins');toast('Saved location placed on the map: '+name);return}
 for(let i=hitRegions.length-1;i>=0;i--){const h=hitRegions[i];if(Math.hypot(h.x-p.x,h.y-p.y)>h.r)continue;if(h.record)choosePlace(h.record);else if(h.cluster){const r=h.cluster;camera.x=r.x;camera.y=r.y;camera.z=clamp(camera.z+1.35,MIN_Z,MAX_Z);schedulePaint();announce('Zooming in to separate nearby locations.')}return}
 // A plain map tap stays on the map; no modal coordinate window.
 const at=fromScreen(p.x,p.y);announce('GTA '+game+' map · X '+at.x.toFixed(0)+' · Y '+at.y.toFixed(0)+' · Tap a marker to inspect it.');
}
async function cacheData(g,raw){try{const c=await caches.open(APP+'-data');const url=UPSTREAM+'map/data/'+g+'/landmarks.json';await c.put(url,new Response(JSON.stringify(raw),{headers:{'Content-Type':'application/json'}}))}catch{}}
async function getCachedData(g){try{const c=await caches.open(APP+'-data');const r=await c.match(UPSTREAM+'map/data/'+g+'/landmarks.json');if(r)return await r.json()}catch{}return null}
async function loadDataset(g,refresh=false){const localUrl='./gtadb-v'+g+'.json';if(!refresh){try{const r=await fetch(localUrl);if(r.ok){const v=normalize(await r.json(),g);if(v.length){datasets[g]=v;dataOrigins[g]='Offline starter';if(g===game){render();maybeOpenDeepLink();dataNotice(v.length+' starter locations · loading full database…')}}}}catch{}
 const cached=await getCachedData(g);if(cached){const v=normalize(cached,g);if(v.length>datasets[g].length){datasets[g]=v;dataOrigins[g]='Full cached GTADB database';if(g===game){render();maybeOpenDeepLink();dataNotice(v.length.toLocaleString()+' cached GTADB locations')}}}
 if(datasets[g].length>=500)return;
 }
 try{const u=UPSTREAM+'map/data/'+g+'/landmarks.json'+(refresh?'?update='+Date.now():'');const r=await fetch(u,{cache:refresh?'reload':'default'});if(!r.ok)throw Error('HTTP '+r.status);const raw=await r.json();const v=normalize(raw,g);if(v.length<100)throw Error('Insufficient source records');datasets[g]=v;dataOrigins[g]='Full GTADB database';await cacheData(g,raw);if(g===game){render();maybeOpenDeepLink();dataNotice(v.length.toLocaleString()+' GTADB GTA '+g+' locations loaded · map sites categorized');announce('GTADB GTA '+g+' source landmarks loaded. Inferred service types are not verified gameplay locations.')}}catch(e){if(g===game){render();dataNotice(datasets[g].length?datasets[g].length+' locally saved locations · cannot refresh':'Data unavailable offline');announce('Could not reach GitHub data source. Existing cached locations remain available.')}}
}
function offlineUrls(g,style){const urls=[];for(let z=0;z<=2;z++){const [minX,minY,maxX,maxY]=BOUNDS[style][z];for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++)urls.push(sourceUrl(g,style,z,x,y))}return urls}
async function saveOffline(){if(offlineBusy)return;offlineBusy=true;offlineStop=false;const g=game,style=styles[game];const list=offlineUrls(g,style);const buttonEl=$('saveOffline');buttonEl.disabled=true;$('stopOffline').classList.remove('hidden');let success=0,failed=0,completed=0;
 try{const cache=await caches.open(APP+'-tiles');const workers=Array.from({length:4},async()=>{while(!offlineStop){const index=completed++;if(index>=list.length)break;const url=list[index];try{const existing=await cache.match(url);if(existing){success++;}else{const response=await fetch(url,{mode:'no-cors',cache:'force-cache'});if(response.ok||response.type==='opaque'){await cache.put(url,response.clone());success++}else failed++;}}catch{failed++}if(index%3===0||index===list.length-1)$('offlineStatus').textContent=`Saving GTA ${g} ${style}: ${Math.min(completed,list.length)}/${list.length} · ${success} saved · ${failed} failed`;}});await Promise.all(workers);
 $('offlineStatus').textContent=offlineStop?`Download stopped. ${success} overview tiles available offline so far.`:`GTA ${g} ${style}: ${success}/${list.length} overview tiles cached. ${failed?'Some images failed; retry online.':'Overview offline ready; zoomed-in detail still downloads as you visit it.'}`;
 }catch(e){$('offlineStatus').textContent='Offline download not available on this browser: '+e.message}finally{offlineBusy=false;buttonEl.disabled=false;$('stopOffline').classList.add('hidden')}
}
function exportBackup(){const value={version:41,progress,favorites,routes,personal};const file=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(file),link=document.createElement('a');link.href=url;link.download='team-jura-atlas-backup.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Backup exported to your downloads.')}
async function importBackup(file){if(!file)return;try{if(file.size>3500000)throw Error('File is too large');const raw=JSON.parse(await file.text());if(!raw||typeof raw!=='object'||!raw.progress||!Array.isArray(raw.personal))throw Error('Invalid Team Jura backup');if(!confirm('Replace saved progress, routes, favorites and pins on this device?'))return;
 progress=Object.fromEntries(Object.entries(raw.progress).filter(([k,v])=>typeof k==='string'&&typeof v==='boolean').slice(0,30000));favorites=raw.favorites&&typeof raw.favorites==='object'?raw.favorites:{};routes=raw.routes&&typeof raw.routes==='object'?raw.routes:{'5':[],'6':[]};personal=raw.personal.filter(p=>p&&['5','6'].includes(p.game)&&typeof p.name==='string'&&Number.isFinite(p.x)&&Number.isFinite(p.y)).slice(0,5000).map(p=>({...p,name:p.name.slice(0,120),tags:[],category:'user'}));persist();render();toast('Backup imported.');}catch(e){toast('Could not import backup: '+e.message)}finally{$('importFile').value=''}}
function optimizeRoute(){const r=routeRecords();if(r.length<3)return toast('Add at least three stops to order them.');const rem=r.slice(1),sorted=[r[0]];while(rem.length){const last=sorted.at(-1);let best=0,dist=Infinity;for(let i=0;i<rem.length;i++){const d=(last.x-rem[i].x)**2+(last.y-rem[i].y)**2;if(d<dist){dist=d;best=i}}sorted.push(rem.splice(best,1)[0])}routes[routeScope()]=sorted.map(r=>r.id);persist();render();toast('Stops ordered by nearest straight-line distance (not street routing).')}
function fitRoute(){const r=routeRecords();if(!r.length)return toast('Add locations to your route first.');if(r.length===1)return choosePlace(r[0]);
 const xs=r.map(p=>p.x),ys=r.map(p=>p.y),xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(...ys),ymax=Math.max(...ys),dx=Math.max(180,xmax-xmin),dy=Math.max(180,ymax-ymin);camera.x=(xmin+xmax)/2;camera.y=(ymin+ymax)/2;camera.z=clamp(Math.log2(Math.min((width-120)/dx,(height-170)/dy)*32),0,5);schedulePaint();toast('Showing route on GTA '+game+' map.')}
function init(){if(!ctx){$('mapStatus').textContent='This browser does not support the HTML canvas map.';return}
 $('game5').onclick=()=>switchGame('5');$('game6').onclick=()=>switchGame('6');$('gameOnline').onclick=()=>switchGame('online');$('search').oninput=()=>{page=0;render()};$('allOn').onclick=()=>{active[game]=null;page=0;render();toast('All available categories on.')};$('allOff').onclick=()=>{active[game]=new Set();page=0;render();toast('All categories off. Select one to show it.')};
 $('hideFound').onchange=e=>{onlyUnfound=e.target.checked;page=0;render()};$('favoritesOnly').onchange=e=>{onlyFavorites=e.target.checked;page=0;render()};$('showUnverified').onchange=e=>{showUnverified=e.target.checked;page=0;render()};$('serviceSearch').oninput=renderServices;$('serviceType').onchange=renderServices;for(const t of ['Find','Services','Collections','Vehicles','Route','Pins'])$('tab'+t).onclick=()=>showTab(t);$('prev').onclick=()=>{page--;renderFind()};$('next').onclick=()=>{page++;renderFind()};$('layer').onchange=()=>{styles[game]=$('layer').value;tilesErrors=0;tilesLoaded=0;schedulePaint();announce('Loading GTA '+game+' '+$('layer').selectedOptions[0].textContent+' map view…')};$('resetView').onclick=()=>{fitGame();announce('Showing the whole GTA '+game+' map.')};$('zoomIn').onclick=()=>zoomBy(.5);$('zoomOut').onclick=()=>zoomBy(-.5);
 $('togglePins').onclick=()=>{showPins=!showPins;$('togglePins').textContent=showPins?'📍 Pins on':'📍 Pins off';$('togglePins').setAttribute('aria-pressed',String(showPins));schedulePaint()};$('mobileTools').onclick=()=>{$('sidebar').classList.toggle('mobile-collapsed');if(!$('sidebar').classList.contains('mobile-collapsed'))$('sidebar').scrollIntoView({behavior:'smooth',block:'start'})};$('original').onclick=()=>window.open('https://map.gtadb.org/','_blank','noopener,noreferrer');
 $('closeSelected').onclick=()=>{selected=null;updateSelected();schedulePaint()};$('selectedFound').onclick=()=>{if(selected)toggleFound(selected)};$('selectedRoute').onclick=()=>{if(selected)toggleRoute(selected)};$('shareSelected').onclick=async()=>{
 if(!selected)return;
 if(!/^gtadb-[56]-L\d+$/.test(selected.id)){announce('Custom pins stay on your device. Export a backup to move them.');return}
 const page=game==='6'?'atlas-vi.html':mode==='online'?'atlas-online.html':'atlas.html';
 const u=new URL('./'+page,document.baseURI);u.searchParams.set('place',selected.id);
 try{await navigator.clipboard.writeText(u.href);announce('Shareable GTADB landmark link copied.')}catch{
  try{window.prompt('Copy the landmark link:',u.href)}catch{};
  announce('Share link displayed. Copy it to share this mapped landmark.');
 }
};$('addPin').onclick=()=>beginSpecialPin('user');$('addCollectible').onclick=()=>beginSpecialPin('collectible');$('addVehicle').onclick=()=>beginSpecialPin('vehicle');$('loadPack').onclick=()=>$('packFile').click();$('packFile').onchange=e=>readPack(e.target.files?.[0]);
 $('optimize').onclick=optimizeRoute;$('fitRoute').onclick=fitRoute;$('clearRoute').onclick=()=>{routes[routeScope()]=[];persist();render();toast('GTA '+game+' route cleared.')};$('copyRoute').onclick=async()=>{const s=routeRecords().map((r,i)=>`${i+1}. ${r.name} (X ${r.x.toFixed(0)}, Y ${r.y.toFixed(0)})`).join('\n');if(!s)return toast('No stops to copy.');try{await navigator.clipboard.writeText(s);toast('Route copied.')}catch{toast('Clipboard unavailable; use Export backup instead.')}};
 $('exportData').onclick=exportBackup;$('importData').onclick=()=>$('importFile').click();$('importFile').onchange=e=>importBackup(e.target.files?.[0]);$('refresh').onclick=async()=>{dataNotice('Checking GTADB GitHub source…');await Promise.all([loadDataset('5',true),loadDataset('6',true)]);render()};$('saveOffline').onclick=saveOffline;$('stopOffline').onclick=()=>{offlineStop=true;$('offlineStatus').textContent='Stopping after current tiles finish…'};
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){e.preventDefault();$('search').focus()}if(e.key==='Escape'){selected=null;addPinMode=false;updateSelected();schedulePaint()}});
 const observer=new ResizeObserver(resize);observer.observe(canvas);window.addEventListener('resize',resize);const start=document.body.dataset.startWorld||new URLSearchParams(location.search).get('world')|| (location.hash==='#game6'?'6':location.hash==='#gameonline'?'online':'5');switchGame(['5','6','online'].includes(start)?start:'5');
 const params=new URLSearchParams(location.search);const q=params.get('search'),cat=params.get('category');
 if(q)$('search').value=q.slice(0,100);
 if(cat&&CATEGORIES[cat]){active[game]=new Set([cat]);showTab('Services')}
 if(q||cat)render();readPacks();loadDataset('5');loadDataset('6');
 if('serviceWorker'in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./atlas-sw.js?v=53',{scope:'./'}).catch(()=>{});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
