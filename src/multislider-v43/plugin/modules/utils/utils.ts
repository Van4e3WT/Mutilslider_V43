import { Config } from './custom-types';

function swap(a: any, b: any): Array<any> {
  return [b, a];
}

function validationConfig(config: Config): Config {
  const {
    orientation = 'horizontal',
    sliderType = 'solo',
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

  if (minValue > maxValue) {
    [minValue, maxValue] = swap(minValue, maxValue);
  } else if (minValue === maxValue) {
    throw new Error('minValue shouldn\'t be equal maxValue');
  }

  step = step > 0 ? step : 1;

  value1 = value1 > minValue ? value1 : minValue;
  value2 = value2 < maxValue ? value2 : minValue;

  scaleOfValues = Math.abs(scaleOfValues);

  const validatedConfig: Config = {
    minValue,
    maxValue,
    step,
    value1,
    value2,

    orientation,
    sliderType,

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
