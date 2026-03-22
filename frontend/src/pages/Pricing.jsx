import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { pricingProjects, pricingPackages } from '../content/pricingPageContent';
import { ArrowRight } from 'lucide-react';
import '../styles/pricing-package.css';
import '../App.css';

function Pricing() {
  const [activePackage, setActivePackage] = useState(0);

  const packages = pricingPackages;
  const active = packages[activePackage] || packages[0];

  const projectExamples = useMemo(() => {
    if (!active || !active.projectExampleIds) return [];
    return active.projectExampleIds
      .map((id) => pricingProjects.find((p) => p.id === id))
      .filter(Boolean);
  }, [active]);

  return (
    <section id="pricing" className="pricing-page">
      <div className="container">
        <h1>Harga Jasa Design Interior</h1>
        <p>
          Pilih paket layanan yang sesuai dengan kebutuhan proyek interior,
          arsitektur, atau renovasi Anda.
        </p>

        <div className="pricing-selector-layout">
          {/* LEFT: list of pricing packages (buttons) */}
          <aside className="pricing-package-selector" role="listbox" aria-label="Pilih paket harga">
            {packages.map((pkg, index) => (
              <button
                key={pkg.id}
                type="button"
                role="option"
                aria-selected={index === activePackage}
                className={`pricing-package-option ${index === activePackage ? 'active' : ''}`}
                onClick={() => setActivePackage(index)}
              >
                {pkg.name}
              </button>
            ))}
          </aside>

          {/* RIGHT: active package detail */}
          <div className="pricing-package-detail" role="region" aria-live="polite">
            <h3 className="pricing-package-detail-title">{active.name}</h3>
            <p className="pricing-package-starting-price">
              Mulai {active.startingPrice}
            </p>

            <p className="pricing-package-services-title">Layanan yang termasuk</p>
            <ul className="pricing-package-services-list">
              {active.includedServices.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>

            {projectExamples.length > 0 && (
              <>
                <p className="pricing-package-examples-title">Contoh proyek</p>
                <div className="pricing-package-examples">
                  {projectExamples.map((project) => (
                    <div key={project.id} className="pricing-package-example-card">
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.location} - PT Cipta Kreasi Buana`}
                        loading="lazy"
                        width="200"
                        height="100"
                      />
                      <span>{project.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="pricing-package-cta">
              <Link to="/konsultasi" className="pricing-consult-btn">
                Konsultasi Sekarang <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
