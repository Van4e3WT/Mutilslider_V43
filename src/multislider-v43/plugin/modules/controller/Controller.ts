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

    model.on(ModelEvents.VALUE_CHANGED, this.handleModelUpdate);

    view.on(ViewEvents.VALUE_CALCULATED, this.handleViewCalculate);
    view.on(ViewEvents.VALUE_CHANGED, this.handleViewUpdate);

    view.init();
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

  private handleViewCalculate = (props: {
    handler: (values: Array<number>) => void,
  }): void => {
    const { model } = this;
    const { handler } = props;

    handler(model.getValue());
  };
}

export default Controller;
