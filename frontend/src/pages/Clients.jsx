import React from 'react';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { clientsList } from '../content/clientsContent';
import '../App.css';

function Clients() {
  const { t } = useLanguage();

  return (
    <section id="clients" className="section clients">
      <div className="container">
        <h2 className="section-title">{t('clients.title')}</h2>
        <p className="section-subtitle">{t('clients.subtitle')}</p>
        <div className="clients-grid">
          {clientsList.map((client, index) => (
            <div key={index} className="client-card">
              <Briefcase size={40} />
              <p>{client}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
