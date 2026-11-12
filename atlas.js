/* Team Jura Atlas 5.8 Explorer & Smart Routes Edition. Original user interface, map controls and licensed source overlays.
 * GTADB landmark data and tiles © GTADB.org and contributors, CC BY 4.0.
 * GTADB repo: https://github.com/rolux/gtadb.org
 * Tiles are requested from GTADB's publicly published tile host, with the
 * published source repository as a fallback. Attribution: atlas-credits.html.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const UPSTREAM='https://raw.githubusercontent.com/rolux/gtadb.org/main/';
const APP='team-jura-atlas-v41'; // Preserve storage keys and saved progress across upgrades
const CATEGORY_SYMBOLS={collectible:'◆',vehicle:'▰',property:'⌂',weapon:'✚',activity:'★',gunstore:'✚',modshop:'⚙',dealer:'▰',fuel:'◉',safehouse:'⌂',marina:'⚓',garage_site:'▣',business_site:'◆',landmark:'✦',transport:'➤',shop:'$',food:'♨',hotel:'⌂',nature:'✿',leisure:'★',government:'⚑',office:'▦',industry:'⚙',utility:'ϟ',other:'◇',user:'✚'};
const CATEGORIES={
 collectible:['Collectibles','#e0f08c'],vehicle:['Vehicle spawns','#85ccff'],property:['Properties','#d5baff'],weapon:['Weapons & equipment','#ffc58a'],activity:['Activities & events','#89e3b4'],
 gunstore:['Gun shops · candidate','#ffc06d'],modshop:['Mod shops · candidate','#8ed6ee'],dealer:['Vehicle dealers · candidate','#a9cbff'],fuel:['Fuel pumps / gas sites','#c7f3a4'],safehouse:['Safehouses · candidate','#d4b8f1'],marina:['Marinas','#80dbe4'],garage_site:['Garage buildings · candidate','#a8e3c1'],business_site:['Business sites · candidate','#ecd096'],
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
 '5':[['radar','In-game radar'],['satellite','Satellite'],['terrain','Terrain'],['roadmap','Roadmap'],['hybrid','Hybrid'],['uv','UV · illustrated blueprint (Team Jura)'],['uv2','UV II · illustrated paper (Team Jura)']],
 '6':[['scaly,view','Scaly View · YANIS 17 artwork'],['loki,view','Loki View · DUPZOR 51 artwork'],['yanis,17','YANIS V17 · Original'],['yanis,15','YANIS V15 · Original'],['dupzor,51','DUPZOR V51 · Original'],['cyber,1','CYBER · Legacy / fallback']]
};
// Add Team Jura UV artwork views without changing the verified six-source baseline.
const VI_UV_OPTIONS=[['uv','UV · Leonida blueprint (Team Jura)'],['uv2','UV II · Leonida paper (Team Jura)']];
/* Base views and published GTADB community add-on tiles.
 * The additional tile folders are *patches*, not complete independent worlds.
 * Rebuild the display by choosing the combined edge tiles, the interior patch
 * tiles, then the original base tiles elsewhere (GTADB maps/maps.js strategy).
 */
const GTADB_TILE_PATCHES={
 'aiwe,1':[[1,1,1,1],[2,3,2,3],[4,6,5,6],[9,12,10,13],[18,25,20,27],[37,50,41,55]],
 'martipk,5':[[1,2,1,2],[3,4,3,5],[6,9,7,11],[12,19,15,23],[24,39,31,46],[48,79,62,93]],
 'rickrick,3':[[1,1,2,2],[3,3,4,4],[6,6,9,9],[12,13,18,19],[24,26,36,39],[48,52,73,79]]
};
const PATCH_SET='aiwe,1,martipk,5,rickrick,3';
const MAP_FILTERS={
 uv:'grayscale(1) sepia(1) hue-rotate(176deg) saturate(2.4) brightness(1.12) contrast(1.28)',
 uv2:'grayscale(0.86) sepia(0.78) hue-rotate(-12deg) saturate(.7) brightness(1.22) contrast(1.10)',
 cyber:'hue-rotate(155deg) saturate(1.6) contrast(1.15)'
};
function mapView(style,g=game){
 if(g==='6'&&style==='scaly,view')return{base:'yanis,17',overlay:false,filter:'saturate(1.15) contrast(1.06)'};
 if(g==='6'&&style==='loki,view')return{base:'dupzor,51',overlay:false,filter:'saturate(.88) contrast(1.13) brightness(.96)'};
 // UV is our OWN presentation of licensed illustrations. GTA VI has no
 // confirmed official UV map; never label these as GTAWeb UV or in-game UV.
 if(style==='uv')return{base:g==='6'?'yanis,17':'radar',overlay:false,filter:MAP_FILTERS.uv};
 if(style==='uv2')return{base:g==='6'?'dupzor,51':'roadmap',overlay:false,filter:MAP_FILTERS.uv2};
 // 6.1 has no combined patch or updated overlay selections; only authored base tiles.
 if(g==='6'&&style==='cyber,1')return{base:'yanis,17',legacy:'cyber,1'};
 return{base:style,overlay:false};
}
function overlayTileStyle(base,z,x,y){
 let selection=base;
 for(const [name,ranges]of Object.entries(GTADB_TILE_PATCHES)){
  const [x0,y0,x1,y1]=ranges[z];
  if(x<x0||x>x1||y<y0||y>y1)continue;
  if(x===x0||x===x1||y===y0||y===y1)selection=base+','+PATCH_SET;
  else if(selection===base)selection=name;
 }
 return selection;
}
function sourceTileStyles(style,z,x,y,g=game){
 const v=mapView(style,g);
 const candidate=v.legacy||(v.overlay&&g==='6'?overlayTileStyle(v.base,z,x,y):v.base);
 const list=[candidate];
 if(v.legacy||candidate!==v.base)list.push(v.base);
 // The UV artwork is the licensed *illustrated GTA map* recolored by our
 // original blueprint treatment. If radar art is unavailable, substitute
 // another licensed, georeferenced illustration rather than bare blue tiles.
 if(g==='5'&&style==='uv')list.push('roadmap','satellite');
 if(g==='5'&&style==='uv2')list.push('radar','satellite');
 if(g==='6'&&style==='uv')list.push('yanis,15','dupzor,51');
 if(g==='6'&&style==='uv2')list.push('yanis,17','yanis,15');
 return [...new Set(list)];
}
const loadStore=(key,fallback)=>{try{let s=localStorage.getItem(key);return s?JSON.parse(s):fallback}catch{return fallback}};
const store=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{toast('Storage is unavailable or full. Export your progress to save it.')}};
let progress=loadStore('jura3-progress',{}),favorites=loadStore('jura-atlas-favorites',{}),routes=loadStore('jura-atlas-routes',{'5':[],'6':[]}),routeStarts=loadStore('jura58-route-starts',{});
// Import earlier Atlas pin positions once. The old GTA V map used (x+4096,y+4096) pixels.
let previousPins=loadStore('jura32-pins',[]);
let personal=loadStore(APP+'-pins',null);
if(!Array.isArray(personal))personal=Array.isArray(previousPins)?previousPins.filter(p=>p&&['5','6'].includes(p.game)&&Number.isFinite(p.x)&&Number.isFinite(p.y)).map(p=>({...p,x:p.game==='5'?p.x-4096:p.x,y:p.game==='5'?p.y-4096:p.y,category:'user',source:'My pin'})):[];
if(!progress||typeof progress!=='object'||Array.isArray(progress))progress={};
if(!favorites||typeof favorites!=='object'||Array.isArray(favorites))favorites={};
if(!routes||typeof routes!=='object'||Array.isArray(routes))routes={'5':[],'6':[]};
if(!routeStarts||typeof routeStarts!=='object'||Array.isArray(routeStarts))routeStarts={};
const persist=()=>{store('jura3-progress',progress);store('jura-atlas-favorites',favorites);store('jura-atlas-routes',routes);store('jura58-route-starts',routeStarts);store(APP+'-pins',personal)};
let navPlan=null,navPlanScope=null,overlayOpacity=Number(loadStore('jura60-overlay-opacity',100));if(!Number.isFinite(overlayOpacity))overlayOpacity=100;overlayOpacity=Math.max(0,Math.min(100,overlayOpacity));
let listOrder='name';let mode='story',game='5',showUnverified=true,datasets={'5':[],'6':[]},dataOrigins={'5':'Loading…','6':'Loading…'},active={'5':null,'6':null},styles={'5':'radar','6':'scaly,view'},page=0,tab='Find',onlyUnfound=false,onlyFavorites=false,showPins=true,selected=null,addPinMode=false;
// Atlas 5.5 source feeds: only source-published JSON; source scopes keep Story/Online separate.
let sourceRecords={},sourceStates={},sourceEnabled=loadStore('jura55-source-visible',{story:true,vi:true,atms:false,pumps:false,buses:false,towers:false});
if(!sourceEnabled||typeof sourceEnabled!=='object'||Array.isArray(sourceEnabled))sourceEnabled={story:true,vi:true};
let markerDensity='individual'; // Grouping removed in Atlas 6.1; all pins remain individually selectable.
let coordinateTarget=null;
let nearbyActive=false,nearbyLast=[],chooseRouteStartMode=false,pendingSourceReveal=new Set();
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
 out.push({id,game:g,markerColor:Array.isArray(v)&&typeof v[7]==='string'&&/^[0-9a-fA-F]{6}$/.test(v[7])?'#'+v[7]:typeof v?.markerColor==='string'&&/^#[0-9a-fA-F]{6}$/.test(v.markerColor)?v.markerColor:null,realWorld:Array.isArray(v)&&Array.isArray(v[4])&&v[4].length===2&&v[4].every(Number.isFinite)?v[4]:null,name:name.slice(0,180),address:Array.isArray(v)?String(v[3]||'').slice(0,220):String(v.address||'').slice(0,220),x,y,category,tags,
    uncertain:!!analysis?.uncertain||g==='6',confidence:analysis?.confidence||(g==='6'?'provisional':'mapped'),
    evidence:analysis?.evidence||'GTADB',detail:analysis?.detail||'',landmarkId:String(key).replace(/^gtadb-[56]-/,''),
    source:'GTADB.org + contributors · CC BY 4.0'});
 }
 out.sort((a,b)=>a.name.localeCompare(b.name));return out;
}
function maybeOpenDeepLink(){
 if(deepLinkOpened)return;
 const id=new URLSearchParams(location.search).get('place');
 if(!id||!/^[-a-zA-Z0-9_]{1,110}$/.test(id))return;
 const target=records().find(r=>r.id===id);
 if(target){deepLinkOpened=true;choosePlace(target)}
}
function routeScope(){return game==='6'?'6':mode==='online'?'online':'5'}
function doneKey(r){return game==='5'&&mode==='online'?'online:'+r.id:r.id}
const CHECKSET={'Spaceship Part':'story-spaceship-parts','Letter Scrap':'story-letter-scraps','Nuclear Waste':'story-nuclear-waste','Stunt Jump':'story-stunt-jumps','Under the Bridge':'story-under-bridges','Knife Flight':'story-knife-flights','Epsilon Tract':'story-epsilon-tracts'};
function syncedChecklist(r,done){if(r.sourceId!=='story'||mode!=='story'||!Number.isInteger(r.collectionSlot))return;const set=CHECKSET[r.collectionType];if(!set)return;try{const key='team-jura-checklist-v54';const raw=loadStore(key,{schema:1,checked:{}}),checked=raw.checked&&typeof raw.checked==='object'?raw.checked:{};const slot=set+':'+r.collectionSlot;if(done)checked[slot]=true;else delete checked[slot];localStorage.setItem(key,JSON.stringify({...raw,schema:1,checked,updated:new Date().toISOString()}))}catch{}}
function records(){
 const custom=personal.filter(p=>p.game===game&&(game==='6'||(p.scope||'story')===mode));
 const packed=packRecords.filter(p=>p.game===game&&(game==='6'||p.scope==='both'||p.scope===mode));
 const permitted=Object.entries(sourceRecords).filter(([id])=>sourceEnabled[id]&&window.JuraSources?.SOURCES[id]?.game===game&&(game==='6'||mode==='story'||window.JuraSources.SOURCES[id].scope==='both')).flatMap(([,rows])=>rows);
 return [...datasets[game],...permitted,...packed,...custom];
}
function specialized(kind){return records().filter(p=>kind==='collections'?p.category==='collectible':kind==='vehicles'?p.category==='vehicle':kind==='properties'?p.category==='property':false)}
const filterScope=()=>game==='6'?'6':mode==='online'?'5-online':'5-story';
const enabled=()=>active[filterScope()]||new Set(Object.keys(CATEGORIES));
function matches(){const query=$('search').value.trim().toLowerCase(),district=$('districtFilter').value.trim().toLowerCase(),categories=enabled(),hidden=namedHidden();return records().filter(r=>categories.has(r.category)&&passesNamedLayers(r,hidden)&&(showUnverified||!r.uncertain)&&(!onlyUnfound||!progress[doneKey(r)])&&(!onlyFavorites||favorites[r.id])&&(!query||[r.name,r.address||'',r.id,r.category,r.source||'',r.collectionType||'',...(r.tags||[])].join(' ').toLowerCase().includes(query))&&(!district||[r.name,r.district||'',...(r.tags||[])].join(' ').toLowerCase().includes(district)))}
function orderedMatches(){const list=matches();switch(listOrder){
 case 'category':list.sort((a,b)=>(CATEGORIES[a.category]?.[0]||a.category).localeCompare(CATEGORIES[b.category]?.[0]||b.category)||a.name.localeCompare(b.name));break;
 case 'nearest':list.sort((a,b)=>Math.hypot(a.x-camera.x,a.y-camera.y)-Math.hypot(b.x-camera.x,b.y-camera.y));break;
 case 'unfinished':list.sort((a,b)=>Number(!!progress[doneKey(a)])-Number(!!progress[doneKey(b)])||a.name.localeCompare(b.name));break;
 case 'region':list.sort((a,b)=>(a.district||a.name.split(',').slice(-1)[0]).localeCompare(b.district||b.name.split(',').slice(-1)[0])||a.name.localeCompare(b.name));break;
 default:list.sort((a,b)=>a.name.localeCompare(b.name));}
 return list;}
function exportVisibleCSV(){const rows=orderedMatches();if(!rows.length)return toast('No locations match your filters.');const safe=v=>{let s=String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'};
 const lines=[['Game','Name','Category','X','Y','Reference address','Status','Source'].map(safe).join(',')];for(const r of rows){lines.push([game==='6'?'GTA VI':mode==='online'?'GTA Online':'GTA V',r.name,CATEGORIES[r.category]?.[0]||r.category,r.x,r.y,r.address||'',r.uncertain?'Provisional / unverified':'Source mapped',r.source||''].map(safe).join(','));}
 const blob=new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`team-jura-${game==='6'?'leonida':mode==='online'?'online':'los-santos'}-locations.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1500);toast('Exported '+rows.length+' matching places with source and verification labels.');}
function btn(label,callback,cls=''){const b=document.createElement('button');b.type='button';b.textContent=label;if(cls)b.className=cls;b.onclick=callback;return b}
function showTab(which){tab=which;for(const t of ['Find','Services','Collections','Vehicles','Route','Pins']){const on=t===which;$('tab'+t).classList.toggle('selected',on);$('tab'+t).setAttribute('aria-selected',String(on));$('panel'+t).classList.toggle('hidden',!on)}if(which==='Services')renderServices();if(which==='Route')renderRoute();if(which==='Pins')renderPins();if(which==='Collections'||which==='Vehicles')renderSpecial(which)}
const LEGEND_EMOJIS={landmark:'📍',nature:'🌴',transport:'🚗',government:'🏛️',industry:'🏭',utility:'⚡',other:'🧭',hotel:'🏨',shop:'🛍️',food:'🍔',office:'🏢',leisure:'🎮',property:'🏠',activity:'🏁',collectible:'💎',vehicle:'🚙',weapon:'🔫',user:'📌',gunstore:'🔫',modshop:'🔧',dealer:'🚙',fuel:'⛽',safehouse:'🏡',marina:'⛵',garage_site:'🅿️',business_site:'🏢'};
// Each optional location switch is grounded in an actual coordinate record.
// The map does NOT claim that an inferred business is purchasable or an
// object is a verified GTA Online vehicle spawn. Missing categories stay hidden.
const layerText=r=>[r.name,r.collectionType||'',...(r.tags||[])].filter(Boolean).join(' ');
const hasText=(r,regex)=>regex.test(layerText(r));
const NAMED_LAYERS=[
 ['clovers','🍀 Clovers',r=>hasText(r,/\bclovers?\b|\blucky clover\b/i)],
 ['ammunation','🔫 Ammu-Nation',r=>hasText(r,/\bammu[- ]?nation\b/i)],
 ['vehicles','🚙 Vehicle spawns',r=>r.category==='vehicle'],
 ['owned-property','🏠 Mapped properties',r=>r.category==='property'],
 ['garages','🅿️ Garages / parking',r=>r.category==='garage_site'||hasText(r,/\bgarage\b|\bparking (?:lot|garage)\b/i)],
 ['collectibles','💎 Collectibles',r=>r.category==='collectible'],
 ['events','🎉 Events / activities',r=>r.category==='activity'],
 ['weapons','⚔️ Weapon sites',r=>r.category==='weapon'],
 ['gas','⛽ Fuel / gas stations',r=>r.category==='fuel'||hasText(r,/\bgas (?:station|pump)\b|\bfuel pump\b/i)],
 ['mods','🔧 Vehicle modification',r=>r.category==='modshop'||hasText(r,/\blos santos customs\b|\bmod shop\b/i)],
 ['shops','🛍️ Shops / markets',r=>r.category==='shop'||hasText(r,/\bsupermarket\b|\bmarketplace\b/i)],
 ['nightlife','🌃 Nightlife / bars',r=>hasText(r,/\bnightclub\b|\bbar(?:s)?\b|\bclub\b/i)],
 ['casino','🎰 Casino',r=>hasText(r,/\bcasino\b/i)],
 ['banks','🏦 Banks / ATMs',r=>hasText(r,/\bbank\b|\bATM\b/i)],
 ['police','🚓 Police / sheriff',r=>hasText(r,/\bpolice\b|\bsheriff\b/i)],
 ['medical','🏥 Hospitals / clinics',r=>hasText(r,/\bhospital\b|\bclinic\b|\bmedical center\b/i)],
 ['transport','🚉 Transport',r=>r.category==='transport'],
 ['airports','✈️ Airports / airfields',r=>hasText(r,/\bairfield\b|\bairport\b|\bairstrip\b/i)],
 ['marinas','⚓ Marinas / docks',r=>r.category==='marina'||hasText(r,/\bmarina\b|\bdock\b/i)],
 ['train','🚇 Trains / metro',r=>hasText(r,/\btrain\b|\bmetro\b|\bsubway\b|\brailway\b/i)],
 ['bridges','🌉 Bridges / tunnels',r=>hasText(r,/\bbridge\b|\btunnel\b/i)],
 ['stunt','🏁 Stunt jumps / races',r=>hasText(r,/\bstunt jump\b|\braceway\b|\brace track\b|\bknife flight\b/i)],
 ['safehouses','🏡 Safehouses',r=>r.category==='safehouse'||hasText(r,/\bsafehouse\b/i)],
 ['business','🏢 Business buildings',r=>r.category==='business_site'],
 ['broadcast','📡 Towers / masts',r=>hasText(r,/\bradio (?:tower|mast)\b|\bbroadcast tower\b|\bcell tower\b|\bmasts?\b/i)],
 ['nature','🌴 Nature / parks',r=>r.category==='nature'],
 ['photos','📷 Photo locations',r=>hasText(r,/\bphoto(?:graphy)?\b|\bsnapshot\b/i)]
];
let hiddenNamed=loadStore('jura62-named-layers',{'5-story':[], '5-online':[], '6':[]});
if(!hiddenNamed||typeof hiddenNamed!=='object'||Array.isArray(hiddenNamed))hiddenNamed={'5-story':[], '5-online':[], '6':[]};
function namedScope(){return game==='6'?'6':mode==='online'?'5-online':'5-story'}
function namedHidden(){return new Set(Array.isArray(hiddenNamed[namedScope()])?hiddenNamed[namedScope()]:[])}
function collectionLayerId(name){return 'collection:'+name.toLowerCase().trim()}
function layersForRows(rows){
 const result=NAMED_LAYERS.map(([id,title,predicate])=>({id,title,predicate,count:rows.filter(predicate).length})).filter(v=>v.count);
 const kinds=new Map();for(const r of rows){const name=typeof r.collectionType==='string'?r.collectionType.trim():'';if(name&&name.length<80)kinds.set(name,(kinds.get(name)||0)+1)}
 for(const [name,count]of [...kinds].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,32)){
  result.push({id:collectionLayerId(name),title:'🗂 '+name,count,predicate:r=>r.collectionType===name});
 }
 return result;
}
function passesNamedLayers(r,hidden=namedHidden()){if(!hidden.size)return true;if(r.collectionType&&hidden.has(collectionLayerId(r.collectionType)))return false;
 return !NAMED_LAYERS.some(([id,,predicate])=>hidden.has(id)&&predicate(r))}
function updateNamedLayerVisibility(ids,show){const hidden=namedHidden();const rows=records();
 if(show){
  // A switched-on layer must ACTUALLY display pins, including after All off.
  const chosen=layersForRows(rows).filter(l=>ids.includes(l.id));
  const parents=active[filterScope()];
  for(const r of rows){if(!chosen.some(l=>l.predicate(r)))continue;
   if(parents)parents.add(r.category);
   // Do not let a hidden broad group block an explicitly enabled sub-layer.
   for(const [id,,predicate] of NAMED_LAYERS){if(hidden.has(id)&&predicate(r))hidden.delete(id)}
  }
 }
 for(const id of ids){if(show)hidden.delete(id);else hidden.add(id)}
 hiddenNamed[namedScope()]=[...hidden];store('jura62-named-layers',hiddenNamed);page=0;render();announce(show?'Selected map layer pins shown.':'Selected map layer pins hidden.');}
function renderNamedLayers(){const root=$('namedLayers');if(!root)return;root.replaceChildren();const rows=records(),layers=layersForRows(rows),hidden=namedHidden();
 const q=($('namedLayerSearch')?.value||'').trim().toLowerCase();let rendered=0;
 for(const {id,title,count}of layers){if(q&&!title.toLowerCase().includes(q))continue;rendered++;
  const b=btn(`${title} · ${count.toLocaleString()}`,()=>{updateNamedLayerVisibility([id],hidden.has(id));},'named-layer-choice');
  b.setAttribute('aria-pressed',String(!hidden.has(id)));b.setAttribute('aria-label',(hidden.has(id)?'Show ':'Hide ')+title+' pins');root.append(b);
 }
 if(!rendered){const note=document.createElement('small');note.textContent=layers.length?'No matching layer names. Clear layer search.':'No named layers have mapped coordinates in this game yet.';root.append(note)}
 const count=$('namedLayerCount');if(count)count.textContent=`${layers.length} mapped layers · ${layers.filter(l=>!hidden.has(l.id)).length} enabled`;
}
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
 renderNamedLayers();
 const counts={};for(const r of records())counts[r.category]=(counts[r.category]||0)+1;
 const root=$('legend');root.replaceChildren();const chosen=enabled();
 for(const [name,keys] of LEGEND_GROUPS){if(!keys.some(k=>counts[k]))continue;
  const group=document.createElement('details');group.className='legend-group';group.open=true;
  const summary=document.createElement('summary');summary.textContent=name;group.append(summary);
  for(const cat of keys){if(!counts[cat])continue;const [title,color]=CATEGORIES[cat],on=chosen.has(cat);
   const row=document.createElement('div');row.className='legend-row';
   const toggle=btn(`${title} · ${counts[cat].toLocaleString()}`,()=>{
    if(!active[filterScope()])active[filterScope()]=new Set(Object.keys(CATEGORIES));
    if(active[filterScope()].has(cat))active[filterScope()].delete(cat);else active[filterScope()].add(cat);
    page=0;render();announce(`${title} ${active[filterScope()].has(cat)?'shown':'hidden'} on map`);
   });toggle.className='legend-choice';toggle.setAttribute('aria-pressed',String(on));toggle.title=`${on?'Hide':'Show'} ${title} pins`;
   const dot=document.createElement('i');dot.className='legend-symbol';dot.style.background=color;dot.textContent=LEGEND_EMOJIS[cat]||'📍';toggle.prepend(dot);
   const only=btn('Only',()=>{active[filterScope()]=new Set([cat]);page=0;render();announce('Showing only '+title+' on map');},'legend-only');
   row.append(toggle,only);group.append(row);
  }root.append(group);
 }
}
const VI_REGIONS=[
 ['Vice City','Neon city, beaches and neighborhoods'],
 ['Leonida Keys','Island chain, marinas and coastal waters'],
 ['Grassrivers','Wetlands, airboats and wildlife'],
 ['Port Gellhorn','Coastal settlement and port'],
 ['Ambrosia','Inland industry and agriculture'],
 ['Mount Kalaga National Park','Forests, trails and outdoor country']
];
function renderViRegions(){const box=$('viRegions');if(!box)return;box.classList.toggle('hidden',game!=='6');if(game!=='6'||box.dataset.ready)return;box.dataset.ready='true';
 const top=document.createElement('strong');top.textContent='🌴 Leonida · official named regions';const note=document.createElement('p');note.className='hint';note.textContent='Names confirmed by Rockstar. Boundaries and individual map pins are community estimates, not official GPS coordinates.';box.append(top,note);
 const grid=document.createElement('div');grid.className='vi-regions';for(const [name,description]of VI_REGIONS){const b=btn(name,()=>{$('search').value=name;$('districtFilter').value='';active[filterScope()]=null;page=0;showTab('Find');render();announce('Searching community-mapped landmarks for '+name+'. This does not verify coordinates.');});b.className='vi-region';const small=document.createElement('small');small.textContent=description;b.append(small);grid.append(b)}box.append(grid);
 const link=document.createElement('a');link.href='https://www.rockstargames.com/VI';link.target='_blank';link.rel='noopener noreferrer';link.textContent='Official Rockstar GTA VI information ↗';box.append(link);
}
function choosePlace(place){selected=place;showPins=true;$('togglePins').textContent='📍 Pins on';$('togglePins').setAttribute('aria-pressed','true');
 camera.x=place.x;camera.y=place.y;camera.z=Math.max(3.4,camera.z);camera.z=clamp(camera.z,MIN_Z,MAX_Z);
 updateSelected();renderFind();schedulePaint();announce('Showing '+place.name+' on the '+(game==='5'?'GTA V':'GTA VI')+' map');
 if(innerWidth<=700){$('sidebar').classList.add('mobile-collapsed');window.scrollTo({top:0,behavior:'smooth'})}
}
function updateSelected(){const card=$('selectedCard');if(!selected||selected.game!==game){card.classList.add('hidden');return}card.classList.remove('hidden');$('selectedName').textContent=selected.name;
 const photo=$('selectedPhoto'),figure=$('selectedPhotoFigure');if(photo&&figure&&photo.dataset.place!==selected.id){photo.dataset.place=selected.id;figure.hidden=true;photo.removeAttribute('src');const m=/^gtadb-([56])-(L\d+)$/.exec(selected.id);if(m){photo.alt='Source-contributed in-game image for '+selected.name;photo.src=UPSTREAM+'map/photos/'+m[1]+'/'+m[2]+',ig.jpg';}}

 $('selectedSource').classList.toggle('hidden',!selected.sourceUrl);if(selected.sourceUrl)$('selectedSource').href=selected.sourceUrl;
 if($('selectedAddress')){$('selectedAddress').textContent=selected.address&&selected.address!=='?'?'Real-world reference: '+selected.address:'Real-world reference: not provided by source';}
 $('selectedInfo').textContent=(CATEGORIES[selected.category]?.[0]||'Location')+' · X '+selected.x.toFixed(0)+' · Y '+selected.y.toFixed(0)+(selected.confidence?' · '+selected.confidence.toUpperCase():(selected.uncertain?' · UNVERIFIED':''))+(selected.evidence?' · Evidence: '+selected.evidence:'')+(selected.detail?' · '+selected.detail:'')+' · '+(selected.source||'My pin');
 $('selectedFound').textContent=!['collectible','vehicle','weapon','activity'].includes(selected.category)?(progress[doneKey(selected)]?'✓ Visited (undo)':'Mark visited'):(progress[doneKey(selected)]?'✓ Found (undo)':'Mark found');$('selectedRoute').textContent=routeIds().includes(selected.id)?'− Remove route':'+ Route';
}
function routeIds(){return Array.isArray(routes[routeScope()])?routes[routeScope()]:[]}
function currentRouteStart(){const p=routeStarts[routeScope()];return p&&Number.isFinite(p.x)&&Number.isFinite(p.y)?p:null}
function setRouteStart(p){routeStarts[routeScope()]={x:Number(p.x),y:Number(p.y),name:String(p.name||p.title||'Selected map point').slice(0,100)};chooseRouteStartMode=false;persist();render();announce('Route starts at '+routeStarts[routeScope()].name+'. Choose Smart route to generate nearest stops.');}
function autoRouteVisible(){const origin=currentRouteStart()||(selected?.game===game?selected:{x:camera.x,y:camera.y,name:'Map center'}),planner=window.JuraRoutePlanner;
 if(!planner)return toast('Route engine missing. Upload atlas-route-core.js and refresh.');
 const available=matches().filter(r=>!progress[doneKey(r)]);if(!available.length)return toast('No unfinished visible locations. Enable categories or clear your search.');
 if(!currentRouteStart()){routeStarts[routeScope()]={x:origin.x,y:origin.y,name:origin.name||'Map center'};}
 const result=planner.plan(origin,available);routes[routeScope()]=result.stops.map(r=>r.id);persist();showTab('Route');render();fitRoute();
 toast('Smart route: '+result.stops.length+' stops · ~'+result.units.toLocaleString()+' straight-line units'+(result.omitted?' · '+result.omitted+' not included: narrow filters for smaller hunts':'')+'.');
}

function routeRecords(){const by=new Map(records().map(r=>[r.id,r]));return routeIds().map(id=>by.get(id)).filter(Boolean)}
function toggleRoute(r){routes[routeScope()]=routeIds().includes(r.id)?routeIds().filter(id=>id!==r.id):[...routeIds(),r.id];persist();render();updateSelected()}
function toggleFound(r){progress[doneKey(r)]=!progress[doneKey(r)];if(progress[doneKey(r)])routes[routeScope()]=routeIds().filter(id=>id!==r.id);syncedChecklist(r,progress[doneKey(r)]);persist();render();updateSelected()}
function card(r){const d=document.createElement('article');d.className='result'+(selected?.id===r.id?' selected':'');
 const head=document.createElement('div');head.className='result-head';
 const marker=document.createElement('span');marker.className='atlas-list-marker';marker.style.background=r.markerColor||CATEGORIES[r.category]?.[1]||'#b7c9ce';marker.setAttribute('aria-hidden','true');
 const title=btn((progress[doneKey(r)]?'✓ ':'')+r.name,()=>{choosePlace(r);renderFind()},'atlas-list-title');title.title='Find '+r.name+' on the map';
 const f=btn(favorites[r.id]?'★':'☆',()=>{favorites[r.id]=!favorites[r.id];persist();render()},'fav');f.title='Favorite';f.setAttribute('aria-label','Favorite '+r.name);head.append(marker,title,f);
 const desc=document.createElement('small');desc.textContent=(r.address&&r.address!=='?'?r.address+' · ':'')+(CATEGORIES[r.category]?.[0]||'Other')+' · '+(r.uncertain?'Provisional':'Mapped source');
 const actions=document.createElement('div');actions.className='result-actions';actions.append(btn('📍 Map',()=>{choosePlace(r);renderFind()},'primary'),btn(progress[doneKey(r)]?'✓ Visited':'Visited',()=>toggleFound(r)),btn(routeIds().includes(r.id)?'− Route':'+ Route',()=>toggleRoute(r)),btn('↗ Nav',()=>window.teamJuraNav?.setRoutePoint(r)));d.append(head,desc,actions);return d;
}
function renderFind(){const all=orderedMatches(),root=$('results');root.replaceChildren();$('resultCount').textContent=all.length.toLocaleString()+' locations';$('foundCount').textContent=records().filter(r=>progress[doneKey(r)]).length.toLocaleString()+' found';
 const PER_PAGE=40, pages=Math.max(1,Math.ceil(all.length/PER_PAGE));page=clamp(page,0,pages-1);for(const r of all.slice(page*PER_PAGE,(page+1)*PER_PAGE))root.append(card(r));if(!all.length){const p=document.createElement('p');p.className='hint';p.textContent='No places match. Turn a category on, clear search, or update your GTADB data.';root.append(p)}$('pageStatus').textContent=(page+1)+' / '+pages;$('prev').disabled=page===0;$('next').disabled=page>=pages-1;
}
function renderRoute(){const root=$('routeList'),list=routeRecords(),origin=currentRouteStart();root.replaceChildren();$('routeCount').textContent=list.length;if($('routeStartStatus'))$('routeStartStatus').textContent=origin?'Starting at '+origin.name+' · X '+origin.x.toFixed(0)+' Y '+origin.y.toFixed(0):'No start selected: click “Pick start on map” or choose a marker’s Start here button.';if(!list.length){const p=document.createElement('p');p.className='hint';p.textContent='No stops yet. Find a place, then tap + Route.';root.append(p)}
 for(let i=0;i<list.length;i++){const r=list[i],d=document.createElement('article');d.className='result';const name=document.createElement('strong');name.textContent=(i+1)+'. '+r.name;const actions=document.createElement('div');actions.className='result-actions';actions.append(btn('↑',()=>moveStop(i,-1)),btn('↓',()=>moveStop(i,1)),btn('Find',()=>choosePlace(r)),btn('−',()=>toggleRoute(r)));d.append(name,actions);root.append(d)}
}
function moveStop(i,delta){const list=[...routeIds()],j=i+delta;if(j<0||j>=list.length)return;[list[i],list[j]]=[list[j],list[i]];routes[routeScope()]=list;persist();render()}
function renderPins(){const root=$('pinsList');root.replaceChildren();const list=personal.filter(p=>p.game===game&&(game==='6'||(p.scope||'story')===mode));if(!list.length){const p=document.createElement('p');p.className='hint';p.textContent='No custom pins for this game yet.';root.append(p)}for(const r of list){const d=card(r);d.append(btn('Delete pin',()=>{if(!confirm('Delete this pin?'))return;personal=personal.filter(p=>p.id!==r.id);routes[routeScope()]=routeIds().filter(id=>id!==r.id);if(selected?.id===r.id)selected=null;persist();render()}));root.append(d)}}

function renderSpecial(which){
 const cat=which==='Collections'?'collectible':'vehicle',root=$(which==='Collections'?'collectionList':'vehicleList');
 const data=specialized(which.toLowerCase());root.replaceChildren();
 const count=$(which==='Collections'?'collectionCount':'vehicleCount');count.textContent=data.length?`${data.length.toLocaleString()} saved / licensed coordinate records`:'No mapped records for this category';
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
function render(){renderLegend();renderViRegions();renderServices();renderFind();renderRoute();renderPins();renderSpecial('Collections');renderSpecial('Vehicles');updateSelected();if(nearbyActive)renderNearby();schedulePaint();document.dispatchEvent(new Event('jura:legend-updated'))}
function switchGame(g){if(!['5','6','online'].includes(g))return;chooseRouteStartMode=false;mode=g==='online'?'online':'story';game=g==='6'?'6':'5';selected=null;coordinateTarget=null;addPinMode=false;$('game5').classList.toggle('active',g==='5');$('game6').classList.toggle('active',g==='6');$('gameOnline').classList.toggle('active',g==='online');$('game5').setAttribute('aria-pressed',String(g==='5'));$('game6').setAttribute('aria-pressed',String(g==='6'));$('gameOnline').setAttribute('aria-pressed',String(g==='online'));$('mapTitle').textContent=g==='6'?'GTA VI · Leonida':g==='online'?'GTA Online · Los Santos':'GTA V · Los Santos';$('mapSubtitle').textContent=g==='6'?'GTADB VI · provisional landmarks, NOT confirmed game locations':g==='online'?'Shared GTA V terrain · separate Online markers and progress':'GTADB GTA V · Story map landmarks';
 $('layer').replaceChildren();for(const [key,label] of [...LAYERS[game],...(game==='6'?VI_UV_OPTIONS:[])])$('layer').add(new Option(label,key));$('layer').value=styles[game];$('search').value='';if($('namedLayerSearch'))$('namedLayerSearch').value='';onlyUnfound=false;onlyFavorites=false;showUnverified=true;$('showUnverified').checked=true;$('hideFound').checked=false;$('favoritesOnly').checked=false;page=0;fitGame();render();renderSources();dataNotice(datasets[game].length?datasets[game].length.toLocaleString()+' landmarks · '+dataOrigins[game]:'Getting GTA '+game+' locations…');tileHealth();
 navPlan=null;navPlanScope=null;if(window.teamJuraNav)window.teamJuraNav.gameChanged();
 try{const url=new URL(location.href);url.hash='#game'+g;history.replaceState(null,'',url.pathname+url.search+url.hash)}catch{}announce(g==='online'?'Online mode: GTA V base landmarks, with Online markers and progress kept separate.':'GTA '+game+' map and GTA '+game+' landmarks selected.');
}
// Atlas 6.2: use the same map service as the upstream map; fall back to the
// published CC BY 4.0 repository mirror on network, CORS, or host failure.
const TILE_HOSTS=['https://maps.gtadb.org/tiles/',UPSTREAM+'maps/tiles/'];
function sourceUrl(g,style,z,tx,ty,host=0){return `${TILE_HOSTS[host]}${g}/${style}/${z}/${z},${ty},${tx}.jpg`+(host?'?atlas_tiles=62':'');}
function tileHealth(){const el=$('tileHealth');if(!el)return;const current=styles[game],all=[...tileStore.values()].filter(t=>t.game===game);const valid=new Set([mapView(current,game).base,...sourceTileStyles(current,0,1,1,game)]);const group=all.filter(t=>valid.has(t.path));const good=group.filter(t=>t.state==='ok').length,loading=group.filter(t=>t.state==='loading').length,bad=group.filter(t=>t.state==='error').length;
 el.textContent=good?`Illustration: ${good} tiles · ${loading} loading`+(bad?` · ${bad} unavailable`:''):loading?`Loading artwork… ${loading} tiles`:bad?'Map artwork unavailable · retry a different layer or connection':'Preparing artwork…';
 el.classList.toggle('atlas-tiles-error',bad>0&&!good);el.title='GTADB-attributed map illustrations; our UV/UV II are color treatments, not GTAWeb art or official game UV. Both 5 and 6 have independent UV artwork views.';}

function within(style,z,x,y,g=game){const r=BOUNDS[mapView(style,g).base]?.[z];return !!r&&x>=r[0]&&x<=r[2]&&y>=r[1]&&y<=r[3]}
function tileImage(style,z,x,y,g=game){
 if(!within(style,z,x,y,g))return null;
 const stylesToTry=sourceTileStyles(style,z,x,y,g);
 for(const path of stylesToTry){
  const u=sourceUrl(g,path,z,x,y);let t=tileStore.get(u);
  if(!t){
   t={state:'loading',img:null,last:Date.now(),path,game:g,view:style,host:0,corsSafe:true};tileStore.set(u,t);
   // Some image hosts allow ordinary <img> but not CORS-enabled canvas. Try
   // CORS hosts first (usable for WebGL), then display-only image retries.
   const attempts=[...TILE_HOSTS.keys()].map(host=>({host,cors:true}))
     .concat([...TILE_HOSTS.keys()].map(host=>({host,cors:false})));
   const loadAttempt=index=>{
    const attempt=attempts[index];t.host=attempt.host;t.corsSafe=attempt.cors;
    const img=new Image();t.img=img;img.decoding='async';
    if(attempt.cors)img.crossOrigin='anonymous';
    img.onload=()=>{if(t.img!==img)return;t.state='ok';tilesLoaded++;schedulePaint();tileHealth();if(tilesLoaded===1)announce('Licensed GTADB artwork loaded.');};
    img.onerror=()=>{if(t.img!==img)return;if(index+1<attempts.length){loadAttempt(index+1);return;}t.state='error';tilesErrors++;schedulePaint();tileHealth();};
    img.src=sourceUrl(g,path,z,x,y,attempt.host);
   };loadAttempt(0);
  }
  if(t.state==='ok'||t.state==='loading')return t;
 }
 return null;
}
function imageFor(style,z,x,y){
 const image=tileImage(style,z,x,y,game);
 if(tileStore.size>850){for(const [k,v] of tileStore){if(tileStore.size<=680)break;if(v.state!=='loading')tileStore.delete(k)}}
 return image;
}
function scale(){return 2**camera.z/32}
function toScreen(x,y){const s=scale();return{x:width/2+(x-camera.x)*s,y:height/2+(camera.y-y)*s}}
function fromScreen(x,y){const s=scale();return{x:camera.x+(x-width/2)/s,y:camera.y-(y-height/2)/s}}
function fitGame(){const area=game==='5'?[-4550,-4750,4800,8150]:[-12800,-10400,7200,8500];const [x0,y0,x1,y1]=area;camera.x=(x0+x1)/2;camera.y=(y0+y1)/2;
 const s=Math.max(.04,Math.min((Math.max(width,350)-90)/(x1-x0),(Math.max(height,420)-140)/(y1-y0)));camera.z=clamp(Math.log2(s*32),0,5);schedulePaint()}
function zoomBy(delta,x=width/2,y=height/2){const before=fromScreen(x,y);camera.z=clamp(camera.z+delta,MIN_Z,MAX_Z);const after=fromScreen(x,y);camera.x+=before.x-after.x;camera.y+=before.y-after.y;schedulePaint()}
function schedulePaint(){if(paintPending)return;paintPending=true;requestAnimationFrame(()=>{paintPending=false;draw()})}
function resize(){const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;const oldW=width,oldH=height;width=rect.width;height=rect.height;dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);if(!oldW||!oldH)fitGame();schedulePaint()}
function fallbackTile(z,x,y,dx,dy,size){for(let p=z-1;p>=0;p--){const factor=2**(z-p),xx=Math.floor(x/factor),yy=Math.floor(y/factor),parent=imageFor(styles[game],p,xx,yy);if(parent?.state!=='ok')continue;
  const src=256/factor,originX=(x-xx*factor)*src,originY=(y-yy*factor)*src;if(styles[game]==='cyber,1')ctx.filter=parent.path==='cyber,1'?'none':MAP_FILTERS.cyber;ctx.drawImage(parent.img,originX,originY,src,src,dx,dy,size+.5,size+.5);return true}return false}
function drawTiles(){const z=Math.min(5,Math.ceil(camera.z)),s=scale(),tile=256*2**(camera.z-z),offsetX=width/2-(camera.x+16384)*s,offsetY=height/2-(16384-camera.y)*s,style=styles[game],view=mapView(style),range=BOUNDS[view.base][z];
 const minX=Math.max(range[0],Math.floor(-offsetX/tile)-1),maxX=Math.min(range[2],Math.ceil((width-offsetX)/tile)+1),minY=Math.max(range[1],Math.floor(-offsetY/tile)-1),maxY=Math.min(range[3],Math.ceil((height-offsetY)/tile)+1);
 ctx.save();if(view.filter)ctx.filter=view.filter;
 for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){let dx=offsetX+x*tile,dy=offsetY+y*tile,entry=imageFor(style,z,x,y);
  if(style==='cyber,1')ctx.filter=entry?.path==='cyber,1'? 'none':MAP_FILTERS.cyber;
  if(entry?.state==='ok'){
   if(view.overlay&&overlayOpacity<100&&entry.path!==view.base){const base=tileImage(view.base,z,x,y,game);if(base?.state==='ok'){ctx.drawImage(base.img,dx,dy,tile+.5,tile+.5);ctx.globalAlpha=overlayOpacity/100;ctx.drawImage(entry.img,dx,dy,tile+.5,tile+.5);ctx.globalAlpha=1;}else ctx.drawImage(entry.img,dx,dy,tile+.5,tile+.5);}
   else ctx.drawImage(entry.img,dx,dy,tile+.5,tile+.5);
  }else if(!fallbackTile(z,x,y,dx,dy,tile)){ctx.fillStyle='#1f4050';ctx.fillRect(dx,dy,tile+.5,tile+.5);ctx.strokeStyle='#375769';ctx.strokeRect(dx,dy,tile,tile)}}
 ctx.restore();
}
function drawTerrainTexture(target,box){const c=target.getContext('2d'),W=target.width,H=target.height,spanX=box.x1-box.x0,spanY=box.y1-box.y0;let loaded=0;if(!c||!Number.isFinite(spanX)||!Number.isFinite(spanY)||spanX<=0||spanY<=0)return false;
 c.fillStyle='#1b4050';c.fillRect(0,0,W,H);
 const zm=clamp(Math.round(Math.log2(W/spanX*32)),0,5),worldTile=8192/2**zm,tx0=Math.floor((box.x0+16384)/worldTile),tx1=Math.floor((box.x1+16384)/worldTile),ty0=Math.floor((16384-box.y1)/worldTile),ty1=Math.floor((16384-box.y0)/worldTile);const style=styles[game],view=mapView(style,game);
 c.save();if(view.filter)c.filter=view.filter;
 for(let ty=ty0;ty<=ty1;ty++)for(let tx=tx0;tx<=tx1;tx++){
  const tile=tileImage(style,zm,tx,ty,game);if(tile?.state!=='ok'||!tile.corsSafe)continue;
  const wx0=tx*worldTile-16384,wy1=16384-ty*worldTile,dx=(wx0-box.x0)/spanX*W,dy=(box.y1-wy1)/spanY*H,dw=worldTile/spanX*W,dh=worldTile/spanY*H;
  try{
   if(view.overlay&&overlayOpacity<100&&tile.path!==view.base){const base=tileImage(view.base,zm,tx,ty,game);if(base?.state==='ok'){c.drawImage(base.img,dx,dy,dw+.25,dh+.25);c.globalAlpha=overlayOpacity/100;c.drawImage(tile.img,dx,dy,dw+.25,dh+.25);c.globalAlpha=1;}else c.drawImage(tile.img,dx,dy,dw+.25,dh+.25);}
   else c.drawImage(tile.img,dx,dy,dw+.25,dh+.25);loaded++;
  }catch{} }
 c.restore();return loaded>0;
}
function drawRoute(){
 if(navPlan&&navPlanScope===routeScope()){
  const line=navPlan.points;ctx.save();ctx.lineWidth=4;ctx.strokeStyle='#ffd37e';ctx.setLineDash(navPlan.drivingVerified?[]:[9,6]);ctx.beginPath();let first=true;for(const r of line){const p=toScreen(r.x,r.y);if(first){ctx.moveTo(p.x,p.y);first=false;}else ctx.lineTo(p.x,p.y)}ctx.stroke();ctx.setLineDash([]);
  for(const [i,r] of navPlan.waypoints.entries()){const p=toScreen(r.x,r.y);if(p.x<-30||p.y<-30||p.x>width+30||p.y>height+30)continue;ctx.beginPath();ctx.arc(p.x,p.y,12,0,2*Math.PI);ctx.fillStyle=i===0?'#8ce7be':'#ffe09e';ctx.strokeStyle='#173643';ctx.lineWidth=2;ctx.fill();ctx.stroke();ctx.fillStyle='#173643';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText(i===0?'A':String(i),p.x,p.y+4)}ctx.restore();return;
 }
 const list=routeRecords(),origin=currentRouteStart();if(!list.length&&!origin)return;ctx.save();ctx.lineWidth=3;ctx.strokeStyle='#ffc36d';ctx.setLineDash([9,7]);ctx.beginPath();let first=true;
 for(const r of [...(origin?[origin]:[]),...list]){const p=toScreen(r.x,r.y);if(first){ctx.moveTo(p.x,p.y);first=false}else ctx.lineTo(p.x,p.y)}ctx.stroke();ctx.setLineDash([]);
 for(const [i,r] of list.entries()){const p=toScreen(r.x,r.y);if(p.x<0||p.x>width||p.y<0||p.y>height)continue;ctx.beginPath();ctx.fillStyle='#ffe09c';ctx.strokeStyle='#1b3441';ctx.lineWidth=2;ctx.arc(p.x,p.y,11,0,2*Math.PI);ctx.fill();ctx.stroke();ctx.fillStyle='#172936';ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.fillText(String(i+1),p.x,p.y+4)}
 if(origin){const p=toScreen(origin.x,origin.y);if(p.x>=-15&&p.x<=width+15&&p.y>=-15&&p.y<=height+15){ctx.beginPath();ctx.arc(p.x,p.y,13,0,Math.PI*2);ctx.fillStyle='#7ee6bc';ctx.strokeStyle='#193643';ctx.lineWidth=3;ctx.fill();ctx.stroke();ctx.fillStyle='#193643';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('S',p.x,p.y+4)}}ctx.restore()}

function pin(x,y,color,highlight=false,number=null,category='landmark',plain=false){ctx.save();const r=highlight?13:plain?7.5:11;ctx.shadowColor='#000b';ctx.shadowBlur=7;ctx.shadowOffsetY=2;ctx.beginPath();ctx.moveTo(x,y+(plain?10:15));ctx.bezierCurveTo(x-r*1.03,y+2,x-r,y-r,x,y-r);ctx.bezierCurveTo(x+r,y-r,x+r*1.03,y+2,x,y+(plain?10:15));ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=highlight?'#fff5c0':plain?'#f3f6fa':'#112736';ctx.lineWidth=highlight?2.8:plain?1.2:1.6;ctx.stroke();
 if(plain&&!highlight){ctx.restore();return;}ctx.fillStyle='#17303d';ctx.font=(highlight?'bold 16px':'bold 13px')+' "Segoe UI Symbol",system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(number!==null?String(number):CATEGORY_SYMBOLS[category]||'✦',x,y-3);ctx.restore()}

function drawMarkers(){hitRegions=[];if(!showPins&&!selected)return;
 // One physical pin per visible record: GTADB-style ungrouped locations.
 // Cap only at extremely large source-object loads to prevent phone freezes.
 const visible=showPins?matches():[];let drawn=0;
 for(const r of visible){const p=toScreen(r.x,r.y);if(p.x<-20||p.x>width+20||p.y<-20||p.y>height+20)continue;
  if(drawn>=20000)break;drawn++;
  const color=r.markerColor||CATEGORIES[r.category]?.[1]||'#f7c97b';
  pin(p.x,p.y,color,false,null,r.category,!!r.markerColor);
  hitRegions.push({x:p.x,y:p.y,r:12,record:r});
 }
 if(selected?.game===game){const p=toScreen(selected.x,selected.y);if(p.x>-30&&p.x<width+30&&p.y>-30&&p.y<height+30){pin(p.x,p.y,'#ffe7a8',true,null,selected.category,false);hitRegions.push({x:p.x,y:p.y,r:23,record:selected})}}
}
function drawCoordinateTarget(){if(!coordinateTarget||coordinateTarget.game!==game)return;const p=toScreen(coordinateTarget.x,coordinateTarget.y);if(p.x<-40||p.x>width+40||p.y<-40||p.y>height+40)return;
 ctx.save();ctx.strokeStyle='#fff9d2';ctx.lineWidth=3;ctx.shadowBlur=7;ctx.shadowColor='#000';ctx.beginPath();ctx.arc(p.x,p.y,16,0,Math.PI*2);ctx.moveTo(p.x-26,p.y);ctx.lineTo(p.x+26,p.y);ctx.moveTo(p.x,p.y-26);ctx.lineTo(p.x,p.y+26);ctx.stroke();ctx.restore();}
function draw(){if(!width||!height)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#163441';ctx.fillRect(0,0,width,height);ctx.save();ctx.strokeStyle='#294a56';ctx.lineWidth=1;for(let x=0;x<width;x+=96){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke()}for(let y=0;y<height;y+=96){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke()}ctx.restore();drawTiles();drawRoute();drawMarkers();drawCoordinateTarget();if(window.teamJuraNav?.getDimension()==="3d")window.teamJuraNav.refresh()}
const pointers=new Map();let gesture=null;
function position(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{...position(e),start:position(e)});canvas.classList.add('dragging');if(pointers.size===2){const ps=[...pointers.values()];gesture={distance:Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y),zoom:camera.z};}else gesture=null});
canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const last=pointers.get(e.pointerId),p=position(e),dx=p.x-last.x,dy=p.y-last.y;last.x=p.x;last.y=p.y;last.travel=(last.travel||0)+Math.hypot(dx,dy);
 if(pointers.size===1){camera.x-=dx/scale();camera.y+=dy/scale();schedulePaint()}else if(pointers.size===2&&gesture){const ps=[...pointers.values()],distance=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);if(distance>2&&gesture.distance>2){camera.z=clamp(gesture.zoom+Math.log2(distance/gesture.distance),MIN_Z,MAX_Z);schedulePaint()}}});
function endPointer(e){const p=pointers.get(e.pointerId);if(!p)return;const wasSingle=pointers.size===1;const spot=position(e);pointers.delete(e.pointerId);if(!pointers.size)canvas.classList.remove('dragging');if(wasSingle&&(p.travel||0)<7)tapMap(spot);if(pointers.size<2)gesture=null}
canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);if(!pointers.size)canvas.classList.remove('dragging');gesture=null});
canvas.addEventListener('wheel',e=>{e.preventDefault();const p=position(e);zoomBy(e.deltaY<0?.28:-.28,p.x,p.y)},{passive:false});
canvas.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){zoomBy(.45);e.preventDefault()}else if(e.key==='-'){zoomBy(-.45);e.preventDefault()}else if(e.key.startsWith('Arrow')){const step=150/scale();if(e.key==='ArrowLeft')camera.x-=step;if(e.key==='ArrowRight')camera.x+=step;if(e.key==='ArrowUp')camera.y+=step;if(e.key==='ArrowDown')camera.y-=step;schedulePaint();e.preventDefault()}});
function tapMap(p){if(chooseRouteStartMode){let match=null;for(let i=hitRegions.length-1;i>=0;i--){const h=hitRegions[i];if(h.record&&Math.hypot(h.x-p.x,h.y-p.y)<=h.r){match=h.record;break}}const at=match||fromScreen(p.x,p.y);setRouteStart({x:at.x,y:at.y,name:match?.name||'Selected map position'});showTab('Route');return}if(addPinMode){addPinMode=false;const at=fromScreen(p.x,p.y);let name=prompt('Name this pin:');if(!name||!name.trim()){toast('Pin creation cancelled.');return}name=name.trim().slice(0,120);const r={id:'user-'+game+'-'+Date.now(),game,name,x:at.x,y:at.y,tags:[],category:pendingPinCategory,scope:game==='6'?'story':mode,source:'My saved location',uncertain:false};personal.push(r);persist();active[filterScope()]=null;choosePlace(r);render();showTab(pendingPinCategory==='collectible'?'Collections':pendingPinCategory==='vehicle'?'Vehicles':'Pins');toast('Saved location placed on the map: '+name);return}
 for(let i=hitRegions.length-1;i>=0;i--){const h=hitRegions[i];if(Math.hypot(h.x-p.x,h.y-p.y)>h.r)continue;if(h.record)choosePlace(h.record);else if(h.cluster){const r=h.cluster;camera.x=r.x;camera.y=r.y;camera.z=clamp(camera.z+1.35,MIN_Z,MAX_Z);schedulePaint();announce('Zooming in to separate nearby locations.')}return}
 // A plain map tap stays on the map; no modal coordinate window.
 const at=fromScreen(p.x,p.y);announce('GTA '+game+' map · X '+at.x.toFixed(0)+' · Y '+at.y.toFixed(0)+' · Tap a marker to inspect it.');
}

function revealSourceCategories(rows){if(!active[filterScope()])return;for(const row of rows){if(CATEGORIES[row.category])active[filterScope()].add(row.category)}}
function renderSources(){const root=$('sourceToggles'),status=$('sourceStatus');if(!root||!window.JuraSources)return;
 root.replaceChildren();const sources=window.JuraSources.SOURCES;
 for(const [id,cfg] of Object.entries(sources)){
  if(cfg.game!==game)continue;
  const label=document.createElement('label');label.className='source-option';
  const check=document.createElement('input');check.type='checkbox';check.checked=!!sourceEnabled[id];check.setAttribute('aria-label',cfg.label);
  check.onchange=()=>{sourceEnabled[id]=check.checked;store('jura55-source-visible',sourceEnabled);if(check.checked){if(sourceRecords[id])revealSourceCategories(sourceRecords[id]);else{pendingSourceReveal.add(id);loadSource(id)}}else pendingSourceReveal.delete(id);render();renderSources();announce((check.checked?'Showing ':'Hiding ')+cfg.label)};
  const span=document.createElement('span');const state=sourceStates[id];span.textContent=cfg.label+' ['+cfg.count.toLocaleString()+'] · '+(state?.state==='ready'?(sourceRecords[id]?.length||0).toLocaleString()+' pins':state?.state==='error'?'unavailable':state?.state==='loading'?'loading…':'click to load');
  label.append(check,span);root.append(label);
 }
 const current=Object.keys(sources).filter(id=>sources[id].game===game);
 const available=current.reduce((n,id)=>n+(sourceRecords[id]?.length||0),0),failed=current.filter(id=>sourceStates[id]?.state==='error');
 const visible=matches().filter(r=>r.sourceId&&sourceEnabled[r.sourceId]).length;status.textContent=available.toLocaleString()+' sourced positions loaded · '+visible.toLocaleString()+' visible under current legend / filters · '+failed.length+(failed.length===1?' feed unavailable':' feeds unavailable')+(failed.length?' ('+failed.map(id=>id).join(', ')+')':'')+'. Each source can be switched off independently.';
}
async function loadSource(id,refresh=false){if(!window.JuraSources?.SOURCES[id])return;sourceStates[id]={state:'loading'};renderSources();
 try{const data=await window.JuraSources.load(id,refresh);sourceRecords[id]=data.records;sourceStates[id]={state:'ready',cache:data.cache,warning:data.warning};if(pendingSourceReveal.has(id)){pendingSourceReveal.delete(id);if(sourceEnabled[id]&&window.JuraSources.SOURCES[id].game===game)revealSourceCategories(data.records);}
  if(id==='story'){const raw=loadStore('team-jura-checklist-v54',{}),checked=raw?.checked||{};let migrated=0;for(const r of data.records){const set=CHECKSET[r.collectionType];if(set&&Number.isInteger(r.collectionSlot)&&progress[r.id]===undefined&&checked[set+':'+r.collectionSlot]===true){progress[r.id]=true;migrated++;}}if(migrated)persist();}
 }
 catch(e){sourceStates[id]={state:'error',message:String(e?.message||e).slice(0,140)};}
 renderSources();render();maybeOpenDeepLink();if(new URLSearchParams(location.search).get('viewroute')==='1'&&id==='story'&&game==='5'){showTab('Route');fitRoute();}
}
async function loadSources(refresh=false){if(!window.JuraSources){$('sourceStatus').textContent='Source adapter missing. Upload atlas-sources.js alongside atlas.js.';return;}
 await Promise.all(Object.keys(window.JuraSources.SOURCES).filter(id=>id==='story'||id==='vi'||sourceEnabled[id]).map(id=>loadSource(id,refresh)));
 const failed=Object.entries(sourceStates).filter(([,v])=>v.state==='error');
 if(failed.length)announce('Some extra sources could not load: '+failed.map(([id])=>id).join(', ')+'. GTADB remains available; check connection or source CORS settings.');
 else announce('Community coordinates loaded: GTA V Story, Leonida research and world objects. Use overlay switches to choose pins.');
}
function centerToCoordinates(){const x=Number(camera.x.toFixed(2)),y=Number(camera.y.toFixed(2));$('coordinateX').value=String(x);$('coordinateY').value=String(y);goToCoordinates();}
function getNearbyOrigin(){const choice=$('nearbyOrigin').value;
 if(choice==='selected'&&selected&&selected.game===game)return{x:selected.x,y:selected.y,title:selected.name};
 if(choice==='crosshair'&&coordinateTarget?.game===game)return{x:coordinateTarget.x,y:coordinateTarget.y,title:'Coordinate target'};
 return{x:camera.x,y:camera.y,title:'Map center'};
}
function nearbyWithin(){const origin=getNearbyOrigin(),radius=Number($('nearbyRadius').value)||500,radius2=radius*radius;
 const close=[];for(const r of matches()){const d2=(r.x-origin.x)**2+(r.y-origin.y)**2;if(d2<=radius2)close.push({record:r,distance:Math.sqrt(d2)})}
 close.sort((a,b)=>a.distance-b.distance);return{origin,radius,close};
}
function renderNearby(){const root=$('nearbyResults');if(!root)return;const{origin,radius,close}=nearbyWithin();nearbyLast=close;root.replaceChildren();
 $('nearbyStatus').textContent=close.length.toLocaleString()+' matching locations within '+radius.toLocaleString()+' world units of '+origin.title+' (X '+origin.x.toFixed(0)+', Y '+origin.y.toFixed(0)+'). Showing '+Math.min(close.length,35)+' nearest.';
 for(const{record:r,distance}of close.slice(0,35)){
  const row=document.createElement('article');row.className='nearby-result';
  const heading=document.createElement('strong');heading.textContent=r.name;
  const detail=document.createElement('small');detail.textContent=distance.toFixed(0)+' units · '+(CATEGORIES[r.category]?.[0]||r.category)+(r.uncertain?' · Provisional':'')+(r.sourceId?' · '+r.sourceId:'');
  const controls=document.createElement('div');controls.className='result-actions';controls.append(btn('📍 Show',()=>{choosePlace(r);renderNearby()},'primary'),btn(routeIds().includes(r.id)?'− Route':'+ Route',()=>{toggleRoute(r);renderNearby()}));
  row.append(heading,detail,controls);root.append(row);
 }
 if(!close.length){const hint=document.createElement('p');hint.className='hint';hint.textContent='No visible layers match. Increase radius, clear the area filter, or enable the desired map source.';root.append(hint)}
}
function addNearbyToRoute(){nearbyActive=true;const{close}=nearbyWithin();const fresh=close.map(x=>x.record).filter(r=>!progress[doneKey(r)]&&!routeIds().includes(r.id)).slice(0,12);
 if(!fresh.length){renderNearby();return toast('No unfinished, un-routed places found in this area.');}
 const ids=routeIds();routes[routeScope()]=[...ids,...fresh.map(r=>r.id)];persist();render();toast('Added '+fresh.length+' nearby stops to the '+(mode==='online'?'GTA Online':game==='6'?'GTA VI':'GTA V Story')+' route.');
}
async function shareCoordinateLocation(){const at=coordinateTarget?.game===game?coordinateTarget:selected?.game===game?selected:camera;
 const page=game==='6'?'atlas-vi.html':mode==='online'?'atlas-online.html':'atlas.html',url=new URL('./'+page,document.baseURI);
 url.searchParams.set('x',Number(at.x).toFixed(2));url.searchParams.set('y',Number(at.y).toFixed(2));url.searchParams.set('zoom',camera.z.toFixed(2));
 try{await navigator.clipboard.writeText(url.href);toast('Coordinate link copied — anyone can open this location on Atlas.');}
 catch{window.prompt('Copy the coordinate link:',url.href);toast('Coordinate link shown for copying.');}
}
function goToCoordinates(){const x=Number($('coordinateX').value),y=Number($('coordinateY').value);
 if(!$('coordinateX').value.trim()||!$('coordinateY').value.trim()||!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(x)>16384||Math.abs(y)>16384)return toast('Enter valid GTA world coordinates from -16384 to 16384 for both X and Y.');
 coordinateTarget={game,x,y};selected=null;camera.x=x;camera.y=y;camera.z=Math.max(4,camera.z);updateSelected();schedulePaint();announce('Coordinate target: '+game+' · X '+x.toFixed(1)+' Y '+y.toFixed(1)+' (crosshair)');
 if(innerWidth<=700)$('sidebar').classList.add('mobile-collapsed');
}
async function cacheData(g,raw){try{const c=await caches.open(APP+'-data');const url=UPSTREAM+'map/data/'+g+'/landmarks.json';await c.put(url,new Response(JSON.stringify(raw),{headers:{'Content-Type':'application/json'}}))}catch{}}
async function getCachedData(g){try{const c=await caches.open(APP+'-data');const r=await c.match(UPSTREAM+'map/data/'+g+'/landmarks.json');if(r)return await r.json()}catch{}return null}
async function loadDataset(g,refresh=false){
 const localUrl='./gtadb-v'+g+'.json';
 if(!refresh){try{const r=await fetch(localUrl);if(r.ok){const v=normalize(await r.json(),g);if(v.length&&datasets[g].length<v.length){datasets[g]=v;dataOrigins[g]='Offline starter';if(g===game){render();maybeOpenDeepLink();dataNotice(v.length+' starter locations · checking licensed database…')}}}}catch{}
 const cached=await getCachedData(g);if(cached){const v=normalize(cached,g);if(v.length>datasets[g].length){datasets[g]=v;dataOrigins[g]='Cached licensed GTADB database';if(g===game){render();maybeOpenDeepLink();dataNotice(v.length.toLocaleString()+' cached locations')}}}
 }
 // GTA VI uses the daily repository snapshot; GTA V stays a long-lived legacy snapshot.
 if(g==='6'){
  try{const r=await fetch('./data/gtadb-6.json'+(refresh?'?update='+Date.now():''),{cache:refresh?'reload':'no-cache'});
   if(r.ok){const data=await r.json();if(data?.game!=='6'||data?.license!=='CC BY 4.0'||!Array.isArray(data.records))throw Error('Invalid VI snapshot');
    const v=normalize(data.records,g);if(v.length<500)throw Error('Snapshot has too few records');
    if(v.length>=datasets[g].length||refresh){datasets[g]=v;dataOrigins[g]='Repository GTADB VI snapshot '+String(data.sourceUpdated||'').slice(0,10);await cacheData(g,data.records);if(g===game){render();maybeOpenDeepLink();dataNotice(v.length.toLocaleString()+' GTADB VI locations · '+String(data.sourceUpdated||'').slice(0,10));}}return;}
  }catch(e){/* Older GitHub Pages deployments may not yet have a populated snapshot. */}
 }
 const checked=Number(loadStore('jura58-gtadb-check-'+g,0))||0;
 const age=g==='5'?90*24*60*60*1000:24*60*60*1000;
 if(!refresh&&datasets[g].length>=500&&Date.now()-checked<age)return;
 try{const u=UPSTREAM+'map/data/'+g+'/landmarks.json?atlas_check='+Date.now();const r=await fetch(u,{cache:refresh?'reload':'default'});if(!r.ok)throw Error('HTTP '+r.status);const raw=await r.json();const v=normalize(raw,g);if(v.length<100)throw Error('Insufficient source records');datasets[g]=v;dataOrigins[g]='GTADB GitHub repository fallback';await cacheData(g,raw);store('jura58-gtadb-check-'+g,Date.now());if(g===game){render();maybeOpenDeepLink();dataNotice(v.length.toLocaleString()+' GTADB locations · repository sourced');announce('GTADB landmark database loaded. GTA VI mapping is provisional.')}}catch(e){if(g===game){render();dataNotice(datasets[g].length?datasets[g].length+' saved locations · offline':'Data unavailable offline');announce('Source update unavailable. Cached locations remain available.')}}
}
function offlineUrls(g,style){const urls=[];for(let z=0;z<=2;z++){const [minX,minY,maxX,maxY]=BOUNDS[mapView(style,g).base][z];for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){for(const path of style==='cyber,1'?[mapView(style,g).base]:sourceTileStyles(style,z,x,y,g))urls.push(sourceUrl(g,path,z,x,y))}}return [...new Set(urls)]}
async function saveOffline(){if(offlineBusy)return;offlineBusy=true;offlineStop=false;const g=game,style=styles[game];const list=offlineUrls(g,style);const buttonEl=$('saveOffline');buttonEl.disabled=true;$('stopOffline').classList.remove('hidden');let success=0,failed=0,completed=0;
 try{const cache=await caches.open(APP+'-tiles');const workers=Array.from({length:4},async()=>{while(!offlineStop){const index=completed++;if(index>=list.length)break;const url=list[index];try{const existing=await cache.match(url);if(existing){success++;}else{const response=await fetch(url,{mode:'no-cors',cache:'force-cache'});if(response.ok||response.type==='opaque'){await cache.put(url,response.clone());success++}else failed++;}}catch{failed++}if(index%3===0||index===list.length-1)$('offlineStatus').textContent=`Saving GTA ${g} ${style}: ${Math.min(completed,list.length)}/${list.length} · ${success} saved · ${failed} failed`;}});await Promise.all(workers);
 $('offlineStatus').textContent=offlineStop?`Download stopped. ${success} overview tiles available offline so far.`:`GTA ${g} ${style}: ${success}/${list.length} overview tiles cached. ${failed?'Some images failed; retry online.':'Overview offline ready; zoomed-in detail still downloads as you visit it.'}`;
 }catch(e){$('offlineStatus').textContent='Offline download not available on this browser: '+e.message}finally{offlineBusy=false;buttonEl.disabled=false;$('stopOffline').classList.add('hidden')}
}
function exportBackup(){const value={version:58,progress,favorites,routes,routeStarts,personal};const file=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(file),link=document.createElement('a');link.href=url;link.download='team-jura-atlas-backup.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Backup exported to your downloads.')}
async function importBackup(file){if(!file)return;try{if(file.size>3500000)throw Error('File is too large');const raw=JSON.parse(await file.text());if(!raw||typeof raw!=='object'||!raw.progress||!Array.isArray(raw.personal))throw Error('Invalid Team Jura backup');if(!confirm('Replace saved progress, routes, favorites and pins on this device?'))return;
 progress=Object.fromEntries(Object.entries(raw.progress).filter(([k,v])=>typeof k==='string'&&typeof v==='boolean').slice(0,30000));favorites=raw.favorites&&typeof raw.favorites==='object'?raw.favorites:{};routes=raw.routes&&typeof raw.routes==='object'?raw.routes:{'5':[],'6':[]};routeStarts=raw.routeStarts&&typeof raw.routeStarts==='object'&&!Array.isArray(raw.routeStarts)?Object.fromEntries(Object.entries(raw.routeStarts).filter(([k,v])=>['5','6','online'].includes(k)&&v&&Number.isFinite(v.x)&&Number.isFinite(v.y)).map(([k,v])=>[k,{x:v.x,y:v.y,name:String(v.name||'Saved start').slice(0,100)}])):{};personal=raw.personal.filter(p=>p&&['5','6'].includes(p.game)&&typeof p.name==='string'&&Number.isFinite(p.x)&&Number.isFinite(p.y)).slice(0,5000).map(p=>({...p,name:p.name.slice(0,120),tags:[],category:'user'}));persist();render();toast('Backup imported.');}catch(e){toast('Could not import backup: '+e.message)}finally{$('importFile').value=''}}
function optimizeRoute(){const r=routeRecords();if(r.length<2)return toast('Add at least two stops to order them.');if(!window.JuraRoutePlanner)return toast('Route engine is unavailable.');
 const origin=currentRouteStart()||r[0],stops=currentRouteStart()?r:r.slice(1);const result=window.JuraRoutePlanner.plan(origin,stops);
 routes[routeScope()]=currentRouteStart()?result.stops.map(p=>p.id):[r[0].id,...result.stops.map(p=>p.id)];persist();render();toast('Optimized '+r.length+' stops using straight-line GTA world distance (not road directions).')}

function fitRoute(){const r=routeRecords();if(!r.length)return toast('Add locations to your route first.');if(r.length===1)return choosePlace(r[0]);
 const plotted=currentRouteStart()?[currentRouteStart(),...r]:r;const xs=plotted.map(p=>p.x),ys=plotted.map(p=>p.y),xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(...ys),ymax=Math.max(...ys),dx=Math.max(180,xmax-xmin),dy=Math.max(180,ymax-ymin);camera.x=(xmin+xmax)/2;camera.y=(ymin+ymax)/2;camera.z=clamp(Math.log2(Math.min((width-120)/dx,(height-170)/dy)*32),0,5);schedulePaint();toast('Showing route on GTA '+game+' map.')}
const juraBridge={
 game:()=>game,scope:()=>routeScope(),camera:()=>({...camera}),records:()=>records(),places:()=>matches().slice(0,12000),
 route:()=>navPlan&&navPlanScope===routeScope()?navPlan.points:[...(currentRouteStart()?[currentRouteStart()]:[]),...routeRecords()],
 color:(cat,record)=>record?.markerColor||CATEGORIES[cat]?.[1]||'#e8c998',symbol:cat=>CATEGORY_SYMBOLS[cat]||'✦',
 select:place=>{choosePlace(place);window.teamJuraNav?.terrain()?.rebase()},notice:msg=>announce(msg),textureDraw:(target,box)=>drawTerrainTexture(target,box),
 setRoutePlan:(plan,places)=>{navPlan=plan;navPlanScope=routeScope();render()},
 clearRoutePlan:()=>{navPlan=null;navPlanScope=null;render()},
 fitPoints:places=>{const xs=places.map(p=>p.x),ys=places.map(p=>p.y);if(!xs.length)return;const dx=Math.max(250,Math.max(...xs)-Math.min(...xs)),dy=Math.max(250,Math.max(...ys)-Math.min(...ys));camera.x=(Math.min(...xs)+Math.max(...xs))/2;camera.y=(Math.min(...ys)+Math.max(...ys))/2;camera.z=clamp(Math.log2(Math.min((Math.max(width,350)-120)/dx,(Math.max(height,400)-170)/dy)*32),0,5);schedulePaint();window.teamJuraNav?.terrain()?.rebase();}
};
// Atlas 6.2.2: public read-only map catalog and supported legend actions for dual floating legends.
// Atlas 6.3: legend bridge uses existing data/filter/routing infrastructure.
window.JuraDualLegendAPI=Object.freeze({
 state:()=>({game,style:styles[game],mode}),
 categories:()=>Object.entries(CATEGORIES).map(([id,[label,color]])=>({id,label,color,enabled:enabled().has(id),count:records().filter(r=>r.category===id).length})),
 namedLayers:()=>layersForRows(records()).map(l=>({id:l.id,label:l.title,count:l.count,enabled:!namedHidden().has(l.id)})),
 toggleLayer:id=>{const l=layersForRows(records()).find(v=>v.id===id);if(l)updateNamedLayerVisibility([id],namedHidden().has(id))},
 onlyLayer:id=>{const l=layersForRows(records()).find(v=>v.id===id);if(!l)return;active[filterScope()]=null;hiddenNamed[namedScope()]=layersForRows(records()).filter(v=>v.id!==id).map(v=>v.id);store('jura62-named-layers',hiddenNamed);page=0;render()},
 trailerRecords:()=>game==='6'?records().filter(r=>/\btrailer\b|\bfootage\b|\bscene\b/i.test([r.name,r.district||'',r.collectionType||'',r.source||'',r.evidence||'',...(r.tags||[])].join(' '))).slice(0,750):[],
 toggleCategory:id=>{if(!CATEGORIES[id])return;const chosen=new Set(enabled());if(chosen.has(id))chosen.delete(id);else chosen.add(id);active[filterScope()]=chosen;page=0;render()},
 onlyCategory:id=>{if(!CATEGORIES[id])return;active[filterScope()]=new Set([id]);page=0;render()},
 allCategories:on=>{active[filterScope()]=on?null:new Set();page=0;render()},
 selectPlace:id=>{const place=records().find(r=>r.id===id);if(place)choosePlace(place)},
 addRouteStop:id=>{const place=records().find(r=>r.id===id);if(place)window.teamJuraNav?.setRoutePoint(place)},
 openNavigation:()=>window.teamJuraNav?.open(),
 setQuery:q=>{const el=$('search');if(!el)return;el.value=q;page=0;render()}
});

function init(){if(!ctx){$('mapStatus').textContent='This browser does not support the HTML canvas map.';return}
 const photo=$('selectedPhoto'),figure=$('selectedPhotoFigure');if(photo&&figure){photo.onload=()=>{figure.hidden=false};photo.onerror=()=>{figure.hidden=true}};

 $('districtFilter').oninput=()=>{page=0;render()};$('findNearby').onclick=()=>{nearbyActive=true;renderNearby()};$('nearbyToRoute').onclick=addNearbyToRoute;$('nearbyRadius').onchange=()=>{if(nearbyActive)renderNearby()};$('nearbyOrigin').onchange=()=>{if(nearbyActive)renderNearby()};$('shareCoords').onclick=shareCoordinateLocation;$('useMapCenter').onclick=centerToCoordinates;
 $('game5').onclick=()=>switchGame('5');$('game6').onclick=()=>switchGame('6');$('gameOnline').onclick=()=>switchGame('online');$('search').oninput=()=>{page=0;render()};$('allOn').onclick=()=>{active[filterScope()]=null;hiddenNamed[namedScope()]=[];store('jura62-named-layers',hiddenNamed);page=0;render();toast('All available categories and named layers on.')};$('allOff').onclick=()=>{active[filterScope()]=new Set();page=0;render();toast('All categories off. Select one to show it.')};
 if($('namedLayerSearch'))$('namedLayerSearch').oninput=renderNamedLayers;
 if($('namedLayerShowAll'))$('namedLayerShowAll').onclick=()=>updateNamedLayerVisibility(layersForRows(records()).map(l=>l.id),true);
 if($('namedLayerHideAll'))$('namedLayerHideAll').onclick=()=>updateNamedLayerVisibility(layersForRows(records()).map(l=>l.id),false);
 $('hideFound').onchange=e=>{onlyUnfound=e.target.checked;page=0;render()};$('favoritesOnly').onchange=e=>{onlyFavorites=e.target.checked;page=0;render()};$('showUnverified').onchange=e=>{showUnverified=e.target.checked;page=0;render()};$('serviceSearch').oninput=renderServices;$('serviceType').onchange=renderServices;for(const t of ['Find','Services','Collections','Vehicles','Route','Pins'])$('tab'+t).onclick=()=>showTab(t);$('prev').onclick=()=>{page--;renderFind()};$('next').onclick=()=>{page++;renderFind()};if($('density')){$('density').value='individual';$('density').disabled=true;}
 $('goCoords').onclick=goToCoordinates;$('coordinateY').addEventListener('keydown',e=>{if(e.key==='Enter')goToCoordinates()});
 $('refreshSources').onclick=()=>loadSources(true);$('enableSources').onclick=()=>{for(const id of Object.keys(sourceRecords)){sourceEnabled[id]=true;if(window.JuraSources.SOURCES[id]?.game===game)revealSourceCategories(sourceRecords[id]);}store('jura55-source-visible',sourceEnabled);renderSources();render();announce('Showing only loaded overlays. Select additional layers to download their records.');};
 const navButton=$('quickDirections'),photoButton=$('quickPhotos'),mapButton=$('quickMap'),threeD=$('threeDReference');
 if(navButton)navButton.onclick=()=>{window.teamJuraNav?.open();showTab('Route');$('sidebar').classList.remove('mobile-collapsed');$('sidebar').scrollIntoView({behavior:'smooth',block:'start'});announce('Directions: select a starting point and add stops. Smart routes use straight-line distance, not roads.');};
 if(photoButton)photoButton.onclick=()=>{if(!selected){showTab('Find');$('sidebar').classList.remove('mobile-collapsed');toast('Select a map pin first to view its licensed source photo.');return;}updateSelected();$('selectedCard').classList.remove('hidden');if($('selectedPhotoFigure').hidden)toast('No licensed in-game source photo is available for this location.');else $('selectedPhotoFigure').scrollIntoView({behavior:'smooth',block:'nearest'});};
 if(mapButton)mapButton.onclick=()=>{window.teamJuraNav?.setDimension('2d');selected=null;updateSelected();fitGame();announce('2D map overview.');};
 if(threeD)threeD.onclick=()=>window.teamJuraNav?.setDimension('3d');
 if($('overlayOpacity')){$('overlayOpacity').value=String(overlayOpacity);$('opacityValue').textContent=overlayOpacity+'%';$('overlayOpacity').oninput=()=>{overlayOpacity=Number($('overlayOpacity').value);$('opacityValue').textContent=overlayOpacity+'%';store('jura60-overlay-opacity',overlayOpacity);schedulePaint()};}
 if($('atlasListSort'))$('atlasListSort').onchange=e=>{listOrder=e.target.value;page=0;renderFind();schedulePaint()};if($('atlasExportVisible'))$('atlasExportVisible').onclick=exportVisibleCSV;
 $('layer').onchange=()=>{styles[game]=$('layer').value;document.dispatchEvent(new Event('jura:legend-updated'));tilesErrors=0;tilesLoaded=0;tileHealth();schedulePaint();window.teamJuraNav?.terrain()?.rebase();announce('Loading GTA '+game+' '+$('layer').selectedOptions[0].textContent+' map view…')};$('resetView').onclick=()=>{fitGame();announce('Showing the whole GTA '+game+' map.')};$('zoomIn').onclick=()=>zoomBy(.5);$('zoomOut').onclick=()=>zoomBy(-.5);
 $('togglePins').onclick=()=>{showPins=!showPins;$('togglePins').textContent=showPins?'📍 Pins on':'📍 Pins off';$('togglePins').setAttribute('aria-pressed',String(showPins));schedulePaint()};$('mobileTools').onclick=()=>{$('sidebar').classList.toggle('mobile-collapsed');if(!$('sidebar').classList.contains('mobile-collapsed'))$('sidebar').scrollIntoView({behavior:'smooth',block:'start'})};$('original').onclick=()=>window.open('https://map.gtadb.org/','_blank','noopener,noreferrer');
 $('selectedStart').onclick=()=>{if(selected){setRouteStart(selected);window.teamJuraNav?.setStart(selected);showTab('Route')}};if($('selectedNavigate'))$('selectedNavigate').onclick=()=>{if(selected)window.teamJuraNav?.setRoutePoint(selected)};$('closeSelected').onclick=()=>{selected=null;updateSelected();schedulePaint()};$('selectedFound').onclick=()=>{if(selected)toggleFound(selected)};$('selectedRoute').onclick=()=>{if(selected)toggleRoute(selected)};$('shareSelected').onclick=async()=>{
 if(!selected)return;
 if(!/^gtadb-[56]-L\d+$/.test(selected.id)&&!/^jura-(?:story-|vi-|[a-z]+-)/.test(selected.id)){announce('Custom pins stay on your device. Export a backup to move them.');return}
 const page=game==='6'?'atlas-vi.html':mode==='online'?'atlas-online.html':'atlas.html';
 const u=new URL('./'+page,document.baseURI);u.searchParams.set('place',selected.id);
 try{await navigator.clipboard.writeText(u.href);announce('Shareable source location link copied.')}catch{
  try{window.prompt('Copy the landmark link:',u.href)}catch{};
  announce('Share link displayed. Copy it to share this mapped landmark.');
 }
};$('addPin').onclick=()=>beginSpecialPin('user');$('addCollectible').onclick=()=>beginSpecialPin('collectible');$('addVehicle').onclick=()=>beginSpecialPin('vehicle');$('loadPack').onclick=()=>$('packFile').click();$('packFile').onchange=e=>readPack(e.target.files?.[0]);
 $('routeVisible').onclick=autoRouteVisible;$('pickRouteStart').onclick=()=>{chooseRouteStartMode=true;addPinMode=false;announce('Tap a marker or an empty map position to select your starting point.');if(innerWidth<=700){$('sidebar').classList.add('mobile-collapsed');window.scrollTo({top:0,behavior:'smooth'})}};$('optimize').onclick=optimizeRoute;$('fitRoute').onclick=fitRoute;$('clearRoute').onclick=()=>{routes[routeScope()]=[];persist();render();toast('GTA '+game+' route cleared.')};$('copyRoute').onclick=async()=>{const s=routeRecords().map((r,i)=>`${i+1}. ${r.name} (X ${r.x.toFixed(0)}, Y ${r.y.toFixed(0)})`).join('\n');if(!s)return toast('No stops to copy.');try{await navigator.clipboard.writeText(s);toast('Route copied.')}catch{toast('Clipboard unavailable; use Export backup instead.')}};
 $('exportData').onclick=exportBackup;$('importData').onclick=()=>$('importFile').click();$('importFile').onchange=e=>importBackup(e.target.files?.[0]);$('refresh').onclick=async()=>{dataNotice('Checking our GTA VI licensed data snapshot…');await loadDataset('6',true);render()};$('saveOffline').onclick=saveOffline;$('stopOffline').onclick=()=>{offlineStop=true;$('offlineStatus').textContent='Stopping after current tiles finish…'};
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){e.preventDefault();$('search').focus()}if(e.key==='Escape'){selected=null;addPinMode=false;chooseRouteStartMode=false;updateSelected();schedulePaint()}});
 window.addEventListener('storage',e=>{if(e.key==='jura3-progress'){progress=loadStore('jura3-progress',{});render()}if(e.key==='jura-atlas-routes'){routes=loadStore('jura-atlas-routes',{'5':[],'6':[]});render()}});
 if(window.JuraNavigation)window.teamJuraNav=window.JuraNavigation.create(juraBridge);
 const observer=new ResizeObserver(resize);observer.observe(canvas);window.addEventListener('resize',resize);const start=document.body.dataset.startWorld||new URLSearchParams(location.search).get('world')|| (location.hash==='#game6'?'6':location.hash==='#gameonline'?'online':'5');switchGame(['5','6','online'].includes(start)?start:'5');
 const params=new URLSearchParams(location.search);const q=params.get('search'),cat=params.get('category');
 if(!params.has('place')&&params.has('x')&&params.has('y')){const x=Number(params.get('x')),y=Number(params.get('y')),z=Number(params.get('zoom'));if(Number.isFinite(x)&&Number.isFinite(y)&&Math.abs(x)<=16384&&Math.abs(y)<=16384){$('coordinateX').value=String(x);$('coordinateY').value=String(y);goToCoordinates();if(Number.isFinite(z)&&z>=MIN_Z&&z<=MAX_Z){camera.z=z;schedulePaint()}}}
 if(q)$('search').value=q.slice(0,100);
 if(cat&&CATEGORIES[cat]){active[filterScope()]=new Set([cat]);showTab('Services')}
 if(q||cat)render();readPacks();renderSources();loadDataset('5');loadDataset('6');loadSources();
 if('serviceWorker'in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./atlas-sw.js?v=621',{scope:'./'}).catch(()=>{});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
