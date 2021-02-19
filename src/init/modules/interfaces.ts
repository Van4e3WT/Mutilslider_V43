import type { Thumb } from './customTypes';
import EventEmitter from './eventEmitter';

export interface ISliderModel extends EventEmitter {
  getMin(): number;
  getMax(): number;
  getValue(): Array<Thumb>;
  setValue(values: { val1?: number, val2?: number }, isStepping?: boolean): void;
}

export interface ISliderView extends EventEmitter {
  sliderThumbs: Array<HTMLDivElement>;
  parentThumbs: HTMLDivElement;
  sliderScale: Array<HTMLDivElement>;
  outputValues: Array<HTMLInputElement>;
  getThumbSize(): number;
  getAxis(): 'X' | 'Y';
}
