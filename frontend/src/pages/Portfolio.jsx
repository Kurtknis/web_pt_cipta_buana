import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Award, ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../content/portfolioContent';
import PortfolioRadioLayout from '../components/PortfolioRadioLayout';
import '../styles/portfolio-radio.css';
import '../App.css';

function Portfolio() {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryMode, setIsGalleryMode] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

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

  useEffect(() => {
    if (selectedItem || isGalleryMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedItem, isGalleryMode]);

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  return (
    <>
      <section id="portfolio" className="portfolio-page">
        <div className="container">
          <h1>Portofolio Proyek Design Interior</h1>
          <p>
            Jelajahi berbagai proyek interior, arsitektur, dan renovasi yang telah
            kami kerjakan untuk klien di Tangerang Selatan dan Jakarta.
          </p>
          <PortfolioRadioLayout onViewDetail={handleViewDetail} />
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