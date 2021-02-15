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
      view.sliderThumbs[i].addEventListener('pointerdown', (e) => this.addMouseListener(i, e));
    });

    if (view.sliderScale.length) {
      view.sliderScale.forEach((item) => {
        item.addEventListener('click', () => {
          const scaleDivisionValue = +(item.innerText);

          if (this.model.getValue().length === 2
            && (Math.abs(scaleDivisionValue - this.model.getValue()[1].value)
              < Math.abs(scaleDivisionValue - this.model.getValue()[0].value))) {
            this.model.setValue({ val2: scaleDivisionValue }, false);
          } else {
            this.model.setValue({ val1: scaleDivisionValue }, false);
          }
        });
      });
    }
  }

  private addMouseListener(i: number, e: PointerEvent) {
    const pos0 = e[this.axis.eventAxis];
    const value0 = this.model.getValue()[i].value;

    document.addEventListener('pointermove', mouseMoving = (ev) => {
      const pos1 = ev[this.axis.eventAxis];

      const value = ((((pos1 - pos0) * this.axis.dPos)
        / (this.view.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]
          - this.view.getThumbSize()))
        * (this.model.getMax() - this.model.getMin()))
        + value0;

      if (i === 0) {
        this.model.setValue({ val1: value });
      } else if (i === 1) {
        this.model.setValue({ val2: value });
      }
    });

    document.addEventListener('pointerup', this.removeMouseListener);
  }

  private removeMouseListener() {
    document.removeEventListener('pointermove', mouseMoving);
    document.removeEventListener('pointerup', this.removeMouseListener);
  }
}
