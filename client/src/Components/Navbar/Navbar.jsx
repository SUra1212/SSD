import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg nav">
          <div class="container-fluid">
            <img className="suwaarana" src="./suwaarana.jpg" />
            <a class="navbar-brand navtext" href="#"></a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li class="nav-item">
                  <a class="nav-link navtext1" href="/">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link navtext1" href="/services">
                    Services
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link navtext1" href="/aboutus">
                    About Us
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link navtext1" href="/contactus">
                    Contact Us
                  </a>
                </li>
              </ul>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <li class="nav-item a">
                <Link
                  className="nav-link btn btn-login button-outline-none"
                  to="/loginDash"
                >
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link btn btn-register button-outline-none"
                  to="/register1"
                >
                  Signup
                </Link>
              </li>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
