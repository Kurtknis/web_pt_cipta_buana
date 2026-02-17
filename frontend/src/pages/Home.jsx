import React from 'react';
import { ChevronRight, Award, Users, Star, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { youtubeVideos, homePortfolioItems, beforeAfterPairs } from '../content/homeContent';
import { contactInfo, mapEmbedUrl } from '../content/contactPageContent';
import '../App.css';

function Home() {
  const { t } = useLanguage();
  const [portfolioDetail, setPortfolioDetail] = React.useState(null);
  const [beforeAfterDetail, setBeforeAfterDetail] = React.useState(null);
  const portfolioItems = homePortfolioItems;

  const getEmbedUrl = (url) => {
    const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
    const videoMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = shortsMatch ? shortsMatch[1] : (videoMatch ? videoMatch[1] : null);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{t('home.heroTitle')}</h1>
          <p className="hero-subtitle">{t('home.heroSubtitle')}</p>
          <div className="hero-buttons">
            <Link to="/konsultasi" className="btn btn-primary">
              {t('home.freeConsultation')} <ChevronRight size={20} />
            </Link>
            <Link to="/layanan" className="btn btn-secondary">
              {t('services.title')}
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section id="videos" className="section videos-section">
        <div className="container">
          <h2 className="section-title">{t('home.videoTitle')}</h2>
          <p className="section-subtitle">{t('home.videoSubtitle')}</p>
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
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - stacked di Home */}
      <section id="portfolio" className="section portfolio-section">
        <div className="container">
          <h2 className="section-title">{t('portfolio.title')}</h2>
          <p className="section-subtitle">{t('portfolio.subtitle')}</p>
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <button
                key={index}
                type="button"
                className="portfolio-item portfolio-item-btn"
                onClick={() => setPortfolioDetail(item)}
                aria-label={item.title}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="portfolio-overlay">
                  <span className="portfolio-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <span className="portfolio-view-detail">{t('portfolio.viewDetail') || 'Lihat detail'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Project */}
      <section id="before-after" className="section before-after-section">
        <div className="container">
          <h2 className="section-title">{t('home.beforeAfterTitle')}</h2>
          <p className="section-subtitle">{t('gallery.subtitle')}</p>
          <div className="before-after-grid">
            {beforeAfterPairs.map((pair, index) => (
              <button
                key={index}
                type="button"
                className="before-after-card before-after-card-btn"
                onClick={() => setBeforeAfterDetail(pair)}
                aria-label={pair.title}
              >
                <div className="before-after-half before-half">
                  <img src={pair.before} alt={t('home.before')} loading="lazy" />
                  <span className="before-after-label">{t('home.before')}</span>
                </div>
                <div className="before-after-half after-half">
                  <img src={pair.after} alt={t('home.after')} loading="lazy" />
                  <span className="before-after-label">{t('home.after')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us + Map */}
      <section id="contact-us" className="section contact-us-section">
        <div className="container">
          <h2 className="section-title">{t('home.contactUsTitle')}</h2>
          <p className="section-subtitle">{t('home.contactUsSubtitle')}</p>
          <div className="contact-us-grid">
            <div className="contact-us-info">
              <div className="contact-item">
                <Phone size={24} />
                <div>
                  <h4>{t('contact.phone')}</h4>
                  <p>{contactInfo.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={24} />
                <div>
                  <h4>{t('contact.email')}</h4>
                  <p>{contactInfo.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={24} />
                <div>
                  <h4>{t('contact.address')}</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-map-link"
              >
                {t('home.openInMaps')} <ChevronRight size={18} />
              </a>
            </div>
            <div className="contact-us-map">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px', minHeight: '320px' }}
                allowFullScreen=""
                loading="lazy"
                title="Lokasi PT Cipta Kreasi Buana"
              />
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="map-overlay-link"
                aria-label={t('home.openInMaps')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detail Portfolio */}
      {portfolioDetail && (
        <div className="detail-modal-overlay" onClick={() => setPortfolioDetail(null)} role="dialog" aria-modal="true" aria-label="Detail portfolio">
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="detail-modal-close" onClick={() => setPortfolioDetail(null)} aria-label="Tutup">×</button>
            <div className="detail-modal-image">
              <img src={portfolioDetail.image} alt={portfolioDetail.title} />
            </div>
            <div className="detail-modal-body">
              <span className="detail-modal-category">{portfolioDetail.category}</span>
              <h2 className="detail-modal-title">{portfolioDetail.title}</h2>
              <p className="detail-modal-desc">{portfolioDetail.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Before & After */}
      {beforeAfterDetail && (
        <div className="detail-modal-overlay" onClick={() => setBeforeAfterDetail(null)} role="dialog" aria-modal="true" aria-label="Detail before after">
          <div className="detail-modal detail-modal-beforeafter" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="detail-modal-close" onClick={() => setBeforeAfterDetail(null)} aria-label="Tutup">×</button>
            <h2 className="detail-modal-title">{beforeAfterDetail.title}</h2>
            <div className="detail-modal-ba-grid">
              <div className="detail-modal-ba-half">
                <img src={beforeAfterDetail.before} alt={t('home.before')} />
                <span className="before-after-label">{t('home.before')}</span>
              </div>
              <div className="detail-modal-ba-half">
                <img src={beforeAfterDetail.after} alt={t('home.after')} />
                <span className="before-after-label">{t('home.after')}</span>
              </div>
            </div>
            <p className="detail-modal-desc">{beforeAfterDetail.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
