import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/tranquil-roots-logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
       const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/me`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load user."
          );
        }

        setUser(data.user);
      } catch (error) {
        console.error("Navbar user error:", error);
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <NavLink
        to="/"
        className="navbar__brand"
      >
        <img
          src={logo}
          alt="Tranquil Roots logo"
          className="navbar__logo"
        />

        <div className="navbar__brand-text">
          <span className="navbar__name">
            Tranquil Roots
          </span>

          <span className="navbar__tagline">
            Head Spa & Wellness
          </span>
        </div>
      </NavLink>

      <nav
        className="navbar__links"
        aria-label="Main navigation"
      >
        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/services">
          Services
        </NavLink>

        {token ? (
          <>
            {user?.role === "owner" ? (
              <NavLink to="/owner">
                Owner Dashboard
              </NavLink>
            ) : (
              <NavLink to="/dashboard">
                Dashboard
              </NavLink>
            )}

            <button
              type="button"
              className="navbar__logout"
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