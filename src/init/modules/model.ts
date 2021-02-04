/* eslint-disable max-classes-per-file */
import EventEmitter from './eventEmitter';
import type { Thumb } from './customTypes';
import { ISliderModel } from './interfaces';
import { ModelConfig } from './customTypes';

export { DoubleSliderModel, SoloSliderModel, swap };

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

  public setValue(values: { val1?: number, val2?: number }, isStepping: boolean = true) {
    let { val1, val2 } = values;

    val1 = val1 ?? this.thumbs[0].value;
    val2 = val2 ?? this.thumbs[1].value;

    if (val1 > val2) {
      [val1, val2] = swap(val1, val2);
    }

    if (isStepping) {
      val1 = (Math.round(val1 / this.step) / (1 / this.step)); // 200 IQ move
      val2 = (Math.round(val2 / this.step) / (1 / this.step)); // pass by 0.30000000000004 and other
    }

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

  private step: number;

  constructor(cfg: ModelConfig) {
    super();

    this.thumbs = [];
    this.step = cfg.step;

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

  public setValue(values: { val1: number }, isStepping: boolean = true) {
    let { val1 } = values;

    if (val1) {
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
