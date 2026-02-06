import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsWithPricing } from '../data/projectsWithPricing';
import '../App.css';

function Pricing() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'Residential', name: 'Residential' },
    { id: 'Corporate', name: 'Kantor/Corporate' },
    { id: 'Commercial', name: 'Commercial' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsWithPricing
    : projectsWithPricing.filter(p => p.category === selectedCategory);

  return (
    <section id="pricing" className="section pricing-projects-section">
      <div className="container">
        <div className="pricing-header">
          <h2 className="section-title">{t('pricing.title')}</h2>
          <p className="section-subtitle">{t('pricing.subtitle')}</p>
        </div>

        <div className="pricing-category-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`pricing-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="pricing-projects-grid">
          {filteredProjects.map((project) => (
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

        {filteredProjects.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>
            Tidak ada proyek di kategori ini.
          </p>
        )}
      </div>
    </section>
  );
}

export default Pricing;
