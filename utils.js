module.exports = {
   /**la funzione prende ingresso una stringa "[latitudine, longitudine]" e 
   restituisce una lista di tipo numerico contentente latitudine e longitudine*/
   string_to_coordinates: (coordinates)=>{
      let ris= coordinates.replace(' ', '').replace('[', '').replace(']', '').replace('"', '').replace('"', '');
      return ris.split(',').map(Number); 
     },

   //la funziona controlla che l'input relatico alle coordinate sia in formato corretto restituendo true altrimenti restituisce false
   check_coordinates: (coordinates)=>{
      let bool= false;
      let ris= coordinates.replace(' ', '').replace('"', '').replace('"', '').replace('[', '').replace(']', '');
      if (ris.includes(",")){
         ris = ris.split(',');
         if (!isNaN(ris[0]) && !isNaN(ris[1])){
              if( parseFloat(ris[0])>=-90 && parseFloat(ris[0])<=90 && parseFloat(ris[1])>=-90 && parseFloat(ris[1])<=90 ) {
                  bool=true;
              }
         }
      }
      return bool;
   },

   //date due coordinate geografiche restituisce una lista con la distanza stimata a piedi e in macchina
   //Soluzione alternativa con google-distance dove è possibile selezionare // mode - 'driving' (default) | 'walking' | 'bicycling' MA problema con api/costi
   time_2_point: (point1, point2)=>{
      var haversine = require("haversine-distance");   
      var haversine_m = haversine(point1, point2); //Results in meters (default)
      var haversine_km = haversine_m /1000; //Results in kilometers
      
      //Tempo a piedi - 0.9 m/s 
      var time_feet= Math.floor( (haversine_m /0.9)/60);
      if(time_feet===0){time_feet=1;} //nel caso in cui la distanza fosse inferiore a 0 
      console.log("Time by feet: " + time_feet + " min");
      
      //Tempo in macchina - 2 m/s
      var time_car= Math.floor( (haversine_m /2)/60);
      if(time_car===0){time_car=1;}  //nel caso in cui la distanza fosse inferiore a 0 
      console.log("Time by car: " + time_car + " min");
      return [time_feet, time_car]
},

   //codice html iniziale della pagina relativa ai risultati
   html_result : `
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
       <p>___________</p><br>`,
   
   //codice html finale della pagina relativa ai risultati
   html_result_end:`<a href="./public/app.html"><button type="button" style="background-color: #2F4858; border: none;  padding: 15px 32px; border-radius: 100px; color:#FFF; font-size: medium;">Nuova ricerca</button></a><br>
                     </div>
                     </body>`
	
}