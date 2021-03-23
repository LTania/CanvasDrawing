export class Canvas {
    constructor(canvasEl) {
        this.canvasEl = canvasEl;
        this.ctx = this.canvasEl.getContext("2d");
        this.step = 20;
        this.height = canvasEl.height;
        this.width = canvasEl.width;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillStyle = 'black';
        this.ctx.font = '16px Monospace';
    }
    getWidth() {
        return this.width;
    }
    getStep() {
        return this.step;
    }
    getHeight() {
        return this.height;
    }
}
