/**Distanza in macchina tra due punti 
var distance = require('google-distance');
distance.apiKey = 'API_KEY';
 
distance.get(
    {
      origin: 'San Francisco, CA',
      destination: 'Los Angeles, CA',
      mode: 'bicycling',  // mode - 'driving' (default) | 'walking' | 'bicycling'
      units: 'imperial'
    },
    function(err, data) {
      if (err) return console.log(err);
      console.log(data);
  });
  */


  function time_2_point(point1, point2){
    var haversine = require("haversine-distance");

    //First point in your haversine calculation
    //var point1 = { lat: 6.1754, lng: 106.8272 }
    
    //Second point in your haversine calculation
    //var point2 = { lat: 6.1352, lng: 106.8133 }
    
    var haversine_m = haversine(point1, point2); //Results in meters (default)
    var haversine_km = haversine_m /1000; //Results in kilometers
    
    //console.log("distance (in meters): " + haversine_m + "m");
  
    //Tempo a piedi - 0.9 m/s 
    var time_feet= Math.floor( (haversine_m /0.9)/60);  
    console.log("Time by feet: " + time_feet + " min");
    
    //Tempo in macchina - 2 m/s
    var time_car= Math.floor( (haversine_m /2)/60);  
    console.log("Time by car: " + time_car + " min");
   return [time_feet, time_car]
}

module.exports= time_2_point;
//console.log(time_2_point( { lat: 6.1754, lng: 106.8272 },  { lat: 6.1352, lng: 106.8133 }));