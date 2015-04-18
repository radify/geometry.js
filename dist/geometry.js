define(["exports", "module", "./Point", "./Line", "./Size"], function (exports, module, _Point, _Line, _Size) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _Point2 = _interopRequire(_Point);

  var _Line2 = _interopRequire(_Line);

  var _Size2 = _interopRequire(_Size);

  var prop = function prop(name) {
    return function (obj) {
      return obj[name];
    };
  };

  var Box = (function () {
    function Box(origin, size) {
      _classCallCheck(this, Box);

      Object.assign(this, { origin: origin, size: size });
    }

    _createClass(Box, [{
      key: "x",
      get: function () {
        return this.origin.x;
      }
    }, {
      key: "y",
      get: function () {
        return this.origin.y;
      }
    }, {
      key: "width",
      get: function () {
        return this.size.width;
      }
    }, {
      key: "height",
      get: function () {
        return this.size.height;
      }
    }, {
      key: "center",
      get: function () {
        return this.origin.add(new _Point2(this.size.width / 2, this.size.height / 2));
      }
    }, {
      key: "bound",
      get: function () {
        return this.origin.add(new _Point2(this.size.width, this.size.height));
      }
    }, {
      key: "corners",
      value: function corners() {
        var topLeft = this.origin,
            topRight = topLeft.add(new _Point2(this.width, 0)),
            bottomRight = topRight.add(new _Point2(0, this.height)),
            bottomLeft = topLeft.add(new _Point2(0, this.height));

        return [topLeft, topRight, bottomLeft, bottomRight];
      }
    }, {
      key: "crosshair",

      // @TODO: Move to Point
      get: function () {
        var center = this.center;

        return [new _Line2(new _Point2(-Infinity, center.y), new _Point2(Infinity, center.y)), new _Line2(new _Point2(center.x, -Infinity), new _Point2(center.x, Infinity))];
      }
    }, {
      key: "pad",
      value: function pad(size) {
        return new Box(this.origin.add(new _Point2(-size, -size)), this.size.add(new _Size2(size, size)));
      }
    }, {
      key: "edges",

      // @TODO: Determine some kind of generalized algorthim for closed list walking
      value: function edges() {
        return this.corners().reduce(function (prev, cur, idx, array) {
          if (!prev.last) {
            prev.last = cur;
            return prev;
          }
          prev.push(new _Line2(prev.last, cur));

          if (idx === array.length - 1) prev.push(new _Line2(cur, array[0]));
          return prev;
        }, []);
      }
    }, {
      key: "contains",
      value: function contains(point) {
        return this.x <= point.x && point.x <= this.x + this.width && (this.y <= point.y && point.y <= this.y + this.height);
      }
    }, {
      key: "overlaps",
      get: function () {
        var _this = this;

        return function (box) {
          var p1 = _this.origin,
              p2 = _this.bound,
              p3 = box.origin,
              p4 = box.bound;
          return !(p2.y < p3.y || p1.y > p4.y || p2.x < p3.x || p1.x > p4.x);
        };
      }
    }, {
      key: "toPairs",
      value: function toPairs() {
        return [this.origin.x, this.origin.y, this.size.width, this.size.height];
      }
    }], [{
      key: "bound",
      value: function bound(boxes) {
        var o = boxes.map(prop("origin")),
            b = boxes.map(prop("bound"));
        var origins = { x: o.map(prop("x")), y: o.map(prop("y")) };
        var bounds = { x: b.map(prop("x")), y: b.map(prop("y")) };

        var x = Math.min.apply(Math, _toConsumableArray(origins.x)),
            y = Math.min.apply(Math, _toConsumableArray(origins.y)),
            width = Math.max.apply(Math, _toConsumableArray(bounds.x)) - x,
            height = Math.max.apply(Math, _toConsumableArray(bounds.y)) - y;

        return Box.fromPairs(x, y, width, height);
      }
    }, {
      key: "fromPairs",
      value: function fromPairs(x, y, width, height) {
        return new Box(new _Point2(x, y), new _Size2(width, height));
      }
    }]);

    return Box;
  })();

  module.exports = Box;
});
define(["exports", "module", "./Point", "./Size", "./Box"], function (exports, module, _Point, _Size, _Box) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _Point2 = _interopRequire(_Point);

  var _Size2 = _interopRequire(_Size);

  var _Box2 = _interopRequire(_Box);

  var Line = (function () {
    function Line(origin, destination) {
      _classCallCheck(this, Line);

      Object.assign(this, { origin: origin, destination: destination });
      this._svgTpl = function (o, d) {
        return "M " + o.x + " " + o.y + " L " + d.x + " " + d.y;
      };
    }

    _createClass(Line, [{
      key: "from",
      value: function from(origin) {
        return new Line(origin, this.destination);
      }
    }, {
      key: "to",
      value: function to(destination) {
        return new Line(this.origin, destination);
      }
    }, {
      key: "add",
      value: function add(offset) {
        return;
      }
    }, {
      key: "crosses",
      value: function crosses(line) {
        var q = (this.origin.y - line.origin.y) * (line.destination.x - line.origin.x) - (this.origin.x - line.origin.x) * (line.destination.y - line.origin.y);
        var d = (this.destination.x - this.origin.x) * (line.destination.y - line.origin.y) - (this.destination.y - this.origin.y) * (line.destination.x - line.origin.x);
        if (d === 0) {
          return false;
        }var r = q / d;
        q = (this.origin.y - line.origin.y) * (this.destination.x - this.origin.x) - (this.origin.x - line.origin.x) * (this.destination.y - this.origin.y);

        var s = q / d;
        return !(r < 0 || r > 1 || s < 0 || s > 1);
      }
    }, {
      key: "intersection",
      value: function intersection(line) {
        var denominator, a, b, numerator1, numerator2;
        denominator = (line.destination.y - line.origin.y) * (this.destination.x - this.origin.x) - (line.destination.x - line.origin.x) * (this.destination.y - this.origin.y);

        if (denominator === 0) {
          return null;
        }

        a = this.origin.y - line.origin.y;
        b = this.origin.x - line.origin.x;
        numerator1 = (line.destination.x - line.origin.x) * a - (line.destination.y - line.origin.y) * b;
        numerator2 = (this.destination.x - this.origin.x) * a - (this.destination.y - this.origin.y) * b;
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        if (!(a > 0 && a < 1) || !(b > 0 && b < 1)) {
          return null;
        }

        return new _Point2(this.origin.x + a * (this.destination.x - this.origin.x), this.origin.y + a * (this.destination.y - this.origin.y));
      }
    }, {
      key: "intersects",
      value: function intersects(box) {
        var _this = this;

        return box.contains(this.origin) || box.contains(this.destination) || box.edges().map(function (edge) {
          return edge.crosses(_this);
        }).indexOf(true) >= 0;
      }
    }, {
      key: "bounds",
      value: function bounds() {
        return new _Box2(new _Point2(Math.min(this.origin.x, this.destination.x), Math.min(this.origin.y, this.destination.y)), new _Size2(Math.abs(this.origin.x - this.destination.x), Math.abs(this.origin.y - this.destination.y)));
      }
    }, {
      key: "toStyle",
      value: function toStyle() {
        var x1 = this.origin.x,
            y1 = this.origin.y,
            x2 = this.destination.x,
            y2 = this.destination.y;
        var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        var transform = "rotate(" + angle + "deg)";

        return {
          "-webkit-transform": transform,
          "-moz-transform": transform,
          transform: transform,
          width: length,
          left: x1,
          top: y1
        };
      }
    }, {
      key: "toPairs",
      value: function toPairs() {
        return [this.origin.x, this.origin.y, this.destination.x, this.destination.y];
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return { origin: this.origin, destination: this.destination };
      }
    }, {
      key: "toSVG",
      value: function toSVG() {
        return this._svgTpl(this.origin, this.destination);
      }
    }], [{
      key: "fromPairs",
      value: function fromPairs(x1, y1, x2, y2) {
        return new Line(new _Point2(x1, y1), new _Point2(x2, y2));
      }
    }]);

    return Line;
  })();

  module.exports = Line;
});
define(["exports", "module", "./Box"], function (exports, module, _Box) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _bind = Function.prototype.bind;

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _Box2 = _interopRequire(_Box);

  var Point = (function () {
    function Point() {
      var x = arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments[1] === undefined ? 0 : arguments[1];

      _classCallCheck(this, Point);

      var _x = x;
      var _y = y;

      Object.assign(this, { _x: _x, _y: _y });
    }

    _createClass(Point, [{
      key: "add",
      value: function add(point) {
        return new Point(this._x + point.x, this._y + point.y);
      }
    }, {
      key: "subtract",
      value: function subtract(point) {
        return new Point(this._x - point._x, this._y - point._y);
      }
    }, {
      key: "product",
      value: function product(point) {
        return this._x * point._y - this._y * point._x;
      }
    }, {
      key: "equals",
      value: function equals(point) {
        return this._x === point._x && this._y === point._y;
      }
    }, {
      key: "invert",
      value: function invert() {
        return new Point(-this._x, -this._y);
      }
    }, {
      key: "isIn",
      value: function isIn(box) {
        return box.contains(this);
      }
    }, {
      key: "distance",
      value: function distance(point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
      }
    }, {
      key: "manhattanDistance",
      value: function manhattanDistance(point) {
        return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
      }
    }, {
      key: "snapTo",
      value: function snapTo(xSize, ySize) {
        ySize = ySize || xSize;
        return new Point(xSize * Math.round(this.x / xSize), ySize * Math.round(this.y / ySize));
      }
    }, {
      key: "theta",
      value: function theta(point) {
        var y = -(point.y - this.y);
        var x = point.x - this.x;

        var PRECISION = 10;
        var rad = y.toFixed(PRECISION) === 0 && x.toFixed(PRECISION) === 0 ? 0 : Math.atan2(y, x);

        return 180 * (rad < 0 ? 2 * Math.PI + rad : rad) / Math.PI;
      }
    }, {
      key: "x",
      get: function () {
        return this._x;
      }
    }, {
      key: "y",
      get: function () {
        return this._y;
      }
    }, {
      key: "transform",
      get: function () {
        return "translate(" + this._x + ", " + this._y + ")";
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return { x: this._x, y: this._y };
      }
    }, {
      key: "toString",
      value: function toString() {
        return "" + this._x + ", " + this._y;
      }
    }], [{
      key: "fromString",
      value: function fromString(str) {
        return new (_bind.apply(Point, [null].concat(_toConsumableArray(str.split(",").map(function (val) {
          return parseInt(val, 10);
        })))))();
      }
    }]);

    return Point;
  })();

  module.exports = Point;
});
define(["exports", "module"], function (exports, module) {
  "use strict";

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var Size = (function () {
    function Size(width, height) {
      _classCallCheck(this, Size);

      var _w = width;
      var _h = height;

      Object.assign(this, { _w: _w, _h: _h });
    }

    _createClass(Size, [{
      key: "add",
      value: function add(size) {
        return new Size(this._w + size.width, this._h + size.height);
      }
    }, {
      key: "width",
      get: function () {
        return this._w;
      }
    }, {
      key: "height",
      get: function () {
        return this._h;
      }
    }, {
      key: "transform",
      get: function () {
        return "scale(" + this._w + ", " + this._h + ")";
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return { width: this._w, height: this._h };
      }
    }]);

    return Size;
  })();

  module.exports = Size;
});
//# sourceMappingURL=geometry.js.map