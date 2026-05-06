import './Skills.css';

export default function Skills() {
  return (
    <div className="skills-page">
      <section className="skills-hero section-padding">
        <div className="container text-center">
          <span className="inline-badge label-md mb-6">My Skills</span>
          <h1 className="h1 mb-8">Capabilities & Tools</h1>
          <p className="body-lg max-w-2xl mx-auto text-on-surface-variant">
            A comprehensive overview of my technical expertise, design capabilities, and the tools I use to bring ideas to life.
          </p>
        </div>
      </section>

      <section className="skills-content section-padding">
        <div className="container">
          <div className="skills-grid">
            <div className="skill-category">
              <h2 className="h2 mb-4">Frontend Development</h2>
              <ul className="skill-list">
                <li>React & Redux</li>
                <li>HTML5 & CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>Tailwind CSS</li>
                <li>Vite & Webpack</li>
              </ul>
            </div>
            <div className="skill-category">
              <h2 className="h2 mb-4">Design & UI/UX</h2>
              <ul className="skill-list">
                <li>Figma & Adobe XD</li>
                <li>Wireframing & Prototyping</li>
                <li>Design Systems</li>
                <li>Responsive Web Design</li>
                <li>Accessibility (WCAG)</li>
              </ul>
            </div>
            <div className="skill-category">
              <h2 className="h2 mb-4">Backend & Tools</h2>
              <ul className="skill-list">
                <li>Node.js & Express</li>
                <li>Git & GitHub</li>
                <li>RESTful APIs</li>
                <li>Firebase & Supabase</li>
                <li>Vercel & Netlify</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
