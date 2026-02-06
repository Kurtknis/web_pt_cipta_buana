import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../App.css';

function ServiceDetail() {
  const { serviceId } = useParams();

  const serviceDetails = {
    'design-interior': {
      title: 'Design Interior',
      icon: '🏠',
      description: 'Layanan design interior profesional untuk menciptakan ruang yang indah, fungsional, dan sesuai dengan kepribadian Anda.',
      features: [
        'Konsultasi desain interior lengkap',
        'Perencanaan tata letak ruangan yang optimal',
        'Pemilihan warna, material, dan furnitur',
        '3D visualization untuk preview hasil akhir',
        'Supervisi implementasi desain',
        'Styling dan dekorasi ruangan'
      ],
      benefits: [
        'Ruang yang lebih fungsional dan nyaman',
        'Estetika yang sesuai dengan gaya hidup Anda',
        'Peningkatan nilai properti',
        'Optimasi penggunaan ruang',
        'Kombinasi antara keindahan dan fungsionalitas'
      ],
      process: [
        'Konsultasi awal dan analisis kebutuhan',
        'Pembuatan konsep desain',
        'Presentasi dan revisi desain',
        'Finalisasi desain dan spesifikasi material',
        'Implementasi dan supervisi'
      ]
    },
    'arsitektur': {
      title: 'Arsitektur',
      icon: '📐',
      description: 'Jasa arsitektur profesional untuk merancang bangunan yang estetis, fungsional, dan sesuai dengan kebutuhan serta budget Anda.',
      features: [
        'Perencanaan arsitektur lengkap',
        'Desain eksterior dan interior bangunan',
        'Perhitungan struktur dan RAB',
        '3D rendering dan visualisasi',
        'Pembuatan gambar kerja (working drawing)',
        'Konsultasi teknis dan perizinan'
      ],
      benefits: [
        'Desain bangunan yang unik dan inovatif',
        'Optimasi penggunaan lahan',
        'Efisiensi energi dan ramah lingkungan',
        'Kesesuaian dengan peraturan bangunan',
        'Nilai investasi yang lebih baik'
      ],
      process: [
        'Survey lokasi dan analisis kebutuhan',
        'Konsep desain arsitektur',
        'Pengembangan desain detail',
        'Pembuatan gambar kerja',
        'Konsultasi perizinan dan pelaksanaan'
      ]
    },
    'kontraktor': {
      title: 'Kontraktor',
      icon: '🏗️',
      description: 'Layanan kontraktor terpercaya dengan tim profesional berpengalaman untuk mewujudkan proyek konstruksi Anda dengan kualitas terbaik.',
      features: [
        'Konstruksi bangunan baru',
        'Renovasi dan perbaikan',
        'Manajemen proyek profesional',
        'Pengawasan kualitas material',
        'Tim ahli berpengalaman',
        'Garansi hasil pekerjaan'
      ],
      benefits: [
        'Hasil konstruksi berkualitas tinggi',
        'Pengerjaan tepat waktu',
        'Penggunaan material berkualitas',
        'Pengawasan profesional',
        'Garansi dan after sales service'
      ],
      process: [
        'Survey dan perencanaan proyek',
        'Pembuatan RAB dan kontrak',
        'Persiapan material dan tim',
        'Pelaksanaan konstruksi',
        'Quality control dan finishing',
        'Handover dan garansi'
      ]
    },
    'renovasi': {
      title: 'Renovasi',
      icon: '🔨',
      description: 'Layanan renovasi profesional untuk mentransformasi ruang lama menjadi ruang baru yang lebih modern, fungsional, dan indah.',
      features: [
        'Renovasi rumah dan bangunan',
        'Perbaikan struktur dan finishing',
        'Upgrade sistem elektrikal dan plumbing',
        'Modernisasi interior dan eksterior',
        'Perencanaan renovasi bertahap',
        'Minimal gangguan aktivitas'
      ],
      benefits: [
        'Ruang yang lebih modern dan nyaman',
        'Peningkatan nilai properti',
        'Efisiensi energi yang lebih baik',
        'Fungsionalitas ruang yang optimal',
        'Transformasi tanpa harus pindah'
      ],
      process: [
        'Survey kondisi existing',
        'Perencanaan renovasi',
        'Pembuatan RAB renovasi',
        'Pelaksanaan renovasi bertahap',
        'Finishing dan penyerahan'
      ]
    }
  };

  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title">Layanan tidak ditemukan</h2>
          <Link to="/layanan" className="btn btn-primary">
            <ArrowLeft size={20} /> Kembali ke Layanan
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section service-detail">
      <div className="container">
        <Link to="/layanan" className="back-link">
          <ArrowLeft size={20} /> Kembali ke Layanan
        </Link>
        
        <div className="service-detail-header">
          <div className="service-detail-icon">{service.icon}</div>
          <h1 className="service-detail-title">{service.title}</h1>
          <p className="service-detail-description">{service.description}</p>
        </div>

        <div className="service-detail-content">
          <div className="detail-section">
            <h2>Fitur Layanan</h2>
            <ul className="detail-list">
              {service.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2>Manfaat</h2>
            <ul className="detail-list">
              {service.benefits.map((benefit, index) => (
                <li key={index}>✓ {benefit}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2>Proses Pengerjaan</h2>
            <ol className="detail-list process-list">
              {service.process.map((step, index) => (
                <li key={index}>
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="service-detail-cta">
          <Link to="/konsultasi" className="btn btn-primary">
            Konsultasi Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetail;
