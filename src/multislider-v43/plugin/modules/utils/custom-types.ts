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

  orientation?: 'vertical' | 'horizontal',
  sliderType?: 'solo' | 'double',

  popUpOfValue?: boolean,
  scaleOfValues?: number,
  isProgressBar?: boolean,

  postfix?: string,
  description?: string,
};

type ModelConfig = {
  min: number,
  max: number,
  step: number,
  value1: number,
  value2?: number,
};

export { ThumbModel, Config, ModelConfig };
