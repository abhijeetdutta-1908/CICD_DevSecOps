import { appleImg, searchImg, bagImg } from "../utils";
import Hamburger from 'hamburger-react'
// import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  // const [isOpen, setOpen] = useState(false)
  return (
    <header className="navbar">
      <nav className="nav-container">
        <div className="nav-logo">
          <img src={appleImg} alt="Apple Logo" className="logo" />
        </div>

        <div className="nav-links">
          {["Store", "Mac", "iPhone", "Support"].map((nav) => (
            <div key={nav} className="nav-link-item">{nav}</div>
          ))}
        </div>

        <div className="nav-icons">
          <img src={searchImg} alt="Search Icon" className="icon search-icon" />
          <img src={bagImg} alt="Bag Icon" className="icon bag-icon" />
          {/* <Hamburger toggled={isOpen} toggle={setOpen} /> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
