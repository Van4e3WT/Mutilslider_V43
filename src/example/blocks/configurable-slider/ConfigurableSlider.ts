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

  private prevInputValue: string | undefined;

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

    panelControl.addEventListener('focusin', this.handlePanelFocus);
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
      const { prevInputValue } = this;

      if (!(target instanceof HTMLInputElement) || !prevInputValue) return;

      const input: HTMLInputElement = target;

      input.value = prevInputValue;

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

  private handlePanelFocus = (e: Event) => {
    const { target } = e;

    if (!(target instanceof HTMLInputElement)) return;

    this.prevInputValue = target.value;
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
