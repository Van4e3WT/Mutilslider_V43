import EventEmitter from 'Plugin/modules/utils/event-emitter';

interface ISliderModel extends EventEmitter {
  getMin(): number;
  getMax(): number;
  getValue(): Array<number>;
  setValue(props: {
    val1?: number,
    val2?: number,
    isStepping?: boolean,
  }): void;
}

export default ISliderModel;
