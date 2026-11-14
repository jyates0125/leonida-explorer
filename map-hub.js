/* Classic-world reference gateways with transparent source labeling. */
(()=>{'use strict';const data={
i:['Grand Theft Auto','The original crime trilogy of city maps','Liberty City, San Andreas and Vice City origins',['Three original cities','Classic missions and pickups']],
ii:['Grand Theft Auto 2','The early top-down era','Anywhere City',['Districts and gang territories','Collectible and mission references']],
london:['GTA London','The London mission packs','London, 1969 and 1961',['Original-era mission routes','Historic city reference']],
iii:['Grand Theft Auto III','The 3D era began in Liberty City','Liberty City',['Hidden packages','Rampages','Stunt jumps']],
vc:['GTA Vice City','Neon streets and classic waterfront','Vice City',['Hidden packages','Rampages','Properties']],
sa:['GTA San Andreas','Cities, deserts and countryside','Los Santos · San Fierro · Las Venturas',['Gang tags','Oysters and horseshoes','Snapshots']],
lcs:['Liberty City Stories','A return to the streets of Liberty City','Liberty City',['Hidden packages','Missions','Stunt jumps']],
vcs:['Vice City Stories','Vice City before the original game','Vice City',['Red balloons','Businesses','Missions']],
tlad:['The Lost and Damned','Motorcycle clubs in Liberty City','Liberty City',['Seagulls','Motorcycle missions','Gang wars']],
tbogt:['The Ballad of Gay Tony','Nightlife and heists around Liberty City','Liberty City',['Seagulls','Nightclub missions','Activities']],
ctw:['Chinatown Wars','A portable-era return to Liberty City','Liberty City',['Security cameras','Missions','Safehouses']]};const p=new URLSearchParams(location.search),id=(p.get('game')||'').toLowerCase(),x=data[id]||['Classic GTA maps','Explore the historic GTA worlds','GTA universe',['Game-world guides','Reference maps']];const $=id=>document.getElementById(id);$('hubTitle').textContent=x[0];$('hubDescription').textContent=x[1];$('hubStatus').textContent=x[2]+' · Reference gateway';document.title=x[0]+' · Map Reference | Team Jura Atlas';const ul=document.createElement('ul');for(const name of x[3]){const li=document.createElement('li');li.textContent=name;ul.append(li)}$('hubFeatures').replaceChildren(ul);const links=$('hubLinks');for(const [url,label] of [['https://gta.wiki/','Research at GTA Wiki ↗'],['https://gtaweb.eu/','Explore GTAWeb map references ↗'],['./maps.html','Return to Team Jura map directory ↗']]){const a=document.createElement('a');a.href=url;a.className='hub-link';a.textContent=label;if(url.startsWith('http')){a.target='_blank';a.rel='noopener noreferrer'}links.append(a)}})();
