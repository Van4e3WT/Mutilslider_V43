/* global $ */
import 'Example/blocks/index-page/index-page';

$('.js-multislider-v43_double.js-multislider-v43_slider-1').multislider({
  minValue: 5000,
  maxValue: 15000,
  step: 100,
  value1: 7500,
  value2: 10000,

  orientation: 'vertical',
  sliderType: 'double',

  popUpOfValue: true,
  scaleOfValues: 11,
  isProgressBar: true,

  postfix: '₽',
  description: 'Вертикальный слайдер',
});

$('.js-multislider-v43_solo.js-multislider-v43_slider-3').multislider({
  minValue: -100,
  maxValue: 150,
  step: 10,
  value1: 100,

  orientation: 'vertical',
  sliderType: 'solo',

  popUpOfValue: false,
  scaleOfValues: 6,
  isProgressBar: true,

  description: 'Одиночный вертикальный слайдер',
});
