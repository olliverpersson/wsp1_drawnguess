import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {

	Meteor.publish('games.all',
		function () {

			return Games.find({});

		});
	Meteor.publish('games.one',
		function(id) {

		return Games.findOne({_id: id});

	});


}

Meteor.methods({

	GamesCreate(gameData) {

		//TODO: clean data from client

		let game = {

			...gameData,
			createdAt: new Date(),
			isArchived: false

		}

		console.log(game);

		Games.insert(game);

	}

});
