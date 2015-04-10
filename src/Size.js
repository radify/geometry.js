export default class Size {

  constructor(width: number, height: number) {
    var [_w, _h] = [width, height];
    Object.assign(this, { _w, _h });
  }

  add(size: Size): Size {
  	return new Size(this._w + size.width, this._h + size.height);
  }

  get width() {
  	return this._w;
  }

  get height() {
  	return this._h;
  }

  get transform() {
    return `scale(${this._w}, ${this._h})`;
  }

  toJSON() {
    return { width: this._w, height: this._h };
  }
}
