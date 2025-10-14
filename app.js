(() => {
  const SCHEMA_VERSION = 7;

  const DEFAULT_CATEGORIES = [
    { id: 'korean', name: '?œì‹' }, { id: 'japanese', name: '?¼ì‹' }, { id: 'chinese', name: 'ì¤‘ì‹' },
    { id: 'western', name: '?‘ì‹' }, { id: 'noodle', name: 'ë©?ë¶„ì‹' }, { id: 'rice', name: 'ë°???°¥' },
    { id: 'salad', name: '?ëŸ¬?? }, { id: 'sandwich', name: '?Œë“œ?„ì¹˜' }, { id: 'fast', name: '?¨ìŠ¤?¸í‘¸?? },
    { id: 'vietnamese', name: 'ë² íŠ¸?? }, { id: 'thai', name: '?œêµ­' }, { id: 'indian', name: '?¸ë„/?¤íŒ”' },
    { id: 'mexican', name: 'ë©•ì‹œì¹? }, { id: 'brunch', name: 'ë¸ŒëŸ°ì¹? }, { id: 'med', name: 'ì§€ì¤‘í•´' },
    { id: 'seasia', name: '?™ë‚¨?? }, { id: 'dessert', name: '?”ì??? }, { id: 'etc', name: 'ê¸°í?' }
  ];

  // ?ë????ì‚¬ ?„ì£¼ ?°ì´??(?Œë£Œ ?œì™¸)
  const DEFAULT_ITEMS = [
    // êµ???ì°Œê°œ
    {name:'ê¹€ì¹˜ì°Œê°?,cat:'korean'},{name:'?œì¥ì°Œê°œ',cat:'korean'},{name:'?œë‘ë¶€ì°Œê°œ',cat:'korean'},{name:'ë¶€?€ì°Œê°œ',cat:'korean'},
    {name:'ê°ì??,cat:'korean'},{name:'?´ì¥êµ?,cat:'korean'},{name:'?¡ê°œ??,cat:'korean'},{name:'?¼ê³„??,cat:'korean'},
    {name:'?¤ë ??,cat:'korean'},{name:'ê°ˆë¹„??,cat:'korean'},{name:'ê³°íƒ•',cat:'korean'},{name:'ì¶”ì–´??,cat:'korean'},
    // ë³¶ìŒ/ì°?êµ¬ì´
    {name:'ë¶ˆê³ ê¸?,cat:'korean'},{name:'?œìœ¡ë³¶ìŒ',cat:'korean'},{name:'?¼ì?ë¶ˆë°±',cat:'korean'},{name:'ê³ ì¶”?¥ë¶ˆê³ ê¸°',cat:'korean'},
    {name:'?¤ì‚¼ë¶ˆê³ ê¸?,cat:'korean'},{name:'??°ˆë¹?,cat:'korean'},{name:'?™ì?ë³¶ìŒ',cat:'korean'},{name:'?¤ì§•?´ë³¶??,cat:'korean'},
    {name:'??³¶?Œíƒ•',cat:'korean'},{name:'ì°œë‹­',cat:'korean'},{name:'ê°ˆë¹„ì°?,cat:'korean'},{name:'?„ê?ì°?,cat:'korean'},
    {name:'ì½”ë‹¤ë¦¬ì°œ',cat:'korean'},{name:'ê¹€ì¹˜ì°œ',cat:'korean'},{name:'?´ë¬¼ì°?,cat:'korean'},
    {name:'?¼ê²¹??,cat:'korean'},{name:'ëª©ì‚´êµ¬ì´',cat:'korean'},{name:'ê°ˆë¹„êµ¬ì´',cat:'korean'},{name:'?¤ë¦¬ë¶ˆê³ ê¸?,cat:'korean'},
    // ì¹˜í‚¨/?¨ìŠ¤??
    {name:'?‘ë…ì¹˜í‚¨',cat:'fast'},{name:'ê°„ì¥ì¹˜í‚¨',cat:'fast'},{name:'?„ë¼?´ë“œì¹˜í‚¨',cat:'fast'},{name:'ë°˜ë°˜ì¹˜í‚¨',cat:'fast'},
    {name:'?µë‹­',cat:'fast'},{name:'ì¹˜í‚¨?¤í…Œ?´í¬',cat:'western'},
    // ë¹„ë¹”/??°¥/ë³¶ìŒë°?
    {name:'ë¹„ë¹”ë°?,cat:'korean'},{name:'?Œì†¥ë¹„ë¹”ë°?,cat:'korean'},{name:'?œìœ¡??°¥',cat:'rice'},{name:'ë¶ˆê³ ê¸°ë®ë°?,cat:'rice'},
    {name:'?¤íŒ¸ë§ˆìš”??°¥',cat:'rice'},{name:'ì°¸ì¹˜ë§ˆìš”??°¥',cat:'rice'},{name:'ê°„ì¥ê³„ë?ë°?,cat:'rice'},{name:'ê¹€ì¹˜ë³¶?Œë°¥',cat:'rice'},
    {name:'?¡ì±„ë°?,cat:'chinese'},{name:'?ˆìš°ë³¶ìŒë°?,cat:'chinese'},{name:'?¤ë??¼ì´??,cat:'japanese'},{name:'ì¹´ë ˆ?¼ì´??,cat:'rice'},
    {name:'?ˆê¹Œ?¤ë®ë°?,cat:'japanese'},{name:'ê·œë™',cat:'rice'},{name:'ê°€ì¸ ë™',cat:'japanese'},{name:'?¬ì???,cat:'japanese'},{name:'?ë™',cat:'japanese'},
    // ë©?ë¶„ì‹
    {name:'ì§œì¥ë©?,cat:'chinese'},{name:'ì§¬ë½•',cat:'chinese'},{name:'?•ìˆ˜??,cat:'chinese'},{name:'ê¹í’ê¸?,cat:'chinese'},
    {name:'ê³ ì¶”?¡ì±„',cat:'chinese'},{name:'ë§ˆíŒŒ?ë?',cat:'chinese'},{name:'ë§ˆë¼??,cat:'chinese'},{name:'ë§ˆë¼?¹ê¶ˆ',cat:'chinese'},
    {name:'? ì‚°??,cat:'chinese'},{name:'ê¿”ë°”ë¡œìš°',cat:'chinese'},{name:'ê¹ì‡¼?ˆìš°',cat:'chinese'},
    {name:'ì´ˆë°¥',cat:'japanese'},{name:'?¬ì‹œë¯???',cat:'japanese'},{name:'?ˆì¹´ì¸?,cat:'japanese'},{name:'?¼ë©˜',cat:'japanese'},
    {name:'?°ë™',cat:'japanese'},{name:'?‰ìš°??,cat:'japanese'},{name:'?¼ë¼?Œë°”',cat:'japanese'},{name:'?¤ë??¼ì´???¼ì‹)',cat:'japanese'},
    {name:'ê·œì¹´ì¸?,cat:'japanese'},{name:'?¤í‚¤?¼í‚¤',cat:'japanese'},{name:'?¼ë¼?ˆì¿ ',cat:'japanese'},
    // ?¼ì/?ŒìŠ¤?€/ë¦¬ì¡°??
    {name:'?¼ì(?˜í¼ë¡œë‹ˆ)',cat:'fast'},{name:'?¼ì(ë§ˆë¥´ê²Œë¦¬?€)',cat:'fast'},{name:'ë¶ˆê³ ê¸°í”¼??,cat:'fast'},
    {name:'?ŒìŠ¤?€(ê¹Œë¥´ë³´ë‚˜??',cat:'western'},{name:'?ŒìŠ¤?€(?Œë¦¬?¤ì˜¬ë¦¬ì˜¤)',cat:'western'},{name:'?ŒìŠ¤?€(? ë§ˆ??',cat:'western'},
    {name:'?ŒìŠ¤?€(ë¡œì œ)',cat:'western'},{name:'?ŒìŠ¤?€(ë´‰ê³¨??',cat:'western'},{name:'ë¦¬ì¡°???¬ë¦¼)',cat:'western'},
    {name:'ë¦¬ì¡°??ë²„ì„¯)',cat:'western'},{name:'ë¦¬ì¡°??? ë§ˆ??',cat:'western'},{name:'?¨ë°•?¤í…Œ?´í¬',cat:'western'},{name:'?¤í…Œ?´í¬',cat:'western'},
    {name:'ê°ë°”??,cat:'western'},{name:'?ëŸ¬?œíŒŒ?¤í?',cat:'western'},
    // ?„ì‹œ??
    {name:'?€êµ?ˆ˜',cat:'vietnamese'},{name:'ë¶„ì§œ',cat:'vietnamese'},{name:'ë°˜ë?',cat:'vietnamese'},{name:'?Ÿí???,cat:'thai'},
    {name:'?˜ì‹œê³ ë ',cat:'seasia'},{name:'?½ì‚¬',cat:'seasia'},{name:'ì¹´ì˜¤??,cat:'thai'},{name:'ì¹´ì˜¤ë§Œê¹Œ??,cat:'thai'},{name:'? ì–Œê¿?,cat:'thai'},
    {name:'?¬í…Œ',cat:'seasia'},{name:'ë°”ì¿ ??,cat:'seasia'},{name:'?±ê??¬ë¥´ì¹˜í‚¨?¼ì´??,cat:'seasia'},{name:'?¤ë¸Œ?¤ë¸Œ',cat:'japanese'},
    // ?Œë“œ/ë²„ê±°/ê°„í¸
    {name:'ê¹€ë°?,cat:'sandwich'},{name:'ì°¸ì¹˜ê¹€ë°?,cat:'sandwich'},{name:'?ˆê¹Œ?¤ê?ë°?,cat:'sandwich'},{name:'ì»µë°¥',cat:'rice'},
    {name:'? ìŠ¤??,cat:'sandwich'},{name:'?Œë“œ?„ì¹˜',cat:'sandwich'},{name:'?Œë‹ˆ??,cat:'sandwich'},{name:'ë² ì´ê¸€ ?Œë“œ?„ì¹˜',cat:'sandwich'},
    {name:'?«ë„ê·?,cat:'sandwich'},{name:'?„ë²„ê±?ë¶ˆê³ ê¸°ë²„ê±?',cat:'fast'},{name:'?„ë²„ê±?ì¹˜í‚¨ë²„ê±°)',cat:'fast'},{name:'?„ë²„ê±??ˆìš°ë²„ê±°)',cat:'fast'},
    {name:'?„ë²„ê±°ì„¸??,cat:'fast'},{name:'ì¹˜í‚¨ë²„ê±°?¸íŠ¸',cat:'fast'},{name:'?¼ì?¸íŠ¸',cat:'fast'},{name:'ì¹˜í‚¨?¸íŠ¸',cat:'fast'},
    // ?„ì‹œ???¸íŠ¸
    {name:'?„ì‹œ??,cat:'etc'},{name:'?œì‹?„ì‹œ??,cat:'etc'},{name:'ë¶„ì‹?¸íŠ¸',cat:'etc'},{name:'?ˆê¹Œ?¤ì •??,cat:'japanese'},{name:'ì´ˆë°¥?¸íŠ¸',cat:'japanese'},
  ];

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
    weatherInfo: document.getElementById('weatherInfo'),
    nearbyInfo: document.getElementById('nearbyInfo'),
    activeCatLabel: document.getElementById('activeCatLabel'),
    activeCatBar: document.getElementById('activeCatBar'),
    activeTagLabel: document.getElementById('activeTagLabel'),
    activeTagBar: document.getElementById('activeTagBar'),
    resultBlurb: document.getElementById('resultBlurb'),
    flavorText: document.getElementById('flavorText'),
  };

  const storage = {
    get(k,f){ try{ return JSON.parse(localStorage.getItem(k)) ?? f; }catch{ return f; } },
    set(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
  };

  const state = {
    categories: storage.get('lm_categories', DEFAULT_CATEGORIES),
    items: storage.get('lm_items', DEFAULT_ITEMS),
    selectedCats: new Set(storage.get('lm_selectedCats', DEFAULT_CATEGORIES.map(c=>c.id))),
    lastPick: null,
    weather: { ready:false, summary:null, code:null, temp:null },
    location: storage.get('lm_location', null),
    nearby: storage.get('lm_nearby_presence', { ready:false, presentCats: [], radius: 1200, ts: 0 }),
    activeCats: new Set(),
    activeTags: [],
  };

  function saveState(){
    storage.set('lm_categories', state.categories);
    storage.set('lm_items', state.items);
    storage.set('lm_selectedCats', Array.from(state.selectedCats));
    storage.set('lm_location', state.location);
    storage.set('lm_nearby_presence', state.nearby);
  }

  function ensureDefaultsMerged(){
    const byId=new Map(state.categories.map(c=>[c.id,c]));
    DEFAULT_CATEGORIES.forEach(c=>{ if(!byId.has(c.id)) byId.set(c.id,c); });
    state.categories=Array.from(byId.values());
    const nameSet=new Set(state.items.map(i=>i.name));
    const toAdd=DEFAULT_ITEMS.filter(i=>!nameSet.has(i.name));
    if(toAdd.length) state.items=state.items.concat(toAdd);
  }

  function migrate(){
    const ver = storage.get('lm_schema_version',0);
    if(ver < SCHEMA_VERSION){ ensureDefaultsMerged(); storage.set('lm_schema_version',SCHEMA_VERSION); saveState(); }
  }

  // Helpers
  function basePool(){
    let pool = state.items.filter(it=>it.cat!=='dessert');
    // respect previous selection only if not empty
    const allSel = state.selectedCats.size===state.categories.length;
    if(state.selectedCats.size>0 && !allSel){ pool = pool.filter(it=>state.selectedCats.has(it.cat)); }
    return pool;
  }

  function renderActiveCats(){
    if(!els.activeCatBar) return;
    const ids = Array.from(state.activeCats);
    els.activeCatBar.innerHTML = '';
    if(ids.length === 0){
      els.activeCatBar.hidden = true;
      if(els.activeCatLabel) els.activeCatLabel.hidden = true;
      return;
    }
    const label = new Map(state.categories.map(c=>[c.id,c.name]));
    ids.forEach(id=>{
      const b=document.createElement('button');
      b.type='button'; b.className='chip'; b.textContent=label.get(id)||id;
      b.setAttribute('aria-selected','true');
      b.addEventListener('click', ()=>{ state.activeCats.delete(id); renderActiveCats(); });
      els.activeCatBar.appendChild(b);
    });
    els.activeCatBar.hidden = false;
    if(els.activeCatLabel) els.activeCatLabel.hidden = false;
  }

  function renderActiveTags(){
    if(!els.activeTagBar) return;
    const arr = state.activeTags || [];
    els.activeTagBar.innerHTML = '';
    if(arr.length === 0){
      els.activeTagBar.hidden = true;
      if(els.activeTagLabel) els.activeTagLabel.hidden = true;
      return;
    }
    const labelMap = { quick:'ê°„í¸', light:'ê°€ë²¼ì?', heavy:'? ë“ ', spicy:'ë§¤ìš´', soup:'êµ?¬¼', cold:'?œì›?? };
    arr.forEach(id => {
      const b = document.createElement('button');
      b.type='button'; b.className='chip'; b.textContent = labelMap[id] || id;
      b.setAttribute('aria-selected','true');
      b.addEventListener('click', ()=>{
        const i = state.activeTags.indexOf(id);
        if(i>=0) state.activeTags.splice(i,1);
        renderActiveTags();
      });
      els.activeTagBar.appendChild(b);
    });
    els.activeTagBar.hidden = false;
    if(els.activeTagLabel) els.activeTagLabel.hidden = false;
  }

  function normalizeTags(raw){
    if(!raw) return [];
    const push=(arr)=>{
      const seen=new Set();
      arr.forEach(v=>{ const t=String(v).trim().toLowerCase(); if(t) seen.add(t); });
      return Array.from(seen);
    };
    if(Array.isArray(raw)){
      return push(raw);
    }
    if(typeof raw === 'string'){
      return push(raw.split(/[,\s]+/));
    }
    return [];
  }

  // No share text field; share uses Web Share API directly.

  function matches(it, cond){
    if(!cond || !cond.length) return true;
    const wanted = cond.map(t=>String(t).trim().toLowerCase()).filter(Boolean);
    if(!wanted.length) return true;
    const explicit = normalizeTags(it.tags || (it.meta && it.meta.tags));
    if(explicit.length){
      return wanted.every(tag => explicit.includes(tag));
    }
    const n=it.name, c=it.cat;
    const tests={
      quick: ()=> c==='sandwich'||c==='fast'||/ê¹€ë°??Œë“œ?„ì¹˜|? ìŠ¤??ë°˜ë?|ë²„ê±°|ì»µë°¥|?¤ë‹ˆê¸°ë¦¬/.test(n),
      light: ()=> c==='salad'||c==='vietnamese'||/?ëŸ¬???¬ì?|?˜í”„/.test(n),
      heavy: ()=> ['rice','korean','chinese','western','fast'].includes(c)||/?¤í…Œ?´í¬|ì¹˜í‚¨|?¼ì|?•ìˆ˜??ì°œë‹­/.test(n),
      spicy: ()=> /ë§¤ìš´|ë§ˆë¼|ì§¬ë½•|ë¶ˆë‹­|?™ì?|ê¹€ì¹?ë¶€?€|?¡ë³¶??.test(n),
      soup:  ()=> /ì°Œê°œ|êµ????¼ë©˜|?°ë™|ì§¬ë½•|ì¹¼êµ­???˜ì œë¹??˜í”„/.test(n),
      cold:  ()=> /?‰ë©´|?‰ìš°???Œë°”|?ëŸ¬??.test(n) || c==='salad',
    };
    return wanted.every(k => tests[k]?tests[k]():true);
  }

  function pick(list){ return list[Math.floor(Math.random()*list.length)]; }

  // Flavor text generator (per-dish with variety)
  function flavorBlurbHTML(name){
    const n = (name||'').trim();
    // Per-dish lines (add as needed)
    const L = {
      'ê¹€ì¹˜ì°Œê°?:[ 'ë³´ê?ë³´ê? ë§¤ì½¤ êµ¬ìˆ˜?¨ì´ ì½”ë??ê°„ì§ˆ?¬ìš”.', 'ë°????Ÿê°ˆ??êµ?¬¼ ì´µâ€??¤ëŠ˜ ì»¨ë””???¬ë¼ê°‘ë‹ˆ??' ],
      '?œì¥ì°Œê°œ':[ 'êµ¬ìˆ˜???œì¥?¥ì´ ê¹Šì–´??', '?ë?Â·ì±„ì†Œê°€ ?¬ê°, ?´ë°±?¨ì´ ?…ì•ˆ ê°€??' ],
      '?œë‘ë¶€ì°Œê°œ':[ 'ë¶€?¤ë????œë‘ë¶€??ì¹¼ì¹¼??êµ?¬¼???¤ë©°?¤ì–´??', '???Ÿê°ˆ??ëª¸ì´ ?¬ë¥´ë¥??€ë¦½ë‹ˆ??' ],
      'ë¶€?€ì°Œê°œ':[ 'ì§„ë“?????ë??€ ?¼í°?¨ì˜ ì¡°í•©.', '?¼ë©´?¬ë¦¬ ?£ê³  ?„ë£¨ë£©â€??‰ë³µ ?˜ì¹˜ ê¸‰ìƒ??' ],
      '?¼ë©˜':[ 'ì§„í•œ ?¤í”„ë¡?ë©´ë°œ???ì‹œê³? ì°¨ìŠˆ ???ìœ¼ë¡?ë§ˆë¬´ë¦?', '?„ë£¨ë£©â€?ê¹Šì? ê°ì¹ ë§›ì´ ?¨ì•„??' ],
      '?°ë™':[ '?±ê???ë©´ë°œê³?ê¹”ë”??êµ?¬¼???•ì„.', '?´ë¬µ ???”ì†”, ë§ˆìŒê¹Œì? ?°ëœ»?´ì ¸??' ],
      '?‰ë©´':[ 'ì°¨ê????¡ìˆ˜??ì²?Ÿ‰ê°ì´ ?•â€?, 'ê²¨ì ?? ?ì´ˆ ?¬ë¥´ë¥? ?œì›?¨ì´ ë§´ëŒ?„ìš”.' ],
      'ì§œì¥ë©?:[ '?¬í° ì§œì¥ê³?ë©´ë°œ??ì°??¬ë¼ë¶™ì–´??', '?¨ë¬´ì§€ ???? ë¹„ë¹„???œê°„ ë¯¸ì†Œê°€ ë²ˆì§‘?ˆë‹¤.' ],
      'ì§¬ë½•':[ 'ë¶ˆí–¥ ?´ë¦° ?¼í° êµ?¬¼???´ë¬¼??ê°€??', '??ëª¨ê¸ˆ???œìº¬~?ê? ?ˆë¡œ ?˜ì???' ],
      'ì´ˆë°¥':[ 'ë°¥ì•Œ ?±ê?, ?ì„ ???€?€???¨ë§›.', '?€?¬ë¹„ ?¡â€?ê°„ì¥ ì´‰â€??°ëœ»?˜ê²Œ ê¹”ë”.' ],
      '?¬ì‹œë¯???':[ 'ì°¨ê°‘ê³??±ê????ê°???ì¾Œ?´ìš”.', 'ë°”ë‹¤???¨ë§›???¤ë¥´ë¥µâ€?ë¯¸ë„?¬ì§‘?ˆë‹¤.' ],
      '?ˆì¹´ì¸?:[ 'ê²‰ë°”?ì´‰??êµê³¼??', '?ŒìŠ¤ ì´‰â€??íˆ¼??ê³ ê¸°?ì„œ ?¡ì¦™????' ],
      'ê·œë™':[ '?¬í°ì§?§¤ ?Œê³ ê¸°ì? ?‘íŒŒ??ì¡°í™”.', '?¨ëˆ??ë°¥ê³¼ ?±â€??Ÿê??½ì´ ë°”ë¹ ?¸ìš”.' ],
      'ê°€ì¸ ë™':[ 'ë¶€?œëŸ¬??ì¹´ì¸ +?¬ê???ì´‰ì´‰??', '?‘íŒŒ ?¥ì´ ?¤ë©°???¬ê·¼??????' ],
      '?¬ì???:[ '?°ì–´??ê³ ì†Œ?¨ì´ ë¶€?œëŸ½ê²??¼ì ¸??', '? ìÂ·?€?¬ë¹„ ?´ì§???°ëœ» ?´ë°±.' ],
      '?ë™':[ 'ë°”ì‚­???€ê¹€ê³??¨ì§  ?ŒìŠ¤??ë¬˜ë?.', 'ë°¥ê³¼ ?¨ê»˜ ?€?™â€?ë§Œì¡±ê°ì´ ê½?ì°¨ìš”.' ],
      '?¼ì(?˜í¼ë¡œë‹ˆ)':[ 'ì¹˜ì¦ˆê°€ ì­ˆìš±??ì§?§¤???˜í¼ë¡œë‹ˆ??ì¡´ì¬ê°?', '??ì¡°ê°???‰ë³µ???…ì•ˆ ê°€??' ],
      '?ŒìŠ¤?€(ê¹Œë¥´ë³´ë‚˜??':[ '?¬ë¦¬ë¯¸í•œ ?ŒìŠ¤ê°€ ë©´ì„ ê°ì‹¸??', 'ë² ì´ì»¨ì˜ ì§?§¤?¨ê³¼ ?„ì¶” ?¥ì˜ ë§ˆì¹¨??' ],
      '?ŒìŠ¤?€(?Œë¦¬?¤ì˜¬ë¦¬ì˜¤)':[ '?¬ë¦¬ë¸Œì˜¤?¼ì˜ ?´ë°±?? ë§ˆëŠ˜ ?¥ì´ ?”ì†”.', '?¬í”Œ?˜ì?ë§?ê³„ì† ?ê°?˜ëŠ” ë§?' ],
      'ì¹´ë ˆ?¼ì´??:[ '?¥ì‹ ë£Œì˜ ?¬ê·¼?¨ê³¼ ë¶€?œëŸ¬???ŒìŠ¤.', 'ë°¥ì´ ? ìˆ ???°ëœ»???„ë¡œê°€ ?©ë‹ˆ??' ],
      'ë¶ˆê³ ê¸?:[ '?¬ì§ì§€ê·¼í•œ ë¶ˆí–¥???€?€?´ìš”.', 'ì°¸ê¸°ë¦?ê³ ì†Œ?¨ì— ?…ê¼¬ë¦¬ê? ?¬ë¼ê°‘ë‹ˆ??' ],
      '?œìœ¡ë³¶ìŒ':[ 'ë§¤ì½¤?¬ì½¤ ë°¥ë„?‘ì˜ ?•ì„.', '?ì¶”???¸ì„œ ì´µâ€?ê¸°ë¶„ê¹Œì? ì¢‹ì•„?¸ìš”.' ],
      '?€êµ?ˆ˜':[ 'ì§„í•œ ?¡ìˆ˜???ˆë¸Œ???°ëœ»?¨ì´ ?”í•´?¸ìš”.', 'ë©´ë°œ ?„ë£¨ë£©â€?ê°œìš´?˜ê²Œ ë§ˆë¬´ë¦?' ],
      'ë¶„ì§œ':[ '??¶ˆê³ ê¸°?€ ?í¼ ?ŒìŠ¤??ì¡°í™”.', '?ˆë¸Œ?€ ?¨ê»˜ ë°”ì‚­???í¼??ì½¤ë³´.' ],
      'ë°˜ë?':[ 'ë°”ì‚­??ë°”ê²Œ?¸ì— ì´‰ì´‰???ì¬ë£?', 'ê³ ìˆ˜ ???â€??¥ê¸‹?¨ì´ ?´ì•„?©ë‹ˆ??' ],
    };
    const fallback = (reA, reB)=>{
      const a = reA || '?œì…???¼ì????ë?!';
      const b = reB || '?¤ëŠ˜??? ë“ ?˜ê²Œ ê¸°ë¶„ ??';
      return [a,b];
    };
    // If exact mapping exists, pick 2 lines randomly
    if (L[n]){
      const arr = L[n];
      const pick2 = arr.length >= 2 ? arr.slice().sort(()=>Math.random()-0.5).slice(0,2) : arr;
      return `<span class="blurb-title">ë§??œí˜„</span>${pick2.map(x=>`<p>${x}</p>`).join('')}`;
    }
    // Pattern-based fallback with variety
    const is=(re)=>re.test(n);
    let lines = [];
    if(is(/?¼ë©˜|?°ë™|ì§¬ë½•|ì¹¼êµ­???˜ì œë¹?êµ?ˆ˜|êµ?°¥|??ì°Œê°œ/)) lines = [ '?¨ëˆ??êµ?¬¼???„ë£¨ë£©â€?ëª¸ì´ ?¬ë¥´ë¥?', 'ê¹€ ?œë¦¬??ê·¸ë¦‡?ì„œ ?¬ê·¼?¨ì´ ?¬ë¼?€??' ];
    else if(is(/?‰ë©´|?‰ìš°???Œë°”|ë¬¼ëƒ‰|?‰ëª¨ë°€/)) lines = [ 'ì°¨ê????¡ìˆ˜??ì²?Ÿ‰ê°? ?œì›?˜ê²Œ ???“ê???', 'ê²¨ì ?? ?ì´ˆ ?¬ë¥´ë¥´â€?ë¨¸ë¦¬ê¹Œì? ë§‘ì•„?¸ìš”.' ];
    else if(is(/ë§ˆë¼|ë¶ˆë‹­|ë§¤ìš´|?™ì?|ì­ˆê¾¸ë¯?ê¹€ì¹?ì¹ ë¦¬/)) lines = [ '?¼ì–¼??ë§¤ìš´ë§›ì´ ?¤íŠ¸?ˆìŠ¤ë¥??¹â€?, 'ë¶ˆë§›ê³??¨ê»˜ ?Œì›Œ ì¶©ì „ ?„ë£Œ!' ];
    else if(is(/?ˆê¹Œ??ì¹´ì¸ |ê°€ì¸??€ê¹€|ì¹˜í‚¨|?‘ë…ì¹˜í‚¨|?„ë¼?´ë“œ|ê¹í’ê¸?ê¹ì‡¼/)) lines = [ 'ê²‰ë°”?ì´‰! ë°”ì‚­ ?Œë¦¬??ê³ ì†Œ?¨ì´ ?¡íŒ¡.', '?¨ì§  ?ŒìŠ¤ê¹Œì? ?”í•´??ë§Œì¡±??MAX.' ];
    else if(is(/?¼ì|ë¦¬ì¡°???¤í…Œ?´í¬|?¨ë°•|ê°ë°”???ŒìŠ¤?€/)) lines = [ 'ë²„í„°?¥ê³¼ ì¹˜ì¦ˆ??ì§„í•œ ?ë?ê°€ ?…ì•ˆ??ê°ì‹¸??', '?ŒìŠ¤ê°€ ì´‰â€?ë©?ë°¥ê³¼ ì°°ë–¡ê¶í•©.' ];
    else if(is(/ì´ˆë°¥|?¬ì‹œë¯??Œë®ë°?ë¬¼íšŒ/)) lines = [ 'ë°”ë‹¤???°ëœ»???¨ë§›???¤ë¥´ë¥?', '?±ê????ê°???…ì•ˆ??ì²?Ÿ‰?˜ê²Œ.' ];
    else if(is(/ì¹´ë ˆ|ì¹´ë ˆ?¼ì´???˜ì´?¼ì´??)) lines = [ '?¥ì‹ ë£Œì˜ ?°ëœ»?¨ì´ ?¬ê·¼?´ìš”.', 'ë¶€?œëŸ¬???ŒìŠ¤??ë°¥ì´ ? ìˆ .' ];
    else if(is(/??°¥|ê·œë™|ê°€ì¸ ë™|?¬ì????ë™|ì»µë°¥/)) lines = [ '?°ëˆ??ë°??„ì— ?ì„±??? í•‘!', 'ë¹„ë¹„???œê°„ ?‰ë³µ?„ê? ?¬ë¼ê°‘ë‹ˆ??' ];
    else if(is(/ê¹€ë°??Œë“œ?„ì¹˜|? ìŠ¤??ë²„ê±°|ë°˜ë?|?«ë„ê·?)) lines = [ '???…ì— ?™â€?ê°„í¸?˜ì?ë§?? ë“ .', '?ì•ˆ?ì„œ ?ê»´ì§€???¬ë§Œê°ì´ ì¢‹ì•„??' ];
    else if(is(/?ëŸ¬???ëŸ¬?œíŒŒ?¤í?|ë¶„ì§œ|?€êµ?ˆ˜/)) lines = [ '?„ì‚­?„ì‚­ ?°ëœ»??ë°¸ëŸ°??', '?í¼ ?´ë°±??ê°€ë³ê²Œ ?ë„ˆì§€ ì¶©ì „.' ];
    else lines = fallback();
    return `<span class="blurb-title">ë§??œí˜„</span>${lines.map(x=>`<p>${x}</p>`).join('')}`;
  }

  // Render condition sheet chips
  const COND_TAGS = [
    { id:'quick', label:'ê°„í¸' },
    { id:'light', label:'ê°€ë²¼ì?' },
    { id:'heavy', label:'? ë“ ' },
    { id:'spicy', label:'ë§¤ìš´' },
    { id:'soup',  label:'êµ?¬¼' },
    { id:'cold',  label:'?œì›?? },
  ];
  const tempCond = { tags: [], cats: new Set() };
  function renderCondSheet(){
    // categories (multi)
    if(els.condCatChips){
      els.condCatChips.innerHTML = '';
      state.categories.filter(c=>c.id!=='dessert').forEach(cat => {
        const b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=cat.name;
        const sel = tempCond.cats.has(cat.id);
        b.setAttribute('aria-selected', String(sel));
        b.addEventListener('click', ()=>{ if(tempCond.cats.has(cat.id)) tempCond.cats.delete(cat.id); else tempCond.cats.add(cat.id); renderCondSheet(); });
        els.condCatChips.appendChild(b);
      });
    }
    // tags (multi)
    if(els.condTagChips){
      els.condTagChips.innerHTML='';
      COND_TAGS.forEach(opt=>{
        const b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=opt.label;
        const sel = tempCond.tags.includes(opt.id);
        b.setAttribute('aria-selected', String(sel));
        b.addEventListener('click', ()=>{ const i=tempCond.tags.indexOf(opt.id); if(i>=0) tempCond.tags.splice(i,1); else tempCond.tags.push(opt.id); renderCondSheet(); });
        els.condTagChips.appendChild(b);
      });
    }
  }

  function showEmptyResult(message){
    state.lastPick = null;
    saveState();
    if(els.resultSection){ els.resultSection.classList.remove('is-spinning'); }
    if(els.result){ els.result.textContent = message; }
    if(els.resultBlurb) els.resultBlurb.textContent = '';
    if(els.flavorText) els.flavorText.innerHTML = '';
  }

  function spinOnce(cond){
    // apply category filter if chosen or active
    let items = basePool();
    const useCats = (cond && cond.cats && cond.cats.size>0) ? cond.cats : (state.activeCats.size>0 ? state.activeCats : null);
    if(useCats){ items = items.filter(it=>useCats.has(it.cat)); }
    if(useCats && !items.length){
      showEmptyResult('? íƒ??ì¹´í…Œê³ ë¦¬???±ë¡??ë©”ë‰´ê°€ ?†ì–´?? ?¤ë¥¸ ì¹´í…Œê³ ë¦¬ë¥?ê³¨ë¼ë³´ì„¸??');
      return;
    }
    const useTags = (cond && cond.tags && cond.tags.length>0) ? cond.tags : (state.activeTags || []);
    let pool = items.filter(it=>matches(it, useTags));
    if(useTags && useTags.length && !pool.length){
      showEmptyResult('ì¡°ê±´??ë§ëŠ” ë©”ë‰´ê°€ ?†ì–´?? ì¡°ê±´??ì¡°ì •?´ë³´?¸ìš”!');
      return;
    }
    if(!pool.length){
      pool = items.length ? items : basePool();
    }
    // simple flip + fast roll feel
    if(els.resultSection){ els.resultSection.classList.add('is-spinning'); }
    els.result?.classList.remove('flip-start'); void els.result?.offsetWidth; els.result?.classList.add('flip-start');
    if(els.resultBlurb) els.resultBlurb.textContent = '';
    if(els.flavorText) els.flavorText.innerHTML = '';
    const tempTimer = setInterval(()=>{ const t = pick(pool); if(t) els.result.textContent = t.name; }, 70);
    setTimeout(()=>{
      clearInterval(tempTimer);
      const final = pick(pool);
      state.lastPick=final.name; saveState(); els.result.textContent = final.name;
      if(els.flavorText) els.flavorText.innerHTML = '';
      else if(els.resultBlurb) els.resultBlurb.textContent = '';
      if(els.resultSection){ els.resultSection.classList.remove('is-spinning'); }
    }, 900);
  }

  // Seasonal
  function renderSeasonal(){
    if(!els.seasonalList) return;
    const M = {1:['êµ?,'ê³¼ë©”ê¸?,'?€êµ?,'ë¯¸ë‚˜ë¦?,'?œê¸ˆì¹?,'ê°ê·¤'],2:['ê´‘ì–´','?°ëŸ­','êµ?,'?¬ë˜','?‰ì´','ê¼¬ë§‰'],3:['ì£¼ê¾¸ë¯?,'?„ë‹¤ë¦?,'??,'?¬ë˜','?¸ê¸°'],4:['ì£¼ê¾¸ë¯?,'ë©ê²Œ','ì°¸ë‚˜ë¬?,'ë¹„ë¹”êµ?ˆ˜','ë´„ë™'],5:['ì­ˆê¾¸ë¯?,'?„ì–´(ë´?','ë§¤ì‹¤','ì£¼í‚¤??,'?¤ì´'],6:['ì°¸ì¹˜','ë³‘ì–´','?¥ìˆ˜??,'? ë§ˆ??,'ë¸”ë£¨ë² ë¦¬'],7:['ë¯¼ì–´','?¥ì–´','?˜ë°•','ì°¸ì™¸','? ë§ˆ??,'?¥ìˆ˜??],8:['?„ë³µ','ê°ˆì¹˜','ë³µìˆ­??,'?¬ë„','ê°€ì§€'],9:['?„ì–´(ê°€??','ê½ƒê²Œ','ë°?,'?¬ê³¼','ë¬´í™”ê³?,'ê³ êµ¬ë§?],10:['?€??,'?„ì–´','?™ì?','ë°?,'ê³¶ê°','ë°°ì¶”'],11:['ë°©ì–´','êµ?,'ë¬?,'ë°°ì¶”','ê·?,'?¨ê°'],12:['ë°©ì–´','ê¼¬ë§‰','êµ?,'?€êµ?,'?œê¸ˆì¹?,'ê°ê·¤']};
    const now=new Date(), m=now.getMonth()+1, list=M[m]||[]; els.seasonalList.innerHTML='';
    list.forEach(n=>{ const d=document.createElement('div'); d.className='chip'; d.textContent=n; els.seasonalList.appendChild(d); });
    if(els.seasonalTitle) els.seasonalTitle.textContent = `${m}???œì² ?Œì‹`;
  }

  // Nearby + Weather (for display only)
  function setNearbyInfo(){ if(!els.nearbyInfo) return; if(state.nearby&&state.nearby.ready&&state.nearby.presentCats.length){ const label=new Map(state.categories.map(c=>[c.id,c.name])); const labs=state.nearby.presentCats.map(id=>label.get(id)||id).slice(0,6); els.nearbyInfo.textContent=`ê·¼ì²˜ ê°ì?: ${labs.join(' Â· ')}`; } else els.nearbyInfo.textContent=''; }
  function mapWeather(code,temp){ let cond='?????†ìŒ', emoji='?Œ¤ï¸?; const c=Number(code); if(c===0){cond='ë§‘ìŒ';emoji='?€ï¸?;} else if([1,2,3].includes(c)){cond='êµ¬ë¦„ ì¡°ê¸ˆ';emoji='??;} else if([45,48].includes(c)){cond='?ˆê°œ';emoji='?Œ«ï¸?;} else if([51,53,55,56,57].includes(c)){cond='?´ìŠ¬ë¹?;emoji='?Œ¦ï¸?;} else if([61,63,65,66,67,80,81,82].includes(c)){cond='ë¹?;emoji='?Œ§ï¸?;} else if([71,73,75,77,85,86].includes(c)){cond='??;emoji='?„ï¸';} else if([95,96,97].includes(c)){cond='?Œìš°';emoji='?ˆï¸';} const t=(temp!=null&&Number.isFinite(temp))?`${Math.round(temp)}Â°C`:''; return { text: t?`${cond} Â· ${t}`:cond, emoji } }
  function catCuisineMap(){ return { korean:['korean','korea'], japanese:['japanese','sushi','ramen','udon','soba'], chinese:['chinese'], western:['italian','french','steak_house','european','american'], noodle:['noodle','ramen','udon','soba'], salad:['salad','healthy'], sandwich:['sandwich','bagel','deli'], fast:['burger','pizza','fried_chicken'], vietnamese:['vietnamese','pho','banh_mi'], thai:['thai'], indian:['indian','nepalese'], mexican:['mexican','tacos','burrito'], brunch:['breakfast','brunch','cafe'], med:['mediterranean','turkish','greek','middle_eastern','kebab','shawarma'], seasia:['indonesian','malaysian','singaporean'], dessert:['ice_cream','cake','waffle','dessert','bakery'], etc:[] } }
  async function initNearbyPresence(lat,lng,radius=1200){ try{ const base="[out:json][timeout:12];"+"(node[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"way[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"relation[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+"););"+"out tags center;"; const urls=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']; let ok=false,data=null; for(const u of urls){ try{ const r=await fetch(u+'?data='+encodeURIComponent(base)); if(r.ok){ data=await r.json(); ok=true; break;} }catch{} } if(!ok) throw 0; const cuisines=new Set(); if(Array.isArray(data.elements)){ for(const el of data.elements){ const t=el.tags||{}; const c=(t.cuisine||'').toLowerCase(); if(!c) continue; c.split(';').map(s=>s.trim()).filter(Boolean).forEach(v=>cuisines.add(v)); } } const map=catCuisineMap(); const presentCats=Object.keys(map).filter(cat=>map[cat].some(tag=>cuisines.has(tag))); state.nearby={ready:true,presentCats,radius,ts:Date.now(),lat,lng}; saveState(); setNearbyInfo(); }catch{ state.nearby={ready:false,presentCats:[],radius,ts:Date.now(),lat,lng}; saveState(); setNearbyInfo(); } }
  async function initWeather(){ try{ if(!navigator.geolocation) return; const pos=await new Promise((res,rej)=>{ navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:8000}); }); const {latitude:lat,longitude:lng}=pos.coords; state.location={lat,lng,ts:Date.now()}; saveState(); initNearbyPresence(lat,lng).catch(()=>{}); const url=new URL('https://api.open-meteo.com/v1/forecast'); url.searchParams.set('latitude',lat); url.searchParams.set('longitude',lng); url.searchParams.set('current_weather','true'); url.searchParams.set('timezone','auto'); const r=await fetch(url.toString()); if(!r.ok) throw 0; const data=await r.json(); let code=null,temp=null; if(data.current_weather){ code=data.current_weather.weathercode; temp=data.current_weather.temperature; } const info=mapWeather(code,temp); state.weather={ready:true,summary:info.text,code,temp}; if(els.weatherInfo) els.weatherInfo.textContent=`?„ì¬ ? ì”¨: ${info.emoji} ${info.text}`; }catch{ if(els.weatherInfo) els.weatherInfo.textContent=''; } }

  

  // Events
  if(els.spinQuickBtn) els.spinQuickBtn.addEventListener('click', ()=> spinOnce({tags:[],cats:new Set()}));
  function openSheet(){ if(els.conditionSheet){ tempCond.tags=[...(state.activeTags||[])]; tempCond.cats=new Set(state.activeCats); renderCondSheet(); els.conditionSheet.hidden=false; } }
  function closeSheet(){ if(els.conditionSheet){ els.conditionSheet.hidden=true; } }
  if(els.spinWithCondBtn) els.spinWithCondBtn.addEventListener('click', openSheet);
  if(els.closeSheetBtn) els.closeSheetBtn.addEventListener('click', closeSheet);
  if(els.applyCondBtn) els.applyCondBtn.addEventListener('click', ()=>{ state.activeCats = new Set(tempCond.cats); state.activeTags = [...tempCond.tags]; renderActiveCats(); renderActiveTags(); closeSheet(); spinOnce({ tags:[...tempCond.tags], cats:new Set(tempCond.cats) }); });
  if(els.selectAllCatsBtn) els.selectAllCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(state.categories.filter(c=>c.id!=='dessert').map(c=>c.id)); renderCondSheet(); });
  if(els.clearCatsBtn) els.clearCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(); renderCondSheet(); });
      }catch{}
      if(navigator.share){
        try{ await navigator.share({ title: '?ì‹¬ ì¶”ì²œ', text, url }); }
        catch{}
      } else {
        alert('??ë¸Œë¼?°ì??ì„œ??ê³µìœ  ê¸°ëŠ¥??ì§€?ë˜ì§€ ?Šì•„?? ëª¨ë°”??ë¸Œë¼?°ì??ì„œ ?¬ìš©?´ë³´?¸ìš”.');
      }
    });
  }
      }catch{
        alert('ì¹´ì¹´?¤í†¡ ê³µìœ  ì¤?ë¬¸ì œê°€ ë°œìƒ?ˆì–´?? ë§í¬ ë³µì‚¬ë¡?ê³µìœ ??ì£¼ì„¸??');
      }
    });
  }
      }catch{
        alert('ë³µì‚¬???¤íŒ¨?ˆì–´?? ?˜ë™?¼ë¡œ ë³µì‚¬??ì£¼ì„¸??');
      }
    });
  }

  // Init
  migrate();
  // ??ƒ ì´ˆê¸°?”ëœ ?íƒœë¡??œì‘
  state.selectedCats = new Set(state.categories.map(c=>c.id)); saveState();
  renderSeasonal();
  renderActiveCats();
  renderActiveTags();
  setNearbyInfo();
  initWeather();
})();
