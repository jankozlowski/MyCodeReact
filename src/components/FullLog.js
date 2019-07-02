import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import uniqueid from "uniqid";
import moment from "moment";

class FullLog extends Component {
  constructor() {
    super();
    this.state = {
      logJson: [],
      selectedTab: 1
    };
  }

  makeTextFromDb() {
    var text = "";

    if (this.state.logJson.charCount !== undefined) {
      for (var i = 0; i < 127; i++) {
        for (var j = 0; j < this.state.logJson.charCount[i]; j++) {
          text += String.fromCharCode(i);
        }
      }
    }

    return text;
  }

  renderContent() {
    var projectName = "";
    if (this.state.logJson.project === null || this.state.logJson.project === "") {
      projectName = "None";
    } else {
      projectName = this.state.logJson.project;
    }

    var languages = "";

    if (this.state.logJson.language !== undefined) {
      for (var i = 0; i < this.state.logJson.language.length; i++) {
        languages += this.state.logJson.language[i].name +", ";
      }

      languages = languages.substr(0,languages.length-2);
    }

    if (this.state.logJson.charCount !== undefined) {


      return (
        <div >

          <div className="keyboards" />
          <div hidden className="hiddenText">
            {this.makeTextFromDb()}
          </div>
          <br /><br />
          <div className="row">
          <div className="offset-2 col-4">
          <div className="row py-2 text-center">
            <img  src={require("../images/code.png")} alt="code" /><p className="mb-0 pt-2 px-2">Languages: {languages}</p>
            </div><div className="row py-2">
            <img src={require("../images/keyboardicon.png")} alt="chars" /><p className="mb-0 pt-2 px-2">Chars: {this.state.logJson.charSum}</p>
            </div><div className="row py-2">
            <img src={require("../images/clock.png")} alt="time" /><p className="mb-0 pt-2 px-2">Time: {this.state.logJson.duration}</p>
            </div>
          </div>
          <div className="offset-1">
          </div>
          <div className="col-4">
          <div className="row py-2">
          <img src={require("../images/calendar.png")} alt="calendar" /><p className="mb-0 pt-2 px-2">Date: {moment(this.state.logJson.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
          </div><div className="row py-2">
            <img src={require("../images/projecticon.png")} alt="projects" /><p className="mb-0 pt-2 px-2">Project: {projectName.name} </p>
            </div><div className="row py-2">
            <img src={require("../images/speed.png")} alt="charbytime" /><p className="mb-0 pt-2 px-2">Average pace: {this.calculateTypeRate()} chars per minute</p>
</div>
            </div>
          </div>
          <br /><br />
        </div>
      );
    }
  }

  setTab(openTab) {
    this.setState({
      selectedTab: openTab
    });
  }

  calculateTypeRate() {
    var time = this.state.logJson.duration.substr(
      0,
      this.state.logJson.duration.length - 4
    );
    var tt = time.split(":");
    var sec = tt[0] * 3600 + tt[1] * 60 + tt[2] * 1;

    var rate = Math.round(this.state.logJson.charSum / (sec / 60));

    return rate;
  }

  renderChars() {
    if (this.state.logJson.charCount !== undefined) {
      return (
        <div className="text-center bordersFullLog">
          <table className="table-responsive  table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ASCII</th>
                <th scope="col">Letter</th>
                <th scope="col">Count</th>
                <th scope="col">ASCII</th>
                <th scope="col">Letter</th>
                <th scope="col">Count</th>
                <th scope="col">ASCII</th>
                <th scope="col">Letter</th>
                <th scope="col">Count</th>
                <th scope="col">ASCII</th>
                <th scope="col">Letter</th>
                <th scope="col">Count</th>
                <th scope="col">ASCII</th>
                <th scope="col">Letter</th>
                <th scope="col">Count</th>
                <th scope="col">ASCII</th>
                <th scope="col">Letter</th>
                <th scope="col">Count</th>
              </tr>
            </thead>
            <tbody>{this.createTable()}</tbody>
          </table>
        </div>
      );
    }
  }

  createTable() {
    let table = [];
    var iteration = 0;
    // Outer loop to create parent
    for (let i = 0; i < 22; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 18; j++) {
        if (iteration > 384) {
          break;
        }

        if (j % 3 === 0) {
          children.push(<td key={uniqueid()}>{iteration / 3}</td>);
        } else if (j % 3 === 1) {
          children.push(<td key={uniqueid()}>{String.fromCharCode(iteration / 3)}</td>);
        } else if (j % 3 === 2) {
          children.push(
            <td key={uniqueid()}>{this.state.logJson.charCount[(iteration + 1) / 3]}</td>
          );
        }
        iteration++;
      }

      //Create the parent and add the children
      table.push(<tr key={uniqueid()}>{children}</tr>);
    }
    return table;
  }

  getLogById() {
    const queryString = require("query-string");

//    const parsed = queryString.parse(window.location.search);

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        API_BASE_URL +
          "api/log/" +
          window.location.href.substr(window.location.href.lastIndexOf("/") + 1)
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
        this.scriptLoaded();
      });
  }

  componentDidMount() {
    this.getLogById();
  }

  scriptLoaded() {
    const script3 = document.createElement("script");
    script3.src = API_BASE_URL + "js/keyboardheatmap-big.js";
    script3.async = true;
    script3.onload = () => this.scriptLoaded2();
    document.body.appendChild(script3);
  }
  scriptLoaded2() {
    window.heatmapCreate();
  }

  createBarChartData() {
    if (this.state.logJson.charCount !== undefined) {
      var data = [];

      for (var i = 127; i > 0; i--) {
        if (this.state.logJson.charCount[i] > 0) {
          data.push({
            Character: String.fromCharCode(i),
            Char: this.state.logJson.charCount[i],
            OtherChars:
              this.state.logJson.charSum - this.state.logJson.charCount[i]
          });
        }
      }

      return data;
    } else {
      data = [
        {
          country: "AD",
          "hot dog": 60,
          "hot dogColor": "hsl(18, 70%, 50%)",
          burger: 48,
          burgerColor: "hsl(204, 70%, 50%)",
          sandwich: 9,
          sandwichColor: "hsl(85, 70%, 50%)",
          kebab: 161,
          kebabColor: "hsl(337, 70%, 50%)",
          fries: 155,
          friesColor: "hsl(326, 70%, 50%)",
          donut: 79,
          donutColor: "hsl(73, 70%, 50%)"
        }
      ];
      return data;
    }
  }

  calculateSecondsBetweenDates(pastTime, presentTime) {
    const diff = presentTime.diff(pastTime);
    const diffDuration = moment.duration(diff);

    let addSeconds = 0;

    if (diffDuration.hours() > 0) {
      addSeconds = 3600 * diffDuration.hours();
    }
    if (diffDuration.minutes() > 0) {
      addSeconds += 60 * diffDuration.minutes();
    }
    return diffDuration.seconds() + addSeconds;
  }

  calculateStep(pastTime, presentTime) {
    let allSeconds = this.calculateSecondsBetweenDates(pastTime, presentTime);

    let ratio = allSeconds / 720;
    if (ratio < 1) {
      ratio = 1;
    }

    return Math.round(ratio);
  }

  createSecondBarChartData() {
    if (this.state.logJson.clickDate !== undefined) {
      var oneKPoint = [];
      var startTime = moment(this.state.logJson.recordStart);
      var subtractSeconds = 0;
      for (var i = 0; i < this.state.logJson.clickDate.length; i++) {
        if (
          i !== 0 &&
          (i % 1000 === 0 || i === this.state.logJson.clickDate.length - 1)
        ) {
          var clickTime = moment(this.state.logJson.clickDate[i]);
          var allSeconds = this.calculateSecondsBetweenDates(
            startTime,
            clickTime
          );
          oneKPoint.push({
            s: allSeconds - subtractSeconds,
            i: i
          });
          subtractSeconds = allSeconds;
        }
      }
      return oneKPoint;
    }
  }

  createLineChartData(dataType) {
    if (this.state.logJson.clickDate !== undefined) {
      var data = [];
      var allData = [];

      var step = this.calculateStep(
        moment(this.state.logJson.recordStart),
        moment(this.state.logJson.createdAt)
      );

      let startTime = 0;
      let charNum = 0;
      let clickTime = 0;
      let durationPoints = [];
      for (var i = 0; i < this.state.logJson.clickDate.length; i++) {
        if (i === 0) {
          startTime = moment(this.state.logJson.recordStart);
          durationPoints.push({ s: 0 });
        }

        clickTime = moment(this.state.logJson.clickDate[i]);

        if (this.calculateSecondsBetweenDates(startTime, clickTime) < step) {
          charNum++;
          continue;
        } else {
          startTime = moment(this.state.logJson.clickDate[i]);
          durationPoints.push({
            s: this.calculateSecondsBetweenDates(
              this.state.logJson.recordStart,
              clickTime
            ),
            i: i
          });

          data.push({
            x: i,
            y: Math.round(charNum * (60 / step))
          });
          charNum = 0;
        }
      }

      allData.push({
        id: "Chars",
        color: "hsl(109, 70%, 50%)",
        data: data
      });

      if (dataType) {
        return allData;
      } else {
        return durationPoints;
      }
    }
  }

  creatKeyValue(duration) {
    var fuckyou = new Map();

    for (var i = 0; i < duration.length; i++) {
      fuckyou.set(duration[i].i, this.secToTime(duration[i].s));
    }

    return fuckyou;
  }
  mapSecondsToThousends(seconds) {
    var map = new Map();

    for (var i = 0; i < seconds.length; i++) {
      map.set(seconds[i].s, 1000 * (i + 1));
    }

    return map;
  }

  createTickValues(data) {
    var ticks = [];

    var length = data.length;
    var space = Math.floor(length / 10);

    if (space === 0) {
      space = 1;
    }

    for (var i = 0; i < length - space; i = i + space) {
      ticks.push(data[i].x);
    }

    ticks.push(data[length - 1].x);

    return ticks;
  }

  renderTab() {
    if (this.state.selectedTab === 1) {
      return (
        <div>
          <div>{this.renderChars()}</div>

          <div className="bordersFullLog" style={{ height: 600 }}>
            <ResponsiveBar
              data={this.createBarChartData()}
              keys={["Char", "OtherChars"]}
              indexBy="Character"
              margin={{
                top: 50,
                right: 130,
                bottom: 50,
                left: 60
              }}
              padding={0.3}
              layout="horizontal"
              colors={["#6CC4EE", "#d9F1FF"]}
              colorBy="id"
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#38bcb2",
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
              borderColor="inherit:darker(1.6)"
              axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: 36
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,

                legend: "Usage",
                legendPosition: "middle",
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Characters",
                legendPosition: "middle",
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="inherit:darker(1.6)"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </div>
      );
    } else if (this.state.selectedTab === 2) {
      var amok = this.createLineChartData(false);
      var allData = this.createLineChartData(true);

      var ticks = this.createTickValues(allData[0].data);
      var fuck = this.creatKeyValue(amok);
      return (
        <div className="bordersFullLog" style={{ height: 600 }}>
          <ResponsiveLine
            data={allData}
            margin={{
              top: 50,
              right: 110,
              bottom: 50,
              left: 60
            }}
            xScale={{
              type: "point"
            }}
            yScale={{
              type: "linear",
              stacked: true,
              min: "auto",
              max: "auto"
            }}
            axisBottom={{
              orient: "bottom",
              tickSize: 0,
              tickPadding: 15,
              tickValues: ticks,
              tickRotation: 0,
              legend: "all characters",
              legendOffset: 36,
              legendPosition: "middle"
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "characters per minute",
              legendOffset: -40,
              legendPosition: "middle"
            }}
            tooltip={slice => (
              <div style={{ color: "#bbb" }}>
                <div>{slice.id}</div>
                {slice.data.map((d, i) => (
                  <div
                    key={d.serie.id}
                    style={{
                      color: d.serie.color,
                      padding: "3px 0"
                    }}
                  >
                    <strong>Characters per minute</strong> {d.data.y}
                    <br />
                    <strong>All Characters</strong> {d.data.x}
                    <br />
                    <strong>Duration</strong> {fuck.get(slice.id)}
                    <br />
                  </div>
                ))}
              </div>
            )}
            theme={{
              tooltip: {
                container: {
                  background: "#333"
                }
              }
            }}
            dotSize={10}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel={true}
            dotLabel="y"
            dotLabelYOffset={-12}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            curve="basis"
            enableDots={false}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      );
    } else if (this.state.selectedTab === 3) {
      var data = this.createSecondBarChartData();
      var it = this.mapSecondsToThousends(data);
      return (
        <div className="bordersFullLog" style={{ height: 400 }}>
          <ResponsiveBar
            data={data}
            keys={["s"]}
            indexBy="s"
            margin={{
              top: 50,
              right: 130,
              bottom: 50,
              left: 60
            }}
            padding={0.3}
            layout="vertical"
            colors={["#6CC4EE", "#d9F1FF"]}
            colorBy="id"
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            borderColor="inherit:darker(1.6)"
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: d => `${this.secToTime(d)}`
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: d => `${it.get(d)}`
            }}
            tooltip={slice => (
              <div style={{ color: "#bbb" }}>
                <div>{this.secToTime(slice.data.s)}</div>
              </div>
            )}
            axisLeft={null}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            enableGridX={false}
            enableGridY={false}
            enableLabel={false}
            legends={[]}
          />
        </div>
      );
    }
  }

  secToTime(secs) {
    var seconds = parseInt(secs, 10);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = seconds - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var time = hours + ":" + minutes + ":" + seconds;
    return time;
  }

  render() {

    var activeTab = ["","",""];
    if(this.state.selectedTab===1){
      activeTab = ["active","",""];
    }
    else if (this.state.selectedTab===2) {
      activeTab = ["","active",""];
    }
    else if (this.state.selectedTab===3){
      activeTab = ["","","active"];
    }


    return (
      <div className="offset-1 col-10 box-container py-0 px-0">
      <h1 className="container-header text-center">Log From {moment(this.state.logJson.createdAt).format("HH:mm:ss DD/MM/YYYY")}</h1><br />
        <div>{this.renderContent()}</div>
        <div className="px-4 mb-4 ">
        <ul className="nav nav-tabs container-header statistic-navigation-borders fulllog-navigation">
          <li className={activeTab[0]}>
            <span
              data-target="#tab1"
              data-toggle="tab"
              onClick={() => this.setTab(1)}
            >

              Characters
            </span>
          </li>
          <li className={activeTab[1]}>
            <span
              data-target="#tab1"
              data-toggle="tab"
              onClick={() => this.setTab(2)}
            >
              Time
            </span>
          </li>
          <li className={activeTab[2]}>
            <span
              data-target="#tab1"
              data-toggle="tab"
              onClick={() => this.setTab(3)}
            >
              Sections
            </span>
          </li>
        </ul>

        {this.renderTab()}
        <div className="container-header fullLog-bottom-borders">
        <br />
        </div>
        </div>
      </div>
    );
  }
}

export default FullLog;
