import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
const outputDir=path.resolve(process.env.AUDIT_OUTPUT || 'reports/portfolio-audit/scroll');
const pct=(a,p)=>a.length?a[Math.min(a.length-1,Math.floor((a.length-1)*p))]:0;
(async()=>{
 await fs.mkdir(outputDir,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true});
 console.log('CHROME',browser.version());const results=[];
 for(const device of ['desktop','mobile4x']){
  const mobile=device==='mobile4x';const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile,reducedMotion:'no-preference'});
  const page=await context.newPage();const client=await context.newCDPSession(page);await client.send('Performance.enable');if(mobile)await client.send('Emulation.setCPUThrottlingRate',{rate:4});
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:4310',{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(2500);
  await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(1500);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1500);
  await page.screenshot({path:path.join(outputDir,'portfolio-'+device+'-baseline.png')});
  const anchors=await page.evaluate(()=>[...document.querySelectorAll('section,#projects')].map(e=>({id:e.id,y:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight})));
  for(let trial=1;trial<=3;trial++){
   await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1500);
   const before=await client.send('Performance.getMetrics');
   await client.send('Tracing.start',{categories:'devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.frame,blink.user_timing,benchmark',transferMode:'ReturnAsStream'});
   await page.evaluate(()=>{
    window.__audit={frames:[],longTasks:[],running:true};
    window.__audit.observer=new PerformanceObserver(list=>{for(const e of list.getEntries())window.__audit.longTasks.push({start:e.startTime,duration:e.duration})});window.__audit.observer.observe({type:'longtask'});
    const tick=t=>{const a=window.__audit;if(!a.running)return;a.frames.push({t,y:scrollY});a.raf=requestAnimationFrame(tick)};window.__audit.raf=requestAnimationFrame(tick);
   });
   await page.mouse.move(mobile?180:720,mobile?450:650);
   for(let i=0;i<52;i++){await page.mouse.wheel(0,180);await page.waitForTimeout(85);}
   await page.waitForTimeout(1000);
   const data=await page.evaluate(()=>{const a=window.__audit;a.running=false;cancelAnimationFrame(a.raf);a.observer.disconnect();return{frames:a.frames,longTasks:a.longTasks,finalY:scrollY}});
   const after=await client.send('Performance.getMetrics');
   const complete=new Promise(resolve=>client.once('Tracing.tracingComplete',resolve));await client.send('Tracing.end');const {stream}=await complete;let trace='';while(true){const r=await client.send('IO.read',{handle:stream});trace+=r.base64Encoded?Buffer.from(r.data,'base64').toString():r.data;if(r.eof)break;}await client.send('IO.close',{handle:stream});
   await fs.writeFile(path.join(outputDir,device+'-trial'+trial+'-trace.json'),trace);
   await fs.writeFile(path.join(outputDir,device+'-trial'+trial+'-samples.json'),JSON.stringify(data));
   const intervals=data.frames.slice(1).map((f,i)=>({dt:f.t-data.frames[i].t,y:f.y}));const sorted=intervals.map(x=>x.dt).sort((a,b)=>a-b);const start=data.frames[0]?.t,end=data.frames.at(-1)?.t;const fps=(data.frames.length-1)/((end-start)/1000);
   const b=Object.fromEntries(before.metrics.map(x=>[x.name,x.value])),a=Object.fromEntries(after.metrics.map(x=>[x.name,x.value]));
   const metric={device,trial,anchors,durationMs:end-start,frames:data.frames.length,fps,p95FrameMs:pct(sorted,.95),maxFrameMs:Math.max(...sorted),over33ms:sorted.filter(x=>x>33.4).length,over50ms:sorted.filter(x=>x>50).length,longTaskCount:data.longTasks.length,longTaskMaxMs:Math.max(0,...data.longTasks.map(x=>x.duration)),longTaskTotalMs:data.longTasks.reduce((s,x)=>s+x.duration,0),finalY:data.finalY,scriptMs:(a.ScriptDuration-b.ScriptDuration)*1000,layoutMs:(a.LayoutDuration-b.LayoutDuration)*1000,recalcMs:(a.RecalcStyleDuration-b.RecalcStyleDuration)*1000,taskMs:(a.TaskDuration-b.TaskDuration)*1000,eventListeners:a.JSEventListeners,nodes:a.Nodes};results.push(metric);console.log(JSON.stringify(metric));
  }
  await context.close();
 }
 await fs.writeFile(path.join(outputDir,'performance-summary.json'),JSON.stringify({chrome:browser.version(),results},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
