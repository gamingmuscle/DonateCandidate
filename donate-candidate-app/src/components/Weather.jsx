//  import dependencies
import React from "react";
import {Grid,withStyles} from "@material-ui/core";

//  define weather component
//  param[in] data object this is expecting the data result form the external api call to https://weatherapi-com.p.rapidapi.com/current.json
//  returns the component
const Weather=({data})=>{
    return (
        <Grid container xs={12}>
            <div  class="mb-2 mt-4 display-4 fw">Today's Weather</div>
            <Grid item xs={1}>
                <img src={"http:"+data.current.condition.icon}/>
                <div>{data.current.condition.text}</div>
            </Grid>
            <Grid item xs={2}>
                <div class="fw">Temp (F)</div>
                <span class="display-3">
                    {data.current.temp_f}
                </span>
            </Grid>
            <Grid item xs={2}>
                <div class="fw">Wind (mph)</div>
                <span  class="display-3">
                    {data.current.wind_mph}
                </span> {data.current.wind_dir}
            </Grid>
        </Grid>
    );
}

export default Weather;