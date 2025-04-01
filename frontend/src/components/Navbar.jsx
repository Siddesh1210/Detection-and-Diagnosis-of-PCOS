import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const [login, setLogin] = useState(false);

  //   async function checkLogin() {
  //     const response = await fetch("http://localhost:1234/users/checklogin", {
  //       method: "GET",
  //     });
  //     const result = await response.json();
  //     if (result) setLogin(true);
  //   }
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("Token: ", token);
    if (token != null) {
      setLogin(true);
    }
  });
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              style={{ width: "150px", borderRadius: "5px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" href="#">
                  About
                </Link>
              </li>
              {login ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Detect PCOS
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/detect-pcos-by-text">
                        Using Text
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/sonography-test">
                        Using Sonogrpahy
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : null}
              {/* <li className="nav-item">
                <Link to="/contact" className="nav-link" href="#">
                  Contact
                </Link>
              </li> */}
              <li className="nav-item">
                {login ? (
                  <Link
                    to="#"
                    className="nav-link"
                    href="#"
                    onClick={() => {
                      localStorage.clear();
                      setLogin(false);
                    }}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link" href="#">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
