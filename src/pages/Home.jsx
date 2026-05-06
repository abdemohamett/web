import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Home.css';

export default function Home() {
  const [settings, setSettings] = useState({});
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site settings
        const { data: settingsData } = await supabase.from('site_settings').select('*');
        const settingsMap = {};
        settingsData?.forEach(s => settingsMap[s.key] = s.value);
        setSettings(settingsMap);

        // Fetch services
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .order('display_order', { ascending: true });
        setServices(servicesData || []);

        // Fetch featured projects (first 3)
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true })
          .limit(3);
        setProjects(projectsData || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section section-padding">
        <div className="container hero-container">
          <div className="availability-badge">
            <span className="material-symbols-outlined">verified</span>
            <span>AVAILABLE FOR NEW PROJECTS</span>
          </div>
          <h1 className="h1 hero-title">
            {settings.home_hero_title || 'I help people grow, create, and build impactful work'}
          </h1>
          <p className="body-lg hero-subtitle">
            {settings.home_hero_subtitle || 'A multidisciplinary designer focused on building digital solutions.'}
          </p>
          <div className="hero-actions">
            <Link to="/work" className="btn-primary">View My Work</Link>
            <Link to="/contact" className="btn-secondary">Contact Me</Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview bg-surface section-padding">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="image-wrapper shadow-ambient">
              <img 
                src={settings.home_profile_image || 'https://via.placeholder.com/400x500'} 
                alt="Profile" 
              />
            </div>
            <div className="experience-badge shadow-ambient">
              <div className="h3 text-primary">{settings.home_years_experience || '8+'}</div>
              <div className="label-md">Years Experience</div>
            </div>
          </div>
          <div className="about-text">
            <h2 className="h2 mb-6">{settings.home_about_title || 'Built on a foundation of clarity and purpose.'}</h2>
            <p className="body-md mb-6">
              {settings.home_about_paragraph1 || 'I believe that the best work happens at the intersection of rigorous logic and creative intuition.'}
            </p>
            <p className="body-md mb-8">
              {settings.home_about_paragraph2 || 'My approach is deeply rooted in research, ensuring every pixel serves a specific objective.'}
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <div className="h3 text-primary">{settings.home_projects_completed || '120+'}</div>
                <div className="label-md">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="h3 text-primary">{settings.home_client_satisfaction || '98%'}</div>
                <div className="label-md">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Preview (Selected Work) */}
      <section className="work-preview section-padding">
        <div className="container">
          <div className="section-header">
            <div className="header-text">
              <h2 className="h2">{settings.home_services_title || 'Selected Work'}</h2>
              <p className="body-md">{settings.home_services_subtitle || 'A collection of projects that define my commitment to excellence.'}</p>
            </div>
            <Link to="/projects" className="view-all-link label-md">
              View All Projects <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          
          <div className="work-bento-grid">
            {projects.slice(0, 2).map((project, index) => (
              <div key={project.id} className={`bento-item ${index === 0 ? 'featured' : 'compact'} shadow-ambient`}>
                <div className={`bento-img ${index === 1 ? 'square' : ''}`}>
                  <img src={project.image || 'https://via.placeholder.com/600x400'} alt={project.title} />
                </div>
                <div className="bento-content">
                  <div className="tags">
                    <span className="tag">{project.category}</span>
                    {project.subcategory && <span className="tag">{project.subcategory}</span>}
                  </div>
                  <h3 className={`h3 ${index === 1 ? 'small' : ''}`}>{project.title}</h3>
                  <p className="body-md">{project.description}</p>
                  {index === 0 && (
                    <Link to="/projects" className="case-study-link label-md">
                      View Case Study <span className="material-symbols-outlined">north_east</span>
                    </Link>
                  )}
                  {index === 1 && (
                    <span className="material-symbols-outlined arrow">arrow_forward</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section-padding bg-inverse-surface text-inverse-on-surface">
        <div className="container">
          <div className="section-header center">
            <h2 className="h2 mb-4">{settings.home_services_title || 'How I add value'}</h2>
            <p className="body-md text-dim">{settings.home_services_subtitle || 'Focused services designed to propel your business forward.'}</p>
          </div>
          <div className="services-grid">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <span className="material-symbols-outlined">{service.icon || 'star'}</span>
                </div>
                <h3 className="h3">{service.title}</h3>
                <p className="body-md">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta section-padding">
        <div className="container">
          <div className="cta-box bg-primary text-on-primary shadow-ambient">
            <h2 className="h1 mb-8">{settings.home_cta_title || "Let's work together"}</h2>
            <p className="body-lg mb-12 opacity-80">{settings.home_cta_subtitle || 'Have a project in mind? Let\'s discuss how we can build something impactful.'}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-secondary">
                {settings.home_cta_button_text || 'Contact Me'}
              </Link>
              <Link to="/contact" className="btn-outline-white">
                {settings.home_cta_secondary_button_text || 'Book a Call'}
              </Link>
            </div>
            <div className="cta-decoration decor-1"></div>
            <div className="cta-decoration decor-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
