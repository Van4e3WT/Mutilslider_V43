import ScaleView from './scale-view';
import ThumbsView from './thumbs-view';
import AdaptiveInputView from './adaptive-input-view';
import EventEmitter from '../utils/event-emitter';
import { Config, ViewAxis } from '../utils/custom-types';

class SliderView extends EventEmitter {
  private thumbSize: number;

  private sliderRange: HTMLDivElement | undefined;

  private axis: ViewAxis;

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
    parent: HTMLElement,
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
    this.scale = new ScaleView({
      localeProps,
    });
    this.outputs = new AdaptiveInputView({
      postfix,
      localeProps,
    });
    this.thumbs = new ThumbsView();
    this.min = minValue;
    this.max = maxValue;
    this.step = step;
    this.length = values.length;
    this.isPopUp = popUpOfValue ?? false;

    this.isVertical = isVertical ?? false;

    if (this.isVertical) {
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

    this.renderHeader(parent, description);

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

    this.renderProgressBar(sliderBody, isProgressBar);

    this.renderScale(sliderBody, scaleOfValues);

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

      thumbs.setStyleN({ n: i, prop: axis.styleSelector, value: position });
      outputs.updateN(i, thumbsValues[i]);

      if (isPopUp) {
        outputs.stylizeN({
          n: i,
          prop: axis.styleSelector,
          value: (position + this.getThumbSize() / 2),
        });
      }
    }

    if (sliderRange) {
      if (thumbs.getLength() === 1) {
        sliderRange.style[axis.sizeParent] = `${parseInt(thumbs.getStyleN({ n: 0, prop: axis.styleSelector }), 10)
          + (thumbSize / 2)}px`;
      }
      if (thumbs.getLength() === 2) {
        sliderRange.style[axis.styleSelector] = `${parseInt(thumbs.getStyleN({ n: 0, prop: axis.styleSelector }), 10)
          + (thumbSize / 2)}px`;
        sliderRange.style[axis.sizeParent] = `${parseInt(thumbs.getStyleN({ n: 1, prop: axis.styleSelector }), 10)
          - parseInt(thumbs.getStyleN({ n: 0, prop: axis.styleSelector }), 10)}px`;
      }
    }
  }

  private renderHeader(parent: HTMLElement, title: string = '') {
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

  private renderProgressBar(parent: HTMLElement, isProgressBar: boolean = false) {
    const { isVertical, selector } = this;

    if (!isProgressBar) return;

    this.sliderRange = document.createElement('div');
    this.sliderRange.classList.add(`${selector}__range`);

    if (isVertical) {
      this.sliderRange.classList.add(`${selector}__range_vertical`);
    }

    parent.appendChild(this.sliderRange);
  }

  private renderScale(parent: HTMLElement, scaleDivisions: number = 0) {
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
