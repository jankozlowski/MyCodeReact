import React, { Component } from "react";

class ShowMoreLogs extends Component {
  loadMoreLogs(e) {
    e.preventDefault();
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <div className="text-center my-4">
          <img alt="loading" src={require("../images/loading.gif")} />
        </div>
      );
    }
  }

//dont show if not many logs

  renderContent() {

    if (!this.props.last && !this.props.loading ) {
      return (
        <div>
          <div
            onClick={this.props.handleClick}
            className="text-center box-container moreLogs"
          >
            <p>Show more Logs</p>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderLoading()} {this.renderContent()}{" "}
      </div>
    );
  }
}

export default ShowMoreLogs;
