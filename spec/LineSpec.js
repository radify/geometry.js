import Point from "../Point";
import Line from "../Line";
import Size from "../Size";
import Box from "../Box";

describe("Line", () => {
  describe("intersects()", () => {
    it("should calculate intersection of box", () => {
      var box = new Box(new Point(5, 5), new Size(5, 5));
      var line = new Line(new Point(6, 3), new Point(6, 11));
      expect(line.intersects(box)).toBe(true);
    });
  });

  describe("intersection()", () => {
  	it("should calculate the intersection point of two lines", () => {
  		var l1 = Line.fromPairs(0, 100, 100, 0);
  		var l2 = Line.fromPairs(0, 0, 100, 100);
  		expect(l1.intersection(l2)).toEqual(new Point(50, 50));
  	});
  });
});