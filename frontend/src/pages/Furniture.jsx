import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Heart, ShoppingCart, Eye } from 'lucide-react';
import '../App.css';

function Furniture() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const furnitureItems = [
    {
      id: 1,
      title: 'Kursi Sofa 3 Dudukan Minimalis',
      category: 'living-room',
      price: 'Rp 1.850.000',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=90',
      description: 'Kursi sofa 3 dudukan desain Scandinavian, bahan fabric nyaman, rangka kayu solid. Cocok untuk ruang tamu modern.',
      features: ['Bahan fabric premium', 'Rangka kayu solid', 'Busa high density', 'Garansi 1 tahun'],
      dimensions: '200cm x 85cm x 80cm',
      colors: ['Abu-abu', 'Krem', 'Navy'],
      tags: ['kursi', 'sofa', 'minimalis', 'ruang tamu']
    },
    {
      id: 2,
      title: 'Meja Makan Kayu 6 Kursi',
      category: 'dining',
      price: 'Rp 2.450.000',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=90',
      description: 'Meja makan solid kayu untuk 6 orang dengan finishing natural. Desain timeless dan tahan lama.',
      features: ['Kayu solid', 'Finishing melamic', 'Kapasitas 6 orang', 'Anti rayap'],
      dimensions: '180cm x 90cm x 75cm',
      colors: ['Natural', 'Dark Brown', 'Honey'],
      tags: ['meja makan', 'kayu', 'dining', 'meja']
    },
    {
      id: 3,
      title: 'Lemari Pakaian 3 Pintu Sliding',
      category: 'bedroom',
      price: 'Rp 3.250.000',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90',
      description: 'Lemari pakaian 3 pintu sliding dengan cermin, interior organizer, dan lampu LED. Material HPL tahan lembab.',
      features: ['3 pintu sliding', 'Cermin built-in', 'LED lighting', 'Interior organizer'],
      dimensions: '240cm x 60cm x 220cm',
      colors: ['White Oak', 'Walnut', 'Grey'],
      tags: ['lemari', 'sliding', 'kamar tidur', 'pakaian']
    },
    {
      id: 4,
      title: 'Kitchen Set L-Shape Minimalis',
      category: 'kitchen',
      price: 'Rp 5.500.000',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90',
      description: 'Kitchen set bentuk L dengan top table granit, soft closing, dan storage maksimal. Desain modern.',
      features: ['Granit top table', 'Soft closing', 'Storage luas', 'Kabinet berkualitas'],
      dimensions: '300cm x 250cm x 85cm',
      colors: ['White Gloss', 'Grey Matt', 'Wood Grain'],
      tags: ['kitchen set', 'dapur', 'lemari dapur', 'granit']
    },
    {
      id: 5,
      title: 'Lemari Rak TV Minimalis',
      category: 'living-room',
      price: 'Rp 895.000',
      image: 'https://images.unsplash.com/photo-1598300042247-dcb8865a76db?w=800&q=90',
      description: 'Lemari rak TV dengan storage dan cable management. Cocok untuk TV 55-65 inch.',
      features: ['Desain minimalis', 'Cable management', 'Storage tersembunyi', 'Material kayu'],
      dimensions: '180cm x 35cm x 40cm',
      colors: ['White', 'Black', 'Walnut'],
      tags: ['lemari', 'rak tv', 'minimalis', 'ruang tamu']
    },
    {
      id: 6,
      title: 'Tempat Tidur King Size + Headboard',
      category: 'bedroom',
      price: 'Rp 2.150.000',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=90',
      description: 'Tempat tidur platform dengan headboard fabric, storage drawer di bawah. Ukuran King Size nyaman.',
      features: ['Platform design', 'Storage drawer', 'Headboard fabric', 'King size'],
      dimensions: '200cm x 180cm x 100cm',
      colors: ['Grey', 'Beige', 'Navy'],
      tags: ['tempat tidur', 'bed', 'kamar tidur', 'king size']
    },
    {
      id: 7,
      title: 'Kursi Kerja Ergonomis Mesh',
      category: 'office',
      price: 'Rp 675.000',
      image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&q=90',
      description: 'Kursi kerja ergonomis dengan lumbar support dan adjustable height. Material mesh breathable untuk kenyamanan.',
      features: ['Lumbar support', 'Tinggi bisa diatur', 'Mesh breathable', 'Roda halus'],
      dimensions: '65cm x 65cm x 110-120cm',
      colors: ['Black', 'Grey', 'White'],
      tags: ['kursi', 'kursi kerja', 'ergonomis', 'kantor']
    },
    {
      id: 8,
      title: 'Meja Kerja Minimalis',
      category: 'office',
      price: 'Rp 1.250.000',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=90',
      description: 'Meja kerja desain minimalis dengan cable tray dan material kokoh. Cocok untuk kerja atau belajar.',
      features: ['Desain minimalis', 'Cable management', 'Kokoh', 'Finishing halus'],
      dimensions: '140cm x 70cm x 75cm',
      colors: ['White', 'Black', 'Oak'],
      tags: ['meja', 'meja kerja', 'kantor', 'minimalis']
    },
    {
      id: 9,
      title: 'Kursi Makan Set 4',
      category: 'dining',
      price: 'Rp 1.100.000',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=90',
      description: 'Set kursi makan 4 buah dengan desain modern. Bahan kuat dan nyaman untuk ruang makan.',
      features: ['Set 4 kursi', 'Desain modern', 'Bahan berkualitas', 'Mudah dibersihkan'],
      dimensions: '45cm x 45cm x 85cm (per kursi)',
      colors: ['Hitam', 'Putih', 'Natural Kayu'],
      tags: ['kursi', 'kursi makan', 'dining', 'set']
    },
    {
      id: 10,
      title: 'Lemari Buku 5 Susun',
      category: 'office',
      price: 'Rp 725.000',
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=90',
      description: 'Lemari buku 5 susun dengan desain open shelf. Cocok untuk kantor atau ruang kerja di rumah.',
      features: ['5 susun', 'Open shelf', 'Material kayu', 'Mudah dirakit'],
      dimensions: '80cm x 30cm x 180cm',
      colors: ['Putih', 'Oak', 'Walnut'],
      tags: ['lemari', 'lemari buku', 'rak buku', 'kantor']
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Kategori', count: furnitureItems.length },
    { id: 'living-room', name: 'Ruang Tamu', count: furnitureItems.filter(item => item.category === 'living-room').length },
    { id: 'bedroom', name: 'Kamar Tidur', count: furnitureItems.filter(item => item.category === 'bedroom').length },
    { id: 'dining', name: 'Ruang Makan', count: furnitureItems.filter(item => item.category === 'dining').length },
    { id: 'kitchen', name: 'Dapur', count: furnitureItems.filter(item => item.category === 'kitchen').length },
    { id: 'office', name: 'Kantor', count: furnitureItems.filter(item => item.category === 'office').length }
  ];

  const filteredItems = useMemo(() => {
    return furnitureItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps -- furnitureItems is static list
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <section id="furniture" className="section furniture-ikea">
        <div className="container">
          <div className="furniture-header">
            <h1 className="furniture-title">Koleksi Furnitur Premium</h1>
            <p className="furniture-subtitle">
              Temukan furnitur berkualitas tinggi dengan desain modern dan fungsional untuk setiap ruang di rumah Anda
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="furniture-controls">
            <div className="search-container">
              <Search size={20} />
              <input
                type="text"
                placeholder="Cari furnitur, kategori, atau fitur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filter
            </button>
          </div>

          {/* Category Filter */}
          <div className={`category-filter ${showFilters ? 'show' : ''}`}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="results-info">
            Menampilkan {filteredItems.length} dari {furnitureItems.length} produk
          </div>

          {/* Furniture Grid */}
          <div className="furniture-grid-ikea">
            {filteredItems.map((item) => (
              <div key={item.id} className="furniture-card-ikea">
                <div className="furniture-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="furniture-actions">
                    <button className="action-btn" title="Lihat Detail">
                      <Eye size={18} />
                    </button>
                    <button className="action-btn" title="Tambah ke Wishlist">
                      <Heart size={18} />
                    </button>
                    <button className="action-btn" title="Konsultasi">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
                <div className="furniture-info">
                  <div className="furniture-category">{categories.find(cat => cat.id === item.category)?.name}</div>
                  <h3 className="furniture-name">{item.title}</h3>
                  <p className="furniture-desc">{item.description.substring(0, 100)}...</p>
                  <div className="furniture-price">{item.price}</div>
                  <button 
                    className="btn-detail"
                    onClick={() => setSelectedItem(item)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="no-results">
              <p>Tidak ada produk yang sesuai dengan pencarian Anda.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="furniture-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="furniture-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedItem(null)}
            >
              <X size={24} />
            </button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedItem.image} alt={selectedItem.title} />
              </div>
              
              <div className="modal-info">
                <div className="modal-category">
                  {categories.find(cat => cat.id === selectedItem.category)?.name}
                </div>
                <h2 className="modal-title">{selectedItem.title}</h2>
                <div className="modal-price">{selectedItem.price}</div>
                
                <div className="modal-description">
                  <p>{selectedItem.description}</p>
                </div>

                <div className="modal-features">
                  <h4>Fitur Utama:</h4>
                  <ul>
                    {selectedItem.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-specs">
                  <div className="spec-item">
                    <strong>Dimensi:</strong> {selectedItem.dimensions}
                  </div>
                  <div className="spec-item">
                    <strong>Pilihan Warna:</strong> {selectedItem.colors.join(', ')}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn btn-primary">
                    <ShoppingCart size={20} />
                    Konsultasi Sekarang
                  </button>
                  <button className="btn btn-secondary">
                    <Heart size={20} />
                    Simpan ke Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Furniture;

