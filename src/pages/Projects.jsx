import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero section-padding">
        <div className="container text-center">
          <span className="inline-badge label-md mb-6">Our Projects</span>
          <h1 className="h1 mb-8">Selected Projects</h1>
          <p className="body-lg max-w-2xl mx-auto text-on-surface-variant">
            A curation of digital experiences crafted with a philosophy of clarity, authority, and conversion. We build professional tools for high-output creators and corporate visionaries.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="container filters-container">
          <button className="filter-btn active label-md">My Projects</button>
        </div>
      </section>

      {/* Project Grid */}
      <section className="project-grid-section section-padding">
        <div className="container project-grid">
          {projects.map((project) => (
            <div key={project.id} className={`project-card ${project.size} shadow-ambient hover-up`}>
              <div className="project-img">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => e.target.classList.add('loaded')}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="14"%3EImage%3C/text%3E%3C/svg%3E';
                    e.target.classList.add('error');
                  }}
                />
              </div>
              <div className="project-info">
                <div className="project-tags">
                  <span className="tag-outline label-md">{project.category}</span>
                  <span className="tag-outline label-md">{project.subcategory}</span>
                </div>
                <h3 className="h3 mb-4">{project.title}</h3>
                <p className="body-md text-on-surface-variant mb-6">{project.description}</p>
                <button className="case-study-btn label-md">
                  View Case Study <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="projects-cta section-padding bg-surface-container-low">
        <div className="container text-center">
          <h2 className="h2 mb-8">Let’s work together</h2>
          <p className="body-lg mb-12 max-w-xl mx-auto text-on-surface-variant">
            Ready to elevate your digital presence with a design that converts? Reach out today for a consultation.
          </p>
          <button className="btn-primary large">Contact Me</button>
        </div>
      </section>
    </div>
  );
}
