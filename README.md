# node-express-mongodb-html-css-farmacy

# Obiettivo: 
L'obiettivo del progetto è quello di creare un'applicazione web in grado di restituire la farmacia di Milano più vicina in base alle coordinate geografiche oppure ad un indirzzo.

# La versione base: 
Consente dato una posizione geografica (latitudine e longitudine) di sapere la farmacia più vicina.

Input: [45.459839, 9.147159] 

Output: Farmacia S. Caterina Dott.ssa Protasoni Gloria Luisa Maria 

# La versione avanzata: 
Consente dato un indirizzo di sapare la farmacia più vicina e permette di conoscere il tempo a piedi e in macchina necessario per raggiungerla (la velocità stimata a piedi è di 0,900 metri al secondo e di 2 metri al secondo in macchina considerando le statistiche in base traffico nel centro della città di Milano)

Input: Via Gardone 22 Milano

Output: Azienda Farmaceutica Municipale n.13 

Travel times: 5min (walk), 3min (car) 

# Stack:
Frontend: HTML, CSS

Backend: Node.js, Express, MongoDB

Strumenti: GitHub, VSCode, CLI 

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

- è necessario inoltre installare mongodb in locale o collegarsi in remote per creare un db di nome 'farmacy' una collection di nome 'farmacy' e popolarlo (add data -> insert document) con le informazioni presenti a questo link https://dati.comune.milano.it/dataset/ds501_farmacie-nel-comune-di-milano (in particolare importando i dati dal formato geojson https://dati.comune.milano.it/dataset/ds501_farmacie-nel-comune-di-milano/resource/8cc1abb8-fe10-4f50-b7b4-e673250f34c6 presenti nel file source.txt), inoltre è necessario creare un indice sul field geometry.coordinates con il tipo (2DSPHERE)

- Cercando http://localhost:3000/public/app.html e scrivendo delle coordinate geografiche oppure un indirizzo comparirà il risultato.

# Interfaccia

<img src="https://github.com/enotarangelo/node-express-mongodb-html-css-farmacy/blob/main/public/img/cherry_farmacy1.png" width="1000"/>
<img src="https://github.com/enotarangelo/node-express-mongodb-html-css-farmacy/blob/main/public/img/cherry_farmacy2.png" width="1000"/>

## Risultato 
<img src="https://github.com/enotarangelo/node-express-mongodb-html-css-farmacy/blob/main/public/img/cherry_farmacy_ok.png" width="1000"/>

## Errore
<img src="https://github.com/enotarangelo/node-express-mongodb-html-css-farmacy/blob/main/public/img/cherry_farmacy_error.png" width="1000"/>

## Errore di connessione
<img src="https://github.com/enotarangelo/node-express-mongodb-html-css-farmacy/blob/main/public/img/cherry_farmacy_no_connection.png" width="1000"/>

# File:
- public: 
  - img: contiene le immagini dei loghi e dell'interfaccia 
  - app.html: è l'interfaccia dell'applicazione da dove è possibile svolgere le richieste 
  - error.html : è la pagine che appare in caso di errore relativo ai dati inseriti
  - no_connection.html: è la pagina che appare in caso di errore di connessione
  - app.css : contiene le istruzioni di formazzione per le pagine html
- server.js : è il server locale che elabora le richieste e apre la connesione al database
- database.js: permette di connettersi al database MongoDB
- dbFunctions.js: contiene le funzioni per interrogare il database MongoDB
- utils.js : contiene le funzioni utilizzate da server.js per filtrare e controllare l'input, calcolare la distanza tra due coordinate e gestire output del risultato
- Test.js consente di testare la correttezza di alcune funzioni con il modulo Mocha
