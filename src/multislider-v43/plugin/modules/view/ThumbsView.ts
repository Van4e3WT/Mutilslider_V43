import { MoveStyleAxis } from 'Plugin/modules/utils/custom-types';

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

  public setStyleN(props: { n: number, prop: MoveStyleAxis, value: number }) {
    const { thumbs } = this;
    const { n, prop, value } = props;

    thumbs[n].style[prop] = `${value}px`;
  }

  public getStyleN(props: { n: number, prop: MoveStyleAxis }) {
    const { thumbs } = this;
    const { n, prop } = props;

    return thumbs[n].style[prop];
  }
}

export default ThumbsView;
