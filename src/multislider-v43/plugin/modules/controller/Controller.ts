/* global document */
import View from '../view/View';
import EventEmitter from '../utils/EventEmitter';
import IModel from '../models/interfaces/IModel';

class Controller extends EventEmitter {
  private model: IModel;

  private view: View;

  private selector: string;

  private axis: {
    axis: 'x' | 'y',
    eventAxis: 'pageX' | 'pageY',
    sizeParent: 'width' | 'height',
    start: 'left' | 'top',
    end: 'right' | 'bottom',
    dPos: -1 | 1;
  };

  constructor(props: {
    model: IModel,
    view: View,
  }) {
    super();

    const { model, view } = props;

    this.model = model;
    this.view = view;
    this.selector = view.selector;

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

  public init() {
    this.initUpdate();
    this.initThumb();
    this.initBody();
  }

  private initUpdate() {
    const { model, view } = this;
    const {
      getValue,
      setValue,
      getMin,
      getMax,
    } = model;

    model.on('valueChanged', this.handleListenerUpdate);

    view.init({
      getValue,
      setValue,
      getMin,
      getMax,
    });
  }

  private handleListenerUpdate = () => {
    const { view, model } = this;

    view.update(model.getValue());
  };

  private initThumb() {
    const {
      view,
      model,
      axis,
      selector,
    } = this;

    for (let i = 0; i < view.thumbs.getLength(); i += 1) {
      let isConverted: boolean;
      let sign: number;
      let pos0: number;
      let value0: number;

      const handlePointerMove = (e: PointerEvent) => {
        const pos1 = e[axis.eventAxis];
        const value = ((((pos1 - pos0) * axis.dPos)
          / (view.thumbsParent.getBoundingClientRect()[axis.sizeParent]
            - view.getThumbSize()))
          * (model.getMax() - model.getMin()))
          + value0;

        const delta = pos1 - pos0;

        if (!sign) {
          sign = delta;
        }

        const isNeedSwitchConvert = (delta * axis.dPos > 0) && (delta > 0 === sign > 0);

        if (isConverted && isNeedSwitchConvert) {
          isConverted = false;
          view.thumbs.getThumb(0).classList.remove(`${selector}__thumb_active`);
          view.thumbs.getThumb(i).classList.add(`${selector}__thumb_active`);
        }

        const isSecondConverted = i === 1 && isConverted;

        if (i === 0 || isSecondConverted) {
          model.setValue({ val1: value });
        } else if (i === 1) {
          model.setValue({ val2: value });
        }
      };

      const handlePointerUp = () => {
        if (isConverted) {
          view.thumbs.getThumb(0).classList.remove(`${selector}__thumb_active`);
        }

        view.thumbs.getThumb(i).classList.remove(`${selector}__thumb_active`);

        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      const handlePointerDown = (e: PointerEvent) => {
        pos0 = e[axis.eventAxis];
        value0 = model.getValue()[i];
        isConverted = false;
        sign = 0;

        if (i === 1 && (value0 === model.getValue()[0])) {
          isConverted = true;
          view.thumbs.getThumb(0).classList.add(`${selector}__thumb_active`);
        } else {
          view.thumbs.getThumb(i).classList.add(`${selector}__thumb_active`);
        }

        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
      };

      view.thumbs.getThumb(i).addEventListener('pointerdown', handlePointerDown);
    }
  }

  private initBody() {
    const {
      model,
      view,
      axis,
      selector,
    } = this;
    const bodySlider = view.thumbsParent;

    const handleBodyThumbsClick = (e: PointerEvent) => {
      const target = e.target as HTMLDivElement;

      if (!target.classList.contains(`${selector}__body`)) return;

      const delta = target.getBoundingClientRect()[axis.end]
        - target.getBoundingClientRect()[axis.start];
      const proportion = (e[axis.axis] - target.getBoundingClientRect()[axis.start]) / delta;

      const newValue = (model.getMax() - model.getMin())
        * (axis.axis === 'y' ? 1 - proportion : proportion) + model.getMin();

      const isSecondValue = this.isSecondValue(newValue);

      const isEquals = this.isEqualsValues(newValue);

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

    bodySlider.addEventListener('pointerdown', handleBodyThumbsClick);
  }

  private isSecondValue(currentValue: number): boolean {
    const { model } = this;

    return model.getValue().length === 2
      && (Math.abs(currentValue - model.getValue()[1])
        < Math.abs(currentValue - model.getValue()[0]));
  }

  private isEqualsValues(currentValue: number): boolean {
    const { model } = this;

    return model.getValue().length === 2
      && (Math.abs(currentValue - model.getValue()[1])
        === Math.abs(currentValue - model.getValue()[0]));
  }
}

export default Controller;
