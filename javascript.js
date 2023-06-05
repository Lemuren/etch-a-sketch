"use strict"
const CANVAS_SIZE = 640;

let chosenColor = 'black';
let pixelSize = CANVAS_SIZE / 32;
let isMouseDown = false;
let drawGrid = true;

let imageArray = new Array(pixelSize * pixelSize * 4);
const colors = {
    'aqua' : [0, 255, 255],
    'black' : [0, 0, 0],
    'blue' : [0, 0, 255],
    'fuchsia' : [255, 0, 255],
    'gray' : [128, 128, 128],
    'green' : [0, 128, 0],
    'lime' : [0, 255, 0],
    'maroon' : [128, 0, 0],
    'navy' : [0, 0, 128],
    'olive' : [128, 128, 0],
    'purple' : [128, 0, 128],
    'red' : [255, 0, 0],
    'silver' : [192, 192, 192],
    'teal' : [0, 128, 128],
    'white' : [255, 255, 255],
    'yellow' : [255, 255, 0]
};

document.body.onmousedown = () => isMouseDown = true;
document.body.onmouseup = () => isMouseDown = false;
document.querySelector('.toggle-grid').addEventListener('click', toggleGrid);
document.querySelector('#download').addEventListener('click', downloadImage);


function paint(e) {
    if ((isMouseDown) || (e.type == 'mousedown')) {
        e.target.style.cssText += `background: ${chosenColor}`;
        let index = 4 * +(e.target.id.substring(1));
        imageArray[index + 0] = colors[chosenColor][0];
        imageArray[index + 1] = colors[chosenColor][1];
        imageArray[index + 2] = colors[chosenColor][2];
        imageArray[index + 3] = 255;
    }

    

}

function chooseColor(color) {
    const buttons = document.querySelectorAll('.color-picker button');
    for (let button of buttons) {
        if (button.id == color)
            button.classList.add('active');
        else
            button.classList.remove('active');
    }
    chosenColor = color;
}

function toggleGrid() {
    const pixels = document.querySelectorAll('.canvas div');

    drawGrid = !drawGrid;
    for (let pixel of pixels) {
        pixel.style.cssText += drawGrid ? 'border-style: solid;' : 'border-style: none;';
    }

}


function createCanvas() {
    imageArray = new Array(CANVAS_SIZE / pixelSize * CANVAS_SIZE / pixelSize * 4);
    for (let i = 0; i < imageArray.length; i++)
        imageArray[i] = 255;
    const canvas = document.querySelector('.canvas');

    // Remove any existing children.
    while (canvas.lastChild) {
        canvas.removeChild(canvas.lastChild);
    }

    // Create the canvas of pixels.
    for (let i = 0; i < (CANVAS_SIZE / pixelSize)**2; i++) {
        let pixel = document.createElement('div');
        pixel.style.cssText = `width: ${pixelSize}px; height: ${pixelSize}px;`;
        pixel.addEventListener('mousedown', e => {e.preventDefault(); paint(e)});
        pixel.addEventListener('mouseover', paint);
        pixel.id = `p${i}`;
        canvas.append(pixel);
    }

    // Because toggleGrid toggles the grid we invert it before calling.
    drawGrid = !drawGrid;
    toggleGrid();
}

function setPixelSize(size) {
    let clear = confirm('Warning: This will clear the canvas!');
    if (!clear) return;

    pixelSize = CANVAS_SIZE / size;
    const buttons = document.querySelectorAll('.size-picker button');
    for (let button of buttons) {
        if (button.id == size)
            button.classList.add('active');
        else
            button.classList.remove('active');
    }

    createCanvas();
}

function downloadImage() {
    let image = document.createElement('canvas');
    image.height = CANVAS_SIZE / pixelSize;
    image.width  = CANVAS_SIZE / pixelSize;
    let context = image.getContext('2d');
    let imageData = context.createImageData(image.height, image.width);

    for (let i = 0; i < 4 * image.height * image.width; i++) {
        imageData.data[i] = imageArray[i];
    }

    console.log(imageData);

    context.putImageData(imageData, 0, 0);
    document.querySelector('#download').setAttribute('href', image.toDataURL('image/bmp'));
}








// Set color of each of the colors in the color-picker.
const colorPickerButtons = document.querySelectorAll('.color-picker button');
for (let button of colorPickerButtons) {
    button.style.cssText += `background: ${button.id}`;
    button.addEventListener('click', e => chooseColor(e.target.id));
}

// Add event listeners to the size picking buttons.
const sizeButtons = document.querySelectorAll('.size-picker button');
for (let button of sizeButtons) {
    button.addEventListener('click', e => setPixelSize(e.target.id));
}


createCanvas();
console.log(pixelSize);
