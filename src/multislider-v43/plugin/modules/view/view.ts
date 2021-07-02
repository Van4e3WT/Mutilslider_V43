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
    styleSelector: 'bottom' | 'left',
  };

  private min: number;

  private max: number;

  private step: number;

  private length: number;

  private isPopUp: boolean;

  public selector: string;

  public isVertical: boolean;

  public outputs: AdaptiveInputView;

  public scale: ScaleView;

  public thumbs: ThumbsView;

  public parentThumbs: HTMLDivElement;

  constructor(props: {
    values: Array<number>,
    parent: HTMLDivElement,
    cfg: Config,
    selector: string,
  }) {
    super();

    const {
      values,
      parent,
      cfg,
      selector,
    } = props;

    const {
      postfix,
      localeProps,
      minValue,
      maxValue,
      step,
      popUpOfValue,
      isVertical,
      description,
      popUpIsHided,
      isProgressBar,
      scaleOfValues,
    } = cfg;

    this.selector = selector;
    this.scale = new ScaleView();
    this.outputs = new AdaptiveInputView({
      postfix,
      localeProps,
    });
    this.thumbs = new ThumbsView();
    this.min = minValue;
    this.max = maxValue;
    this.step = step;
    this.length = values.length;
    this.isPopUp = popUpOfValue;

    this.isVertical = isVertical;
    this._initOrientation(parent);

    this._renderHeader(parent, description);

    const sliderBody = document.createElement('div');
    sliderBody.classList.add(`${selector}__body`);

    if (this.isVertical) {
      sliderBody.classList.add(`${selector}__body_vertical`);
    }

    parent.appendChild(sliderBody);
    this.parentThumbs = sliderBody;

    for (let i: number = 0; i < this.length; i += 1) {
      this.thumbs.add(sliderBody, selector, this.isVertical);

      if (this.isPopUp) {
        this.outputs.createGroup({
          parent: sliderBody,
          selector: `${selector}__popup`,
          isReadonly: true,
          isHided: popUpIsHided,
          isVertical: this.isVertical,
        });
      }
    }

    this.thumbSize = this.thumbs.getSize();

    this._renderProgressBar(sliderBody, isProgressBar);

    this._renderScale(sliderBody, scaleOfValues);

    this.outputs.init();

    this.update(values);
  }

  public getThumbSize() {
    const { thumbSize } = this;

    return thumbSize;
  }

  public updateScale = () => {
    const {
      scale,
      parentThumbs,
      axis,
      thumbSize,
      min,
      max,
      step,
    } = this;

    scale.update({
      parentThumbs,
      axis,
      thumbSize,
      min,
      max,
      step,
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
    const { isVertical, selector } = this;

    if (isVertical) {
      parent.classList.add(`${selector}_vertical`);
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
    const {
      isPopUp,
      outputs,
      length,
      selector,
    } = this;

    const sliderHeader = document.createElement('div');
    sliderHeader.classList.add(`${selector}__header`);
    parent.appendChild(sliderHeader);

    const sliderDescription = document.createElement('div');
    sliderDescription.classList.add(`${selector}__description`);
    sliderDescription.textContent = title;
    sliderHeader.appendChild(sliderDescription);

    if (!isPopUp) {
      const sliderOutput = document.createElement('div');
      sliderOutput.classList.add(`${selector}__output`);
      sliderHeader.appendChild(sliderOutput);

      outputs.createGroup({
        parent: sliderOutput,
        selector: `${selector}__value`,
      });

      if (length === 2) {
        const sliderSpacer = document.createElement('div');
        sliderSpacer.classList.add(`${selector}__spacer`);
        sliderSpacer.textContent = '\xa0–\xa0';
        sliderOutput.appendChild(sliderSpacer);

        outputs.createGroup({
          parent: sliderOutput,
          selector: `${selector}__value`,
        });
      }
    }
  }

  private _renderProgressBar(parent: HTMLDivElement, isProgressBar) {
    const { isVertical, selector } = this;

    if (!isProgressBar) return;

    this.sliderRange = document.createElement('div');
    this.sliderRange.classList.add(`${selector}__range`);

    if (isVertical) {
      this.sliderRange.classList.add(`${selector}__range_vertical`);
    }

    parent.appendChild(this.sliderRange);
  }

  private _renderScale(parent: HTMLDivElement, scaleDivisions: number) {
    const {
      isVertical,
      scale,
      selector,
    } = this;

    if (scaleDivisions < 2) return;

    if (!isVertical) {
      parent.classList.add(`${selector}__body_indented`);
    }

    scale.init({
      count: scaleDivisions,
      selector: `${selector}__scale`,
      isVertical,
    });
    const scaleDivisionArr = scale.getScale();
    parent.appendChild(scaleDivisionArr);
    this.updateScale();
  }
}

export default SliderView;
