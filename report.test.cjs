const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const html=fs.readFileSync('index.html','utf8');
const data=fs.readFileSync('data.js','utf8');
const retest=fs.readFileSync('retest.js','utf8');
const script=fs.readFileSync('app.js','utf8');
function setup(query='',updates={}){
  const dom=new JSDOM(html,{url:'https://capitalinvestmentclub.github.io/pitcher-uat-report/'+query,runScripts:'outside-only'});
  const w=dom.window,d=w.document;
  w.HTMLElement.prototype.scrollIntoView=function(){};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;};
  w.HTMLAnchorElement.prototype.click=function(){w.downloaded=this.download;this.addEventListener('click',event=>event.preventDefault(),{once:true});this.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true}));};
  d.addEventListener('click',event=>{if(event.target.closest('a'))event.preventDefault();});
  w.URL.createObjectURL=blob=>{w.exported=blob;return 'blob:test';};w.URL.revokeObjectURL=()=>{};
  w.navigator.clipboard={writeText:async text=>{w.copied=text;}};
  w.setTimeout=fn=>{fn();return 1;};w.clearTimeout=()=>{};
  w.PR_REVIEW_UPDATES=updates;
  vm.runInContext(data,dom.getInternalVMContext(),{filename:path.resolve('data.js')});
  if(!Object.keys(updates).length)vm.runInContext(retest,dom.getInternalVMContext(),{filename:path.resolve('retest.js')});
  vm.runInContext(script,dom.getInternalVMContext(),{filename:path.resolve('app.js')});
  const $=s=>d.querySelector(s),all=s=>[...d.querySelectorAll(s)];
  const input=(s,value)=>{$(s).value=value;$(s).dispatchEvent(new w.Event(s==='#search'?'input':'change'));};
  return {dom,w,d,$,all,input};
}
test('matching dashboard structure, unchanged data and no sample findings',()=>{
 const x=setup();assert.equal(x.all('.finding-row').length,41);assert.equal(x.all('#scenarios tr').length,35);assert.equal(x.all('.cells span').length,210);
 assert.equal(x.$('#metric-urgent').textContent,'0');assert.equal(x.$('#metric-fixed').textContent,'15');assert.ok(html.startsWith('<!doctype html>'));
 assert.ok(!html.includes('truncated output'));assert.ok(!x.d.body.textContent.includes('ASS-003'));assert.equal(x.$('dialog').getAttribute('aria-labelledby'),'dialog-title');x.dom.window.close();
});
test('all release-critical retests publish six Chrome viewport passes with evidence',()=>{
 const x=setup();const fixed=Object.entries(x.w.PR_REVIEW_UPDATES).filter(([,update])=>update.status==='Fixed');assert.equal(fixed.length,15);
 for(const [id,update] of fixed){assert.equal(update.retest.browser,'Google Chrome');assert.equal(update.retest.sizes.length,6);assert.ok(update.retest.sizes.every(item=>item.status==='Pass'));assert.equal(update.visuals.length,6);assert.ok(update.visuals.every(item=>fs.existsSync(item.src)));x.$(`[data-id=${id}]`).click();assert.equal(x.all('#dialog-content .retest-cells span').length,6);x.$('#dialog-close').click();}
 x.dom.window.close();
});
test('evidence selection switches both surfaces, preserves deep links and never substitutes unrelated images',()=>{
 const x=setup();assert.equal(x.all('#selected-evidence img').length,0);
 const records=x.w.PR_REVIEW_DATA.findings;
 for(const finding of records){
   const effectiveVisuals=x.w.PR_REVIEW_UPDATES[finding.id]?.visuals || finding.visuals;
   x.input('#evidence-finding',finding.id);
   assert.equal(x.all('#selected-evidence img').length,effectiveVisuals.length);
   assert.match(x.$('#selected-evidence').textContent,new RegExp(finding.id));
   x.$(`[data-id=${finding.id}]`).click();
   assert.equal(x.all('#dialog-content .finding-evidence img').length,effectiveVisuals.length);
   assert.equal(x.$('#evidence-finding').value,finding.id);
   for(const item of effectiveVisuals)assert.ok(fs.existsSync(item.src));
   if(!effectiveVisuals.length)assert.match(x.$('#dialog-content').textContent,/No visual evidence published/);
   x.$('#dialog-close').click();
 }
 x.input('#evidence-finding','PIT-F008');assert.equal(x.all('#selected-evidence img').length,6);
 x.input('#evidence-finding','PIT-F012');assert.match(x.$('#selected-evidence img').src,/f012-360x800\.png/);
 const y=setup(x.w.location.search);assert.equal(y.$('#evidence-finding').value,'PIT-F012');assert.equal(y.all('#selected-evidence img').length,6);y.dom.window.close();
 x.$('#selected-evidence img').dispatchEvent(new x.w.Event('error'));assert.match(x.$('#selected-evidence').textContent,/could not load/);
 x.input('#evidence-finding','');assert.equal(x.all('#selected-evidence img').length,0);assert.match(x.$('#selected-evidence').textContent,/Select a finding/);
 x.dom.window.close();
 const z=setup('?evidence=invalid#PIT-F008');assert.equal(z.$('#evidence-finding').value,'PIT-F008');assert.equal(z.all('#selected-evidence img').length,6);z.dom.window.close();
});
test('search, every filter option, combinations, empty recovery and every sort',()=>{
 const x=setup();for(const q of ['PIT-F001','  cancelled  ','<script>','é, 漢字',' '.repeat(5),'x'.repeat(2000),'']){x.input('#search',q);assert.ok(!x.$('#active-filter-copy script'));}
 for(const checkbox of x.all('.filters input[type=checkbox]')){checkbox.click();assert.ok(x.all('.finding-row').every(row=>row.textContent.includes(checkbox.value)));checkbox.click();}
 for(const type of ['Defect','Question'])for(const severity of ['Critical','High','Medium','Low']){
   const t=x.$(`input[name=type][value="${type}"]`),s=x.$(`input[name=severity][value="${severity}"]`);t.click();s.click();
   assert.ok(x.all('.finding-row').every(r=>r.dataset.type===type&&r.dataset.severity===severity));s.click();t.click();
 }
 for(const sort of ['severity','id','scenario','status']){x.input('#sort',sort);assert.equal(x.all('.finding-row').length,41);assert.equal(x.$('#sort').value,sort);}
 x.input('#search','no such finding');assert.equal(x.$('#empty-state').hidden,false);x.$('#clear-filters').click();assert.equal(x.all('.finding-row').length,41);x.dom.window.close();
});
test('metric filters and URL hydration, malformed values, refresh, deep links',()=>{
 for(const [metric,count] of [['all',41],['urgent',0],['open',26],['fixed',15],['closed',0]]){const x=setup();x.$(`[data-metric-filter=${metric}]`).click();assert.equal(x.all('.finding-row').length,count);const y=setup(x.w.location.search);assert.equal(y.all('.finding-row').length,count);x.dom.window.close();y.dom.window.close();}
 const x=setup('?q=grant&type=Defect&severity=High&status=Fixed&sort=scenario#PIT-F008');assert.ok(x.$('dialog').open);assert.match(x.$('#dialog-title').textContent,/custom answers/);assert.ok(x.all('.finding-row').length>0);x.dom.window.close();
 const y=setup('?sort=__proto__&severity=bogus&type=unknown&status=unknown#unknown');assert.equal(y.all('.finding-row').length,41);assert.equal(y.$('#sort').value,'severity');assert.equal(y.$('dialog').open,false);y.dom.window.close();
});
test('all detail drawers, close/backdrop/Escape/hash and keyboard focus',()=>{
 const x=setup();for(const row of x.all('.finding-row')){row.click();assert.ok(x.$('dialog').open);assert.match(x.$('#dialog-content').textContent,/Reproduction/);x.$('#dialog-close').click();assert.equal(x.w.location.hash,'');}
 x.$('.finding-row').click();x.$('#dialog-title').dispatchEvent(new x.w.MouseEvent('click',{bubbles:true}));assert.ok(x.$('dialog').open);x.$('dialog').click();assert.equal(x.$('dialog').open,false);
 x.$('.finding-row').click();x.$('dialog').dispatchEvent(new x.w.Event('cancel',{cancelable:true}));assert.equal(x.w.location.hash,'');
 x.w.location.hash='PIT-F002';x.w.dispatchEvent(new x.w.HashChangeEvent('hashchange'));assert.ok(x.$('dialog').open);x.w.location.hash='';x.w.dispatchEvent(new x.w.HashChangeEvent('hashchange'));assert.equal(x.$('dialog').open,false);
 x.d.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'/'}));assert.equal(x.d.activeElement,x.$('#search'));x.d.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'a'}));x.d.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'/'}));
 x.$('.finding-row').click();x.d.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'/'}));x.$('#dialog-coverage').click();assert.equal(x.$('dialog').open,false);x.dom.window.close();
});
test('CSV export and copy success/failure',async()=>{
 const x=setup();x.input('#search','PIT-F001');x.$('#export-button').click();assert.equal(x.w.downloaded,'pitcher-uat-critical-high-retest-20260912.csv');assert.ok(x.w.exported.size>100);
 x.$('#share-button').click();await new Promise(setImmediate);assert.match(x.w.copied,/q=PIT-F001/);assert.match(x.$('#toast').textContent,/copied/);
 x.w.navigator.clipboard.writeText=async()=>{throw Error('unavailable');};x.$('#share-button').click();await new Promise(setImmediate);assert.match(x.$('#toast').textContent,/Copy unavailable/);x.dom.window.close();
});
test('future fix overlays preserve originals and render lifecycle evidence',()=>{
 const updates={
  'PIT-F001':{status:'Fixed',resolution:'Verified correction',verifiedAt:'2026-09-12',sourceUrl:'https://example.com/run',evidenceUrl:'https://example.com/image',fix:{summary:'Fix',commit:{sha:'abc',url:'https://example.com/commit'},pr:{label:'PR',url:'https://example.com/pr'},files:[{path:'file.js',url:'https://example.com/file'}],evidence:[{label:'Retest',url:'https://example.com/retest',note:'Browser'}]}},
  'PIT-F002':{status:'Closed',resolution:'Clarified',verificationEvidence:[{label:'Evidence',url:'https://example.com/e'}]},
  'PIT-F003':{status:'In progress'},'PIT-F004':{status:'Needs retest'},
  'PIT-F005':{status:'Fixed',fix:{}},'PIT-F006':{status:'Fixed',fix:{summary:'Fixed',commit:{url:'https://example.com/c'},pr:{url:'https://example.com/p'}}}
 };
 const x=setup('',updates);for(const id of Object.keys(updates)){x.$(`[data-id=${id}]`).click();assert.ok(x.$('dialog').open);x.$('#dialog-close').click();}assert.equal(x.$('#metric-fixed').textContent,'3');assert.equal(x.$('#metric-closed').textContent,'1');x.dom.window.close();
});
