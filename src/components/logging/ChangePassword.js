import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: "",
      password: "",
      passwordConfirm: "",
      sucess: false,
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const queryString = require("query-string");

    const parsed = queryString.parse(window.location.search);

    this.setState({
      tokenId: parsed.tokenId
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.password === 0) {
      this.setState({
        errorMessage: "password field is empty"
      });
    }
    if (this.state.passwordConfirm === 0) {
      this.setState({
        errorMessage: "passwordConfirm field is empty"
      });
    }
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errorMessage: "Passwords dose not match"
      });
    } else {
      let newPassword = {
        tokenId: this.state.tokenId,
        newPassword: this.state.password
      };
      this.setState({ loading: true });
      axios
        .post(API_BASE_URL + "api/auth/changePassword", newPassword)
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
            loading: false,
            errorMessage: error.response.data.message
          });
          throw e;
        })
        .then(response => {
          this.setState({
            loading: false,
            sucess: true,
            errorMessage: "Password Changed"
          });
        });
    }
  }

  renderLoading() {
    if (this.state.loading === true) {
      return <Loader fullPage loading />;
    }
  }

  renderForm() {
    if (this.state.sucess === false) {
      return (
        <div className="pattern form-margins bg-light">
          <div className="container text-center table-display">
          <div className="box-container py-5 px-5">
            <div className="pageblock">
              <div className="formblock">
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <h1 className="form-heading">Change Password</h1>
                  <div className="form-group">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="passwordConfirm"
                      type="password"
                      className="form-control"
                      placeholder="Password Confirm"
                      value={this.state.passwordConfirm}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Change Password
                  </button>
                </form>{" "}
              </div>
            </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderForm()}
        {this.renderLoading()}
        <div className="d-flex justify-content-center border border-primary box-container">
          <p className="responseText">{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
