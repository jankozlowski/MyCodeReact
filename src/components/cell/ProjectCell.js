import React, { Component } from "react";
import Popup from "reactjs-popup";
import "../../css/modal.css";

class ProjectCell extends Component {
  constructor(props) {
    super(props);
    this.state = { openDelete: false,
    openEdit: false,
    projectName: this.props.data.name,
    projectInputField: this.props.data.name};
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
  }
  openDeleteModal() {
    this.setState({ openDelete: true });
  }
  closeDeleteModal() {
    this.setState({ openDelete: false });
  }

  openEditModal() {
    this.setState({ openEdit: true });
  }
  closeEditModal() {
    this.setState({ openEdit: false });
  }
  updateInputValue(evt) {
    this.setState({
      projectInputField: evt.target.value
    });
  }
  updateProjectName() {
    this.setState({
      projectName: this.state.projectInputField
    });
  }
  cancelUpdateProjectName(){
    this.setState({
    projectInputField: this.state.projectName
  });
  }

  render() {
    var selectedCSS = "";
    if (this.props.data.selected) {
      selectedCSS = "projectSelected";
    }
    var compleatedCSS = "";
    if (this.props.data.compleated) {
      compleatedCSS = "projectCompleated";
    }

    return (
      <div>
        <div className={"infinity-menu-node-container " + selectedCSS}>
        <div className="projectCellDivRight">
          <img
            onClick={() => {
              this.props.data.customComponentMappings.selectProjectClicked(
                this.props.data.id
              );
            }}
            className="px-2"
            src={require("../../images/magic-wand.png")} alt="select"
          />
          <img
            onClick={() => {
              this.props.data.customComponentMappings.compleatedProjectClicked(
                this.props.data.id
              );
            }}
            className="px-2"
            src={require("../../images/correct.png")} alt="compleated"
          />
          <img onClick={this.openEditModal} className="px-2" src={require("../../images/edit.png")} alt="edit"/>
          <img
            onClick={this.openDeleteModal}
            className="px-2"
            src={require("../../images/del.png")} alt="delete"
          />
        </div>
          <div
            className="projectCellDivLeft "
          //  key={this.props.key}
            onClick={this.props.onClick}
          >
            <label className={"" + compleatedCSS}>{this.props.name}</label>
          </div>

        </div>
        <Popup
          open={this.state.openDelete}
          closeOnDocumentClick
          onClose={this.closeDeleteModal}
        >
          {close => (
            <div className="popupModal">
              <a className="close" onClick={this.closeDeleteModal}>
                &times;
              </a>
              <div className="content">
                Are you sure you want to delete this project with all it tasks? (This action canot be undone)
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    this.props.data.customComponentMappings.deleteProjectClicked(
                      this.props.data.id
                    );
                    close();
                  }}
                >
                  YES
                </button>
                <button
                  className="button"
                  onClick={() => {
                    close();
                  }}
                >
                  NO
                </button>
              </div>
            </div>
          )}
        </Popup>

        <Popup
          open={this.state.openEdit}
          closeOnDocumentClick
          onClose={this.closeEditModal}
        >
          {close => (
            <div className="popupModal">
              <a className="close" onClick={this.closeEditModal}>
                &times;
              </a>
              <div className="content">
                Enter name for project"<br />

                <input id="pname" type="text" name="pname" value={this.state.projectInputField} onChange={evt => this.updateInputValue(evt)} />
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    this.updateProjectName();
                    this.props.data.customComponentMappings.editProjectClicked(
                      this.props.data.id,this.state.projectInputField);

                    close();
                  }}
                >
                  OK
                </button>
                <button
                  className="button"
                  onClick={() => {
                    this.cancelUpdateProjectName();
                    close();
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </Popup>

      </div>
    );
  }
}

export default ProjectCell;
