import React, { Component } from "react";
import axios from "axios";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { ACCESS_TOKEN } from "../../constants";
import { API_BASE_URL } from "../../constants";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      sucess: false,
      loading: false,
      errorMessage: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    let newUserLogin = {
      name: this.state.name,
      password: this.state.password
    };

    if (this.state.name.lenght === 0) {
      this.setState({
        errorMessage: "Name field is empty"
      });
    } else if (this.state.password.lenght === 0) {
      this.setState({
        errorMessage: "Password field is empty"
      });
    } else {
      this.setState({
        loading: true
      });

      axios
        .post(API_BASE_URL + "api/auth/signin", newUserLogin)
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          this.setState({
            sucess: false,
            loading: false,
            errorMessage: error.response.data.message
          });
          throw e;
        })
        .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
          localStorage.setItem("isLogged", true);
          localStorage.setItem("userName",  this.state.name);
          this.setState({
            loading: false,
            sucess: true
          });
          this.props.history.push("/");
        });
    }
  }

  renderLoading() {
    if (this.state.loading === true) {
      return <Loader fullPage loading />;
    }
  }

  render() {
    if (localStorage.getItem("isLogged") === "true") {
      this.props.history.push("/");
    }

    return (
      <div className="pattern form-margins bg-light">
        <div className="container text-center table-display">
        <div className="box-container py-5 px-5">
          <div className="pageblock">
            <div className="formblock">
              <form
                method="POST"
                className="form-signin"
                onSubmit={this.onSubmit}
              >
                <h1 className="form-heading">Login</h1>

                <div className="form-group">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />{" "}
                </div>
                <p className="text-danger">{this.state.errorMessage}</p>
                <p>{localStorage.getItem(ACCESS_TOKEN)}</p>
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  Login
                </button>
                <h6 className="text-center pt-3">
                  <a href="/resetPassword">Reset Password</a>
                </h6>
                <h6 className="text-center">
                  <a href="/resetValidation">Resend Activation Token</a>
                </h6>
                <h6 className="text-center">
                  <a href="/registration">Create an account</a>
                </h6>
                <p>Demo account - username:demo password:demo</p>
              </form>
            </div>
            </div>
          </div>
        </div>
        {this.renderLoading()}
      </div>
    );
  }
}

export default LoginForm;
