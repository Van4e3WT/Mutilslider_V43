import Utils from 'Plugin/modules/utils/utils';

type Config = {
  minValue: HTMLInputElement,
  maxValue: HTMLInputElement
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
  private panelControl: HTMLElement;

  private popUpToggle: HTMLElement;

  private slider: HTMLElement;

  private selector: string;

  private inputs: Config;

  private config: Config;

  constructor(props) {
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
      minValue: panelControl.querySelector(`.js-${selector}__min-val`),
      maxValue: panelControl.querySelector(`.js-${selector}__max-val`),
      step: panelControl.querySelector(`.js-${selector}__step`),
      value1: panelControl.querySelector(`.js-${selector}__val-1`),
      value2: panelControl.querySelector(`.js-${selector}__val-2`),
      isVertical: panelControl.querySelector(`.js-${selector}__is-vertical`),
      isRange: panelControl.querySelector(`.js-${selector}__is-range`),
      popUpOfValue: panelControl.querySelector(`.js-${selector}__is-pop-up`),
      popUpIsHided: panelControl.querySelector(`.js-${selector}__is-pop-up-hided`),
      scaleOfValues: panelControl.querySelector(`.js-${selector}__scale-divisions`),
      isProgressBar: panelControl.querySelector(`.js-${selector}__is-progress-bar`),
      postfix: panelControl.querySelector(`.js-${selector}__postfix`),
    };

    this.popUpToggle = this.inputs.popUpIsHided.parentElement
      .querySelector(`.js-${selector}__item-toggle`);

    panelControl.addEventListener('change', this._handlePanelChange);

    this._updateSlider();
  }

  private _updateSlider = () => {
    const { slider, inputs } = this;
    const $slider = $(slider);

    $slider.multislider({
      minValue: +inputs.minValue.value,
      maxValue: +inputs.maxValue.value,
      step: +inputs.step.value,
      value1: +inputs.value1.value,
      value2: +inputs.value2.value,

      isVertical: inputs.isVertical.checked,
      isRange: inputs.isRange.checked,

      popUpOfValue: inputs.popUpOfValue.checked,
      popUpIsHided: inputs.popUpIsHided.checked,
      scaleOfValues: +inputs.scaleOfValues.value,
      isProgressBar: inputs.isProgressBar.checked,
      postfix: inputs.postfix.value,
    });

    const getValue = $slider.multislider.value;

    const handleSliderChange = () => {
      const values = getValue();

      inputs.value1.value = String(values[0]);

      if (values.length === 2) {
        inputs.value2.value = String(values[1]);
      }
    };

    $slider.multislider.onChange(handleSliderChange);
    getValue({});
  };

  private _handlePanelChange = (e: Event) => {
    const { inputs, selector, popUpToggle } = this;
    const { target } = e;

    if (+inputs.minValue.value > +inputs.maxValue.value) {
      [inputs.minValue.value, inputs.maxValue.value] = Utils
        .swap(inputs.minValue.value, inputs.maxValue.value);
    }

    if (inputs.minValue.value === inputs.maxValue.value) {
      if (target === inputs.minValue) {
        inputs.minValue.value = String(+inputs.maxValue.value - +inputs.step.value);
      }
      if (target === inputs.maxValue) {
        inputs.maxValue.value = String(+inputs.minValue.value + +inputs.step.value);
      }
    }

    const delta = +inputs.maxValue.value - +inputs.minValue.value;

    if (+inputs.step.value > 0) {
      if (+inputs.step.value > delta) {
        inputs.step.value = String(delta);
      }
    } else {
      inputs.step.value = String(1);
    }

    if (inputs.isRange.checked) {
      inputs.value2.disabled = false;
      inputs.value2.classList.remove(`${selector}__input_disabled`);

      if (+inputs.value1.value > +inputs.value2.value) {
        [inputs.value1.value, inputs.value2.value] = Utils
          .swap(inputs.value1.value, inputs.value2.value);
      }
      if (+inputs.value2.value > +inputs.maxValue.value) {
        inputs.value2.value = inputs.maxValue.value;
      }
      if (+inputs.value2.value < +inputs.minValue.value) {
        inputs.value2.value = inputs.minValue.value;
      }
      if (+inputs.value1.value > +inputs.value2.value) {
        inputs.value1.value = inputs.value2.value;
      }
    } else {
      inputs.value2.disabled = true;
      inputs.value2.classList.add(`${selector}__input_disabled`);

      if (+inputs.value1.value > +inputs.maxValue.value) {
        inputs.value1.value = inputs.maxValue.value;
      }
    }

    if (inputs.popUpOfValue.checked) {
      inputs.popUpIsHided.disabled = false;
      popUpToggle.classList.remove(`${selector}__item-toggle_disabled`);
    } else {
      inputs.popUpIsHided.disabled = true;
      popUpToggle.classList.add(`${selector}__item-toggle_disabled`);
    }

    if (+inputs.value1.value < +inputs.minValue.value) {
      inputs.value1.value = inputs.minValue.value;
    }

    const maxScaleDivisions = Math.floor(delta / +inputs.step.value) + 1;

    if (+inputs.scaleOfValues.value >= 0) {
      if (+inputs.scaleOfValues.value > maxScaleDivisions) {
        inputs.scaleOfValues.value = String(maxScaleDivisions);
      }
    } else {
      inputs.scaleOfValues.value = String(0);
    }

    this._updateSlider();
  };
}

export default ConfigurableSlider;
