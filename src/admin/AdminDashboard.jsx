import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experiences, services] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('skills').select('*', { count: 'exact', head: true }),
          supabase.from('experiences').select('*', { count: 'exact', head: true }),
          supabase.from('services').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          projects: projects.count || 0,
          skills: skills.count || 0,
          experiences: experiences.count || 0,
          services: services.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="h1 mb-8">Dashboard</h1>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon projects">
              <span className="material-symbols-outlined">work</span>
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.projects}</div>
              <div className="stat-label">Projects</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon skills">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.skills}</div>
              <div className="stat-label">Skills</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon experiences">
              <span className="material-symbols-outlined">history</span>
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.experiences}</div>
              <div className="stat-label">Experiences</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon services">
              <span className="material-symbols-outlined">stars</span>
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.services}</div>
              <div className="stat-label">Services</div>
            </div>
          </div>
        </div>
      )}

      <div className="welcome-section mt-12">
        <h2 className="h2 mb-4">Welcome to the Admin Panel</h2>
        <p className="body-md text-on-surface-variant">
          Use the sidebar to navigate to different sections and manage your portfolio content.
          You can edit projects, skills, experiences, services, principles, and site settings.
        </p>
      </div>
    </div>
  );
}
