import { Config } from './custom-types';

function validationConfig(config: Config): Config {
  const {
    isRange = false,
    isVertical = false,
    tooltipOfValue = false,
    tooltipIsHided = true,
    isProgressBar = true,
    postfix,
    description = 'Range Slider',
    localeProps,
  } = config;
  let {
    minValue = 0,
    maxValue = 1000,
    step = 1,
    value1 = minValue,
    value2 = maxValue,
    scaleOfValues = 0,
  } = config;

  const delta = maxValue - minValue;

  if (minValue > maxValue) {
    [minValue, maxValue] = [maxValue, minValue];
  } else if (minValue === maxValue) {
    throw new Error('minValue shouldn\'t be equal maxValue');
  }

  if (step > 0) {
    if (step > delta) {
      step = delta;
    }
  } else {
    step = 1;
  }

  if (isRange) {
    if (value1 > value2) {
      [value1, value2] = [value2, value1];
    }
    value2 = value2 < maxValue ? value2 : maxValue;
    value2 = value2 > minValue ? value2 : minValue;
    value1 = value1 < value2 ? value1 : value2;
  } else {
    value1 = value1 < maxValue ? value1 : maxValue;
  }

  value1 = value1 > minValue ? value1 : minValue;

  const scaleAdditionalCoef = Number.isInteger(delta / step) ? 1 : 2;
  const steppedScaleValues = Math.floor(delta / step + scaleAdditionalCoef);
  const maxScaleDivisions = steppedScaleValues > 35 ? 35 : steppedScaleValues;
  scaleOfValues = Math.abs(scaleOfValues) > maxScaleDivisions
    ? maxScaleDivisions : Math.abs(scaleOfValues);

  const validatedConfig: Config = {
    minValue,
    maxValue,
    step,
    value1,
    value2,

    isVertical,
    isRange,

    tooltipOfValue,
    tooltipIsHided,
    scaleOfValues,
    isProgressBar,

    postfix,
    description,
    localeProps,
  };

  return validatedConfig;
}

export default { validationConfig };
