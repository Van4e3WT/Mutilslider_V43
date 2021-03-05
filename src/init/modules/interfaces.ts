import EventEmitter from './eventEmitter';
import type { Thumb } from './customTypes';

interface ISliderModel extends EventEmitter {
  getMin(): number;
  getMax(): number;
  getValue(): Array<Thumb>;
  setValue(values: { val1?: number, val2?: number }, isStepping?: boolean): void;
}

export { ISliderModel as default };
