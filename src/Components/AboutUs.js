import React from "react";
import about from "../assets/undraw_young-man-avatar_wgbd.svg";
import { Link } from "react-router-dom";
const AboutUs = () => (
  <main className="about-page">
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <img
        src={about}
        alt="about"
        style={{
          position: "absolute",
          left: 0,
          bottom: "70%",
          transform: "translateY(50%)",
          height: "100px",
          width: "auto",
          zIndex: 0,
          opacity: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <h1
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          textAlign: "center",
        }}
      >
        About Splitto
      </h1>
    </div>
    <p>
      Splitto was created by friends who believe that sharing expenses should be
      simple, transparent, and even a little fun. Whether you’re splitting
      dinner, rent, or a weekend getaway, Splitto helps you keep track, settle
      up, and stay friends.
    </p>
    <p>
      Our mission: Make group finances stress-free for everyone. We’re
      passionate about building tools that bring people together, not apart.
    </p>
    <p>
      Have feedback or want to join our team?{" "}
      <Link to="/contact">Contact us</Link>!
    </p>
  </main>
);

export default AboutUs;
