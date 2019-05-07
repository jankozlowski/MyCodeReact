import React, { Component } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ACCESS_TOKEN } from "../../constants";
import { API_BASE_URL } from "../../constants";
import axios from "axios";

class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      logJson: [],
      selectedStatistics: "all"
    };

    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
  }

  getStatistics() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);

    axios
      .get(
        API_BASE_URL + "api/statistics/"+localStorage.getItem("userName")+"/" + this.state.selectedStatistics
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
          logJson: response.data
        });
      });
  }

  componentDidMount() {
    this.getStatistics();
  }

  handleRadioButtonChange(event) {
    this.setState(
      {
        selectedStatistics: event.target.value
      },
      function() {
        this.getStatistics();
      }
    );
  }

  createPieChartData() {
    var data = [];
    if (this.state.logJson !== undefined) {
      for (var i = 0; i < this.state.logJson.length; i++) {
        data.push({
          id: this.state.logJson[i].name,
          label: this.state.logJson[i].duration,
          value: this.state.logJson[i].seconds
        });
      }
      return data;
    }
  }

  render() {
    return (
      <div className="box-container">
        <h5 className="container-header text-center">Your Statistics</h5>

        <div style={{ height: 260 }}>
          <ResponsivePie
            data={this.createPieChartData()}
            margin={{
              top: 40,
              right: 80,
              bottom: 50,
              left: 80
            }}
            startAngle={360}
            endAngle={0}
            sortByValue={true}
            innerRadius={0.4}
            padAngle={0.7}
            cornerRadius={0}
            colors="category10"
            colorBy="id"
            borderWidth={1}
            borderColor="inherit:darker(0.2)"
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={4}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={24}
            radialLabelsLinkHorizontalLength={12}
            radialLabelsLinkStrokeWidth={2}
            radialLabelsLinkColor="inherit"
            enableSlicesLabels={false}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            tooltip={slice => (
              <div style={{ color: "#bbb" }}>
                <div>{slice.id}</div>
                <div>{slice.label}</div>
              </div>
            )}
            theme={{
              tooltip: {
                container: {
                  background: "#333"
                }
              }
            }}
            legends={[
              {
                anchor: "top",
                direction: "row",
                translateY: 0,
                itemWidth: 0,
                itemHeight: 0,
                itemTextColor: "#FFF",
                symbolSize: 0,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#FFF"
                    }
                  }
                ]
              }
            ]}
          />
        </div>
        <form className="text-center container-footer">
          <label className="pl-1 pr-1">
            {" "}
            <input
              type="radio"
              name="all"
              value="all"
              checked={this.state.selectedStatistics === "all"}
              onChange={this.handleRadioButtonChange}

            />{" "}
            All
          </label>
          <label className="pl-1 pr-1">
            <input
              type="radio"
              name="year"
              value="year"
              checked={this.state.selectedStatistics === "year"}
              onChange={this.handleRadioButtonChange}
            />{" "}
            Year
          </label>
          <label className="pl-1 pr-1">
            <input
              type="radio"
              name="month"
              value="month"
              checked={this.state.selectedStatistics === "month"}
              onChange={this.handleRadioButtonChange}
            />{" "}
            Month
          </label>
        </form>
      </div>
    );
  }
}

export default Statistics;
