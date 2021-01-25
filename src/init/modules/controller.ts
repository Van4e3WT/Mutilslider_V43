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
    console.log('Mousedown is work');
    const pos0 = e.pageY;
    console.log(`Pos0: ${pos0}`);
    document.addEventListener('mousemove', mouseMoving = (ev) => {
      const pos1 = ev.pageY;
      console.log(`Pos1: ${pos1}`);
      console.log('Mousemoving');
      const value = (pos1 - pos0) / this.view.parentThumbs.getBoundingClientRect().height;
      if (i === 0) {
        this.model.setValue({ val1: value });
      } else if (i === 1) {
        this.model.setValue({ val1: this.model.getValue()[0].value, val2: value });
      }
    });
    document.addEventListener('mouseup', this.removeMouseListener);
  }

  private removeMouseListener() {
    console.log('Mouseup is work');
    document.removeEventListener('mousemove', mouseMoving); // сделать метод в view, который меняет положение при перемещении курсора
    document.removeEventListener('mouseup', this.removeMouseListener);
  }
}
