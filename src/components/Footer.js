import React, { Component } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { API_BASE_URL } from "../constants";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      error: false
    };
  }

  getApiData() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(API_BASE_URL + "api/user/all")
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
          error: true
        });
      })
      .then(response => {
        if (!this.state.error) {
          this.setState({
            error: false
          });
        }
      });
  }

  renderFooter() {
    if (localStorage.getItem("isLogged") === "false") {
      return (
        <div className="pagefooter">
          <div className="container-fluid p-0 m-0">
            <hr />
          </div>
          <div className="container-fluid">
            <div className="row my-gradient2 py-3">
              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div className="row">
                  <div className="col-sm-2 col-3 col-no-right-padding">
                    <div className="fadeCon ">
                      <a href="https://www.tumblr.com">
                        {" "}
                        <img
                          className="img-fluid fadeI"
                          id="tumblr_icon"
                          alt="tumblr"
                          src={require("../images/Tumblr_icon.png")}
                        />
                        <img
                          className="img-fluid fadeO"
                          id="tumblr_icon"
                          alt="tumblr"
                          src={require("../images/Tumblr_icon2+.png")}
                        />{" "}
                      </a>
                    </div>
                    <div className="">
                      <img
                        className="img-fluid"
                        id="tumblr_icon"
                        alt="tumblr"
                        src={require("../images/Tumblr_icon2+.png")}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-sm-2 col-3  col-no-right-padding">
                    <div className="fadeCon ">
                      <a href="https://www.facebook.com">
                        {" "}
                        <img
                          className="img-fluid fadeI"
                          alt="facebook"
                          id="facebook_icon"
                          src={require("../images/facebook.png")}
                        />
                        <img
                          className="img-fluid fadeO"
                          alt="facebook"
                          id="facebook_icon"
                          src={require("../images/facebook2+.png")}
                        />
                      </a>
                    </div>
                  </div>{" "}
                  <div className="col-sm-2 col-3  col-no-right-padding">
                    <div className="fadeCon ">
                      <a href="https://twitter.com">
                        {" "}
                        <img
                          className="img-fluid fadeI"
                          alt="twitter"
                          id="twitter_icon"
                          src={require("../images/Twitter-icon.png")}
                        />
                        <img
                          className="img-fluid fadeO"
                          alt="twitter"
                          id="twitter_icon"
                          src={require("../images/Twitter-icon2+.png")}
                        />
                      </a>
                    </div>
                  </div>{" "}
                  <div className="col-sm-2 col-3  col-no-right-padding">
                    <div className="fadeCon ">
                      <a href="https://plus.google.com">
                        {" "}
                        <img
                          className="img-fluid fadeI"
                          alt="google"
                          id="google_icon"
                          src={require("../images/google_plus.png")}
                        />
                        <img
                          className="img-fluid fadeO"
                          alt="google"
                          id="google_icon"
                          src={require("../images/google_plus2+.png")}
                        />
                        <br />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-9">
                    <div className="fadeCon ">
                      <a href="https://play.google.com/store/apps/">
                        {" "}
                        <img
                          className="img-fluid fadeI"
                          alt="app"
                          id="google_app_icon"
                          src={require("../images/googleplay.png")}
                        />
                        <img
                          className="img-fluid fadeO"
                          alt="app"
                          id="google_app_icon"
                          src={require("../images/googleplay2+.png")}
                        />
                      </a>
                    </div>
                    <div className="">
                      <img
                        className="img-fluid"
                        alt="app"
                        id="google_app_icon"
                        src={require("../images/googleplay2+.png")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">

                <div className="fadeCon ">
                  <a href="/">
                    {" "}
                    <img
                      className="img-fluid fadeI"
                      alt="logo"
                      id="google_app_icon"
                      src={require("../images/timelogo.png")}
                    />
                    <img
                      className="img-fluid fadeO"
                      alt="logo"
                      id="google_app_icon"
                    src={require("../images/timelogo2+.png")}
                    />
                  </a>
                </div>
                <div className="">
                  <img
                    className="img-fluid"
                    alt="logo"
                    id="google_app_icon"
                    src={require("../images/timelogo2+.png")}
                  />
                </div>
            </div>

              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xs-offset-3 col-sm-offset-3 col-md-offset-3 col-lg-offset-3 text-center">
                <p className="fluid-font">
                  <b>MyCode &trade;</b>
                </p>
                <p className="fluid-font">
                  <b>Created by binnaryalchemist.pl</b>
                </p>
                <p className="fluid-font">
                  <b>&copy; 2019 All Rights Reserved</b>
                </p>
                <p className="fluid-font">
                  <b>Have a nice and productive day</b>
                </p>
              </div>

              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">
              <div className="fadeCon ">
                <a href="http://binaryalchemist.pl">
                  {" "}
                  <img
                    className="img-fluid fadeI"
                    alt="logo"
                    id="google_app_icon"
                    src={require("../images/logo.png")}
                  />
                  <img
                    className="img-fluid fadeO"
                    alt="logo"
                    id="google_app_icon"
                  src={require("../images/logo2+.png")}
                  />
                </a>
              </div>
              <div className="">
                <img
                  className="img-fluid"
                  alt="logo"
                  id="google_app_icon"
                  src={require("../images/logo2+.png")}
                />
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderFooter()}</div>;
  }
}

export default Footer;
