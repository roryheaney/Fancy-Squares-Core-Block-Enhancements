/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/customPlayButtons.js":
/*!********************************************!*\
  !*** ./src/assets/js/customPlayButtons.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initCustomPlayButtons)
/* harmony export */ });
function initCustomPlayButtons() {
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.fs-video-overlay button');
    if (!buttons.length) {
      return;
    }
    // function fadeOut(el){
    // 	el.style.opacity = 1;

    // 	(function fade() {
    // 		var interval = setInterval(function() {
    // 			if ((el.style.opacity -= .1) < 0) {
    // 				el.style.display = "none";
    // 				clearInterval(interval);
    // 			} else {
    // 				requestAnimationFrame(fade);
    // 			}
    // 		}, 35);
    // 	})();
    // };
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const overlay = button.closest('.fs-video-overlay');
        if (!overlay) {
          return;
        }
        const video = overlay.nextElementSibling;
        if (video && video.tagName === 'VIDEO') {
          overlay.remove();
          // fadeOut(overlay)
          video.play();
        }
      });
    });
  });
}

/***/ }),

/***/ "./src/assets/js/lazyVideos.js":
/*!*************************************!*\
  !*** ./src/assets/js/lazyVideos.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ lazyLoadVideos)
/* harmony export */ });
function lazyLoadVideos() {
  document.addEventListener('DOMContentLoaded', () => {
    const lazyVideos = document.querySelectorAll('video[data-fs-lazy-video][data-src]');
    if (lazyVideos.length === 0) {
      return;
    }
    if ('IntersectionObserver' in window) {
      const options = {
        root: null,
        rootMargin: '200px',
        threshold: 0
      };
      const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            const dataSrc = video.getAttribute('data-src');
            if (dataSrc) {
              video.setAttribute('src', dataSrc);
              video.removeAttribute('data-src');
            }
            observer.unobserve(video);
          }
        });
      }, options);
      lazyVideos.forEach(video => observer.observe(video));
    } else {
      lazyVideos.forEach(video => {
        const dataSrc = video.getAttribute('data-src');
        if (dataSrc) {
          video.setAttribute('src', dataSrc);
          video.removeAttribute('data-src');
        }
      });
    }
  });
}

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_js_lazyVideos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/js/lazyVideos */ "./src/assets/js/lazyVideos.js");
/* harmony import */ var _assets_js_customPlayButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/js/customPlayButtons */ "./src/assets/js/customPlayButtons.js");


(0,_assets_js_lazyVideos__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_assets_js_customPlayButtons__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map