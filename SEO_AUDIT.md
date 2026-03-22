# SEO Audit — PT Cipta Kreasi Buana

**Project:** React (Vite) + Django  
**Business:** Design Interior, Arsitektur, Kontraktor  
**Location target:** Tangerang Selatan, Jakarta  
**Domain:** https://ptciptakreasibuana.com/

---

## Executive summary

Audit mencakup technical SEO, on-page, local SEO, performance, schema, dan mobile. **Critical:** JSON-LD di `dist/index.html` rusak (script bersarang + invalid JSON). **Fixed:** `frontend/index.html` diperbarui dengan brand konsisten (PT Cipta Kreasi Buana, ptciptakreasibuana.com), meta/OG/Twitter/canonical selaras, dan satu blok JSON-LD valid. Ditambah `robots.txt`, `sitemap.xml`, dan geo meta untuk local SEO.

---

## 1. Critical issues (fixed / must-do)

### 1.1 Invalid JSON-LD (FIXED)

- **Problem:** Di build sebelumnya, `dist/index.html` berisi dua tag `<script type="application/ld+json">` dengan JSON tidak valid: kurung `{` lalu tag script lagi di dalam, dan penutup `}` ganda.
- **Impact:** Google/Microsoft mengabaikan structured data; risiko rich results tidak tampil.
- **Fix applied:** Di `frontend/index.html` hanya ada **satu** blok JSON-LD, isi valid (single-line JSON), tipe `LocalBusiness`, dengan `name`, `address`, `telephone`, `email`, `areaServed`, `serviceType`, `url`, `logo`, `image`, `priceRange`.

**Validasi:** Paste isi script ke https://validator.schema.org/ atau https://search.google.com/test/rich-results.

### 1.2 Brand & URL inconsistency (FIXED)

- **Problem:** Title, author, OG, Twitter, canonical masih pakai "ARCHITECT" dan `architect.co.id`.
- **Fix applied:** Semua diseragamkan ke **PT Cipta Kreasi Buana** dan **https://ptciptakreasibuana.com/**:
  - `<title>`
  - `meta name="author"`
  - `og:url`, `og:title`, `og:site_name`
  - `twitter:url`, `twitter:title`
  - `link rel="canonical"`
  - JSON-LD `name`, `url`, `logo`, `image`, `email`

### 1.3 OG/Twitter image non-absolute (FIXED)

- **Problem:** `og:image` dan `twitter:image` pakai `/ptkreasi.jpg`. Crawler sosial butuh URL absolut.
- **Fix applied:** `https://ptciptakreasibuana.com/ptkreasi.jpg`. Tambah `og:image:width` / `og:image:height` (1200x630) bila ukuran gambar sesuai.
- **Action:** Pastikan file `ptkreasi.jpg` ada di root domain (atau path yang dipakai) dan ukuran disarankan 1200×630 px untuk OG.

### 1.4 No robots.txt / sitemap (FIXED)

- **Problem:** Tidak ada `robots.txt` dan `sitemap.xml`; crawler tidak dapat petunjuk jelas.
- **Fix applied:**  
  - `frontend/public/robots.txt`: `Allow: /`, `Sitemap: https://ptciptakreasibuana.com/sitemap.xml`  
  - `frontend/public/sitemap.xml`: URL utama (/, /layanan, /portfolio, /konsultasi, /kontak, dll.) dengan prioritas dan changefreq.

**Setelah deploy:** Pastikan `https://ptciptakreasibuana.com/robots.txt` dan `https://ptciptakreasibuana.com/sitemap.xml` bisa diakses.

---

## 2. Medium priority improvements

### 2.1 SPA & crawlability

- **Fakta:** React SPA; konten di-render client-side. Google bisa render JS, tapi tetap lebih aman punya preload/prefetch atau SSR untuk halaman penting.
- **Rekomendasi:**
  - Pastikan `index.html` (dan build) mengembalikan 200 dan full HTML untuk semua route (history mode). Cek di server (Nginx/Apache) bahwa fallback ke `index.html` untuk route front-end sudah benar.
  - Submit sitemap di Google Search Console dan Bing Webmaster.
  - Untuk route penting (/, /layanan, /konsultasi, /kontak), pastikan tidak di-block oleh `noindex` atau `disallow` di meta/robots.

### 2.2 Per-page meta (dynamic)

- **Saat ini:** Satu set meta di `index.html` untuk seluruh SPA.
- **Rekomendasi:** Pakai `react-helmet-async` atau `<Helmet>` (react-helmet) untuk tiap route:
  - `/layanan`: title/description fokus "Jasa Design Interior, Arsitektur, Kontraktor"
  - `/konsultasi`: CTA-focused title/description
  - `/kontak`: "Kontak PT Cipta Kreasi Buana - Tangerang Selatan, Jakarta"
  - `/harga`: keyword paket/harga
  - Canonical per halaman: `https://ptciptakreasibuana.com/layanan`, dll.

Ini tidak mengubah struktur Vite/React; hanya menambah komponen yang mengisi `<head>` per route.

### 2.3 Local SEO (geo & NAP)

- **Applied:** Di `index.html`: `meta name="geo.region" content="ID-BT"`, `meta name="geo.placename" content="Tangerang Selatan"`. JSON-LD `address` dan `areaServed` (Tangerang Selatan, Jakarta, Indonesia).
- **Lanjutan:**
  - NAP (Name, Address, Phone) di footer/kontak harus persis sama dengan GMB dan schema (termasuk format nomor: +62 819-0314-0377 vs +62081903140377 — schema pakai format internasional tanpa spasi).
  - Daftar Google Business Profile untuk “PT Cipta Kreasi Buana” dengan lokasi Tangerang Selatan (dan Jakarta jika ada cabang); link website ke https://ptciptakreasibuana.com/.

### 2.4 Hreflang (jika multi-bahasa)

- **Saat ini:** Ada LanguageContext (id, en, zh, es); satu URL untuk banyak bahasa.
- **Rekomendasi:** Jika nanti ada URL terpisah per bahasa (mis. `/en/`, `/id/`), tambah `<link rel="alternate" hreflang="id" href="..." />` dan setara untuk en/zh/es, plus `x-default`.

### 2.5 Konten & keyword

- **On-page:** Pastikan H1/H2 dan paragraf pertama di halaman utama dan /layanan memuat keyword utama: "design interior", "jasa arsitek", "kontraktor bangunan", "Tangerang Selatan", "Jakarta", "renovasi rumah".
- **File `services-seo.html`:** Sudah SEO-friendly; bisa dijadikan referensi konten untuk halaman /layanan di React (atau di-render sebagai konten statis di route yang sama).

---

## 3. Performance signals

- **LCP:** Hero dan gambar besar di atas fold — pastikan gambar di-optimasi (WebP/AVIF), dimensi sesuai, `loading="lazy"` untuk below-fold (sudah dipakai di beberapa tempat). Preload hero image jika kritis: `<link rel="preload" as="image" href="..." />`.
- **CLS:** Beri `width`/`height` atau aspect-ratio pada gambar (terutama hero/card) agar layout tidak melompat.
- **JS:** Vite build sudah code-split per route; pertahankan lazy loading untuk route yang jarang dibuka.
- **Fonts:** Google Fonts (Poppins, Lora) — pertimbangkan `font-display: swap` dan preload font kritis, atau self-host untuk mengurangi blocking.

---

## 4. Schema implementation (current & next)

- **Saat ini (fixed):** Satu `LocalBusiness` dengan alamat, telepon, email, areaServed (Tangerang Selatan, Jakarta, Indonesia), serviceType (Design Interior, Arsitektur, Kontraktor Bangunan, Renovasi Rumah), priceRange.
- **Lanjutan (30 hari):**
  - **FAQPage:** Untuk halaman yang punya FAQ (mis. dari `services-seo.html`) — sudah ada di file HTML statis; jika FAQ ada di React, inject JSON-LD FAQPage di halaman tersebut.
  - **Service:** Tambah array `hasOfferCatalog` atau entri terpisah tipe `Service` untuk masing-masing layanan (Design Interior, Arsitektur, Kontraktor) dengan `serviceType` dan `areaServed`.
  - **BreadcrumbList:** Untuk /layanan/:id (detail layanan) dan /portfolio bila ada struktur hierarki.

---

## 5. Mobile optimization

- **Viewport:** Sudah `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- **Responsive:** Sudah ada `responsive-mobile.css` dan komponen mobile (hamburger, sticky CTA).
- **Tap targets:** Minimal 44px untuk tombol/CTA utama sudah diatur.
- **Mobile UX:** Sticky CTA "Konsultasi" di mobile mendukung konversi; pastikan halaman konsultasi/kontak ringan dan form tidak terlalu panjang.

---

## 6. Advanced optimization roadmap (30 hari)

| Minggu | Fokus | Tugas |
|--------|--------|--------|
| 1 | Technical & brand | Rebuild frontend (`npm run build`), deploy index + robots + sitemap. Verifikasi JSON-LD di validator.schema.org dan Rich Results Test. Pastikan canonical/OG/Twitter konsisten. |
| 2 | Per-page SEO | Implement react-helmet-async; set title, description, canonical per route (/, /layanan, /konsultasi, /kontak, /harga). Tambah JSON-LD Service atau FAQPage di halaman yang sesuai. |
| 3 | Local & content | Daftar/klaim Google Business Profile; samakan NAP dengan website dan schema. Tambah konten berbasis keyword (Tangerang Selatan, Jakarta, jasa arsitek, kontraktor interior) di landing/layanan. Optimasi gambar (WebP, dimensi, alt). |
| 4 | Performance & conversion | Preload hero image; perbaiki CLS (width/height atau aspect-ratio). A/B test penempatan CTA dan copy "Konsultasi Gratis". Submit sitemap ke GSC/Bing; pantau coverage dan core web vitals. |

---

## 7. Rekomendasi khusus konstruksi / interior

- **Trust:** Tampilkan sertifikasi, tahun berdiri, jumlah proyek (klien) di homepage atau about. Bisa ditambah schema `aggregateRating` jika ada review.
- **Intent komersial:** Halaman layanan dan harga harus jelas: "Konsultasi gratis", "Survey lokasi", "Free quote". CTA terlihat di atas fold dan di sticky mobile.
- **Lokasi:** Setiap halaman utama sebaiknya menyebut "Tangerang Selatan" atau "Jakarta" secara natural (bukan hanya di footer). Schema `areaServed` sudah mendukung.
- **Portofolio:** Gambar proyek dengan alt text deskriptif (mis. "Interior kantor minimalis Jakarta - PT Cipta Kreasi Buana"). Bisa tambah schema `ImageGallery` atau item `ImageObject` untuk galeri.

---

## 8. Conversion optimization

- **CTA:** Satu primary CTA jelas: "Konsultasi Gratis" / "Konsultasi Sekarang" ke /konsultasi. Sticky CTA di mobile sudah ada; pastikan di desktop juga menonjol.
- **Reduced friction:** Form konsultasi singkat (nama, telepon, jenis layanan, pesan). Hindari field berlebihan.
- **Trust:** Nomor telepon dan WhatsApp klik-to-call; alamat dengan link Google Maps; jam operasional di footer.
- **Urgency (opsional):** "Survey lokasi gratis bulan ini" atau "Kuota terbatas" — hanya jika memang benar dan sesuai etika.

---

## 9. Checklist pasca-deploy

- [ ] `https://ptciptakreasibuana.com/` mengembalikan 200 dan HTML berisi meta + JSON-LD yang benar.
- [ ] `https://ptciptakreasibuana.com/robots.txt` dan `https://ptciptakreasibuana.com/sitemap.xml` dapat diakses.
- [ ] Validasi JSON-LD: https://validator.schema.org/ dan https://search.google.com/test/rich-results.
- [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/ — masukkan URL, pastikan og:image dan title/description benar.
- [ ] Google Search Console: submit sitemap, periksa indexing dan mobile usability.
- [ ] NAP di footer/kontak sama persis dengan schema dan GMB.

---

**File yang diubah/ditambah:**

- `frontend/index.html` — brand, meta, OG, Twitter, canonical, JSON-LD valid.
- `frontend/public/robots.txt` — baru.
- `frontend/public/sitemap.xml` — baru.
- Setelah perubahan, jalankan `npm run build` dan deploy; `dist/index.html` akan dihasilkan dari `index.html` yang sudah diperbaiki.
