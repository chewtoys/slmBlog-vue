module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/logo.tsx":
/*!*****************************!*\
  !*** ./components/logo.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/slm/Desktop/slmblog/frontend/components/logo.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
/* harmony default export */ __webpack_exports__["default"] = (props => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("svg", {
    version: "1.1",
    id: "logo_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 600.4 600",
    xmlSpace: "preserve",
    style: {
      width: props.size + 'px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: undefined
  }, __jsx("style", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: undefined
  }, `
        .st0{fill:#444444;}
      `), __jsx("image", {
    style: {
      display: 'none',
      overflow: 'visible'
    },
    width: "201",
    height: "201",
    xlinkHref: "LOGO.png",
    transform: "matrix(1.3859 0 0 1.3859 201.4377 108.6116)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }), __jsx("g", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, __jsx("path", {
    className: "st0",
    d: "M430.8,532.3c-38.6,21.9-83.3,34.4-130.9,34.4c-147,0-266.1-119.1-266.1-266.1S152.9,34.4,299.9,34.4 c31.5,0,61.6,5.5,89.6,15.5c9.4,3.9,20.2-1.2,23.2-10.5c3.1-9.4-2.7-19.9-12.7-22.3C368.7,6.1,335,0,299.9,0 C133.9,0-0.7,134.6-0.7,300.6s134.6,300.6,300.6,300.6c55.1,0,106.8-14.9,151.2-40.7c9.2-5.5,11.7-17.3,6.6-25.1 C452.3,527,439.4,524.9,430.8,532.3z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }), __jsx("path", {
    className: "st0",
    d: "M578.9,188.7c-5-8.9-16.2-11.9-24.2-7.3c-6.9,4-10.2,12.9-7.4,21.2c12,30.3,18.6,63.3,18.6,97.9 c0,44.9-11.1,87.1-30.7,124.2c-1.5,8.1,1.7,16,7.7,19.5c8.1,4.8,20.7,1.2,26.2-9.7c6.8-13.8,14.7-32.3,20.8-55 c5.4-20.1,10.5-47.1,10.5-79C600.4,261,592.8,223.3,578.9,188.7z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: undefined
  }), __jsx("circle", {
    className: "st0",
    cx: "545.7",
    cy: "536.2",
    r: "21.1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  })), __jsx("polygon", {
    className: "st0",
    points: "106.3,134.8 113.3,205.4 184.2,200 186.1,223 261.5,215.9 260.4,192.7 348.2,189.8 348.2,196.3  415.5,219.8 429.3,187 518.1,185.8 511.6,112.8 460.3,116 460.3,105.5 391.6,82.7 374.9,120.5 253.7,121.7 250.8,88.4 175.4,94.9  175.4,126.6 ",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }), __jsx("g", {
    id: "logo_2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: undefined
  }, __jsx("path", {
    className: "st0",
    d: "M513.7,413.3l-7.3-63.7l-55.6,3.2l24.7-50.2l-28-14.3l53.1-1.2l-3.7-61.7l-153.3,6.1l-1.6-28.4l-74.2,6.1v23.5 l-145.6,10.5l4.1,62.5l53.9-3.2L145,318l19.1,47.1l-50.7,6.1l5.7,67.3l80.3-8.5l-57.2,45.4l48.5,45l89.8-69.8l5.3,69.8l75.4-5.3 l-4.1-98.2L513.7,413.3z M212.2,361.8l22-15.4l-24.7-45.8v-2l62.9-3.7l2,62.1L212.2,361.8z M348.2,292h57.6l-27.6,60.8H351 L348.2,292z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: undefined
  }), __jsx("path", {
    className: "st0",
    d: "M377,427.5l-8.9,65.3c0,0,135.9,18.3,141.2,22.3c5.3,4.1,4.5-67.3,4.5-67.3L377,427.5z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  }))));
});

/***/ }),

/***/ "./pages/Home/home.tsx":
/*!*****************************!*\
  !*** ./pages/Home/home.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/logo */ "./components/logo.tsx");
var _jsxFileName = "/Users/slm/Desktop/slmblog/frontend/pages/Home/home.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// import dynamic from 'next/dynamic'

/* harmony default export */ __webpack_exports__["default"] = (() => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }, "Home"), __jsx(_components_logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: 50,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }));
});

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Home_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home/home */ "./pages/Home/home.tsx");
var _jsxFileName = "/Users/slm/Desktop/slmblog/frontend/pages/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

/* harmony default export */ __webpack_exports__["default"] = (() => {
  return __jsx(_Home_home__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: undefined
  });
});

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/index.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/slm/Desktop/slmblog/frontend/pages/index.tsx */"./pages/index.tsx");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map