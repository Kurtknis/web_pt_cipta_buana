/**
 * ============================================================
 * TERJEMAHAN UTAMA - Mengimpor dari file per-section
 * ============================================================
 * Edit setiap section di file terpisah:
 *   nav.js, home.js, about.js, services.js, portfolio.js,
 *   pricing.js, gallery.js, clients.js, consultation.js,
 *   contact.js, footer.js, serviceDetail.js, furniture.js
 * ============================================================
 */

import { nav } from './nav';
import { home } from './home';
import { about } from './about';
import { services } from './services';
import { portfolio } from './portfolio';
import { pricing } from './pricing';
import { gallery } from './gallery';
import { clients } from './clients';
import { consultation } from './consultation';
import { contact } from './contact';
import { footer } from './footer';
import { serviceDetail } from './serviceDetail';
import { furniture } from './furniture';

const sections = { nav, home, about, services, portfolio, pricing, gallery, clients, consultation, contact, footer, serviceDetail, furniture };
const langs = ['id', 'en', 'zh', 'es'];

export const translations = Object.fromEntries(
  langs.map((lang) => [
    lang,
    Object.fromEntries(
      Object.entries(sections).map(([key, section]) => [key, section[lang]])
    )
  ])
);
