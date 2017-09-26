(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["geometry.js"] = factory();
	else
		root["geometry.js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        Object.freeze(this);
    }
    Point.prototype.add = function (point) {
        var adding = Point.instance(point);
        return new Point(this.x + adding.x, this.y + adding.y);
    };
    Point.prototype.subtract = function (point) {
        return new Point(this.x - point.x, this.y - point.y);
    };
    Point.prototype.product = function (point) {
        return this.x * point.y - this.y * point.x;
    };
    Point.prototype.equals = function (point) {
        return this.x === point.x && this.y === point.y;
    };
    Point.prototype.invert = function () {
        return new Point(-this.x, -this.y);
    };
    Point.prototype.distance = function (point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
    };
    Point.prototype.manhattanDistance = function (point) {
        return Math.abs(point.x - this.x) + Math.abs(point.y - this.y);
    };
    Point.prototype.snapTo = function (xSize, ySize) {
        ySize = ySize || xSize;
        return new Point(xSize * Math.round(this.x / xSize), ySize * Math.round(this.y / ySize));
    };
    Point.prototype.theta = function (point) {
        var y = -(point.y - this.y);
        var x = point.x - this.x;
        var PRECISION = 10, zero = "0.0000000000";
        var rad = (y.toFixed(PRECISION) === zero && x.toFixed(PRECISION) === zero) ? 0 : Math.atan2(y, x);
        return 180 * ((rad < 0) ? (2 * Math.PI + rad) : rad) / Math.PI;
    };
    Object.defineProperty(Point.prototype, "transform", {
        get: function () {
            return "translate(" + this.toString() + ")";
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.toString = function () {
        return this.x + ", " + this.y;
    };
    Point.instance = function (x, y) {
        if (x instanceof Point)
            return x;
        if (x && x.hasOwnProperty('x'))
            return new Point(x.x, x.y);
        if (x && x.length && x.length >= 2)
            return new Point(x[0], x[1]);
        return new Point(x, y);
    };
    Point.fromString = function (str) {
        return new (Point.bind.apply(Point, [void 0].concat((str.split(',').map(function (val) { return parseInt(val, 10); })))))();
    };
    return Point;
}());
exports.default = Point;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
        Object.freeze(this);
    }
    Size.prototype.add = function (size) {
        return new Size(this.width + size.width, this.height + size.height);
    };
    Object.defineProperty(Size.prototype, "transform", {
        get: function () {
            return "scale(" + this.width + ", " + this.height + ")";
        },
        enumerable: true,
        configurable: true
    });
    Size.instance = function (width, height) {
        if (width && width.hasOwnProperty('width'))
            return new Size(width.width, width.height);
        if (width && width.length && width.length >= 2)
            return new Size(width[0], width[1]);
        return new Size(width, height);
    };
    return Size;
}());
exports.default = Size;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(0);
var Line_1 = __webpack_require__(3);
var Size_1 = __webpack_require__(1);
var prop = function (name) { return function (obj) { return obj[name]; }; };
var Box = /** @class */ (function () {
    function Box(origin, size) {
        this.origin = origin;
        this.size = size;
        Object.freeze(this);
    }
    Object.defineProperty(Box.prototype, "x", {
        get: function () {
            return this.origin.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "y", {
        get: function () {
            return this.origin.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "width", {
        get: function () {
            return this.size.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "height", {
        get: function () {
            return this.size.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "center", {
        get: function () {
            return this.origin.add(new Point_1.default(this.size.width / 2, this.size.height / 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bound", {
        get: function () {
            return this.origin.add(new Point_1.default(this.size.width, this.size.height));
        },
        enumerable: true,
        configurable: true
    });
    Box.prototype.corners = function () {
        var topLeft = this.origin, topRight = topLeft.add(new Point_1.default(this.width, 0)), bottomRight = topRight.add(new Point_1.default(0, this.height)), bottomLeft = topLeft.add(new Point_1.default(0, this.height));
        return [topLeft, topRight, bottomRight, bottomLeft];
    };
    Object.defineProperty(Box.prototype, "crosshair", {
        // @TODO: Move to Point
        get: function () {
            var center = this.center;
            return [
                new Line_1.default(new Point_1.default(-Infinity, center.y), new Point_1.default(Infinity, center.y)),
                new Line_1.default(new Point_1.default(center.x, -Infinity), new Point_1.default(center.x, Infinity))
            ];
        },
        enumerable: true,
        configurable: true
    });
    Box.prototype.pad = function (size) {
        return new Box(this.origin.add(new Point_1.default(-size, -size)), this.size.add(new Size_1.default(size, size)));
    };
    // @TODO: Determine some kind of generalized algorthim for closed list walking
    Box.prototype.edges = function () {
        return this.corners().reduce(function (prev, cur, idx, array) {
            if (!prev.last) {
                prev.last = cur;
                return prev;
            }
            prev.push(new Line_1.default(prev.last, cur));
            if (idx === array.length - 1)
                prev.push(new Line_1.default(cur, array[0]));
            return prev;
        }, []);
    };
    Box.prototype.contains = function (point) {
        return ((this.x <= point.x && point.x <= (this.x + this.width)) &&
            (this.y <= point.y && point.y <= (this.y + this.height)));
    };
    Object.defineProperty(Box.prototype, "overlaps", {
        get: function () {
            var _this = this;
            return function (box) {
                var p1 = _this.origin, p2 = _this.bound, p3 = box.origin, p4 = box.bound;
                return !(p2.y < p3.y || p1.y > p4.y || p2.x < p3.x || p1.x > p4.x);
            };
        },
        enumerable: true,
        configurable: true
    });
    Box.prototype.toPairs = function () {
        return [this.origin.x, this.origin.y, this.size.width, this.size.height];
    };
    Box.bound = function (boxes) {
        var o = boxes.map(prop('origin')), b = boxes.map(prop('bound'));
        var origins = { x: o.map(prop('x')), y: o.map(prop('y')) };
        var bounds = { x: b.map(prop('x')), y: b.map(prop('y')) };
        var x = Math.min.apply(Math, origins.x), y = Math.min.apply(Math, origins.y), width = Math.max.apply(Math, bounds.x) - x, height = Math.max.apply(Math, bounds.y) - y;
        return Box.fromPairs(x, y, width, height);
    };
    Box.fromPairs = function (x, y, width, height) {
        return new Box(new Point_1.default(x, y), new Size_1.default(width, height));
    };
    return Box;
}());
exports.default = Box;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(0);
var Size_1 = __webpack_require__(1);
var Box_1 = __webpack_require__(2);
var _svgTpl = function (o, d) { return "M " + o.x + " " + o.y + " L " + d.x + " " + d.y; };
var Line = /** @class */ (function () {
    function Line(origin, destination) {
        this.origin = origin;
        this.destination = destination;
        Object.freeze(this);
    }
    Line.prototype.from = function (origin) {
        return new Line(origin, this.destination);
    };
    Line.prototype.to = function (destination) {
        return new Line(this.origin, destination);
    };
    Line.prototype.add = function (offset) {
        return new Line(this.origin.add(offset), this.destination.add(offset));
    };
    Line.prototype.crosses = function (line) {
        var q = ((this.origin.y - line.origin.y) *
            (line.destination.x - line.origin.x) -
            (this.origin.x - line.origin.x) *
                (line.destination.y - line.origin.y));
        var d = ((this.destination.x - this.origin.x) *
            (line.destination.y - line.origin.y) -
            (this.destination.y - this.origin.y) *
                (line.destination.x - line.origin.x));
        if (d === 0)
            return false;
        var r = q / d;
        q = ((this.origin.y - line.origin.y) *
            (this.destination.x - this.origin.x) -
            (this.origin.x - line.origin.x) *
                (this.destination.y - this.origin.y));
        var s = q / d;
        return !(r < 0 || r > 1 || s < 0 || s > 1);
    };
    Line.prototype.intersection = function (line) {
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
        return new Point_1.default(this.origin.x + (a * (this.destination.x - this.origin.x)), this.origin.y + (a * (this.destination.y - this.origin.y)));
    };
    Line.prototype.intersects = function (box) {
        var _this = this;
        return (box.contains(this.origin) ||
            box.contains(this.destination) ||
            box.edges().map(function (edge) { return edge.crosses(_this); }).indexOf(true) >= 0);
    };
    Line.prototype.bounds = function () {
        return new Box_1.default(new Point_1.default(Math.min(this.origin.x, this.destination.x), Math.min(this.origin.y, this.destination.y)), new Size_1.default(Math.abs(this.origin.x - this.destination.x), Math.abs(this.origin.y - this.destination.y)));
    };
    Line.prototype.toStyle = function () {
        var x1 = this.origin.x, y1 = this.origin.y, x2 = this.destination.x, y2 = this.destination.y;
        var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        var transform = "rotate(" + angle + "deg)";
        return {
            '-webkit-transform': transform,
            '-moz-transform': transform,
            transform: transform,
            width: length,
            left: x1,
            top: y1
        };
    };
    Line.prototype.toPairs = function () {
        return [this.origin.x, this.origin.y, this.destination.x, this.destination.y];
    };
    Line.prototype.toSVG = function () {
        return _svgTpl(this.origin, this.destination);
    };
    Line.fromPairs = function (x1, y1, x2, y2) {
        return new Line(new Point_1.default(x1, y1), new Point_1.default(x2, y2));
    };
    return Line;
}());
exports.default = Line;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Box__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Box___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Box__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Line__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Line___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Line__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Point__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Point___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Point__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Size___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Size__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return __WEBPACK_IMPORTED_MODULE_0__Box___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return __WEBPACK_IMPORTED_MODULE_1__Line___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return __WEBPACK_IMPORTED_MODULE_2__Point___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return __WEBPACK_IMPORTED_MODULE_3__Size___default.a; });







/***/ })
/******/ ]);
});