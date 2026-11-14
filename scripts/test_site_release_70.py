"""Static release consistency audit for the Atlas 7.4.1 community preview."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
PAGES=sorted(ROOT.glob('*.html'))
class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.title='';self.meta='';self._title=False;self.links=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='title':self._title=True
        if tag=='meta' and a.get('name','').lower()=='description':self.meta=a.get('content','')
        if tag in ('a','script','link','img'):
            x=a.get('href') or a.get('src') or ''
            if x.startswith('./'):
                p=x[2:].split('?',1)[0].split('#',1)[0]
                if p:self.links.append(p)
    def handle_endtag(self,tag):
        if tag=='title':self._title=False
    def handle_data(self,data):
        if self._title:self.title+=data

assert len(PAGES)>=20, f'Unexpected number of active website pages: {len(PAGES)}'
errors=[]
for file in PAGES:
    p=Page();p.feed(file.read_text(encoding='utf-8'))
    if not p.title.strip():errors.append(f'{file.name}: empty browser title')
    if len(p.meta.strip())<35:errors.append(f'{file.name}: missing/short meta description')
    if re.search(r'\b(?:Atlas|Team Jura Atlas)\s+[56]\.\d',p.meta,re.I):errors.append(f'{file.name}: legacy version in description')
    for link in p.links:
        if not (ROOT/link).is_file():errors.append(f'{file.name}: broken local link \u2192 {link}')
for needed in ['README.md','SECURITY.md','.github/dependabot.yml','.github/workflows/atlas-checks.yml','project.html','atlas.js','atlas-sw.js']:
    if not (ROOT/needed).is_file():errors.append(f'Missing required file: {needed}')
for private in ['private-lab','atlas-lab-private','research-private']:
    if (ROOT/private).exists():errors.append(f'Private directory present in public release: {private}')
if errors:raise AssertionError('\n'.join(errors))
print(f'PASS: {len(PAGES)} HTML pages with updated titles, descriptions, valid local references and no private lab directory')
