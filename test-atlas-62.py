"""Team Jura Atlas 6.2 offline package regression checks (no network)."""
from pathlib import Path
from html.parser import HTMLParser
import subprocess,json,re,sys,hashlib
ROOT=Path(__file__).resolve().parent
PAGES=['atlas.html','atlas-online.html','atlas-vi.html']
class Inspect(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag in ('script','link'):
   for key in ('src','href'):
    v=a.get(key,'')
    if v.startswith('./'):self.refs.append(v.split('?',1)[0][2:])
checks=[]
def check(condition,label):
 assert condition,label
 checks.append(label)
js=(ROOT/'atlas.js').read_text()
check("const TILE_HOSTS=['https://maps.gtadb.org/tiles/'" in js,'primary license-attributed tile host')
check("UPSTREAM+'maps/tiles/'" in js and 'const loadAttempt=index' in js,'retry to upstream repository source')
check('img.crossOrigin=\'anonymous\'' in js,'map pixels requested with canvas-safe CORS')
check('tileHealth()' in js and 'atlas-tiles-error' in js,'clear map-image health diagnostics')
check("'jura3-progress'" in js and "'jura-atlas-routes'" in js and "'team-jura-atlas-v41'" in js,'preserve progress, routes and pins storage keys')
check("const PER_PAGE=40" in js and "function orderedMatches()" in js,'full accessible sorted and paginated data list')
check('function exportVisibleCSV()' in js and "'Provisional / unverified'" in js,'source-labeled CSV export')
check('scaly,view' in js and 'loki,view' in js and 'yanis,17' in js,'six original VI styles preserved')
check("['uv','UV · Leonida blueprint (Team Jura)']" in js and "['uv2','UV II · Leonida paper (Team Jura)']" in js, 'GTA VI UV I and II are available')
check("if(g==='6'&&style==='uv')list.push('yanis,15','dupzor,51')" in js,'GTA VI UV illustrated fallback')
check("filterScope=()=>game==='6'?'6':mode==='online'?'5-online':'5-story'" in js,'separate Story and Online category choices')
check('function renderNamedLayers()' in js and 'passesNamedLayers(r,hidden)' in js and 'function collectionLayerId' in js,'coordinate-grounded named and collection-type switches')
for filename in PAGES:
 page=Inspect();page.feed((ROOT/filename).read_text())
 check(len(page.ids)==len(set(page.ids)),filename+': element IDs unique')
 wanted={'namedLayerSearch','namedLayerShowAll','namedLayerHideAll','namedLayerCount','atlasFilterDrawer','atlasListSort','atlasExportVisible','tileHealth','selectedAddress','jura3d','jura2d','atlasCanvas','selectedPhoto','legend','juraNavPanel'}
 check(wanted.issubset(page.ids),filename+': explorer and navigation elements present')
 check(all((ROOT/r).exists() for r in page.refs),filename+': stylesheet and script references resolve')
 check('atlas.js?v=63' in (ROOT/filename).read_text(),filename+': fresh asset version')
for path in ROOT.glob('*.js'):
 p=subprocess.run(['node','--check',str(path)],capture_output=True,text=True)
 check(p.returncode==0,'JS syntax: '+path.name+': '+p.stderr[:100])
for name in ['gtadb-v5.json','gtadb-v6.json','data/gtadb-6-manifest.json','atlas-collections.json','atlas-catalog.json']:
 json.loads((ROOT/name).read_text())
check(True,'valid bundled JSON tables')
check("shell64-cayo-road-truth" in (ROOT/'atlas-sw.js').read_text(),'new shell cache and preserved user data cache')
check((ROOT/'FEATURE-COMPARISON-GTAWEB-GTADB.md').exists(),'complete evidence/roadmap comparison')
print('ATLAS 6.2: PASS — '+str(len(checks))+' offline assertions, including '+str(len(list(ROOT.glob('*.js'))))+' JavaScript files.')
print('NOTE: network tile imagery, browser interaction and GPU/WebGL live rendering were not verified.')
