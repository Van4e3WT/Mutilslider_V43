/* eslint-disable no-param-reassign */

import Utils from './modules/utils/utils';
import View from './modules/view/View';
import Controller from './modules/controller/Controller';
import SoloModel from './modules/models/SoloModel';
import DoubleModel from './modules/models/DoubleModel';
import { Config, ModelConfig } from './modules/utils/custom-types';
import IModel from './modules/models/interfaces/IModel';

(function f($) {
  $.fn.multislider = function multisliderInit(props: Config) {
    const selector = 'multislider-v43';
    const config = Utils.validationConfig(props);

    if (this.length === 0) {
      throw new Error('Not found element for initialization');
    }

    const baseElement: HTMLElement = this[0];

    if (baseElement.childElementCount) {
      while (baseElement.firstChild) {
        baseElement.removeChild(baseElement.firstChild);
      }
    }

    baseElement.classList.remove(`${selector}_vertical`);
    baseElement.classList.add(selector);

    let model: IModel;
    const modelCfg: ModelConfig = {
      min: config.minValue,
      max: config.maxValue,
      step: config.step,
      value1: config.value1,
    };

    if (config.isRange) {
      modelCfg.value2 = config.value2;
      model = new DoubleModel(modelCfg);
    } else {
      model = new SoloModel(modelCfg);
    }

    const view = new View({
      values: model.getValue(),
      parent: baseElement,
      cfg: config,
      selector,
    });

    const controller = new Controller({
      model,
      view,
    });
    controller.init();

    $.fn.multislider.value = (values: { val1?: number, val2?: number }) => {
      if (values) {
        model.setValue({ val1: values.val1, val2: values.val2 });
      }

      return model.getValue();
    };

    $.fn.multislider.onChange = (callback: Function, ...args: Array<unknown>) => {
      model.on('valueChanged', callback.bind(this, ...args));
    };
  };
}(jQuery));
