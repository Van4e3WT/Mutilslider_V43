/*
свойство scaleOfValues должно обеспечивать возможности перехода по этим меткам путём щелчка мыши
сам слайдер должен быть отзывчивым
возможность изменения значения value должно быть легким и с помощью JS
значит в первую очередь, надо создать метод/аксессор, реализующий связь value с положением бегунка
один из вариантов реализации это задание свойства для плагина таким образом: $.fn.multislider.value
*/
import type { Config, ModelConfig } from './modules/customTypes';
import { DoubleSliderModel, SoloSliderModel } from './modules/model';
import { ISliderModel } from './modules/interfaces';
import SliderView from './modules/view';
import SliderController from './modules/controller';

(function f($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.multislider = function fMultislider(cfg: Config = {

    minValue: 0,
    maxValue: 1000,
    step: 10,

    orientation: 'horizontal',
    sliderType: 'solo',

    popUpOfValue: false,
    scaleOfValues: false,
    isProgressBar: true,

    description: 'Range Slider',
  }) {
    const el: HTMLDivElement = this[0];
    if (this.length === 0) throw new Error('Not found element for initialization');
    if (el.childElementCount) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }

    let model: ISliderModel;
    const modelCfg: ModelConfig = {
      min: cfg.minValue,
      max: cfg.maxValue,
      step: cfg.step,
      value1: cfg.value ?? cfg.minValue,
    };

    switch (cfg.sliderType) {
      case 'solo':
        model = new SoloSliderModel(modelCfg);
        break;

      case 'double':
        modelCfg.value2 = cfg.maxValue;
        model = new DoubleSliderModel(modelCfg);
        break;

      default:
        throw new Error('Undefined type slider');
    }

    const view = new SliderView(model, el, cfg);

    const controller = new SliderController(model, view);
  };
}(jQuery));
