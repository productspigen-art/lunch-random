<script>
(() => {
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
    items: [],            // { name, catLabel, tags[] }
    categories: [],       // { id, name }
    activeCats: new Set(),
    activeTags: [],
    allTags: []
  };

  // 1) 메뉴 데이터 연결
  async function loadMenus(){
    const res = await fetch('menu_dataset_full_5tags_with_category.json?v=2025-01-15-1', { cache:'no-store' });
    const data = await res.json();
    state.items = (Array.isArray(data)?data:[]).map(x=>({
      name: String(x.name||'').trim(),
      catLabel: String(x.category||'').trim(),
      tags: Array.isArray(x.tags)? x.tags.map(t=>String(t).trim()) : []
    }));
    rebuildCategories();
    buildAllTags();
    state.activeCats = new Set(state.categories.map(c=>c.id));
    renderActiveCats();
    renderActiveTags();
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
          if(sel) tempCond.cats.delete(cat.id); else tempCond.cats.add(cat.id);
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

  // 3) 룰렛 (카테고리=합집합, 태그=교집합)
  function spinOnce(cond){
    let pool = (state.items||[]).slice();

    const useCats = (cond && cond.cats && cond.cats.size>0)
      ? cond.cats
      : (state.activeCats.size>0 ? state.activeCats : null);

    if(useCats){ pool = pool.filter(it=>useCats.has(it.catLabel)); }

    const useTags = (cond && cond.tags && cond.tags.length>0)
      ? cond.tags
      : (state.activeTags||[]);

    if(useTags && useTags.length){
      pool = pool.filter(it=> useTags.every(t => (it.tags||[]).includes(t)));
    }

    if(!pool.length){
      if(els.result) els.result.textContent='조건에 맞는 메뉴가 없어요';
      return;
    }

    // 결과 애니메이션
    els.result?.classList.remove('flip-start');
    void els.result?.offsetWidth;
    els.result?.classList.add('flip-start');

    const tmp=setInterval(()=>{
      const t=pool[Math.floor(Math.random()*pool.length)];
      if(els.result) els.result.textContent=t.name;
    },70);

    setTimeout(()=>{
      clearInterval(tmp);
      const final=pool[Math.floor(Math.random()*pool.length)];
      if(els.result) els.result.textContent=final.name;
    },900);
  }

  // 4) 제철음식 렌더
  async function renderSeasonal(){
    try{
      if(!els.seasonalList) return;
      const r=await fetch('seasonal_kr.json',{cache:'no-store'});
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
      if(els.seasonalTitle) els.seasonalTitle.textContent=m+'월 제철음식';
    }catch{}
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

  els.spinQuickBtn?.addEventListener('click', ()=> spinOnce({
    tags:[...(state.activeTags||[])],
    cats:new Set(state.activeCats||[])
  }));
  els.spinWithCondBtn?.addEventListener('click', openSheet);
  els.applyCondBtn?.addEventListener('click', ()=>{
    state.activeCats=new Set(tempCond.cats);
    state.activeTags=[...tempCond.tags];
    renderActiveCats();
    renderActiveTags();
    closeSheet();
    spinOnce({ tags:[...tempCond.tags], cats:new Set(tempCond.cats) });
  });
  els.closeSheetBtn?.addEventListener('click', closeSheet);
  els.selectAllCatsBtn?.addEventListener('click', ()=>{
    tempCond.cats=new Set((state.categories||[]).map(c=>c.id));
    renderCondSheet();
  });
  els.clearCatsBtn?.addEventListener('click', ()=>{
    tempCond.cats=new Set();
    renderCondSheet();
  });

  // 6) 공유 버튼 (IIFE 내부로 이동 + 안전 처리)
  els.shareBtn?.addEventListener('click', async ()=>{
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
      els.shareBtn.textContent='복사됨!';
      setTimeout(()=> els.shareBtn.textContent=prev, 1200);
    }catch{}
  });

  // 7) 초기화 (단 한 번만)
  (async function init(){
    await loadMenus();
    await renderSeasonal();
  })();
})();
</script>
