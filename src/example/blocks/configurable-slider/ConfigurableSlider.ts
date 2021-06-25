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
    popUpIsHided: HTMLInputElement,
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

    cfgValues.innerHTML = `<label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__minVal js-${selector}__minVal" value="-100"> Минимальное значение</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__maxVal js-${selector}__maxVal" value="100"> Максимальное значение</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__step js-${selector}__step" value="1"> Шаг</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__val1 js-${selector}__val1" value="-25"> Значение по умолчанию 1</label>
    <label class="${selector}__item"><input type="number" class="${selector}__input ${selector}__val2 js-${selector}__val2" value="75"> Значение по умолчанию 2</label>`;
    panelControl.appendChild(cfgValues);

    const cfgOptions = document.createElement('div');
    cfgOptions.classList.add(`${selector}__group`);

    cfgOptions.innerHTML = `<label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isOrientVert js-${selector}__isOrientVert" name="orientation-${postfix}">Вертикальный</label>
    <label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isOrientHoriz js-${selector}__isOrientHoriz" name="orientation-${postfix}" checked>Горизонтальный</label>
    <hr>
    <label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isTypeSolo js-${selector}__isTypeSolo" name="type-${postfix}" checked>Однодиапазонный</label>
    <label class="${selector}__item"><input type="radio" class="${selector}__input ${selector}__isTypeDouble js-${selector}__isTypeDouble" name="type-${postfix}">Двухдиапазонный</label>`;
    panelControl.appendChild(cfgOptions);

    const cfgAddons = document.createElement('div');
    cfgAddons.classList.add(`${selector}__group`);

    cfgAddons.innerHTML = `<label class="${selector}__item"><input type="checkbox" class="${selector}__input ${selector}__isPopUp js-${selector}__isPopUp">Всплывающее значение</label>
    <label class="${selector}__item"><input type="checkbox" class="${selector}__input ${selector}__isPopUpHided js-${selector}__isPopUpHided" checked>Скрыто по умолчанию</label>
    <label class="${selector}__item"><input type="number" value="5" class="${selector}__input ${selector}__scaleDivisions js-${selector}__scaleDivisions">Количество делений шкалы</label>
    <label class="${selector}__item"><input type="checkbox" checked class="${selector}__input ${selector}__isProgBar js-${selector}__isProgBar">Прогресс бар</label>
    <label class="${selector}__item"><input type="text" class="${selector}__input ${selector}__postfix js-${selector}__postfix">Постфикс</label>`;
    panelControl.appendChild(cfgAddons);
  }

  initSlider() {
    const { panelControl, selector } = this;

    this.inputs = {
      minValue: panelControl.querySelector(`.js-${selector}__minVal`),
      maxValue: panelControl.querySelector(`.js-${selector}__maxVal`),
      step: panelControl.querySelector(`.js-${selector}__step`),
      value1: panelControl.querySelector(`.js-${selector}__val1`),
      value2: panelControl.querySelector(`.js-${selector}__val2`),
      orientation: panelControl.querySelector(`.js-${selector}__isOrientHoriz`),
      orientationAddict: panelControl.querySelector(`.js-${selector}__isOrientVert`),
      sliderType: panelControl.querySelector(`.js-${selector}__isTypeDouble`),
      sliderTypeAddict: panelControl.querySelector(`.js-${selector}__isTypeSolo`),
      popUpOfValue: panelControl.querySelector(`.js-${selector}__isPopUp`),
      popUpIsHided: panelControl.querySelector(`.js-${selector}__isPopUpHided`),
      scaleOfValues: panelControl.querySelector(`.js-${selector}__scaleDivisions`),
      isProgressBar: panelControl.querySelector(`.js-${selector}__isProgBar`),
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

      orientation: inputs.orientation.checked ? 'horizontal' : 'vertical',
      sliderType: inputs.sliderType.checked ? 'double' : 'solo',

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
