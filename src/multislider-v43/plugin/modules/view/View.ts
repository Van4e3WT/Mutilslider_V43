import EventEmitter from '../utils/EventEmitter';
import { Config, ViewAxis } from '../utils/custom-types';
import Scale from './Scale';
import Thumbs from './Thumbs';
import IO from './IO';

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
      tooltipIsHidden,
      isProgressBar,
      scaleOfValues,
    } = cfg;

    this.selector = selector;
    this.scale = new Scale({
      localeProps,
      selector,
    });
    this.outputs = new IO({
      postfix,
      localeProps,
      tooltipOfValue,
      tooltipIsHidden,
    });
    this.thumbs = new Thumbs({
      selector,
    });
    this.min = minValue;
    this.max = maxValue;
    this.step = step;
    this.thumbsCount = values.length;
    this.tooltipIsActive = tooltipOfValue ?? false;

    this.isVertical = isVertical ?? false;

    if (this.isVertical) {
      parent.classList.add(`${selector}_vertical`);
      this.axis = {
        styleSelector: 'bottom',
        axis: 'y',
        eventAxis: 'pageY',
        sizeParent: 'height',
        start: 'top',
        end: 'bottom',
        dPos: -1,
      };
    } else {
      this.axis = {
        styleSelector: 'left',
        axis: 'x',
        eventAxis: 'pageX',
        sizeParent: 'width',
        start: 'left',
        end: 'right',
        dPos: 1,
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
      this.thumbs.add(sliderBody, this.isVertical);

      if (this.tooltipIsActive) {
        this.outputs.createGroup({
          parent: sliderBody,
          selector: `${selector}__tooltip`,
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

  public init(props: {
    getValue: () => number[],
    setValue: (props: {
      val1?: number,
      val2?: number,
    }) => void,
    getMin: () => number,
    getMax: () => number,
  }) {
    const {
      axis,
      scale,
      outputs,
      thumbs,
      thumbsParent,
      tooltipIsActive,
    } = this;

    const {
      getValue,
      setValue,
      getMin,
      getMax,
    } = props;

    const additionalListeners = tooltipIsActive ? outputs.getIOParents() : undefined;

    const handleListenerUpdate = () => {
      this.update(getValue());
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

    thumbs.initEvents({
      thumbsParent,
      axis,
      setValue,
      getValue,
      getMin,
      getMax,
      additionalListeners,
    });

    outputs.initEvents({
      setValue,
      getValue,
    });

    this.initEvents({
      setValue,
      getValue,
      getMin,
      getMax,
    });

    if (scale.getScaleDivisions().length) {
      scale.initEvents({
        setValue,
        getValue,
      });
    }
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
    const parentBorderThickness = getComputedStyle(thumbsParent).borderWidth
      ? getComputedStyle(thumbsParent).borderWidth
      : getComputedStyle(thumbsParent).borderTopWidth;

    for (let i = 0; i < thumbs.getLength(); i += 1) {
      const position = maxPixelValue
        * ((thumbsValues[i] - min)
          / (max - min)) - parseInt(parentBorderThickness, 10);

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

  private initEvents(props: {
    getValue: () => number[],
    setValue: (props: {
      val1?: number,
      val2?: number,
    }) => void,
    getMin: () => number,
    getMax: () => number,
  }) {
    const { thumbsParent, axis, selector } = this;

    const {
      getValue,
      setValue,
      getMin,
      getMax,
    } = props;

    const handleBodyThumbsClick = (e: PointerEvent) => {
      const target = e.target as HTMLDivElement;

      if (!target.classList.contains(`${selector}__body`)) return;

      const delta = target.getBoundingClientRect()[axis.end]
        - target.getBoundingClientRect()[axis.start];
      const proportion = (e[axis.axis] - target.getBoundingClientRect()[axis.start]) / delta;

      const newValue = (getMax() - getMin())
        * (axis.axis === 'y' ? 1 - proportion : proportion) + getMin();

      const isSecondValue = getValue().length === 2
        && (Math.abs(newValue - getValue()[1])
          < Math.abs(newValue - getValue()[0]));

      const isEquals = getValue().length === 2
        && (Math.abs(newValue - getValue()[1])
          === Math.abs(newValue - getValue()[0]));

      if (isSecondValue) {
        setValue({ val2: newValue });
      } else if (isEquals) {
        if (getValue()[1] < newValue) {
          setValue({ val2: newValue });
        } else {
          setValue({ val1: newValue });
        }
      } else {
        setValue({ val1: newValue });
      }
    };

    thumbsParent.addEventListener('pointerdown', handleBodyThumbsClick);
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
      isVertical,
    });
    const scaleDivisionArr = scale.getScale();
    parent.appendChild(scaleDivisionArr);
    this.updateScale();
  }
}

export default View;
