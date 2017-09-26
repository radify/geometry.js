export default class Size {

  constructor(public width: number, public height: number) {
    Object.freeze(this);
  }

  add(size: Size): Size {
  	return new Size(this.width + size.width, this.height + size.height);
  }

  get transform(): string {
    return `scale(${this.width}, ${this.height})`;
  }

  static instance(width: any, height?: number) {
    if (width && width.hasOwnProperty('width')) return new Size(width.width, width.height);
    if (width && width.length && width.length >= 2) return new Size(width[0], width[1]);
    return new Size(width, height);
  }
}