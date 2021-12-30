import { Config, MoveStyleAxis, ViewAxis } from 'Plugin/custom-types';

import EventEmitter, { ViewEvents, SubViewEvents } from '../utils/EventEmitter';
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

    this.axis = this.getAxis(parent);

    this.renderHeader(parent, description);

    this.thumbsParent = this.renderBody(parent);

    this.thumbSize = this.thumbs.getSize();

    this.renderProgressBar(this.thumbsParent, isProgressBar);

    this.renderScale(this.thumbsParent, scaleOfValues);

    this.outputs.init();

    this.update(values);
  }

  public init(): void {
    const {
      min,
      max,
      axis,
      scale,
      outputs,
      thumbs,
      thumbsParent,
      tooltipIsActive,
    } = this;

    const additionalListeners = tooltipIsActive ? outputs.getIOParents() : undefined;

    window.addEventListener('resize', this.handleSubViewChange.bind(this, {}));
    window.addEventListener('resize', this.updateScale);

    document.addEventListener('DOMContentLoaded', this.handleSubViewChange.bind(this, {}));
    document.addEventListener('DOMContentLoaded', this.updateScale);

    /*
      That document listeners fix important bug with appearance browser's scroll bar
      in process of rendering sliders, as a result, the value of getBoundingClientRect()
      changes to new, this is the reason for the incorrect display
    */

    thumbs.on(SubViewEvents.VALUE_CHANGED, this.handleSubViewChange);
    thumbs.on(SubViewEvents.VALUE_CALCULATED, this.handleSubViewCalculate);
    thumbs.initEvents({
      thumbsParent,
      min,
      max,
      axis,
      additionalListeners,
    });

    outputs.on(SubViewEvents.VALUE_CHANGED, this.handleSubViewChange);
    outputs.on(SubViewEvents.VALUE_CALCULATED, this.handleSubViewCalculate);
    outputs.initEvents();

    this.initEvents();

    if (scale.getScaleDivisions().length) {
      scale.on(SubViewEvents.VALUE_CHANGED, this.handleSubViewChange);
      scale.on(SubViewEvents.VALUE_CALCULATED, this.handleSubViewCalculate);
      scale.initEvents();
    }
  }

  public update(thumbsValues: Array<number>): void {
    const {
      thumbsParent,
      axis,
      thumbSize,
      thumbs,
      min,
      max,
      outputs,
    } = this;

    const maxPixelValue = thumbsParent.getBoundingClientRect()[axis.sizeParent]
      - thumbSize;
    const parentBorderThickness = thumbsParent.clientLeft;

    for (let i = 0; i < thumbs.getLength(); i++) {
      const position = maxPixelValue
        * ((thumbsValues[i] - min)
          / (max - min)) - parentBorderThickness;

      thumbs.moveThumb({ n: i, prop: axis.styleSelector, value: position });
      outputs.setIO(i, thumbsValues[i]);

      this.moveTooltip({
        n: i,
        prop: axis.styleSelector,
        value: (position + thumbSize / 2),
      });
    }

    this.updateSliderRange();
  }

  private moveThumbToClickedPos = (e: PointerEvent, value: number[]): void => {
    const {
      min,
      max,
      axis,
      selector,
      thumbSize,
    } = this;

    if (!(e.target instanceof HTMLElement)
      || !e.target.classList.contains(`${selector}__body`)) return;

    const { target } = e;
    const delta = target.getBoundingClientRect()[axis.end]
      - target.getBoundingClientRect()[axis.start] - thumbSize;

    const pointerPosOnAxis = e[axis.axis];
    const targetStartPosOnAxis = target.getBoundingClientRect()[axis.start];

    let damper;

    if ((pointerPosOnAxis - targetStartPosOnAxis) < thumbSize / 2) {
      damper = pointerPosOnAxis - targetStartPosOnAxis;
    } else if ((pointerPosOnAxis - targetStartPosOnAxis - thumbSize / 2) > delta) {
      damper = pointerPosOnAxis - targetStartPosOnAxis - delta;
    } else {
      damper = thumbSize / 2;
    }

    const proportion = (pointerPosOnAxis - targetStartPosOnAxis
      - damper) / delta;

    const newValue = (max - min)
      * (axis.axis === 'y' ? 1 - proportion : proportion) + min;

    const isSecondValue = value.length === 2
      && (Math.abs(newValue - value[1])
        < Math.abs(newValue - value[0]));

    const isEquals = value.length === 2
      && (Math.abs(newValue - value[1])
        === Math.abs(newValue - value[0]));

    const newValIsGreaterCurrentEqualVals = isEquals && (value[1] < newValue);

    if (isSecondValue || newValIsGreaterCurrentEqualVals) {
      this.emit(ViewEvents.VALUE_CHANGED, { val2: newValue });
    } else {
      this.emit(ViewEvents.VALUE_CHANGED, { val1: newValue });
    }
  };

  private getAxis(parent: HTMLElement): ViewAxis {
    const { isVertical, selector } = this;
    let resultAxis: ViewAxis;

    if (isVertical) {
      parent.classList.add(`${selector}_vertical`);
      resultAxis = {
        styleSelector: 'bottom',
        axis: 'y',
        eventAxis: 'clientY',
        sizeParent: 'height',
        start: 'top',
        end: 'bottom',
        dPos: -1,
      };
    } else {
      resultAxis = {
        styleSelector: 'left',
        axis: 'x',
        eventAxis: 'clientX',
        sizeParent: 'width',
        start: 'left',
        end: 'right',
        dPos: 1,
      };
    }

    return resultAxis;
  }

  private initEvents(): void {
    const { thumbsParent } = this;

    thumbsParent.addEventListener('pointerdown', this.handleBodyThumbsClick);
  }

  private renderHeader(parent: HTMLElement, title: string = ''): void {
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

    let sliderOutput: HTMLDivElement | undefined;

    if (!tooltipIsActive) {
      sliderOutput = document.createElement('div');
      sliderOutput.classList.add(`${selector}__output`);
      sliderHeader.appendChild(sliderOutput);

      outputs.createGroup({
        parent: sliderOutput,
        selector: `${selector}__value`,
      });
    }

    const isThumbsEqualTwo = thumbsCount === 2;

    if (sliderOutput && isThumbsEqualTwo) {
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

  private renderBody(parent: HTMLElement): HTMLDivElement {
    const {
      selector,
      isVertical,
      thumbs,
      outputs,
      thumbsCount,
      tooltipIsActive,
    } = this;

    const sliderBody = document.createElement('div');
    sliderBody.classList.add(`${selector}__body`);

    if (isVertical) {
      sliderBody.classList.add(`${selector}__body_vertical`);
    }

    parent.appendChild(sliderBody);

    for (let i: number = 0; i < thumbsCount; i++) {
      thumbs.add(sliderBody, isVertical);

      if (tooltipIsActive) {
        outputs.createGroup({
          parent: sliderBody,
          selector: `${selector}__tooltip`,
          isVertical,
        });
      }
    }

    return sliderBody;
  }

  private renderProgressBar(parent: HTMLElement, isProgressBar: boolean = false): void {
    const { isVertical, selector } = this;

    if (!isProgressBar) return;

    this.sliderRange = document.createElement('div');
    this.sliderRange.classList.add(`${selector}__range`);

    if (isVertical) {
      this.sliderRange.classList.add(`${selector}__range_vertical`);
    }

    parent.appendChild(this.sliderRange);
  }

  private renderScale(parent: HTMLElement, scaleDivisions: number = 0): void {
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

  private moveTooltip(props: { n: number, prop: MoveStyleAxis, value: number }): void {
    const { outputs, tooltipIsActive } = this;

    if (!tooltipIsActive) return;

    outputs.moveIO(props);
  }

  private updateSliderRange(): void {
    const {
      thumbs,
      sliderRange,
      thumbSize,
      axis,
    } = this;

    if (!sliderRange) return;

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

  private updateScale = (): void => {
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

  private handleBodyThumbsClick = (e: PointerEvent) => {
    this.emit(ViewEvents.VALUE_CALCULATED, {
      handler: this.moveThumbToClickedPos.bind(this, e),
    });
  };

  private handleSubViewChange = (props: {
    val1?: number,
    val2?: number,
  }) => {
    this.emit(ViewEvents.VALUE_CHANGED, props);
  };

  private handleSubViewCalculate = (props: { handler: (value: Array<number>) => void }) => {
    this.emit(ViewEvents.VALUE_CALCULATED, props);
  };
}

export default View;
