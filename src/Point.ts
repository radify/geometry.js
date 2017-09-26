export default class Point {

  constructor(public x: number = 0, public y: number = 0) {
    Object.freeze(this);
  }

  add(point: any): Point {
    var adding = Point.instance(point);
    return new Point(this.x + adding.x, this.y + adding.y);
  }

  subtract(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  product(point: Point): number {
    return this.x * point.y - this.y * point.x;
  }

  equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }

  invert(): Point {
    return new Point(-this.x, -this.y);
  }

  distance(point: Point): number {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
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

    const PRECISION = 10, zero = "0.0000000000"
    var rad = (y.toFixed(PRECISION) === zero && x.toFixed(PRECISION) === zero) ? 0 : Math.atan2(y, x);

    return 180 * ((rad < 0) ? (2 * Math.PI + rad) : rad) / Math.PI;
  }

  get transform(): string {
    return `translate(${this.toString()})`;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }

  static instance(x: any, y?: number): Point {
    if (x instanceof Point) return x;
    if (x && x.hasOwnProperty('x')) return new Point(x.x, x.y);
    if (x && x.length && x.length >= 2) return new Point(x[0], x[1]);
    return new Point(x, y);
  }

  static fromString(str: string): Point {
    return new Point(...(str.split(',').map(val => parseInt(val, 10))));
  }
}