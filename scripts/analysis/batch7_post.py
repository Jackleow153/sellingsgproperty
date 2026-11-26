"""Batch 7 on method v2 (26 Nov 2026): post-launch condos (VSTAT files: sold out, or last units / early sales). Built from the same,
already-sourced data the post-launch page shows (project list in assets/app.js, VSTAT sales status, XSCORE scores and sources), through
the selling-now builder, with the launch average as the price tested and the wording changed for sold-out projects. Imported by projects_v2.py."""
import json, os, re, subprocess
import batch6_selling as B6

ROOT = B6.ROOT
S = B6.SRC_HTML
def _grab(name):
    js = ('const fs=require("fs");const s=fs.readFileSync(process.argv[1],"utf8");const i=s.indexOf("const %s = ");const st=s.indexOf("=",i)+1;'
          'let j=st,d=0,b=false;for(;j<s.length;j++){const c=s[j];if(c=="{"||c=="["){d++;b=true}else if(c=="}"||c=="]"){d--;if(b&&d==0){j++;break}}}console.log(JSON.stringify(eval("("+s.slice(st,j)+")")))') % name
    return json.loads(subprocess.run(['node', '-e', js, os.path.join(ROOT, 'data', 'condo-analysis.html')], capture_output=True, text=True, check=True).stdout)
VSTAT, XSCORE = _grab('VSTAT'), _grab('XSCORE')
_js = r'''const fs=require("fs");const app=fs.readFileSync(process.argv[1],"utf8");const i=app.indexOf("const projects = [");const st=app.indexOf("[",i);let d=0,j=st;for(;j<app.length;j++){const c=app[j];if(c=="[")d++;else if(c=="]"){d--;if(d==0){j++;break}}}console.log(JSON.stringify(eval(app.slice(st,j))))'''
APP = json.loads(subprocess.run(['node', '-e', _js, os.path.join(ROOT, 'assets', 'app.js')], capture_output=True, text=True, check=True).stdout)
REG = {'ocr': 'Suburbs (OCR)', 'rcr': 'City fringe (RCR)', 'ccr': 'Prime city (CCR)'}
TOWNS7 = {'chuan-park': ['Serangoon', 'Ang Mo Kio'], 'emerald-of-katong': ['Marine Parade', 'Geylang'], 'nava-grove': ['Queenstown', 'Clementi'],
          'rivelle-tampines-ec': ['Tampines', 'Bedok'], 'arina-east-residences': ['Kallang/Whampoa', 'Marine Parade'], 'bagnall-haus': ['Bedok', 'Marine Parade'],
          'tengah-garden-residences': ['Bukit Batok', 'Choa Chu Kang'], 'duet-emily': ['Kallang/Whampoa', 'Toa Payoh']}
B6.TOWNS.update(TOWNS7)


def _mid(t):
    v = [int(n.replace(',', '')) for n in re.findall(r'\d[\d,]*', str(t))]
    v = [n for n in v if n >= 300]
    return round(sum(v) / len(v)) if v else None


def _beds(t):
    m = re.search(r'(\d)\s*Bed', str(t), re.I); return int(m.group(1)) if m else None


def x_for(k):
    xs, vs = XSCORE[k], VSTAT[k]
    p = next(p for p in APP if p['name'] == xs['name'] or p['name'].lower().startswith(xs['name'].lower()[:8]))
    fp = []
    for u in p.get('unitMix') or []:
        b, sz = _beds(u.get('type')), _mid(u.get('size'))
        if b and sz and isinstance(u.get('price'), (int, float)): fp.append([b, u['type'], sz, f"${u['price'] / 1e6:.3f}M (from, at launch)", ''])
    sold_out = (vs.get('soldPct') or 0) >= 99.5 or bool(vs.get('out'))
    return dict(id=k, name=xs['name'], area=p['location'].split(',')[0], district=(re.search(r'D\d+', p['location']) or [''])[0], region=REG.get(str(p.get('district', '')).lower(), 'Suburbs (OCR)'),
                dev=p['developer'], units=str(p['totalUnits']), tenure=p['tenure'].replace('LH', 'years leasehold'), top=p['top'], launch=p['launchDate'],
                sold=f"{vs['line']} ({vs['asOf']}). {vs['note']}", soldPct=vs.get('soldPct') or 0, avg=f"${p['avgPSF']:,} psf average at launch ({p['launchDate']}), as reported", avgPsf=p['avgPSF'],
                land='Not stated in the sources checked', mrt=p.get('distanceMRT') or p.get('mrt') or '', scores=xs['scores'], verdict=xs.get('verdict', ''), why=xs.get('why', ''),
                pros=[xs.get('verdict', '')] if xs.get('verdict') else [], cons=[], alts=[], src=(xs.get('src') or []) + (vs.get('src') or []), fp=fp,
                ec='(EC)' in xs['name'] or 'executive' in xs['name'].lower(), _sold_out=sold_out, _early=(vs.get('soldPct') or 0) < 50, _vs=vs)


P, META7 = {}, {}
for k in VSTAT:
    x = x_for(k)
    c, meta = B6.make(x)
    vs = x['_vs']
    c['post'] = True
    if x['_sold_out']:
        c['exp_word'] = 'launch average'
        c['timeline'] = ((f"Sold out ({vs['asOf']}). An EC cannot be sold on before completion; it can be resold only after the 5-year minimum occupation period. " if x['ec'] else f"Sold out ({vs['asOf']}). You can only buy it as a sub-sale before completion or on the resale market after it, usually above the launch price. ")
                         + f"Completion: {x['top']}. We test the launch average and look at a sale in {c['buy_year'] + c['years']}.")
        c['faq_extra'] = [[f"Is {x['name']} a good buy?", None], ['Can I still buy a unit?', (f"Not from the developer: {vs['line'].lower()} ({vs['asOf']}). As an EC it can be resold only after its 5-year minimum occupation period; compare any resale psf with the buy-at price here." if x['ec'] else f"Not from the developer: {vs['line'].lower()} ({vs['asOf']}). Look for a sub-sale or, after completion, a resale, and compare its psf with the buy-at price here.")]]
        c['sold_out'] = True
        c['conf_note'] = f"Prices tested are the launch average ({x['avg']}); sub-sale and resale prices will differ. Sales: {vs['line']} ({vs['asOf']})."
    else:
        c['exp_word'] = 'launch average'
        c['timeline'] = (f"{'Early sales' if x['_early'] else 'Last units'}: {vs['line']} ({vs['asOf']}). Buy now from the developer at about the launch average. Completion: {x['top']}. "
                         f"We look at a sale in {c['buy_year'] + c['years']}.")
        c['faq_extra'] = [[f"Is {x['name']} a good buy now?", None], ['How many units are left?', f"{vs['line']} ({vs['asOf']}). Ask the sales team which stacks are still available before deciding."]]
    P[k], META7[k] = c, meta
