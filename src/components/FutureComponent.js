import React, { Component } from "react";

class FutureComponent extends Component {


  render() {

    const pStyle = {
      height: '400px'

    };


    return (

      <div className="bg-light" >
        <div className="container" ><div className="row" >
          <div  className="col-12 py-4">
            <div className="box-container text-center"><img className="img-fluid" src={require("../images/development.png")} /><h2>IN PROGRESS</h2><p>This future is under development and
will be added in near future</p></div>
          </div>
        </div></div>
      </div>
    );
  }
}

export default FutureComponent;
