import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

export const Words = new Mongo.Collection('words');

Meteor.methods({

    WordsSubmit(word, lang) {

        Words.insert({

            isAccepted: false,
            word: word,
            lang: lang,
            random: Math.random()

        });

    }

});