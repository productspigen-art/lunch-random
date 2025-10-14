(() => {
  const SCHEMA_VERSION = 7;

  const DEFAULT_CATEGORIES = [
    { id: 'korean', name: '?�식' }, { id: 'japanese', name: '?�식' }, { id: 'chinese', name: '중식' },
    { id: 'western', name: '?�식' }, { id: 'noodle', name: '�?분식' }, { id: 'rice', name: '�???��' },
    { id: 'salad', name: '?�러?? }, { id: 'sandwich', name: '?�드?�치' }, { id: 'fast', name: '?�스?�푸?? },
    { id: 'vietnamese', name: '베트?? }, { id: 'thai', name: '?�국' }, { id: 'indian', name: '?�도/?�팔' },
    { id: 'mexican', name: '멕시�? }, { id: 'brunch', name: '브런�? }, { id: 'med', name: '지중해' },
    { id: 'seasia', name: '?�남?? }, { id: 'dessert', name: '?��??? }, { id: 'etc', name: '기�?' }
  ];

  // ?��????�사 ?�주 ?�이??(?�료 ?�외)
  const DEFAULT_ITEMS = [
    // �???찌개
    {name:'김치찌�?,cat:'korean'},{name:'?�장찌개',cat:'korean'},{name:'?�두부찌개',cat:'korean'},{name:'부?�찌개',cat:'korean'},
    {name:'감자??,cat:'korean'},{name:'?�장�?,cat:'korean'},{name:'?�개??,cat:'korean'},{name:'?�계??,cat:'korean'},
    {name:'?�렁??,cat:'korean'},{name:'갈비??,cat:'korean'},{name:'곰탕',cat:'korean'},{name:'추어??,cat:'korean'},
    // 볶음/�?구이
    {name:'불고�?,cat:'korean'},{name:'?�육볶음',cat:'korean'},{name:'?��?불백',cat:'korean'},{name:'고추?�불고기',cat:'korean'},
    {name:'?�삼불고�?,cat:'korean'},{name:'??���?,cat:'korean'},{name:'?��?볶음',cat:'korean'},{name:'?�징?�볶??,cat:'korean'},
    {name:'??��?�탕',cat:'korean'},{name:'찜닭',cat:'korean'},{name:'갈비�?,cat:'korean'},{name:'?��?�?,cat:'korean'},
    {name:'코다리찜',cat:'korean'},{name:'김치찜',cat:'korean'},{name:'?�물�?,cat:'korean'},
    {name:'?�겹??,cat:'korean'},{name:'목살구이',cat:'korean'},{name:'갈비구이',cat:'korean'},{name:'?�리불고�?,cat:'korean'},
    // 치킨/?�스??    {name:'?�념치킨',cat:'fast'},{name:'간장치킨',cat:'fast'},{name:'?�라?�드치킨',cat:'fast'},{name:'반반치킨',cat:'fast'},
    {name:'?�닭',cat:'fast'},{name:'치킨?�테?�크',cat:'western'},
    // 비빔/??��/볶음�?    {name:'비빔�?,cat:'korean'},{name:'?�솥비빔�?,cat:'korean'},{name:'?�육??��',cat:'rice'},{name:'불고기덮�?,cat:'rice'},
    {name:'?�팸마요??��',cat:'rice'},{name:'참치마요??��',cat:'rice'},{name:'간장계�?�?,cat:'rice'},{name:'김치볶?�밥',cat:'rice'},
    {name:'?�채�?,cat:'chinese'},{name:'?�우볶음�?,cat:'chinese'},{name:'?��??�이??,cat:'japanese'},{name:'카레?�이??,cat:'rice'},
    {name:'?�까?�덮�?,cat:'japanese'},{name:'규동',cat:'rice'},{name:'가츠동',cat:'japanese'},{name:'?��???,cat:'japanese'},{name:'?�동',cat:'japanese'},
    // �?분식
    {name:'짜장�?,cat:'chinese'},{name:'짬뽕',cat:'chinese'},{name:'?�수??,cat:'chinese'},{name:'깐풍�?,cat:'chinese'},
    {name:'고추?�채',cat:'chinese'},{name:'마파?��?',cat:'chinese'},{name:'마라??,cat:'chinese'},{name:'마라?�궈',cat:'chinese'},
    {name:'?�산??,cat:'chinese'},{name:'꿔바로우',cat:'chinese'},{name:'깐쇼?�우',cat:'chinese'},
    {name:'초밥',cat:'japanese'},{name:'?�시�???',cat:'japanese'},{name:'?�카�?,cat:'japanese'},{name:'?�멘',cat:'japanese'},
    {name:'?�동',cat:'japanese'},{name:'?�우??,cat:'japanese'},{name:'?�끼?�바',cat:'japanese'},{name:'?��??�이???�식)',cat:'japanese'},
    {name:'규카�?,cat:'japanese'},{name:'?�키?�키',cat:'japanese'},{name:'?�끼?�쿠',cat:'japanese'},
    // ?�자/?�스?�/리조??    {name:'?�자(?�퍼로니)',cat:'fast'},{name:'?�자(마르게리?�)',cat:'fast'},{name:'불고기피??,cat:'fast'},
    {name:'?�스?�(까르보나??',cat:'western'},{name:'?�스?�(?�리?�올리오)',cat:'western'},{name:'?�스?�(?�마??',cat:'western'},
    {name:'?�스?�(로제)',cat:'western'},{name:'?�스?�(봉골??',cat:'western'},{name:'리조???�림)',cat:'western'},
    {name:'리조??버섯)',cat:'western'},{name:'리조???�마??',cat:'western'},{name:'?�박?�테?�크',cat:'western'},{name:'?�테?�크',cat:'western'},
    {name:'감바??,cat:'western'},{name:'?�러?�파?��?',cat:'western'},
    // ?�시??    {name:'?��?��',cat:'vietnamese'},{name:'분짜',cat:'vietnamese'},{name:'반�?',cat:'vietnamese'},{name:'?��???,cat:'thai'},
    {name:'?�시고렝',cat:'seasia'},{name:'?�사',cat:'seasia'},{name:'카오??,cat:'thai'},{name:'카오만까??,cat:'thai'},{name:'?�얌�?,cat:'thai'},
    {name:'?�테',cat:'seasia'},{name:'바쿠??,cat:'seasia'},{name:'?��??�르치킨?�이??,cat:'seasia'},{name:'?�브?�브',cat:'japanese'},
    // ?�드/버거/간편
    {name:'김�?,cat:'sandwich'},{name:'참치김�?,cat:'sandwich'},{name:'?�까?��?�?,cat:'sandwich'},{name:'컵밥',cat:'rice'},
    {name:'?�스??,cat:'sandwich'},{name:'?�드?�치',cat:'sandwich'},{name:'?�니??,cat:'sandwich'},{name:'베이글 ?�드?�치',cat:'sandwich'},
    {name:'?�도�?,cat:'sandwich'},{name:'?�버�?불고기버�?',cat:'fast'},{name:'?�버�?치킨버거)',cat:'fast'},{name:'?�버�??�우버거)',cat:'fast'},
    {name:'?�버거세??,cat:'fast'},{name:'치킨버거?�트',cat:'fast'},{name:'?�자?�트',cat:'fast'},{name:'치킨?�트',cat:'fast'},
    // ?�시???�트
    {name:'?�시??,cat:'etc'},{name:'?�식?�시??,cat:'etc'},{name:'분식?�트',cat:'etc'},{name:'?�까?�정??,cat:'japanese'},{name:'초밥?�트',cat:'japanese'},
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
    shareBtn: document.getElementById('shareBtn'),
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
    const labelMap = { quick:'간편', light:'가벼�?', heavy:'?�든', spicy:'매운', soup:'�?��', cold:'?�원?? };
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
      quick: ()=> c==='sandwich'||c==='fast'||/김�??�드?�치|?�스??반�?|버거|컵밥|?�니기리/.test(n),
      light: ()=> c==='salad'||c==='vietnamese'||/?�러???��?|?�프/.test(n),
      heavy: ()=> ['rice','korean','chinese','western','fast'].includes(c)||/?�테?�크|치킨|?�자|?�수??찜닭/.test(n),
      spicy: ()=> /매운|마라|짬뽕|불닭|?��?|김�?부?�|?�볶??.test(n),
      soup:  ()=> /찌개|�????�멘|?�동|짬뽕|칼국???�제�??�프/.test(n),
      cold:  ()=> /?�면|?�우???�바|?�러??.test(n) || c==='salad',
    };
    return wanted.every(k => tests[k]?tests[k]():true);
  }

  function pick(list){ return list[Math.floor(Math.random()*list.length)]; }

  // Flavor text generator (per-dish with variety)
  function flavorBlurbHTML(name){
    const n = (name||'').trim();
    // Per-dish lines (add as needed)
    const L = {
      '김치찌�?:[ '보�?보�? 매콤 구수?�이 코끝??간질?�요.', '�????�갈??�?�� 촵�??�늘 컨디???�라갑니??' ],
      '?�장찌개':[ '구수???�장?�이 깊어??', '?��?·채소가 ?�각, ?�백?�이 ?�안 가??' ],
      '?�두부찌개':[ '부?��????�두부??칼칼??�?��???�며?�어??', '???�갈??몸이 ?�르�??�립니??' ],
      '부?�찌개':[ '진득?????��??� ?�큰?�의 조합.', '?�면?�리 ?�고 ?�루룩�??�복 ?�치 급상??' ],
      '?�멘':[ '진한 ?�프�?면발???�시�? 차슈 ???�으�?마무�?', '?�루룩�?깊�? 감칠맛이 ?�아??' ],
      '?�동':[ '?��???면발�?깔끔??�?��???�석.', '?�묵 ???�솔, 마음까�? ?�뜻?�져??' ],
      '?�면':[ '차�????�수??�?��감이 ?��?, '겨자 ?? ?�초 ?�르�? ?�원?�이 맴돌?�요.' ],
      '짜장�?:[ '?�큰 짜장�?면발??�??�라붙어??', '?�무지 ???? 비비???�간 미소가 번집?�다.' ],
      '짬뽕':[ '불향 ?�린 ?�큰 �?��???�물??가??', '??모금???�캬~?��? ?�로 ?��???' ],
      '초밥':[ '밥알 ?��?, ?�선???�?�???�맛.', '?�?�비 ?��?간장 촉�??�뜻?�게 깔끔.' ],
      '?�시�???':[ '차갑�??��????�감???�쾌?�요.', '바다???�맛???�르륵�?미끄?�집?�다.' ],
      '?�카�?:[ '겉바?�촉??교과??', '?�스 촉�??�툼??고기?�서 ?�즙????' ],
      '규동':[ '?�큰�?�� ?�고기�? ?�파??조화.', '?�끈??밥과 ?��??��??�이 바빠?�요.' ],
      '가츠동':[ '부?�러??카츠+?��???촉촉??', '?�파 ?�이 ?�며???�근??????' ],
      '?��???:[ '?�어??고소?�이 부?�럽�??�져??', '?�자·?�?�비 ?�짝???�뜻 ?�백.' ],
      '?�동':[ '바삭???�김�??�짠 ?�스??묘�?.', '밥과 ?�께 ?�?��?만족감이 �?차요.' ],
      '?�자(?�퍼로니)':[ '치즈가 쭈욱??�?��???�퍼로니??존재�?', '??조각???�복???�안 가??' ],
      '?�스?�(까르보나??':[ '?�리미한 ?�스가 면을 감싸??', '베이컨의 �?��?�과 ?�추 ?�의 마침??' ],
      '?�스?�(?�리?�올리오)':[ '?�리브오?�의 ?�백?? 마늘 ?�이 ?�솔.', '?�플?��?�?계속 ?�각?�는 �?' ],
      '카레?�이??:[ '?�신료의 ?�근?�과 부?�러???�스.', '밥이 ?�술???�뜻???�로가 ?�니??' ],
      '불고�?:[ '?�짝지근한 불향???�?�?�요.', '참기�?고소?�에 ?�꼬리�? ?�라갑니??' ],
      '?�육볶음':[ '매콤?�콤 밥도?�의 ?�석.', '?�추???�서 촵�?기분까�? 좋아?�요.' ],
      '?��?��':[ '진한 ?�수???�브???�뜻?�이 ?�해?�요.', '면발 ?�루룩�?개운?�게 마무�?' ],
      '분짜':[ '??��고기?� ?�큼 ?�스??조화.', '?�브?� ?�께 바삭???�큼??콤보.' ],
      '반�?':[ '바삭??바게?�에 촉촉???�재�?', '고수 ???��??�긋?�이 ?�아?�니??' ],
    };
    const fallback = (reA, reB)=>{
      const a = reA || '?�입???��????��?!';
      const b = reB || '?�늘???�든?�게 기분 ??';
      return [a,b];
    };
    // If exact mapping exists, pick 2 lines randomly
    if (L[n]){
      const arr = L[n];
      const pick2 = arr.length >= 2 ? arr.slice().sort(()=>Math.random()-0.5).slice(0,2) : arr;
      return `<span class="blurb-title">�??�현</span>${pick2.map(x=>`<p>${x}</p>`).join('')}`;
    }
    // Pattern-based fallback with variety
    const is=(re)=>re.test(n);
    let lines = [];
    if(is(/?�멘|?�동|짬뽕|칼국???�제�?�?��|�?��|??찌개/)) lines = [ '?�끈??�?��???�루룩�?몸이 ?�르�?', '김 ?�리??그릇?�서 ?�근?�이 ?�라?�??' ];
    else if(is(/?�면|?�우???�바|물냉|?�모밀/)) lines = [ '차�????�수??�?���? ?�원?�게 ???��???', '겨자 ?? ?�초 ?�르르�?머리까�? 맑아?�요.' ];
    else if(is(/마라|불닭|매운|?��?|쭈꾸�?김�?칠리/)) lines = [ '?�얼??매운맛이 ?�트?�스�??��?, '불맛�??�께 ?�워 충전 ?�료!' ];
    else if(is(/?�까??카츠|가�??�김|치킨|?�념치킨|?�라?�드|깐풍�?깐쇼/)) lines = [ '겉바?�촉! 바삭 ?�리??고소?�이 ?�팡.', '?�짠 ?�스까�? ?�해??만족??MAX.' ];
    else if(is(/?�자|리조???�테?�크|?�박|감바???�스?�/)) lines = [ '버터?�과 치즈??진한 ?��?가 ?�안??감싸??', '?�스가 촉�?�?밥과 찰떡궁합.' ];
    else if(is(/초밥|?�시�??�덮�?물회/)) lines = [ '바다???�뜻???�맛???�르�?', '?��????�감???�안??�?��?�게.' ];
    else if(is(/카레|카레?�이???�이?�이??)) lines = [ '?�신료의 ?�뜻?�이 ?�근?�요.', '부?�러???�스??밥이 ?�술.' ];
    else if(is(/??��|규동|가츠동|?��????�동|컵밥/)) lines = [ '?�끈??�??�에 ?�성???�핑!', '비비???�간 ?�복?��? ?�라갑니??' ];
    else if(is(/김�??�드?�치|?�스??버거|반�?|?�도�?)) lines = [ '???�에 ?��?간편?��?�??�든.', '?�안?�서 ?�껴지???�만감이 좋아??' ];
    else if(is(/?�러???�러?�파?��?|분짜|?��?��/)) lines = [ '?�삭?�삭 ?�뜻??밸런??', '?�큼 ?�백??가볍게 ?�너지 충전.' ];
    else lines = fallback();
    return `<span class="blurb-title">�??�현</span>${lines.map(x=>`<p>${x}</p>`).join('')}`;
  }

  // Render condition sheet chips
  const COND_TAGS = [
    { id:'quick', label:'간편' },
    { id:'light', label:'가벼�?' },
    { id:'heavy', label:'?�든' },
    { id:'spicy', label:'매운' },
    { id:'soup',  label:'�?��' },
    { id:'cold',  label:'?�원?? },
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
      showEmptyResult('?�택??카테고리???�록??메뉴가 ?�어?? ?�른 카테고리�?골라보세??');
      return;
    }
    const useTags = (cond && cond.tags && cond.tags.length>0) ? cond.tags : (state.activeTags || []);
    let pool = items.filter(it=>matches(it, useTags));
    if(useTags && useTags.length && !pool.length){
      showEmptyResult('조건??맞는 메뉴가 ?�어?? 조건??조정?�보?�요!');
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
    const M = {1:['�?,'과메�?,'?��?,'미나�?,'?�금�?,'감귤'],2:['광어','?�럭','�?,'?�래','?�이','꼬막'],3:['주꾸�?,'?�다�?,'??,'?�래','?�기'],4:['주꾸�?,'멍게','참나�?,'비빔�?��','봄동'],5:['쭈꾸�?,'?�어(�?','매실','주키??,'?�이'],6:['참치','병어','?�수??,'?�마??,'블루베리'],7:['민어','?�어','?�박','참외','?�마??,'?�수??],8:['?�복','갈치','복숭??,'?�도','가지'],9:['?�어(가??','꽃게','�?,'?�과','무화�?,'고구�?],10:['?�??,'?�어','?��?','�?,'곶감','배추'],11:['방어','�?,'�?,'배추','�?,'?�감'],12:['방어','꼬막','�?,'?��?,'?�금�?,'감귤']};
    const now=new Date(), m=now.getMonth()+1, list=M[m]||[]; els.seasonalList.innerHTML='';
    list.forEach(n=>{ const d=document.createElement('div'); d.className='chip'; d.textContent=n; els.seasonalList.appendChild(d); });
    if(els.seasonalTitle) els.seasonalTitle.textContent = `${m}???�철?�식`;
  }

  // Nearby + Weather (for display only)
  function setNearbyInfo(){ if(!els.nearbyInfo) return; if(state.nearby&&state.nearby.ready&&state.nearby.presentCats.length){ const label=new Map(state.categories.map(c=>[c.id,c.name])); const labs=state.nearby.presentCats.map(id=>label.get(id)||id).slice(0,6); els.nearbyInfo.textContent=`근처 감�?: ${labs.join(' · ')}`; } else els.nearbyInfo.textContent=''; }
  function mapWeather(code,temp){ let cond='?????�음', emoji='?���?; const c=Number(code); if(c===0){cond='맑음';emoji='?��?;} else if([1,2,3].includes(c)){cond='구름 조금';emoji='??;} else if([45,48].includes(c)){cond='?�개';emoji='?���?;} else if([51,53,55,56,57].includes(c)){cond='?�슬�?;emoji='?���?;} else if([61,63,65,66,67,80,81,82].includes(c)){cond='�?;emoji='?���?;} else if([71,73,75,77,85,86].includes(c)){cond='??;emoji='?�️';} else if([95,96,97].includes(c)){cond='?�우';emoji='?�️';} const t=(temp!=null&&Number.isFinite(temp))?`${Math.round(temp)}°C`:''; return { text: t?`${cond} · ${t}`:cond, emoji } }
  function catCuisineMap(){ return { korean:['korean','korea'], japanese:['japanese','sushi','ramen','udon','soba'], chinese:['chinese'], western:['italian','french','steak_house','european','american'], noodle:['noodle','ramen','udon','soba'], salad:['salad','healthy'], sandwich:['sandwich','bagel','deli'], fast:['burger','pizza','fried_chicken'], vietnamese:['vietnamese','pho','banh_mi'], thai:['thai'], indian:['indian','nepalese'], mexican:['mexican','tacos','burrito'], brunch:['breakfast','brunch','cafe'], med:['mediterranean','turkish','greek','middle_eastern','kebab','shawarma'], seasia:['indonesian','malaysian','singaporean'], dessert:['ice_cream','cake','waffle','dessert','bakery'], etc:[] } }
  async function initNearbyPresence(lat,lng,radius=1200){ try{ const base="[out:json][timeout:12];"+"(node[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"way[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"relation[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+"););"+"out tags center;"; const urls=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']; let ok=false,data=null; for(const u of urls){ try{ const r=await fetch(u+'?data='+encodeURIComponent(base)); if(r.ok){ data=await r.json(); ok=true; break;} }catch{} } if(!ok) throw 0; const cuisines=new Set(); if(Array.isArray(data.elements)){ for(const el of data.elements){ const t=el.tags||{}; const c=(t.cuisine||'').toLowerCase(); if(!c) continue; c.split(';').map(s=>s.trim()).filter(Boolean).forEach(v=>cuisines.add(v)); } } const map=catCuisineMap(); const presentCats=Object.keys(map).filter(cat=>map[cat].some(tag=>cuisines.has(tag))); state.nearby={ready:true,presentCats,radius,ts:Date.now(),lat,lng}; saveState(); setNearbyInfo(); }catch{ state.nearby={ready:false,presentCats:[],radius,ts:Date.now(),lat,lng}; saveState(); setNearbyInfo(); } }
  async function initWeather(){ try{ if(!navigator.geolocation) return; const pos=await new Promise((res,rej)=>{ navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:8000}); }); const {latitude:lat,longitude:lng}=pos.coords; state.location={lat,lng,ts:Date.now()}; saveState(); initNearbyPresence(lat,lng).catch(()=>{}); const url=new URL('https://api.open-meteo.com/v1/forecast'); url.searchParams.set('latitude',lat); url.searchParams.set('longitude',lng); url.searchParams.set('current_weather','true'); url.searchParams.set('timezone','auto'); const r=await fetch(url.toString()); if(!r.ok) throw 0; const data=await r.json(); let code=null,temp=null; if(data.current_weather){ code=data.current_weather.weathercode; temp=data.current_weather.temperature; } const info=mapWeather(code,temp); state.weather={ready:true,summary:info.text,code,temp}; if(els.weatherInfo) els.weatherInfo.textContent=`?�재 ?�씨: ${info.emoji} ${info.text}`; }catch{ if(els.weatherInfo) els.weatherInfo.textContent=''; } }

  // Share helpers
  function tryInitKakao(){
    try{
      if(typeof window !== 'undefined' && window.Kakao){
        const meta = document.querySelector('meta[name="kakao-app-key"]');
        const key = (meta && (meta.content||'').trim()) || localStorage.getItem('lm_kakao_app_key') || '';
        if(!window.Kakao.isInitialized() && key){ window.Kakao.init(key); }
      }
    }catch{}
  }
  function getSharePayload(){
    const name = (state.lastPick || '').trim() || (els.result && (els.result.textContent||'').trim()) || '';
    const url = (typeof location !== 'undefined' && location.href) ? location.href : '';
    const text = name ? `?�늘 ?�심 추천: ${name}` : '룰렛???�려 ?�늘???�심??골라보세??';
    const title = '?�심 추천';
    return { name, text, url, title };
  }

  // Events
  if(els.spinQuickBtn) els.spinQuickBtn.addEventListener('click', ()=> spinOnce({tags:[],cats:new Set()}));
  function openSheet(){ if(els.conditionSheet){ tempCond.tags=[...(state.activeTags||[])]; tempCond.cats=new Set(state.activeCats); renderCondSheet(); els.conditionSheet.hidden=false; } }
  function closeSheet(){ if(els.conditionSheet){ els.conditionSheet.hidden=true; } }
  if(els.spinWithCondBtn) els.spinWithCondBtn.addEventListener('click', openSheet);
  if(els.closeSheetBtn) els.closeSheetBtn.addEventListener('click', closeSheet);
  if(els.applyCondBtn) els.applyCondBtn.addEventListener('click', ()=>{ state.activeCats = new Set(tempCond.cats); state.activeTags = [...tempCond.tags]; renderActiveCats(); renderActiveTags(); closeSheet(); spinOnce({ tags:[...tempCond.tags], cats:new Set(tempCond.cats) }); });
  if(els.selectAllCatsBtn) els.selectAllCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(state.categories.filter(c=>c.id!=='dessert').map(c=>c.id)); renderCondSheet(); });
  if(els.clearCatsBtn) els.clearCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(); renderCondSheet(); });

  if(els.shareBtn){
  els.shareBtn.addEventListener('click', async ()=>{
    const pick = (state.lastPick || '').trim() || (els.result && (els.result.textContent||'').trim()) || '';
    const text = pick ? 오늘 점심 추천:  : '룰렛을 돌려 오늘의 점심을 골라보세요!';
    const url = (typeof location !== 'undefined' && location.href) ? location.href : '';
    const payload = [text, url].filter(Boolean).join('\n');
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){
        await navigator.clipboard.writeText(payload);
        els.shareBtn.textContent = '복사됨!';
        setTimeout(()=>{ els.shareBtn.textContent='복사하기'; }, 1200);
      } else {
        const t=document.createElement('textarea'); t.value=payload; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t);
        els.shareBtn.textContent = '복사됨!';
        setTimeout(()=>{ els.shareBtn.textContent='복사하기'; }, 1200);
      }
    }catch{}
  });
}

  if(els.kakaoShareBtn){
    els.kakaoShareBtn.addEventListener('click', async ()=>{
      tryInitKakao();
      const p = getSharePayload();
      try{
        if(window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized()){
          window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: { title: p.title, description: p.text, imageUrl: p.url, link: { mobileWebUrl: p.url, webUrl: p.url } }
          });
        }else{
          alert('카카?�톡 공유�??�용?�려�?Kakao ?????�정???�요?�니?? meta[kakao-app-key] ?�는 localStorage "lm_kakao_app_key"???��? ?�정??주세??');
        }
      }catch{
        alert('카카?�톡 공유 �?문제가 발생?�어?? 링크 복사�?공유??주세??');
      }
    });
  }

  if(els.copyShareBtn){
    els.copyShareBtn.addEventListener('click', async ()=>{
      const p = getSharePayload();
      const payload = [p.text, p.url].filter(Boolean).join('\n');
      try{
        if(navigator.clipboard && navigator.clipboard.writeText){
          await navigator.clipboard.writeText(payload);
          els.copyShareBtn.textContent = '복사??';
          setTimeout(()=>{ els.copyShareBtn.textContent='링크 복사'; }, 1200);
        }else{
          const t=document.createElement('textarea'); t.value=payload; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t);
          els.copyShareBtn.textContent = '복사??';
          setTimeout(()=>{ els.copyShareBtn.textContent='링크 복사'; }, 1200);
        }
      }catch{
        alert('복사???�패?�어?? ?�동?�로 복사??주세??');
      }
    });
  }

  // Init
  migrate();
  // ??�� 초기?�된 ?�태�??�작
  state.selectedCats = new Set(state.categories.map(c=>c.id)); saveState();
  renderSeasonal();
  renderActiveCats();
  renderActiveTags();
  setNearbyInfo();
  tryInitKakao();
  initWeather();
})();

