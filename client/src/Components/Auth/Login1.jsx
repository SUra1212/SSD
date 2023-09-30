import React, { Component } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser1 } from "../../redux/actions/authAction1";
import classnames from "classnames";
import jwt_decode from "jwt-decode";

class Login1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      user: {},
    };
  }
  handleCallbackResponse = (response) => {
    console.log("JWT ID token" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    this.setState({ user: userObject });
    document.getElementById("signInDiv").hidden = true; //when a user already signed in
  };

  handleSignOut = (event) => {
    this.setState({ user: {} }); // no one signed in
    document.getElementById("signInDiv").hidden = false;
  };
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard1");
    }
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id:
          "943710538249-c5b86unf68085l2u7kb7dedfgcogi2b4.apps.googleusercontent.com",
        callback: this.handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );

      window.google.accounts.id.prompt();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      alert("Login Successfully");
      this.props.history.push("/dashboard1"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
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
    this.props.loginUser1(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { email, password, errors, user } = this.state;
    return (
      <div>
        <section className="login c">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="login-left">
                  <h4 className="text-capitalize">
                    Login with your credentials to enjoy the Application
                    services
                  </h4>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login-right">
                  <h1>Login</h1>
                  <form noValidate onSubmit={this.loginSubmit}>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label htmlFor="Email">Email</label> <br />
                        <input
                          type="email"
                          className="input-control"
                          placeholder="Enter your email"
                          id="email"
                          value={email}
                          onChange={this.onChangeLogin}
                          error={errors.email}
                          classname={classnames("", {
                            //return the value of the element's class attribute
                            invalid: errors.email || errors.emailNotFound,
                          })}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.email}
                          {errors.emailNotFound}
                        </span>
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
                          onChange={this.onChangeLogin}
                          error={errors.password}
                          classname={classnames("", {
                            invalid:
                              errors.password || errors.passwordIncorrect,
                          })}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.password}
                          {errors.passwordIncorrect}
                        </span>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <button
                          type="submit"
                          className="btn btn-md btn-register"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div id="signInDiv"></div>
                    {Object.keys(user).length !== 0 && (
                      <button onClick={(e) => this.handleSignOut(e)}>
                        Sign Out
                      </button>
                    )}
                    {user && (
                      <div>
                        <img src={user.picture} alt="User"></img>
                        <h3>{user.name}</h3>
                      </div>
                    )}
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <p>
                          Don't have an account ?
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

Login1.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// passing read-only properties for a component to consume
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser1 })(Login1);
