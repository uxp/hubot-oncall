
module.exports = (function() {

    /**
     * Generic cirular linked list. Pretty basic.
     *
     * @constructor
     */
    function Rotation(data) {
        this.head  = null;
        this.tail  = null;
        this.count = 0;
        if (data) {
            data.userorder.forEach(function(user,idx) {
                this.append({data: user});
            }, this);
        }
    };


    /**
     * Adds a node to the list
     *
     * @param {obj} node - The JS object to add to the list.
     */
    Rotation.prototype.append = function(node) {
        if (this.count === 0) {
            node.prev = node;
            node.next = node;
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            node.next = this.head;
            this.head.prev = node;
            this.tail.next = node;
            this.tail = node;
        }
        this.count++;
    };

    /**
     * Inserts a node into the list after the specified existing node
     *
     * @param {obj} node - The existing node for positional reference.
     * @param {obj} newNode - The new node to be added to the list.
     */
    Rotation.prototype.insert = function(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        node.next.prev = newNode;
        node.next = newNode;
        if (newNode.prev == this.last)
            this.last = newNode;
        this.count++;
    };

    /**
     * Removes a node from the list
     *
     * @param {obj} node - The node to be removed from the list.
     */
    Rotation.prototype.remove = function(node) {
        if (this.count > 1) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            if (node == this.head)
                this.head = node.next;
            if (node == this.tail)
                this.tail = node.prev;

        } else {
            this.head = null;
            this.tail = null;
        }
        node.prev = null;
        node.next = null;
        this.count--;
    };


    return Rotation;
}).call(this);
