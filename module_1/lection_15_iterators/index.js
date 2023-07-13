// iterator
const obj = {
    a: 1,
    b: 2,

    __proto__: {
        createIterator() {
            const keys = Object.keys(this);
            let cursor = 0

            return {
                next: () => {
                    const res = {
                        value: this[keys[cursor]],
                        done: cursor >= keys.length
                    };

                    cursor++
                    return res;
                }
            };
        }
    }
};

const i = obj.createIterator()
console.log(i);
console.log(i.next());
console.log(i.next());
console.log(i.next());

for (let iter = obj.createIterator(), i = iter.next(); !i.done; i = iter.next()) {
    console.log(i.value);
}