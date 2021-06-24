import SliderView from '../view/view';
import EventEmitter from '../utils/event-emitter';
import ISliderModel from '../models/interfaces/interfaces';

class SliderController extends EventEmitter {
  private model: ISliderModel;

  private view: SliderView;

  private axis: {
    axis: 'x' | 'y',
    eventAxis: 'pageX' | 'pageY',
    sizeParent: 'width' | 'height',
    start: 'left' | 'top',
    end: 'right' | 'bottom',
    dPos: -1 | 1;
  };

  constructor(model: ISliderModel, view: SliderView) {
    super();

    this.model = model;
    this.view = view;

    this._initOrientation();
  }

  public initListeners() {
    const { view } = this;

    this._initUpdate();
    this._initThumb();
    this._initOutput();
    this._initBody();

    if (view.scale.getScales().length) {
      this._initScale();
    }
  }

  private _initOrientation() {
    const { view } = this;

    if (view.isVertical) {
      this.axis = {
        axis: 'y',
        eventAxis: 'pageY',
        sizeParent: 'height',
        start: 'top',
        end: 'bottom',
        dPos: -1,
      };
    } else {
      this.axis = {
        axis: 'x',
        eventAxis: 'pageX',
        sizeParent: 'width',
        start: 'left',
        end: 'right',
        dPos: 1,
      };
    }
  }

  private _initUpdate() {
    const { model } = this;

    model.on('valueChanged', this._handleListenerUpdate);

    window.addEventListener('resize', this._handleListenerUpdate);
    window.addEventListener('resize', this.view.updateScale);

    document.addEventListener('DOMContentLoaded', this._handleListenerUpdate);
    document.addEventListener('DOMContentLoaded', this.view.updateScale);
    /*
      That document listeners fix important bug with appearance browser's scroll bar
      in process of rendering sliders, as a result, the value of getBoundingClientRect()
      changes to new, this is the reason for the incorrect display
    */
  }

  private _handleListenerUpdate = () => {
    const { view, model } = this;

    view.update.call(view, model.getValue());
  };

  private _initThumb() {
    const { view, model, axis } = this;

    for (let i = 0; i < view.thumbs.getLength(); i += 1) {
      let isFocused = false;
      let pos0: number;
      let value0: number;

      const handlePointerDown = (e: Event) => {
        pos0 = e[axis.eventAxis];
        value0 = model.getValue()[i];
        isFocused = true;
      };

      const handlePointerMove = (e: Event) => {
        if (!isFocused) return;

        const pos1 = e[axis.eventAxis];
        const value = ((((pos1 - pos0) * axis.dPos)
          / (view.parentThumbs.getBoundingClientRect()[axis.sizeParent]
            - view.getThumbSize()))
          * (model.getMax() - model.getMin()))
          + value0;

        if (i === 0) {
          model.setValue({ val1: value });
        } else if (i === 1) {
          model.setValue({ val2: value });
        }
      };

      const handlePointerUp = () => {
        isFocused = false;
      };

      view.thumbs.getN(i).addEventListener('pointerdown', handlePointerDown);

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  }

  private _initOutput() {
    const { view, model } = this;

    function handleOutputChange(n: number) {
      const newVal = view.outputs.getValues()[n].value.replace(/,/g, '.');

      if (Number.isInteger(Number(newVal))) {
        if (n === 0) {
          model.setValue({ val1: +newVal });
        } else {
          model.setValue({ val2: +newVal });
        }
      } else {
        view.outputs.updateN(n, model.getValue()[n]);
      }
    }

    view.outputs.getValues().forEach((output, i) => {
      output.addEventListener('change', handleOutputChange.bind(this, i));
    });
  }

  private _initScale() {
    const { view, model } = this;
    const scale = view.scale.getScale();

    const handleScaleClick = (e: Event) => {
      const target = e.target as HTMLDivElement;

      if (!target.matches('.multislider-v43__scale-division')) return;

      const scaleDivisionValue = +(target.textContent).replace(',', '.');

      const isSecondValue = model.getValue().length === 2
        && (Math.abs(scaleDivisionValue - model.getValue()[1])
          < Math.abs(scaleDivisionValue - model.getValue()[0]));

      const isEquals = model.getValue().length === 2
        && (Math.abs(scaleDivisionValue - model.getValue()[1])
          === Math.abs(scaleDivisionValue - model.getValue()[0]));

      if (isSecondValue) {
        model.setValue({ val2: scaleDivisionValue });
      } else if (isEquals) {
        if (model.getValue()[1] < scaleDivisionValue) {
          model.setValue({ val2: scaleDivisionValue });
        } else {
          model.setValue({ val1: scaleDivisionValue });
        }
      } else {
        model.setValue({ val1: scaleDivisionValue });
      }
    };

    scale.addEventListener('click', handleScaleClick);
  }

  private _initBody() {
    const { model, view, axis } = this;
    const bodySlider = view.parentThumbs;

    const handleBodyThumbsClick = (e: PointerEvent) => {
      const target = e.target as HTMLDivElement;

      if (!target.classList.contains('multislider-v43__body')) return;

      const delta = target.getBoundingClientRect()[axis.end]
        - target.getBoundingClientRect()[axis.start];
      const proportion = (e[axis.axis] - target.getBoundingClientRect()[axis.start]) / delta;

      const newValue = (model.getMax() - model.getMin())
        * (axis.axis === 'y' ? 1 - proportion : proportion) + model.getMin();

      const isSecondValue = model.getValue().length === 2
        && (Math.abs(newValue - model.getValue()[1])
          < Math.abs(newValue - model.getValue()[0]));

      const isEquals = model.getValue().length === 2
        && (Math.abs(newValue - model.getValue()[1])
          === Math.abs(newValue - model.getValue()[0]));

      if (isSecondValue) {
        model.setValue({ val2: newValue });
      } else if (isEquals) {
        if (model.getValue()[1] < newValue) {
          model.setValue({ val2: newValue });
        } else {
          model.setValue({ val1: newValue });
        }
      } else {
        model.setValue({ val1: newValue });
      }
    };

    bodySlider.addEventListener('click', handleBodyThumbsClick);
  }
}

export default SliderController;
