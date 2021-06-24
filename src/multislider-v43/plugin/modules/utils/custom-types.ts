type ThumbModel = {
  min: number,
  max: number,
  value: number,
};

type Orientation = 'vertical' | 'horizontal';

type SliderType = 'solo' | 'double';

type Config = {
  minValue: number,
  maxValue: number,
  step: number,
  value1?: number,
  value2?: number,

  orientation?: Orientation,
  sliderType?: SliderType,

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
  Orientation,
  SliderType,
  Config,
  ModelConfig,
};
