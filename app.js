(() => {
  const SCHEMA_VERSION = 7;

  const DEFAULT_CATEGORIES = [
    { id: 'korean', name: '한식' }, { id: 'japanese', name: '일식' }, { id: 'chinese', name: '중식' },
    { id: 'western', name: '양식' }, { id: 'noodle', name: '면/분식' }, { id: 'rice', name: '밥/덮밥' },
    { id: 'salad', name: '샐러드' }, { id: 'sandwich', name: '샌드위치' }, { id: 'fast', name: '패스트푸드' },
    { id: 'vietnamese', name: '베트남' }, { id: 'thai', name: '태국' }, { id: 'indian', name: '인도/네팔' },
    { id: 'mexican', name: '멕시칸' }, { id: 'brunch', name: '브런치' }, { id: 'med', name: '지중해' },
    { id: 'seasia', name: '동남아' }, { id: 'dessert', name: '디저트' }, { id: 'etc', name: '기타' }
  ];

  // 풍부한 식사 위주 데이터 (음료 제외)
  const DEFAULT_ITEMS = [
    // 국/탕/찌개
    {name:'김치찌개',cat:'korean'},{name:'된장찌개',cat:'korean'},{name:'순두부찌개',cat:'korean'},{name:'부대찌개',cat:'korean'},
    {name:'감자탕',cat:'korean'},{name:'해장국',cat:'korean'},{name:'육개장',cat:'korean'},{name:'삼계탕',cat:'korean'},
    {name:'설렁탕',cat:'korean'},{name:'갈비탕',cat:'korean'},{name:'곰탕',cat:'korean'},{name:'추어탕',cat:'korean'},
    // 볶음/찜/구이
    {name:'불고기',cat:'korean'},{name:'제육볶음',cat:'korean'},{name:'돼지불백',cat:'korean'},{name:'고추장불고기',cat:'korean'},
    {name:'오삼불고기',cat:'korean'},{name:'닭갈비',cat:'korean'},{name:'낙지볶음',cat:'korean'},{name:'오징어볶음',cat:'korean'},
    {name:'닭볶음탕',cat:'korean'},{name:'찜닭',cat:'korean'},{name:'갈비찜',cat:'korean'},{name:'아귀찜',cat:'korean'},
    {name:'코다리찜',cat:'korean'},{name:'김치찜',cat:'korean'},{name:'해물찜',cat:'korean'},
    {name:'삼겹살',cat:'korean'},{name:'목살구이',cat:'korean'},{name:'갈비구이',cat:'korean'},{name:'오리불고기',cat:'korean'},
    // 치킨/패스트
    {name:'양념치킨',cat:'fast'},{name:'간장치킨',cat:'fast'},{name:'후라이드치킨',cat:'fast'},{name:'반반치킨',cat:'fast'},
    {name:'통닭',cat:'fast'},{name:'치킨스테이크',cat:'western'},
    // 비빔/덮밥/볶음밥
    {name:'비빔밥',cat:'korean'},{name:'돌솥비빔밥',cat:'korean'},{name:'제육덮밥',cat:'rice'},{name:'불고기덮밥',cat:'rice'},
    {name:'스팸마요덮밥',cat:'rice'},{name:'참치마요덮밥',cat:'rice'},{name:'간장계란밥',cat:'rice'},{name:'김치볶음밥',cat:'rice'},
    {name:'잡채밥',cat:'chinese'},{name:'새우볶음밥',cat:'chinese'},{name:'오므라이스',cat:'japanese'},{name:'카레라이스',cat:'rice'},
    {name:'돈까스덮밥',cat:'japanese'},{name:'규동',cat:'rice'},{name:'가츠동',cat:'japanese'},{name:'사케동',cat:'japanese'},{name:'텐동',cat:'japanese'},
    // 면/분식
    {name:'짜장면',cat:'chinese'},{name:'짬뽕',cat:'chinese'},{name:'탕수육',cat:'chinese'},{name:'깐풍기',cat:'chinese'},
    {name:'고추잡채',cat:'chinese'},{name:'마파두부',cat:'chinese'},{name:'마라탕',cat:'chinese'},{name:'마라샹궈',cat:'chinese'},
    {name:'유산슬',cat:'chinese'},{name:'꿔바로우',cat:'chinese'},{name:'깐쇼새우',cat:'chinese'},
    {name:'초밥',cat:'japanese'},{name:'사시미(회)',cat:'japanese'},{name:'돈카츠',cat:'japanese'},{name:'라멘',cat:'japanese'},
    {name:'우동',cat:'japanese'},{name:'냉우동',cat:'japanese'},{name:'야끼소바',cat:'japanese'},{name:'오므라이스(일식)',cat:'japanese'},
    {name:'규카츠',cat:'japanese'},{name:'스키야키',cat:'japanese'},{name:'야끼니쿠',cat:'japanese'},
    // 피자/파스타/리조또
    {name:'피자(페퍼로니)',cat:'fast'},{name:'피자(마르게리타)',cat:'fast'},{name:'불고기피자',cat:'fast'},
    {name:'파스타(까르보나라)',cat:'western'},{name:'파스타(알리오올리오)',cat:'western'},{name:'파스타(토마토)',cat:'western'},
    {name:'파스타(로제)',cat:'western'},{name:'파스타(봉골레)',cat:'western'},{name:'리조또(크림)',cat:'western'},
    {name:'리조또(버섯)',cat:'western'},{name:'리조또(토마토)',cat:'western'},{name:'함박스테이크',cat:'western'},{name:'스테이크',cat:'western'},
    {name:'감바스',cat:'western'},{name:'샐러드파스타',cat:'western'},
    // 아시아
    {name:'쌀국수',cat:'vietnamese'},{name:'분짜',cat:'vietnamese'},{name:'반미',cat:'vietnamese'},{name:'팟타이',cat:'thai'},
    {name:'나시고렝',cat:'seasia'},{name:'락사',cat:'seasia'},{name:'카오팟',cat:'thai'},{name:'카오만까이',cat:'thai'},{name:'똠얌꿍',cat:'thai'},
    {name:'사테',cat:'seasia'},{name:'바쿠테',cat:'seasia'},{name:'싱가포르치킨라이스',cat:'seasia'},{name:'샤브샤브',cat:'japanese'},
    // 샌드/버거/간편
    {name:'김밥',cat:'sandwich'},{name:'참치김밥',cat:'sandwich'},{name:'돈까스김밥',cat:'sandwich'},{name:'컵밥',cat:'rice'},
    {name:'토스트',cat:'sandwich'},{name:'샌드위치',cat:'sandwich'},{name:'파니니',cat:'sandwich'},{name:'베이글 샌드위치',cat:'sandwich'},
    {name:'핫도그',cat:'sandwich'},{name:'햄버거(불고기버거)',cat:'fast'},{name:'햄버거(치킨버거)',cat:'fast'},{name:'햄버거(새우버거)',cat:'fast'},
    {name:'햄버거세트',cat:'fast'},{name:'치킨버거세트',cat:'fast'},{name:'피자세트',cat:'fast'},{name:'치킨세트',cat:'fast'},
    // 도시락/세트
    {name:'도시락',cat:'etc'},{name:'한식도시락',cat:'etc'},{name:'분식세트',cat:'etc'},{name:'돈까스정식',cat:'japanese'},{name:'초밥세트',cat:'japanese'},
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
    const labelMap = { quick:'간편', light:'가벼움', heavy:'든든', spicy:'매운', soup:'국물', cold:'시원함' };
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
      quick: ()=> c==='sandwich'||c==='fast'||/김밥|샌드위치|토스트|반미|버거|컵밥|오니기리/.test(n),
      light: ()=> c==='salad'||c==='vietnamese'||/샐러드|포케|수프/.test(n),
      heavy: ()=> ['rice','korean','chinese','western','fast'].includes(c)||/스테이크|치킨|피자|탕수육|찜닭/.test(n),
      spicy: ()=> /매운|마라|짬뽕|불닭|낙지|김치|부대|떡볶이/.test(n),
      soup:  ()=> /찌개|국|탕|라멘|우동|짬뽕|칼국수|수제비|수프/.test(n),
      cold:  ()=> /냉면|냉우동|소바|샐러드/.test(n) || c==='salad',
    };
    return wanted.every(k => tests[k]?tests[k]():true);
  }

  function pick(list){ return list[Math.floor(Math.random()*list.length)]; }

  // Flavor text generator (per-dish with variety)
  function flavorBlurbHTML(name){
    const n = (name||'').trim();
    // Per-dish lines (add as needed)
    const L = {
      '김치찌개':[ '보글보글 매콤 구수함이 코끝을 간질여요.', '밥 한 숟갈에 국물 촵— 오늘 컨디션 올라갑니다.' ],
      '된장찌개':[ '구수한 된장향이 깊어요.', '두부·채소가 사각, 담백함이 입안 가득.' ],
      '순두부찌개':[ '부들부들 순두부에 칼칼한 국물이 스며들어요.', '한 숟갈에 몸이 사르르 풀립니다.' ],
      '부대찌개':[ '진득한 햄 풍미와 얼큰함의 조합.', '라면사리 넣고 후루룩— 행복 수치 급상승!' ],
      '라멘':[ '진한 스프로 면발을 적시고, 차슈 한 점으로 마무리.', '후루룩— 깊은 감칠맛이 남아요.' ],
      '우동':[ '탱글한 면발과 깔끔한 국물의 정석.', '어묵 향 솔솔, 마음까지 따뜻해져요.' ],
      '냉면':[ '차가운 육수의 청량감이 확—', '겨자 톡, 식초 사르르. 시원함이 맴돌아요.' ],
      '짜장면':[ '달큰 짜장과 면발이 착 달라붙어요.', '단무지 한 입, 비비는 순간 미소가 번집니다.' ],
      '짬뽕':[ '불향 어린 얼큰 국물에 해물이 가득.', '한 모금에 “캬~”가 절로 나와요.' ],
      '초밥':[ '밥알 탱글, 생선의 은은한 단맛.', '와사비 톡— 간장 촉— 산뜻하게 깔끔.' ],
      '사시미(회)':[ '차갑고 탱글한 식감이 상쾌해요.', '바다의 단맛이 스르륵— 미끄러집니다.' ],
      '돈카츠':[ '겉바속촉의 교과서.', '소스 촉— 두툼한 고기에서 육즙이 팡!' ],
      '규동':[ '달큰짭짤 소고기와 양파의 조화.', '뜨끈한 밥과 쓱— 숟가락이 바빠져요.' ],
      '가츠동':[ '부드러운 카츠+달걀의 촉촉함.', '양파 향이 스며든 포근한 한 끼.' ],
      '사케동':[ '연어의 고소함이 부드럽게 퍼져요.', '유자·와사비 살짝— 산뜻 담백.' ],
      '텐동':[ '바삭한 튀김과 단짠 소스의 묘미.', '밥과 함께 와앙— 만족감이 꽉 차요.' ],
      '피자(페퍼로니)':[ '치즈가 쭈욱— 짭짤한 페퍼로니의 존재감.', '한 조각의 행복이 입안 가득.' ],
      '파스타(까르보나라)':[ '크리미한 소스가 면을 감싸요.', '베이컨의 짭짤함과 후추 향의 마침표.' ],
      '파스타(알리오올리오)':[ '올리브오일의 담백함, 마늘 향이 솔솔.', '심플하지만 계속 생각나는 맛.' ],
      '카레라이스':[ '향신료의 포근함과 부드러운 소스.', '밥이 술술— 따뜻한 위로가 됩니다.' ],
      '불고기':[ '달짝지근한 불향이 은은해요.', '참기름 고소함에 입꼬리가 올라갑니다.' ],
      '제육볶음':[ '매콤달콤 밥도둑의 정석.', '상추에 싸서 촵— 기분까지 좋아져요.' ],
      '쌀국수':[ '진한 육수에 허브의 산뜻함이 더해져요.', '면발 후루룩— 개운하게 마무리.' ],
      '분짜':[ '숯불고기와 상큼 소스의 조화.', '허브와 함께 바삭함+상큼함 콤보.' ],
      '반미':[ '바삭한 바게트에 촉촉한 속재료.', '고수 한 잎— 향긋함이 살아납니다.' ],
    };
    const fallback = (reA, reB)=>{
      const a = reA || '한입에 퍼지는 풍미!';
      const b = reB || '오늘도 든든하게 기분 업.';
      return [a,b];
    };
    // If exact mapping exists, pick 2 lines randomly
    if (L[n]){
      const arr = L[n];
      const pick2 = arr.length >= 2 ? arr.slice().sort(()=>Math.random()-0.5).slice(0,2) : arr;
      return `<span class="blurb-title">맛 표현</span>${pick2.map(x=>`<p>${x}</p>`).join('')}`;
    }
    // Pattern-based fallback with variety
    const is=(re)=>re.test(n);
    let lines = [];
    if(is(/라멘|우동|짬뽕|칼국수|수제비|국수|국밥|탕|찌개/)) lines = [ '뜨끈한 국물에 후루룩— 몸이 사르르.', '김 서리는 그릇에서 포근함이 올라와요.' ];
    else if(is(/냉면|냉우동|소바|물냉|냉모밀/)) lines = [ '차가운 육수의 청량감! 시원하게 한 젓가락.', '겨자 톡, 식초 사르르— 머리까지 맑아져요.' ];
    else if(is(/마라|불닭|매운|낙지|쭈꾸미|김치|칠리/)) lines = [ '얼얼한 매운맛이 스트레스를 싹—', '불맛과 함께 파워 충전 완료!' ];
    else if(is(/돈까스|카츠|가츠|튀김|치킨|양념치킨|후라이드|깐풍기|깐쇼/)) lines = [ '겉바속촉! 바삭 소리에 고소함이 팡팡.', '단짠 소스까지 더해져 만족도 MAX.' ];
    else if(is(/피자|리조또|스테이크|함박|감바스|파스타/)) lines = [ '버터향과 치즈의 진한 풍미가 입안을 감싸요.', '소스가 촉— 면/밥과 찰떡궁합.' ];
    else if(is(/초밥|사시미|회덮밥|물회/)) lines = [ '바다의 산뜻한 단맛이 스르륵.', '탱글한 식감이 입안을 청량하게.' ];
    else if(is(/카레|카레라이스|하이라이스/)) lines = [ '향신료의 따뜻함이 포근해요.', '부드러운 소스에 밥이 술술.' ];
    else if(is(/덮밥|규동|가츠동|사케동|텐동|컵밥/)) lines = [ '따끈한 밥 위에 풍성한 토핑!', '비비는 순간 행복도가 올라갑니다.' ];
    else if(is(/김밥|샌드위치|토스트|버거|반미|핫도그/)) lines = [ '한 입에 쏙— 간편하지만 든든.', '손안에서 느껴지는 포만감이 좋아요.' ];
    else if(is(/샐러드|샐러드파스타|분짜|쌀국수/)) lines = [ '아삭아삭 산뜻한 밸런스.', '상큼 담백— 가볍게 에너지 충전.' ];
    else lines = fallback();
    return `<span class="blurb-title">맛 표현</span>${lines.map(x=>`<p>${x}</p>`).join('')}`;
  }

  // Render condition sheet chips
  const COND_TAGS = [
    { id:'quick', label:'간편' },
    { id:'light', label:'가벼움' },
    { id:'heavy', label:'든든' },
    { id:'spicy', label:'매운' },
    { id:'soup',  label:'국물' },
    { id:'cold',  label:'시원함' },
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
      showEmptyResult('선택한 카테고리에 등록된 메뉴가 없어요. 다른 카테고리를 골라보세요!');
      return;
    }
    const useTags = (cond && cond.tags && cond.tags.length>0) ? cond.tags : (state.activeTags || []);
    let pool = items.filter(it=>matches(it, useTags));
    if(useTags && useTags.length && !pool.length){
      showEmptyResult('조건에 맞는 메뉴가 없어요. 조건을 조정해보세요!');
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
      if(els.flavorText) els.flavorText.innerHTML = `<p>${flavorBlurb(final.name)}</p>`;
      else if(els.resultBlurb) els.resultBlurb.textContent = flavorBlurb(final.name);
      if(els.resultSection){ els.resultSection.classList.remove('is-spinning'); }
    }, 900);
  }

  // Seasonal
  function renderSeasonal(){
    if(!els.seasonalList) return;
    const M = {1:['굴','과메기','대구','미나리','시금치','감귤'],2:['광어','우럭','굴','달래','냉이','꼬막'],3:['주꾸미','도다리','쑥','달래','딸기'],4:['주꾸미','멍게','참나물','비빔국수','봄동'],5:['쭈꾸미','전어(봄)','매실','주키니','오이'],6:['참치','병어','옥수수','토마토','블루베리'],7:['민어','장어','수박','참외','토마토','옥수수'],8:['전복','갈치','복숭아','포도','가지'],9:['전어(가을)','꽃게','배','사과','무화과','고구마'],10:['대하','전어','낙지','밤','곶감','배추'],11:['방어','굴','무','배추','귤','단감'],12:['방어','꼬막','굴','대구','시금치','감귤']};
    const now=new Date(), m=now.getMonth()+1, list=M[m]||[]; els.seasonalList.innerHTML='';
    list.forEach(n=>{ const d=document.createElement('div'); d.className='chip'; d.textContent=n; els.seasonalList.appendChild(d); });
    if(els.seasonalTitle) els.seasonalTitle.textContent = `${m}월 제철음식`;
  }

  // Nearby + Weather (for display only)
  function setNearbyInfo(){ if(!els.nearbyInfo) return; if(state.nearby&&state.nearby.ready&&state.nearby.presentCats.length){ const label=new Map(state.categories.map(c=>[c.id,c.name])); const labs=state.nearby.presentCats.map(id=>label.get(id)||id).slice(0,6); els.nearbyInfo.textContent=`근처 감지: ${labs.join(' · ')}`; } else els.nearbyInfo.textContent=''; }
  function mapWeather(code,temp){ let cond='알 수 없음', emoji='🌤️'; const c=Number(code); if(c===0){cond='맑음';emoji='☀️';} else if([1,2,3].includes(c)){cond='구름 조금';emoji='⛅';} else if([45,48].includes(c)){cond='안개';emoji='🌫️';} else if([51,53,55,56,57].includes(c)){cond='이슬비';emoji='🌦️';} else if([61,63,65,66,67,80,81,82].includes(c)){cond='비';emoji='🌧️';} else if([71,73,75,77,85,86].includes(c)){cond='눈';emoji='❄️';} else if([95,96,97].includes(c)){cond='뇌우';emoji='⛈️';} const t=(temp!=null&&Number.isFinite(temp))?`${Math.round(temp)}°C`:''; return { text: t?`${cond} · ${t}`:cond, emoji } }
  function catCuisineMap(){ return { korean:['korean','korea'], japanese:['japanese','sushi','ramen','udon','soba'], chinese:['chinese'], western:['italian','french','steak_house','european','american'], noodle:['noodle','ramen','udon','soba'], salad:['salad','healthy'], sandwich:['sandwich','bagel','deli'], fast:['burger','pizza','fried_chicken'], vietnamese:['vietnamese','pho','banh_mi'], thai:['thai'], indian:['indian','nepalese'], mexican:['mexican','tacos','burrito'], brunch:['breakfast','brunch','cafe'], med:['mediterranean','turkish','greek','middle_eastern','kebab','shawarma'], seasia:['indonesian','malaysian','singaporean'], dessert:['ice_cream','cake','waffle','dessert','bakery'], etc:[] } }
  async function initNearbyPresence(lat,lng,radius=1200){ try{ const base="[out:json][timeout:12];"+"(node[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"way[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"relation[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+"););"+"out tags center;"; const urls=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']; let ok=false,data=null; for(const u of urls){ try{ const r=await fetch(u+'?data='+encodeURIComponent(base)); if(r.ok){ data=await r.json(); ok=true; break;} }catch{} } if(!ok) throw 0; const cuisines=new Set(); if(Array.isArray(data.elements)){ for(const el of data.elements){ const t=el.tags||{}; const c=(t.cuisine||'').toLowerCase(); if(!c) continue; c.split(';').map(s=>s.trim()).filter(Boolean).forEach(v=>cuisines.add(v)); } } const map=catCuisineMap(); const presentCats=Object.keys(map).filter(cat=>map[cat].some(tag=>cuisines.has(tag))); state.nearby={ready:true,presentCats,radius,ts:Date.now(),lat,lng}; saveState(); setNearbyInfo(); }catch{ state.nearby={ready:false,presentCats:[],radius,ts:Date.now(),lat,lng}; saveState(); setNearbyInfo(); } }
  async function initWeather(){ try{ if(!navigator.geolocation) return; const pos=await new Promise((res,rej)=>{ navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:8000}); }); const {latitude:lat,longitude:lng}=pos.coords; state.location={lat,lng,ts:Date.now()}; saveState(); initNearbyPresence(lat,lng).catch(()=>{}); const url=new URL('https://api.open-meteo.com/v1/forecast'); url.searchParams.set('latitude',lat); url.searchParams.set('longitude',lng); url.searchParams.set('current_weather','true'); url.searchParams.set('timezone','auto'); const r=await fetch(url.toString()); if(!r.ok) throw 0; const data=await r.json(); let code=null,temp=null; if(data.current_weather){ code=data.current_weather.weathercode; temp=data.current_weather.temperature; } const info=mapWeather(code,temp); state.weather={ready:true,summary:info.text,code,temp}; if(els.weatherInfo) els.weatherInfo.textContent=`현재 날씨: ${info.emoji} ${info.text}`; }catch{ if(els.weatherInfo) els.weatherInfo.textContent=''; } }

  // Events
  if(els.spinQuickBtn) els.spinQuickBtn.addEventListener('click', ()=> spinOnce({tags:[],cats:new Set()}));
  function openSheet(){ if(els.conditionSheet){ tempCond.tags=[...(state.activeTags||[])]; tempCond.cats=new Set(state.activeCats); renderCondSheet(); els.conditionSheet.hidden=false; } }
  function closeSheet(){ if(els.conditionSheet){ els.conditionSheet.hidden=true; } }
  if(els.spinWithCondBtn) els.spinWithCondBtn.addEventListener('click', openSheet);
  if(els.closeSheetBtn) els.closeSheetBtn.addEventListener('click', closeSheet);
  if(els.applyCondBtn) els.applyCondBtn.addEventListener('click', ()=>{ state.activeCats = new Set(tempCond.cats); state.activeTags = [...tempCond.tags]; renderActiveCats(); renderActiveTags(); closeSheet(); spinOnce({ tags:[...tempCond.tags], cats:new Set(tempCond.cats) }); });
  if(els.selectAllCatsBtn) els.selectAllCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(state.categories.filter(c=>c.id!=='dessert').map(c=>c.id)); renderCondSheet(); });
  if(els.clearCatsBtn) els.clearCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(); renderCondSheet(); });

  // Init
  migrate();
  // 항상 초기화된 상태로 시작
  state.selectedCats = new Set(state.categories.map(c=>c.id)); saveState();
  renderSeasonal();
  renderActiveCats();
  renderActiveTags();
  setNearbyInfo();
  initWeather();
})();
