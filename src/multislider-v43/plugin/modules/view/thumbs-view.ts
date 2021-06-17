class ThumbsView {
  private thumbs: Array<HTMLDivElement>;

  constructor() {
    this.thumbs = [];
  }

  public add(parent: HTMLDivElement, selector: string, isVertical = false) {
    const { thumbs } = this;
    const thumb = document.createElement('div');

    thumb.classList.add(`${selector}__thumb`);
    if (isVertical) {
      thumb.classList.add(`${selector}__thumb_vertical`);
    }
    parent.appendChild(thumb);
    thumbs.push(thumb);
  }

  public getN(n: number) {
    const { thumbs } = this;

    return thumbs[n];
  }

  public getSize() {
    const { thumbs } = this;

    return parseInt(getComputedStyle(thumbs[0]).width, 10);
  }

  public getLength() {
    const { thumbs } = this;

    return thumbs.length;
  }

  public setStyleN(n: number, prop: string, value: number) {
    const { thumbs } = this;

    thumbs[n].style[prop] = `${value}px`;
  }

  public getStyleN(n: number, prop: string) {
    const { thumbs } = this;

    return thumbs[n].style[prop];
  }
}

export default ThumbsView;
