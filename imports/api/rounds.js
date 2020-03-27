import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

export const Rounds = new Mongo.Collection('rounds');

if ( Meteor.isServer ) {

	Meteor.publish('rounds',
		function (id) {

			return Rounds.find({gameId: id});

		});


}
