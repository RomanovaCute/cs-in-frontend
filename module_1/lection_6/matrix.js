class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.buffer = new Array(rows * cols);
    }

    get(row, col) {
        return this.buffer[this.#getIndex(row, col)];
    }

    set(row, col, value) {
        return this.buffer[this.#getIndex(row, col)] = value;
    }

    #getIndex(row, col) {
        return row * this.cols + col
    }
}

let mat = new Matrix(1, 1)

mat.set(1, 1, 5)

console.log(mat.get(1, 1));
console.log(mat);