# Panduan Edit Konten Website

Semua konten yang bisa Anda edit (gambar, harga, teks, daftar) ada di folder **`content`** ini. Satu file = satu halaman/bagian, jadi mudah dicari.

| Halaman / Bagian | File yang diedit | Isi yang bisa diubah |
|------------------|------------------|----------------------|
| **Home** (hero, video, portfolio, before/after, kontak) | `homeContent.js` | Link video YouTube, kartu portfolio, before/after, nomor telepon, email, alamat, link peta |
| **Proyek & Harga** (`/harga`) | `pricingPageContent.js` | Daftar proyek: **gambar**, **harga**, judul, lokasi, durasi, kategori |
| **Portfolio** (`/portfolio`) | `portfolioContent.js` | Semua proyek detail: gambar, deskripsi, fitur, testimoni, budget, dll. |
| **Galeri** (`/galeri`) | `galleryContent.js` | Daftar gambar: URL gambar, judul, kategori |
| **Klien** (`/klien`) | `clientsContent.js` | Daftar nama klien |
| **Kontak** (`/kontak`) | `contactPageContent.js` | Telepon, email, alamat, link Google Maps, URL embed peta |

## Teks multi-bahasa (Indonesia / English / dll.)

Judul, subtitle, tombol, dan label yang berubah menurut bahasa ada di:

- **`src/translations/translations.js`**

Di sana ada bagian `home`, `about`, `portfolio`, `pricing`, `contact`, dll. Edit teks per bahasa (id, en, zh, es).

## Ringkasan

- **Ubah gambar** → `homeContent.js`, `pricingPageContent.js`, `portfolioContent.js`, atau `galleryContent.js` (ganti URL di field `image` / `images`).
- **Ubah harga** → `pricingPageContent.js` (field `price`).
- **Ubah kontak** → `contactPageContent.js` atau `homeContent.js` (contactInfo).
- **Ubah teks tampilan (judul, tombol, dll.)** → `src/translations/translations.js`.

Setiap file di folder `content` ada komentar di bagian atas yang menjelaskan struktur datanya.
