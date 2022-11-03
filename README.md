# node-express-mongodb-html-css-farmacy

# Obiettivo: 
L'obiettivo del progetto è quello di creare un'applicazione web in grado di restituire la farmacia di Milano più vicina in base a delle coordinate geografiche oppure un indirzzo.

# La versione base: 
Consente dato una posizione geografica (latitudine e longitudine) di sapere la farmacia più vicina 

Input: [45.459839, 9.147159] 

Output: Farmacia S. Caterina Dott.ssa Protasoni Gloria Luisa Maria 

# La versione avanzata: 
Consente dato un indirizzo di sapare la farmacia più vicina e conoscere il tempo a piedi e in macchina necessario per raggiungerla

Input: Via Gardone 22 Milano

Output: Azienda Farmaceutica Municipale n.13 

Travel times: 5min (walk), 3min (car) 

# Tecnologie:
front-end: HTML, CSS
back-end: nodejs, express, mongodb 

# File:
- public: 
  - img: contiene le immagini dei loghi
  - app.html: è l'interfaccia dell'applicazione da dove è possibile svolgere le richieste 
  - result.html : è la pagine risultato dove viene visualizzato il risultato della ricerca
  - app.css : contiene le istruzioni css con la grafica delle pagine html
- server.js : è il server locale 
- address_to_coordinates.js: restituisce le coordinate geografiche di un indirizzo
- distance.js: restituisce la distanza a piedi e in macchina tra due punti
- mongodb.js: restituisce i dati della farmacia più vicina (nome farmacia, indirizzo, latitudine e longitudine)
- utils.js : permette di filtrare input [latitudine, longitudine] restituendo un array di double con le coordinate 

# Per eseguire l'applicazione è necessario:
- Scaricare nodejs  [Node.js website](https://nodejs.org/) 
- Verificare la corretta installazione:
node --version
npm --version
- aprire un editor e invia il comando:
npm init
Segui gli step e rispondi alle domande
- Installa nodemon con il seguente comando: 
npm i -g nodemon
- Scaricare le dependencies presenti in package.json con il seguente comando:
npm i -g "nome dependencies"
- Eseguire il comando: 
npm start
- è necessario inoltre installare mongodb in locale o collegarsi in remote per creare un db di nome 'farmacy' e
popolarlo con le informazioni presenti a questo link https://dati.comune.milano.it/dataset/ds501_farmacie-nel-comune-di-milano
- Cercando localhost:3000 e scrindo delle coordinate geografiche oppure un indirizzo comparirà il risultato per ripetere la ricerca cliccare in alto a sinistra sulla ciliegia 
