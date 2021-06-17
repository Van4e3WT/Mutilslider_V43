import './style.scss';
import './plugin/plugin';

const $elems = $('.js-multislider-v43');

$elems.each((i, elem) => {
  const props: any = {};

  if (elem.hasAttribute('data-min-value')) props.minValue = +elem.getAttribute('data-min-value');
  if (elem.hasAttribute('data-max-value')) props.maxValue = +elem.getAttribute('data-max-value');
  if (elem.hasAttribute('data-step')) props.step = +elem.getAttribute('data-step');
  if (elem.hasAttribute('data-value1')) props.value1 = +elem.getAttribute('data-value1');
  if (elem.hasAttribute('data-value2')) props.value2 = +elem.getAttribute('data-value2');
  if (elem.hasAttribute('data-orientation')) props.orientation = elem.getAttribute('data-orientation');
  if (elem.hasAttribute('data-slider-type')) props.sliderType = elem.getAttribute('data-slider-type');
  if (elem.hasAttribute('data-pop-up-of-value')) props.popUpOfValue = (elem.getAttribute('data-pop-up-of-value') === 'true');
  if (elem.hasAttribute('data-scale-of-values')) props.scaleOfValues = +elem.getAttribute('data-scale-of-values');
  if (elem.hasAttribute('data-is-progress-bar')) props.isProgressBar = (elem.getAttribute('data-is-progress-bar') === 'true');
  if (elem.hasAttribute('data-description')) props.description = elem.getAttribute('data-description');
  if (elem.hasAttribute('data-postfix')) props.postfix = elem.getAttribute('data-postfix');

  $(elem).multislider(props);
});
