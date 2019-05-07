import React, { Component } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { API_BASE_URL } from "../../constants";
import axios from "axios";
import moment from "moment";
import uniqueid from "uniqid";

class MonthHistory extends Component {
  constructor() {
    super();
    this.state = {
      logJson: []
    };
  }

  getLastRecords() {

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(API_BASE_URL + "api/log/"+localStorage.getItem("userName")+"/last/5")
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

        this.setState({
          logJson: response.data.content
        });
      });
  }

  componentDidMount() {
    this.getLastRecords();
  }

  renderHistoryLine(content) {
    return (
      <div className="history-row text-center" key={uniqueid()}>
        <div className="col-5 history-labels">
          {moment(content.createdAt).format("DD/MM/YYYY")}
        </div>
        <div className="col-3 history-labels">
          {content.charSum}
        </div>
        <div className="col-4 history-labels-last">
          {content.duration.substr(0, content.duration.length - 4)}
        </div>
      </div>
    );
  }

  renderContent() {
    if (this.state.logJson[0] !== undefined) {
      var data = [];
      for (var i = 0; i < this.state.logJson.length; i++) {
        data.push(this.renderHistoryLine(this.state.logJson[i]));
      }

      return data;
    }
  }

  render() {
    return (
      <div className="box-container text-center">
        <h5 className="container-header container-fluid history">History</h5>
        <div className="text-center history-row">
          <div className="col-5 history-top-labels text-center"><b>Date:</b></div> <div className="text-center col-3 history-top-labels history-char-label"><b>Chars:</b></div>{" "}
          <div className="col-4 history-top-labels-last text-center"><b>Time:</b></div>
        </div>
        {this.renderContent()}
        <div className="container-footer-history">
          <a href="history">See whole history</a>
        </div>
      </div>
    );
  }
}

export default MonthHistory;
