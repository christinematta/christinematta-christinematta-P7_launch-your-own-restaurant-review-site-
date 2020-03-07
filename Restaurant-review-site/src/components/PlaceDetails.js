import React, {Component} from 'react';
import ReactStreetview from 'react-streetview';
import Grid from '@material-ui/core/Grid';
import profilePhoto from '../profile.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';


class PlaceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showReview: false,
      place: JSON.parse(this.props.location.state.place),
      newPlace:{
        author_name:null,
        rating:null,
        text:null,
        profile_photo_url:null
      },
      value:0
    };

    this.renderReviewForm = this.renderReviewForm.bind(this);
    this.onClickReview = this.onClickReview.bind(this);
    this.onClickSaveReview = this.onClickSaveReview.bind(this);

  }


  onClickReview(e){
    this.setState({showReview : !this.state.showReview}); // toggel
  }

  onClickSaveReview(e){
    e.preventDefault();
    let place = this.state.place;
    place.reviews.unshift(this.state.newPlace); // insert the comment at the beginning of the array
    this.setState({place: place,
      newPlace:{
        name:null,
        rating:null,
        text:null
      },
      showReview:false

    });

  }


renderReviewForm(){
    if(this.state.showReview){
      return (

        <div style={{fontWeight:"bold"}}>
            <form onSubmit={this.onClickSaveReview}>
                 <h3>Add Review</h3>
                 <label >Name</label><br />
                 <input value={this.state.newPlace.name}
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState(prevState => ({newPlace:{...prevState.newPlace, author_name : value}})); } }
                     type="text" placeholder="Your name.." style={{width:"100%" , height:"40px" , fontSize:"medium"}} required/>
                   <br/><br/>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                      <Rating
                          name="simple-controlled"
                          required
                          value={this.state.newPlace.rating}
                          onChange={(e, newValue) => this.setState(prevState => ({newPlace:{...prevState.newPlace, rating:newValue }})) } />
                  </Box>
                  <label>Comment</label><br/>
                  <textarea required value={this.state.newPlace.text } placeholder="Enter your comment" style={{width:"100%" , height:"60px" , fontSize:"medium"}}
                      onChange={(e) =>{
                          const value = e.target.value;
                          this.setState(prevState => ({newPlace:{...prevState.newPlace, text : value}}));
                        }}/>
                      <input type="submit" className="review-save-button" value="save"/>
              </form>
        </div>

      );
    }
    return null;
  }

  renderReviewDetails(review){
    return (<div >
      <img src={review.profile_photo_url === null ? profilePhoto : review.profile_photo_url} style={{width:"70px" , height:"70px"}}/>
      <h5 style={{marginLeft: "19%", marginTop: "-11%",marginBottom: "10%",fontsWeight:"large"}}> {review.author_name}</h5>
      <h5> <Rating readOnly value ={review.rating}/> </h5>
      <h5>{review.text}</h5>
      <Divider />
      <br/>

           </div>);
  }

  render(){
    const restaurant = this.props.location.state.selectedRest;
    const place = this.state.place;

    const googleMapsApiKey = `${process.env.REACT_APP_API_KEY}`;

       const streetViewPanoramaOptions = {
           position: {lat: restaurant.pos.lat, lng:  restaurant.pos.lng},
           pov: {heading: 100, pitch: 0},
           zoom: 1
       };
       
    return (
      <Grid container>
     

<Grid item xs={8}>
      <div style={{
                margin:"30px",
                width: '800px',
                height: '450px',
                backgroundColor: '#e7ebf0'
            }}>

            <h3>{restaurant.name}</h3>
            {restaurant.address}
            <div style={{marginTop:"30px", marginBottom:"30px"}}>
            <Carousel dynamicHeight showThumbs={false}>
                   {place !== null && place.photos !== undefined ?
                     place.photos.map(item =>
                       <div>
                        <img src={item} alt="" style={{width:"800px",height:"400px"}}/> </div> ) : null }
            </Carousel>
            </div>
      <ReactStreetview apiKey = {googleMapsApiKey} streetViewPanoramaOptions={streetViewPanoramaOptions}  />
        </div>
</Grid>

<Grid item xs={4}>
  <div className="rest-layout">


      <input  type="button"  className="review-button" value={this.state.showReview ? "Cancel" :"Add Review"} onClick={this.onClickReview}/>

      {this.renderReviewForm()}

         {place!==null && place.reviews !== undefined ?
         place.reviews.map((item,index) => {return index<5? this.renderReviewDetails(item) :null} )  :null}
</div>
</Grid>

  </Grid>
);
  }

}
export default PlaceDetails;
