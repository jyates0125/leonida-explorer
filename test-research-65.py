from pathlib import Path
import re, json
D=Path(__file__).resolve().parent
s=(D/'atlas.js').read_text()
views=re.search(r" '6':\[(.*)\]\n\};",s).group(1)
for name in ['scaly,view','loki,view']:assert views.count("['"+name+"'")==1, name
assert "['cyber,1'" not in views
assert "['uv','UV · Leonida blueprint" not in s
assert (D/"atlas-research.html").exists() and (D/"atlas-research.js").exists()
assert "Array.isArray(data.records)||(data.records&&typeof data.records==='object'" in s
for page in ['atlas.html','atlas-online.html','atlas-vi.html']:
 html=(D/page).read_text()
 assert html.count('id="juraMapLegend"')==1 and html.count('id="juraTrailerLegend"')==1
 assert 'jura-floating-left" open hidden' not in html and 'jura-floating-right" open hidden' not in html
 assert './atlas.js?v=65' in html
assert "state.style==='research,view'" in (D/'atlas-dual-legends.js').read_text()
assert 'shell66-research-workspace' in (D/'atlas-sw.js').read_text()
assert (D/'atlas-cayo.html').exists()
print('PASS Atlas 6.5 research/legends/snapshot structural checks')
