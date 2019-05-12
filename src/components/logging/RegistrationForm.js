import React, { Component } from "react";
import axios from "axios";
import "react-overlay-loader/styles.css";
import { Loader } from "react-overlay-loader";
import { API_BASE_URL } from "../../constants";

class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
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

    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errorMessage: "Passwords does not match"
      });
    } else if (this.state.name.lenght === 0) {
      this.setState({
        errorMessage: "Name field is empty"
      });
    } else if (this.state.email.lenght === 0) {
      this.setState({
        errorMessage: "Email field is empty"
      });
    } else if (this.state.password.lenght === 0) {
      this.setState({
        errorMessage: "Password field is empty"
      });
    } else if (this.state.passwordConfirm.lenght === 0) {
      this.setState({
        errorMessage: "Password Confirm field is empty"
      });
    } else {
      this.setState({
        loading: true
      });

      axios
        .post(API_BASE_URL + "api/auth/signup", newUser)
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
          this.setState({
            loading: false,
            sucess: true
          });
        });
    }
  }

  renderForm() {
    if (this.state.sucess === false) {
      return (
        <div className="pattern">

          <div className="container text-center table-display">
          <div className="box-container py-5 px-5">
            <div className="pageblock">
              <div className="formblock">
                <form
                  method="POST"
                  className="form-signin"
                  onSubmit={this.onSubmit}
                >
                  <h1 className="form-heading ">Create your account</h1>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="passwordConfirm"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={this.state.passwordConfirm}
                      onChange={this.onChange}
                    />
                  </div>

                  <p className="text-danger">{this.state.errorMessage}</p>

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Submit
                  </button>
                  <a className="btn btn-lg btn-primary btn-block" href="/">
                    Back
                  </a>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    }
  }
  renderInformation() {
    if (this.state.sucess === true) {
      return (
        <div className="container-fluid">
          <div className="d-flex justify-content-center border border-primary box-container">
            <p className="responseText">
              The account was created successfully. To email address you have
              provided a confirmation mail has been sent. Please click on
              received link to activate the account.
            </p>
          </div>
        </div>
      );
    }
  }
  renderLoading() {
    if (this.state.loading === true) {
      return <Loader fullPage loading />;
    }
  }

  render() {
    return (
      <div className="bg-light">
        <div className="form-margins">
          {this.renderForm()}
          {this.renderInformation()}
          {this.renderLoading()}
        </div>
      </div>
    );
  }
}
export default RegistrationForm;
