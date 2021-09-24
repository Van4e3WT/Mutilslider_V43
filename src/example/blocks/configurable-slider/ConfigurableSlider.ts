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

  public init(): void {
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
  }

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

      if (!getValue || !onChange) return;

      onChange(this.handleSliderChange, getValue);
      getValue({});
    } catch (err) {
      const shouldRecalcBoundaries = target === inputs.minValue || target === inputs.maxValue;
      const shouldRecalcStep = target === inputs.step || shouldRecalcBoundaries;
      const shouldRecalcScale = target === inputs.scaleOfValues || shouldRecalcStep;
      const shouldRecalcValues = target === inputs.value1 || target === inputs.value2
        || target === inputs.isRange || shouldRecalcStep;

      if (shouldRecalcBoundaries) {
        if (Number(inputs.minValue.value) > Number(inputs.maxValue.value)) {
          [inputs.minValue.value, inputs.maxValue.value] = [
            inputs.maxValue.value, inputs.minValue.value];
        } else if (inputs.minValue.value === inputs.maxValue.value) {
          if (target === inputs.minValue) {
            inputs.minValue.value = String(Number(inputs.maxValue.value)
              - Number(inputs.step.value));
          }

          if (target === inputs.maxValue) {
            inputs.maxValue.value = String(Number(inputs.minValue.value)
              + Number(inputs.step.value));
          }
        }
      }

      const delta = Number(inputs.maxValue.value) - Number(inputs.minValue.value);

      if (shouldRecalcStep) {
        if (Number(inputs.step.value) > 0) {
          if (Number(inputs.step.value) > delta) {
            inputs.step.value = String(delta);
          }
        } else {
          inputs.step.value = String(1);
        }
      }

      if (shouldRecalcValues) {
        if (inputs.isRange.checked) {
          if (Number(inputs.value1.value) > Number(inputs.value2.value)) {
            [inputs.value1.value, inputs.value2.value] = [inputs.value2.value, inputs.value1.value];
          }
          if (Number(inputs.value2.value) > Number(inputs.maxValue.value)) {
            inputs.value2.value = inputs.maxValue.value;
          }
          if (Number(inputs.value2.value) < Number(inputs.minValue.value)) {
            inputs.value2.value = inputs.minValue.value;
          }
          if (Number(inputs.value1.value) > Number(inputs.value2.value)) {
            inputs.value1.value = inputs.value2.value;
          }
        } else if (Number(inputs.value1.value) > Number(inputs.maxValue.value)) {
          inputs.value1.value = inputs.maxValue.value;
        }

        if (Number(inputs.value1.value) < Number(inputs.minValue.value)) {
          inputs.value1.value = inputs.minValue.value;
        }
      }

      const scaleAdditionalCoef = Number.isInteger(delta / Number(inputs.step.value)) ? 1 : 2;
      const steppedScaleValues = Math.floor(delta
        / Number(inputs.step.value) + scaleAdditionalCoef);
      const maxScaleDivisions = steppedScaleValues > 35 ? 35 : steppedScaleValues;

      if (shouldRecalcScale) {
        if (Number(inputs.scaleOfValues.value) >= 0) {
          if (Number(inputs.scaleOfValues.value) > maxScaleDivisions) {
            inputs.scaleOfValues.value = String(maxScaleDivisions);
          }
        } else {
          inputs.scaleOfValues.value = String(0);
        }
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

  private toggleInputsConditions(): void {
    const { inputs, selector } = this;

    if (!inputs) return;

    if (inputs.isRange.checked) {
      inputs.value2.disabled = false;
      inputs.value2.classList.remove(`${selector}__input_disabled`);
    } else {
      inputs.value2.disabled = true;
      inputs.value2.classList.add(`${selector}__input_disabled`);
    }
  }

  private callError(): HTMLInputElement {
    throw Error('The configurable panel doesn\'t contain a required element');
  }
}

export default ConfigurableSlider;
