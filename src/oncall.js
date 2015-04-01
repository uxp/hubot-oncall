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
            days = {       //  S  M  T  W  T  F  S
                'sunday':    [ 0, 1, 2, 3, 4, 5, 6 ],
                'monday':    [ 6, 0, 1, 2, 3, 4, 5 ],
                'tuesday':   [ 5, 6, 0, 1, 2, 3, 4 ],
                'wednesday': [ 4, 5, 6, 0, 1, 2, 3 ],
                'thursday':  [ 3, 4, 5, 6, 0, 1, 2 ],
                'friday':    [ 2, 3, 4, 5, 6, 0, 1 ],
                'saturday':  [ 1, 2, 3, 4, 5, 6, 0 ]
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
            },
            getNext = function() {
                return getCurrent().next;
            };


        robot.respond(new RegExp("who((?:\')s?|(?:\\s)?(?:was|is))\\s+oncall(?:\\s)?(?:last|on)?(?:\\s+)?(" + Object.keys(days).join('|') + ")", 'i'), function(msg) {
            var tense = (msg.match[1] || "").trim(),
                when = (msg.match[2] || "").trim(),
                who = getCurrent(),
                today = new Date();


            if (tense.length == 0 || tense === "'s") tense = 'is';
            if (tense == 'is') {
                when = 'this ' + when;
            }
            if (tense == 'was') {
                when = 'last ' + when;
            }
            if (when.length == 0) return;


            console.log(who);
            msg.reply(robot.brain.userForId(who.data.id).name + " " + tense + " on call " + when);
            msg.finish();
        });

        robot.respond(new RegExp("who((?:\')s?|(?:\\s)?(?:was|is))\\s+oncall(?:\\s+)?(" + Object.keys(whens).join('|') + "){0,1}", 'i'), function(msg) {
            var tense = (msg.match[1] || "").trim(),
                when = (msg.match[2] || "").trim(),
                who = getCurrent();

            if (tense.length == 0 || tense === "'s") tense = 'is';
            if (when.length == 0) when = 'today';

            switch (when) {
                case 'yesterday':
                    who = getPrev();
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
