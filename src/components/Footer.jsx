import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Footer.css';

export default function Footer() {
  const [siteName, setSiteName] = useState('Portfolio');
  const [siteYear, setSiteYear] = useState('2024');
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site settings
        const { data: settingsData } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', ['site_name', 'site_year']);
        
        settingsData?.forEach(setting => {
          if (setting.key === 'site_name') setSiteName(setting.value || 'Portfolio');
          if (setting.key === 'site_year') setSiteYear(setting.value || '2024');
        });

        // Fetch social links
        const { data: socialData } = await supabase
          .from('social_links')
          .select('*')
          .order('display_order', { ascending: true });
        setSocialLinks(socialData || []);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">{siteName}</div>
          <p className="copyright">© {siteYear} {siteName}. All rights reserved.</p>
        </div>
        <div className="footer-social">
          {socialLinks.length > 0 ? socialLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url || '#'} 
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          )) : (
            <>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Dribbble</a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
