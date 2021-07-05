import ISliderModel from './interfaces/interfaces';
import EventEmitter from '../utils/event-emitter';
import { ModelConfig, ThumbModel } from '../utils/custom-types';

class SoloSliderModel extends EventEmitter implements ISliderModel {
  private thumbs: Array<ThumbModel>;

  private step: number;

  constructor(cfg: ModelConfig) {
    super();

    const {
      step,
      min,
      max,
      value1 = min,
    } = cfg;

    this.thumbs = [];
    this.step = step;

    this.thumbs.push({
      min,
      max,
      value: (max - min) / 2,
    });

    this.setValue({ val1: value1 });
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

  public setValue(props: { val1?: number, val2?: number, isStepping?: boolean }) {
    const { thumbs, step } = this;
    const { isStepping = true } = props;
    let { val1 } = props;

    const valueIsDefined = (val1 !== undefined && val1 !== null);

    if (valueIsDefined) {
      val1 = val1 ?? thumbs[0].value;

      if (isStepping) {
        const delta = val1 - thumbs[0].min;

        val1 = Number(String((Math.floor((delta / step) + 0.5) / (1 / step) + thumbs[0].min)
          .toFixed(10)));
      }

      val1 = val1 > thumbs[0].max ? thumbs[0].max : val1;
      val1 = val1 < thumbs[0].min ? thumbs[0].min : val1;

      thumbs[0].value = val1;
    }

    this.emit('valueChanged', {
      value1: props.val1,
    });
  }
}

export default SoloSliderModel;
