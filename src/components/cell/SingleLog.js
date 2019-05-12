import React, { Component } from "react";
import moment from "moment";

class SingleLog extends Component {
  makeTextFromDb() {
    var text = "";

    if (this.props.charCount !== undefined) {
      for (var i = 0; i < 127; i++) {
        for (var j = 0; j < this.props.charCount[i]; j++) {
          text += String.fromCharCode(i);
        }
      }
    }

    return text;
  }

  componentDidMount() {}

  renderLanguageText() {
    var text = "";
    if (this.props.language !== undefined) {
      for (var i = 0; i < this.props.language.length; i++) {
        text += this.props.language[i].name;
        text += ", ";
      }
    }

    text = text.substring(0, text.length - 2);

    return text;
  }

  renderDate() {
    if (this.props.createdAt !== undefined) {
      return moment(this.props.createdAt).format("YYYY-MM-DD HH:mm:ss");
    }
  }
  calculateTypeRate() {
    var time = this.props.duration.substr(
      0,
      this.props.duration.length - 4
    );
    var tt = time.split(":");
    var sec = tt[0] * 3600 + tt[1] * 60 + tt[2] * 1;

    var rate = Math.round(this.props.charSum / (sec / 60));

    return rate;
  }

  render() {
    var durationWithoutMilis = this.props.duration.substring(
      0,
      this.props.duration.length - 4
    );

    return (
      <div className="box-container">
        <div hidden className="hiddenText">
          {this.makeTextFromDb()}
        </div>

        <p className="logcell-header">
          <b>{localStorage.getItem("userName")}</b>{" "}
          <a href={"http://localhost:3000/log/" + this.props.logId}>
            programed for {this.props.duration} and wrote in this time{" "}
            {this.props.charSum} characters using {this.renderLanguageText()}
          </a>
          <br />
        </p>
        <div className="container-content ml-3">
          <img
            className="mr-2"
            src={require("../../images/calendar.png")}
            alt="calendar"
          />
          {this.renderDate()}
        </div>
        <div className="row">
          <div className="col-8 my-2">
            <div className="smallkeyboards">
              <img
                className="keyboardImage"
                src={require("../../images/keyboard.jpg")}
                alt="keyboard"
              />
            </div>
          </div>

          <div className="col-2 my-3 pl-4-5 container-content">
            <div className="row row-fluid justify-content-end ">
              {this.props.charSum}
            </div>
            <div className="row row-fluid py-time justify-content-end">
              {durationWithoutMilis}
            </div>
            <div className="row row-fluid py-4 justify-content-end">{this.calculateTypeRate()}</div>
          </div>
          <div className="col-2 my-2 ">
            <img
              className=" row px-1"
              src={require("../../images/keyboardicon.png")}
              alt="keykey"
            />

            <img
              className=" py-2 row px-1"
              src={require("../../images/clock.png")}
              alt="keykey"
            />

            <img
              className="row px-1"
              src={require("../../images/speed.png")}
              alt="keykey"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SingleLog;
