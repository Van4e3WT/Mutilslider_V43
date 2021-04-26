class ThumbsView {
  private thumbs: Array<HTMLDivElement>;

  constructor() {
    this.thumbs = [];
  }

  public add(parent: HTMLDivElement, selector: string) {
    const thumb = document.createElement('div');
    thumb.classList.add(`${selector}__thumb`);
    parent.appendChild(thumb);
    this.thumbs.push(thumb);
  }

  public getN(n: number) {
    return this.thumbs[n];
  }

  public getSize() {
    return parseInt(getComputedStyle(this.thumbs[0]).width, 10);
  }

  public getLength() {
    return this.thumbs.length;
  }

  public setStyleN(n: number, prop: string, value: number) {
    this.thumbs[n].style[prop] = `${value}px`;
  }

  public getStyleN(n: number, prop: string) {
    return this.thumbs[n].style[prop];
  }
}

export default ThumbsView;
