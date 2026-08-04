import { Link, NavLink } from "react-router-dom";
import logo from "../assets/tranquil-roots-logo.png";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link className="navbar__brand" to="/">
        <span className="navbar__icon">❋</span>

  <span className="navbar__brand-text">
    <strong>Tranquil Roots</strong>
    <small>Head Spa & Wellness</small>
  </span>
</Link>

        
      <nav className="navbar__links" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/booking">Book</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;