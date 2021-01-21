/* eslint-disable max-classes-per-file */
import EventEmitter from './eventEmitter';
import type { Thumb } from './customTypes';
import ISliderModel from './modelInterface';

function swap(a: any, b: any): Array<any> {
  return [b, a];
}

// ======================================
//            Double Slider
// ======================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class DoubleSliderModel extends EventEmitter implements ISliderModel {
  thumbs: Array<Thumb>;

  constructor(cfg: {
    min: number,
    max: number,
    step: number,
    value1: number,
    value2: number
  }) {
    super();

    if (cfg.value1 > cfg.value2) { // eslint-disable-next-line no-param-reassign
      [cfg.value1, cfg.value2] = swap(cfg.value1, cfg.value2);
    }

    this.thumbs = [];

    this.thumbs.push({
      min: cfg.min,
      max: cfg.value2,
      step: cfg.step,
      value: cfg.value1,
    });

    this.thumbs.push({
      min: cfg.value1,
      max: cfg.max,
      step: cfg.step,
      value: cfg.value2,
    });
  }

  getValue() {
    return [this.thumbs[0].value, this.thumbs[1].value];
  }

  setValue(values: { val1: number, val2: number }) {
    if (values.val1 > values.val2) { // eslint-disable-next-line no-param-reassign
      [values.val1, values.val2] = swap(values.val1, values.val2);
    }

    this.thumbs[0].value = values.val1;
    this.thumbs[0].max = values.val2;

    this.thumbs[1].value = values.val2;
    this.thumbs[1].min = values.val1;

    this.emit('valueChanged', {
      value1: values.val1,
      value2: values.val2,
    });

    return this;
  }
}

// ======================================
//             Solo Slider
// ======================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SoloSliderModel extends EventEmitter implements ISliderModel {
  thumbs: Array<Thumb>;

  constructor(cfg: {
    min: number,
    max: number,
    step: number,
    value: number,
  }) {
    super();

    this.thumbs = [];

    this.thumbs.push({
      min: cfg.min,
      max: cfg.max,
      step: cfg.step,
      value: cfg.value,
    });
  }

  getValue() {
    return [this.thumbs[0].value];
  }

  setValue(values: { val1: number }) {
    this.thumbs[0].value = values.val1;
    this.emit('valueChanged', {
      value1: values.val1,
    });
    return this;
  }
}
