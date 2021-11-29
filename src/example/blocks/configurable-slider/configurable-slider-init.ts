/* global document */

import ConfigurableSlider from './ConfigurableSlider';
import './configurable-slider.scss';

const BLOCKNAME = 'configurable-slider';

function handleConfigurableSliderInit() {
  const items = document.querySelectorAll(`.js-${BLOCKNAME}`);

  items.forEach((item) => {
    const panel = item.querySelector(`.js-${BLOCKNAME}__panel`);
    const slider = item.querySelector(`.js-${BLOCKNAME}__slider`);

    const isMissedParam = !panel || !slider;

    if (isMissedParam) return;

    const cfgSlider = new ConfigurableSlider({
      panel,
      slider,
      selector: BLOCKNAME,
    });

    cfgSlider.init();
  });
}

document.addEventListener('DOMContentLoaded', handleConfigurableSliderInit);
