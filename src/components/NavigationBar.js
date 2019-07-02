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
        <ul className="nav navbar-nav text-center mt-4 nav-stacked mynavbar-nav">
          <li>
            <div className="fadeCon ">
              <a className="navbar-style" href="/">
                <img
                  alt="keyboard"
                  className="fadeI"
                  src={require("../images/keyboardplus.png")}
                  width="32"
                  height="32"
                />
                <img
                  alt="keyboard"
                  className="fadeO"
                  src={require("../images/keyboardblack.png")}
                  width="32"
                  height="32"
                />
                <br />

                <p className="py-2 hvr-underline-from-center">Trainings</p>
              </a>
            </div>
          </li>
          <li>
            <div className="fadeCon ">
              <a className="navbar-style" href="/history">
                <img
                  alt="history"
                  className="fadeI"
                  src={require("../images/documentplus.png")}
                  width="32"
                  height="32"
                />
                <img
                  alt="history"
                  className="fadeO"
                  src={require("../images/document.png")}
                  width="32"
                  height="32"
                />
                <br />

                <p className="py-2 hvr-underline-from-center">History</p>
              </a>
            </div>
          </li>
          <li>
            <div className="fadeCon ">
              <a className="navbar-style" href="/projects">
                <img
                  alt="project"
                  className="fadeI"
                  src={require("../images/blueprintplus.png")}
                  width="32"
                  height="32"
                />
                <img
                  alt="project"
                  className="fadeO"
                  src={require("../images/blueprint.png")}
                  width="32"
                  height="32"
                />
                <br />

                <p className="py-2 hvr-underline-from-center">Projects</p>
              </a>
            </div>
          </li>

          <li>
            <div className="fadeCon ">
              <a className="navbar-style" href="/books">
                <img
                  alt="books"
                  className="fadeI"
                  src={require("../images/open-bookplus.png")}
                  width="32"
                  height="32"
                />
                <img
                  alt="books"
                  className="fadeO"
                  src={require("../images/open-book.png")}
                  width="32"
                  height="32"
                />
                <br />

                <p className="py-2 hvr-underline-from-center">Books</p>
              </a>
            </div>
          </li>
          <li>
            <div className="fadeCon ">
              <a className="navbar-style" href="/materials">
                <img
                  alt="materials"
                  className="fadeI"
                  src={require("../images/folderplus.png")}
                  width="32"
                  height="32"
                />
                <img
                  alt="materials"
                  className="fadeO"
                  src={require("../images/folder.png")}
                  width="32"
                  height="32"
                />
                <br />

                <p className="py-2 hvr-underline-from-center">Materials</p>
              </a>
            </div>
          </li>

          <li>
            <div className="fadeCon ">
              <a className="navbar-style" href="/add">
                <img
                  alt="add"
                  className="fadeI"
                  src={require("../images/fileplus.png")}
                  width="32"
                  height="32"
                />
                <img
                  alt="add"
                  className="fadeO"
                  src={require("../images/file.png")}
                  width="32"
                  height="32"
                />
                <br />

                <p className="py-2 hvr-underline-from-center">Add manualy</p>
              </a>
            </div>
          </li>
          <li>
            <div className="fadeCon ">
              <a className="navbar-style" href="/settings">
                <img
                  alt="settings"
                  className="fadeI"
                  src={require("../images/gearsplus.png")}
                  width="32"
                  height="32"
                />
                <img
                  alt="settings"
                  className="fadeO"
                  src={require("../images/gears.png")}
                  width="32"
                  height="32"
                />
                <br />

                <p className="py-2 hvr-underline-from-center">Settings</p>
              </a>
            </div>
          </li>
        </ul>
      );
    }
  }

  renderLogout() {
    if (localStorage.getItem("isLogged") === "true") {
      return (
        <ul className="nav navbar-nav navbar-right mt-4 mx-auto">
          <li className=" mr-0 pr-0 ">

          <div className="fadeCon ">
            <a className="navbar-style" href="/" onClick={this.logoutUser}>
              <img
                alt="logout"
                className="fadeI"
                src={require("../images/logout+.png")}
                width="32"
                height="32"
              />
              <img
                alt="logout"
                className="fadeO"
                src={require("../images/logoutblack.png")}
                width="32"
                height="32"
              />
<br/>
              <p className="py-2 hvr-underline-from-center">Logout</p>
            </a>
          </div>





          </li>
        </ul>
      );
    }
  }

  renderLogin() {
    if (localStorage.getItem("isLogged") === "false") {
      return (
        <ul className="nav navbar-nav navbar-right ">
          <li>

          <div className="fadeCon ">
            <a className="navbar-style" href="/login" >
              <img
                alt="login"
                className="fadeI mt-2"
                src={require("../images/login+.png")}
                width="32"
                height="32"
              />
              <img
                alt="login"
                className="fadeO mt-2"
                src={require("../images/loginblack.png")}
                width="32"
                height="32"
              />
          <br/>
              <p className="mt-3 hvr-underline-from-center">Login</p>
            </a>
          </div>


          </li>
          <li>

          <div className="fadeCon ">
            <a className="navbar-style" href="/registration" >
              <img
                alt="signup"
                className="fadeI mt-2"
                src={require("../images/signup+.png")}
                width="32"
                height="32"
              />
              <img
                alt="signup"
                className="fadeO mt-2"
                src={require("../images/signupblack.png")}
                width="32"
                height="32"
              />
          <br/>
              <p className="mt-3 hvr-underline-from-center">Sign Up</p>
            </a>
          </div>

          </li>
        </ul>
      );
    }
  }

  render() {

    let centerLogo =""
    if (localStorage.getItem("isLogged") === "true") {
      centerLogo = "mx-auto";
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg py-0 ">
          <div className="container-fluid">
            <a className={"navbar-brand " +centerLogo} href="/">
              <img alt="logo" src={require("../images/brandText.png")} />
            </a>
            {this.renderNavBar()}
            {this.renderLogin()}
            {this.renderLogout()}
          </div>
        </nav>
        <div className="container-fluid p-0 m-0;" />
      </div>
    );
  }
}

export default NavigationBar;
