export default class Point {

  constructor(_x: number = 0, _y: number = 0) {
    Object.freeze(Object.assign(this, { _x, _y }));
  }

  add(point): Point {
    var adding = Point.instance(point);
    return new Point(this._x + adding.x, this._y + adding.y);
  }

  subtract(point: Point): Point {
    return new Point(this._x - point._x, this._y - point._y);
  }

  product(point: Point): number {
    return this._x * point._y - this._y * point._x;
  }

  equals(point: Point): boolean {
    return this._x === point._x && this._y === point._y;
  }

  invert(): Point {
    return new Point(-this._x, -this._y);
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

    var PRECISION = 10;
    var rad = (y.toFixed(PRECISION) === 0 && x.toFixed(PRECISION) === 0) ? 0 : Math.atan2(y, x);

    return 180 * ((rad < 0) ? (2 * Math.PI + rad) : rad) / Math.PI;
  }

  get x(): number {
  	return this._x;
  }

  get y(): number {
  	return this._y;
  }

  get transform(): string {
    return `translate(${this._x}, ${this._y})`;
  }

  toJSON() {
    return { x: this._x, y: this._y };
  }

  toString() {
    return `${this._x}, ${this._y}`;
  }

  static instance(x, y): Point {
    if (x instanceof Point) return x;
    if (x && x.hasOwnProperty('x')) return new Point(x.x, x.y);
    if (x && x.length && x.length >= 2) return new Point(x[0], x[1]);
    return new Point(x, y);
  }

  static fromString(str): Point {
    return new Point(...(str.split(',').map(val => parseInt(val, 10))));
  }
}