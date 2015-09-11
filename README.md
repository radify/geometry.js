[![Travis Build Status](https://travis-ci.org/radify/geometry.js.svg)](https://travis-ci.org/radify/geometry.js?branch=master)

# Geometry.js

A collection of ES6 classes for simple geometric objects and calculations.

## Why?

This library was extracted from an in-house project, and serves as a repository
of geometry operations across several dependent libraries, including [radify/Pathfinding.js](https://github.com/radify/Pathfinding.js). If you need to do 2D graphing calculations in arbitrary coordinate space using points, lines, and rectangles, this might just be the library for you.

## Setup

You can grab it directly from NPM or JSPM:

```bash
npm install geometry.js
# or
jspm install geometry.js
```

Then:

```html
<script src="geometry.js/dist/geometry[.min].js"></script>
```

By default, geometry.js exports classes in CommonJS format, but you can rebuild it in the
format of your choice. For example:

```bash
cd geometry.js
npm install -g gulp
npm install
gulp dist --modules=amd
```

...will build AMD modules. Replace `amd` with
[any module format supported by Babel](https://babeljs.io/docs/usage/modules/),
including `amd`, `umd`, or `system`, for [SystemJS](https://github.com/systemjs/systemjs).

