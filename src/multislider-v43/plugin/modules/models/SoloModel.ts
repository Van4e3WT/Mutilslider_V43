import EventEmitter from '../utils/EventEmitter';
import { ModelConfig, ThumbModel } from '../utils/custom-types';
import IModel from './interfaces/IModel';

class SoloModel extends EventEmitter implements IModel {
  private thumbs: [ThumbModel];

  private step: number;

  constructor(cfg: ModelConfig) {
    super();

    const {
      step,
      min,
      max,
      value1 = min,
    } = cfg;

    this.step = step;
    this.thumbs = this.getDefaultThumb(min, max);

    this.setValue({ val1: value1 });
  }

  public getMin = (): number => {
    const { thumbs } = this;

    return thumbs[0].min;
  };

  public getMax = (): number => {
    const { thumbs } = this;

    return thumbs[0].max;
  };

  public getValue = (): Array<number> => {
    const { thumbs } = this;

    return thumbs.map((item) => item.value);
  };

  public setValue = (props: { val1?: number }): void => {
    const { thumbs, step } = this;
    let { val1 } = props;

    const valueIsDefined = (val1 !== undefined && val1 !== null);

    if (valueIsDefined) {
      val1 = val1 ?? thumbs[0].value;

      const delta = val1 - thumbs[0].min;

      val1 = val1 >= thumbs[0].max ? thumbs[0].max
        : Number(String((Math.floor((delta / step) + 0.5) / (1 / step) + thumbs[0].min)
          .toFixed(10)));

      val1 = val1 > thumbs[0].max ? thumbs[0].max : val1;
      val1 = val1 < thumbs[0].min ? thumbs[0].min : val1;

      thumbs[0].value = val1;
    }

    this.emit('valueChanged', {
      value1: props.val1,
    });
  };

  private getDefaultThumb(min: number, max: number): [ThumbModel] {
    return [{
      min,
      max,
      value: min,
    }];
  }
}

export default SoloModel;
