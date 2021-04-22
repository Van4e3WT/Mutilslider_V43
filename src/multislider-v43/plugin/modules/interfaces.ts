import EventEmitter from './event-emitter';

interface ISliderModel extends EventEmitter {
  getMin(): number;
  getMax(): number;
  getValue(): Array<number>;
  setValue(values: { val1?: number, val2?: number }, isStepping?: boolean): void;
}

export { ISliderModel as default };
