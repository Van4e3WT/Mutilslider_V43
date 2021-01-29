import './style.scss';
import './init/mainJQuery';

$('.multislider-v43.slider-1').multislider({
  minValue: 5000,
  maxValue: 15000,
  step: 100,
  value: 7500,

  orientation: 'vertical',
  sliderType: 'double',

  popUpOfValue: true,
  scaleOfValues: 11,
  isProgressBar: true,

  description: 'Вертикальный слайдер',
});
$('.multislider-v43.slider-2').multislider({
  minValue: -1,
  maxValue: 1,
  step: 0.0001,
  value: 0.1,

  orientation: 'horizontal',
  sliderType: 'double',

  popUpOfValue: false,
  scaleOfValues: 9,
  isProgressBar: true,

  description: 'Горизонтальный слайдер',
});
$('.multislider-v43.slider-3').multislider({
  minValue: -100,
  maxValue: 150,
  step: 10,
  value: 100,

  orientation: 'vertical',
  sliderType: 'solo',

  popUpOfValue: false,
  scaleOfValues: 11,
  isProgressBar: true,

  description: 'Одиночный вертикальный слайдер',
});
$('.multislider-v43.slider-4').multislider({
  minValue: -5,
  maxValue: 5,
  step: 0.5,
  value: 1,

  orientation: 'horizontal',
  sliderType: 'solo',

  popUpOfValue: false,
  scaleOfValues: 0,
  isProgressBar: true,

  description: 'Одиночный горизонтальный слайдер',
});
