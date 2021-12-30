import { ModelConfig, ThumbModel } from 'Plugin/custom-types';

import EventEmitter, { ModelEvents } from '../utils/EventEmitter';
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
      min,
      max,
    } = this;
    let { val1, val2 } = props;

    const valuesAreNotDefined = (val1 === undefined) && (val2 === undefined);

    if (valuesAreNotDefined) {
      this.emit(ModelEvents.CHANGE_VALUE, {
        value1: val1,
        value2: val2,
      });

      return;
    }

    const value1IsDefined = (val1 !== undefined);
    const value2IsDefined = (val2 !== undefined);

    val1 = val1 ?? thumbs[0].value;
    val2 = val2 ?? thumbs[1].value;

    const value1GreaterValue2 = val1 > val2;
    const onlyValue1isDefined = value1IsDefined && !value2IsDefined;
    const onlyValue2isDefined = value2IsDefined && !value1IsDefined;

    if (value1GreaterValue2 && onlyValue1isDefined) {
      val1 = val2;
    } else if (value1GreaterValue2 && onlyValue2isDefined) {
      val2 = val1;
    } else if (value1GreaterValue2) {
      [val1, val2] = [val2, val1];
    }

    val1 = val1 >= max ? max
      : this.convertNumberToStep(val1);
    val2 = val2 >= max ? max
      : this.convertNumberToStep(val2);

    val1 = Math.max(val1, min);
    val1 = Math.min(val1, max);
    val2 = Math.max(val2, min);
    val2 = Math.min(val2, max);

    thumbs[0].value = val1;
    thumbs[0].max = val2;

    thumbs[1].value = val2;
    thumbs[1].min = val1;

    this.emit(ModelEvents.CHANGE_VALUE, {
      value1: val1,
      value2: val2,
    });
  };

  private getDefaultThumbs = (): [ThumbModel, ThumbModel] => {
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
  };

  private convertNumberToStep = (value: number): number => {
    const {
      step,
      min,
    } = this;

    const delta = value - min;

    return Number(String((Math.floor((delta / step) + 0.5) / (1 / step) + min).toFixed(10)));
  };
}

export default DoubleModel;
