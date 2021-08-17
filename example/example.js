(()=>{"use strict";const e=function(){function e(e){var l=this;this.updateSlider=function(e){void 0===e&&(e=null);var t=l,i=t.slider,a=t.inputs,s=$(i);if(a){l.toggleInputsConditions();try{s.multislider({minValue:Number(a.minValue.value),maxValue:Number(a.maxValue.value),step:Number(a.step.value),value1:Number(a.value1.value),value2:Number(a.value2.value),isVertical:a.isVertical.checked,isRange:a.isRange.checked,tooltipOfValue:a.tooltipOfValue.checked,tooltipIsHidden:a.tooltipIsHidden.checked,scaleOfValues:Number(a.scaleOfValues.value),isProgressBar:a.isProgressBar.checked,postfix:a.postfix.value});var n=s.multislider.value,o=s.multislider.onChange;if(!n||!o)return;o(l.handleSliderChange,n),n({})}catch(t){var r=l.prevInputValue;if(!(e instanceof HTMLInputElement&&r))return;e.value=r,l.updateSlider()}}},this.handleSliderChange=function(e){var t=l.inputs;if(t){var i=e();t.value1.value=String(i[0]),2===i.length&&(t.value2.value=String(i[1]))}},this.handlePanelFocus=function(e){var t=e.target;t instanceof HTMLInputElement&&(l.prevInputValue=t.value)},this.handlePanelChange=function(e){var t=e.target;l.updateSlider(t)};var t=e.panel,i=e.slider,a=e.selector;this.panelControl=t,this.slider=i,this.selector=a}return e.prototype.init=function(){var e,l,t,i,a,s,n,o,r,u,d,c,v,p=this,_=p.panelControl,h=p.selector,g=p.callError;this.inputs={minValue:null!==(e=_.querySelector(".js-"+h+"__min-val"))&&void 0!==e?e:g(),maxValue:null!==(l=_.querySelector(".js-"+h+"__max-val"))&&void 0!==l?l:g(),step:null!==(t=_.querySelector(".js-"+h+"__step"))&&void 0!==t?t:g(),value1:null!==(i=_.querySelector(".js-"+h+"__val-1"))&&void 0!==i?i:g(),value2:null!==(a=_.querySelector(".js-"+h+"__val-2"))&&void 0!==a?a:g(),isVertical:null!==(s=_.querySelector(".js-"+h+"__is-vertical"))&&void 0!==s?s:g(),isRange:null!==(n=_.querySelector(".js-"+h+"__is-range"))&&void 0!==n?n:g(),tooltipOfValue:null!==(o=_.querySelector(".js-"+h+"__tooltip-of-value"))&&void 0!==o?o:g(),tooltipIsHidden:null!==(r=_.querySelector(".js-"+h+"__tooltip-is-hidden"))&&void 0!==r?r:g(),scaleOfValues:null!==(u=_.querySelector(".js-"+h+"__scale-of-values"))&&void 0!==u?u:g(),isProgressBar:null!==(d=_.querySelector(".js-"+h+"__is-progress-bar"))&&void 0!==d?d:g(),postfix:null!==(c=_.querySelector(".js-"+h+"__postfix"))&&void 0!==c?c:g()},this.tooltipToggle=null===(v=this.inputs.tooltipIsHidden.parentElement)||void 0===v?void 0:v.querySelector(".js-"+h+"__item-toggle"),_.addEventListener("focusin",this.handlePanelFocus),_.addEventListener("change",this.handlePanelChange),this.updateSlider()},e.prototype.toggleInputsConditions=function(){var e=this,l=e.inputs,t=e.selector,i=e.tooltipToggle;l&&(l.isRange.checked?(l.value2.disabled=!1,l.value2.classList.remove(t+"__input_disabled")):(l.value2.disabled=!0,l.value2.classList.add(t+"__input_disabled")),i&&(l.tooltipOfValue.checked?(l.tooltipIsHidden.disabled=!1,i.classList.remove(t+"__item-toggle_disabled")):(l.tooltipIsHidden.disabled=!0,i.classList.add(t+"__item-toggle_disabled"))))},e.prototype.callError=function(){throw Error("The configurable panel doesn't contain a required element")},e}();var l="configurable-slider";document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".js-"+l).forEach((function(t){var i=t.querySelector(".js-"+l+"__panel"),a=t.querySelector(".js-"+l+"__slider");i&&a&&new e({panel:i,slider:a,selector:l}).init()}))}))})();