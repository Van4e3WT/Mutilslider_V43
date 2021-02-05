import { ISliderModel, ISliderView } from '../src/init/modules/interfaces';
import { Config, ModelConfig } from '../src/init/modules/customTypes';
import { SoloSliderModel, DoubleSliderModel } from '../src/init/modules/model';
import { SliderView } from '../src/init/modules/view';

describe('***VIEW***', () => {
  const config: Config = {
    minValue: 0,
    maxValue: 100,
    step: 1,

    orientation: 'horizontal',
    sliderType: 'solo',

    popUpOfValue: true,
    scaleOfValues: 5,
    isProgressBar: true,

    description: 'Slider Header',

    value1: 15,
    value2: 70,
  };

  const modelConfig: ModelConfig = {
    min: config.minValue,
    max: config.maxValue,
    step: config.step,
    value1: config.value1,
    value2: config.value2,
  };

  describe('Solo Slider', () => {
    const model = new SoloSliderModel(modelConfig);
    // нужно создать какой-то parent в каком-то DOM
    const view = new SliderView(model, parent, config);
  });
});
