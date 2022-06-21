//import dependencies
import React,{useState,useEffect} from "react";
import {Paper,Grid,withStyles} from "@material-ui/core";
import Weather from "./Weather"
import axios from "axios";


//  Styling overrides
const styles = theme => ({ 
    paper:{
        margin:theme.spacing(2),
        padding:theme.spacing(2)
    }
})
//  Home
//  Defines home component, which displays filler image and text and current weather for Rahway Nj.
//  params[in]  classes object styling object
//  returns the component
const Home=({classes}) =>{
    //Setting upexternal API call for weath
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: '07065'},
        headers: {
          'X-RapidAPI-Key': '3ab45978d8mshb680163359ee218p195cf3jsnf97add07d05c',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
    //Weather object and setter
    const[weather,setWeather]=useState();
    //make api call
    useEffect(()=>{
        //api call
      axios.request(options).then(function (response) {
          setWeather(response.data);//set data
      }).catch(function (error) {
          console.error(error);
      });

    },[]);
    
    //return component
    return (
    <Paper className={classes.paper} elevation={0}>
        <Grid container>
            <Grid item xs={7}>
                <img class="img-fluid rounded mb-4 mb-lg-0" src="http://via.placeholder.com/800x400"></img>
            </Grid>
            <Grid item xs={4}>
                <p class="h3 font-weight-bold">Placeholder IMG and Lorem ipsum</p>
                <blockquote class="blockquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </blockquote>
            </Grid>
            {weather != null ? <Weather data={weather} />:<p>Loading the weather...</p>}
        </Grid>
    </Paper>
    );
}

export default withStyles(styles)(Home);