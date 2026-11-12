from pathlib import Path
import json,re
p=Path(__file__).resolve().parent
html=(p/'atlas-research.html').read_text(); js=(p/'atlas-research.js').read_text(); src=(p/'atlas.js').read_text()
required=['map','q','families','groups','region','tag','resultList','place','placeVisited','placeFav','placeRoute','share','routeCSV','importData','routeList']
assert len(set(re.findall(r'\bid="([^"]+)"',html)))==len(re.findall(r'\bid="([^"]+)"',html)), 'duplicate IDs'
for field in required:assert f'id="{field}"' in html,field
for part in ['function normalize(', 'function tagFamily(', 'function groupFor(', 'function filtered(', 'function draw(', 'function select(', 'function exportCSV(', 'sourceUrl','sourceType']:
 if part=='sourceUrl':continue
 assert part in js,part
assert 'GTADB.net' not in js, 'GTADB.net content must not be scraped'
assert "['research,view'" not in src,'Research is a standalone workflow, not duplicate style'
assert "['scaly,view'" in src and "['loki,view'" in src
for f in ['atlas-vi.html','atlas-online.html','atlas.html','atlas-cayo.html','index.html']:
 assert './atlas-research.html' in (p/f).read_text(),f
assert 'shell66-research-workspace' in (p/'atlas-sw.js').read_text()
assert len(json.loads((p/'gtadb-v6.json').read_text()))>=10
print('Atlas 6.6 Research integration: PASS')
