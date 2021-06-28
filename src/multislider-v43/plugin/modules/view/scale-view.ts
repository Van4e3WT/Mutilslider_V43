class ScaleView {
  private scale: HTMLDivElement;

  private scaleDivisions: Array<HTMLDivElement>;

  constructor() {
    this.scaleDivisions = [];
  }

  public init(props) {
    const { scaleDivisions } = this;
    const {
      count,
      selector,
      isVertical,
    } = props;

    this.scale = document.createElement('div');
    this.scale.classList.add(`${selector}`);

    for (let i = 0; i < count; i += 1) {
      const scaleDivision = document.createElement('div');

      scaleDivision.classList.add(`${selector}-division`);
      if (isVertical) {
        scaleDivision.classList.add(`${selector}-division_vertical`);
      }
      scaleDivisions.push(scaleDivision);
      this.scale.appendChild(scaleDivision);
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

  public update(props) {
    const { scaleDivisions } = this;
    const {
      parentThumbs,
      axis,
      thumbSize,
      min,
      max,
      step,
    } = props;
    const n = scaleDivisions.length;
    const maxPixelValue = parentThumbs.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;

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
        }
      }

      const delta = max - min;
      const proportion = Math.floor(((i / (n - 1)) * delta) / step + roundCoef) / (1 / step)
        / delta;

      scaleDivisions[i].style[axis.styleSelector] = `${proportion * maxPixelValue + addition}px`;

      scaleDivisions[i].textContent = `${+((delta * proportion) + min).toFixed(12)}`.replace('.', ',');
      // method pass by 0.300000000000004 when first doesn't work
    }
  }
}

export default ScaleView;
