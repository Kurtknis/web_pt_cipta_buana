import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PaintBucket, Ruler, Wrench, Hammer, ArrowRight, CheckCircle2 } from 'lucide-react';
import '../App.css';

const services = [
  {
    id: 'design-interior',
    titleKey: 'services.designInterior',
    descKey: 'services.designInteriorLong',
    icon: PaintBucket,
    color: '#f5a623',
    colorLight: 'rgba(245,166,35,0.12)',
    image: '/photo_proyek/photoPJK/Apartemen Collins/Apartment-Collins-1.webp',
    highlights: ['services.highlights.interior.0', 'services.highlights.interior.1', 'services.highlights.interior.2'],
  },
  {
    id: 'arsitektur',
    titleKey: 'services.architecture',
    descKey: 'services.architectureLong',
    icon: Ruler,
    color: '#6aacef',
    colorLight: 'rgba(106,172,239,0.12)',
    image: '/photo_proyek/photoPJK/Facade Kampung Sawah/Rumah-Tinggal-Kampung-Sawah-1.webp',
    highlights: ['services.highlights.arch.0', 'services.highlights.arch.1', 'services.highlights.arch.2'],
  },
  {
    id: 'kontraktor',
    titleKey: 'services.contractor',
    descKey: 'services.contractorDesc',
    icon: Wrench,
    color: '#6ad88a',
    colorLight: 'rgba(106,216,138,0.12)',
    image: '/photo_proyek/photoPJK/Rumah Bogor/Rumah-Bogor-1.webp',
    highlights: ['services.highlights.contractor.0', 'services.highlights.contractor.1', 'services.highlights.contractor.2'],
  },
  {
    id: 'renovasi',
    titleKey: 'services.renovation',
    descKey: 'services.renovationLong',
    icon: Hammer,
    color: '#e0a05a',
    colorLight: 'rgba(224,160,90,0.12)',
    image: '/photo_proyek/photoPJK/Gunung Sindur/Rumah-Gunung-Sindur-1.webp',
    highlights: ['services.highlights.renovation.0', 'services.highlights.renovation.1', 'services.highlights.renovation.2'],
  },
];

function Services() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('svc-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="svc-page">
      {/* Hero banner */}
      <section className="svc-hero">
        <div className="svc-hero-bg" />
        <div className="svc-hero-inner">
          <span className="svc-hero-badge">{t('services.title')}</span>
          <h1 className="svc-hero-title">{t('services.subtitle')}</h1>
        </div>
      </section>

      {/* Service cards */}
      <section className="svc-list">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isReversed = i % 2 !== 0;

          return (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`svc-row svc-row--clickable ${isReversed ? 'svc-row--reversed' : ''}`}
              style={{ '--svc-accent': service.color, '--svc-accent-light': service.colorLight }}
              onClick={() => navigate(`/layanan/${service.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/layanan/${service.id}`); }}
            >
              <div className="svc-row-image">
                <img src={service.image} alt={t(service.titleKey)} loading="lazy" />
                <div className="svc-row-image-overlay" />
                <span className="svc-row-image-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="svc-row-content">
                <span className="svc-row-icon">
                  <Icon size={24} />
                </span>
                <h2 className="svc-row-title">{t(service.titleKey)}</h2>
                <p className="svc-row-desc">{t(service.descKey)}</p>
                <ul className="svc-row-highlights">
                  {service.highlights.map((hKey, j) => (
                    <li key={j}>
                      <CheckCircle2 size={16} />
                      <span>{t(hKey)}</span>
                    </li>
                  ))}
                </ul>
                <span className="svc-row-btn">
                  {t('services.learnMore')} <ArrowRight size={16} />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA bottom */}
      <section className="svc-cta">
        <h2 className="svc-cta-title">{t('home.contactUsTitle')}</h2>
        <p className="svc-cta-sub">{t('home.contactUsSubtitle')}</p>
        <Link to="/konsultasi" className="svc-cta-btn">
          {t('nav.consultation')} <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}

export default Services;
