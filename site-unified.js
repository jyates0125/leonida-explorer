(()=>{'use strict';
  // Shared accessibility/navigation shell for older utility and guide pages.
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const mapWorlds=new Set(['atlas.html','atlas-online.html','atlas-vi.html']);
  const classic=document.querySelector('.portal-app');
  for(const anchor of document.querySelectorAll('a[href]')){
    try{const dest=new URL(anchor.href,location.href);if(dest.origin===location.origin&&dest.pathname===location.pathname)anchor.setAttribute('aria-current','page')}
    catch{}
  }
  if(classic||mapWorlds.has(path))return;
  if(!document.querySelector('header'))return;
  if(document.querySelector('.studio-quickbar'))return;
  const bar=document.createElement('nav');
  bar.className='studio-quickbar';bar.setAttribute('aria-label','Site-wide quick navigation');
  const pages=[['Home','index.html'],['Map explorer','atlas.html'],['Leonida HQ','leonida-hq.html'],['One Last Ride','one-last-ride.html'],['Sources & credits','atlas-credits.html']];
  pages.forEach(([label,target])=>{const a=document.createElement('a');a.href='./'+target;a.textContent=label;if(path===target)a.setAttribute('aria-current','page');bar.append(a)});
  const header=document.querySelector('body > header');
  if(header)header.insertAdjacentElement('afterend',bar);
  // Helpful indicator and clear non-Rockstar affiliation, without crowding the explorer controls.
  if(!document.querySelector('.studio-site-note')){
    const note=document.createElement('div');note.className='studio-site-note';note.textContent='Team Jura × Elario Studios · Unofficial fan companion · Credited Community Research & Development';
    document.body.append(note);
  }
})();
