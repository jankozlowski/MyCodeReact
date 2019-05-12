import React, { Component } from "react";

class SocialMedia extends Component {
  constructor() {
    super();
    this.state = {
      fadeArray: [
        true,
        false,
        true,
        false,
        true,
        false,
        true,
        false,
        true,
        false,
        true,
        false
      ]
    };
  }

  fadeImagesIn(image1, image2) {
    var fadeArray = this.state.fadeArray;
    fadeArray[image1] = false;
    fadeArray[image2] = true;

    this.setState({
      fadeArray: fadeArray
    });
  }
  fadeImagesOut(image1, image2) {
    var fadeArray = this.state.fadeArray;
    fadeArray[image1] = true;
    fadeArray[image2] = false;

    this.setState({
      fadeArray: fadeArray
    });
  }

  render() {
    return (
      <div className="box-container text-center">
        <h5 className="container-header">See also</h5>
        <div>
          <div className="row">

            <div className="fadeContainer ">
              <div>
                <a href="http://binaryalchemist.pl">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[0] ? "fadeIn" : "fadeOut")
                    }
                    src={require("../images/logo+.png")}
                    alt="binaryalchemist"
                  />
                </a>
                <a href="http://binaryalchemist.pl">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[1] ? "fadeIn" : "fadeOut")
                    }
                    onMouseOver={() => this.fadeImagesIn(0, 1)}
                    onMouseOut={() => this.fadeImagesOut(0, 1)}
                    href="http://binaryalchemist.pl"
                    src={require("../images/logo.png")}
                    alt="binaryalchemist"
                  />
                </a>
              </div>
            </div>
            <div className="fadeContainer ">

            <img
              className={
                "img-fluid socialMediaImage"
              }
              href="http://binaryalchemist.pl"
              src={require("../images/empty.png")}
              alt="binaryalchemist"
            />
            </div>
          </div>
          <div className="row">

            <div className="fadeContainer ">
              <div>
                <a href="https://twitter.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[2] ? "fadeIn" : "fadeOut")
                    }
                    src={require("../images/Twitter-icon+.png")}
                    alt="twitter"
                  />
                </a>
                <a href="https://twitter.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[3] ? "fadeIn" : "fadeOut")
                    }
                    onMouseOver={() => this.fadeImagesIn(2, 3)}
                    onMouseOut={() => this.fadeImagesOut(2, 3)}
                    href="https://twitter.com"
                    src={require("../images/Twitter-icon.png")}
                    alt="twitter"
                  />
                </a>
              </div>
            </div>
            <div className="fadeContainer ">

            <img
              className={
                "img-fluid socialMediaImage"
              }
              href="http://binaryalchemist.pl"
              src={require("../images/empty.png")}
              alt="binaryalchemist"
            />
            </div>
          </div>
          <div className="row">

            <div className="fadeContainer ">
              <div>
                <a href="https://www.facebook.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[4] ? "fadeIn" : "fadeOut")
                    }
                    src={require("../images/facebook+.png")}
                    alt="facebook"
                  />
                </a>
                <a href="https://www.facebook.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[5] ? "fadeIn" : "fadeOut")
                    }
                    onMouseOver={() => this.fadeImagesIn(4, 5)}
                    onMouseOut={() => this.fadeImagesOut(4, 5)}
                    href="http://binaryalchemist.pl"
                    src={require("../images/facebook.png")}
                    alt="facebook"
                  />
                </a>
              </div>
            </div>
            <div className="fadeContainer ">

            <img
              className={
                "img-fluid socialMediaImage"
              }
              href="http://binaryalchemist.pl"
              src={require("../images/empty.png")}
              alt="binaryalchemist"
            />
            </div>
          </div>
          <div className="row">

            <div className="fadeContainer ">
              <div>
                <a href="https://plus.google.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[6] ? "fadeIn" : "fadeOut")
                    }
                    src={require("../images/google_plus+.png")}
                    alt="google_plus"
                  />
                </a>
                <a href="https://plus.google.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[7] ? "fadeIn" : "fadeOut")
                    }
                    onMouseOver={() => this.fadeImagesIn(6, 7)}
                    onMouseOut={() => this.fadeImagesOut(6, 7)}
                    href="http://binaryalchemist.pl"
                    src={require("../images/google_plus.png")}
                    alt="google_plus"
                  />
                </a>
              </div>
            </div>
            <div className="fadeContainer ">

            <img
              className={
                "img-fluid socialMediaImage"
              }
              href="http://binaryalchemist.pl"
              src={require("../images/empty.png")}
              alt="binaryalchemist"
            />
            </div>
          </div>

          <div className="row">

            <div className="fadeContainer ">
              <div>
                <a href="https://www.tumblr.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[8] ? "fadeIn" : "fadeOut")
                    }
                    src={require("../images/Tumblr_icon+.png")}
                    alt="tumblr"
                  />
                </a>
                <a href="https://www.tumblr.com">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[9] ? "fadeIn" : "fadeOut")
                    }
                    onMouseOver={() => this.fadeImagesIn(8, 9)}
                    onMouseOut={() => this.fadeImagesOut(8, 9)}
                    href="https://www.tumblr.com"
                    src={require("../images/Tumblr_icon.png")}
                    alt="tumblr"
                  />
                </a>
              </div>
            </div>
            <div className="fadeContainer ">

            <img
              className={
                "img-fluid socialMediaImage"
              }
              href="http://binaryalchemist.pl"
              src={require("../images/empty.png")}
              alt="binaryalchemist"
            />
            </div>
          </div>
<br />
          <div className="row">
            <br />
            <br />
            <div className="fadeContainer ">
              <div>
                <a href="https://play.google.com/store/apps/">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[10] ? "fadeIn" : "fadeOut")
                    }
                    src={require("../images/googleplay+.png")}
                    alt="binaryalchemist"
                  />
                </a>
                <a href="https://play.google.com/store/apps/">
                  <img
                    className={
                      "img-fluid socialMediaImage " +
                      (this.state.fadeArray[11] ? "fadeIn" : "fadeOut")
                    }
                    onMouseOver={() => this.fadeImagesIn(10, 11)}
                    onMouseOut={() => this.fadeImagesOut(10, 11)}
                    href="http://binaryalchemist.pl"
                    src={require("../images/googleplay.png")}
                    alt="binaryalchemist"
                  />
                </a>
              </div>
            </div>
            <div className="fadeContainer d-block d-xl-none ">

            <img
              className={
                "img-fluid socialMediaImage"
              }
              href="http://binaryalchemist.pl"
              src={require("../images/empty.png")}
              alt="binaryalchemist"
            />
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default SocialMedia;
