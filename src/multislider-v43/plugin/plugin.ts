/* eslint-disable no-param-reassign */

import IModel from './modules/models/interfaces/IModel';
import SoloModel from './modules/models/SoloModel';
import DoubleModel from './modules/models/DoubleModel';
import Controller from './modules/controller/Controller';
import { ModelEvents } from './modules/utils/EventEmitter';
import Utils from './modules/utils/utils';
import View from './modules/view/View';
import { Config, ModelConfig } from './custom-types';

const SELECTOR = 'multislider-v43';

(function f($) {
  $.fn.multislider = function multisliderInit(props: Config) {
    const config = Utils.configValidation(props);

    if (this.length === 0) {
      throw new Error('Not found element for initialization');
    }

    const baseElement: HTMLElement = this[0];

    if (baseElement.childElementCount) {
      while (baseElement.firstChild) {
        baseElement.removeChild(baseElement.firstChild);
      }
    }

    baseElement.classList.remove(`${SELECTOR}_vertical`);
    baseElement.classList.add(SELECTOR);

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
      selector: SELECTOR,
    });

    const controller = new Controller({
      model,
      view,
    });
    controller.init();

    $.fn.multislider.value = (values: { val1?: number, val2?: number }): Array<number> => {
      if (values) {
        model.setValue({ val1: values.val1, val2: values.val2 });
      }

      return model.getValue();
    };

    $.fn.multislider.onChange = (callback: Function, ...args: Array<unknown>): void => {
      model.on(ModelEvents.CHANGE_VALUE, callback.bind(this, ...args));
    };
  };
}(jQuery));
