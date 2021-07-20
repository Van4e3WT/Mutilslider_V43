import View from '../view/View';
import EventEmitter from '../utils/EventEmitter';
import IModel from '../models/interfaces/IModel';

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

  public init() {
    const { model, view } = this;
    const {
      getValue,
      setValue,
      getMin,
      getMax,
    } = model;

    model.on('valueChanged', this.handleModelUpdate);

    view.init({
      getValue,
      setValue,
      getMin,
      getMax,
    });
  }

  private handleModelUpdate = () => {
    const { view, model } = this;

    view.update(model.getValue());
  };
}

export default Controller;
