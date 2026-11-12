(()=>{'use strict';
const $=id=>document.getElementById(id);const PROGRESS_KEY='jura3-progress',CHECK_KEY='team-jura-checklist-v54',ROUTES_KEY='jura-atlas-routes';
const NAMES={'Spaceship Part':'story-spaceship-parts','Letter Scrap':'story-letter-scraps','Nuclear Waste':'story-nuclear-waste','Stunt Jump':'story-stunt-jumps','Under the Bridge':'story-under-bridges','Knife Flight':'story-knife-flights','Epsilon Tract':'story-epsilon-tracts'};
const storeRead=(key,def)=>{try{return JSON.parse(localStorage.getItem(key)||'null')||def}catch{return def}};
let progress=storeRead(PROGRESS_KEY,{}),legacy=storeRead(CHECK_KEY,{schema:1,checked:{}}),records=[];
if(!legacy||typeof legacy!=='object'||!legacy.checked||typeof legacy.checked!=='object')legacy={schema:1,checked:{}};
function countKey(r){let set=NAMES[r.collectionType];return set&&Number.isInteger(r.collectionSlot)?set+':'+r.collectionSlot:null}
function isDone(r){const current=progress[r.id];if(typeof current==='boolean')return current;const slot=countKey(r);return slot?legacy.checked[slot]===true:false}
function setDone(r,checked){progress[r.id]=checked;const slot=countKey(r);if(slot){if(checked)legacy.checked[slot]=true;else delete legacy.checked[slot]}
 try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress));localStorage.setItem(CHECK_KEY,JSON.stringify({...legacy,schema:1,updated:new Date().toISOString()}))}catch{status('Browser storage unavailable. Export your progress.')};}
function status(t){$('message').textContent=t}
function mapUrl(r){return './atlas.html?world=5&place='+encodeURIComponent(r.id)}
function filtered(){const q=$('search').value.trim().toLowerCase(),type=$('category').value,done=$('status').value;
 let rows=records.filter(r=>(!type||r.collectionType===type)&&(!q||[r.name,r.collectionType,...(r.tags||[])].join(' ').toLowerCase().includes(q))&&(done==='all'||(done==='done'?isDone(r):!isDone(r))));
 if($('sort').value==='name')rows.sort((a,b)=>a.name.localeCompare(b.name));
 if($('sort').value==='near'){const x=Number($('x').value)||0,y=Number($('y').value)||0;rows.sort((a,b)=>(a.x-x)**2+(a.y-y)**2-((b.x-x)**2+(b.y-y)**2))}
 return rows;}
function render(){const done=records.filter(isDone).length;$('total').textContent=records.length;$('done').textContent=done;$('remaining').textContent=records.length-done;
 $('bar').style.width=records.length?(done/records.length*100)+'%':'0%';const rows=filtered();$('resultTitle').textContent=rows.length.toLocaleString()+' locations shown';
 const frag=document.createDocumentFragment();for(const r of rows.slice(0,300)){const card=document.createElement('article');card.className='item'+(isDone(r)?' done':'');
 const label=document.createElement('label'),cb=document.createElement('input');cb.type='checkbox';cb.checked=isDone(r);cb.setAttribute('aria-label','Completed '+r.name);cb.onchange=()=>{setDone(r,cb.checked);render()};
 const title=document.createElement('span');title.textContent=r.name;label.append(cb,title);
 const desc=document.createElement('small');desc.textContent=(r.collectionType||'Other')+' · X '+r.x.toFixed(1)+' / Y '+r.y.toFixed(1)+' · Community position';
 const link=document.createElement('a');link.href=mapUrl(r);link.textContent='Open exact location on map ↗';card.append(label,desc,link);frag.append(card)}$('items').replaceChildren(frag);}
function nearest(rows,x,y){const pending=[...rows],out=[];while(pending.length){let idx=0,best=Infinity;for(let i=0;i<pending.length;i++){const d=(pending[i].x-x)**2+(pending[i].y-y)**2;if(d<best){best=d;idx=i}}const r=pending.splice(idx,1)[0];out.push(r);x=r.x;y=r.y;}return out}
let lastRoute=[];
function plan(){let rows=filtered().filter(r=>!isDone(r));if(!rows.length)return status('There are no unfinished locations in that filter.');
 const x=$('x').value===''?rows[0].x:Number($('x').value),y=$('y').value===''?rows[0].y:Number($('y').value);
 if(!Number.isFinite(x)||!Number.isFinite(y))return status('Enter valid starting coordinates.');
 const max=Math.min(rows.length,300);lastRoute=nearest(rows.slice(0,max),x,y);
 const frag=document.createDocumentFragment();for(const [i,r] of lastRoute.entries()){const a=document.createElement('a');a.href=mapUrl(r);a.textContent=(i+1)+'. '+r.name+' · X '+r.x.toFixed(0)+' / Y '+r.y.toFixed(0);frag.append(a)}
 $('routeList').replaceChildren(frag);$('routePanel').hidden=false;$('routePanel').scrollIntoView({behavior:'smooth',block:'start'});
 status('Route prepared for '+lastRoute.length+' unfinished positions. Straight-line order, not street directions.');}
function sendRoute(){if(!lastRoute.length){plan();if(!lastRoute.length)return}const routes=storeRead(ROUTES_KEY,{'5':[],'6':[]});routes['5']=lastRoute.map(r=>r.id);
 try{localStorage.setItem(ROUTES_KEY,JSON.stringify(routes));location.href='./atlas.html?world=5&viewroute=1';}catch{status('Storage unavailable. Export a backup and try a different browser.')}}
function exportData(){const blob=new Blob([JSON.stringify({release:'5.7',progress,checklist:legacy,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='team-jura-collectibles-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
async function importData(file){if(!file)return;try{if(file.size>2000000)throw Error('Backup too large');const obj=JSON.parse(await file.text());if(!obj||!obj.progress||typeof obj.progress!=='object'||Array.isArray(obj.progress))throw Error('Invalid backup');
 if(!confirm('Merge imported progress with the saved progress on this device?'))return;
 for(const [key,val] of Object.entries(obj.progress)){if(/^jura-story-\d+$/.test(key)&&typeof val==='boolean')progress[key]=val}
 if(obj.checklist?.checked&&typeof obj.checklist.checked==='object'){for(const [key,val] of Object.entries(obj.checklist.checked)){if(/^story-[a-z-]+:\d+$/.test(key)&&val===true)legacy.checked[key]=true}}
 localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress));localStorage.setItem(CHECK_KEY,JSON.stringify(legacy));render();status('Progress merged successfully.')}catch(e){status('Could not import backup: '+e.message)}finally{$('importFile').value=''}}
async function load(refresh=false){status('Loading open-licensed calibrated GTA V map locations…');try{const data=await window.JuraSources.load('story',refresh);records=data.records;
 const sel=$('category');sel.replaceChildren(new Option('All categories',''));for(const name of [...new Set(records.map(r=>r.collectionType))].sort())sel.add(new Option(name,name));
 render();status(records.length+' source records loaded'+(data.cache?' from offline cache':'')+'. Locations are community mapped, not all individually gameplay-verified.');}
 catch(e){status('Source unavailable: '+e.message+'. Try Reload source when connected.')}}
for(const id of ['search','category','status','sort','x','y'])$(id).addEventListener(id==='search'||id==='x'||id==='y'?'input':'change',render);
$('route').onclick=plan;$('sendToMap').onclick=sendRoute;$('export').onclick=exportData;$('reload').onclick=()=>load(true);
$('importProgress').onclick=()=>$('importFile').click();$('importFile').onchange=e=>importData(e.target.files?.[0]);
window.addEventListener('storage',e=>{if(e.key===PROGRESS_KEY||e.key===CHECK_KEY){progress=storeRead(PROGRESS_KEY,{});legacy=storeRead(CHECK_KEY,{schema:1,checked:{}});render()}});
load();})();
