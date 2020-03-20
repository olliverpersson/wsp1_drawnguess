import { Meteor } from 'meteor/meteor'

import Games from 'games'

Meteor.publish('games.all'), function () {

	return Games.find();

});
