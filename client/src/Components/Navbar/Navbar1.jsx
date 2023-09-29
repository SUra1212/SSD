import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


class Navbar1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#BDBDBD', }} >
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-dark disabled ">SUWA ARANA </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="fs-4 nav-link text-primary " aria-current="page" >HOSPITAL</a>
                <a class="fs-4 nav-link " href="">011-1233459</a>

                <a class="fs-4 nav-link text-primary" aria-current="page"> | </a>

                <a class="fs-4 nav-link text-primary" aria-current="page" >SUWA SARIYA</a>
                <a class="fs-4 nav-link" href="">1999</a>
              </div>
            </div>



          </div>
        </nav>

      </div>

    );
  }
}

export default Navbar1;