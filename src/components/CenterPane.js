import React, { Component } from "react";
import { ACCESS_TOKEN } from "../constants";
import { API_BASE_URL } from "../constants";
import axios from "axios";
import SingleLog from "./cell/SingleLog";
import ShowMoreLogs from "./ShowMoreLogs";
import uniqueid from "uniqid";

class CenterPane extends Component {
  constructor() {
    super();
    this.state = {
      logJson: [],
      page: 0,
      last: false,
      loading: true,
      loaded: false
    };
    this.deleteLogFromJson = this.deleteLogFromJson.bind(this);
  }

  deleteLogFromJson(id) {
    var newArr = this.state.logJson;
    for (var index = 0; index < this.state.logJson.content.length; index++) {

      if ((newArr.content[index].logId === id)) {
        console.log("id "+id);
        console.log("index "+index);
        console.log("newarr "+newArr.content[index].logId);
        newArr.content.splice(index, 1);
        break;
      }
    }
    this.setState({
      logJson: newArr
    });
    this.scriptLoaded();
  }

  getLogData(page) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        API_BASE_URL +
          "api/log/" +
          localStorage.getItem("userName") +
          "/page/" +
          page +
          "/10"
      )
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
        if (page !== 0) {
          var oldContent = this.state.logJson;
          var newData = response.data;

          var endPoint = newData["content"].length;
          for (var i = 0; i < endPoint; i++) {
            oldContent["content"].push(newData["content"][i]);
          }
          this.setState(
            {
              logJson: oldContent,
              page: page,
              loading: false,
              last: newData["last"]
            },
            this.scriptLoaded()
          );
        } else {
          this.setState(
            {
              logJson: response.data,
              loading: false,
              last: response.data.last
            },
            this.scriptLoaded()
          );
        }
      });
  }

  moreLogsClick() {
    this.setState(state => ({
      loading: true
    }));

    this.getLogData(this.state.page + 1);
  }

  handleClickMoreLogs = () => this.moreLogsClick();

  componentDidMount() {
    this.getLogData(0);
  }

  scriptLoaded() {
    const script3 = document.createElement("script");
    script3.src = API_BASE_URL + "js/keyboardheatmap-small.js";
    script3.async = true;
    script3.onload = () => this.scriptLoaded2();
    document.body.appendChild(script3);
  }
  scriptLoaded2() {
    window.heatmapCreate();
  }

  renderLoading() {
    return (
      <div className="text-center my-4">
        <img alt="loading" src={require("../images/loading.gif")} />
      </div>
    );
  }

  renderContent(response) {
    if (response["content"] === undefined) {
      return;
    }

    var magic = response["content"];
    var arr = [];
    Object.keys(magic).forEach(function(key) {
      arr.push(magic[key]);
    });

    return (
      <div>
        {arr.map(item => (
          <SingleLog
            key={uniqueid()}
            logId={item.logId}
            charSum={item.charSum}
            charCount={item.charCount}
            duration={item.duration}
            createdAt={item.createdAt}
            language={item.language}
            deleteLogFromJson={this.deleteLogFromJson}
          />
        ))}
        <ShowMoreLogs
          last={this.state.last}
          handleClick={this.handleClickMoreLogs}
          loading={this.state.loading}
        />
        <div />
      </div>
    );
  }

  render() {
    console.log(this.state.logJson);
    let loaded = false;
    if (this.state.logJson !== null) {
      loaded = true;
    }

    return (
      <div className="col-xl-5 col-lg-6 ">
        {loaded
          ? this.renderContent(this.state.logJson)
          : this.renderContent("")}

        {this.state.loading ? this.renderLoading() : this.renderContent("")}
      </div>
    );
  }
}

export default CenterPane;
