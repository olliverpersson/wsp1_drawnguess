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

			return Games.find({ players: { $elemMatch: {username: Meteor.user().username} } });	
		
		});
	Meteor.publish('games.one',
		function(id) {

		let data = Games.find({"_id": id});
		return data

	});

}

Meteor.methods({

	GamesCreate(gameData) {

		if( Meteor.user() ) {
			
			//TODO: clean data from client

			let game = {

				...gameData,
				players: [ { username: Meteor.user().username, score: 0 } ],
				owner: Meteor.user().username,
				createdAt: new Date(),
				isArchived: false

			}

			Games.insert(game, (error, id) => {

				if (!error) {

					Meteor.call('RoundsCreate', id);

				}

			});

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

	}

});
