import './style.scss';
import './init/mainJQuery.ts';

$('.multislider-v43').each(function(i) {
  $(this).multislider({
    minValue: 0,
    maxValue: 1000,
    step: 10,
  
    orientation: 'horizontal',
    sliderType: 'solo',
  
    popUpOfValue: true,
    scaleOfValues: true,
    isProgressBar: true,
  
    description: "Мой слайдер " + i,
  });
});