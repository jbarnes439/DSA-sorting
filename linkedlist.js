class LinkedList {
    constructor() {
        this.head = this.tail = null
    }

    // add to end of list (tail)
    append(value) {
        if (!this.tail) {
            this.head = this.tail = new Node(value)
        } else {
            let oldTail = this.tail;
            this.tail = new Node(value);
            oldTail.next = this.tail;
            this.tail.prev = oldTail;
        }
    }

    // add to beginning of list (head)
    prepend(value) {
        // if list empty
        if (!this.head) {
            this.head = this.tail = new Node(value);
        } else {
            let oldHead = this.head;
            this.head = new Node(value);
            oldHead.prev = this.head;
            this.head.next = oldHead;
        }
    }

    // remove and return head
    popHead() {
        if (!this.head) {
            return null
        } else {
            let removedHead = this.head;
            // if 1 node left
            if (this.head === this.tail) {
                this.head = this.tail = null
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
            return removedHead.value
        }
    }

    // remove and return tail
    deleteTail() {
        if (!this.tail) {
            return null;
        } else {
            let removedTail = this.tail;
            // if 1 node left
            if (this.head === this.tail) {
                this.head = this.tail = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
            return removedTail.value;
        }
    }

    search(value) {
        let currentNode = this.head;

        while(currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        
        return null;
    }

    print() {
        // if empty return null
        if (this.head === null) {
            return null;
        }

        // if not empty iterate over each node and print value
        let current = this.head;

        // iterate until current.next is null
        while (current.next) {            
            console.log(current.value)
            if (current.next) {
                console.log( ' -> ');                
                current = current.next;
            }
            console.log(current.value);
            break                        
        }
    }

}

class Node {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev || null;
        this.next = next || null;
    }
}

let list = new LinkedList();
list.append(1)
list.append(1)
list.append(2)
list.append(2)
list.append(3)
// console.log(list);
// console.log(list.search(2));

// console.log(list.popHead());
console.log('something')
list.print();