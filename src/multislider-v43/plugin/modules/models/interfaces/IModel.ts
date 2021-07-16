import EventEmitter from 'Plugin/modules/utils/EventEmitter';

interface IModel extends EventEmitter {
  getMin(): number;
  getMax(): number;
  getValue(): Array<number>;
  setValue(props: {
    val1?: number,
    val2?: number,
  }): void;
}

export default IModel;
