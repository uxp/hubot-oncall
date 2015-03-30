/**
 *
 */

require('coffee-script/register');
(function() {
    "use strict";

    var assert  = require('assert'),
        sinon   = require('sinon'),
        Hubot   = require('hubot/src/robot'),
        Message = require('hubot/src/message').TextMessage;

    suite("OnCall", function() {
        var robot, user, data = {};

        suite("responses", function() {

            suite("relative days:", function() {

                setup(function() {
                    data = {
                        userorder: [
                            { id: 1231210 },
                            { id: 1231211 },
                            { id: 1231212 },
                            { id: 1231213 }
                        ],
                        current: 1231212
                    };
                    robot = new Hubot(null, 'mock-adapter', false);
                    robot.brain.set('oncall', data);

                    robot.adapter.on('connected', function() {
                        sinon.spy(robot, "respond");
                        sinon.spy(robot, "hear");
                        require('../src/oncall')(robot);

                        user = robot.brain.userForId('1', {
                            name: 'user',
                            room: '#test'
                        });
                    });
                    robot.run();
                });

                teardown(function() {
                    robot.respond.restore();
                    robot.hear.restore();
                    robot.shutdown();
                })

                test("'who was oncall yesterday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/was on call yesterday/i.test(strings[0]), "matched 'was on call yesterday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who was oncall yesterday"));
                });

                test("'who was oncall yesterday?'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/was on call yesterday/i.test(strings[0]), "matched 'was on call yesterday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who was oncall yesterday?"));
                });

                test("'who's oncall'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call today/i.test(strings[0]), "matched 'is on call today'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who's oncall"));
                });

                test("'who's oncall today'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call today/i.test(strings[0]), "matched 'is on call today'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who's oncall today"));
                });

                test("'whos oncall today'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call today/i.test(strings[0]), "matched 'is on call today'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who's oncall today"));
                });

                test("'who's oncall tomorrow'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call tomorrow/i.test(strings[0]), "matched 'is on call tomorrow'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who's oncall tomorrow"));
                });

                test("'who is oncall'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call today/i.test(strings[0]), "matched 'is on call today'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall"));
                });

                test("'who is oncall?'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call today/i.test(strings[0]), "matched 'is on call today'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall?"));
                });

                test("'who is oncall today'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call today/i.test(strings[0]), "matched 'is on call today'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall today"));
                });

                test("'who is oncall tomorrow'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call tomorrow/i.test(strings[0]), "matched 'is on call tomorrow'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall tomorrow"));
                });

                test("'who is oncall tomorrow?'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call tomorrow/i.test(strings[0]), "matched 'is on call tomorrow'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall tomorrow"));
                });

            });

            suite("days of the week:", function() {

                setup(function() {
                    data = {
                        userorder: [
                            { id: 1231210 },
                            { id: 1231211 },
                            { id: 1231212 },
                            { id: 1231213 }
                        ],
                        current: 1231212
                    };
                    robot = new Hubot(null, 'mock-adapter', false);
                    robot.brain.set('oncall', data);

                    robot.adapter.on('connected', function() {
                        sinon.spy(robot, "respond");
                        sinon.spy(robot, "hear");
                        require('../src/oncall')(robot);

                        user = robot.brain.userForId('1', {
                            name: 'user',
                            room: '#test'
                        });
                    });
                    robot.run();
                });

                teardown(function() {
                    robot.respond.restore();
                    robot.hear.restore();
                    robot.shutdown();
                });

                // Monday:
// {{{
                test("'who's oncall on monday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call this monday/i.test(strings[0]), "matched 'is on call this monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who's oncall on monday"));
                });

                test("'who is oncall on monday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call this monday/i.test(strings[0]), "matched 'is on call this monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall on monday"));
                });

                test("'who was oncall last monday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/was on call last monday/i.test(strings[0]), "matched 'was on call last monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who was oncall last monday"));
                });

                test("'who was oncall monday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/was on call last monday/i.test(strings[0]), "matched 'was on call last monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who was oncall monday"));
                });

                test("'who is oncall monday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call this monday/i.test(strings[0]), "matched 'is on call this monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall monday"));
                });
// }}}

                // Tuesday:
// {{{
                test("'who's oncall on tuesday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call this tuesday/i.test(strings[0]), "matched 'is on call this monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who's oncall on tuesday"));
                });

                test("'who is oncall on tuesday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call this tuesday/i.test(strings[0]), "matched 'is on call this monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall on tuesday"));
                });

                test("'who was oncall last tuesday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/was on call last tuesday/i.test(strings[0]), "matched 'was on call last monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who was oncall last tuesday"));
                });

                test("'who was oncall tuesday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/was on call last tuesday/i.test(strings[0]), "matched 'was on call last monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who was oncall tuesday"));
                });

                test("'who is oncall tuesday'", function(done) {
                    robot.adapter.on('reply', function(envelope,strings) {
                        assert(/is on call this tuesday/i.test(strings[0]), "matched 'is on call this monday'");
                        done();
                    });

                    robot.adapter.receive(new Message(user, "hubot: who is oncall tuesday"));
                });
// }}}

                // We can assume that if we're matching correctly by now, we
                // don't need to test every day of the week.
            });

        });

        suite("relative date resolution", function() {

            setup(function() {
                user = [];
                data = {
                    userorder: [
                        { id: 1231210 },  // user1
                        { id: 1231211 },  // user2
                        { id: 1231212 },  // user3
                        { id: 1231213 }   // user4
                    ],
                    current: 1231212      // user3
                };
                robot = new Hubot(null, 'mock-adapter', false);
                robot.brain.set('oncall', data);

                robot.adapter.on('connected', function() {
                    sinon.spy(robot, "respond");
                    sinon.spy(robot, "hear");
                    require('../src/oncall')(robot);

                    user.push( robot.brain.userForId(1231210, { name: 'user1', room: '#test' }) );
                    user.push( robot.brain.userForId(1231211, { name: 'user2', room: '#test' }) );
                    user.push( robot.brain.userForId(1231212, { name: 'user3', room: '#test' }) );
                    user.push( robot.brain.userForId(1231213, { name: 'user4', room: '#test' }) );
                });
                robot.run();
            });

            teardown(function() {
                robot.respond.restore();
                robot.hear.restore();
                robot.shutdown();
            });

            test("yesterday returns previous day's user", function(done) {
                robot.adapter.on('reply', function(envelope,strings) {
                    assert(/user2/.test(strings[0]));
                    done();
                });
                robot.adapter.receive(new Message(user[0], "hubot: who was oncall yesterday?"));
            });

            test("today returns current day's user", function(done) {
                robot.adapter.on('reply', function(envelope,strings) {
                    assert(/user3/.test(strings[0]));
                    done();
                });
                robot.adapter.receive(new Message(user[0], "hubot: who is oncall?"));
            });

            test("yesterday returns previous day's user", function(done) {
                robot.adapter.on('reply', function(envelope,strings) {
                    assert(/user4/.test(strings[0]));
                    done();
                });
                robot.adapter.receive(new Message(user[0], "hubot: who's oncall tomorrow?"));
            });

        });

    });

}).call(this);
