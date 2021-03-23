export class Canvas{
    public ctx: any;
    private readonly step: number;
    private readonly width: number;
    private readonly height: number;

    constructor(public canvasEl: HTMLCanvasElement) {
        this.ctx = this.canvasEl.getContext("2d");
        this.step = 20;
        this.height= canvasEl.height;
        this.width = canvasEl.width;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillStyle = 'black';
        this.ctx.font = '16px Monospace';
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
