type PointPair = [number, number];
type PointStruct = { x: number, y: number };
type PointEsque = Point | PointPair | PointStruct;

export default class Point {

  constructor(public x: number = 0, public y: number = 0) {
    Object.freeze(this);
  }

  add(point: PointEsque): Point {
    var p = Point.instance(point);
    return new Point(this.x + p.x, this.y + p.y);
  }

  subtract(point: PointEsque): Point {
    var p = Point.instance(point);
    return new Point(this.x - p.x, this.y - p.y);
  }

  product(point: PointEsque): number {
    var p = Point.instance(point);
    return this.x * p.y - this.y * p.x;
  }

  equals(point: PointEsque): boolean {
    var p = Point.instance(point);
    return this.x === p.x && this.y === p.y;
  }

  invert(): Point {
    return new Point(-this.x, -this.y);
  }

  distance(point: PointEsque): number {
    var p = Point.instance(point);
    return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
  }

  manhattanDistance(point: Point): number {
    return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
  }

  snapTo(xSize: number, ySize: number): Point {
    ySize = ySize || xSize;
    return new Point(xSize * Math.round(this.x / xSize), ySize * Math.round(this.y / ySize));
  }

  theta(point: Point): number {
    var y = -(point.y - this.y);
    var x = point.x - this.x;

    const PRECISION = 10;
    var rad = (y.toFixed(PRECISION) === <any> 0 && x.toFixed(PRECISION) === <any> 0) ? 0 : Math.atan2(y, x);

    return 180 * ((rad < 0) ? (2 * Math.PI + rad) : rad) / Math.PI;
  }

  get transform(): string {
    return `translate(${this.x}px, ${this.y}px)`;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }

  static instance(x: number | PointEsque, y?: number): Point {
    if (x instanceof Point) return x;
    if (x && 'x' in <PointStruct> x) return new Point((<PointStruct> x).x, (<PointStruct> x).y);
    if ((<PointPair> x) && (<[number, number]> x).length && (<PointPair> x).length >= 2) return new Point(x[0], x[1]);
    return new Point(<number> x, y);
  }

  static fromString(str: string): Point {
    const toInt: (val: string) => number = (val) => parseInt(val, 10);
    var [x, y] = str.split(',').map(toInt);
    return new Point(x, y);
  }
}