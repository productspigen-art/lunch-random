(() => {
  const SCHEMA_VERSION = 5;

  const DEFAULT_CATEGORIES = [
    { id: 'korean', name: '한식' },
    { id: 'japanese', name: '일식' },
    { id: 'chinese', name: '중식' },
    { id: 'western', name: '양식' },
    { id: 'noodle', name: '면/분식' },
    { id: 'rice', name: '밥/덮밥' },
    { id: 'salad', name: '샐러드' },
    { id: 'sandwich', name: '샌드위치' },
    { id: 'fast', name: '패스트푸드' },
    { id: 'vietnamese', name: '베트남' },
    { id: 'thai', name: '태국' },
    { id: 'indian', name: '인도/네팔' },
    { id: 'mexican', name: '멕시칸' },
    { id: 'brunch', name: '브런치' },
    { id: 'med', name: '지중해' },
    { id: 'seasia', name: '동남아' },
    { id: 'dessert', name: '디저트' },
    { id: 'etc', name: '기타' }
  ];

  const DEFAULT_ITEMS = [
    // 한식/분식/국물
    { name: '김치찌개', cat: 'korean' },{ name: '된장찌개', cat: 'korean' },{ name: '순두부찌개', cat: 'korean' },{ name: '부대찌개', cat: 'korean' },
    { name: '감자탕', cat: 'korean' },{ name: '해장국', cat: 'korean' },{ name: '갈비탕', cat: 'korean' },{ name: '설렁탕', cat: 'korean' },
    { name: '곰탕', cat: 'korean' },{ name: '추어탕', cat: 'korean' },{ name: '육개장', cat: 'korean' },{ name: '닭개장', cat: 'korean' },
    { name: '삼계탕', cat: 'korean' },{ name: '북어국', cat: 'korean' },{ name: '미역국', cat: 'korean' },{ name: '오뎅탕', cat: 'korean' },
    { name: '불고기', cat: 'korean' },{ name: '제육볶음', cat: 'korean' },{ name: '닭갈비', cat: 'korean' },{ name: '낙지볶음', cat: 'korean' },
    { name: '아구찜', cat: 'korean' },{ name: '찜닭', cat: 'korean' },{ name: '삼겹살', cat: 'korean' },{ name: '갈비', cat: 'korean' },
    { name: '쌈밥', cat: 'korean' },{ name: '비빔밥', cat: 'korean' },{ name: '돌솥비빔밥', cat: 'korean' },
    { name: '김밥', cat: 'sandwich' },{ name: '라면', cat: 'noodle' },{ name: '냉면', cat: 'noodle' },{ name: '비빔냉면', cat: 'noodle' },
    { name: '칼국수', cat: 'noodle' },{ name: '수제비', cat: 'noodle' },{ name: '잔치국수', cat: 'noodle' },{ name: '떡볶이', cat: 'noodle' },
    { name: '순대', cat: 'noodle' },{ name: '오뎅', cat: 'noodle' },{ name: '파전', cat: 'korean' },{ name: '감자전', cat: 'korean' },
    { name: '김치전', cat: 'korean' },{ name: '계란말이', cat: 'korean' },{ name: '전복죽', cat: 'rice' },
    { name: '돼지국밥', cat: 'korean' },{ name: '순대국', cat: 'korean' },{ name: '콩나물국밥', cat: 'korean' },

    // 일식
    { name: '초밥', cat: 'japanese' },{ name: '사시미', cat: 'japanese' },{ name: '돈까스', cat: 'japanese' },{ name: '돈카츠', cat: 'japanese' },
    { name: '가츠동', cat: 'japanese' },{ name: '규동', cat: 'rice' },{ name: '우동', cat: 'japanese' },{ name: '라멘', cat: 'japanese' },
    { name: '냉우동', cat: 'japanese' },{ name: '오므라이스', cat: 'japanese' },{ name: '가라아게', cat: 'japanese' },
    { name: '야끼소바', cat: 'japanese' },{ name: '야끼니쿠', cat: 'japanese' },{ name: '돈부리', cat: 'japanese' },
    { name: '규카츠', cat: 'japanese' },{ name: '스키야키', cat: 'japanese' },{ name: '텐동', cat: 'japanese' },
    { name: '오야코동', cat: 'japanese' },{ name: '부타동', cat: 'japanese' },{ name: '차슈덮밥', cat: 'japanese' },
    { name: '가츠카레', cat: 'japanese' },{ name: '일본카레', cat: 'japanese' },{ name: '사케동', cat: 'japanese' },
    { name: '미소된장국', cat: 'japanese' },{ name: '타코야끼', cat: 'japanese' },{ name: '냉모밀(소바)', cat: 'japanese' },
    { name: '회덮밥', cat: 'japanese' },{ name: '샤브샤브', cat: 'japanese' },

    // 중식
    { name: '짜장면', cat: 'chinese' },{ name: '짬뽕', cat: 'chinese' },{ name: '탕수육', cat: 'chinese' },{ name: '군만두', cat: 'chinese' },
    { name: '물만두', cat: 'chinese' },{ name: '마라탕', cat: 'chinese' },{ name: '마라샹궈', cat: 'chinese' },{ name: '마라롱샤', cat: 'chinese' },
    { name: '마파두부', cat: 'chinese' },{ name: '깐풍기', cat: 'chinese' },{ name: '팔보채', cat: 'chinese' },{ name: '양장피', cat: 'chinese' },
    { name: '고추잡채', cat: 'chinese' },{ name: '유산슬', cat: 'chinese' },{ name: '유린기', cat: 'chinese' },{ name: '딤섬', cat: 'chinese' },
    { name: '샤오롱바오', cat: 'chinese' },{ name: '탄탄면', cat: 'chinese' },{ name: '짜장밥', cat: 'chinese' },{ name: '잡채밥', cat: 'chinese' },
    { name: '마파두부덮밥', cat: 'chinese' },{ name: '계란볶음밥', cat: 'chinese' },{ name: '새우볶음밥', cat: 'chinese' },

    // 양식/브런치/샐러드
    { name: '스테이크', cat: 'western' },{ name: '함박스테이크', cat: 'western' },{ name: '피자', cat: 'fast' },
    { name: '파스타', cat: 'western' },{ name: '리소토', cat: 'western' },{ name: '리조또', cat: 'western' },
    { name: '감바스', cat: 'western' },{ name: '샐러드', cat: 'salad' },{ name: '치즈플래터', cat: 'western' },
    { name: '그라탕', cat: 'western' },{ name: '그라탱', cat: 'western' },{ name: '치킨스테이크', cat: 'western' },
    { name: '수프', cat: 'salad' },{ name: '바게트', cat: 'brunch' },{ name: '버터롤', cat: 'brunch' },

    // 베트남/태국/동남아
    { name: '쌀국수', cat: 'vietnamese' },{ name: '분짜', cat: 'vietnamese' },{ name: '반미', cat: 'vietnamese' },
    { name: '팟타이', cat: 'thai' },{ name: '나시고렝', cat: 'seasia' },{ name: '락사', cat: 'seasia' },{ name: '미고랭', cat: 'seasia' },
    { name: '카오팟', cat: 'thai' },{ name: '카오만까이', cat: 'thai' },{ name: '똠얌꿍', cat: 'thai' },
    { name: '사테', cat: 'seasia' },{ name: '바쿠테', cat: 'seasia' },{ name: '싱가포르치킨라이스', cat: 'seasia' },
    { name: '부리또', cat: 'mexican' },{ name: '타코', cat: 'mexican' },{ name: '퀘사디야', cat: 'mexican' },

    // 인도/네팔
    { name: '인도커리', cat: 'indian' },{ name: '버터치킨', cat: 'indian' },{ name: '치킨 티카 마살라', cat: 'indian' },
    { name: '팔락 파니르', cat: 'indian' },{ name: '탄두리 치킨', cat: 'indian' },{ name: '비리야니', cat: 'indian' },
    { name: '난 & 커리', cat: 'indian' },{ name: '로티', cat: 'indian' },

    // 샐러드/랩
    { name: '포케', cat: 'salad' },{ name: '시저 샐러드', cat: 'salad' },{ name: '콥 샐러드', cat: 'salad' },
    { name: '연어 샐러드', cat: 'salad' },{ name: '그릭 샐러드', cat: 'salad' },{ name: '닭가슴살 샐러드', cat: 'salad' },
    { name: '샐러드랩', cat: 'sandwich' },

    // 샌드위치류/간편식
    { name: '샌드위치', cat: 'sandwich' },{ name: '클럽 샌드위치', cat: 'sandwich' },{ name: '파니니', cat: 'sandwich' },
    { name: '베이글 샌드위치', cat: 'sandwich' },{ name: '토스트', cat: 'sandwich' },{ name: '핫도그', cat: 'sandwich' },
    { name: '오니기리', cat: 'japanese' },{ name: '유부초밥', cat: 'japanese' },{ name: '컵밥', cat: 'rice' },

    // 패스트푸드/치킨/버거
    { name: '버거', cat: 'fast' },{ name: '햄버거', cat: 'fast' },{ name: '감자튀김', cat: 'fast' },{ name: '치킨', cat: 'fast' },
    { name: '핫윙', cat: 'fast' },{ name: '양념치킨', cat: 'fast' },{ name: '마라치킨', cat: 'fast' },{ name: '라면버거', cat: 'fast' },
    { name: '떡갈비버거', cat: 'fast' },{ name: '불고기피자', cat: 'fast' },

    // 밥/덮밥/볶음밥
    { name: '카레', cat: 'rice' },{ name: '일본카레', cat: 'japanese' },{ name: '하이라이스', cat: 'rice' },
    { name: '제육덮밥', cat: 'rice' },{ name: '치킨마요덮밥', cat: 'rice' },{ name: '소불고기덮밥', cat: 'rice' },
    { name: '불닭덮밥', cat: 'rice' },{ name: '스팸마요덮밥', cat: 'rice' },{ name: '참치마요덮밥', cat: 'rice' },
    { name: '간장계란밥', cat: 'rice' },{ name: '김치볶음밥', cat: 'rice' },{ name: '볶음밥', cat: 'rice' },
    { name: '연어덮밥', cat: 'japanese' },
    { name: '비프볼', cat: 'rice' },{ name: '낙지덮밥', cat: 'rice' },

    // 브런치/지중해
    { name: '에그 베네딕트', cat: 'brunch' },{ name: '아보카도 토스트', cat: 'brunch' },{ name: '프렌치 토스트', cat: 'brunch' },
    { name: '팬케이크', cat: 'brunch' },{ name: '오픈 샌드위치', cat: 'brunch' },{ name: '그릭 요거트 볼', cat: 'brunch' },
    { name: '케밥', cat: 'med' },{ name: '팔라펠 플레이트', cat: 'med' },{ name: '후무스 & 피타', cat: 'med' },
    { name: '샤와르마', cat: 'med' },{ name: '그릴 랩', cat: 'med' },{ name: '길로스(기로스)', cat: 'med' },

    // 디저트/음료
    { name: '빙수', cat: 'dessert' },{ name: '케이크', cat: 'dessert' },{ name: '쿠키', cat: 'dessert' },{ name: '마카롱', cat: 'dessert' },
    { name: '크로플', cat: 'dessert' },{ name: '스콘', cat: 'dessert' },{ name: '도넛', cat: 'dessert' },{ name: '와플', cat: 'dessert' },
    { name: '푸딩', cat: 'dessert' },{ name: '아이스크림', cat: 'dessert' },{ name: '젤라또', cat: 'dessert' },
    

    // 기타/퓨전
    { name: '도시락', cat: 'etc' },{ name: '죽(전복/쇠고기 등)', cat: 'etc' },{ name: '카페 런치 세트', cat: 'etc' },
    { name: '불닭파스타', cat: 'western' },{ name: '치즈돈까츠', cat: 'japanese' },{ name: '김치필라프', cat: 'rice' },
    { name: '김치파스타', cat: 'western' },{ name: '크림리조또', cat: 'western' },{ name: '김치리조또', cat: 'western' },
  ];

  const els = {
    randomBtn: document.getElementById('randomBtn'),
    result: document.getElementById('result'),
    resultSection: document.getElementById('resultSection'),
    // situation
    situationChips: document.getElementById('situationChips'),
    clearContextBtn: document.getElementById('clearContextBtn'),
    // seasonal
    seasonalList: document.getElementById('seasonalList'),
    seasonalTitle: document.getElementById('seasonal-title'),
    // context popular
    contextBest: document.getElementById('contextBest'),
    contextWhy: document.getElementById('contextWhy'),
    // info
    weatherInfo: document.getElementById('weatherInfo'),
    nearbyInfo: document.getElementById('nearbyInfo'),
  };

  const storage = {
    get(key, fallback){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch{ return fallback; } },
    set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
  };

  const state = {
    categories: storage.get('lm_categories', DEFAULT_CATEGORIES),
    items: storage.get('lm_items', DEFAULT_ITEMS),
    selectedCats: new Set(storage.get('lm_selectedCats', DEFAULT_CATEGORIES.map(c=>c.id))),
    lastPick: null,
    context: (()=>{
      const saved = storage.get('lm_context', { situation: [] });
      if(!Array.isArray(saved.situation)) saved.situation = [];
      return { situation: saved.situation };
    })(),
    weather: { ready:false, summary:null, code:null, temp:null },
    location: storage.get('lm_location', null),
    nearby: storage.get('lm_nearby_presence', { ready:false, presentCats: [], radius: 1200, ts: 0 })
  };

  function saveState(){
    storage.set('lm_categories', state.categories);
    storage.set('lm_items', state.items);
    storage.set('lm_selectedCats', Array.from(state.selectedCats));
    storage.set('lm_context', state.context);
    storage.set('lm_location', state.location);
    storage.set('lm_nearby_presence', state.nearby);
  }

  function ensureDefaultsMerged(){
    const byId = new Map(state.categories.map(c=>[c.id,c]));
    DEFAULT_CATEGORIES.forEach(c=>{ if(!byId.has(c.id)) byId.set(c.id,c); });
    state.categories = Array.from(byId.values());
    const nameSet = new Set(state.items.map(i=>i.name));
    const toAdd = DEFAULT_ITEMS.filter(i=>!nameSet.has(i.name));
    if(toAdd.length) state.items = state.items.concat(toAdd);
  }
  function purgeNonMeal(){
    // Remove drink category and items, and tighten suggestions to exclude dessert
    state.items = state.items.filter(i => i.cat !== 'drink');
    state.categories = state.categories.filter(c => c.id !== 'drink');
    if(state.selectedCats && state.selectedCats.has('drink')) state.selectedCats.delete('drink');
  }
  function migrateIfNeeded(){
    const ver = storage.get('lm_schema_version',0);
    if(ver < SCHEMA_VERSION){ ensureDefaultsMerged(); purgeNonMeal(); storage.set('lm_schema_version', SCHEMA_VERSION); saveState(); }
  }

  // Situation UI
  const SITUATION_OPTS = [
    { id:'quick', label:'빨리 먹고 싶음' },
    { id:'light', label:'가벼운 식사' },
    { id:'heavy', label:'든든한 식사' },
    { id:'spicy', label:'매운 것 땡김' },
    { id:'soup', label:'따뜻한 국물' },
    { id:'healthy', label:'건강하게' },
    { id:'share', label:'같이 나눠먹기' },
    { id:'solo', label:'혼밥' },
    { id:'onmove', label:'이동 중' },
    { id:'hangout', label:'회식 느낌' },
  ];
  function chipList(container, items, selected, onToggle){
    if(!container) return;
    container.innerHTML = '';
    items.forEach(opt=>{
      const b = document.createElement('button');
      b.type='button'; b.className='chip'; b.textContent=opt.label;
      const isSel = selected.includes(opt.id);
      b.setAttribute('aria-selected', String(isSel));
      b.addEventListener('click', ()=> onToggle(opt.id));
      container.appendChild(b);
    });
  }
  function renderContext(){
    chipList(els.situationChips, SITUATION_OPTS, state.context.situation, id=>{
      const arr = state.context.situation; const i = arr.indexOf(id);
      if(i>=0) arr.splice(i,1); else arr.push(id);
      saveState(); renderContext(); renderContextPopular();
    });
  }
  if(els.clearContextBtn){ els.clearContextBtn.addEventListener('click', ()=>{ state.context = { situation: [] }; saveState(); renderContext(); renderContextPopular(); }); }

  // Seasonal
  function renderSeasonal(){
    if(!els.seasonalList) return;
    const SEASONAL_BY_MONTH = { 1:['굴','과메기','대구','미나리','시금치','감귤'], 2:['광어','우럭','굴','달래','냉이','꼬막'], 3:['주꾸미','도다리','쑥','달래','딸기'], 4:['주꾸미','멍게','참나물','비빔국수','봄동'], 5:['쭈꾸미','전어(봄)','매실','주키니','오이'], 6:['참치','병어','옥수수','토마토','블루베리'], 7:['민어','장어','수박','참외','토마토','옥수수'], 8:['전복','갈치','복숭아','포도','가지'], 9:['전어(가을)','꽃게','배','사과','무화과','고구마'], 10:['대하','전어','낙지','밤','곶감','배추'], 11:['방어','굴','무','배추','귤','단감'], 12:['방어','꼬막','굴','대구','시금치','감귤'] };
    const now = new Date(); const m = now.getMonth()+1; const list = SEASONAL_BY_MONTH[m]||[];
    els.seasonalList.innerHTML=''; list.forEach(n=>{ const d=document.createElement('div'); d.className='chip'; d.textContent=n; els.seasonalList.appendChild(d); });
    const monthLabel = String(m);
    if(els.seasonalTitle) els.seasonalTitle.textContent = `${monthLabel}월 제철음식`;
  }

  // Nearby info
  function setNearbyInfo(){
    if(!els.nearbyInfo) return;
    if(state.nearby && state.nearby.ready && state.nearby.presentCats.length){
      const labelById = new Map(state.categories.map(c=>[c.id,c.name]));
      const labels = state.nearby.presentCats.map(id=>labelById.get(id)||id).slice(0,6);
      els.nearbyInfo.textContent = `근처 감지: ${labels.join(' · ')}`;
    } else els.nearbyInfo.textContent = '';
  }

  function updateResultUI(name){ if(els.result){ els.result.textContent = name || ''; els.resultSection && (els.resultSection.hidden = false); } }

  // Filters
  function matchesSituation(it, selected){
    if(!selected || selected.length===0) return true; const name=it.name; const cat=it.cat;
    const checks={
      quick:()=>cat==='sandwich'||cat==='fast'||/김밥|샌드위치|버거|토스트|반미|오므라이스/.test(name)||(cat==='rice'&&/덮밥|카레/.test(name)),
      light:()=>cat==='salad'||cat==='vietnamese'||/샐러드|포케|수프|요거트|반미/.test(name),
      heavy:()=>['rice','korean','chinese','western','fast'].includes(cat)||/스테이크|치킨|피자|탕수육|찜닭|닭갈비/.test(name),
      spicy:()=>/매운|짬뽕|마라|김치|제육|낙지|떡볶이|부대|쭈꾸미|불닭/.test(name),
      soup:()=>/찌개|국|탕|라멘|우동|짬뽕|칼국수|수제비|수프/.test(name),
      healthy:()=>cat==='salad'||cat==='med'||/그릭|샐러드|포케|요거트/.test(name),
      share:()=>/찜닭|보쌈|치킨|피자|탕수육|샤와르마|케밥|팔라펠/.test(name),
      solo:()=>cat==='rice'||/덮밥|라멘|우동|카레|김밥|초밥|돈까스|파스타/.test(name),
      onmove:()=>cat==='sandwich'||/김밥|샌드위치|토스트|핫도그|반미|버거/.test(name),
      hangout:()=>(['chinese','korean','western'].includes(cat)&&/보쌈|치킨|피자|탕수육|스테이크|닭갈비|샤와르마|케밥/.test(name))||/치킨|피자|탕수육/.test(name)
    };
    return selected.every(tag=>checks[tag]?checks[tag]():true);
  }

  function rulesFromContext(){
    const r={ wantCold:false,wantSoup:false,wantSpicy:false,wantQuick:false,wantHeavy:false };
    const h=new Date().getHours(); const t=state.weather?.temp; const code=Number(state.weather?.code);
    const isRain=[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code); const isSnow=[71,73,75,77,85,86].includes(code);
    if(Number.isFinite(t)){ if(t>=27) r.wantCold=true; if(t<=8) r.wantSoup=true; }
    if(isRain||isSnow) r.wantSoup=true; if(h>=6&&h<=10) r.wantQuick=true; if(h>=17&&h<=21) r.wantHeavy=true; if(h>=22||h<=3){ r.wantSoup=true; r.wantSpicy=true; }
    const S=state.context.situation||[]; if(S.includes('light')){ r.wantHeavy=false; r.wantQuick=true; }
    if(S.includes('heavy')) r.wantHeavy=true; if(S.includes('spicy')) r.wantSpicy=true; if(S.includes('soup')) r.wantSoup=true;
    if(S.includes('quick')||S.includes('onmove')||S.includes('solo')) r.wantQuick=true; if(S.includes('hangout')||S.includes('share')) r.wantHeavy=true;
    return r;
  }
  function filterByRules(list,r){
    const tests=[]; if(r.wantCold) tests.push(it=>/냉면|냉모밀|소바|냉우동|포케|샐러드/.test(it.name)||it.cat==='salad'||it.cat==='vietnamese');
    if(r.wantSoup) tests.push(it=>/찌개|국|탕|라멘|우동|짬뽕|칼국수|수제비|수프/.test(it.name));
    if(r.wantSpicy) tests.push(it=>/매운|짬뽕|마라|김치|제육|낙지|떡볶이|부대|쭈꾸미|불닭/.test(it.name));
    if(r.wantQuick) tests.push(it=>it.cat==='sandwich'||it.cat==='fast'||/김밥|샌드위치|토스트|반미|버거|오니기리|덮밥|카레/.test(it.name));
    if(r.wantHeavy) tests.push(it=>['rice','korean','chinese','western','fast'].includes(it.cat)||/스테이크|치킨|피자|탕수육|찜닭|닭갈비/.test(it.name));
    if(tests.length===0) return list; const out=list.filter(it=>tests.every(f=>f(it))); return out.length?out:list;
  }

  function basePool(){
    // Without category UI: default to all categories; honor previously selected if partial
    let pool = state.items.filter(it => it.cat !== 'drink' && it.cat !== 'dessert');
    try{
      const allSel = state.selectedCats && state.selectedCats.size === state.categories.length;
      if(state.selectedCats && state.selectedCats.size>0 && !allSel){ pool = pool.filter(it=>state.selectedCats.has(it.cat)); }
    }catch{}
    return pool;
  }

  function suggestionPool(){
    let list = basePool().filter(it=>matchesSituation(it, state.context.situation));
    if(state.nearby && state.nearby.ready && state.nearby.presentCats.length){
      const set=new Set(state.nearby.presentCats); const near=list.filter(it=>set.has(it.cat)); if(near.length) list=near;
    }
    const rules = rulesFromContext();
    return filterByRules(list, rules);
  }

  function chooseAndShow(){
    let list = suggestionPool(); if(!list.length) list = basePool(); if(!list.length) return updateResultUI('메뉴가 없습니다');
    // avoid immediate repeat
    const nonRepeat = list.filter(it=>it.name!==state.lastPick); if(nonRepeat.length) list = nonRepeat;
    const pick = list[Math.floor(Math.random()*list.length)].name;
    state.lastPick = pick; saveState(); updateResultUI(pick);
    // small punch
    els.result?.animate([{transform:'scale(.96)',opacity:.7},{transform:'scale(1.06)',opacity:1},{transform:'scale(1)',opacity:1}],{duration:300,easing:'cubic-bezier(.2,.9,.2,1)'});
  }

  // Rolling marquee of names
  let rollingTimer=null;
  function startRolling(){ if(rollingTimer) return; els.resultSection&&(els.resultSection.hidden=false);
    rollingTimer = setInterval(()=>{ const list = basePool(); if(!list.length) return; const n=list[Math.floor(Math.random()*list.length)].name; updateResultUI(n); }, 110);
  }
  function stopRolling(){ if(rollingTimer){ clearInterval(rollingTimer); rollingTimer=null; } }

  // Context popular
  function summarizeContext(){ const parts=[]; const h=new Date().getHours(); parts.push(`${h}시`); if(state.weather?.summary) parts.push(state.weather.summary);
    if(state.nearby?.ready && state.nearby.presentCats.length){ const labelById=new Map(state.categories.map(c=>[c.id,c.name])); const cats=state.nearby.presentCats.slice(0,3).map(id=>labelById.get(id)||id).join('·'); parts.push(`근처:${cats}`); } return parts.join(' · '); }
  function renderContextPopular(){ if(!els.contextBest) return; let base=suggestionPool(); if(!base.length) base=state.items.filter(it=>it.cat!=='drink'&&it.cat!=='dessert'); const pick=base[Math.floor(Math.random()*base.length)]; els.contextBest.textContent=pick?pick.name:'추천 준비 중'; const r=rulesFromContext(); const why=[]; if(r.wantCold) why.push('시원한 메뉴'); if(r.wantSoup) why.push('따뜻한 국물'); if(r.wantSpicy) why.push('매콤 인기'); if(r.wantQuick) why.push('간편식 선호'); if(r.wantHeavy) why.push('든든한 한 끼'); if(els.contextWhy) els.contextWhy.textContent = why.join(' · '); }

  // Weather + Nearby
  function catCuisineMap(){ return { korean:['korean','korea'], japanese:['japanese','sushi','ramen','udon','soba'], chinese:['chinese'], western:['italian','french','steak_house','european','american'], noodle:['noodle','ramen','udon','soba'], rice:[], salad:['salad','healthy'], sandwich:['sandwich','bagel','deli'], fast:['burger','pizza','fried_chicken'], vietnamese:['vietnamese','pho','banh_mi'], thai:['thai'], indian:['indian','nepalese'], mexican:['mexican','tacos','burrito'], brunch:['breakfast','brunch','cafe'], med:['mediterranean','turkish','greek','middle_eastern','kebab','shawarma'], seasia:['indonesian','malaysian','singaporean'], dessert:['ice_cream','cake','waffle','dessert','bakery'], drink:['coffee_shop','cafe','tea','bubble_tea'], etc:[] }; }
  async function initNearbyPresence(lat,lng,radius=1200){ try{ const base="[out:json][timeout:12];"+"(node[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"way[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+");"+"relation[\"amenity\"~\"restaurant|fast_food|cafe\"](around:"+radius+","+lat+","+lng+"););"+"out tags center;"; const urls=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']; let ok=false,data=null,lastErr=null; for(const u of urls){ try{ const res=await fetch(u+'?data='+encodeURIComponent(base)); if(res.ok){ data=await res.json(); ok=true; break; } lastErr=new Error('overpass http '+res.status); }catch(e){ lastErr=e; } } if(!ok) throw lastErr||new Error('overpass failed'); const cuisines=new Set(); if(Array.isArray(data.elements)){ for(const el of data.elements){ const t=el.tags||{}; const c=(t.cuisine||'').toString().toLowerCase(); if(!c) continue; c.split(';').map(s=>s.trim()).filter(Boolean).forEach(v=>cuisines.add(v)); } } const map=catCuisineMap(); const presentCats=Object.keys(map).filter(cat=>map[cat].some(tag=>cuisines.has(tag))); state.nearby={ ready:true, presentCats, radius, ts:Date.now(), lat, lng }; saveState(); setNearbyInfo(); renderContextPopular(); }catch(e){ state.nearby={ ready:false, presentCats:[], radius, ts:Date.now(), lat, lng }; saveState(); setNearbyInfo(); }}
  async function initWeather(){ try{ if(!navigator.geolocation) return; const pos=await new Promise((res,rej)=>{ navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:8000}); }); const { latitude:lat, longitude:lng } = pos.coords; state.location={lat,lng,ts:Date.now()}; saveState(); initNearbyPresence(lat,lng).catch(()=>{}); const url=new URL('https://api.open-meteo.com/v1/forecast'); url.searchParams.set('latitude',lat); url.searchParams.set('longitude',lng); url.searchParams.set('current_weather','true'); url.searchParams.set('timezone','auto'); const r=await fetch(url.toString()); if(!r.ok) throw new Error('weather http '+r.status); const data=await r.json(); let code=null,temp=null; if(data.current_weather){ code=data.current_weather.weathercode; temp=data.current_weather.temperature; } else if(data.current && data.current.weather_code){ code=data.current.weather_code; temp=data.current.temperature_2m; } const info=mapWeather(code,temp); state.weather={ ready:true, summary:info.text, code, temp }; if(els.weatherInfo) els.weatherInfo.textContent = `현재 날씨: ${info.emoji} ${info.text}`; renderContextPopular(); }catch(e){ if(els.weatherInfo) els.weatherInfo.textContent=''; }}
  function mapWeather(code,temp){ let cond='알 수 없음', emoji='🌤️'; const c=Number(code); if(c===0){cond='맑음';emoji='☀️';} else if([1,2,3].includes(c)){cond='구름 조금';emoji='⛅';} else if([45,48].includes(c)){cond='안개';emoji='🌫️';} else if([51,53,55,56,57].includes(c)){cond='이슬비';emoji='🌦️';} else if([61,63,65,66,67,80,81,82].includes(c)){cond='비';emoji='🌧️';} else if([71,73,75,77,85,86].includes(c)){cond='눈';emoji='❄️';} else if([95,96,97].includes(c)){cond='뇌우';emoji='⛈️';} const t=(temp!=null&&Number.isFinite(temp))?`${Math.round(temp)}°C`:''; const text=t?`${cond} · ${t}`:cond; return { text, emoji }; }

  // Events
  if(els.randomBtn){ els.randomBtn.addEventListener('click', ()=>{ stopRolling(); chooseAndShow(); setTimeout(startRolling, 3000); }); }

  // Init
  migrateIfNeeded();
  renderContext();
  renderSeasonal();
  setNearbyInfo();
  initWeather();
  renderContextPopular();
  // show rolling names by default
  startRolling();
})();
