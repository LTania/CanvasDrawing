import { Point } from "./point.js";
export class Figure {
    constructor(pointsPxl) {
        this.pointsPxl = pointsPxl;
        this.points = [];
        this.pointsPxl.forEach((p) => {
            const x = p.getX() / 20;
            const y = p.getY() / 20;
            this.points.push(new Point(x, y));
        });
    }
    getArea() {
        let area = 0;
        let j, i;
        j = this.points.length - 1;
        for (i = 0; i < this.points.length; i++) {
            const crossProduct = this.points[i].getX() * this.points[j].getY() -
                this.points[i].getY() * this.points[j].getX();
            area = area + crossProduct;
            j = i;
        }
        area = area / 2;
        return area;
    }
    getPerimeter() {
        let perimeter = 0;
        for (let k = 0; k < this.points.length - 1; k++) {
            const xDiff = this.points[k + 1].getX() - this.points[k].getX();
            const yDiff = this.points[k + 1].getY() - this.points[k].getY();
            perimeter = perimeter +
                Math.pow(xDiff * xDiff +
                    yDiff * yDiff, 0.5);
        }
        const lastXDiff = this.points[this.points.length - 1].getX() - this.points[0].getX();
        const lastYDiff = this.points[this.points.length - 1].getY() - this.points[0].getY();
        perimeter = perimeter +
            Math.pow(lastXDiff * lastXDiff +
                lastYDiff * lastYDiff, 0.5);
        return perimeter;
    }
}
