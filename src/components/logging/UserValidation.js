import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

class UserValidation extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: "",
      error: false
    };
  }

  componentDidMount() {
    const queryString = require("query-string");

    const parsed = queryString.parse(window.location.search);

    let newToken = {
      tokenId: parsed.tokenId,
      token: parsed.token
    };

    axios
      .post(API_BASE_URL + "api/auth/verification", newToken)
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
          error: true
        });
      })
      .then(response => {

        if (this.state.error === false) {
          this.setState({
            errorMessage: response.data.message
          });
        }
      });
  }

  render() {
    return (
      <div className="container">
        <p>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default UserValidation;
