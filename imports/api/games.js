import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

import { Words } from '/imports/api/words';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {

	Meteor.publish('games.all', function () {

		return Games.find({
			players: { $elemMatch: {username: Meteor.user().username } } }, 
			{ fields: { title: 1, players: 1, owner: 1  } });	
		
		});

	Meteor.publish('games.one', function(gameId) {

		return Games.find(
			{"_id": gameId},
			{ fields: { canvas: 0 } });

	});

	Meteor.publish('games.canvas', function(gameId) {

		return Games.find(
			{"_id": gameId},
			{ fields: { canvas: 1 } });

	});

	/*Meteor.publish('games.word', function(gameId){

		let data = Games.find(
			{"_id": gameId},
			{ fields: { word: 1, player: 1 } } );
		return data

	});*/

}

Meteor.methods({

	GamesCreate(gameData) {

		if( Meteor.user() ) {
			
			// Hämta ett nytt, random ord
			let word = Words.findOne( 
				{ lang: 'sv', isAccepted: true, random: { $gt: Math.random() } } );

			// Skapar speldokumentet
			let game = {

				title: gameData.title,
				players: [ { username: Meteor.user().username, score: 0 } ],
				owner: Meteor.user().username,
				createdAt: new Date(),
				isArchived: false,
				canvas: "",
				currPlayer: Meteor.user().username,
				word: word.word

			}

			// Lägger till dokumentet i databasen
			Games.insert(game);

		}

	},
	GamesAddPlayer(gameid, username) {

		if( Meteor.user() ) {

			let game = Games.findOne( { _id: gameid } );
			let exists = false;

			for ( let player in game.players ) {

				if( player.username == username ) {

					exists = true;

				}

			};

			if( !exists ) {

				game.players.push({username: username, score: 0})

				Games.update( 
					{ _id: gameid  }, 
					{ $set: { players: game.players } }
				);

			}

		}

	},
	GamesSetDrawing(gameId, canvasData) {

		Games.update( gameId, { $set: { canvas: canvasData } } );

	},
	GamesGuessWord(gameId, guess) {

		let game = Games.findOne( { "_id": gameId }, { fields: { word: 1, players: 1 } } );

		if( guess == game.word ) {

			let newWord = Words.findOne( 
				{ lang: 'sv', isAccepted: true, random: { $gt: Math.random() } } );

			// In the current game, increase score of player by one
			Games.rawCollection().update( 
				{ "_id": gameId }, 
				{ $inc: { "players.$[playerQuery].score": 1 }, 
			      $set: { word: newWord.word, canvas: "", currPlayer: game.players[ Math.floor(Math.random() * game.players.length) ].username } },
				{ arrayFilters: [ { 'playerQuery.username': Meteor.user().username } ] }, (error) => {

					console.log("error", error);

				} );

		}

	}

});
