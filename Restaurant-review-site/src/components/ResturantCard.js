import React,{Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Rating from '@material-ui/lab/Rating';


// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center",
// };

export default class ResturantCard extends Component {

    // constructor(props){
    //     super(props);

    // }


  onClick= (e) =>{
    e.preventDefault();
    this.props.clickedRestuant();
  }


    render() {
        return(

<div>
<div  onClick={this.onClick}>
            <Grid item sm={12}>
            <h3 style={{fontStyle:"italic",fontFamily:"initial"}}>{this.props.item.name}</h3>

           {this.props.item.img !=null? <img src={this.props.item.img} alt="" style={{width:"100%",height:"160px"}}/>:null}

            <Rating name="simple-controlled" value={this.props.item.avgrate} readOnly  size="large"/>

            <Divider light/>
            </Grid>
            </div>
</div>

        )
    }
}
