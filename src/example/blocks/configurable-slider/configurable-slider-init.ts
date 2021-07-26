/* global document */

import ConfigurableSlider from './ConfigurableSlider';
import './configurable-slider.scss';

const BLOCKNAME = 'configurable-slider';

function handleConfigurableSliderInit() {
  const items = document.querySelectorAll(`.js-${BLOCKNAME}`);

  items.forEach((item) => {
    const panel = item.querySelector(`.js-${BLOCKNAME}__panel`);
    const slider = item.querySelector(`.js-${BLOCKNAME}__slider`);
    const jsonConfig = item.getAttribute('data-config');

    if (!panel || !slider) return;

    if (jsonConfig) {
      const config = JSON.parse(jsonConfig);

      const cfgSlider = new ConfigurableSlider({
        panel,
        slider,
        selector: BLOCKNAME,
        config,
      });

      cfgSlider.initPanelControl();
      cfgSlider.initSlider();
    }
  });
}

document.addEventListener('DOMContentLoaded', handleConfigurableSliderInit);
