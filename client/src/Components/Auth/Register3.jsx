import React, { Component } from "react";
import "./Auth.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser3 } from "../../redux/actions/authAction3";
import classnames from "classnames";

class Register3 extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      role: "",
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/register3");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChangeRegister = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  registerSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role,
    };
    this.props.registerUser3(newUser, this.props.history);
  };

  render() {
    const { errors, name, password, password2, email, role } = this.state;
    return (
      <div>
        <section className="register">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="signup-left">
                  <h4 className="text-capitalize">
                    SignUp with your credentials to enjoy the Application
                    services
                  </h4>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="signup-right">
                  <h1>Signup</h1>
                  <form noValidate onSubmit={this.registerSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="name">User Category</label> <br />
                        <select
                          id="role"
                          onChange={this.onChangeRegister}
                          value={role}
                          error={errors.role}
                          classname={classnames("", {
                            //return the value of the element's class attribute
                            invalid: errors.role,
                          })}
                          type="text"
                          className="form-control"
                        >
                          <br />
                          <span className="text-danger">{errors.role}</span>
                          <option defaultValue>Select User Category</option>
                          <option>Doctor</option>
                          <option>Patient</option>
                          <option>Pharmacist</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label htmlFor="name">Full Name</label> <br />
                        <input
                          type="text"
                          className="input-control"
                          placeholder="Enter your name"
                          id="name"
                          value={name}
                          onChange={this.onChangeRegister}
                          error={errors.name}
                          classname={classnames("", {
                            invalid: errors.name,
                          })}
                        />{" "}
                        <br />
                        <span className="text-danger">{errors.name}</span>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label htmlFor="Email">Email</label> <br />
                        <input
                          type="email"
                          className="input-control"
                          placeholder="Enter your email"
                          id="email"
                          value={email}
                          onChange={this.onChangeRegister}
                          error={errors.email}
                          classname={classnames("", {
                            invalid: errors.email,
                          })}
                        />{" "}
                        <br />
                        <span className="text-danger">{errors.email}</span>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label htmlFor="Password">Password</label> <br />
                        <input
                          type="password"
                          className="input-control"
                          placeholder="Enter your password"
                          id="password"
                          value={password}
                          onChange={this.onChangeRegister}
                          error={errors.password}
                          classname={classnames("", {
                            invalid: errors.password,
                          })}
                        />{" "}
                        <br />
                        <span className="text-danger">{errors.password}</span>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label htmlFor="Confirm Password">
                          Confirm Password
                        </label>
                        <br />
                        <input
                          type="password"
                          className="input-control"
                          placeholder="Confirm your password"
                          id="password2"
                          value={password2}
                          onChange={this.onChangeRegister}
                          error={errors.password2}
                          classname={classnames("", {
                            invalid: errors.password2,
                          })}
                        />{" "}
                        <br />
                        <span className="text-danger">{errors.password2}</span>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <button
                          type="submit"
                          className="btn btn-md btn-register"
                        >
                          Signup
                        </button>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <p>
                          Already have an account ?
                          <Link to="/login3" className="text-success">
                            Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
Register3.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser3 })(
  withRouter(Register3)
);
