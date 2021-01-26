function createStack() {
    return {
        data: [],
        push: function (element) {
            this.data.push(element);
        },
        pop: function () {
            return this.data.pop();
        },
        peek: function () {
            return this.data[data.length - 1];
        },
        isEmpty: function () {
            return this.data.length === 0;
        },
        clear: function () {
            this.data = [];
        },
        size: function () {
            return this.data.length;
        },
        getData: function () {
            return [...this.data];
        }
    }
}

function createQ() {
    return {
        stack1: createStack(),
        stack2: createStack(),
        enqueue: function (element) {
            this.stack1.push(element);
        },
        dequeue: function () {
            if (this.stack2.isEmpty()) {
                if (this.stack1.isEmpty()) {
                    return undefined;
                }
                while (!this.stack1.isEmpty()) {
                    this.stack2.push(this.stack1.pop());
                }
            }
            console.log(this.stack2.pop());
        }
    }
}