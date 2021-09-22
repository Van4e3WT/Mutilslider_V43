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
  eventAxis: 'clientX' | 'clientY',
  sizeParent: 'width' | 'height',
  start: 'left' | 'top',
  end: 'right' | 'bottom',
  dPos: -1 | 1;
};

type ThumbData = {
  n: number,
  thumbsParent: HTMLDivElement,
  axis: ViewAxis,

  getValue: () => number[],
  setValue: (props: {
    val1?: number,
    val2?: number,
  }) => void,
  getMin: () => number,
  getMax: () => number,

  vars: {
    isConverted?: boolean,
    sign?: number,
    startPos?: number,
    startValue?: number,
  },

  handlePointerMove?: (e: PointerEvent) => void,
  handlePointerUp?: () => void,
};

export {
  ThumbModel,
  Config,
  ModelConfig,
  MoveStyleAxis,
  ViewAxis,
  ThumbData,
};
