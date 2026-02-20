import React from 'react';
import { Quote, Star, MapPin, Clock3 } from 'lucide-react';
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
    <section id="clients" className="section clients">
      <div className="container">
        <div className="clients-head-v2">
          <span className="clients-badge-v2">Real Client Stories</span>
          <h2 className="section-title">{t('clients.title')}</h2>
          <p className="section-subtitle">
            Testimoni nyata dari klien kami, lengkap dengan detail proyek, budget, dan timeline pengerjaan.
          </p>
          <div className="clients-kpi-v2">
            <div>
              <strong>{clientItems.length}+</strong>
              <span>Client Profiles</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Average Rating</span>
            </div>
            <div>
              <strong>95%</strong>
              <span>On-Time Delivery</span>
            </div>
          </div>
        </div>

        <div className="clients-grid-v2">
          {clientItems.map((client) => (
            <article key={client.id} className="client-story-card">
              <div className="client-story-top">
                <div className="client-avatar">{client.initials}</div>
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

              <div className="client-project-box">
                <p className="client-project-title">{client.project}</p>
                <div className="client-meta-row">
                  <span><MapPin size={14} /> {client.location}</span>
                  <span><Clock3 size={14} /> {client.timeline}</span>
                </div>
                <p className="client-budget">Budget: {client.budget}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
