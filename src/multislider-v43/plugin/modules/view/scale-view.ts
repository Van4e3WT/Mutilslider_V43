class ScaleView {
  private scale: HTMLDivElement;

  private scaleDivisions: Array<HTMLDivElement>;

  constructor() {
    this.scaleDivisions = [];
  }

  public init(n: number, selector: string, isVertical = false) {
    this.scale = document.createElement('div');
    this.scale.classList.add(`${selector}`);

    for (let i = 0; i < n; i += 1) {
      const scaleDivision = document.createElement('div');

      scaleDivision.classList.add(`${selector}-division`);
      if (isVertical) {
        scaleDivision.classList.add(`${selector}-division_vertical`);
      }
      this.scaleDivisions.push(scaleDivision);
      this.scale.appendChild(scaleDivision);
    }
  }

  public getScale() {
    return this.scale;
  }

  public getScales() {
    return this.scaleDivisions;
  }

  public update(props) {
    const {
      parentThumbs,
      axis,
      thumbSize,
      min,
      max,
    } = props;
    const n = this.scaleDivisions.length;
    const maxPixelValue = parentThumbs.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;

    for (let i = 0; i < n; i += 1) {
      const proportion = (i / (n - 1));
      let addition: number;

      if (proportion === 0) {
        addition = 0;
      } else {
        addition = ((thumbSize / 2) - parseInt(getComputedStyle(parentThumbs).borderWidth, 10));
        if (proportion === 1) {
          addition *= 2;
        }
      }

      this.scaleDivisions[i].style[axis.styleSelector] = `${proportion * maxPixelValue + addition}px`;

      const delta = max - min;

      this.scaleDivisions[i].textContent = `${+(delta * proportion).toFixed(12) + min}`.replace('.', ','); // second method pass by 0.300000000000004 when first doesn't work
    }
  }
}

export default ScaleView;
