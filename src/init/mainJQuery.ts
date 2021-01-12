/*
* свойство scaleOfValues должно обеспечивать возможности перехода по этим меткам путём щелчка мыши
* сам слайдер должен быть отзывчивым
* возможность изменения значения value должно быть легким и с помощью JS
* значит в первую очередь, надо создать метод/аксессор, реализующий связь value с положением бегунка
* один из вариантов реализации это задание свойства для плагина таким образом: $.fn.multislider.value
*/

(function($) {

  type Config = {
    minValue: number,
    maxValue: number,
    step: number,
    value?: number,

    orientation: 'vertical' | 'horizontal',
    sliderType: 'solo' | 'double',

    popUpOfValue: boolean,
    scaleOfValues: boolean,
    isProgressBar: boolean,

    description?: string
  }

  $.fn.multislider = function(cfg: Config = {

    minValue: 0,
    maxValue: 1000,
    step: 10,

    orientation: 'horizontal',
    sliderType: 'solo',

    popUpOfValue: true,
    scaleOfValues: true,
    isProgressBar: true,

    description: 'Range Slider'
  }) {

    const el: HTMLDivElement = this[0];
    if(this.length === 0)
      throw new Error('Not found element for initialization');

    //==================== Отрисовка блоков и слайдера ====================

    const sliderDescription = document.createElement('div');
    sliderDescription.classList.add('multislider-v43__description');

    const sliderHeader = document.createElement('div');
    sliderHeader.classList.add('multislider-v43__header');
    sliderHeader.innerText = cfg.description ? cfg.description : '';
    sliderDescription.appendChild(sliderHeader);

    const sliderOutput = document.createElement('div');
    sliderOutput.classList.add('multislider-v43__output');
    sliderDescription.appendChild(sliderOutput);
    el.appendChild(sliderDescription);

    const slidersInput = document.createElement('div');
    slidersInput.classList.add('multislider-v43__slider');

    let sliders: Array<HTMLInputElement> = [];

    if(cfg.sliderType === 'double') {

      const sliderLeft = document.createElement('input');
      const sliderRight = document.createElement('input');

      sliderLeft.type = 'range';
      sliderLeft.classList.add('multislider-v43__input');
      sliderLeft.min = String(cfg.minValue);
      sliderLeft.max = String(cfg.maxValue);
      sliderLeft.value = String(cfg.step * Math.floor((cfg.maxValue - cfg.minValue) / 100 / 3) + cfg.minValue);
      sliderLeft.step = String(cfg.step);

      sliderRight.type = 'range';
      sliderRight.classList.add('multislider-v43__input');
      sliderRight.min = String(cfg.minValue);
      sliderRight.max = String(cfg.maxValue);
      sliderRight.value = String(cfg.step * Math.floor((cfg.maxValue - cfg.minValue) / 100 / 3 * 2) + cfg.minValue);
      sliderRight.step = String(cfg.step);

      sliderOutput.innerText = sliderLeft.value + ' - ' + sliderRight.value;

      sliders.push(sliderLeft);
      sliders.push(sliderRight);

    } else {

      const sliderAlone = document.createElement('input');
      sliderAlone.min = String(cfg.minValue);
      sliderAlone.max = String(cfg.maxValue);
      sliderAlone.step = String(cfg.step);
      sliderAlone.value = String(cfg.value || 0);
      sliderAlone.classList.add('multislider-v43__input');
      sliderAlone.type = 'range';
      sliderOutput.innerText = sliderAlone.value;
  
      sliders.push(sliderAlone);

    }

    sliders.forEach( (item) => {slidersInput.appendChild(item)});
    el.appendChild(slidersInput);

    //=========================================================================

    //=========== Доступ к значению слайдера через свойство функции ===========

    $.fn.multislider.setValue = function(value: number, valueExtended?: number) { // вот здесь надо поправить, чтобы всегда мин присваивалось к левому, макс к правому
      sliders[0].value = String(value);
      if(sliders.length > 1) sliders[1].value = String(valueExtended);
    };
    $.fn.multislider.getValue = function() {
      return sliders;
    }

    //=========================================================================

    //========================= Обработка событий =============================
    function outputGenerating() {
      let result: string = sliders[0].value;
      for(let i = 1; i < sliders.length; ++i) {
        result += ' - ' + sliders[i].value;
      }

      sliderOutput.innerText = result;
    }

    if(cfg.sliderType === 'double') {
      sliders[0].addEventListener('input', () => {sliders[0].value = String(Math.min(+sliders[1].value, +sliders[0].value));});
      sliders[1].addEventListener('input', () => {sliders[1].value = String(Math.max(+sliders[0].value, +sliders[1].value));});
    }

    sliders.forEach( (item) => {
      item.addEventListener('input', () => {
        outputGenerating();
      });
    });
    //=========================================================================
  };
})(jQuery);