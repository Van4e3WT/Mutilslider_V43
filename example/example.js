/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/example/style.scss":
/*!********************************!*\
  !*** ./src/example/style.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://multislider-v43/./src/example/style.scss?");

/***/ }),

/***/ "./src/example/index.ts":
/*!******************************!*\
  !*** ./src/example/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ \"./src/example/script.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_script__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ \"./src/example/style.scss\");\n\r\n\r\n\n\n//# sourceURL=webpack://multislider-v43/./src/example/index.ts?");

/***/ }),

/***/ "./src/example/script.js":
/*!*******************************!*\
  !*** ./src/example/script.js ***!
  \*******************************/
/***/ (() => {

eval("/* global document, $ */\n\n$('.js-multislider-v43_double.js-multislider-v43_slider-1').multislider({\n  minValue: 5000,\n  maxValue: 15000,\n  step: 100,\n  value1: 7500,\n  value2: 10000,\n\n  orientation: 'vertical',\n  sliderType: 'double',\n\n  popUpOfValue: true,\n  scaleOfValues: 11,\n  isProgressBar: true,\n\n  postfix: '₽',\n  description: 'Вертикальный слайдер',\n});\n\n$('.js-multislider-v43_solo.js-multislider-v43_slider-3').multislider({\n  minValue: -100,\n  maxValue: 150,\n  step: 10,\n  value1: 100,\n\n  orientation: 'vertical',\n  sliderType: 'solo',\n\n  popUpOfValue: false,\n  scaleOfValues: 11,\n  isProgressBar: true,\n\n  description: 'Одиночный вертикальный слайдер',\n});\n\nconst panelsCfg = Array.from(document.querySelectorAll('.js-cfg-v43'));\n\npanelsCfg.forEach((panelCfg, i) => {\n  panelCfg.classList.add('cfg-v43');\n  const cfgValues = document.createElement('div');\n  cfgValues.classList.add('cfg-v43__group');\n  cfgValues.innerHTML = `<label><input type=\"number\" class=\"cfg-v43__minVal\" value=\"-100\"> Минимальное значение</label>\n  <label><input type=\"number\" class=\"cfg-v43__maxVal\" value=\"100\"> Максимальное значение</label>\n  <label><input type=\"number\" class=\"cfg-v43__step\" value=\"1\"> Шаг</label>\n  <label><input type=\"number\" class=\"cfg-v43__val1\" value=\"-25\"> Значение по умолчанию 1</label>\n  <label><input type=\"number\" class=\"cfg-v43__val2\" value=\"75\"> Значение по умолчанию 2</label>`;\n  panelCfg.appendChild(cfgValues);\n\n  const cfgOptions = document.createElement('div');\n  cfgOptions.classList.add('cfg-v43__group');\n  cfgOptions.innerHTML = `<label><input type=\"radio\" class=\"cfg-v43__isOrientVert\" name=\"orientation-${i}\">Вертикальный</label>\n  <label><input type=\"radio\" class=\"cfg-v43__isOrientHoriz\" name=\"orientation-${i}\" checked>Горизонтальный</label>\n  <hr>\n  <label><input type=\"radio\" class=\"cfg-v43__isTypeSolo\" name=\"type-${i}\" checked>Однодиапазонный</label>\n  <label><input type=\"radio\" class=\"cfg-v43__isTypeDouble\" name=\"type-${i}\">Двухдиапазонный</label>`;\n  panelCfg.appendChild(cfgOptions);\n\n  const cfgAddons = document.createElement('div');\n  cfgAddons.classList.add('cfg-v43__group');\n  cfgAddons.innerHTML = `<label><input type=\"checkbox\" class=\"cfg-v43__isPopUp\">Всплывающее значение</label>\n  <label><input type=\"number\" value=\"5\" class=\"cfg-v43__scaleDivisions\">Количество делений шкалы</label>\n  <label><input type=\"checkbox\" checked class=\"cfg-v43__isProgBar\">Прогресс бар</label>\n  <label><input type=\"text\" class=\"cfg-v43__postfix\">Постфикс</label>`;\n  panelCfg.appendChild(cfgAddons);\n});\n\nfunction initCfgSlider() {\n  const slidersCfg = Array.from(document.querySelectorAll('.js-multislider-v43_test'));\n  slidersCfg.forEach((slider) => {\n    const parent = slider.parentElement;\n\n    const minValue = parent.querySelector('.cfg-v43__minVal');\n    const maxValue = parent.querySelector('.cfg-v43__maxVal');\n    const step = parent.querySelector('.cfg-v43__step');\n    const value1 = parent.querySelector('.cfg-v43__val1');\n    const value2 = parent.querySelector('.cfg-v43__val2');\n    const orientation = parent.querySelector('.cfg-v43__isOrientHoriz');\n    const orientationAddict = parent.querySelector('.cfg-v43__isOrientVert');\n    const sliderType = parent.querySelector('.cfg-v43__isTypeDouble');\n    const sliderTypeAddict = parent.querySelector('.cfg-v43__isTypeSolo');\n    const popUpOfValue = parent.querySelector('.cfg-v43__isPopUp');\n    const scaleOfValues = parent.querySelector('.cfg-v43__scaleDivisions');\n    const isProgressBar = parent.querySelector('.cfg-v43__isProgBar');\n    const postfix = parent.querySelector('.cfg-v43__postfix');\n\n    function updateSlider() {\n      $(slider).multislider({\n        minValue: +minValue.value,\n        maxValue: +maxValue.value,\n        step: +step.value,\n        value1: +value1.value,\n        value2: +value2.value,\n\n        orientation: orientation.checked ? 'horizontal' : 'vertical',\n        sliderType: sliderType.checked ? 'double' : 'solo',\n\n        popUpOfValue: popUpOfValue.checked,\n        scaleOfValues: +scaleOfValues.value,\n        isProgressBar: isProgressBar.checked,\n        postfix: postfix.value,\n      });\n    }\n\n    minValue.addEventListener('change', updateSlider);\n    maxValue.addEventListener('change', updateSlider);\n    step.addEventListener('change', updateSlider);\n    value1.addEventListener('change', updateSlider);\n    value2.addEventListener('change', updateSlider);\n    orientation.addEventListener('change', updateSlider);\n    orientationAddict.addEventListener('change', updateSlider);\n    sliderType.addEventListener('change', updateSlider);\n    sliderTypeAddict.addEventListener('change', updateSlider);\n    popUpOfValue.addEventListener('change', updateSlider);\n    scaleOfValues.addEventListener('change', updateSlider);\n    isProgressBar.addEventListener('change', updateSlider);\n    postfix.addEventListener('change', updateSlider);\n\n    updateSlider();\n  });\n}\n\ndocument.addEventListener('DOMContentLoaded', initCfgSlider);\n\n\n//# sourceURL=webpack://multislider-v43/./src/example/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/example/index.ts");
/******/ 	
/******/ })()
;