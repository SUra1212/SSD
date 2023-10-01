import React, { Component } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser2 } from "../../redux/actions/authAction2";
import classnames from "classnames";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";



class Login2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      genericError: "",
      user: {}, 
      isLoggedIn: false,
    };
  }
  responseFacebook = response => {
    alert("Login Successfully");
    window.location.href = '/dashboard2';

  };

  componentClicked = () => console.log("clicked");

  handleCallbackResponse = (response) => {
    console.log("JWT ID token" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    this.setState({ user: userObject });
    document.getElementById("signInDiv").hidden = true; //when a user already signed in
    if (document.getElementById("signInDiv").hidden = true){
      var confirmation = window.confirm("Login Successfully");
      if (confirmation) {
        window.location.href = "/dashboard2"; // Replace with the actual URL
      }
     } 
  };

  handleSignOut = (event) => {
    this.setState({ user: {} }); // no one signed in
    document.getElementById("signInDiv").hidden = false;
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard2");
    }
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id:
          "191706304100-boma0djbs0ffmsnk3ihmu83a4efe75iu.apps.googleusercontent.com",
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
    let fbContent;

    const { email, password, errors, genericError, user } = this.state;
    if (this.state.isLoggedIn) {
    } else {
      fbContent = (
        <FacebookLogin
          appId="157350117438724"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
      );
    }
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

                    <div id="signInDiv"></div>
                    <br/>
                    <div className="my-facebook-button-class">{fbContent}</div>


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
