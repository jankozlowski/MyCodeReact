import React, { Component } from "react";
import { ACCESS_TOKEN } from "../constants";
import { API_BASE_URL } from "../constants";
import axios from "axios";
import moment from "moment";
import uniqueid from "uniqid";

class FullHistory extends Component {
  constructor() {
    super();
    this.state = {
      logJson: [],
      logCount: 1,
      selectedPage: 1
    };
  }

  getLogData(page) {
    page = page-1;
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(API_BASE_URL + "api/log/"+localStorage.getItem("userName")+"/page/" + page + "/20")
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

  getLogSize() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(API_BASE_URL + "api/log/"+localStorage.getItem("userName")+"/size")
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
          logCount: response.data
        });
      });
  }


  calculateTypeRate(json) {
    var time = json.duration.substr(0, json.duration.length - 4);
    var tt = time.split(":");
    var sec = tt[0] * 3600 + tt[1] * 60 + tt[2] * 1;

    var rate = Math.round(json.charSum / (sec / 60));

    return rate;
  }

  getNamepart(path){
    if(path!==null){
      return (path.substr(path.lastIndexOf('/') + 1));
    }
  }

  showLanguageIcons(json){


    if (json.language.length === 1) {
      return <img src={API_BASE_URL + "api/file/downloadFile/"+localStorage.getItem("userName")+"/" + this.getNamepart(json.language[0].location)} width="26" height="26" alt="language" />
    }
    else{
      var data = [];

      for (var i = 0; i < json.language.length; i++) {
        data.push(<img key={uniqueid()} src={API_BASE_URL + "api/file/downloadFile/"+localStorage.getItem("userName")+"/" + this.getNamepart(json.language[i].location)} width="26" height="26"  alt="language" />);
      }
      return data;
    }
  }

  showLanguage(json) {
    if (json.language.length === 1) {
      return json.language[0].name;
    } else {
      var lan = "";
      for (var i = 0; i < json.language.length; i++) {
        lan += json.language[i].name;
        if (i !== json.language.length - 1) {
          lan += ", ";
        }
      }

      return lan;
    }
  }

  showProjectName(stateName){
    if(stateName.project===null){
      return "None";
    }
    else{
      return stateName.project.name;
    }
  }

  renderTableValues() {
    var data = [];

    if (this.state.logJson[0] !== undefined) {
      for (var i = 0; i < this.state.logJson.length; i++) {
        data.push(
          <tr key={uniqueid()}>
            <td>{this.showLanguageIcons(this.state.logJson[i])}{this.showLanguage(this.state.logJson[i])}</td>
            <td>
              {moment(this.state.logJson[i].createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </td>
            <td>{this.showProjectName(this.state.logJson[i])}</td>
            <td>{this.state.logJson[i].charSum}</td>
            <td>{this.calculateTypeRate(this.state.logJson[i])}</td>
          </tr>
        );
      }
    }
    return data;
  }

  componentDidMount() {
    this.getLogData(this.state.selectedPage);
    this.getLogSize();
  }

  setPageValue(page){

    this.setState({
      selectedPage: page
    })
    this.getLogData(page);
  }

  createPagination() {
    var data = [];
    var pages = Math.ceil(this.state.logCount / 20);
    var active ="";
    var disablePrev = "";
    var disableNext = ""

    if(this.state.selectedPage===1){
      disablePrev = "disabled";
    }
    if(this.state.selectedPage===pages){
      disableNext = "disabled";
    }

    for (var i = 0; i < pages; i++) {

      if(this.state.selectedPage === i+1){
        active = "active";
      }
      else{
        active ="";
      }

      data.push(
        <li key={uniqueid()} className={"page-item " + active} >
          <a className="page-link" onClick = {this.setPageValue.bind(this, i+1) }>
            {i+1}
          </a>
        </li>
      );
    }
    return (
      <div className="row justify-content-around py-3">
        <nav aria-label="Page navigation example ">
          <ul className="pagination">
            <li className={"page-item " + disablePrev}>
              <a className="page-link" onClick = {this.setPageValue.bind(this, this.state.selectedPage - 1) }>
                Previous
              </a>
            </li>
            {data}
            <li className={"page-item " + disableNext}>
              <a className="page-link" onClick = {this.setPageValue.bind(this, this.state.selectedPage + 1) }>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <div>
      <hr />
        <div className="row text-center">

          <table className="table-responsive  table-striped table-hover">
            <thead>
              <tr>
                <td>Languages:</td>
                <td>Date:</td>
                <td>Project:</td>
                <td>Chars:</td>
                <td>Speed:</td>
              </tr>
            </thead>
            <tbody>{this.renderTableValues()}</tbody>
            <tfoot />
          </table>
        </div>
        
        {this.createPagination()}
      </div>
    );
  }
}

export default FullHistory;
