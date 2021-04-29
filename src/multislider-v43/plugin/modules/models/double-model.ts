import ISliderModel from './interfaces/interfaces';
import Utils from '../utils/utils';
import EventEmitter from '../utils/event-emitter';
import { ModelConfig, ThumbModel } from '../utils/custom-types';

class DoubleSliderModel extends EventEmitter implements ISliderModel {
  private thumbs: Array<ThumbModel>;

  private min: number;

  private max: number;

  private step: number;

  constructor(cfg: ModelConfig) {
    super();

    let { value1, value2 } = cfg;

    this.min = cfg.min;
    this.max = cfg.max;
    this.step = cfg.step;

    if (value1 > value2) {
      [value1, value2] = Utils.swap(value1, value2);
    }

    this.thumbs = [];

    this.thumbs.push({
      min: this.min,
      max: value2,
      value: this.min,
    });

    this.thumbs.push({
      min: value1,
      max: this.max,
      value: this.max,
    });

    this.setValue({ val1: value1, val2: value2 }, false);
  }

  public getMin() {
    return this.min;
  }

  public getMax() {
    return this.max;
  }

  public getValue() {
    return this.thumbs.map((item) => item.value);
  }

  public setValue(values: { val1?: number, val2?: number }, isStepping: boolean = true) {
    let { val1, val2 } = values;

    const val1IsDefined = (val1 !== undefined && val1 !== null);
    const val2IsDefined = (val2 !== undefined && val2 !== null);
    const valuesIsDefined = val1IsDefined || val2IsDefined;

    if (valuesIsDefined) {
      val1 = val1 ?? this.thumbs[0].value;
      val2 = val2 ?? this.thumbs[1].value;

      if (val1 > val2) {
        [val1, val2] = Utils.swap(val1, val2);
      }

      if (isStepping) {
        val1 = (Math.round(val1 / this.step) / (1 / this.step));
        val2 = (Math.round(val2 / this.step) / (1 / this.step)); // pass by 0.300000000004 and other
      }

      val1 = val1 < this.min ? this.min : val1;
      val2 = val2 > this.max ? this.max : val2;

      this.thumbs[0].value = val1;
      this.thumbs[0].max = val2;

      this.thumbs[1].value = val2;
      this.thumbs[1].min = val1;
    }

    this.emit('valueChanged', {
      value1: val1,
      value2: val2,
    });
  }
}

export default DoubleSliderModel;
