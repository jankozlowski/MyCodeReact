import React, { Component } from "react";
import Statistics from "./cell/Statistics"
import LifeScore from "./cell/LifeScore"
import Summary from "./cell/Summary"

class LeftPane extends Component {
  renderContent() {

      return (
        <div>
          <Statistics />
      {/*    <LifeScore />
         <LifeScore />*/}
          <Summary />
        </div>
      );

  }

  render() {
    return (

        <div className="col-xl-4 col-lg-6 ">{this.renderContent()}</div>
    );
  }
}

export default LeftPane;
