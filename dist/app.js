import {icon,parts,disassembly,assembly} from './content.js';
import {createLab} from './scene.js';
const $=s=>document.querySelector(s);
function paintIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));}paintIcons();
let mode='disassemble',step=0,playing=false,timer=null,exploded=false,showLabels=false,selected=null,lab=null,images={};
const seq=()=>mode==='disassemble'?disassembly:assembly;
const allParts=disassembly.filter(x=>x.part).map(x=>x.part);
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),2600);}
function removed(){if(mode==='disassemble')return disassembly.slice(0,step).map(x=>x.part).filter(Boolean);const placed=assembly.slice(0,step).map(x=>x.part);return allParts.filter(p=>!placed.includes(p));}
function update(){
 const steps=seq(),done=step===steps.length,s=steps[Math.min(step,steps.length-1)];
 $('#disassemble').classList.toggle('active',mode==='disassemble');$('#assemble').classList.toggle('active',mode==='assemble');$('#disassemble').setAttribute('aria-selected',mode==='disassemble');$('#assemble').setAttribute('aria-selected',mode==='assemble');
 $('#lesson-title').textContent=mode==='disassemble'?'One part at a time':'Build it, part by part';$('#lesson-subtitle').textContent=mode==='disassemble'?'Explore a complete PC by removing each part.':'Connect every component to complete your own PC.';
 $('#progress-number').textContent=step;$('#progress-fill').style.width=`${step*10}%`;
 $('#step-list').innerHTML=steps.map((s,i)=>`<li><button data-step="${i}" class="${i===step?'current':i<step?'step-done':''}" ${i===step?'aria-current="step"':''}><span class="step-num">${i<step?icon('check'):String(i+1).padStart(2,'0')}</span><span class="step-title">${s.name}</span><span class="step-arrow">${icon('arrow-right')}</span></button></li>`).join('');
 $('#instruction-icon').innerHTML=icon(done?'check':s.icon||parts[s.part].icon);
 $('#instruction-eyebrow').innerHTML=done?'WELL DONE <span>Lab complete</span>':`STEP ${String(step+1).padStart(2,'0')} <span>${s.tag}</span>`;
 $('#instruction-title').textContent=done?(mode==='disassemble'?'Disassembly complete. You have explored the inside.':'Assembly complete. Your PC is ready.'):s.name;
 $('#instruction-body').textContent=done?(mode==='disassemble'?'You have explored nine components and their roles. Switch to assembly mode to discover how they connect.':'From the CPU to the case, you have seen how the parts work together. Explore the component cards below for a closer look.'):s.body;
 $('#instruction-tip').innerHTML=icon(done?'sparkles':'info')+`<span>${done?'Use exploded view and component labels to review the structure at any time.':s.tip}</span>`;
 $('#instruction-counter').innerHTML=`${String(Math.min(step+1,10)).padStart(2,'0')}<small>/ 10</small>`;
 $('#next').innerHTML=(done?(mode==='disassemble'?'Try assembling it':'Take it apart again'):s.action)+icon('arrow-right');$('#previous').disabled=step===0;
 $('#autoplay').innerHTML=icon(playing?'pause':'play')+(playing?'Pause':'Autoplay');$('#autoplay').setAttribute('aria-pressed',playing);
 $('#scene-status').textContent=exploded?'Exploded view':done?(mode==='disassemble'?'Disassembly complete':'Assembly complete'):step===0?(mode==='disassemble'?'Fully assembled':'Disassembled'):`${mode==='disassemble'?'Disassembling':'Assembling'} · ${step}/10`;
 if(lab){lab.updateParts(removed(),exploded);lab.select(done?null:s.part);document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view==='perspective'));}
 $('#scene').dataset.mode=mode;$('#scene').dataset.step=String(step);$('#scene').dataset.exploded=String(exploded);
}
function stop(){playing=false;clearTimeout(timer);timer=null;$('#autoplay').innerHTML=icon('play')+'Autoplay';$('#autoplay').setAttribute('aria-pressed','false');}
function schedule(){clearTimeout(timer);if(playing)timer=setTimeout(()=>{if(step<10){step++;if(step===10)stop();update();schedule();}},5500/Number($('#speed').value));}
function changeMode(nextMode){stop();mode=nextMode;step=0;exploded=false;$('#explode-button').setAttribute('aria-pressed','false');$('#explode-button').innerHTML=icon('layers')+'Exploded view';update();}
function next(){stop();if(step===10){changeMode(mode==='disassemble'?'assemble':'disassemble');return;}step++;update();}
function previous(){stop();if(step>0){step--;update();}}
$('#disassemble').addEventListener('click',()=>{if(mode!=='disassemble')changeMode('disassemble');});$('#assemble').addEventListener('click',()=>{if(mode!=='assemble')changeMode('assemble');});
$('#step-list').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(!b)return;stop();step=Number(b.dataset.step);update();});
$('#next').addEventListener('click',next);$('#previous').addEventListener('click',previous);$('#restart').addEventListener('click',()=>{changeMode(mode);toast('Returned to the first step.');});
function togglePlay(){if(playing){stop();return;}if(step===10)step=0;playing=true;update();schedule();}
$('#autoplay').addEventListener('click',togglePlay);$('#speed').addEventListener('change',schedule);
$('#explode-button').addEventListener('click',()=>{exploded=!exploded;$('#explode-button').setAttribute('aria-pressed',exploded);$('#explode-button').innerHTML=icon('layers')+(exploded?'Step view':'Exploded view');if(exploded&&!showLabels){showLabels=true;$('#labels-button').setAttribute('aria-pressed','true');lab?.labels(true);}update();});
$('#labels-button').addEventListener('click',()=>{showLabels=!showLabels;$('#labels-button').setAttribute('aria-pressed',showLabels);lab?.labels(showLabels);});
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x===b));lab?.view(b.dataset.view);}));
$('#reset-camera').addEventListener('click',()=>{lab?.resetCamera();document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view==='perspective'));toast('Camera reset.');});
$('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if($('#viewport').requestFullscreen)await $('#viewport').requestFullscreen();else toast('Full screen is not supported in this browser.');}catch{toast('Could not switch to full screen.');}});
function showPart(id){if(!parts[id])return;stop();selected=id;const p=parts[id];$('#component-detail').innerHTML=`<div class="detail-art">${images[id]?`<img src="${images[id]}" alt="${p.name} 3D model">`:icon(p.icon)}</div><div class="eyebrow">${p.english}</div><h2>${p.name}</h2><p>${p.description}</p><div class="detail-facts"><div><span>Main role</span>${p.role}</div><div><span>Connection</span>${p.connection}</div></div><div class="detail-tip"><strong>Handling tip</strong>${p.tip}</div>`;$('#component-dialog').showModal();}
$('#component-show').addEventListener('click',()=>{$('#component-dialog').close();const idx=seq().findIndex(s=>s.part===selected);if(idx>=0)step=idx;exploded=true;showLabels=true;$('#explode-button').setAttribute('aria-pressed','true');$('#explode-button').innerHTML=icon('layers')+'Step view';$('#labels-button').setAttribute('aria-pressed','true');lab?.labels(true);update();lab?.select(selected);$('#simulator').scrollIntoView({behavior:'smooth'});});
$('#help-button').addEventListener('click',()=>{stop();$('#help-dialog').showModal();});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
document.addEventListener('keydown',e=>{if($('#pc-lab').hidden||document.querySelector('dialog[open]')||['INPUT','SELECT','TEXTAREA','BUTTON','A'].includes(document.activeElement.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='ArrowRight'){e.preventDefault();next();}if(e.key==='ArrowLeft'){e.preventDefault();previous();}if(e.code==='Space'){e.preventDefault();togglePlay();}});
document.addEventListener('coursechange',()=>stop());
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
const cardParts=['cpu','gpu','ram','motherboard','ssd','psu'];
function renderCards(){$('#component-grid').innerHTML=cardParts.map((id,i)=>{const p=parts[id];return `<button class="component-card" data-part="${id}" aria-label="${p.name} — learn more"><div class="component-art"><span class="component-index">0${i+1}</span>${images[id]?`<img src="${images[id]}" alt="" loading="lazy">`:icon(p.icon)}</div><h3>${p.name}</h3><p>${p.short}</p><span class="card-arrow">${icon('arrow-up-right')}</span><div class="component-english">${p.english}</div></button>`;}).join('');}
$('#component-grid').addEventListener('click',e=>{const b=e.target.closest('[data-part]');if(b)showPart(b.dataset.part);});
renderCards();update();
try{lab=createLab({container:$('#scene'),onPartClick:showPart,onReady:()=>{$('#loading').hidden=true;$('#loading').style.display='none';$('#scene').dataset.ready='true';},onError:()=>{$('#loading').innerHTML=icon('info')+'<p>Cannot open the 3D view.<br>Try a current browser with WebGL support.</p>';$('#scene').dataset.ready='false';}});if(lab){images=lab.thumbnails(Object.keys(parts));renderCards();update();}}
catch(e){console.error('PC LAB 3D initialization failed',e);$('#loading').style.display='flex';$('#loading').innerHTML='<p>Could not load the 3D model. Please refresh the page.</p>';$('#scene').dataset.ready='false';}
