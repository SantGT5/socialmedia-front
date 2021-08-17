import React from "react";
import { render } from "react-dom";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.service = new google.maps.places.AutocompleteService();
    this.state = {
      hasResults: false,
      predictions: null,
      lng: ""
    };
  }

  onChange(e) {
    const { types = ["geocode"] } = this.props;

    const sessionToken = new google.maps.places.AutocompleteSessionToken();
    if (e.target.value) {
      this.service.getPlacePredictions(
        {
          input: e.target.value,
          types,
          sessionToken
        },
        (predictions, status) => {
          if (status === "OK" && predictions && predictions.length > 0) {
            this.props.onOpen(predictions);
          } else {
            this.props.onOpen(predictions);
          }
          this.setState({
            predictions
          });
        }
      );
    } else {
      this.props.onClose();
    }
  }

  onSelect(placeId) {
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    let place;
    this.address = "";
    placesService.getDetails({ placeId: placeId }, results => {
      place = results;
      if (!place.geometry) {
        return;
      }
      alert(
        `${place.geometry.location.lat()} ${place.geometry.location.lng()}`
      );
    });

    const point = new google.maps.LatLng(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );
    alert(point);
  }

  render() {
    const { predictions } = this.state;

    return (
      <div>
        {React.cloneElement(this.props.input, {
          ...this.props,
          ref: "input",
          onChange: e => {
            this.onChange(e);
          }
        })}
        <div ref="div" />
        {!predictions && <div>Oh, no! No results.</div>}

        {console.log("ALL", predictions) ||
          (predictions &&
            predictions.length > 0 &&
            predictions.map(prediction => (
              <li>
                <a onClick={() => this.onSelect(prediction.place_id)}>
                  {prediction.description}
                </a>
              </li>
            )))}
      </div>
    );
  }
}
