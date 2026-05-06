import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [brandName, setBrandName] = useState('Portfolio');
  const [buttonText, setButtonText] = useState('Hire Me');
  const location = useLocation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', ['nav_brand_name', 'nav_button_text']);
        
        data?.forEach(setting => {
          if (setting.key === 'nav_brand_name') setBrandName(setting.value || 'Portfolio');
          if (setting.key === 'nav_button_text') setButtonText(setting.value || 'Hire Me');
        });
      } catch (error) {
        console.error('Error fetching nav settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <nav className="navbar glass-effect">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          {brandName}
        </Link>
        
        <button 
          className="mobile-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Projects
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About Me
          </NavLink>
          <NavLink to="/skills" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Skills
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Contact
          </NavLink>
          <Link to="/contact" className="btn-primary mobile-only-btn">
            {buttonText}
          </Link>
        </div>

        <Link to="/contact" className="btn-primary hire-me-btn desktop-only">
          {buttonText}
        </Link>
      </div>
    </nav>
  );
}
