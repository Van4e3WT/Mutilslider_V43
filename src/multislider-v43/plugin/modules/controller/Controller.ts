import IModel from '../models/interfaces/IModel';
import EventEmitter, { ModelEvents, ViewEvents } from '../utils/EventEmitter';
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

    model.on(ModelEvents.VALUE_CHANGED, this.handleModelUpdate);

    view.on(ViewEvents.VALUE_CHANGED, this.handleViewUpdate);

    view.init({
      getValue,
      setValue,
      getMin,
      getMax,
    });
    // вместо этого должно быть что-то типо: view.on(..., соответствующий метод)
  }

  private handleModelUpdate = (): void => {
    const { view, model } = this;

    view.update(model.getValue());
  };

  private handleViewUpdate = (props: {
    val1?: number,
    val2?: number,
  }): void => {
    const { model } = this;

    model.setValue(props);
  };
}

export default Controller;
