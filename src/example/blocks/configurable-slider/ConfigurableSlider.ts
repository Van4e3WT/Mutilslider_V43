class ConfigurableSlider {
  private panelControl: HTMLElement;

  private slider: HTMLElement;

  private selector: string;

  private postfix: string;

  private inputs: {
    minValue: HTMLInputElement,
    maxValue: HTMLInputElement
    step: HTMLInputElement,
    value1: HTMLInputElement,
    value2: HTMLInputElement,
    orientation: HTMLInputElement,
    orientationAddict: HTMLInputElement,
    sliderType: HTMLInputElement,
    sliderTypeAddict: HTMLInputElement,
    popUpOfValue: HTMLInputElement,
    scaleOfValues: HTMLInputElement,
    isProgressBar: HTMLInputElement,
    postfix: HTMLInputElement,
  };

  constructor(props) {
    const {
      panel,
      slider,
      selector,
      postfix,
    } = props;

    this.panelControl = panel;
    this.slider = slider;
    this.selector = selector;
    this.postfix = postfix;
  }

  initPanelControl() {
    const { panelControl, postfix, selector } = this;

    const cfgValues = document.createElement('div');
    cfgValues.classList.add(`${selector}__group`);

    cfgValues.innerHTML = `<label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__minVal" value="-100"> Минимальное значение</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__maxVal" value="100"> Максимальное значение</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__step" value="1"> Шаг</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__val1" value="-25"> Значение по умолчанию 1</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__val2" value="75"> Значение по умолчанию 2</label>`;
    panelControl.appendChild(cfgValues);

    const cfgOptions = document.createElement('div');
    cfgOptions.classList.add(`${selector}__group`);

    cfgOptions.innerHTML = `<label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isOrientVert" name="orientation-${postfix}">Вертикальный</label>
    <label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isOrientHoriz" name="orientation-${postfix}" checked>Горизонтальный</label>
    <hr>
    <label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isTypeSolo" name="type-${postfix}" checked>Однодиапазонный</label>
    <label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isTypeDouble" name="type-${postfix}">Двухдиапазонный</label>`;
    panelControl.appendChild(cfgOptions);

    const cfgAddons = document.createElement('div');
    cfgAddons.classList.add(`${selector}__group`);

    cfgAddons.innerHTML = `<label class="${selector}__item"><input type="checkbox" class="${selector}__input ${selector}__isPopUp">Всплывающее значение</label>
    <label class="${selector}__item"><input type="number" value="5" class="${selector}__input ${selector}__scaleDivisions">Количество делений шкалы</label>
    <label class="${selector}__item"><input type="checkbox" checked class="${selector}__input ${selector}__isProgBar">Прогресс бар</label>
    <label class="${selector}__item"><input type="text" class="${selector}__input ${selector}__postfix">Постфикс</label>`;
    panelControl.appendChild(cfgAddons);
  }

  initSlider() {
    const { panelControl, selector } = this;

    this.inputs = {
      minValue: panelControl.querySelector(`.${selector}__minVal`),
      maxValue: panelControl.querySelector(`.${selector}__maxVal`),
      step: panelControl.querySelector(`.${selector}__step`),
      value1: panelControl.querySelector(`.${selector}__val1`),
      value2: panelControl.querySelector(`.${selector}__val2`),
      orientation: panelControl.querySelector(`.${selector}__isOrientHoriz`),
      orientationAddict: panelControl.querySelector(`.${selector}__isOrientVert`),
      sliderType: panelControl.querySelector(`.${selector}__isTypeDouble`),
      sliderTypeAddict: panelControl.querySelector(`.${selector}__isTypeSolo`),
      popUpOfValue: panelControl.querySelector(`.${selector}__isPopUp`),
      scaleOfValues: panelControl.querySelector(`.${selector}__scaleDivisions`),
      isProgressBar: panelControl.querySelector(`.${selector}__isProgBar`),
      postfix: panelControl.querySelector(`.${selector}__postfix`),
    };

    panelControl.addEventListener('change', this._updateSlider);

    this._updateSlider();
  }

  private _updateSlider = () => {
    const { slider, inputs } = this;
    $(slider).multislider({
      minValue: +inputs.minValue.value,
      maxValue: +inputs.maxValue.value,
      step: +inputs.step.value,
      value1: +inputs.value1.value,
      value2: +inputs.value2.value,

      orientation: inputs.orientation.checked ? 'horizontal' : 'vertical',
      sliderType: inputs.sliderType.checked ? 'double' : 'solo',

      popUpOfValue: inputs.popUpOfValue.checked,
      scaleOfValues: +inputs.scaleOfValues.value,
      isProgressBar: inputs.isProgressBar.checked,
      postfix: inputs.postfix.value,
    });
  };
}

export default ConfigurableSlider;
