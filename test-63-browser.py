from playwright.sync_api import sync_playwright
from pathlib import Path
import threading,http.server,socketserver,os
ROOT=Path(__file__).parent
os.chdir(ROOT)
class Handler(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
class Server(socketserver.ThreadingTCPServer):allow_reuse_address=True
server=Server(('127.0.0.1',8765),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':1365,'height':900})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:8765/atlas-vi.html',wait_until='domcontentloaded',timeout=25000)
 page.wait_for_timeout(1800)
 print('pageerrors:',errors[:4]);print('style:',page.locator('#layer').input_value());print('layers:',page.locator('#layer option').all_text_contents());print('legends:',page.locator('#juraMapLegend').is_visible(),page.locator('#juraTrailerLegend').is_visible())
 print('map legend count:',page.locator('#juraMapLegendCount').inner_text())
 page.locator('#juraMapLegendSearch').fill('landmark');page.wait_for_timeout(150)
 print('search rows:',page.locator('#juraMapLegendRows .jura-floating-row').count())
 page.locator('#juraMapLegendSearch').fill('');page.locator('#juraOpenNav').click(force=True);page.wait_for_timeout(100)
 print('nav open:',page.locator('#juraNavPanel').is_visible(), 'move controls:',page.locator('.jura-move-stop').count(), 'csv:',page.locator('#juraNavCsv').count())
 page.locator('#juraCloseNav').click(force=True)
 page.locator('#layer').select_option('loki,view');page.wait_for_timeout(150)
 print('loki legends:',page.locator('#juraMapLegend').is_visible(),page.locator('#juraTrailerLegend').is_visible())
 page.locator('#layer').select_option('yanis,17');page.wait_for_timeout(150)
 print('yanis legends hidden:',not page.locator('#juraMapLegend').is_visible(),not page.locator('#juraTrailerLegend').is_visible())
 assert not errors,errors
 browser.close()
server.shutdown()
