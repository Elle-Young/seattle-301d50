'use strict';

const express = require('express');
require('dotenv').config()
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT;
// const PORT = 3007;

//Location 

function Location(query, format, lat, lng){
  this.search_query=query;
  this.formatted_query=format;
  this.latitude=lat;
  this.longitude=lng;
}

app.get('/location', (request, response) => {
  try{
    const geoData = require('./data/geo.json');

    const searchQuery =  request.query.data;
    const specificGeoData =geoData.results[0];
    const formattedQuery =specificGeoData.formatted_address;

    const lat =specificGeoData.geometry.location.lat;
    const lng =specificGeoData.geometry.location.lng;

    const formattedData = {
      search_query: searchQuery,
      formatted_query: formattedQuery,
      latitude: lat,
      longitude: lng
  } 
  response.send(formattedData);
  
}
catch(e){
  console.error(e);
  response.status(500).send(e.message);
}
});


function Weather(time, weather) {
  this.time = time;
  this.weather = weather;
  
}
//Weather

app.get('/weather', (request, response)=>{
  try{
    let arr = [];
    const darkskyData = require('./data/darksky.json');
    const time = darkskyData.currently.time;
    const weather = darkskyData.daily.data;

    const formattedDays = weather.map(day => new Day(day.summary, day.time));
    
    let bananas = new Weather(time, weather);

    function Day (summary, time){
      this.forcast =summary;
      this.time = (time *1000).toDateString();
      
    
  
    // response.send(bananas)
    //iterate over darkskydata 7 times and create new weather object (as part of the constructor) push object to a new array and then return new array

    
    let timeData= darkskyData.daily.data[0];
    response.send(timeData);
  };

}
    catch(e){
      console.error(e);
      response.status(500).send(e.message);
    }
});






app.listen(PORT, () => {console.log(`app is up on PORT ${PORT}`)});