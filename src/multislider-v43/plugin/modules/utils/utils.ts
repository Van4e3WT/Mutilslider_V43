import { Config } from './custom-types';
import ValidationError from './ValidationError';

function callValidationError(message: string): number {
  throw new ValidationError(message);
}

function configValidation(config: Config): Config {
  const {
    minValue = 0,
    maxValue = 1000,
    step = 1,
    isRange = false,
    isVertical = false,
    scaleOfValues = 0,
    tooltipOfValue = false,
    tooltipIsHidden = false,
    isProgressBar = false,
    postfix,
    description = 'Range Slider',
    localeProps,
  } = config;
  let {
    value1 = minValue,
    value2 = maxValue,
  } = config;

  const delta = maxValue - minValue;

  if (minValue > maxValue) {
    callValidationError('minValue mustn\'t be greater than maxValue');
  } else if (minValue === maxValue) {
    callValidationError('boundaries shouldn\'t be equal');
  }

  if (step > 0) {
    if (step > delta) {
      callValidationError('the step shouldn\'t be greater than the difference between the minimum and maximum values');
    }
  } else {
    callValidationError('step mustn\'t be less than 0');
  }

  if (isRange) {
    if (value1 > value2) {
      callValidationError('value1 mustn\'t be greater than value2');
    }
    value2 = value2 <= maxValue ? value2 : callValidationError('value2 mustn\'t be greater than maxValue');
    value2 = value2 >= minValue ? value2 : callValidationError('value2 mustn\'t be less than minValue');
    value1 = value1 <= value2 ? value1 : callValidationError('value1 mustn\'t be greater than value2');
  } else {
    value1 = value1 <= maxValue ? value1 : callValidationError('value1 mustn\'t be greater than maxValue');
  }

  value1 = value1 >= minValue ? value1 : callValidationError('value1 mustn\'t be less than minValue');

  const scaleAdditionalCoef = Number.isInteger(delta / step) ? 1 : 2;
  const steppedScaleValues = Math.floor(delta / step + scaleAdditionalCoef);
  const maxScaleDivisions = steppedScaleValues > 35 ? 35 : steppedScaleValues;

  if (scaleOfValues >= 0) {
    if (scaleOfValues > maxScaleDivisions) {
      callValidationError(`scale divisions should be less than the max possible value (max value: ${maxScaleDivisions})`);
    }
  } else {
    callValidationError('scale division must be a natural number or zero');
  }

  const validatedConfig: Config = {
    minValue,
    maxValue,
    step,
    value1,
    value2,

    isVertical,
    isRange,

    tooltipOfValue,
    tooltipIsHidden,
    scaleOfValues,
    isProgressBar,

    postfix,
    description,
    localeProps,
  };

  return validatedConfig;
}

export default { configValidation };
