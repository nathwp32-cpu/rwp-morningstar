# Ruang West Papua (RWP) — v12

Platform kajian **Marxisme Ilmiah** dan **Sosialisme Ilmiah** dengan analisis struktural mendalam atas **West Papua**.

## Baru di v25 — Tata Letak Berbasis Zona pada `analisa-papua.html`

- **`analisa-papua.html` disusun ulang mengikuti zonasi tata letak pada 4 gambar referensi** — bukan sekadar mirip, melainkan urutan zona yang sama:

  | Zona | Nama zona (sesuai referensi) | Isi |
  |---|---|---|
  | 1 | **Mega Links Konten** | band **4 kolom**: peta isi laporan khusus (20 bab + glosarium) |
  | 2 | **Top Featured Area** | band sorotan + kartu utama Grasberg + 3 kartu pendukung + chip lanjutan |
  | 3 | **Magazine Widget Area** | band penuh + baris 3 kartu gadget + grid 4 widget majalah |
  | 4 | **Sidebar Area (kiri & kanan)** | shell **3 kolom**: rail kiri sempit + kolom konten + sidebar kanan |
  | 5 | **Sidebar Tab Area** | tab lompat cepat ke 10 bab, di dalam sidebar kanan |
  | 6 | **Footer Area** | band + baris 4 kartu gadget + grid 4 kolom + baris bawah |
  | 7 | **Author Profile Area** | band + kartu profil penulis |

- **Seluruh isi artikel dipertahankan 100%**: teks artikel **identik kata-per-kata** dengan versi sebelumnya (**3.978 kata**, 20 bab termasuk subbab 11.1/11.2), seluruh **20 anchor `#`** halaman tetap utuh, dan seluruh **7 unit iklan AdSense** dipindahkan verbatim (tidak ada slot yang hilang).
- **CSS baru (`css/magazine.css` bagian v25)**: `.z3col` (grid 3 kolom `206px / 1fr / 320px`), `.zn-head--mega/--feat/--wid/--side/--tab/--foot/--auth` (tujuh varian band berwarna, tetap dalam keluarga **merah–hitam–emas**), `.mega-band` (grid 4 kolom), `.stab-tabs` (tab area), `.gadget` (kartu judul + label + tombol aksi) dan `.gadget-grid`, `.zn-foot-strip`, `.zn-body`. Responsif pada 1180/1040/900/680px; **mode gelap** (manual `[data-theme=dark]` dan otomatis `@media (prefers-color-scheme: dark)`) serta **aturan cetak** tersendiri; **`prefers-reduced-motion`** juga menonaktifkan transisi zona baru.
- **JS baru (`js/magazine.js` bagian v25)**: **Sidebar Tab Area** menyorot tab yang sesuai dengan posisi gulir dan mendukung navigasi papan tuts (panah, Home, End). **Tanpa JavaScript** seluruh tab tetap tampil dan tetap berfungsi sebagai tautan biasa.
- **Kontrol tema tiga-mode, mode gelap otomatis, `prefers-reduced-motion`, slider hero & YouTube, FAQ 30 pertanyaan, forum, galeri + lightbox, blok Artikel Terkait 6 kartu, widget sidebar 3 kartu, `ads.txt`, `netlify.toml`, `robots.txt`, dan `sitemap.xml` tetap berfungsi** pada halaman baru.
- **Cache-buster dinaikkan ke `?v=25`** di seluruh 15 halaman (tanpa sisa `?v=25`).

## Baru di v24 — Halaman Glosarium: Partai, Organisasi & Front
- **Halaman baru: `glosarium.html` — Glosarium Istilah** berisi **94 entri** dalam **7 kategori**: **A. Partai** (21), **B. Organisasi** (10), **C. Front & Aliansi** (10), **D. Strategi & Taktik** (11), **E. Kelas & Ekonomi** (17), **F. Negara & Revolusi** (8), dan **G. Nasional & Kolonial** (10).
- **Setiap entri memuat empat hal**: (1) **istilah** Indonesia + padanan asing bila ada (mis. *sentralisme demokratis / democratic centralism*), (2) **definisi ringkas** 1–2 kalimat, (3) **penjelasan** 1–2 paragraf yang kritis, dan (4) **asal-usul/sumber teoretis** (Marx & Engels, Lenin, Rosa Luxemburg, Gramsci, Mao, Stalin) serta **rujukan silang** ke halaman materi di situs.
- **Seluruh istilah wajib dari permintaan tersedia**: sentralisme demokratis, vanguard (detasemen depan), blok historis, partai massa, partai kader, sel, komite, fraksi & hak minoritas, kritik-diri, kaderisasi, intelektual organik, hegemoni, pangeran modern, garis massa, spontanitas massa, kesadaran kelas (dalam diri vs untuk diri), kelas dalam diri / kelas untuk diri, front taktis, front strategis, front bersatu, front populer, front nasional-demokratik, aliansi kelas, kawan dan lawan, kontradiksi utama & sekunder, oportunisme, sektarianisme, revisionisme, reformisme, dogmatisme, birokratisasi & degenerasi partai, revolusi berkelanjutan, tahapan revolusi (demokratik vs sosialis), hak menentukan nasib sendiri, bangsa tertindas & bangsa penindas, kolonialisme internal, imperialisme, borjuasi komprador, surplus value (nilai lebih), mode produksi & formasi sosial, materialisme historis, materialisme dialektis, sosialisme ilmiah, sosialisme utopis, negara dan revolusi, diktatur proletariat, fase transisi, dan kerja reproduksi sosial — ditambah **istilah pelengkap** (kongres partai, kesadaran palsu, organisasi adat, aksi massal, tuntutan transisional, alat produksi, kelas pekerja, borjuasi nasional, kapitalisme ekstraktif, enklave ekstraktif, kelas menengah birokratik, aparatus represif, demokrasi borjuis, dewan (soviet), penghapusan negara, kriteria bangsa, nasionalisme revolusioner, referendum penentuan nasib sendiri, diskriminasi struktural, front buruh–tani, persatuan aksi, disiplin partai, kontrol dari bawah, perang rakyat, propaganda & agitasi, internasionalisme proletar, perjuangan kelas, basis & superstruktur).
- **Navigasi antar entri**: **Daftar Isi bertaut** di atas halaman (10 entri: filter, 7 kategori, tabel peta istilah), **kotak pencarian/filter JavaScript** yang menyaring entri **langsung saat mengetik** tanpa reload (plus chip 7 kategori, tombol *Tampilkan semua*, `aria-live` pada penghitung, `role="search"`), dan **tabel "Istilah ↔ Halaman Terkait"** berisi **27 baris** yang menautkan ke `partai-organisasi-revolusioner.html`, `front-taktis-strategis.html`, `sosialisme-ilmiah.html`, `hak-menentukan-nasib-sendiri-papua.html`, `analisa-marxisme-papua.html`, `marxisme.html`, `sosialisme.html`, dan `sosialisme-papua.html`.
- **Progresif tanpa JavaScript**: semua 94 entri **tetap tampil lengkap** di HTML — tidak ada satu pun yang disembunyikan; kotak filter hanya jalan pintas. Setiap istilah juga punya **tautan langsung** (`#entri-<slug>`, tombol `#` saat hover) agar dapat dirujuk.
- **Seluruh fitur situs dibawa utuh**: header + mega menu, menu mobile akordeon, **kontrol tema tiga-mode**, penghormatan `prefers-reduced-motion`, sidebar sticky (Daftar Isi + **widget Artikel Terkait 3 kartu** + Terbaru + iklan + Terpopuler + Kategori + Jelajahi Topik), **blok Artikel Terkait 6 kartu**, tombol berbagi & cetak, **5 unit iklan AdSense** (atas, sidebar, bawah, multiplex), profil penulis, dan footer multi-kolom.
- **Gaya glosarium baru di `css/magazine.css`**: kartu entri beraksen merah–emas, badge kategori, goresan `Sumber`/`Rujukan silang`, chip kategori, kotak filter, tabel peta istilah, **dukungan mode gelap** (manual `[data-theme=dark]` dan otomatis `@media (prefers-color-scheme: dark)` dengan `html:not([data-theme])`), responsif ≤680px, serta aturan cetak tersendiri.
- **Filter glosarium berbasis JavaScript** ditambahkan ke `js/magazine.js` (bagian v24) — dijalankan sendiri dan berhenti tanpa efek bila `#glosInput` tidak ada, sehingga halaman lain tidak terpengaruh.
- **Navigasi situs diperbarui di seluruh 15 halaman**: **mega menu** panel Teori & Metode + Analisis Papua masing-masing bertambah tautan glosarium, **menu mobile** bertambah 1 tautan, dan **footer** (kolom Navigasi + Sumber Belajar) bertambah 2 tautan.
- **Kartu glosarium ditambahkan** ke **widget Artikel Terkait sidebar (3 kartu)** dan **blok Artikel Terkait (6 kartu)** pada **7 halaman materi** (`partai-organisasi-revolusioner`, `front-taktis-strategis`, `sosialisme-ilmiah`, `hak-menentukan-nasib-sendiri-papua`, `analisa-marxisme-papua`, `marxisme`, `sosialisme`) — kartu terakhir digantikan kartu glosarium agar invarian **3 kartu sidebar / 6 kartu blok** tetap terjaga.
- **`sitemap.xml` diperbarui** menjadi **15 URL** dan **README ini** memuat daftar halaman baru.
- **Cache-buster dinaikkan ke `?v=25`** di seluruh 15 halaman (tanpa sisa `?v=23`).

## Baru di v23 — Lima Halaman Materi Teori Baru (Partai, Organisasi, Front, Sosialisme Ilmiah, Penentuan Nasib Sendiri)
Situs kini berisi **15 halaman** (9 lama + 5 baru + glosarium). Seluruh **tujuh materi** yang diminta tersedia lengkap dan saling tertaut:

| Halaman baru | Materi | Bagian (jangkauan isi) |
|---|---|---|
| `partai-organisasi-revolusioner.html` | **1. Partai Revolusioner** & **2. Organisasi Revolusioner** | 14 bagian: dari Manifesto Komunis & Liga Komunis, "Apa yang Harus Dilakukan?" (vanguard & kesadaran dari luar), sentralisme demokratis, sosial-demokrasi massa, spontanitas massa Rosa Luxemburg, partai sebagai "pangeran modern" Gramsci, partai dalam *Negara dan Revolusi*, garis massa Mao; bahaya birokratisasi, degenerasi partai, tanda-tanda peringatan, syarat tetap terhubung massa; bentuk organisasi (sel, komite, front, serikat, koperasi, organisasi massa), hak minoritas, hubungan partai–serikat–tani–pemuda–perempuan, legal vs bawah tanah, kaderisasi, pelajaran organisasi di negeri terjajah |
| `front-taktis-strategis.html` | **3. Front Taktis** & **4. Front Strategis** | 11 bagian: definisi & hakikat front taktis (aliansi jangka pendek, tujuan terbatas, kriteria masuk-keluar, batas kompromi), bahaya oportunisme vs sektarianisme, contoh historis (Front Populer 1935, front bersatu buruh-tani, aliansi anti-kolonial), cara menilai keberhasilan; lalu front strategis (aliansi jangka panjang berbasis kelas), blok historis Gramsci, front nasional-demokratik, tahapan revolusi & revolusi berkelanjutan, kriteria kelas, risiko koalisi menumpulkan perjuangan, dan tabel pembanding taktis vs strategis |
| `sosialisme-ilmiah.html` | **5. Sosialisme Ilmiah** | 8 bagian: dari sosialisme utopis (Saint-Simon, Fourier, Owen) ke sosialisme ilmiah Marx–Engels; materialisme historis & dialektis; analisis kelas dan nilai lebih; negara dan revolusi; fase transisi & Kritik Program Gotha; sosialisme di negeri terjajah; perdebatan kontemporer (sosialisme abad 21, pengalaman negara sosialis, kritik terhadap keduanya); tegas pada akhir: **sosialisme ilmiah adalah alat analisis, bukan dogma** |
| `hak-menentukan-nasib-sendiri-papua.html` | **6. Hak Menentukan Nasib Sendiri bagi West Papua** | 10 bagian: hak itu dalam Marxisme (Lenin *The Right of Nations to Self-Determination*, Stalin *Marxism and the National Question*), bangsa tertindas vs penindas, dukungan atas pembebasan nasional, kaitannya dengan revolusi sosialis, kriteria "bangsa" & penerapannya pada Papua, sejarah (Perjanjian New York 1962, PEPERA 1969, kritik), status hukum internasional (Resolusi MU PBB 1514 & 1541, Kovenan Sipil-Politik Pasal 1, pendapat hukum), dan posisi Marxis hari ini |
| `analisa-marxisme-papua.html` | **7. Analisa Marxisme Ilmiah sesuai Situasi West Papua** | 14 bagian: mode produksi & formasi sosial Papua, ekonomi ekstraktif (Grasberg/Freeport, migas, kayu, sawit), hubungan produksi & kepemilikan modal, surplus value yang dialihkan keluar, kelas-kelas di Papua (buruh tambang, petani, nelayan, pekerja informal, kelas menengah birokratik, borjuasi komprador), negara & militer, migrasi & demografi, kolonialisme internal & imperialisme, superstruktur (agama, pendidikan, bahasa, budaya), kontradiksi utama & sekunder, sampai strategi-taktik: siapa kawan–siapa lawan, bentuk organisasi, front taktis & strategis, tahapan menuju sosialisme Papua |

- **Seluruh fitur situs dibawa utuh ke 5 halaman baru**: header + mega menu 4 panel, menu mobile akordeon, kontrol tema tiga-mode (Otomatis/Terang/Gelap), sidebar sticky dengan **Daftar Isi + widget Artikel Terkait 3 kartu**, **blok Artikel Terkait 6 kartu**, tombol berbagi & cetak (termasuk *Cetak artikel ini saja* dan *Cetak artikel terkait*), 6 unit iklan AdSense (auto, in-feed, multiplex), profil penulis, widget majalah, dan footer multi-kolom.
- **Navigasi situs diperbarui di seluruh halaman**: mega menu panel **Teori & Metode** bertambah *Partai Revolusioner* dan *Organisasi Revolusioner*; panel **Analisis Papua** bertambah *Hak Menentukan Nasib Sendiri* dan *Front Taktis & Strategis*; **menu mobile** bertambah 5 tautan baru; **footer kolom Navigasi** bertambah 5 halaman baru. **Widget Artikel Terkait sidebar (3 kartu)** dan **blok Artikel Terkait (6 kartu)** pada halaman lama juga ditambah kartu-kartu baru yang menunjuk ke lima halaman ini, sehingga seluruh materi baru terjangkau dari halaman mana pun.
- **Cache-buster dinaikkan ke `?v=23`** di seluruh 14 halaman (tanpa sisa `?v=22`).
- **`sitemap.xml` diperbarui** menjadi 14 URL dan **README ini** memuat daftar halaman baru.

## Baru di v22 — Hormati `prefers-reduced-motion` (slider hero & slider YouTube)
- **Autoplay slider hero dan slider YouTube berhenti otomatis** saat pengguna mengaktifkan **"Kurangi gerakan" / reduce motion** di sistem. Tidak ada tombol baru, tidak ada preferensi tersimpan — perilaku murni mengikuti pengaturan sistem.
- **Transisi perpindahan slide dibuat instan** (`transition:none`) pada mode tersebut — slide langsung pindah, tanpa animasi geser.
- **Navigasi manual tetap berfungsi penuh**: tombol prev/next, titik indikator, pemilihan slide YouTube, tombol putar, dan pemutaran video — semuanya tetap bisa dipakai.
- **Perubahan pengaturan sistem diikuti tanpa reload.** Listener `matchMedia('(prefers-reduced-motion: reduce)')` dipasang di `js/main.js` sebagai satu sumber kebenaran (`RWP_RM`): begitu pengguna menyalakan opsi tersebut, autoplay yang sedang berjalan **langsung berhenti**; begitu dimatikan, autoplay **langsung berjalan kembali** — termasuk saat slider sedang terlihat.
- **Animasi lain ikut dijinakkan**: animasi masuk `.reveal` langsung tampil (tanpa `IntersectionObserver` menunggu), transisi hover berat dinonaktifkan (nilai akhir visual tetap sama), dan `scroll-behavior` menjadi instan — **tanpa mengubah tampilan statis**.
- **Status dijelaskan pada UI**: label slider YouTube berbunyi *"Autoplay dimatikan — pengaturan sistem 'Kurangi gerakan' aktif"*, dan tombol putar hero menampilkan status dijeda (`aria-pressed="true"`).
- Penanda uji `data-reduced-motion="reduce|no-preference"` dipasang pada `<html>`.
- **Cache-buster dinaikkan ke `?v=22`** di seluruh halaman (tanpa sisa `?v=21`).
- Aturan reduced-motion ditulis di **kedua berkas CSS** (`style.css` dan `magazine.css`) agar perilaku tetap benar walau salah satu berkas masih tersimpan di cache lama.

## Baru di v18 — Widget "Artikel Terkait"
- **Blok "Artikel Terkait" di seluruh 9 halaman** (`index`, `marxisme`, `sosialisme`, `analisa-papua`, `sosialisme-papua`, `anti-seksisme-patriarki`, `galeri-foto`, `faq`, `forum`), ditempatkan **setelah seluruh isi artikel/konten utama dan sebelum iklan penutup** — 6 kartu per halaman (**54 kartu** total).
- **Rekomendasi mengikuti kategori halaman**, bukan template seragam: halaman teori merekomendasikan teori lain, halaman analisis merekomendasikan analisis lain, halaman perempuan merekomendasikan konten perempuan & sosial, halaman galeri merekomendasikan galeri & arsip visual.
- Setiap kartu memuat **badge kategori** (Teori, Analisis, Perempuan, Sejarah, Program, Praktik, Arsip, Kutipan, Etika, Rujukan, dll.), **judul**, **deskripsi singkat**, **meta waktu baca**, dan **tautan ke bagian yang benar-benar ada** di situs.
- Dilengkapi **9 chip kategori** (lintasan & indeks, teori & metode, sosialisme, analisis Papua, sosialisme Papua, perempuan & sosial, galeri, FAQ, forum) dan tautan "telusuri Materi Lengkap 52 Konsep".
- Gaya majalah konsisten dengan tata letak yang ada: kartu bergaris aksen merah–emas, grid **3 kolom di desktop → 2 kolom (≤1040px) → 1 kolom (≤680px)**, dukungan **mode gelap**, dan gaya cetak tersendiri.
- Kartu dirender dari penanda `[data-rel-item]` oleh `js/magazine.js` (blok 6), sehingga blok HTML di dalam halaman tetap menjadi **cadangan statis** saat JavaScript dimatikan. Menambah satu `<a data-rel-item data-href="…">` = satu kartu baru.
- **Entri baru "8. Artikel Terkait"** pada Daftar Isi sidebar tiap halaman (scrollspy ikut menandai bagian ini) dan **3 tombol cetak** di bilah berbagi: *Cetak halaman*, *Cetak artikel ini saja* (menyembunyikan blok terkait), dan *Cetak artikel terkait*.
- **Cache-buster dinaikkan ke `?v=18`** di seluruh halaman (tanpa sisa `?v=17`).
- Dua **bug tata letak dunia nyata** yang ditemukan & diperbaiki saat verifikasi: (a) aturan cetak mode "related" kalah spesifisitas sehingga blok terkait justru tersembunyi; (b) `sosialisme-papua.html` memakai kolom grid `1fr 332px` dengan sidebar di kiri sehingga kolom konten terkurung di **332px** — kini `332px minmax(0,1fr)` sehingga konten kembali normal (±846px).

## Baru di v19 — Widget Sidebar "Artikel Terkait" (versi ringkas)
- **Widget baru `.sw.sw-rel` berisi tepat 3 kartu** di dalam **Sidebar Area** pada seluruh 9 halaman, ditambahkan **tanpa** mengubah widget sidebar yang sudah ada (Daftar Isi, Terpopuler, Terbaru, Kategori, Kutipan, Jelajahi Topik, iklan sidebar), mega menu, area unggulan, footer, profil penulis, tombol berbagi/cetak, maupun blok **Artikel Terkait 6 kartu** di bawah artikel.
- Posisi widget: **setelah Daftar Isi Halaman dan sebelum widget pertama** tiap halaman — urutan widget tetap terbaca (`Daftar Isi → Artikel Terkait (ringkas) → [widget asli halaman] → Iklan → …`), sticky sidebar dan **scrollspy** tidak terganggu.
- **3 kartu per halaman = 27 kartu total**, dipilih agar **berbeda** dari 6 kartu blok besar (tidak ada duplikat), relevan dengan kategori halaman:
  | Halaman | 3 artikel sidebar |
  |---|---|
  | `index` | Peran Sumber Daya Alam dalam Ekonomi Papua (Analisis) · Prinsip-Prinsip Sosialisme Papua (Program) · Studi Kasus Perbandingan (Studi) |
  | `marxisme` | Tiga Hukum Dialektika (Teori) · Teori Krisis & Siklus Kapital (Teori) · Analisis Konkret: Metode Lima Langkah (Teori) |
  | `sosialisme` | Perencanaan Partisipatif (Teori) · Demokrasi Ekonomi & Kepemilikan Bersama (Teori) · Relevansi untuk Papua (Program) |
  | `analisa-papua` | Sumber Daya & Grasberg (Analisis) · Otonomi Khusus: Evaluasi 25 Tahun (Analisis) · Geopolitik Pasifik dan Aktor Eksternal (Analisis) |
  | `sosialisme-papua` | Peta Jalan Transisi Bertahap (Program) · Tata Kelola Adat & Demokrasi Kampung (Program) · Indikator Keberhasilan dan Pemantauan (Program) |
  | `anti-seksisme-patriarki` | Tokoh & Organisasi Perempuan Papua (Perempuan) · Kritik Seksisme dalam Praktik Gerakan (Perempuan) · Glosarium Istilah (Rujukan) |
  | `galeri-foto` | Galeri Foto Perjuangan Papua (Arsip) · Jelajahi Seluruh Ruang West Papua (Rujukan) · Sumber, Etika Visual & Bacaan Lanjutan (Etika) |
  | `faq` | Sosialisme Ilmiah (10 pertanyaan) (Teori) · Analisis West Papua (6 pertanyaan) (Analisis) · Praksis & Perjuangan (5 pertanyaan) (Praksis) |
  | `forum` | Tulis Diskusi Baru (Forum) · Video Terbaru — Papua Berbicara (Video) · Pertanyaan Diskusi per Bab (Rujukan) |
- Setiap kartu memuat **nomor urut** (garis luar emas/merah), **judul**, dan **badge kategori**; gaya kompak khas sidebar, palet merah–hitam–emas, dukungan **mode gelap**, serta `@supports` fallback agar nomor tetap terbaca bila `-webkit-text-stroke` tidak didukung.
- **Tidak menghitung tautan ganda**: `#terkait` tetap satu (blok besar), sehingga **tidak ada ID duplikat** dan tidak ada tautan internal menggantung.
- **Aturan cetak**: `.sw.sw-rel` disembunyikan saat dicetak (sidebar memang tidak dicetak), jadi gaya cetak selektif tetap rapi.
- **Cache-buster dinaikkan ke `?v=19`** di seluruh halaman (tanpa sisa `?v=18`).

## Baru di v21 — Kontrol Tema Tiga-Mode (Otomatis / Terang / Gelap)
- **Toggle dua-mode digantikan kontrol tiga-mode** di header seluruh 9 halaman: **segmented control** dengan tiga tombol — **🌗 Otomatis**, **☀️ Terang**, **🌙 Gelap**. Terlihat kompak di header (label teks; pada ≤1420px menyusut jadi ikon saja, dan pada ≤1040px bersembunyi karena header mobile memakai menu akordeon — pengaturan tema yang tersimpan tetap berlaku).
- **Bawaan untuk pengguna baru adalah "Otomatis"** — mengikuti `prefers-color-scheme` sistem, tanpa preferensi tersimpan yang memaksa terang/gelap. **"Terang"/"Gelap"** mengunci tema manual (dipasang sebagai atribut `data-theme` pada `<html>`, selalu menang atas sistem).
- **Kembali ke "Otomatis" menghapus preferensi tersimpan**, sehingga halaman langsung mengikuti sistem lagi — termasuk saat pengaturan sistem berubah **tanpa reload** (listener `matchMedia` dipasang di `<head>` *dan* di `js/main.js`).
- **Kompatibel & migrasi dari versi dua-mode:** kunci penyimpanan tetap **`rwp-theme`**; nilai lama `"light"`/`"dark"` tetap terbaca sebagai mode manual, nilai tak dikenal diabaikan (dianggap Otomatis).
- **Tanpa kedipan tema (pre-paint):** skrip kecil di `<head>` menetapkan tema + penanda `data-theme-set` (`manual`/`auto`) **sebelum** cat pertama; CSS hanya mengaktifkan mode gelap otomatis saat `html:not([data-theme])`, jadi tidak pernah ada flash terang→gelap.
- **Aksesibilitas:** `role="group"` + `aria-label` pada kontrol, `aria-pressed` akurat per tombol, tombol ber-`type="button"`, dan fokus keyboard dengan `:focus-visible` (garis emas).
- **Cache-buster dinaikkan ke `?v=21`** di seluruh halaman (tanpa sisa `?v=20`).

## Baru di v20 — Mode Gelap Otomatis (prefers-color-scheme)
- **Seluruh 9 halaman otomatis mengikuti pengaturan tema sistem pengguna** lewat `@media (prefers-color-scheme: dark)` — tanpa perlu tombol dan tanpa menyimpan preferensi baru.
- **Atribut `<html data-theme="light">` yang sebelumnya di-hardcode dilepas.** Tema awal kini ditentukan preferensi sistem; **skrip pre-paint** kecil di `<head>` hanya *membaca* kunci `localStorage` yang sudah ada agar pilihan manual tidak berkedip saat halaman dimuat.
- **Toggle manual tetap berfungsi dan selalu menang atas preferensi sistem.** Blok otomatis dibatasi dengan `html:not([data-theme])`, sehingga: tanpa pilihan manual → ikut sistem; setelah menekan tombol → pilihan manual yang berlaku, di kedua arah. Ikon tombol mengikuti **tema efektif**, dan ikut diperbarui saat pengaturan sistem berubah (`matchMedia` listener).
- **Cakupan komponen:** header & top strip, main menu, dropdown, mega menu, area unggulan (Top Featured), kartu artikel, blok Artikel Terkait besar, widget sidebar termasuk widget ringkas 3 kartu, sidebar sticky, artikel (h2/h3/blockquote), tabel, glosarium, callout, kutipan, timeline, FAQ accordion, forum (form, post, chip, balasan), galeri + lightbox, footer, profil penulis, bilah berbagi & tombol cetak, serta unit iklan AdSense — semua berganti ke palet gelap merah–hitam–emas.
- **Kontras teks aksen diperbaiki:** seluruh warna teks yang memakai `var(--red)` (#c0392b) di latar gelap diganti aksen merah lebih terang **#ff7a63** (≈5,1:1). Ditambah restorasi otomatis untuk teks di atas permukaan merah/emas (tombol, `.nav a.active`, `.menu-item>a.menu-link.active`, chip aktif) agar tidak ikut tertimpa aturan `a{color:…}`, serta angka dekoratif `.card .num` yang kini memakai goresan `-webkit-text-stroke:1px #ff7a63`.
- **Hasil audit kontras WCAG di 9 halaman × 390px & 1440px: 0 pelanggaran** dari **16.489 node teks** (target ≥4,5:1 untuk teks isi). Mode gelap juga diuji tanpa scroll horizontal (390/1440px, plus sapuan 1024–1920px) dengan **0 page error**.
- **Cache-buster dinaikkan ke `?v=20`** di seluruh halaman (tanpa sisa `?v=19`).

## Baru di v12
- **Halaman baru: `galeri-foto.html`** — **Galeri Foto Perjuangan Papua** (7 bagian, 12 foto, ±46 KB) yang menata arsip visual perjuangan Papua ke dalam **enam kategori** (Sejarah, Demonstrasi, Perempuan, Tanah & Sumber Daya, Budaya, Pendidikan):
  1. **Mengapa arsip visual penting** — gambar sebagai metode, dan arsip sebagai medan kontestasi + kotak **Catatan Etika Visual**
  2. **Enam wajah perjuangan** — cara membaca galeri lewat enam lensa dalam kartu analisis
  3. **Grid galeri 12 foto** dengan kartu berisi **judul, keterangan, tahun, dan lokasi**
  4. **Lightbox** — klik foto untuk memperbesar, tombol **sebelumnya/berikutnya/tutup**, navigasi **tombol panah** dan **Esc** di papan tuntas, penghitung "X / 12"
  5. **Filter kategori** (6 tombol + "Semua") dengan penghitung "Menampilkan N dari 12 foto"
  6. **Kronologi perjuangan dalam gambar** — 9 tonggak (1961–2019), masing-masing dengan **tautan Perbesar** ke foto terkait
  7. **Kutipan**, **kartu jelajah 9 halaman**, **tabel status setiap gambar** (aset RWP vs **rekonstruksi ilustratif**), serta bacaan lanjutan
  - **8 foto baru** dibuat khusus (mama-mama & noken, kampung pegunungan, aksi damai, lembah tambang, sekolah, ukiran & tifa, nelayan, tani) sebagai **rekonstruksi ilustratif** — dilabeli jelas dan **tidak boleh dikutip sebagai bukti peristiwa**
  - Dilengkapi **JSON-LD** (`Article` + `ImageGallery` + `FAQPage`) dan unit AdSense **auto + in-feed + multiplex**
  - Tautan **nav desktop, mobile-nav, footer Navigasi, dan kotak Sumber Belajar di seluruh 9 halaman**; **entri baru di `sitemap.xml`**
- **Halaman baru: `anti-seksisme-patriarki.html`** — kajian mendalam **Anti Seksisme & Patriarki** (12 bagian, ±94 KB) yang menyatukan **kemerdekaan Papua** dengan **pembebasan perempuan** dalam kerangka sosialisme ilmiah:
  1. Mengapa seksisme & patriarki adalah persoalan **kelas**, bukan sekadar budaya — termasuk tabel bacaan kultural vs bacaan kelas dan **lima tiang patriarki**
  2. **Akar teori marxisme ilmiah** — Engels *Asal-Usul Keluarga, Kepemilikan Pribadi, dan Negara* (1884), rumah tangga sebagai **unit produksi**, **kerja reproduksi sosial** (3 lapis), **beban ganda / “dunia kedua”**, hubungan patriarki–kepemilikan–negara, dan **kritik atas sosialisme utopis** yang mengabaikan pembebasan perempuan; ditutup tabel perbandingan aliran (Engels, Zetkin/Kollontai, teori reproduksi sosial, feminisme radikal, feminisme liberal)
  3. **Perempuan & kolonialisme di West Papua** — tiga lapis penindasan, **tambang Grasberg** (relokasi, tailing, punggung perempuan), transmigrasi & militerisasi, kekerasan berbasis gender, kesehatan ibu dan anak, pendidikan, serta tabel **“satu hari kerja yang tak dihitung”**
  4. **Perempuan Papua dalam perjuangan kemerdekaan** — peran historis komunal, **gerakan mama-mama**, organisasi & keterwakilan resmi (MRP, gereja, koalisi anti-kekerasan, HAMAK), diplomasi internasional, keterkaitan dengan gerakan buruh dan tani, dan tabel perbandingan bentuk perjuangan menurut periode
  5. **Kartu tokoh** — Mama **Angganeta Manufandu** (Gerakan Koreri), Mama **Yosepha Alomang** (Goldman Prize 2001, HAMAK, somasi 2026), Mama **Orpa Nari** (MRP), mama-mama pasar & gereja, perempuan perantauan, generasi muda
  6. **Analisis kelas** — enam pihak yang diuntungkan patriarki kolonial, rantai pemanfaatan kerja tak berbayar, mengapa pekerja laki-laki juga dirugikan, dan mengapa kemerdekaan Papua harus sekaligus anti-patriarki
  7. **Program & tuntutan** — 10 tuntutan pokok, 4 tahap pelaksanaan, dan 4 uji kelayakan program
  8. **Kritik seksisme dalam praktik gerakan** — tabel gejala/bahaya/praktik pengganti + 7 prinsip gerakan setara
  9. **Kesimpulan** · 10. **Kronologi perjuangan perempuan Papua** (17 peristiwa) · 11. **Glosarium** 24 istilah · 12. **Daftar bacaan lanjutan**
  - Dilengkapi **JSON-LD** (`Article` + `FAQPage`), daftar isi, tabel, timeline, kartu tokoh, kutipan, dan unit AdSense
- **Sub-bab baru di `sosialisme-papua.html`: Bab 16 — Kerja Reproduksi Sosial** (10 sub-bagian, ±31 KB) — dimasukkan ke celah penomoran bab 16 yang sebelumnya kosong (15 → 17):
  1. **Definisi** kerja reproduksi sosial dan mengapa ia syarat berjalannya seluruh masyarakat
  2. **Mengapa ia menghasilkan nilai**, bukan sekadar "kerja rumah" — tenaga kerja sebagai komoditas khas, tabel "yang terlihat di pembukuan vs yang tersembunyi"
  3. **Engels**: rumah tangga sebagai **unit produksi**, keluarga monogami & kepemilikan, tiga pelajaran bagi Papua + kritik atas sosialisme yang setengah jalan
  4. **Kerja reproduksi di kampung Papua** — mama-mama, kebun, air, kayu bakar, pengasuhan, perawatan orang sakit/lansia, dan kerja adat/gereja (tabel sosialisasi yang dibutuhkan)
  5. **Tiga lapis** kerja reproduksi (harian, generasi, komunitas) dalam kartu visual
  6. **Beban ganda** perempuan Papua di bawah kolonialisme, **Grasberg**, transmigrasi, dan militerisasi — tabel kekuatan struktural vs beban tambahan
  7. **Sosialisasi kerja perawatan** — 4 pilar program (infrastruktur, pengasuhan, kesehatan publik, penghitungan kerja)
  8. **Timeline** kerangka Engels: 1884 · Zetkin & Kollontai · feminisme Marxis 1960-70an · teori reproduksi sosial 1990an · Federici · kini
  9. **Glosarium mini** 6 istilah (kerja reproduksi sosial, beban ganda, sosialisasi perawatan, subsidi tersembunyi, rumah tangga sebagai unit produksi, ekonomi perawatan)
  10. **Kutipan** Engels, Kollontai, dan tradisi teori reproduksi sosial
  - **Tautan silang dua arah** dengan `anti-seksisme-patriarki.html` (dari §3.7 dan kartu program #2), entri baru di **Daftar Isi** halaman, kotak navigasi **"Sumber Belajar"** di seluruh 8 halaman, dan **2 entri baru** di Indeks Tematik beranda (X + K)
- **Integrasi situs**: tautan halaman baru di **nav desktop, mobile-nav, dan footer 7 halaman lama**; tautan silang/kotak “bacaan lanjutan” di **marxisme, sosialisme, sosialisme-papua, analisa-papua**, CTA di beranda, dan 3 entri baru di Indeks Tematik beranda
- **`sitemap.xml`** diperbarui menjadi 9 halaman
- **Cache-buster `?v=16`** di seluruh halaman
- Semua fitur v11 tetap: hero slider, slider YouTube, AdSense, FAQ 30, forum lengkap

## Baru di v17 (tata letak majalah)
- **`css/magazine.css`** + **`js/magazine.js`** baru (berkas tambahan, dimuat setelah `style.css`/`main.js`) — tidak mengubah aturan lama
- **Main Menu**: menu utama di header dengan **dropdown** (Beranda, Perempuan, Forum) dan **penanda halaman aktif**; mendukung hover, klik, panah bawah, dan Escape
- **Mega Links Konten**: panel mega menu lebar dengan **4 tab** dan **16 kolom** berisi 100 tautan ke bab/bagian nyata; muncul saat menu di-hover/di-klik; di mobile berupa **nav akordeon bergrup**
- **Top Featured Area**: 1 berita utama besar + 3 kartu pendukung + chip “baca juga”, memakai konten halaman itu sendiri. Varian: `split` (berita besar di kiri) dan `wide` (berita besar penuh, 3 kartu sejajar)
- **Sidebar Area**: **sticky di desktop**, **turun di bawah konten saat <=1040px**. Isi berbeda per halaman: Daftar Isi Halaman (dengan **scrollspy**), Terpopuler, Terbaru, Kategori, Kutipan Pilihan, Jelajahi Topik, dan **unit iklan sidebar** (slot unik `rwp-*-sidebar`)
- **Magazine Widget Area**: strip widget 4 kartu di atas footer
- **Author Profile Area**: kotak profil dengan avatar, nama, peran, deskripsi, tautan sosial — Redaksi RWP / Tim Teori & Metode / Tim Analisis & Riset / Tim Media & Arsip
- **Share + Print**: WhatsApp, Facebook, X/Twitter, Telegram, LinkedIn, Salin tautan (`navigator.clipboard` + fallback), dan Cetak halaman (`window.print()`) di 9/9 halaman
- **Gaya cetak khusus** (`@media print`): menu, mega panel, sidebar, widget, iklan, tombol, dan bilah berbagi **tidak ikut tercetak**; muncul header cetak berisi judul dokumen + URL sumber
- **Footer multi-kolom**: Navigasi, Sumber Belajar, Redaksi & Kredit + kolom brand
- **Cache-buster `?v=17`** di seluruh halaman (tanpa sisa `?v=16`)
- Semua fitur lama utuh: hero slider, slider YouTube, forum, FAQ 30, Bab 16 Kerja Reproduksi Sosial, galeri lightbox + filter, unit AdSense (auto + in-feed + multiplex), `ads.txt`, `netlify.toml`, `robots.txt`, `sitemap.xml`

### Susunan area per halaman
| Halaman | Tema unggulan | Varian | Sidebar (urut) | Widget | Author profile |
|---|---|---|---|---|---|
| `index.html` | Beranda / laporan utama | split | Daftar Isi, Terpopuler, Iklan, Terbaru, Kategori | Terbaru, Kutipan, Jelajahi, Kategori | Redaksi RWP |
| `marxisme.html` | Teori & Metode | wide | Daftar Isi, Terbaru, Iklan, Kutipan, Jelajahi | Jelajahi, Terbaru, Terpopuler, Kategori | Tim Teori & Metode |
| `sosialisme.html` | Sosialisme (ekonomi perawatan) | split | Daftar Isi, Kutipan, Iklan, Terpopuler, Kategori | Terpopuler, Kategori, Terbaru, Kutipan | Tim Teori & Metode |
| `analisa-papua.html` | Laporan khusus Grasberg | wide | Daftar Isi, Terpopuler, Iklan, Terbaru, Jelajahi | Terpopuler, Terbaru, Jelajahi, Kategori | Tim Analisis & Riset |
| `sosialisme-papua.html` | Program (kerja reproduksi) | split, **sidebar kiri** | Daftar Isi, Kategori, Iklan, Terpopuler, Kutipan | Kategori, Terpopuler, Terbaru, Jelajahi | Tim Analisis & Riset |
| `anti-seksisme-patriarki.html` | Dossier perempuan Papua | wide | Daftar Isi, Jelajahi, Iklan, Terpopuler, Kutipan | Kutipan, Jelajahi, Terpopuler, Kategori | Tim Media & Arsip |
| `galeri-foto.html` | Galeri utama | split | Daftar Isi, Kategori, Iklan, Terbaru, Jelajahi | Kategori, Terbaru, Terpopuler, Jelajahi | Tim Media & Arsip |
| `faq.html` | Pusat bantuan 30 pertanyaan | wide | Daftar Isi, Terpopuler, Iklan, Kutipan, Jelajahi | Terpopuler, Kutipan, Terbaru, Jelajahi | Redaksi RWP |
| `forum.html` | Ruang publik diskusi | split | Daftar Isi, Terbaru, Iklan, Terpopuler, Kategori | Terbaru, Kategori, Terpopuler, Kutipan | Redaksi RWP |

### Verifikasi v17
- Uji tata letak majalah: mega menu 100 tautan tanpa tautan menggantung, sidebar menjadi kolom di desktop dan menumpuk di mobile, tombol berbagi (5 kanal + salin tautan), tombol cetak memicu `window.print()` dan gaya cetak menyembunyikan menu/sidebar/iklan/footer
- Tanpa scroll horizontal di 390px dan 1440px pada 9/9 halaman, dan pada sweep 1024–1920px

## Fitur
- Tema merah-hitam-emas dengan aksen pita Bintang Kejora
- **Kontrol tema tiga-mode** Otomatis / Terang / Gelap di header (bawaan Otomatis; manual menang atas sistem; tersimpan di localStorage `rwp-theme`)
- Slider hero (putar otomatis + jeda/putar manual) + slider YouTube Papua Berbicara
- Kotak pencarian (search modal) untuk seluruh bagian
- Desain responsif mobile-first (uji 390px & 1440px)
- Animasi reveal saat scroll, progress bar, tombol kembali ke atas
- **15 halaman**: Beranda, Marxisme, Sosialisme, **Anti Seksisme & Patriarki**, Analisa West Papua, Sosialisme Papua, **Galeri Foto Perjuangan**, FAQ (30 pertanyaan), Forum Diskusi — ditambah **5 halaman materi teori baru (v23)**: Partai & Organisasi Revolusioner, Front Taktis & Strategis, Sosialisme Ilmiah (Metode), Hak Menentukan Nasib Sendiri, dan Analisa Marxisme Papua — serta **halaman glosarium (v24)** dengan 94 istilah dalam 7 kategori
- **Galeri foto** dengan lightbox (tombol panah & Esc), filter 6 kategori, kronologi bergambar, dan tabel status gambar
- Forum dengan balasan, pencarian, filter tag, pengurutan (terbaru/terpopuler/terbanyak dibalas), penghitung tampilan, penanda tersemat, tombol dukung, dan ekspor JSON/CSV
- **Monetisasi Google AdSense** (Publisher ID `ca-pub-6557428036767230`)

## Struktur
```
ruang-west-papua_v12/
├── index.html                    ← Beranda
├── marxisme.html
├── sosialisme.html
├── anti-seksisme-patriarki.html  ← baru di v12
├── analisa-papua.html
├── sosialisme-papua.html
├── faq.html
├── forum.html
├── galeri-foto.html           ← baru di v12 (galeri foto perjuangan)
├── partai-organisasi-revolusioner.html      ← baru di v23 (materi 1–2)
├── front-taktis-strategis.html              ← baru di v23 (materi 3–4)
├── sosialisme-ilmiah.html                   ← baru di v23 (materi 5)
├── hak-menentukan-nasib-sendiri-papua.html  ← baru di v23 (materi 6)
├── analisa-marxisme-papua.html              ← baru di v23 (materi 7)
├── glosarium.html                           ← baru di v24 (94 istilah, 7 kategori)
├── ads.txt                       ← deklarasi penjual resmi AdSense
├── css/style.css
├── css/magazine.css             ← tata letak majalah (v17)
├── js/main.js
├── js/magazine.js              ← menu/berbagi/cetak/scrollspy (v17)
├── images/                       ← 16 aset (8 lama + 8 foto galeri baru)
├── netlify.toml
├── README.md
├── robots.txt
└── sitemap.xml                   ← 15 halaman
```

## Deploy ke Netlify (Drag & Drop)
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop)
2. Seret **seluruh isi folder** `ruang-west-papua_v12/` (atau file ZIP-nya) ke halaman tersebut
3. Selesai — situs langsung live dengan HTTPS
4. Ganti domain placeholder di `sitemap.xml` dengan domain Netlify Anda

## Mengganti Video YouTube
Setiap slide video memakai pola berikut pada `index.html` / `forum.html`:

```html
<article class="yt-slide" data-yt-id="VIDEO_ID" data-yt-title="Judul Video — Papua Berbicara">
  <button class="yt-thumb" type="button" aria-label="Putar video: Judul Video">
    <img src="https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg" alt="Thumbnail video: Judul — kanal Papua Berbicara" width="480" height="360" loading="lazy" decoding="async">
    <span class="yt-play" aria-hidden="true">▶</span>
  </button>
  <div class="yt-frame" hidden></div>
  <div class="yt-meta">
    <h3><a class="yt-title" href="https://www.youtube.com/watch?v=VIDEO_ID" target="_blank" rel="noopener noreferrer">Judul Video</a></h3>
    <p class="yt-sub"><span>📺 Papua Berbicara</span><span>🗓️ TANGGAL</span></p>
  </div>
</article>
```

Ganti **`VIDEO_ID`** pada 3 tempat (`data-yt-id`, URL thumbnail, URL tonton) + judul/tanggal.
- Tambah slide → salin blok `<article class="yt-slide">` **dan** tambah satu `<button class="yt-dot" data-yt-dot="N">` yang sesuai (jumlah titik mengikuti jumlah slide).
- Ambil ID terbaru dari kanal: `https://www.youtube.com/feeds/videos.xml?channel_id=UC-CEAWtPR6ndn1z766nwS4g`.

## Google AdSense
- Meta verifikasi: `<meta name="google-adsense-account" content="ca-pub-6557428036767230">`
- Skrip AdSense dimuat asinkron di `<head>` seluruh halaman
- `ads.txt` di root berisi baris: `google.com, pub-6557428036767230, DIRECT, f08c47fec0942fa0`
- Unit iklan `data-ad-slot` memakai placeholder deskriptif (mis. `rwp-anti-seksisme-atas`); ganti dengan ID slot asli dari dasbor AdSense untuk tayang optimal
- Setelah deploy, verifikasi situs di dasbor AdSense (metode verifikasi sudah tertanam)

## Verifikasi Kualitas
- Tag HTML seimbang
- Kurung CSS seimbang
- Sintaks JS valid (`node --check`)
- Semua tautan internal tidak menggantung
- Skrip & meta AdSense tepat sekali di 9/9 halaman; `ads.txt` ada
- **Blok "Artikel Terkait" ada di 9/9 halaman** dengan **6 kartu** dan tautan yang valid (0 tautan menggantung, 0 ID duplikat)
- Uji browser (Chromium) pada mobile 390px & desktop 1440px: slider YouTube berjalan otomatis, tombol navigasi berfungsi, tanpa scroll horizontal (`scrollX=0` di 9/9 halaman; sapuan lebar 1024–1920px pada halaman nav terpanjang juga bersih)
- Uji galeri: filter kategori menyaring kartu, lightbox membuka/menutup dengan tombol, panah, dan Esc
- **v23**: meta & skrip AdSense tepat sekali di **14/14 halaman**; blok "Artikel Terkait" (6 kartu) dan widget sidebar (3 kartu) ada di **14/14 halaman** dengan tautan valid; tidak ada tautan internal menggantung; uji Chromium 390px & 1440px tanpa scroll horizontal; kontrol tema tiga-mode dan penghormatan `prefers-reduced-motion` terverifikasi pada halaman baru
- **v24**: meta & skrip AdSense tepat sekali di **15/15 halaman**; blok "Artikel Terkait" (6 kartu) dan widget sidebar (3 kartu) ada di **15/15 halaman**, dengan kartu glosarium pada 7 halaman materi; **94 entri glosarium** dalam 7 kategori dengan tautan langsung dan rujukan silang tanpa tautan menggantung; filter glosarium diuji (mengetik menyaring, menghapus memulihkan, kategori menyaring, tanpa JavaScript seluruh entri tetap tampil); uji Chromium 390px & 1440px tanpa scroll horizontal di seluruh halaman

© 2026 Ruang West Papua (RWP) — konten bebas disebarluaskan untuk pendidikan.
