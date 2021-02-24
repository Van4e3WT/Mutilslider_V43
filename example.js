/* global document, $ */

const panelsCfg = Array.from(document.querySelectorAll('.cfg-v43'));

panelsCfg.forEach((panelCfg, i) => {
  const cfgValues = document.createElement('div');
  cfgValues.classList.add('cfg-v43-values');
  cfgValues.innerHTML = `<label><input type="number" class="cfg-v43__minVal" value="-100"> Минимальное значение</label>
  <label><input type="number" class="cfg-v43__maxVal" value="100"> Максимальное значение</label>
  <label><input type="number" class="cfg-v43__step" value="1"> Шаг</label>
  <label><input type="number" class="cfg-v43__val1" value="-25"> Значение по умолчанию 1</label>
  <label><input type="number" class="cfg-v43__val2" value="75"> Значение по умолчанию 2</label>`;
  panelCfg.appendChild(cfgValues);

  const cfgOptions = document.createElement('div');
  cfgOptions.classList.add('cfg-v43-options');
  cfgOptions.innerHTML = `<label><input type="radio" class="cfg-v43__isOrientVert" name="orientation-${i}">Вертикальный</label>
  <label><input type="radio" class="cfg-v43__isOrientHoriz" name="orientation-${i}" checked>Горизонтальный</label>
  <hr>
  <label><input type="radio" class="cfg-v43__isTypeSolo" name="type-${i}" checked>Однодиапазонный</label>
  <label><input type="radio" class="cfg-v43__isTypeDouble" name="type-${i}">Двухдиапазонный</label>`;
  panelCfg.appendChild(cfgOptions);

  const cfgAddons = document.createElement('div');
  cfgAddons.classList.add('cfg-v43-addons');
  cfgAddons.innerHTML = `<label><input type="checkbox" class="cfg-v43__isPopUp">Всплывающее значение</label>
  <label><input type="number" value="5" class="cfg-v43__scaleDivisions">Количество делений шкалы</label>
  <label><input type="checkbox" checked class="cfg-v43__isProgBar">Прогресс бар</label>`;
  panelCfg.appendChild(cfgAddons);
});

function initCfgSlider() {
  const slidersCfg = Array.from(document.querySelectorAll('.multislider-v43-test'));
  slidersCfg.forEach((slider) => {
    const parent = slider.parentElement;

    const minValue = parent.querySelector('.cfg-v43__minVal');
    const maxValue = parent.querySelector('.cfg-v43__maxVal');
    const step = parent.querySelector('.cfg-v43__step');
    const value1 = parent.querySelector('.cfg-v43__val1');
    const value2 = parent.querySelector('.cfg-v43__val2');
    const orientation = parent.querySelector('.cfg-v43__isOrientHoriz');
    const orientationAddict = parent.querySelector('.cfg-v43__isOrientVert');
    const sliderType = parent.querySelector('.cfg-v43__isTypeDouble');
    const sliderTypeAddict = parent.querySelector('.cfg-v43__isTypeSolo');
    const popUpOfValue = parent.querySelector('.cfg-v43__isPopUp');
    const scaleOfValues = parent.querySelector('.cfg-v43__scaleDivisions');
    const isProgressBar = parent.querySelector('.cfg-v43__isProgBar');

    function updateSlider() {
      $(slider).multislider({
        minValue: +minValue.value,
        maxValue: +maxValue.value,
        step: +step.value,
        value1: +value1.value,
        value2: +value2.value,

        orientation: orientation.checked ? 'horizontal' : 'vertical',
        sliderType: sliderType.checked ? 'double' : 'solo',

        popUpOfValue: popUpOfValue.checked,
        scaleOfValues: +scaleOfValues.value,
        isProgressBar: isProgressBar.checked,
      });
    }

    minValue.addEventListener('change', updateSlider);
    maxValue.addEventListener('change', updateSlider);
    step.addEventListener('change', updateSlider);
    value1.addEventListener('change', updateSlider);
    value2.addEventListener('change', updateSlider);
    orientation.addEventListener('change', updateSlider);
    orientationAddict.addEventListener('change', updateSlider);
    sliderType.addEventListener('change', updateSlider);
    sliderTypeAddict.addEventListener('change', updateSlider);
    popUpOfValue.addEventListener('change', updateSlider);
    scaleOfValues.addEventListener('change', updateSlider);
    isProgressBar.addEventListener('change', updateSlider);

    updateSlider();
  });
}

document.addEventListener('DOMContentLoaded', initCfgSlider);