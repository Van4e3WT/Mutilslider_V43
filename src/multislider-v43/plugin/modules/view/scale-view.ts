class ScaleView {
  private scale: HTMLDivElement;

  private scaleDivisions: Array<HTMLDivElement>;

  constructor() {
    this.scaleDivisions = [];
  }

  public init(n: number, selector: string) {
    this.scale = document.createElement('div');
    this.scale.classList.add(`${selector}`);

    for (let i = 0; i < n; i += 1) {
      const scaleDivision = document.createElement('div');

      scaleDivision.classList.add(`${selector}-division`);
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

      this.scaleDivisions[i].style[axis.styleSelector] = `${proportion
        * maxPixelValue
        + ((thumbSize / 2) - parseInt(getComputedStyle(parentThumbs).borderWidth, 10))}px`;

      const delta = max - min;

      this.scaleDivisions[i].textContent = `${+(delta * proportion).toFixed(12) + min}`.replace('.', ','); // second method pass by 0.300000000000004 when first doesn't work
    }
  }
}

export default ScaleView;
