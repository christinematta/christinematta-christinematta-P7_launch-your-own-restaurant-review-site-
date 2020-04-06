import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export class Filter extends React.Component {
  constructor(props){
    super(props);

    this.state={
      value : '',
    }
  }
  render(){

    return(
      <Box component="fieldset" mb={3} borderColor="transparent" >
              <Typography component="legend" style={{fontStyle:'italic' , fontSize:'larger' , fontWeight:'bold' , paddingTop:'6%', marginLeft:'-4%'}}>Sort by</Typography>
              <Rating
                style={{marginLeft:'80%' , marginTop:'-6%'}}
                name="simple-controlled"
                precision={0.5}
                value={this.state.value}
                onChange={(event, newValue) => {
                  this.setState({value: newValue});
                  this.props.onFilterChange(newValue);
                }}
              />
            </Box>

    )
  }
}


export default Filter
