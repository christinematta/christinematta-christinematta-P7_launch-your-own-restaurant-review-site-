import React from "react";
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '60%',
        height: '100%',
        marginLeft: '3%'
    }
};

const evtNames = ['ready', 'click', 'dragend'];

const camelize = function (str) {
    return str.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

export class Map extends React.Component {


    constructor(props) {
        super(props);

        const {lat,lng} = this.props.initialCenter;
        this.state = {currentLocation: {
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
    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
        }
        // ...
    }



    componentDidMount() {

        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    loadMap() {

        if (this.props && this.props.google) {
            // google is available
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {initialCenter,zoom} = this.props;
            const {lat,lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);

            evtNames.forEach(e => {
                this.map.addListener(e, this.handleEvent(e));
            });
            maps.event.trigger(this.map, 'ready');
        }
    }

    handleEvent(evtName) {
        let timeout;
        const handlerName = `on${camelize(evtName)}`;

        return (e) => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(() => {
                if (this.props[handlerName]) {
                    this.props[handlerName](this.props, this.map, e);
                }
            }, 0);
        }
    }

    // We’ll build our <Marker /> component as a child of the Map component
    //The renderChildren() method will be responsible for actually calling the methods on the children
    renderChildren() {

        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }
    // ...
}


Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object,
    centerAroundCurrentLocation: React.PropTypes.bool,
    onMove: React.PropTypes.func,
    evtNames.forEach(e => Map.propTypes[camelize(e)] = T.func),
}
Map.defaultProps = {
    zoom: 13,
    // San Francisco, by default
    initialCenter: {
        lat: 37.774929,
        lng: -122.419416
    },
    centerAroundCurrentLocation: false,
    onMove: function () {}, // default prop,
    visible: true,
}


render() {
    const style = Object.assign({}, mapStyles.map);
    return ( <
        div ref = 'map' >
        Loading map...{
            this.renderChildren()
        }

        </div>
    )
}
}
export default Map;