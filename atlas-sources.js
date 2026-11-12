/* Team Jura Atlas 5.5 - documented community source adapters.
 * Maps source coordinates into the EXACT 32768-unit GTADB Atlas world used by atlas.js.
 * Source downloads use their published JSON files, never scrape GTAWeb or GTADB production.
 */
(function(root){'use strict';
const SOURCES={
 story:{label:'GTA V · Story collectibles and challenges',game:'5',scope:'story',url:'https://raw.githubusercontent.com/danharper/GTAV/master/locations.json',license:'WTFPL',credit:'danharper/GTAV contributors · WTFPL · community locations',count:276},
 vi:{label:'GTA VI · trailer research (provisional)',game:'6',scope:'story',url:'https://mapheist.com/data/mapheist-points.json',license:'CC BY 4.0',credit:'Mapheist.com · CC BY 4.0 · provisional map points',count:77},
 atms:{label:'GTA V/Online · ATM objects',game:'5',scope:'both',url:'https://fivem-minimaps.com/data/atms.json',license:'reuse permitted by publisher',credit:'MiniMaps for FiveM · DurtyFree object placement data',count:121,category:'shop'},
 pumps:{label:'GTA V/Online · fuel pump objects',game:'5',scope:'both',url:'https://fivem-minimaps.com/data/gas-pumps.json',license:'reuse permitted by publisher',credit:'MiniMaps for FiveM · DurtyFree object placement data',count:157,category:'fuel'},
 buses:{label:'GTA V/Online · bus stop objects',game:'5',scope:'both',url:'https://fivem-minimaps.com/data/bus-stops.json',license:'reuse permitted by publisher',credit:'MiniMaps for FiveM · DurtyFree object placement data',count:49,category:'transport'},
 towers:{label:'GTA V/Online · masts and towers',game:'5',scope:'both',url:'https://fivem-minimaps.com/data/masts-and-towers.json',license:'reuse permitted by publisher',credit:'MiniMaps for FiveM · DurtyFree object placement data',count:125,category:'utility'}
};
/* 8 precisely matched GTA V spaceship parts from Dan Harper's public map against
   the independently published GTA world X/Y coordinate references.
   The source lat/lng values are Leaflet Web-Mercator *image* coordinates,
   not Earth's locations. x is affine in longitude; y is affine in Mercator Y.
   Initial eight-anchor fit RMS < 0.4 world units; six holdouts differ <=2 units.
   References: https://github.com/danharper/GTAV/blob/master/locations.json
   and https://outlawdb.com/en/gta-5/map/spaceship-part.
 */
function gtaVFromLegacy(lat,lng){
 if(!Number.isFinite(lat)||!Number.isFinite(lng)||lat<=-89.9||lat>=89.9)return null;
 const merc=Math.log(Math.tan(Math.PI/4+lat*Math.PI/360));
 const x=103.22126231*lng+12851.6855908;
 const y=5913.52505828*merc-10162.16009065;
 return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;
}
/* mapheist's YANIS-v16 pixel convention is 0..32768. Atlas/GTADB uses
   x=px-16384 and y=16384-py with north-positive Y. Future community
   remappings may change individual points even if this transform is correct. */
function leonidaFromPixels(px,py){if(!Number.isFinite(px)||!Number.isFinite(py)||px<0||px>32768||py<0||py>32768)return null;return{x:px-16384,y:16384-py};}
const cleanText=(v,max=180)=>typeof v==='string'?v.trim().slice(0,max):'';
const valid=(p)=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Math.abs(p.x)<=16384&&Math.abs(p.y)<=16384;
function storyRows(data){if(!Array.isArray(data))throw Error('Story source format changed');const out=[];for(const v of data){if(!v||!Number.isInteger(v.id)||!v.title)continue;const p=gtaVFromLegacy(v.lat,v.lng);if(!valid(p))continue;
 const type=cleanText(v.type,60),isVehicle=/Vehicle Spawn|Epsilon Car/i.test(type),isActivity=/Stunt Jump|Knife Flight|Under the Bridge/i.test(type);
 out.push({id:'jura-story-'+v.id,game:'5',scope:'story',name:cleanText(v.title),x:p.x,y:p.y,category:isVehicle?'vehicle':isActivity?'activity':'collectible',tags:[type],source:SOURCES.story.credit,sourceUrl:'https://github.com/danharper/GTAV/blob/master/locations.json',uncertain:true,confidence:'community mapped · calibrated',evidence:'Legacy map position fitted to GTA V world coordinates',detail:'Community research. Check access and numbering against a current guide.',sourceId:'story'});
 }if(out.length<260)throw Error('Story source has too few usable locations');return out;}
function viRows(data){if(!data||!Array.isArray(data.points))throw Error('Leonida source format changed');const out=[];for(const v of data.points){if(!v||typeof v.id!=='string')continue;const p=leonidaFromPixels(v.leonida_x,v.leonida_y);if(!valid(p))continue;
 const title=cleanText(v.game_name_en||v.title_en||v.id),kind=cleanText(v.kind,35),conf=cleanText(v.confidence,25),region=cleanText(v.region,35);
 out.push({id:'jura-vi-'+v.id.replace(/[^a-zA-Z0-9_-]/g,'').slice(0,65),game:'6',scope:'story',name:title,x:p.x,y:p.y,category:'landmark',tags:[kind,region].filter(Boolean),source:SOURCES.vi.credit,sourceUrl:/^https:\/\/mapheist\.com\//.test(v.case_url_en||'')?v.case_url_en:SOURCES.vi.url,uncertain:true,confidence:'provisional · '+(conf||'community'),evidence:'Mapheist trailer research / YANIS v16 pixel position',detail:cleanText(v.real_place_en,200),sourceId:'vi'});
 }if(out.length<50)throw Error('Leonida source has too few mapped locations');return out;}
function objectRows(data,id){if(!data||!Array.isArray(data.rows))throw Error(id+' object source format changed');const cfg=SOURCES[id],out=[];
 for(const [i,v] of data.rows.entries()){if(!valid(v))continue;let model=cleanText(v.model,70),district=cleanText(v.district,70);
 const name=(id==='atms'?'ATM':id==='pumps'?(model==='prop_gas_airunit01'?'Air/water service unit':'Fuel pump'):id==='buses'?'Bus stop':'Radio mast / antenna')+(district?' · '+district:'')+' #'+(i+1);
 out.push({id:'jura-'+id+'-'+i,game:'5',scope:'both',name,x:v.x,y:v.y,category:cfg.category,tags:[model,district].filter(Boolean),source:cfg.credit,sourceUrl:'https://fivem-minimaps.com/locations/'+(id==='pumps'?'gas-pumps':id==='buses'?'bus-stops':id==='towers'?'masts-and-towers':'atms'),uncertain:false,confidence:'source game-object placement',evidence:'Base-game prop coordinates; Online world and gameplay interaction may differ',detail:'Model '+model+(Number.isFinite(v.z)?' · Z '+v.z:'')+(Number.isFinite(v.heading)?' · heading '+v.heading+'°':''),sourceId:id});}
 if(out.length<Math.floor(cfg.count*0.75))throw Error(id+' source has too few usable rows');return out;}
function parse(id,data){if(id==='story')return storyRows(data);if(id==='vi')return viRows(data);if(SOURCES[id])return objectRows(data,id);throw Error('Unknown data source');}
async function getJSON(id,refresh=false){const src=SOURCES[id];if(!src)throw Error('Unknown data source');
 const KEY='team-jura-atlas-55-source-data';let cached=null;
 try{if(typeof caches!=='undefined'){const cache=await caches.open(KEY);const saved=await cache.match(src.url);if(saved)cached=await saved.json();}}catch{}
 if(cached&&!refresh)return{data:cached,cache:true};
 try{const resp=await fetch(src.url,{mode:'cors',cache:refresh?'reload':'default'});if(!resp.ok)throw Error('HTTP '+resp.status);const data=await resp.json();parse(id,data);try{if(typeof caches!=='undefined'){const c=await caches.open(KEY);await c.put(src.url,new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json'}}));}}catch{}return{data,cache:false};}
 catch(err){if(cached)return{data:cached,cache:true,warning:String(err?.message||err)};throw err;}
}
async function load(id,refresh=false){const {data,cache,warning}=await getJSON(id,refresh);return{records:parse(id,data),cache,warning:warning||''};}
root.JuraSources=Object.freeze({SOURCES,gtaVFromLegacy,leonidaFromPixels,parse,load});
})(typeof window==='undefined'?globalThis:window);
