import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import CancellationRefundPolicy from './pages/CancellationRefundPolicy';
import TermsConditions from './pages/TermsConditions';
import DeveloperCredit from './pages/DeveloperCredit';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/developer-credit" element={<DeveloperCredit />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;