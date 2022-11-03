const path= require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//created modules
const util= require('./utils');
const time_distance= require('./distance')
const atc= require('./address_to_coordinates');
const database= require('./database')
const dbFunctions= require('./dbFunctions')

const port = 3000

app.use(express.static(__dirname));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname+'./public/app.html'))
});

app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/', async (req, res) => {
  let coordinates= JSON.stringify(req.body.coordinates);
  let address=  JSON.stringify(req.body.address);
  let latitudine, longitudine, farm, ind, lat_f, lon_f;

  if (typeof coordinates !== 'undefined') {
    let ris= util(coordinates)
    latitudine = ris[0];
    longitudine = ris[1];

    let ris_db= await dbFunctions.getCoordinates(longitudine, latitudine)
    farm= ris_db[0].properties.DENOM_FARMACIA;
    ind= ris_db[0].properties.INDIRIZZO;
    lat_f= ris_db[0].properties.LAT;
    lon_f= ris_db[0].properties.LNG;
    //console.log(farm +' '+ind+' '+lat_f+' '+lon_f)
  }


  if (typeof address !== 'undefined') {
    /**let ris= atc(address)
    latitudine = ris[0];
    longitudine = ris[1];
    
    let ris_db= database(longitudine, latitudine)
    console.log(ris_db)*/
  }

  //distanza a piedi e in macchina
  //console.log( lat_f +' '+lon_f)
  var time_dis= time_distance({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
  time_feet= time_dis[0];
  time_car= time_dis[1];    
  //res.sendFile(path.join(__dirname+'/front-end/result.html'))
});

//app.listen(3000);

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


