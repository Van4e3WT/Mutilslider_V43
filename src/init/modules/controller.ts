import EventEmitter from './eventEmitter';
import { ISliderModel, ISliderView } from './interfaces';

let mouseMoving: (e: MouseEvent) => void;

export default class SliderController extends EventEmitter {
  private model: ISliderModel;

  private view: ISliderView;

  private axis: {
    eventAxis: 'pageX' | 'pageY',
    sizeParent: 'width' | 'height',
    dPos: -1 | 1;
  };

  constructor(model: ISliderModel, view: ISliderView) {
    super();

    this.model = model;
    this.view = view;

    if (view.getAxis() === 'Y') {
      this.axis = {
        eventAxis: 'pageY',
        sizeParent: 'height',
        dPos: -1,
      };
    } else {
      this.axis = {
        eventAxis: 'pageX',
        sizeParent: 'width',
        dPos: 1,
      };
    }

    view.sliderThumbs.forEach((item, i) => {
      view.sliderThumbs[i].addEventListener('mousedown', (e) => this.addMouseListener(i, e));
    });
  }

  private addMouseListener(i: number, e: MouseEvent) {
    const pos0 = e[this.axis.eventAxis];
    const value0 = this.model.getValue()[i].value;

    document.addEventListener('mousemove', mouseMoving = (ev) => {
      const pos1 = ev[this.axis.eventAxis];
      // eslint-disable-next-line no-bitwise
      const value = ~~((((pos1 - pos0) * this.axis.dPos)
        / (this.view.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]
          - this.view.GET_THUMB_SIZE()))
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
