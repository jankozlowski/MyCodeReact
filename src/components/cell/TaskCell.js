import React, { Component } from "react";
import Popup from "reactjs-popup";

class TaskCell extends Component {
  constructor(props) {
    super(props);
    this.state = { openDelete: false,
    openEdit: false,
    taskName: this.props.data.name,
    taskInputField: this.props.data.name};
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
      taskInputField: evt.target.value
    });
  }
  updateTaskName() {
    this.setState({
      taskName: this.state.taskInputField
    });
  }
  cancelUpdateTaskName(){
    this.setState({
    taskInputField: this.state.taskName
  });
  }


  renderSelectImage(){
    if(this.props.data.parentSelected){
      return(<img
        onClick={() => {
          this.props.data.customComponentMappings.selectTaskClicked(
            this.props.data.id,this.props.data.parentId
          );
        }}
        className="px-2"
        src={require("../../images/magic-wand.png")} alt="selected"
      />)
    }
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

          {this.renderSelectImage()}
          <img
            onClick={() => {
              this.props.data.customComponentMappings.compleatedTaskClicked(
                this.props.data.id,this.props.data.parentId
              );
            }}
            className="px-2"
            src={require("../../images/correct.png")} alt="compleated"
          />
          <img onClick={this.openEditModal}
          className="px-2" src={require("../../images/edit.png")} alt="edit"/>
          <img
            onClick={this.openDeleteModal}
            className="px-2"
            src={require("../../images/del.png")} alt="delete"
          />
        </div>
          <div
            className="projectCellDivLeft "
            key={this.props.key}
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
                    Are you sure you want to delete this Task? (This action canot be undone)
                  </div>
                  <div className="actions">
                    <button
                      className="button"
                      onClick={() => {
                        this.props.data.customComponentMappings.deleteTaskClicked(
                          this.props.data.id, this.props.data.parentId
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
                    Enter name for Task"<br />

                    <input accept-charset="UTF-8" id="pname" type="text" name="pname" value={this.state.taskInputField} onChange={evt => this.updateInputValue(evt)} />
                  </div>
                  <div className="actions">
                    <button
                      className="button"
                      onClick={() => {
                        this.updateTaskName();
                        this.props.data.customComponentMappings.editTaskClicked(
                          this.props.data.id,this.state.taskInputField, this.props.data.parentId);

                        close();
                      }}
                    >
                      OK
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        this.cancelUpdateTaskName();
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

export default TaskCell;
