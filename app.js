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

    async function loadMenus(){
      try{
        const res = await fetch('./menu_dataset_full_5tags_with_category.json?v=2025-01-15-3', { cache:'no-store' });
        if(!res.ok) throw new Error('menus ' + res.status);
        const data = await res.json();
        state.items = (Array.isArray(data)?data:[]).map(x=>({
          name: String(x.name||'').trim(),
          catLabel: String(x.category||'').trim(),
          tags: Array.isArray(x.tags)? x.tags.map(t=>String(t).trim()) : []
        })) || [];
        // Detect mojibake: many replacement chars '�' in names
        const badCount = (state.items||[]).filter(it=>/\uFFFD/.test(it.name||''))?.length || 0;
        const ratio = (state.items?.length||0) ? (badCount/state.items.length) : 0;
        if (ratio > 0.2) {
          // Fallback: small curated UTF-8-safe list (escaped)
          state.items = [
            { name: "\uBE44\uBE54\uBC25", catLabel: "\uD55C\uC2DD", tags:["\uC2DD\uC0AC"] },
            { name: "\uBD80\uB2F9", catLabel: "\uD55C\uC2DD", tags:["\uB3C4\uC6C0\uBE44"] },
            { name: "\uC591\uC2DD \uD3EC\uD1A0\uBCF6\uC74C", catLabel: "\uC591\uC2DD", tags:["\uAC04\uB2E8"] },
            { name: "\uAE40\uBC25", catLabel: "\uD55C\uC2DD", tags:["\uB3C4\uC6C0\uBE44"] },
            { name: "\uB3C4\uCFC4", catLabel: "\uC77C\uC2DD", tags:["\uAC04\uB2E8"] },
            { name: "\uB3C8\uCE74\uCFE0\uC57C \uC2A4\uD0C0\uC77C", catLabel: "\uC77C\uC2DD", tags:["\uC2DD\uC0AC"] },
            { name: "\uC2A4\uD398\uC774\uC2A4 \uC2A4\uD53C\uAC24\uB7EC", catLabel: "\uC591\uC2DD", tags:["\uD3B8\uC9D1"] },
            { name: "\uD380\uAD6C\uB098", catLabel: "\uD55C\uC2DD", tags:["\uC5B4\uB460"] },
            { name: "\uC0AC\uBC14", catLabel: "\uC911\uAD6D\uC2DD", tags:["\uB3C4\uC6C0\uBE44"] },
            { name: "\uD0C0\uCF54\uC57C\uD1A0\uB9AC", catLabel: "\uC77C\uC2DD", tags:["\uD3B8\uC9D1"] }
          ];
        }
        rebuildCategories();
        buildAllTags();
        state.activeCats = new Set();
        renderActiveCats();
        renderActiveTags();
      }catch(e){
        console.error('\uBA54\uB274 JSON \uB85C\uB4DC \uC2E4\uD328:', e);
        if (els.result) els.result.textContent = '\uBA54\uB274 \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694';
      }
    }

    function spin(cond){
      if(!els.result) return;
      let pool = (state.items||[]).slice();
      const useCats = (cond && cond.cats && cond.cats.size>0) ? cond.cats : (state.activeCats.size>0 ? state.activeCats : null);
      if(useCats){ pool = pool.filter(it=>useCats.has(it.catLabel)); }
      const useTags = (cond && cond.tags && cond.tags.length>0) ? cond.tags : (state.activeTags||[]);
      if(useTags && useTags.length){ pool = pool.filter(it=> useTags.every(t => (it.tags||[]).includes(t))); }
      if(!pool.length){
        state.hadNoResults = true;
        els.result.textContent = '\uC870\uAC74\uC5D0 \uB9DE\uB294 \uBA54\uB274\uAC00 \uC5C6\uC5B4\uC694';
        return;
      }
      state.hadNoResults = false;
      els.result.classList.remove('flip-start');
      void els.result.offsetWidth;
      els.result.classList.add('flip-start');
      const tmp=setInterval(()=>{ const t=pool[Math.floor(Math.random()*pool.length)]; els.result.textContent=t.name; },70);
      setTimeout(()=>{ clearInterval(tmp); const final=pool[Math.floor(Math.random()*pool.length)]; els.result.textContent=final.name; },900);
    }

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
      if(pool.length>0){ spin({ tags:[...(state.activeTags||[])], cats:new Set(state.activeCats||[]) }); }
    }

    function rebuildCategories(){
      const m = new Map();
      (state.items||[]).forEach(it=>{ if(it.catLabel){ m.set(it.catLabel,{ id: it.catLabel, name: it.catLabel }); } });
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
        b.addEventListener('click', ()=>{ state.activeCats.delete(id); renderActiveCats(); maybeSpinOnFilterChange(); });
        els.activeCatBar.appendChild(b);
      });
      els.activeCatBar.hidden=false; if(els.activeCatLabel) els.activeCatLabel.hidden=false;
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
        b.addEventListener('click', ()=>{ const i=state.activeTags.indexOf(label); if(i>=0) state.activeTags.splice(i,1); renderActiveTags(); maybeSpinOnFilterChange(); });
        els.activeTagBar.appendChild(b);
      });
      els.activeTagBar.hidden=false; if(els.activeTagLabel) els.activeTagLabel.hidden=false;
    }

    const tempCond={ tags:[], cats:new Set() };
    function renderCondSheet(){
      if(els.condCatChips){
        els.condCatChips.innerHTML='';
        state.categories.forEach(cat=>{
          const b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=cat.name;
          const sel=tempCond.cats.has(cat.id); b.setAttribute('aria-selected', String(sel));
          b.addEventListener('click', ()=>{ if(tempCond.cats.has(cat.id)) tempCond.cats.delete(cat.id); else tempCond.cats.add(cat.id); renderCondSheet(); });
          els.condCatChips.appendChild(b);
        });
      }
      if(els.condTagChips){
        els.condTagChips.innerHTML='';
        (state.allTags||[]).forEach(label=>{
          const b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=label;
          const sel=tempCond.tags.includes(label); b.setAttribute('aria-selected', String(sel));
          b.addEventListener('click', ()=>{ const i=tempCond.tags.indexOf(label); if(i>=0) tempCond.tags.splice(i,1); else tempCond.tags.push(label); renderCondSheet(); });
          els.condTagChips.appendChild(b);
        });
      }
    }

    async function renderSeasonal(){
      try{
        if(!els.seasonalList) return;
        const r=await fetch('./seasonal_kr.json',{cache:'no-store'});
        if(!r.ok) throw new Error('seasonal ' + r.status);
        const data=await r.json();
        const m=(new Date()).getMonth()+1;
        const list=(data&&data[String(m)])||[];
        els.seasonalList.innerHTML='';
        list.slice(0,6).forEach(n=>{ const d=document.createElement('div'); d.className='chip'; d.textContent=n; els.seasonalList.appendChild(d); });
        if(els.seasonalTitle) els.seasonalTitle.textContent=`${m}\uC6D4 \uC81C\uCCA0 \uC74C\uC2DD`;
      }catch(e){ console.error('seasonal JSON \uB85C\uB4DC \uC2E4\uD328:', e); }
    }

    function openSheet(){ if(els.conditionSheet){ tempCond.tags=[...(state.activeTags||[])]; tempCond.cats=new Set(state.activeCats||[]); renderCondSheet(); els.conditionSheet.hidden=false; } }
    function closeSheet(){ if(els.conditionSheet) els.conditionSheet.hidden=true; }

    els.spinQuickBtn && els.spinQuickBtn.addEventListener('click', ()=> spin({ tags:[...(state.activeTags||[])], cats:new Set(state.activeCats||[]) }));
    els.spinWithCondBtn && els.spinWithCondBtn.addEventListener('click', openSheet);
    els.applyCondBtn && els.applyCondBtn.addEventListener('click', ()=>{ state.activeCats=new Set(tempCond.cats); state.activeTags=[...tempCond.tags]; renderActiveCats(); renderActiveTags(); closeSheet(); spin({ tags:[...tempCond.tags], cats:new Set(tempCond.cats) }); });
    els.closeSheetBtn && els.closeSheetBtn.addEventListener('click', closeSheet);
    els.selectAllCatsBtn && els.selectAllCatsBtn.addEventListener('click', ()=>{ tempCond.cats=new Set((state.categories||[]).map(c=>c.id)); renderCondSheet(); });
    els.clearCatsBtn && els.clearCatsBtn.addEventListener('click', ()=>{ tempCond.cats=new Set(); renderCondSheet(); });

    els.shareBtn && els.shareBtn.addEventListener('click', async ()=>{
      const name = (els.result && (els.result.textContent||'').trim()) || '';
      const url = (typeof location!=='undefined' && location.href) ? location.href : '';
      const payload = [ name ? `\uC624\uB298 \uBA54\uB274: ${name}` : '', url ].filter(Boolean).join('\n');
      try{
        if(navigator.clipboard?.writeText){ await navigator.clipboard.writeText(payload); }
        else { const t=document.createElement('textarea'); t.value=payload; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); }
        const prev = els.shareBtn.textContent; els.shareBtn.textContent='\uBCF5\uC0AC\uB428'; setTimeout(()=> els.shareBtn.textContent=prev, 1200);
      }catch(e){ console.error('\uD074\uB9BD\uBCF4\uB4DC \uBCF5\uC0AC \uC2E4\uD328:', e); }
    });

    (async function init(){
      await loadMenus();
      await renderSeasonal();
      if ((state.items||[]).length) spin({ tags:[...(state.activeTags||[])], cats:new Set(state.activeCats||[]) });
    })();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();

