import React, {Component} from 'react';
import { GoogleApiWrapper, InfoWindow,Marker} from 'google-maps-react';
import Grid from '@material-ui/core/Grid';
import CurrentLocation from '../components/CurrentLocation';
import Infobox from '../components/Infobox';
import restmarker from '../restmarker.png';

// import ResturantCard from './components/ResturantCard';
import Filter from '../components/Filter';
import resturantsListData from '../resturantsListData';

import MyModal from "../components/MyModal";
import ResturantList from '../components/ResturantList';
require('dotenv').config()

const apiKey = `${process.env.REACT_APP_API_KEY}`
//const apiKey = process.env.REACT_APP_API_KEY
console.log(apiKey)

// const mapStyles = {
//     width: '50%',
//     height: '100%',
//     margin : '97px 0px'
// };

export class MapContainer extends Component {

    constructor(props) {
    super(props);
        this.state = {
            restlist:resturantsListData,
            showingInfoWindow: false, //Hides or the shows the infoWindow
            activeMarker: {}, //Shows the active marker upon click
            selectedPlace: null, //Shows the infoWindow to the selected place upon a marker
            places:[],
            currentLocationSelected: false,
            maxWidth:300,
            placeDetails:null,
            selectedRest: null,
            restarray:[],
            filter:null,
            openModal:false,
            latLng:null
        }
        // this.mapRef = React.createRef();
        this.locRef = React.createRef();
    }

    displayMarkers = () => {
    return this.state.restarray.map((store, index) => {
      return <Marker
      key={index}
      id={index}
      position={{lat: store.lat,lng: store.lng,}}
      onClick={this.onMarkerClick}
      icon = {{
        url: restmarker,
        scaledSize: new this.props.google.maps.Size(55, 55)}}/>
    })
  }
    onMarkerClick = (props, marker, e) => {
        let selected;
        let curentlat = Math.round((marker.position.lat())*1000000)/1000000
        let curentlong = Math.round((marker.position.lng())*1000000)/1000000
        console.log(curentlat);
        console.log(curentlong);

        const infobox = this.state.restarray.map(item => {
            if((Math.round(item.lat*1000000)/1000000) === curentlat && (Math.round(item.lng *1000000)/1000000) === curentlong){
                selected = item;
            }
        });
        console.log(selected);
        this.setState({
            currentLocationSelected: false,
            selectedPlace: selected,
            activeMarker: marker,
            showingInfoWindow: true,
//            animation:this.props.google.maps.Animation.BOUNCE

        });

    };

    onMyCurrentLocationClick = (props, marker, e) => {
      this.setState({
        showingInfoWindow: true,
        activeMarker: marker,
        currentLocationSelected: true
      });
    }

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
                selectedPlace:null,
                currentLocationSelected:false
            });
        }
    };


    getModal() {
      console.log("modallll");
      return (
        <MyModal positon={this.state.latLng}
        OnClose={()=> {this.setState({openModal:false})}}
         open={this.state.openModal} onSubmit={(newRest) => this.addNewRest(newRest)}/>)
    }

    addNewRest= (newRest)=>{ 
      newRest.lat = this.state.latLng.lat();
      newRest.lng = this.state.latLng.lng();
      console.log(newRest);
      this.setState(prevState => ({
        restarray: [newRest,...prevState.restarray],// add the new array items to the existing array
        openModal:false
      }));
    }

onFilterClick = (value) => {

  //let filteredList = this.state.restarray.filter(item => item.rating >= value);

  this.setState({
  filter:value
  });
}

onPlacesReady = (places)=>{
  this.setState({
    restarray: places.map(item => { return {
          name: item.name,
          img: item.photos !== undefined ? item.photos[0].getUrl() : null,
          address: item.vicinity,
          photos: item.photos !== undefined ? item.photos.map(photo => photo.getUrl()) : null,
          avgrate:item.rating,
          placeId: item.place_id,
          lat:item.geometry.location.lat(),
          lng: item.geometry.location.lng()

    }}).concat( //concatenate two arrays
      resturantsListData.map(item => { return{
          name:item.restaurantName,
          img:item.imgUrl,
          address:item.address,
          photos: [item.imgUrl],
          rate:item.ratings,
          avgrate:item.rating,
          placeId: "000",
          lat: item.lat,
          lng: item.long
      }})
    )
  });
}

mapClick = (latLng)=> {
  this.setState({
    openModal: true,
    latLng: latLng // the clicked lat and long
  });
}

getList()  {
  //if there a selected filter get the resturant according to thier avrg rate else show all restarray
  return (this.state.filter !== null ? this.state.restarray.filter(item => item.avgrate >= this.state.filter ): this.state.restarray);
}

    render() {
        // let links = [
        //   { label: 'Home', link: '#home', active: true },
        //   { label: 'About', link: '#about' },
        //   { label: 'Contact Us', link: '#contact-us' },];

        return (
          
            <Grid container>
               <Grid item xs={8}>
               <div >
            <CurrentLocation  centerAroundCurrentLocation google={this.props.google}
                  placesReady={this.onPlacesReady} ref={this.locRef} onMapClick={this.mapClick}>

                 <Marker onClick={this.onMyCurrentLocationClick}  animation= {this.props.google.maps.Animation.DROP}  />
                  {this.displayMarkers()} 

<InfoWindow   maxWidth= {this.state.maxWidth}
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}>
                    <div>
                  {this.state.currentLocationSelected ? <h4>Current Location</h4> : <Infobox restraunt={this.state.selectedPlace}/>}
                  </div>
            </InfoWindow>
       </CurrentLocation>
       {this.state.openModal? this.getModal() : null}
</div>
        </Grid>

              <Grid item xs={4}>
      <div className="rest-layout">
           <Filter onFilterChange={(value) => this.onFilterClick(value)}/>
           <ResturantList resturantList={this.getList()} maps={this.locRef}/>

            </div>
             </Grid>

     </Grid>
      
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey,
})(MapContainer);
