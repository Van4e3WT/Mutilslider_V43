/* global document */
import { MoveStyleAxis, ViewAxis } from 'Plugin/modules/utils/custom-types';

class Thumbs {
  private thumbs: Array<HTMLDivElement>;

  private selector: string;

  constructor(props: { selector: string }) {
    const { selector } = props;

    this.selector = selector;
    this.thumbs = [];
  }

  public add(parent: HTMLDivElement, isVertical = false) {
    const { thumbs, selector } = this;
    const thumb = document.createElement('div');

    thumb.classList.add(`${selector}__thumb`);
    if (isVertical) {
      thumb.classList.add(`${selector}__thumb_vertical`);
    }
    parent.appendChild(thumb);
    thumbs.push(thumb);
  }

  public initEvents(props: {
    thumbsParent: HTMLDivElement,
    axis: ViewAxis,
    getValue: () => number[],
    setValue: (props: {
      val1?: number,
      val2?: number,
    }) => void,
    getMin: () => number,
    getMax: () => number,
    additionalListeners?: Array<HTMLElement>,
  }) {
    const { thumbs, selector } = this;

    const {
      thumbsParent,
      axis,
      getValue,
      setValue,
      getMin,
      getMax,
      additionalListeners,
    } = props;

    for (let i = 0; i < thumbs.length; i += 1) {
      let isConverted: boolean;
      let sign: number;
      let pos0: number;
      let value0: number;

      const handlePointerMove = (e: PointerEvent) => {
        const pos1 = e[axis.eventAxis];
        const value = ((((pos1 - pos0) * axis.dPos)
          / (thumbsParent.getBoundingClientRect()[axis.sizeParent]
            - this.getSize()))
          * (getMax() - getMin()))
          + value0;

        const delta = pos1 - pos0;

        if (!sign) {
          sign = delta;
        }

        const isNeedSwitchConvert = (delta * axis.dPos > 0) && (delta > 0 === sign > 0);

        if (isConverted && isNeedSwitchConvert) {
          isConverted = false;
          thumbs[0].classList.remove(`${selector}__thumb_active`);
          thumbs[i].classList.add(`${selector}__thumb_active`);
        }

        const isSecondConverted = i === 1 && isConverted;

        if (i === 0 || isSecondConverted) {
          setValue({ val1: value });
        } else if (i === 1) {
          setValue({ val2: value });
        }
      };

      const handlePointerUp = () => {
        if (isConverted) {
          thumbs[0].classList.remove(`${selector}__thumb_active`);
        }

        thumbs[i].classList.remove(`${selector}__thumb_active`);

        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      const handlePointerDown = (e: PointerEvent) => {
        pos0 = e[axis.eventAxis];
        value0 = getValue()[i];
        isConverted = false;
        sign = 0;

        if (i === 1 && (value0 === getValue()[0])) {
          isConverted = true;
          thumbs[0].classList.add(`${selector}__thumb_active`);
        } else {
          thumbs[i].classList.add(`${selector}__thumb_active`);
        }

        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
      };

      thumbs[i].addEventListener('pointerdown', handlePointerDown);
      if (additionalListeners) {
        additionalListeners[i].addEventListener('pointerdown', handlePointerDown);
      }
    }
  }

  public getThumb(n: number) {
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

  public moveThumb(props: { n: number, prop: MoveStyleAxis, value: number }) {
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

export default Thumbs;
