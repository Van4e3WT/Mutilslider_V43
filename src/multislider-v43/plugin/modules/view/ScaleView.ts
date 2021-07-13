import { ViewAxis } from 'Plugin/modules/utils/custom-types';

class ScaleView {
  private scale: HTMLDivElement;

  private scaleDivisions: Array<HTMLDivElement>;

  private localeProps: object | undefined;

  constructor(props: {
    localeProps: object | undefined,
  }) {
    const { localeProps } = props;
    this.localeProps = localeProps;
    this.scaleDivisions = [];
    this.scale = document.createElement('div');
  }

  public init(props: { count: number, selector: string, isVertical: boolean }) {
    const { scaleDivisions, scale } = this;
    const {
      count,
      selector,
      isVertical,
    } = props;

    scale.classList.add(`${selector}`);

    for (let i = 0; i < count; i += 1) {
      const scaleDivision = document.createElement('div');

      scaleDivision.classList.add(`${selector}-division`);
      if (isVertical) {
        scaleDivision.classList.add(`${selector}-division_vertical`);
      }
      scaleDivisions.push(scaleDivision);
      scale.appendChild(scaleDivision);
    }
  }

  public getScale() {
    const { scale } = this;

    return scale;
  }

  public getScales() {
    const { scaleDivisions } = this;

    return scaleDivisions;
  }

  public update(props: {
    parentThumbs: HTMLDivElement,
    axis: ViewAxis,
    thumbSize: number,
    min: number,
    max: number,
    step: number,
  }) {
    const { scaleDivisions, localeProps } = this;
    const {
      parentThumbs,
      axis,
      thumbSize,
      min,
      max,
    } = props;
    let { step } = props;
    const n = scaleDivisions.length;
    const maxPixelValue = parentThumbs.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;
    const delta = max - min;

    for (let i = 0; i < n; i += 1) {
      let addition: number;
      let roundCoef = 0.5;

      if (i === 0) {
        addition = 0;
      } else {
        addition = ((thumbSize / 2) - parseInt(getComputedStyle(parentThumbs).borderWidth, 10));
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
}

export default ScaleView;
