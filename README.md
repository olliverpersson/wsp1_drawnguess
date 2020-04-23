# Projekt 1: Gissa ordet-spel

Det här projektet var från början tänkt att vara en digital spelplan för när vi spelar kortspelen hjärter och plump på rasterna, men eftersom vi inte har några raster där vi träffar varandra fysiskt så finns det inte mycket poäng till det. Istället blev det ett spel där man gissar vad någon annan ritar.

## Tech Stack

Följande tekniker har använts:
* MongoDB - som databas, lagring av data
* Meteor - för att skicka data mellan klient och databas, bl.a.
* VueJS - för att visa data, hantera input etc på klientsidan

och även:

* Git - versionshantering, såklart
* HTML5 Canvas API - för ritandet
* NodeJS - Meteor är byggt på nodejs

## Installera och kör på din maskin

1. Installera meteor och git.

  `sudo apt-get install git`

  `curl https://install.meteor.com/ | sh`
  
2. Klona detta repository till en mapp

3. Kör kommandot för att starta servern, i projektmappen

  `meteor`
  
Meteor kommer starta allt som behövs (databas, nodejs etc) 
 
4. Gå till localhost:3000 och testa appen
