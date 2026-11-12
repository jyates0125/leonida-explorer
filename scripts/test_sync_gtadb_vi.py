import importlib.util
from pathlib import Path
p=Path(__file__).with_name('sync_gtadb_vi.py');s=importlib.util.spec_from_file_location('gta_sync',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
records={f'L{i}':[f'Example #{i}',[i/10.,-i/10.],[], '',[],[],[], 'abcd12'] for i in range(1,801)}
valid,invalid,colors,coords=m.validate(records)
assert len(valid)==800 and invalid==0 and colors==800
try:m.validate({'L1':records['L1']})
except ValueError:pass
else:raise AssertionError('Too-small dataset accepted')
records['malicious']=[]
valid,invalid,_,_=m.validate(records)
assert len(valid)==800 and invalid==1
print('GTADB VI snapshot validation tests PASS')
