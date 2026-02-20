import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { priceRanges, pricingProjects, pricingCategories } from '../content/pricingPageContent';
import { Ruler, FileText, ChevronRight, MapPin, ArrowRight } from 'lucide-react';
import '../App.css';

function Pricing() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = selectedCategory === 'all'
    ? pricingProjects
    : pricingProjects.filter((p) => p.category === selectedCategory);

  return (
    <main id="pricing" className="pricing-page" role="main" aria-label="Proyek dan Harga">
      {/* Hero & intro */}
      <section className="pricing-hero">
        <div className="container">
          <span className="pricing-badge">{t('pricing.projectRef')}</span>
          <h1 className="pricing-hero-title">{t('pricing.title')}</h1>
          <p className="pricing-hero-subtitle">{t('pricing.subtitle')}</p>
        </div>
      </section>

      {/* Range Harga per m² (100 m² ke atas) */}
      <section className="pricing-range-section" aria-labelledby="range-harga-title">
        <div className="container">
          <div className="pricing-range-header">
            <h2 id="range-harga-title" className="pricing-range-title">
              <Ruler size={28} aria-hidden />
              {t('pricing.rangeTitle')}
            </h2>
            <p className="pricing-range-subtitle">{t('pricing.rangeSubtitle')}</p>
          </div>

          <div className="pricing-range-grid">
            {priceRanges.map((range, index) => (
              <article key={index} className="pricing-range-card">
                <div className="pricing-range-card-header">
                  <span className="pricing-range-sqm">
                    {range.sqmMin} – {range.sqmMax != null ? `${range.sqmMax} m²` : '500+ m²'}
                  </span>
                  <span className="pricing-range-price">{range.pricePerSqm}</span>
                </div>
                <p className="pricing-range-desc">{range.description}</p>
              </article>
            ))}
          </div>

          <p className="pricing-range-note">{t('pricing.note')}</p>
        </div>
      </section>

      {/* Referensi Proyek */}
      <section className="pricing-projects-section" aria-labelledby="ref-proyek-title">
        <div className="container">
          <div className="pricing-header">
            <h2 id="ref-proyek-title" className="pricing-section-title">{t('pricing.projectRef')}</h2>
            <p className="pricing-section-subtitle">{t('pricing.projectRefSub')}</p>
          </div>

          <div className="pricing-category-filter">
            {pricingCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`pricing-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pricing-projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="pricing-project-card">
                <div className="pricing-project-image">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.location}`}
                    loading="lazy"
                  />
                  <div className="pricing-project-image-overlay" />
                  <span className="pricing-project-category">{project.category}</span>
                </div>
                <div className="pricing-project-info">
                  <h3 className="pricing-project-title">{project.title}</h3>
                  <p className="pricing-project-meta">
                    <MapPin size={14} aria-hidden />
                    <span>
                      {project.location}
                      {project.duration && project.duration !== '-' && ` · ${project.duration}`}
                    </span>
                  </p>
                  {project.description && (
                    <p className="pricing-project-desc">{project.description}</p>
                  )}
                  <div className="pricing-project-price-row">
                    <div className="pricing-project-price">{project.price}</div>
                  </div>
                  <Link to="/konsultasi" className="pricing-consult-btn">
                    {t('pricing.consult')} <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="pricing-empty">
              <FileText size={48} aria-hidden />
              <p>Tidak ada proyek di kategori ini.</p>
            </div>
          )}

          <div className="pricing-cta">
            <p>Dapatkan penawaran sesuai luas dan kebutuhan Anda.</p>
            <Link to="/konsultasi" className="btn btn-primary pricing-cta-btn">
              {t('pricing.consult')} Gratis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Pricing;
