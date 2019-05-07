import React, { Component } from "react";
import { ACCESS_TOKEN } from "../constants";

class NavigationBar extends Component {
  componentDidMount() {
    if (localStorage.getItem("isLogged") === null) {
      localStorage.setItem("isLogged", false);
    }
  }

  logoutUser() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem("isLogged", false);
  }

  renderNavBar() {
    if (localStorage.getItem("isLogged") === "true") {
      return (
        <ul className="nav navbar-nav">

          <li>
            <a href="/">Trainings</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
          <li>
            <a href="/projects">Projects</a>
          </li>

          <li>
            <a href="/books">Books</a>
          </li>
          <li>
            <a href="/materials">Materials</a>
          </li>
        
          <li>
            <a href="/add">Add programing</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>
      );
    }
  }

  renderLogout() {
    if (localStorage.getItem("isLogged") === "true") {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="/" onClick={this.logoutUser}>
              <img alt="logout"
                src={require("../images/logout.png")}
                width="32px"
                height="32px"
              />
              Logout
            </a>
          </li>
        </ul>
      );
    }
  }

  renderLogin() {
    if (localStorage.getItem("isLogged") === "false") {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="mr-4">
            <a href="/login">
              <img alt="login"
                src={require("../images/login.png")}
                width="32px"
                height="32px"
              />
              Login
            </a>
          </li>
          <li>
            <a href="/registration">
              <img alt="registration"
                src={require("../images/signup.png")}
                width="32px"
                height="32px"
              />
              Sign Up
            </a>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg py-0 navbar-light my-gradient">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img alt="logo" src={require("../images/brandText.png")} />
            </a>
            {this.renderNavBar()}
            {this.renderLogin()}
            {this.renderLogout()}
          </div>
        </nav>
        <div className="container-fluid p-0 m-0;">
          <hr />
        </div>
      </div>
    );
  }
}

export default NavigationBar;
