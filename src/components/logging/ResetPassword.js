import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderLoading() {
    if (this.state.loading === true) {
      return <Loader fullPage loading />;
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.email === 0) {
      this.setState({
        errorMessage: "Email field is empty"
      });
    } else {
      this.setState({
        loading: true
      });

      axios
        .post(API_BASE_URL + "api/auth/resetPassword?email=" + this.state.email)
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
            errorMessage: error.response.data.message,
            loading: false
          });
          throw e;
        })
        .then(response => {
          this.setState({
            loading: false,
            errorMessage: "ok"
          });
        });
    }
  }

  render() {
    return (
      <div className="pattern form-margins bg-light">
        <div className="container text-center table-display">
          <div className="pageblock">
            <div className="formblock">
              <form className="form-signin" onSubmit={this.onSubmit}>
                <h1 className="form-heading">Reset Password</h1>
                <div className="form-group">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  Reset
                </button>
              </form>
              <p>{this.state.errorMessage}</p>
              {this.renderLoading()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
