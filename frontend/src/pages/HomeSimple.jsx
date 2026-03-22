import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, X, Target, Compass, ListChecks, Phone, Mail, MapPin, ArrowRight, Ruler, PaintBucket, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { youtubeVideos, homePortfolioItems } from '../content/homeContent';
import { pricingProjects, pricingCategories, pricingPackages } from '../content/pricingPageContent';
import { contactInfo } from '../content/contactPageContent';
import PortfolioRadioLayout from '../components/PortfolioRadioLayout';
import '../styles/portfolio-radio.css';
import '../styles/home-portfolio-pricing.css';
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

const HOME_PRICING_PACKAGES = [pricingPackages[0], pricingPackages[1], pricingPackages[3]].filter(Boolean);

const HOME_FACTS = [
  { label: 'Tahun Berdiri', value: 'Lebih dari 5 tahun' },
  { label: 'Lokasi', value: 'Tangerang Selatan, Pamulang' },
  { label: 'Area Layanan', value: 'Jabodetabek & sekitarnya' },
  { label: 'Fokus', value: 'Interior, Arsitektur, Renovasi' },
];

function HomeSimple() {
  const { t } = useLanguage();
  const [portfolioDetail, setPortfolioDetail] = useState(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
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
      {/* Hero Section - Landing Premium with Services (keep original UI) */}
      <section className="landing-hero">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-grain" />

        <div className="landing-hero-accent-bar" />

        <div className="landing-hero-split">
          <div className="landing-hero-content">
            <span className="landing-hero-badge">
              <span className="landing-hero-badge-dot" />
              {t('home.heroBadge')}
            </span>
            <h1 className="landing-hero-title">{t('home.heroTitle')}</h1>
            <p className="landing-hero-subtitle">{t('home.heroSubtitle')}</p>

            <div className="landing-hero-buttons">
              <Link to="/portfolio" className="landing-btn landing-btn-primary">
                {t('portfolio.viewAll')} <ArrowRight size={18} />
              </Link>
              <Link to="/harga" className="landing-btn landing-btn-secondary">
                {t('pricing.title')}
              </Link>
            </div>

            <Link to="/konsultasi" className="hero-cta-box">
              <div className="hero-cta-box-left">
                <span className="hero-cta-box-label">{t('nav.consultation')}</span>
                <span className="hero-cta-box-phone">
                  <Phone size={14} /> {contactInfo.phone}
                </span>
              </div>
              <span className="hero-cta-box-arrow">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>

          <div className="landing-hero-services">
            <Link to="/layanan" className="hero-service-card hero-service-card--interior">
              <span className="hero-service-num">01</span>
              <span className="hero-service-icon hero-service-icon--interior">
                <PaintBucket size={22} />
              </span>
              <div className="hero-service-text">
                <h3>{t('services.designInterior')}</h3>
                <p>{t('services.designInteriorLong')}</p>
              </div>
              <span className="hero-service-cta">
                {t('services.learnMore')} <ArrowRight size={14} />
              </span>
            </Link>
            <Link to="/layanan" className="hero-service-card hero-service-card--arch">
              <span className="hero-service-num">02</span>
              <span className="hero-service-icon hero-service-icon--arch">
                <Ruler size={22} />
              </span>
              <div className="hero-service-text">
                <h3>{t('services.architecture')}</h3>
                <p>{t('services.architectureLong')}</p>
              </div>
              <span className="hero-service-cta">
                {t('services.learnMore')} <ArrowRight size={14} />
              </span>
            </Link>
            <Link to="/layanan" className="hero-service-card hero-service-card--renovation">
              <span className="hero-service-num">03</span>
              <span className="hero-service-icon hero-service-icon--renovation">
                <Hammer size={22} />
              </span>
              <div className="hero-service-text">
                <h3>{t('services.renovation')}</h3>
                <p>{t('services.renovationLong')}</p>
              </div>
              <span className="hero-service-cta">
                {t('services.learnMore')} <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        <div className="landing-hero-bottom-fade" />
      </section>

      {/* Fade dot divider: hero → meet CEO + visi misi */}
      <div className="dot-divider dot-divider--hero-to-beige" />

      {/* Meet Our CEO Section */}
      <section className="home-meet-ceo" aria-labelledby="home-meet-ceo-heading">
        <div className="home-section-inner home-meet-ceo-inner">
          <div className="home-meet-ceo-text">
            <h2 id="home-meet-ceo-heading" className="home-meet-ceo-title">
              Meet Our CEO, Radika
            </h2>
            <p className="home-meet-ceo-subtitle">
              Radika memimpin PT Cipta Kreasi Buana dengan fokus pada desain interior yang fungsional,
              estetis, dan tepat waktu. Setiap proyek dikerjakan dengan pendekatan personal dan bertanggung jawab
              dari konsep sampai serah terima.
            </p>
            <p className="home-meet-ceo-body">
              Dengan pengalaman bertahun-tahun di bidang interior, arsitektur, dan renovasi, Radika memastikan
              setiap detail ruang benar-benar menjawab kebutuhan klien — mulai dari rumah tinggal, apartemen,
              hingga ruang komersial.
            </p>
          </div>
          <div className="home-meet-ceo-photo-wrap">
            <img
              src="/ceo-radika.png"
              alt="Radika, CEO PT Cipta Kreasi Buana - Jasa Design Interior dan Arsitektur"
              className="home-meet-ceo-photo"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Visi & Misi Section — two columns, SEO-friendly (all content in DOM) */}
      <section id="about" className="about-section about-section-v2 home-vm-two-col" aria-labelledby="vm-section-heading">
        <div className="home-section-inner home-vm-inner">
          <h2 id="vm-section-heading" className="home-vm-heading">Visi & Misi PT Cipta Kreasi Buana</h2>

          <div className="home-vm-grid">
            <div className="home-vm-col home-vm-col-left">
              <article className="home-vm-visi" aria-labelledby="vm-visi-heading">
                <div className="home-vm-col-inner">
                  <span className="home-vm-icon" aria-hidden><Compass size={32} /></span>
                  <h3 id="vm-visi-heading" className="home-vm-col-title">{t('about.visionTitle')}</h3>
                  <blockquote className="home-vm-quote" cite="#about">
                    {t('about.vision')}
                  </blockquote>
                </div>
              </article>
              <article className="home-vm-facts" aria-labelledby="home-vm-facts-heading">
                <div className="home-vm-col-inner">
                  <h3 id="home-vm-facts-heading" className="home-vm-col-title">Fakta tentang Perusahaan</h3>
                  <dl className="home-vm-facts-list">
                    {HOME_FACTS.map((item, i) => (
                      <div key={i} className="home-vm-facts-item">
                        <dt className="home-vm-facts-label">{item.label}</dt>
                        <dd className="home-vm-facts-value">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </div>

            <article className="home-vm-col home-vm-misi" aria-labelledby="vm-misi-heading">
              <div className="home-vm-col-inner">
                <span className="home-vm-icon" aria-hidden><Target size={32} /></span>
                <h3 id="vm-misi-heading" className="home-vm-col-title">{t('about.missionTitle')}</h3>
                <ol className="home-vm-list">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="home-vm-list-item">
                      <span className="home-vm-list-num" aria-hidden>{i + 1}</span>
                      <span className="home-vm-list-text">{t(`about.missionItems.${i}`)}</span>
                      <ListChecks size={18} className="home-vm-list-check" aria-hidden />
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Section: Design Interior — image kiri, deskripsi kanan */}
      <section className="home-design-interior" aria-labelledby="home-design-interior-heading">
        <div className="home-section-inner home-design-interior-inner">
          <div className="home-design-interior-image-wrap">
            <img
              src="/design-interior-flyer.png"
              alt="Modular Kitchen - Design Interior PT Cipta Kreasi Buana, upgrade pengalaman dapur Anda"
              className="home-design-interior-image"
              loading="lazy"
            />
          </div>
          <div className="home-design-interior-content">
            <h2 id="home-design-interior-heading" className="home-design-interior-title">
              Design Interior untuk Hunian & Komersial
            </h2>
            <p className="home-design-interior-lead">
              Modular Kitchen hingga upgrade penuh ruang — kami wujudkan desain yang berbicara, menginspirasi, dan menjadi milik Anda.
            </p>
            <p className="home-design-interior-body">
              Dari dapur modular berkualitas, ruang tamu, kamar tidur, hingga ruang komersial, PT Cipta Kreasi Buana menyediakan jasa desain interior dan build yang terintegrasi. Harga transparan per m², konsultasi gratis, dan eksekusi rapi sesuai timeline.
            </p>
            <p className="home-design-interior-price">
              <strong>Modular Kitchen</strong> — mulai dari <span className="home-design-interior-price-value">Rp 199.999/m²</span>
            </p>
            <Link to="/konsultasi" className="home-design-interior-cta">
              Book Konsultasi <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Fade dot divider: visi misi → portfolio */}
      <div className="dot-divider dot-divider--beige-shift" />

      {/* Portfolio Showcase - Radio Layout (overhauled) */}
      <section className="home-portfolio-showcase" aria-labelledby="home-portfolio-heading">
        <div className="home-section-inner">
          <h2 id="home-portfolio-heading">Portofolio Proyek Interior dan Arsitektur</h2>
          <PortfolioRadioLayout
            hideTitle
            onViewDetail={(item) => {
              setPortfolioDetail(item);
              setDetailImageIndex(0);
            }}
          />
          <div className="home-portfolio-showcase-cta">
            <Link to="/portfolio" className="home-hero-seo-btn home-hero-seo-btn-primary">
              Lihat Semua Proyek <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Fade dot divider: portfolio → pricing */}
      <div className="dot-divider dot-divider--beige-shift-alt" />

      {/* Pricing Preview (overhauled) */}
      <section id="pricing" className="home-pricing-preview" aria-labelledby="home-pricing-heading">
        <div className="home-section-inner">
          <h2 id="home-pricing-heading">Harga Jasa Design Interior</h2>
          <div className="home-pricing-cards">
            {HOME_PRICING_PACKAGES.map((pkg) => (
              <article key={pkg.id || pkg.name} className="home-pricing-card">
                <h3 className="home-pricing-card-title">{pkg.name}</h3>
                <p className="home-pricing-card-price">
                  Mulai {pkg.startingPrice ?? 'Rp —'}
                </p>
                <ul className="home-pricing-card-services">
                  {(pkg.includedServices || []).slice(0, 3).map((s, i) => (
                    <li key={i}>{typeof s === 'string' ? s : s?.label ?? s?.name ?? ''}</li>
                  ))}
                </ul>
                <div className="home-pricing-card-cta">
                  <Link to="/konsultasi">Konsultasi</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="home-pricing-cta-wrap">
            <Link to="/harga">Lihat Detail Harga</Link>
          </div>
        </div>
      </section>

      {/* Fade dot divider: pricing → contact */}
      <div className="dot-divider dot-divider--beige-shift" />

      {/* Contact Section - Hubungi Kami (unchanged) */}
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

      {/* Fade dot divider: contact → video */}
      <div className="dot-divider dot-divider--beige-shift-alt" />

      {/* Video Dokumentasi - Paling bawah, 3 video siap putar di dalam website (unchanged) */}
      <section id="videos" className="landing-section landing-videos videos-section">
        <div className="landing-container">
          <span className="landing-badge">{t('home.videoTitle')}</span>
          <h2 className="landing-title">{t('home.videoSubtitle')}</h2>
          <div className="videos-grid landing-videos-grid">
            {youtubeVideos.map((videoUrl, index) => (
              <div key={index} className="video-item">
                <iframe
                  src={getEmbedUrl(videoUrl) + '?rel=0'}
                  title={`${t('home.videoTitle')} ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Detail Modal - Interior design style with X close top-right */}
      {portfolioDetail && (
        <div
          className="landing-portfolio-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Detail portfolio"
        >
          <div className="landing-portfolio-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="landing-portfolio-modal-close"
              onClick={closeModal}
              aria-label="Tutup"
            >
              <X size={22} strokeWidth={2.5} />
            </button>
            <div className="landing-portfolio-modal-image-wrap">
              <img
                src={(portfolioDetail.images || [portfolioDetail.image])[detailImageIndex] || portfolioDetail.image}
                alt={portfolioDetail.title}
              />
              {portfolioDetail.images && portfolioDetail.images.length > 1 && (
                <div className="landing-portfolio-modal-thumbs">
                  {portfolioDetail.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setDetailImageIndex(i); }}
                      className={detailImageIndex === i ? 'active' : ''}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="landing-portfolio-modal-body">
              <span className="landing-portfolio-modal-cat">{portfolioDetail.category}</span>
              <h2 className="landing-portfolio-modal-title">{portfolioDetail.title}</h2>
              <p className="landing-portfolio-modal-desc">{portfolioDetail.description}</p>
              <div className="landing-portfolio-modal-actions">
                <Link to="/konsultasi" className="landing-portfolio-modal-btn primary">
                  {t('home.freeConsultation')}
                </Link>
                <Link to="/portfolio" className="landing-portfolio-modal-btn secondary">
                  {t('portfolio.viewAll')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeSimple;
