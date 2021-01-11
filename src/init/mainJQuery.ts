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

    orientation: 'vertical' | 'horizontal',
    sliderType: 'solo' | 'double',

    popUpOfValue: boolean,
    scaleOfValues: boolean,
    isProgressBar: boolean,

    description: string
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

    description: "Range Slider"
  }) {
    const el: HTMLDivElement = this[0];
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

    const sliderAlone = document.createElement('input');
    sliderAlone.min = String(cfg.minValue);
    sliderAlone.max = String(cfg.maxValue);
    sliderAlone.step = String(cfg.step);
    sliderAlone.value = '544';
    sliderAlone.classList.add('multislider-v43__input');
    sliderAlone.type = 'range';

    const slidersInput = document.createElement('div');
    slidersInput.classList.add('multislider-v43__slider');
    slidersInput.appendChild(sliderAlone);
    el.appendChild(slidersInput);

    //=========================================================================
  };
})(jQuery);