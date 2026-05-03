import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero section-padding">
        <div className="container about-hero-grid">
          <div className="hero-text">
            <span className="inline-badge label-md mb-8">Design Philosophy</span>
            <h1 className="h1 mb-8">My mission is to build digital products that matter.</h1>
            <p className="body-lg text-on-surface-variant">
              I blend strategic thinking with meticulous design to create experiences that solve real human problems and drive business growth.
            </p>
          </div>
          <div className="hero-visual">
            <div className="image-frame shadow-ambient">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE-n7xURPoyO53HTmsNKgvXOZQNbIh2b1T-Cyg_ARFfsH5iNr3CGiLj3GyjIkd6KA-IJxwAQacrI9yZwRVEp4yFbaIZDUZv4KEXlBNgOz6RK-nb8upG5H-RfBScs-1jZk-gEiaP6b5B4AlV7LwHUSY6tQG2cm_zDlHLTbqvo_yjpif6QRlMUFglYWoPilMKl6WTtSBXIKYSL8di8eMAXP1WnnWwc8mAlZ47BEvRpQl_DtfFiLXPeOd6MLdsAtAMapn00unh6FuRnE" 
                alt="About Portrait" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section-padding bg-surface-container-lowest">
        <div className="container story-grid">
          <div className="story-header">
            <h2 className="h2 mb-6">My Story</h2>
            <div className="accent-line"></div>
          </div>
          <div className="story-content">
            <p className="body-lg mb-8">
              It all started with a curiosity for how humans interact with technology. My journey began in a small workspace, surrounded by sketchbooks and early versions of design software. What began as a hobby quickly evolved into a lifelong pursuit of perfection in the digital realm.
            </p>
            <p className="body-md text-on-surface-variant mb-6">
              Over the past decade, I've navigated the evolving landscape of digital product design. From the early days of mobile-first revolutions to the current age of AI-integrated interfaces, I've consistently focused on one thing: the human at the other end of the screen.
            </p>
            <p className="body-md text-on-surface-variant">
              Today, I consult for high-growth startups and established enterprises, helping them bridge the gap between complex technology and intuitive user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="principles-section section-padding bg-surface-container-low">
        <div className="container">
          <div className="section-header center mb-16">
            <h2 className="h2 mb-4">Core Principles</h2>
            <p className="body-md text-on-surface-variant">The values that anchor my work and drive every creative decision.</p>
          </div>
          <div className="principles-grid">
            <div className="principle-card shadow-ambient">
              <div className="principle-icon"><span className="material-symbols-outlined">groups</span></div>
              <h3 className="h3 mb-4">User-Centric Design</h3>
              <p className="body-md text-on-surface-variant">Putting the user at the heart of every decision, ensuring solutions are intuitive and valuable.</p>
            </div>
            <div className="principle-card shadow-ambient">
              <div className="principle-icon"><span className="material-symbols-outlined">strategy</span></div>
              <h3 className="h3 mb-4">Strategic Thinking</h3>
              <p className="body-md text-on-surface-variant">Design is more than aesthetics. It's a strategic tool used to solve complex challenges.</p>
            </div>
            <div className="principle-card shadow-ambient">
              <div className="principle-icon"><span className="material-symbols-outlined">school</span></div>
              <h3 className="h3 mb-4">Continuous Learning</h3>
              <p className="body-md text-on-surface-variant">I am committed to constant growth, new tools, and evolving methodologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section-padding">
        <div className="container narrow">
          <h2 className="h2 text-center mb-16">Professional Timeline</h2>
          <div className="timeline-list">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date label-md">2021 — PRESENT</div>
              <h4 className="h3 mt-2">Senior Designer at TechCorp</h4>
              <p className="body-md text-on-surface-variant mt-2">Leading the design system team and overseeing the UX strategy for our core SaaS product.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot grey"></div>
              <div className="timeline-date label-md secondary">2018 — 2021</div>
              <h4 className="h3 mt-2">Freelance Consultant</h4>
              <p className="body-md text-on-surface-variant mt-2">Partnered with series-A startups to build their initial MVPs and establish foundations.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot grey"></div>
              <div className="timeline-date label-md secondary">2015 — 2018</div>
              <h4 className="h3 mt-2">Early Beginnings</h4>
              <p className="body-md text-on-surface-variant mt-2">Starting as a junior UI designer at a creative agency, learning the fundamentals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section section-padding bg-surface-container-low">
        <div className="container">
          <div className="cta-card bg-primary-container text-on-primary-container shadow-ambient">
            <h2 className="h2 text-white mb-8">Want to know more or collaborate?</h2>
            <div className="cta-btns">
              <button className="btn-white">Get In Touch</button>
              <button className="btn-outline-white">Download CV</button>
            </div>
            <div className="cta-blob decor-1"></div>
            <div className="cta-blob decor-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
