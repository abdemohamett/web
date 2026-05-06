import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Nexus Wealth Management',
    category: 'FinTech',
    subcategory: 'UI/UX Design',
    description: 'Redefining digital asset management with a focus on institutional-grade security and intuitive performance tracking.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArcIpc2fncbp9VmTAnLTqxOBOvb6AaA5AKnDMhUUTyBHPlwTW7v9k89r6F3JfzSSBnsWiWBnBVhNOUm-TCeJSO2GYjKrknJVr1BX9uhQvNcaasBi-rIpnJgGU1kQsrisuCP5bxxf6WQ9S_ry8q7YQ_sAiOq9KFRRTUOTWrrdUrqFNPvknJXzpU1Aa_scjTHn4VvIbMHJU3f6duUJWiDtmA-HF9_qG4YCKeW5nWITzTEQ-UvWKmMgWQfglD50vfUHAAMT9LkFAgTB4',
    size: 'normal'
  },
  {
    id: 2,
    title: 'Vigor AI',
    category: 'Healthcare',
    subcategory: 'Artificial Intelligence',
    description: 'An AI-driven diagnostic platform that streamlines patient data analysis for modern healthcare providers.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOocsSC3_LIC7zel4DbpZCZ-rBZOGPK4bpRcePPwap-HuAJ1ZJj8gamom15qoWHCvFr6WbW-lVcqFQ86p4o9GrAa207HJ0Cf0-fKo4OL-z6vK7nVpWhoexa98eUUc2SCqeFC9DtBGGbYkbRKcjmQUBcED2mkuaIi1SNDid7pZheWJc7aFmhEYfIXA5QERE-rxhSrjcekKHVP4bPyD4C4_zMH6xrQO210O9hGAIRhRsseZMW0iQQK5ZjieyUt4ARyQSWyNO1mBqmvs',
    size: 'normal'
  },
  {
    id: 3,
    title: 'CloudScale Systems',
    category: 'SaaS',
    subcategory: 'Architecture',
    description: 'Scalable infrastructure monitoring for enterprise organizations, focusing on real-time data visibility and system health.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdNfTl6NmyTK_o3NUxA646ZLF-LSul3ghNVuyaBE3js0n3Pt-ueuwVZkhW4aqb46uwG9tVQARyjeuGvYg_tBCkANgn3dhv6Ai7ZPDvgBrz0jHubrFfIvzVlEKFk59GrjJ40B_CunRA8qk0FYeXczhxoalEYGsuHkTLSPnSKH1k8dP85jhhISvT1HoqAokojZsG59pDaObkufQ-EPuywn6Zr0Kg-LgFJNVnJuHWKm0H9NWb-bUTmmO53I1w8gmX104hNtJs8KiE2Sg',
    size: 'large'
  }
];

export default function Projects() {
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
                <img src={project.image} alt={project.title} />
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
