var Canvas = /** @class */ (function () {
    function Canvas(canvas) {
        this.canvasEl = canvas;
        this.ctx = this.canvasEl.getContext("2d");
        this.step = 20;
        this.height = canvas.height;
        this.width = canvas.width;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillStyle = 'black';
        this.ctx.font = '8px Monospace';
    }
    Canvas.prototype.getWidth = function () {
        return this.width;
    };
    Canvas.prototype.getStep = function () {
        return this.step;
    };
    Canvas.prototype.getHeight = function () {
        return this.height;
    };
    return Canvas;
}());
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    return Point;
}());
var Figure = /** @class */ (function () {
    function Figure(pointsPxl) {
        var _this = this;
        this.points = [];
        this.pointsPxl = pointsPxl;
        this.pointsPxl.forEach(function (p) {
            var x = p.getX() / 20;
            var y = p.getY() / 10;
            _this.points.push(new Point(x, y));
        });
    }
    Figure.prototype.getArea = function () {
        var area = 0;
        var j, i;
        j = this.points.length - 1;
        for (i = 0; i < this.points.length; i++) {
            var crossProduct = this.points[i].getX() * this.points[j].getY() -
                this.points[i].getY() * this.points[j].getX();
            area = area + crossProduct;
            j = i;
        }
        area = Math.abs(area / 2);
        return area;
    };
    Figure.prototype.getPerimeter = function () {
        var perimeter = 0;
        for (var k = 0; k < this.points.length - 1; k++) {
            var xDiff = this.points[k + 1].getX() - this.points[k].getX();
            var yDiff = this.points[k + 1].getY() - this.points[k].getY();
            perimeter = perimeter +
                Math.pow(xDiff * xDiff +
                    yDiff * yDiff, 0.5);
        }
        var lastXDiff = this.points[this.points.length - 1].getX() - this.points[0].getX();
        var lastYDiff = this.points[this.points.length - 1].getY() - this.points[0].getY();
        perimeter = perimeter +
            Math.pow(lastXDiff * lastXDiff +
                lastYDiff * lastYDiff, 0.5);
        return perimeter;
    };
    return Figure;
}());
var canvas = document.getElementById("myCanvas");
var myCanvas = new Canvas(canvas);
var pointsArr = [];
var isClicked = false;
document.addEventListener('DOMContentLoaded', createGrid);
function createGrid() {
    // draw vertical from X to Height
    for (var x = 0; x < myCanvas.getWidth(); x += myCanvas.getStep()) {
        // draw vertical line
        myCanvas.ctx.beginPath();
        myCanvas.ctx.moveTo(x, 0);
        myCanvas.ctx.lineTo(x, myCanvas.getHeight());
        myCanvas.ctx.stroke();
        // draw text
        myCanvas.ctx.fillText((x / 20).toString(), x, 5);
    }
    // draw horizontal from Y to Width
    for (var y = 0; y < myCanvas.getHeight(); y += myCanvas.getStep() / 2) {
        // draw horizontal line
        myCanvas.ctx.beginPath();
        myCanvas.ctx.moveTo(0, y);
        myCanvas.ctx.lineTo(myCanvas.getWidth(), y);
        myCanvas.ctx.stroke();
        // draw text
        myCanvas.ctx.fillText((y / 10).toString(), 0, y);
    }
}
function getPosition(point) {
    var curleft = 0, curtop = 0;
    if (point.offsetParent) {
        do {
            curleft += point.offsetLeft;
            curtop += point.offsetTop;
        } while (point = point.offsetParent);
        return new Point(curleft, curtop);
    }
    return undefined;
}
myCanvas.canvasEl.addEventListener("mousemove", function (e) {
    var pos = getPosition(this);
    var realX = e.pageX - pos.getX();
    var realY = e.pageY - pos.getY();
    realX = realX * this.width / this.clientWidth / 20;
    realY = realY * this.height / this.clientHeight / 10;
    document.getElementById("xVal").value = realX.toFixed(1);
    document.getElementById("yVal").value = realY.toFixed(1);
}, false);
myCanvas.canvasEl.addEventListener("click", function (e) {
    var countPoints = +document.getElementById("countPoints").value;
    var pos = getPosition(this);
    var realX = e.pageX - pos.getX();
    var realY = e.pageY - pos.getY();
    realX = realX * this.width / this.clientWidth;
    realY = realY * this.height / this.clientHeight;
    pointsArr.push(new Point(realX, realY));
    if (!isClicked) {
        isClicked = true;
        myCanvas.ctx.clearRect(0, 0, myCanvas.getWidth(), myCanvas.getHeight());
        createGrid();
        myCanvas.ctx.moveTo(realX, realY);
    }
    else {
        myCanvas.ctx.lineTo(realX, realY);
        myCanvas.ctx.moveTo(realX, realY);
        myCanvas.ctx.stroke();
    }
    if (pointsArr.length === countPoints) {
        myCanvas.ctx.lineTo(pointsArr[0].getX(), pointsArr[0].getY());
        myCanvas.ctx.stroke();
        isClicked = false;
        var figure = new Figure(pointsArr);
        var area = figure.getArea();
        var perimeter = figure.getPerimeter();
        document.getElementById('area').value = area.toFixed(2);
        document.getElementById('perimeter').value = perimeter.toFixed(2);
        pointsArr.length = 0;
    }
}, false);
