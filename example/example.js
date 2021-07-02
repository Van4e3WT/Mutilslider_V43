(()=>{"use strict";function e(e,l){return[l,e]}const l={swap:e,validationConfig:function(l){var a,i,s=l.isRange,t=void 0!==s&&s,u=l.isVertical,n=void 0!==u&&u,v=l.popUpOfValue,_=void 0!==v&&v,p=l.popUpIsHided,r=void 0===p||p,o=l.isProgressBar,c=void 0===o||o,d=l.postfix,m=l.description,g=void 0===m?"Range Slider":m,V=l.localeProps,f=l.minValue,b=void 0===f?0:f,h=l.maxValue,x=void 0===h?1e3:h,j=l.step,S=void 0===j?1:j,y=l.value1,O=void 0===y?b:y,U=l.value2,k=void 0===U?x:U,q=l.scaleOfValues,P=void 0===q?0:q,C=x-b;if(b>x)b=(a=e(b,x))[0],x=a[1];else if(b===x)throw new Error("minValue shouldn't be equal maxValue");S>0?S>C&&(S=C):S=1,t?(O>k&&(O=(i=e(O,k))[0],k=i[1]),O=O<(k=(k=k<x?k:x)>b?k:b)?O:k):O=O<x?O:x,O=O>b?O:b;var H=Math.floor(C/S)+1;return{minValue:b,maxValue:x,step:S,value1:O,value2:k,isVertical:n,isRange:t,popUpOfValue:_,popUpIsHided:r,scaleOfValues:P=Math.abs(P)>H?H:Math.abs(P),isProgressBar:c,postfix:d,description:g,localeProps:V}}},a=function(){function e(e){var a=this;this._updateSlider=function(){var e=a,l=e.slider,i=e.inputs,s=$(l);s.multislider({minValue:+i.minValue.value,maxValue:+i.maxValue.value,step:+i.step.value,value1:+i.value1.value,value2:+i.value2.value,isVertical:i.isVertical.checked,isRange:i.isRange.checked,popUpOfValue:i.popUpOfValue.checked,popUpIsHided:i.popUpIsHided.checked,scaleOfValues:+i.scaleOfValues.value,isProgressBar:i.isProgressBar.checked,postfix:i.postfix.value});var t=s.multislider.value;s.multislider.onChange((function(){var e=t();i.value1.value=String(e[0]),2===e.length&&(i.value2.value=String(e[1]))})),t({})},this._handlePanelChange=function(e){var i,s,t=a,u=t.inputs,n=t.selector,v=t.popUpToggle,_=e.target;+u.minValue.value>+u.maxValue.value&&(i=l.swap(u.minValue.value,u.maxValue.value),u.minValue.value=i[0],u.maxValue.value=i[1]),u.minValue.value===u.maxValue.value&&(_===u.minValue&&(u.minValue.value=String(+u.maxValue.value-+u.step.value)),_===u.maxValue&&(u.maxValue.value=String(+u.minValue.value+ +u.step.value)));var p=+u.maxValue.value-+u.minValue.value;+u.step.value>0?+u.step.value>p&&(u.step.value=String(p)):u.step.value=String(1),u.isRange.checked?(u.value2.disabled=!1,u.value2.classList.remove(n+"__input_disabled"),+u.value1.value>+u.value2.value&&(s=l.swap(u.value1.value,u.value2.value),u.value1.value=s[0],u.value2.value=s[1]),+u.value2.value>+u.maxValue.value&&(u.value2.value=u.maxValue.value),+u.value2.value<+u.minValue.value&&(u.value2.value=u.minValue.value),+u.value1.value>+u.value2.value&&(u.value1.value=u.value2.value)):(u.value2.disabled=!0,u.value2.classList.add(n+"__input_disabled"),+u.value1.value>+u.maxValue.value&&(u.value1.value=u.maxValue.value)),u.popUpOfValue.checked?(u.popUpIsHided.disabled=!1,v.classList.remove(n+"__item-toggle_disabled")):(u.popUpIsHided.disabled=!0,v.classList.add(n+"__item-toggle_disabled")),+u.value1.value<+u.minValue.value&&(u.value1.value=u.minValue.value);var r=Math.floor(p/+u.step.value)+1;+u.scaleOfValues.value>=0?+u.scaleOfValues.value>r&&(u.scaleOfValues.value=String(r)):u.scaleOfValues.value=String(0),a._updateSlider()};var i=e.panel,s=e.slider,t=e.selector,u=e.config;this.panelControl=i,this.slider=s,this.selector=t,this.config=u}return e.prototype.initPanelControl=function(){var e=this,l=e.panelControl,a=e.selector,i=e.config;l.innerHTML='<label class="'+a+'__item">\n      <input type="number" class="'+a+"__input "+a+"__min-val js-"+a+'__min-val" value="'+i.minValue+'">\n      <div class="'+a+'__item-title">min</div>\n    </label>\n    <label class="'+a+'__item">\n      <input type="number" class="'+a+"__input "+a+"__max-val js-"+a+'__max-val" value="'+i.maxValue+'">\n      <div class="'+a+'__item-title">max</div>\n    </label>\n    <label class="'+a+'__item">\n      <input type="number" class="'+a+"__input "+a+"__step js-"+a+'__step" value="'+i.step+'">\n      <div class="'+a+'__item-title">step</div>\n    </label>\n    <label class="'+a+'__item">\n      <input type="number" class="'+a+"__input "+a+"__val-1 js-"+a+'__val-1" value="'+i.value1+'">\n      <div class="'+a+'__item-title">value 1</div>\n    </label>\n    <label class="'+a+'__item">\n      <input type="number" class="'+a+"__input "+a+"__val-2 js-"+a+'__val-2" value="'+i.value2+'">\n      <div class="'+a+'__item-title">value 2</div>\n    </label>\n    <label class="'+a+"__item "+a+'__toggle">\n      <input type="checkbox" class="'+a+"__input "+a+"__is-vertical js-"+a+'__is-vertical">\n      <div class="'+a+'__item-toggle"></div>\n      <div class="'+a+'__item-title">vertical</div>\n    </label>\n    <label class="'+a+"__item "+a+'__toggle">\n      <input type="checkbox" class="'+a+"__input "+a+"__is-range js-"+a+'__is-range" checked>\n      <div class="'+a+'__item-toggle"></div>\n      <div class="'+a+'__item-title">range</div>\n    </label>\n    <label class="'+a+"__item "+a+'__toggle">\n      <input type="checkbox" class="'+a+"__input "+a+"__is-pop-up js-"+a+'__is-pop-up" '+(i.popUpOfValue?"checked":"")+'>\n      <div class="'+a+'__item-toggle"></div>\n      <div class="'+a+'__item-title">pop-up</div>\n    </label>\n    <label class="'+a+"__item "+a+'__toggle">\n      <input type="checkbox" class="'+a+"__input "+a+"__is-pop-up-hided js-"+a+'__is-pop-up-hided" '+(i.popUpIsHided?"checked":"")+'>\n      <div class="'+a+"__item-toggle js-"+a+'__item-toggle"></div>\n      <div class="'+a+'__item-title">pop-up hided</div>\n    </label>\n    <label class="'+a+'__item">\n      <input type="number" value="'+i.scaleOfValues+'" class="'+a+"__input "+a+"__scale-divisions js-"+a+'__scale-divisions">\n      <div class="'+a+'__item-title">scale divisions</div>\n    </label>\n    <label class="'+a+"__item "+a+'__toggle">\n      <input type="checkbox" checked class="'+a+"__input "+a+"__is-progress-bar js-"+a+'__is-progress-bar" '+(i.isProgressBar?"checked":"")+'>\n      <div class="'+a+'__item-toggle"></div>\n      <div class="'+a+'__item-title">progress bar</div>\n    </label>\n    <label class="'+a+'__item">\n      <input type="text" class="'+a+"__input "+a+"__postfix js-"+a+'__postfix" value="'+(i.postfix?i.postfix:"")+'">\n      <div class="'+a+'__item-title">postfix</div>\n    </label>'},e.prototype.initSlider=function(){var e=this.panelControl,l=this.selector;this.inputs={minValue:e.querySelector(".js-"+l+"__min-val"),maxValue:e.querySelector(".js-"+l+"__max-val"),step:e.querySelector(".js-"+l+"__step"),value1:e.querySelector(".js-"+l+"__val-1"),value2:e.querySelector(".js-"+l+"__val-2"),isVertical:e.querySelector(".js-"+l+"__is-vertical"),isRange:e.querySelector(".js-"+l+"__is-range"),popUpOfValue:e.querySelector(".js-"+l+"__is-pop-up"),popUpIsHided:e.querySelector(".js-"+l+"__is-pop-up-hided"),scaleOfValues:e.querySelector(".js-"+l+"__scale-divisions"),isProgressBar:e.querySelector(".js-"+l+"__is-progress-bar"),postfix:e.querySelector(".js-"+l+"__postfix")},this.popUpToggle=this.inputs.popUpIsHided.parentElement.querySelector(".js-"+l+"__item-toggle"),e.addEventListener("change",this._handlePanelChange),this._updateSlider()},e}();var i="configurable-slider";document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".js-"+i).forEach((function(e){var l=e.querySelector(".js-"+i+"__panel"),s=e.querySelector(".js-"+i+"__slider"),t=JSON.parse(e.getAttribute("data-config")),u=new a({panel:l,slider:s,selector:i,config:t});u.initPanelControl(),u.initSlider()}))})),$(".js-multislider-v43_double.js-multislider-v43_slider-1").multislider({minValue:5e3,maxValue:15e3,step:100,value1:7500,value2:1e4,isVertical:!0,isRange:!0,popUpOfValue:!0,scaleOfValues:11,isProgressBar:!0,postfix:"₽",description:"Вертикальный слайдер"}),$(".js-multislider-v43_solo.js-multislider-v43_slider-3").multislider({minValue:-100,maxValue:150,step:10,value1:100,isVertical:!0,isRange:!1,popUpOfValue:!1,scaleOfValues:6,isProgressBar:!0,description:"Одиночный вертикальный слайдер"})})();