(function() {
    var assert = require('assert'),
        Rotation = require('../src/rotation');

    suite('Rotation', function() {
        var rotation;

        setup(function() {
            rotation = new Rotation();
        });

        test("initially has 0 items", function() {
            assert(rotation.count == 0, "new rotation has 0 nodes");
        });

        test("adding a node", function() {
            rotation.append({value: 1, prev: null, next: null});

            assert(rotation.count == 1, "rotation has one node");
        });

        test("adding two nodes creates circular list", function() {
            rotation.append({value: 1, prev: null, next: null});
            rotation.append({value: 2, prev: null, next: null});

            assert(rotation.head.next == rotation.tail);
        });

        test("adding three nodes creates circular list also", function() {
            rotation.append({value: 1, prev: null, next: null});
            rotation.append({value: 2, prev: null, next: null});
            rotation.append({value: 3, prev: null, next: null});

            var node = rotation.head;
            assert(node.value == 1, "first node is 1");
            node = node.next;
            assert(node.value == 2, "second node is 2");
            node = node.next;
            assert(node.value == 3, "third node is 3");
            node = node.next;
            assert(node.value == 1, "fourth node is the first");
        });

        test("removing a node", function() {
            var node1 = { value: 1, prev: null, next: null };
            var node2 = { value: 2, prev: null, next: null };
            rotation.append(node1);
            rotation.append(node2);
            assert(rotation.count == 2, "list has two items");

            rotation.remove(node1);
            assert(rotation.count == 1, "list now has one item");
            assert(rotation.head == rotation.tail, "head and tail should be same");
        });

        test("removing a node from 3 node list", function() {
            var node1 = { value: 1, prev: null, next: null };
            var node2 = { value: 2, prev: null, next: null };
            var node3 = { value: 3, prev: null, next: null };
            rotation.append(node1);
            rotation.append(node2);
            rotation.append(node3);
            rotation.remove(node2);

            assert(rotation.count == 2, "list now has one item");
            assert(rotation.head == node1, "head is first item");
            assert(rotation.tail == node3, "tail is last item");
        });

        test("inserting a node", function() {
            var node1 = { value: 1, prev: null, next: null };
            var node2 = { value: 2, prev: null, next: null };
            var node3 = { value: 3, prev: null, next: null };
            var node4 = { value: 4, prev: null, next: null };

            rotation.append(node1);
            rotation.append(node2);
            rotation.append(node3);

            rotation.insert(node2, node4);
            var theNode = rotation.head;
            [ 1, 2, 4, 3 ].forEach(function(val, idx, values) {
                assert(theNode.value == val, "Value of node at index '" + idx + "' is '" + val + "'.");
                theNode = theNode.next;
            });
        });

    });
}).call(this);
