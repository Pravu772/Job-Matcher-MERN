import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar({ setActiveSection }) {
  const handleClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow px-4">
      {/* ✅ Brand Logo */}
      <a
        className="navbar-brand"
        href="#upload"
        onClick={(e) => handleClick(e, "upload")}
      >
        Job Matcher
      </a>

      {/* ✅ Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* ✅ Collapsible navbar links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#upload"
              onClick={(e) => handleClick(e, "upload")}
            >
              Upload
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#saved"
              onClick={(e) => handleClick(e, "saved")}
            >
              Saved Jobs
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#register"
              onClick={(e) => handleClick(e, "register")}
            >
              Register
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#login"
              onClick={(e) => handleClick(e, "login")}
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
