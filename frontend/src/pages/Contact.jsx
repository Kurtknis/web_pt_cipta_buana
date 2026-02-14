import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { contactInfo, mapEmbedUrl } from '../content/contactPageContent';
import '../App.css';

function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h4>{t('contact.phone')}</h4>
                <p>{contactInfo.phone}</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h4>{t('contact.email')}</h4>
                <p>{contactInfo.email}</p>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h4>{t('contact.address')}</h4>
                <p>{contactInfo.address}</p>
              </div>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi PT Cipta Kreasi Buana"
            />
            <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="contact-map-open">
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
