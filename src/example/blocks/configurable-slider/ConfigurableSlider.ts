type Config = {
  minValue: HTMLInputElement,
  maxValue: HTMLInputElement,
  step: HTMLInputElement,
  value1: HTMLInputElement,
  value2: HTMLInputElement,
  isVertical: HTMLInputElement,
  isRange: HTMLInputElement,
  tooltipOfValue: HTMLInputElement,
  scaleOfValues: HTMLInputElement,
  isProgressBar: HTMLInputElement,
  postfix: HTMLInputElement,
};

class ConfigurableSlider {
  private panelControl: Element;

  private slider: Element;

  private selector: string;

  private inputs: Config | undefined;

  constructor(props: {
    panel: Element,
    slider: Element,
    selector: string,
  }) {
    const {
      panel,
      slider,
      selector,
    } = props;

    this.panelControl = panel;
    this.slider = slider;
    this.selector = selector;
  }

  public init = (): void => {
    const { panelControl, selector, callError } = this;

    this.inputs = {
      minValue: panelControl.querySelector(`.js-${selector}__min-val`) ?? callError(),
      maxValue: panelControl.querySelector(`.js-${selector}__max-val`) ?? callError(),
      step: panelControl.querySelector(`.js-${selector}__step`) ?? callError(),
      value1: panelControl.querySelector(`.js-${selector}__val-1`) ?? callError(),
      value2: panelControl.querySelector(`.js-${selector}__val-2`) ?? callError(),
      isVertical: panelControl.querySelector(`.js-${selector}__is-vertical`) ?? callError(),
      isRange: panelControl.querySelector(`.js-${selector}__is-range`) ?? callError(),
      tooltipOfValue: panelControl.querySelector(`.js-${selector}__tooltip-of-value`) ?? callError(),
      scaleOfValues: panelControl.querySelector(`.js-${selector}__scale-of-values`) ?? callError(),
      isProgressBar: panelControl.querySelector(`.js-${selector}__is-progress-bar`) ?? callError(),
      postfix: panelControl.querySelector(`.js-${selector}__postfix`) ?? callError(),
    };

    panelControl.addEventListener('change', this.handlePanelChange);

    this.updateSlider();
  };

  private updateSlider = (target: EventTarget | null = null): void => {
    const { slider, inputs } = this;
    const $slider = $(slider);

    if (!inputs) return;

    this.toggleInputsConditions();

    try {
      $slider.multislider({
        minValue: Number(inputs.minValue.value),
        maxValue: Number(inputs.maxValue.value),
        step: Number(inputs.step.value),
        value1: Number(inputs.value1.value),
        value2: Number(inputs.value2.value),

        isVertical: inputs.isVertical.checked,
        isRange: inputs.isRange.checked,

        tooltipOfValue: inputs.tooltipOfValue.checked,
        scaleOfValues: Number(inputs.scaleOfValues.value),
        isProgressBar: inputs.isProgressBar.checked,
        postfix: inputs.postfix.value,
      });

      const getValue = $slider.multislider.value;
      const { onChange } = $slider.multislider;

      const isMissedParam = !getValue || !onChange;

      if (isMissedParam) return;

      onChange(this.handleSliderChange, getValue);
      getValue({});
    } catch (err) {
      const shouldRecalcBoundaries = target === inputs.minValue || target === inputs.maxValue;
      const shouldRecalcStep = target === inputs.step || shouldRecalcBoundaries;
      const shouldRecalcScale = target === inputs.scaleOfValues || shouldRecalcStep;
      const shouldRecalcValues = target === inputs.value1 || target === inputs.value2
        || target === inputs.isRange || shouldRecalcStep;

      const minValGreaterThenMaxVal = Number(inputs.minValue.value) > Number(inputs.maxValue.value);
      const boundariesAreEqual = inputs.minValue.value === inputs.maxValue.value;
      const minBoundaryIsConflict = boundariesAreEqual && (target === inputs.minValue);
      const maxBoundaryIsConflict = boundariesAreEqual && (target === inputs.maxValue);

      if (shouldRecalcBoundaries && minValGreaterThenMaxVal) {
        [inputs.minValue.value, inputs.maxValue.value] = [
          inputs.maxValue.value, inputs.minValue.value];
      } else if (shouldRecalcBoundaries && minBoundaryIsConflict) {
        inputs.minValue.value = String(Number(inputs.maxValue.value)
          - Number(inputs.step.value));
      } else if (shouldRecalcBoundaries && maxBoundaryIsConflict) {
        inputs.maxValue.value = String(Number(inputs.minValue.value)
          + Number(inputs.step.value));
      }

      const delta = Number(inputs.maxValue.value) - Number(inputs.minValue.value);

      const isStepGreaterDelta = Number(inputs.step.value) > delta;
      const isStepLessOrEqualZero = Number(inputs.step.value) <= 0;

      if (shouldRecalcStep && isStepGreaterDelta) {
        inputs.step.value = String(delta);
      } else if (shouldRecalcStep && isStepLessOrEqualZero) {
        inputs.step.value = String(1);
      }

      const shouldRecalcRangeValues = (): boolean => (
        shouldRecalcValues && inputs.isRange.checked
      );
      const val1GreaterVal2 = (): boolean => (
        Number(inputs.value1.value) > Number(inputs.value2.value)
      );
      const val2GreaterMax = (): boolean => (
        Number(inputs.value2.value) > Number(inputs.maxValue.value)
      );
      const val2LessMin = (): boolean => (
        Number(inputs.value2.value) < Number(inputs.minValue.value)
      );
      const val1GreaterMax = (): boolean => (
        Number(inputs.value1.value) > Number(inputs.maxValue.value)
      );
      const val1LessMin = (): boolean => (
        Number(inputs.value1.value) < Number(inputs.minValue.value)
      );

      if (shouldRecalcRangeValues() && val1GreaterVal2()) {
        [inputs.value1.value, inputs.value2.value] = [inputs.value2.value, inputs.value1.value];
      }

      if (shouldRecalcRangeValues() && val2GreaterMax()) {
        inputs.value2.value = inputs.maxValue.value;
      }

      if (shouldRecalcRangeValues() && val2LessMin()) {
        inputs.value2.value = inputs.minValue.value;
      }

      if (shouldRecalcRangeValues() && val1GreaterVal2()) {
        inputs.value1.value = inputs.value2.value;
      }

      if (shouldRecalcValues && val1GreaterMax()) {
        inputs.value1.value = inputs.maxValue.value;
      }

      if (shouldRecalcValues && val1LessMin()) {
        inputs.value1.value = inputs.minValue.value;
      }

      const scaleAdditionalCoef = Number.isInteger(delta / Number(inputs.step.value)) ? 1 : 2;
      const steppedScaleValues = Math.floor(delta
        / Number(inputs.step.value) + scaleAdditionalCoef);
      const maxScaleDivisions = steppedScaleValues > 35 ? 35 : steppedScaleValues;
      const scaleDivisionsIsGreaterMax = Number(inputs.scaleOfValues.value) > maxScaleDivisions;
      const scaleDivisionsIsLessZero = Number(inputs.scaleOfValues.value) < 0;

      if (shouldRecalcScale && scaleDivisionsIsGreaterMax) {
        inputs.scaleOfValues.value = String(maxScaleDivisions);
      } else if (shouldRecalcScale && scaleDivisionsIsLessZero) {
        inputs.scaleOfValues.value = String(0);
      }

      this.updateSlider();
    }
  };

  private handleSliderChange = (getVal: () => Array<number>): void => {
    const { inputs } = this;

    if (!inputs) return;

    const values = getVal();

    inputs.value1.value = String(values[0]);

    if (values.length === 2) {
      inputs.value2.value = String(values[1]);
    }
  };

  private handlePanelChange = (e: Event): void => {
    const { target } = e;

    this.updateSlider(target);
  };

  private toggleInputsConditions = (): void => {
    const { inputs, selector } = this;

    if (!inputs) return;

    if (inputs.isRange.checked) {
      inputs.value2.disabled = false;
      inputs.value2.classList.remove(`${selector}__input_disabled`);
    } else {
      inputs.value2.disabled = true;
      inputs.value2.classList.add(`${selector}__input_disabled`);
    }
  };

  private callError = (): HTMLInputElement => {
    throw Error('The configurable panel doesn\'t contain a required element');
  };
}

export default ConfigurableSlider;
