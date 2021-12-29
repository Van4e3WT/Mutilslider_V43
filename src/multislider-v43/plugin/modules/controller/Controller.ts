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
    } = model;

    model.on(ModelEvents.VALUE_CHANGED, this.handleModelUpdate);

    view.on(ViewEvents.VALUE_CHANGED, this.handleViewUpdate);
    view.on(ViewEvents.BODY_CLICKED, this.handleViewBodyUpdate);

    view.init({
      getValue,
    }); // удОли
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

  private handleViewBodyUpdate = (props: { e: PointerEvent }): void => {
    const { view, model } = this;
    const { e } = props;

    view.moveThumbToClickedPos(model.getValue(), e);
  };
}

export default Controller;
