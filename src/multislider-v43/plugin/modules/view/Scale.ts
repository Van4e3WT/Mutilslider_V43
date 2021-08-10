import { ViewAxis } from 'Plugin/modules/utils/custom-types';

class Scale {
  private scale: HTMLDivElement;

  private scaleDivisions: Array<HTMLDivElement>;

  private selector: string;

  private localeProps: Intl.NumberFormatOptions;

  constructor(props: { localeProps?: Intl.NumberFormatOptions | undefined, selector?: string }) {
    const { localeProps = {}, selector = 'scale' } = props;

    this.selector = selector;
    this.localeProps = localeProps;
    this.scaleDivisions = [];
    this.scale = document.createElement('div');
  }

  public init(props: { count: number, isVertical: boolean }): void {
    const { scaleDivisions, scale, selector } = this;
    const {
      count,
      isVertical,
    } = props;

    scale.classList.add(`${selector}__scale`);

    for (let i = 0; i < count; i += 1) {
      const scaleDivision = document.createElement('div');

      scaleDivision.classList.add(`${selector}__scale-division`);
      if (isVertical) {
        scaleDivision.classList.add(`${selector}__scale-division_vertical`);
      }
      scaleDivisions.push(scaleDivision);
      scale.appendChild(scaleDivision);
    }
  }

  public initEvents(props: {
    setValue: (props: {
      val1?: number,
      val2?: number,
    }) => void,
    getValue: () => number[],
  }): void {
    const { scale, selector } = this;
    const { setValue, getValue } = props;

    scale.addEventListener('click', this.handleScaleClick.bind(null, {
      selector,
      setValue,
      getValue,
    }));
  }

  public getScale(): HTMLDivElement {
    const { scale } = this;

    return scale;
  }

  public getScaleDivisions(): Array<HTMLDivElement> {
    const { scaleDivisions } = this;

    return scaleDivisions;
  }

  public update(props: {
    thumbsParent: HTMLDivElement,
    axis: ViewAxis,
    thumbSize: number,
    min: number,
    max: number,
    step: number,
  }): void {
    const { scaleDivisions, localeProps } = this;
    const {
      thumbsParent,
      axis,
      thumbSize,
      min,
      max,
    } = props;
    let { step } = props;
    const n = scaleDivisions.length;
    const maxPixelValue = thumbsParent.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;
    const delta = max - min;

    for (let i = 0; i < n; i += 1) {
      let addition: number;
      let roundCoef = 0.5;

      if (i === 0) {
        addition = 0;
      } else {
        const parentBorderThickness = getComputedStyle(thumbsParent).borderWidth
          ? getComputedStyle(thumbsParent).borderWidth
          : getComputedStyle(thumbsParent).borderTopWidth;

        addition = ((thumbSize / 2) - parseInt(parentBorderThickness, 10));
        if (i === n - 1) {
          addition *= 2;
          roundCoef = 0;
          step = delta;
        }
      }

      const proportion = Math.floor(((i / (n - 1)) * delta) / step + roundCoef) / (1 / step)
        / delta;

      scaleDivisions[i].style[axis.styleSelector] = `${proportion * maxPixelValue + addition}px`;

      scaleDivisions[i].dataset.value = ((delta * proportion) + min).toLocaleString('en-US', { useGrouping: false });
      scaleDivisions[i].textContent = ((delta * proportion) + min).toLocaleString('ru', localeProps);
    }
  }

  private handleScaleClick = (props: {
    selector: string,
    setValue: (props: {
      val1?: number,
      val2?: number,
    }) => void,
    getValue: () => number[],
  }, e: Event): void => {
    const { selector, setValue, getValue } = props;

    if (!(e.target instanceof HTMLElement) || !e.target.matches(`.${selector}__scale-division`)) return;

    const { target } = e;
    const scaleDivisionValue = Number((target.dataset.value ?? ''));

    const isSecondValue = getValue().length === 2
      && (Math.abs(scaleDivisionValue - getValue()[1])
        < Math.abs(scaleDivisionValue - getValue()[0]));

    const isEquals = getValue().length === 2
      && (Math.abs(scaleDivisionValue - getValue()[1])
        === Math.abs(scaleDivisionValue - getValue()[0]));

    if (isSecondValue) {
      setValue({ val2: scaleDivisionValue });
    } else if (isEquals) {
      if (getValue()[1] < scaleDivisionValue) {
        setValue({ val2: scaleDivisionValue });
      } else {
        setValue({ val1: scaleDivisionValue });
      }
    } else {
      setValue({ val1: scaleDivisionValue });
    }
  };
}

export default Scale;
