import { Link } from "react-router-dom";
import termsImg from "../assets/terms.svg";

export default function TermsAndConditions() {
  return (
    <main className="terms-page">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ position: "relative", zIndex: 2, flex: 1 }}>
          Terms &amp; Conditions
        </h1>
        <img
          src={termsImg}
          alt="termsImg"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "120px",
            width: "auto",
            zIndex: 0,
            opacity: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>
      <p>By using Splitto, you agree to the following terms:</p>
      <ul style={{ position: "relative", zIndex: 2 }}>
        <li>
          <strong>Personal Use:</strong> Splitto is for personal, non-commercial
          use unless otherwise agreed.
        </li>
        <li>
          <strong>Accuracy:</strong> You are responsible for the accuracy of the
          information you enter.
        </li>
        <li>
          <strong>Privacy:</strong> We respect your privacy and protect your
          data as outlined in our <Link to="/privacy">Privacy Policy</Link>.
        </li>
        <li>
          <strong>No Liability:</strong> Splitto is a tool for tracking
          expenses. We are not responsible for payment disputes or losses.
        </li>
        <li>
          <strong>Updates:</strong> Terms may change. We’ll notify users of
          significant updates.
        </li>
      </ul>
      <p>
        Questions? <Link to="/contact">Contact us</Link> anytime.
      </p>
      {/* <img
        style={{ height: "200px", width: "100%" }}
        src={termsImg}
        className="mx-auto"
        alt="termsImg"
      ></img> */}
    </main>
  );
}
