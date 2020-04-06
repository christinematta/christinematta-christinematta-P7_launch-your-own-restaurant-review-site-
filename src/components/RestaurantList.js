import React from "react";
import RestaurantCard from "./RestaurantCard";
import { Redirect } from "react-router";
import safeJsonStringify from "safe-json-stringify";

export default class ResturantList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRest: null,
      placeDetails: null,
      redirect: false
    };
  }

  onRestClick = item => {
    this.setState({ selectedRest: item });
  };

  getPlaceDetails() {
    const req = {
      placeId: this.state.selectedRest.placeId,
      fields: ["formatted_phone_number", "name", "reviews", "photos"]
    };

    const google = this.props.maps.current.props.google;

    let service = this.props.maps.current.placesService;
    service.getDetails(req, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setState({
          placeDetails: {
            ...place,
            photos: place.photos.map(item => item.getUrl())
          }
        });
      }
      this.setState({ redirect: true });
    });

  }

  render() {
    if (this.state.redirect) {
      console.log("redirecting");
      console.log(this.state.selectedRest);
      return (
        <Redirect
          push
          to={{
            pathname: "/place",
            state: {
              selectedRest: this.state.selectedRest,
              place: safeJsonStringify(this.state.placeDetails)//pass place details from resturatlist to placdetails component
            }
          }}
        />
      );
    }
    return (
      <div>
        {this.state.selectedRest !== null ? this.getPlaceDetails() : null}
        {this.props.resturantList.map(item => (
          <RestaurantCard
            clickedRestuant={() =>
              this.onRestClick({
                name: item.name,
                photos: [item.img],
                avgrate: item.avgrate,
                address: item.address,
                placeId: item.placeId,
                pos: { lat: item.lat, lng: item.lng }
              })
            }
            item={{
              name: item.name,
              img: item.img,
              address: item.address,
              lat: item.lat,
              long: item.long,
              avgrate: item.avgrate,
              rate: item.rate
            }}
          />
        ))}
      </div>
    );
  }
}
