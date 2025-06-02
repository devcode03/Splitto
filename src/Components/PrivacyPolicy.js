import React from "react";
import privacyImg from "../assets/Privacy.svg";
import { Link } from "react-router-dom";
// import "../styles/footer.css";

export default function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ position: "relative", zIndex: 2, flex: 1 }}>
          Privacy Policy
        </h1>
        <img
          src={privacyImg}
          alt="privacyImg"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "150px",
            width: "auto",
            zIndex: 0,
            opacity: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>
      <p>Your privacy matters to us. Here’s how we handle your data:</p>
      <ul>
        <li>
          <strong>Data Collection:</strong> We collect only what’s needed to
          provide our service (like your name, email, and group info).
        </li>
        <li>
          <strong>Encryption:</strong> All your data is encrypted in transit and
          at rest.
        </li>
        <li>
          <strong>No Third-Party Sharing:</strong> We never sell or share your
          data with advertisers.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies only for essential site
          functionality.
        </li>
        <li>
          <strong>Account Deletion:</strong> You can delete your account and all
          data at any time from your profile settings.
        </li>
      </ul>

      <p style={{ fontStyle: "italic", color: "#888", marginTop: "1em" }}>
        (Let's be honest, this is a personal project—so this privacy policy is
        mostly here for show. Please don't take it too seriously!)
      </p>
      <p>
        For questions or requests, <Link to="/contact">contact us</Link>.
      </p>
    </main>
  );
}
