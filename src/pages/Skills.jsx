import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Skills.css';

export default function Skills() {
  const [settings, setSettings] = useState({});
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site settings for Skills page
        const { data: settingsData } = await supabase.from('site_settings').select('*');
        const settingsMap = {};
        settingsData?.forEach(s => settingsMap[s.key] = s.value);
        setSettings(settingsMap);

        // Fetch skills
        const { data: skillsData } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });
        setSkills(skillsData || []);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="skills-page">
      <section className="skills-hero section-padding">
        <div className="container text-center">
          <span className="inline-badge label-md mb-6">My Skills</span>
          <h1 className="h1 mb-8">{settings.skills_hero_title || 'Capabilities & Tools'}</h1>
          <p className="body-lg max-w-2xl mx-auto text-on-surface-variant">
            {settings.skills_hero_subtitle || 'A comprehensive overview of my technical expertise, design capabilities, and the tools I use to bring ideas to life.'}
          </p>
        </div>
      </section>

      <section className="skills-content section-padding">
        <div className="container">
          <div className="skills-grid">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) {
                  acc[skill.category] = [];
                }
                acc[skill.category].push(skill.name);
                return acc;
              }, {})
            ).map(([category, items]) => (
              <div key={category} className="skill-category">
                <h2 className="h2 mb-4">{category}</h2>
                <ul className="skill-list">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
