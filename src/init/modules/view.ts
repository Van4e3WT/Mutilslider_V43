import EventEmitter from './eventEmitter';
import ISliderModel from './interfaces';
import type { Config } from './customTypes';

class SliderView extends EventEmitter {
  private thumbSize: number;

  private model: ISliderModel;

  private sliderRange: HTMLDivElement;

  private outputValuesHided: Array<HTMLSpanElement>;

  private axis: {
    sizeParent: 'height' | 'width',
    styleSelector: 'bottom' | 'left'
  };

  private isPopUp: boolean;

  public sliderScale: Array<HTMLDivElement>;

  public sliderThumbs: Array<HTMLDivElement>;

  public outputValues: Array<HTMLInputElement>;

  public parentThumbs: HTMLDivElement;

  constructor(model: ISliderModel, parent: HTMLDivElement, cfg: Config) {
    super();

    this.model = model;
    this.outputValues = [];
    this.outputValuesHided = [];
    this.sliderThumbs = [];
    this.sliderScale = [];
    this.isPopUp = cfg.popUpOfValue;

    if (cfg.orientation === 'vertical') {
      parent.classList.add('vertical-v43');
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

      const sliderValueFirst = document.createElement('input');
      sliderValueFirst.type = 'number';
      sliderValueFirst.classList.add('multislider-v43-header__value');
      sliderValueFirst.value = `${cfg.minValue}`;
      sliderOutput.appendChild(sliderValueFirst);
      this.outputValues.push(sliderValueFirst);

      const sliderValueFirstHided = document.createElement('span');
      sliderValueFirstHided.classList.add('multislider-v43-header__value-hided');
      sliderOutput.appendChild(sliderValueFirstHided);
      this.outputValuesHided.push(sliderValueFirstHided);

      if (model.getValue().length === 2) {
        const sliderSpacer = document.createElement('div');
        sliderSpacer.classList.add('multislider-v43-header__spacer');
        sliderSpacer.innerText = '\xa0–\xa0';
        sliderOutput.appendChild(sliderSpacer);

        const sliderValueSecond = document.createElement('input');
        sliderValueSecond.type = 'number';
        sliderValueSecond.classList.add('multislider-v43-header__value');
        sliderValueSecond.value = `${cfg.maxValue}`;
        sliderOutput.appendChild(sliderValueSecond);
        this.outputValues.push(sliderValueSecond);

        const sliderValueSecondHided = document.createElement('span');
        sliderValueSecondHided.classList.add('multislider-v43-header__value-hided');
        sliderOutput.appendChild(sliderValueSecondHided);
        this.outputValuesHided.push(sliderValueSecondHided);
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
        const sliderThumbPopUp = document.createElement('input');
        sliderThumbPopUp.type = 'number';
        sliderThumbPopUp.readOnly = true;
        sliderThumbPopUp.classList.add('multislider-v43-body__popup');
        sliderBody.appendChild(sliderThumbPopUp);
        this.outputValues.push(sliderThumbPopUp);

        const sliderValueHided = document.createElement('span');
        sliderValueHided.classList.add('multislider-v43-body__popup-hided');
        sliderBody.appendChild(sliderValueHided);
        this.outputValuesHided.push(sliderValueHided);
      }
    }

    this.thumbSize = parseInt(getComputedStyle(this.sliderThumbs[0]).width, 10);

    if (cfg.isProgressBar) {
      this.sliderRange = document.createElement('div');
      this.sliderRange.classList.add('multislider-v43-body__range');
      sliderBody.appendChild(this.sliderRange);
    }

    if (cfg.scaleOfValues) {
      let scaleDivisions: number;

      if (cfg.scaleOfValues < 3) {
        scaleDivisions = 3;
      } else {
        scaleDivisions = cfg.scaleOfValues;
      }

      const sliderScale = document.createElement('div');
      sliderScale.classList.add('multislider-v43-body__scale');
      sliderBody.appendChild(sliderScale);
      this.renderScale(scaleDivisions, sliderScale);
    }

    this.outputValuesInit();

    this.update();
  }

  private outputValuesInit() {
    function addOutputEvents(i: number) {
      const val = this.outputValues[i].value;

      if (val) {
        this.outputValuesHided[i].innerText = val;
        this.outputValues[i].style.width = `${this.outputValuesHided[i].offsetWidth}px`;
      }
    }

    this.outputValues.forEach((output, i) => {
      this.outputValues[i].addEventListener('input', addOutputEvents.bind(this, i));
    });
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
      this.outputValues[i].value = `${thumbsValues[i].value}`;
      this.outputValuesHided[i].innerText = this.outputValues[i].value;
      this.outputValues[i].style.width = `${this.outputValuesHided[i].offsetWidth}px`;

      if (this.isPopUp) {
        this.outputValues[i].style[this.axis.styleSelector] = `${position + this.getThumbSize() / 2}px`;
      }
    });

    if (this.sliderRange) {
      if (this.sliderThumbs.length === 1) {
        this.sliderRange.style[this.axis.sizeParent] = `${parseInt(this.sliderThumbs[0].style[this.axis.styleSelector], 10)
          + (this.thumbSize / 2)}px`;
      }
      if (this.sliderThumbs.length === 2) {
        this.sliderRange.style[this.axis.styleSelector] = `${parseInt(this.sliderThumbs[0].style[this.axis.styleSelector], 10)
          + (this.thumbSize / 2)}px`;
        this.sliderRange.style[this.axis.sizeParent] = `${parseInt(this.sliderThumbs[1].style[this.axis.styleSelector], 10)
          - parseInt(this.sliderThumbs[0].style[this.axis.styleSelector], 10)}px`;
      }
    }
  }

  public updateScale() {
    const n = this.sliderScale.length;
    const maxPixelValue = this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]
      - this.thumbSize;

    for (let i = 0; i < n; i += 1) {
      const proportion = (i / (n - 1));

      this.sliderScale[i].style[this.axis.styleSelector] = `${proportion
        * maxPixelValue
        + ((this.thumbSize / 2) - parseInt(getComputedStyle(this.parentThumbs).borderWidth, 10))}px`;

      const delta = this.model.getMax() - this.model.getMin();

      this.sliderScale[i].innerHTML = `${+(delta * proportion).toFixed(12) + this.model.getMin()}`.replace('.', ','); // second method pass by 0.300000000000004 when first doesn't work
    }
  }
}

export { SliderView as default };
