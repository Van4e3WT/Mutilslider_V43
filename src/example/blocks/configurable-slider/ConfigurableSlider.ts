type Config = {
  minValue: HTMLInputElement,
  maxValue: HTMLInputElement,
  step: HTMLInputElement,
  value1: HTMLInputElement,
  value2: HTMLInputElement,
  isVertical: HTMLInputElement,
  isRange: HTMLInputElement,
  tooltipOfValue: HTMLInputElement,
  tooltipIsHidden: HTMLInputElement,
  scaleOfValues: HTMLInputElement,
  isProgressBar: HTMLInputElement,
  postfix: HTMLInputElement,
};

class ConfigurableSlider {
  private panelControl: Element;

  private tooltipToggle: Element | null | undefined;

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
      tooltipIsHidden: panelControl.querySelector(`.js-${selector}__tooltip-is-hidden`) ?? callError(),
      scaleOfValues: panelControl.querySelector(`.js-${selector}__scale-of-values`) ?? callError(),
      isProgressBar: panelControl.querySelector(`.js-${selector}__is-progress-bar`) ?? callError(),
      postfix: panelControl.querySelector(`.js-${selector}__postfix`) ?? callError(),
    };

    this.tooltipToggle = this.inputs.tooltipIsHidden.parentElement
      ?.querySelector(`.js-${selector}__item-toggle`);

    panelControl.addEventListener('change', this.handlePanelChange);

    this.updateSlider();
  }

  private updateSlider = (): void => {
    const { slider, inputs } = this;
    const $slider = $(slider);

    if (!inputs) return;

    $slider.multislider({
      minValue: Number(inputs.minValue.value),
      maxValue: Number(inputs.maxValue.value),
      step: Number(inputs.step.value),
      value1: Number(inputs.value1.value),
      value2: Number(inputs.value2.value),

      isVertical: inputs.isVertical.checked,
      isRange: inputs.isRange.checked,

      tooltipOfValue: inputs.tooltipOfValue.checked,
      tooltipIsHidden: inputs.tooltipIsHidden.checked,
      scaleOfValues: Number(inputs.scaleOfValues.value),
      isProgressBar: inputs.isProgressBar.checked,
      postfix: inputs.postfix.value,
    });

    const getValue = $slider.multislider.value;
    const { onChange } = $slider.multislider;

    if (!getValue || !onChange) return;

    onChange(this.handleSliderChange, getValue);
    getValue({});
  };

  private handleSliderChange = (getVal: Function): void => {
    const { inputs } = this;

    if (!inputs) return;

    const values = getVal();

    inputs.value1.value = String(values[0]);

    if (values.length === 2) {
      inputs.value2.value = String(values[1]);
    }
  };

  private handlePanelChange = (e: Event): void => {
    const { inputs, selector, tooltipToggle } = this;
    const { target } = e;

    if (!inputs) return;

    if (Number(inputs.minValue.value) > Number(inputs.maxValue.value)) {
      [inputs.minValue.value, inputs.maxValue.value] = [
        inputs.maxValue.value, inputs.minValue.value];
    }

    if (inputs.minValue.value === inputs.maxValue.value) {
      if (target === inputs.minValue) {
        inputs.minValue.value = String(Number(inputs.maxValue.value) - Number(inputs.step.value));
      }
      if (target === inputs.maxValue) {
        inputs.maxValue.value = String(Number(inputs.minValue.value) + Number(inputs.step.value));
      }
    }

    const delta = Number(inputs.maxValue.value) - Number(inputs.minValue.value);

    if (Number(inputs.step.value) > 0) {
      if (Number(inputs.step.value) > delta) {
        inputs.step.value = String(delta);
      }
    } else {
      inputs.step.value = String(1);
    }

    if (inputs.isRange.checked) {
      inputs.value2.disabled = false;
      inputs.value2.classList.remove(`${selector}__input_disabled`);

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
    } else {
      inputs.value2.disabled = true;
      inputs.value2.classList.add(`${selector}__input_disabled`);

      if (Number(inputs.value1.value) > Number(inputs.maxValue.value)) {
        inputs.value1.value = inputs.maxValue.value;
      }
    }

    if (tooltipToggle) {
      if (inputs.tooltipOfValue.checked) {
        inputs.tooltipIsHidden.disabled = false;
        tooltipToggle.classList.remove(`${selector}__item-toggle_disabled`);
      } else {
        inputs.tooltipIsHidden.disabled = true;
        tooltipToggle.classList.add(`${selector}__item-toggle_disabled`);
      }
    }

    if (Number(inputs.value1.value) < Number(inputs.minValue.value)) {
      inputs.value1.value = inputs.minValue.value;
    }

    const scaleAdditionalCoef = Number.isInteger(delta / Number(inputs.step.value)) ? 1 : 2;
    const steppedScaleValues = Math.floor(delta / Number(inputs.step.value) + scaleAdditionalCoef);
    const maxScaleDivisions = steppedScaleValues > 35 ? 35 : steppedScaleValues;

    if (Number(inputs.scaleOfValues.value) >= 0) {
      if (Number(inputs.scaleOfValues.value) > maxScaleDivisions) {
        inputs.scaleOfValues.value = String(maxScaleDivisions);
      }
    } else {
      inputs.scaleOfValues.value = String(0);
    }

    this.updateSlider();
  };

  private callError(): HTMLInputElement {
    throw Error('The configurable panel doesn\'t contain a required element');
  }
}

export default ConfigurableSlider;
