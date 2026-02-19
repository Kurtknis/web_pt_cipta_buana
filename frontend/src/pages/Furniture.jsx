import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Heart, ShoppingCart, Eye } from 'lucide-react';
import '../App.css';

function Furniture() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const getEstimatedPrice = (seed) => {
    const min = 500000;
    const max = 4000000;
    const step = 50000;
    const pseudoRandom = (Math.sin(seed * 999) + 1) / 2;
    const value = min + Math.round(((max - min) * pseudoRandom) / step) * step;
    return `Rp ${value.toLocaleString('id-ID')}`;
  };
  const toNumberPrice = (priceText) => Number(priceText.replace(/[^\d]/g, ''));
  const formatIdr = (value) => `Rp ${value.toLocaleString('id-ID')}`;

  const furnitureItems = [
    {
      id: 1,
      title: 'Sofa Ruang Tamu Modern',
      category: 'living-room',
      price: '',
      image: '/Photo_furnitur/pexels-alex-tyson-919593032-19955710.jpg',
      description: 'Desain sofa modern untuk ruang tamu dengan tampilan elegan dan nyaman untuk penggunaan harian.',
      features: ['Desain modern', 'Nyaman dipakai', 'Cocok untuk ruang tamu', 'Finishing rapi'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['sofa', 'living room', 'ruang tamu', 'furnitur']
    },
    {
      id: 2,
      title: 'Set Meja Makan Premium',
      category: 'dining',
      price: '',
      image: '/Photo_furnitur/pexels-artbovich-6527044.jpg',
      description: 'Set meja makan dengan konsep clean dan premium untuk menciptakan area makan yang hangat.',
      features: ['Material premium', 'Desain clean', 'Nyaman untuk keluarga', 'Custom ukuran'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['meja makan', 'dining', 'ruang makan', 'furnitur']
    },
    {
      id: 3,
      title: 'Lemari Kamar Tidur Minimalis',
      category: 'bedroom',
      price: '',
      image: '/Photo_furnitur/pexels-artbovich-6585750.jpg',
      description: 'Lemari kamar tidur dengan gaya minimalis, storage optimal, dan tampilan modern.',
      features: ['Storage optimal', 'Desain minimalis', 'Material berkualitas', 'Custom layout'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['lemari', 'bedroom', 'kamar tidur', 'furnitur']
    },
    {
      id: 4,
      title: 'Kitchen Cabinet Modern',
      category: 'kitchen',
      price: '',
      image: '/Photo_furnitur/pexels-artbovich-6782440.jpg',
      description: 'Kabinet dapur modern dengan tampilan bersih dan fungsional untuk kebutuhan sehari-hari.',
      features: ['Fungsional', 'Desain modern', 'Storage efisien', 'Custom kitchen'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['kitchen', 'dapur', 'kabinet', 'furnitur']
    },
    {
      id: 5,
      title: 'Rak TV & Display',
      category: 'living-room',
      price: '',
      image: '/Photo_furnitur/pexels-artbovich-7512047.jpg',
      description: 'Rak TV dan display dengan bentuk modern untuk mempercantik area living room.',
      features: ['Tampilan modern', 'Storage tambahan', 'Cocok TV unit', 'Custom design'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['rak tv', 'display', 'living room', 'furnitur']
    },
    {
      id: 6,
      title: 'Tempat Tidur Custom',
      category: 'bedroom',
      price: '',
      image: '/Photo_furnitur/pexels-artbovich-8134812.jpg',
      description: 'Tempat tidur custom dengan proporsi ideal untuk kenyamanan dan estetika kamar.',
      features: ['Custom ukuran', 'Desain elegan', 'Konstruksi kuat', 'Nyaman'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['tempat tidur', 'bed', 'kamar tidur', 'furnitur']
    },
    {
      id: 7,
      title: 'Kursi Lounge Interior',
      category: 'living-room',
      price: '',
      image: '/Photo_furnitur/pexels-fotografiagmazg-10439748.jpg',
      description: 'Kursi lounge untuk interior modern dengan bentuk estetik dan ergonomi nyaman.',
      features: ['Ergonomis', 'Estetik', 'Material berkualitas', 'Custom pilihan'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['kursi', 'lounge', 'living room', 'furnitur']
    },
    {
      id: 8,
      title: 'Set Furnitur Ruang Makan',
      category: 'dining',
      price: '',
      image: '/Photo_furnitur/pexels-gatranro-9877527.jpg',
      description: 'Set furnitur ruang makan dengan nuansa hangat untuk pengalaman makan yang nyaman.',
      features: ['Set lengkap', 'Desain modern', 'Nyaman', 'Custom kebutuhan'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['dining set', 'ruang makan', 'meja', 'furnitur']
    },
    {
      id: 9,
      title: 'Wardrobe Built-in',
      category: 'bedroom',
      price: '',
      image: '/Photo_furnitur/pexels-katetrifo-4057059.jpg',
      description: 'Wardrobe built-in untuk kamar tidur agar lebih rapi, modern, dan hemat ruang.',
      features: ['Built-in', 'Hemat ruang', 'Storage besar', 'Custom finishing'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['wardrobe', 'lemari', 'bedroom', 'furnitur']
    },
    {
      id: 10,
      title: 'Meja Kerja Home Office',
      category: 'office',
      price: '',
      image: '/Photo_furnitur/pexels-lisa-anna-901356985-19866406.jpg',
      description: 'Meja kerja home office dengan tampilan modern, cocok untuk produktivitas harian.',
      features: ['Home office', 'Desain rapi', 'Custom ukuran', 'Fungsional'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['meja kerja', 'office', 'home office', 'furnitur']
    },
    {
      id: 11,
      title: 'Kursi Kerja Ergonomis',
      category: 'office',
      price: '',
      image: '/Photo_furnitur/pexels-paulseling-20551757.jpg',
      description: 'Kursi kerja ergonomis untuk kenyamanan duduk lebih lama di area kerja.',
      features: ['Ergonomis', 'Nyaman', 'Desain modern', 'Custom opsi'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['kursi kerja', 'office', 'ergonomis', 'furnitur']
    },
    {
      id: 12,
      title: 'Storage Kabinet Kantor',
      category: 'office',
      price: '',
      image: '/Photo_furnitur/pexels-paulseling-20552473.jpg',
      description: 'Kabinet penyimpanan kantor dengan tampilan profesional dan kapasitas besar.',
      features: ['Storage besar', 'Rapi', 'Konstruksi kuat', 'Custom kebutuhan'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['kabinet', 'office', 'storage', 'furnitur']
    },
    {
      id: 13,
      title: 'Kitchen Island & Storage',
      category: 'kitchen',
      price: '',
      image: '/Photo_furnitur/pexels-paulseling-20557234.jpg',
      description: 'Kitchen island dengan storage tambahan untuk dapur yang lebih efektif dan estetik.',
      features: ['Island table', 'Storage optimal', 'Desain modern', 'Custom ukuran'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['kitchen island', 'dapur', 'kitchen', 'furnitur']
    },
    {
      id: 14,
      title: 'Meja Makan Minimalis',
      category: 'dining',
      price: '',
      image: '/Photo_furnitur/pexels-paulseling-20588031.jpg',
      description: 'Meja makan minimalis dengan proporsi ideal untuk ruang makan modern.',
      features: ['Minimalis', 'Desain modern', 'Material berkualitas', 'Custom opsi'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['meja makan', 'dining', 'minimalis', 'furnitur']
    },
    {
      id: 15,
      title: 'Sofa Corner Contemporary',
      category: 'living-room',
      price: '',
      image: '/Photo_furnitur/pexels-shkrabaanthony-4498879.jpg',
      description: 'Sofa corner contemporary untuk memberikan karakter modern pada ruang keluarga.',
      features: ['Model corner', 'Nyaman', 'Desain contemporary', 'Custom upholstery'],
      dimensions: 'Custom',
      colors: ['Custom'],
      tags: ['sofa', 'corner', 'living room', 'furnitur']
    }
  ];

  const furnitureItemsPriced = useMemo(
    () => furnitureItems.map((item) => ({ ...item, price: getEstimatedPrice(item.id) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- price seed uses static item id
    []
  );

  const categories = [
    { id: 'all', name: 'Semua Kategori', count: furnitureItemsPriced.length },
    { id: 'living-room', name: 'Ruang Tamu', count: furnitureItemsPriced.filter(item => item.category === 'living-room').length },
    { id: 'bedroom', name: 'Kamar Tidur', count: furnitureItemsPriced.filter(item => item.category === 'bedroom').length },
    { id: 'dining', name: 'Ruang Makan', count: furnitureItemsPriced.filter(item => item.category === 'dining').length },
    { id: 'kitchen', name: 'Dapur', count: furnitureItemsPriced.filter(item => item.category === 'kitchen').length },
    { id: 'office', name: 'Kantor', count: furnitureItemsPriced.filter(item => item.category === 'office').length }
  ];

  const filteredItems = useMemo(() => {
    return furnitureItemsPriced.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, furnitureItemsPriced]);
  const showcaseItems = furnitureItemsPriced.slice(0, 5);

  return (
    <>
      <section id="furniture" className="section furniture-ikea">
        <div className="container">
          <div className="furniture-header">
            <h1 className="furniture-title">Koleksi Furnitur Premium</h1>
            <p className="furniture-subtitle">
              Temukan furnitur berkualitas tinggi dengan desain modern dan fungsional untuk setiap ruang di rumah Anda.
              Semua produk tersedia pada rentang harga Rp 500.000 - Rp 4.000.000.
            </p>
          </div>

          {/* IKEA-style showcase grid */}
          <div className="ikea-showcase-head">
            <h2 className="ikea-showcase-title">Pilihan terbaik untuk hunian Anda</h2>
            <button type="button" className="ikea-shop-btn">Belanja sekarang</button>
          </div>
          <div className="ikea-showcase-grid">
            {showcaseItems[0] && (
              <article className="ikea-tile ikea-tile--hero" onClick={() => setSelectedItem(showcaseItems[0])}>
                <img src={showcaseItems[0].image} alt={showcaseItems[0].title} loading="lazy" />
                <div className="ikea-tile-content">
                  <span className="ikea-promo-chip">Promo murah</span>
                  <h3>{showcaseItems[0].title}</h3>
                  <p className="ikea-old-price">{formatIdr(Math.round(toNumberPrice(showcaseItems[0].price) * 1.22))}</p>
                  <p className="ikea-new-price">{showcaseItems[0].price}</p>
                </div>
              </article>
            )}

            <article className="ikea-tile ikea-tile--promo">
              <span>Promo</span>
              <strong>Murah</strong>
              <p>Harga Hemat, Kualitas Hebat</p>
            </article>

            {showcaseItems[1] && (
              <article className="ikea-tile ikea-tile--tall" onClick={() => setSelectedItem(showcaseItems[1])}>
                <img src={showcaseItems[1].image} alt={showcaseItems[1].title} loading="lazy" />
                <div className="ikea-tile-content">
                  <span className="ikea-promo-chip">Promo murah</span>
                  <h3>{showcaseItems[1].title}</h3>
                  <p className="ikea-old-price">{formatIdr(Math.round(toNumberPrice(showcaseItems[1].price) * 1.2))}</p>
                  <p className="ikea-new-price">{showcaseItems[1].price}</p>
                </div>
              </article>
            )}

            {showcaseItems[2] && (
              <article className="ikea-tile ikea-tile--small" onClick={() => setSelectedItem(showcaseItems[2])}>
                <img src={showcaseItems[2].image} alt={showcaseItems[2].title} loading="lazy" />
                <div className="ikea-tile-content">
                  <span className="ikea-promo-chip">Promo murah</span>
                  <h3>{showcaseItems[2].title}</h3>
                  <p className="ikea-old-price">{formatIdr(Math.round(toNumberPrice(showcaseItems[2].price) * 1.18))}</p>
                  <p className="ikea-new-price">{showcaseItems[2].price}</p>
                </div>
              </article>
            )}

            {showcaseItems[3] && (
              <article className="ikea-tile ikea-tile--small" onClick={() => setSelectedItem(showcaseItems[3])}>
                <img src={showcaseItems[3].image} alt={showcaseItems[3].title} loading="lazy" />
                <div className="ikea-tile-content">
                  <span className="ikea-promo-chip">Promo murah</span>
                  <h3>{showcaseItems[3].title}</h3>
                  <p className="ikea-old-price">{formatIdr(Math.round(toNumberPrice(showcaseItems[3].price) * 1.18))}</p>
                  <p className="ikea-new-price">{showcaseItems[3].price}</p>
                </div>
              </article>
            )}
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
            Menampilkan {filteredItems.length} dari {furnitureItemsPriced.length} produk
          </div>

          {/* Furniture Grid */}
          <div className="furniture-grid-ikea">
            {filteredItems.map((item) => (
              <div key={item.id} className="furniture-card-ikea">
                <div className="furniture-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="furniture-actions">
                    <button className="action-btn" title="Lihat Detail" onClick={() => setSelectedItem(item)}>
                      <Eye size={18} />
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

