import { Link } from "react-router-dom";
import cover from "../assets/cover.webp";
import Button from "../components/Button";
import GroupList from "../components/GroupList";

export default function HomePage({ groups, children }) {
  return (
    <div>
      <HeroSection />
      {children}
      <FeatureList />
    </div>
  );
}

function HeroSection() {
  return (
    <div>
      <div className="hero">
        <h1>
          Simplify the calculation
          <br />
          of splitting group expenses
          <br />
        </h1>
        <p>
          Ever get confused about who owes whom how much money when you're
          traveling with friends and dealing with expenses like rental cars and
          tolls? Spliito is a free service that simplifies the hassle of
          splitting bills on trips.
        </p>
        <Link to="/newGroup" className="link-cta">
          <Button>Get Started</Button>
        </Link>
      </div>
      <img src={cover} alt="cover"></img>
    </div>
  );
}

function FeatureList() {
  const list = [
    {
      id: 1,
      image: require("../assets/feature1-Y8fuDCPZ.webp"),
      feature: "Calculate the simplest bill-splitting method",
      description:
        "If you register records of money advances on the group page, a unique algorithm will calculate the simplest settlement method for you in real-time.",
    },
    {
      id: 2,
      image: require("../assets/feature2-emI3tZfU.webp"),
      feature: "Easy to use without membership registration",
      description:
        "No app installation required; you can use it immediately from your browser without membership registration. There's no need for friends you're traveling with to install the app.",
    },
    {
      id: 3,
      image: require("../assets/feature3-P_zFvGnA.webp"),
      feature: "Supports foreign currencies from all countries",
      description:
        "Since it supports all foreign currencies, you can smoothly settle any money borrowed or lent during overseas travel in your own national currency.",
    },
  ];

  return (
    <section className="features">
      {list.map((li) => (
        <div className="feature" key={li.id}>
          <img
            className="mx-auto"
            src={li.image}
            alt={"feaure" + li.id}
            style={{ width: "75%" }}
          />
          <h3>{li.feature}</h3>
          <p>{li.description}</p>
        </div>
      ))}
    </section>
  );
}
