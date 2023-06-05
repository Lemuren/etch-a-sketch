"use strict"
const CANVAS_SIZE = 640;

let chosenColor = 'black';
let pixelSize = 32;
let isMouseDown = false;

document.body.onmousedown = () => isMouseDown = true;
document.body.onmouseup = () => isMouseDown = false;


function paint(e) {
    if ((isMouseDown) || (e.type == 'mousedown'))
        e.target.style.cssText += `background: ${chosenColor}`;
}

function chooseColor(color) {
    chosenColor = color;
}


function createCanvas() {
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
        canvas.append(pixel);
    }
}

function setPixelSize(size) {
    let clear = confirm('Warning: This will clear the canvas!');
    if (clear) {
        pixelSize = CANVAS_SIZE / size;
        createCanvas();
    }
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
