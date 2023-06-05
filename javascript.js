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

// Set color of each of the colors in the color-picker.
const colorPickerButtons = document.querySelectorAll('.color-picker button');
for (let button of colorPickerButtons) {
    button.style.cssText += `background: ${button.id}`;
}

// Add a grid of pixels to the canvas.
for (let i = 0; i < (CANVAS_SIZE / pixelSize)**2; i++) {
    const canvas = document.querySelector('.canvas');

    let pixel = document.createElement('div');
    pixel.style.cssText = `width: ${pixelSize}px; height: ${pixelSize}px;`;
    pixel.addEventListener('mousedown', paint);
    pixel.addEventListener('mouseover', paint);
    canvas.append(pixel);

}
