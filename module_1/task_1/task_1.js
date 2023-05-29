// Написать функцию, которая принимает Uint8Array и позволяет обратиться к биту конкретного элемента

// const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// // Второй параметр это порядок бита "справа-налево"
// console.log(bitGetter.get(0, 1)); // 1
// console.log(bitGetter.get(1, 1)); // 0
// 

// Расширить функцию из прошлого задания возможностью изменять значение конкретного бита

// const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

// // Второй параметр это порядок бита "справа-налево"
// console.log(bitAccessor.set(0, 1, 0)); // 
// console.log(bitAccessor.get(0, 1));    // 0

class Unit8Array {
    constructor(unit8Array){
        this.unit8Array = unit8Array;
        this.arrLength = unit8Array.length;
    }

    isValid(arrIndex, bitIndex){
        if (arrIndex < 0 || arrIndex >= this.arrLength) {
            throw new Error(`Допустимо использовать индексы в диапазоне от 0 до ${this.arrLength - 1} включительно.`)
        }
        if (bitIndex < 0 || bitIndex > 7) {
            throw new Error('Uint8Array может содержать не более 8 битов.')
        }
    }

    // обращение к биту элемента и определение его значения
    get(arrIndex, bitIndex){
        this.isValid(arrIndex, bitIndex)
        return (this.unit8Array[arrIndex] & (1 << bitIndex)) != 0 ? 1 : 0;
    }

    // изменение значение конкретного бита
    set(arrIndex, bitIndex, value){
        this.isValid(arrIndex, bitIndex)
        value === 1 ? this.setBit(arrIndex, bitIndex) : this.resetBit(arrIndex, bitIndex)
    }

    // замена бита на 1 (единицу)
    setBit(arrIndex, bitIndex){
        return this.unit8Array[arrIndex] |= (1 << bitIndex)
    }

    // замена бита на 0 (ноль)
    resetBit(arrIndex, bitIndex){
        return this.unit8Array[arrIndex] &=~ (1 << bitIndex)
    }
}

const createBitAccessor = (unit8Array) => {
    return new Unit8Array(unit8Array)
}

const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]))

console.log(bitGetter.get(0, 1))
console.log(bitGetter.get(1, 1));

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]))
console.log(bitAccessor.set(0, 1))