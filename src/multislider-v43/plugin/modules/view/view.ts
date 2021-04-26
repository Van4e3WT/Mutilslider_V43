import Scale from './scale';
import AdaptiveInput from './adaptive-input';
import EventEmitter from '../event-emitter';
import type { Config } from '../custom-types';

class SliderView extends EventEmitter {
  private thumbSize: number;

  private sliderRange: HTMLDivElement;

  private axis: {
    sizeParent: 'height' | 'width',
    styleSelector: 'bottom' | 'left'
  };

  private orientation: boolean; // false - axis X (horizontal), true - axis Y (vertical)

  private min: number;

  private max: number;

  private length: number;

  private isPopUp: boolean;

  public outputs: AdaptiveInput;

  public scale: Scale;

  public sliderThumbs: Array<HTMLDivElement>;

  public parentThumbs: HTMLDivElement;

  constructor(values: Array<number>, parent: HTMLDivElement, cfg: Config) {
    super();

    this.scale = new Scale();
    this.outputs = new AdaptiveInput();
    this.sliderThumbs = [];
    this.min = cfg.minValue;
    this.max = cfg.maxValue;
    this.length = values.length;
    this.isPopUp = cfg.popUpOfValue;
    this.orientation = cfg.orientation === 'vertical';

    this.initOrientation(parent);

    this.renderHeader(parent, cfg.description);

    const sliderBody = document.createElement('div');
    sliderBody.classList.add('multislider-v43__body');
    parent.appendChild(sliderBody);
    this.parentThumbs = sliderBody;

    for (let i: number = 0; i < this.length; i += 1) {
      const sliderThumb = document.createElement('div');
      sliderThumb.classList.add('multislider-v43__thumb');
      sliderBody.appendChild(sliderThumb);
      this.sliderThumbs.push(sliderThumb);

      if (this.isPopUp) {
        const outputPopup = this.outputs.createGroup('multislider-v43__popup', 0, true);

        sliderBody.appendChild(outputPopup.input);

        sliderBody.appendChild(outputPopup.span);
      }
    }

    this.thumbSize = parseInt(getComputedStyle(this.sliderThumbs[0]).width, 10);

    this.renderProgressBar(sliderBody, cfg.isProgressBar);

    this.renderScale(sliderBody, cfg.scaleOfValues);

    this.outputs.init();

    this.update(values);
  }

  public getThumbSize() {
    return this.thumbSize;
  }

  public getAxis() {
    return this.orientation;
  }

  public updateScale = () => {
    this.scale.update({
      parentThumbs: this.parentThumbs,
      axis: this.axis,
      thumbSize: this.thumbSize,
      min: this.min,
      max: this.max,
    });
  };

  public update(thumbsValues) {
    const maxPixelValue = this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]
      - this.thumbSize;

    this.sliderThumbs.forEach((item, i) => {
      const position = maxPixelValue
        * ((thumbsValues[i] - this.min)
          / (this.max - this.min))
        - parseInt(getComputedStyle(this.parentThumbs).borderWidth, 10);

      this.sliderThumbs[i].style[this.axis.styleSelector] = `${position}px`;
      this.outputs.updateN(i, thumbsValues[i]);

      if (this.isPopUp) {
        this.outputs.styleN(i, this.axis.styleSelector, (position + this.getThumbSize() / 2));
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

  private initOrientation(parent: HTMLDivElement) {
    if (this.orientation) {
      parent.classList.add('multislider-v43_vertical');
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
  }

  private renderHeader(parent: HTMLDivElement, title: string) {
    const sliderHeader = document.createElement('div');
    sliderHeader.classList.add('multislider-v43__header');
    parent.appendChild(sliderHeader);

    const sliderDescription = document.createElement('div');
    sliderDescription.classList.add('multislider-v43__description');
    sliderDescription.textContent = title;
    sliderHeader.appendChild(sliderDescription);

    if (!this.isPopUp) {
      const sliderOutput = document.createElement('div');
      sliderOutput.classList.add('multislider-v43__output');
      sliderHeader.appendChild(sliderOutput);

      const outputFirst = this.outputs.createGroup('multislider-v43__value', this.min);

      sliderOutput.appendChild(outputFirst.input);
      sliderOutput.appendChild(outputFirst.span);

      if (this.length === 2) {
        const sliderSpacer = document.createElement('div');
        sliderSpacer.classList.add('multislider-v43__spacer');
        sliderSpacer.textContent = '\xa0–\xa0';
        sliderOutput.appendChild(sliderSpacer);

        const outputSecond = this.outputs.createGroup('multislider-v43__value', this.max);

        sliderOutput.appendChild(outputSecond.input);
        sliderOutput.appendChild(outputSecond.span);
      }
    }
  }

  private renderProgressBar(parent: HTMLDivElement, isProgressBar) {
    if (!isProgressBar) return;

    this.sliderRange = document.createElement('div');
    this.sliderRange.classList.add('multislider-v43__range');
    parent.appendChild(this.sliderRange);
  }

  private renderScale(parent: HTMLDivElement, scaleDivisions: number) {
    if (!scaleDivisions) return;

    this.scale.init(scaleDivisions < 3 ? 3 : scaleDivisions, 'multislider-v43__scale');
    const scale = this.scale.getScale();
    parent.appendChild(scale);
    this.updateScale();
  }
}

export default SliderView;
