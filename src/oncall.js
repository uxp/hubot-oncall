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
        var userData = robot.brain.get('oncall'),
            rotation = new Rotation(userData),
            _current = userData.current || 0,
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
            },
            getCurrent = function() {
                var node = rotation.head;
                while (node.data.id !== _current) {
                    node = node.next;
                }

                return node;
            },
            getPrev = function() {
                return getCurrent().prev;
            };
            getNext = function() {
                return getCurrent().next;
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

            switch (when) {
                case 'yesterday':
                    who = getPrev();
                    break;
                case 'today':
                    who = getCurrent();
                    break;
                case 'tomorrow':
                    who = getNext();
                    break;
            }

            msg.reply(robot.brain.userForId(who.data.id).name + " " + tense + " on call " + when);
            msg.finish();
        });

    }

}).call(this);
