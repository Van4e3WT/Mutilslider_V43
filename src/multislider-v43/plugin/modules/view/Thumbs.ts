/* global document */
import { MoveStyleAxis, ThumbData, ViewAxis } from 'Plugin/custom-types';

class Thumbs {
  private thumbs: Array<HTMLDivElement>;

  private selector: string;

  constructor(props: { selector: string }) {
    const { selector } = props;

    this.selector = selector;
    this.thumbs = [];
  }

  public add(parent: HTMLDivElement, isVertical = false): void {
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
  }): void {
    const { thumbs } = this;

    const {
      thumbsParent,
      axis,
      getValue,
      setValue,
      getMin,
      getMax,
      additionalListeners,
    } = props;

    for (let i = 0; i < thumbs.length; ++i) {
      const unionData: ThumbData = {
        n: i,
        thumbsParent,
        axis,

        getValue,
        setValue,
        getMin,
        getMax,

        vars: {},
      };

      const handlePointerMove = this.handlePointerMove.bind(null, unionData);
      unionData.handlePointerMove = handlePointerMove;

      const handlePointerUp = this.handlePointerUp.bind(null, unionData);
      unionData.handlePointerUp = handlePointerUp;

      const handlePointerDown = this.handlePointerDown.bind(null, unionData);

      thumbs[i].addEventListener('pointerdown', handlePointerDown);
      if (additionalListeners) {
        additionalListeners[i].addEventListener('pointerdown', handlePointerDown);
      }
    }
  }

  public getThumb(n: number): HTMLDivElement {
    const { thumbs } = this;

    return thumbs[n];
  }

  public getSize(): number {
    const { thumbs } = this;

    return parseInt(getComputedStyle(thumbs[0]).width, 10);
  }

  public getLength(): number {
    const { thumbs } = this;

    return thumbs.length;
  }

  public moveThumb(props: { n: number, prop: MoveStyleAxis, value: number }): void {
    const { thumbs } = this;
    const { n, prop, value } = props;

    thumbs[n].style[prop] = `${value}px`;
  }

  public getStyleN(props: { n: number, prop: MoveStyleAxis }): string {
    const { thumbs } = this;
    const { n, prop } = props;

    return thumbs[n].style[prop];
  }

  private handlePointerMove = (data: ThumbData, e: PointerEvent): void => {
    const { thumbs, selector } = this;
    const {
      n,
      axis,
      thumbsParent,
      setValue,
      getMin,
      getMax,
      vars,
    } = data;

    if (!(vars.startPos !== undefined
      && vars.startValue !== undefined)) return;

    const pos1 = e[axis.eventAxis];
    const value = ((((pos1 - vars.startPos) * axis.dPos)
      / (thumbsParent.getBoundingClientRect()[axis.sizeParent]
        - this.getSize()))
      * (getMax() - getMin()))
      + vars.startValue;

    const delta = pos1 - vars.startPos;

    if (!vars.sign) {
      vars.sign = delta;
    }

    const isNeedSwitchConvert = (delta * axis.dPos > 0) && (delta > 0 === vars.sign > 0);

    if (vars.isConverted && isNeedSwitchConvert) {
      vars.isConverted = false;
      thumbs[0].classList.remove(`${selector}__thumb_active`);
      thumbs[n].classList.add(`${selector}__thumb_active`);
    }

    const isSecondConverted = n === 1 && vars.isConverted;
    const shouldSetVal1 = n === 0 || isSecondConverted;

    if (shouldSetVal1) {
      setValue({ val1: value });
    } else if (n === 1) {
      setValue({ val2: value });
    }
  };

  private handlePointerUp = (data: ThumbData): void => {
    const { thumbs, selector } = this;
    const {
      n,
      vars,
      handlePointerMove,
      handlePointerUp,
    } = data;

    if (vars.isConverted) {
      thumbs[0].classList.remove(`${selector}__thumb_active`);
    }

    thumbs[n].classList.remove(`${selector}__thumb_active`);

    if (!(handlePointerMove && handlePointerUp)) return;

    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };

  private handlePointerDown = (data: ThumbData, e: PointerEvent): void => {
    const { thumbs, selector } = this;
    const {
      n,
      axis,
      getValue,
      vars,
      handlePointerMove,
      handlePointerUp,
    } = data;

    vars.startPos = e[axis.eventAxis];
    vars.startValue = getValue()[n];
    vars.isConverted = false;
    vars.sign = 0;

    const shouldConvertThumbMove = n === 1 && (vars.startValue === getValue()[0]);

    if (shouldConvertThumbMove) {
      vars.isConverted = true;
      thumbs[0].classList.add(`${selector}__thumb_active`);
    } else {
      thumbs[n].classList.add(`${selector}__thumb_active`);
    }

    if (!(handlePointerMove && handlePointerUp)) return;

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };
}

export default Thumbs;
