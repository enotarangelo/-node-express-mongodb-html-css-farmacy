/**
let nodeGeocoder = require('node-geocoder');
let options = {
    provider: 'openstreetmap'
};
let geoCoder = nodeGeocoder(options);

module.exports= {

    address_to_coordinate: async (street)=>{
        geoCoder.geocode(street)
        .then((res)=> {
            return await [res[0].latitude, res[0].longitude]
        })
        .catch((err)=> {
            console.log(err);
        });
    }   
}


var atc_lat, atc_lon;

async function address_to_coordinate(street){
    let nodeGeocoder = require('node-geocoder');
    let options = {
        provider: 'openstreetmap'
    };
    
    let geoCoder = nodeGeocoder(options);
    let atc_lat, atc_lon;

    geoCoder.geocode(street)
    .then(async (res) => {
        atc_lat= res[0].latitude;
        atc_lon= res[0].longitude;
        //console.log(atc_lat);
        //console.log(atc_lon); 
        
    })
    .catch((err)=> {
        console.log(err);
    });
    return [atc_lat, atc_lon];
}

*/
 
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
    provider: 'openstreetmap',
  });


geocoder.geocode(address, async function(err, res) { 
    console.log(res[0].latitude +' ' + res[0].longitude);
}); 



