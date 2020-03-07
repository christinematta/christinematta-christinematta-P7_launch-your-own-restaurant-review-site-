import React,{Component} from 'react';

import Grid from '@material-ui/core/Grid';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';





class Infobox extends Component{

    constructor(props){
        super(props)
    }

    changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      });
    }

    render(){
        if(this.props.restraunt !== null){
        return(
            <Grid item sm={12}>
            <h3 style={{fontStyle:"italic",fontFamily:"initial",textAlign:"center"}}>{this.props.restraunt.name}</h3>
            {this.props.restraunt.img!=null?
            <img src={this.props.restraunt.img} alt="" style={{width:"100%",height:"160px"}}/>:null
             }
            <div style={{margin:"0% 30%"}}>
            <Rating name="simple-controlled" value={this.props.restraunt.avgrate} readOnly  size="small"/>
            </div>
            </Grid>
        )
        }else{
            // console.log(this.props.restraunt);
            return null;
        }

    }
}


export default Infobox;
