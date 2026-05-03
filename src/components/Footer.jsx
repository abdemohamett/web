import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">Portfolio</div>
          <p className="copyright">© 2024 Portfolio. All rights reserved.</p>
        </div>
        <div className="footer-social">
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">LinkedIn</a>
          <a href="#" className="social-link">GitHub</a>
          <a href="#" className="social-link">Dribbble</a>
        </div>
      </div>
    </footer>
  );
}
