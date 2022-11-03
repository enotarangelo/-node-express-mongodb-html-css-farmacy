const path= require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const util= require('./utils');
const time_distance= require('./distance')
const atc= require('./address_to_coordinates');
const db= require('./database')
const dbFun= require('./dbFunctions')

var farm, ind, time_feet, time_car, latitudine, longitudine, lat_f, lon_f;

app.use(express.static(__dirname));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname+'/front-end/homepage.html'))
});

app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/', (req, res) => {
  let coordinates= JSON.stringify(req.body.coordinates);
  let address=  JSON.stringify(req.body.address);

  if (typeof coordinates !== 'undefined') {
    let ris= util(coordinates)
    latitudine = ris[0];
    longitudine = ris[1];
    
    let ris_db= database(longitudine, latitudine)
    farm= ris_db.properties.DENOM_FARMACIA;
    ind= ris_db.properties.INDIRIZZO;
    lat_f= ris_db.properties.LAT;
    lon_f= ris_db.properties.LNG;
    //console.log(farm +' '+ind+' '+lat_f+' '+lon_f)
  }


  if (typeof address !== 'undefined') {
    let ris= atc(address)
    latitudine = ris[0];
    longitudine = ris[1];
    
    let ris_db= database(longitudine, latitudine)
    console.log(ris_db)
  }

  //distanza a piedi e in macchina
  //console.log( lat_f +' '+lon_f)
  //var time_dis= time_distance({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
  //time_feet= time_dis[0];
  //time_car= time_dis[1];    
  //res.sendFile(path.join(__dirname+'/front-end/result.html'))
});


app.listen(3000);



