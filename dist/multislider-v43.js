/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://multislider-v43/./src/style.scss?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _init_mainJQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init/mainJQuery */ \"./src/init/mainJQuery.ts\");\n/* harmony import */ var _init_mainJQuery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_init_mainJQuery__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n$('.multislider-v43.slider-1').multislider({\r\n    minValue: 5000,\r\n    maxValue: 15000,\r\n    step: 100,\r\n    value: 5440,\r\n    orientation: 'vertical',\r\n    sliderType: 'double',\r\n    popUpOfValue: true,\r\n    scaleOfValues: true,\r\n    isProgressBar: true,\r\n    description: 'Range slider',\r\n});\r\n$('.multislider-v43').each(function (i) {\r\n    $(this).multislider({\r\n        minValue: 0,\r\n        maxValue: 1000,\r\n        step: 10,\r\n        value: 544,\r\n        orientation: 'horizontal',\r\n        sliderType: 'solo',\r\n        popUpOfValue: false,\r\n        scaleOfValues: false,\r\n        isProgressBar: false,\r\n        description: \"\\u041C\\u043E\\u0439 \\u0441\\u043B\\u0430\\u0439\\u0434\\u0435\\u0440 \" + i,\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://multislider-v43/./src/index.ts?");

/***/ }),

/***/ "./src/init/mainJQuery.ts":
/*!********************************!*\
  !*** ./src/init/mainJQuery.ts ***!
  \********************************/
/***/ (() => {

eval("/*\r\nсвойство scaleOfValues должно обеспечивать возможности перехода по этим меткам путём щелчка мыши\r\nсам слайдер должен быть отзывчивым\r\nвозможность изменения значения value должно быть легким и с помощью JS\r\nзначит в первую очередь, надо создать метод/аксессор, реализующий связь value с положением бегунка\r\nодин из вариантов реализации это задание свойства для плагина таким образом: $.fn.multislider.value\r\n*/\r\n(function ($) {\r\n    // eslint-disable-next-line no-param-reassign\r\n    $.fn.multislider = function (cfg) {\r\n        if (cfg === void 0) { cfg = {\r\n            minValue: 0,\r\n            maxValue: 1000,\r\n            step: 10,\r\n            orientation: 'horizontal',\r\n            sliderType: 'solo',\r\n            popUpOfValue: true,\r\n            scaleOfValues: true,\r\n            isProgressBar: true,\r\n            description: 'Range Slider',\r\n        }; }\r\n        var el = this[0];\r\n        if (this.length === 0)\r\n            throw new Error('Not found element for initialization');\r\n        if (el.childElementCount)\r\n            return;\r\n        // ==================== Отрисовка блоков и слайдера ====================\r\n        var sliderDescription = document.createElement('div');\r\n        sliderDescription.classList.add('multislider-v43__description');\r\n        var sliderHeader = document.createElement('div');\r\n        sliderHeader.classList.add('multislider-v43__header');\r\n        sliderHeader.innerText = cfg.description ? cfg.description : '';\r\n        sliderDescription.appendChild(sliderHeader);\r\n        var sliderOutput = document.createElement('div');\r\n        sliderOutput.classList.add('multislider-v43__output');\r\n        sliderDescription.appendChild(sliderOutput);\r\n        el.appendChild(sliderDescription);\r\n        var slidersInput = document.createElement('div');\r\n        slidersInput.classList.add('multislider-v43__slider');\r\n        var sliders = [];\r\n        if (cfg.sliderType === 'double') {\r\n            var sliderLeft = document.createElement('input');\r\n            var sliderRight = document.createElement('input');\r\n            sliderLeft.type = 'range';\r\n            sliderLeft.classList.add('multislider-v43__input');\r\n            sliderLeft.min = String(cfg.minValue);\r\n            sliderLeft.max = String(cfg.maxValue);\r\n            sliderLeft.value = String(cfg.step\r\n                * Math.floor((cfg.maxValue - cfg.minValue) / 100 / 3)\r\n                + cfg.minValue);\r\n            sliderLeft.step = String(cfg.step);\r\n            sliderRight.type = 'range';\r\n            sliderRight.classList.add('multislider-v43__input');\r\n            sliderRight.min = String(cfg.minValue);\r\n            sliderRight.max = String(cfg.maxValue);\r\n            sliderRight.value = String(cfg.step\r\n                * Math.floor(((cfg.maxValue - cfg.minValue) / 100 / 3) * 2) + cfg.minValue);\r\n            sliderRight.step = String(cfg.step);\r\n            sliderOutput.innerText = sliderLeft.value + \" - \" + sliderRight.value;\r\n            sliders.push(sliderLeft);\r\n            sliders.push(sliderRight);\r\n        }\r\n        else {\r\n            var sliderAlone = document.createElement('input');\r\n            sliderAlone.min = String(cfg.minValue);\r\n            sliderAlone.max = String(cfg.maxValue);\r\n            sliderAlone.step = String(cfg.step);\r\n            sliderAlone.value = String(cfg.value || 0);\r\n            sliderAlone.classList.add('multislider-v43__input');\r\n            sliderAlone.type = 'range';\r\n            sliderOutput.innerText = sliderAlone.value;\r\n            sliders.push(sliderAlone);\r\n        }\r\n        sliders.forEach(function (item) { slidersInput.appendChild(item); });\r\n        el.appendChild(slidersInput);\r\n        // =========================================================================\r\n        // =========== Доступ к значению слайдера через свойство функции ===========\r\n        // вот здесь надо поправить, чтобы всегда мин присваивалось к левому, макс к правому\r\n        // eslint-disable-next-line no-param-reassign\r\n        $.fn.multislider.setValue = function (value, valueExtended) {\r\n            sliders[0].value = String(value);\r\n            if (sliders.length > 1)\r\n                sliders[1].value = String(valueExtended);\r\n        };\r\n        // eslint-disable-next-line no-param-reassign\r\n        $.fn.multislider.getValue = function () {\r\n            return sliders;\r\n        };\r\n        // =========================================================================\r\n        // ========================= Обработка событий =============================\r\n        function outputGenerating() {\r\n            var result = sliders[0].value;\r\n            for (var i = 1; i < sliders.length; i += 1) {\r\n                result += \" - \" + sliders[i].value;\r\n            }\r\n            sliderOutput.innerText = result;\r\n        }\r\n        if (cfg.sliderType === 'double') {\r\n            sliders[0].addEventListener('input', function () { sliders[0].value = String(Math.min(+sliders[1].value, +sliders[0].value)); });\r\n            sliders[1].addEventListener('input', function () { sliders[1].value = String(Math.max(+sliders[0].value, +sliders[1].value)); });\r\n        }\r\n        sliders.forEach(function (item) {\r\n            item.addEventListener('input', function () {\r\n                outputGenerating();\r\n            });\r\n        });\r\n        // =========================================================================\r\n    };\r\n}(jQuery));\r\n\n\n//# sourceURL=webpack://multislider-v43/./src/init/mainJQuery.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;