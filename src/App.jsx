import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminSettings from './admin/AdminSettings';
import AdminProjects from './admin/AdminProjects';
import AdminSkills from './admin/AdminSkills';
import AdminExperiences from './admin/AdminExperiences';
import AdminServices from './admin/AdminServices';
import AdminPrinciples from './admin/AdminPrinciples';
import AdminSocial from './admin/AdminSocial';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="experiences" element={<AdminExperiences />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="principles" element={<AdminPrinciples />} />
            <Route path="social" element={<AdminSocial />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
