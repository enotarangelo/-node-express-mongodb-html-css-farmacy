const path= require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
    provider: 'openstreetmap',
  });

//created modules
const util= require('./utils');
const time_distance= require('./distance')
//const atc= require('./address_to_coordinates');
const database= require('./database')
const dbFunctions= require('./dbFunctions')
//const atc=require('./address_to_coordinates')
 
const port = 3000

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/', async (req, res) => {
  let coordinates= JSON.stringify(req.body.coordinates);
  let address=  JSON.stringify(req.body.address);
  let ris_db, latitudine, longitudine, farm, ind, lat_f, lon_f;

  if (typeof coordinates !== 'undefined') {
    let ris= util(coordinates)
    latitudine = ris[0];
    longitudine = ris[1];
    ris_db= await dbFunctions.getCoordinates(longitudine, latitudine)
    farm= ris_db[0].properties.DENOM_FARMACIA;
    ind= ris_db[0].properties.INDIRIZZO;
    tel= ris_db[0].properties.TELEFONO;
    console.log(farm +' '+ ind + ' '+ tel)
    lat_f= ris_db[0].properties.LAT;
    lon_f= ris_db[0].properties.LNG;
    //distanza a piedi e in macchina
    var time_dis= time_distance({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
    time_feet= time_dis[0];
    time_car= time_dis[1];
    res.send(farm +'Indirizzo: '+ ind + '\n Numero di telefono: '+ tel+ '\n '+ time_feet+ ' minuti a piedi \n'+time_car +' minuti in macchina')
}


  if (typeof address !== 'undefined') {
    var NodeGeocoder = require('node-geocoder');
    var geocoder = NodeGeocoder({
    provider: 'openstreetmap',
    });


    geocoder.geocode(address, async function(err, res) { 
        //console.log(res[0].latitude +' ' + res[0].longitude);
        latitudine = res[0].latitude;
        longitudine = res[0].longitude;
        ris_db= await dbFunctions.getCoordinates(longitudine, latitudine)
        farm= ris_db[0].properties.DENOM_FARMACIA;
        ind= ris_db[0].properties.INDIRIZZO;
        tel= ris_db[0].properties.TELEFONO;
        console.log(farm +' '+ ind + ' '+ tel)
        lat_f= ris_db[0].properties.LAT;
        lon_f= ris_db[0].properties.LNG;
        //distanza a piedi e in macchina
        var time_dis= time_distance({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
        time_feet= time_dis[0];
        time_car= time_dis[1];
        res.send(farm +'Indirizzo: '+ ind + '\n Numero di telefono: '+ tel+ '\n '+ time_feet+ ' minuti a piedi \n'+time_car +' minuti in macchina')
    }); 
  }
  //front-end    
  //res.sendFile(path.join(__dirname+'/front-end/result.html'))
});

// Start the web server and connect to the database

let server
let conn

(async () => {
	try {
		conn = await database()
		await dbFunctions.getDb(conn)
		server = app.listen(port, () => {
			console.log("# App server listening on port " + port)
		})
	}
	catch(err) {
		console.error("# Error:", err)
		console.error("# Exiting the application.")
		await closing()
		process.exit(1)
	}
})()

async function closing() {
	console.log("# Closing resources...")
	if (conn) {
		await conn.close()
		console.log("# Database connection closed.")
	}
	if (server) {
		server.close(() => console.log("# Web server stopped."))
	}
}


