import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { ACCESS_TOKEN } from "../../constants";
import { API_BASE_URL } from "../../constants";
import axios from "axios";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Popup from "reactjs-popup";
import "../../css/modal.css";

class UploadedBooksComponent extends Component {
  state = {
    uploadingFile: false,
    downloadingFiles: true,
    completedPercentage: 0,
    openProp: false,
    booksJson: [],
    deleteTitle: "",
    deleteId: 0
  };

  componentDidMount() {
    this.downloadUserBooks();
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  uploadFile(event) {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", "my_file");
    if(event.target.files[0].size !== undefined){
      this.sendFile(data, event.target.files[0].size);
    }
  }

  sendFile(fileData, fileSize) {
    this.setState({
      uploadingFile: true
    });

    const config = {
      onUploadProgress: progressEvent =>
        this.setState({
          completedPercentage: (progressEvent.loaded / fileSize) * 100
        }),
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    };

    axios
      .post(
        API_BASE_URL +
          "api/file/uploadFile/" +
          localStorage.getItem("userName") +
          "/pdf",
        fileData,
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
        this.appendNewBookToJson(response);
      });
  }

  appendNewBookToJson(response){
    console.log(response);
    var newArray = this.state.booksJson;
    newArray.push(response.data);

    this.setState({
      uploadingFile: false,
      booksJson: newArray
    })

  }

  deleteFile() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);

    axios
      .delete(
        API_BASE_URL +
          "api/file/deleteFile/" +
          localStorage.getItem("userName") +
          "/pdf/" +
          this.state.deleteId
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
        this.deleteItemFromJson(this.state.deleteId);
        console.log("file deleted");
      });
  }

  downloadUserBooks() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        API_BASE_URL +
          "api/file/downloadBook/" +
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
        this.setState({
          downloadingFiles: false,
          booksJson: response.data
        });
        console.log(response);
      });
  }

  renderUploadIcon() {
    if (this.state.uploadingFile === false) {
      return (
        <div>
          <br />
          <img
            className="img-fluid col-lg-5 col-md-7 col-9 "
            src={require("../../images/file2.png")}
          />
          <br />
          <br />

          <p className="container-header-upload-book">Add New Book</p>
          <input
            className="file"
            type="file"
            accept="application/pdf"
            onChange={event => this.uploadFile(event)}
          />
        </div>
      );
    }
  }

  renderUploadLoading() {
    if (this.state.uploadingFile === true) {
      return (
        <div>
          <br />
          <img
            className="img-fluid col-lg-5 col-md-7 col-9 "
            src={require("../../images/loading.gif")}
          />
          <br />
          <br />

          <p className="container-header-upload-book">Uploading File</p>
        </div>
      );
    }
  }

  renderLoading() {
    if (this.state.downloadingFiles === true) {
      return (
        <div>
          <br />
          <br />
          <LoadingOverlay style={{ backgroundColor: "transparent" }}>
            <Loader loading={this.state.downloadingFiles} />
          </LoadingOverlay>
          <br />
          <br />
        </div>
      );
    }
  }

  renderUploadedBooks() {
    var data = [];

    for (var i = 0; i < this.state.booksJson.length; i++) {
      data.push(
        <div className="col-sm-12 col-md-6 col-lg-4 embed-responsive embed-responsive-4by3">
          <iframe
            className="embed-responsive-item"
            src={this.state.booksJson[i].link}
          />
          <a
            className="uploaded-book-link"
            href={this.state.booksJson[i].link}
          />
          <img
            onClick={this.changeDeleteBookPromp.bind(
              this,
              this.state.booksJson[i].id,
              this.state.booksJson[i].title
            )}
            className="uploaded-book-delete"
            src={require("../../images/del.png")}
          />
        </div>
      );
    }
    return data;
  }

  changeDeleteBookPromp() {
    if (this.state.openProp) {
      this.setState({
        openProp: false
      });
    } else {
      this.setState({
        openProp: true
      });
    }
  }

  changeDeleteBookPromp(id, title) {
    if (this.state.openProp) {
      this.setState({
        openProp: false
      });
    } else {
      this.setState({
        openProp: true,
        deleteTitle: title,
        deleteId: id
      });
    }
  }

  deleteItemFromJson(itemId) {
    for (var i = 0; i < this.state.booksJson.length; i++) {
      if (this.state.booksJson[i].id === itemId) {
        var newArray = this.state.booksJson;
        newArray.splice(i, 1);
        this.setState({
          booksJson: newArray
        });
      }
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    console.log(this.state.openProp);

    return (
      <div className="container">
        <div className="col-12 ">
          <h3 className="container-header">Uploaded Books:</h3>


          <div className="bg-light">
            <div className="container box-container-books-parent">

              {this.renderLoading()}
              <div className="row">
                {this.renderUploadedBooks()}

                <div className="col-sm-12 col-md-6 col-lg-4 py-2">
                  <div className="box-container text-center ">
                    {this.renderUploadIcon()}
                    {this.renderUploadLoading()}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Popup
          open={this.state.openProp}
          closeOnDocumentClick
          onClose={this.change}
        >
          {close => (
            <div className="popupModal">
              <a className="close" onClick={() => this.changeDeleteBookPromp()}>
                &times;
              </a>
              <div className="content">
                Are you sure you want to delete this book -{" "}
                {this.state.deleteTitle}? (This action canot be undone)
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    this.changeDeleteBookPromp();
                    this.deleteFile();

                    close();
                  }}
                >
                  YES
                </button>
                <button
                  className="button"
                  onClick={() => {
                    this.changeDeleteBookPromp();
                    close();
                  }}
                >
                  NO
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

export default UploadedBooksComponent;
