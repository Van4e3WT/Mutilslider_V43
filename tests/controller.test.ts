import IModel from 'Plugin/modules/models/interfaces/IModel';
import DoubleModel from 'Plugin/modules/models/DoubleModel';
import Controller from 'Plugin/modules/controller/Controller';
import { Config } from 'Plugin/modules/utils/custom-types';
import View from 'Plugin/modules/view/View';

describe('***CONTROLLER***', () => {
  const selector = 'multislider-v43';

  const cfg: Config = {
    minValue: 0,
    maxValue: 1000,
    value1: 110,
    value2: 490,
    step: 1,

    isProgressBar: true,

    isRange: true,
    isVertical: false,
    scaleOfValues: 5,

    tooltipOfValue: true,
    tooltipIsHidden: true,
  };

  let controller: Controller;
  let model: IModel;
  let view: View;
  let parent: HTMLElement;

  beforeEach(() => {
    parent = document.createElement('div');

    view = new View({
      parent,
      cfg,
      selector,
      values: [110, 490],
    });

    model = new DoubleModel({
      min: cfg.minValue,
      max: cfg.maxValue,
      step: cfg.step,
      value1: cfg.value1,
      value2: cfg.value2,
    });

    controller = new Controller({
      model,
      view,
    });
  });

  test('should init controller', () => {
    controller.init();

    expect(controller).toBeDefined();
  });

  test('should call handlers when the event is emitted', () => {
    controller.init();

    const mockUpdate = jest.fn();

    view.update = mockUpdate;

    model.emit('valueChanged', {});

    expect(mockUpdate).toHaveBeenCalled();
  });
});
