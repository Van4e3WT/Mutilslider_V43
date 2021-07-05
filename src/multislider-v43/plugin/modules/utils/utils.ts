import { Config } from './custom-types';

function swap(a: any, b: any): Array<any> {
  return [b, a];
}

function validationConfig(config: Config): Config {
  const {
    isRange = false,
    isVertical = false,
    popUpOfValue = false,
    popUpIsHided = true,
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
    [minValue, maxValue] = swap(minValue, maxValue);
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
      [value1, value2] = swap(value1, value2);
    }
    value2 = value2 < maxValue ? value2 : maxValue;
    value2 = value2 > minValue ? value2 : minValue;
    value1 = value1 < value2 ? value1 : value2;
  } else {
    value1 = value1 < maxValue ? value1 : maxValue;
  }

  value1 = value1 > minValue ? value1 : minValue;

  const steppedScaleValues = Math.floor(delta / step) + 1;
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

    popUpOfValue,
    popUpIsHided,
    scaleOfValues,
    isProgressBar,

    postfix,
    description,
    localeProps,
  };

  return validatedConfig;
}

export default { swap, validationConfig };
