import React, { Component } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { API_BASE_URL } from "../../constants";
import axios from "axios";

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      logJson: []
    };
  }

  getSummary() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);

    axios
      .get(API_BASE_URL + "api/summary/"+localStorage.getItem("userName"))
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
          logJson: response.data
        });
      });
  }

  componentDidMount() {
    this.getSummary();
  }

  render() {

    return (
      <div className="box-container">
        <h5 className="container-header text-center">Summary</h5>
        <div className="container-content ">
        <div className="row pl-4 ">
          <img src={require("../../images/hash.png")} alt="sessions" />
          <p className="summary-text">{this.state.logJson.sessionCount} Sessions</p>
        </div>
        <div className="row py-1 pl-4">
          <img src={require("../../images/clock.png")} alt="time" />
          <p className="summary-text">{this.state.logJson.sumTime} Time Coding</p>
        </div>
        <div className="row py-1 pl-4">
          <img src={require("../../images/keyboardicon.png")} alt="chars" />
          <p className="summary-text">{this.state.logJson.charSum} Characters</p>
        </div>

        <div className="row py-1 pl-4">
          <img src={require("../../images/task.png")} alt="tasks" />
          <p className="summary-text">{this.state.logJson.compleatedTasks}/{this.state.logJson.allTasks}{" "}
          Tasks</p>
        </div>

        <div className="row py-1 pl-4">
          <img src={require("../../images/projecticon.png")} alt="projects" />
          <p className="summary-text">{this.state.logJson.compleatedProjects}/
          {this.state.logJson.allProjects} Projects</p>
        </div>

        <div className="row py-1 pl-4">
          <img src={require("../../images/speed.png")} alt="charbytime" />
          <p className="summary-text">{this.state.logJson.averageCharTime} Chars per minute</p>
        </div>

        <div className="row py-1 pl-4">
          <img src={require("../../images/perday.png")} alt="projecttime" />
          <p className="summary-text">{this.state.logJson.averageTimeInDay} Time per day</p>
        </div>
        </div>
      </div>
    );
  }
}

export default Summary;
