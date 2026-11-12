/* Team Jura Atlas 6.8: independent, data-driven activity and marker conditions.
 * Rules describe known game mechanics, NOT a live account connection or daily-location feed.
 * Sources: gtadb.net/gta-online-map/interactive/ , gun-van/, street-dealers/,
 * ghosts-exposed-2026/ and articles/gta-online-cayo-perico-buried-stashes/.
 * Import only location data and artwork with permission; never turn guesses into 'active'.
 */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.JuraConditions=api;})(typeof globalThis!=='undefined'?globalThis:null,function(){'use strict';
const GH=[
 ['ghost-1','Ghost #1 · Paleto Bay',20,'Paleto Bay, damaged house'],
 ['ghost-2','Ghost #2 · Strawberry',21,'Encampment beneath freeway'],
 ['ghost-3','Ghost #3 · Grapeseed',22,'Damaged barn by Joad Lane'],
 ['ghost-4','Ghost #4 · Miriam Turner Overpass',23,'Overpass near the airport'],
 ['ghost-5','Ghost #5 · Cape Catfish',1,'Lighthouse'],
 ['ghost-6','Ghost #6 · Cypress Flats',2,'Raven warehouse and railway'],
 ['ghost-7','Ghost #7 · Grand Senora Desert',3,'Abandoned house'],
 ['ghost-8','Ghost #8 · Little Seoul',4,'Little Seoul Tower'],
 ['ghost-9','Ghost #9 · Tongva Hills',5,'Two Hoots Falls'],
 ['ghost-10','Ghost #10 · Paleto Cove',0,'Sonar Collections Dock; first nine photos required']
];
const RULES=[
 {id:'gun-van',name:'Gun Van location',kind:'rotation',group:'Daily rotations',pool:30,today:1,reset:6,source:'https://gtadb.net/gta-online-map/gun-van/',detail:'Location changes daily at 06:00 UTC. Weekly stock is tracked separately.'},
 {id:'shipwreck',name:'Shipwreck chest',kind:'rotation',group:'Daily rotations',pool:30,today:1,reset:6,source:'https://gtadb.net/gta-online-map/shipwrecks/',detail:'One daily chest; some possible sites may not be in the current pool.'},
 {id:'street-dealers',name:'Street Dealers',kind:'rotation',group:'Daily rotations',pool:50,today:3,reset:7,source:'https://gtadb.net/gta-online-map/street-dealers/',detail:'Three daily dealers, 07:00 UTC reset. Daily premium products are a separate data field.'},
 {id:'smoke-products',name:'Smoke on the Water products',kind:'rotation',group:'Daily rotations',pool:30,today:10,reset:6,source:'https://gtadb.net/gta-online-map/interactive/',detail:'Ten daily positions; use the verified dated selection.'},
 {id:'ls-tags',name:'LS Tags posters',kind:'rotation',group:'Daily rotations',pool:30,today:5,reset:6,requires:['spray-can'],source:'https://gtadb.net/gta-online-map/interactive/',detail:'Five daily posters. A spray can is acquired once; any of the 30 spray-can sites may serve.'},
 {id:'hidden-caches',name:'Hidden Caches',kind:'rotation',group:'Daily rotations',pool:100,today:10,reset:6,source:'https://gtadb.net/gta-online-map/interactive/',detail:'Ten active daily. Possible pool points are not all active.'},
 {id:'junk-skydives',name:'Junk Energy Skydives',kind:'rotation',group:'Daily rotations',pool:25,today:10,reset:6,source:'https://gtadb.net/gta-online-map/interactive/',detail:'These are challenge activation points, not checkpoints or landing sites.'},
 {id:'cayo-chests',name:'Cayo Treasure Chests',kind:'rotation',group:'Cayo Perico',today:2,reset:6,requires:['cayo-intel'],source:'https://gtadb.net/gta-online-map/interactive/',detail:'Two daily Cayo chests during island reconnaissance; separate from mainland Shipwrecks.'},
 {id:'cayo-stashes',name:'Cayo Buried Stashes',kind:'rotation',group:'Cayo Perico',pool:20,today:2,reset:6,requires:['metal-detector','cayo-intel'],source:'https://gtadb.net/articles/gta-online-cayo-perico-buried-stashes/',detail:'Find Metal Detector once and visit Cayo during Gather Intel. The marker is a search area, not an exact dig spot.'},
 {id:'spray-cans',name:'LS Tags spray cans',kind:'permanent',group:'Prerequisites & progress',pool:30,source:'https://gtadb.net/gta-online-map/interactive/',detail:'A one-time prerequisite for tagging posters, not a daily rotation.'},
 {id:'metal-detector-event',name:'Metal Detector skeleton',kind:'session',group:'Prerequisites & progress',source:'https://gtadb.net/articles/gta-online-cayo-perico-buried-stashes/',detail:'Coastal random event. Finding the detector once unlocks future Cayo Buried Stashes.'},
 {id:'movie-props',name:'Solomon Movie Props',kind:'session',group:'Player / session conditions',unique:10,positions:16,source:'https://gtadb.net/gta-online-map/interactive/',detail:'Ten unique props can have sixteen possible markers. Some props move or have alternative spawn locations.'},
 {id:'exotic-exports',name:'Exotic Exports',kind:'session',group:'Player / session conditions',requires:['auto-shop'],source:'https://gtadb.net/gta-online-map/interactive/',detail:'Vehicle spawns depend on each player’s board and freemode/session conditions; no globally valid yellow pin.'},
 {id:'simeon-vehicles',name:'Simeon requested vehicles',kind:'session',group:'Player / session conditions',source:'https://gtadb.net/gta-online-map/interactive/',detail:'Requested models and encountered car spawns vary; possible parking spots are not guaranteed active.'},
 {id:'vehicle-delivery',name:'Personal vehicle delivery points',kind:'prerequisite',group:'Player / session conditions',requires:['owned-vehicle'],source:'https://gtadb.net/gta-online-map/interactive/',detail:'Availability depends on owned service vehicles and the current game/session.'},
 {id:'gun-van-stock',name:'Gun Van inventory',kind:'weekly',group:'Weekly & seasonal',source:'https://gtadb.net/gta-online-map/gun-van/',detail:'Stock/discounts change weekly independently from the daily Gun Van position.'},
 {id:'peyote',name:'Peyote Plants',kind:'seasonal',group:'Weekly & seasonal',event:'peyote',source:'https://gtadb.net/gta-online-map/interactive/',detail:'Only eligible during enabled events; map markers should not claim plants are currently active without an event source.'},
 {id:'pumpkins',name:'Jack O’Lanterns',kind:'seasonal',group:'Weekly & seasonal',event:'halloween',pool:200,source:'https://gtadb.net/gta-online-map/interactive/',detail:'Show every known pumpkin position. Track the current collection run independently from lifetime discoveries.'},
 {id:'ufo',name:'UFO sightings',kind:'seasonal',group:'Weekly & seasonal',event:'halloween',source:'https://gtadb.net/gta-online-map/interactive/',detail:'Needs a dated schedule plus hour/visibility rules; do not infer active sightings from season alone.'},
 {id:'snowmen',name:'Snowmen',kind:'seasonal',group:'Weekly & seasonal',event:'holiday',source:'https://gtadb.net/gta-online-map/interactive/',detail:'Seasonal only; track progress separately from current game availability.'},
 {id:'ghosts-exposed',name:'Ghosts Exposed 2026',kind:'clock-parent',group:'In-game clock',event:'halloween',source:'https://gtadb.net/gta-online-map/ghosts-exposed-2026/',detail:'Ten distinct in-game-hour windows. Ghost #10 at midnight requires photos of first nine.'},
 ...GH.map(([id,name,hour,detail],i)=>({id,name,kind:'clock',group:'In-game clock',event:'halloween',hour,ghostNumber:i+1,requires:i===9?['ghosts-nine']:[],source:'https://gtadb.net/gta-online-map/ghosts-exposed-2026/',detail})),
 {id:'cayo-heist-access',name:'Cayo access & scoped points',kind:'prerequisite',group:'Cayo Perico',requires:['cayo-intel'],source:'https://gtadb.net/articles/gta-online-cayo-perico-buried-stashes/',detail:'Access, scoping, discovered exits and approach availability vary by player and heist setup.'}
];
const STORY_RULES=[
 {id:'story-spaceship',name:'Spaceship Parts',kind:'permanent',group:'Story collectibles',expected:50,source:'https://gtadb.net/gta-5-map/',detail:'Franklin story collectible. Progress is local to Story Mode.'},
 {id:'story-letters',name:'Letter Scraps',kind:'permanent',group:'Story collectibles',expected:50,source:'https://gtadb.net/gta-5-map/',detail:'Story Mode collection, not a GTA Online rotation.'},
 {id:'story-nuclear',name:'Nuclear Waste',kind:'prerequisite',group:'Story collectibles',requires:['story-submarine'],expected:30,source:'https://gtadb.net/gta-5-map/',detail:'Collect with the appropriate submersible after unlocking the activity.'},
 {id:'story-epsilon',name:'Epsilon Tracts',kind:'prerequisite',group:'Story collectibles',requires:['story-epsilon'],expected:10,source:'https://gtadb.net/gta-5-map/',detail:'Appears in the appropriate story progression, not GTA Online.'},
 {id:'story-stunts',name:'Stunt Jumps',kind:'permanent',group:'Story challenges',expected:50,source:'https://gtadb.net/gta-5-map/',detail:'Story-mode jump challenges; visited location is not necessarily completed.'},
 {id:'story-bridges',name:'Under the Bridge',kind:'permanent',group:'Story challenges',expected:50,source:'https://gtadb.net/gta-5-map/',detail:'Story helicopter/aircraft flying challenge.'},
 {id:'story-knife',name:'Knife Flights',kind:'permanent',group:'Story challenges',expected:15,source:'https://gtadb.net/gta-5-map/',detail:'Story airplane knife-flight challenges.'},
 {id:'story-strangers',name:'Strangers and Freaks',kind:'prerequisite',group:'Story missions',requires:['story-progress'],source:'https://gtadb.net/gta-5-map/',detail:'Individual missions become available as the relevant character and story progress unlocks them.'}
];
const VI_RULES=[
 {id:'vi-trailer',name:'Trailer landmark research',kind:'research',group:'Leonida research',source:'https://gtadb.net/gta-6-map/interactive/',detail:'Trailer-identification records are community research, not verified playable game map locations.'},
 {id:'vi-screenshots',name:'Screenshot landmarks',kind:'research',group:'Leonida research',source:'https://gtadb.net/gta-6-map/interactive/',detail:'Search photographs and official footage, retaining sources and uncertainty.'},
 {id:'vi-regions',name:'Officially named regions',kind:'research',group:'Leonida research',source:'https://www.rockstargames.com/VI',detail:'Official region names; map boundaries and coordinates remain community estimated.'},
 {id:'vi-roads',name:'Road-network verification',kind:'unreleased',group:'Post-release verification',source:'https://gtadb.net/gta-6-map/interactive/',detail:'Do not advertise driving directions as verified until real gameplay routes and road restrictions are tested.'},
 {id:'vi-heists',name:'Future heist and mission research',kind:'unreleased',group:'Post-release verification',source:'https://www.rockstargames.com/VI',detail:'Add confirmed missions and locations after gameplay evidence. Do not import GTA Online missions as GTA VI activities.'},
 {id:'vi-online',name:'GTA VI multiplayer activities',kind:'unreleased',group:'Post-release verification',source:'https://www.rockstargames.com/VI',detail:'No GTA Online pumpkin, Gun Van, dealer or seasonal schedules should carry into GTA VI without separate evidence.'}
];
for(const r of RULES)r.mode='online';
for(const r of STORY_RULES)r.mode='story';
for(const r of VI_RULES)r.mode='vi';
RULES.push(...STORY_RULES,...VI_RULES);
const BY_ID=Object.fromEntries(RULES.map(r=>[r.id,r]));
function rulesForMode(mode){return RULES.filter(r=>r.mode===mode)};
const PREREQS=[['spray-can','Collected a spray can'],['metal-detector','Found Metal Detector'],['cayo-intel','Can access Gather Intel'],['auto-shop','Own an Auto Shop'],['owned-vehicle','Own the delivery vehicle'],['story-submarine','Unlocked suitable submersible'],['story-epsilon','Reached the appropriate Epsilon progression'],['story-progress','Relevant story progression unlocked']];
const EVENT_NAMES={halloween:'Halloween event confirmed active',peyote:'Peyote event confirmed active',holiday:'Holiday event confirmed active'};
function validIso(s){return typeof s==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(s)&&Number.isFinite(Date.parse(s));}
function nextReset(now,utcHour){const d=new Date(now);d.setUTCHours(utcHour,0,0,0);if(d.getTime()<=now)d.setUTCDate(d.getUTCDate()+1);return d.getTime();}
function rotationFeed(snapshot,id,now=Date.now()){
 const s=snapshot?.rotations?.[id];if(!s||!Array.isArray(s.activeIds)||!validIso(s.checkedAtUtc)||!validIso(s.validUntilUtc))return null;
 const checked=Date.parse(s.checkedAtUtc),end=Date.parse(s.validUntilUtc);
 if(checked>now+5*60e3||end<=now||end<=checked||checked<now-48*3600e3||s.activeIds.length>200||s.activeIds.some(v=>!/^[-a-z0-9_:]{1,80}$/i.test(String(v))))return null;
 const rule=BY_ID[id];if(!rule||rule.kind!=='rotation'||(rule.today&&s.activeIds.length>rule.today))return null;
 return{active:new Set(s.activeIds.map(String)),checkedAtUtc:s.checkedAtUtc,validUntilUtc:s.validUntilUtc,source:typeof s.source==='string'?s.source.slice(0,200):'Imported snapshot',confidence:'user-imported; independently unverified'};
}
function evaluate(id,ctx={}){
 const r=BY_ID[id];if(!r)return{status:'unknown',reason:'Rule not recognized'};if(ctx.mode&&ctx.mode!==r.mode)return{status:'excluded',reason:'This activity belongs to '+r.mode+', not '+ctx.mode};
 const state=ctx.state||{},completed=state.completed||{},seen=state.seen||{},flags=state.flags||{},events=state.events||{},now=Number.isFinite(ctx.now)?ctx.now:Date.now();
 if(completed[id])return{status:'complete',reason:'Marked collected / completed on this device'};
 if(r.event&&events[r.event]!==true){return events[r.event]===false?{status:'closed',reason:'Event set to off on this device'}:{status:'unknown',reason:'Event availability not confirmed'};}
 const needs=r.requires||[];for(const f of needs){if(f==='ghosts-nine'){if(!GH.slice(0,9).every(row=>completed[row[0]]))return{status:'locked',reason:'Photograph ghosts #1–9 first'};continue;}
  if(!flags[f])return{status:'locked',reason:'Requires: '+(PREREQS.find(a=>a[0]===f)?.[1]||f)};}
 if(r.kind==='rotation'){
  const feed=rotationFeed(ctx.snapshot,id,now);if(!feed)return{status:'unknown',reason:'No current dated position snapshot. Possible locations only; no yellow active pins.'};
  const marker=ctx.markerId!=null?String(ctx.markerId):null;
  if(marker===null)return{status:'available-feed',reason:feed.active.size+' active location ID(s) in imported snapshot (unverified by Atlas)',ids:[...feed.active],until:feed.validUntilUtc};
  return feed.active.has(marker)?{status:'active',reason:'In current imported selection (not independently verified)'}:{status:'possible',reason:'Known possible spot; not selected in current snapshot'};
 }
 if(r.kind==='clock'){if(!Number.isInteger(ctx.hour)||ctx.hour<0||ctx.hour>23)return{status:'unknown',reason:'Set the in-game hour (not your real-world time)'};
   return ctx.hour===r.hour?{status:'active',reason:'Eligible in-game hour '+String(r.hour).padStart(2,'0')+':00–'+String((r.hour+1)%24).padStart(2,'0')+':00'}:{status:'possible',reason:'Not the required in-game hour'};}
 if(r.kind==='clock-parent')return{status:'possible',reason:'Open the ten individual ghost hours below'};
 if(r.kind==='research')return{status:'research',reason:'Research reference · not an active or playable event'};
 if(r.kind==='unreleased')return{status:'unknown',reason:'No gameplay-verified rule has been published; keep data as a research lead'};
 if(r.kind==='seasonal')return{status:'possible',reason:'Season selected on this device; check dated event availability and session'};
 if(r.kind==='session')return seen[id]?{status:'active',reason:'You marked this as present in your current session'}:{status:'possible',reason:'Player/session dependent; map shows possible positions only'};
 if(r.kind==='weekly')return{status:'unknown',reason:'Needs a dated weekly inventory feed, independent of location'};
 return{status:'possible',reason:'Prerequisites satisfied; does not guarantee a spawn'};
}
function markerColor(status){return {active:'#facc15',possible:'#f8fafc',closed:'#f8fafc',locked:'#94a3b8',complete:'#64748b',unknown:'#38bdf8',research:'#38bdf8',excluded:'#64748b','available-feed':'#38bdf8'}[status]||'#38bdf8';}
function statusText(status){return {active:'Eligible / selected',possible:'Possible · not currently selected',locked:'Locked · prerequisite',closed:'Event off',complete:'Completed',unknown:'Unconfirmed / no live data','available-feed':'Snapshot available',research:'Research lead',excluded:'Not part of this game mode'}[status]||status;}
function emptyState(){return {completed:{},seen:{},flags:{},events:{}};}
function safeState(s){const o=emptyState();if(!s||typeof s!=='object')return o;for(const k of Object.keys(o)){if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k]))continue;for(const [key,val] of Object.entries(s[k]))if(/^[a-z0-9-]{1,70}$/i.test(key)&&typeof val==='boolean')o[k][key]=val;}return o;}
function safeSnapshot(s){if(!s||typeof s!=='object'||s.schema!==1||!s.rotations||typeof s.rotations!=='object')throw Error('Expected schema 1 with a rotations object.');const a={schema:1,rotations:{}};for(const [id,v] of Object.entries(s.rotations)){const r=BY_ID[id];if(!r||r.kind!=='rotation')continue;if(!v||!Array.isArray(v.activeIds)||v.activeIds.length>200||v.activeIds.some(i=>!/^[-a-z0-9_:]{1,80}$/i.test(String(i)))||!validIso(v.checkedAtUtc)||!validIso(v.validUntilUtc))throw Error('Invalid position data for '+id);
 a.rotations[id]={checkedAtUtc:v.checkedAtUtc,validUntilUtc:v.validUntilUtc,activeIds:v.activeIds.map(String),source:String(v.source||'User-supplied').slice(0,200)};}return a;}
return{RULES,STORY_RULES,VI_RULES,BY_ID,rulesForMode,PREREQS,EVENT_NAMES,GH,evaluate,rotationFeed,nextReset,safeState,emptyState,safeSnapshot,markerColor,statusText};
});
