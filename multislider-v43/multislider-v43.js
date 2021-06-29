(()=>{"use strict";function t(t,e){return[e,t]}const e=function(e){var i,a,n=e.isRange,s=void 0!==n&&n,r=e.isVertical,o=void 0!==r&&r,u=e.popUpOfValue,l=void 0!==u&&u,p=e.popUpIsHided,d=void 0===p||p,c=e.isProgressBar,h=void 0===c||c,v=e.postfix,f=e.description,m=void 0===f?"Range Slider":f,g=e.localeProps,y=e.minValue,b=void 0===y?0:y,_=e.maxValue,x=void 0===_?1e3:_,V=e.step,L=void 0===V?1:V,S=e.value1,w=void 0===S?b:S,C=e.value2,O=void 0===C?x:C,P=e.scaleOfValues,A=void 0===P?0:P;if(b>x)b=(i=t(b,x))[0],x=i[1];else if(b===x)throw new Error("minValue shouldn't be equal maxValue");L=L>0?L:1,s?(w>O&&(w=(a=t(w,O))[0],O=a[1]),w=w<(O=(O=O<x?O:x)>b?O:b)?w:O):w=w<x?w:x,w=w>b?w:b;var E=Math.floor((x-b)/L)+1;return{minValue:b,maxValue:x,step:L,value1:w,value2:O,isVertical:o,isRange:s,popUpOfValue:l,popUpIsHided:d,scaleOfValues:A=Math.abs(A)>E?E:Math.abs(A),isProgressBar:h,postfix:v,description:m,localeProps:g}},i=function(){function t(){this.scaleDivisions=[]}return t.prototype.init=function(t){var e=this.scaleDivisions,i=t.count,a=t.selector,n=t.isVertical;this.scale=document.createElement("div"),this.scale.classList.add(""+a);for(var s=0;s<i;s+=1){var r=document.createElement("div");r.classList.add(a+"-division"),n&&r.classList.add(a+"-division_vertical"),e.push(r),this.scale.appendChild(r)}},t.prototype.getScale=function(){return this.scale},t.prototype.getScales=function(){return this.scaleDivisions},t.prototype.update=function(t){for(var e=this.scaleDivisions,i=t.parentThumbs,a=t.axis,n=t.thumbSize,s=t.min,r=t.max,o=t.step,u=e.length,l=i.getBoundingClientRect()[a.sizeParent]-n,p=0;p<u;p+=1){var d=void 0,c=.5;0===p?d=0:(d=n/2-parseInt(getComputedStyle(i).borderWidth,10),p===u-1&&(d*=2,c=0));var h=r-s,v=Math.floor(p/(u-1)*h/o+c)/(1/o)/h;e[p].style[a.styleSelector]=v*l+d+"px",e[p].textContent=(""+ +(h*v+s).toFixed(12)).replace(".",",")}},t}(),a=function(){function t(){this.thumbs=[]}return t.prototype.add=function(t,e,i){void 0===i&&(i=!1);var a=this.thumbs,n=document.createElement("div");n.classList.add(e+"__thumb"),i&&n.classList.add(e+"__thumb_vertical"),t.appendChild(n),a.push(n)},t.prototype.getN=function(t){return this.thumbs[t]},t.prototype.getSize=function(){var t=this.thumbs;return parseInt(getComputedStyle(t[0]).width,10)},t.prototype.getLength=function(){return this.thumbs.length},t.prototype.setStyleN=function(t,e,i){this.thumbs[t].style[e]=i+"px"},t.prototype.getStyleN=function(t,e){return this.thumbs[t].style[e]},t}(),n=function(){function t(t){var e=t.postfix,i=void 0===e?"":e,a=t.localeProps,n=void 0===a?{}:a;this.localeProps=n,this.postfix=i,this.groupValues=[]}return t.prototype.createGroup=function(t){var e=this.postfix,i=this.groupValues,a=t.parent,n=t.selector,s=t.isReadonly,r=void 0!==s&&s,o=t.isHided,u=void 0===o||o,l=t.isVertical,p=void 0!==l&&l,d=document.createElement("div");d.classList.add(n),p&&d.classList.add(n+"_vertical"),r&&!u&&d.classList.add(n+"_visible");var c=document.createElement("input");if(c.type="text",c.classList.add(n+"-input"),c.readOnly=r,d.appendChild(c),e){var h=document.createElement("span");h.classList.add(n+"-postfix"),h.textContent=e,d.appendChild(h)}var v=document.createElement("span");v.classList.add(n+"-hided"),i.push({parent:d,input:c,hided:v}),a.appendChild(d),a.appendChild(v)},t.prototype.init=function(){var t=this,e=this.groupValues;function i(t){var i=e[t].input.value;i&&(e[t].hided.textContent=i,e[t].input.style.width=e[t].hided.offsetWidth+2+"px")}e.forEach((function(a,n){e[n].input.addEventListener("input",i.bind(t,n)),window.addEventListener("load",i.bind(t,n))}))},t.prototype.getValues=function(){return this.groupValues.map((function(t){return t.input}))},t.prototype.updateN=function(t,e){var i=this.groupValues,a=this.localeProps;i[t].hided.textContent=e.toLocaleString("ru",a),i[t].input.value=i[t].hided.textContent,i[t].input.style.width=i[t].hided.offsetWidth+2+"px"},t.prototype.stylizeN=function(t,e,i){this.groupValues[t].parent.style[e]=i+"px"},t}(),s=function(){function t(){this.events={}}return t.prototype.on=function(t,e){var i=this.events;return(i[t]||(i[t]=[])).push(e),this},t.prototype.emit=function(t,e){(this.events[t]||[]).slice().forEach((function(t){return t(e)}))},t}();var r,o=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});const u=function(t){function e(e,s,r){var o=t.call(this)||this;o.updateScale=function(){var t=o,e=t.scale,i=t.parentThumbs,a=t.axis,n=t.thumbSize,s=t.min,r=t.max,u=t.step;e.update({parentThumbs:i,axis:a,thumbSize:n,min:s,max:r,step:u})};var u=r.postfix,l=r.localeProps,p=r.minValue,d=r.maxValue,c=r.step,h=r.popUpOfValue,v=r.isVertical,f=r.description,m=r.popUpIsHided,g=r.isProgressBar,y=r.scaleOfValues;o.scale=new i,o.outputs=new n({postfix:u,localeProps:l}),o.thumbs=new a,o.min=p,o.max=d,o.step=c,o.length=e.length,o.isPopUp=h,o.isVertical=v,o._initOrientation(s),o._renderHeader(s,f);var b=document.createElement("div");b.classList.add("multislider-v43__body"),o.isVertical&&b.classList.add("multislider-v43__body_vertical"),s.appendChild(b),o.parentThumbs=b;for(var _=0;_<o.length;_+=1)o.thumbs.add(b,"multislider-v43",o.isVertical),o.isPopUp&&o.outputs.createGroup({parent:b,selector:"multislider-v43__popup",isReadonly:!0,isHided:m,isVertical:o.isVertical});return o.thumbSize=o.thumbs.getSize(),o._renderProgressBar(b,g),o._renderScale(b,y),o.outputs.init(),o.update(e),o}return o(e,t),e.prototype.getThumbSize=function(){return this.thumbSize},e.prototype.update=function(t){for(var e=this,i=e.parentThumbs,a=e.axis,n=e.thumbSize,s=e.thumbs,r=e.min,o=e.max,u=e.outputs,l=e.isPopUp,p=e.sliderRange,d=i.getBoundingClientRect()[a.sizeParent]-n,c=0;c<s.getLength();c+=1){var h=d*((t[c]-r)/(o-r))-parseInt(getComputedStyle(i).borderWidth,10);s.setStyleN(c,a.styleSelector,h),u.updateN(c,t[c]),l&&u.stylizeN(c,a.styleSelector,h+this.getThumbSize()/2)}p&&(1===s.getLength()&&(p.style[a.sizeParent]=parseInt(s.getStyleN(0,a.styleSelector),10)+n/2+"px"),2===s.getLength()&&(p.style[a.styleSelector]=parseInt(s.getStyleN(0,a.styleSelector),10)+n/2+"px",p.style[a.sizeParent]=parseInt(s.getStyleN(1,a.styleSelector),10)-parseInt(s.getStyleN(0,a.styleSelector),10)+"px"))},e.prototype._initOrientation=function(t){this.isVertical?(t.classList.add("multislider-v43_vertical"),this.axis={sizeParent:"height",styleSelector:"bottom"}):this.axis={sizeParent:"width",styleSelector:"left"}},e.prototype._renderHeader=function(t,e){var i=this,a=i.isPopUp,n=i.outputs,s=i.length,r=document.createElement("div");r.classList.add("multislider-v43__header"),t.appendChild(r);var o=document.createElement("div");if(o.classList.add("multislider-v43__description"),o.textContent=e,r.appendChild(o),!a){var u=document.createElement("div");if(u.classList.add("multislider-v43__output"),r.appendChild(u),n.createGroup({parent:u,selector:"multislider-v43__value"}),2===s){var l=document.createElement("div");l.classList.add("multislider-v43__spacer"),l.textContent=" – ",u.appendChild(l),n.createGroup({parent:u,selector:"multislider-v43__value"})}}},e.prototype._renderProgressBar=function(t,e){var i=this.isVertical;e&&(this.sliderRange=document.createElement("div"),this.sliderRange.classList.add("multislider-v43__range"),i&&this.sliderRange.classList.add("multislider-v43__range_vertical"),t.appendChild(this.sliderRange))},e.prototype._renderScale=function(t,e){var i=this.isVertical,a=this.scale;if(!(e<2)){i||t.classList.add("multislider-v43__body_indented"),a.init({count:e,selector:"multislider-v43__scale",isVertical:i});var n=a.getScale();t.appendChild(n),this.updateScale()}},e}(s);var l=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function a(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}}();const p=function(t){function e(e,i){var a=t.call(this)||this;return a._handleListenerUpdate=function(){var t=a,e=t.view,i=t.model;e.update.call(e,i.getValue())},a.model=e,a.view=i,a._initOrientation(),a}return l(e,t),e.prototype.initListeners=function(){var t=this.view;this._initUpdate(),this._initThumb(),this._initOutput(),this._initBody(),t.scale.getScales().length&&this._initScale()},e.prototype._initOrientation=function(){this.view.isVertical?this.axis={axis:"y",eventAxis:"pageY",sizeParent:"height",start:"top",end:"bottom",dPos:-1}:this.axis={axis:"x",eventAxis:"pageX",sizeParent:"width",start:"left",end:"right",dPos:1}},e.prototype._initUpdate=function(){this.model.on("valueChanged",this._handleListenerUpdate),window.addEventListener("resize",this._handleListenerUpdate),window.addEventListener("resize",this.view.updateScale),document.addEventListener("DOMContentLoaded",this._handleListenerUpdate),document.addEventListener("DOMContentLoaded",this.view.updateScale)},e.prototype._initThumb=function(){for(var t=this,e=t.view,i=t.model,a=t.axis,n=function(t){var n,s,r=!1;e.thumbs.getN(t).addEventListener("pointerdown",(function(e){n=e[a.eventAxis],s=i.getValue()[t],r=!0})),document.addEventListener("pointermove",(function(o){if(r){var u=(o[a.eventAxis]-n)*a.dPos/(e.parentThumbs.getBoundingClientRect()[a.sizeParent]-e.getThumbSize())*(i.getMax()-i.getMin())+s;0===t?i.setValue({val1:u}):1===t&&i.setValue({val2:u})}})),document.addEventListener("pointerup",(function(){r=!1}))},s=0;s<e.thumbs.getLength();s+=1)n(s)},e.prototype._initOutput=function(){var t=this,e=this.view,i=this.model;function a(t){var a=e.outputs.getValues()[t].value.replace(/,/g,".");Number.isInteger(Number(a))?0===t?i.setValue({val1:+a}):i.setValue({val2:+a}):e.outputs.updateN(t,i.getValue()[t])}e.outputs.getValues().forEach((function(e,i){e.addEventListener("change",a.bind(t,i))}))},e.prototype._initScale=function(){var t=this,e=this.view,i=this.model;e.scale.getScale().addEventListener("click",(function(e){var a=e.target;if(a.matches(".multislider-v43__scale-division")){var n=+a.textContent.replace(",","."),s=t._isSecondValue(n),r=t._isEqualsValues(n);s||r&&i.getValue()[1]<n?i.setValue({val2:n}):i.setValue({val1:n})}}))},e.prototype._initBody=function(){var t=this,e=this,i=e.model,a=e.view,n=e.axis;a.parentThumbs.addEventListener("click",(function(e){var a=e.target;if(a.classList.contains("multislider-v43__body")){var s=a.getBoundingClientRect()[n.end]-a.getBoundingClientRect()[n.start],r=(e[n.axis]-a.getBoundingClientRect()[n.start])/s,o=(i.getMax()-i.getMin())*("y"===n.axis?1-r:r)+i.getMin(),u=t._isSecondValue(o),l=t._isEqualsValues(o);u||l&&i.getValue()[1]<o?i.setValue({val2:o}):i.setValue({val1:o})}}))},e.prototype._isSecondValue=function(t){var e=this.model;return 2===e.getValue().length&&Math.abs(t-e.getValue()[1])<Math.abs(t-e.getValue()[0])},e.prototype._isEqualsValues=function(t){var e=this.model;return 2===e.getValue().length&&Math.abs(t-e.getValue()[1])===Math.abs(t-e.getValue()[0])},e}(s);var d=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function a(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}}();const c=function(t){function e(e){var i=t.call(this)||this,a=e.step,n=e.min,s=e.max,r=e.value1;return i.thumbs=[],i.step=a,i.thumbs.push({min:n,max:s,value:(s-n)/2}),i.setValue({val1:r}),i}return d(e,t),e.prototype.getMin=function(){return this.thumbs[0].min},e.prototype.getMax=function(){return this.thumbs[0].max},e.prototype.getValue=function(){return this.thumbs.map((function(t){return t.value}))},e.prototype.setValue=function(t,e){void 0===e&&(e=!0);var i=this.thumbs,a=this.step,n=t.val1;if(null!=n){if(e){var s=n-i[0].min;n=Math.floor(s/a+.5)/(1/a)+i[0].min}n=(n=n>i[0].max?i[0].max:n)<i[0].min?i[0].min:n,i[0].value=n}this.emit("valueChanged",{value1:t.val1})},e}(s);var h=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function a(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}}();const v=function(t){function e(e){var i=t.call(this)||this,a=e.min,n=e.max,s=e.step,r=e.value1,o=e.value2;return i.min=a,i.max=n,i.step=s,i.thumbs=[],i.thumbs.push({min:i.min,max:o,value:i.min}),i.thumbs.push({min:r,max:i.max,value:i.max}),i.setValue({val1:r,val2:o}),i}return h(e,t),e.prototype.getMin=function(){return this.min},e.prototype.getMax=function(){return this.max},e.prototype.getValue=function(){return this.thumbs.map((function(t){return t.value}))},e.prototype.setValue=function(t,e){void 0===e&&(e=!0);var i=this,a=i.thumbs,n=i.step,s=i.min,r=i.max,o=t.val1,u=t.val2,l=null!=o,p=null!=u;if(l||p){if((o=null!=o?o:a[0].value)>(u=null!=u?u:a[1].value)&&(l&&(o=u),p&&(u=o)),e){var d=o-s,c=u-s;o=Math.floor(d/n+.5)/(1/n)+s,u=Math.floor(c/n+.5)/(1/n)+s}o=o<s?s:o,u=u>r?r:u,a[0].value=o,a[0].max=u,a[1].value=u,a[1].min=o}this.emit("valueChanged",{value1:o,value2:u})},e}(s);var f=function(){for(var t=0,e=0,i=arguments.length;e<i;e++)t+=arguments[e].length;var a=Array(t),n=0;for(e=0;e<i;e++)for(var s=arguments[e],r=0,o=s.length;r<o;r++,n++)a[n]=s[r];return a};!function(t){t.fn.multislider=function(i){var a=this,n=e(i);if(0===this.length)throw new Error("Not found element for initialization");var s,r=this[0];if(r.childElementCount)for(;r.firstChild;)r.removeChild(r.firstChild);r.classList.remove("multislider-v43_vertical"),r.classList.add("multislider-v43");var o={min:n.minValue,max:n.maxValue,step:n.step,value1:n.value1};n.isRange?(o.value2=n.value2,s=new v(o)):s=new c(o);var l=new u(s.getValue(),r,n);new p(s,l).initListeners(),t.fn.multislider.value=function(t){return t&&s.setValue({val1:t.val1,val2:t.val2}),s.getValue()},t.fn.multislider.onChange=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];s.on("valueChanged",t.bind.apply(t,f([a],e)))}}}(jQuery),$(".js-multislider-v43").each((function(t,e){var i={};e.hasAttribute("data-min-value")&&(i.minValue=+e.getAttribute("data-min-value")),e.hasAttribute("data-max-value")&&(i.maxValue=+e.getAttribute("data-max-value")),e.hasAttribute("data-step")&&(i.step=+e.getAttribute("data-step")),e.hasAttribute("data-value1")&&(i.value1=+e.getAttribute("data-value1")),e.hasAttribute("data-value2")&&(i.value2=+e.getAttribute("data-value2")),e.hasAttribute("data-is-vertical")&&(i.isVertical="true"===e.getAttribute("data-is-vertical")),e.hasAttribute("data-is-range")&&(i.isRange="true"===e.getAttribute("data-is-range")),e.hasAttribute("data-pop-up-of-value")&&(i.popUpOfValue="true"===e.getAttribute("data-pop-up-of-value")),e.hasAttribute("data-scale-of-values")&&(i.scaleOfValues=+e.getAttribute("data-scale-of-values")),e.hasAttribute("data-is-progress-bar")&&(i.isProgressBar="true"===e.getAttribute("data-is-progress-bar")),e.hasAttribute("data-pop-up-is-hided")&&(i.popUpIsHided="true"===e.getAttribute("data-pop-up-is-hided")),e.hasAttribute("data-description")&&(i.description=e.getAttribute("data-description")),e.hasAttribute("data-postfix")&&(i.postfix=e.getAttribute("data-postfix")),$(e).multislider(i)}))})();