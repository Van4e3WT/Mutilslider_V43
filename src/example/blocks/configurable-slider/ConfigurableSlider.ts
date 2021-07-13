type Config = {
  minValue: HTMLInputElement,
  maxValue: HTMLInputElement,
  step: HTMLInputElement,
  value1: HTMLInputElement,
  value2: HTMLInputElement,
  isVertical: HTMLInputElement,
  isRange: HTMLInputElement,
  popUpOfValue: HTMLInputElement,
  popUpIsHided: HTMLInputElement,
  scaleOfValues: HTMLInputElement,
  isProgressBar: HTMLInputElement,
  postfix: HTMLInputElement,
};

class ConfigurableSlider {
  private panelControl: Element;

  private popUpToggle: Element | null | undefined;

  private slider: Element;

  private selector: string;

  private inputs: Config | undefined;

  private config: Config;

  constructor(props: {
    panel: Element,
    slider: Element,
    selector: string,
    config: Config,
  }) {
    const {
      panel,
      slider,
      selector,
      config,
    } = props;

    this.panelControl = panel;
    this.slider = slider;
    this.selector = selector;
    this.config = config;
  }

  public initPanelControl() {
    const {
      panelControl,
      selector,
      config,
    } = this;

    panelControl.innerHTML = `<label class="${selector}__item">
      <input type="number" class="${selector}__input ${selector}__min-val js-${selector}__min-val" value="${config.minValue}">
      <div class="${selector}__item-title">min</div>
    </label>
    <label class="${selector}__item">
      <input type="number" class="${selector}__input ${selector}__max-val js-${selector}__max-val" value="${config.maxValue}">
      <div class="${selector}__item-title">max</div>
    </label>
    <label class="${selector}__item">
      <input type="number" class="${selector}__input ${selector}__step js-${selector}__step" value="${config.step}">
      <div class="${selector}__item-title">step</div>
    </label>
    <label class="${selector}__item">
      <input type="number" class="${selector}__input ${selector}__val-1 js-${selector}__val-1" value="${config.value1}">
      <div class="${selector}__item-title">value 1</div>
    </label>
    <label class="${selector}__item">
      <input type="number" class="${selector}__input ${selector}__val-2 js-${selector}__val-2" value="${config.value2}">
      <div class="${selector}__item-title">value 2</div>
    </label>
    <label class="${selector}__item ${selector}__toggle">
      <input type="checkbox" class="${selector}__input ${selector}__is-vertical js-${selector}__is-vertical">
      <div class="${selector}__item-toggle"></div>
      <div class="${selector}__item-title">vertical</div>
    </label>
    <label class="${selector}__item ${selector}__toggle">
      <input type="checkbox" class="${selector}__input ${selector}__is-range js-${selector}__is-range" checked>
      <div class="${selector}__item-toggle"></div>
      <div class="${selector}__item-title">range</div>
    </label>
    <label class="${selector}__item ${selector}__toggle">
      <input type="checkbox" class="${selector}__input ${selector}__is-pop-up js-${selector}__is-pop-up" ${config.popUpOfValue ? 'checked' : ''}>
      <div class="${selector}__item-toggle"></div>
      <div class="${selector}__item-title">pop-up</div>
    </label>
    <label class="${selector}__item ${selector}__toggle">
      <input type="checkbox" class="${selector}__input ${selector}__is-pop-up-hided js-${selector}__is-pop-up-hided" ${config.popUpIsHided ? 'checked' : ''}>
      <div class="${selector}__item-toggle js-${selector}__item-toggle"></div>
      <div class="${selector}__item-title">pop-up hided</div>
    </label>
    <label class="${selector}__item">
      <input type="number" value="${config.scaleOfValues}" class="${selector}__input ${selector}__scale-divisions js-${selector}__scale-divisions">
      <div class="${selector}__item-title">scale divisions</div>
    </label>
    <label class="${selector}__item ${selector}__toggle">
      <input type="checkbox" checked class="${selector}__input ${selector}__is-progress-bar js-${selector}__is-progress-bar" ${config.isProgressBar ? 'checked' : ''}>
      <div class="${selector}__item-toggle"></div>
      <div class="${selector}__item-title">progress bar</div>
    </label>
    <label class="${selector}__item">
      <input type="text" class="${selector}__input ${selector}__postfix js-${selector}__postfix" value="${config.postfix ? config.postfix : ''}">
      <div class="${selector}__item-title">postfix</div>
    </label>`;
  }

  public initSlider() {
    const { panelControl, selector } = this;

    this.inputs = {
      minValue: panelControl.querySelector(`.js-${selector}__min-val`) as HTMLInputElement,
      maxValue: panelControl.querySelector(`.js-${selector}__max-val`) as HTMLInputElement,
      step: panelControl.querySelector(`.js-${selector}__step`) as HTMLInputElement,
      value1: panelControl.querySelector(`.js-${selector}__val-1`) as HTMLInputElement,
      value2: panelControl.querySelector(`.js-${selector}__val-2`) as HTMLInputElement,
      isVertical: panelControl.querySelector(`.js-${selector}__is-vertical`) as HTMLInputElement,
      isRange: panelControl.querySelector(`.js-${selector}__is-range`) as HTMLInputElement,
      popUpOfValue: panelControl.querySelector(`.js-${selector}__is-pop-up`) as HTMLInputElement,
      popUpIsHided: panelControl.querySelector(`.js-${selector}__is-pop-up-hided`) as HTMLInputElement,
      scaleOfValues: panelControl.querySelector(`.js-${selector}__scale-divisions`) as HTMLInputElement,
      isProgressBar: panelControl.querySelector(`.js-${selector}__is-progress-bar`) as HTMLInputElement,
      postfix: panelControl.querySelector(`.js-${selector}__postfix`) as HTMLInputElement,
    };

    this.popUpToggle = this.inputs.popUpIsHided.parentElement
      ?.querySelector(`.js-${selector}__item-toggle`);

    panelControl.addEventListener('change', this.handlePanelChange);

    this.updateSlider();
  }

  private updateSlider = () => {
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

      popUpOfValue: inputs.popUpOfValue.checked,
      popUpIsHided: inputs.popUpIsHided.checked,
      scaleOfValues: Number(inputs.scaleOfValues.value),
      isProgressBar: inputs.isProgressBar.checked,
      postfix: inputs.postfix.value,
    });

    const getValue = $slider.multislider.value;
    const { onChange } = $slider.multislider;

    if (!getValue || !onChange) return;

    const handleSliderChange = () => {
      const values = getValue();

      inputs.value1.value = String(values[0]);

      if (values.length === 2) {
        inputs.value2.value = String(values[1]);
      }
    };

    onChange(handleSliderChange);
    getValue({});
  };

  private handlePanelChange = (e: Event) => {
    const { inputs, selector, popUpToggle } = this;
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

    if (popUpToggle) {
      if (inputs.popUpOfValue.checked) {
        inputs.popUpIsHided.disabled = false;
        popUpToggle.classList.remove(`${selector}__item-toggle_disabled`);
      } else {
        inputs.popUpIsHided.disabled = true;
        popUpToggle.classList.add(`${selector}__item-toggle_disabled`);
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
}

export default ConfigurableSlider;
