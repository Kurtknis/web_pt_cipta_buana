import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
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
                <p>+62 123 456 789</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h4>{t('contact.email')}</h4>
                <p>ciptaBuanaKreasi@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h4>{t('contact.address')}</h4>
                <p>jakarta tanggerang selatan pamulang 2 cendana residence</p>
              </div>
            </div>
          </div>
          <div className="contact-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi PT Cipta Kreasi Buana"
            ></iframe>
            <a href="https://maps.app.goo.gl/NWizNuJeksG1XBTP8" target="_blank" rel="noopener noreferrer" className="contact-map-open">
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
