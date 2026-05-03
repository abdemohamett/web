import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
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
            I help people grow, create, and build <span className="text-primary">impactful work</span>
          </h1>
          <p className="body-lg hero-subtitle">
            A multidisciplinary designer and strategist focused on building scalable digital solutions that bridge the gap between human needs and business goals.
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPfBjzggWJyHNvz_Kk3xHGkAaFTcjB_PazInhiiYvQzSZdqkhZIfk6UqQP_DrOtgFqTmhoxTbbgEX0_x13BImz9NAKc2LbHWDaVqwc_bzM3vj_oCvvubXmTqagn2FiNspFALYDLYNQe_3zcU69xQbOj9nHCgKPk3qXehtQsk6YiyWsTneCxEy9O2ndDuqJn55e8FMGFYviaHEZPv1chN9N6KQq7Xj8Sv734o-cy1h652XINqybKGhrZGsxdAi-Eow_x0-4mGT2fmM" 
                alt="Profile" 
              />
            </div>
            <div className="experience-badge shadow-ambient">
              <div className="h3 text-primary">8+</div>
              <div className="label-md">Years Experience</div>
            </div>
          </div>
          <div className="about-text">
            <h2 className="h2 mb-6">Built on a foundation of clarity and purpose.</h2>
            <p className="body-md mb-6">
              I believe that the best work happens at the intersection of rigorous logic and creative intuition. Over the last decade, I've partnered with startups and Fortune 500 companies to launch products that matter.
            </p>
            <p className="body-md mb-8">
              My approach is deeply rooted in research, ensuring every pixel and every line of code serves a specific objective for your brand.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <div className="h3 text-primary">120+</div>
                <div className="label-md">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="h3 text-primary">98%</div>
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
              <h2 className="h2">Selected Work</h2>
              <p className="body-md">A collection of projects that define my commitment to excellence and impact.</p>
            </div>
            <Link to="/work" className="view-all-link label-md">
              View All Projects <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          
          <div className="work-bento-grid">
            <div className="bento-item featured shadow-ambient">
              <div className="bento-img">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQA88tH74HkaF7uIJg-_kInR0Iinw1wFVikA-2WU6DEmv7jyMBZssV8ET6C1nyGKaNNbS33H7nFFVXAKiqzrekcD8C6yJQh7VYRfNqHXfnH1QG6C2BnE7Jk4GdvXeKTSFVE9CQ4GMgQ1FqucmtG2v5hS6A4hL4pLZ4-nat9gNj_GXyr6tysSvlu24E6USOtkfZDC3evaz_xO2keNSsGEkyyH2khZIYEp3xeQ3xbkqZzUNI2kFOChiUIxqpxCw5ANue_dj2HBX0-G8" alt="Project 1" />
              </div>
              <div className="bento-content">
                <div className="tags">
                  <span className="tag">Fintech</span>
                  <span className="tag">2023</span>
                </div>
                <h3 className="h3">Nexus Wealth Management</h3>
                <p className="body-md">Complete redesign of a legacy financial platform, increasing user engagement by 45%.</p>
                <Link to="/work" className="case-study-link label-md">
                  View Case Study <span className="material-symbols-outlined">north_east</span>
                </Link>
              </div>
            </div>
            
            <div className="bento-item compact shadow-ambient">
              <div className="bento-img square">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZxa6l0vGn4ujUaUtYnjcpqx837Rqec8kWkAwUnmOKUJTRoskhl7eE8QKWIdzDE_WtyZbaKDTLwrB5Tvg3I4sfbCBrXOjxvH2M0_qgMD9Y6iSOWIqjB6AliS6odBDdFMmoI3NPKRlV3J-rntqnburox6hf4ZP18sd9mfmprV8wb0DYSBmRQBG5nW4w5AcHFnkCJhuoyaDAjIgh77clw3OS6Wf7umzxw2yjRwHviA2gnOCKMkTHTuMeFEQ4sXZlCsC2RktibDoQmZw" alt="Project 2" />
              </div>
              <div className="bento-content">
                <span className="tag">Healthcare</span>
                <h3 className="h3 small">Vigor AI</h3>
                <p className="body-md">Personalized wellness tracking powered by machine learning.</p>
                <span className="material-symbols-outlined arrow">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section-padding bg-inverse-surface text-inverse-on-surface">
        <div className="container">
          <div className="section-header center">
            <h2 className="h2 mb-4">How I add value</h2>
            <p className="body-md text-dim">Focused services designed to propel your business forward in the digital age.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><span className="material-symbols-outlined">brush</span></div>
              <h3 className="h3">Web Design</h3>
              <p className="body-md">Creating intuitive, high-converting digital experiences that prioritize behavior and brand authority.</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><span className="material-symbols-outlined">psychology</span></div>
              <h3 className="h3">AI Solutions</h3>
              <p className="body-md">Integrating smart automation and machine learning models to streamline operations and enhance products.</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><span className="material-symbols-outlined">campaign</span></div>
              <h3 className="h3">Content Creation</h3>
              <p className="body-md">Strategic storytelling and brand messaging that builds trust and drives long-term community growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta section-padding">
        <div className="container">
          <div className="cta-box bg-primary text-on-primary shadow-ambient">
            <h2 className="h1 mb-8">Let's work together</h2>
            <p className="body-lg mb-12 opacity-80">Have a project in mind? Let's discuss how we can build something truly impactful for your brand.</p>
            <div className="cta-buttons">
              <a href="mailto:hello@example.com" className="btn-secondary">Contact Me</a>
              <button className="btn-outline-white">Book a Call</button>
            </div>
            <div className="cta-decoration decor-1"></div>
            <div className="cta-decoration decor-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
