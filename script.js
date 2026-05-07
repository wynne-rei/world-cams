const CAT_LABEL = {
  scenic: '観光・絶景',
  traffic: '交通・道路',
  nature: '自然・動物',
  city: '都市・空港・港',
  cctv: '監視カメラ'
};

let CAMERAS = [];
let activeCat = 'all';
let searchQuery = '';

const grid = document.getElementById('grid');
const tabs = document.querySelectorAll('.tab');
const searchInput = document.getElementById('search');
const camCount = document.getElementById('camCount');
const clock = document.getElementById('clock');

const modal = document.getElementById('modal');
const mTitle = document.getElementById('mTitle');
const mLoc = document.getElementById('mLoc');
const mFrame = document.getElementById('mFrame');
const mDesc = document.getElementById('mDesc');
const mExt = document.getElementById('mExt');
const closeBtn = document.getElementById('closeBtn');

function tick() {
  const d = new Date();
  const utc = d.toISOString().substring(11, 19);
  clock.textContent = utc + ' UTC';
}
setInterval(tick, 1000); tick();

function youtubeEmbed(videoId, autoplay = false, mute = true) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: mute ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1'
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function youtubeThumb(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function placeholderSVG() {
  return `
    <div class="placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="6" width="14" height="12" rx="1"/>
        <path d="M17 10l4-2v8l-4-2"/>
        <circle cx="10" cy="12" r="2.5"/>
      </svg>
      <span>EXTERNAL FEED</span>
    </div>`;
}

function createCard(cam) {
  const card = document.createElement('article');
  card.className = 'cam';
  card.dataset.id = cam.id;

  const frame = document.createElement('div');
  frame.className = 'cam-frame';

  if (cam.type === 'youtube' && cam.videoId) {
    const img = document.createElement('img');
    img.src = youtubeThumb(cam.videoId);
    img.alt = cam.title;
    img.loading = 'lazy';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    img.onerror = () => { frame.innerHTML = placeholderSVG(); };
    frame.appendChild(img);
  } else {
    frame.innerHTML = placeholderSVG();
  }

  const cat = document.createElement('span');
  cat.className = 'cam-cat cat-' + cam.category;
  cat.textContent = CAT_LABEL[cam.category] || cam.category;
  frame.appendChild(cat);

  const meta = document.createElement('div');
  meta.className = 'cam-meta';
  meta.innerHTML = `
    <div class="cam-title">${cam.title}</div>
    <div class="cam-loc">
      <span class="country">${cam.country}</span>
      <span>${cam.city}</span>
    </div>
  `;

  card.appendChild(frame);
  card.appendChild(meta);
  card.addEventListener('click', () => openModal(cam));
  return card;
}

function render() {
  let list = CAMERAS;
  if (activeCat !== 'all') list = list.filter(c => c.category === activeCat);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    );
  }
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:40px;">— NO SIGNAL —</p>';
  } else {
    list.forEach(c => grid.appendChild(createCard(c)));
  }
  camCount.textContent = `${list.length} CAMS`;
}

function openModal(cam) {
  mTitle.textContent = cam.title;
  mLoc.textContent = `${cam.country} / ${cam.city} — ${CAT_LABEL[cam.category] || cam.category}`;
  mDesc.textContent = cam.description || '';
  mExt.href = cam.externalUrl || '#';

  if (cam.type === 'youtube' && cam.videoId) {
    mFrame.innerHTML = `<iframe src="${youtubeEmbed(cam.videoId, true, true)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    mFrame.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--muted);gap:14px;">
        <div style="font-size:11px;letter-spacing:0.2em;">EXTERNAL FEED ONLY</div>
        <div style="font-size:13px;color:var(--text);">このカメラはサイト内再生に対応していません</div>
        <div style="font-size:11px;">下のボタンから配信元へ</div>
      </div>`;
  }
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  mFrame.innerHTML = '';
}

closeBtn.addEventListener('click', closeModal);
modal.querySelector('.modal-bg').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  activeCat = t.dataset.cat;
  render();
}));

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  render();
});

fetch('cameras.json')
  .then(r => r.json())
  .then(data => { CAMERAS = data; render(); })
  .catch(err => {
    console.error('cameras.json load failed:', err);
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--warn);padding:40px;">データ読込失敗。サーバー経由で開いてください</p>';
  });
