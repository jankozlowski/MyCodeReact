import React, { Component } from "react";
import InfinityMenu from "react-infinity-menu";
import "../css/infinity-menu.css";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";
import ProjectCell from "./cell/ProjectCell";
import TaskCell from "./cell/TaskCell";

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      responseProject: [],
      tree: [],
      test: 0,
      rerender: false
    };
    this.selectProjectClicked = this.selectProjectClicked.bind(this);
    this.compleatedProjectClicked = this.compleatedProjectClicked.bind(this);
    this.deleteProjectClicked = this.deleteProjectClicked.bind(this);
    this.editProjectClicked = this.editProjectClicked.bind(this);

    this.selectTaskClicked = this.selectTaskClicked.bind(this);
    this.compleatedTaskClicked = this.compleatedTaskClicked.bind(this);
    this.deleteTaskClicked = this.deleteTaskClicked.bind(this);
    this.editTaskClicked = this.editTaskClicked.bind(this);

  }

  selectTaskClicked(taskId, projectId) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === projectId) {
        var children = tree[i].children;
        var value = false;
        for (var j = 0; j < children.length; j++) {
          if (children[j].id === taskId) {
            if (children[j].selected) {
              value = children[j].selected = false;
            } else {
              value = children[j].selected = true;

              //check if other children is not selected
              for (var k = 0; k < children.length; k++) {
                if (
                  children[k].selected === true &&
                  children[k].id !== taskId
                ) {
                  children[k].selected = false;
                  this.updateDatabaseSelectedTask(children[k].id, false);
                  break;
                }
              }
            }
          }
        }

        tree[i].children = children;

        this.updateDatabaseSelectedTask(taskId, value);
        break;
      }
    }
    this.setState({
      tree: tree
    });
  }

  selectProjectClicked(id) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        var value = false;
        if (tree[i].selected) {
          value = tree[i].selected = false;
        } else {
          value = tree[i].selected = true;

          tree[i].children = this.changeChildIconSelect(tree[i].children, value);

          //check if other prject is not active
          for (var j = 0; j < tree.length; j++) {
            if (tree[j].selected === true && tree[j].id !== id) {
              tree[j].selected = false;
              this.updateDatabaseSelectedProject(tree[j].id, false);
              tree[j].children = this.changeChildIconSelect(tree[j].children, false);
              //check if other project dont have active tasks
              for (var k = 0; k < tree[j].children.length; k++) {
                if (tree[j].children[k].selected === true) {
                  tree[j].children[k].selected = false;
                  this.clearActiveTask();
                  break;
                }
              }

              break;
            }
          }
        }

        this.updateDatabaseSelectedProject(id, value);

        break;
      }
    }

    this.setState({
      tree: tree
    });

  }


changeChildIconSelect(children, selected){
  for(var i=0; i<children.length; i++){

    children[i].parentSelected = selected;
  }
  return children;
}

  compleatedProjectClicked(id) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        var value = false;
        if (tree[i].compleated) {
          value = tree[i].compleated = false;
        } else {
          value = tree[i].compleated = true;
        }
        this.updateDatabaseCompleatedProject(id, value);
        break;
      }
    }

    this.setState({
      tree: tree
    });
  }

  compleatedTaskClicked(taskId, projectId) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === projectId) {
        var children = tree[i].children;
        var value = false;

        for (var j = 0; j < children.length; j++) {
          if (children[j].id === taskId) {
            if (children[j].compleated) {
              value = children[j].compleated = false;
            } else {
              value = children[j].compleated = true;
            }
          }
        }

        tree[i].children = children;
        this.updateDatabaseCompleatedTask(taskId, value);
        break;
      }
    }

    this.setState({
      tree: tree
    });
  }

  deleteTaskClicked(taskId, projectId) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === projectId) {
        var children = tree[i].children;


        for (var j = 0; j < children.length; j++) {
          if (children[j].id === taskId) {
            children.splice(j,1);
            break;
          }
        }
        tree[i].children = children;
        this.updateDatabaseDeleteTask(taskId);
        break;
      }
    }

    this.setState({
      tree: tree
    });
  }

  deleteProjectClicked(id) {
    var tree = this.state.tree;


    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        tree.splice(i,1);

        this.updateDatabaseDeleteProject(id);
        break;
      }
    }

    this.setState({
      tree: tree
    });
  }

  editProjectClicked(id, value) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        tree[i].name = value;

        this.updateDatabaseEditProject(id, value);
        break;
      }
    }

    this.setState({
      tree: tree
    });
  }

  editTaskClicked(taskId, value, projectId) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id === projectId) {
        var children = tree[i].children;

        for (var j = 0; j < children.length; j++) {
          if (children[j].id === taskId) {
            children[j].name = value;
          }
        }

        tree[i].children = children;
        this.updateDatabaseEditTask(taskId, value);
        break;
      }
    }

    this.setState({
      tree: tree
    });
  }

  updateDatabaseSelectedProject(id, value) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(
        API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/update/" + id + "/selected/" + value
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
      });
  }

  updateDatabaseSelectedTask(id, value) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(
        API_BASE_URL +
          "api/project/"+localStorage.getItem("userName")+"/update/task/" +
          id +
          "/selected/" +
          value
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
      });
  }

  updateDatabaseCompleatedProject(id, value) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(
        API_BASE_URL +
          "api/project/"+localStorage.getItem("userName")+"/update/" +
          id +
          "/compleated/" +
          value
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
      });
  }

  updateDatabaseCompleatedTask(id, value) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(
        API_BASE_URL +
          "api/project/"+localStorage.getItem("userName")+"/update/task/" +
          id +
          "/compleated/" +
          value
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
      });
  }

  updateDatabaseEditProject(id, value) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/update/" + id + "/name/" + value)
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
      });
  }

  updateDatabaseEditTask(id, value) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(
        API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/update/task/" + id + "/name/" + value
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
      });
  }

  updateDatabaseDeleteProject(id) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/delete/" + id)
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
      });
  }

  updateDatabaseDeleteTask(id) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/delete/task/" + id)
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
      });
  }

  clearActiveTask() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/task/clear")
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
      });
  }

  createNewProject() {
    var newProject = {
      name: "New Project",
      selected: false,
      compleated: false
    };
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);

    axios
      .post(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/add", newProject)
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
        this.updateProjectTree(response.data.projectId);
      });
  }
  createNewTask(projectId) {
    var newTask = {
      name: "New Task",
      selected: false,
      compleated: false
    };
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);

    axios
      .post(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/add/task/" + projectId, newTask)
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
        this.updateTaskTree(projectId, response.data.taskId);
      });
  }

  updateTaskTree(projectId, taskId) {
    var tree = this.state.tree;

    for (var i = 0; i < tree.length; i++) {

      if (tree[i].id === projectId) {

        var chi = tree[i].children.slice(0);

        chi.splice(chi.length-1, 0, {
          name: "New Task",
          compleated: false,
          selected: false,
          parentSelected: tree[i].selected,
          customComponent: TaskCell,
          customComponentMappings: {
            selectTaskClicked: this.selectTaskClicked,
            compleatedTaskClicked: this.compleatedTaskClicked,
            deleteTaskClicked: this.deleteTaskClicked,
            editTaskClicked: this.editTaskClicked
          },
          id: taskId,
          parentId: projectId
        });
        tree[i].children = chi;
        break;
      }

    }
    this.setState({
      tree: tree
    });
  }

  updateProjectTree(projectId) {
    var tree = this.state.tree.slice(0);



    tree.splice(this.state.tree.length-1, 0, {
      name: "New Project",
      id: projectId,
      isOpen: false,
      customComponent: ProjectCell,
      customComponentMappings: {
        selectProjectClicked: this.selectProjectClicked,
        compleatedProjectClicked: this.compleatedProjectClicked,
        deleteProjectClicked: this.deleteProjectClicked,
        editProjectClicked: this.editProjectClicked
      },
      children: [
        {
          name: "Add",
          id: -2,
          parentId: projectId
        }
      ]
    });

    this.setState({
      tree: tree
    });
  }

  downloadTree() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/all")
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
          responseProject: response
        });
        this.downloadAllTasks();
      });
  }

  downloadAllTasks() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(API_BASE_URL + "api/project/"+localStorage.getItem("userName")+"/task/all")
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
      .then(responseTask => {
        var responseProject = this.state.responseProject;
        var tree = [];
        for (var i = 0; i < responseProject.data.length; i++) {
          var childrenTasks = [];
          for (var j = 0; j < responseTask.data.length; j++) {
            if (
              responseTask.data[j].project.projectId ===
              responseProject.data[i].projectId
            ) {
              childrenTasks.push({
                name: responseTask.data[j].name,
                id: responseTask.data[j].taskId,
                compleated: responseTask.data[j].compleated,
                selected: responseTask.data[j].selected,
                parentId: responseProject.data[i].projectId,
                parentSelected: responseProject.data[i].selected,
                customComponent: TaskCell,
                customComponentMappings: {
                  selectTaskClicked: this.selectTaskClicked,
                  compleatedTaskClicked: this.compleatedTaskClicked,
                  deleteTaskClicked: this.deleteTaskClicked,
                  editTaskClicked: this.editTaskClicked
                }
              });
            }
          }
          childrenTasks.push({
            name: "Add",
            id: -2,
            parentId: responseProject.data[i].projectId
          });

          tree.push({
            name: responseProject.data[i].name,
            id: responseProject.data[i].projectId,
            isOpen: false,
            customComponent: ProjectCell,
            customComponentMappings: {
              selectProjectClicked: this.selectProjectClicked,
              compleatedProjectClicked: this.compleatedProjectClicked,
              deleteProjectClicked: this.deleteProjectClicked,
              editProjectClicked: this.editProjectClicked
            },
            selected: responseProject.data[i].selected,
            compleated: responseProject.data[i].compleated,
            children: childrenTasks
          });
        }
        tree.push({
          name: "Add",
          id: -1,
          isOpen: false,
          selected: false,
          compleated: false,
          children: []
        });
        this.setState({
          tree: tree
        });
      });
  }

  componentDidMount() {
    this.downloadTree();
  }

  onNodeMouseClick(event, tree, node, level, keyPath) {
    if (node.id === -1) {
      this.createNewProject();
    }

    this.setState({
      tree: tree
    });
  }

  onLeafMouseClick(event, leaf) {
    if (leaf.id === -2) {
      this.createNewTask(leaf.parentId);
    }
  }

  render() {
    return (
      <InfinityMenu
        tree={this.state.tree}
        onNodeMouseClick={this.onNodeMouseClick.bind(this)}
        onLeafMouseClick={this.onLeafMouseClick.bind(this)}
        disableDefaultHeaderContent={true}
        //  maxLeaves={2} /*optional*/
      />
    );
  }
}

export default Projects;
