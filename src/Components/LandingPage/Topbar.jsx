import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Icons/Logo";

const Topbar = () => {
    
    return (
    <main className="navbar navbar-expand-lg navbar-dark bg-orange">
      <header className="container px-0">
        <span className="navbar-brand d-flex">
          <Logo width={60} height={60} className="me-3 fill-white" />
          <h1 className="h1">ADUDU</h1>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <nav className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="#!">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#!">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#!">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/contact'}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </main>
  );
};

export default Topbar;
