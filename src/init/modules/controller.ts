import EventEmitter from './eventEmitter';
import { ISliderModel, ISliderView } from './interfaces';

let mouseMoving: (e: MouseEvent) => void;

export default class SliderController extends EventEmitter {
  private model: ISliderModel;

  private view: ISliderView;

  constructor(model: ISliderModel, view: ISliderView) {
    super();

    this.model = model;
    this.view = view;

    view.sliderThumbs.forEach((item, i) => {
      view.sliderThumbs[i].addEventListener('mousedown', (e) => this.addMouseListener(i, e));
    });
  }

  private addMouseListener(i: number, e: MouseEvent) {
    const pos0 = e.pageY;
    const value0 = this.model.getValue()[i].value;

    document.addEventListener('mousemove', mouseMoving = (ev) => {
      const pos1 = ev.pageY;
      // eslint-disable-next-line no-bitwise
      const value = ~~(((pos0 - pos1)
        / (this.view.parentThumbs.getBoundingClientRect().height - this.view.GET_THUMB_SIZE()))
        * (this.model.getMax() - this.model.getMin()))
        + value0;

      if (i === 0) {
        this.model.setValue({ val1: value });
      } else if (i === 1) {
        this.model.setValue({ val1: this.model.getValue()[0].value, val2: value });
      }
    });

    document.addEventListener('mouseup', this.removeMouseListener);
  }

  private removeMouseListener() {
    document.removeEventListener('mousemove', mouseMoving);
    document.removeEventListener('mouseup', this.removeMouseListener);
  }
}
