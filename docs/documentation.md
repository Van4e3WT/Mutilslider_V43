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
После установки необходимо открыть консоль, перейти в папку проекта и скачать недостающие пакеты командой `npm install` они будут находиться в созданной папке `node_modules`.

С командами, доступными для запуска можно ознакомиться в файле `package.json` свойстве `scripts`.

:warning: Для работы над проектом не требуется глобальной установки npm-пакетов.

### Тестирование

Проведение тестирования в среде `node.js` осуществляется командой `npm run test` c использованием фреймворка [Jest](https://jestjs.io/).

Тестирование разделено на на 3 основных слоя-модуля (Model, View, Controller). По окончании тестирования будут отображены результаты с степенью покрытия каждого файла.

## Архитектура

Данный плагин именуемый далее, как: приложение/расширение/плагин. Базируется на разделении логики на модули:
* Модель
* Представление
* Контроллер
* Обёртка модулей в плагин
* Надстройка над плагином

UML-диаграмма плагина изображена ниже.

![diagram_UML](https://github.com/Van4e3WT/Mutilslider_V43/blob/master/docs/diagram.png "UML-схема плагина")    
*UML-схема плагина*

### Модель

Представляет из себя описание бизнес-логики приложения в виде класса, экземпляр которого используется для конкретного элемента, к которому применяется плагин. Здесь выполняется вся логика, связанная с расчётами значений, которыми оперирует пользователь, используя интерфейс. Схема классов модели слайдера обведена **зелёным** цветом.

### Представление

Содержит в себе построение пользовательского интерфейса, посредством которого осуществляется взаимодействие с моделью через связи, объявленные контроллером, который будет рассмотрен далее. Модуль представления генерирует элементы DOM-дерева и ведёт расчёт связанные с отображением. Взаимодействие с моделью ограничено лишь получением данных из неё, без их модификации. На схеме обведена **красным** цветом.

### Контроллер

Модуль, описывающий взаимодействие между моделью и представлением. Именно он задает то, как будет реагировать модель на действия пользователя через интерфейс. Здесь добавляются слушатели на представление, чтобы любое изменение в модели было сразу же отображено. Выделено **синим** цветом.

### Обёртка модулей в плагин

Плагин JQuery представляет собой свойство-функцию объекта jQuery, принимающую объект со свойствами-параметрами. Эти параметры проходят определенную валидацию, в случае отсутствия значений принимают значения по умолчанию. Если значения не проходят валидацию, будет вызвана ошибка с описанием причины, по которой не удалось пройти валидацию. Следующим за валидацией шагом является создание экземпляров каждого из модулей, в которых на основе конфигурации генерируются и связываются компоненты необходимые для работы слайдера.
У данного плагина, есть расширенный API-функционал, представленный в виде свойств:
* `onChange(callback: Function, ...args: Array<unknown>): void` - свойство, позволяющее записать обработчик события изменения значения слайдера (`VALUE_CHANGED`). Первым параметром передается непосредственно функция, далее - необязательные параметры, которые необходимо передать функции-обработчику.    
* `value(values: { val1?: number, val2?: number }): Array<number>` - свойство выступающее в формате дескриптора значений слайдера.
В случае передачи объекта с параметрами - задает новое значение бегункам слайдера и возвращает их новое значение.
Когда никакие параметры не передаются, возвращаются текущие значения бегунков.    
*Примечание: При установке нового значения через эту функцию вызывается событие изменения значения (`VALUE_CHANGED`). Если вы не хотите изменять значение, а просто вызывать событие `VALUE_CHANGED` из под интерфейса, передайте пустой объект (`$elem.multislider.value({})`).*

### Надстройка над плагином

Представляет собой составление конфигурации экземпляра плагина на базе атрибутов элемента DOM-дерева, к которому должен применяться плагин. Это небольшой и достаточной простой фрагмент кода, позволяющий при этом значительно увеличить удобство использования плагина.

### [Назад](https://github.com/Van4e3WT/Mutilslider_V43/)