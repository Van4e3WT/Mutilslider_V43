import EventEmitter from './eventEmitter';
import { ISliderModel, ISliderView } from './interfaces';
import type { Config } from './customTypes';

// ======================================
//              Double Slider
// ======================================
export default class SliderView extends EventEmitter implements ISliderView {
  private THUMB_SIZE: number = 24;

  private model: ISliderModel;

  private sliderRange: HTMLDivElement;

  private outputValues: Array<HTMLDivElement>;

  private axis: {
    sizeParent: 'height' | 'width',
    styleSelector: 'bottom' | 'left'
  };

  public sliderThumbs: Array<HTMLDivElement>;

  public parentThumbs: HTMLDivElement;

  constructor(model: ISliderModel, parent: HTMLDivElement, cfg: Config) {
    super();

    this.model = model;
    this.outputValues = [];
    this.sliderThumbs = [];

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

    const sliderBody = document.createElement('div');
    sliderBody.classList.add('multislider-v43-body');
    parent.appendChild(sliderBody);
    this.parentThumbs = sliderBody;

    for (let i: number = 0; i < model.getValue().length; i += 1) {
      const sliderThumbFirst = document.createElement('div');
      sliderThumbFirst.classList.add('multislider-v43-body__thumb');
      sliderBody.appendChild(sliderThumbFirst);
      this.sliderThumbs.push(sliderThumbFirst);
    }

    if (cfg.isProgressBar) {
      this.sliderRange = document.createElement('div');
      this.sliderRange.classList.add('multislider-v43-body__range');
      sliderBody.appendChild(this.sliderRange);
    }

    this.model.on('valueChanged', this.update.bind(this));

    this.update();
  }

  public GET_THUMB_SIZE() {
    return this.THUMB_SIZE;
  }

  public getAxis() {
    return this.axis.sizeParent === 'height' ? 'Y' : 'X';
  }

  public update() {
    const thumbsValues = this.model.getValue();
    const maxPixelValue = this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]
      - this.THUMB_SIZE;

    this.sliderThumbs.forEach((item, i) => {
      this.sliderThumbs[i].style[this.axis.styleSelector] = `${maxPixelValue * ((thumbsValues[i].value - this.model.getMin()) / (this.model.getMax() - this.model.getMin())) - (this.THUMB_SIZE / 10)}px`;
      this.outputValues[i].innerText = `${thumbsValues[i].value}`;
    });

    if (this.sliderRange) {
      this.sliderRange.style[this.axis.styleSelector] = `${parseInt(this.sliderThumbs[0].style[this.axis.styleSelector], 10) + (this.THUMB_SIZE / 2)}px`;
      this.sliderRange.style[this.axis.sizeParent] = `${parseInt(this.sliderThumbs[1].style[this.axis.styleSelector], 10) - parseInt(this.sliderThumbs[0].style[this.axis.styleSelector], 10)}px`;
    }
  }
}
