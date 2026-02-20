import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Filter, Eye, ExternalLink, Calendar, MapPin, Award, ChevronLeft, ChevronRight, X, Play, Grid, List } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../content/portfolioContent';
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

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const categoryNames = { Residential: 'Residensial', Commercial: 'Komersial', Hospitality: 'Hospitality', Interior: 'Interior' };
  const categories = useMemo(() => {
    const list = [{ id: 'all', name: 'Semua Kategori', count: portfolioItems.length }];
    const seen = new Set();
    portfolioItems.forEach((item) => {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        list.push({
          id: item.category,
          name: categoryNames[item.category] || item.category,
          count: portfolioItems.filter((p) => p.category === item.category).length
        });
      }
    });
    return list;
  // eslint-disable-next-line react-hooks/exhaustive-deps -- portfolioItems from module scope
  }, []);

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
  }, [categories]);

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
    { key: 'residential', image: portfolioItems.find(p => p.category === 'Residential')?.images?.[0] || '' },
    { key: 'corporate', image: portfolioItems.find(p => p.category === 'Commercial')?.images?.[0] || portfolioItems[0]?.images?.[0] || '' },
    { key: 'commercial', image: portfolioItems.find(p => p.category === 'Commercial')?.images?.[0] || portfolioItems[0]?.images?.[0] || '' }
  ].filter(t => t.image);

  return (
    <>
      <main id="portfolio" className="section portfolio-gallery-unique" role="main" aria-label="Portfolio proyek kami">
        <div className="container">
          {/* OUR PROJECT Section - foto asli proyek */}
          <div className="our-project-section">
            <h2 className="our-project-title">{t('portfolio.ourProject')}</h2>
            <p className="our-project-subtitle">{t('portfolio.ourProjectSubtitle')}</p>
            <div className="our-project-grid">
              {ourProjectTypes.map(({ key, image }) => (
                <article key={key} className="our-project-card">
                  <div className="our-project-image">
                    <img src={image} alt={`Proyek ${t(`portfolio.projectTypes.${key}.title`)} - PT Cipta Kreasi Buana`} loading="lazy" />
                  </div>
                  <div className="our-project-content">
                    <h3>{t(`portfolio.projectTypes.${key}.title`)}</h3>
                    <p>{t(`portfolio.projectTypes.${key}.desc`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <header className="portfolio-header-unique">
            <div className="portfolio-header-content">
              <span className="portfolio-badge">{t('portfolio.badge')}</span>
              <h1 className="portfolio-title-unique">{t('portfolio.title')}</h1>
              <p className="portfolio-subtitle-unique">{t('portfolio.subtitle')}</p>
            </div>
          </header>

          {/* Search and Filter - intuitif & aksesibel */}
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
                        {visibleItems.map((item) => (
                          <div key={item.id} className="carousel-slide">
                            <div
                              className="portfolio-card-carousel"
                              role="button"
                              tabIndex={0}
                              onClick={() => { setSelectedItem(item); setCurrentImageIndex(0); }}
                              onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedItem(item); setCurrentImageIndex(0); } }}
                            >
                              <div className="portfolio-image-container-carousel">
                                <img src={item.images[0]} alt={`${item.title} - Proyek PT Cipta Kreasi Buana`} loading="lazy" />
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
                                      onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setCurrentImageIndex(0); }}
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
                              </div>
                              <div className="portfolio-card-info-carousel">
                                <h4 className="portfolio-card-title">{item.title}</h4>
                                <p className="portfolio-description-preview">
                                  {item.description.substring(0, 120)}{item.description.length > 120 ? '...' : ''}
                                </p>
                                <div className="portfolio-card-footer">
                                  {item.client && item.client !== '-' && <span className="portfolio-client">Client: {item.client}</span>}
                                  <span className="portfolio-duration">{item.duration}</span>
                                </div>
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
                    onClick={() => { setSelectedItem(item); setCurrentImageIndex(0); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedItem(item); setCurrentImageIndex(0); } }}
                  >
                    <div className="portfolio-image-container-unique">
                      <img src={item.images[0]} alt={`${item.title} - Proyek PT Cipta Kreasi Buana`} loading="lazy" />
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
                            onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setCurrentImageIndex(0); }}
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
                    </div>
                    <div className="portfolio-card-info-unique">
                      <h4 className="portfolio-card-title">{item.title}</h4>
                      <p className="portfolio-description-preview">
                        {item.description.substring(0, 120)}{item.description.length > 120 ? '...' : ''}
                      </p>
                      <div className="portfolio-card-footer">
                        {item.client && item.client !== '-' && <span className="portfolio-client">Client: {item.client}</span>}
                        <span className="portfolio-duration">{item.duration}</span>
                      </div>
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
      </main>

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
                  alt={`Portfolio PT Cipta Kreasi Buana - foto ${currentImageIndex + 1} dari ${galleryImages.length}`}
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
                    alt={`${selectedItem.title} - Proyek PT Cipta Kreasi Buana (${currentImageIndex + 1}/${selectedItem.images.length})`}
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
              </div>

              {/* Detail Proyek */}
              <div className="modal-details-unique">
                <div className="modal-header-unique">
                  <div className="modal-category-unique">{selectedItem.category}</div>
                  <h2 className="modal-title-unique">{selectedItem.title}</h2>
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

                {(selectedItem.detailedDescription || selectedItem.description) && (
                  <div className="modal-description-unique">
                    <h4>{t('portfolio.modal.projectDesc')}</h4>
                    <p>{selectedItem.detailedDescription || selectedItem.description}</p>
                  </div>
                )}

                <div className="project-specs-unique">
                  <h4>{t('portfolio.modal.projectSpecs')}</h4>
                  <div className="spec-grid-unique">
                    {selectedItem.client && selectedItem.client !== '-' && (
                      <div className="spec-item-unique">
                        <strong>{t('portfolio.modal.client')}:</strong>
                        <span>{selectedItem.client}</span>
                      </div>
                    )}
                    <div className="spec-item-unique">
                      <strong>{t('portfolio.modal.duration')}:</strong>
                      <span>{selectedItem.duration}</span>
                    </div>
                    {selectedItem.budget && selectedItem.budget !== '-' && (
                      <div className="spec-item-unique">
                        <strong>{t('portfolio.modal.budget')}:</strong>
                        <span>{selectedItem.budget}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedItem.features && selectedItem.features.length > 0 && (
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
                )}

                {selectedItem.challenges && selectedItem.solution && (
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
                )}

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

                {selectedItem.testimonial && (
                  <div className="client-testimonial">
                    <h4>{t('portfolio.modal.testimonial')}</h4>
                    <blockquote>
                      "{selectedItem.testimonial}"
                    </blockquote>
                    {selectedItem.client && selectedItem.client !== '-' && <cite>- {selectedItem.client}</cite>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;