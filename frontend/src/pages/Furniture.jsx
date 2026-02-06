import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../App.css';

function Furniture() {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const furnitureItems = [
    {
      id: 1,
      title: 'Sofa Minimalis Scandinavian',
      category: 'living-room',
      price: 'Rp 8.500.000',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
      description: 'Sofa 3 dudukan dengan desain Scandinavian, bahan fabric berkualitas tinggi, rangka kayu solid. Cocok untuk ruang tamu modern dengan nuansa hangat dan nyaman.',
      features: ['Bahan fabric premium', 'Rangka kayu solid', 'Busa high density', 'Garansi 2 tahun'],
      dimensions: '200cm x 85cm x 80cm',
      colors: ['Abu-abu', 'Krem', 'Navy'],
      tags: ['sofa', 'scandinavian', 'minimalis', 'ruang tamu']
    },
    {
      id: 2,
      title: 'Meja Makan Kayu Jati',
      category: 'dining',
      price: 'Rp 12.000.000',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=600',
      description: 'Meja makan solid kayu jati untuk 6 orang, finishing natural dengan lapisan melamic. Desain timeless yang tahan lama dan elegan.',
      features: ['Kayu jati solid', 'Finishing melamic', 'Kapasitas 6 orang', 'Anti rayap'],
      dimensions: '180cm x 90cm x 75cm',
      colors: ['Natural', 'Dark Brown', 'Honey'],
      tags: ['meja makan', 'kayu jati', 'dining', 'solid']
    },
    {
      id: 3,
      title: 'Lemari Pakaian Sliding Door',
      category: 'bedroom',
      price: 'Rp 15.500.000',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      description: 'Lemari pakaian 3 pintu sliding dengan cermin, interior organizer lengkap, dan lampu LED otomatis. Material HPL tahan lembab.',
      features: ['3 pintu sliding', 'Cermin built-in', 'LED lighting', 'Interior organizer'],
      dimensions: '240cm x 60cm x 220cm',
      colors: ['White Oak', 'Walnut', 'Grey'],
      tags: ['lemari', 'sliding door', 'bedroom', 'cermin']
    },
    {
      id: 4,
      title: 'Kitchen Set Modern L-Shape',
      category: 'kitchen',
      price: 'Rp 25.000.000',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      description: 'Kitchen set bentuk L dengan island, top table granit, soft closing system, dan built-in appliances. Desain modern dengan storage maksimal.',
      features: ['Granit top table', 'Soft closing', 'Built-in appliances', 'Island counter'],
      dimensions: '300cm x 250cm x 85cm',
      colors: ['White Gloss', 'Grey Matt', 'Wood Grain'],
      tags: ['kitchen set', 'modern', 'granit', 'island']
    },
    {
      id: 5,
      title: 'Rak TV Floating Minimalis',
      category: 'living-room',
      price: 'Rp 3.200.000',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
      description: 'Rak TV floating dengan storage tersembunyi, cable management system, dan LED strip lighting. Cocok untuk TV 55-65 inch.',
      features: ['Floating design', 'Cable management', 'LED lighting', 'Storage tersembunyi'],
      dimensions: '180cm x 35cm x 40cm',
      colors: ['White', 'Black', 'Walnut'],
      tags: ['rak tv', 'floating', 'minimalis', 'led']
    },
    {
      id: 6,
      title: 'Tempat Tidur Platform Modern',
      category: 'bedroom',
      price: 'Rp 9.800.000',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600',
      description: 'Tempat tidur platform dengan headboard berlapis fabric, storage drawer di bawah, dan side table terintegrasi. Ukuran King Size.',
      features: ['Platform design', 'Storage drawer', 'Fabric headboard', 'Side table built-in'],
      dimensions: '200cm x 180cm x 100cm',
      colors: ['Grey Fabric', 'Beige Fabric', 'Navy Fabric'],
      tags: ['tempat tidur', 'platform', 'storage', 'king size']
    },
    {
      id: 7,
      title: 'Kursi Kerja Ergonomis',
      category: 'office',
      price: 'Rp 2.800.000',
      image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600',
      description: 'Kursi kerja ergonomis dengan lumbar support, adjustable height, dan material mesh breathable. Cocok untuk work from home.',
      features: ['Lumbar support', 'Adjustable height', 'Mesh material', 'Roda smooth rolling'],
      dimensions: '65cm x 65cm x 110-120cm',
      colors: ['Black', 'Grey', 'White'],
      tags: ['kursi kerja', 'ergonomis', 'office', 'mesh']
    },
    {
      id: 8,
      title: 'Meja Kerja Standing Desk',
      category: 'office',
      price: 'Rp 4.500.000',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600',
      description: 'Meja kerja adjustable height electric, bisa duduk dan berdiri, dengan memory preset dan cable tray. Produktivitas maksimal.',
      features: ['Electric adjustable', 'Memory preset', 'Cable management', 'Anti-collision'],
      dimensions: '140cm x 70cm x 72-122cm',
      colors: ['White Frame', 'Black Frame', 'Silver Frame'],
      tags: ['meja kerja', 'standing desk', 'adjustable', 'electric']
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

