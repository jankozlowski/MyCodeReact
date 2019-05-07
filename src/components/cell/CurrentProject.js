import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { ACCESS_TOKEN } from "../../constants";


class CurrentProject extends Component {

  constructor() {
    super();
    this.state = {
      projectJson: []
    };
  }

  componentDidMount(){
    this.getCurrentProject();
  }


  getCurrentProject() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        API_BASE_URL +
          "api/project/"+localStorage.getItem("userName")+"/current"
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
        this.setState({
          projectJson: response.data
        })
      });
  }

  render() {
    return (
        <div className="box-container text-center"><h5 className="container-header">Current Project</h5>

      <span className="container-content">{this.state.projectJson.name}</span><br/>
      <span className="container-content">Current Task: {this.state.projectJson.task}</span><br/>
      <p>Tasks: {this.state.projectJson.compleated}/{this.state.projectJson.allTasks}</p>
</div>
    );
  }
}

export default CurrentProject;
