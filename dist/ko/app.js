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
 $('#lesson-title').textContent=mode==='disassemble'?'하나씩, 안쪽으로':'하나씩, 완성으로';$('#lesson-subtitle').textContent=mode==='disassemble'?'완성된 PC에서 부품을 하나씩 꺼내보세요.':'각 부품을 연결해 나만의 PC를 완성하세요.';
 $('#progress-number').textContent=step;$('#progress-fill').style.width=`${step*10}%`;
 $('#step-list').innerHTML=steps.map((s,i)=>`<li><button data-step="${i}" class="${i===step?'current':i<step?'step-done':''}" ${i===step?'aria-current="step"':''}><span class="step-num">${i<step?icon('check'):String(i+1).padStart(2,'0')}</span><span class="step-title">${s.name}</span><span class="step-arrow">${icon('arrow-right')}</span></button></li>`).join('');
 $('#instruction-icon').innerHTML=icon(done?'check':s.icon||parts[s.part].icon);
 $('#instruction-eyebrow').innerHTML=done?'WELL DONE <span>학습 완료</span>':`STEP ${String(step+1).padStart(2,'0')} <span>${s.tag}</span>`;
 $('#instruction-title').textContent=done?(mode==='disassemble'?'분해 완료! 컴퓨터 속을 모두 살펴봤어요.':'조립 완료! 하나의 컴퓨터가 되었어요.'):s.name;
 $('#instruction-body').textContent=done?(mode==='disassemble'?'아홉 가지 구성 요소가 각각 어떤 일을 하는지 확인했어요. 이제 조립 모드에서 부품들이 어떻게 연결되는지 직접 완성해 보세요.':'CPU부터 케이스까지, 부품들이 함께 일하는 구조를 이해했어요. 아래 부품 카드에서 궁금한 부품의 역할을 더 자세히 살펴보세요.'):s.body;
 $('#instruction-tip').innerHTML=icon(done?'sparkles':'info')+`<span>${done?'전체 구조 보기와 부품 이름 표시로 언제든 다시 복습할 수 있어요.':s.tip}</span>`;
 $('#instruction-counter').innerHTML=`${String(Math.min(step+1,10)).padStart(2,'0')}<small>/ 10</small>`;
 $('#next').innerHTML=(done?(mode==='disassemble'?'이제 조립해 보기':'다시 분해해 보기'):s.action)+icon('arrow-right');$('#previous').disabled=step===0;
 $('#autoplay').innerHTML=icon(playing?'pause':'play')+(playing?'일시 정지':'자동 재생');$('#autoplay').setAttribute('aria-pressed',playing);
 $('#scene-status').textContent=exploded?'전체 구조':done?(mode==='disassemble'?'분해 완료':'조립 완료'):step===0?(mode==='disassemble'?'조립된 상태':'분해된 상태'):`${mode==='disassemble'?'분해':'조립'} 중 · ${step}/10`;
 if(lab){lab.updateParts(removed(),exploded);lab.select(done?null:s.part);document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view==='perspective'));}
 $('#scene').dataset.mode=mode;$('#scene').dataset.step=String(step);$('#scene').dataset.exploded=String(exploded);
}
function stop(){playing=false;clearTimeout(timer);timer=null;$('#autoplay').innerHTML=icon('play')+'자동 재생';$('#autoplay').setAttribute('aria-pressed','false');}
function schedule(){clearTimeout(timer);if(playing)timer=setTimeout(()=>{if(step<10){step++;if(step===10)stop();update();schedule();}},5500/Number($('#speed').value));}
function changeMode(nextMode){stop();mode=nextMode;step=0;exploded=false;$('#explode-button').setAttribute('aria-pressed','false');$('#explode-button').innerHTML=icon('layers')+'전체 구조 보기';update();}
function next(){stop();if(step===10){changeMode(mode==='disassemble'?'assemble':'disassemble');return;}step++;update();}
function previous(){stop();if(step>0){step--;update();}}
$('#disassemble').addEventListener('click',()=>{if(mode!=='disassemble')changeMode('disassemble');});$('#assemble').addEventListener('click',()=>{if(mode!=='assemble')changeMode('assemble');});
$('#step-list').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(!b)return;stop();step=Number(b.dataset.step);update();});
$('#next').addEventListener('click',next);$('#previous').addEventListener('click',previous);$('#restart').addEventListener('click',()=>{changeMode(mode);toast('첫 단계로 돌아왔어요.');});
function togglePlay(){if(playing){stop();return;}if(step===10)step=0;playing=true;update();schedule();}
$('#autoplay').addEventListener('click',togglePlay);$('#speed').addEventListener('change',schedule);
$('#explode-button').addEventListener('click',()=>{exploded=!exploded;$('#explode-button').setAttribute('aria-pressed',exploded);$('#explode-button').innerHTML=icon('layers')+(exploded?'단계별 모습으로':'전체 구조 보기');if(exploded&&!showLabels){showLabels=true;$('#labels-button').setAttribute('aria-pressed','true');lab?.labels(true);}update();});
$('#labels-button').addEventListener('click',()=>{showLabels=!showLabels;$('#labels-button').setAttribute('aria-pressed',showLabels);lab?.labels(showLabels);});
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x===b));lab?.view(b.dataset.view);}));
$('#reset-camera').addEventListener('click',()=>{lab?.resetCamera();document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view==='perspective'));toast('기본 시점으로 돌아왔어요.');});
$('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if($('#viewport').requestFullscreen)await $('#viewport').requestFullscreen();else toast('이 브라우저에서는 전체 화면을 지원하지 않아요.');}catch{toast('전체 화면으로 전환할 수 없어요.');}});
function showPart(id){if(!parts[id])return;stop();selected=id;const p=parts[id];$('#component-detail').innerHTML=`<div class="detail-art">${images[id]?`<img src="${images[id]}" alt="${p.name} 3D 모델">`:icon(p.icon)}</div><div class="eyebrow">${p.english}</div><h2>${p.name}</h2><p>${p.description}</p><div class="detail-facts"><div><span>주요 역할</span>${p.role}</div><div><span>연결 위치</span>${p.connection}</div></div><div class="detail-tip"><strong>직접 다룰 때는</strong>${p.tip}</div>`;$('#component-dialog').showModal();}
$('#component-show').addEventListener('click',()=>{$('#component-dialog').close();const idx=seq().findIndex(s=>s.part===selected);if(idx>=0)step=idx;exploded=true;showLabels=true;$('#explode-button').setAttribute('aria-pressed','true');$('#explode-button').innerHTML=icon('layers')+'단계별 모습으로';$('#labels-button').setAttribute('aria-pressed','true');lab?.labels(true);update();lab?.select(selected);$('#simulator').scrollIntoView({behavior:'smooth'});});
$('#help-button').addEventListener('click',()=>{stop();$('#help-dialog').showModal();});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
document.addEventListener('keydown',e=>{if($('#pc-lab').hidden||document.querySelector('dialog[open]')||['INPUT','SELECT','TEXTAREA','BUTTON','A'].includes(document.activeElement.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='ArrowRight'){e.preventDefault();next();}if(e.key==='ArrowLeft'){e.preventDefault();previous();}if(e.code==='Space'){e.preventDefault();togglePlay();}});
document.addEventListener('coursechange',()=>stop());
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
const cardParts=['cpu','gpu','ram','motherboard','ssd','psu'];
function renderCards(){$('#component-grid').innerHTML=cardParts.map((id,i)=>{const p=parts[id];return `<button class="component-card" data-part="${id}" aria-label="${p.name} 자세히 알아보기"><div class="component-art"><span class="component-index">0${i+1}</span>${images[id]?`<img src="${images[id]}" alt="" loading="lazy">`:icon(p.icon)}</div><h3>${p.name}</h3><p>${p.short}</p><span class="card-arrow">${icon('arrow-up-right')}</span><div class="component-english">${p.english}</div></button>`;}).join('');}
$('#component-grid').addEventListener('click',e=>{const b=e.target.closest('[data-part]');if(b)showPart(b.dataset.part);});
renderCards();update();
try{lab=createLab({container:$('#scene'),onPartClick:showPart,onReady:()=>{$('#loading').hidden=true;$('#loading').style.display='none';$('#scene').dataset.ready='true';},onError:()=>{$('#loading').innerHTML=icon('info')+'<p>3D 화면을 열 수 없어요.<br>WebGL을 지원하는 최신 브라우저에서 다시 열어주세요.</p>';$('#scene').dataset.ready='false';}});if(lab){images=lab.thumbnails(Object.keys(parts));renderCards();update();}}
catch(e){console.error('PC LAB 3D initialization failed',e);$('#loading').style.display='flex';$('#loading').innerHTML='<p>3D 모델을 불러오지 못했어요. 새로고침해 주세요.</p>';$('#scene').dataset.ready='false';}
