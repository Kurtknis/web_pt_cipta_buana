import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, X, ChevronLeft } from 'lucide-react';
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
  const [aboutStep, setAboutStep] = useState(0); // 0=intro, 1=vision, 2=mission
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
      {/* Hero Section */}
      <section className="hero" style={{ 
        background: `
          linear-gradient(135deg, rgba(15, 39, 68, 0.75), rgba(10, 10, 10, 0.65)),
          url('/background101.png') center/cover no-repeat,
          url('/inibackground.jpg') center/cover no-repeat,
          linear-gradient(135deg, #0f2744 0%, #0a0a0a 100%)
        `,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            color: 'white'
          }}>
            {t('home.heroTitle')}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem',
            color: 'rgba(255,255,255,0.9)'
          }}>
            {t('home.heroSubtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/konsultasi" 
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#f5a623',
                color: '#0a0a0a',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {t('home.freeConsultation')} <ChevronRight size={20} />
            </Link>
            <Link 
              to="/layanan" 
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: '600',
                border: '2px solid white'
              }}
            >
              {t('services.title')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          {aboutStep === 0 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f2744', marginBottom: '1.5rem' }}>
                {t('about.title')}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#2c2c2c', lineHeight: 1.8, marginBottom: '2rem' }}>
                {t('about.intro')}
              </p>
              <button
                onClick={() => setAboutStep(1)}
                style={{
                  padding: '1rem 2rem', backgroundColor: '#f5a623', color: '#0a0a0a', border: 'none',
                  borderRadius: '50px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex',
                  alignItems: 'center', gap: '0.5rem'
                }}
              >
                {t('about.learnMore')} <ChevronRight size={20} />
              </button>
            </div>
          )}
          {aboutStep === 1 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f2744', marginBottom: '1.5rem' }}>
                {t('about.visionTitle')}
              </h2>
              <blockquote style={{ fontSize: '1.4rem', color: '#2c2c2c', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '2rem' }}>
                {t('about.vision')}
              </blockquote>
              <button
                onClick={() => setAboutStep(2)}
                style={{
                  padding: '1rem 2rem', backgroundColor: '#f5a623', color: '#0a0a0a', border: 'none',
                  borderRadius: '50px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex',
                  alignItems: 'center', gap: '0.5rem'
                }}
              >
                {t('about.next')} <ChevronRight size={20} />
              </button>
            </div>
          )}
          {aboutStep === 2 && (
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f2744', marginBottom: '1.5rem', textAlign: 'center' }}>
                {t('about.missionTitle')}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem',
                    padding: '1rem', backgroundColor: '#f5f0e6', borderRadius: '12px', textAlign: 'left'
                  }}>
                    <span style={{ color: '#f5a623', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.6 }}>
                      {t(`about.missionItems.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setAboutStep(0)}
                  style={{
                    padding: '1rem 2rem', backgroundColor: 'transparent', color: '#0f2744', border: '2px solid #0f2744',
                    borderRadius: '50px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex',
                    alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  <ChevronLeft size={20} /> {t('about.back')}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Kami Section */}
      <section id="videos" className="section videos-section" style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0f2744', marginBottom: '0.5rem', textAlign: 'center' }}>
            {t('home.videoTitle')}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#2c2c2c', marginBottom: '2.5rem', textAlign: 'center' }}>
            {t('home.videoSubtitle')}
          </p>
          <div className="videos-grid">
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

      {/* Simple Content Section */}
      <section style={{ 
        padding: '5rem 0', 
        backgroundColor: '#f5f0e6',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#0f2744',
            marginBottom: '1rem'
          }}>
            {t('portfolio.title')}
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#2c2c2c',
            marginBottom: '3rem'
          }}>
            {t('portfolio.subtitle')}
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {portfolioItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => { setPortfolioDetail(item); setDetailImageIndex(0); }}
                style={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#f5a623', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.category}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f2744', margin: '0.5rem 0', lineHeight: 1.3 }}>{item.title}</h3>
                  <span style={{ fontSize: '0.9rem', color: '#f5a623', fontWeight: '500' }}>{t('portfolio.viewDetail')} →</span>
                </div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/portfolio" style={{ padding: '0.75rem 2rem', backgroundColor: '#0f2744', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-block' }}>
              {t('portfolio.viewAll')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Proyek & Harga Section */}
      <section id="pricing" className="section pricing-projects-section" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pricing-header">
            <h2 className="section-title">{t('pricing.title')}</h2>
            <p className="section-subtitle">{t('pricing.subtitle')}</p>
          </div>

          <div className="pricing-category-filter">
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

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/harga" style={{ padding: '0.75rem 2rem', backgroundColor: '#0f2744', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-block' }}>
              {t('pricing.title')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ 
        padding: '5rem 0', 
        backgroundColor: '#f5f0e6',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#0f2744',
            marginBottom: '1rem'
          }}>
            {t('home.contactUsTitle')}
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#2c2c2c',
            marginBottom: '3rem'
          }}>
            {t('home.contactUsSubtitle')}
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: '#f5f0e6',
              borderRadius: '12px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#f5a623', marginBottom: '0.5rem' }}>{t('contact.phone')}</h4>
              <p style={{ color: '#2c2c2c', margin: 0 }}>{contactInfo.phone}</p>
            </div>
            <div style={{
              padding: '2rem',
              backgroundColor: '#f5f0e6',
              borderRadius: '12px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#f5a623', marginBottom: '0.5rem' }}>{t('contact.email')}</h4>
              <p style={{ color: '#2c2c2c', margin: 0 }}>{contactInfo.email}</p>
            </div>
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