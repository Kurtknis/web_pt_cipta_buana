import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, Users, Star, Award, MessageCircle, Calendar, DollarSign, User, Building } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { submitConsultation } from '../services/api';
import { checkForbiddenWords } from '../utils/forbiddenWords';
import '../App.css';

const MAP_LINK = 'https://maps.app.goo.gl/NWizNuJeksG1XBTP8';
const ADDRESS = 'Jl. Cendana Residence Blok A3 No.3, Serua, Kec. Ciputat, Kota Tangerang Selatan, Banten 15414';
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

function Consultation() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
    preferredContact: 'phone',
    timeline: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateStep = async (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi';
      if (!formData.email.trim()) errors.email = 'Email wajib diisi';
      if (!formData.phone.trim()) errors.phone = 'No. telepon wajib diisi';
    }
    
    if (step === 2) {
      if (!formData.projectType) errors.projectType = 'Pilih jenis proyek';
      if (!formData.budget) errors.budget = 'Pilih estimasi budget';
    }
    
    if (step === 3) {
      if (!formData.description.trim()) errors.description = 'Deskripsi proyek wajib diisi';
      
      // Check for forbidden words
      if (!errors.description) {
        const forbiddenCheck = await checkForbiddenWords(formData.description);
        if (forbiddenCheck.hasForbiddenWords) {
          errors.description = forbiddenCheck.message;
        }
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = async () => {
    if (await validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateStep(3)) {
      setIsLoading(true);
      setSubmitError('');
      
      try {
        await submitConsultation(formData);
        setIsSubmitted(true);
        
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(1);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            projectType: '',
            budget: '',
            description: '',
            preferredContact: 'phone',
            timeline: ''
          });
        }, 4000);
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitError('Gagal mengirim formulir. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const projectTypes = [
    { value: 'renovasi', label: 'Renovasi Rumah', icon: Building },
    { value: 'interior', label: 'Desain Interior', icon: Star },
    { value: 'kitchen', label: 'Kitchen Set', icon: Building },
    { value: 'furniture', label: 'Furniture Custom', icon: Star },
    { value: 'commercial', label: 'Kantor/Commercial', icon: Building },
    { value: 'other', label: 'Lainnya', icon: MessageCircle }
  ];

  const budgetRanges = [
    { value: 'under-50', label: 'Di bawah Rp 50 juta', range: '< 50 jt' },
    { value: '50-100', label: 'Rp 50 - 100 juta', range: '50-100 jt' },
    { value: '100-200', label: 'Rp 100 - 200 juta', range: '100-200 jt' },
    { value: '200-500', label: 'Rp 200 - 500 juta', range: '200-500 jt' },
    { value: 'above-500', label: 'Di atas Rp 500 juta', range: '> 500 jt' }
  ];

  const timelineOptions = [
    'Segera (1-2 bulan)',
    'Dalam 3-6 bulan',
    'Dalam 6-12 bulan',
    'Lebih dari 1 tahun',
    'Masih planning'
  ];

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="consultation-hero-enhanced">
        <div className="consultation-hero-overlay-enhanced"></div>
        <div className="hero-particles"></div>
        <div className="container">
          <div className="consultation-hero-content-enhanced">
            <div className="hero-badge">
              <Award size={16} />
              <span>Konsultasi Premium</span>
            </div>
            <h1>Konsultasi Gratis dengan Ahli Kami</h1>
            <p>Wujudkan impian ruang ideal Anda bersama tim profesional PT Cipta Kreasi Buana. Dapatkan konsultasi gratis dan solusi terbaik untuk proyek Anda.</p>
            
            <div className="consultation-stats-enhanced">
              <div className="stat-item-enhanced">
                <div className="stat-icon">
                  <CheckCircle size={28} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Proyek Selesai</span>
                </div>
              </div>
              <div className="stat-item-enhanced">
                <div className="stat-icon">
                  <Clock size={28} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Konsultasi</span>
                </div>
              </div>

              <div className="stat-item-enhanced">
                <div className="stat-icon">
                  <Star size={28} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Kepuasan Klien</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Form Section */}
      <section id="consultation" className="section consultation-form-section-enhanced">
        <div className="container">
          <div className="consultation-grid-enhanced">
            {/* Multi-Step Form */}
            <div className="consultation-form-container-enhanced">
              <div className="form-header">
                <h2>Mulai Konsultasi Anda</h2>
                <p>Isi form di bawah ini dan tim kami akan menghubungi Anda dalam 24 jam</p>
                
                {/* Progress Steps */}
                <div className="form-steps">
                  <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                    <div className="step-number">
                      {currentStep > 1 ? <CheckCircle size={16} /> : '1'}
                    </div>
                    <span>Info Personal</span>
                  </div>
                  <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                    <div className="step-number">
                      {currentStep > 2 ? <CheckCircle size={16} /> : '2'}
                    </div>
                    <span>Detail Proyek</span>
                  </div>
                  <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <span>Deskripsi</span>
                  </div>
                </div>
              </div>
              
              {isSubmitted && (
                <div className="success-message-enhanced">
                  <div className="success-icon">
                    <CheckCircle size={24} />
                  </div>
                  <div className="success-content">
                    <h3>Terima Kasih!</h3>
                    <p>Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda dalam 24 jam.</p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="error-message-enhanced">
                  <div className="error-icon">
                    <CheckCircle size={24} />
                  </div>
                  <div className="error-content">
                    <h3>Error</h3>
                    <p>{submitError}</p>
                  </div>
                </div>
              )}

              <form className="consultation-form-enhanced" onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="form-step-content">
                    <h3>
                      <User size={20} />
                      Informasi Personal
                    </h3>
                    
                    <div className="form-group-enhanced">
                      <label>Nama Lengkap *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap Anda"
                        className={formErrors.fullName ? 'error' : ''}
                      />
                      {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group-enhanced">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="nama@email.com"
                          className={formErrors.email ? 'error' : ''}
                        />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                      </div>
                      <div className="form-group-enhanced">
                        <label>No. Telepon *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+62 812 3456 7890"
                          className={formErrors.phone ? 'error' : ''}
                        />
                        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-group-enhanced">
                      <label>Metode Kontak Preferensi</label>
                      <div className="radio-group">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleInputChange}
                          />
                          <span className="radio-custom"></span>
                          <Phone size={16} />
                          Telepon
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleInputChange}
                          />
                          <span className="radio-custom"></span>
                          <Mail size={16} />
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <div className="form-step-content">
                    <h3>
                      <Building size={20} />
                      Detail Proyek
                    </h3>
                    
                    <div className="form-group-enhanced">
                      <label>Jenis Proyek *</label>
                      <div className="project-type-grid">
                        {projectTypes.map((type) => {
                          const IconComponent = type.icon;
                          return (
                            <label key={type.value} className={`project-type-option ${formData.projectType === type.value ? 'selected' : ''}`}>
                              <input
                                type="radio"
                                name="projectType"
                                value={type.value}
                                checked={formData.projectType === type.value}
                                onChange={handleInputChange}
                              />
                              <div className="project-type-content">
                                <IconComponent size={24} />
                                <span>{type.label}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {formErrors.projectType && <span className="error-message">{formErrors.projectType}</span>}
                    </div>

                    <div className="form-group-enhanced">
                      <label>Estimasi Budget *</label>
                      <div className="budget-grid">
                        {budgetRanges.map((budget) => (
                          <label key={budget.value} className={`budget-option ${formData.budget === budget.value ? 'selected' : ''}`}>
                            <input
                              type="radio"
                              name="budget"
                              value={budget.value}
                              checked={formData.budget === budget.value}
                              onChange={handleInputChange}
                            />
                            <div className="budget-content">
                              <DollarSign size={20} />
                              <div>
                                <span className="budget-range">{budget.range}</span>
                                <span className="budget-label">{budget.label}</span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {formErrors.budget && <span className="error-message">{formErrors.budget}</span>}
                    </div>

                    <div className="form-group-enhanced">
                      <label>Timeline Proyek</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                      >
                        <option value="">Pilih timeline proyek</option>
                        {timelineOptions.map((timeline, index) => (
                          <option key={index} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Description */}
                {currentStep === 3 && (
                  <div className="form-step-content">
                    <h3>
                      <MessageCircle size={20} />
                      Deskripsi Proyek
                    </h3>
                    
                    <div className="form-group-enhanced">
                      <label>Ceritakan Detail Proyek Anda *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Ceritakan detail proyek Anda, lokasi, kebutuhan khusus, inspirasi desain, dan hal-hal penting lainnya yang ingin Anda sampaikan..."
                        rows="6"
                        className={formErrors.description ? 'error' : ''}
                      ></textarea>
                      {formErrors.description && <span className="error-message">{formErrors.description}</span>}
                    </div>

                    {/* Summary */}
                    <div className="form-summary">
                      <h4>Ringkasan Konsultasi:</h4>
                      <div className="summary-grid">
                        <div className="summary-item">
                          <strong>Nama:</strong> {formData.fullName || '-'}
                        </div>
                        <div className="summary-item">
                          <strong>Kontak:</strong> {formData.preferredContact === 'phone' ? formData.phone : formData.email || '-'}
                        </div>
                        <div className="summary-item">
                          <strong>Proyek:</strong> {projectTypes.find(p => p.value === formData.projectType)?.label || '-'}
                        </div>
                        <div className="summary-item">
                          <strong>Budget:</strong> {budgetRanges.find(b => b.value === formData.budget)?.range || '-'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Navigation */}
                <div className="form-navigation">
                  {currentStep > 1 && (
                    <button type="button" onClick={prevStep} className="btn btn-secondary">
                      Kembali
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button type="button" onClick={nextStep} className="btn btn-primary">
                      Lanjutkan
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary btn-submit-enhanced" disabled={isLoading}>
                      <Send size={20} />
                      {isLoading ? 'Mengirim...' : 'Kirim Konsultasi'}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Enhanced Contact Info */}
            <div className="consultation-contact-enhanced">
              <div className="contact-header">
                <h3>Hubungi Kami Langsung</h3>
                <p>Atau hubungi kami melalui kontak di bawah ini untuk konsultasi langsung</p>
              </div>
              
              <div className="contact-methods-enhanced">
                <a href="tel:+62123456789" className="contact-method-enhanced">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-content">
                    <h4>Telepon</h4>
                    <p>+62 123 456 789</p>
                    <span>Senin - Sabtu, 08:00 - 18:00</span>
                  </div>
                  <div className="contact-arrow">→</div>
                </a>

                <a href="mailto:ciptaBuanaKreasi@gmail.com" className="contact-method-enhanced">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-content">
                    <h4>Email</h4>
                    <p>ciptaBuanaKreasi@gmail.com</p>
                    <span>Respon dalam 24 jam</span>
                  </div>
                  <div className="contact-arrow">→</div>
                </a>

                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="contact-method-enhanced">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-content">
                    <h4>Alamat Kantor</h4>
                    <p>Jl. Cendana Residence Blok A3 No.3</p>
                    <span>Kunjungi showroom kami</span>
                  </div>
                  <div className="contact-arrow">→</div>
                </a>
              </div>

              {/* Why Choose Us */}
              <div className="why-choose-us">
                <h4>Mengapa Memilih Kami?</h4>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <CheckCircle size={16} />
                    <span>Konsultasi gratis tanpa biaya tersembunyi</span>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={16} />
                    <span>Tim ahli berpengalaman 10+ tahun</span>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={16} />
                    <span>Garansi hasil dan after-sales service</span>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={16} />
                    <span>Material berkualitas dengan harga terjangkau</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="consultation-map-section-enhanced">
        <div className="consultation-map-overlay-enhanced"></div>
        <div className="container">
          <div className="map-content-enhanced">
            <div className="map-info-enhanced">
              <div className="map-badge">
                <MapPin size={16} />
                <span>Showroom Premium</span>
              </div>
              <h2>Kunjungi Showroom Kami</h2>
              <p>Lihat langsung hasil karya dan material berkualitas di showroom kami. Tim ahli siap memberikan konsultasi terbaik untuk proyek Anda.</p>
              
              <div className="map-features-enhanced">
                <div className="map-feature-enhanced">
                  <div className="feature-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="feature-content">
                    <h5>Showroom Material Premium</h5>
                    <p>Lihat langsung kualitas material terbaik</p>
                  </div>
                </div>
                <div className="map-feature-enhanced">
                  <div className="feature-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="feature-content">
                    <h5>Konsultasi Gratis</h5>
                    <p>Dapatkan saran ahli tanpa biaya</p>
                  </div>
                </div>
                <div className="map-feature-enhanced">
                  <div className="feature-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="feature-content">
                    <h5>Parkir Luas & Nyaman</h5>
                    <p>Fasilitas parkir yang memadai</p>
                  </div>
                </div>
              </div>
              
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-map-enhanced"
              >
                <MapPin size={20} />
                Buka di Google Maps
              </a>
            </div>
            
            <div className="map-container-enhanced">
              <iframe
                src={MAP_EMBED}
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                title="Lokasi PT Cipta Kreasi Buana"
              />
              <div className="map-overlay-info">
                <div className="map-overlay-content">
                  <h5>PT Cipta Kreasi Buana</h5>
                  <p>Showroom & Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Consultation;
