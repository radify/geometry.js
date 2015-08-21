export default class Size {

  constructor(width: number, height: number) {
    var [_w, _h] = [width, height];
    Object.assign(this, { _w, _h });
  }

  add(size: Size): Size {
  	return new Size(this._w + size.width, this._h + size.height);
  }

  get width(): number {
  	return this._w;
  }

  get height(): number {
  	return this._h;
  }

  get transform(): string {
    return `scale(${this._w}, ${this._h})`;
  }

  toJSON() {
    return { width: this._w, height: this._h };
  }

  static instance(width, height) {
    if (width && width.hasOwnProperty('width')) return new Size(width.width, width.height);
    if (width && width.length && width.length >= 2) return new Size(...width);
    return new Size(width, height);
  }
}