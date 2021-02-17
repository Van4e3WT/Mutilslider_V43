/* global document, $ */

function initTestSlider() {
  $('#testSlider').multislider({
    minValue: +document.getElementById('minVal').value,
    maxValue: +document.getElementById('maxVal').value,
    step: +document.getElementById('step').value,
    value1: +document.getElementById('val1').value,
    value2: +document.getElementById('val2').value,

    orientation: document.getElementById('isOrientHoriz').checked ? 'horizontal' : 'vertical',
    sliderType: document.getElementById('isTypeDouble').checked ? 'double' : 'solo',

    popUpOfValue: document.getElementById('isPopUp').checked,
    scaleOfValues: +document.getElementById('scaleDivisions').value,
    isProgressBar: document.getElementById('isProgBar').checked,

    // description: 'Test slider',
  });
}

document.addEventListener('DOMContentLoaded', initTestSlider);
