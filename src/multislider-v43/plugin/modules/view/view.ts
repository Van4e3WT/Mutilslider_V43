import ScaleView from './scale-view';
import ThumbsView from './thumbs-view';
import AdaptiveInputView from './adaptive-input-view';
import EventEmitter from '../utils/event-emitter';
import { Config } from '../utils/custom-types';

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

  private step: number;

  private length: number;

  private isPopUp: boolean;

  public outputs: AdaptiveInputView;

  public scale: ScaleView;

  public thumbs: ThumbsView;

  public parentThumbs: HTMLDivElement;

  constructor(values: Array<number>, parent: HTMLDivElement, cfg: Config) {
    super();

    this.scale = new ScaleView();
    this.outputs = new AdaptiveInputView({
      postfix: cfg.postfix,
      localeProps: cfg.localeProps,
    });
    this.thumbs = new ThumbsView();
    this.min = cfg.minValue;
    this.max = cfg.maxValue;
    this.step = cfg.step;
    this.length = values.length;
    this.isPopUp = cfg.popUpOfValue;

    this.orientation = cfg.orientation === 'vertical';
    this._initOrientation(parent);

    this._renderHeader(parent, cfg.description);

    const sliderBody = document.createElement('div');
    sliderBody.classList.add('multislider-v43__body');
    if (this.orientation) {
      sliderBody.classList.add('multislider-v43__body_vertical');
    }
    parent.appendChild(sliderBody);
    this.parentThumbs = sliderBody;

    for (let i: number = 0; i < this.length; i += 1) {
      this.thumbs.add(sliderBody, 'multislider-v43', this.orientation);

      if (this.isPopUp) {
        this.outputs.createGroup({
          parent: sliderBody,
          selector: 'multislider-v43__popup',
          isReadonly: true,
          isHided: cfg.popUpIsHided,
          isVertical: this.orientation,
        });
      }
    }

    this.thumbSize = this.thumbs.getSize();

    this._renderProgressBar(sliderBody, cfg.isProgressBar);

    this._renderScale(sliderBody, cfg.scaleOfValues);

    this.outputs.init();

    this.update(values);
  }

  public getThumbSize() {
    const { thumbSize } = this;

    return thumbSize;
  }

  public getAxis() {
    const { orientation } = this;

    return orientation;
  }

  public updateScale = () => {
    const {
      scale,
      parentThumbs,
      axis,
      thumbSize,
      min,
      max,
    } = this;

    scale.update({
      parentThumbs,
      axis,
      thumbSize,
      min,
      max,
    });
  };

  public update(thumbsValues: Array<number>) {
    const {
      parentThumbs,
      axis,
      thumbSize,
      thumbs,
      min,
      max,
      outputs,
      isPopUp,
      sliderRange,
    } = this;

    const maxPixelValue = parentThumbs.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;

    for (let i = 0; i < thumbs.getLength(); i += 1) {
      const position = maxPixelValue
        * ((thumbsValues[i] - min)
          / (max - min))
        - parseInt(getComputedStyle(parentThumbs).borderWidth, 10);

      thumbs.setStyleN(i, axis.styleSelector, position);
      outputs.updateN(i, thumbsValues[i]);

      if (isPopUp) {
        outputs.stylizeN(i, axis.styleSelector, (position + this.getThumbSize() / 2));
      }
    }

    if (sliderRange) {
      if (thumbs.getLength() === 1) {
        sliderRange.style[axis.sizeParent] = `${parseInt(thumbs.getStyleN(0, axis.styleSelector), 10)
          + (thumbSize / 2)}px`;
      }
      if (thumbs.getLength() === 2) {
        sliderRange.style[axis.styleSelector] = `${parseInt(thumbs.getStyleN(0, axis.styleSelector), 10)
          + (thumbSize / 2)}px`;
        sliderRange.style[axis.sizeParent] = `${parseInt(thumbs.getStyleN(1, axis.styleSelector), 10)
          - parseInt(thumbs.getStyleN(0, axis.styleSelector), 10)}px`;
      }
    }
  }

  private _initOrientation(parent: HTMLDivElement) {
    const { orientation } = this;

    if (orientation) {
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

  private _renderHeader(parent: HTMLDivElement, title: string) {
    const { isPopUp, outputs, length } = this;

    const sliderHeader = document.createElement('div');
    sliderHeader.classList.add('multislider-v43__header');
    parent.appendChild(sliderHeader);

    const sliderDescription = document.createElement('div');
    sliderDescription.classList.add('multislider-v43__description');
    sliderDescription.textContent = title;
    sliderHeader.appendChild(sliderDescription);

    if (!isPopUp) {
      const sliderOutput = document.createElement('div');
      sliderOutput.classList.add('multislider-v43__output');
      sliderHeader.appendChild(sliderOutput);

      outputs.createGroup({
        parent: sliderOutput,
        selector: 'multislider-v43__value',
      });

      if (length === 2) {
        const sliderSpacer = document.createElement('div');
        sliderSpacer.classList.add('multislider-v43__spacer');
        sliderSpacer.textContent = '\xa0–\xa0';
        sliderOutput.appendChild(sliderSpacer);

        outputs.createGroup({
          parent: sliderOutput,
          selector: 'multislider-v43__value',
        });
      }
    }
  }

  private _renderProgressBar(parent: HTMLDivElement, isProgressBar) {
    const { orientation } = this;

    if (!isProgressBar) return;

    this.sliderRange = document.createElement('div');
    this.sliderRange.classList.add('multislider-v43__range');

    if (orientation) {
      this.sliderRange.classList.add('multislider-v43__range_vertical');
    }

    parent.appendChild(this.sliderRange);
  }

  private _renderScale(parent: HTMLDivElement, scaleDivisions: number) {
    const {
      orientation,
      scale,
      min,
      max,
      step,
    } = this;

    const delta = max - min;
    const scaleDivisionsIsInteger = Number.isInteger((delta / (scaleDivisions - 1)) / step);

    const isValidatedScale = scaleDivisions > 1 && scaleDivisionsIsInteger;

    if (!scaleDivisions || !isValidatedScale) return;

    if (!orientation) {
      parent.classList.add('multislider-v43__body_indented');
    }

    scale.init(scaleDivisions, 'multislider-v43__scale', orientation);
    const scaleDivisionArr = scale.getScale();
    parent.appendChild(scaleDivisionArr);
    this.updateScale();
  }
}

export default SliderView;
