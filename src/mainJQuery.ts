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
  }) {
    // инициализация, генерация слайдера на базе конфигурации (создание элементов через TypeScript (если такое вообще есть) и добавление в родительский элемент, который вызвал это свойство)
    alert('none');

    return this;

  };
})(jQuery);