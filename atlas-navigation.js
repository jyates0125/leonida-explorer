/* Team Jura Atlas 6.0 — original GTADB-inspired multi-stop navigation interface.
 * Does not use Google Maps, GTADB proprietary routes, or unlicensed artwork.
 * GTA road directions are never claimed without a validated licensed graph. */
(function(root){'use strict';
const $=id=>document.getElementById(id),esc=s=>String(s||'').replace(/[&<>"']/g,v=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
function create(bridge){const Core=root.JuraRoadCore;if(!Core)throw Error('atlas-road-core.js missing');
let active=false,waypoints=[null,null],graph=null,plan=null,ordering='manual',dimension='2d',terrain=null,fields=[],resultItems=[],fallback3d=false;
const panel=$('juraNavPanel'),container=$('juraNavFields'),results=$('juraNavResults'),mapCanvas=$('jura3dCanvas'),routeStatus=$('juraNavStatus');
function status(s){routeStatus.textContent=s;bridge.notice(s)}
function all(){return bridge.records()}
function invalidate(){plan=null;bridge.clearRoutePlan()}
function find(s){const q=s.trim().toLowerCase();if(!q)return[];const items=all();let found=items.filter(v=>v.name.toLowerCase()===q||v.id.toLowerCase()===q);if(found.length)return found.slice(0,10);return items.filter(v=>(v.name+' '+(v.address||'')+' '+(v.category||'')+' '+v.id).toLowerCase().includes(q)).slice(0,10)}
function popup(row,index){const matches=find(row.input.value);row.suggest.replaceChildren();for(const place of matches){const b=document.createElement('button');b.type='button';b.className='jura-place-suggest';const n=document.createElement('strong');n.textContent=place.name;const small=document.createElement('small');small.textContent=(place.address?'Reference: '+place.address+' · ':'')+'X '+Math.round(place.x)+' Y '+Math.round(place.y);b.append(n,small);b.addEventListener('pointerdown',e=>e.preventDefault());b.onclick=()=>{waypoints[index]=place;row.input.value=place.name;row.suggest.replaceChildren();invalidate();render(false);};row.suggest.append(b)}
 if(!matches.length&&row.input.value.trim()){const p=document.createElement('p');p.textContent='No matching landmark. Try another name or import licensed data.';row.suggest.append(p)}
}
function resolve(index){const row=fields[index],q=row?.input.value.trim()||'';if(!q)return false;if(waypoints[index]?.name===q)return true;const match=find(q)[0];if(match){waypoints[index]=match;row.input.value=match.name;row.suggest.replaceChildren();return true}return false}
function renderFields(){container.replaceChildren();fields=[];waypoints.forEach((value,i)=>{const box=document.createElement('div');box.className='jura-nav-stop';const number=document.createElement('span');number.className='jura-stop-bubble';number.textContent=i===0?'A':String(i);const input=document.createElement('input');input.type='search';input.value=value?.name||'';input.placeholder=i===0?'Choose start location':i===waypoints.length-1?'Choose destination':'Add intermediate location';input.setAttribute('aria-label',i===0?'Starting location':`Stop ${i}`);input.autocomplete='off';const suggestions=document.createElement('div');suggestions.className='jura-suggestions';const remove=document.createElement('button');remove.type='button';remove.className='jura-remove-stop';remove.title='Remove stop';remove.setAttribute('aria-label','Remove stop '+i);remove.textContent='×';remove.disabled=waypoints.length<=2;remove.onclick=()=>{waypoints.splice(i,1);invalidate();render()};input.oninput=()=>{waypoints[i]=null;invalidate();popup({input,suggest:suggestions},i)};input.onfocus=()=>{if(input.value)popup({input,suggest:suggestions},i)};input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();resolve(i);render()}if(e.key==='Escape')suggestions.replaceChildren()};input.onblur=()=>setTimeout(()=>suggestions.replaceChildren(),170);box.append(number,input,remove,suggestions);container.append(box);fields.push({input,suggest:suggestions})})}
function renderInstructions(){results.replaceChildren();if(!plan){const p=document.createElement('p');p.className='jura-route-notice';p.textContent='Choose named landmarks and press Generate route. Routes do not automatically imply road access.';results.append(p);return}
 const summary=document.createElement('div');summary.className='jura-summary';summary.innerHTML=`<strong>${plan.waypoints.length-1} segment${plan.waypoints.length>2?'s':''} · ${Math.round(plan.length).toLocaleString()} GTA world units</strong><small>${esc(plan.drivingVerified?'Connected road graph':'Direct-line preview — not drivable road directions')}</small>`;results.append(summary);
 for(const segment of Core.instructions(plan,waypoints)){const p=document.createElement('div');p.className='jura-route-step';const b=document.createElement('b');b.textContent=segment.step+'.';const t=document.createElement('span');t.textContent=segment.label+' · '+Math.round(segment.length)+' units';p.append(b,t);results.append(p)}
 const warn=document.createElement('p');warn.className='jura-route-warning';warn.textContent=plan.warning;results.append(warn)}
function render(fieldsToo=true){if(fieldsToo)renderFields();renderInstructions();$('juraNavAdd').disabled=waypoints.length>=12;const el=$('juraNavDimension');el.textContent=dimension.toUpperCase();$('juraToggle3d').textContent=dimension==='2d'?'3D':'2D';$('juraToggle3d').setAttribute('aria-pressed',String(dimension==='3d'));}
function setRoutePoint(place){if(!place)return;const i=waypoints.findIndex((p,j)=>j>0&&!p);if(i>=0)waypoints[i]=place;else if(waypoints.length<12)waypoints.splice(waypoints.length-1,0,place);else{status('Maximum 12 named stops');return}invalidate();open();render();}
function setStart(place){waypoints[0]=place;plan=null;open();render()}
function open(){active=true;panel.hidden=false;document.body.classList.add('jura-nav-open');$('juraOpenNav').setAttribute('aria-expanded','true');render();}
function close(){active=false;panel.hidden=true;document.body.classList.remove('jura-nav-open');$('juraOpenNav').setAttribute('aria-expanded','false')}
function makeRoute(){for(let i=0;i<waypoints.length;i++)if(!waypoints[i]&&!resolve(i)){status('Choose a matching location for stop '+(i+1)+'.');fields[i]?.input.focus();return}
 const points=ordering==='nearest'?nearestOrder(waypoints):waypoints;waypoints=points;
 try{plan=Core.route(waypoints,graph);bridge.setRoutePlan(plan,waypoints);bridge.fitPoints(waypoints);render();status(plan.drivingVerified?'Route follows the imported road graph (source quality must be verified).':'Multi-stop route preview ready. Straight lines are not driving directions.')}catch(e){status(e.message)}}
function nearestOrder(places){const rem=places.slice(1),out=[places[0]];while(rem.length){let best=0,d=Infinity;for(let i=0;i<rem.length;i++){let v=Core.distance(out.at(-1),rem[i]);if(v<d){best=i;d=v}}out.push(rem.splice(best,1)[0])}return out}
function setDimension(next){if(next===dimension)return;
 if(next==='3d'){
  const ok=!!terrain&&terrain.activate();
  fallback3d=!ok;
  dimension='3d';document.body.classList.add('jura-in-3d');
  document.body.classList.toggle('jura-perspective-fallback',fallback3d);
  $('jura3dStatus').textContent=fallback3d?'3D perspective fallback · native WebGL unavailable':'3D renderer active · terrain height requires licensed elevation';
  bridge.notice(fallback3d?'3D-style perspective shown using the working illustrated map. Native 3D unavailable on this device.':'3D map enabled. Drag to rotate, shift-drag to pan, wheel to zoom.');
 }else{
  terrain?.deactivate();dimension='2d';fallback3d=false;
  document.body.classList.remove('jura-in-3d','jura-perspective-fallback');
  bridge.notice('2D map active.');
 }
 render(false);
}
function clear(){waypoints=[null,null];plan=null;bridge.clearRoutePlan();render();status('Navigation cleared. Saved collectible progress is unchanged.')}
function refresh(){if(terrain?.isActive())terrain.render()}
function gameChanged(){graph=null;waypoints=[null,null];plan=null;render();if(dimension==='3d')terrain?.rebase();}
function init(){terrain=root.JuraTerrain3D?.create({canvas:mapCanvas,overlay:$('jura3dMarkerOverlay'),status:$('jura3dStatus'),bridge})||null;
 $('juraOpenNav').onclick=()=>active?close():open();$('juraCloseNav').onclick=close;$('juraNavAdd').onclick=()=>{if(waypoints.length>=12)return;waypoints.splice(waypoints.length-1,0,null);invalidate();render();fields.at(-2)?.input.focus()};$('juraNavReverse').onclick=()=>{waypoints.reverse();invalidate();render()};$('juraNavGo').onclick=makeRoute;$('juraNavClear').onclick=clear;$('juraNavOrder').onchange=e=>{ordering=e.target.value};$('juraToggle3d').onclick=()=>setDimension(dimension==='2d'?'3d':'2d');$('jura2d').onclick=()=>setDimension('2d');$('jura3d').onclick=()=>setDimension('3d');$('jura3dNorth').onclick=()=>terrain?.resetNorth();$('jura3dZoomIn').onclick=()=>terrain?.zoom(.8);$('jura3dZoomOut').onclick=()=>terrain?.zoom(1.25);
 $('juraNavExport').onclick=()=>{if(!plan){status('Generate a route first');return}const rows=waypoints.map((r,i)=>`${i===0?'Start':`Stop ${i}`}: ${r.name} (X ${r.x.toFixed(1)}, Y ${r.y.toFixed(1)})`).join('\n');const s='Team Jura Atlas · GTA '+bridge.game()+'\n'+rows+'\n\n'+plan.warning;if(navigator.clipboard?.writeText){navigator.clipboard.writeText(s).then(()=>status('Route summary copied.')).catch(()=>window.prompt('Copy route',s))}else window.prompt('Copy route',s)};
 if($('juraElevationFile'))$('juraElevationFile').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{if(!terrain)throw Error('3D renderer unavailable');await terrain.setElevationBinary(await file.arrayBuffer(),bridge.game());status('Local elevation heightfield loaded for GTA '+bridge.game()+'. Switch to 3D to view terrain.')}catch(err){status('Elevation rejected: '+err.message)}finally{e.target.value=''}};
 $('juraNavRoadFile').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>16000000)throw Error('Graph exceeds 16 MB limit');const raw=JSON.parse(await file.text());if(String(raw.game)!==bridge.game())throw Error('Road graph must belong to the active GTA game');graph=Core.validateGraph(raw);status('Imported road graph: '+graph.nodes.size+' nodes. Route guidance depends on its verified accuracy.');}catch(err){graph=null;status('Road graph rejected: '+err.message)}finally{e.target.value=''}};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active&&document.activeElement?.tagName!=='INPUT')close()});render();}
init();return{open,close,setRoutePoint,setStart,refresh,gameChanged,render,setDimension,getDimension:()=>dimension,getPlan:()=>plan,terrain:()=>terrain};}
root.JuraNavigation=Object.freeze({create});
})(typeof window!=='undefined'?window:globalThis);
