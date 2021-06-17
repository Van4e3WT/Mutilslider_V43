import ISliderModel from './interfaces/interfaces';
import EventEmitter from '../utils/event-emitter';
import { ModelConfig, ThumbModel } from '../utils/custom-types';

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
    const { thumbs } = this;

    return thumbs[0].min;
  }

  public getMax() {
    const { thumbs } = this;

    return thumbs[0].max;
  }

  public getValue() {
    const { thumbs } = this;

    return thumbs.map((item) => item.value);
  }

  public setValue(values: { val1: number }, isStepping: boolean = true) {
    const { thumbs, step } = this;
    let { val1 } = values;

    const valueIsDefined = val1 !== undefined && val1 !== null;
    if (valueIsDefined) {
      if (isStepping) {
        val1 = (Math.round(val1 / step) / (1 / step));
      }

      val1 = val1 > thumbs[0].max ? thumbs[0].max : val1;
      val1 = val1 < thumbs[0].min ? thumbs[0].min : val1;

      thumbs[0].value = val1;
    }

    this.emit('valueChanged', {
      value1: values.val1,
    });
  }
}

export default SoloSliderModel;
