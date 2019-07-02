import React, { Component } from "react";
import FeaturedBooksComponent from "./FeaturedBooksComponent";
import BooksSearchComponent from "./BooksSearchComponent";
import UploadedBooksComponent from "./UploadedBooksComponent";

class BooksComponent extends Component {
  render() {
    return (
      <div className="container">
        <UploadedBooksComponent />
        <BooksSearchComponent />
        <FeaturedBooksComponent />
        <br/><br/>
      </div>
    );
  }
}

export default BooksComponent;
