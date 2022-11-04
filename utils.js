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
   }
	
}