// ============================================
// لوحة تحكم المعلمة رشا - معرض إنجازات التربية الفنية
// ============================================

const ADMIN_PASSWORD = "art2026";
const STORAGE_KEY = "art_portfolio_content";

// المحتوى الافتراضي لكل صفحة
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
};

// ============================================
// إدارة البيانات
// ============================================

function loadContent() {
  // محاولة تحميل من localStorage أولاً
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return { ...DEFAULT_CONTENT, ...JSON.parse(saved) };
    } catch (e) {
      console.warn("خطأ في قراءة البيانات المحفوظة");
    }
  }
  
  // محاولة تحميل من content.json (محفوظ على GitHub)
  return DEFAULT_CONTENT;
}

async function loadFromJSON() {
  try {
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    const response = await fetch(basePath + 'content.json?t=' + Date.now());
    if (response.ok) {
      const data = await response.json();
      return { ...DEFAULT_CONTENT, ...data };
    }
  } catch (e) {
    // ملف غير موجود، نستخدم localStorage أو الافتراضي
  }
  return null;
}

function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function getPageContent(pageId) {
  const allContent = loadContent();
  return allContent[pageId] || DEFAULT_CONTENT[pageId] || null;
}

function updatePageContent(pageId, updates) {
  const allContent = loadContent();
  allContent[pageId] = { ...allContent[pageId], ...updates };
  saveContent(allContent);
  return allContent[pageId];
}

// ============================================
// عرض المحتوى في الصفحة
// ============================================

function renderPageContent(pageId) {
  const content = getPageContent(pageId);
  if (!content) return;
  
  // العنوان
  const titleEl = document.querySelector('[data-field="title"]');
  if (titleEl) {
    const num = titleEl.getAttribute('data-num') || '';
    titleEl.textContent = num ? `${num} - ${content.title}` : content.title;
  }
  
  // الوصف
  const descEl = document.querySelector('[data-field="description"]');
  if (descEl) {
    descEl.textContent = content.description;
  }
  
  // الصور
  renderImages(content.images || []);
  
  // الفيديوهات
  renderVideos(content.videos || []);
  
  // الملفات
  renderFiles(content.files || []);
}

function renderImages(images) {
  const gallery = document.getElementById('gallery');
  const placeholder = document.getElementById('gallery-placeholder');
  if (!gallery) return;
  
  if (images.length === 0) {
    gallery.innerHTML = '';
    if (placeholder) placeholder.style.display = 'block';
    return;
  }
  
  if (placeholder) placeholder.style.display = 'none';
  gallery.innerHTML = images.map((img, idx) => `
    <div class="gallery-item">
      <img src="${escapeHTML(img.url)}" alt="${escapeHTML(img.caption || 'صورة عمل')}" onclick="openImageModal('${escapeHTML(img.url)}', '${escapeHTML(img.caption || '')}')">
      ${img.caption ? `<div class="img-caption">${escapeHTML(img.caption)}</div>` : ''}
    </div>
  `).join('');
}

function renderVideos(videos) {
  const container = document.getElementById('videos-container');
  const placeholder = document.getElementById('videos-placeholder');
  if (!container) return;
  
  if (videos.length === 0) {
    container.innerHTML = '';
    if (placeholder) placeholder.style.display = 'block';
    return;
  }
  
  if (placeholder) placeholder.style.display = 'none';
  container.innerHTML = videos.map(v => {
    const youtubeId = extractYouTubeId(v.url);
    if (youtubeId) {
      return `
        <div class="video-container">
          ${v.title ? `<div class="video-title">${escapeHTML(v.title)}</div>` : ''}
          <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="video-container">
          ${v.title ? `<div class="video-title">${escapeHTML(v.title)}</div>` : ''}
          <video controls src="${escapeHTML(v.url)}"></video>
        </div>
      `;
    }
  }).join('');
}

function renderFiles(files) {
  const container = document.getElementById('files-list');
  const placeholder = document.getElementById('files-placeholder');
  if (!container) return;
  
  if (files.length === 0) {
    container.innerHTML = '';
    if (placeholder) placeholder.style.display = 'block';
    return;
  }
  
  if (placeholder) placeholder.style.display = 'none';
  container.innerHTML = files.map(f => {
    const ext = (f.url.split('.').pop() || 'FILE').toUpperCase().slice(0, 4);
    return `
      <a href="${escapeHTML(f.url)}" target="_blank" class="file-item">
        <span class="file-icon">${ext}</span>
        <span>${escapeHTML(f.title || 'ملف')}</span>
      </a>
    `;
  }).join('');
}

function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function openImageModal(url, caption) {
  const modal = document.createElement('div');
  modal.className = 'img-modal';
  modal.onclick = () => modal.remove();
  modal.innerHTML = `
    <div class="img-modal-content">
      <img src="${escapeHTML(url)}" alt="${escapeHTML(caption)}">
      ${caption ? `<p class="img-modal-caption">${escapeHTML(caption)}</p>` : ''}
    </div>
  `;
  document.body.appendChild(modal);
}

// ============================================
// لوحة التحكم
// ============================================

function isAdminMode() {
  return window.location.search.includes('admin') && sessionStorage.getItem('admin_authed') === 'true';
}

function showAdminLogin() {
  if (sessionStorage.getItem('admin_authed') === 'true') {
    showAdminPanel();
    return;
  }
  
  const overlay = document.createElement('div');
  overlay.className = 'admin-overlay';
  overlay.innerHTML = `
    <div class="admin-login">
      <h2>🔐 لوحة التحكم</h2>
      <p>أدخلي كلمة المرور للوصول للتحرير</p>
      <input type="password" id="admin-pwd" placeholder="كلمة المرور" autocomplete="off">
      <div class="admin-btns">
        <button onclick="checkPassword()" class="btn-primary">دخول</button>
        <button onclick="closeAdminLogin()" class="btn-secondary">إلغاء</button>
      </div>
      <div id="admin-error" style="color: #c00; margin-top: 10px; display: none;">كلمة المرور غير صحيحة</div>
    </div>
  `;
  document.body.appendChild(overlay);
  
  setTimeout(() => {
    const input = document.getElementById('admin-pwd');
    input.focus();
    input.onkeypress = (e) => { if (e.key === 'Enter') checkPassword(); };
  }, 100);
}

function checkPassword() {
  const pwd = document.getElementById('admin-pwd').value;
  if (pwd === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_authed', 'true');
    closeAdminLogin();
    showAdminPanel();
  } else {
    document.getElementById('admin-error').style.display = 'block';
  }
}

function closeAdminLogin() {
  const overlay = document.querySelector('.admin-overlay');
  if (overlay) overlay.remove();
  // إزالة ?admin من الـ URL
  if (window.location.search.includes('admin')) {
    history.replaceState(null, '', window.location.pathname);
  }
}

function showAdminPanel() {
  const pageId = document.body.getAttribute('data-page-id');
  if (!pageId) {
    // الصفحة الرئيسية - عرض إدارة شاملة
    showHomeAdmin();
    return;
  }
  
  const content = getPageContent(pageId);
  if (!content) return;
  
  const panel = document.createElement('div');
  panel.className = 'admin-panel';
  panel.innerHTML = `
    <div class="admin-panel-header">
      <h3>✏️ تحرير المحتوى</h3>
      <button onclick="closeAdminPanel()" class="close-btn">✕</button>
    </div>
    
    <div class="admin-section">
      <label>عنوان الكفاءة</label>
      <input type="text" id="edit-title" value="${escapeHTML(content.title)}">
    </div>
    
    <div class="admin-section">
      <label>النبذة / الوصف</label>
      <textarea id="edit-description" rows="6">${escapeHTML(content.description)}</textarea>
    </div>
    
    <div class="admin-section">
      <label>📸 الصور (روابط URL)</label>
      <div id="images-editor"></div>
      <button onclick="addImage()" class="btn-add">+ إضافة صورة</button>
    </div>
    
    <div class="admin-section">
      <label>🎬 الفيديوهات</label>
      <div id="videos-editor"></div>
      <button onclick="addVideo()" class="btn-add">+ إضافة فيديو</button>
      <div class="hint">💡 يمكنك لصق رابط YouTube مباشرة أو رابط فيديو MP4</div>
    </div>
    
    <div class="admin-section">
      <label>📄 الملفات (PDF, Word, إلخ)</label>
      <div id="files-editor"></div>
      <button onclick="addFile()" class="btn-add">+ إضافة ملف</button>
    </div>
    
    <div class="admin-actions">
      <button onclick="saveChanges()" class="btn-primary">💾 حفظ التغييرات</button>
      <button onclick="exportContent()" class="btn-export">📥 تصدير كل التعديلات (JSON)</button>
      <button onclick="importContent()" class="btn-import">📤 استيراد ملف JSON</button>
      <button onclick="logout()" class="btn-logout">🚪 خروج</button>
    </div>
    
    <div class="admin-info">
      <strong>💡 ملاحظة:</strong>
      <p>التعديلات تُحفظ تلقائياً في متصفحك. لجعلها دائمة لجميع الزوار، اضغطي "تصدير" وارفعي ملف <code>content.json</code> على GitHub.</p>
    </div>
  `;
  document.body.appendChild(panel);
  
  // ملء محتوى الصور والفيديوهات والملفات
  renderImagesEditor(content.images || []);
  renderVideosEditor(content.videos || []);
  renderFilesEditor(content.files || []);
}

function renderImagesEditor(images) {
  const container = document.getElementById('images-editor');
  if (!container) return;
  container.innerHTML = images.map((img, idx) => `
    <div class="editor-item">
      <input type="text" placeholder="رابط الصورة (URL)" value="${escapeHTML(img.url)}" data-idx="${idx}" data-field="url" oninput="updateImage(${idx}, 'url', this.value)">
      <input type="text" placeholder="وصف الصورة (اختياري)" value="${escapeHTML(img.caption || '')}" data-idx="${idx}" data-field="caption" oninput="updateImage(${idx}, 'caption', this.value)">
      <button onclick="removeImage(${idx})" class="btn-remove">حذف</button>
    </div>
  `).join('');
}

function renderVideosEditor(videos) {
  const container = document.getElementById('videos-editor');
  if (!container) return;
  container.innerHTML = videos.map((v, idx) => `
    <div class="editor-item">
      <input type="text" placeholder="رابط YouTube أو رابط الفيديو" value="${escapeHTML(v.url)}" oninput="updateVideo(${idx}, 'url', this.value)">
      <input type="text" placeholder="عنوان الفيديو" value="${escapeHTML(v.title || '')}" oninput="updateVideo(${idx}, 'title', this.value)">
      <button onclick="removeVideo(${idx})" class="btn-remove">حذف</button>
    </div>
  `).join('');
}

function renderFilesEditor(files) {
  const container = document.getElementById('files-editor');
  if (!container) return;
  container.innerHTML = files.map((f, idx) => `
    <div class="editor-item">
      <input type="text" placeholder="رابط الملف (URL)" value="${escapeHTML(f.url)}" oninput="updateFile(${idx}, 'url', this.value)">
      <input type="text" placeholder="اسم الملف" value="${escapeHTML(f.title || '')}" oninput="updateFile(${idx}, 'title', this.value)">
      <button onclick="removeFile(${idx})" class="btn-remove">حذف</button>
    </div>
  `).join('');
}

// متغيرات مؤقتة للتحرير
let tempImages = [];
let tempVideos = [];
let tempFiles = [];

function initTempData() {
  const pageId = document.body.getAttribute('data-page-id');
  const content = getPageContent(pageId);
  tempImages = [...(content.images || [])];
  tempVideos = [...(content.videos || [])];
  tempFiles = [...(content.files || [])];
}

function addImage() {
  if (!tempImages.length) initTempData();
  tempImages.push({ url: '', caption: '' });
  renderImagesEditor(tempImages);
}

function addVideo() {
  if (!tempVideos.length) initTempData();
  tempVideos.push({ url: '', title: '' });
  renderVideosEditor(tempVideos);
}

function addFile() {
  if (!tempFiles.length) initTempData();
  tempFiles.push({ url: '', title: '' });
  renderFilesEditor(tempFiles);
}

function updateImage(idx, field, value) {
  if (!tempImages[idx]) tempImages[idx] = {};
  tempImages[idx][field] = value;
}

function updateVideo(idx, field, value) {
  if (!tempVideos[idx]) tempVideos[idx] = {};
  tempVideos[idx][field] = value;
}

function updateFile(idx, field, value) {
  if (!tempFiles[idx]) tempFiles[idx] = {};
  tempFiles[idx][field] = value;
}

function removeImage(idx) {
  tempImages.splice(idx, 1);
  renderImagesEditor(tempImages);
}

function removeVideo(idx) {
  tempVideos.splice(idx, 1);
  renderVideosEditor(tempVideos);
}

function removeFile(idx) {
  tempFiles.splice(idx, 1);
  renderFilesEditor(tempFiles);
}

function saveChanges() {
  const pageId = document.body.getAttribute('data-page-id');
  const title = document.getElementById('edit-title').value;
  const description = document.getElementById('edit-description').value;
  
  // فلترة العناصر الفارغة
  const images = tempImages.filter(i => i.url && i.url.trim());
  const videos = tempVideos.filter(v => v.url && v.url.trim());
  const files = tempFiles.filter(f => f.url && f.url.trim());
  
  updatePageContent(pageId, { title, description, images, videos, files });
  renderPageContent(pageId);
  
  showToast('✅ تم حفظ التغييرات بنجاح');
}

function exportContent() {
  const content = loadContent();
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'content.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 تم تنزيل الملف. ارفعيه على GitHub في الجذر الرئيسي للمستودع');
}

function importContent() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        saveContent(data);
        location.reload();
      } catch (err) {
        alert('❌ ملف غير صالح');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function logout() {
  if (confirm('هل تريدين الخروج من وضع التحرير؟')) {
    sessionStorage.removeItem('admin_authed');
    location.reload();
  }
}

function closeAdminPanel() {
  const panel = document.querySelector('.admin-panel');
  if (panel) panel.remove();
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ============================================
// إدارة الصفحة الرئيسية
// ============================================

function showHomeAdmin() {
  const panel = document.createElement('div');
  panel.className = 'admin-panel';
  panel.innerHTML = `
    <div class="admin-panel-header">
      <h3>✏️ لوحة الإدارة العامة</h3>
      <button onclick="closeAdminPanel()" class="close-btn">✕</button>
    </div>
    
    <div class="admin-info" style="margin: 0 0 1rem;">
      <strong>👋 مرحباً بكِ في لوحة التحكم</strong>
      <p>من هنا يمكنكِ إدارة كل المحتوى بسهولة. اختاري الكفاءة أو الهدف الذي تريدين تعديله:</p>
    </div>
    
    <div class="admin-actions" style="flex-direction: column; gap: 8px;">
      <button onclick="exportContent()" class="btn-export">📥 تصدير كل المحتوى (لرفعه على GitHub)</button>
      <button onclick="importContent()" class="btn-import">📤 استيراد ملف JSON محفوظ مسبقاً</button>
      <button onclick="logout()" class="btn-logout">🚪 خروج</button>
    </div>
    
    <div class="admin-section" style="margin-top: 1.5rem;">
      <label>💡 طريقة الاستخدام:</label>
      <p style="font-size: 14px; line-height: 1.8; color: #555;">
        1. اضغطي على أي كفاءة من القائمة في الصفحة الرئيسية<br>
        2. في الصفحة المفتوحة، أضيفي <code>?admin</code> لرابطها<br>
        3. اكتبي كلمة المرور<br>
        4. عدّلي المحتوى واحفظي<br>
        5. كرّري لكل كفاءة<br>
        6. في النهاية، اضغطي "تصدير" وارفعي الملف على GitHub
      </p>
    </div>
  `;
  document.body.appendChild(panel);
}

// ============================================
// التهيئة
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  // محاولة تحميل من ملف content.json أولاً (للزوار العاديين)
  const remoteContent = await loadFromJSON();
  if (remoteContent && !localStorage.getItem(STORAGE_KEY)) {
    // إذا كان هناك محتوى من GitHub ولم تحفظ تعديلات محلية
    saveContent(remoteContent);
  }
  
  // عرض محتوى الصفحة
  const pageId = document.body.getAttribute('data-page-id');
  if (pageId) {
    renderPageContent(pageId);
  }
  
  // التحقق من وضع التحرير
  if (window.location.search.includes('admin')) {
    showAdminLogin();
  }
  
  // تهيئة البيانات المؤقتة عند ظهور لوحة التحكم
  if (pageId && sessionStorage.getItem('admin_authed') === 'true') {
    setTimeout(initTempData, 200);
  }
});
