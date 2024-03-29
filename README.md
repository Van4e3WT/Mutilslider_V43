# Mutilslider-V43

Легкий, кастомизируемый JQuery плагин.

![Multislider-V43 example](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/docs/example.jpg "Multislider-V43")

## Страница с примерами

### [Examples page](https://van4e3wt.github.io/Mutilslider_V43/)

## Загрузка проекта

Существует два основных способа загрузки содержимого:

Клонирование репозитория (необходим установленный Git)

```
https://github.com/Van4e3WT/Mutilslider_V43.git
```

Скачивание в формате ZIP-архива через интерфейс GitHub: `Code -> Download ZIP`

## Сборка проекта

После скачивания, для сборки проекта необходимо установить пакеты командой:

```
npm install
```

Следующим шагом будет сборка

```
npm run dev
```

Запуск сборщика через скрипт dev позволяет сохранить пробельные символы и исходное форматирование кода.
В случае, если необходимо минимизировать все файлы, используется следующая команда: 

```
npm run build
```

В результате будет сформирована папка `dist` в которой будут находиться исходные файлы самого плагина и файлы, позволяющие отобразить страницу с [примерами](#страница-с-примерами).

## Инструкция по развёртыванию
В первую очередь необходимо подключить `JQuery`. Вы можете скачать и подключить его на страницу, либо использовать подключение через ссылку на CDN.

Cкачанный и [собранный проект](#сборка-проекта), расположенный по адресу `dist/multislider-v43` (состоящий из двух файлов: `multislider-v43.css` и `multislider-v43.js`) необходимо подключить к проекту.

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

`isVertical` – [boolean] ориентация слайдера, является ли слайдер вертикальным (по умолчанию: `false`);    
`isRange` – [boolean] тип слайдера, является ли слайдер диапазонным (по умолчанию: `false`);    

`tooltipOfValue` – [boolean] позволяет включать/отключать "всплывающее" над бегунком значение слайдера (по умолчанию: `false`);    
`scaleOfValues` – [number] шкала делений, которая позволяет указать числом количество равнораспределенных делений на всем слайдере. Значение 0 подразумевает отключение шкалы значений (по умолчанию: `0`);    
`isProgressBar` – [boolean] позволяет включать/отключать `progress bar` (по умолчанию: `false`);    
`postfix` – [string] позволяет задать постфикс для значения (например валюта) (по умолчанию: `undefined`);    

`description` – [string] описание слайдера – заголовок (по умолчанию: `Range Slider`);    
`localeProps` - [object] продвинутый способ конфигурирования отображаемого формата данных (по умолчанию: `undefined`). Представляет собой аргумент `options` [API Intl JS](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl);    

### Инициализация

Осуществляется с помощью `JavaScript` кода. Слайдер можно назначить на любой `div` – блок.

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

    tooltipOfValue: true,
    scaleOfValues: 11,
    isProgressBar: true,
    postfix: '₽',

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

    tooltipOfValue: false,
    scaleOfValues: 9,
    isProgressBar: false,
    postfix: '$',

    description: 'Горизонтальный слайдер',
  });
```

:warning: **Важно: При инициализации, помимо текущих классов блока, будет автоматически добавлен класс `multislider-v43`.**

:warning: **Важно: При создании вертикального слайдера, помимо класса `multislider-v43` добавляется также класс `multislider-v43_vertical`, который является зарезервированным для блока слайдера.**

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

### События слайдера

В каждый создаваемый экземпляр плагина встроены возможности по отслеживанию изменения значения слайдера. Чтобы воспользоваться этой возможностью, необходимо обратиться к **проинициализированному** элементу через `multislider`, а именно, к его свойству `onChange`.

#### Пример 7

```javascript
  const someSlider = $('#some-slider');
  someSlider.multislider({}); // проинициализировали слайдер

  const changeEvent = someSlider.multislider.onChange; // для удобства записали в отдельную переменную ссылку на функцию
  onChange(handleOnChangeEvent, params) // добавили слушателя handleOnChangeEvent с параметрами params
```

*Подробнее с особенностями и специальными возможностями можно ознакомиться в документации*

____

## [Документация по проекту и архитектуре плагина](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/docs/documentation.md)