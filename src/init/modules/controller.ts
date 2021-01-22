import EventEmitter from './eventEmitter';
import { ISliderModel, ISliderView } from './interfaces';

export default class SliderController extends EventEmitter {
  model: ISliderModel;

  view: ISliderView;

  constructor(model: ISliderModel, view: ISliderView) {
    super();

    this.model = model;
    this.view = view;
  }
}
