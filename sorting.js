function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

// bubble sort - not ideal way to sort average case O(n^2)
function bubbleSort(array) { 
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
}

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
}

// best, average, worst case all O(nlog(n))
function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        } 
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
}

// Quicksort best and average O(nlog(n)) worst O(n^2)
function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array
}

// mulitple partition algorithms, this is Lomuto's
function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array,i,j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
}

class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }

    find(item) {
        //Start at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // Check for the item
        while (currNode.value !== item) {
            // return null if it's the end of the list
            // and the item is not on the list
            if (currNode.next === null) {
                return null;
            }
            else {
                // Otherwise, keep looking
                currNode = currNode.next;
            }
        }
        // Found it
        return currNode;
    }

    remove(item) {
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // If the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // Start at the head
        let currNode = this.head;
        // Keep track of previous
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            // Save the previous node
            previousNode = currNode;
            currNode = currNode.next;
        }

        if(currNode == null) {
            console.log('Item not found');
            return
        }
        previousNode.next = currNode.next;
    }

    print() {
        // check if list empty
        if (this.head === null) {
            return null;
        };
        // if not empty, iterate over each node and print value
        let list = this.head;

        while (list) {
            console.log(list.value) 
            if (list.next) {
                console.log(' -> ');
                list = list.next;
            }
        }
    }
}

function linkedMergeSort(list) {
    if (list.length <= 1) return list;
    let mid = list.length / 2;
    let left = new LinkedList();
    let right = new LinkedList();

    let index = 1;
    let node = list.head;

    while (node != null) {
        if (index <= mid) {
            left.insertFirst(node.value)
        }
        else {
            right.insertFirst(node.value)
        }
        index++;
        node = node.next;
    }
    
    left = linkedMergeSort(left);
    right = linkedMergeSort(right);

    return merge(left, right);
}

function mergeLinkedList(left, right) {
    let result = new LinkedList();
    while ((left.length > 0) && (right.length > 0)) {
        if (left.head.value <= right.head.value) {
            result.push(left.remove(left.head));
        }
        else {
            result.push(right.remove(right.head));
        }
    }

    while (left.length > 0) {
        result.push(left.remove(left.head));
    }

    while (right.length > 0) {
        result.push(right.remove(right.head));
    }
}

let list = "89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5"

 
let newList = []
list.split(' ').map(l => newList.push(Number(l)))

console.log(mergeSort(newList));
console.log(quickSort(newList));

// function main() {
//     let sortThis = new LinkedList();

//     sortThis.insertFirst(3);
//     sortThis.insertLast(1);
//     sortThis.insertFirst(4);
//     sortThis.insertFirst(6);

//     sortThis.print(sortThis);
// }

// main();
// console.log(main());