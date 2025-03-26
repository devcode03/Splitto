import { Link } from "react-router-dom";
import logo from "../assets/logo_white_en.svg";
export default function Header() {
  return (
    <header className="header">
      <Link className=" mx-auto " to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
    </header>
  );
}
