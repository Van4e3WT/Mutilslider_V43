import EventEmitter from 'Plugin/modules/utils/EventEmitter';

interface ISliderModel extends EventEmitter {
  getMin(): number;
  getMax(): number;
  getValue(): Array<number>;
  setValue(props: {
    val1?: number,
    val2?: number,
  }): void;
}

export default ISliderModel;
