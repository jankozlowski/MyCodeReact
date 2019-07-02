import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";
import uniqueid from "uniqid";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

class Materials extends Component {
  constructor() {
    super();
    this.state = {
      deletePopup: false,
      openEditPopup: false,
      isMaterialAddPopup: true,
      isDeleteGroupPopup: false,
      edittextValue: "",
      edittextTitle: "",
      selectedGroupId: 0,
      selectedMaterialId: 0,
      loading: true,
      contentjson: []
    };
  }
  timer = null;

  componentDidMount() {
    this.getAllMaterialsFromServer();
  }

  getAllMaterialsFromServer() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        API_BASE_URL +
          "api/materials/" +
          localStorage.getItem("userName") +
          "/all"
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
        console.log(response);
        this.setState({
          contentjson: response.data,
          loading: false
        });
      });
  }

  changePopupState() {
    if (this.state.openEditPopup) {
      this.setState({
        openEditPopup: false
      });
    } else {
      this.setState({
        openEditPopup: true
      });
    }
  }
  changeDeletePopup() {
    if (this.state.deletePopup) {
      this.setState({
        deletePopup: false
      });
    } else {
      this.setState({
        deletePopup: true
      });
    }
  }

  changePopupStateWithSelectedGroup(groupId) {
    if (this.state.openEditPopup) {
      this.setState({
        openEditPopup: false,
        selectedGroupId: groupId,
        isMaterialAddPopup: true,
        edittextTitle: "",
        edittextValue: ""
      });
    } else {
      this.setState({
        openEditPopup: true,
        selectedGroupId: groupId,
        isMaterialAddPopup: true,
        edittextTitle: "",
        edittextValue: ""
      });
    }
  }
  changePopupStateWithSelectedMaterial(materialId) {
    if (this.state.openEditPopup) {
      this.setState({
        deletePopup: false,
        selectedMaterialId: materialId,
        isDeleteGroupPopup: false
      });
    } else {
      this.setState({
        deletePopup: true,
        selectedMaterialId: materialId,
        isDeleteGroupPopup: false
      });
    }
  }

  openEditPropWithData(id, url, title, add) {
    this.setState({
      openEditPopup: true,
      selectedMaterialId: id,
      edittextValue: url,
      edittextTitle: title,
      isMaterialAddPopup: add
    });
  }
  openDeletePropWithData(groupId) {
    this.setState({
      deletePopup: true,
      selectedGroupId: groupId,
      isDeleteGroupPopup: true
    });
  }

  changeEditValue(e) {
    this.setState({
      edittextValue: e
    });
  }
  changeEditTitle(e) {
    this.setState({
      edittextTitle: e
    });
  }
  changeGroupTitle(e, groupId) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.updateMaterialGroupTitle(groupId, e);
    }, 1000);
  }

  createMaterialGroup() {
    this.setState({
      loading: true
    });

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .post(
        API_BASE_URL +
          "api/materials/" +
          localStorage.getItem("userName") +
          "/add"
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
        this.addMaterialGroupToJson(response);
      });
  }

  addMaterialGroupToJson(response) {
    var newJson = this.state.contentjson;

    var newMaterialGroup = {
      groupId: response.data.groupId,
      title: response.data.title,
      materials: []
    };

    newJson.push(newMaterialGroup);

    this.setState({
      contentjson: newJson,
      loading:false
    });
  }

  updateMaterialGroupTitle(groupId, title) {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    };

    axios
      .post(
        API_BASE_URL +
          "api/materials/" +
          localStorage.getItem("userName") +
          "/update/materialgroup/" +
          groupId +
          "?title=" +
          title,
        null,
        config
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
      .then(response => {});
  }

  deleteMaterialGroup(groupId) {
    this.setState({
      loading: true
    });
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    };

    axios
      .delete(
        API_BASE_URL +
          "api/materials/" +
          localStorage.getItem("userName") +
          "/delete/materialgroup/" +
          groupId,
        null,
        config
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
        this.deleteMaterialGroupFromJson(groupId);
      });
  }

  deleteMaterialGroupFromJson(groupId) {
    var newJson = this.state.contentjson;
    for (var i = 0; i < newJson.length; i++) {
      if (newJson[i].groupId === groupId) {
        newJson.splice(i,1);
        break;
      }
    }

    this.setState({
      contentjson: newJson,
      loading: false
    });
  }

  createMaterial(groupId, url, title) {
    this.setState({
      loading: true
    });
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    };

    axios
      .post(
        API_BASE_URL +
          "api/materials/" +
          localStorage.getItem("userName") +
          "/add/" +
          groupId +
          "?url=" +
          encodeURIComponent(url) +
          "&title=" +
          encodeURIComponent(title),
        null,
        config
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
        console.log(response);
        this.addMaterialToJson(response);
      });
  }

  addMaterialToJson(response) {
    var newJson = this.state.contentjson;

    for (var i = 0; i < newJson.length; i++) {
      if (newJson[i].groupId === response.data.materialGroup.groupId) {
        var newMaterial = {
          materialId: response.data.materialId,
          title: response.data.title,
          url: response.data.url,
          image: response.data.image
        };

        newJson[i].materials.push(newMaterial);
      }
    }

    this.setState({
      contentjson: newJson,
      loading: false
    });
  }

  deleteMaterial(materialId) {
    this.setState({
      loading: true
    });
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    };

    axios
      .delete(
        API_BASE_URL +
          "api/materials/" +
          localStorage.getItem("userName") +
          "/delete/material/" +
          materialId,
        null,
        config
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
        this.deleteMaterialFromJson(materialId);
      });
  }

  deleteMaterialFromJson(materialId) {
    var newJson = this.state.contentjson;

    for (var i = 0; i < newJson.length; i++) {
      for (var j = 0; j < newJson[i].materials.length; j++) {
        if (newJson[i].materials[j].materialId === materialId) {
          newJson[i].materials.splice(j, 1);
        }
      }
    }
    this.setState({
      contentjson: newJson,
      loading: false
    });
  }

  updateMaterial(materialId, url, title) {
    this.setState({
      loading: true
    });
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    };

    axios
      .post(
        API_BASE_URL +
          "api/materials/" +
          localStorage.getItem("userName") +
          "/update/material/" +
          materialId +
          "?url=" +
          url +
          "&title=" +
          title,
        null,
        config
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
        console.log(response);
        this.updateMaterialInJson(materialId, url, title, response.data.image);
      });
  }

  updateMaterialInJson(materialId, url, title, image) {
    var newJson = this.state.contentjson;

    for (var i = 0; i < newJson.length; i++) {
      for (var j = 0; j < newJson[i].materials.length; j++) {
        if (newJson[i].materials[j].materialId === materialId) {
          newJson[i].materials[j].url = url;
          newJson[i].materials[j].title = title;
          newJson[i].materials[j].image = image;
        }
      }
    }
    this.setState({
      contentjson: newJson,
      loaing: false
    });
  }

  renderLoading() {
    if (this.state.loading === true) {
      return <Loader fullPage loading />;
    }
  }

  renderGroups() {
    var data = [];

    for (var i = 0; i < this.state.contentjson.length; i++) {
      data.push(
        this.renderGroup(
          this.state.contentjson[i].title,
          this.state.contentjson[i].groupId
        )
      );
    }

    return data;
  }

  renderGroup(title, groupId) {
    return (
      <div className="col-12 px-0" key={uniqueid()}>
        <div>
          <input
            className="box-container container-header col-12 border-radius-bottom-none border-none"
            type="text"
            defaultValue={title + groupId}
            //    onChange={e => this.changeGroupTitle(e.target.value, groupId)}
          />
          <img
            className="materialgroup-delete float-right"
            src={require("../images/redx.png")}
            alt="x"
            onClick={this.openDeletePropWithData.bind(this, groupId)}
          />
        </div>
        <div className="row box-container mt-0 px-0 border-radius-top-none mx-0">
          {this.renderMaterials(groupId)}
          {this.renderAddNewMaterial(groupId)}
        </div>
      </div>
    );
  }
  renderMaterials(groupId) {
    var data = [];
    for (var i = 0; i < this.state.contentjson.length; i++) {
      if (this.state.contentjson[i].groupId === groupId) {
        for (var j = 0; j < this.state.contentjson[i].materials.length; j++) {
          data.push(
            <div
              className="img-fluid col-lg-4 col-md-6 col-sm-12 my-3 text-center  justify-content-center"
              key={uniqueid()}
            >
              <a href={this.state.contentjson[i].materials[j].url}>
                <img
                  className="img-fluid"
                  src={this.state.contentjson[i].materials[j].image}
                />
              </a>
              <p className="container-header-materials">
                 {this.state.contentjson[i].materials[j].title} &#160;
              </p>
              <img
                onClick={this.changePopupStateWithSelectedMaterial.bind(
                  this,
                  this.state.contentjson[i].materials[j].materialId
                )}
                className="material-delete"
                src={require("../images/del.png")}
              />
              <img
                onClick={this.openEditPropWithData.bind(
                  this,
                  this.state.contentjson[i].materials[j].materialId,
                  this.state.contentjson[i].materials[j].url,
                  this.state.contentjson[i].materials[j].title,
                  false
                )}
                className="material-edit"
                src={require("../images/edit.png")}
              />
            </div>
          );
        }
        break;
      }
    }

    return data;
  }

  renderAddNewMaterial(groupId) {
    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div
          onClick={this.changePopupStateWithSelectedGroup.bind(this, groupId)}
          className="box-container pointer-class text-center px-0"
        >
          <br />
          <img
            className="img-fluid col-lg-5 col-md-7 col-9 "
            src={require("../images/add-link.png")}
          />
          <br />
          <br />

          <p className="container-header-materials py-0 my-0">Add New Link</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.renderGroups()}

          <div className="col-12 box-container mt-4 px-0 border-radius-top-none">
            <button
              onClick={this.createMaterialGroup.bind(this)}
              className="col-12 btn btn-success"
            >
              Add
            </button>
          </div>
        </div>

        <Popup
          open={this.state.openEditPopup}
          closeOnDocumentClick
          onClose={this.change}
        >
          {close => (
            <div className="popupModal">
              <a className="close" onClick={this.changePopupState.bind(this)}>
                &times;
              </a>
              <div className="content">
                Url:&#160;&#160;
                <input
                  className="offset-1 col-10"
                  onChange={e => this.changeEditValue(e.target.value)}
                  type="text"
                  defaultValue={this.state.edittextValue}
                />
                <br />
                <br />
                Title:
                <input
                  className="offset-1 col-10"
                  onChange={e => this.changeEditTitle(e.target.value)}
                  type="text"
                  defaultValue={this.state.edittextTitle}
                />
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    this.changePopupState();
                    if (this.state.isMaterialAddPopup) {
                      this.createMaterial(
                        this.state.selectedGroupId,
                        this.state.edittextValue,
                        this.state.edittextTitle
                      );
                    } else {
                      this.updateMaterial(
                        this.state.selectedMaterialId,
                        this.state.edittextValue,
                        this.state.edittextTitle
                      );
                    }

                    close();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </Popup>

        <Popup
          open={this.state.deletePopup}
          closeOnDocumentClick
          onClose={this.change}
        >
          {close => (
            <div className="popupModal">
              <a className="close" onClick={() => this.changeDeletePopup()}>
                &times;
              </a>
              <div className="content">
                Are you sure you want to delete this object? (This action canot
                be undone)
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    this.changeDeletePopup();
                    if (this.state.isDeleteGroupPopup) {
                      this.deleteMaterialGroup(this.state.selectedGroupId);
                    } else {
                      this.deleteMaterial(this.state.selectedMaterialId);
                    }
                    close();
                  }}
                >
                  YES
                </button>
                <button
                  className="button"
                  onClick={() => {
                    this.changeDeletePopup();
                    close();
                  }}
                >
                  NO
                </button>
              </div>
            </div>
          )}
        </Popup>
        {this.renderLoading()}
      </div>
    );
  }
}

export default Materials;
