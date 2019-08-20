'use strict';

const express = require('express');
require('dotenv').config()
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT;
// const PORT = 3007;

//Location 

app.get('/location', (request, response) => {
  try{
    const geoData = require('./data/geo.json');

  const searchQuery =  request.query.data;
  const formattedQuery = geoData.results[0].formatted_address;

  const lat = geoData.results[0].geometry.location.lat;
  const lng = geoData.results[0].geometry.location.lng;

  const formattedData = {
    search_query: searchQuery,
    formatted_query: formattedQuery,
    latitude: lat,
    longitude: lng
  } 
  response.send(formattedData);
  
}
catch(error){
  console.error(error);
  response.send(error.message);
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
    const weather = darkskyData.daily.summary;
    
    let bananas = new Weather(time, weather);
  
    response.send(bananas)
    //iterate over darkskydata 7 times and create new weather object (as part of the constructor) push object to a new array and then return new array

    
    let timeData= darkskyData.daily.data[0];
    response.send(timeData);


  } catch(error){
    console.error(error);
    response.send(error.message);
  }
});






app.listen(PORT, () => {console.log(`app is up on PORT ${PORT}`)});