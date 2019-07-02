import React, { Component } from "react";

class DownloadJar extends Component {


  render() {
    return (
        <div className="box-container text-center"><h5 className="container-header">Download Desktop App</h5>
        <a href="http://binaryalchemist.pl/wp-content/uploads/2019/05/MyCodeLogger.jar">   <img className="img-fluid px-4 py-4" src={require("../images/downloadjar.png")} alt="download" /></a>

        </div>
    );
  }
}

export default DownloadJar;
