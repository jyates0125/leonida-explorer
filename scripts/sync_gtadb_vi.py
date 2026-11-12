#!/usr/bin/env python3
"""Team Jura: reproducible GTA VI landmark snapshot sync from GTADB's CC BY 4.0 GitHub data.
No copyrighted third-party scraping, no arbitrary code execution, no game-road claims.
Run in GitHub Actions or locally: python scripts/sync_gtadb_vi.py
"""
from pathlib import Path
from urllib.request import Request, urlopen
import json, hashlib, datetime, os, sys
UPSTREAM="https://raw.githubusercontent.com/rolux/gtadb.org/main/map/data/6/landmarks.json"
LICENSE_URL="https://creativecommons.org/licenses/by/4.0/"
OUTPUT=Path(__file__).resolve().parents[1]/"data"/"gtadb-6.json"
MANIFEST=OUTPUT.with_name("gtadb-6-manifest.json")
MAX_BYTES=8_000_000

def fetch():
    req=Request(UPSTREAM,headers={"User-Agent":"Team-Jura-Atlas-Sync/6.1 (+https://github.com/jyates0125/leonida-explorer)","Accept":"application/json"})
    with urlopen(req,timeout=30) as response:
        if response.status!=200:raise RuntimeError("GTADB raw GitHub fetch failed")
        content=response.read(MAX_BYTES+1)
    if len(content)>MAX_BYTES:raise ValueError("Source exceeds limit")
    return json.loads(content)

def validate(data):
    if not isinstance(data,dict):raise ValueError("Expected GTADB landmark dictionary")
    if len(data)<500 or len(data)>25000:raise ValueError("Unexpected landmark count: "+str(len(data)))
    valid={};rejected=0;colors=0;coords=0
    for key,values in data.items():
        if not isinstance(key,str) or len(key)>48 or not key.startswith('L') or not key[1:].isdigit():rejected+=1;continue
        if not isinstance(values,list) or len(values)<7:rejected+=1;continue
        name,where=values[0],values[1]
        if not isinstance(name,str) or len(name)>200 or not isinstance(where,list) or len(where)<2:rejected+=1;continue
        x,y=where[:2]
        if not (isinstance(x,(int,float)) and isinstance(y,(int,float)) and abs(x)<=16384 and abs(y)<=16384):rejected+=1;continue
        if len(values)>7 and isinstance(values[7],str) and len(values[7])==6:colors+=1
        if len(values)>4 and isinstance(values[4],list) and len(values[4])==2:coords+=1
        valid[key]=values
    if len(valid)<500:raise ValueError("Too few valid coordinates")
    return valid,rejected,colors,coords

def main():
    raw=fetch();valid,rejected,colors,coords=validate(raw)
    OUT=OUTPUT;OUT.parent.mkdir(parents=True,exist_ok=True)
    previous={}
    if OUT.exists():
        try:
            old=json.loads(OUT.read_text())
            if isinstance(old.get('records'),dict):previous=old['records']
        except (ValueError,KeyError):pass
    additions=sorted(set(valid)-set(previous));removed=sorted(set(previous)-set(valid));modified=sorted(k for k in set(previous)&set(valid) if previous[k]!=valid[k]);rawsha=hashlib.sha256(json.dumps(valid,sort_keys=True,ensure_ascii=False).encode()).hexdigest()
    # No meaningless daily commits when nothing changed.
    if previous and not(additions or removed or modified):
        print('GTADB VI source unchanged, records='+str(len(valid))+'; no commit needed')
        return
    now=datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat()
    snapshot={"schema":1,"game":"6","status":"community-provisional","source":"GTADB.ORG and contributors","sourceUrl":"https://github.com/rolux/gtadb.org/tree/main/map/data/6","license":"CC BY 4.0","licenseUrl":LICENSE_URL,"changes":"Imported/normalized for Team Jura Atlas; no alterations to source records","sourceUpdated":now,"count":len(valid),"sourceHash":rawsha,"records":valid}
    manifest={"game":"6","status":"provisional / unverified GTA VI coordinates","lastChecked":now,"count":len(valid),"newCount":len(additions),"changedCount":len(modified),"removedCount":len(removed),"sampleNewIds":additions[:30],"sampleChangedIds":modified[:30],"sourceHash":rawsha,"sourceUrl":snapshot['sourceUrl'],"license":"CC BY 4.0"}
    OUT.write_text(json.dumps(snapshot,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
    MANIFEST.write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print('Updated GTA VI snapshot: '+str(len(valid))+' records; added '+str(len(additions))+', changed '+str(len(modified))+', removed '+str(len(removed))+'; '+str(colors)+' source colors, '+str(coords)+' real-world references, rejected '+str(rejected))

if __name__=='__main__':
    try:main()
    except Exception as error:
        print('SYNC ERROR: '+str(error),file=sys.stderr);sys.exit(1)
