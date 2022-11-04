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
          var time_dis= time_distance({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
          time_feet= time_dis[0];
          time_car= time_dis[1];
          //res.send(farm +'Indirizzo: '+ ind + '\n Numero di telefono: '+ tel+ '\n '+ time_feet+ ' minuti a piedi \n'+time_car +' minuti in macchina')
          res.send(`
          <head>
            <title>Cherry | Farmacy</title>
            <!-- icon -->
            <link rel="shortcut icon" href="./public/img/logo.webp" type="image/x-icon" />
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- Bootstrap -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <!-- main css -->
            <link rel="stylesheet" href="./public/app.css" />
          </head>
          <body>
            <nav class="nav primary-nav">
                <ul>
                    <li><a href="./public/app.html"><img src="./public/img/logo.webp" style="width:50px" alt="Image"></a></li>
                    <li>Cherry</li>
                </ul>
            </nav>
  
            <div class="intro">
              <img src="./public/img/logo_farmacy.png" style="width:15%" alt="Image">
              <h1>Cherry <span style="color:#FC2438">Farmacy</span></h1>      
              <p>Ecco la farmacia più vicina: </p><br>
              <p>___________</p><br>
              <h1>`+farm +`</h1>
              <p>`+ind+`</p>
              <p>`+tel+`</p>
              <p>`+time_feet+` minuti a piedi</p>
              <p>`+time_car+` minuti in macchina</p><br>
              <a href="./public/app.html"><button type="button" style="background-color: #2F4858; border: none;  padding: 15px 32px; border-radius: 100px; color:#FFF; font-size: medium;">Nuova ricerca</button></a><br>
            </div>
          </body>`)
        }
    }
      if (typeof address !== 'undefined') {
        var NodeGeocoder = require('node-geocoder');
        var geocoder = NodeGeocoder({
        provider: 'openstreetmap',
        });


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
                var time_dis= time_distance({ lat: latitudine, lng: longitudine },  { lat: lat_f, lng: lon_f });
                time_feet= time_dis[0];
                time_car= time_dis[1];
                              
              res.send(`
              <head>
                <title>Cherry | Farmacy</title>
                <!-- icon -->
                <link rel="shortcut icon" href="./public/img/logo.webp" type="image/x-icon" />
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <!-- Bootstrap -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <!-- main css -->
                <link rel="stylesheet" href="./public/app.css" />
              </head>
              <body>
                <nav class="nav primary-nav">
                    <ul>
                        <li><a href="./public/app.html"><img src="./public/img/logo.webp" style="width:50px" alt="Image"></a></li>
                        <li>Cherry</li>
                    </ul>
                </nav>
          
                <div class="intro">
                  <img src="./public/img/logo_farmacy.png" style="width:15%" alt="Image">
                  <h1>Cherry <span style="color:#FC2438">Farmacy</span></h1>      
                  <p>Ecco la farmacia più vicina: </p><br>
                  <p>___________</p><br>
                  <h1 style='color:#'>`+farm +`</h1>
                  <p>`+ind+`</p>
                  <p>`+tel+`</p>
                  <p>`+time_feet+` minuti a piedi</p>
                  <p>`+time_car+` minuti in macchina</p><br>
                  <a href="./public/app.html"><button type="button" style="background-color: #2F4858; border: none;  padding: 15px 32px; border-radius: 100px; color:#FFF; font-size: medium;">Nuova ricerca</button></a><br>
                </div>
              </body>`)
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


