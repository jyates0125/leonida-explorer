from pathlib import Path
import json,subprocess,os,re,sys
P=Path(__file__).resolve().parent
checks=[]
def ok(label,yes):
 checks.append((label,bool(yes)))
 if not yes:print('FAIL',label)
for mode in ['story','online','vi']:
 file=(P/'atlas-activities.html').read_text()
 ok('activity hub '+mode, 'id="link'+{'story':'Story','online':'Online','vi':'Vi'}[mode]+'"' in file)
for page,mode in [('atlas.html','story'),('atlas-online.html','online'),('atlas-vi.html','vi')]:
 s=(P/page).read_text()
 ok(page+' activity link',f'./atlas-activities.html?mode={mode}' in s)
 ok(page+' dependency', 'atlas-conditions.js?v=68' in s and 'atlas.js?v=68' in s)
script=(P/'atlas.js').read_text()
ok('story shield', 'function storyPermitted' in script and "mode==='story')return combined.filter(storyPermitted)" in script)
ok('online exclusion', "mode==='online')return combined.filter(r=>r.scope!=='story')" in script)
ok('online condition markers', 'function conditionPinColor' in script)
ok('VI condition isolation', "window.JuraConditions.BY_ID[r.activityId].mode==='vi'" in script)
sw=(P/'atlas-sw.js').read_text();ok('new cache', 'shell68-game-condition-isolation' in sw)
ok('offline condition assets',all(x in sw for x in ['atlas-conditions.js','atlas-activities.html','atlas-activities.js','atlas-activities.css']))
ok('retains GTA VI/online/stories',all((P/x).exists() for x in ['atlas-cayo.html','atlas-vi.html','atlas-online.html','atlas.html','atlas-research.html','data/gtadb-6-manifest.json']))
res=subprocess.run(['node','-e',r'''
const assert=require('assert'), c=require(process.argv[1]);
assert(c.RULES.every(r=>['story','online','vi'].includes(r.mode)));
assert(c.rulesForMode('story').every(r=>r.mode==='story'));
assert(c.rulesForMode('vi').every(r=>r.mode==='vi'));
assert(c.rulesForMode('online').every(r=>r.mode==='online'));
assert.strictEqual(c.evaluate('gun-van',{mode:'story'}).status,'excluded');
assert.strictEqual(c.evaluate('ghost-1',{mode:'vi'}).status,'excluded');
assert.strictEqual(c.evaluate('story-letters',{mode:'online'}).status,'excluded');
assert.strictEqual(c.evaluate('vi-trailer',{mode:'online'}).status,'excluded');
assert.strictEqual(c.evaluate('ghost-1',{mode:'online',state:{events:{halloween:true}},hour:20}).status,'active');
assert.strictEqual(c.evaluate('ghost-1',{mode:'online',state:{events:{halloween:true}},hour:21}).status,'possible');
assert.strictEqual(c.evaluate('ghost-1',{mode:'online',state:{events:{}},hour:20}).status,'unknown');
assert.strictEqual(c.evaluate('ghost-10',{mode:'online',state:{events:{halloween:true}},hour:0}).status,'locked');
const nine=Object.fromEntries(Array.from({length:9},(_,i)=>['ghost-'+(i+1),true]));
assert.strictEqual(c.evaluate('ghost-10',{mode:'online',state:{events:{halloween:true},completed:nine},hour:0}).status,'active');
assert.strictEqual(c.evaluate('cayo-stashes',{mode:'online',state:{flags:{'metal-detector':true,'cayo-intel':false}}}).status,'locked');
assert.strictEqual(c.evaluate('vi-trailer',{mode:'vi'}).status,'research');
assert.strictEqual(c.evaluate('story-stunts',{mode:'story'}).status,'possible');
assert.strictEqual(c.evaluate('gun-van',{mode:'online'}).status,'unknown');
assert.strictEqual(c.evaluate('gun-van',{mode:'online',snapshot:{rotations:{'gun-van':{activeIds:['10'],checkedAtUtc:'2026-11-11T12:00:00Z',validUntilUtc:'2026-11-11T14:00:00Z'}}},now:Date.parse('2026-11-12T12:00:00Z'),markerId:'10'}).status,'unknown');
const now=Date.parse('2026-11-11T13:00:00Z'),snap={rotations:{'gun-van':{activeIds:['10'],checkedAtUtc:'2026-11-11T12:00:00Z',validUntilUtc:'2026-11-11T14:00:00Z',source:'Test only'}}};
assert.strictEqual(c.evaluate('gun-van',{mode:'online',snapshot:snap,now,markerId:'10'}).status,'active');
assert.strictEqual(c.evaluate('gun-van',{mode:'online',snapshot:snap,now,markerId:'11'}).status,'possible');
console.log('19+ evaluator assertions passed');
''',str(P/'atlas-conditions.js')],text=True,capture_output=True)
ok('condition evaluator',res.returncode==0)
if res.returncode:print(res.stderr)
else:print(res.stdout.strip())
print(sum(b for _,b in checks),'/',len(checks),'static checks passed')
if not all(b for _,b in checks):sys.exit(1)
