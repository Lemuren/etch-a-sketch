"use strict"
const CANVAS_SIZE = 640;

let chosenColor = 'black';
let pixelSize = 32;
let isMouseDown = false;
let drawGrid = true;

document.body.onmousedown = () => isMouseDown = true;
document.body.onmouseup = () => isMouseDown = false;

document.querySelector('.toggle-grid').addEventListener('click', toggleGrid);



function paint(e) {
    if ((isMouseDown) || (e.type == 'mousedown'))
        e.target.style.cssText += `background: ${chosenColor}`;
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
    const canvas = document.querySelector('.canvas');
    drawGrid = true;

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
        canvas.append(pixel);
    }
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
