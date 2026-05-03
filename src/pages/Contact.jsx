import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="container contact-container">
        {/* Hero Section */}
        <div className="contact-hero mb-20">
          <span className="label-md text-primary block mb-4">AVAILABLE FOR NEW PROJECTS</span>
          <h1 className="h1 mb-6">Let's build something great together.</h1>
          <p className="body-lg text-on-surface-variant max-w-xl">
            I'm currently looking for new opportunities and collaborations. Whether you have a specific project in mind or just want to say hi, my inbox is always open.
          </p>
        </div>

        {/* Content Grid */}
        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info">
            <div className="info-item mb-12">
              <div className="info-icon shadow-ambient"><span className="material-symbols-outlined">mail</span></div>
              <div className="info-text">
                <p className="label-md text-on-surface-variant mb-1">EMAIL ME</p>
                <a href="mailto:hello@portfolio.com" className="h3 hover-link">hello@portfolio.com</a>
              </div>
            </div>
            <div className="info-item mb-12">
              <div className="info-icon shadow-ambient"><span className="material-symbols-outlined">location_on</span></div>
              <div className="info-text">
                <p className="label-md text-on-surface-variant mb-1">LOCATION</p>
                <p className="h3">Germany</p>
              </div>
            </div>

            <div className="whatsapp-box p-8 bg-surface-container-low rounded-2xl border border-surface-container">
              <div className="whatsapp-header mb-6">
                <div className="whatsapp-icon"><span className="material-symbols-outlined">chat</span></div>
                <div className="whatsapp-title">
                  <h4 className="h3 small">Direct Chat</h4>
                  <p className="body-md text-on-surface-variant">Get a faster response via WhatsApp</p>
                </div>
              </div>
              <a href="#" className="whatsapp-btn">
                <span className="material-symbols-outlined">forum</span>
                <span>Message me on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper shadow-ambient">
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="label-md">YOUR NAME</label>
                  <input type="text" placeholder="John Doe" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="label-md">EMAIL ADDRESS</label>
                  <input type="email" placeholder="john@example.com" className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="label-md">SUBJECT</label>
                <select className="form-input">
                  <option>Project Inquiry</option>
                  <option>Collaboration</option>
                  <option>General Message</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="label-md">MESSAGE</label>
                <textarea placeholder="Tell me about your project..." rows="6" className="form-input"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-5">
                Send Message <span className="material-symbols-outlined">send</span>
              </button>
              <p className="form-note label-md">I usually respond within 24-48 business hours.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
