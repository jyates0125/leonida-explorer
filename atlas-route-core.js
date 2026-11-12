/* Team Jura Atlas 5.8 — original geometric route planner.
 * Straight-line GTA world-coordinate planning, NOT navigation along drivable roads.
 * No external network, tracking or dependencies. Shared in browser and Node tests.
 */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 if(root)root.JuraRoutePlanner=api;
})(typeof globalThis==='undefined'?null:globalThis,function(){
 'use strict';
 const MAX_STOPS=250;
 const valid=p=>!!p&&Number.isFinite(p.x)&&Number.isFinite(p.y);
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 function length(origin,list){if(!list.length)return 0;let total=0,previous=valid(origin)?origin:list[0];for(const p of list){total+=distance(previous,p);previous=p;}return total;}
 function plan(origin,locations,limit=MAX_STOPS){
  if(!valid(origin))throw Error('A valid starting point is required');
  if(!Array.isArray(locations))throw Error('A list of locations is required');
  const max=Math.max(1,Math.min(MAX_STOPS,Math.floor(Number(limit)||MAX_STOPS)));
  const seen=new Set();const places=locations.filter(p=>valid(p)&&typeof p.id==='string'&&!seen.has(p.id)&&seen.add(p.id));
  // If thousands of locations are visible, start with the closest candidates;
  // this makes route planning responsive on mobile and clearly reports omissions.
  const candidates=places.length>max?places.slice().sort((a,b)=>distance(origin,a)-distance(origin,b)).slice(0,max):places.slice();
  const remaining=candidates.slice(),ordered=[];let previous=origin;
  while(remaining.length){let index=0,best=Infinity;for(let i=0;i<remaining.length;i++){const d=(previous.x-remaining[i].x)**2+(previous.y-remaining[i].y)**2;if(d<best){best=d;index=i;}}const next=remaining.splice(index,1)[0];ordered.push(next);previous=next;}
  // Bounded open-path 2-opt improvement, with the chosen origin anchored.
  for(let pass=0;pass<3;pass++){let improved=false;
   for(let i=0;i<ordered.length-1;i++)for(let j=i+1;j<ordered.length;j++){
    const a=i?ordered[i-1]:origin,b=ordered[i],c=ordered[j],d=ordered[j+1];
    const before=distance(a,b)+(d?distance(c,d):0);
    const after=distance(a,c)+(d?distance(b,d):0);
    if(after+0.0001<before){for(let l=i,r=j;l<r;l++,r--)[ordered[l],ordered[r]]=[ordered[r],ordered[l]];improved=true;}
   }
   if(!improved)break;
  }
  return{stops:ordered,omitted:places.length-ordered.length,units:Math.round(length(origin,ordered)),method:'Nearest neighbor + bounded 2-opt; straight-line distance'};
 }
 return Object.freeze({MAX_STOPS,plan,distance,length});
});
