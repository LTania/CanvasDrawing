import { Canvas } from "./canvas.js";
import { Point } from "./point.js";
import { Figure } from "./figure.js";
const canvas = document.getElementById("myCanvas");
const myCanvas = new Canvas(canvas);
const xInput = document.getElementById("xVal");
const yInput = document.getElementById("yVal");
const countInput = document.getElementById("countPoints");
let pointsArr = [];
let isClicked = false;
document.addEventListener('DOMContentLoaded', createGrid);
function createGrid() {
    // draw vertical from X to Height
    for (let x = 0; x < myCanvas.getWidth(); x += myCanvas.getStep()) {
        // draw vertical line
        myCanvas.ctx.beginPath();
        myCanvas.ctx.moveTo(x, 0);
        myCanvas.ctx.lineTo(x, myCanvas.getHeight());
        myCanvas.ctx.stroke();
        // draw text
        myCanvas.ctx.fillText((x / myCanvas.getStep()).toString(), x, 10);
    }
    // draw horizontal from Y to Width
    for (let y = 0; y < myCanvas.getHeight(); y += myCanvas.getStep()) {
        // draw horizontal line
        myCanvas.ctx.beginPath();
        myCanvas.ctx.moveTo(0, y);
        myCanvas.ctx.lineTo(myCanvas.getWidth(), y);
        myCanvas.ctx.stroke();
        // draw text
        myCanvas.ctx.fillText((y / myCanvas.getStep()).toString(), 0, y);
    }
}
function getPosition(point) {
    let curleft = 0, curtop = 0;
    if (point.offsetParent) {
        do {
            curleft += point.offsetLeft;
            curtop += point.offsetTop;
        } while (point == point.offsetParent);
    }
    return new Point(curleft, curtop);
}
myCanvas.canvasEl.addEventListener("mousemove", function (e) {
    const pos = getPosition(this);
    let realX = e.pageX - pos.getX();
    let realY = e.pageY - pos.getY();
    realX = realX * this.width / this.clientWidth / 20;
    realY = realY * this.height / this.clientHeight / 20;
    xInput.value = realX.toFixed(1);
    yInput.value = realY.toFixed(1);
}, false);
myCanvas.canvasEl.addEventListener("click", function (e) {
    let countPoints = +countInput.value;
    const pos = getPosition(this);
    let realX = e.pageX - pos.getX();
    let realY = e.pageY - pos.getY();
    realX = realX * this.width / this.clientWidth;
    realY = realY * this.height / this.clientHeight;
    pointsArr.push(new Point(realX, realY));
    if (!isClicked) {
        isClicked = true;
        myCanvas.ctx.clearRect(0, 0, myCanvas.getWidth(), myCanvas.getHeight());
        createGrid();
        myCanvas.ctx.fillRect(realX, realY, 1, 1);
        myCanvas.ctx.moveTo(realX, realY);
    }
    else {
        myCanvas.ctx.fillRect(realX, realY, 1, 1);
        myCanvas.ctx.lineTo(realX, realY);
        myCanvas.ctx.stroke();
    }
    if (pointsArr.length === countPoints) {
        myCanvas.ctx.lineTo(pointsArr[0].getX(), pointsArr[0].getY());
        myCanvas.ctx.stroke();
        isClicked = false;
        const figure = new Figure(pointsArr);
        const area = figure.getArea();
        const perimeter = figure.getPerimeter();
        document.getElementById('area').value = area.toFixed(2);
        document.getElementById('perimeter').value = perimeter.toFixed(2);
        pointsArr.length = 0;
    }
}, false);
