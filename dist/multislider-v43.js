(()=>{"use strict";const t=function(){function t(){this.events={}}return t.prototype.on=function(t,e){return(this.events[t]||(this.events[t]=[])).push(e),this},t.prototype.emit=function(t,e){(this.events[t]||[]).slice().forEach((function(t){return t(e)}))},t}();var e,i=(e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,i)},function(t,i){function s(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)});function s(t,e){return[e,t]}var a=function(t){function e(e){var i,a=t.call(this)||this,u=e.value1,n=e.value2;return a.min=e.min,a.max=e.max,a.step=e.step,u>n&&(u=(i=s(u,n))[0],n=i[1]),a.thumbs=[],a.thumbs.push({min:a.min,max:n,value:a.min}),a.thumbs.push({min:u,max:a.max,value:a.max}),a.setValue({val1:u,val2:n},!1),a}return i(e,t),e.prototype.getMin=function(){return this.min},e.prototype.getMax=function(){return this.max},e.prototype.getValue=function(){return this.thumbs},e.prototype.setValue=function(t,e){var i;void 0===e&&(e=!0);var a=t.val1,u=t.val2;(a=null!=a?a:this.thumbs[0].value)>(u=null!=u?u:this.thumbs[1].value)&&(a=(i=s(a,u))[0],u=i[1]),e&&(a=Math.round(a/this.step)/(1/this.step),u=Math.round(u/this.step)/(1/this.step)),a=a<this.min?this.min:a,u=u>this.max?this.max:u,this.thumbs[0].value=a,this.thumbs[0].max=u,this.thumbs[1].value=u,this.thumbs[1].min=a,this.emit("valueChanged",{value1:a,value2:u})},e}(t),u=function(t){function e(e){var i=t.call(this)||this;return i.thumbs=[],i.step=e.step,i.thumbs.push({min:e.min,max:e.max,value:(e.max-e.min)/2}),i.setValue({val1:e.value1},!1),i}return i(e,t),e.prototype.getMin=function(){return this.thumbs[0].min},e.prototype.getMax=function(){return this.thumbs[0].max},e.prototype.getValue=function(){return this.thumbs},e.prototype.setValue=function(t,e){void 0===e&&(e=!0);var i=t.val1;null!=i&&(e&&(i=Math.round(i/this.step)/(1/this.step)),i=(i=i>this.thumbs[0].max?this.thumbs[0].max:i)<this.thumbs[0].min?this.thumbs[0].min:i,this.thumbs[0].value=i),this.emit("valueChanged",{value1:t.val1})},e}(t),n=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}();const l=function(t){function e(e,i,s){var a=t.call(this)||this;a.model=e,a.outputValues=[],a.outputValuesHided=[],a.sliderThumbs=[],a.sliderScale=[],a.isPopUp=s.popUpOfValue,"vertical"===s.orientation?(i.classList.add("vertical-v43"),a.axis={sizeParent:"height",styleSelector:"bottom"}):a.axis={sizeParent:"width",styleSelector:"left"};var u=document.createElement("div");u.classList.add("multislider-v43-header"),i.appendChild(u);var n=document.createElement("div");if(n.classList.add("multislider-v43-header__description"),n.innerText=s.description,u.appendChild(n),!a.isPopUp){var l=document.createElement("div");l.classList.add("multislider-v43-header__output"),u.appendChild(l);var r=document.createElement("input");r.type="number",r.classList.add("multislider-v43-header__value"),r.value=""+s.minValue,l.appendChild(r),a.outputValues.push(r);var o=document.createElement("span");if(o.classList.add("multislider-v43-header__value-hided"),l.appendChild(o),a.outputValuesHided.push(o),2===e.getValue().length){var d=document.createElement("div");d.classList.add("multislider-v43-header__spacer"),d.innerText=" – ",l.appendChild(d);var h=document.createElement("input");h.type="number",h.classList.add("multislider-v43-header__value"),h.value=""+s.maxValue,l.appendChild(h),a.outputValues.push(h);var p=document.createElement("span");p.classList.add("multislider-v43-header__value-hided"),l.appendChild(p),a.outputValuesHided.push(p)}}var c=document.createElement("div");c.classList.add("multislider-v43-body"),i.appendChild(c),a.parentThumbs=c;for(var v=0;v<e.getValue().length;v+=1){var m=document.createElement("div");if(m.classList.add("multislider-v43-body__thumb"),c.appendChild(m),a.sliderThumbs.push(m),a.isPopUp){var f=document.createElement("input");f.type="number",f.readOnly=!0,f.classList.add("multislider-v43-body__popup"),c.appendChild(f),a.outputValues.push(f);var b=document.createElement("span");b.classList.add("multislider-v43-body__popup-hided"),c.appendChild(b),a.outputValuesHided.push(b)}}if(a.thumbSize=parseInt(getComputedStyle(a.sliderThumbs[0]).width,10),s.isProgressBar&&(a.sliderRange=document.createElement("div"),a.sliderRange.classList.add("multislider-v43-body__range"),c.appendChild(a.sliderRange)),s.scaleOfValues){var y;y=s.scaleOfValues<3?3:s.scaleOfValues;var g=document.createElement("div");g.classList.add("multislider-v43-body__scale"),c.appendChild(g),a.renderScale(y,g)}return a.outputValuesInit(),a.update(),a}return n(e,t),e.prototype.outputValuesInit=function(){var t=this;function e(t){var e=this.outputValues[t].value;e&&(this.outputValuesHided[t].innerText=e,this.outputValues[t].style.width=this.outputValuesHided[t].offsetWidth+"px")}this.outputValues.forEach((function(i,s){t.outputValues[s].addEventListener("input",e.bind(t,s))}))},e.prototype.renderScale=function(t,e){for(var i=0;i<t;i+=1){var s=document.createElement("div");s.classList.add("multislider-v43-body__scale-division"),this.sliderScale.push(s),e.appendChild(s)}this.updateScale()},e.prototype.getThumbSize=function(){return this.thumbSize},e.prototype.getAxis=function(){return"height"===this.axis.sizeParent?"Y":"X"},e.prototype.update=function(){var t=this,e=this.model.getValue(),i=this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]-this.thumbSize;this.sliderThumbs.forEach((function(s,a){var u=i*((e[a].value-t.model.getMin())/(t.model.getMax()-t.model.getMin()))-parseInt(getComputedStyle(t.parentThumbs).borderWidth,10);t.sliderThumbs[a].style[t.axis.styleSelector]=u+"px",t.outputValues[a].value=""+e[a].value,t.outputValuesHided[a].innerText=t.outputValues[a].value,t.outputValues[a].style.width=t.outputValuesHided[a].offsetWidth+"px",t.isPopUp&&(t.outputValues[a].style[t.axis.styleSelector]=u+t.getThumbSize()/2+"px")})),this.sliderRange&&(1===this.sliderThumbs.length&&(this.sliderRange.style[this.axis.sizeParent]=parseInt(this.sliderThumbs[0].style[this.axis.styleSelector],10)+this.thumbSize/2+"px"),2===this.sliderThumbs.length&&(this.sliderRange.style[this.axis.styleSelector]=parseInt(this.sliderThumbs[0].style[this.axis.styleSelector],10)+this.thumbSize/2+"px",this.sliderRange.style[this.axis.sizeParent]=parseInt(this.sliderThumbs[1].style[this.axis.styleSelector],10)-parseInt(this.sliderThumbs[0].style[this.axis.styleSelector],10)+"px"))},e.prototype.updateScale=function(){for(var t=this.sliderScale.length,e=this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]-this.thumbSize,i=0;i<t;i+=1){var s=i/(t-1);this.sliderScale[i].style[this.axis.styleSelector]=s*e+(this.thumbSize/2-parseInt(getComputedStyle(this.parentThumbs).borderWidth,10))+"px";var a=this.model.getMax()-this.model.getMin();this.sliderScale[i].innerHTML=(""+(+(a*s).toFixed(12)+this.model.getMin())).replace(".",",")}},e}(t);var r=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}();const o=function(t){function e(e,i){var s=t.call(this)||this;return s.model=e,s.view=i,"Y"===i.getAxis()?s.axis={eventAxis:"pageY",sizeParent:"height",dPos:-1}:s.axis={eventAxis:"pageX",sizeParent:"width",dPos:1},s.model.on("valueChanged",s.view.update.bind(s.view)),s.updateInit(),s.thumbInit(),s.outputInit(),i.sliderScale.length&&s.scaleInit(),s}return r(e,t),e.prototype.updateInit=function(){window.addEventListener("resize",this.view.update.bind(this.view)),window.addEventListener("resize",this.view.updateScale.bind(this.view)),document.addEventListener("DOMContentLoaded",this.view.update.bind(this.view)),document.addEventListener("DOMContentLoaded",this.view.updateScale.bind(this.view))},e.prototype.thumbInit=function(){var t=this;this.view.sliderThumbs.forEach((function(e,i){var s,a,u=!1;t.view.sliderThumbs[i].addEventListener("pointerdown",function(t,e){s=e[this.axis.eventAxis],a=this.model.getValue()[t].value,u=!0}.bind(t,i)),document.addEventListener("pointermove",function(t){if(u){var e=(t[this.axis.eventAxis]-s)*this.axis.dPos/(this.view.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]-this.view.getThumbSize())*(this.model.getMax()-this.model.getMin())+a;0===i?this.model.setValue({val1:e}):1===i&&this.model.setValue({val2:e})}}.bind(t)),document.addEventListener("pointerup",(function(){u=!1}))}))},e.prototype.outputInit=function(){var t=this;function e(t){var e=this.view.outputValues[t].value;e&&(0===t?this.model.setValue({val1:+e}):this.model.setValue({val2:+e}))}this.view.outputValues.forEach((function(i,s){t.view.outputValues[s].addEventListener("change",e.bind(t,s))}))},e.prototype.scaleInit=function(){this.view.sliderScale[0].parentElement.addEventListener("click",function(t){var e=t.target;if(e.matches(".multislider-v43-body__scale-division")){var i=+e.textContent.replace(",",".");2===this.model.getValue().length&&Math.abs(i-this.model.getValue()[1].value)<Math.abs(i-this.model.getValue()[0].value)?this.model.setValue({val2:i},!1):this.model.setValue({val1:i},!1)}}.bind(this))},e}(t);!function(t){t.fn.multislider=function(e){var i,s,n,r,d,h,p,c,v,m,f,b,y={minValue:null!==(i=e.minValue)&&void 0!==i?i:0,maxValue:null!==(s=e.maxValue)&&void 0!==s?s:1e3,step:null!==(n=e.step)&&void 0!==n?n:1,value1:null!==(r=e.value1)&&void 0!==r?r:e.minValue,value2:null!==(d=e.value2)&&void 0!==d?d:e.maxValue,orientation:null!==(h=e.orientation)&&void 0!==h?h:"horizontal",sliderType:null!==(p=e.sliderType)&&void 0!==p?p:"solo",popUpOfValue:null!==(c=e.popUpOfValue)&&void 0!==c&&c,scaleOfValues:null!==(v=e.scaleOfValues)&&void 0!==v?v:0,isProgressBar:null===(m=e.isProgressBar)||void 0===m||m,description:null!==(f=e.description)&&void 0!==f?f:"Range Slider"},g=this[0];if(0===this.length)throw new Error("Not found element for initialization");if(g.childElementCount)for(;g.firstChild;)g.removeChild(g.firstChild);g.classList.contains("multislider-v43")||g.classList.add("multislider-v43"),g.classList.remove("vertical-v43");var x={min:y.minValue,max:y.maxValue,step:y.step,value1:y.value1};switch(y.sliderType){case"solo":b=new u(x);break;case"double":x.value2=y.value2,b=new a(x);break;default:throw new Error("Undefined type slider")}var V=new l(b,g,y);new o(b,V),t.fn.multislider.value=function(t){return b.setValue({val1:t.val1,val2:t.val2}),b.getValue()}}}(jQuery),$(".js-multislider-v43").each((function(t,e){var i={};e.hasAttribute("data-min-value")&&(i.minValue=+e.getAttribute("data-min-value")),e.hasAttribute("data-max-value")&&(i.maxValue=+e.getAttribute("data-max-value")),e.hasAttribute("data-step")&&(i.step=+e.getAttribute("data-step")),e.hasAttribute("data-value1")&&(i.value1=+e.getAttribute("data-value1")),e.hasAttribute("data-value2")&&(i.value2=+e.getAttribute("data-value2")),e.hasAttribute("data-orientation")&&(i.orientation=e.getAttribute("data-orientation")),e.hasAttribute("data-slider-type")&&(i.sliderType=e.getAttribute("data-slider-type")),e.hasAttribute("data-pop-up-of-value")&&(i.popUpOfValue="true"===e.getAttribute("data-pop-up-of-value")),e.hasAttribute("data-scale-of-values")&&(i.scaleOfValues=+e.getAttribute("data-scale-of-values")),e.hasAttribute("data-is-progress-bar")&&(i.isProgressBar="true"===e.getAttribute("data-is-progress-bar")),e.hasAttribute("data-description")&&(i.description=e.getAttribute("data-description")),$(e).multislider(i)}))})();