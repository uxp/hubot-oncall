// Description:
//   Does on call stuff
//
// Commands:
//   hubot foo - does foo
//
module.exports = (function() {
    var Rotation = require('./rotation'),
        moment   = require('moment');

    return function(robot) {
        var rotation = new Rotation(),
            whens = {
                'yesterday': -1,
                'today':      0,
                'tomorrow':  +1
            },
            days = {
                'monday':     1,
                'tuesday':    2,
                'wednesday':  3,
                'thursday':   4,
                'friday':     5,
                'saturday':   6,
                'sunday':     7
            };

        robot.respond(new RegExp("who((?:\')s?|(?:\\s)?(?:was|is))\\s+oncall(?:\\s)?(?:last|on)?(?:\\s+)?(" + Object.keys(days).join('|') + ")", 'i'), function(msg) {
            // console.log('days', JSON.stringify(msg.match));
            var tense = (msg.match[1] || "").trim(),
                when = (msg.match[2] || "").trim(),
                who = "Hubot";

            if (tense.length == 0 || tense === "'s") tense = 'is';
            if (tense == 'was') when = 'last ' + when;
            if (tense == 'is') when = 'this ' + when;
            if (when.length == 0) return;

            msg.reply(who + " " + tense + " on call " + when);
            msg.finish();
        });

        robot.respond(new RegExp("who((?:\')s?|(?:\\s)?(?:was|is))\\s+oncall(?:\\s+)?(" + Object.keys(whens).join('|') + "){0,1}", 'i'), function(msg) {
            var tense = (msg.match[1] || "").trim(),
                when = (msg.match[2] || "").trim(),
                who = "Hubot";

            if (tense.length == 0 || tense === "'s") tense = 'is';
            if (when.length == 0) when = 'today';

            msg.reply(who + " " + tense + " on call " + when);
            msg.finish();
        });

        robot.respond(/oncall schedule/i, function(msg) {
            console.log(JSON.stringify(msg.match));
        });
        robot.respond(/oncall del\s+(.*)/i, function(msg) {
            console.log(JSON.stringify(msg.match));
        });
        robot.respond(/oncall add\s+(.*)/i, function(msg) {
            console.log(JSON.stringify(msg.match));
        });
        robot.respond(/foo/i, function(msg) {
            console.log(JSON.stringify(msg.match));
        });
    }

}).call(this);
