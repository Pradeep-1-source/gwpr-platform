import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { initializeStorageIfEmpty } from './services/localStorageService';
import { PrototypeNotice } from './components/PrototypeNotice';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CoursesPage } from './pages/CoursesPage';
import { StudentLoginPage } from './pages/StudentLoginPage';
import { StudentRegisterPage } from './pages/StudentRegisterPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { CourseLearningPage } from './pages/CourseLearningPage';
import { CertificateVerificationPage } from './pages/CertificateVerificationPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  useEffect(() => {
    // Seed LocalStorage with default courses, student & sample certificate if empty
    initializeStorageIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        {/* Prototype Transparency Notice */}
        <PrototypeNotice />

        {/* Global Navigation */}
        <Navbar />

        {/* Routed Pages */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/login" element={<StudentLoginPage />} />
            <Route path="/register" element={<StudentRegisterPage />} />
            <Route path="/dashboard" element={<StudentDashboardPage />} />
            <Route path="/learning/:enrollmentId" element={<CourseLearningPage />} />
            <Route path="/verify" element={<CertificateVerificationPage />} />
            <Route path="/verify/:certificateId" element={<CertificateVerificationPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
