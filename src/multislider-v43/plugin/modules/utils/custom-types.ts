type ThumbModel = {
  min: number,
  max: number,
  value: number,
};

type Config = {
  minValue: number,
  maxValue: number,
  step: number,
  value1?: number,
  value2?: number,

  isVertical?: boolean,
  isRange?: boolean,

  popUpOfValue?: boolean,
  popUpIsHided?: boolean,
  scaleOfValues?: number,
  isProgressBar?: boolean,

  postfix?: string,
  description?: string,
  localeProps?: object,
};

type ModelConfig = {
  min: number,
  max: number,
  step: number,
  value1: number,
  value2?: number,
};

export {
  ThumbModel,
  Config,
  ModelConfig,
};
