import React, { useState } from "react";
import logo from "../assets/logo_white_en.svg";
export default function Header() {
  return (
    <header className="header">
      <a className=" mx-auto " href="/">
        <img className="logo" src={logo} alt="logo" />
      </a>
    </header>
  );
}
