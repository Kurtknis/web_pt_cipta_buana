import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, X, Target, Compass, ListChecks, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { youtubeVideos, homePortfolioItems } from '../content/homeContent';
import { pricingProjects, pricingCategories } from '../content/pricingPageContent';
import { contactInfo } from '../content/contactPageContent';
import '../App.css';

const portfolioItems = homePortfolioItems.map((item) => ({
  ...item,
  images: item.images || [item.image]
}));

const getEmbedUrl = (url) => {
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  const videoMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  const videoId = shortsMatch ? shortsMatch[1] : (videoMatch ? videoMatch[1] : null);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

function HomeSimple() {
  const { t } = useLanguage();
  const [portfolioDetail, setPortfolioDetail] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const [aboutTab, setAboutTab] = useState('visi'); // 'visi' or 'misi'
  const [selectedPricingCategory, setSelectedPricingCategory] = useState('all');

  const filteredPricingProjects = selectedPricingCategory === 'all'
    ? pricingProjects
    : pricingProjects.filter(p => p.category === selectedPricingCategory);

  const closeModal = useCallback(() => setPortfolioDetail(null), []);
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [closeModal]);
  useEffect(() => {
    if (portfolioDetail) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [portfolioDetail]);

  return (
    <>
      {/* Hero Section - Landing Premium */}
      <section className="landing-hero">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <span className="landing-hero-badge">Interior & Desain</span>
          <h1 className="landing-hero-title">{t('home.heroTitle')}</h1>
          <p className="landing-hero-subtitle">{t('home.heroSubtitle')}</p>
          <div className="landing-hero-buttons">
            <Link to="/konsultasi" className="landing-btn landing-btn-primary">
              {t('home.freeConsultation')} <ChevronRight size={20} />
            </Link>
            <Link to="/layanan" className="landing-btn landing-btn-secondary">
              {t('services.title')}
            </Link>
          </div>
          <a href="#about" className="landing-hero-scroll" aria-label="Scroll ke bawah">
            <span className="landing-hero-scroll-line" />
            <span className="landing-hero-scroll-text">Scroll</span>
          </a>
        </div>
      </section>

      {/* Fade dot divider: hero → visi misi */}
      <div className="dot-divider dot-divider--hero-to-beige" />

      {/* Visi & Misi Section */}
      <section id="about" className="about-section about-section-v2">
        <div className="about-inner about-inner-v2">
          {/* Tab buttons */}
          <div className="vm-tabs">
            <button
              type="button"
              className={`vm-tab-btn ${aboutTab === 'visi' ? 'active' : ''}`}
              onClick={() => setAboutTab('visi')}
            >
              <Compass size={20} />
              {t('about.visionTitle')}
            </button>
            <button
              type="button"
              className={`vm-tab-btn ${aboutTab === 'misi' ? 'active' : ''}`}
              onClick={() => setAboutTab('misi')}
            >
              <Target size={20} />
              {t('about.missionTitle')}
            </button>
          </div>

          {/* Tab content */}
          <div className="vm-content">
            {aboutTab === 'visi' && (
              <div className="vm-panel vm-panel-visi">
                <div className="vm-panel-icon">
                  <Compass size={36} />
                </div>
                <h2 className="vm-panel-title">{t('about.visionTitle')}</h2>
                <blockquote className="vm-panel-quote">{t('about.vision')}</blockquote>
              </div>
            )}

            {aboutTab === 'misi' && (
              <div className="vm-panel vm-panel-misi">
                <div className="vm-panel-icon">
                  <Target size={36} />
                </div>
                <h2 className="vm-panel-title">{t('about.missionTitle')}</h2>
                <div className="vm-mission-grid">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="vm-mission-card">
                      <span className="vm-mission-num">{i + 1}</span>
                      <p className="vm-mission-text">{t(`about.missionItems.${i}`)}</p>
                      <ListChecks size={18} className="vm-mission-check" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fade dot divider: visi misi → portfolio */}
      <div className="dot-divider dot-divider--beige-shift" />

      {/* Portfolio Section - Landing */}
      <section className="landing-section landing-portfolio">
        <div className="landing-container">
          <span className="landing-badge">{t('portfolio.title')}</span>
          <h2 className="landing-title">{t('portfolio.subtitle')}</h2>
          <div className="landing-portfolio-grid">
            {portfolioItems.map((item) => (
              <button
                key={item.title}
                type="button"
                className="landing-portfolio-card"
                onClick={() => { setPortfolioDetail(item); setDetailImageIndex(0); }}
              >
                <div className="landing-portfolio-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="landing-portfolio-overlay">
                    <span>{t('portfolio.viewDetail')}</span>
                    <ChevronRight size={20} />
                  </span>
                </div>
                <div className="landing-portfolio-body">
                  <span className="landing-portfolio-cat">{item.category}</span>
                  <h3 className="landing-portfolio-name">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
          <div className="landing-cta-wrap">
            <Link to="/portfolio" className="landing-cta-btn">{t('portfolio.viewAll')} →</Link>
          </div>
        </div>
      </section>

      {/* Fade dot divider: portfolio → pricing */}
      <div className="dot-divider dot-divider--beige-shift-alt" />

      {/* Proyek & Harga Section - Landing */}
      <section id="pricing" className="landing-section landing-pricing pricing-projects-section">
        <div className="landing-container">
          <span className="landing-badge">{t('pricing.title')}</span>
          <h2 className="landing-title">{t('pricing.subtitle')}</h2>

          <div className="pricing-category-filter landing-pricing-filter">
            {pricingCategories.map((cat) => (
              <button
                key={cat.id}
                className={`pricing-cat-btn ${selectedPricingCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedPricingCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pricing-projects-grid">
            {filteredPricingProjects.map((project) => (
              <div key={project.id} className="pricing-project-card">
                <div className="pricing-project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="pricing-project-category">{project.category}</span>
                </div>
                <div className="pricing-project-info">
                  <h3>{project.title}</h3>
                  <p className="pricing-project-meta">{project.location} · {project.duration}</p>
                  <div className="pricing-project-price">{project.price}</div>
                  <Link to="/konsultasi" className="btn btn-primary pricing-consult-btn">
                    {t('pricing.consult')}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPricingProjects.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>
              Tidak ada proyek di kategori ini.
            </p>
          )}

          <div className="landing-cta-wrap">
            <Link to="/harga" className="landing-cta-btn">{t('pricing.title')} →</Link>
          </div>
        </div>
      </section>

      {/* Fade dot divider: pricing → video */}
      <div className="dot-divider dot-divider--beige-shift" />

      {/* Video Kami Section - Landing */}
      <section id="videos" className="landing-section landing-videos videos-section">
        <div className="landing-container">
          <span className="landing-badge">{t('home.videoTitle')}</span>
          <h2 className="landing-title">{t('home.videoSubtitle')}</h2>
          <div className="videos-grid landing-videos-grid">
            {youtubeVideos.map((videoUrl, index) => (
              <div key={index} className="video-item">
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title={`${t('home.videoTitle')} ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fade dot divider: video → contact */}
      <div className="dot-divider dot-divider--beige-shift-alt" />

      {/* Contact Section - Hubungi Kami */}
      <section className="contact-section-simple">
        <div className="contact-simple-inner">
          <h2 className="contact-simple-heading">{t('home.contactUsTitle')}</h2>
          <p className="contact-simple-subtitle">{t('home.contactUsSubtitle')}</p>

          <div className="contact-simple-grid">
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="contact-simple-card">
              <span className="contact-simple-card-icon contact-simple-card-icon--phone">
                <Phone size={28} />
              </span>
              <h3 className="contact-simple-card-label">{t('contact.phone')}</h3>
              <p className="contact-simple-card-value">{contactInfo.phone}</p>
              <span className="contact-simple-card-cta">{t('contact.callNow')} →</span>
            </a>

            <a href={`mailto:${contactInfo.email}`} className="contact-simple-card">
              <span className="contact-simple-card-icon contact-simple-card-icon--email">
                <Mail size={28} />
              </span>
              <h3 className="contact-simple-card-label">{t('contact.email')}</h3>
              <p className="contact-simple-card-value">{contactInfo.email}</p>
              <span className="contact-simple-card-cta">{t('contact.sendEmail')} →</span>
            </a>

            <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="contact-simple-card">
              <span className="contact-simple-card-icon contact-simple-card-icon--map">
                <MapPin size={28} />
              </span>
              <h3 className="contact-simple-card-label">{t('contact.address')}</h3>
              <p className="contact-simple-card-value contact-simple-card-value--small">{contactInfo.address}</p>
              <span className="contact-simple-card-cta">{t('contact.viewMap')} →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Detail Modal */}
      {portfolioDetail && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', overflowY: 'auto'
          }}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Detail portfolio"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: '16px', maxWidth: '900px', width: '100%',
              overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto'
            }}
          >
            <div style={{ position: 'relative' }}>
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
                  width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                  background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '1.5rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1
                }}
                aria-label="Tutup"
              >
                <X size={24} />
              </button>
              <div style={{ height: '320px', background: '#1a1a1a', position: 'relative' }}>
                <img
                  src={(portfolioDetail.images || [portfolioDetail.image])[detailImageIndex] || portfolioDetail.image}
                  alt={portfolioDetail.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {portfolioDetail.images && portfolioDetail.images.length > 1 && (
                  <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
                    {portfolioDetail.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setDetailImageIndex(i); }}
                        style={{
                          width: '48px', height: '32px', borderRadius: '4px', border: detailImageIndex === i ? '2px solid #f5a623' : '2px solid rgba(255,255,255,0.5)',
                          overflow: 'hidden', padding: 0, cursor: 'pointer', background: 'rgba(0,0,0,0.3)'
                        }}
                      >
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#f5a623', fontWeight: '600', textTransform: 'uppercase' }}>{portfolioDetail.category}</span>
                <h2 style={{ fontSize: '1.75rem', color: '#0f2744', margin: '0.5rem 0 1rem' }}>{portfolioDetail.title}</h2>
                <p style={{ color: '#2c2c2c', lineHeight: 1.7, fontSize: '1rem' }}>{portfolioDetail.description}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    to="/konsultasi"
                    style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f5a623', color: '#0a0a0a', borderRadius: '50px', textDecoration: 'none', fontWeight: '600' }}
                  >
                    {t('home.freeConsultation')}
                  </Link>
                  <Link
                    to="/portfolio"
                    style={{ padding: '0.75rem 1.5rem', backgroundColor: 'transparent', color: '#0f2744', border: '2px solid #0f2744', borderRadius: '50px', textDecoration: 'none', fontWeight: '600' }}
                  >
                    {t('portfolio.viewAll')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeSimple;