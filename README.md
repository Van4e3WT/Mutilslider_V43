# Mutilslider-V43

Легкий ~[16kB], кастомизируемый JQuery плагин.

![Multislider-V43 example](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/example.jpg "Multislider-V43")

## Страница с примерами

### [Examples page](https://van4e3wt.github.io/Mutilslider_V43/example.html)

## Установка
В первую очередь необходимо подключить `JQuery`. Вы можете скачать и подключить его на страницу, либо использовать подключение через ссылку на CDN.

Следующим шагом необходимо скачать дистрибутив, расположенный в папке `dist` и содержащий два файла: `multislider-v43.css` и `multislider-v43.js`, которые необходимо подключить к проекту.

```html
    ...
    <link rel="stylesheet" href="multislider-v43.css">
    ...
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="./dist/multislider-v43.js"></script>
    ...
```
:warning: **Важно: Подключение `multislider-v43.js` осуществляется после `JQuery`.**

## Использование

Стоит отметить, что слайдер имеет возможность кастомизации и конфигурирования. Конфигурация слайдера задается при его инициализации, путем передачи объекта с соответствующими свойствами:    

`minValue` – [number] минимальное значение слайдера (по умолчанию: `0`);    
`maxValue` – [number] максимальное значение слайдера (по умолчанию: `1000`);    
`step` – [number] значение перемещения ползунка на одну величину – шаг (по умолчанию: `1`);    
`value1` – [number] начальное значение бегунка для соло слайдера и левого/нижнего бегунка двойного горизонтального/вертикального слайдера (по умолчанию: `minValue`);    
`value2` – [number] начальное значение правого/верхнего бегунка двойного горизонтального/вертикального слайдера (по умолчанию: `maxValue`);    

`orientation` – [string] ориентация слайдера, может иметь два значения: `horizontal` или `vertical` (по умолчанию: `horizontal`);    
`sliderType` – [string] тип слайдера, может иметь два значения: `solo` или `double` (по умолчанию: `solo`);    

`popUpOfValue` – [boolean] позволяет включать/отключать "всплывающее" над бегунком значение слайдера (по умолчанию: `false`);    
`scaleOfValues` – [number] шкала делений, которая позволяет указать числом количество равнораспределенных делений на всем слайдере. Значение 0 подразумевает отключение шкалы значений. Минимальное число делений шкалы – 3, а именно, по краям и в центре (по умолчанию: `0`);    
`isProgressBar` – [boolean] позволяет включать/отключать `progress bar` (по умолчанию: `true`);    

`description` – [string] описание слайдера – заголовок (по умолчанию: `Range Slider`);    

### Автоматическая инициализация

Автоматическое добавление слайдера на блок происходит при наличии у него класса `multislider-v43`.

#### Пример 1

```html
    <div class="wrapper">
      <div class="multislider-v43"></div>
    </div>
```
:warning: **Важно: автоматическая инициализация создает слайдер со стандартными параметрами.**

Для изменения параметров в HTML - документе можно использовать атрибуты с префиксом `data-`, с одним лишь отличием, вместо сamelCase используется kebab-case.

#### Пример 2

```html
  <div class="child multislider-v43 double slider-1" data-min-value="-1" data-max-value="1" data-step="0.01"
    data-value1="-0.25" data-value2="0.50" data-orientation="vertical" data-slider-type="double"
    data-pop-up-of-value="true" data-scale-of-values="9" data-is-progress-bar="false" data-description="My Slider">
  </div>
```

### Ручная инициализация

С помощью `JavaScript` кода можно назначить слайдер на любой `div` – блок.

#### Пример 3

```javascript
  $('#some-block').multislider({}); // слайдер со стандартными параметрами
```
____

#### Пример 4

```javascript
  $('#some-block').multislider({ // слайдер с заданными параметрами (вертикальный)
    minValue: 5000,
    maxValue: 15000,
    step: 100,
    value1: 7500,
    value2: 10000,

    orientation: 'vertical',
    sliderType: 'double',

    popUpOfValue: true,
    scaleOfValues: 11,
    isProgressBar: true,

    description: 'Вертикальный слайдер',
  });
```
____

#### Пример 5

```javascript
  $('#some-block').multislider({ // слайдер с заданными параметрами (горизонтальный)
    minValue: -1,
    maxValue: 1,
    step: 0.0001,
    value1: 0.1,
    value2: 0.8,

    orientation: 'horizontal',
    sliderType: 'double',

    popUpOfValue: false,
    scaleOfValues: 9,
    isProgressBar: false,

    description: 'Горизонтальный слайдер',
  });
```

:warning: **Важно: При ручной инициализации, помимо текущих классов блока, будет автоматически добавлен класс `multislider-v43`.**

:warning: **Важно: При создании вертикального слайдера, помимо класса `multislider-v43` добавляется также класс `vertical-v43`, который является зарезервированным для блока слайдера.**

____

:warning: **Важно: Если блок, на котором инициализирован слайдер, имеет содержимое внутри, то оно будет очищено.**

### Программное изменение значения слайдера
После инициализации слайдера, может появиться необходимость программного изменения значения бегунка.
Сделать это можно путем обращения к свойству-функции плагина `value()`.

#### Пример 6

```javascript
  const someSlider = $('#some-slider');
  someSlider.multislider({}); // проинициализировали слайдер
  someSlider.multislider.value({ val1: 354 }); // задали новое значение первому бегунку
```
В функцию передается объект с одним и/или вторым параметрами/параметром:    
`val1` – [number] значение бегунка для соло слайдера и левого/нижнего бегунка двойного горизонтального/вертикального слайдера;    
`val2` – [number] значение правого/верхнего бегунка двойного горизонтального/вертикального слайдера;    

## [Документация по архитектуре](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/docs/documentation.md)