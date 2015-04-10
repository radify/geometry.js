import Box from "./Box";

class Point {

  constructor(x: number = 0, y: number = 0) {
    var [_x, _y] = [x, y];
    Object.assign(this, { _x, _y });
  }

  add(point: Point): Point {
  	return new Point(this._x + point.x, this._y + point.y);
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

  isIn(box: Box): boolean {
    return box.contains(this);
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

  get x() {
  	return this._x;
  }

  get y() {
  	return this._y;
  }

  get transform() {
    return `translate(${this._x}, ${this._y})`;
  }

  toJSON() {
    return { x: this._x, y: this._y };
  }

  toString() {
    return `${this._x}, ${this._y}`;
  }

  static fromString(str) {
    return new Point(...(str.split(',').map(val => parseInt(val, 10))));
  }
}

export default Point;