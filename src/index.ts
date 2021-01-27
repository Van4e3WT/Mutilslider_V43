import './style.scss';
import './init/mainJQuery';

// $('.multislider-v43').each(function f(i) {
//   $(this).multislider({
//     minValue: 0,
//     maxValue: 1000,
//     step: 10,
//     value: 544,

//     orientation: 'horizontal',
//     sliderType: 'solo',

//     popUpOfValue: false,
//     scaleOfValues: false,
//     isProgressBar: false,

//     description: `Мой слайдер ${i}`,
//   });
// });

$('.multislider-v43.slider-1').multislider({
  minValue: 5000,
  maxValue: 15000,
  step: 100,
  value: 7500,

  orientation: 'vertical',
  sliderType: 'double',

  popUpOfValue: true,
  scaleOfValues: true,
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

  popUpOfValue: true,
  scaleOfValues: true,
  isProgressBar: true,

  description: 'Горизонтальный слайдер',
});
