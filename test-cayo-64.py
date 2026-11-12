from pathlib import Path
from html.parser import HTMLParser
import json,re,subprocess
p=Path(__file__).resolve().parent
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[]
 def handle_starttag(self,t,attrs):
  d=dict(attrs)
  if d.get('id'):self.ids.append(d['id'])
  if t in ('a','script') and (d.get('href','').startswith('./') or d.get('src','').startswith('./')):self.links.append(d.get('href',d.get('src')).split('?')[0][2:])
for name in ['index.html','atlas.html','atlas-online.html','atlas-vi.html','atlas-cayo.html']:
 s=(p/name).read_text();doc=Page();doc.feed(s)
 assert len(doc.ids)==len(set(doc.ids)),name
 assert all((p/x).exists() for x in doc.links), (name,[x for x in doc.links if not (p/x).exists()])
 assert 'atlas-cayo.html' in s,name
doc=Page();doc.feed((p/'atlas-cayo.html').read_text())
assert {'results','filters','routeStops','markers','routeLayer','status','map'}.issubset(doc.ids)
j=json.loads((p/'data/cayo-schematic.json').read_text());assert len(j['locations'])==20
assert set(x['category'] for x in j['locations'])=={'intel','research','escape','compound','infiltration'}
assert all(x['positionQuality']=='schematic' for x in j['locations'])
assert 'ILLUSTRATIVE-NOT-GAME-COORDINATES' in (p/'atlas-cayo.js').read_text()
road=(p/'atlas-road-core.js').read_text();assert 'drivingVerified:false' in road and 'UNVERIFIED ROAD GRAPH' in road
js='''const r=require('./atlas-road-core.js'); const graph=r.validateGraph({version:1,game:'6',units:'gta-world',nodes:[{id:'a',x:0,y:0},{id:'b',x:100,y:0}],edges:[{from:'a',to:'b'}]});const p=r.route([{x:0,y:0,name:'start'},{x:100,y:0,name:'finish'}],graph);if(p.drivingVerified||!p.roadGraphUsed||!p.warning.includes('UNVERIFIED'))process.exit(1);const q=r.route([{x:0,y:0},{x:100,y:0}]);if(q.drivingVerified||q.roadGraphUsed)process.exit(2);'''
subprocess.run(['node','-e',js],cwd=p,check=True)
for f in p.glob('*.js'):subprocess.run(['node','--check',str(f)],check=True)
print('ATLAS 6.4: PASS — standalone island source, links, schematic labels, JS checks and road graph verification controls')
