import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin Imports
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import EditHero from './admin/sections/EditHero';
import EditAbout from './admin/sections/EditAbout';
import EditServices from './admin/sections/EditServices';
import EditProjects from './admin/sections/EditProjects';
import EditSkills from './admin/sections/EditSkills';
import EditTestimonials from './admin/sections/EditTestimonials';
import ViewMessages from './admin/sections/ViewMessages';

const Portfolio = () => {
  React.useEffect(() => {
    // Cursor logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const moveCursor = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      if (cursorDot) { cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`; }
      if (cursorOutline) { cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" }); }
    }
    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>

      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />

      <Footer />
    </div>
  );
};

// Auth Imports
import { AuthProvider } from './context/AuthContext';
import Login from './admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<EditHero />} />
            <Route path="about" element={<EditAbout />} />
            <Route path="services" element={<EditServices />} />
            <Route path="projects" element={<EditProjects />} />
            <Route path="skills" element={<EditSkills />} />
            <Route path="testimonials" element={<EditTestimonials />} />
            <Route path="messages" element={<ViewMessages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
