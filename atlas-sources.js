/* Team Jura Atlas 5.7 - documented community source adapters.
 * Maps source coordinates into the EXACT 32768-unit GTADB Atlas world used by atlas.js.
 * Source downloads use their published JSON files, never scrape GTAWeb or GTADB production.
 */
(function(root){'use strict';
const SOURCES={
 story:{label:'GTA V Story · collectibles/challenges',game:'5',scope:'story',url:'https://raw.githubusercontent.com/danharper/GTAV/master/locations.json',license:'WTFPL',credit:'danharper/GTAV · WTFPL',count:276,kind:'collectibles'},
 vi:{label:'GTA VI · trailer research (provisional)',game:'6',scope:'story',url:'https://mapheist.com/data/mapheist-points.json',license:'CC BY 4.0',credit:'Mapheist.com · CC BY 4.0',count:77,kind:'research'},
 atms:{label:"World objects · ATMs",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/atms.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:121,kind:'objects',category:'shop',slug:'atms',name:"ATM"},
 pumps:{label:"World objects · Fuel pumps",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/gas-pumps.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:157,kind:'objects',category:'fuel',slug:'gas-pumps',name:"Fuel pump"},
 buses:{label:"World objects · Bus stops",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/bus-stops.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:49,kind:'objects',category:'transport',slug:'bus-stops',name:"Bus stop"},
 phones:{label:"World objects · Public phones",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/public-phones.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:759,kind:'objects',category:'utility',slug:'public-phones',name:"Public phone"},
 vending:{label:"World objects · Vending machines",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/vending-machines.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:345,kind:'objects',category:'shop',slug:'vending-machines',name:"Vending machine"},
 post:{label:"World objects · Post boxes",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/post-boxes.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:573,kind:'objects',category:'utility',slug:'post-boxes',name:"Post boxe"},
 parking:{label:"World objects · Parking meters",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/parking-meters.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:547,kind:'objects',category:'transport',slug:'parking-meters',name:"Parking meter"},
 cctv:{label:"World objects · CCTV cameras",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/cctv-cameras.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:1647,kind:'objects',category:'utility',slug:'cctv-cameras',name:"CCTV camera"},
 hydrants:{label:"World objects · Fire hydrants",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/fire-hydrants.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:1458,kind:'objects',category:'utility',slug:'fire-hydrants',name:"Fire hydrant"},
 lights:{label:"World objects · Traffic lights",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/traffic-lights.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:1058,kind:'objects',category:'transport',slug:'traffic-lights',name:"Traffic light"},
 streetlights:{label:"World objects · Street lights",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/street-lights.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:5896,kind:'objects',category:'utility',slug:'street-lights',name:"Street light"},
 bins:{label:"World objects · Bins and dumpsters",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/bins-and-dumpsters.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:7764,kind:'objects',category:'utility',slug:'bins-and-dumpsters',name:"Bins and dumpster"},
 benches:{label:"World objects · Benches and seats",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/benches-and-seats.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:8065,kind:'objects',category:'leisure',slug:'benches-and-seats',name:"Benches and seat"},
 power:{label:"World objects · Electricity boxes",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/electricity-boxes.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:1931,kind:'objects',category:'utility',slug:'electricity-boxes',name:"Electricity boxe"},
 dishes:{label:"World objects · Satellite dishes",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/satellite-dishes.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:836,kind:'objects',category:'utility',slug:'satellite-dishes',name:"Satellite dishe"},
 papers:{label:"World objects · Newspaper dispensers",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/newspaper-dispensers.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:796,kind:'objects',category:'shop',slug:'newspaper-dispensers',name:"Newspaper dispenser"},
 harvest:{label:"World objects · Harvest fields",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/harvest-fields.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:623,kind:'objects',category:'nature',slug:'harvest-fields',name:"Harvest field"},
 wrecks:{label:"World objects · Wrecked vehicles",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/wrecked-vehicles.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:639,kind:'objects',category:'other',slug:'wrecked-vehicles',name:"Wrecked vehicle"},
 recycle:{label:"World objects · Recycling bins",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/recycle-bins.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:133,kind:'objects',category:'utility',slug:'recycle-bins',name:"Recycling bin"},
 industry:{label:"World objects · Industrial sites",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/industrial-sites.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:216,kind:'objects',category:'industry',slug:'industrial-sites',name:"Industrial site"},
 towers:{label:"World objects · Masts and towers",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/masts-and-towers.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:125,kind:'objects',category:'utility',slug:'masts-and-towers',name:"Masts and tower"},
 leisure:{label:"World objects · Street food and leisure",game:'5',scope:'both',url:"https://fivem-minimaps.com/data/street-food-and-leisure.json",license:'Publisher permits reuse',credit:'MiniMaps for FiveM · derived from DurtyFree GTA V dumps',count:174,kind:'objects',category:'leisure',slug:'street-food-and-leisure',name:"Street food and leisure"},
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
function storyRows(data){if(!Array.isArray(data))throw Error('Story source format changed');const out=[];const byType={};for(const v of data){if(!v||!Number.isInteger(v.id)||!v.title)continue;const p=gtaVFromLegacy(v.lat,v.lng);if(!valid(p))continue;
 const type=cleanText(v.type,60),setSlot=(byType[type]=(byType[type]||0)+1),isVehicle=/Vehicle Spawn|Epsilon Car/i.test(type),isActivity=/Stunt Jump|Knife Flight|Under the Bridge/i.test(type);
 out.push({id:'jura-story-'+v.id,game:'5',scope:'story',name:cleanText(v.title),x:p.x,y:p.y,collectionType:type,collectionSlot:setSlot,category:isVehicle?'vehicle':isActivity?'activity':'collectible',tags:[type],source:SOURCES.story.credit,sourceUrl:'https://github.com/danharper/GTAV/blob/master/locations.json',uncertain:true,confidence:'community mapped · calibrated',evidence:'Legacy map position fitted to GTA V world coordinates',detail:'Community research. Check access and numbering against a current guide.',sourceId:'story'});
 }if(out.length<260)throw Error('Story source has too few usable locations');return out;}
function viRows(data){if(!data||!Array.isArray(data.points))throw Error('Leonida source format changed');const out=[];for(const v of data.points){if(!v||typeof v.id!=='string')continue;const p=leonidaFromPixels(v.leonida_x,v.leonida_y);if(!valid(p))continue;
 const title=cleanText(v.game_name_en||v.title_en||v.id),kind=cleanText(v.kind,35),conf=cleanText(v.confidence,25),region=cleanText(v.region,35);
 out.push({id:'jura-vi-'+v.id.replace(/[^a-zA-Z0-9_-]/g,'').slice(0,65),game:'6',scope:'story',name:title,x:p.x,y:p.y,category:'landmark',tags:[kind,region].filter(Boolean),source:SOURCES.vi.credit,sourceUrl:/^https:\/\/mapheist\.com\//.test(v.case_url_en||'')?v.case_url_en:SOURCES.vi.url,uncertain:true,confidence:'provisional · '+(conf||'community'),evidence:'Mapheist trailer research / YANIS v16 pixel position',detail:cleanText(v.real_place_en,200),sourceId:'vi'});
 }if(out.length<50)throw Error('Leonida source has too few mapped locations');return out;}
function objectRows(data,id){if(!data||!Array.isArray(data.rows))throw Error(id+' object source format changed');const cfg=SOURCES[id],out=[];
 for(const [i,v] of data.rows.entries()){if(!valid(v))continue;let model=cleanText(v.model,70),district=cleanText(v.district,70);
 const name=(cfg.name||cfg.label)+(district?' · '+district:'')+' #'+(i+1);
 out.push({id:'jura-'+id+'-'+i,game:'5',scope:'both',name,x:v.x,y:v.y,district,category:cfg.category,tags:[model,district].filter(Boolean),source:cfg.credit,sourceUrl:'https://fivem-minimaps.com/locations/'+cfg.slug,uncertain:false,confidence:'base-game prop position (not collectible)',evidence:'Base-game prop coordinates; Online world and gameplay interaction may differ',detail:'Model '+model+(Number.isFinite(v.z)?' · Z '+v.z:'')+(Number.isFinite(v.heading)?' · heading '+v.heading+'°':''),sourceId:id});}
 if(out.length<Math.floor(cfg.count*0.75))throw Error(id+' source has too few usable rows');return out;}
function parse(id,data){if(id==='story')return storyRows(data);if(id==='vi')return viRows(data);if(SOURCES[id]?.kind==='objects')return objectRows(data,id);throw Error('Unknown data source');}
async function getJSON(id,refresh=false){const src=SOURCES[id];if(!src)throw Error('Unknown data source');
 const KEY='team-jura-atlas-57-source-data';let cached=null;
 try{if(typeof caches!=='undefined'){const cache=await caches.open(KEY);const saved=await cache.match(src.url);if(saved)cached=await saved.json();}}catch{}
 if(cached&&!refresh)return{data:cached,cache:true};
 try{const resp=await fetch(src.url,{mode:'cors',cache:refresh?'reload':'default'});if(!resp.ok)throw Error('HTTP '+resp.status);const data=await resp.json();parse(id,data);try{if(typeof caches!=='undefined'){const c=await caches.open(KEY);await c.put(src.url,new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json'}}));}}catch{}return{data,cache:false};}
 catch(err){if(cached)return{data:cached,cache:true,warning:String(err?.message||err)};throw err;}
}
async function load(id,refresh=false){const {data,cache,warning}=await getJSON(id,refresh);return{records:parse(id,data),cache,warning:warning||''};}
root.JuraSources=Object.freeze({SOURCES,gtaVFromLegacy,leonidaFromPixels,parse,load,OBJECT_TOTAL:33912});
})(typeof window==='undefined'?globalThis:window);
