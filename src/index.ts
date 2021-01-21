import './style.scss';
import './init/mainJQuery';

$('.multislider-v43.slider-1').multislider({
  minValue: 5000,
  maxValue: 15000,
  step: 100,
  value: 5440,

  orientation: 'vertical',
  sliderType: 'double',

  popUpOfValue: true,
  scaleOfValues: true,
  isProgressBar: true,

  description: 'Range slider',
});
$('.multislider-v43').each(function f(i) {
  $(this).multislider({
    minValue: 0,
    maxValue: 1000,
    step: 10,
    value: 544,

    orientation: 'horizontal',
    sliderType: 'solo',

    popUpOfValue: false,
    scaleOfValues: false,
    isProgressBar: false,

    description: `Мой слайдер ${i}`,
  });
});
