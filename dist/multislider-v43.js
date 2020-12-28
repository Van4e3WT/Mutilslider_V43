/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://multislider-v43/./src/style.scss?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _init_mainJQuery_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init/mainJQuery.ts */ \"./src/init/mainJQuery.ts\");\n\r\n\r\n$('.multislider-v43').multislider({\r\n    sliderType: 'double'\r\n});\r\n\n\n//# sourceURL=webpack://multislider-v43/./src/index.ts?");

/***/ }),

/***/ "./src/init/mainJQuery.ts":
/*!********************************!*\
  !*** ./src/init/mainJQuery.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/*\r\n* свойство scaleOfValues должно обеспечивать возможности перехода по этим меткам путём щелчка мыши\r\n* сам слайдер должен быть отзывчивым\r\n* возможность изменения значения value должно быть легким и с помощью JS\r\n* значит в первую очередь, надо создать метод/аксессор, реализующий связь value с положением бегунка\r\n* один из вариантов реализации это задание свойства для плагина таким образом: $.fn.multislider.value\r\n*/\r\n// import * as Model from './modules/model';\r\n// import * as Control from './modules/control';\r\n(function ($) {\r\n    $.fn.multislider = function (cfg) {\r\n        if (cfg === void 0) { cfg = {\r\n            minValue: 0,\r\n            maxValue: 1000,\r\n            step: 10,\r\n            orientation: 'horizontal',\r\n            sliderType: 'solo',\r\n            popUpOfValue: true,\r\n            scaleOfValues: true,\r\n            isProgressBar: true,\r\n        }; }\r\n        Array.from(this).forEach(function (el, i) {\r\n            el.innerHTML = 'TEST FOR DIV BLOCK' + i;\r\n        });\r\n    };\r\n})(jQuery);\r\n\r\n\n\n//# sourceURL=webpack://multislider-v43/./src/init/mainJQuery.ts?");

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