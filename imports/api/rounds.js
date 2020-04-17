import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

export const Rounds = new Mongo.Collection('rounds');

if ( Meteor.isServer ) {

	Meteor.publish('rounds',
		function (gameid) {

			//return Rounds.find({gameId: id});
			return Rounds.find({"gameId": gameid});

		});

}

Meteor.methods({

	RoundsCreate(gameId) {

		//TODO: clean data from client

		let round = {

			gameId: gameId,
			players: {},
			createdAt: new Date()

		}

		Rounds.insert(round);

	},
	RoundsSetScore(gameId) {



	}

});
