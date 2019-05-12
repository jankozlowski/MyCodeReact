import React, { Component } from "react";

class LoginImage extends Component {
  renderImage() {

    const hrFullScreen = {
      width: 5000
    };

    if (localStorage.getItem("isLogged") === "false") {
      return (
        <div className="container-fluid">
        <div className="row">
          <hr style={hrFullScreen}/>
        </div>
          <div className="row">
            <div className="col-lg-12 text-center p-0 d-flex align-items-center ">

              <img ant="robot"
                className="img-fluid position-relative mx-auto"
                src={require("../images/robot.jpg")}
                alt=""
              />
              <h4 className="text-white  position-absolute offset-6 col-5 my-auto">
                <span className="h2size">Monitor your time</span> <br />
                <br />
                MyCode is a free service that motivates, monitors and increases
                efficiency of writing software.
                <br />
                <br />
                <a
                  className="btn  btn-primary btn-block text-white-normal "
                  href="/registration"
                >
                  Register
                </a>
              </h4>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div className="">{this.renderImage()}</div>;
  }
}

export default LoginImage;
