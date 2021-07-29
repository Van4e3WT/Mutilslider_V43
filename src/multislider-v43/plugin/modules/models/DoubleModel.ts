import EventEmitter from '../utils/EventEmitter';
import { ModelConfig, ThumbModel } from '../utils/custom-types';
import IModel from './interfaces/IModel';

class DoubleModel extends EventEmitter implements IModel {
  private thumbs: [ThumbModel, ThumbModel];

  private min: number;

  private max: number;

  private step: number;

  constructor(cfg: ModelConfig) {
    super();

    const {
      min,
      max,
      step,
      value1 = min,
      value2 = max,
    } = cfg;

    this.min = min;
    this.max = max;
    this.step = step;

    this.thumbs = this.getDefaultThumbs();

    this.setValue({ val1: value1, val2: value2 });
  }

  public getMin = (): number => {
    const { min } = this;

    return min;
  };

  public getMax = (): number => {
    const { max } = this;

    return max;
  };

  public getValue = (): Array<number> => {
    const { thumbs } = this;

    return thumbs.map((item) => item.value);
  };

  public setValue = (props: { val1?: number, val2?: number }): void => {
    const {
      thumbs,
      step,
      min,
      max,
    } = this;
    let { val1, val2 } = props;

    const val1IsDefined = (val1 !== undefined && val1 !== null);
    const val2IsDefined = (val2 !== undefined && val2 !== null);
    const valuesAreDefined = val1IsDefined || val2IsDefined;

    if (valuesAreDefined) {
      val1 = val1 ?? thumbs[0].value;
      val2 = val2 ?? thumbs[1].value;

      if (val1 > val2) {
        if (val1IsDefined) {
          val1 = val2;
        }

        if (val2IsDefined) {
          val2 = val1;
        }
      }

      const delta1 = val1 - min;
      const delta2 = val2 - min;

      val1 = val1 >= max ? max
        : Number(String((Math.floor((delta1 / step) + 0.5) / (1 / step) + min).toFixed(10)));
      val2 = val2 >= max ? max
        : Number(String((Math.floor((delta2 / step) + 0.5) / (1 / step) + min).toFixed(10)));

      val1 = val1 < min ? min : val1;
      val1 = val1 > max ? max : val1;
      val2 = val2 < min ? min : val2;
      val2 = val2 > max ? max : val2;

      thumbs[0].value = val1;
      thumbs[0].max = val2;

      thumbs[1].value = val2;
      thumbs[1].min = val1;
    }

    this.emit('valueChanged', {
      value1: val1,
      value2: val2,
    });
  };

  private getDefaultThumbs(): [ThumbModel, ThumbModel] {
    const { min, max } = this;

    return [
      {
        min,
        max,
        value: min,
      },
      {
        min,
        max,
        value: max,
      },
    ];
  }
}

export default DoubleModel;
