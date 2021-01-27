/* eslint-disable no-bitwise */
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
      [value1, value2] = swap(value1, value2);
    }

    this.thumbs = [];

    this.thumbs.push({
      min: this.min,
      max: value2,
      value: value1,
    });

    this.thumbs.push({
      min: value1,
      max: this.max,
      value: value2,
    });
  }

  public getMin() {
    return this.min;
  }

  public getMax() {
    return this.max;
  }

  public getValue() {
    return this.thumbs;
  }

  public setValue(values: { val1: number, val2?: number }) {
    let { val1, val2 } = values;
    val2 = val2 ?? this.thumbs[1].value;

    if (val1 > val2) {
      [val1, val2] = swap(val1, val2);
    }

    val1 = ~~(val1 / this.step) * this.step;
    val2 = ~~(val2 / this.step) * this.step;

    val1 = val1 < this.min ? this.min : val1;
    val2 = val2 > this.max ? this.max : val2;

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
      value: cfg.value1,
    });
  }

  public getMin() {
    return this.thumbs[0].min;
  }

  public getMax() {
    return this.thumbs[0].max;
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
