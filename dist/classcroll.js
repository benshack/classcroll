"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(e){_defineProperty(t,e,r[e])})}return t}var defaultOptions={class:null,add:0,remove:null,target:null},scrollers=[],listening=!1,wHeight=window.innerHeight,ScrollObj=function(){function r(e,t){_classCallCheck(this,r),this.elem=e,this.classes=[],this.parseOptions(t),this.queryTargets(),this.controller()}return _createClass(r,[{key:"parseOptions",value:function(e){var t=this;"string"!=typeof e?Array.isArray(e)?Array.from(e).forEach(function(e){t.classes.push(_objectSpread({},defaultOptions,e))}):"object"!==_typeof(e)||this.classes.push(_objectSpread({},defaultOptions,e)):this.classes.push(_objectSpread({},defaultOptions,{class:e}))}},{key:"queryTargets",value:function(){var t=this;Array.from(this.classes).forEach(function(e){e.target=e.target?document.querySelector("".concat(target)):t.elem})}},{key:"pos",value:function(){var e=this.elem.getBoundingClientRect(),t=wHeight+e.height,r=Math.floor((t-(e.top+e.height))/t*100);return r}},{key:"controller",value:function(){var t=this;Array.from(this.classes).forEach(function(e){t.pos()>=e.add&&e.target.classList.add(e.class),(e.remove&&t.pos()>=e.remove||e.remove&&t.pos()<e.add)&&e.target.classList.remove(e.class)})}}]),r}(),initListeners=function(){window.addEventListener("resize",function(){wHeight=window.innerHeight,checkPosition()}),window.addEventListener("scroll",function(){checkPosition()})},makeScrollObj=function(e,t){var r=new ScrollObj(e,t);scrollers.push(r)},checkPosition=function(){Array.from(scrollers).forEach(function(e){e.controller()})},main=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if("string"==typeof e&&(e=document.querySelectorAll("".concat(e))),e.length<=0)return!1;e&&(e.length?Array.from(e).forEach(function(e){makeScrollObj(e,t)}):makeScrollObj(elem,t),listening||(initListeners(),listening=!0))};module.exports=main;