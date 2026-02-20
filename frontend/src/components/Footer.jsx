import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../App.css';

const MAP_LINK = 'https://maps.app.goo.gl/NWizNuJeksG1XBTP8';
const INSTAGRAM_LINK = 'https://www.instagram.com/ciptakreasibuana.idn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';

function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PT CIPTA KREASI BUANA</h3>
            <p>{t('footer.description')}</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>{t('footer.services')}</h4>
            <ul>
              <li><Link to="/layanan#services">{t('services.designInterior')}</Link></li>
              <li><Link to="/layanan#services">{t('services.architecture')}</Link></li>
              <li><Link to="/layanan#services">{t('services.contractor')}</Link></li>
              <li><Link to="/layanan#services">{t('services.renovation')}</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('footer.company')}</h4>
            <ul>
              <li><Link to="/#portfolio">Portfolio</Link></li>
              <li><Link to="/harga">{t('nav.pricing')}</Link></li>
              <li><Link to="/klien">{t('nav.clients')}</Link></li>
              <li><Link to="/konsultasi">{t('nav.consultation')}</Link></li>
            </ul>
          </div>
          <div className="footer-section footer-contact-us">
            <h4>{t('contact.title')}</h4>
            <p>+62 123 456 789</p>
            <p>ciptaBuanaKreasi@gmail.com</p>
            <p className="operating-hours-compact">{t('footer.description')}</p>
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="footer-map-link">
              <MapPin size={18} /> {t('home.openInMaps')}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 PT Cipta Kreasi Buana. {t('footer.rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
