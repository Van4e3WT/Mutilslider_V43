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
