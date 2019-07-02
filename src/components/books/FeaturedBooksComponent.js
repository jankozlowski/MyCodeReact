import React, { Component } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { API_BASE_URL } from "../../constants";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import axios from "axios";

class FeaturedBooksComponent extends Component {
  constructor() {
    super();
    this.state = {
      bookFeaturedJson: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getFeaturedBooks();
  }

  renderLoading() {
    if (this.state.loading === true) {
      return (
        <div>
          <br />
          <LoadingOverlay style={{ backgroundColor: "transparent" }}>
            <Loader loading={this.state.loading} />
          </LoadingOverlay>
        </div>
      );
    }
  }

  getFeaturedBooks() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(API_BASE_URL + "api/books/featured")
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
          loading: false,
          bookFeaturedJson: response.data
        });
      });
  }

  renderFeaturedBooks() {
    var data = [];

    data.push(
      this.renderFeaturedBooksRow(0, this.state.bookFeaturedJson.length)
    );

    return data;
  }

  renderFeaturedBooksRow(start, end) {
    var data = [];

    data.push(<div className="row my-4">{this.renderOneRow(start, end)}</div>);

    return data;
  }

  renderOneRow(start, end) {
    var data = [];
    for (var i = start; i < end; i++) {
      data.push(
        <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
          <div className="box-container-books ">
            <div className="books-box-width-left ">
              <img
                className="img-fluid"
                src={this.state.bookFeaturedJson[i].imageUrl}
              />
            </div>
            <div className="books-box-width-right container-header-featured-books book-link">
              <p>
                <a href={this.state.bookFeaturedJson[i].link}>
                  {this.state.bookFeaturedJson[i].title}
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return data;
  }

  render() {
    return (
      <div className="container">
        <div className="col-12">
          <h3 className="container-header">Featured Books:</h3>
          <div className="box-container-books-parent px-3 pt-3 ">
            {this.renderLoading()}
            {this.renderFeaturedBooks()}
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedBooksComponent;
