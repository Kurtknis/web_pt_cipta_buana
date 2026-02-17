import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../App.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangOpen && !event.target.closest('.language-selector')) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangOpen]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const languages = [
    { code: 'id', name: 'Indonesia' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: 'Mandarin' }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src="/ptkreasi.jpg" alt="PT Cipta Kreasi Buana" className="logo-image" />
              <h1>CIPTA BUANA KREASI</h1>
            </Link>
          </div>
          
          <div className="nav-right">
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li><Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link></li>
              <li><Link to="/layanan" className={isActive('/layanan') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('nav.services')}</Link></li>
              <li><Link to="/furnitur" className={isActive('/furnitur') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('nav.furniture')}</Link></li>
              <li><Link to="/harga" className={isActive('/harga') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('nav.pricing')}</Link></li>
              <li><Link to="/klien" className={isActive('/klien') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('nav.clients')}</Link></li>
              <li><Link to="/konsultasi" className={isActive('/konsultasi') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('nav.consultation')}</Link></li>
            </ul>

            <div className="language-selector">
              <button 
                className="language-button" 
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label="Select Language"
              >
                <Globe size={18} />
                <span className="language-code">{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={16} className={isLangOpen ? 'rotate' : ''} />
              </button>
              {isLangOpen && (
                <div className="language-dropdown">
                  {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="language-name">{lang.name}</span>
                  </button>
                  ))}
                </div>
              )}
            </div>

            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
