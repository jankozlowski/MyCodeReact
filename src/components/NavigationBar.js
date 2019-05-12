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
                  className="fadeI"
                  src={require("../images/keyboardplus.png")}
                  width="32"
                  height="32"
                />
                <img
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
                  className="fadeI"
                  src={require("../images/documentplus.png")}
                  width="32"
                  height="32"
                />
                <img
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
                  className="fadeI"
                  src={require("../images/blueprintplus.png")}
                  width="32"
                  height="32"
                />
                <img
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
                  className="fadeI"
                  src={require("../images/open-bookplus.png")}
                  width="32"
                  height="32"
                />
                <img
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
                  className="fadeI"
                  src={require("../images/folderplus.png")}
                  width="32"
                  height="32"
                />
                <img
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
                  className="fadeI"
                  src={require("../images/fileplus.png")}
                  width="32"
                  height="32"
                />
                <img
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
                  className="fadeI"
                  src={require("../images/gearsplus.png")}
                  width="32"
                  height="32"
                />
                <img
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
                className="fadeI"
                src={require("../images/logout+.png")}
                width="32"
                height="32"
              />
              <img
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
                className="fadeI mt-2"
                src={require("../images/login+.png")}
                width="32"
                height="32"
              />
              <img
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
                className="fadeI mt-2"
                src={require("../images/signup+.png")}
                width="32"
                height="32"
              />
              <img
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
