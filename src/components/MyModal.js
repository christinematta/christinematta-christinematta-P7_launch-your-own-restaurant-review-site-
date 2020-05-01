import React from 'react';
import Modal from "react-responsive-modal";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
export default class MyModal extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      open:false,
      newPlace:{
        name:'',
        avgrate:1,
        address:'',
        placeId:"0000",
        photos:[]
      }
    }
  }
  onClickSaveRestraunt = (e)=> {
    e.preventDefault(); // to prevent form submission
    this.props.onSubmit(this.state.newPlace);
  };

  render(){

    return(
      <div>
        <Modal open={this.props.open} styles = {{ modal: {}, overlay: {  } }}
        center onClose={this.props.OnClose}>
               <div>
               <form onSubmit={this.onClickSaveRestraunt}>
                 <h3>Add Restraunt</h3>
                 <label >Name</label><br />
                 <input value={this.state.newPlace.name}
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState(prevState => ({newPlace:{...prevState.newPlace, name : value}})); } }// keep the previous and add the name 
                     type="text" placeholder="Place name..." style={{width:"100%" , height:"40px" , fontSize:"medium"}} required/>
                   <br/><br/>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                      <Rating
                          name="simple-controlled1"
                          required
                          value={this.state.newPlace.avgrate}
                          onChange={(e, newValue) => this.setState(prevState => ({newPlace:{...prevState.newPlace, avgrate:newValue }})) } /> 
                  </Box>
                  <label>Comment</label><br/>
                  <textarea required value={this.state.newPlace.review } placeholder="Insert your comment" style={{width:"100%" , height:"60px" , fontSize:"medium"}}
                      onChange={(e) =>{
                          const value = e.target.value;
                          this.setState(prevState => ({newPlace:{...prevState.newPlace, address : value}}));
                        }}/>
                      <input type="submit" className="review-save-button" value="save"/>
              </form>
               </div>
             </Modal>
             </div>

    )
  }

}
