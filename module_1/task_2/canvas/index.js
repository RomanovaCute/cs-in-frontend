// Написать фильтры для изображения в Canvas

//    js
//    // Необходимо написать функции, которые бы принимали ссылку на изображение или canvas и применяла бы к нему один из эффектов.
//    // Например, инверсия цветов или оттенки серого. Для реализации эффектов, необходимо использовать методы Canvas getImageData/putImageData
//    // и работа с цветами пикселей. Возвращать такая функция может ссылку на Canvas или ImageData.
   
//    const grayscaled = grayscale('/myImage.jpeg');
//    const inversed = inverse(grayscaled);

// Uint8ClampedArray
// Uint8Array

// getImageData() // {data: Uint8ClmpedArray} // [0] [1] [2] [3] | [0] [1] [2] [3] - 'это матрица

// | 255 | 45 | 0   | 1 |
// | 23  | 4  | 156 | 0 |
// каждая строка - это один пиксель (красный | зеленый | голубой | прозрачность)
// (8 / 0) + 8 % 3 => получим индекс нужного элемента
// (x, y) = (0, 3) - координаты

// class Matrix {
//     buffer;

//     constructor(x, y){
//         this.buffer = new Uint8ClampedArray(x*y)
//     }

//     get(x, y){
//         this.buffer[Math.floor(y/x + y % x)]
//     }
// }
const getScaledDimensions = (img, maxWidth, maxHeight) => {
    const scaled = {
        ratio: img.width / img.height,
        width: img.width,
        height: img.height
    }
  
    if (scaled.width > maxWidth) {
        scaled.width = maxWidth;
        scaled.height = scaled.width / scaled.ratio;
    }
  
    if (scaled.height > maxHeight) {
        scaled.height = maxHeight;
        scaled.width = scaled.height / scaled.ratio;
    }
  
    return scaled;
  }

let imgData;
let data;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const handleFiles = (e) => {

    const img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);

    img.onload = function() {
        const scaled = getScaledDimensions(img, 300, 600);
  
        ctx.canvas.width = scaled.width;
        ctx.canvas.height = scaled.height;
  
        ctx.drawImage(img, 0, 0, ctx.canvas.width, canvas.height);
  
        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        ctx.putImageData(imgData, 0, 0);
    }
}

const invertImage = () => {
    data = imgData.data
    console.log(data);
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    ctx.putImageData(imgData, 0, 0);
}

const grayImage = () => {
    data = imgData.data
    for (let i = 0; i < data.length; i += 4) {
		const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;

		data[i] = gray; // RED
		data[i + 1] = gray; // GREEN
		data[i + 2] = gray; // BLUE
	}

    ctx.putImageData(imgData, 0, 0);
}

const resetImage = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const invertBtn = document.querySelector('.invert');
invertBtn.addEventListener('click', invertImage);
  
const input = document.getElementById('input');
input.addEventListener('change', handleFiles);

const grayBtn = document.querySelector('.gray');
grayBtn.addEventListener('click', grayImage);

const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', resetImage);