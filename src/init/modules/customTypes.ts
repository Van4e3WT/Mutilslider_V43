export type Thumb = {
  min: number,
  max: number,
  value: number,
};

export type Config = {
  minValue: number,
  maxValue: number,
  step: number,
  value?: number,

  orientation: 'vertical' | 'horizontal',
  sliderType: 'solo' | 'double',

  popUpOfValue: boolean,
  scaleOfValues: boolean,
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
