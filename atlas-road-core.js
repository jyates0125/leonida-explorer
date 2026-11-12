/* Team Jura Atlas 6.0 - standalone, original navigation and road-graph engine.
 * Does not invent roads. Without a validated licensed road network, the ONLY
 * result is a clearly labeled direct-line preview (not turn-by-turn driving).
 * Graph format: {version:1, game:"6", units:"gta-world", nodes:[{id,x,y}],
 * edges:[{from,to,length?,name?,oneway?}]}.
 */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.JuraRoadCore=api;})(typeof globalThis==='undefined'?null:globalThis,function(){
'use strict';
const valid=p=>!!p&&Number.isFinite(p.x)&&Number.isFinite(p.y);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const bound=(n,min,max)=>Math.max(min,Math.min(max,n));
function validateGraph(g){if(!g||g.version!==1||!['5','6'].includes(g.game)||g.units!=='gta-world'||!Array.isArray(g.nodes)||!Array.isArray(g.edges)||g.nodes.length>250000||g.edges.length>500000)throw Error('Invalid road network metadata');
 const nodes=new Map();for(const node of g.nodes){if(!node||typeof node.id!=='string'||node.id.length>90||!valid(node)||nodes.has(node.id))throw Error('Invalid or duplicate road node');nodes.set(node.id,{id:node.id,x:node.x,y:node.y});}
 const links=new Map([...nodes.keys()].map(id=>[id,[]]));for(const e of g.edges){if(!e||!nodes.has(e.from)||!nodes.has(e.to))throw Error('Road edge references an unknown node');const a=nodes.get(e.from),b=nodes.get(e.to),d=distance(a,b);if(d<0.01)continue;
 const length=Number.isFinite(e.length)&&e.length>0?e.length:d;
 links.get(e.from).push({id:e.to,length,name:String(e.name||'Unnamed road').slice(0,120)});
 if(!e.oneway)links.get(e.to).push({id:e.from,length,name:String(e.name||'Unnamed road').slice(0,120)});
 }
 return{nodes,links,game:g.game,count:links.size};}
function nearest(graph,p,maxSnap=320){let best=null,d=Infinity;for(const n of graph.nodes.values()){const ds=distance(n,p);if(ds<d){best=n;d=ds}}return d<=maxSnap?best:null;}
function shortest(graph,from,to){if(!valid(from)||!valid(to))throw Error('Point coordinates required');const start=nearest(graph,from),goal=nearest(graph,to);if(!start||!goal)return null;
 const distances=new Map([[start.id,0]]),prev=new Map(),visited=new Set(),heap=[];
 const push=(id,cost)=>{heap.push([cost,id]);let i=heap.length-1;while(i){let p=(i-1)>>1;if(heap[p][0]<=cost)break;heap[i]=heap[p];i=p;}heap[i]=[cost,id];};
 const pop=()=>{if(!heap.length)return null;const result=heap[0],last=heap.pop();if(heap.length){let i=0;while(2*i+1<heap.length){let j=2*i+1;if(j+1<heap.length&&heap[j+1][0]<heap[j][0])j++;if(heap[j][0]>=last[0])break;heap[i]=heap[j];i=j;}heap[i]=last;}return result;};
 push(start.id,0);
 while(heap.length){const [cost,id]=pop();if(visited.has(id))continue;visited.add(id);if(id===goal.id)break;for(const edge of graph.links.get(id)||[]){const candidate=(distances.get(id)||0)+edge.length;if(candidate<(distances.get(edge.id)??Infinity)){distances.set(edge.id,candidate);prev.set(edge.id,{from:id,road:edge.name});push(edge.id,candidate);}}}
 if(!distances.has(goal.id))return null;
 const points=[],roads=[];let id=goal.id;for(let limit=0;limit<=graph.nodes.size;limit++){points.push(graph.nodes.get(id));if(id===start.id)break;const item=prev.get(id);if(!item)return null;roads.push(item.road);id=item.from;}
 points.reverse();roads.reverse();return{points:[{...from},...points.map(p=>({...p})),{...to}],roads,length:distances.get(goal.id)+distance(from,start)+distance(to,goal),method:'road-graph',verified:false};
}
function route(waypoints,graph=null){if(!Array.isArray(waypoints)||waypoints.length<2||waypoints.length>12||!waypoints.every(valid))throw Error('Use 2–12 valid waypoints');const pieces=[];let length=0,allRoads=!!graph;
 for(let i=1;i<waypoints.length;i++){const a=waypoints[i-1],b=waypoints[i];let segment=graph?shortest(graph,a,b):null;if(!segment){segment={points:[{...a},{...b}],roads:[],length:distance(a,b),method:'direct-line',verified:false};allRoads=false;}pieces.push(segment);length+=segment.length;}
 const points=pieces.flatMap((p,i)=>i?p.points.slice(1):p.points);
 return{points,pieces,length,waypoints:waypoints.map(p=>({...p})),method:allRoads?'road-graph':pieces.some(p=>p.method==='road-graph')?'mixed':'direct-line',roadGraphUsed:pieces.some(p=>p.method==='road-graph'),drivingVerified:false,warning:allRoads?'UNVERIFIED ROAD GRAPH: route follows an imported graph but has NOT been validated against in-game roads or turn restrictions. Not verified driving directions.':pieces.some(p=>p.method==='road-graph')?'MIXED ROUTE: some segments use an unverified road graph and other segments are straight lines. Not verified driving directions.':'Direct-line preview only. Not actual streets, driving directions, or a travel-time estimate.'};}
function heading(a,b){const t=Math.atan2(b.x-a.x,b.y-a.y)*180/Math.PI;const dirs=['north','northeast','east','southeast','south','southwest','west','northwest'];return dirs[Math.round(((t+360)%360)/45)%8];}
function instructions(r,places){return r.pieces.map((segment,i)=>({step:i+1,label:segment.method==='road-graph'?`Unverified graph path toward ${places[i+1]?.name||'stop '+(i+1)}`:`Direct line ${heading(segment.points[0],segment.points.at(-1))} toward ${places[i+1]?.name||'stop '+(i+1)}`,length:segment.length,verified:segment.verified}));}
return Object.freeze({validateGraph,shortest,route,instructions,distance,heading});
});
