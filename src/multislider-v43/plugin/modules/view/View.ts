import Scale from './Scale';
import Thumbs from './Thumbs';
import IO from './IO';
import EventEmitter from '../utils/EventEmitter';
import { Config, ViewAxis } from '../utils/custom-types';

class View extends EventEmitter {
  private thumbSize: number;

  private sliderRange: HTMLDivElement | undefined;

  private axis: ViewAxis;

  private min: number;

  private max: number;

  private step: number;

  private thumbsCount: number;

  private tooltipIsActive: boolean;

  public selector: string;

  public isVertical: boolean;

  public outputs: IO;

  public scale: Scale;

  public thumbs: Thumbs;

  public thumbsParent: HTMLDivElement;

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
      tooltipOfValue,
      isVertical,
      description,
      tooltipIsHided,
      isProgressBar,
      scaleOfValues,
    } = cfg;

    this.selector = selector;
    this.scale = new Scale({
      localeProps,
    });
    this.outputs = new IO({
      postfix,
      localeProps,
    });
    this.thumbs = new Thumbs();
    this.min = minValue;
    this.max = maxValue;
    this.step = step;
    this.thumbsCount = values.length;
    this.tooltipIsActive = tooltipOfValue ?? false;

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
    this.thumbsParent = sliderBody;

    for (let i: number = 0; i < this.thumbsCount; i += 1) {
      this.thumbs.add(sliderBody, selector, this.isVertical);

      if (this.tooltipIsActive) {
        this.outputs.createGroup({
          parent: sliderBody,
          selector: `${selector}__tooltip`,
          isReadonly: true,
          isHided: tooltipIsHided,
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

  public init(getValues: () => number[]) {
    const handleListenerUpdate = () => {
      this.update(getValues());
    };

    window.addEventListener('resize', handleListenerUpdate);
    window.addEventListener('resize', this.updateScale);

    document.addEventListener('DOMContentLoaded', handleListenerUpdate);
    document.addEventListener('DOMContentLoaded', this.updateScale);

    /*
      That document listeners fix important bug with appearance browser's scroll bar
      in process of rendering sliders, as a result, the value of getBoundingClientRect()
      changes to new, this is the reason for the incorrect display
    */
  }

  public updateScale = () => {
    const {
      scale,
      thumbsParent,
      axis,
      thumbSize,
      min,
      max,
      step,
    } = this;

    scale.update({
      thumbsParent,
      axis,
      thumbSize,
      min,
      max,
      step,
    });
  };

  public update(thumbsValues: Array<number>) {
    const {
      thumbsParent,
      axis,
      thumbSize,
      thumbs,
      min,
      max,
      outputs,
      tooltipIsActive,
      sliderRange,
    } = this;

    const maxPixelValue = thumbsParent.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;

    for (let i = 0; i < thumbs.getLength(); i += 1) {
      const position = maxPixelValue
        * ((thumbsValues[i] - min)
          / (max - min))
        - parseInt(getComputedStyle(thumbsParent).borderWidth, 10);

      thumbs.moveThumb({ n: i, prop: axis.styleSelector, value: position });
      outputs.setIO(i, thumbsValues[i]);

      if (tooltipIsActive) {
        outputs.moveIO({
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
      tooltipIsActive,
      outputs,
      thumbsCount,
      selector,
    } = this;

    const sliderHeader = document.createElement('div');
    sliderHeader.classList.add(`${selector}__header`);
    parent.appendChild(sliderHeader);

    const sliderDescription = document.createElement('div');
    sliderDescription.classList.add(`${selector}__description`);
    sliderDescription.textContent = title;
    sliderHeader.appendChild(sliderDescription);

    if (!tooltipIsActive) {
      const sliderOutput = document.createElement('div');
      sliderOutput.classList.add(`${selector}__output`);
      sliderHeader.appendChild(sliderOutput);

      outputs.createGroup({
        parent: sliderOutput,
        selector: `${selector}__value`,
      });

      if (thumbsCount === 2) {
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

export default View;
