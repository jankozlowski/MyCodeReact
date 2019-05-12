import React, { Component } from "react";
import MonthHistory from "./cell/MonthHistory";
import SocialMedia from "./SocialMedia";
import DownloadJar from "./DownloadJar";
import AdSense from "react-adsense";
import CurrentProject from "./cell/CurrentProject"

class RightPane extends Component {
  renderContent() {
    return (
      <div>
      <CurrentProject />
        <MonthHistory />
        <SocialMedia />
        <DownloadJar />
        <p></p><p></p>
      </div>
    );
  }

  render() {
    return <div className="col-xl-3">{this.renderContent()}</div>;
  }
}

export default RightPane;
