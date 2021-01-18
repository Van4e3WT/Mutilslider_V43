import EventEmitter from './eventEmitter'

type Thumb = {
  min: number;
  max: number;
  step: number;
  value: number;
};

//======================================
//              Interface               
//======================================

interface ISliderModel {

  thumbs: Array<Thumb>;

  getValue() : Array<number>;
  setValue(values: Array<number>): ISliderModel;

}

//======================================
//            Double Slider             
//======================================

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

    if(cfg.value1 > cfg.value2) {
      [cfg.value1, cfg.value2] = this._swap(cfg.value1, cfg.value2);
    }

    this.thumbs = [];

    this.thumbs.push({
      min: cfg.min,
      max: cfg.value2,
      step: cfg.step,
      value: cfg.value1
    });

    this.thumbs.push({
      min: cfg.value1,
      max: cfg.max,
      step: cfg.step,
      value: cfg.value2
    });
  }

  getValue() {
    return [this.thumbs[0].value, this.thumbs[1].value];
  }

  setValue(values: [number, number]) {

    if(values[0] > values[1]) {
      [values[0], values[1]] = this._swap(values[0], values[1]);
    }

    this.thumbs[0].value = values[0];
    this.thumbs[0].max = values[1];

    this.thumbs[1].value = values[1];
    this.thumbs[1].min = values[0];

    this.emit('valueChanged', {
      value1: values[0],
      value2: values[1]
    });

    return this;
  }

  _swap(a: any, b: any): Array<any> {
    return [b, a];
  }
}

//======================================
//             Solo Slider              
//======================================

class SoloSliderModel extends EventEmitter implements ISliderModel {

  thumbs: Array<Thumb>;

  constructor(cfg: {
    min: number,
    max: number,
    step: number,
    value: number
  }) {
    super();

    this.thumbs = [];

    this.thumbs.push({
      min: cfg.min,
      max: cfg.max,
      step: cfg.step,
      value: cfg.value
    });
  }

  getValue() {
    return [this.thumbs[0].value];
  }

  setValue(values: [number]) {
    this.thumbs[0].value = values[0];
    this.emit('valueChanged', {
      value1: values[0]
    })
    return this;
  }
}