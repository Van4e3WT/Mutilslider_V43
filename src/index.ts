import './style.scss';
import './init/mainJQuery';

$('.multislider-v43.double.slider-1').multislider({
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

  description: 'Вертикальный слайдер',
});
$('.multislider-v43.double.slider-2').multislider({
  minValue: -1,
  maxValue: 1,
  step: 0.0001,
  value1: 0.1,
  value2: 0.8,

  orientation: 'horizontal',
  sliderType: 'double',

  popUpOfValue: false,
  scaleOfValues: 9,
  isProgressBar: true,

  description: 'Горизонтальный слайдер',
});
$('.multislider-v43.solo.slider-3').multislider({
  minValue: -5,
  maxValue: 5,
  step: 0.5,
  value1: 1,

  orientation: 'horizontal',
  sliderType: 'solo',

  popUpOfValue: true,
  scaleOfValues: 0,
  isProgressBar: false,

  description: 'Одиночный горизонтальный слайдер',
});
$('.multislider-v43.solo.slider-4').multislider({
  minValue: -100,
  maxValue: 150,
  step: 10,
  value1: 100,

  orientation: 'vertical',
  sliderType: 'solo',

  popUpOfValue: false,
  scaleOfValues: 11,
  isProgressBar: true,

  description: 'Одиночный вертикальный слайдер',
});
