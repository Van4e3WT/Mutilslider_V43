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

    const cfgValues = document.createElement('div');
    cfgValues.classList.add(`${selector}__group`);

    cfgValues.innerHTML = `<label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__min-val js-${selector}__min-val" value="${config.minValue}"> Минимальное значение</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__max-val js-${selector}__max-val" value="${config.maxValue}"> Максимальное значение</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__step js-${selector}__step" value="${config.step}"> Шаг</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__val-1 js-${selector}__val-1" value="${config.value1}"> Значение по умолчанию 1</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__val-2 js-${selector}__val-2" value="${config.value2}"> Значение по умолчанию 2</label>`;
    panelControl.appendChild(cfgValues);

    const cfgOptions = document.createElement('div');
    cfgOptions.classList.add(`${selector}__group`);

    cfgOptions.innerHTML = `<label class="${selector}__item"><input type="checkbox" class="${selector}__input ${selector}__is-vertical js-${selector}__is-vertical">Вертикальный</label>
    <label class="${selector}__item"><input type="checkbox" class="${selector}__input ${selector}__is-range js-${selector}__is-range" checked>Диапазонный</label>`;
    panelControl.appendChild(cfgOptions);

    const cfgAddons = document.createElement('div');
    cfgAddons.classList.add(`${selector}__group`);

    cfgAddons.innerHTML = `<label class="${selector}__item"><input type="checkbox" class="${selector}__input ${selector}__is-pop-up js-${selector}__is-pop-up" ${config.popUpOfValue ? 'checked' : ''}>Всплывающее значение</label>
    <label class="${selector}__item"><input type="checkbox" class="${selector}__input ${selector}__is-pop-up-hided js-${selector}__is-pop-up-hided" ${config.popUpIsHided ? 'checked' : ''}>Скрыто по умолчанию</label>
    <label class="${selector}__item"><input type="number" value="${config.scaleOfValues}" class="${selector}__input ${selector}__scale-divisions js-${selector}__scale-divisions">Количество делений шкалы</label>
    <label class="${selector}__item"><input type="checkbox" checked class="${selector}__input ${selector}__is-progress-bar js-${selector}__is-progress-bar" ${config.isProgressBar ? 'checked' : ''}>Прогресс бар</label>
    <label class="${selector}__item"><input type="text" class="${selector}__input ${selector}__postfix js-${selector}__postfix" value="${config.postfix ? config.postfix : ''}">Постфикс</label>`;
    panelControl.appendChild(cfgAddons);
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

    panelControl.addEventListener('change', this._updateSlider);

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

    const handlerSliderChange = () => {
      const values = getValue();

      inputs.value1.value = String(values[0]);

      if (values.length === 2) {
        inputs.value2.value = String(values[1]);
      }
    };

    $slider.multislider.onChange(handlerSliderChange);
  };
}

export default ConfigurableSlider;
