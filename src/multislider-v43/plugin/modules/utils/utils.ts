import { Config } from 'Plugin/custom-types';

import ValidationError from './ValidationError';

function callValidationError(message: string): number {
  throw new ValidationError(message);
}

function configValidation(config: Config): Config {
  const {
    minValue = 0,
    maxValue = 1000,
    value1 = minValue,
    value2 = maxValue,
    step = 1,
    isRange = false,
    isVertical = false,
    scaleOfValues = 0,
    tooltipOfValue = false,
    isProgressBar = false,
    postfix,
    description = 'Range Slider',
    localeProps,
  } = config;

  const delta = maxValue - minValue;

  if (minValue > maxValue) {
    callValidationError('minValue mustn\'t be greater than maxValue');
  } else if (minValue === maxValue) {
    callValidationError('boundaries shouldn\'t be equal');
  }

  const stepGreaterThenDelta = (step > 0) && (step > delta);

  if (stepGreaterThenDelta) {
    callValidationError('the step shouldn\'t be greater than the difference between the minimum and maximum values');
  } else if (step <= 0) {
    callValidationError('step mustn\'t be less than 0');
  }

  const areValuesMixedUp = isRange && value1 > value2;
  const isVal2GreaterMaxVal = isRange && value2 > maxValue;
  const isVal2LessMinVal = isRange && value2 < minValue;
  const isVal1GreaterVal2 = isRange && value1 > value2;
  const isVal1GreaterMaxVal = value1 > maxValue;
  const isVal1LessMinValue = value1 < minValue;

  if (areValuesMixedUp) {
    callValidationError('value1 mustn\'t be greater than value2');
  }

  if (isVal2GreaterMaxVal) {
    callValidationError('value2 mustn\'t be greater than maxValue');
  }

  if (isVal2LessMinVal) {
    callValidationError('value2 mustn\'t be less than minValue');
  }

  if (isVal1GreaterVal2) {
    callValidationError('value1 mustn\'t be greater than value2');
  }

  if (isVal1GreaterMaxVal) {
    callValidationError('value1 mustn\'t be greater than maxValue');
  }

  if (isVal1LessMinValue) {
    callValidationError('value1 mustn\'t be less than minValue');
  }

  const scaleAdditionalCoef = Number.isInteger(delta / step) ? 1 : 2;
  const steppedScaleValues = Math.floor(delta / step + scaleAdditionalCoef);
  const maxScaleDivisions = steppedScaleValues > 35 ? 35 : steppedScaleValues;

  const isScaleDivisionsCountGreaterThanMax = scaleOfValues >= 0
    && scaleOfValues > maxScaleDivisions;

  if (isScaleDivisionsCountGreaterThanMax) {
    callValidationError(`scale divisions should be less than the max possible value (max value: ${maxScaleDivisions})`);
  } else if (scaleOfValues < 0) {
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
    scaleOfValues,
    isProgressBar,

    postfix,
    description,
    localeProps,
  };

  return validatedConfig;
}

export default { configValidation };
