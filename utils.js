module.exports = {

   string_to_coordinates: (coordinates)=>{
      try{
         let ris= coordinates.replace(' ', '').replace('[', '').replace(']', '').replace('"', '').replace('"', '');
         return ris.split(',').map(Number);
      }catch{
         throw 500;
      }
     
     },


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
   
   html_result_end:`<a href="./public/app.html"><button type="button" style="background-color: #2F4858; border: none;  padding: 15px 32px; border-radius: 100px; color:#FFF; font-size: medium;">Nuova ricerca</button></a><br>
   </div>
 </body>`
	
}