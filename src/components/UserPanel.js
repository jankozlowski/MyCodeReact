import React, { Component } from "react";
import LeftPane from "./LeftPane";
import CenterPane from "./CenterPane";
import RightPane from "./RightPane";

class UserPanel extends Component {
  renderContent() {
    if (localStorage.getItem("isLogged") === "true") {
      return (
        <div className="row">
          <LeftPane />
          <CenterPane />
          <RightPane />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="bg-light">
        <div className="container">{this.renderContent()}</div>
      </div>
    );
  }
}

export default UserPanel;
