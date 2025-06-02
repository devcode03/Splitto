import { Link } from "react-router-dom";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-col">
        <div className="footer-row">
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-row">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <small>© {currentYear} Spliito</small>
    </footer>
  );
}
