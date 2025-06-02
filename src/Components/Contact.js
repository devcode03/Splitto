import contact from "../assets/undraw_mailbox_e7nc.svg";
const Contact = () => (
  <main className="contact-page">
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <h1 style={{ position: "relative", zIndex: 2, flex: 1 }}>Contact Us</h1>
      <img
        src={contact}
        alt="contact"
        style={{
          position: "absolute",
          right: 0,
          top: "30%",
          transform: "translateY(100%)",
          height: "200px",
          width: "auto",
          zIndex: 1,
          opacity: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
    <p>
      We love hearing from you! Reach out with questions, feedback, or just to
      say hi.
    </p>
    <ul>
      <li>
        Email: <a href="mailto:devusurve@gmail.com">devusurve@gmail.com</a>
      </li>
      <li>
        Twitter: <a href="https://twitter.com/splittoapp">@splittoapp</a>
      </li>
    </ul>
  </main>
);

export default Contact;
