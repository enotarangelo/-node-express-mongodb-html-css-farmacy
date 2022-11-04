const path= require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
provider: 'openstreetmap',
});

//created modules
const utils= require('./utils');
const database= require('./database')
const dbFunctions= require('./dbFunctions') 
const port = 3000

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/', async (req, res) => {
  let coordinates= JSON.stringify(req.body.coordinates);
  let address=  JSON.stringify(req.body.address);
  if ( (typeof coordinates === 'undefined' && address.length === 2)||(typeof address === 'undefined' && coordinates.length === 2)) {
    res.sendFile(path.join(__dirname+'/public/error.html'))
  }
  else{
    let ris_db, latitudine, longitudine, farm, ind, lat_f, lon_f;
    
    if (typeof coordinates !== 'undefined') {
      if (utils.check_coordinates(coordinates)===false){
        res.sendFile(path.join(__dirname+'/public/error.html'))
      }else{
        let ris= utils.string_to_coordinates(coordinates)
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
        var time_dis= utils.time_2_point({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
        time_feet= time_dis[0];
        time_car= time_dis[1];
        //res.send(farm +'Indirizzo: '+ ind + '\n Numero di telefono: '+ tel+ '\n '+ time_feet+ ' minuti a piedi \n'+time_car +' minuti in macchina')
        res.send(utils.html_result+`
            <h1 style='color:#FC2438'>`+farm +`</h1>
            <p>`+ind+`</p>
            <p>`+tel+`</p>
            <p>`+time_feet+` minuti a piedi</p>
            <p>`+time_car+` minuti in macchina</p><br>
            `+utils.html_result_end
        )
      }
    }
    if (typeof address !== 'undefined') {
      geocoder.geocode(address, async function(err, ris) { 
        if (ris.length===0){
          res.sendFile(path.join(__dirname+'/public/error.html'))
        }else{
          latitudine = ris[0].latitude;
          longitudine = ris[0].longitude;
          ris_db= await dbFunctions.getCoordinates(longitudine, latitudine)
          farm= ris_db[0].properties.DENOM_FARMACIA;
          ind= ris_db[0].properties.INDIRIZZO;
          tel= ris_db[0].properties.TELEFONO;
          console.log(farm +' '+ ind + ' '+ tel)
          lat_f= ris_db[0].properties.LAT;
          lon_f= ris_db[0].properties.LNG;
          //distanza a piedi e in macchina
          var time_dis= utils.time_2_point({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
          time_feet= time_dis[0];
          time_car= time_dis[1];
          res.send(utils.html_result+`
          <h1 style='color:#FC2438'>`+farm +`</h1>
          <p>`+ind+`</p>
          <p>`+tel+`</p>
          <p>`+time_feet+` minuti a piedi</p>
          <p>`+time_car+` minuti in macchina</p><br>
          `+utils.html_result_end
          )                       
        }        
      });
    }
  } 
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


