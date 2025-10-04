import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import { PostListPage, PostDetailPage, CategoryPage, TagPage } from './pages/blog';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Non-blog routes with original layout */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/services" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Services />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/privacy-policy" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <PrivacyPolicy />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/cookie-policy" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <CookiePolicy />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/cancellation-refund-policy" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <CancellationRefundPolicy />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/terms-conditions" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <TermsConditions />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/developer-credit" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <DeveloperCredit />
              </main>
              <Footer />
            </div>
          } />
          
          {/* Blog Routes - using BlogLayout internally */}
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/tag/:slug" element={<TagPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;