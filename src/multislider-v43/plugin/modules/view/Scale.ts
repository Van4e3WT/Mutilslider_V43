import { ViewAxis } from 'Plugin/custom-types';
import EventEmitter, { SubViewEvents } from '../utils/EventEmitter';

class Scale extends EventEmitter {
  private scale: HTMLDivElement;

  private scaleDivisions: Array<HTMLDivElement>;

  private selector: string;

  private localeProps: Intl.NumberFormatOptions;

  constructor(props: { localeProps?: Intl.NumberFormatOptions, selector?: string }) {
    super();

    const { localeProps = {}, selector = 'scale' } = props;

    this.selector = selector;
    this.localeProps = { maximumFractionDigits: 10, ...localeProps };
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

    new Array(count).fill(null).forEach(() => {
      const scaleDivision = document.createElement('div');

      scaleDivision.classList.add(`${selector}__scale-division`);
      if (isVertical) {
        scaleDivision.classList.add(`${selector}__scale-division_vertical`);
      }

      scaleDivisions.push(scaleDivision);
      scale.appendChild(scaleDivision);
    });
  }

  public initEvents(): void {
    const { scale } = this;

    scale.addEventListener('click', this.handleScaleClick);
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
    const maxPixelValue = thumbsParent.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;
    const delta = max - min;

    scaleDivisions.forEach((_scaleDivision, index) => {
      let addition: number;
      let roundCoef = 0.5;

      if (index === 0) {
        addition = 0;
      } else {
        const parentBorderThickness = thumbsParent.clientLeft;

        addition = ((thumbSize / 2) - parentBorderThickness);
        if (index === scaleDivisions.length - 1) {
          addition *= 2;
          roundCoef = 0;
          step = delta;
        }
      }

      const proportion = Math.floor(((index / (scaleDivisions.length - 1)) * delta) / step
        + roundCoef) / (1 / step) / delta;

      scaleDivisions[index].style[axis.styleSelector] = `${proportion * maxPixelValue + addition}px`;

      scaleDivisions[index].dataset.value = ((delta * proportion) + min).toLocaleString('en-US', { useGrouping: false });
      scaleDivisions[index].textContent = ((delta * proportion) + min).toLocaleString('ru', localeProps);
    });
  }

  private calculateNewValue = (e: Event, value: Array<number>): void => {
    const { selector } = this;

    if (!(e.target instanceof HTMLElement)
      || !e.target.matches(`.${selector}__scale-division`)) return;

    const { target } = e;
    const scaleDivisionValue = Number((target.dataset.value ?? ''));

    const isSecondValue = value.length === 2
      && (Math.abs(scaleDivisionValue - value[1])
        < Math.abs(scaleDivisionValue - value[0]));

    const isEquals = value.length === 2
      && (Math.abs(scaleDivisionValue - value[1])
        === Math.abs(scaleDivisionValue - value[0]));

    const newValIsGreaterCurrentEqualVals = isEquals && (value[1] < scaleDivisionValue);

    if (isSecondValue || newValIsGreaterCurrentEqualVals) {
      this.emit(SubViewEvents.CHANGE_VALUE, { val2: scaleDivisionValue });
    } else {
      this.emit(SubViewEvents.CHANGE_VALUE, { val1: scaleDivisionValue });
    }
  };

  private handleScaleClick = (e: Event) => {
    this.emit(SubViewEvents.CALCULATE_VALUE, {
      handler: this.calculateNewValue.bind(this, e),
    });
  };
}

export default Scale;
