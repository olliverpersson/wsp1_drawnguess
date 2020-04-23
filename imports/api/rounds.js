import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

import { Games } from '/imports/api/games';

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

		let word = Meteor.call('WordsGetRandom', 'sv')

		console.log(game);

		let round = {

			gameId: gameId,
			createdAt: new Date(),
			isDone: false,
			canvas: "",
			player: game.players[ Math.floor(Math.random() * game.players.length) ].username

		}

		Rounds.insert(round);

	},
	RoundsSetDrawing(roundId, canvasData) {

		console.log(roundId, canvasData)

		Rounds.update( { _id: roundId }, { $set: { canvas: canvasData } } );

	}

});
