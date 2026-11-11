/* Team Jura · GTA Map Explorer · public release candidate · additive UI */
(()=>{'use strict';
const $=id=>document.getElementById(id);
function mount(){
 const stage=document.querySelector('.stage');if(!stage||$('juraDesktop'))return;
 const side=document.createElement('aside');side.id='juraDesktop';side.setAttribute('aria-label','Map location search and navigation');
 side.innerHTML=`<div class="jura-side-head"><b>◉ GTA <span>MAP EXPLORER</span></b><small>🍁 Thanksgiving · ❄️ Christmas</small></div>
 <label for="juraDesktopSearch">Search locations</label><input id="juraDesktopSearch" type="search" placeholder="Find a location, region, pin…" autocomplete="off">
 <label for="juraCategory">Filter your results</label><select id="juraCategory"><option value="all">All categories</option><option value="hotel">Hotels / housing</option><option value="residential">Residential</option><option value="landmark">Landmarks</option><option value="transport">Transport</option><option value="nature">Nature / scenery</option><option value="service">Shops / services</option><option value="other">Other & saved pins</option></select>
 <div id="juraDesktopResults" aria-live="polite"></div><div class="jura-sidebar-actions">
 <button class="jura-sidebar-btn" id="juraDesktopExplore">☰ All locations</button>
 <button class="jura-sidebar-btn" id="juraDesktopLayers">◈ Layers and routes</button>
 <button class="jura-sidebar-btn" id="juraDesktopCoords">⌖ Coordinate finder</button>
 <button class="jura-sidebar-btn" id="juraDesktopPins">＋ My saved pins</button>
 <button class="jura-sidebar-btn" id="juraDesktopHunts">🏆 Collectible tracker</button>
 <button class="jura-sidebar-btn" id="juraDesktopRefresh">↻ Check site update</button></div>
 <div class="jura-legend"><b>LEGEND</b><div><span class="jura-dot" style="background:#fc2ca4"></span>Saved map pins</div><div><span class="jura-dot" style="background:#00d4e9"></span>Community research</div><div><span class="jura-dot" style="background:#9b44ef"></span>Tracker & discoveries</div><small>GTA VI research positions are preliminary—not official game GPS.</small></div>
 <p id="juraSyncStatus" class="jura-note" role="status">Site files can be cached for repeat visits. Artwork is supplied by its original sources when online.</p>`;
 stage.prepend(side);
 const search=$('juraDesktopSearch'),category=$('juraCategory'),results=$('juraDesktopResults'),source=$('search');
 let debounce;
 function sourceItems(){
  const root=$('results');return root?[...root.querySelectorAll('.result')]:[];
 }
 function updateResults(){
  results.replaceChildren();const q=search.value.trim();
  if(source){source.value=q;source.dispatchEvent(new Event('input',{bubbles:true}));}
  if(!q&&category.value==='all') {const help=document.createElement('p');help.className='jura-note';help.textContent='Search a landmark or choose a category. GTA V locations appear as you save your own pins; GTA VI has a limited research sample.';results.append(help);return;}
  const items=sourceItems().filter(row=>category.value==='all'||((row.querySelector('small')?.textContent||'').toLowerCase().includes(category.value)));
  if(!items.length){results.textContent='No matching records in the currently loaded collection. Try another search or world.';return;}
  const count=document.createElement('small');count.textContent=`${items.length} matching local records${items.length>45?' · showing 45':''}`;results.append(count);
  for(const row of items.slice(0,45)){
   const origin=row.querySelector('button');if(!origin)continue;
   const button=document.createElement('button');button.type='button';button.textContent=origin.textContent.trim();button.addEventListener('click',()=>{
     const txt=origin.textContent;const live=[...sourceItems()].find(x=>x.querySelector('button')?.textContent===txt);
     (live?.querySelector('button')||origin).click();
   });results.append(button);
  }
 }
 search.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(updateResults,100);});category.addEventListener('change',updateResults);
 for(const id of ['g5','g6'])$(id)?.addEventListener('click',()=>setTimeout(updateResults,0));
 const actions={juraDesktopExplore:'explore',juraDesktopCoords:'coords',juraDesktopHunts:'openHunt',juraDesktopPins:'explore'};
 Object.entries(actions).forEach(([id,target])=>$(id)?.addEventListener('click',()=>$(target)?.click()));
 $('juraDesktopLayers')?.addEventListener('click',()=>{const p=$('juraLayersPanel');if(p)p.hidden=false;});
 $('juraDesktopRefresh')?.addEventListener('click',async()=>{
  const status=$('juraSyncStatus');status.textContent='Checking for updated site files…';
  try{if('serviceWorker' in navigator){const r=await navigator.serviceWorker.getRegistration();if(r)await r.update();}status.textContent='Update check complete. Reload to load the newest published website files; your saved local progress stays on this device.';}
  catch(e){status.textContent='Could not check updates while offline. Existing cached site files remain available.';}
 });
 const heading=document.querySelector('.juraLogo');if(heading)heading.textContent='🍁❄️ TEAM JURA · GTA MAP EXPLORER';
 const tag=document.querySelector('.juraTag');if(tag)tag.textContent='THANKSGIVING + CHRISTMAS COMMAND CENTER · UNOFFICIAL FAN PROJECT';
 const lead=document.querySelector('.juraLead');if(lead)lead.textContent='Explore Los Santos and Leonida, search saved locations, organize pins, and track collections. A noncommercial fan-made navigation project.';
 const menu=$('juraMenuButton');if(menu){menu.textContent='❄️ Menu';menu.title='Open holiday command center';}
 const toggle=$('juraLayersToggle');if(toggle)toggle.textContent='◈ Layers & Routes ▾';
 // The Leonida imagery is a third-party embedded site. We cannot programmatically control that iframe.
 const vi=$('leonidaView');if(vi){const note=document.createElement('div');note.id='juraLeonidaTip';note.textContent='Leonida: use the map’s own controls to explore artwork; Team Jura searches its own saved pins and limited research records.';vi.append(note);}
 // Preserve the old Explorer shortcut if the branch already provides it.
 if(!$('juraTopExplorer')){const a=document.createElement('a');a.id='juraTopExplorer';a.href='explorer.html';a.textContent='🧭 Explorer';a.className='topbtn';a.style.textDecoration='none';const at=$('juraMenuButton');if(at)at.before(a);}
 // Site-owned files only; no third-party map tiles or imagery are copied to Cache Storage.
 if('serviceWorker' in navigator && location.protocol==='https:')navigator.serviceWorker.register('jura-sw.js',{scope:'./'}).catch(()=>{});
 // Keyboard navigation: / focuses search; Escape closes panels.
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){e.preventDefault();if(innerWidth>=1024)search.focus();else{$('explore')?.click();source?.focus();}}if(e.key==='Escape'){$('drawer')?.classList.remove('open');if($('juraWelcome'))$('juraWelcome').hidden=true;}});
 // Explicit zoom controls from the map library already exist; add fullscreen for the map workspace.
 const tools=document.querySelector('.stage>.tools');if(tools){const btn=document.createElement('button');btn.type='button';btn.id='juraFull';btn.textContent='⤢ Fullscreen';btn.title='Toggle map fullscreen';btn.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await stage.requestFullscreen();}catch{alert('Fullscreen is unavailable in this browser.');}});tools.append(btn);}
 const footer=document.querySelector('#projectInfo');if(footer){const p=document.createElement('p');p.innerHTML='<strong>Fan project licensing:</strong> GTADB code is MIT; its published landmark/map data is CC BY 4.0 with attribution to contributors. GTA V / GTA VI artwork remains subject to Rockstar/Take-Two rights. Public maps are accessed from their current providers; no third-party map tile collection is included in our offline cache. <a href="https://github.com/rolux/gtadb.org" target="_blank" rel="noopener noreferrer">GTADB source</a> · <a href="https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material" target="_blank" rel="noopener noreferrer">Rockstar policy</a>.';footer.append(p);}
 updateResults();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
