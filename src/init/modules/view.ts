import EventEmitter from './eventEmitter';
import { ISliderModel, ISliderView } from './interfaces';
import type { Config } from './customTypes';

// ======================================
//              Double Slider
// ======================================
export default class SliderView extends EventEmitter implements ISliderView {
  private thumbSize: number;

  private model: ISliderModel;

  private sliderRange: HTMLDivElement;

  private outputValues: Array<HTMLDivElement>;

  private axis: {
    sizeParent: 'height' | 'width',
    styleSelector: 'bottom' | 'left'
  };

  private isPopUp: boolean;

  public sliderScale: Array<HTMLDivElement>;

  public sliderThumbs: Array<HTMLDivElement>;

  public parentThumbs: HTMLDivElement;

  constructor(model: ISliderModel, parent: HTMLDivElement, cfg: Config) {
    super();

    this.model = model;
    this.outputValues = [];
    this.sliderThumbs = [];
    this.sliderScale = [];
    this.isPopUp = cfg.popUpOfValue;

    if (cfg.orientation === 'vertical') {
      parent.classList.add('vertical');
      this.axis = {
        sizeParent: 'height',
        styleSelector: 'bottom',
      };
    } else {
      this.axis = {
        sizeParent: 'width',
        styleSelector: 'left',
      };
    }

    const sliderHeader = document.createElement('div');
    sliderHeader.classList.add('multislider-v43-header');
    parent.appendChild(sliderHeader);

    const sliderDescription = document.createElement('div');
    sliderDescription.classList.add('multislider-v43-header__description');
    sliderDescription.innerText = cfg.description;
    sliderHeader.appendChild(sliderDescription);

    if (!this.isPopUp) {
      const sliderOutput = document.createElement('div');
      sliderOutput.classList.add('multislider-v43-header__output');
      sliderHeader.appendChild(sliderOutput);

      const sliderValueFirst = document.createElement('div');
      sliderValueFirst.classList.add('multislider-v43-header__value');
      sliderValueFirst.innerText = `${cfg.minValue}`;
      sliderOutput.appendChild(sliderValueFirst);
      this.outputValues.push(sliderValueFirst);

      if (model.getValue().length === 2) {
        const sliderSpacer = document.createElement('div');
        sliderSpacer.classList.add('multislider-v43-header__spacer');
        sliderSpacer.innerText = '\xa0–\xa0';
        sliderOutput.appendChild(sliderSpacer);

        const sliderValueSecond = document.createElement('div');
        sliderValueSecond.classList.add('multislider-v43-header__value');
        sliderValueSecond.innerText = `${cfg.maxValue}`;
        sliderOutput.appendChild(sliderValueSecond);
        this.outputValues.push(sliderValueSecond);
      }
    }

    const sliderBody = document.createElement('div');
    sliderBody.classList.add('multislider-v43-body');
    parent.appendChild(sliderBody);
    this.parentThumbs = sliderBody;

    for (let i: number = 0; i < model.getValue().length; i += 1) {
      const sliderThumb = document.createElement('div');
      sliderThumb.classList.add('multislider-v43-body__thumb');
      sliderBody.appendChild(sliderThumb);
      this.sliderThumbs.push(sliderThumb);

      if (this.isPopUp) {
        const sliderThumbPopUp = document.createElement('div');
        sliderThumbPopUp.classList.add('multislider-v43-body__popup');
        sliderBody.appendChild(sliderThumbPopUp);
        this.outputValues.push(sliderThumbPopUp);
      }
    }

    this.thumbSize = parseInt(getComputedStyle(this.sliderThumbs[0]).width, 10);

    if (cfg.isProgressBar) {
      this.sliderRange = document.createElement('div');
      this.sliderRange.classList.add('multislider-v43-body__range');
      sliderBody.appendChild(this.sliderRange);
    }

    if (cfg.scaleOfValues) {
      const sliderScale = document.createElement('div');
      sliderScale.classList.add('multislider-v43-body__scale');
      sliderBody.appendChild(sliderScale);
      this.renderScale(cfg.scaleOfValues, sliderScale);
    }

    this.model.on('valueChanged', this.update.bind(this));

    window.addEventListener('resize', this.update.bind(this));
    window.addEventListener('resize', this.updateScale.bind(this));

    document.addEventListener('DOMContentLoaded', this.update.bind(this)); // fix important bug with appearance browser's scroll bar in process of rendering sliders, as a result,
    document.addEventListener('DOMContentLoaded', this.updateScale.bind(this)); // the value of getBoundingClientRect() changes to new, this is the reason for the incorrect display

    this.update();
  }

  public getThumbSize() {
    return this.thumbSize;
  }

  public getAxis() {
    return this.axis.sizeParent === 'height' ? 'Y' : 'X';
  }

  public update() {
    const thumbsValues = this.model.getValue();
    const maxPixelValue = this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]
      - this.thumbSize;

    this.sliderThumbs.forEach((item, i) => {
      const position = maxPixelValue
        * ((thumbsValues[i].value - this.model.getMin())
          / (this.model.getMax() - this.model.getMin()))
        - parseInt(getComputedStyle(this.parentThumbs).borderWidth, 10);

      this.sliderThumbs[i].style[this.axis.styleSelector] = `${position}px`;
      this.outputValues[i].innerText = `${thumbsValues[i].value}`;

      if (this.isPopUp) {
        this.outputValues[i].style[this.axis.styleSelector] = `${position + this.getThumbSize() / 2}px`;
      }
    });

    if (this.sliderRange) {
      this.sliderRange.style[this.axis.styleSelector] = `${parseInt(this.sliderThumbs[0].style[this.axis.styleSelector], 10)
        + (this.thumbSize / 2)}px`;
      this.sliderRange.style[this.axis.sizeParent] = `${parseInt(this.sliderThumbs[1].style[this.axis.styleSelector], 10)
        - parseInt(this.sliderThumbs[0].style[this.axis.styleSelector], 10)}px`;
    }
  }

  private renderScale(n: number, parent: HTMLDivElement) {
    for (let i = 0; i < n; i += 1) {
      const scaleElement = document.createElement('div');

      scaleElement.classList.add('multislider-v43-body__scale-division');
      this.sliderScale.push(scaleElement);
      parent.appendChild(scaleElement);
    }
    this.updateScale();
  }

  private updateScale() {
    const n = this.sliderScale.length;

    for (let i = 0; i < n; i += 1) {
      this.sliderScale[i].style[this.axis.styleSelector] = `${(i / (n - 1))
        * (this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent] - this.thumbSize)
        + ((this.thumbSize / 2) - parseInt(getComputedStyle(this.parentThumbs).borderWidth, 10))}px`;
      this.sliderScale[i].innerHTML = `${(this.model.getMax() - this.model.getMin())
        * (i / (n - 1)) + this.model.getMin()}`;
    }
  }
}
