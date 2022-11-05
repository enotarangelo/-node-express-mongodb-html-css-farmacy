const express = require('express');
const app = express();
const path= require('path');
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

  //Se le coordinate o l'indirizzo non sono stati inseriti restituisce la pagina di errore
  if ((typeof coordinates === 'undefined' && typeof address === 'undefined') || (typeof coordinates === 'undefined' && address.length === 2)||(typeof address === 'undefined' && coordinates.length === 2)) {
    res.sendFile(path.join(__dirname+'/public/error.html'))
  }
  else{
    let ris_db, latitudine, longitudine, farmacia, indirizzo, lat_f, lon_f;
    
    if (typeof coordinates !== 'undefined') {
      //controlla che le coordinate rispettino le condizioni altrimenti restituisce la pagina di errore
      if (utils.check_coordinates(coordinates)===false){
        res.sendFile(path.join(__dirname+'/public/error.html'))
      }else{
        //ritorna una lista di number con le coordinate
        let ris= utils.string_to_coordinates(coordinates)
        latitudine = ris[0];
        longitudine = ris[1];
        //restituisce la farmacia più vicina alle coordinate
        ris_db= await dbFunctions.getCoordinates(longitudine, latitudine)
        farmacia= ris_db[0].properties.DENOM_FARMACIA;
        indirizzo= ris_db[0].properties.INDIRIZZO;
        tel= ris_db[0].properties.TELEFONO;
        console.log(farmacia +' '+ indirizzo + ' '+ tel)
        lat_f= ris_db[0].properties.LAT;
        lon_f= ris_db[0].properties.LNG;
        //restituisce una lista con la distanza a piedi e in macchina
        var time_dis= utils.time_2_point({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
        time_feet= time_dis[0];
        time_car= time_dis[1];
        //restituisce una pagina html con i risultati 
        res.send(utils.html_result+`
            <h1 style='color:#FC2438'>`+farmacia +`</h1>
            <p>`+indirizzo+`</p>
            <p>`+tel+`</p>
            <p>`+time_feet+` minuti a piedi</p>
            <p>`+time_car+` minuti in macchina</p><br>
            `+utils.html_result_end
        )
      }
    }
    if (typeof address !== 'undefined') {
      geocoder.geocode(address, async function(err, ris) {
        //il try catch consente di gestire la problematica relativa alla connessione assente
        try{
          //se l'indirizzo non è corretto restituisce la pagina di errore
          if (ris.length===0){
            res.sendFile(path.join(__dirname+'/public/error.html'))
          }else{
            //restituisce le coordinate geografiche dell'indirizzo inserito
            latitudine = ris[0].latitude;
            longitudine = ris[0].longitude;
            //restituisce la farmacia più vicina alle coordinate
            ris_db= await dbFunctions.getCoordinates(longitudine, latitudine)
            farmacia= ris_db[0].properties.DENOM_FARMACIA;
            indirizzo= ris_db[0].properties.INDIRIZZO;
            tel= ris_db[0].properties.TELEFONO;
            console.log(farmacia +' '+ indirizzo + ' '+ tel)
            lat_f= ris_db[0].properties.LAT;
            lon_f= ris_db[0].properties.LNG;
            //restituisce una lista con la distanza a piedi e in macchina
            var time_dis= utils.time_2_point({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
            time_feet= time_dis[0];
            time_car= time_dis[1];
            //restituisce una pagina html con i risultati 
            res.send(utils.html_result+`
            <h1 style='color:#FC2438'>`+farmacia +`</h1>
            <p>`+indirizzo+`</p>
            <p>`+tel+`</p>
            <p>`+time_feet+` minuti a piedi</p>
            <p>`+time_car+` minuti in macchina</p><br>
            `+utils.html_result_end
            )                       
          }    
        }catch{
          res.sendFile(path.join(__dirname+'/public/no_connection.html'))
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


