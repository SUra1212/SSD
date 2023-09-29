import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction1";
import "./Dashboard.css";

class Dashboard1 extends Component {
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
                  <h1 className="backw1 ">Doctor Dashboard</h1>
                  </li>
                  <li class="nav-item">
                    <button className="btn btn-success">
                      <a
                        href="/CPC"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Patient Check-in
                      </a>
                    </button>
                  </li>
                  <li class="nav-item">
                    <button className="btn btn-success">
                      <a
                        href="/HPC"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        All Details Patient Check-in
                      </a>
                    </button>
                  </li>
                  <li class="nav-item">
                    <button className="btn btn-success">
                      <a
                        href="/PDS"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Appointment Details
                      </a>
                    </button>
                  </li>
            
                  &nbsp; &nbsp; &nbsp;
                  <li class="nav-item ">
                <button style={{marginLeft:'215%'}}
            
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
                  <img src="./doctorcheking.jpg" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Create Patient Check-in</h5>
                    <p></p>
                    <a href="/CPC" class="btn btn-primary">
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
                    <h5 class="card-title">Patient Checking-in Report</h5>
                    <p></p>
                    <a href="/DR" class="btn btn-primary">
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

Dashboard1.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard1);
