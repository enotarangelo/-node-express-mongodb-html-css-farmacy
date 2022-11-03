function result(farmacia, indirizzo, tel, feet, car ){
    document.getElementById('farmacia').innerHTML = farmacia;
    document.getElementById('indirizzo').innerHTML = 'Indirizzo: '+indirizzo;
    document.getElementById('tel').innerHTML = 'Numero di telefono: '+ tel;
    document.getElementById('feet').innerHTML = feet+' minuti a piedi';
    document.getElementById('car').innerHTML =  car+' minuti in macchina';
}

function show_result(farmacia, indirizzo, tel, feet, car) {
    result(farmacia, indirizzo, tel, feet, car)
    document.getElementById("result").style.display='inline';
}

function hide_result() {
    document.getElementById("result").style.display='none';
}




