import React, { Component } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser2 } from "../../redux/actions/authAction2";
import classnames from "classnames";

class Login2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      genericError: "", // New state for generic error message
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard2");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated && !prevProps.auth.isAuthenticated) {
      alert("Login Successfully");
      this.props.history.push("/dashboard2");
    }
    if (this.props.errors !== prevProps.errors) {
      const genericError = "Invalid email or password";
      this.setState({ errors: this.props.errors, genericError });
    }
  }

  onChangeLogin = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  loginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser2(userData);
  };

  render() {
    const { email, password, errors, genericError } = this.state;
    return (
      <div>
        <section className="login c">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="login-left">
                  <h4 className="text-capitalize">
                    Login with your credentials to enjoy the Application services
                  </h4>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login-right">
                  <h1>Login</h1>
                  <form noValidate onSubmit={this.loginSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="email">Email</label> <br />
                        <input
                          type="email"
                          className={classnames("input-control", {
                            invalid: errors.email || errors.emailNotFound,
                          })}
                          placeholder="Enter your email"
                          id="email"
                          value={email}
                          onChange={this.onChangeLogin}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.email}
                          {errors.emailNotFound}
                        </span>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="password">Password</label> <br />
                        <input
                          type="password"
                          className={classnames("input-control", {
                            invalid:
                              errors.password || errors.passwordIncorrect,
                          })}
                          placeholder="Enter your password"
                          id="password"
                          value={password}
                          onChange={this.onChangeLogin}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.password}
                          {errors.passwordIncorrect}
                          {genericError}
                        </span>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <button
                          type="submit"
                          className="btn btn-md btn-register"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <p>
                          Don't have an account?{" "}
                          <Link to="/register1" className="text-success">
                            Create one
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

Login2.propTypes = {
  loginUser2: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser2 })(Login2);
