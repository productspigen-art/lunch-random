// app.js
(function start(){
  const run = () => {
    const els = {
      spinQuickBtn: document.getElementById('spinQuickBtn'),
      spinWithCondBtn: document.getElementById('spinWithCondBtn'),
      result: document.getElementById('result'),
      resultSection: document.getElementById('resultSection'),
      conditionSheet: document.getElementById('conditionSheet'),
      condCatChips: document.getElementById('condCatChips'),
      condTagChips: document.getElementById('condTagChips'),
      closeSheetBtn: document.getElementById('closeSheetBtn'),
      applyCondBtn: document.getElementById('applyCondBtn'),
      selectAllCatsBtn: document.getElementById('selectAllCatsBtn'),
      clearCatsBtn: document.getElementById('clearCatsBtn'),
      seasonalList: document.getElementById('seasonalList'),
      seasonalTitle: document.getElementById('seasonal-title'),
      activeCatLabel: document.getElementById('activeCatLabel'),
      activeCatBar: document.getElementById('activeCatBar'),
      activeTagLabel: document.getElementById('activeTagLabel'),
      activeTagBar: document.getElementById('activeTagBar'),
      shareBtn: document.getElementById('shareBtn'),
    };

    const state = {
      items: [],
      categories: [],
      activeCats: new Set(),
      activeTags: [],
      allTags: [],
      hadNoResults: false
    };

    // 1) 메뉴 데이터 로드
    async function loadMenus(){
      try{
        const res = await fetch('./menu_dataset_full_5tags_with_category.json?v=2025-01-15-1', { cache:'no-store' });
        if(!res.ok) throw new Error('menus ' + res.status);
        const data = await res.json();
        state.items = (Array.isArray(data)?data:[]).map(x=>({
          name: String(x.name||'').trim(),
          catLabel: String(x.category||'').trim(),
          tags: Array.isArray(x.tags)? x.tags.map(t=>String(t).trim()) : []
        })) || [];
        rebuildCategories();
        buildAllTags();
        state.activeCats = new Set();
        renderActiveCats();
        renderActiveTags();
      }catch(e){
        console.error('메뉴 JSON 로드 실패:', e);
        if (els.result) els.result.textContent = '메뉴 데이터를 불러오지 못했어요';
      }
    }

    // 결과 애니메이션 + 룰렛
    function spin(cond){
      if(!els.result) return;
      let pool = (state.items||[]).slice();
      const useCats = (cond && cond.cats && cond.cats.size>0) ? cond.cats : (state.activeCats.size>0 ? state.activeCats : null);
      if(useCats){ pool = pool.filter(it=>useCats.has(it.catLabel)); }
      const useTags = (cond && cond.tags && cond.tags.length>0) ? cond.tags : (state.activeTags||[]);
      if(useTags && useTags.length){ pool = pool.filter(it=> useTags.every(t => (it.tags||[]).includes(t))); }
      if(!pool.length){
        state.hadNoResults = true;
        els.result.textContent = '조건에 맞는 메뉴가 없어요';
        return;
      }
      state.hadNoResults = false;
      els.result.classList.remove('flip-start');
      void els.result.offsetWidth;
      els.result.classList.add('flip-start');
      const tmp=setInterval(()=>{ const t=pool[Math.floor(Math.random()*pool.length)]; els.result.textContent=t.name; },70);
      setTimeout(()=>{ clearInterval(tmp); const final=pool[Math.floor(Math.random()*pool.length)]; els.result.textContent=final.name; },900);
    }

    // 현재 필터 반영한 풀 계산
    function currentFilteredPool(){
      let pool = (state.items||[]).slice();
      const useCats = state.activeCats && state.activeCats.size>0 ? state.activeCats : null;
      if(useCats){ pool = pool.filter(it=>useCats.has(it.catLabel)); }
      const useTags = state.activeTags||[];
      if(useTags.length){ pool = pool.filter(it=> useTags.every(t => (it.tags||[]).includes(t))); }
      return pool;
    }

    function maybeSpinOnFilterChange(){
      if(!state.hadNoResults) return;
      const pool = currentFilteredPool();
      if(pool.length>0){
        spin({ tags:[...(state.activeTags||[])], cats:new Set(state.activeCats||[]) });
      }
    }

    // 2) 카테고리/태그 유틸
    function rebuildCategories(){
      const m = new Map();
      (state.items||[]).forEach(it=>{
        if(it.catLabel){ m.set(it.catLabel,{ id: it.catLabel, name: it.catLabel }); }
      });
      state.categories = Array.from(m.values()).sort((a,b)=> (a.name||'').localeCompare(b.name||''));
      const valid = new Set(state.categories.map(c=>c.id));
      state.activeCats = new Set([...(state.activeCats||[])].filter(id=>valid.has(id)));
    }

    function buildAllTags(){
      const s=new Set();
      (state.items||[]).forEach(it=> (it.tags||[]).forEach(t=>s.add(t)));
      state.allTags = Array.from(s.values()).sort();
    }

    function renderActiveCats(){
      if(!els.activeCatBar) return;
      els.activeCatBar.innerHTML='';
      const ids = Array.from(state.activeCats||[]);
      if(ids.length===0){ els.activeCatBar.hidden=true; if(els.activeCatLabel) els.activeCatLabel.hidden=true; return; }
      ids.forEach(id=>{
        const b=document.createElement('button');
        b.type='button'; b.className='chip'; b.textContent=id;
        b.setAttribute('aria-selected','true');
        b.addEventListener('click', ()=>{
          state.activeCats.delete(id);
          renderActiveCats();
          maybeSpinOnFilterChange();
        });
        els.activeCatBar.appendChild(b);
      });
      els.activeCatBar.hidden=false;
      if(els.activeCatLabel) els.activeCatLabel.hidden=false;
    }

    function renderActiveTags(){
      if(!els.activeTagBar) return;
      els.activeTagBar.innerHTML='';
      const arr = state.activeTags||[];
      if(arr.length===0){ els.activeTagBar.hidden=true; if(els.activeTagLabel) els.activeTagLabel.hidden=true; return; }
      arr.forEach(label=>{
        const b=document.createElement('button');
        b.type='button'; b.className='chip'; b.textContent=label;
        b.setAttribute('aria-selected','true');
        b.addEventListener('click', ()=>{
          const i=state.activeTags.indexOf(label);
          if(i>=0) state.activeTags.splice(i,1);
          renderActiveTags();
          maybeSpinOnFilterChange();
        });
        els.activeTagBar.appendChild(b);
      });
      els.activeTagBar.hidden=false;
      if(els.activeTagLabel) els.activeTagLabel.hidden=false;
    }

    // 조건 시트
    const tempCond={ tags:[], cats:new Set() };
    function renderCondSheet(){
      if(els.condCatChips){
        els.condCatChips.innerHTML='';
        state.categories.forEach(cat=>{
          const b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=cat.name;
          const sel=tempCond.cats.has(cat.id); b.setAttribute('aria-selected', String(sel));
          b.addEventListener('click', ()=>{
            if(tempCond.cats.has(cat.id)) tempCond.cats.delete(cat.id); else tempCond.cats.add(cat.id);
            renderCondSheet();
          });
          els.condCatChips.appendChild(b);
        });
      }
      if(els.condTagChips){
        els.condTagChips.innerHTML='';
        (state.allTags||[]).forEach(label=>{
          const b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=label;
          const sel=tempCond.tags.includes(label); b.setAttribute('aria-selected', String(sel));
          b.addEventListener('click', ()=>{
            const i=tempCond.tags.indexOf(label);
            if(i>=0) tempCond.tags.splice(i,1); else tempCond.tags.push(label);
            renderCondSheet();
          });
          els.condTagChips.appendChild(b);
        });
      }
    }

    // 4) 제철 음식
    async function renderSeasonal(){
      try{
        if(!els.seasonalList) return;
        const r=await fetch('./seasonal_kr.json',{cache:'no-store'});
        if(!r.ok) throw new Error('seasonal ' + r.status);
        const data=await r.json();
        const m=(new Date()).getMonth()+1;
        const list=(data&&data[String(m)])||[];
        els.seasonalList.innerHTML='';
        list.slice(0,6).forEach(n=>{
          const d=document.createElement('div');
          d.className='chip';
          d.textContent=n;
          els.seasonalList.appendChild(d);
        });
        if(els.seasonalTitle) els.seasonalTitle.textContent=`${m}월 제철 음식`;
      }catch(e){
        console.error('제철 JSON 로드 실패:', e);
      }
    }

    // 5) 이벤트 바인딩
    function openSheet(){
      if(els.conditionSheet){
        tempCond.tags=[...(state.activeTags||[])];
        tempCond.cats=new Set(state.activeCats||[]);
        renderCondSheet();
        els.conditionSheet.hidden=false;
      }
    }
    function closeSheet(){ if(els.conditionSheet) els.conditionSheet.hidden=true; }

    els.spinQuickBtn && els.spinQuickBtn.addEventListener('click', ()=> spin({
      tags:[...(state.activeTags||[])],
      cats:new Set(state.activeCats||[])
    }));
    els.spinWithCondBtn && els.spinWithCondBtn.addEventListener('click', openSheet);
    els.applyCondBtn && els.applyCondBtn.addEventListener('click', ()=>{
      state.activeCats=new Set(tempCond.cats);
      state.activeTags=[...tempCond.tags];
      renderActiveCats();
      renderActiveTags();
      closeSheet();
      spin({ tags:[...tempCond.tags], cats:new Set(tempCond.cats) });
    });
    els.closeSheetBtn && els.closeSheetBtn.addEventListener('click', closeSheet);
    els.selectAllCatsBtn && els.selectAllCatsBtn.addEventListener('click', ()=>{
      tempCond.cats=new Set((state.categories||[]).map(c=>c.id));
      renderCondSheet();
    });
    els.clearCatsBtn && els.clearCatsBtn.addEventListener('click', ()=>{
      tempCond.cats=new Set();
      renderCondSheet();
    });

    // 공유 버튼
    els.shareBtn && els.shareBtn.addEventListener('click', async ()=>{
      const name = (els.result && (els.result.textContent||'').trim()) || '';
      const url = (typeof location!=='undefined' && location.href) ? location.href : '';
      const payload = [ name ? `오늘 메뉴: ${name}` : '', url ].filter(Boolean).join('\n');
      try{
        if(navigator.clipboard?.writeText){
          await navigator.clipboard.writeText(payload);
        }else{
          const t=document.createElement('textarea');
          t.value=payload; document.body.appendChild(t);
          t.select(); document.execCommand('copy'); document.body.removeChild(t);
        }
        const prev = els.shareBtn.textContent;
        els.shareBtn.textContent='복사됨';
        setTimeout(()=> els.shareBtn.textContent=prev, 1200);
      }catch(e){
        console.error('클립보드 오류:', e);
      }
    });

    // 초기 작업: CTA 위치 조정, 데이터 로드
    (function moveCtas(){
      try{
        const cta = document.querySelector('.cta-row');
        const resultSection = document.getElementById('resultSection');
        if(cta && resultSection){
          resultSection.insertAdjacentElement('afterend', cta);
        }
      }catch{}
    })();

    async function initAdMob(){
      try{
        const cap = window.Capacitor || {};
        const plugins = (cap.Plugins||cap.plugins||{});
        const AdMob = plugins.AdMob;
        if(!AdMob) return; // Plugin not available (e.g., web)

        await AdMob.initialize({ requestTrackingAuthorization: false });
        // Show adaptive banner at bottom
        await AdMob.showBanner({
          adId: 'ca-app-pub-2173296428991687/8121877682',
          adSize: 'ADAPTIVE_BANNER',
          position: 'BOTTOM_CENTER'
        });
      }catch(e){
        console.warn('AdMob init failed:', e);
      }
    }

    (async function init(){
      await loadMenus();
      await renderSeasonal();
      await initAdMob();
    })();
  };

  // DOM 준비 상태에 따라 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
