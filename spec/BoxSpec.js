import Box from "../Box";
import Size from "../Size";
import Line from "../Line";
import Point from "../Point";

describe("Box", () => {
  describe("corners()", () => {
    it("should return points for each corner of the box", () => {
      expect((new Box(new Point(1, 1), new Size(100, 100))).corners()).toEqual([
        new Point(1, 1),
        new Point(101, 1),
        new Point(101, 101),
        new Point(1, 101),
      ]);
    });
  });

  describe("center", () => {
    it("should calculate the centerpoint", () => {
      expect((new Box(new Point(0, 0), new Size(100, 100))).center).toEqual(new Point(50, 50));
    });
  });

  describe("bound", () => {
    it("should calculate the lower-right corner", () => {
      expect((new Box(new Point(1, 1), new Size(100, 100))).bound).toEqual(new Point(101, 101));
    });
  });

  describe("overlaps()", () => {
    it("should calculate whether one box overlaps another", () => {
      var tests = [
        [[9, 9, 1, 1], true],
        [[9, 9, 0, 0], false],
        [[20, 20, 1, 1], true],
        [[0, 0, 10, 10], true],
        [[0, 0, 100, 100], true],
        [[12, 12, 1, 1], true]
      ];
      var box = Box.fromPairs(10, 10, 10, 10);

      tests.forEach(test => {
        expect(box.overlaps(Box.fromPairs(...test[0]))).toBe(test[1]);
      });
    });
  });

  describe("edges", () => {
    it("should calculate lines around edges", () => {
      var box = new Box(new Point(1, 1), new Size(100, 100));
      expect(box.edges().map(line => line.toPairs())).toEqual([
        [1,   1,  101,   1],
        [1,   1,  101, 101],
        [1,   1,    1, 101],
        [1, 101,    1,   1]
      ]);
    });
  });

  describe("contains()", () => {
    it("should calculate whether the box contains a given point", () => {
      var tests = [
        [new Point(0, 0), false],
        [new Point(0, 1), false],
        [new Point(1, 0), false],
        [new Point(100, 100), true],
        [new Point(50, 50), true],
        [new Point(101.1, 100), false]
      ];
      var box = new Box(new Point(1, 1), new Size(100, 100));

      tests.forEach(test => {
        expect(box.contains(test[0])).toBe(test[1]);
      });
    });
  });

  describe("bound()", () => {
    it("should create a bounding box around all boxes", () => {
      var bounds = Box.bound([
        Box.fromPairs(0, 0, 50, 50),
        Box.fromPairs(50, 50, 50, 50),
      ]);
      expect(bounds.toPairs()).toEqual([0, 0, 100, 100]);
    });
  });
});