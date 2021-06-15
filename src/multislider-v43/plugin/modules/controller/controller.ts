import SliderView from '../view/view';
import EventEmitter from '../utils/event-emitter';
import ISliderModel from '../models/interfaces/interfaces';

class SliderController extends EventEmitter {
  private model: ISliderModel;

  private view: SliderView;

  private axis: {
    eventAxis: 'pageX' | 'pageY',
    sizeParent: 'width' | 'height',
    dPos: -1 | 1;
  };

  constructor(model: ISliderModel, view: SliderView) {
    super();

    this.model = model;
    this.view = view;

    this.initOrientation();
  }

  public initListeners() {
    this.updateInit();

    this.thumbInit();

    this.outputInit();

    if (this.view.scale.getScales().length) {
      this.scaleInit();
    }
  }

  private initOrientation() {
    if (this.view.getAxis()) {
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
  }

  private updateInit() {
    this.model.on('valueChanged', this.updateListener);

    window.addEventListener('resize', this.updateListener);
    window.addEventListener('resize', this.view.updateScale);

    document.addEventListener('DOMContentLoaded', this.updateListener); // fix important bug with appearance browser's scroll bar in process of rendering sliders, as a result,
    document.addEventListener('DOMContentLoaded', this.view.updateScale); // the value of getBoundingClientRect() changes to new, this is the reason for the incorrect display
  }

  private updateListener = () => {
    this.view.update.call(this.view, this.model.getValue());
  };

  private thumbInit() {
    for (let i = 0; i < this.view.thumbs.getLength(); i += 1) {
      let isFocused = false;
      let pos0: number;
      let value0: number;

      const addPointerDownEvents = (n: number, e: Event) => {
        pos0 = e[this.axis.eventAxis];
        value0 = this.model.getValue()[n];
        isFocused = true;
      };

      const addPointerMoveEvents = (e: Event) => {
        if (!isFocused) return;

        const pos1 = e[this.axis.eventAxis];

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
      };

      const addPointerUpEvents = () => {
        isFocused = false;
      };

      this.view.thumbs.getN(i).addEventListener('pointerdown', addPointerDownEvents.bind(this, i));

      document.addEventListener('pointermove', addPointerMoveEvents.bind(this));

      document.addEventListener('pointerup', addPointerUpEvents);
    }
  }

  private outputInit() {
    function addOutputEvents(n: number) {
      const newVal = this.view.outputs.getValues()[n].value.replace(/,/g, '.');

      if (Number(newVal)) {
        if (n === 0) {
          this.model.setValue({ val1: +newVal });
        } else {
          this.model.setValue({ val2: +newVal });
        }
      } else {
        this.view.outputs.updateN(n, this.model.getValue()[n]);
      }
    }
    this.view.outputs.getValues().forEach((output, i) => {
      output.addEventListener('change', addOutputEvents.bind(this, i));
    });
  }

  private scaleInit() {
    const scale = this.view.scale.getScale();

    function addScaleEvent(e: Event) {
      const target = e.target as HTMLDivElement;

      if (!target.matches('.multislider-v43__scale-division')) return;

      const scaleDivisionValue = +(target.textContent).replace(',', '.');

      if (this.model.getValue().length === 2
        && (Math.abs(scaleDivisionValue - this.model.getValue()[1])
          < Math.abs(scaleDivisionValue - this.model.getValue()[0]))) {
        this.model.setValue({ val2: scaleDivisionValue }, false);
      } else {
        this.model.setValue({ val1: scaleDivisionValue }, false);
      }
    }

    scale.addEventListener('click', addScaleEvent.bind(this));
  }
}

export default SliderController;
