import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../App.css';

function Gallery() {
  const { t } = useLanguage();
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=500&q=80',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80',
      category: 'Mobile App'
    },
    {
      id: 3,
      title: 'Brand Identity Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
      category: 'Design'
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
      category: 'UI/UX'
    },
    {
      id: 5,
      title: 'Social Media Campaign',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80',
      category: 'Marketing'
    },
    {
      id: 6,
      title: 'Corporate Website',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
      category: 'Web Development'
    },
    {
      id: 7,
      title: 'Fitness App',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80',
      category: 'Mobile App'
    },
    {
      id: 8,
      title: 'Photography Portfolio',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&q=80',
      category: 'Photography'
    }
  ];
  
  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <h2 className="section-title">{t('gallery.title')}</h2>
        <p className="section-subtitle">{t('gallery.subtitle')}</p>
        <div className="gallery-grid">
          {projects.map((project) => (
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