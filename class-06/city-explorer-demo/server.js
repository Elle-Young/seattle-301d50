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

//Weather
app.get('/weather', (request, response)=>{
  try{
    const darkskyData = require('./data/darksky.json');
    const time = darkskyData.currently.time;
    const weather = darkskyData.daily.summary;

    const formattedData ={
      // search_query: searchQuery, 
      // formattedQuery: formattedQuery,
      current_time: time, 
      current_forcast: weather
    }
    response.send(formattedData)
  } catch(error){
    console.error(error);
    response.send(error.message);
  }
});
//     const formattedData =
//   }
// })
//   response.send(formattedData);
  
// }
// }


//new constructor function that takes in time and forcast, searches 'this.search_"data key"' for time/searches 'this.serach_"data key"' for forcast, end function
//get data from file
//for variable time find current time in data 
// for variable forcast find current summary in data
// for variable new object of constructor push time and forcast, send to formatted data. 





app.listen(PORT, () => {console.log(`app is up on PORT ${PORT}`)});