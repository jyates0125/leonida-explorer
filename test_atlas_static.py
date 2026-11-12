"""No-network regression test for the Atlas 6.1 root-site contracts."""
from pathlib import Path
from html.parser import HTMLParser
import re,json,sys
D=Path(__file__).resolve().parents[1]
class RefParser(HTMLParser):
    def __init__(self):super().__init__();self.refs=[];self.ids=set()
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.add(a['id'])
        for key in ['src','href']:
            url=a.get(key,'')
            if url.startswith('./') and not ('?' in url and not url.split('?',1)[0]): self.refs.append(url.split('?',1)[0].split('#')[0].removeprefix('./'))
js=(D/'atlas.js').read_text()
expected=['scaly,view','loki,view','yanis,17','yanis,15','dupzor,51','cyber,1']
m=re.search(r" '6':\[(.*)\]\n\};",js)
assert m,'GTA VI layer selector missing'
actual=re.findall(r"\['([^']+)','",m.group(1))
assert actual==expected,(actual,expected)
assert "let markerDensity='individual'" in js
assert 'function cluster(' not in js
assert 'markerColor:Array.isArray(v)' in js
assert "styles={'5':'radar','6':'scaly,view'}" in js
assert 'jura3-progress' in js and 'jura-atlas-routes' in js
assert 'data/gtadb-6.json' in js
for name in ['atlas.html','atlas-online.html','atlas-vi.html']:
    p=RefParser();p.feed((D/name).read_text())
    for wanted in ['jura3dCanvas','juraOpenNav','jura3d','jura2d','layer','legend','atlasCanvas']:
        assert wanted in p.ids,(name,wanted)
    missing=[f for f in p.refs if f and not (D/f).exists()]
    assert not missing,(name,missing)
for filename in ['atlas-3d.js','atlas-navigation.js','atlas-road-core.js','atlas-route-core.js']:
    assert (D/filename).stat().st_size>200,(filename,'missing')
assert (D/'.github/workflows/gtadb-vi-sync.yml').exists()
assert (D/'scripts/sync_gtadb_vi.py').exists()
assert (D/'data/gtadb-6-manifest.json').exists()
manifest=json.loads((D/'data/gtadb-6-manifest.json').read_text())
assert manifest['game']=='6' and manifest['license']=='CC BY 4.0'
print('Atlas 6.1 static regression PASS: 6 views, 3 modes, navigation, legacy keys, links, sync plumbing')
