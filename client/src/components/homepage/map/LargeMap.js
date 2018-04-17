import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import MarkersList from "./MarkersList";
import styles from "../../../assets/styles/style.css";

const mapboxToken =
  "pk.eyJ1IjoiZGV2Z3JycmwiLCJhIjoiY2plNjFyOTVnMmlmdDJ3anJyZWtzYWtlYiJ9.-wfqcqne9aj8roI0gAAz7g";

const zoomLevel = 13;

const d = new Date();
const day = d.getDay(); // returns the current day as a value between 0-6 where Sunday = 0

class LargeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoomLevel: zoomLevel
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on("zoomend", () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  render() {
    const url =
      "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=" +
      mapboxToken;

    const attr =
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

    const mapTime = {
      0: "Sunday_Open",
      1: "Monday_Open",
      2: "Tuesday_Open",
      3: "Wednesday_Open",
      4: "Thursday_Open",
      5: "Friday_Open",
      6: "Saturday_Open",
      7: "Sunday_Close",
      8: "Monday_Close",
      9: "Tuesday_Close",
      10: "Wednesday_Close",
      11: "Thursday_Close",
      12: "Friday_Close",
      13: "Saturday_Close"
    };

    let sortedItemsTime = [];

    //sort by today/tomorrow/later

    if (this.props.results) {
      if (this.props.timeOption === "today") {
        sortedItemsTime = this.props.results.filter(r => {
          return r[mapTime[day]] !== "Closed";
        });
      } else if (this.props.timeOption === "tomorrow") {
        sortedItemsTime = this.props.results.filter(
          r => r[mapTime[day + 1]] !== "Closed"
        );
      } else {
        sortedItemsTime = this.props.results;
      }
    }

    let advice = [];
    let food = [];

    //toggle Advice Centres

    if (sortedItemsTime) {
      food = sortedItemsTime.filter(function(item) {
        return item.FoodCentre === "true";
      });
      advice = sortedItemsTime.filter(function(item) {
        return item.FoodCentre === "false";
      });
    }

    //----------------------------//

    let flatten = [];

    const getLatLong = () => {
      if (advice && this.props.adviceCentres) {
        advice.map((res, i) =>
          flatten.push({
            key: i,
            position: [+res.Lat, +res.Long],
            text: res.Name
          })
        );
      } else if (food && !this.props.adviceCentres) {
        food.map((res, i) =>
          flatten.push({
            key: i,
            position: [+res.Lat, +res.Long],
            text: res.Name
          })
        );
      }
    };

    let centre = [];

    if (this.props.lat) {
      centre = [this.props.lat, this.props.long];
    } else {
      centre = [51.456277, -0.105462];
    }

    return (
      <div>
        <Map
          ref={m => {
            this.leafletMap = m;
          }}
          center={centre}
          zoom={zoomLevel}
          style={{ height: "67vh", width: "100vw" }}
        >
          <TileLayer attribution={attr} url={url} id="mapbox.streets" />
          {getLatLong()}
          {flatten.length > 0 && <MarkersList array={flatten} />}
        </Map>
      </div>
    );
  }
}

export default LargeMap;
