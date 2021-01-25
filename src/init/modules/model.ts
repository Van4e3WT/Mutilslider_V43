/* eslint-disable max-classes-per-file */
import EventEmitter from './eventEmitter';
import type { Thumb } from './customTypes';
import { ISliderModel } from './interfaces';
import { ModelConfig } from './customTypes';

export { DoubleSliderModel, SoloSliderModel };

function swap(a: any, b: any): Array<any> {
  return [b, a];
}

// ======================================
//            Double Slider
// ======================================

class DoubleSliderModel extends EventEmitter implements ISliderModel {
  private thumbs: Array<Thumb>;

  constructor(cfg: ModelConfig) {
    super();

    let { value1, value2 } = cfg;

    if (value1 > value2) {
      [value1, value2] = swap(value1, value2);
    }

    this.thumbs = [];

    this.thumbs.push({
      min: cfg.min,
      max: value2,
      step: cfg.step,
      value: value1,
    });

    this.thumbs.push({
      min: value1,
      max: cfg.max,
      step: cfg.step,
      value: value2,
    });
  }

  public getValue() {
    return this.thumbs;
  }

  public setValue(values: { val1: number, val2?: number }) {
    let { val1 } = values;
    let val2 = values.val2 ?? this.thumbs[1].value;

    if (val1 > val2) {
      [val1, val2] = swap(val1, val2);
    }

    this.thumbs[0].value = val1;
    this.thumbs[0].max = val2;

    this.thumbs[1].value = val2;
    this.thumbs[1].min = val1;

    this.emit('valueChanged', {
      value1: val1,
      value2: val2,
    });
  }
}

// ======================================
//             Solo Slider
// ======================================

class SoloSliderModel extends EventEmitter implements ISliderModel {
  private thumbs: Array<Thumb>;

  constructor(cfg: ModelConfig) {
    super();

    this.thumbs = [];

    this.thumbs.push({
      min: cfg.min,
      max: cfg.max,
      step: cfg.step,
      value: cfg.value1,
    });
  }

  public getValue() {
    return this.thumbs;
  }

  public setValue(values: { val1: number }) {
    this.thumbs[0].value = values.val1;
    this.emit('valueChanged', {
      value1: values.val1,
    });
  }
}
