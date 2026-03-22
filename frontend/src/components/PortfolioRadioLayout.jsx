
import React, { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { portfolioItems } from '../content/portfolioContent';
import '../App.css';

const CATEGORY_LABELS = {
  Residential: 'portfolio.projectTypes.residential.title',
  Commercial: 'portfolio.projectTypes.commercial.title',
};

function PortfolioRadioLayout({ onViewDetail, hideTitle }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const itemsByCategory = useMemo(() => {
    const map = new Map();
    portfolioItems.forEach((item) => {
      const cat = item.category || 'Residential';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(item);
    });
    return map;
  }, []);

  const selectorList = useMemo(() => {
    const list = [];
    itemsByCategory.forEach((items, category) => {
      const labelKey = CATEGORY_LABELS[category] || category;
      list.push({ type: 'category', id: `cat-${category}`, label: t(labelKey), category });
      items.forEach((item) => {
        const globalIndex = portfolioItems.findIndex((p) => p.id === item.id);
        list.push({ type: 'project', id: item.id, title: item.title, globalIndex, item });
      });
    });
    return list;
  }, [itemsByCategory, t]);

  return (
    <section className="portfolio-radio-section" aria-labelledby={hideTitle ? undefined : 'portfolio-radio-heading'}>
      {!hideTitle && (
        <h2 id="portfolio-radio-heading" className="portfolio-radio-section-title">
          {t('portfolio.title')}
        </h2>
      )}

      <div className="portfolio-radio-layout">
        <aside className="portfolio-radio-selector" role="listbox" aria-label={t('portfolio.badge')}>
          {selectorList.map((entry) => {
            if (entry.type === 'category') {
              return (
                <div key={entry.id} className="portfolio-radio-category-label" role="presentation">
                  {entry.label}
                </div>
              );
            }
            const isActive = entry.globalIndex === activeIndex;
            return (
              <button
                key={entry.id}
                type="button"
                role="option"
                aria-selected={isActive}
                className={`portfolio-radio-option ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(entry.globalIndex)}
              >
                {entry.title}
              </button>
            );
          })}
        </aside>

        <div className="portfolio-radio-content-wrapper" role="region" aria-live="polite">
          {portfolioItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <article
                key={item.id}
                id={`portfolio-panel-${item.id}`}
                className={`portfolio-radio-panel ${isActive ? 'active' : ''}`}
                aria-hidden={!isActive}
                style={isActive ? undefined : { position: 'absolute', left: 0, right: 0, top: 0, visibility: 'hidden', pointerEvents: 'none' }}
              >
                <div className="portfolio-radio-panel-inner">
                  <div className="portfolio-radio-panel-image-wrap">
                    <img
                      src={item.images[0]}
                      alt={`${item.title} - ${item.category} - ${item.location} - PT Cipta Kreasi Buana`}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="450"
                    />
                  </div>
                  <div className="portfolio-radio-panel-body">
                    <h3 className="portfolio-radio-panel-title">{item.title}</h3>
                    <p className="portfolio-radio-panel-desc">{item.description}</p>
                    <dl className="portfolio-radio-panel-meta">
                      <div className="portfolio-radio-meta-row">
                        <dt>Lokasi</dt>
                        <dd>
                          <MapPin size={14} aria-hidden />
                          {item.location}
                        </dd>
                      </div>
                      <div className="portfolio-radio-meta-row">
                        <dt>Tipe Layanan</dt>
                        <dd>{item.category}</dd>
                      </div>
                      {item.year && item.year !== '-' && (
                        <div className="portfolio-radio-meta-row">
                          <dt>Tahun</dt>
                          <dd>{item.year}</dd>
                        </div>
                      )}
                    </dl>
                    {onViewDetail && (
                      <button
                        type="button"
                        className="portfolio-radio-view-detail"
                        onClick={() => onViewDetail(item)}
                      >
                        {t('portfolio.viewDetail')}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PortfolioRadioLayout;
