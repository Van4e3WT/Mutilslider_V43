import type { Thumb } from './customTypes';
import EventEmitter from './eventEmitter';

export interface ISliderModel extends EventEmitter {
  getValue(): Array<Thumb>;
  setValue(values: { val1: number, val2?: number }): void;
}

export interface ISliderView extends EventEmitter {
  sliderThumbs: Array<HTMLDivElement>;
  parentThumbs: HTMLDivElement;
}
