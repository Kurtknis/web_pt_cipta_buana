import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { galleryItems } from '../content/galleryContent';
import '../App.css';

function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <h2 className="section-title">{t('gallery.title')}</h2>
        <p className="section-subtitle">{t('gallery.subtitle')}</p>
        <div className="gallery-grid">
          {galleryItems.map((project) => (
            <div key={project.id} className="gallery-item">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy" 
              />
              <div className="gallery-overlay">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;