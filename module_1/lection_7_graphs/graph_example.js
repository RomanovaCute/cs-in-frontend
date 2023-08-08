const node1 = {
    value: 1
};

const node2 = {
    value: 2
}

const node3 = {
    value: 3
}

node1.next = node2;
node2.next = node3;
node3.next = node1;

