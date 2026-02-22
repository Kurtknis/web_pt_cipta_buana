import React from 'react';
import { Quote, Star } from 'lucide-react';
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
    <section id="clients" className="section clients clients-page-v2">
      <div className="container">
        <header className="clients-head-v2">
          <span className="clients-badge-v2">{t('clients.badge')}</span>
          <h2 className="section-title">{t('clients.title')}</h2>
          <p className="section-subtitle clients-subtitle-v2">
            {t('clients.realStoriesSubtitle')}
          </p>
          <div className="clients-kpi-v2">
            <div>
              <strong>{clientItems.length}+</strong>
              <span>{t('clients.kpiProfiles')}</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>{t('clients.kpiRating')}</span>
            </div>
            <div>
              <strong>95%</strong>
              <span>{t('clients.kpiOnTime')}</span>
            </div>
          </div>
        </header>

        <div className="clients-grid-v2 clients-grid-photo">
          {clientItems.map((client) => (
            <article key={client.id} className="client-story-card client-card-with-photo">
              {client.photo ? (
                <div className="client-card-photo-wrap">
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="client-card-photo"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="client-card-avatar-wrap">
                  <div className="client-avatar">{client.initials}</div>
                </div>
              )}

              <div className="client-card-body">
                <div className="client-story-top">
                  <div className="client-top-meta">
                    <h3 className="client-person-name">{client.name}</h3>
                    <p className="client-person-role">{client.role}</p>
                  </div>
                  <Quote size={18} className="client-quote-icon" />
                </div>

                <div className="client-rating-row">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className={i < client.rating ? 'filled' : ''} />
                  ))}
                  <span>{client.rating}.0</span>
                </div>

                <p className="client-testimonial">"{client.testimonial}"</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
