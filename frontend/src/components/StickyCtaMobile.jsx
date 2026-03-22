import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../App.css';

/**
 * Sticky bottom CTA shown only on mobile (≤768px).
 * "Konsultasi Sekarang" — links to /konsultasi.
 * Min tap target 44px for Android UX.
 */
function StickyCtaMobile() {
  const { t } = useLanguage();

  return (
    <div className="sticky-cta-mobile" aria-hidden="false">
      <Link
        to="/konsultasi"
        className="sticky-cta-mobile__link"
        aria-label={t('nav.consultation')}
      >
        <MessageCircle size={20} aria-hidden />
        {t('nav.consultation')}
      </Link>
    </div>
  );
}

export default StickyCtaMobile;
