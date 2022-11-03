function string_to_coordinates(coordinates){
 try{
    let ris= coordinates.replace(' ', '').replace('[', '').replace(']', '').replace('"', '').replace('"', '');
    return ris.split(',').map(Number);
 }catch{
    throw 500;
 }

}

module.exports= string_to_coordinates;
