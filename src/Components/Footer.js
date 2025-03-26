export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-col">
        <div className="footer-row">
          <a href="/">FAQ</a>
          <a href="/">Contact</a>
        </div>
        <div className="footer-row">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
          <a href="/">About</a>
        </div>
      </div>
      <small>© {currentYear} Spliito</small>
    </footer>
  );
}
