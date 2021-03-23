import {Canvas} from "./canvas.js"
import {Point} from "./point.js"
import {Figure} from "./figure.js";

const canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
const myCanvas: Canvas = new Canvas(canvas);
const xInput: HTMLInputElement = document.getElementById("xVal") as HTMLInputElement;
const yInput: HTMLInputElement = document.getElementById("yVal") as HTMLInputElement;
const countInput: HTMLInputElement = document.getElementById("countPoints") as HTMLInputElement;
let pointsArr: Point[] = [];
let isClicked: boolean = false;
document.addEventListener('DOMContentLoaded', createGrid);

function createGrid(): void{
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
        myCanvas.ctx.fillText((y / myCanvas.getStep()).toString() , 0, y);
    }
}

function getPosition(point: HTMLElement): Point {
    let curleft: number = 0,
        curtop: number = 0;
    if (point.offsetParent) {
        do {
            curleft += point.offsetLeft;
            curtop += point.offsetTop;
        } while (point == point.offsetParent);
    }
    return new Point(curleft, curtop)
}

myCanvas.canvasEl.addEventListener("mousemove", function (e: MouseEvent){
    const pos: Point = getPosition(this);
    let realX: number = e.pageX - pos.getX();
    let realY: number = e.pageY - pos.getY();
    realX = realX * this.width / this.clientWidth/20;
    realY = realY * this.height / this.clientHeight/20;
    xInput.value = realX.toFixed(1);
    yInput.value = realY.toFixed(1);
}, false)

myCanvas.canvasEl.addEventListener("click", function (e: MouseEvent){
    let countPoints: number = +countInput.value;
    const pos: Point = getPosition(this);
    let realX: number = e.pageX - pos.getX();
    let realY: number = e.pageY - pos.getY();
    realX = realX * this.width / this.clientWidth;
    realY = realY * this.height / this.clientHeight;
    pointsArr.push(new Point(realX, realY));
    if(!isClicked){
        isClicked = true;
        myCanvas.ctx.clearRect(0,0, myCanvas.getWidth(), myCanvas.getHeight());
        createGrid();
        myCanvas.ctx.fillRect(realX,realY,1,1)
        myCanvas.ctx.moveTo(realX,realY);
    } else {
        myCanvas.ctx.fillRect(realX,realY,1,1)
        myCanvas.ctx.lineTo(realX,realY);
        myCanvas.ctx.stroke();
    }

    if(pointsArr.length === countPoints){
        myCanvas.ctx.lineTo(pointsArr[0].getX(), pointsArr[0].getY());
        myCanvas.ctx.stroke();
        isClicked=false;
        const figure: Figure = new Figure(pointsArr);
        const area:number = figure.getArea();
        const perimeter:number = figure.getPerimeter();
        (document.getElementById('area') as HTMLInputElement).value = area.toFixed(2);
        (document.getElementById('perimeter') as HTMLInputElement).value = perimeter.toFixed(2);
        pointsArr.length=0;
    }
}, false)
