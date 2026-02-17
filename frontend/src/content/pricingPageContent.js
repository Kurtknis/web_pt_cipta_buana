/**
 * ============================================================
 * EDIT FILE INI UNTUK MENGUBAH HALAMAN PROYEK & HARGA (/harga)
 * ============================================================
 * - priceRanges: range harga per m² (dari 100 m²)
 * - pricingProjects: referensi proyek dengan gambar, deskripsi, price
 */

const BASE = '/photo_proyek/photoPJK';
const enc = (s) => encodeURIComponent(s);

// ----- RANGE HARGA PER M² (dari 100 m²) – kisaran 200 rb/m² -----
// Estimasi ramah kantong. Sesuaikan angka dengan kebijakan perusahaan.
export const priceRanges = [
  { sqmMin: 100, sqmMax: 150, pricePerSqm: 'Rp 150.000 – 250.000', description: 'Cocok untuk apartemen atau rumah kecil. Paket desain interior lengkap dengan material standar, meliputi konsep, gambar kerja, dan pengawasan pemasangan.' },
  { sqmMin: 150, sqmMax: 200, pricePerSqm: 'Rp 180.000 – 280.000', description: 'Untuk unit 2–3 kamar. Pilihan material lebih beragam, custom furniture ringan, dan koordinasi dengan kontraktor untuk hasil rapi.' },
  { sqmMin: 200, sqmMax: 300, pricePerSqm: 'Rp 200.000 – 300.000', description: 'Rumah atau ruko skala menengah. Desain menyeluruh, material pilihan, dan manajemen proyek terpadu dari awal hingga serah terima.' },
  { sqmMin: 300, sqmMax: 400, pricePerSqm: 'Rp 220.000 – 320.000', description: 'Proyek residensial atau komersial menengah. Konsep custom, spesifikasi material baik, dan timeline terstruktur dengan quality control.' },
  { sqmMin: 400, sqmMax: 500, pricePerSqm: 'Rp 250.000 – 350.000', description: 'Villa atau bangunan komersial. Full service: arsitektur interior, koordinasi M&E, material pilihan, dan garansi pasca serah terima.' },
  { sqmMin: 500, sqmMax: null, pricePerSqm: 'Rp 280.000 – 380.000', description: 'Proyek besar dan kompleks. Tim dedicated, desain eksklusif, material berkualitas, dan manajemen konstruksi lengkap sesuai kebutuhan klien.' }
];

// ----- REFERENSI PROYEK (gambar asli + deskripsi profesional) -----
export const pricingProjects = [
  { id: 1, title: 'Apartemen Collins', category: 'Residential', price: 'Rp 150.000 – 250.000/m²', image: `${BASE}/${enc('Apartemen Collins')}/${enc('Apartment-Collins-1.webp')}`, location: 'Jakarta', duration: '–', description: 'Desain interior apartemen dengan gaya modern dan fungsional. Ruang living dan dapur terintegrasi, material kayu dan finishing berkualitas untuk kenyamanan jangka panjang.' },
  { id: 2, title: 'Apartment Park Avenue Serpong', category: 'Residential', price: 'Rp 180.000 – 280.000/m²', image: `${BASE}/${enc('Apartment Park Avenue')}/${enc('Apartment-Park-Avenue-Serpong-1.webp')}`, location: 'Serpong, Tangerang', duration: '–', description: 'Proyek interior unit apartemen di kawasan strategis Serpong. Konsep terbuka, storage maksimal, dan pencahayaan alami untuk hunian yang nyaman dan mudah dirawat.' },
  { id: 3, title: 'Cendana Residence Blok C1', category: 'Residential', price: 'Rp 200.000 – 300.000/m²', image: `${BASE}/${enc('Cendana Residence Blok C1')}/${enc('Cendana-C1-1.webp')}`, location: 'Cendana, Tangerang Selatan', duration: '–', description: 'Renovasi dan desain interior rumah tinggal di Cendana Residence. Transformasi ruang dengan material pilihan dan detail finishing yang rapi untuk nilai tambah properti.' },
  { id: 4, title: 'Rumah Graha Raya', category: 'Residential', price: 'Rp 220.000 – 320.000/m²', image: `${BASE}/${enc('Rumah Graha Raya')}/${enc('Rumah-Graha-Raya-1.webp')}`, location: 'Graha Raya, Tangerang', duration: '–', description: 'Desain interior rumah lengkap di Graha Raya. Konsep family-oriented dengan zoning yang jelas, material tahan lama, dan estetika yang timeless.' },
  { id: 5, title: 'Rumah Gunung Sindur', category: 'Residential', price: 'Rp 250.000 – 350.000/m²', image: `${BASE}/${enc('Gunung Sindur')}/${enc('Rumah-Gunung-Sindur-1.webp')}`, location: 'Gunung Sindur, Bogor', duration: '–', description: 'Proyek rumah tinggal skala besar di kawasan asri Gunung Sindur. Arsitektur interior terpadu, pemilihan material premium, dan eksekusi yang terstruktur dari desain hingga serah terima.' },
  { id: 6, title: 'Namo Seafood - Ruko Golf Island PIK', category: 'Commercial', price: 'Rp 280.000 – 380.000/m²', image: `${BASE}/${enc('Namo Seafood - Ruko Golf Island PIK')}/${enc('Facade Kanal View.jpg')}`, location: 'Golf Island, PIK', duration: '–', description: 'Desain interior restoran seafood tiga lantai: area dining, VIP room, dapur komersial, dan fasad yang menarik. Konsep branding kuat dan layout yang mendukung operasional harian.' },
  { id: 7, title: 'Nikmate', category: 'Commercial', price: 'Rp 220.000 – 320.000/m²', image: `${BASE}/${enc('Nikmate')}/${enc('Nikmate-1.webp')}`, location: 'Indonesia', duration: '–', description: 'Proyek interior komersial dengan fokus fungsionalitas dan tampilan profesional. Ruang kerja dan area publik dirancang untuk produktivitas dan kesan merek yang konsisten.' },
  { id: 8, title: 'Rumah Bogor', category: 'Residential', price: 'Rp 200.000 – 300.000/m²', image: `${BASE}/${enc('Rumah Bogor')}/${enc('Rumah-Bogor-1.webp')}`, location: 'Bogor', duration: '–', description: 'Renovasi dan desain interior rumah di Bogor. Optimasi layout, pemilihan material yang sesuai iklim, dan hasil akhir yang rapi serta siap huni.' },
  { id: 9, title: 'Rumah Ibu Tiara', category: 'Residential', price: 'Rp 180.000 – 280.000/m²', image: `${BASE}/${enc('Rumah Ibu Tiara')}/${enc('Rumah-Ibu-Tiara-1.webp')}`, location: 'Indonesia', duration: '–', description: 'Interior rumah tinggal yang hangat dan personal. Desain disesuaikan dengan kebutuhan keluarga, material berkualitas, dan detail yang memperhatikan kenyamanan sehari-hari.' }
];

export const pricingCategories = [
  { id: 'all', name: 'Semua' },
  { id: 'Residential', name: 'Residensial' },
  { id: 'Commercial', name: 'Komersial' }
];
