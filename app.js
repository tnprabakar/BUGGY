/* BUGGY — bilingual voice logbook / personal assistant
   All data stays on this device (IndexedDB, falling back to
   localStorage if IndexedDB is unavailable). Search calls Google's
   Custom Search API directly from this page using a key the user
   supplies in Settings; nothing passes through any server of ours. */

/* ---------------------------------------------------------------
   i18n
--------------------------------------------------------------- */
const STR = {
  en: {
    brand: "BUGGY",
    talk_eyebrow: "Voice log",
    talk_title: "Talk to BUGGY",
    mic_hint: "Tap and speak — English or Tamil",
    type_placeholder: "Or type here…",
    transcript_placeholder: "Your words will appear here…",
    detected_as: "Save as",
    type_note: "Note",
    type_reminder: "Reminder",
    type_search: "Search",
    remind_at: "Remind me at",
    discard: "Discard",
    save: "Save",
    recent: "Recent",
    notes_eyebrow: "Logbook",
    notes_title: "Notes",
    filter_notes: "Filter notes…",
    reminders_eyebrow: "Upcoming & past",
    reminders_title: "Reminders",
    done_eyebrow: "Done / past",
    search_eyebrow: "Internet lookup",
    search_title: "Search",
    search_placeholder: "Ask BUGGY anything…",
    go: "Go",
    search_log: "Past searches",
    prefs_eyebrow: "Configuration",
    prefs_title: "Settings",
    s_lang: "Language",
    s_lang_desc: "Interface and speech recognition language.",
    s_search: "Internet search",
    s_search_desc: "BUGGY uses Google's Programmable Search to answer “what is…” style questions. Get a free API key and Search Engine ID, then paste them below — they're stored only on this device.",
    s_apikey: "API key",
    s_cx: "Search engine ID (cx)",
    s_save: "Save",
    s_test: "Test",
    s_search_help: "Get these free at console.cloud.google.com (Custom Search API) and programmablesearchengine.google.com.",
    s_notif: "Reminder notifications",
    s_notif_desc: "BUGGY checks for due reminders while this page is open or installed. Allow notifications so it can alert you.",
    s_notif_allow: "Allow notifications",
    s_data: "Your data",
    s_data_desc: "Everything BUGGY saves stays in this browser, on this device. Nothing is sent to Claude or Anthropic.",
    s_export: "Copy all data as JSON",
    s_clear: "Erase all data",
    s_clear_confirm: "Erase everything? This can't be undone.",
    s_clear_yes: "Erase",
    cancel: "Cancel",
    s_install: "Install as an app",
    s_install_desc: "Open this page directly in your phone's browser (not inside a preview), then use “Add to Home Screen”. BUGGY will run full-screen like a regular app.",
    tab_talk: "Talk",
    tab_notes: "Notes",
    tab_reminders: "Remind",
    tab_search: "Search",
    tab_prefs: "Settings",
    empty_recent: "Nothing yet. Tap the mic or type something below.",
    empty_notes: "No notes yet.",
    empty_reminders_upcoming: "No upcoming reminders.",
    empty_reminders_past: "Nothing completed yet.",
    empty_search_log: "No searches yet.",
    empty_search_results: "Ask a question above to search the web.",
    mic_unsupported: "Voice input isn't supported in this browser — type below instead (on iPhone, try the mic on your keyboard).",
    mic_denied: "Microphone permission denied.",
    mic_noinput: "Didn't catch that — try again.",
    notif_unsupported: "Not supported on this browser.",
    notif_on: "Notifications are on.",
    notif_off: "Notifications are blocked — enable them in your browser's site settings.",
    notif_ask: "Not yet allowed.",
    search_nokey: "Add your search API key in Settings to enable live lookups.",
    searching: "Searching…",
    search_error: "Search failed",
    search_network_error: "Couldn't reach the search service — check your connection.",
    no_results: "No results found.",
    s_saved: "Saved.",
    testing: "Testing…",
    test_ok: "Working!",
    copied: "Copied!",
    welcome_note: "Welcome to BUGGY. Tap the mic and say something like “remind me to call the lab at 5pm” or “what is the capital of Tamil Nadu” — BUGGY will figure out whether to save it as a note, a reminder, or a search."
  },
  ta: {
    brand: "BUGGY",
    talk_eyebrow: "குரல் பதிவு",
    talk_title: "BUGGY-உடன் பேசுங்கள்",
    mic_hint: "தட்டி பேசுங்கள் — ஆங்கிலம் அல்லது தமிழ்",
    type_placeholder: "அல்லது இங்கே தட்டச்சு செய்யவும்…",
    transcript_placeholder: "உங்கள் வார்த்தைகள் இங்கே தோன்றும்…",
    detected_as: "இவ்வாறு சேமி",
    type_note: "குறிப்பு",
    type_reminder: "நினைவூட்டல்",
    type_search: "தேடல்",
    remind_at: "எப்போது நினைவூட்ட வேண்டும்",
    discard: "நீக்கு",
    save: "சேமி",
    recent: "சமீபத்தியவை",
    notes_eyebrow: "பதிவேடு",
    notes_title: "குறிப்புகள்",
    filter_notes: "குறிப்புகளை வடிகட்டவும்…",
    reminders_eyebrow: "வரவிருக்கும் & கடந்தவை",
    reminders_title: "நினைவூட்டல்கள்",
    done_eyebrow: "முடிந்தவை / கடந்தவை",
    search_eyebrow: "இணைய தேடல்",
    search_title: "தேடல்",
    search_placeholder: "BUGGY-யிடம் எதுவும் கேளுங்கள்…",
    go: "செல்",
    search_log: "முந்தைய தேடல்கள்",
    prefs_eyebrow: "அமைவடிவம்",
    prefs_title: "அமைப்புகள்",
    s_lang: "மொழி",
    s_lang_desc: "இடைமுகம் மற்றும் குரல் அடையாள மொழி.",
    s_search: "இணைய தேடல்",
    s_search_desc: "“என்ன” பாணி கேள்விகளுக்கு பதிலளிக்க BUGGY Google-இன் Programmable Search-ஐ பயன்படுத்துகிறது. இலவச API key மற்றும் Search Engine ID பெற்று கீழே ஒட்டவும் — அவை இந்த சாதனத்தில் மட்டுமே சேமிக்கப்படும்.",
    s_apikey: "API Key",
    s_cx: "தேடல் இன்ஜின் ID (cx)",
    s_save: "சேமி",
    s_test: "சோதி",
    s_search_help: "இவற்றை console.cloud.google.com (Custom Search API) மற்றும் programmablesearchengine.google.com-இல் இலவசமாக பெறலாம்.",
    s_notif: "நினைவூட்டல் அறிவிப்புகள்",
    s_notif_desc: "இந்தப் பக்கம் திறந்திருக்கும் போது BUGGY நினைவூட்டல்களை சரிபார்க்கும். அறிவிக்க அனுமதி கொடுங்கள்.",
    s_notif_allow: "அறிவிப்புகளை அனுமதி",
    s_data: "உங்கள் தரவு",
    s_data_desc: "BUGGY சேமிக்கும் அனைத்தும் இந்த உலாவியில், இந்த சாதனத்தில் மட்டுமே இருக்கும். எதுவும் Claude அல்லது Anthropic-க்கு அனுப்பப்படாது.",
    s_export: "அனைத்து தரவையும் JSON ஆக நகலெடு",
    s_clear: "அனைத்து தரவையும் அழி",
    s_clear_confirm: "அனைத்தையும் அழிக்கவா? இதை செயல்தவிர்க்க முடியாது.",
    s_clear_yes: "அழி",
    cancel: "ரத்துசெய்",
    s_install: "ஆப் ஆக நிறுவு",
    s_install_desc: "இந்தப் பக்கத்தை உங்கள் ஃபோனின் உலாவியில் நேரடியாகத் திறந்து, “Add to Home Screen” பயன்படுத்துங்கள். BUGGY ஒரு சாதாரண ஆப் போல முழுத்திரையில் இயங்கும்.",
    tab_talk: "பேசு",
    tab_notes: "குறிப்பு",
    tab_reminders: "நினைவூட்டு",
    tab_search: "தேடு",
    tab_prefs: "அமைப்பு",
    empty_recent: "இதுவரை எதுவும் இல்லை. மைக்-ஐ தட்டவும் அல்லது கீழே தட்டச்சு செய்யவும்.",
    empty_notes: "இன்னும் குறிப்புகள் இல்லை.",
    empty_reminders_upcoming: "வரவிருக்கும் நினைவூட்டல்கள் இல்லை.",
    empty_reminders_past: "இன்னும் எதுவும் முடிக்கப்படவில்லை.",
    empty_search_log: "இன்னும் தேடல்கள் இல்லை.",
    empty_search_results: "மேலே ஒரு கேள்வியைக் கேட்டு இணையத்தில் தேடுங்கள்.",
    mic_unsupported: "இந்த உலாவியில் குரல் உள்ளீடு இல்லை — கீழே தட்டச்சு செய்யுங்கள் (iPhone-இல் keyboard மைக் பயன்படுத்தலாம்).",
    mic_denied: "மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது.",
    mic_noinput: "கேட்கவில்லை — மீண்டும் முயற்சிக்கவும்.",
    notif_unsupported: "இந்த உலாவியில் ஆதரவு இல்லை.",
    notif_on: "அறிவிப்புகள் இயக்கத்தில் உள்ளன.",
    notif_off: "அறிவிப்புகள் தடுக்கப்பட்டுள்ளன — browser அமைப்புகளில் அனுமதிக்கவும்.",
    notif_ask: "இன்னும் அனுமதிக்கப்படவில்லை.",
    search_nokey: "இணைய தேடலுக்கு அமைப்புகளில் API key-ஐ சேர்க்கவும்.",
    searching: "தேடுகிறது…",
    search_error: "தேடல் தோல்வியடைந்தது",
    search_network_error: "தேடல் சேவையை அடைய முடியவில்லை — இணைப்பைச் சரிபார்க்கவும்.",
    no_results: "முடிவுகள் இல்லை.",
    s_saved: "சேமிக்கப்பட்டது.",
    testing: "சோதிக்கிறது…",
    test_ok: "வேலை செய்கிறது!",
    copied: "நகலெடுக்கப்பட்டது!",
    welcome_note: "BUGGY-க்கு வரவேற்பு. மைக்-ஐ தட்டி “5 மணிக்கு ஆய்வகத்திற்கு அழைக்க நினைவூட்டு” அல்லது “தமிழ்நாட்டின் தலைநகரம் என்ன” என்று சொல்லுங்கள் — அது குறிப்பா, நினைவூட்டலா, தேடலா என BUGGY தானே கண்டறியும்."
  }
};

/* ---------------------------------------------------------------
   Storage — IndexedDB with a localStorage fallback
--------------------------------------------------------------- */
const Store = (function(){
  let impl = null;
  let idbInstance = null;
  const LS_KEY = 'buggy_entries_fallback';
  let lsAutoId = 1;

  function lsRead(){
    try{ const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : []; }
    catch(e){ return []; }
  }
  function lsWrite(arr){
    try{ localStorage.setItem(LS_KEY, JSON.stringify(arr)); }catch(e){}
  }

  function openIdb(){
    return new Promise((resolve, reject)=>{
      if(!('indexedDB' in window)){ reject(new Error('no-idb')); return; }
      let req;
      try{ req = indexedDB.open('buggy-db', 1); }catch(e){ reject(e); return; }
      req.onupgradeneeded = (e)=>{
        const db = e.target.result;
        if(!db.objectStoreNames.contains('entries')){
          const os = db.createObjectStore('entries', {keyPath:'id', autoIncrement:true});
          os.createIndex('type', 'type');
          os.createIndex('dueAt', 'dueAt');
        }
      };
      req.onsuccess = ()=>resolve(req.result);
      req.onerror = ()=>reject(req.error);
      req.onblocked = ()=>reject(new Error('blocked'));
    });
  }

  async function init(){
    try{
      idbInstance = await openIdb();
      impl = 'idb';
    }catch(e){
      impl = 'ls';
      const arr = lsRead();
      lsAutoId = arr.reduce((m,x)=>Math.max(m, x.id||0), 0) + 1;
    }
  }

  function tx(storeMode){
    return idbInstance.transaction('entries', storeMode).objectStore('entries');
  }

  async function add(entry){
    if(impl==='idb'){
      return new Promise((res,rej)=>{
        const r = tx('readwrite').add(entry);
        r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error);
      });
    }
    entry = Object.assign({id: lsAutoId++}, entry);
    const arr = lsRead(); arr.push(entry); lsWrite(arr);
    return entry.id;
  }

  async function put(entry){
    if(impl==='idb'){
      return new Promise((res,rej)=>{
        const r = tx('readwrite').put(entry);
        r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error);
      });
    }
    const arr = lsRead();
    const idx = arr.findIndex(x=>x.id===entry.id);
    if(idx>=0) arr[idx]=entry; else arr.push(entry);
    lsWrite(arr);
    return entry.id;
  }

  async function remove(id){
    if(impl==='idb'){
      return new Promise((res,rej)=>{
        const r = tx('readwrite').delete(id);
        r.onsuccess=()=>res(); r.onerror=()=>rej(r.error);
      });
    }
    lsWrite(lsRead().filter(x=>x.id!==id));
  }

  async function all(){
    if(impl==='idb'){
      return new Promise((res,rej)=>{
        const r = tx('readonly').getAll();
        r.onsuccess=()=>res(r.result||[]); r.onerror=()=>rej(r.error);
      });
    }
    return lsRead();
  }

  async function clear(){
    if(impl==='idb'){
      return new Promise((res,rej)=>{
        const r = tx('readwrite').clear();
        r.onsuccess=()=>res(); r.onerror=()=>rej(r.error);
      });
    }
    lsWrite([]);
  }

  return { init, add, put, remove, all, clear };
})();

/* ---------------------------------------------------------------
   State
--------------------------------------------------------------- */
let currentLang = 'en';
let ENTRIES = [];
let recognition = null;
let isListening = false;
let pendingType = null;
let pendingWhen = null;

/* ---------------------------------------------------------------
   Helpers
--------------------------------------------------------------- */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function fmtDateTime(d){
  try{ return new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date(d)); }
  catch(e){ return String(d); }
}
function toLocalInputValue(d){
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function defaultWhen(){
  return new Date(Date.now() + 60*60*1000);
}

/* ---------------------------------------------------------------
   Intent detection + lightweight date/time parsing
   (heuristic only — the confirm card always lets the person fix
   the type, text and time before anything is saved)
--------------------------------------------------------------- */
function detectIntent(raw){
  const text = raw.trim();
  const reminderRe_en = /\b(remind|reminder|don'?t let me forget|do not forget)\b/i;
  const reminderRe_ta = /(நினைவூட்|ஞாபக)/;
  const searchRe_en = /^(what('?s| is)|who('?s| is)|where is|when is|how (many|much|far|long|old)|tell me about|search( for)?|look up|define|google)\b/i;
  // Tamil questions usually put the question word at the END of the
  // sentence ("...தலைநகரம் என்ன" = "...capital [is] what"), so this
  // isn't anchored to the start the way the English pattern is.
  const searchRe_ta = /(என்ன|யாரு|யார்|எங்கே|எப்போது|தேடு|விளக்கு|கூகிள்)/;

  let type = 'note';
  if(reminderRe_en.test(text) || reminderRe_ta.test(text)) type = 'reminder';
  else if(searchRe_en.test(text) || searchRe_ta.test(text)) type = 'search';

  if(type==='reminder'){
    const {task, when} = extractReminder(text);
    return {type, text: task || text, when};
  }
  if(type==='search'){
    return {type, text: stripSearchCue(text)};
  }
  return {type:'note', text};
}

function stripSearchCue(text){
  const cue = /^(what('?s| is)|who('?s| is)|where is|when is|how (many|much|far|long|old)|tell me about|search( for)?|look up|define|google|என்ன|யார்|எங்கே|எப்போது|தேடு|விளக்கு|கூகிள்)\s*/i;
  const stripped = text.replace(cue, '').trim();
  return stripped || text;
}

function extractReminder(text){
  let t = text.replace(/^(please\s+)?(can you\s+)?(remind me|set a reminder|reminder)\s*(to|that|about)?\s*/i, '');
  t = t.replace(/^(நீ\s+)?(எனக்கு\s+)?(நினைவூட்டு|ஞாபகப்படுத்து)\s*/, '');
  const when = parseWhen(t) || parseWhen(text);
  let task = stripTimePhrases(t).trim();
  if(!task) task = t.trim() || text.trim();
  return {task, when: when || defaultWhen()};
}

function parseWhen(text){
  const now = new Date();
  const low = text.toLowerCase();

  let m = low.match(/\bin\s+(\d+)\s*(minute|minutes|min|mins|hour|hours|hr|hrs|day|days)\b/);
  if(m){
    const n = parseInt(m[1],10);
    const unit = m[2];
    const d = new Date(now);
    if(unit.indexOf('min')===0) d.setMinutes(d.getMinutes()+n);
    else if(unit.indexOf('hour')===0 || unit.indexOf('hr')===0) d.setHours(d.getHours()+n);
    else d.setDate(d.getDate()+n);
    return d;
  }

  m = text.match(/(\d+)\s*(நிமிடத்தில்|மணி நேரத்தில்|மணிநேரத்தில்|நாளில்)/);
  if(m){
    const n = parseInt(m[1],10);
    const unit = m[2];
    const d = new Date(now);
    if(unit.indexOf('நிமிட')===0) d.setMinutes(d.getMinutes()+n);
    else if(unit.indexOf('மணி')===0) d.setHours(d.getHours()+n);
    else d.setDate(d.getDate()+n);
    return d;
  }

  let base = new Date(now);
  let dayMatched = false;
  if(/\btomorrow\b/.test(low) || /நாளை/.test(text)){
    base.setDate(base.getDate()+1); dayMatched = true;
  } else if(/\btonight\b/.test(low)){
    dayMatched = true;
  } else {
    const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    for(let i=0;i<weekdays.length;i++){
      if(low.indexOf(weekdays[i])!==-1){
        let diff = (i - base.getDay() + 7) % 7;
        if(diff===0) diff = 7;
        base.setDate(base.getDate()+diff);
        dayMatched = true; break;
      }
    }
  }

  let timeMatched = false;
  let tm = low.match(/\b(at\s+)?(\d{1,2})(:(\d{2}))?\s*(am|pm)?\b/);
  if(tm && (tm[1] || tm[5])){
    let hh = parseInt(tm[2],10);
    const mm = tm[4] ? parseInt(tm[4],10) : 0;
    const ampm = tm[5];
    if(ampm==='pm' && hh<12) hh += 12;
    if(ampm==='am' && hh===12) hh = 0;
    base.setHours(hh, mm, 0, 0);
    timeMatched = true;
  } else {
    const tmT = text.match(/(\d{1,2})(?:[:.](\d{2}))?\s*மணிக்கு/);
    if(tmT){
      const hh = parseInt(tmT[1],10);
      const mm = tmT[2] ? parseInt(tmT[2],10) : 0;
      base.setHours(hh, mm, 0, 0);
      timeMatched = true;
    }
  }

  if(!timeMatched){
    if(/\btonight\b/.test(low)) base.setHours(20,0,0,0);
    else if(dayMatched) base.setHours(9,0,0,0);
    else return null;
  }

  if(!dayMatched && timeMatched && base.getTime() <= now.getTime()){
    base.setDate(base.getDate()+1);
  }

  return base;
}

function stripTimePhrases(t){
  return t
    .replace(/\bin\s+\d+\s*(minute|minutes|min|mins|hour|hours|hr|hrs|day|days)\b/gi,'')
    .replace(/\d+\s*(நிமிடத்தில்|மணி நேரத்தில்|மணிநேரத்தில்|நாளில்)/g,'')
    .replace(/\btomorrow\b/gi,'')
    .replace(/நாளை/g,'')
    .replace(/\btonight\b/gi,'')
    .replace(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/gi,'')
    .replace(/\b(at\s+)?\d{1,2}(:\d{2})?\s*(am|pm)\b/gi,'')
    .replace(/\d{1,2}(?:[:.]\d{2})?\s*மணிக்கு/g,'')
    .replace(/\s{2,}/g,' ')
    .trim();
}

/* ---------------------------------------------------------------
   i18n application
--------------------------------------------------------------- */
function applyLang(lang){
  document.querySelectorAll('[data-t]').forEach(el=>{
    const k = el.getAttribute('data-t');
    if(STR[lang][k]!=null) el.textContent = STR[lang][k];
  });
  document.querySelectorAll('[data-t-placeholder]').forEach(el=>{
    const k = el.getAttribute('data-t-placeholder');
    if(STR[lang][k]!=null) el.placeholder = STR[lang][k];
  });
  document.body.setAttribute('data-lang', lang);
  document.documentElement.lang = lang;
  document.getElementById('transcript').setAttribute('data-placeholder', STR[lang].transcript_placeholder);
}

function setLang(lang){
  currentLang = lang;
  try{ localStorage.setItem('buggy_lang', lang); }catch(e){}
  applyLang(lang);
  document.getElementById('langToggle').textContent = lang==='ta' ? 'த' : 'EN';
  document.querySelectorAll('#prefLangToggle .toggle-opt').forEach(b=>{
    b.setAttribute('aria-pressed', b.getAttribute('data-lang')===lang ? 'true' : 'false');
  });
  if(recognition) recognition.lang = lang==='ta' ? 'ta-IN' : 'en-IN';
  renderAll();
  updateNotifStatus();
}

/* ---------------------------------------------------------------
   Rendering
--------------------------------------------------------------- */
function entryRow(e){
  const timeStr = e.type==='reminder' ? fmtDateTime(e.dueAt) : fmtDateTime(e.createdAt);
  const badgeLabel = STR[currentLang]['type_'+e.type] || e.type;
  const overdue = e.type==='reminder' && !e.completed && new Date(e.dueAt).getTime() < Date.now();
  const cls = 'entry' + (e.completed ? ' done' : '') + (overdue ? ' overdue' : '');
  const actions = [];
  if(e.type==='reminder' && !e.completed){
    actions.push(`<button class="icon-btn" data-action="complete" data-id="${e.id}" aria-label="Complete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></button>`);
  }
  actions.push(`<button class="icon-btn" data-action="delete" data-id="${e.id}" aria-label="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg></button>`);
  return `<div class="${cls}" data-id="${e.id}">
    <div class="entry-body">
      <div class="entry-meta"><span class="badge ${e.type}">${badgeLabel}</span><span class="entry-time mono">${timeStr}</span></div>
      <div class="entry-text">${escapeHtml(e.text)}</div>
    </div>
    <div class="entry-actions">${actions.join('')}</div>
  </div>`;
}
function emptyState(key){ return `<div class="empty-state">${STR[currentLang][key]}</div>`; }

function renderRecentFeed(){
  const el = document.getElementById('recentFeed');
  const items = ENTRIES.slice(0,8);
  el.innerHTML = items.length ? items.map(entryRow).join('') : emptyState('empty_recent');
}
function renderNotesFeed(){
  const el = document.getElementById('notesFeed');
  const filterVal = (document.getElementById('notesFilter').value||'').toLowerCase();
  let items = ENTRIES.filter(e=>e.type==='note');
  if(filterVal) items = items.filter(e=>e.text.toLowerCase().includes(filterVal));
  el.innerHTML = items.length ? items.map(entryRow).join('') : emptyState('empty_notes');
}
function renderReminders(){
  const upEl = document.getElementById('upcomingFeed');
  const pastEl = document.getElementById('pastFeed');
  const reminders = ENTRIES.filter(e=>e.type==='reminder');
  const upcoming = reminders.filter(e=>!e.completed).sort((a,b)=> new Date(a.dueAt)-new Date(b.dueAt));
  const past = reminders.filter(e=>e.completed).sort((a,b)=> new Date(b.dueAt)-new Date(a.dueAt));
  upEl.innerHTML = upcoming.length ? upcoming.map(entryRow).join('') : emptyState('empty_reminders_upcoming');
  pastEl.innerHTML = past.length ? past.map(entryRow).join('') : emptyState('empty_reminders_past');
}
function renderSearchLog(){
  const el = document.getElementById('searchLogFeed');
  const items = ENTRIES.filter(e=>e.type==='search').slice(0,15);
  el.innerHTML = items.length ? items.map(entryRow).join('') : emptyState('empty_search_log');
}
function updateTabCounts(){
  const dueCount = ENTRIES.filter(e=>e.type==='reminder' && !e.completed && new Date(e.dueAt).getTime()<=Date.now()).length;
  const tabRem = document.querySelector('.tab[data-view="reminders"]');
  tabRem.style.position = 'relative';
  let badge = tabRem.querySelector('.tab-count');
  if(dueCount>0){
    if(!badge){ badge = document.createElement('span'); badge.className='tab-count'; tabRem.appendChild(badge); }
    badge.textContent = dueCount>9 ? '9+' : String(dueCount);
  } else if(badge){ badge.remove(); }
}
function renderAll(){
  renderRecentFeed();
  renderNotesFeed();
  renderReminders();
  renderSearchLog();
  updateTabCounts();
}
async function refreshEntries(){
  ENTRIES = await Store.all();
  ENTRIES.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
  renderAll();
}

/* ---------------------------------------------------------------
   View / tab routing
--------------------------------------------------------------- */
const VIEWS = ['talk','notes','reminders','search','prefs'];
function showView(name){
  if(!VIEWS.includes(name)) name = 'talk';
  VIEWS.forEach(v=>{ document.getElementById('view-'+v).hidden = (v!==name); });
  document.querySelectorAll('.tab').forEach(t=>{
    t.setAttribute('aria-current', t.getAttribute('data-view')===name ? 'true' : 'false');
  });
  if(name==='notes') renderNotesFeed();
  if(name==='reminders') renderReminders();
  if(name==='search') renderSearchLog();
}
document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click', ()=>{
    const v = t.getAttribute('data-view');
    location.hash = v==='talk' ? '' : '#'+v;
    showView(v);
  });
});
window.addEventListener('hashchange', ()=>{
  showView((location.hash||'').replace('#','') || 'talk');
});

/* ---------------------------------------------------------------
   Speech recognition
--------------------------------------------------------------- */
function showMicHint(text){
  document.getElementById('micHint').textContent = text;
  setTimeout(()=>{ document.getElementById('micHint').textContent = STR[currentLang].mic_hint; }, 3500);
}
function startListeningUI(){
  isListening = true;
  document.getElementById('micBtn').classList.add('listening');
  document.getElementById('signalDot').classList.add('live');
  document.getElementById('transcript').textContent = '';
}
function stopListeningUI(){
  isListening = false;
  document.getElementById('micBtn').classList.remove('listening');
  document.getElementById('signalDot').classList.remove('live');
}
function setupRecognition(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){
    document.getElementById('micBtn').style.display = 'none';
    document.getElementById('micHint').textContent = STR[currentLang].mic_unsupported;
    return;
  }
  recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.lang = currentLang==='ta' ? 'ta-IN' : 'en-IN';
  recognition.onresult = (e)=>{
    let interim='', final='';
    for(let i=e.resultIndex;i<e.results.length;i++){
      const part = e.results[i][0].transcript;
      if(e.results[i].isFinal) final += part; else interim += part;
    }
    document.getElementById('transcript').textContent = (final+interim).trim();
    if(final.trim()) onTranscriptFinal(final.trim());
  };
  recognition.onerror = (e)=>{
    stopListeningUI();
    if(e.error==='not-allowed' || e.error==='service-not-allowed') showMicHint(STR[currentLang].mic_denied);
    else if(e.error==='no-speech') showMicHint(STR[currentLang].mic_noinput);
  };
  recognition.onend = stopListeningUI;
}
function onTranscriptFinal(text){
  stopListeningUI();
  try{ recognition.stop(); }catch(e){}
  openConfirm(text);
}
document.getElementById('micBtn').addEventListener('click', ()=>{
  if(!recognition) return;
  if(isListening){ recognition.stop(); return; }
  try{ recognition.start(); startListeningUI(); }catch(e){}
});

/* ---------------------------------------------------------------
   Confirm card
--------------------------------------------------------------- */
function setBadgeSelected(type){
  document.querySelectorAll('#badgeSelect .badge-opt').forEach(b=>{
    b.setAttribute('aria-pressed', b.getAttribute('data-type')===type ? 'true' : 'false');
  });
}
function toggleWhenField(type){
  document.getElementById('confirmWhenWrap').hidden = (type!=='reminder');
}
function openConfirm(rawText){
  if(!rawText || !rawText.trim()) return;
  const detected = detectIntent(rawText);
  pendingType = detected.type;
  pendingWhen = detected.when || null;
  document.getElementById('confirmText').value = detected.text;
  document.getElementById('confirmCard').hidden = false;
  setBadgeSelected(pendingType);
  toggleWhenField(pendingType);
  if(pendingType==='reminder'){
    document.getElementById('confirmWhen').value = toLocalInputValue(pendingWhen || defaultWhen());
  }
  document.getElementById('confirmCard').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeConfirm(){
  document.getElementById('confirmCard').hidden = true;
  document.getElementById('transcript').textContent = '';
  document.getElementById('typeBox').value = '';
  pendingType = null; pendingWhen = null;
}
document.querySelectorAll('#badgeSelect .badge-opt').forEach(b=>{
  b.addEventListener('click', ()=>{
    pendingType = b.getAttribute('data-type');
    setBadgeSelected(pendingType);
    toggleWhenField(pendingType);
    if(pendingType==='reminder' && !document.getElementById('confirmWhen').value){
      document.getElementById('confirmWhen').value = toLocalInputValue(pendingWhen || defaultWhen());
    }
  });
});
document.getElementById('discardBtn').addEventListener('click', closeConfirm);
document.getElementById('saveBtn').addEventListener('click', async ()=>{
  const text = document.getElementById('confirmText').value.trim();
  if(!text) return;
  if(pendingType==='search'){
    closeConfirm();
    showView('search'); location.hash='#search';
    document.getElementById('searchInput').value = text;
    await runSearch(text, true);
    return;
  }
  const entry = {
    type: pendingType, text, lang: currentLang,
    createdAt: new Date().toISOString(),
    dueAt: null, completed:false, notified:false, results:null
  };
  if(pendingType==='reminder'){
    const whenVal = document.getElementById('confirmWhen').value;
    const d = whenVal ? new Date(whenVal) : defaultWhen();
    entry.dueAt = d.toISOString();
    ensureNotificationPermission();
  }
  await Store.add(entry);
  await refreshEntries();
  closeConfirm();
});

document.getElementById('sendBtn').addEventListener('click', ()=>{
  const v = document.getElementById('typeBox').value;
  if(v.trim()) openConfirm(v.trim());
});
document.getElementById('typeBox').addEventListener('keydown', (e)=>{
  if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); document.getElementById('sendBtn').click(); }
});

/* ---------------------------------------------------------------
   Entry list actions (delegated)
--------------------------------------------------------------- */
document.body.addEventListener('click', async (ev)=>{
  const actionBtn = ev.target.closest('[data-action]');
  if(actionBtn){
    const id = Number(actionBtn.getAttribute('data-id'));
    const action = actionBtn.getAttribute('data-action');
    const entry = ENTRIES.find(e=>e.id===id);
    if(!entry) return;
    if(action==='delete'){ await Store.remove(id); await refreshEntries(); }
    else if(action==='complete'){ entry.completed = true; await Store.put(entry); await refreshEntries(); }
    return;
  }
  const row = ev.target.closest('.entry');
  if(row){
    const id = Number(row.getAttribute('data-id'));
    const entry = ENTRIES.find(e=>e.id===id);
    if(entry && entry.type==='search'){
      location.hash = '#search'; showView('search');
      document.getElementById('searchInput').value = entry.text;
      const resultsEl = document.getElementById('searchResults');
      if(entry.results && entry.results.length){
        resultsEl.innerHTML = entry.results.map(it=>`
          <div class="result-card">
            <a href="${escapeHtml(it.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(it.title)}</a>
            <div class="result-snippet">${escapeHtml(it.snippet||'')}</div>
          </div>`).join('');
      }
    }
  }
});
document.getElementById('notesFilter').addEventListener('input', renderNotesFeed);

/* ---------------------------------------------------------------
   Reminders / notifications
--------------------------------------------------------------- */
function ensureNotificationPermission(){
  if(!('Notification' in window)) return;
  if(Notification.permission==='default') Notification.requestPermission().then(updateNotifStatus);
}
function updateNotifStatus(){
  const el = document.getElementById('notifStatus');
  if(!('Notification' in window)){ el.innerHTML = `<span class="status-dot bad"></span>${STR[currentLang].notif_unsupported}`; return; }
  const p = Notification.permission;
  if(p==='granted') el.innerHTML = `<span class="status-dot ok"></span>${STR[currentLang].notif_on}`;
  else if(p==='denied') el.innerHTML = `<span class="status-dot bad"></span>${STR[currentLang].notif_off}`;
  else el.innerHTML = `<span class="status-dot"></span>${STR[currentLang].notif_ask}`;
}
document.getElementById('notifPermBtn').addEventListener('click', ()=>{
  if('Notification' in window) Notification.requestPermission().then(updateNotifStatus);
});
async function checkDueReminders(){
  const now = Date.now();
  let changed = false;
  for(const e of ENTRIES){
    if(e.type==='reminder' && !e.completed && !e.notified && new Date(e.dueAt).getTime()<=now){
      e.notified = true;
      await Store.put(e);
      changed = true;
      fireNotification(e);
    }
  }
  if(changed) await refreshEntries();
  updateTabCounts();
}
function fireNotification(e){
  const label = currentLang==='ta' ? 'BUGGY நினைவூட்டல்' : 'BUGGY reminder';
  try{
    if('Notification' in window && Notification.permission==='granted') new Notification(label, {body:e.text});
  }catch(err){}
  showDueBanner(e);
}
function showDueBanner(e){
  const el = document.getElementById('dueBanner');
  const div = document.createElement('div');
  div.className = 'banner';
  div.textContent = '⏰ ' + e.text;
  el.appendChild(div);
  setTimeout(()=>div.remove(), 12000);
}
setInterval(checkDueReminders, 20000);

/* ---------------------------------------------------------------
   Search (Google Custom Search JSON API)
--------------------------------------------------------------- */
function getSearchConfig(){
  try{ return { key: localStorage.getItem('buggy_api_key')||'', cx: localStorage.getItem('buggy_cx')||'' }; }
  catch(e){ return {key:'',cx:''}; }
}
function setSearchConfig(key,cx){
  try{ localStorage.setItem('buggy_api_key', key); localStorage.setItem('buggy_cx', cx); }catch(e){}
}
async function runSearch(query, logIt){
  const statusEl = document.getElementById('searchStatus');
  const resultsEl = document.getElementById('searchResults');
  const {key,cx} = getSearchConfig();
  if(!key || !cx){
    statusEl.innerHTML = `<div class="banner warn">${STR[currentLang].search_nokey}</div>`;
    return;
  }
  statusEl.innerHTML = `<div class="banner">${STR[currentLang].searching}</div>`;
  resultsEl.innerHTML = '';
  try{
    const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(key)}&cx=${encodeURIComponent(cx)}&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    if(!res.ok){
      const msg = (data && data.error && data.error.message) || res.status;
      statusEl.innerHTML = `<div class="banner warn">${STR[currentLang].search_error}: ${escapeHtml(String(msg))}</div>`;
      return;
    }
    statusEl.innerHTML = '';
    const items = (data.items||[]).slice(0,6);
    resultsEl.innerHTML = items.length ? items.map(it=>`
        <div class="result-card">
          <a href="${escapeHtml(it.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(it.title)}</a>
          <div class="result-snippet">${escapeHtml(it.snippet||'')}</div>
          <div class="result-src">${escapeHtml(it.displayLink||'')}</div>
        </div>`).join('') : emptyState('no_results');
    if(logIt){
      await Store.add({
        type:'search', text:query, lang:currentLang,
        createdAt: new Date().toISOString(), dueAt:null, completed:false, notified:false,
        results: items.slice(0,3).map(it=>({title:it.title, link:it.link, snippet:it.snippet}))
      });
      await refreshEntries();
    }
  }catch(err){
    statusEl.innerHTML = `<div class="banner warn">${STR[currentLang].search_network_error}</div>`;
  }
}
document.getElementById('searchGoBtn').addEventListener('click', ()=>{
  const v = document.getElementById('searchInput').value.trim();
  if(v) runSearch(v, true);
});
document.getElementById('searchInput').addEventListener('keydown', e=>{
  if(e.key==='Enter'){ e.preventDefault(); document.getElementById('searchGoBtn').click(); }
});

/* ---------------------------------------------------------------
   Settings
--------------------------------------------------------------- */
function loadKeysIntoForm(){
  const {key,cx} = getSearchConfig();
  document.getElementById('apiKeyInput').value = key;
  document.getElementById('cxInput').value = cx;
}
document.getElementById('saveKeysBtn').addEventListener('click', ()=>{
  setSearchConfig(document.getElementById('apiKeyInput').value.trim(), document.getElementById('cxInput').value.trim());
  const el = document.getElementById('keyStatus');
  el.innerHTML = `<span class="status-dot ok"></span>${STR[currentLang].s_saved}`;
  setTimeout(()=>{ el.innerHTML=''; }, 2500);
});
document.getElementById('testKeysBtn').addEventListener('click', async ()=>{
  const statusEl = document.getElementById('keyStatus');
  statusEl.innerHTML = `<span class="status-dot"></span>${STR[currentLang].testing}`;
  const {key,cx} = getSearchConfig();
  if(!key || !cx){ statusEl.innerHTML = `<span class="status-dot bad"></span>${STR[currentLang].search_nokey}`; return; }
  try{
    const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(key)}&cx=${encodeURIComponent(cx)}&q=test`;
    const res = await fetch(url);
    const data = await res.json();
    if(res.ok) statusEl.innerHTML = `<span class="status-dot ok"></span>${STR[currentLang].test_ok}`;
    else{
      const msg = (data && data.error && data.error.message) || res.status;
      statusEl.innerHTML = `<span class="status-dot bad"></span>${escapeHtml(String(msg))}`;
    }
  }catch(e){ statusEl.innerHTML = `<span class="status-dot bad"></span>${STR[currentLang].search_network_error}`; }
});

document.getElementById('exportBtn').addEventListener('click', async ()=>{
  const data = JSON.stringify(ENTRIES, null, 2);
  const box = document.getElementById('exportBox');
  box.hidden = false;
  box.value = data;
  const btn = document.getElementById('exportBtn');
  const old = btn.textContent;
  try{
    await navigator.clipboard.writeText(data);
    btn.textContent = STR[currentLang].copied;
  }catch(e){
    box.focus(); box.select();
  }
  setTimeout(()=>{ btn.textContent = old; }, 1800);
});
document.getElementById('clearBtn').addEventListener('click', ()=>{ document.getElementById('clearConfirm').hidden = false; });
document.getElementById('clearNoBtn').addEventListener('click', ()=>{ document.getElementById('clearConfirm').hidden = true; });
document.getElementById('clearYesBtn').addEventListener('click', async ()=>{
  await Store.clear();
  document.getElementById('clearConfirm').hidden = true;
  document.getElementById('exportBox').hidden = true;
  await refreshEntries();
});

document.getElementById('langToggle').addEventListener('click', ()=> setLang(currentLang==='en' ? 'ta' : 'en'));
document.querySelectorAll('#prefLangToggle .toggle-opt').forEach(b=>{
  b.addEventListener('click', ()=> setLang(b.getAttribute('data-lang')));
});

function applyTheme(mode){
  if(mode) document.documentElement.setAttribute('data-theme', mode);
  else document.documentElement.removeAttribute('data-theme');
  try{ if(mode) localStorage.setItem('buggy_theme', mode); else localStorage.removeItem('buggy_theme'); }catch(e){}
}
document.getElementById('themeToggle').addEventListener('click', ()=>{
  const cur = document.documentElement.getAttribute('data-theme');
  applyTheme(cur==='dark' ? 'light' : cur==='light' ? null : 'dark');
});

/* ---------------------------------------------------------------
   Init
--------------------------------------------------------------- */
async function seedWelcomeIfEmpty(){
  const all = await Store.all();
  if(all.length===0){
    await Store.add({
      type:'note', text: STR[currentLang].welcome_note, lang: currentLang,
      createdAt: new Date().toISOString(), dueAt:null, completed:false, notified:false, results:null
    });
  }
}
function registerServiceWorker(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  }
}
async function init(){
  await Store.init();
  try{ currentLang = localStorage.getItem('buggy_lang') || 'en'; }catch(e){}
  try{ const t = localStorage.getItem('buggy_theme'); if(t) document.documentElement.setAttribute('data-theme', t); }catch(e){}
  setupRecognition();
  setLang(currentLang);
  loadKeysIntoForm();
  updateNotifStatus();
  await seedWelcomeIfEmpty();
  await refreshEntries();
  showView((location.hash||'').replace('#','') || 'talk');
  setTimeout(checkDueReminders, 1500);
  registerServiceWorker();
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', init);
}else{
  init();
}
