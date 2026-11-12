/* Team Jura Atlas 6.3 — original data-driven two-sided legends for Scaly and Loki.
 * Never treats a map reconstruction or a generic source tag as verified trailer scene evidence. */
(()=>{'use strict';
const $=id=>document.getElementById(id),api=()=>window.JuraDualLegendAPI;
const left=$('juraMapLegend'),right=$('juraTrailerLegend');if(!left||!right)return;
let signature='',mapSearch='',trailerSearch='';
function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e}
function button(text,fn,cls){const b=node('button',text,cls);b.type='button';b.addEventListener('click',fn);return b}
function entry(record,mode,a){const row=node('div',undefined,'jura-floating-row');const toggle=button('',()=>mode==='category'?a.toggleCategory(record.id):a.toggleLayer(record.id),'jura-floating-switch');toggle.setAttribute('aria-pressed',String(record.enabled));toggle.setAttribute('aria-label',(record.enabled?'Hide ':'Show ')+record.label);const dot=node('span',mode==='category'?'●':'▣');dot.style.color=record.color||'#7dd6df';toggle.append(dot,node('span',record.label),node('small',String(record.count)));row.append(toggle,button('Only',()=>mode==='category'?a.onlyCategory(record.id):a.onlyLayer(record.id),'jura-floating-only'));return row}
function render(){const a=api();if(!a)return;const state=a.state(),visible=state.game==='6'&&(state.style==='scaly,view'||state.style==='loki,view');left.hidden=right.hidden=!visible;if(!visible)return;
 const categories=a.categories().filter(c=>c.count>0),layers=a.namedLayers().filter(c=>c.count>0),trailer=a.trailerRecords();const sig=JSON.stringify([state,categories,layers,trailer.map(r=>r.id),mapSearch,trailerSearch]);if(sig===signature)return;signature=sig;
 const root=$('juraMapLegendRows');root.replaceChildren();const q=mapSearch.trim().toLowerCase();let n=0;
 const groups=[['Map categories',categories,'category'],['Named tool and data layers',layers,'layer']];
 for(const [name,rows,type] of groups){const matching=rows.filter(r=>r.label.toLowerCase().includes(q));if(!matching.length)continue;root.append(node('div',name,'jura-floating-section'));for(const r of matching){root.append(entry(r,type,a));n++}}
 $('juraMapLegendCount').textContent=`${categories.length} categories · ${layers.length} named layers · ${n} listed`;
 if(!n)root.append(node('p','No matching loaded layers. Try another search or load a licensed source in the left toolbar.','jura-floating-note'));
 const panel=$('juraTrailerLegendRows');panel.replaceChildren();const t=trailer.filter(r=>[r.name,r.district||'',r.source||'',r.evidence||''].join(' ').toLowerCase().includes(trailerSearch.trim().toLowerCase()));
 $('juraTrailerCount').textContent=`${trailer.length} source/scene-tagged candidates · ${t.length} matches`;
 if(!t.length)panel.append(node('p',trailer.length?'No matching records.':'No mapped records explicitly tagged as trailer/scene evidence have loaded. Enable the licensed research feed or check the source data.','jura-floating-note'));
 for(const r of t.slice(0,100)){const item=node('div',undefined,'jura-trailer-item');item.append(button(r.name,()=>a.selectPlace(r.id),'jura-trailer-place'));const foot=node('small',`${r.district||'Leonida'} · ${r.uncertain!==false?'provisional coordinates':'source-mapped'} · ${String(r.source||'Research source').slice(0,58)}`,'jura-trailer-foot');item.append(foot);const actions=node('div',undefined,'jura-floating-actions');actions.append(button('Locate',()=>a.selectPlace(r.id)),button('+ Route',()=>{a.addRouteStop(r.id);a.openNavigation()}));item.append(actions);panel.append(item)}
 if(t.length>100)panel.append(node('p',`Showing 100 of ${t.length} matches; refine your search.`, 'jura-floating-note'));
}
$('juraLegendAll')?.addEventListener('click',()=>api()?.allCategories(true));$('juraLegendNone')?.addEventListener('click',()=>api()?.allCategories(false));
$('juraMapLegendSearch')?.addEventListener('input',e=>{mapSearch=e.target.value;signature='';render()});
$('juraTrailerSearch')?.addEventListener('input',e=>{trailerSearch=e.target.value;signature='';render()});
$('juraTrailerOpenNav')?.addEventListener('click',()=>api()?.openNavigation());
document.addEventListener('jura:legend-updated',render);document.addEventListener('DOMContentLoaded',render);render();
})();
