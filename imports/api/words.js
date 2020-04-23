import {
	Meteor
} from 'meteor/meteor'
import {
	Mongo
} from 'meteor/mongo'

export const Words = new Mongo.Collection('words');

Meteor.methods({

    WordsGetRandom(lang) {

        let agg = Words.aggregate ( [ { $match: { lang: lang, isAccepted: true } }, { $sample: { size: 1 } } ] );

        console.log(agg);

        return agg.word

    },

    WordsSubmit(word, lang) {

        Words.insert({

            isAccepted: false,
            word: word,
            lang: lang,

        })

    }

});