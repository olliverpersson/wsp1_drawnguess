import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

import { Games } from '/imports/api/games';
import { Words } from '/imports/api/words';

export const Rounds = new Mongo.Collection('rounds');

if ( Meteor.isServer ) {

	Meteor.publish('round',
		function (gameid) {

			return Rounds.find({"gameId": gameid, isDone: false}, { sort: [['createdAt', 'desc']], limit: 1 } );

		});

}

Meteor.methods({

	RoundsCreate(gameId) {

		let game = Games.findOne(gameId, { fields: { players: 1 } });

		let word = Words.findOne( 
			{ lang: 'sv', isAccepted: true, random: { $gt: Math.random() } } );

		let round = {

			gameId: gameId,
			createdAt: new Date(),
			isDone: false,
			canvas: "",
			word: word.word,
			player: game.players[ Math.floor(Math.random() * game.players.length) ].username
		
		}

		Rounds.insert(round);

	},
	RoundsSetDrawing(roundId, canvasData) {

		Rounds.update( roundId, { $set: { canvas: canvasData } } );

	},
	RoundsGuessWord(roundId, word) {

		let round = Rounds.findOne( { gameId: gameId }, { fields: { word: 1 } } );

		if( word == round.word ) {

			// In the current game, increase score of player by one
			Games.update( round.gameId, 
				{ $inc: { "players.$[playerQuery].score": 1 } },
				{ arrayFilters: [ { playerQuery: { username: round.player } } ] } );

			// Set round to done and create a new
			Rounds.update( { gameId: gameId }, { $set: { isDone: true } } );

			Meteor.call('RoundsCreate', gameId);

		}

	}

});
