import { Meteor } from 'meteor/meteor'

import Games from 'games'

Meteor.methods({

	'games.create'({gameData}) {

		Games.insert(gameData);

	}

})
