import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { clientsList } from '../content/clientsContent';
import '../App.css';

function Clients() {
  const { t } = useLanguage();
  const clientItems = clientsList.map((client, index) => ({
    id: index + 1,
    ...client,
    initials: client.name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  }));

  return (
    <section id="clients" className="section clients clients-page-premium">
      <div className="clients-bg-deco" aria-hidden="true" />
      <div className="container">
        <header className="clients-header-premium">
          <span className="clients-badge-premium">{t('clients.badge')}</span>
          <h2 className="clients-title-premium">{t('clients.title')}</h2>
          <p className="clients-subtitle-premium">
            {t('clients.realStoriesSubtitle')}
          </p>
          <div className="clients-kpi-premium">
            <div className="clients-kpi-item">
              <span className="clients-kpi-value">{clientItems.length}+</span>
              <span className="clients-kpi-label">{t('clients.kpiProfiles')}</span>
            </div>
            <div className="clients-kpi-item">
              <span className="clients-kpi-value">4.9<span className="clients-kpi-unit">/5</span></span>
              <span className="clients-kpi-label">{t('clients.kpiRating')}</span>
            </div>
            <div className="clients-kpi-item">
              <span className="clients-kpi-value">95<span className="clients-kpi-unit">%</span></span>
              <span className="clients-kpi-label">{t('clients.kpiOnTime')}</span>
            </div>
          </div>
        </header>

        <div className="clients-grid-premium">
          {clientItems.map((client) => (
            <article key={client.id} className="client-card-premium">
              {client.photo ? (
                <div className="client-card-premium-media">
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="client-card-premium-img"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="client-card-premium-avatar-wrap">
                  <div className="client-card-premium-avatar">{client.initials}</div>
                </div>
              )}

              <div className="client-card-premium-content">
                <div className="client-card-premium-meta">
                  <h3 className="client-card-premium-name">{client.name}</h3>
                  <p className="client-card-premium-role">{client.role}</p>
                </div>
                <div className="client-card-premium-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < client.rating ? 'filled' : ''} />
                  ))}
                  <span className="client-card-premium-rating">{client.rating}.0</span>
                </div>
                <blockquote className="client-card-premium-quote">
                  <span className="client-card-premium-quote-mark">"</span>
                  {client.testimonial}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
