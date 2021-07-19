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

  tooltipOfValue?: boolean,
  tooltipIsHided?: boolean,
  scaleOfValues?: number,
  isProgressBar?: boolean,

  postfix?: string,
  description?: string,
  localeProps?: Intl.NumberFormatOptions,
};

type ModelConfig = {
  min: number,
  max: number,
  step: number,
  value1?: number,
  value2?: number,
};

type MoveStyleAxis = 'left' | 'bottom';

type ViewAxis = {
  styleSelector: MoveStyleAxis,
  axis: 'x' | 'y',
  eventAxis: 'pageX' | 'pageY',
  sizeParent: 'width' | 'height',
  start: 'left' | 'top',
  end: 'right' | 'bottom',
  dPos: -1 | 1;
};

export {
  ThumbModel,
  Config,
  ModelConfig,
  MoveStyleAxis,
  ViewAxis,
};
