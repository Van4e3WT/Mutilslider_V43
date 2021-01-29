export type Thumb = {
  min: number,
  max: number,
  value: number,
};

export type Config = {
  minValue: number,
  maxValue: number,
  step: number,
  value1?: number,
  value2?: number,

  orientation: 'vertical' | 'horizontal',
  sliderType: 'solo' | 'double',

  popUpOfValue: boolean,
  scaleOfValues: number,
  isProgressBar: boolean,

  description?: string,
};

export type ModelConfig = {
  min: number,
  max: number,
  step: number,
  value1: number,
  value2?: number,
};
