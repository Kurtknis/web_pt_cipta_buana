import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Search, Filter, Eye, ExternalLink, Calendar, MapPin, Award, ChevronLeft, ChevronRight, X, Play, Grid, List } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../App.css';

function Portfolio() {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryMode, setIsGalleryMode] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [viewMode, setViewMode] = useState('carousel'); // 'grid' or 'carousel'
  const [carouselIndex, setCarouselIndex] = useState({});
  const carouselRefs = useRef({});

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const portfolioItems = [
    {
      id: 1,
      title: 'Villa Minimalis Modern Bintaro',
      category: 'Residential',
      location: 'Bintaro, Jakarta Selatan',
      year: '2024',
      duration: '4 bulan',
      budget: 'Rp 850 juta',
      client: 'Keluarga Wijaya',
      images: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Renovasi total villa dengan konsep minimalis modern. Mengutamakan pencahayaan alami, material natural, dan ruang terbuka yang mengalir.',
      detailedDescription: 'Proyek renovasi villa seluas 350m² ini menghadirkan konsep open living yang memadukan ruang dalam dan luar.',
      features: ['Open concept living', 'Smart home system', 'Sustainable materials', 'Landscape garden'],
      challenges: 'Mengoptimalkan pencahayaan alami pada ruang yang sempit',
      solution: 'Penggunaan skylight dan void area untuk sirkulasi cahaya optimal',
      awards: ['Best Residential Design 2024', 'Sustainable Architecture Award'],
      testimonial: 'Tim PT Cipta Kreasi Buana berhasil mewujudkan impian keluarga kami.',
      clientRating: 5
    },
    {
      id: 2,
      title: 'Rumah Tropis Modern Pondok Indah',
      category: 'Residential',
      location: 'Pondok Indah, Jakarta Selatan',
      year: '2024',
      duration: '5 bulan',
      budget: 'Rp 1.2 miliar',
      client: 'Keluarga Santoso',
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Rumah tropis modern dengan ventilasi alami dan material ramah lingkungan.',
      detailedDescription: 'Desain rumah yang mengutamakan sirkulasi udara alami dengan konsep tropis modern.',
      features: ['Natural ventilation', 'Eco-friendly materials', 'Tropical garden', 'Rain water harvesting'],
      challenges: 'Menciptakan rumah yang sejuk tanpa AC berlebihan',
      solution: 'Desain cross ventilation dan penggunaan material yang tepat',
      awards: ['Green Building Award 2024'],
      testimonial: 'Rumah kami sekarang sejuk alami dan hemat energi.',
      clientRating: 5
    },
    {
      id: 3,
      title: 'Townhouse Kontemporer BSD',
      category: 'Residential',
      location: 'BSD City, Tangerang',
      year: '2023',
      duration: '3 bulan',
      budget: 'Rp 650 juta',
      client: 'Bapak Wijaya',
      images: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Townhouse kontemporer dengan desain yang efisien dan modern.',
      detailedDescription: 'Optimasi ruang pada townhouse dengan desain vertikal yang smart.',
      features: ['Vertical design', 'Space optimization', 'Modern fixtures', 'Smart storage'],
      challenges: 'Memaksimalkan ruang pada lahan terbatas',
      solution: 'Desain vertikal dengan storage tersembunyi',
      awards: ['Compact Design Excellence'],
      testimonial: 'Townhouse kecil terasa luas dan fungsional.',
      clientRating: 4
    },
    {
      id: 4,
      title: 'Kantor Modern Tech Startup',
      category: 'Commercial',
      location: 'SCBD, Jakarta Pusat',
      year: '2024',
      duration: '3 bulan',
      budget: 'Rp 1.2 miliar',
      client: 'PT Teknologi Maju',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Desain kantor modern untuk startup teknologi dengan konsep collaborative workspace.',
      detailedDescription: 'Kantor seluas 800m² ini dirancang dengan konsep agile workspace yang dapat beradaptasi.',
      features: ['Flexible workspace', 'Biophilic design', 'Acoustic solutions', 'Tech-integrated furniture'],
      challenges: 'Menciptakan ruang yang mendukung kolaborasi namun tetap produktif',
      solution: 'Zonasi area dengan acoustic treatment dan furniture modular',
      awards: ['Best Office Design 2024'],
      testimonial: 'Kantor baru kami meningkatkan produktivitas tim hingga 40%.',
      clientRating: 5
    },
    {
      id: 5,
      title: 'Co-working Space Senopati',
      category: 'Commercial',
      location: 'Senopati, Jakarta Selatan',
      year: '2023',
      duration: '4 bulan',
      budget: 'Rp 950 juta',
      client: 'Urban Workspace',
      images: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Co-working space dengan desain industrial modern untuk freelancer dan startup.',
      detailedDescription: 'Ruang kerja bersama yang inspiratif dengan berbagai zona kerja.',
      features: ['Industrial design', 'Flexible seating', 'Creative zones', 'Community areas'],
      challenges: 'Menciptakan privasi dalam ruang terbuka',
      solution: 'Acoustic panels dan pembagian zona yang efektif',
      awards: ['Best Co-working Design 2023'],
      testimonial: 'Co-working space yang paling nyaman di Jakarta Selatan.',
      clientRating: 5
    },
    {
      id: 6,
      title: 'Retail Store Fashion Brand',
      category: 'Commercial',
      location: 'Grand Indonesia, Jakarta Pusat',
      year: '2024',
      duration: '2 bulan',
      budget: 'Rp 750 juta',
      client: 'Fashion Brand Indonesia',
      images: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Retail store dengan konsep luxury modern untuk fashion brand premium.',
      detailedDescription: 'Store design yang mencerminkan brand identity dengan customer experience optimal.',
      features: ['Luxury materials', 'Brand identity integration', 'Customer flow optimization', 'Premium lighting'],
      challenges: 'Menciptakan brand experience yang memorable dalam space terbatas',
      solution: 'Strategic layout dan premium material selection',
      awards: ['Best Retail Design 2024'],
      testimonial: 'Store kami sekarang menjadi flagship yang membanggakan.',
      clientRating: 5
    },
    {
      id: 7,
      title: 'Hotel Boutique Lobby Menteng',
      category: 'Hospitality',
      location: 'Menteng, Jakarta Pusat',
      year: '2023',
      duration: '5 bulan',
      budget: 'Rp 2.1 miliar',
      client: 'Menteng Heritage Hotel',
      images: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Desain lobby hotel boutique dengan nuansa heritage modern yang memorable.',
      detailedDescription: 'Lobby hotel dengan ceiling tinggi 6 meter menampilkan perpaduan art deco klasik.',
      features: ['Heritage elements', 'Luxury materials', 'Ambient lighting', 'Art installations'],
      challenges: 'Mempertahankan karakter heritage sambil memberikan kesan modern',
      solution: 'Kombinasi material klasik dengan teknologi pencahayaan modern',
      awards: ['Best Hospitality Interior 2023', 'Heritage Preservation Award'],
      testimonial: 'Lobby kami sekarang menjadi landmark tersendiri.',
      clientRating: 5
    },
    {
      id: 8,
      title: 'Restaurant Fine Dining',
      category: 'Hospitality',
      location: 'Kemang, Jakarta Selatan',
      year: '2024',
      duration: '3 bulan',
      budget: 'Rp 850 juta',
      client: 'Fine Dining Restaurant',
      images: [
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Restaurant fine dining dengan atmosfer intimate dan elegant.',
      detailedDescription: 'Desain restaurant yang menciptakan dining experience yang tak terlupakan.',
      features: ['Intimate atmosphere', 'Acoustic design', 'Premium materials', 'Mood lighting'],
      challenges: 'Menciptakan suasana intimate dalam space yang cukup besar',
      solution: 'Pembagian zona dengan different lighting mood',
      awards: ['Best Restaurant Design 2024'],
      testimonial: 'Restaurant kami sekarang fully booked setiap hari.',
      clientRating: 5
    },
    {
      id: 9,
      title: 'Ruang Keluarga Skandinavia PIK',
      category: 'Interior',
      location: 'PIK, Jakarta Utara',
      year: '2024',
      duration: '1.5 bulan',
      budget: 'Rp 320 juta',
      client: 'Keluarga Lestari',
      images: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Redesign ruang keluarga dengan konsep Skandinavia: clean, bright, dan cozy.',
      detailedDescription: 'Ruang keluarga yang mengutamakan kenyamanan dan kehangatan untuk quality time keluarga.',
      features: ['Scandinavian aesthetics', 'Natural materials', 'Cozy atmosphere', 'Family-friendly design'],
      challenges: 'Menciptakan suasana hangat di iklim tropis',
      solution: 'Pemilihan material dan warna yang tepat dengan ventilasi optimal',
      awards: ['Family Living Space Award 2024'],
      testimonial: 'Ruang keluarga kami sekarang menjadi tempat favorit berkumpul.',
      clientRating: 5
    },
    {
      id: 10,
      title: 'Master Bedroom Luxury',
      category: 'Interior',
      location: 'Kelapa Gading, Jakarta Utara',
      year: '2023',
      duration: '2 bulan',
      budget: 'Rp 450 juta',
      client: 'Keluarga Hartono',
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800'
      ],
      mockups: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=600'
      ],
      description: 'Master bedroom dengan konsep luxury modern dan walk-in closet.',
      detailedDescription: 'Kamar tidur utama yang menjadi private sanctuary dengan semua fasilitas premium.',
      features: ['Walk-in closet', 'Luxury materials', 'Mood lighting', 'Private bathroom'],
      challenges: 'Mengintegrasikan semua fasilitas dalam satu ruang',
      solution: 'Smart layout dengan hidden storage solutions',
      awards: ['Luxury Interior Award 2023'],
      testimonial: 'Kamar tidur impian kami akhirnya terwujud.',
      clientRating: 5
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Kategori', count: portfolioItems.length },
    { id: 'Residential', name: 'Residensial', count: portfolioItems.filter(item => item.category === 'Residential').length },
    { id: 'Commercial', name: 'Komersial', count: portfolioItems.filter(item => item.category === 'Commercial').length },
    { id: 'Hospitality', name: 'Hospitality', count: portfolioItems.filter(item => item.category === 'Hospitality').length },
    { id: 'Interior', name: 'Interior', count: portfolioItems.filter(item => item.category === 'Interior').length }
  ];

  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Group items by category for carousel view
  const itemsByCategory = useMemo(() => {
    const grouped = {};
    categories.forEach(cat => {
      if (cat.id === 'all') return;
      grouped[cat.id] = portfolioItems.filter(item => item.category === cat.id);
    });
    return grouped;
  }, [portfolioItems]);

  // Carousel navigation functions
  const nextSlide = (category) => {
    const items = itemsByCategory[category];
    if (!items || items.length === 0) return;
    
    setCarouselIndex(prev => ({
      ...prev,
      [category]: ((prev[category] || 0) + 1) % Math.ceil(items.length / 3)
    }));
  };

  const prevSlide = (category) => {
    const items = itemsByCategory[category];
    if (!items || items.length === 0) return;
    
    setCarouselIndex(prev => ({
      ...prev,
      [category]: ((prev[category] || 0) - 1 + Math.ceil(items.length / 3)) % Math.ceil(items.length / 3)
    }));
  };

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (category) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide(category);
    }
    if (isRightSwipe) {
      prevSlide(category);
    }
  };

  const openGallery = (images, startIndex = 0) => {
    setGalleryImages(images);
    setCurrentImageIndex(startIndex);
    setIsGalleryMode(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const closeGallery = () => {
    setIsGalleryMode(false);
    setGalleryImages([]);
    setCurrentImageIndex(0);
  };

  // Reset image index when opening a new portfolio item
  useEffect(() => {
    if (selectedItem) setCurrentImageIndex(0);
  }, [selectedItem?.id]);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setSelectedItem(null);
      setIsGalleryMode(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal or gallery is open
  useEffect(() => {
    if (selectedItem || isGalleryMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedItem, isGalleryMode]);

  const ourProjectTypes = [
    { key: 'residential', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800' },
    { key: 'corporate', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
    { key: 'commercial', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800' }
  ];

  return (
    <>
      <section id="portfolio" className="section portfolio-gallery-unique">
        <div className="container">
          {/* OUR PROJECT Section */}
          <div className="our-project-section">
            <h2 className="our-project-title">{t('portfolio.ourProject')}</h2>
            <p className="our-project-subtitle">{t('portfolio.ourProjectSubtitle')}</p>
            <div className="our-project-grid">
              {ourProjectTypes.map(({ key, image }) => (
                <div key={key} className="our-project-card">
                  <div className="our-project-image">
                    <img src={image} alt={t(`portfolio.projectTypes.${key}.title`)} loading="lazy" />
                  </div>
                  <div className="our-project-content">
                    <h3>{t(`portfolio.projectTypes.${key}.title`)}</h3>
                    <p>{t(`portfolio.projectTypes.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="portfolio-header-unique">
            <div className="portfolio-header-content">
              <span className="portfolio-badge">{t('portfolio.badge')}</span>
              <h1 className="portfolio-title-unique">{t('portfolio.title')}</h1>
              <p className="portfolio-subtitle-unique">{t('portfolio.subtitle')}</p>
            </div>
            <div className="portfolio-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">{t('portfolio.stats.projects')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">{t('portfolio.stats.clients')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">{t('portfolio.stats.awards')}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filter */}
          <div className="portfolio-controls-unique">
            <div className="search-container-unique">
              <Search size={20} />
              <input
                type="text"
                placeholder={t('portfolio.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-unique"
              />
            </div>
            <div className="view-mode-toggle">
              <button 
                className={`view-mode-btn ${viewMode === 'carousel' ? 'active' : ''}`}
                onClick={() => setViewMode('carousel')}
                title={t('portfolio.viewModes.carousel')}
              >
                <List size={18} />
                {t('portfolio.viewModes.carousel')}
              </button>
              <button 
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title={t('portfolio.viewModes.grid')}
              >
                <Grid size={18} />
                {t('portfolio.viewModes.grid')}
              </button>
            </div>
          </div>

          {/* Carousel View by Category */}
          {viewMode === 'carousel' && (
            <div className="portfolio-carousel-container">
              {categories.filter(cat => cat.id !== 'all').map(category => {
                const items = itemsByCategory[category.id];
                if (!items || items.length === 0) return null;
                
                const currentIndex = carouselIndex[category.id] || 0;
                const itemsPerSlide = 3;
                const totalSlides = Math.ceil(items.length / itemsPerSlide);
                const startIndex = currentIndex * itemsPerSlide;
                const visibleItems = items.slice(startIndex, startIndex + itemsPerSlide);

                return (
                  <div key={category.id} className="category-carousel">
                    <div className="category-header">
                      <h2 className="category-title">
                        {category.name}
                        <span className="category-count">({items.length} proyek)</span>
                      </h2>
                      <div className="carousel-controls">
                        <button 
                          className="carousel-nav-btn prev"
                          onClick={() => prevSlide(category.id)}
                          disabled={totalSlides <= 1}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="carousel-indicator">
                          {currentIndex + 1} / {totalSlides}
                        </span>
                        <button 
                          className="carousel-nav-btn next"
                          onClick={() => nextSlide(category.id)}
                          disabled={totalSlides <= 1}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div 
                      className="carousel-track"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={() => onTouchEnd(category.id)}
                    >
                      <div className="carousel-slides">
                        {visibleItems.map((item, index) => (
                          <div key={item.id} className="carousel-slide">
                            <div
                              className="portfolio-card-carousel"
                              role="button"
                              tabIndex={0}
                              onClick={() => setSelectedItem(item)}
                              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedItem(item); }}
                            >
                              <div className="portfolio-image-container-carousel">
                                <img src={item.images[0]} alt={item.title} loading="lazy" />
                                <div className="portfolio-overlay-carousel">
                                  <div className="portfolio-info-preview">
                                    <span className="portfolio-category-badge-carousel">{item.category}</span>
                                    <h3 className="portfolio-title-preview">{item.title}</h3>
                                    <p className="portfolio-location-carousel">
                                      <MapPin size={16} />
                                      {item.location}
                                    </p>
                                    <div className="portfolio-meta-preview">
                                      <span className="portfolio-year">
                                        <Calendar size={14} />
                                        {item.year}
                                      </span>
                                      <span className="portfolio-budget">{item.budget}</span>
                                    </div>
                                  </div>
                                  <div className="portfolio-actions-carousel">
                                    <button 
                                      className="portfolio-action-btn gallery-btn"
                                      onClick={(e) => { e.stopPropagation(); openGallery(item.images, 0); }}
                                      title={t('portfolio.gallery')}
                                    >
                                      <Play size={18} />
                                      <span>{t('portfolio.gallery')}</span>
                                    </button>
                                    <button 
                                      className="portfolio-action-btn detail-btn"
                                      onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                                      title={t('portfolio.detail')}
                                    >
                                      <Eye size={18} />
                                      <span>{t('portfolio.detail')}</span>
                                    </button>
                                  </div>
                                </div>
                                {item.awards && item.awards.length > 0 && (
                                  <div className="portfolio-award-badge-carousel">
                                    <Award size={16} />
                                    <span>{item.awards.length}</span>
                                  </div>
                                )}
                                <div className="portfolio-rating">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < item.clientRating ? 'filled' : ''}`}>★</span>
                                  ))}
                                </div>
                              </div>
                              <div className="portfolio-card-info-carousel">
                                <h4 className="portfolio-card-title">{item.title}</h4>
                                <p className="portfolio-description-preview">
                                  {item.description.substring(0, 120)}...
                                </p>
                                <div className="portfolio-card-footer">
                                  <span className="portfolio-client">Client: {item.client}</span>
                                  <span className="portfolio-duration">{item.duration}</span>
                                </div>
                                {/* mockup thumbnails */}
                                {item.mockups && item.mockups.length > 0 && (
                                  <div className="card-mockups">
                                    {item.mockups.slice(0,2).map((m,mi) => (
                                      <button key={mi} className="mockup-thumb-btn" onClick={(e)=>{e.stopPropagation(); openGallery(item.mockups, mi);}}>
                                        <img src={m} alt={`Mockup ${mi+1}`} />
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Dots indicator */}
                    <div className="carousel-dots">
                      {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                          key={index}
                          className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                          onClick={() => setCarouselIndex(prev => ({ ...prev, [category.id]: index }))}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Grid View (existing) */}
          {viewMode === 'grid' && (
            <>
              {/* Category Filter */}
                <div className="category-filter-unique">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn-unique ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>

              {/* Results Info */}
              <div className="results-info-unique">
                <span>{t('portfolio.resultsInfo.showing')}</span>
                <strong>{filteredItems.length}</strong>
                <span>{t('portfolio.resultsInfo.of')}</span>
                <strong>{portfolioItems.length}</strong>
                <span>{t('portfolio.resultsInfo.projects')}</span>
              </div>

              {/* Portfolio Grid */}
              <div className="portfolio-grid-unique">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`portfolio-card-unique ${index % 3 === 1 ? 'featured' : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedItem(item)}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedItem(item); }}
                  >
                    <div className="portfolio-image-container-unique">
                      <img src={item.images[0]} alt={item.title} loading="lazy" />
                      <div className="portfolio-overlay-unique">
                        <div className="portfolio-info-preview">
                          <span className="portfolio-category-badge-unique">{item.category}</span>
                          <h3 className="portfolio-title-preview">{item.title}</h3>
                          <p className="portfolio-location-unique">
                            <MapPin size={16} />
                            {item.location}
                          </p>
                          <div className="portfolio-meta-preview">
                            <span className="portfolio-year">
                              <Calendar size={14} />
                              {item.year}
                            </span>
                            <span className="portfolio-budget">{item.budget}</span>
                          </div>
                        </div>
                        <div className="portfolio-actions-unique">
                          <button 
                            className="portfolio-action-btn gallery-btn"
                            onClick={(e) => { e.stopPropagation(); openGallery(item.images, 0); }}
                            title={t('portfolio.gallery')}
                          >
                            <Play size={18} />
                            <span>{t('portfolio.gallery')}</span>
                          </button>
                          <button 
                            className="portfolio-action-btn detail-btn"
                            onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                            title={t('portfolio.detail')}
                          >
                            <Eye size={18} />
                            <span>{t('portfolio.detail')}</span>
                          </button>
                        </div>
                      </div>
                      {item.awards && item.awards.length > 0 && (
                        <div className="portfolio-award-badge-unique">
                          <Award size={16} />
                          <span>{item.awards.length}</span>
                        </div>
                      )}
                      <div className="portfolio-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < item.clientRating ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className="portfolio-card-info-unique">
                      <h4 className="portfolio-card-title">{item.title}</h4>
                      <p className="portfolio-description-preview">
                        {item.description.substring(0, 120)}...
                      </p>
                      <div className="portfolio-card-footer">
                        <span className="portfolio-client">Client: {item.client}</span>
                        <span className="portfolio-duration">{item.duration}</span>
                      </div>
                      {item.mockups && item.mockups.length > 0 && (
                        <div className="card-mockups">
                          {item.mockups.slice(0,2).map((m,mi) => (
                            <button key={mi} className="mockup-thumb-btn" onClick={(e)=>{e.stopPropagation(); openGallery(item.mockups, mi);}}>
                              <img src={m} alt={`Mockup ${mi+1}`} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="no-results-unique">
                    <div className="no-results-icon"><Search size={48} strokeWidth={1.5} /></div>
                    <h3>{t('portfolio.noResults.title')}</h3>
                    <p>{t('portfolio.noResults.subtitle')}</p>
                    <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                      {t('portfolio.noResults.reset')}
                    </button>
                  </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Special Gallery Mode with Slide Transition */}
      {isGalleryMode && (
        <div className="gallery-modal-unique">
          <div className="gallery-overlay" onClick={closeGallery}></div>
          <div className="gallery-container">
            <button className="gallery-close" onClick={closeGallery}>
              <X size={24} />
            </button>
            
            <div className="gallery-main">
              <button className="gallery-nav-btn prev" onClick={prevImage}>
                <ChevronLeft size={30} />
              </button>
              
              <div className="gallery-image-container">
                <img 
                  src={galleryImages[currentImageIndex]} 
                  alt={`Gallery ${currentImageIndex + 1}`}
                  className="gallery-main-image"
                />
                <div className="gallery-info">
                  <span className="gallery-counter">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>
              </div>
              
              <button className="gallery-nav-btn next" onClick={nextImage}>
                <ChevronRight size={30} />
              </button>
            </div>
            
            <div className="gallery-thumbnails">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  className={`gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Detail Modal */}
      {selectedItem && (
        <div className="portfolio-modal-overlay-unique" onClick={() => setSelectedItem(null)}>
          <div className="portfolio-modal-unique" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-unique"
              onClick={() => setSelectedItem(null)}
            >
              <X size={24} />
            </button>
            
            <div className="modal-content-unique">
              {/* Enhanced Image Section */}
              <div className="modal-gallery-unique">
                <div className="modal-main-image">
                  <img 
                    src={selectedItem.images[currentImageIndex]} 
                    alt={`${selectedItem.title} - ${currentImageIndex + 1}`}
                  />
                  <button 
                    className="modal-gallery-btn"
                    onClick={() => openGallery(selectedItem.images, currentImageIndex)}
                  >
                    <Play size={20} />
                    {t('portfolio.modal.viewGallery')}
                  </button>
                </div>
                
                <div className="modal-thumbnails">
                  {selectedItem.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      className={`modal-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                      {index === 3 && selectedItem.images.length > 4 && (
                        <div className="thumbnail-overlay">
                          +{selectedItem.images.length - 4}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Mockup Section */}
                <div className="mockup-section">
                  <h4>{t('portfolio.modal.designMockups')}</h4>
                  <div className="mockup-grid">
                    {selectedItem.mockups.map((mockup, index) => (
                      <div key={index} className="mockup-item">
                        <img src={mockup} alt={`Mockup ${index + 1}`} />
                        <div className="mockup-label">Mockup {index + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Project Details */}
              <div className="modal-details-unique">
                <div className="modal-header-unique">
                  <div className="modal-category-unique">{selectedItem.category}</div>
                  <h2 className="modal-title-unique">{selectedItem.title}</h2>
                  <div className="modal-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < selectedItem.clientRating ? 'filled' : ''}`}>★</span>
                    ))}
                    <span className="rating-text">({selectedItem.clientRating}/5)</span>
                  </div>
                  <div className="modal-meta-unique">
                    <div className="meta-item">
                      <MapPin size={16} />
                      <span>{selectedItem.location}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{selectedItem.year}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-description-unique">
                  <h4>{t('portfolio.modal.projectDesc')}</h4>
                  <p>{selectedItem.detailedDescription}</p>
                </div>

                <div className="project-specs-unique">
                  <h4>{t('portfolio.modal.projectSpecs')}</h4>
                  <div className="spec-grid-unique">
                    <div className="spec-item-unique">
                      <strong>{t('portfolio.modal.client')}:</strong>
                      <span>{selectedItem.client}</span>
                    </div>
                    <div className="spec-item-unique">
                      <strong>{t('portfolio.modal.duration')}:</strong>
                      <span>{selectedItem.duration}</span>
                    </div>
                    <div className="spec-item-unique">
                      <strong>{t('portfolio.modal.budget')}:</strong>
                      <span>{selectedItem.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="project-features-unique">
                  <h4>{t('portfolio.modal.mainFeatures')}</h4>
                  <div className="features-grid-unique">
                    {selectedItem.features.map((feature, index) => (
                      <span key={index} className="feature-tag-unique">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-challenge-unique">
                  <h4>{t('portfolio.modal.challengeSolution')}</h4>
                  <div className="challenge-solution-unique">
                    <div className="challenge-unique">
                      <strong>{t('portfolio.modal.challenge')}:</strong>
                      <p>{selectedItem.challenges}</p>
                    </div>
                    <div className="solution-unique">
                      <strong>{t('portfolio.modal.solution')}:</strong>
                      <p>{selectedItem.solution}</p>
                    </div>
                  </div>
                </div>

                {selectedItem.awards && selectedItem.awards.length > 0 && (
                  <div className="project-awards-unique">
                    <h4>{t('portfolio.modal.awards')}</h4>
                    <div className="awards-list-unique">
                      {selectedItem.awards.map((award, index) => (
                        <div key={index} className="award-item-unique">
                          <Award size={16} />
                          <span>{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="client-testimonial">
                  <h4>{t('portfolio.modal.testimonial')}</h4>
                  <blockquote>
                    "{selectedItem.testimonial}"
                  </blockquote>
                  <cite>- {selectedItem.client}</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;