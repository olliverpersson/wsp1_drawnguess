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

## Kravspecifikation:

Måste:
- [x] En yta att rita på
- [x] Ritytan synkas med andra spelare
- [x] Möjlighet att gå med i spel
- [x] Skapa ett nytt spel
- [x] Möjlighet att gissa ord
- [x] Få poäng om det gissade ordet var rätt

Bör:
- [x] Logga in och skapa nya användare
- [x] Enkelt att använda med okej design
- [x] Enkelt och intuitivt sätt att rita på

Bra:
- [] Skicka länk till någon som inte har ett konto för att spela
- [] Visa det som ritas på en stor skärm, typ Kahoot
- [] Avregistrera användare
- [] Skicka verifieringsmail vid registrering av konto
- [] Visa felmeddelanden
- [] Hämta ord att rita från en ordboks-api

### Kända problem & buggar

* Ritytan( Canvas-elementet ) ändrar inte storlek när fönstret gör det
* Touch fungerar dåligt med ritytan
* Ritytan kan ibland visas utanför fönstret
* Det går att lägga till spelare som inte finns

## Installera och kör på din maskin

1. Installera meteor och git.

  `sudo apt-get install git`

  `curl https://install.meteor.com/ | sh`
  
2. Klona detta repository till en mapp

3. Kör kommandot för att starta servern, i projektmappen

  `meteor`
  
Meteor kommer starta allt som behövs (databas, nodejs etc) 
 
4. Gå till localhost:3000 och testa appen
