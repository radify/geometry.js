import Point from "./Point";
import Line from "./Line";
import Size from "./Size";

var prop = (name: string) => (obj: any) => obj[name];

export default class Box {

  constructor(public origin: Point, public size: Size) {
    Object.freeze(this);
  }

  get x() {
  	return this.origin.x;
  }

  get y() {
  	return this.origin.y;
  }

  get width() {
  	return this.size.width;
  }

  get height() {
  	return this.size.height;
  }

  get center() {
    return this.origin.add(new Point(this.size.width / 2, this.size.height / 2));
  }

  get bound() {
    return this.origin.add(new Point(this.size.width, this.size.height));
  }

  corners() {
    var topLeft = this.origin,
        topRight = topLeft.add(new Point(this.width, 0)),
        bottomRight = topRight.add(new Point(0, this.height)),
        bottomLeft = topLeft.add(new Point(0, this.height));

    return [topLeft, topRight, bottomRight, bottomLeft];
  }

  // @TODO: Move to Point
  get crosshair() {
    var center = this.center;

    return [
      new Line(new Point(-Infinity, center.y), new Point(Infinity, center.y)),
      new Line(new Point(center.x, -Infinity), new Point(center.x, Infinity))
    ];
  }

  pad(size: number): Box {
    return new Box(
      this.origin.add(new Point(-size, -size)),
      this.size.add(new Size(size, size))
    );
  }

  // @TODO: Determine some kind of generalized algorthim for closed list walking
  edges() {
    return this.corners().reduce((prev, cur, idx, array) => {
      if (!(<any> prev).last) {
        (<any> prev).last = cur;
        return prev;
      }
      prev.push(new Line((<any> prev).last, cur));

      if (idx === array.length - 1) prev.push(new Line(cur, array[0]));
      return prev;
    }, []);
  }

  contains(point: Point) {
  	return (
      (this.x <= point.x && point.x <= (this.x + this.width)) &&
      (this.y <= point.y && point.y <= (this.y + this.height))
    );
  }

  get overlaps() {
    return (box: Box) => {
      var p1 = this.origin, p2 = this.bound, p3 = box.origin, p4 = box.bound;
      return !(p2.y < p3.y || p1.y > p4.y || p2.x < p3.x || p1.x > p4.x);
    };
  }

  toPairs() {
    return [this.origin.x, this.origin.y, this.size.width, this.size.height];
  }

  static bound(boxes: Array<Box>): Box {
    var o = boxes.map(prop('origin')), b = boxes.map(prop('bound'));
    var origins = { x: o.map(prop('x')), y: o.map(prop('y')) };
    var bounds  = { x: b.map(prop('x')), y: b.map(prop('y')) };

    var x = Math.min(...origins.x), y = Math.min(...origins.y),
        width = Math.max(...bounds.x) - x, height = Math.max(...bounds.y) - y;

    return Box.fromPairs(x, y, width, height);
  }

  static fromPairs(x: number, y: number, width: number, height: number): Box {
    return new Box(new Point(x, y), new Size(width, height));
  }
}