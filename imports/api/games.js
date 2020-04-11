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

			let data = Games.find({});		
			console.log(data);
			return data
		
		});
	Meteor.publish('games.one',
		function(id) {

		let data = Games.find({"_id": id});
		console.log(data);
		return data

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
