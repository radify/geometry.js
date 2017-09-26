import Point from "./Point";
import Size from "./Size";
import Box from "./Box";

const _svgTpl = (o: Point, d: Point) => `M ${o.x} ${o.y} L ${d.x} ${d.y}`;

export default class Line {

  constructor(public origin: Point, public destination: Point) {
    Object.freeze(this);
  }

  from(origin: Point): Line {
    return new Line(origin, this.destination);
  }

  to(destination: Point): Line {
    return new Line(this.origin, destination);
  }

  add(offset: Point): Line {
    return new Line(this.origin.add(offset), this.destination.add(offset));
  }

  crosses(line: Line): boolean {
    var q = (
      (this.origin.y - line.origin.y) *
      (line.destination.x - line.origin.x) -
      (this.origin.x - line.origin.x) *
      (line.destination.y - line.origin.y)
    );
    var d = (
      (this.destination.x - this.origin.x) *
      (line.destination.y - line.origin.y) -
      (this.destination.y - this.origin.y) *
      (line.destination.x - line.origin.x)
    );
    if (d === 0) return false;

    var r = q / d;
    q = (
      (this.origin.y - line.origin.y) *
      (this.destination.x - this.origin.x) -
      (this.origin.x - line.origin.x) *
      (this.destination.y - this.origin.y)
    );

    var s = q / d;
    return !(r < 0 || r > 1 || s < 0 || s > 1);
  }

  intersection(line: Line): Point {
    var denominator, a, b, numerator1, numerator2;
    denominator = ((line.destination.y - line.origin.y) * (this.destination.x - this.origin.x)) - ((line.destination.x - line.origin.x) * (this.destination.y - this.origin.y));

    if (denominator === 0) {
      return null;
    }

    a = this.origin.y - line.origin.y;
    b = this.origin.x - line.origin.x;
    numerator1 = ((line.destination.x - line.origin.x) * a) - ((line.destination.y - line.origin.y) * b);
    numerator2 = ((this.destination.x - this.origin.x) * a) - ((this.destination.y - this.origin.y) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    if (!(a > 0 && a < 1) || !(b > 0 && b < 1)) {
      return null;
    }

    return new Point(
      this.origin.x + (a * (this.destination.x - this.origin.x)),
      this.origin.y + (a * (this.destination.y - this.origin.y))
    );
  }

  intersects(box: Box) {
    return (
      box.contains(this.origin) ||
      box.contains(this.destination) ||
      box.edges().map((edge: Line) => edge.crosses(this)).indexOf(true) >= 0
    );
  }

  bounds(): Box {
    return new Box(
      new Point(
        Math.min(this.origin.x, this.destination.x),
        Math.min(this.origin.y, this.destination.y)
      ),
      new Size(
        Math.abs(this.origin.x - this.destination.x),
        Math.abs(this.origin.y - this.destination.y)
      )
    );
  }

  toStyle(): Object {
    var x1 = this.origin.x, y1 = this.origin.y, x2 = this.destination.x, y2 = this.destination.y;
    var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    var transform = `rotate(${angle}deg)`;

    return {
      '-webkit-transform': transform,
      '-moz-transform':    transform,
      transform:           transform,
      width:               length,
      left:                x1,
      top:                 y1
    };
  }

  toPairs() {
    return [this.origin.x, this.origin.y, this.destination.x, this.destination.y];
  }

  toSVG() {
    return _svgTpl(this.origin, this.destination);
  }

  static fromPairs(x1: number, y1: number, x2: number, y2: number): Line {
    return new Line(new Point(x1, y1), new Point(x2, y2));
  }
}