import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction3";
import "./Dashboard.css";

class Dashboard3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: true,
    };
  }

  toggleIsShown = () => this.setState(({ isShown }) => ({ isShown: !isShown }));

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div>
          
     
          <nav class="navbar navbar-expand-lg nav">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ">
                <li>
                  <h1 className="backw1 ">Pharmacy Dashboard</h1>
                  </li>
                  <li class="nav-item">
                    <button className="btn btn-success">
                      <a
                        href="/addMedicine"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Add medicine details
                      </a>
                    </button>
                  </li>
                  <li class="nav-item">
                    <button className="btn btn-success">
                      <a
                        href="/homePharmacy"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        All Pharmacy Details
                      </a>
                    </button>
                  </li>
                  {/* <li class="nav-item">
                    <button className="btn btn-success">
                      <a
                        href="/PDS"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Doctor requests
                      </a>
                    </button>
                  </li> */}
            
                  &nbsp; &nbsp; &nbsp;
                  <li class="nav-item ">
                <button style={{marginLeft:'355%'}}
            
            onClick={this.onLogoutClick}
            className="btn btn-lg btn-warning "
          >
            Logout
          </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="mern">
            <div
              className="row"
              style={{ marginTop: "6%", marginBottom: "8%", marginLeft: "18%" }}
            >
              <div className="col">
                <div class="card" style={{ width: "18rem" }}>
                  <img src="./healthcare.jpg" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Insert medicine details</h5>
                    <p></p>
                    <a href="/addMedicine" class="btn btn-primary">
                      Click Here
                    </a>
                    &nbsp;
                  </div>
                </div>
              </div>

              <div className="col">
                <div class="card" style={{ width: "18rem" }}>
                  <img src="./report.jpg" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Medicine detail Report</h5>
                    <p></p>
                    <a href="/pReport" class="btn btn-primary">
                      Click Here
                    </a>
                    &nbsp;
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard3.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard3);
