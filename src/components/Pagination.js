import React, { Component } from "react";
import uniqueid from "uniqid";

class Pagination extends Component {




  setPageValue(page){


  }

  createPagination() {
    var data = [];
    var pages = Math.ceil(this.props.itemCount / 20);
    var active ="";
    var disablePrev = "";
    var disableNext = "";
    var hideSmall = "";

    if(this.props.selectedPage===1){
      disablePrev = "disabled";
    }
    if(this.props.selectedPage===pages){
      disableNext = "disabled";
    }
    var start = this.props.selectedPage - 6;
    if(start<0){
      start = 0;
    }

    for (var i = start; i < pages; i++) {

      if(this.props.selectedPage === i+1){
        active = "active";
      }
      else{
        active ="";
      }
      if(i>4){
        hideSmall = "d-none d-sm-block"
      }
      else{
          hideSmall = "";
      }

      data.push(
        <li key={uniqueid()} className={"page-item " + active +" " + hideSmall} >
          <a className="page-link" onClick = {this.props.pageClicked.bind(this, i+1) }>
            {i+1}
          </a>
        </li>
      );
      if(i>start+6){
        data.push(
          <li key={uniqueid()} className={"page-item " + active} >
            ...
          </li>
        );
        break;
      }
    }
    return (
      <div className=" py-2">
        <nav aria-label="Page navigation  ">
          <ul className="pagination justify-content-center">
            <li className={"page-item " + disablePrev}>
              <a className="page-link" onClick = {this.props.pageClicked.bind(this, this.props.selectedPage-1) }>
                Previous
              </a>
            </li>
            {data}
            <li className={"page-item " + disableNext}>
              <a className="page-link" onClick = {this.props.pageClicked.bind(this, this.props.selectedPage+1) }>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }


  render() {
    return <div className="row"><div className="col-12">{this.createPagination()}</div></div>;
  }
}

export default Pagination;
