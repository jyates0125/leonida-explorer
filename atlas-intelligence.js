/* Team Jura Atlas 5.3 — independent GTADB landmark interpretation.
 * This module does not import any GTAWeb source code, images or locations.
 * Input landmark coordinates and tags are GTADB CC BY 4.0, used with attribution.
 * Classification estimates a PLACE TYPE; it does NOT prove GTA gameplay availability,
 * weapon pickup, vehicle spawn, purchasable property or garage storage capacity.
 */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 if(root)root.JuraLandmarks=api;
})(typeof globalThis!=='undefined'?globalThis:null,function(){
 'use strict';
 const RULES=[
  {category:'gunstore',tag:/^(#guns|guns|weapon-store)$/,name:/\bammu[ -]?nation\b|\bpawn\s*&\s*gun\b|\bgun\s*shop\b|\bgun\s*store\b|\bfirearms?\b/i,note:'Gun shop / firearm retail site'},
  {category:'modshop',tag:/^(#modshop|#pay'n'spray)$/,name:/\blos\s*santos\s*customs\b|\bbeeker'?s\s*garage\b|\bpay\s*['’]?n\s*['’]?\s*spray\b|\bmod\s*shop\b|\bauto\s*customs\b/i,note:'Vehicle customization site'},
  {category:'dealer',tag:/^(#dealership|#dealer)$/,name:/\bpremium\s*deluxe\s*motorsport\b|\bluxury\s*autos\b|\bvehicle\s*dealership\b|\bcar\s*dealership\b|\bauto\s*sales\b|\bused\s*car\s*lot\b/i,note:'Vehicle dealership site'},
  {category:'fuel',tag:/^(#gas|#fuel)$/,name:/\bgas\s*station\b|\bpetrol\s*station\b|\bfilling\s*station\b|\bfuel\s*station\b/i,note:'Fuel station site'},
  {category:'safehouse',tag:/^#safehouse$/,name:/\bsafe\s*house\b|\bsafehouse\b/i,note:'Possible safehouse site'},
  {category:'marina',tag:/^#marina$/,name:/\bmarina\b|\bboat\s*works\b|\byacht\s*club\b/i,note:'Marina / boat facility'},
  {category:'garage_site',tag:/^#garage$/,name:/\bparking\s*(?:garage|structure)\b|\bcar\s*park\b|\bgarage\b|\bvehicle\s*storage\b/i,note:'Garage / parking building'},
  {category:'business_site',tag:/^(#nightclub|#business|#racetrack)$/,name:/\bnight\s*club\b|\barcade\b|\bcasino\b|\bhangar\b|\bwarehouse\b|\bbunker\b|\bsalvage\s*yard\b|\bauto\s*shop\b|\bmaze\s*bank\b|\bvehicle\s*warehouse\b/i,note:'Potential commercial / activity site'}
 ];
 const LABELS={gunstore:'Weapons shop',modshop:'Vehicle modification',dealer:'Vehicle sales',fuel:'Gas / fuel',safehouse:'Safehouse candidate',marina:'Marina / boating',garage_site:'Garages / parking',business_site:'Business / activity sites'};
 const typeTags=new Set(['unconfirmed','//may-not-exist','//doesnt-exist','//doesnt_exist','//doesnt-exist?']);
 function inspect(name,tags,game){
  const input=String(name||''),list=Array.isArray(tags)?tags.filter(v=>typeof v==='string'):[];
  const suspected=!input.trim()||/^\s*\?\s*(?:,|$)/.test(input)||list.some(t=>typeTags.has(t.toLowerCase()));
  for(const r of RULES){
    const tagged=list.find(tag=>r.tag.test(tag.toLowerCase()));
    const named=r.name.test(input);
    if(!tagged&&!named)continue;
    const basis=tagged?'GTADB type tag '+tagged:'landmark name';
    return {category:r.category,kind:'interpreted_site',label:r.note,evidence:basis,
      confidence:game==='6'?(suspected?'unverified':'provisional'):'inferred',
      detail:'A mapped place; not verified as a purchasable business, functional service, item pickup or vehicle spawn.',
      uncertain:game==='6'||suspected};
  }
  return {category:null,kind:'landmark',label:'GTADB landmark',evidence:'GTADB source landmark',
      confidence:game==='6'?(suspected?'unverified':'provisional'):(suspected?'unverified':'mapped'),
      detail:'Landmark position recorded by GTADB; no gameplay function inferred.',
      uncertain:game==='6'||suspected};
 }
 function isService(r){return !!r&&Object.prototype.hasOwnProperty.call(LABELS,r.category)}
 return {inspect,isService,LABELS,RULES};
});
