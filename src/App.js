import React, {Component} from 'react';
import {Switch, Route,BrowserRouter } from "react-router-dom";
import MapContainer from "./components/MapContainer";
import PlaceDetails from "./components/PlaceDetails";
import Menu from './components/Menu';
import Grid from '@material-ui/core/Grid';
import logo from './logo.png';
require('dotenv').config()

export default class App extends Component {
  render(){
    let links = [
      { label: 'Home', link: '#home', active: true },
      { label: 'About', link: '#about' },
      { label: 'Contact Us', link: '#contact-us' },];

    return (
      <Grid item xs={12}>
      <Menu links={links} logo={logo}/>
   
      <BrowserRouter>
      <Switch>
      <Route  exact path="/" component={MapContainer}/>
      <Route exact path="/place" component={PlaceDetails}/>
      </Switch>
      </BrowserRouter>
      </Grid>
    );
  }
}
