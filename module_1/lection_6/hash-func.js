function getHash(key) {
    if(typeof key === 'number') {
        return key;
    }

    if (typeof key === 'string') {
        return key.split(' ').reduce((res, char) => res + char.charCodeAt(0), 0)
    }
}

console.log(getHash('fd'));

//-----------------------------------------------------------------------------------
class HashTable {
    #hashFunction;
    #capacity;
    #buffer;

    // # - обозначает private поле или метод ES2020
    // желательно, чтобы capacity было простым числом, чтобы деление с остатком давало
    // более равномерное распределение, это связано с коллизиями

    constructor(hashFunction, capacity = 31) {
        this.#hashFunction = hashFunction;
        this.#capacity = capacity; //ёмкость
        this.#buffer = new Array(capacity).fill(null)
    }

    #getHash(key) {
        return this.#hashFunction(key) % this.capacity
    }

    set(key, value) {
        this.#buffer[this.#getHash(key)] = value;
    }

    get(key) {
        return this.#buffer[this.#getHash(key)]
    }
}

const hashMap = new HashTable(getHash);

hashMap.set('foo', 42)

console.log(hashMap.get('foo'));

//-----------------------------------------------------------------------------------
// Разные способы хэширования
const map = new Map();

map.set({}, 1);
map.set({}, 1);

console.log(...map); // [ {}, 1 ] [ {}, 1 ] просто с разными хэшами

// Примерный вариант реализации
function getRandomInt(min, max) {
    return Marh.floor(Math.random() * (min - max)) + min
}

Object.prototype.getHashCode = function () {
    if (this.hashCode != null) {
        return this.hashCode;
    }

    this.hashCode = getRandomInt(0, 2 ** 32 -1);
    return this.hashCode
}