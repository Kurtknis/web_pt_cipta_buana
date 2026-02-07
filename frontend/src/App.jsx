import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HomeSimple from './pages/HomeSimple';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import Furniture from './pages/Furniture';
import Clients from './pages/Clients';
import Consultation from './pages/Consultation';
import Contact from './pages/Contact';
import './App.css';

// Scroll to top or hash on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  // Temporary test mode - uncomment the line below to test if React is working
  // return <Test />;

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeSimple />} />
            <Route path="/home-full" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/layanan" element={<Services />} />
            <Route path="/layanan/:serviceId" element={<ServiceDetail />} />
            <Route path="/furnitur" element={<Furniture />} />
            <Route path="/harga" element={<Pricing />} />
            <Route path="/galeri" element={<Gallery />} />
            <Route path="/klien" element={<Clients />} />
            <Route path="/konsultasi" element={<Consultation />} />
            <Route path="/kontak" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;