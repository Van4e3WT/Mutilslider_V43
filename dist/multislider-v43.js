(()=>{"use strict";const e=function(){function e(){this.events={}}return e.prototype.on=function(e,t){return(this.events[e]||(this.events[e]=[])).push(t),this},e.prototype.emit=function(e,t){(this.events[e]||[]).slice().forEach((function(e){return e(t)}))},e}();var t,i=(t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(e,i)},function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)});function s(e,t){return[t,e]}var n=function(e){function t(t){var i,n=e.call(this)||this,a=t.value1,u=t.value2;return n.min=t.min,n.max=t.max,n.step=t.step,a>u&&(a=(i=s(a,u))[0],u=i[1]),n.thumbs=[],n.thumbs.push({min:n.min,max:u,value:n.min}),n.thumbs.push({min:a,max:n.max,value:n.max}),n.setValue({val1:a,val2:u},!1),n}return i(t,e),t.prototype.getMin=function(){return this.min},t.prototype.getMax=function(){return this.max},t.prototype.getValue=function(){return this.thumbs},t.prototype.setValue=function(e,t){var i;void 0===t&&(t=!0);var n=e.val1,a=e.val2;(n=null!=n?n:this.thumbs[0].value)>(a=null!=a?a:this.thumbs[1].value)&&(n=(i=s(n,a))[0],a=i[1]),t&&(n=Math.round(n/this.step)/(1/this.step),a=Math.round(a/this.step)/(1/this.step)),n=n<this.min?this.min:n,a=a>this.max?this.max:a,this.thumbs[0].value=n,this.thumbs[0].max=a,this.thumbs[1].value=a,this.thumbs[1].min=n,this.emit("valueChanged",{value1:n,value2:a})},t}(e),a=function(e){function t(t){var i=e.call(this)||this;return i.thumbs=[],i.step=t.step,i.thumbs.push({min:t.min,max:t.max,value:(t.max-t.min)/2}),i.setValue({val1:t.value1},!1),i}return i(t,e),t.prototype.getMin=function(){return this.thumbs[0].min},t.prototype.getMax=function(){return this.thumbs[0].max},t.prototype.getValue=function(){return this.thumbs},t.prototype.setValue=function(e,t){void 0===t&&(t=!0);var i=e.val1;null!=i&&(t&&(i=Math.round(i/this.step)/(1/this.step)),i=(i=i>this.thumbs[0].max?this.thumbs[0].max:i)<this.thumbs[0].min?this.thumbs[0].min:i,this.thumbs[0].value=i),this.emit("valueChanged",{value1:e.val1})},t}(e),u=function(){var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(t,i)};return function(t,i){function s(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}();const l=function(e){function t(t,i,s){var n=e.call(this)||this;n.model=t,n.outputValues=[],n.outputValuesHided=[],n.sliderThumbs=[],n.sliderScale=[],n.isPopUp=s.popUpOfValue,"vertical"===s.orientation?(i.classList.add("vertical"),n.axis={sizeParent:"height",styleSelector:"bottom"}):n.axis={sizeParent:"width",styleSelector:"left"};var a=document.createElement("div");a.classList.add("multislider-v43-header"),i.appendChild(a);var u=document.createElement("div");if(u.classList.add("multislider-v43-header__description"),u.innerText=s.description,a.appendChild(u),!n.isPopUp){var l=document.createElement("div");l.classList.add("multislider-v43-header__output"),a.appendChild(l);var r=document.createElement("input");r.type="number",r.classList.add("multislider-v43-header__value"),r.value=""+s.minValue,l.appendChild(r),n.outputValues.push(r);var o=document.createElement("span");if(o.classList.add("multislider-v43-header__value-hided"),l.appendChild(o),n.outputValuesHided.push(o),2===t.getValue().length){var d=document.createElement("div");d.classList.add("multislider-v43-header__spacer"),d.innerText=" – ",l.appendChild(d);var p=document.createElement("input");p.type="number",p.classList.add("multislider-v43-header__value"),p.value=""+s.maxValue,l.appendChild(p),n.outputValues.push(p);var h=document.createElement("span");h.classList.add("multislider-v43-header__value-hided"),l.appendChild(h),n.outputValuesHided.push(h)}}var c=document.createElement("div");c.classList.add("multislider-v43-body"),i.appendChild(c),n.parentThumbs=c;for(var m=0;m<t.getValue().length;m+=1){var v=document.createElement("div");if(v.classList.add("multislider-v43-body__thumb"),c.appendChild(v),n.sliderThumbs.push(v),n.isPopUp){var f=document.createElement("input");f.type="number",f.readOnly=!0,f.classList.add("multislider-v43-body__popup"),c.appendChild(f),n.outputValues.push(f);var b=document.createElement("span");b.classList.add("multislider-v43-body__popup-hided"),c.appendChild(b),n.outputValuesHided.push(b)}}if(n.thumbSize=parseInt(getComputedStyle(n.sliderThumbs[0]).width,10),s.isProgressBar&&(n.sliderRange=document.createElement("div"),n.sliderRange.classList.add("multislider-v43-body__range"),c.appendChild(n.sliderRange)),s.scaleOfValues){var y;y=s.scaleOfValues<3?3:s.scaleOfValues;var x=document.createElement("div");x.classList.add("multislider-v43-body__scale"),c.appendChild(x),n.renderScale(y,x)}return n.outputValues.forEach((function(e,t){n.outputValues[t].addEventListener("input",(function(){var e=n.outputValues[t].value;e&&(n.outputValuesHided[t].innerText=e,n.outputValues[t].style.width=n.outputValuesHided[t].offsetWidth+"px")}))})),n.update(),n}return u(t,e),t.prototype.getThumbSize=function(){return this.thumbSize},t.prototype.getAxis=function(){return"height"===this.axis.sizeParent?"Y":"X"},t.prototype.update=function(){var e=this,t=this.model.getValue(),i=this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]-this.thumbSize;this.sliderThumbs.forEach((function(s,n){var a=i*((t[n].value-e.model.getMin())/(e.model.getMax()-e.model.getMin()))-parseInt(getComputedStyle(e.parentThumbs).borderWidth,10);e.sliderThumbs[n].style[e.axis.styleSelector]=a+"px",e.outputValues[n].value=""+t[n].value,e.outputValuesHided[n].innerText=e.outputValues[n].value,e.outputValues[n].style.width=e.outputValuesHided[n].offsetWidth+"px",e.isPopUp&&(e.outputValues[n].style[e.axis.styleSelector]=a+e.getThumbSize()/2+"px")})),this.sliderRange&&(1===this.sliderThumbs.length&&(this.sliderRange.style[this.axis.sizeParent]=parseInt(this.sliderThumbs[0].style[this.axis.styleSelector],10)+this.thumbSize/2+"px"),2===this.sliderThumbs.length&&(this.sliderRange.style[this.axis.styleSelector]=parseInt(this.sliderThumbs[0].style[this.axis.styleSelector],10)+this.thumbSize/2+"px",this.sliderRange.style[this.axis.sizeParent]=parseInt(this.sliderThumbs[1].style[this.axis.styleSelector],10)-parseInt(this.sliderThumbs[0].style[this.axis.styleSelector],10)+"px"))},t.prototype.renderScale=function(e,t){for(var i=0;i<e;i+=1){var s=document.createElement("div");s.classList.add("multislider-v43-body__scale-division"),this.sliderScale.push(s),t.appendChild(s)}this.updateScale()},t.prototype.updateScale=function(){for(var e=this.sliderScale.length,t=this.parentThumbs.getBoundingClientRect()[this.axis.sizeParent]-this.thumbSize,i=0;i<e;i+=1){var s=i/(e-1);this.sliderScale[i].style[this.axis.styleSelector]=s*t+(this.thumbSize/2-parseInt(getComputedStyle(this.parentThumbs).borderWidth,10))+"px";var n=this.model.getMax()-this.model.getMin();this.sliderScale[i].innerHTML=(""+(+(n*s).toFixed(12)+this.model.getMin())).replace(".",",")}},t}(e);var r,o=function(){var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(t,i)};return function(t,i){function s(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}();const d=function(e){function t(t,i){var s=e.call(this)||this;return s.model=t,s.view=i,"Y"===i.getAxis()?s.axis={eventAxis:"pageY",sizeParent:"height",dPos:-1}:s.axis={eventAxis:"pageX",sizeParent:"width",dPos:1},s.model.on("valueChanged",s.view.update.bind(s.view)),window.addEventListener("resize",s.view.update.bind(s.view)),window.addEventListener("resize",s.view.updateScale.bind(s.view)),document.addEventListener("DOMContentLoaded",s.view.update.bind(s.view)),document.addEventListener("DOMContentLoaded",s.view.updateScale.bind(s.view)),s.view.sliderThumbs.forEach((function(e,t){s.view.sliderThumbs[t].addEventListener("pointerdown",(function(e){return s.addMouseListener(t,e)}))})),s.view.outputValues.forEach((function(e,t){s.view.outputValues[t].addEventListener("change",(function(){var e=s.view.outputValues[t].value;e&&(0===t?s.model.setValue({val1:+e}):s.model.setValue({val2:+e}))}))})),i.sliderScale.length&&i.sliderScale.forEach((function(e){e.addEventListener("click",(function(){var t=+e.textContent.replace(",",".");2===s.model.getValue().length&&Math.abs(t-s.model.getValue()[1].value)<Math.abs(t-s.model.getValue()[0].value)?s.model.setValue({val2:t},!1):s.model.setValue({val1:t},!1)}))})),s}return o(t,e),t.prototype.addMouseListener=function(e,t){var i=this,s=t[this.axis.eventAxis],n=this.model.getValue()[e].value;document.addEventListener("pointermove",r=function(t){var a=(t[i.axis.eventAxis]-s)*i.axis.dPos/(i.view.parentThumbs.getBoundingClientRect()[i.axis.sizeParent]-i.view.getThumbSize())*(i.model.getMax()-i.model.getMin())+n;0===e?i.model.setValue({val1:a}):1===e&&i.model.setValue({val2:a})}),document.addEventListener("pointerup",this.removeMouseListener)},t.prototype.removeMouseListener=function(){document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",this.removeMouseListener)},t}(e);!function(e){e.fn.multislider=function(t){var i,s,u,r,o,p,h,c,m,v,f,b,y={minValue:null!==(i=t.minValue)&&void 0!==i?i:0,maxValue:null!==(s=t.maxValue)&&void 0!==s?s:1e3,step:null!==(u=t.step)&&void 0!==u?u:1,value1:null!==(r=t.value1)&&void 0!==r?r:t.minValue,value2:null!==(o=t.value2)&&void 0!==o?o:t.maxValue,orientation:null!==(p=t.orientation)&&void 0!==p?p:"horizontal",sliderType:null!==(h=t.sliderType)&&void 0!==h?h:"solo",popUpOfValue:null!==(c=t.popUpOfValue)&&void 0!==c&&c,scaleOfValues:null!==(m=t.scaleOfValues)&&void 0!==m?m:0,isProgressBar:null===(v=t.isProgressBar)||void 0===v||v,description:null!==(f=t.description)&&void 0!==f?f:"Range Slider"},x=this[0];if(0===this.length)throw new Error("Not found element for initialization");if(x.childElementCount)for(;x.firstChild;)x.removeChild(x.firstChild);x.classList.contains("multislider-v43")||x.classList.add("multislider-v43"),x.classList.remove("vertical");var g={min:y.minValue,max:y.maxValue,step:y.step,value1:y.value1};switch(y.sliderType){case"solo":b=new a(g);break;case"double":g.value2=y.value2,b=new n(g);break;default:throw new Error("Undefined type slider")}var V=new l(b,x,y);new d(b,V),e.fn.multislider.value=function(e){return b.setValue({val1:e.val1,val2:e.val2}),b.getValue()}}}(jQuery),$(".multislider-v43").each((function(e,t){return $(t).multislider({})}))})();