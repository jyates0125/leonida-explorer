import threading, http.server, socketserver, os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent
class Handler(http.server.SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def log_message(self,*a):pass
server=socketserver.TCPServer(('127.0.0.1',0),Handler)
threading.Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_address[1]}/atlas-vi.html'
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  page=browser.new_page(viewport={'width':1440,'height':900})
  page.goto(url,wait_until='domcontentloaded',timeout=30000)
  page.wait_for_timeout(1800)
  print('title:',page.title())
  page.locator('#layer').select_option('scaly,view')
  assert page.locator('#juraMapLegend').is_visible()
  assert page.locator('#juraTrailerLegend').is_visible()
  assert not page.locator('#juraMapLegend').evaluate('(e)=>e.open')
  assert not page.locator('#juraTrailerLegend').evaluate('(e)=>e.open')
  page.locator('#juraMapLegend summary').click()
  assert page.locator('#juraMapLegend').evaluate('(e)=>e.open')
  page.locator('#layer').select_option('research,view')
  assert page.locator('#juraMapLegend').is_visible()
  assert page.locator('#layer option[value="research,view"]').count()==1
  assert page.locator('#layer option[value="cyber,1"]').count()==0
  assert page.locator('#layer option[value="uv"]').count()==0
  page.locator('#layer').select_option('loki,view')
  assert page.locator('#juraTrailerLegend').is_visible()
  page.screenshot(path='/mnt/data/atlas65-browser.png',full_page=False)
  print('PASS browser: Scaly/Loki/Research options, legends, interaction, retired options')
  browser.close()
finally:server.shutdown()
