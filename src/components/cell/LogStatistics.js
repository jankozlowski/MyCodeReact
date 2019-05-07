import React, { Component } from "react";

class LogStatistics extends Component {
  renderContent() {
    return (
      <div className="fullLog">

      <h1>header</h1>
        <div className="keyboards" />
        <div hidden className="hiddenText"></div>
<div><p>chars</p><p>time</p><p>hour</p><p>project</p><p>tasks</p><p>srednie tempo</p></div>
<div>statystyki</div>


        </div>
    );
  }

  render() {
    return <div className="offset-1 col-10">{this.renderContent()}</div>;
  }
}

export default LogStatistics;
