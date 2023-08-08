class Node {
    constructor(value, prev) {
        this.value = value,
        this.next = null,
        this.prev = prev
    }
}

// Двухсвязный список
class DoubleLinkedList {
    constructor(first, last) {
        this.first = null,
        this.last = null
    }

    add(value) {
        const newNode = new Node(value, this.last)

        if (!this.first || !this.last) {
            this.first = newNode;
            this.last = newNode;
        
            return this;
          }
        
          this.last.next = newNode;
          this.last = newNode;
        
          return this;
        
    }

    iterator(){
        let current = this.first;

        while(current) {
            console.log(current.value);
            current = current.next;
        }
    }
}

const list = new DoubleLinkedList()

list.add(1)
list.add(2)
list.add(3)

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1

console.log(list);
list.iterator()