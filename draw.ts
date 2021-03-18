class Canvas{
    public canvasEl: HTMLCanvasElement;
    public ctx: any;
    private readonly step: number;
    private readonly width: number;
    private readonly height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvasEl = canvas;
        this.ctx = this.canvasEl.getContext("2d");
        this.step = 20;
        this.height= canvas.height;
        this.width = canvas.width;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillStyle = 'black';
        this.ctx.font = '8px Monospace';
    }

    public getWidth(): number{
        return this.width;
    }
    public getStep(): number{
        return this.step;
    }
    public getHeight(): number{
        return this.height;
    }
}

class Point{
    private readonly x: number;
    private readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}

class Figure{
    private readonly pointsPxl: Point[];
    private readonly points: Point[] = [];
    constructor(pointsPxl: Point[]) {
        this.pointsPxl = pointsPxl;
        this.pointsPxl.forEach((p:Point) => {
            const x = p.getX()/20;
            const y = p.getY()/10;
            this.points.push(new Point(x,y));
        });
    }

    public getArea(): number{
        let area: number = 0;
        let j: number,
            i: number;
        j = this.points.length - 1;
        for (i = 0; i < this.points.length; i++) {
            const crossProduct = this.points[i].getX() *  this.points[j].getY() -
                this.points[i].getY() *  this.points[j].getX();
            area = area + crossProduct;
            j = i;
        }
        area = Math.abs(area / 2);
        return area;
    }

    public getPerimeter(): number{
        let perimeter: number = 0;
        for( let k = 0; k < this.points.length-1; k++ ) {
            const xDiff = this.points[k+1].getX() - this.points[k].getX();
            const yDiff = this.points[k+1].getY() - this.points[k].getY();
            perimeter = perimeter +
                Math.pow( xDiff*xDiff +
                    yDiff*yDiff, 0.5 );
        }
        const lastXDiff = this.points[this.points.length-1].getX() - this.points[0].getX();
        const lastYDiff = this.points[this.points.length-1].getY() - this.points[0].getY();
        perimeter = perimeter +
            Math.pow( lastXDiff*lastXDiff +
                lastYDiff*lastYDiff, 0.5 );
        return perimeter;
    }
}

let canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
let myCanvas: Canvas = new Canvas(canvas);
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
        myCanvas.ctx.fillText((x / 20).toString(), x, 5);
    }
    // draw horizontal from Y to Width
    for (let y = 0; y < myCanvas.getHeight(); y += myCanvas.getStep()/2) {
        // draw horizontal line
        myCanvas.ctx.beginPath();
        myCanvas.ctx.moveTo(0, y);
        myCanvas.ctx.lineTo(myCanvas.getWidth(), y);
        myCanvas.ctx.stroke();
        // draw text
        myCanvas.ctx.fillText((y / 10).toString() , 0, y);
    }
}

function getPosition(point: any): Point | undefined{
    let curleft: number = 0,
        curtop: number = 0;
    if (point.offsetParent) {
        do {
            curleft += point.offsetLeft;
            curtop += point.offsetTop;
        } while (point = point.offsetParent);
        return new Point(curleft, curtop)
    }
    return undefined;
}

myCanvas.canvasEl.addEventListener("mousemove", function (e: MouseEvent){
    const pos: Point = getPosition(this);
    let realX: number = e.pageX - pos.getX();
    let realY: number = e.pageY - pos.getY();
    realX = realX * this.width / this.clientWidth/20;
    realY = realY * this.height / this.clientHeight/10;
    (document.getElementById("xVal") as HTMLInputElement).value = realX.toFixed(1);
    (document.getElementById("yVal") as HTMLInputElement).value = realY.toFixed(1);
}, false)

myCanvas.canvasEl.addEventListener("click", function (e: MouseEvent){
    let countPoints: number = +(document.getElementById("countPoints") as HTMLInputElement).value;
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
        myCanvas.ctx.moveTo(realX,realY);
    } else {
        myCanvas.ctx.lineTo(realX,realY);
        myCanvas.ctx.moveTo(realX,realY);
        myCanvas.ctx.stroke();
    }

    if(pointsArr.length === countPoints){
        myCanvas.ctx.lineTo(pointsArr[0].getX(), pointsArr[0].getY());
        myCanvas.ctx.stroke();
        isClicked=false;
        let figure: Figure = new Figure(pointsArr);
        let area:number = figure.getArea();
        let perimeter:number = figure.getPerimeter();
        (document.getElementById('area') as HTMLInputElement).value = area.toFixed(2);
        (document.getElementById('perimeter') as HTMLInputElement).value = perimeter.toFixed(2);
        pointsArr.length=0;
    }
}, false)
