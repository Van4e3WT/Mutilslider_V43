import './plugin/plugin';
import './style.scss';

const $elems = $('.js-multislider-v43');

$elems.each((i, elem) => {
  const props: {
    minValue?: number,
    maxValue?: number,
    step?: number,
    value1?: number,
    value2?: number,
    isVertical?: boolean,
    isRange?: boolean,
    tooltipOfValue?: boolean,
    scaleOfValues?: number,
    isProgressBar?: boolean,
    description?: string | null,
    postfix?: string | null,
  } = {};

  if (elem.hasAttribute('data-min-value')) props.minValue = Number(elem.getAttribute('data-min-value'));
  if (elem.hasAttribute('data-max-value')) props.maxValue = Number(elem.getAttribute('data-max-value'));
  if (elem.hasAttribute('data-step')) props.step = Number(elem.getAttribute('data-step'));
  if (elem.hasAttribute('data-value1')) props.value1 = Number(elem.getAttribute('data-value1'));
  if (elem.hasAttribute('data-value2')) props.value2 = Number(elem.getAttribute('data-value2'));
  if (elem.hasAttribute('data-is-vertical')) props.isVertical = true;
  if (elem.hasAttribute('data-is-range')) props.isRange = true;
  if (elem.hasAttribute('data-tooltip-of-value')) props.tooltipOfValue = true;
  if (elem.hasAttribute('data-scale-of-values')) props.scaleOfValues = Number(elem.getAttribute('data-scale-of-values'));
  if (elem.hasAttribute('data-is-progress-bar')) props.isProgressBar = true;
  if (elem.hasAttribute('data-description')) props.description = elem.getAttribute('data-description');
  if (elem.hasAttribute('data-postfix')) props.postfix = elem.getAttribute('data-postfix');

  $(elem).multislider(props);
});
