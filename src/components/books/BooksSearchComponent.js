import React, { Component } from "react";
import Pagination from "../Pagination";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";
import { API_BASE_URL } from "../../constants";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

class BooksSearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      bookJson: [],
      searchInputField: "",
      page: 1,
      loading: false
    };
    this.sendSearchData = this.sendSearchData.bind(this);
    this.pageClicked = this.pageClicked.bind(this);
  }

  pageClicked(page) {
    this.sendSearchData(page);
  }

  renderLoading() {
    if (this.state.loading === true) {
      return (
        <LoadingOverlay style={{ backgroundColor: "transparent" }}>
          <Loader loading={this.state.loading} />
        </LoadingOverlay>
      );
    }
  }

  addSpaceWhileLoading() {
    if (this.state.loading === true) {
      return (
        <div>
          <br />
        </div>
      );
    }
  }

  add2SpacesWhileLoading() {
    if (this.state.loading === true) {
      return (
        <div>
          <br />
          <br />
        </div>
      );
    }
  }

  sendSearchData(page) {
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        API_BASE_URL +
          "api/books/search/" +
          this.state.searchInputField +
          "/" +
          page
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
          loading: false,
          bookJson: response.data
        });
      });
  }

  renderResultsInRow() {
    var data = [];

    data.push(<div className="row my-4 px-3">{this.renderResults()}</div>);

    return data;
  }

  renderResults() {
    var data = [];
    var length = 0;
    if (this.state.bookJson.foundBooks !== undefined) {
      length = this.state.bookJson.foundBooks.length;
    }

    for (var i = 0; i < length; i++) {
      data.push(
        <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
          <div className="container-header-search-books box-container-books">
            <div className="search-book-border">
              <img
                height="148"
                width="111"
                src={this.state.bookJson.foundBooks[i].imageUrl}
              />
            </div>
            <div className="py-3 px-3 book-link books-box-width-right2">
              <p>
                <a href={this.state.bookJson.foundBooks[i].link}>
                  {this.state.bookJson.foundBooks[i].title}
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return data;
  }

  updateInputValue(evt) {
    this.setState({
      searchInputField: evt.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-12 ">
          <h3 className="container-header">Search Books:</h3>
          <div className="box-container-books-parent  ">
            <div className="py-5 px-4">
              <form>
                <input
                  className="col-9"
                  type="text"
                  value={this.state.searchInputField}
                  onChange={evt => this.updateInputValue(evt)}
                />

                <button
                  onClick={this.sendSearchData.bind(this, 1)}
                  type="button"
                  className="offset-1 col-2 btn btn-outline-primary btn-sm mb-1"
                >
                  Search
                </button>
              </form>
            </div>

            {this.renderResultsInRow()}
            {this.addSpaceWhileLoading()}
            {this.renderLoading()}
            {this.add2SpacesWhileLoading()}
            <Pagination
              itemCount={this.state.bookJson.foundResults}
              selectedPage={Math.floor(this.state.bookJson.page / 20) + 1}
              pageClicked={this.pageClicked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BooksSearchComponent;
