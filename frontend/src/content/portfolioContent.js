/**
 * ============================================================
 * PORTFOLIO – FOTO ASLI PROYEK (public/photo_proyek/photoPJK)
 * ============================================================
 * Semua gambar dari folder Anda. Tanpa mockup.
 * Ubah deskripsi/lokasi di sini; tambah foto baru dengan menambah file
 * di public/photo_proyek/photoPJK/Nama Proyek/ lalu tambah path di images.
 */

const BASE = '/photo_proyek/photoPJK';

function img(folder, ...files) {
  const enc = (s) => encodeURIComponent(s);
  return files.map((f) => `${BASE}/${enc(folder)}/${enc(f)}`);
}

export const portfolioItems = [
  {
    id: 1,
    title: 'Apartemen Collins',
    category: 'Residential',
    location: 'Jakarta',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img('Apartemen Collins', 'Apartment-Collins-1.webp', 'Apartment-Collins-2.webp', 'Apartment-Collins-3.webp', 'Apartment-Collins-4.webp'),
    description: 'Desain interior apartemen Collins dengan konsep modern dan fungsional. Ruang living dan dapur terintegrasi, material kayu berkualitas, dan finishing rapi untuk kenyamanan jangka panjang.',
    detailedDescription: 'Proyek desain interior apartemen ini mengutamakan efisiensi ruang dan kenyamanan. Konsep terbuka antara area living dan dapur memudahkan aktivitas sehari-hari. Pemilihan material dan palet warna netral menciptakan kesan bersih dan timeless, cocok untuk hunian urban.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 2,
    title: 'Apartment Park Avenue Serpong',
    category: 'Residential',
    location: 'Serpong, Tangerang',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Apartment Park Avenue',
      'Apartment-Park-Avenue-Serpong-1.webp', 'Apartment-Park-Avenue-Serpong-2.webp', 'Apartment-Park-Avenue-Serpong-3.webp',
      'Apartment-Park-Avenue-Serpong-4.webp', 'Apartment-Park-Avenue-Serpong-5.webp', 'Apartment-Park-Avenue-Serpong-6.webp',
      'Apartment-Park-Avenue-Serpong-7.webp', 'Apartment-Park-Avenue-Serpong-8.webp', 'Apartment-Park-Avenue-Serpong-9.webp',
      'Apartment-Park-Avenue-Serpong-10.webp'
    ),
    description: 'Interior dan finishing apartemen Park Avenue Serpong. Konsep terbuka, storage maksimal, dan pencahayaan alami untuk hunian yang nyaman dan mudah dirawat.',
    detailedDescription: 'Proyek ini mencakup desain interior lengkap dan pengawasan finishing untuk unit apartemen di kawasan strategis Serpong. Layout dirancang untuk memaksimalkan ruang dan sirkulasi, dengan material pilihan yang tahan lama dan mudah perawatan.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 3,
    title: 'Apartment Silk Alsut',
    category: 'Residential',
    location: 'Alsut, Tangerang',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Apartment Silk Alsut',
      'Apartment-Silk-Alsut-1.webp', 'Apartment-Silk-Alsut-2.webp', 'Apartment-Silk-Alsut-3.webp', 'Apartment-Silk-Alsut-4.webp',
      'Apartment-Silk-Alsut-5.webp', 'Apartment-Silk-Alsut-6.webp', 'Apartment-Silk-Alsut-7.webp', 'Apartment-Silk-Alsut-8.webp',
      'Apartment-Silk-Alsut-9.webp', 'Apartment-Silk-Alsut-10.webp', 'Apartment-Silk-Alsut-11.webp'
    ),
    description: 'Desain interior Apartment Silk Alsut dengan fokus kenyamanan dan efisiensi. Material berkualitas dan tata cahaya yang mendukung aktivitas sehari-hari.',
    detailedDescription: 'Interior apartemen ini dirancang untuk memadukan estetika modern dengan fungsionalitas. Pemilihan furnitur dan material disesuaikan dengan kebutuhan penghuni, menciptakan ruang yang rapi dan nyaman untuk jangka panjang.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 4,
    title: 'Brawijaya Tipe 55',
    category: 'Residential',
    location: 'Indonesia',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img('Brawijaya Tipe 55', 'Kamar Anak - View 1.png', 'Kamar Anak - View2.png'),
    description: 'Desain kamar anak unit Brawijaya Tipe 55: fungsional, aman, dan nyaman untuk tumbuh kembang anak dengan storage yang memadai.',
    detailedDescription: 'Kamar anak dirancang dengan zoning yang jelas antara area tidur, bermain, dan belajar. Material ramah anak dan finishing yang aman menjadi prioritas, tanpa mengorbankan tampilan yang rapi dan mudah dibersihkan.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 5,
    title: 'Cendana Residence Blok C1',
    category: 'Residential',
    location: 'Cendana, Tangerang Selatan',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Cendana Residence Blok C1',
      'Cendana-C1-1.webp', 'Cendana-C1-2.webp', 'Cendana-C1-3.webp', 'Cendana-C1-4.webp', 'Cendana-C1-5.webp',
      'Cendana-C1-6.webp', 'Cendana-C1-7.webp', 'Cendana-C1-8.webp', 'Cendana-C1-9.webp', 'Cendana-C1-10.webp',
      'Cendana-C1-11.webp', 'Cendana-C1-12.webp', 'Cendana-C1-13.webp'
    ),
    description: 'Renovasi dan desain interior rumah tinggal di Cendana Residence. Transformasi ruang dengan material pilihan dan detail finishing yang rapi untuk nilai tambah properti.',
    detailedDescription: 'Proyek ini mencakup renovasi menyeluruh dan desain interior unit di Cendana Residence. Setiap ruang dioptimalkan untuk kenyamanan keluarga, dengan pemilihan material dan warna yang menciptakan kesan hangat dan bersih serta meningkatkan nilai properti.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 6,
    title: 'Facade Kampung Sawah',
    category: 'Residential',
    location: 'Kampung Sawah',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Facade Kampung Sawah',
      'Rumah-Tinggal-Kampung-Sawah-1.webp', 'Rumah-Tinggal-Kampung-Sawah-2.webp',
      'Rumah-Tinggal-Kampung-Sawah-3.webp', 'Rumah-Tinggal-Kampung-Sawah-4.webp'
    ),
    description: 'Desain fasad rumah tinggal di Kampung Sawah. Transformasi tampilan eksterior menjadi lebih modern, rapi, dan berkesan dengan material dan proporsi yang tepat.',
    detailedDescription: 'Fasad rumah dirancang untuk memperkuat kesan pertama dan identitas bangunan. Pemilihan material, warna, dan elemen arsitektural disesuaikan dengan konteks lingkungan dan kebutuhan estetika klien.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 7,
    title: 'Rumah Gunung Sindur',
    category: 'Residential',
    location: 'Gunung Sindur, Bogor',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Gunung Sindur',
      'Rumah-Gunung-Sindur-1.webp', 'Rumah-Gunung-Sindur-2.webp', 'Rumah-Gunung-Sindur-5.webp', 'Rumah-Gunung-Sindur-6.webp',
      'Rumah-Gunung-Sindur-7.webp', 'Rumah-Gunung-Sindur-8.webp', 'Rumah-Gunung-Sindur-10.webp', 'Rumah-Gunung-Sindur-12.webp',
      'Rumah-Gunung-Sindur-13.webp', 'Rumah-Gunung-Sindur-14.webp', 'Rumah-Gunung-Sindur-15.webp', 'Rumah-Gunung-Sindur-16.webp',
      'Rumah-Gunung-Sindur-17.webp', 'Rumah-Gunung-Sindur-18.webp', 'Rumah-Gunung-Sindur-19.webp', 'Rumah-Gunung-Sindur-20.webp',
      'Rumah-Gunung-Sindur-20 (1).webp', 'Rumah-Gunung-Sindur-21.webp', 'Rumah-Gunung-Sindur-23.webp', 'Rumah-Gunung-Sindur-24.webp'
    ),
    description: 'Proyek rumah tinggal skala besar di Gunung Sindur. Arsitektur interior terpadu, material premium, dan eksekusi terstruktur dari desain hingga serah terima.',
    detailedDescription: 'Rumah ini dirancang dengan pendekatan holistik: desain interior terintegrasi dengan arsitektur dan landscape. Pemilihan material premium serta koordinasi dengan tim konstruksi memastikan hasil akhir yang rapi, tahan lama, dan sesuai ekspektasi klien.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 8,
    title: 'Namo Seafood - Ruko Golf Island PIK',
    category: 'Commercial',
    location: 'Golf Island, PIK, Jakarta Utara',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Namo Seafood - Ruko Golf Island PIK',
      '1st FLOOR - DINING AREA VIEW.jpg', '1st FLOOR - LIFT VIEW.jpg', '1st FLOOR - WASTAFEL AREA.jpg',
      '1st FLOOR -SOFA DINING AREA VIEW.jpg', '1st FLOOR LAYOUT.jpg', '1st FLOORC - RECEPTIONIST VIEW.jpg',
      '2nd FLOOR -  WATAFEL AND LIFT VIEW.jpg', '2nd FLOOR - CORIDOR VIEW.jpg', '2nd FLOOR - FAMILIY DINING AREA VIEW.jpg',
      '2nd FLOOR - VIP ROOM 1 VIEW.jpg', '2nd FLOOR - VIP ROOM 2.jpg', '2nd FLOOR LAYOUT.jpg', 'BALKON VIEW.jpg',
      'BASEMENT - COLD STORAGE.jpg', 'BASEMENT - CORIDOR VIEW 1.jpg', 'BASEMENT - CORIDOR VIEW 2.jpg',
      'BASEMENT - KITCHEN VIEW 1.jpg', 'BASEMENT - KITCHEN VIEW 2.jpg', 'BASEMENT LAYOUT.jpg', 'BASEMENT VIEW.jpg',
      'Facade Kanal View.jpg', 'FACADE PARKING VIEW.jpg'
    ),
    description: 'Desain interior restoran Namo Seafood tiga lantai di Golf Island PIK: area dining, VIP room, dapur komersial, dan fasad yang menarik dengan konsep branding yang kuat.',
    detailedDescription: 'Proyek ini mencakup desain interior lengkap untuk restoran seafood: lantai 1 (dining & reception), lantai 2 (family dining & VIP), dan basement (dapur & cold storage). Layout dirancang untuk mendukung operasional harian dan pengalaman tamu, dengan fasad yang mudah dikenali dan konsisten dengan identitas merek.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 9,
    title: 'Nikmate',
    category: 'Commercial',
    location: 'Indonesia',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img('Nikmate', 'Nikmate-1.webp', 'Nikmate-2.webp', 'Nikmate-3.webp', 'Nikmate-4.webp'),
    description: 'Interior komersial Nikmate dengan fokus fungsionalitas dan tampilan profesional. Ruang kerja dan area publik dirancang untuk produktivitas dan kesan merek yang konsisten.',
    detailedDescription: 'Desain interior ruang komersial ini menyeimbangkan kebutuhan operasional dengan identitas visual. Zonasi ruang, pencahayaan, dan pemilihan material mendukung aktivitas kerja sekaligus menciptakan kesan profesional dan terpercaya.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 10,
    title: 'Rumah Bogor',
    category: 'Residential',
    location: 'Bogor',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Rumah Bogor',
      'Rumah-Bogor-1.webp', 'Rumah-Bogor-2.webp', 'Rumah-Bogor-3.webp', 'Rumah-Bogor-4.webp', 'Rumah-Bogor-5.webp',
      'Rumah-Bogor-6.webp', 'Rumah-Bogor-7.webp', 'Rumah-Bogor-9.webp', 'Rumah-Bogor-10.webp', 'Rumah-Bogor-11.webp', 'Rumah-Bogor-12.webp'
    ),
    description: 'Renovasi dan desain interior rumah di Bogor. Optimasi layout, material yang sesuai iklim, dan hasil akhir yang rapi serta siap huni.',
    detailedDescription: 'Proyek renovasi dan interior rumah ini mempertimbangkan kondisi iklim dan kebiasaan penghuni. Layout diperbaiki untuk sirkulasi dan pencahayaan alami yang lebih baik, dengan material tahan lama dan perawatan yang praktis.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 11,
    title: 'Rumah Graha Raya',
    category: 'Residential',
    location: 'Graha Raya, Tangerang',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Rumah Graha Raya',
      'Rumah-Graha-Raya-1.webp', 'Rumah-Graha-Raya-2.webp', 'Rumah-Graha-Raya-3.webp', 'Rumah-Graha-Raya-4.webp',
      'Rumah-Graha-Raya-5.webp', 'Rumah-Graha-Raya-6.webp', 'Rumah-Graha-Raya-7.webp', 'Rumah-Graha-Raya-8.webp',
      'Rumah-Graha-Raya-9.webp', 'Rumah-Graha-Raya-10.webp', 'Rumah-Graha-Raya-11.webp', 'Rumah-Graha-Raya-12.webp',
      'Rumah-Graha-Raya-13.webp', 'Rumah-Graha-Raya-14.webp', 'Rumah-Graha-Raya-15.webp', 'Rumah-Graha-Raya-16.webp'
    ),
    description: 'Desain interior rumah lengkap di Graha Raya. Konsep family-oriented dengan zoning yang jelas, material tahan lama, dan estetika yang timeless.',
    detailedDescription: 'Rumah tinggal ini dirancang untuk kebutuhan keluarga dengan pembagian ruang yang jelas: area publik, privat, dan servis. Pemilihan material dan warna menciptakan suasana hangat dan mudah dirawat, dengan detail finishing yang rapi untuk nilai jangka panjang.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  },
  {
    id: 12,
    title: 'Rumah Ibu Tiara',
    category: 'Residential',
    location: 'Indonesia',
    year: '2024',
    duration: '-',
    budget: '-',
    client: '-',
    images: img(
      'Rumah Ibu Tiara',
      'Rumah-Ibu-Tiara-1.webp', 'Rumah-Ibu-Tiara-2.webp', 'Rumah-Ibu-Tiara-3.webp', 'Rumah-Ibu-Tiara-4.webp',
      'Rumah-Ibu-Tiara-5.webp', 'Rumah-Ibu-Tiara-6.webp', 'Rumah-Ibu-Tiara-7.webp'
    ),
    description: 'Interior rumah tinggal yang hangat dan personal. Desain disesuaikan kebutuhan keluarga, material berkualitas, dan detail yang memperhatikan kenyamanan sehari-hari.',
    detailedDescription: 'Desain interior rumah ini mengutamakan kenyamanan dan kepribadian penghuni. Setiap ruang dirancang sesuai kebiasaan dan gaya hidup, dengan material pilihan dan finishing yang rapi sehingga rumah terasa personal sekaligus representatif.',
    features: [],
    challenges: '',
    solution: '',
    awards: [],
    testimonial: '',
    clientRating: 5
  }
];
