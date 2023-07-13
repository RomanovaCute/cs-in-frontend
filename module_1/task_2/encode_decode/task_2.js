// Написать функцию кодирования информации по схеме

//    ```js
//    const schema = [
//      [3, 'number'],  // 3 бита число
//      [2, 'number'],  // 2 бита число
//      [1, 'boolean'], // 1 бит логический
//      [1, 'boolean'], // 1 бит логический
//      [16, 'ascii']  // 16 бит 2 аски символа
//    ];
   
//    // Если данные не подходят схеме - выбрасывать исключения с пояснением.
//    // Результат - ArrayBuffer.
//    const data = encode([2, 3, true, false, 'ab'], schema);

const schema = [
    [3, 'number'],  // 3 бита число
    [2, 'number'],  // 2 бита число
    [1, 'boolean'], // 1 бит логический
    [1, 'boolean'], // 1 бит логический
    [16, 'ascii']  // 16 бит 2 аски символа (1 символ аски = 8 бит)
];

function normalizeSchema(schema) {
    return schema.flatMap(([size, type]) => {
        if(type === 'ascii') {
            const res =  new Array(size / 8)

            for(let i = 0; i<res.length; i++){
                res[i] = [{
                    type,
                    partial: i > 0
                }]
            }
            return res
        }
        return [[size, {type, partial: false}]]
    })
}

// функиця определяющая размер представления схемы (Uint8Array, Uint16Array или Uint32Array)
function getViewMaxSize (normalizedSchema) {
    return Math.max(...normalizedSchema.map(([size]) => {
        size <= 8 ? 8 : size <= 16 ? 16 : 32
    }))
}

// функция, определяющая, сколько элементов нужно в Uint8Array
function getOffsets(normalizedSchema) {
    const size = getViewMaxSize(normalizedSchema)
    const offsets = []

    loop: for (let i = 0, index = 0; i<normalizedSchema.length; index++) {
        let offset = 0
        
        while (offset + normalizedSchema[i][0] <= size) {
            const current = normalizedSchema[i]

            offsets.push([current[0], {...current[1], offset, index}])
            offset += current[0]
            i++

            if(i === normalizedSchema.length) {
                break loop;
            }
        }
    }
    return offsets
}

// функция, создающая маску. нужна для усечения числа (строку битов) до нужного размера, который указан в схеме
function createMask(size, offset = 0) {
    return (2 ** 32 - 1 >>> 32 - size) << offset
}

function encode(data, schema) {
    const normalizedSchema = normalizeSchema(schema)

    const size = getViewMaxSize(normalizedSchema)

    const offsets = getOffsets(normalizedSchema)

    const buffer = new globalThis[`Uint${size}Array`](offsets.at(-1)[1].index + 1)

    function* dataIterator() {
        for(const el of data){
            if (typeof el === 'string') {
                yield* el
            } else {
                yield el
            }
        }
    }

    const iter = dataIterator()

    offsets.forEach(([size, {offset, index, type}], ) => {
        const {value, done} = iter.next()

        if (done) {
            throw Error('Schema missmatch')
        }

        const bytes = type === 'ascii' ? value.charCodeAt(0) : value

        // if(bytes & createMask(size) !== bytes) {
        //     throw Error('Schema missmatch')
        // }

        buffer[index] |= (bytes & createMask(size)) << offset
    })
    return buffer.buffer
}

// нормализованная схема
// const normalizedSchema = [
//     [3, 'number'],
//     [2, 'number'],
//     [1, 'boolean'],
//     [1, 'boolean'],
//     [8, 'ascii'],
//     [8, 'ascii', {partial: true}] // флаг partial говорит, что данный символ является часть одного общего
// ]

// ДЕКОДИРОВАНИЕ
function decode(data, schema) {
    const normalizedSchema = normalizeSchema(schema)

    const size = getViewMaxSize(normalizedSchema)

    const offsets = getOffsets(normalizedSchema)

    const buffer = new globalThis[`Uint${size}Array`](data)

    const res = []

    offsets.forEach(([size, {offset, index, type, partial}], ) => {
        const bytes = (buffer[index] & createMask(size, offset)) >> offset;

        switch(type) {
            case 'number': res.push(bytes)
            break;

            case 'boolean': res.push(bytes > 0)
            break;

            case 'ascii': 
                const char = String.fromCharCode(bytes)

                if(partial) {
                    res[res.push - 1] += char
                } else {
                    res.push(char)
                }
                break;
        }
    })

    return res;

}

console.log(decode(encode([2, 3, true, false, 'ab'], schema), schema));