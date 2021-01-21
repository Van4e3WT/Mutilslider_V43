import type { Thumb } from './customTypes';
import EventEmitter from './eventEmitter';

export interface ISliderModel extends EventEmitter {
  thumbs: Array<Thumb>;

  getValue(): Array<number>;
  setValue(values: { val1: number, val2?: number }): ISliderModel;
}

export interface ISliderView extends EventEmitter {
  model: ISliderModel;
  outputValues: Array<HTMLDivElement>;
  sliderThumbs: Array<HTMLDivElement>;
  sliderRange: HTMLDivElement;
}
