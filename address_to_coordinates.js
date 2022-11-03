let nodeGeocoder = require('node-geocoder');
let options = {
    provider: 'openstreetmap'
};
let geoCoder = nodeGeocoder(options);

module.exports= {

    address_to_coordinate: async (street)=>{
        geoCoder.geocode(street)
        .then((res)=> {
            return await[res[0].latitude, res[0].longitude]
        })
        .catch((err)=> {
            console.log(err);
        });
    }   
}

/**
 * var atc_lat, atc_lon;

module.exports= function address_to_coordinate(street){
    let nodeGeocoder = require('node-geocoder');
    let options = {
        provider: 'openstreetmap'
    };
    
    let geoCoder = nodeGeocoder(options);
  
    geoCoder.geocode(street)
    .then((res)=> {
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

//let ris= address_to_coordinate('Piazza Carlo Irnerio, 6, Milano')
//console.log(ris)
 */