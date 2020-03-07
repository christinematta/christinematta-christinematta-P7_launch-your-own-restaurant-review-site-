import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position:'absolute',
        width: '60%',
        height: '100%',
        marginLeft:'3%'
    }
};

export class CurrentLocation extends React.Component {

    constructor(props) {
        super(props);

        const {lat,lng} = this.props.initialCenter;

        this.state = { currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
// center the map around the givin lat and long
    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center); // Changes the center of the map to the given LatLng. If the change is less than both the width and height of the map, the transition will be smoothly animated.
        }
    }

// find the lat and long for the current location
    componentDidMount() {

        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
              console.log(this.state.currentLocation.lat);
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                    this.loadMap();
                });
            }
        }

    }

    loadMap() {
      console.log(this.props.google);
        if (this.props && this.props.google) {
            // checks if google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let {zoom} = this.props;
            const {lat,lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {center: center, zoom: zoom});

            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
            const service = new google.maps.places.PlacesService(this.map);
            this.map.addListener('click', (event)=>{ // listen to click event to get the clicked lat and long to add resturant
                this.props.onMapClick(event.latLng);

            });
            this.placesService = service;
            service.nearbySearch(
              { location:center, radius: 500, type: ['restaurant'] }, // search in google places for resturants within radius 500m and then callback placesready
              (placeResult)=> { this.props.placesReady(placeResult);
                
            });

        }
    }

    renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return ( <div >
            <div style = {style}
            ref = "map" >
            Loading maps...
            </div>
                {this.renderChildren()}
    </div>
        );
    }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: -1.2884,
        lng: 36.8233
    },
    centerAroundCurrentLocation: false,
    visible: true
};
