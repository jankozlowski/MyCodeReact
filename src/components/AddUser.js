import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
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
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };


    axios.post(API_BASE_URL + "api/user",  newUser ).then(res => {

    });
    axios.get(API_BASE_URL + "api/user/all").then(res => {

    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          Name:
          <br />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <br />
          Email:
          <br />
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <br />
          Password:
          <br />
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <br />
          Password2:
          <br />
          <input
            type="text"
            name="passwordConfirm"
            value={this.state.passwordConfirm}
            onChange={this.onChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddUser;
