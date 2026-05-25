// ============================================
// لوحة تحكم المعلمة رشا - نسخة Supabase
// ============================================

const ADMIN_PASSWORD = "art2026";
const STORAGE_KEY = "art_portfolio_content";

// ── Supabase config (تُعبَّأ عند الإعداد) ──
let SUPABASE_URL = "";
let SUPABASE_ANON_KEY = "";
let supabaseConfigured = false;

function initSupabase() {
  const cfg = loadSupabaseConfig();
  if (cfg && cfg.url && cfg.key) {
    SUPABASE_URL = cfg.url;
    SUPABASE_ANON_KEY = cfg.key;
    supabaseConfigured = true;
  }
}

function loadSupabaseConfig() {
  try {
    const raw = localStorage.getItem("supabase_config");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveSupabaseConfig(url, key) {
  localStorage.setItem("supabase_config", JSON.stringify({ url, key }));
  SUPABASE_URL = url;
  SUPABASE_ANON_KEY = key;
  supabaseConfigured = true;
}

// ── Supabase REST helpers ──
async function sbGet(table, eq = {}) {
  let url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
  for (const [k, v] of Object.entries(eq)) url += `&${k}=eq.${encodeURIComponent(v)}`;
  const r = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sbUpsert(table, data) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.status === 204 ? {} : r.json();
}

async function sbUploadFile(bucket, path, file) {
  const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": file.type,
      "x-upsert": "true",
    },
    body: file,
  });
  if (!r.ok) throw new Error(await r.text());
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

// ── Cloud load / save ──
async function loadFromCloud() {
  if (!supabaseConfigured) return null;
  try {
    const rows = await sbGet("site_content", { key: "main" });
    if (rows && rows.length > 0) return rows[0].value;
  } catch (e) { console.warn("Supabase load error:", e); }
  return null;
}

async function saveToCloud(content) {
  if (!supabaseConfigured) return false;
  try {
    await sbUpsert("site_content", { key: "main", value: content });
    return true;
  } catch (e) {
    console.warn("Supabase save error:", e);
    return false;
  }
}

// ── المحتوى الافتراضي ──
const DEFAULT_CONTENT = {
  "1-1": { title: "تجسيد الاهتمام بالثقافة وتقديرها", description: "في هذه الكفاءة، عملت على دمج الثقافة الإماراتية والقيم الوطنية في حصص التربية الفنية من خلال أنشطة فنية تعكس التراث المحلي، مثل: رسم العمارة التراثية، تصميم الزخارف الإسلامية، وأعمال فنية مستوحاة من تراث الإمارات.", images: [], videos: [], files: [] },
  "1-2": { title: "دعم الرعاية والصحة النفسية", description: "تم العمل على دعم الصحة النفسية للطلاب من خلال جلسات فنية معبّرة، حيث استخدمت الفن كوسيلة للتعبير عن المشاعر، وقدمت أنشطة فن العلاج (Art Therapy) لمساعدة الطلاب على التعامل مع الضغوط.", images: [], videos: [], files: [] },
  "1-3": { title: "ترسيخ الأخلاق المهنية", description: "التزام كامل بأخلاقيات المهنة من خلال الانضباط، المراسلات الرسمية، احترام السرية، والالتزام بالسياسات المدرسية. توثيق كامل للأعمال والممارسات المهنية.", images: [], videos: [], files: [] },
  "2-1": { title: "دمج الخبرة التخصصية في المناهج", description: "دمج خبرتي التخصصية في الفنون التشكيلية ضمن المناهج الدراسية، وتطوير خطط دروس متكاملة تعكس عمق المحتوى الفني، مع ربط الفن بالمواد الأخرى.", images: [], videos: [], files: [] },
  "2-2": { title: "تطبيق الممارسات التربوية", description: "تطبيق ممارسات تربوية متنوعة في حصص التربية الفنية، تشمل التعلم القائم على المشاريع، التعلم التعاوني، والتعلم النشط من خلال ورش فنية تفاعلية.", images: [], videos: [], files: [] },
  "2-3": { title: "توظيف ممارسات التقويم الفعّالة", description: "توظيف أساليب تقويم متعددة في التربية الفنية تشمل: التقييم القبلي للمهارات، التقييم البنائي خلال إنجاز العمل الفني، التقييم الختامي للناتج، واستخدام Rubrics متخصصة للأعمال الفنية.", images: [], videos: [], files: [] },
  "2-4": { title: "تبني التعلم مدى الحياة والبحث المهني", description: "المشاركة المستمرة في الدورات التدريبية والتطوير المهني في مجال التربية الفنية، وتطبيق المعارف المكتسبة داخل الصف، وإجراء بحوث إجرائية لتحسين الممارسة.", images: [], videos: [], files: [] },
  "2-5": { title: "توظيف استراتيجيات التدريس المتمايز", description: "تصميم أنشطة فنية متمايزة تراعي الفروق الفردية بين الطلاب، وتقدم تحديات مناسبة لكل مستوى، مع توفير دعم خاص للطلاب الموهوبين وذوي الاحتياجات الخاصة.", images: [], videos: [], files: [] },
  "3-1": { title: "تمكين الجاهزية للمستقبل", description: "تنمية مهارات القرن الـ 21 لدى الطلاب من خلال مشاريع فنية تتطلب التفكير الناقد، حل المشكلات الإبداعي، التواصل البصري، والتعاون.", images: [], videos: [], files: [] },
  "3-2": { title: "توظيف الابتكار التربوي والتكنولوجي", description: "توظيف التكنولوجيا في حصص التربية الفنية من خلال: الفن الرقمي، تطبيقات الرسم، استخدام الذكاء الاصطناعي في الفن، وعرض الأعمال على المنصات الرقمية.", images: [], videos: [], files: [] },
  "3-3": { title: "غرس ثقافة متوازنة محلياً وعالمياً", description: "أعمال فنية تعكس الهوية الإماراتية في سياق عالمي، ومشاريع تعاونية تربط الفن المحلي بالفن العالمي.", images: [], videos: [], files: [] },
  "4-1": { title: "بناء مجتمعات تعلم مهنية", description: "المشاركة الفعّالة في مجتمعات التعلم المهنية، تبادل الخبرات مع زملاء التخصص، وقيادة مبادرات لتطوير تدريس التربية الفنية.", images: [], videos: [], files: [] },
  "4-2": { title: "تعزيز الشراكات مع أولياء الأمور", description: "تعزيز التواصل مع أولياء الأمور من خلال معارض فنية مدرسية، ورش فنية مشتركة، وتقارير دورية عن تطور المهارات الفنية للطلاب.", images: [], videos: [], files: [] },
  "obj-1": { title: "تعزيز الهوية الوطنية", description: "تنفيذ أنشطة فنية وطنية بمناسبة اليوم الوطني، يوم العلم، وأعياد الإمارات. مشاركة أكثر من 80% من طلاب المادة في إنتاج أعمال فنية تعكس الهوية الإماراتية.", images: [], videos: [], files: [] },
  "obj-2": { title: "نسبة قياس الرضا عن المعلم", description: "تطبيق استبانات لقياس رضا الطلاب وأولياء الأمور عن فعالية حصص التربية الفنية والأنشطة المنفذة، وتحليل النتائج لتحسين الأداء.", images: [], videos: [], files: [] },
  "obj-3": { title: "تحقيق تقدم في متوسط أداء الطلبة", description: "تحقيق تقدم ملموس في متوسط أداء الطلبة في مادة التربية الفنية بنسبة تتجاوز 5% مقارنة بالعام السابق، مع توثيق التحسن بأدلة واضحة.", images: [], videos: [], files: [] },
  "obj-4": { title: "تطبيق معايير استمارة المشاهدة الصفية", description: "تحقيق مستوى \"يلبي التوقعات\" في جميع استمارات المشاهدة الصفية المنفذة خلال العام الأكاديمي، مع توثيق تطبيق المعايير المعتمدة.", images: [], videos: [], files: [] },
  "obj-5": { title: "تأهيل الطلبة للمشاركة في المسابقات", description: "تأهيل أكثر من 5 طلاب للمشاركة في مسابقات فنية محلية ووطنية ودولية، مع مشاركة 3 منهم على الأقل في مسابقات خارجية وتحقيق فوز واحد على الأقل.", images: [], videos: [], files: [] },
  "obj-6": { title: "تطبيق خطة متابعة دعم التقدم الأكاديمي", description: "تطبيق خطة دعم أكاديمي للطلاب المتعثرين والموهوبين في التربية الفنية، بمشاركة أصحاب المصلحة (الإدارة، أولياء الأمور، المرشد الطلابي).", images: [], videos: [], files: [] },
  "_site_settings": {
    headerTitle: "معرض إنجازات التربية الفنية",
    headerSubtitle: "المعلمة رشا أحمد محمود عبد السلام | مدرسة عبدالله بن ناصر الحلقة الثانية بنين",
    headerSubtitlePages: "المعلمة رشا أحمد محمود | مدرسة عبدالله بن ناصر الحلقة الثانية بنين | 2025-2026",
    heroTitle: "🎨 رحلتي في التربية الفنية",
    heroSubtitle: "توثيق الإنجازات والأعمال خلال العام الدراسي 2025-2026",
    heroExtra: "قسم التربية الفنية - مدرسة عبدالله بن ناصر الحلقة الثانية بنين",
    footerTitle: "معرض إنجازات قسم التربية الفنية",
    footerSubtitle: "المعلمة رشا أحمد محمود عبد السلام | مدرسة عبدالله بن ناصر الحلقة الثانية بنين",
    footerYear: "العام الدراسي 2025-2026",
  },
};

// ── state cache ──
let _cachedContent = null;

function loadContent() {
  if (_cachedContent) return _cachedContent;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) _cachedContent = { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
    else _cachedContent = { ...DEFAULT_CONTENT };
  } catch { _cachedContent = { ...DEFAULT_CONTENT }; }
  return _cachedContent;
}

function saveContent(content) {
  _cachedContent = content;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function getPageContent(pageId) {
  const all = loadContent();
  return all[pageId] || DEFAULT_CONTENT[pageId] || null;
}

function updatePageContent(pageId, updates) {
  const all = loadContent();
  all[pageId] = { ...all[pageId], ...updates };
  saveContent(all);
  return all[pageId];
}

function getSiteSettings() {
  return loadContent()._site_settings || DEFAULT_CONTENT._site_settings;
}

function updateSiteSettings(updates) {
  const all = loadContent();
  all._site_settings = { ...all._site_settings, ...updates };
  saveContent(all);
}

// ── Render page ──
function renderPageContent(pageId) {
  renderSiteSettings();
  const content = getPageContent(pageId);
  if (!content) return;

  const titleEl = document.querySelector('[data-field="title"]');
  if (titleEl) {
    const num = titleEl.getAttribute('data-num') || '';
    titleEl.textContent = num ? `${num} - ${content.title}` : content.title;
  }
  const descEl = document.querySelector('[data-field="description"]');
  if (descEl) descEl.textContent = content.description;

  renderImages(content.images || []);
  renderVideos(content.videos || []);
  renderFiles(content.files || []);
}

function renderSiteSettings() {
  const s = getSiteSettings();
  const isHome = !document.body.getAttribute('data-page-id');
  const q = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
  const qi = (sel, val) => { const el = document.querySelector(sel); if (el) el.innerHTML = val; };

  q('[data-site="header-title"]', s.headerTitle);
  q('[data-site="header-subtitle"]', isHome ? s.headerSubtitle : s.headerSubtitlePages);
  q('[data-site="hero-title"]', s.heroTitle);
  q('[data-site="hero-subtitle"]', s.heroSubtitle);
  q('[data-site="hero-extra"]', s.heroExtra);
  qi('[data-site="footer-title"]', `<strong>${escapeHTML(s.footerTitle)}</strong>`);
  q('[data-site="footer-subtitle"]', s.footerSubtitle);
  q('[data-site="footer-year"]', s.footerYear);
}

function renderImages(images) {
  const gallery = document.getElementById('gallery');
  const ph = document.getElementById('gallery-placeholder');
  if (!gallery) return;
  if (!images.length) { gallery.innerHTML = ''; if (ph) ph.style.display = 'block'; return; }
  if (ph) ph.style.display = 'none';
  gallery.innerHTML = images.map(img => `
    <div class="gallery-item">
      <img src="${escapeHTML(img.url)}" alt="${escapeHTML(img.caption||'صورة')}"
           onclick="openImageModal('${escapeHTML(img.url)}','${escapeHTML(img.caption||'')}')">
      ${img.caption ? `<div class="img-caption">${escapeHTML(img.caption)}</div>` : ''}
    </div>`).join('');
}

function renderVideos(videos) {
  const c = document.getElementById('videos-container');
  const ph = document.getElementById('videos-placeholder');
  if (!c) return;
  if (!videos.length) { c.innerHTML = ''; if (ph) ph.style.display = 'block'; return; }
  if (ph) ph.style.display = 'none';
  c.innerHTML = videos.map(v => {
    const ytId = extractYouTubeId(v.url);
    return `<div class="video-container">
      ${v.title ? `<div class="video-title">${escapeHTML(v.title)}</div>` : ''}
      ${ytId
        ? `<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/${ytId}" frameborder="0" allowfullscreen></iframe></div>`
        : `<video controls src="${escapeHTML(v.url)}"></video>`}
    </div>`;
  }).join('');
}

function renderFiles(files) {
  const c = document.getElementById('files-list');
  const ph = document.getElementById('files-placeholder');
  if (!c) return;
  if (!files.length) { c.innerHTML = ''; if (ph) ph.style.display = 'block'; return; }
  if (ph) ph.style.display = 'none';
  c.innerHTML = files.map(f => {
    const ext = (f.url.split('.').pop()||'FILE').toUpperCase().slice(0,4);
    return `<a href="${escapeHTML(f.url)}" target="_blank" class="file-item">
      <span class="file-icon">${ext}</span>
      <span>${escapeHTML(f.title||'ملف')}</span>
    </a>`;
  }).join('');
}

// ── utils ──
function extractYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function escapeHTML(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function openImageModal(url, caption) {
  const m = document.createElement('div');
  m.className = 'img-modal';
  m.onclick = () => m.remove();
  m.innerHTML = `<div class="img-modal-content">
    <img src="${escapeHTML(url)}" alt="${escapeHTML(caption)}">
    ${caption ? `<p class="img-modal-caption">${escapeHTML(caption)}</p>` : ''}
  </div>`;
  document.body.appendChild(m);
}

// ── Admin login ──
function showAdminLogin() {
  if (sessionStorage.getItem('admin_authed') === 'true') { showAdminPanel(); return; }
  const ov = document.createElement('div');
  ov.className = 'admin-overlay';
  ov.innerHTML = `<div class="admin-login">
    <h2>🔐 لوحة التحكم</h2>
    <p>أدخلي كلمة المرور</p>
    <input type="password" id="admin-pwd" placeholder="كلمة المرور" autocomplete="off">
    <div class="admin-btns">
      <button onclick="checkPassword()" class="btn-primary">دخول</button>
      <button onclick="closeAdminLogin()" class="btn-secondary">إلغاء</button>
    </div>
    <div id="admin-error" style="color:#c00;margin-top:10px;display:none">كلمة المرور غير صحيحة</div>
  </div>`;
  document.body.appendChild(ov);
  setTimeout(() => {
    const inp = document.getElementById('admin-pwd');
    inp.focus();
    inp.onkeypress = e => { if (e.key === 'Enter') checkPassword(); };
  }, 100);
}

function checkPassword() {
  if (document.getElementById('admin-pwd').value === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_authed', 'true');
    closeAdminLogin();
    showAdminPanel();
  } else {
    document.getElementById('admin-error').style.display = 'block';
  }
}

function closeAdminLogin() {
  document.querySelector('.admin-overlay')?.remove();
  if (window.location.search.includes('admin'))
    history.replaceState(null, '', window.location.pathname);
}

// ── temp state ──
let tempImages = [], tempVideos = [], tempFiles = [];

function initTempData() {
  const id = document.body.getAttribute('data-page-id');
  const c = getPageContent(id);
  tempImages = [...(c?.images||[])];
  tempVideos = [...(c?.videos||[])];
  tempFiles  = [...(c?.files ||[])];
}

// ── Drop Zone builder ──
function makeDropZone({ label, accept, onFiles, id }) {
  return `
  <div class="drop-zone" id="dz-${id}"
       ondragover="event.preventDefault();this.classList.add('drag-over')"
       ondragleave="this.classList.remove('drag-over')"
       ondrop="handleDrop(event,'${id}')">
    <div class="dz-icon">⬆️</div>
    <div class="dz-text">${label}</div>
    <div class="dz-hint">اسحبي الملفات هنا أو</div>
    <label class="dz-browse">
      اختاري من الجهاز
      <input type="file" accept="${accept}" multiple style="display:none"
             onchange="handleFileInput(event,'${id}')">
    </label>
  </div>`;
}

// ── handle drops / file input ──
window.handleDrop = function(e, type) {
  e.preventDefault();
  document.getElementById(`dz-${type}`)?.classList.remove('drag-over');
  const files = [...e.dataTransfer.files];
  processFiles(files, type);
};

window.handleFileInput = function(e, type) {
  processFiles([...e.target.files], type);
};

async function processFiles(files, type) {
  if (!files.length) return;
  for (const file of files) {
    showToast(`⏳ جاري رفع: ${file.name}`);
    try {
      let url;
      if (supabaseConfigured) {
        const path = `${type}/${Date.now()}_${file.name.replace(/\s+/g,'_')}`;
        url = await sbUploadFile('portfolio', path, file);
      } else {
        // fallback: base64 (works offline / before Supabase setup)
        url = await fileToBase64(file);
      }
      if (type === 'images') {
        tempImages.push({ url, caption: '' });
        renderImagesEditor(tempImages);
      } else if (type === 'files') {
        tempFiles.push({ url, title: file.name });
        renderFilesEditor(tempFiles);
      } else if (type === 'videos') {
        tempVideos.push({ url, title: file.name });
        renderVideosEditor(tempVideos);
      }
      showToast(`✅ تم رفع: ${file.name}`);
    } catch (err) {
      showToast(`❌ فشل رفع ${file.name}: ${err.message}`);
    }
  }
}

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// ── Editors ──
function renderImagesEditor(images) {
  const c = document.getElementById('images-editor');
  if (!c) return;
  c.innerHTML = images.map((img, i) => `
    <div class="editor-item">
      <div class="editor-preview">
        <img src="${escapeHTML(img.url)}" alt="" onerror="this.style.display='none'">
      </div>
      <input type="text" placeholder="وصف الصورة (اختياري)" value="${escapeHTML(img.caption||'')}"
             oninput="tempImages[${i}].caption=this.value">
      <button onclick="removeImage(${i})" class="btn-remove">🗑 حذف</button>
    </div>`).join('');
}

function renderVideosEditor(videos) {
  const c = document.getElementById('videos-editor');
  if (!c) return;
  c.innerHTML = videos.map((v, i) => `
    <div class="editor-item">
      <input type="text" placeholder="أو الصق رابط YouTube هنا" value="${escapeHTML(v.url)}"
             oninput="tempVideos[${i}].url=this.value">
      <input type="text" placeholder="عنوان الفيديو" value="${escapeHTML(v.title||'')}"
             oninput="tempVideos[${i}].title=this.value">
      <button onclick="removeVideo(${i})" class="btn-remove">🗑 حذف</button>
    </div>`).join('');
}

function renderFilesEditor(files) {
  const c = document.getElementById('files-editor');
  if (!c) return;
  c.innerHTML = files.map((f, i) => `
    <div class="editor-item">
      <div class="file-chip">📄 ${escapeHTML(f.title||f.url.split('/').pop())}</div>
      <input type="text" placeholder="اسم الملف" value="${escapeHTML(f.title||'')}"
             oninput="tempFiles[${i}].title=this.value">
      <button onclick="removeFile(${i})" class="btn-remove">🗑 حذف</button>
    </div>`).join('');
}

window.removeImage = i => { tempImages.splice(i,1); renderImagesEditor(tempImages); };
window.removeVideo = i => { tempVideos.splice(i,1); renderVideosEditor(tempVideos); };
window.removeFile  = i => { tempFiles.splice(i,1);  renderFilesEditor(tempFiles); };

// manually add YouTube link
window.addYoutubeLink = function() {
  tempVideos.push({ url: '', title: '' });
  renderVideosEditor(tempVideos);
};

// ── Show page admin panel ──
function showAdminPanel() {
  const pageId = document.body.getAttribute('data-page-id');
  if (!pageId) { showHomeAdmin(); return; }

  initTempData();
  const content = getPageContent(pageId);
  const panel = document.createElement('div');
  panel.className = 'admin-panel';
  panel.innerHTML = `
    <div class="admin-panel-header">
      <h3>✏️ تحرير المحتوى</h3>
      <button onclick="closeAdminPanel()" class="close-btn">✕</button>
    </div>

    ${!supabaseConfigured ? `
    <div class="supabase-notice">
      ⚠️ <strong>Supabase غير مُعدّ</strong> — الملفات ستُحفظ مؤقتاً كـ Base64.
      <button onclick="showSupabaseSetup()" class="btn-setup">⚙️ إعداد Supabase الآن</button>
    </div>` : `
    <div class="supabase-ok">✅ Supabase متصل — الملفات ترفع على السحابة مباشرة</div>`}

    <div class="admin-section">
      <label>عنوان الكفاءة</label>
      <input type="text" id="edit-title" value="${escapeHTML(content.title)}">
    </div>

    <div class="admin-section">
      <label>النبذة / الوصف</label>
      <textarea id="edit-description" rows="5">${escapeHTML(content.description)}</textarea>
    </div>

    <div class="admin-section">
      <label>📸 الصور</label>
      ${makeDropZone({ label:'اسحبي الصور هنا', accept:'image/*', id:'images' })}
      <div id="images-editor" style="margin-top:8px"></div>
    </div>

    <div class="admin-section">
      <label>🎬 الفيديوهات</label>
      ${makeDropZone({ label:'اسحبي ملفات فيديو هنا', accept:'video/*', id:'videos' })}
      <button onclick="addYoutubeLink()" class="btn-add" style="margin-top:6px">+ لصق رابط YouTube</button>
      <div id="videos-editor" style="margin-top:8px"></div>
    </div>

    <div class="admin-section">
      <label>📄 الملفات (PDF, Word...)</label>
      ${makeDropZone({ label:'اسحبي الملفات هنا', accept:'.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx', id:'files' })}
      <div id="files-editor" style="margin-top:8px"></div>
    </div>

    <div class="admin-actions">
      <button onclick="saveChanges()" class="btn-primary">💾 حفظ التغييرات</button>
      <button onclick="logout()" class="btn-logout">🚪 خروج</button>
    </div>
  `;
  document.body.appendChild(panel);
  renderImagesEditor(tempImages);
  renderVideosEditor(tempVideos);
  renderFilesEditor(tempFiles);
}

// ── save page changes ──
window.saveChanges = async function() {
  const pageId = document.body.getAttribute('data-page-id');
  const title = document.getElementById('edit-title').value;
  const description = document.getElementById('edit-description').value;
  const images = tempImages.filter(i => i.url);
  const videos = tempVideos.filter(v => v.url);
  const files  = tempFiles.filter(f => f.url);

  updatePageContent(pageId, { title, description, images, videos, files });

  showToast('⏳ جاري الحفظ...');
  const ok = await saveToCloud(loadContent());
  showToast(ok ? '✅ تم الحفظ على السحابة!' : '💾 تم الحفظ محلياً (Supabase غير متصل)');
  renderPageContent(pageId);
};

// ── Supabase setup wizard ──
window.showSupabaseSetup = function() {
  const existing = loadSupabaseConfig() || {};
  const dlg = document.createElement('div');
  dlg.className = 'admin-overlay';
  dlg.innerHTML = `<div class="admin-login" style="max-width:480px;text-align:right">
    <h2>⚙️ إعداد Supabase</h2>
    <p style="font-size:13px;line-height:1.7;color:#555;margin-bottom:1rem">
      Supabase يتيح حفظ المحتوى والصور على السحابة مجاناً بحيث تظهر على كل الأجهزة.
      <a href="https://supabase.com" target="_blank" style="color:#4A7C59">أنشئي حساباً مجانياً هنا ←</a>
    </p>

    <label style="font-weight:600;font-size:13px">Project URL</label>
    <input type="text" id="sb-url" placeholder="https://xxxx.supabase.co"
           value="${escapeHTML(existing.url||'')}"
           style="width:100%;padding:8px;border:1.5px solid #ddd;border-radius:6px;margin-bottom:10px;direction:ltr">

    <label style="font-weight:600;font-size:13px">Anon Public Key</label>
    <input type="text" id="sb-key" placeholder="eyJhbGciOi..."
           value="${escapeHTML(existing.key||'')}"
           style="width:100%;padding:8px;border:1.5px solid #ddd;border-radius:6px;margin-bottom:16px;direction:ltr">

    <div style="background:#FFF8E1;border-right:4px solid #F59E0B;padding:10px;border-radius:8px;font-size:12px;margin-bottom:16px">
      <strong>📋 ما تحتاجين إنشاءه في Supabase:</strong><br>
      1. جدول: <code>site_content</code> — أعمدة: <code>key text (PK), value jsonb</code><br>
      2. Storage bucket: <code>portfolio</code> — ضعيه Public<br>
      3. في RLS: اسمحي بـ SELECT و INSERT و UPDATE للجميع (anon)
    </div>

    <div class="admin-btns">
      <button onclick="testAndSaveSupabase()" class="btn-primary">اختبار وحفظ</button>
      <button onclick="this.closest('.admin-overlay').remove()" class="btn-secondary">إلغاء</button>
    </div>
    <div id="sb-status" style="margin-top:10px;font-size:13px"></div>
  </div>`;
  document.body.appendChild(dlg);
};

window.testAndSaveSupabase = async function() {
  const url = document.getElementById('sb-url').value.trim().replace(/\/$/, '');
  const key = document.getElementById('sb-key').value.trim();
  const status = document.getElementById('sb-status');
  status.textContent = '⏳ جاري الاختبار...';
  try {
    const r = await fetch(`${url}/rest/v1/site_content?select=key&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    saveSupabaseConfig(url, key);
    status.innerHTML = '✅ <strong>تم الاتصال بنجاح!</strong> جاري إعادة التحميل...';
    setTimeout(() => location.reload(), 1500);
  } catch (e) {
    status.innerHTML = `❌ فشل الاتصال: ${e.message}<br><small>تأكدي من الـ URL والـ Key وإعدادات RLS</small>`;
  }
};

// ── Home admin panel ──
function showHomeAdmin() {
  const s = getSiteSettings();
  const panel = document.createElement('div');
  panel.className = 'admin-panel';
  panel.innerHTML = `
    <div class="admin-panel-header">
      <h3>✏️ لوحة الإدارة العامة</h3>
      <button onclick="closeAdminPanel()" class="close-btn">✕</button>
    </div>

    ${!supabaseConfigured ? `
    <div class="supabase-notice">
      ⚠️ <strong>Supabase غير مُعدّ</strong> — التعديلات تُحفظ محلياً فقط.
      <button onclick="showSupabaseSetup()" class="btn-setup">⚙️ إعداد Supabase</button>
    </div>` : `
    <div class="supabase-ok">✅ Supabase متصل — كل التعديلات تُحفظ سحابياً</div>`}

    <div style="background:#F7F1E3;padding:1rem;border-radius:10px;margin-bottom:1rem">
      <h4 style="color:#2C5F2D;margin-bottom:.8rem">🎩 رأس الصفحة</h4>
      <div class="admin-section"><label>العنوان الرئيسي</label>
        <input type="text" id="site-header-title" value="${escapeHTML(s.headerTitle)}"></div>
      <div class="admin-section"><label>النص الفرعي - الرئيسية</label>
        <input type="text" id="site-header-subtitle" value="${escapeHTML(s.headerSubtitle)}"></div>
      <div class="admin-section"><label>النص الفرعي - الصفحات الداخلية</label>
        <input type="text" id="site-header-subtitle-pages" value="${escapeHTML(s.headerSubtitlePages)}"></div>
    </div>

    <div style="background:#F7F1E3;padding:1rem;border-radius:10px;margin-bottom:1rem">
      <h4 style="color:#2C5F2D;margin-bottom:.8rem">🎨 قسم الترحيب</h4>
      <div class="admin-section"><label>العنوان</label>
        <input type="text" id="site-hero-title" value="${escapeHTML(s.heroTitle)}"></div>
      <div class="admin-section"><label>النص الترحيبي</label>
        <input type="text" id="site-hero-subtitle" value="${escapeHTML(s.heroSubtitle)}"></div>
      <div class="admin-section"><label>النص الإضافي</label>
        <input type="text" id="site-hero-extra" value="${escapeHTML(s.heroExtra)}"></div>
    </div>

    <div style="background:#F7F1E3;padding:1rem;border-radius:10px;margin-bottom:1rem">
      <h4 style="color:#2C5F2D;margin-bottom:.8rem">📄 ذيل الصفحة</h4>
      <div class="admin-section"><label>العنوان</label>
        <input type="text" id="site-footer-title" value="${escapeHTML(s.footerTitle)}"></div>
      <div class="admin-section"><label>النص الفرعي</label>
        <input type="text" id="site-footer-subtitle" value="${escapeHTML(s.footerSubtitle)}"></div>
      <div class="admin-section"><label>السنة الدراسية</label>
        <input type="text" id="site-footer-year" value="${escapeHTML(s.footerYear)}"></div>
    </div>

    <div class="admin-actions">
      <button onclick="saveSiteSettings()" class="btn-primary">💾 حفظ الإعدادات</button>
      <button onclick="showSupabaseSetup()" class="btn-export">⚙️ إعدادات Supabase</button>
      <button onclick="logout()" class="btn-logout">🚪 خروج</button>
    </div>
  `;
  document.body.appendChild(panel);
}

window.saveSiteSettings = async function() {
  updateSiteSettings({
    headerTitle:          document.getElementById('site-header-title').value,
    headerSubtitle:       document.getElementById('site-header-subtitle').value,
    headerSubtitlePages:  document.getElementById('site-header-subtitle-pages').value,
    heroTitle:            document.getElementById('site-hero-title').value,
    heroSubtitle:         document.getElementById('site-hero-subtitle').value,
    heroExtra:            document.getElementById('site-hero-extra').value,
    footerTitle:          document.getElementById('site-footer-title').value,
    footerSubtitle:       document.getElementById('site-footer-subtitle').value,
    footerYear:           document.getElementById('site-footer-year').value,
  });
  renderSiteSettings();
  const ok = await saveToCloud(loadContent());
  showToast(ok ? '✅ تم حفظ الإعدادات على السحابة!' : '💾 تم الحفظ محلياً');
};

function logout() {
  if (confirm('هل تريدين الخروج من وضع التحرير؟')) {
    sessionStorage.removeItem('admin_authed');
    location.reload();
  }
}

function closeAdminPanel() {
  document.querySelector('.admin-panel')?.remove();
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'admin-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', async () => {
  initSupabase();

  // أولوية التحميل: Supabase → content.json → localStorage → Default
  let loaded = false;

  if (supabaseConfigured) {
    const cloud = await loadFromCloud();
    if (cloud) {
      saveContent({ ...DEFAULT_CONTENT, ...cloud });
      loaded = true;
    }
  }

  if (!loaded) {
    try {
      const base = window.location.pathname.includes('/pages/') ? '../' : './';
      const r = await fetch(base + 'content.json?t=' + Date.now());
      if (r.ok) {
        const data = await r.json();
        if (!localStorage.getItem(STORAGE_KEY))
          saveContent({ ...DEFAULT_CONTENT, ...data });
      }
    } catch {}
  }

  const pageId = document.body.getAttribute('data-page-id');
  if (pageId) renderPageContent(pageId);
  else renderSiteSettings();

  if (window.location.search.includes('admin')) showAdminLogin();
});
