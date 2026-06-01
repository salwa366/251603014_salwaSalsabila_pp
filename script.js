const puisiData = {
    1: {
        judul: 'Hujan di Bulan Mei',
        kategori: 'alam',
        isi: `Hujan mengetuk kaca
seperti kamu yang tak pernah masuk—

Hanya suara.
Hanya bayangan basah di luar.

Aku duduk dengan secangkir teh yang dingin,
mendengarkan cerita yang kau kirim
lewat rintik-rintik itu.

Mei selalu begini:
basah, sunyi, dan penuh pertanyaan.`
    },
    2: {
        judul: 'Pendar Bulan',
        kategori: 'bulan',
        isi: `ku lihat indah dan pendar nya menghiasi langit
terang dan kilau nya membuat awan tersipu—
ku lihat kau memancarkan binar yang sama seperti bulan 
yang muncul perlahan selepas senja,
memancarkan cahaya yang buat aku terpana.

bulan tak hanya membawa pesona, tapi juga rindu
kepada manusia yang jauh disana.
seseorang yang juga membawa mantra hingga buat 
aku terkesima.

meski tak jua pertemuan menemui kita, setidaknya
bulan yang kita tatap sama. `

    },
  3: {
    judul: 'Nama yang Tak Kusebut',
    kategori: 'Rindu',
    isi: `Ada nama yang selalu
berhenti di ujung lidahku—

Tak jadi kusebut.
Tak jadi kulupa.

Ia tinggal di sana,
di ruang antara napas dan kata,
menjadi diam yang paling berbunyi.

Mungkin rindu memang begini:
bukan tentang memanggil,
tapi tentang menahan.`
  },

  4: {
    judul: 'Sempurna Mu',
    kategori: 'Cinta',
    isi: `tak sadarkah?
parasmu yang menyita sorot mataku—
biar matamu seakan merasuk dalam pikiranku,
lengkung senyum mu seindah bulan sabit malam itu,
rahang tegas yang terbalut senyum manis wajahmu,
suaramu yang seindah deburan ombak laut biru,
dan senja yang seakan menyatu dalam ragamu..

lalu..
tak bisa ku utaraan lagi seberapa sempurna nya dirimu,
tak bisa ku sebutkan lagi keindahan yang ada pada dirimu..

dan disini aku, menatap molek nya parasmu..
berharap takdir bersedia mempertemukan langkahku 
dengan langkahmu..`

  },

};





// ── Aktif nav saat scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#8b5e3c' : '';
  });
});

// ── Filter puisi ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.puisi-card').forEach(card => {
      const show = filter === 'semua' || card.dataset.kategori === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── Modal baca puisi ──
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.baca-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const data = puisiData[btn.dataset.id];
    if (!data) return;
    document.getElementById('modal-kategori').textContent = data.kategori;
    document.getElementById('modal-judul').textContent = data.judul;
    document.getElementById('modal-isi').textContent = data.isi;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Animated counters ──
const counters = [
  { id: 'c-puisi',    target: 6  },
  { id: 'c-kategori', target: 3  },
  { id: 'c-tahun',    target: 7  },
];

let animated = false;

function animateCounters() {
  counters.forEach(({ id, target }) => {
    const el = document.getElementById(id);
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = count;
      }
    }, 30);
  });
}

const tentangEl = document.getElementById('tentang');
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !animated) {
    animated = true;
    animateCounters();
  }
}, { threshold: 0.3 });
observer.observe(tentangEl);