export class Point{
    constructor(private readonly x: number, private  readonly y: number) {}

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}
