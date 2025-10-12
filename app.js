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
    activeCatBar: document.getElementById('activeCatBar'),
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
    if(ids.length === 0){ els.activeCatBar.hidden = true; return; }
    const label = new Map(state.categories.map(c=>[c.id,c.name]));
    ids.forEach(id=>{
      const b=document.createElement('button');
      b.type='button'; b.className='chip'; b.textContent=label.get(id)||id;
      b.setAttribute('aria-selected','true');
      b.addEventListener('click', ()=>{ state.activeCats.delete(id); renderActiveCats(); });
      els.activeCatBar.appendChild(b);
    });
    els.activeCatBar.hidden = false;
  }

  function matches(it, cond){
    if(!cond || !cond.length) return true;
    const n=it.name, c=it.cat;
    const tests={
      quick: ()=> c==='sandwich'||c==='fast'||/김밥|샌드위치|토스트|반미|버거|컵밥|오니기리/.test(n),
      light: ()=> c==='salad'||c==='vietnamese'||/샐러드|포케|수프/.test(n),
      heavy: ()=> ['rice','korean','chinese','western','fast'].includes(c)||/스테이크|치킨|피자|탕수육|찜닭/.test(n),
      spicy: ()=> /매운|마라|짬뽕|불닭|낙지|김치|부대|떡볶이/.test(n),
      soup:  ()=> /찌개|국|탕|라멘|우동|짬뽕|칼국수|수제비|수프/.test(n),
      cold:  ()=> /냉면|냉우동|소바|샐러드/.test(n) || c==='salad',
    };
    return cond.every(k => tests[k]?tests[k]():true);
  }

  function pick(list){ return list[Math.floor(Math.random()*list.length)]; }

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

  function spinOnce(cond){
    // apply category filter if chosen or active
    let items = basePool();
    const useCats = (cond && cond.cats && cond.cats.size>0) ? cond.cats : (state.activeCats.size>0 ? state.activeCats : null);
    if(useCats){ items = items.filter(it=>useCats.has(it.cat)); }
    let pool = items.filter(it=>matches(it, cond?.tags||[]));
    if(!pool.length) pool = basePool();
    // simple flip + fast roll feel
    if(els.resultSection){ els.resultSection.classList.add('is-spinning'); }
    els.result?.classList.remove('flip-start'); void els.result?.offsetWidth; els.result?.classList.add('flip-start');
    const tempTimer = setInterval(()=>{ const t = pick(pool); if(t) els.result.textContent = t.name; }, 70);
    setTimeout(()=>{
      clearInterval(tempTimer);
      const final = pick(pool);
      state.lastPick=final.name; saveState(); els.result.textContent = final.name;
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
  function openSheet(){ if(els.conditionSheet){ tempCond.tags=[]; tempCond.cats=new Set(state.activeCats); renderCondSheet(); els.conditionSheet.hidden=false; } }
  function closeSheet(){ if(els.conditionSheet){ els.conditionSheet.hidden=true; } }
  if(els.spinWithCondBtn) els.spinWithCondBtn.addEventListener('click', openSheet);
  if(els.closeSheetBtn) els.closeSheetBtn.addEventListener('click', closeSheet);
  if(els.applyCondBtn) els.applyCondBtn.addEventListener('click', ()=>{ state.activeCats = new Set(tempCond.cats); renderActiveCats(); closeSheet(); spinOnce({ tags:[...tempCond.tags], cats:new Set(tempCond.cats) }); });
  if(els.selectAllCatsBtn) els.selectAllCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(state.categories.filter(c=>c.id!=='dessert').map(c=>c.id)); renderCondSheet(); });
  if(els.clearCatsBtn) els.clearCatsBtn.addEventListener('click', ()=>{ tempCond.cats = new Set(); renderCondSheet(); });

  // Init
  migrate();
  // 항상 초기화된 상태로 시작
  state.selectedCats = new Set(state.categories.map(c=>c.id)); saveState();
  renderSeasonal();
  renderActiveCats();
  setNearbyInfo();
  initWeather();
})();
