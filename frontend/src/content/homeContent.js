/**
 * ============================================================
 * EDIT FILE INI UNTUK MENGUBAH KONTEN HALAMAN HOME
 * ============================================================
 * Teks (judul, subtitle, tombol) yang multi-bahasa ada di:
 *   src/translations/translations.js → bagian home, about, portfolio, contact
 *
 * Di file ini Anda mengedit:
 *   - Link video YouTube
 *   - Kartu portfolio di section Portfolio
 *   - Before & After (gambar sebelum/sesudah + judul & deskripsi)
 *   - Kontak: telepon, email, alamat, link peta
 */

// ----- LINK VIDEO YOUTUBE (section "Video Proyek Kami") -----
// Tambah/kurangi URL video. Format: link YouTube biasa atau shorts.
export const youtubeVideos = [
  'https://youtube.com/shorts/LhNOeShvWZw?si=-vQDyX6uRawIV2HV',
  'https://youtube.com/shorts/8VYirxN0Ryw?si=dOA2s_eTpfaj51X8',
  'https://youtube.com/shorts/nj0z9h43_po?si=FrKF43CgH4t0N-2L'
];

// ----- KARTU PORTFOLIO DI HOME (foto asli dari public/photo_proyek/photoPJK) -----
const BASE = '/photo_proyek/photoPJK';
const enc = (s) => encodeURIComponent(s);
export const homePortfolioItems = [
  { title: 'Apartemen Collins', category: 'Residential', image: `${BASE}/${enc('Apartemen Collins')}/${enc('Apartment-Collins-1.webp')}`, description: 'Desain interior apartemen dengan konsep modern dan fungsional. Ruang living-dapur terintegrasi dan material berkualitas untuk kenyamanan jangka panjang.' },
  { title: 'Namo Seafood - Ruko Golf Island PIK', category: 'Commercial', image: `${BASE}/${enc('Namo Seafood - Ruko Golf Island PIK')}/${enc('Facade Kanal View.jpg')}`, description: 'Interior restoran seafood tiga lantai: area dining, VIP room, dapur komersial, dan fasad yang kuat secara branding.' },
  { title: 'Apartment Park Avenue Serpong', category: 'Residential', image: `${BASE}/${enc('Apartment Park Avenue')}/${enc('Apartment-Park-Avenue-Serpong-1.webp')}`, description: 'Interior dan finishing apartemen di Serpong. Konsep terbuka, storage maksimal, dan pencahayaan alami untuk hunian yang nyaman.' },
  { title: 'Cendana Residence Blok C1', category: 'Residential', image: `${BASE}/${enc('Cendana Residence Blok C1')}/${enc('Cendana-C1-1.webp')}`, description: 'Renovasi dan desain interior rumah tinggal. Transformasi ruang dengan material pilihan dan finishing rapi untuk nilai tambah properti.' },
  { title: 'Rumah Graha Raya', category: 'Residential', image: `${BASE}/${enc('Rumah Graha Raya')}/${enc('Rumah-Graha-Raya-1.webp')}`, description: 'Desain interior rumah lengkap dengan konsep family-oriented, zoning jelas, material tahan lama, dan estetika timeless.' },
  { title: 'Rumah Gunung Sindur', category: 'Residential', image: `${BASE}/${enc('Gunung Sindur')}/${enc('Rumah-Gunung-Sindur-1.webp')}`, description: 'Rumah tinggal skala besar dengan arsitektur interior terpadu, material premium, dan eksekusi terstruktur dari desain hingga serah terima.' }
];

// ----- BEFORE & AFTER (section "Before & After Project") -----
// before = URL gambar sebelum, after = URL gambar sesudah, title & description = teks di modal
export const beforeAfterPairs = [
  { before: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', title: 'Renovasi Ruang Tamu & Dapur', description: 'Transformasi ruang tamu dan dapur menjadi area terbuka yang fungsional dengan material berkualitas dan desain yang selaras.' },
  { before: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600', after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600', title: 'Renovasi Fasad & Interior Rumah', description: 'Perubahan total fasad dan interior rumah: dari tampilan lama menjadi modern, rapi, dan bernilai jual tinggi.' }
];

// Kontak (telepon, email, alamat, peta) ada di: content/contactPageContent.js
// Section "Hubungi Kami" di Home dan halaman Kontak memakai file itu.
