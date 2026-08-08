import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/tranquil-roots-logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <img
          src={logo}
          alt="Tranquil Roots logo"
          className="navbar__logo"
        />

        <div>
          <h1>Tranquil Roots</h1>
          <p>HEAD SPA & WELLNESS</p>
        </div>
      </div>

      <nav
        className="navbar__links"
        aria-label="Main navigation"
      >
        <NavLink to="/">Home</NavLink>

        <NavLink to="/services">Services</NavLink>

        {token ? (
          <>
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>

            <button
              type="button"
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;