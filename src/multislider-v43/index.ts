import './style.scss';
import './plugin/plugin';

const $elems = $('.js-multislider-v43');

$elems.each((i, elem) => {
  const props: {
    minValue?: Number,
    maxValue?: Number,
    step?: Number,
    value1?: Number,
    value2?: Number,
    isVertical?: boolean,
    isRange?: boolean,
    popUpOfValue?: boolean,
    scaleOfValues?: number,
    isProgressBar?: boolean,
    popUpIsHided?: boolean,
    description?: string | null,
    postfix?: string | null,
  } = {};

  if (elem.hasAttribute('data-min-value')) props.minValue = Number(elem.getAttribute('data-min-value'));
  if (elem.hasAttribute('data-max-value')) props.maxValue = Number(elem.getAttribute('data-max-value'));
  if (elem.hasAttribute('data-step')) props.step = Number(elem.getAttribute('data-step'));
  if (elem.hasAttribute('data-value1')) props.value1 = Number(elem.getAttribute('data-value1'));
  if (elem.hasAttribute('data-value2')) props.value2 = Number(elem.getAttribute('data-value2'));
  if (elem.hasAttribute('data-is-vertical')) props.isVertical = (elem.getAttribute('data-is-vertical') === 'true');
  if (elem.hasAttribute('data-is-range')) props.isRange = (elem.getAttribute('data-is-range') === 'true');
  if (elem.hasAttribute('data-pop-up-of-value')) props.popUpOfValue = (elem.getAttribute('data-pop-up-of-value') === 'true');
  if (elem.hasAttribute('data-scale-of-values')) props.scaleOfValues = Number(elem.getAttribute('data-scale-of-values'));
  if (elem.hasAttribute('data-is-progress-bar')) props.isProgressBar = (elem.getAttribute('data-is-progress-bar') === 'true');
  if (elem.hasAttribute('data-pop-up-is-hided')) props.popUpIsHided = (elem.getAttribute('data-pop-up-is-hided') === 'true');
  if (elem.hasAttribute('data-description')) props.description = elem.getAttribute('data-description');
  if (elem.hasAttribute('data-postfix')) props.postfix = elem.getAttribute('data-postfix');

  $(elem).multislider(props);
});
