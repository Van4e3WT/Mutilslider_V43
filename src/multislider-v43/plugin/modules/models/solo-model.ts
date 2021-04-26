import ISliderModel from '../interfaces';
import EventEmitter from '../event-emitter';
import { ModelConfig } from '../custom-types';
import type { ThumbModel } from '../custom-types';

class SoloSliderModel extends EventEmitter implements ISliderModel {
  private thumbs: Array<ThumbModel>;

  private step: number;

  constructor(cfg: ModelConfig) {
    super();

    this.thumbs = [];
    this.step = cfg.step;

    this.thumbs.push({
      min: cfg.min,
      max: cfg.max,
      value: (cfg.max - cfg.min) / 2,
    });
    this.setValue({ val1: cfg.value1 }, false);
  }

  public getMin() {
    return this.thumbs[0].min;
  }

  public getMax() {
    return this.thumbs[0].max;
  }

  public getValue() {
    return this.thumbs.map((item) => item.value);
  }

  public setValue(values: { val1: number }, isStepping: boolean = true) {
    let { val1 } = values;

    const valueIsDefined = val1 !== undefined && val1 !== null;
    if (valueIsDefined) {
      if (isStepping) {
        val1 = (Math.round(val1 / this.step) / (1 / this.step));
      }

      val1 = val1 > this.thumbs[0].max ? this.thumbs[0].max : val1;
      val1 = val1 < this.thumbs[0].min ? this.thumbs[0].min : val1;

      this.thumbs[0].value = val1;
    }

    this.emit('valueChanged', {
      value1: values.val1,
    });
  }
}

export default SoloSliderModel;
