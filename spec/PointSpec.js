import Point from "../Point";
import Box from "../Box";

describe("Point", () => {
  describe("add()", () => {
    it("create a new point with offsets", () => {
      var a = new Point(1, 2), b = new Point(10, 20);
      var c = a.add(b);

      expect(c).not.toBe(a);
      expect(c).not.toBe(b);

      expect(a + "").toBe("1, 2");
      expect(b + "").toBe("10, 20");

      expect(c.x).toBe(11);
      expect(c.y).toBe(22);
    });
  });

  describe("subtract()", () => {
    it("create a new point with offsets", () => {
      var a = new Point(1, 2), b = new Point(10, 20);
      var c = b.subtract(a);

      expect(c.x).toBe(9);
      expect(c.y).toBe(18);
    });
  });

  describe("transform", () => {
    it("generates a CSS transform value", () => {
      var pt = new Point(100, 200);
      expect(pt.transform).toBe('translate(100, 200)');
    });
  });

  describe("distance()", () => {
    it("should calculate the Euclidean distance between points", () => {
      expect(Math.round((new Point(1, 1)).distance(new Point(100, 100)))).toBe(140);
    });
  });

  describe("manhattanDistance()", () => {
    it("should calculate the Manhattan distance between points", () => {
      expect((new Point(1, 1)).manhattanDistance(new Point(100, 100))).toBe(198);
    });
  });

  describe("snapTo()", () => {
    it("should snap to an offset", () => {
      expect((new Point(1, 1)).snapTo(5)).toEqual(new Point(0, 0));
      expect((new Point(4, 4)).snapTo(5)).toEqual(new Point(5, 5));
      expect((new Point(4, 6)).snapTo(5, 10)).toEqual(new Point(5, 10));
    });
  });

  describe("theta()", () => {
    it("should calculate theta in degrees", () => {
      expect((new Point(1, 1)).theta(new Point(2, 1))).toBe(0);
      expect((new Point(1, 1)).theta(new Point(100, 100))).toBe(315);
      expect((new Point(1, 1)).theta(new Point(-100, -100))).toBe(135);
    });
  });

  describe("string conversion", () => {
    it("should convert to and from string", () => {
      var pt = new Point(100, 200);
      expect(pt + "").toBe("100, 200");
      expect(Point.fromString(pt.toString())).toEqual(pt);
    });
  });
});