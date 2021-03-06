# Документация

Данный плагин построен на базе языка TypeScript с применением шаблона проектирования MVC. В качестве сборщика использован Webpack.

## Проект

В составе проекта, в корневой папке, находятся конфигурационные файлы и файлы, являющиеся примером использования плагина (example.*)
Посмотреть пример можно [здесь](https://van4e3wt.github.io/Mutilslider_V43/).

`__mocks__` – содержит конфигурацию для `mocks` библиотеки unit-тестирования `Jest`;    
`dist` – включает в себя собраный дистрибутив плагина, готовый к включению в ваш проект;    
`docs` – является хранилищем документации и иллюстраций, описывающих архитектуру плагина;    
`src` – определяет исходные файлы, на базе которых скомпилирован и собран дистрибутив;
`tests` – содержит unit-тесты, охватывающие основные модули приложения;

При работе непосредственно с проектом, после скачивания содержимого, необходимо иметь установленную среду Node.js с менеджером пакетов npm. Скачать Node.js можно на их [официальном сайте](https://nodejs.org/).
После установки необходимо открыть консоль, перейти в папку проекта и скачать `node_modules` командой `npm install`.

С командами, доступными для запуска можно ознакомиться в файле `package.json` свойстве `scripts`.

:warning: Для работы над проектом не требуется глобальной установки npm-пакетов.

### Тестирование

Проведение тестирования в среде `node.js` осуществляется командой `npm run test` c использованием фреймворка [Jest](https://jestjs.io/).

Тестирование модуля View осуществляется с помощью сторонней библиотеки [Puppeteer](https://github.com/puppeteer/puppeteer). Её особенность состоит в использовании `headless` браузера, поэтому проект необходимо развернуть на сервере.

:warning: **Важно: перед тестированием _View_ необходимо развернуть проект на сервере и указать адрес, по которому развернут проект (в файле `view.test.ts` строка 4).**

## Архитектура

Данный плагин именуемый далее, как: приложение/расширение/плагин. Базируется на разделении логики на модули:
* Модель
* Представление
* Контроллер
* Обёртка модулей в плагин
* Надстройка над плагином
Рассмотрим каждый из них подробнее.

### Модель

Представляет из себя описание бизнес-логики приложения в виде класса, экземпляр которого используется для конкретного элемента, к которому применяется плагин. Здесь выполняется вся логика, связанная с расчётами значений, которыми оперирует пользователь, используя интерфейс. Схема классов модели слайдера представлена ниже:

![model_UML](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/docs/model.png "UML схема модели")

### Представление

Содержит в себе построение пользовательского интерфейса, посредством которого осуществляется взаимодействие с моделью через связи, объявленные контроллером, который будет рассмотрен далее. Модуль представления генерирует элементы DOM-дерева и ведёт расчёт связанные с отображением. Взаимодействие с моделью ограничено лишь получением данных из неё, без их модификации.

![view_UML](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/docs/view.png "UML схема представления")

### Контроллер

Модуль, описывающий взаимодействие между моделью и представлением. Именно он задает то, как будет реагировать модель на действия пользователя через интерфейс. Здесь добавляются слушатели на представление, чтобы любое изменение в модели было сразу же отображено.

![controller_UML](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/docs/controller.png "UML схема контроллера")

### Обёртка модулей в плагин

Плагин JQuery по сути представляет собой свойство-функцию объекта jQuery. Поэтому создается функция, внутри которой для вышеописанных модулей создаются экземпляры, с заданными входными параметрами. Эти параметры имеют значение по умолчанию, но могут быть переопределены и заданы пользователем. Подробнее об этом можно прочесть [здесь](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/README.md).

### Надстройка над плагином

Представляет собой составление конфигурации экземпляра плагина на базе атрибутов элемента DOM-дерева, к которому должен применяться плагин. Это небольшой и достаточной простой фрагмент кода, позволяющий при этом значительно увеличить удобство использования плагина.

### [Назад](https://github.com/Van4e3WT/Mutilslider_V43/)