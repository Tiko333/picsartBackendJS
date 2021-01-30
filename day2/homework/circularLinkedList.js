function createNode(value) {
    return {
        data: value,
        next: null
    }
}

function createList() {
    let head = {
        data: null,
        next: null
    };
    let current = null;
    return {
        add: function (value) {
            if (head.data === null) {
                head = value;
                current = head;
            } else {
                current.next = value;
                current = value;
            }
        },

        getHead: function () {
            return head;
        }
    }
}

let node1 = createNode(1);
let node2 = createNode(2);
let node3 = createNode(3);
let node4 = createNode(4);


let list = createList();
list.add(node1);
list.add(node2);
list.add(node3);
list.add(node4);
list.add(node2);

function isCircular(first, second) {
    while (second != null) {
        if (second === first) {
            console.log("circular")
            return;
        }
        first = first.next;
        if (second.next != null) {
            second = second.next.next;
        } else {
            console.log('not circular');
            return;
        }

    }
    console.log('not circular')
}

isCircular(list.getHead(), list.getHead().next);


