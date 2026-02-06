import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../App.css';

function Services() {
  const { t } = useLanguage();

  const services = [
    { id: 'design-interior', titleKey: 'services.designInterior', descKey: 'services.designInteriorDesc' },
    { id: 'arsitektur', titleKey: 'services.architecture', descKey: 'services.architectureDesc' },
    { id: 'kontraktor', titleKey: 'services.contractor', descKey: 'services.contractorDesc' },
    { id: 'renovasi', titleKey: 'services.renovation', descKey: 'services.renovationDesc' }
  ];

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title">{t('services.title')}</h2>
        <p className="section-subtitle">{t('services.subtitle')}</p>
        <div className="services-grid">
          {services.map((service, index) => (
            <Link
              key={index}
              to={`/layanan/${service.id}`}
              className="service-card-link"
            >
              <div className="service-card">
                <h3>{t(service.titleKey)}</h3>
                <p>{t(service.descKey)}</p>
                <span className="service-card-arrow">{t('services.learnMore')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
