import IModel from '../models/interfaces/IModel';
import EventEmitter, { EventTypes } from '../utils/EventEmitter';
import View from '../view/View';

class Controller extends EventEmitter {
  private model: IModel;

  private view: View;

  constructor(props: {
    model: IModel,
    view: View,
  }) {
    super();

    const { model, view } = props;

    this.model = model;
    this.view = view;
  }

  public init(): void {
    const { model, view } = this;
    const {
      getValue,
      setValue,
      getMin,
      getMax,
    } = model;

    model.on(EventTypes.VALUE_CHANGED, this.handleModelUpdate);

    view.init({
      getValue,
      setValue,
      getMin,
      getMax,
    });
  }

  private handleModelUpdate = (): void => {
    const { view, model } = this;

    view.update(model.getValue());
  };
}

export default Controller;
