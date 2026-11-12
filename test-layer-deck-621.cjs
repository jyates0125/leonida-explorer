const fs=require('node:fs');const assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/atlas.js','utf8');
const a=src.indexOf('const layerText='),b=src.indexOf('const LEGEND_GROUPS=[',a);
assert(a>0&&b>a,'Layer deck must be present');
const fragment=src.slice(a,b);
const build=new Function('mode','game','loadStore',fragment+';return {layersForRows,passesNamedLayers,hiddenNamed,collectionLayerId,NAMED_LAYERS};');
const make=(mode,game)=>build(mode,game,(_,def)=>structuredClone(def));
const records=[
 {name:'Ammu-Nation Davis',category:'shop'},
 {name:'Lucky Clover #4',category:'collectible',collectionType:'Lucky Clover'},
 {name:'Story spaceship part #5',category:'collectible',collectionType:'Spaceship Part'},
 {name:'Premium Deluxe Motorsport vehicle spawn',category:'vehicle'},
 {name:'House Garage',category:'property'},
 {name:'Lombank',category:'office'},
 {name:'Blaine County Police Station',category:'government'},
 {name:'Elysian Island Bridge',category:'transport'},
 {name:'Random unknown park',category:'other'},
];
const v=make('story','5'),ls=v.layersForRows(records),by=new Map(ls.map(i=>[i.id,i]));
assert.equal(v.NAMED_LAYERS.length,27,'27 independently named category predicates');
assert(by.has('clovers')&&by.get('clovers').count===1,'Clover must only count its real mapped row');
assert(by.has('ammunation')&&by.get('ammunation').count===1,'Ammu-Nation named category');
assert(by.get('vehicles').count===1,'Vehicle category count');
assert(by.has('collection:spaceship part'),'Dynamically discover actual collectible sets');
assert(!by.has('airports'),'Never show unpositioned layers');
const key='collection:spaceship part';v.hiddenNamed['5-story']=['ammunation',key];
assert(!v.passesNamedLayers(records[0]),'Story Ammu-Nation hidden');
assert(!v.passesNamedLayers(records[2]),'Story spaceship set hidden');
assert(v.passesNamedLayers(records[1]),'Other collectibles still visible');
// Mode change must not hide Story collection types in GTA Online.
const o=make('online','5');o.hiddenNamed['5-story']=['ammunation'];
assert(o.passesNamedLayers(records[0]),'Story toggle must not hide Online source records');
// GTA VI has independent visibility.
const g6=make('story','6');g6.hiddenNamed['6']=['ammunation'];
assert(!g6.passesNamedLayers(records[0]),'VI separate filter applies');
assert(!g6.passesNamedLayers({name:'Ammu-Nation?',category:'shop'}),'VI source naming filter robust');
console.log('PASS: named layer predicates, documented coordinates, collection sets, per-world visibility — 12 checks');
