
(()=>{
'use strict';
const get=id=>document.getElementById(id), area=get('maparea'),side=document.querySelector('.sidebar');
const panel=document.createElement('section');panel.className='v4panel';
panel.innerHTML='<strong>MAP VIEW & LAYERS</strong><div class="v4views"><button data-layer="atlas">Atlas</button><button data-layer="terrain">Terrain</button><button data-layer="roads">Roads</button><button data-layer="minimal">Clean</button></div><div class="v4checks"><label><input type="checkbox" id="v4roads" checked> Roads</label><label><input type="checkbox" id="v4labels" checked> Labels</label><label><input type="checkbox" id="v4samples" checked> Demo pins</label><label><input type="checkbox" id="v4mine" checked> My pins</label></div><div class="actions"><button class="btn" id="v4link">Copy map view link</button><button class="btn" id="v4reset">Fit map</button></div><p class="note">These are stylized views of original concept artwork, not actual satellite or verified game map imagery. Demo collectibles are fictional.</p>';
document.querySelector('.sidebar .intro').after(panel);
const bar=document.createElement('div');bar.className='v4bar';
bar.innerHTML='<button id="v4menu">☰ Filters</button><span id="v4zoom">100% zoom</span><button id="v4find">⌕ Search</button>';area.prepend(bar);
let layer=localStorage.getItem('gme-layer')||'atlas';
const allowed=['atlas','terrain','roads','minimal'];if(!allowed.includes(layer))layer='atlas';
function apply(){area.dataset.layer=layer;panel.querySelectorAll('[data-layer]').forEach(b=>b.classList.toggle('active',b.dataset.layer===layer));get('roads').style.display=get('v4roads').checked?'':'none';get('labels').style.display=get('v4labels').checked?'':'none';try{localStorage.setItem('gme-layer',layer)}catch{}}
panel.querySelectorAll('[data-layer]').forEach(b=>b.onclick=()=>{layer=b.dataset.layer;apply()});
['v4roads','v4labels'].forEach(id=>get(id).onchange=apply);
const previousFiltered=filtered;filtered=function(){return previousFiltered().filter(m=>m.sample?get('v4samples').checked:get('v4mine').checked)};
['v4samples','v4mine'].forEach(id=>get(id).onchange=()=>render());
const previousRender=render;render=function(){previousRender();get('count').textContent='('+filtered().length+' of '+all().length+')';get('v4zoom').textContent=Math.round(1000/view.w*100)+'% zoom'};
const previousUpdate=updateView;updateView=function(){previousUpdate();get('v4zoom').textContent=Math.round(1000/view.w*100)+'% zoom'};
get('v4reset').onclick=()=>get('home').click();
get('v4menu').onclick=()=>side.classList.toggle('v4open');
get('v4find').onclick=()=>{side.classList.add('v4open');get('search').focus()};
const previousFocus=focusMarker;focusMarker=function(m){previousFocus(m);if(innerWidth<=780)side.classList.remove('v4open')};
get('v4link').onclick=async()=>{const u=new URL(location.href);u.searchParams.set('x',Math.round(view.x+view.w/2));u.searchParams.set('y',Math.round(view.y+view.h/2));u.searchParams.set('z',Math.round(1000/view.w*100));u.searchParams.set('layer',layer);try{await navigator.clipboard.writeText(u.href);alert('Map link copied')}catch{prompt('Copy this link',u.href)}};
const q=new URLSearchParams(location.search);if(allowed.includes(q.get('layer')))layer=q.get('layer');
const x=Number(q.get('x')),y=Number(q.get('y')),z=Number(q.get('z'));
if(q.has('x')&&q.has('y')&&q.has('z')&&[x,y,z].every(Number.isFinite)&&z>=100&&z<=625){view.w=100000/z;view.h=view.w;view.x=clamp(x-view.w/2,0,1000-view.w);view.y=clamp(y-view.h/2,0,1000-view.h);updateView()}
apply();render();
})();
