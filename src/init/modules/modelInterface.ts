import type { Thumb } from './customTypes';

export default interface ISliderModel {
  thumbs: Array<Thumb>;

  getValue(): Array<number>;
  setValue(values: { val1: number, val2?: number }): ISliderModel;
}
