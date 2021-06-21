/* global document */

import './configurable-slider.scss';
import ConfigurableSlider from './ConfigurableSlider';

const BLOCKNAME = 'configurable-slider';

function handleConfigurableSliderInit() {
  const items = document.querySelectorAll(`.js-${BLOCKNAME}`);

  items.forEach((item, i) => {
    const panel = item.querySelector(`.js-${BLOCKNAME}__panel`);
    const slider = item.querySelector(`.js-${BLOCKNAME}__slider`);

    const cfgSlider = new ConfigurableSlider({
      panel,
      slider,
      selector: BLOCKNAME,
      postfix: i,
    });

    cfgSlider.initPanelControl();
    cfgSlider.initSlider();
  });
}

document.addEventListener('DOMContentLoaded', handleConfigurableSliderInit);
