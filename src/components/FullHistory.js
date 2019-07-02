import React, { Component } from "react";
import { ACCESS_TOKEN } from "../constants";
import { API_BASE_URL } from "../constants";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import axios from "axios";
import moment from "moment";
import uniqueid from "uniqid";
import Pagination from "./Pagination";

class FullHistory extends Component {
  constructor() {
    super();
    this.state = {
      logJson: [],
      logCount: 1,
      selectedPage: 1,
      loading: true
    };
    this.getLogData = this.getLogData.bind(this);
    this.pageClicked = this.pageClicked.bind(this);
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
          loading: false,
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
      return <img className="historyImageMargin" src={API_BASE_URL + "api/file/downloadFile/"+localStorage.getItem("userName")+"/" + this.getNamepart(json.language[0].location)} width="26" height="26" alt="language" />
    }
    else{
      var data = [];

      for (var i = 0; i < json.language.length; i++) {
        data.push(<img className="historyImageMargin" key={uniqueid()} src={API_BASE_URL + "api/file/downloadFile/"+localStorage.getItem("userName")+"/" + this.getNamepart(json.language[i].location)} width="26" height="26"  alt="language" />);
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
            <td><a href={"http://localhost:3000/log/" + this.state.logJson[i].logId}>
              {moment(this.state.logJson[i].createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}</a>
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

  pageClicked(page) {
      this.setState({
      loading:true,
      selectedPage: page
    })
    this.getLogData(page);
  }

  renderLoading() {
    if (this.state.loading === true) {
      return <Loader fullPage loading />;
    }
  }



  render() {
    return (
      <div>
      <hr />
        <div className="row text-center">

          <table className="table-responsive table-striped table-hover">
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

        <Pagination itemCount={this.state.logCount} selectedPage={this.state.selectedPage} pageClicked={this.pageClicked}/>

        {this.renderLoading()}
      </div>
    );
  }
}

export default FullHistory;
