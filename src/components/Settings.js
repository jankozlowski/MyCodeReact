import React, { Component } from "react";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";
import { Loader } from "react-overlay-loader";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      json: [],
      loading: true,
      country: "",
      city: "",
      occupation: "",
      birthday: "",
      gender: false,
      oldPassword: "",
      newPassword: "",
      passwordRepeat: "",
      passwordErrorMessage: ""
    };

    this.onChange = this.onChange.bind(this);
    this.userDetailsSubmit = this.userDetailsSubmit.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount() {
    this.downloadUserDetails();
  }
  onChange(e) {
    console.log(this.state.gender);
    this.setState({ [e.target.name]: e.target.value });
  }

  downloadUserDetails() {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    };

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        API_BASE_URL + "api/user/name/" + localStorage.getItem("userName"),
        null,
        config
      )
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          json: response.data,
          country: response.data.userDetails.country,
          city: response.data.userDetails.city,
          occupation: response.data.userDetails.occupation,
          birthday: response.data.userDetails.birthday,
          gender: response.data.userDetails.gender,
          oldPassword: "",
          newPassword: "",
          passwordRepeat: ""
        });
      });
  }

  userDetailsSubmit(e) {
    e.preventDefault();
    let newUserDetails = {
      country: this.state.country,
      city: this.state.city,
      occupation: this.state.occupation,
      birthday: this.state.birthday,
      gender: this.state.gender
    };
    axios
      .post(
        API_BASE_URL + "api/user/details/" + localStorage.getItem("userName"),
        newUserDetails
      )
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      })
      .then(response => {
        if (response.status === 200) {
          alert("Data saved");
        } else {
          alert("Save Error");
        }
      });
  }

  resetPassword(e) {
    e.preventDefault();
    let newPasswordDetails = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };

    console.log("len " + this.state.oldPassword.lenght);

    if (this.state.oldPassword === "" || this.state.oldPassword === undefined) {
      this.setState({
        passwordErrorMessage: "Old Password field is empty"
      });
    } else if (
      this.state.newPassword === "" ||
      this.state.newPassword === undefined
    ) {
      this.setState({
        passwordErrorMessage: "New Password field is empty"
      });
    } else if (
      this.state.passwordRepeat === "" ||
      this.state.passwordRepeat === undefined
    ) {
      this.setState({
        passwordErrorMessage: "Repeat Password field is empty"
      });
    } else if (this.state.newPassword !== this.state.passwordRepeat) {
      this.setState({
        passwordErrorMessage:
          "New Password and Repeat Password field does not match"
      });
    } else {
      axios
        .post(
          API_BASE_URL +
            "api/user/changePassword/" +
            localStorage.getItem("userName"),
          newPasswordDetails
        )
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
            passwordErrorMessage: error.response.data.message
          });
          throw e;
        })
        .then(response => {
          this.setState({
            passwordErrorMessage: "Password Changed"
          });
        });
    }
  }

  renderLoading() {
    if (this.state.loading === true) {
      return <Loader fullPage loading />;
    }
  }

  renderUserDetails() {
    if (this.state.json.userDetails !== undefined) {
      return (
        <div>
          <h5 className="mb-4">Personal Details</h5>

          <form method="POST" onSubmit={this.userDetailsSubmit}>
            <div className="form-group row">
              <label
                htmlFor="staticEmail"
                className="col-sm-3 col-form-label col-form-label-sm"
              >
                Email:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext form-control-sm"
                  id="staticEmail"
                  value={this.state.json.email}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="staticUsername"
                className="col-sm-3 col-form-label col-form-label-sm"
              >
                Username:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext form-control-sm"
                  id="staticUsername"
                  value={this.state.json.name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputCountry"
                className="col-sm-3 col-form-label col-form-label-sm"
              >
                Country:
              </label>
              <div className="col-sm-9">
                <input
                  name="country"
                  type="text"
                  className="form-control form-control-sm"
                  id="countryInput"
                  defaultValue={this.state.json.userDetails.country}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputCity"
                className="col-sm-3 col-form-label col-form-label-sm"
              >
                City:
              </label>
              <div className="col-sm-9">
                <input
                  name="city"
                  type="text"
                  className="form-control form-control-sm"
                  id="cityInput"
                  defaultValue={this.state.json.userDetails.city}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputOccupation"
                className="col-sm-3 col-form-label col-form-label-sm"
              >
                Occupation:
              </label>
              <div className="col-sm-9">
                <input
                  name="occupation"
                  type="text"
                  className="form-control form-control-sm"
                  id="occupationInput"
                  defaultValue={this.state.json.userDetails.occupation}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputBirth"
                className="col-sm-3 col-form-label col-form-label-sm"
              >
                Birthday:
              </label>
              <div className="col-sm-9">
                <input
                  name="birthday"
                  type="text"
                  className="form-control form-control-sm"
                  id="birthInput"
                  defaultValue={this.state.json.userDetails.birthday}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div onChange={this.onChange} className="form-group row">
              <label
                htmlFor="inputBirth"
                className="col-sm-3 col-form-label col-form-label-sm"
              >
                Gender:
              </label>
              <div className="form-check form-check-inline ml-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="false"
                  defaultChecked={!this.state.gender}
                />
                <label
                  className="form-check-label col-form-label-sm"
                  htmlFor="inlineRadio1"
                >
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline ml-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio2"
                  value="true"
                  defaultChecked={this.state.gender}
                />
                <label
                  className="form-check-label col-form-label-sm"
                  htmlFor="inlineRadio2"
                >
                  Female
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Update Personal Details
            </button>
          </form>
        </div>
      );
    }
  }

  renderChangePassword() {
    return (
      <div>
        <h5 className="mb-4">Change Password</h5>

        <form method="POST" onSubmit={this.resetPassword}>
          <div className="form-group row">
            <label
              htmlFor="inputOldPassword"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Old Password:
            </label>
            <div className="col-sm-8">
              <input
                name="oldPassword"
                type="password"
                className="form-control form-control-sm"
                id="oldPasswordInput"
                defaultValue=""
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputNewPassword"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              New Password:
            </label>
            <div className="col-sm-8">
              <input
                name="newPassword"
                type="password"
                className="form-control form-control-sm"
                id="newPasswordInput"
                defaultValue=""
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputNewPasswordRepeat"
              className="col-sm-4 col-form-label col-form-label-sm"
            >
              Repeat password:
            </label>
            <div className="col-sm-8">
              <input
                name="passwordRepeat"
                type="password"
                className="form-control form-control-sm"
                id="newPasswordRepeatInput"
                defaultValue=""
                onChange={this.onChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Change Password
          </button>
        </form>
        <br />
        <br />
        <br />
        <p className="text-danger">{this.state.passwordErrorMessage}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row box-container">
          <div className="px-5 py-5 col-6">{this.renderUserDetails()}</div>
          <div className="px-5 py-5 col-6">{this.renderChangePassword()}</div>
        </div>
      </div>
    );
  }
}

export default Settings;
