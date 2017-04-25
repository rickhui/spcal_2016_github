//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Session = Package.session.Session;
var EJSON = Package.ejson.EJSON;
var check = Package.check.check;
var Match = Package.check.Match;
var DiffSequence = Package['diff-sequence'].DiffSequence;
var MongoID = Package['mongo-id'].MongoID;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var ObserveSequence = Package['observe-sequence'].ObserveSequence;
var ReactiveVar = Package['reactive-var'].ReactiveVar;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/angular-meteor-data/.npm/package/node_modules/angular-meteor/dist/angular-meteor.js                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*! angular-meteor v1.3.12 */                                                                                         // 1
(function webpackUniversalModuleDefinition(root, factory) {                                                           // 2
	if(typeof exports === 'object' && typeof module === 'object')                                                        // 3
		module.exports = factory(require("underscore"), require("jsondiffpatch"));                                          // 4
	else if(typeof define === 'function' && define.amd)                                                                  // 5
		define(["underscore", "jsondiffpatch"], factory);                                                                   // 6
	else if(typeof exports === 'object')                                                                                 // 7
		exports["angularMeteor"] = factory(require("underscore"), require("jsondiffpatch"));                                // 8
	else                                                                                                                 // 9
		root["angularMeteor"] = factory(root["_"], root["jsondiffpatch"]);                                                  // 10
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_22__) {                                    // 11
return /******/ (function(modules) { // webpackBootstrap                                                              // 12
/******/ 	// The module cache                                                                                         // 13
/******/ 	var installedModules = {};                                                                                  // 14
                                                                                                                      // 15
/******/ 	// The require function                                                                                     // 16
/******/ 	function __webpack_require__(moduleId) {                                                                    // 17
                                                                                                                      // 18
/******/ 		// Check if module is in cache                                                                             // 19
/******/ 		if(installedModules[moduleId])                                                                             // 20
/******/ 			return installedModules[moduleId].exports;                                                                // 21
                                                                                                                      // 22
/******/ 		// Create a new module (and put it into the cache)                                                         // 23
/******/ 		var module = installedModules[moduleId] = {                                                                // 24
/******/ 			exports: {},                                                                                              // 25
/******/ 			id: moduleId,                                                                                             // 26
/******/ 			loaded: false                                                                                             // 27
/******/ 		};                                                                                                         // 28
                                                                                                                      // 29
/******/ 		// Execute the module function                                                                             // 30
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);                       // 31
                                                                                                                      // 32
/******/ 		// Flag the module as loaded                                                                               // 33
/******/ 		module.loaded = true;                                                                                      // 34
                                                                                                                      // 35
/******/ 		// Return the exports of the module                                                                        // 36
/******/ 		return module.exports;                                                                                     // 37
/******/ 	}                                                                                                           // 38
                                                                                                                      // 39
                                                                                                                      // 40
/******/ 	// expose the modules object (__webpack_modules__)                                                          // 41
/******/ 	__webpack_require__.m = modules;                                                                            // 42
                                                                                                                      // 43
/******/ 	// expose the module cache                                                                                  // 44
/******/ 	__webpack_require__.c = installedModules;                                                                   // 45
                                                                                                                      // 46
/******/ 	// __webpack_public_path__                                                                                  // 47
/******/ 	__webpack_require__.p = "";                                                                                 // 48
                                                                                                                      // 49
/******/ 	// Load entry module and return exports                                                                     // 50
/******/ 	return __webpack_require__(0);                                                                              // 51
/******/ })                                                                                                           // 52
/************************************************************************/                                            // 53
/******/ ([                                                                                                           // 54
/* 0 */                                                                                                               // 55
/***/ (function(module, exports, __webpack_require__) {                                                               // 56
                                                                                                                      // 57
	'use strict';                                                                                                        // 58
                                                                                                                      // 59
	Object.defineProperty(exports, "__esModule", {                                                                       // 60
	  value: true                                                                                                        // 61
	});                                                                                                                  // 62
                                                                                                                      // 63
	__webpack_require__(1);                                                                                              // 64
                                                                                                                      // 65
	__webpack_require__(4);                                                                                              // 66
                                                                                                                      // 67
	__webpack_require__(5);                                                                                              // 68
                                                                                                                      // 69
	__webpack_require__(6);                                                                                              // 70
                                                                                                                      // 71
	__webpack_require__(7);                                                                                              // 72
                                                                                                                      // 73
	__webpack_require__(8);                                                                                              // 74
                                                                                                                      // 75
	__webpack_require__(9);                                                                                              // 76
                                                                                                                      // 77
	__webpack_require__(10);                                                                                             // 78
                                                                                                                      // 79
	__webpack_require__(11);                                                                                             // 80
                                                                                                                      // 81
	__webpack_require__(12);                                                                                             // 82
                                                                                                                      // 83
	__webpack_require__(13);                                                                                             // 84
                                                                                                                      // 85
	__webpack_require__(14);                                                                                             // 86
                                                                                                                      // 87
	__webpack_require__(15);                                                                                             // 88
                                                                                                                      // 89
	var _utils = __webpack_require__(16);                                                                                // 90
                                                                                                                      // 91
	var _mixer = __webpack_require__(17);                                                                                // 92
                                                                                                                      // 93
	var _scope = __webpack_require__(18);                                                                                // 94
                                                                                                                      // 95
	var _core = __webpack_require__(19);                                                                                 // 96
                                                                                                                      // 97
	var _viewModel = __webpack_require__(20);                                                                            // 98
                                                                                                                      // 99
	var _reactive = __webpack_require__(21);                                                                             // 100
                                                                                                                      // 101
	var _templates = __webpack_require__(23);                                                                            // 102
                                                                                                                      // 103
	// legacy                                                                                                            // 104
	// lib                                                                                                               // 105
	var name = 'angular-meteor';                                                                                         // 106
                                                                                                                      // 107
	// new                                                                                                               // 108
	exports.default = name;                                                                                              // 109
                                                                                                                      // 110
                                                                                                                      // 111
	angular.module(name, [                                                                                               // 112
	// new                                                                                                               // 113
	_utils.name, _mixer.name, _scope.name, _core.name, _viewModel.name, _reactive.name, _templates.name,                 // 114
                                                                                                                      // 115
	// legacy                                                                                                            // 116
	'angular-meteor.ironrouter', 'angular-meteor.utils', 'angular-meteor.subscribe', 'angular-meteor.collection', 'angular-meteor.object', 'angular-meteor.user', 'angular-meteor.methods', 'angular-meteor.session', 'angular-meteor.camera']).run([_mixer.Mixer, _core.Core, _viewModel.ViewModel, _reactive.Reactive, function ($Mixer, $$Core, $$ViewModel, $$Reactive) {
	  // Load all mixins                                                                                                 // 118
	  $Mixer.mixin($$Core).mixin($$ViewModel).mixin($$Reactive);                                                         // 119
	}])                                                                                                                  // 120
                                                                                                                      // 121
	// legacy                                                                                                            // 122
	// Putting all services under $meteor service for syntactic sugar                                                    // 123
	.service('$meteor', ['$meteorCollection', '$meteorCollectionFS', '$meteorObject', '$meteorMethods', '$meteorSession', '$meteorSubscribe', '$meteorUtils', '$meteorCamera', '$meteorUser', function ($meteorCollection, $meteorCollectionFS, $meteorObject, $meteorMethods, $meteorSession, $meteorSubscribe, $meteorUtils, $meteorCamera, $meteorUser) {
	  var _this = this;                                                                                                  // 125
                                                                                                                      // 126
	  this.collection = $meteorCollection;                                                                               // 127
	  this.collectionFS = $meteorCollectionFS;                                                                           // 128
	  this.object = $meteorObject;                                                                                       // 129
	  this.subscribe = $meteorSubscribe.subscribe;                                                                       // 130
	  this.call = $meteorMethods.call;                                                                                   // 131
	  this.session = $meteorSession;                                                                                     // 132
	  this.autorun = $meteorUtils.autorun;                                                                               // 133
	  this.getCollectionByName = $meteorUtils.getCollectionByName;                                                       // 134
	  this.getPicture = $meteorCamera.getPicture;                                                                        // 135
                                                                                                                      // 136
	  // $meteorUser                                                                                                     // 137
	  ['loginWithPassword', 'requireUser', 'requireValidUser', 'waitForUser', 'createUser', 'changePassword', 'forgotPassword', 'resetPassword', 'verifyEmail', 'loginWithMeteorDeveloperAccount', 'loginWithFacebook', 'loginWithGithub', 'loginWithGoogle', 'loginWithMeetup', 'loginWithTwitter', 'loginWithWeibo', 'logout', 'logoutOtherClients'].forEach(function (method) {
	    _this[method] = $meteorUser[method];                                                                             // 139
	  });                                                                                                                // 140
	}]);                                                                                                                 // 141
	module.exports = exports['default'];                                                                                 // 142
                                                                                                                      // 143
/***/ }),                                                                                                             // 144
/* 1 */                                                                                                               // 145
/***/ (function(module, exports, __webpack_require__) {                                                               // 146
                                                                                                                      // 147
	'use strict';                                                                                                        // 148
                                                                                                                      // 149
	var _underscore = __webpack_require__(2);                                                                            // 150
                                                                                                                      // 151
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 152
                                                                                                                      // 153
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 154
                                                                                                                      // 155
	'use strict';                                                                                                        // 156
                                                                                                                      // 157
	// https://github.com/DAB0mB/get-updates                                                                             // 158
	/*global                                                                                                             // 159
	 angular, _                                                                                                          // 160
	 */                                                                                                                  // 161
                                                                                                                      // 162
	(function () {                                                                                                       // 163
	  var module = angular.module('getUpdates', []);                                                                     // 164
                                                                                                                      // 165
	  var utils = function () {                                                                                          // 166
	    var rip = function rip(obj, level) {                                                                             // 167
	      if (level < 1) return {};                                                                                      // 168
                                                                                                                      // 169
	      return _underscore2.default.reduce(obj, function (clone, v, k) {                                               // 170
	        v = _underscore2.default.isObject(v) ? rip(v, --level) : v;                                                  // 171
	        clone[k] = v;                                                                                                // 172
	        return clone;                                                                                                // 173
	      }, {});                                                                                                        // 174
	    };                                                                                                               // 175
                                                                                                                      // 176
	    var toPaths = function toPaths(obj) {                                                                            // 177
	      var keys = getKeyPaths(obj);                                                                                   // 178
	      var values = getDeepValues(obj);                                                                               // 179
	      return _underscore2.default.object(keys, values);                                                              // 180
	    };                                                                                                               // 181
                                                                                                                      // 182
	    var getKeyPaths = function getKeyPaths(obj) {                                                                    // 183
	      var keys = _underscore2.default.keys(obj).map(function (k) {                                                   // 184
	        var v = obj[k];                                                                                              // 185
	        if (!_underscore2.default.isObject(v) || _underscore2.default.isEmpty(v) || _underscore2.default.isArray(v)) return k;
                                                                                                                      // 187
	        return getKeyPaths(v).map(function (subKey) {                                                                // 188
	          return k + '.' + subKey;                                                                                   // 189
	        });                                                                                                          // 190
	      });                                                                                                            // 191
                                                                                                                      // 192
	      return _underscore2.default.flatten(keys);                                                                     // 193
	    };                                                                                                               // 194
                                                                                                                      // 195
	    var getDeepValues = function getDeepValues(obj, arr) {                                                           // 196
	      arr = arr || [];                                                                                               // 197
                                                                                                                      // 198
	      _underscore2.default.values(obj).forEach(function (v) {                                                        // 199
	        if (!_underscore2.default.isObject(v) || _underscore2.default.isEmpty(v) || _underscore2.default.isArray(v)) arr.push(v);else getDeepValues(v, arr);
	      });                                                                                                            // 201
                                                                                                                      // 202
	      return arr;                                                                                                    // 203
	    };                                                                                                               // 204
                                                                                                                      // 205
	    var flatten = function flatten(arr) {                                                                            // 206
	      return arr.reduce(function (flattened, v, i) {                                                                 // 207
	        if (_underscore2.default.isArray(v) && !_underscore2.default.isEmpty(v)) flattened.push.apply(flattened, flatten(v));else flattened.push(v);
                                                                                                                      // 209
	        return flattened;                                                                                            // 210
	      }, []);                                                                                                        // 211
	    };                                                                                                               // 212
                                                                                                                      // 213
	    var setFilled = function setFilled(obj, k, v) {                                                                  // 214
	      if (!_underscore2.default.isEmpty(v)) obj[k] = v;                                                              // 215
	    };                                                                                                               // 216
                                                                                                                      // 217
	    var assert = function assert(result, msg) {                                                                      // 218
	      if (!result) throwErr(msg);                                                                                    // 219
	    };                                                                                                               // 220
                                                                                                                      // 221
	    var throwErr = function throwErr(msg) {                                                                          // 222
	      throw Error('get-updates error - ' + msg);                                                                     // 223
	    };                                                                                                               // 224
                                                                                                                      // 225
	    return {                                                                                                         // 226
	      rip: rip,                                                                                                      // 227
	      toPaths: toPaths,                                                                                              // 228
	      getKeyPaths: getKeyPaths,                                                                                      // 229
	      getDeepValues: getDeepValues,                                                                                  // 230
	      setFilled: setFilled,                                                                                          // 231
	      assert: assert,                                                                                                // 232
	      throwErr: throwErr                                                                                             // 233
	    };                                                                                                               // 234
	  }();                                                                                                               // 235
                                                                                                                      // 236
	  var getDifference = function () {                                                                                  // 237
	    var getDifference = function getDifference(src, dst, isShallow) {                                                // 238
	      var level;                                                                                                     // 239
                                                                                                                      // 240
	      if (isShallow > 1) level = isShallow;else if (isShallow) level = 1;                                            // 241
                                                                                                                      // 242
	      if (level) {                                                                                                   // 243
	        src = utils.rip(src, level);                                                                                 // 244
	        dst = utils.rip(dst, level);                                                                                 // 245
	      }                                                                                                              // 246
                                                                                                                      // 247
	      return compare(src, dst);                                                                                      // 248
	    };                                                                                                               // 249
                                                                                                                      // 250
	    var compare = function compare(src, dst) {                                                                       // 251
	      var srcKeys = _underscore2.default.keys(src);                                                                  // 252
	      var dstKeys = _underscore2.default.keys(dst);                                                                  // 253
                                                                                                                      // 254
	      var keys = _underscore2.default.chain([]).concat(srcKeys).concat(dstKeys).uniq().without('$$hashKey').value();
                                                                                                                      // 256
	      return keys.reduce(function (diff, k) {                                                                        // 257
	        var srcValue = src[k];                                                                                       // 258
	        var dstValue = dst[k];                                                                                       // 259
                                                                                                                      // 260
	        if (_underscore2.default.isDate(srcValue) && _underscore2.default.isDate(dstValue)) {                        // 261
	          if (srcValue.getTime() != dstValue.getTime()) diff[k] = dstValue;                                          // 262
	        }                                                                                                            // 263
                                                                                                                      // 264
	        if (_underscore2.default.isObject(srcValue) && _underscore2.default.isObject(dstValue)) {                    // 265
	          var valueDiff = getDifference(srcValue, dstValue);                                                         // 266
	          utils.setFilled(diff, k, valueDiff);                                                                       // 267
	        } else if (srcValue !== dstValue) {                                                                          // 268
	          diff[k] = dstValue;                                                                                        // 269
	        }                                                                                                            // 270
                                                                                                                      // 271
	        return diff;                                                                                                 // 272
	      }, {});                                                                                                        // 273
	    };                                                                                                               // 274
                                                                                                                      // 275
	    return getDifference;                                                                                            // 276
	  }();                                                                                                               // 277
                                                                                                                      // 278
	  var getUpdates = function () {                                                                                     // 279
	    var getUpdates = function getUpdates(src, dst, isShallow) {                                                      // 280
	      utils.assert(_underscore2.default.isObject(src), 'first argument must be an object');                          // 281
	      utils.assert(_underscore2.default.isObject(dst), 'second argument must be an object');                         // 282
                                                                                                                      // 283
	      var diff = getDifference(src, dst, isShallow);                                                                 // 284
	      var paths = utils.toPaths(diff);                                                                               // 285
                                                                                                                      // 286
	      var set = createSet(paths);                                                                                    // 287
	      var unset = createUnset(paths);                                                                                // 288
	      var pull = createPull(unset);                                                                                  // 289
                                                                                                                      // 290
	      var updates = {};                                                                                              // 291
	      utils.setFilled(updates, '$set', set);                                                                         // 292
	      utils.setFilled(updates, '$unset', unset);                                                                     // 293
	      utils.setFilled(updates, '$pull', pull);                                                                       // 294
                                                                                                                      // 295
	      return updates;                                                                                                // 296
	    };                                                                                                               // 297
                                                                                                                      // 298
	    var createSet = function createSet(paths) {                                                                      // 299
	      var undefinedKeys = getUndefinedKeys(paths);                                                                   // 300
	      return _underscore2.default.omit(paths, undefinedKeys);                                                        // 301
	    };                                                                                                               // 302
                                                                                                                      // 303
	    var createUnset = function createUnset(paths) {                                                                  // 304
	      var undefinedKeys = getUndefinedKeys(paths);                                                                   // 305
	      var unset = _underscore2.default.pick(paths, undefinedKeys);                                                   // 306
                                                                                                                      // 307
	      return _underscore2.default.reduce(unset, function (result, v, k) {                                            // 308
	        result[k] = true;                                                                                            // 309
	        return result;                                                                                               // 310
	      }, {});                                                                                                        // 311
	    };                                                                                                               // 312
                                                                                                                      // 313
	    var createPull = function createPull(unset) {                                                                    // 314
	      var arrKeyPaths = _underscore2.default.keys(unset).map(function (k) {                                          // 315
	        var split = k.match(/(.*)\.\d+$/);                                                                           // 316
	        return split && split[1];                                                                                    // 317
	      });                                                                                                            // 318
                                                                                                                      // 319
	      return _underscore2.default.compact(arrKeyPaths).reduce(function (pull, k) {                                   // 320
	        pull[k] = null;                                                                                              // 321
	        return pull;                                                                                                 // 322
	      }, {});                                                                                                        // 323
	    };                                                                                                               // 324
                                                                                                                      // 325
	    var getUndefinedKeys = function getUndefinedKeys(obj) {                                                          // 326
	      return _underscore2.default.keys(obj).filter(function (k) {                                                    // 327
	        var v = obj[k];                                                                                              // 328
	        return _underscore2.default.isUndefined(v);                                                                  // 329
	      });                                                                                                            // 330
	    };                                                                                                               // 331
                                                                                                                      // 332
	    return getUpdates;                                                                                               // 333
	  }();                                                                                                               // 334
                                                                                                                      // 335
	  module.value('getUpdates', getUpdates);                                                                            // 336
	})();                                                                                                                // 337
                                                                                                                      // 338
/***/ }),                                                                                                             // 339
/* 2 */                                                                                                               // 340
/***/ (function(module, exports, __webpack_require__) {                                                               // 341
                                                                                                                      // 342
	'use strict';                                                                                                        // 343
                                                                                                                      // 344
	Object.defineProperty(exports, "__esModule", {                                                                       // 345
	  value: true                                                                                                        // 346
	});                                                                                                                  // 347
                                                                                                                      // 348
	var _underscore = __webpack_require__(3);                                                                            // 349
                                                                                                                      // 350
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 351
                                                                                                                      // 352
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 353
                                                                                                                      // 354
	if (typeof _underscore2.default === 'undefined') {                                                                   // 355
	  if (typeof Package.underscore === 'undefined') {                                                                   // 356
	    throw new Error('underscore is missing');                                                                        // 357
	  }                                                                                                                  // 358
	}                                                                                                                    // 359
                                                                                                                      // 360
	exports.default = _underscore2.default || Package.underscore._;                                                      // 361
	module.exports = exports['default'];                                                                                 // 362
                                                                                                                      // 363
/***/ }),                                                                                                             // 364
/* 3 */                                                                                                               // 365
/***/ (function(module, exports) {                                                                                    // 366
                                                                                                                      // 367
	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;                                                                      // 368
                                                                                                                      // 369
/***/ }),                                                                                                             // 370
/* 4 */                                                                                                               // 371
/***/ (function(module, exports, __webpack_require__) {                                                               // 372
                                                                                                                      // 373
	'use strict';                                                                                                        // 374
                                                                                                                      // 375
	var _underscore = __webpack_require__(2);                                                                            // 376
                                                                                                                      // 377
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 378
                                                                                                                      // 379
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 380
                                                                                                                      // 381
	'use strict'; /*global                                                                                               // 382
	               angular, _, Package                                                                                   // 383
	               */                                                                                                    // 384
                                                                                                                      // 385
	var _module = angular.module('diffArray', ['getUpdates']);                                                           // 386
                                                                                                                      // 387
	_module.factory('diffArray', ['getUpdates', function (getUpdates) {                                                  // 388
	  var LocalCollection = Package.minimongo.LocalCollection;                                                           // 389
	  var idStringify = LocalCollection._idStringify || Package['mongo-id'].MongoID.idStringify;                         // 390
	  var idParse = LocalCollection._idParse || Package['mongo-id'].MongoID.idParse;                                     // 391
                                                                                                                      // 392
	  // Calculates the differences between `lastSeqArray` and                                                           // 393
	  // `seqArray` and calls appropriate functions from `callbacks`.                                                    // 394
	  // Reuses Minimongo's diff algorithm implementation.                                                               // 395
	  // XXX Should be replaced with the original diffArray function here:                                               // 396
	  // https://github.com/meteor/meteor/blob/devel/packages/observe-sequence/observe_sequence.js#L152                  // 397
	  // When it will become nested as well, tracking here: https://github.com/meteor/meteor/issues/3764                 // 398
	  function diffArray(lastSeqArray, seqArray, callbacks, preventNestedDiff) {                                         // 399
	    preventNestedDiff = !!preventNestedDiff;                                                                         // 400
                                                                                                                      // 401
	    var diffFn = Package.minimongo.LocalCollection._diffQueryOrderedChanges || Package['diff-sequence'].DiffSequence.diffQueryOrderedChanges;
                                                                                                                      // 403
	    var oldObjIds = [];                                                                                              // 404
	    var newObjIds = [];                                                                                              // 405
	    var posOld = {}; // maps from idStringify'd ids                                                                  // 406
	    var posNew = {}; // ditto                                                                                        // 407
	    var posCur = {};                                                                                                 // 408
	    var lengthCur = lastSeqArray.length;                                                                             // 409
                                                                                                                      // 410
	    _underscore2.default.each(seqArray, function (doc, i) {                                                          // 411
	      newObjIds.push({ _id: doc._id });                                                                              // 412
	      posNew[idStringify(doc._id)] = i;                                                                              // 413
	    });                                                                                                              // 414
                                                                                                                      // 415
	    _underscore2.default.each(lastSeqArray, function (doc, i) {                                                      // 416
	      oldObjIds.push({ _id: doc._id });                                                                              // 417
	      posOld[idStringify(doc._id)] = i;                                                                              // 418
	      posCur[idStringify(doc._id)] = i;                                                                              // 419
	    });                                                                                                              // 420
                                                                                                                      // 421
	    // Arrays can contain arbitrary objects. We don't diff the                                                       // 422
	    // objects. Instead we always fire 'changedAt' callback on every                                                 // 423
	    // object. The consumer of `observe-sequence` should deal with                                                   // 424
	    // it appropriately.                                                                                             // 425
	    diffFn(oldObjIds, newObjIds, {                                                                                   // 426
	      addedBefore: function addedBefore(id, doc, before) {                                                           // 427
	        var position = before ? posCur[idStringify(before)] : lengthCur;                                             // 428
                                                                                                                      // 429
	        _underscore2.default.each(posCur, function (pos, id) {                                                       // 430
	          if (pos >= position) posCur[id]++;                                                                         // 431
	        });                                                                                                          // 432
                                                                                                                      // 433
	        lengthCur++;                                                                                                 // 434
	        posCur[idStringify(id)] = position;                                                                          // 435
                                                                                                                      // 436
	        callbacks.addedAt(id, seqArray[posNew[idStringify(id)]], position, before);                                  // 437
	      },                                                                                                             // 438
                                                                                                                      // 439
	      movedBefore: function movedBefore(id, before) {                                                                // 440
	        var prevPosition = posCur[idStringify(id)];                                                                  // 441
	        var position = before ? posCur[idStringify(before)] : lengthCur - 1;                                         // 442
                                                                                                                      // 443
	        _underscore2.default.each(posCur, function (pos, id) {                                                       // 444
	          if (pos >= prevPosition && pos <= position) posCur[id]--;else if (pos <= prevPosition && pos >= position) posCur[id]++;
	        });                                                                                                          // 446
                                                                                                                      // 447
	        posCur[idStringify(id)] = position;                                                                          // 448
                                                                                                                      // 449
	        callbacks.movedTo(id, seqArray[posNew[idStringify(id)]], prevPosition, position, before);                    // 450
	      },                                                                                                             // 451
	      removed: function removed(id) {                                                                                // 452
	        var prevPosition = posCur[idStringify(id)];                                                                  // 453
                                                                                                                      // 454
	        _underscore2.default.each(posCur, function (pos, id) {                                                       // 455
	          if (pos >= prevPosition) posCur[id]--;                                                                     // 456
	        });                                                                                                          // 457
                                                                                                                      // 458
	        delete posCur[idStringify(id)];                                                                              // 459
	        lengthCur--;                                                                                                 // 460
                                                                                                                      // 461
	        callbacks.removedAt(id, lastSeqArray[posOld[idStringify(id)]], prevPosition);                                // 462
	      }                                                                                                              // 463
	    });                                                                                                              // 464
                                                                                                                      // 465
	    _underscore2.default.each(posNew, function (pos, idString) {                                                     // 466
	      if (!_underscore2.default.has(posOld, idString)) return;                                                       // 467
                                                                                                                      // 468
	      var id = idParse(idString);                                                                                    // 469
	      var newItem = seqArray[pos] || {};                                                                             // 470
	      var oldItem = lastSeqArray[posOld[idString]];                                                                  // 471
	      var updates = getUpdates(oldItem, newItem, preventNestedDiff);                                                 // 472
                                                                                                                      // 473
	      if (!_underscore2.default.isEmpty(updates)) callbacks.changedAt(id, updates, pos, oldItem);                    // 474
	    });                                                                                                              // 475
	  }                                                                                                                  // 476
                                                                                                                      // 477
	  diffArray.shallow = function (lastSeqArray, seqArray, callbacks) {                                                 // 478
	    return diffArray(lastSeqArray, seqArray, callbacks, true);                                                       // 479
	  };                                                                                                                 // 480
                                                                                                                      // 481
	  diffArray.deepCopyChanges = function (oldItem, newItem) {                                                          // 482
	    var setDiff = getUpdates(oldItem, newItem).$set;                                                                 // 483
                                                                                                                      // 484
	    _underscore2.default.each(setDiff, function (v, deepKey) {                                                       // 485
	      setDeep(oldItem, deepKey, v);                                                                                  // 486
	    });                                                                                                              // 487
	  };                                                                                                                 // 488
                                                                                                                      // 489
	  diffArray.deepCopyRemovals = function (oldItem, newItem) {                                                         // 490
	    var unsetDiff = getUpdates(oldItem, newItem).$unset;                                                             // 491
                                                                                                                      // 492
	    _underscore2.default.each(unsetDiff, function (v, deepKey) {                                                     // 493
	      unsetDeep(oldItem, deepKey);                                                                                   // 494
	    });                                                                                                              // 495
	  };                                                                                                                 // 496
                                                                                                                      // 497
	  // Finds changes between two collections                                                                           // 498
	  diffArray.getChanges = function (newCollection, oldCollection, diffMethod) {                                       // 499
	    var changes = { added: [], removed: [], changed: [] };                                                           // 500
                                                                                                                      // 501
	    diffMethod(oldCollection, newCollection, {                                                                       // 502
	      addedAt: function addedAt(id, item, index) {                                                                   // 503
	        changes.added.push({ item: item, index: index });                                                            // 504
	      },                                                                                                             // 505
                                                                                                                      // 506
	      removedAt: function removedAt(id, item, index) {                                                               // 507
	        changes.removed.push({ item: item, index: index });                                                          // 508
	      },                                                                                                             // 509
                                                                                                                      // 510
	      changedAt: function changedAt(id, updates, index, oldItem) {                                                   // 511
	        changes.changed.push({ selector: id, modifier: updates });                                                   // 512
	      },                                                                                                             // 513
                                                                                                                      // 514
	      movedTo: function movedTo(id, item, fromIndex, toIndex) {                                                      // 515
	        // XXX do we need this?                                                                                      // 516
	      }                                                                                                              // 517
	    });                                                                                                              // 518
                                                                                                                      // 519
	    return changes;                                                                                                  // 520
	  };                                                                                                                 // 521
                                                                                                                      // 522
	  var setDeep = function setDeep(obj, deepKey, v) {                                                                  // 523
	    var split = deepKey.split('.');                                                                                  // 524
	    var initialKeys = _underscore2.default.initial(split);                                                           // 525
	    var lastKey = _underscore2.default.last(split);                                                                  // 526
                                                                                                                      // 527
	    initialKeys.reduce(function (subObj, k, i) {                                                                     // 528
	      var nextKey = split[i + 1];                                                                                    // 529
                                                                                                                      // 530
	      if (isNumStr(nextKey)) {                                                                                       // 531
	        if (subObj[k] === null) subObj[k] = [];                                                                      // 532
	        if (subObj[k].length == parseInt(nextKey)) subObj[k].push(null);                                             // 533
	      } else if (subObj[k] === null || !isHash(subObj[k])) {                                                         // 534
	        subObj[k] = {};                                                                                              // 535
	      }                                                                                                              // 536
                                                                                                                      // 537
	      return subObj[k];                                                                                              // 538
	    }, obj);                                                                                                         // 539
                                                                                                                      // 540
	    var deepObj = getDeep(obj, initialKeys);                                                                         // 541
	    deepObj[lastKey] = v;                                                                                            // 542
	    return v;                                                                                                        // 543
	  };                                                                                                                 // 544
                                                                                                                      // 545
	  var unsetDeep = function unsetDeep(obj, deepKey) {                                                                 // 546
	    var split = deepKey.split('.');                                                                                  // 547
	    var initialKeys = _underscore2.default.initial(split);                                                           // 548
	    var lastKey = _underscore2.default.last(split);                                                                  // 549
	    var deepObj = getDeep(obj, initialKeys);                                                                         // 550
                                                                                                                      // 551
	    if (_underscore2.default.isArray(deepObj) && isNumStr(lastKey)) return !!deepObj.splice(lastKey, 1);else return delete deepObj[lastKey];
	  };                                                                                                                 // 553
                                                                                                                      // 554
	  var getDeep = function getDeep(obj, keys) {                                                                        // 555
	    return keys.reduce(function (subObj, k) {                                                                        // 556
	      return subObj[k];                                                                                              // 557
	    }, obj);                                                                                                         // 558
	  };                                                                                                                 // 559
                                                                                                                      // 560
	  var isHash = function isHash(obj) {                                                                                // 561
	    return _underscore2.default.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                    // 562
	  };                                                                                                                 // 563
                                                                                                                      // 564
	  var isNumStr = function isNumStr(str) {                                                                            // 565
	    return str.match(/^\d+$/);                                                                                       // 566
	  };                                                                                                                 // 567
                                                                                                                      // 568
	  return diffArray;                                                                                                  // 569
	}]);                                                                                                                 // 570
                                                                                                                      // 571
/***/ }),                                                                                                             // 572
/* 5 */                                                                                                               // 573
/***/ (function(module, exports) {                                                                                    // 574
                                                                                                                      // 575
	'use strict';                                                                                                        // 576
                                                                                                                      // 577
	angular.module('angular-meteor.settings', []).constant('$angularMeteorSettings', {                                   // 578
	  suppressWarnings: true                                                                                             // 579
	});                                                                                                                  // 580
                                                                                                                      // 581
/***/ }),                                                                                                             // 582
/* 6 */                                                                                                               // 583
/***/ (function(module, exports) {                                                                                    // 584
                                                                                                                      // 585
	'use strict';                                                                                                        // 586
                                                                                                                      // 587
	angular.module('angular-meteor.ironrouter', []).run(['$compile', '$document', '$rootScope', function ($compile, $document, $rootScope) {
	  var Router = (Package['iron:router'] || {}).Router;                                                                // 589
	  if (!Router) return;                                                                                               // 590
                                                                                                                      // 591
	  var isLoaded = false;                                                                                              // 592
                                                                                                                      // 593
	  // Recompile after iron:router builds page                                                                         // 594
	  Router.onAfterAction(function (req, res, next) {                                                                   // 595
	    Tracker.afterFlush(function () {                                                                                 // 596
	      if (isLoaded) return;                                                                                          // 597
	      $compile($document)($rootScope);                                                                               // 598
	      if (!$rootScope.$$phase) $rootScope.$apply();                                                                  // 599
	      isLoaded = true;                                                                                               // 600
	    });                                                                                                              // 601
	  });                                                                                                                // 602
	}]);                                                                                                                 // 603
                                                                                                                      // 604
/***/ }),                                                                                                             // 605
/* 7 */                                                                                                               // 606
/***/ (function(module, exports, __webpack_require__) {                                                               // 607
                                                                                                                      // 608
	'use strict';                                                                                                        // 609
                                                                                                                      // 610
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*global
	                                                                                                                                                                                                                                                                               angular, _, Tracker, EJSON, FS, Mongo
	                                                                                                                                                                                                                                                                               */
                                                                                                                      // 614
	var _underscore = __webpack_require__(2);                                                                            // 615
                                                                                                                      // 616
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 617
                                                                                                                      // 618
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 619
                                                                                                                      // 620
	'use strict';                                                                                                        // 621
                                                                                                                      // 622
	var angularMeteorUtils = angular.module('angular-meteor.utils', ['angular-meteor.settings']);                        // 623
                                                                                                                      // 624
	angularMeteorUtils.service('$meteorUtils', ['$q', '$timeout', '$angularMeteorSettings', function ($q, $timeout, $angularMeteorSettings) {
                                                                                                                      // 626
	  var self = this;                                                                                                   // 627
                                                                                                                      // 628
	  this.autorun = function (scope, fn) {                                                                              // 629
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.utils.autorun] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.6/autorun. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 631
	    // wrapping around Deps.autorun                                                                                  // 632
	    var comp = Tracker.autorun(function (c) {                                                                        // 633
	      fn(c);                                                                                                         // 634
	      // this is run immediately for the first call                                                                  // 635
	      // but after that, we need to $apply to start Angular digest                                                   // 636
	      if (!c.firstRun) $timeout(angular.noop, 0);                                                                    // 637
	    });                                                                                                              // 638
                                                                                                                      // 639
	    // stop autorun when scope is destroyed                                                                          // 640
	    scope.$on('$destroy', function () {                                                                              // 641
	      comp.stop();                                                                                                   // 642
	    });                                                                                                              // 643
                                                                                                                      // 644
	    // return autorun object so that it can be stopped manually                                                      // 645
	    return comp;                                                                                                     // 646
	  };                                                                                                                 // 647
                                                                                                                      // 648
	  // Borrowed from angularFire                                                                                       // 649
	  // https://github.com/firebase/angularfire/blob/master/src/utils.js#L445-L454                                      // 650
	  this.stripDollarPrefixedKeys = function (data) {                                                                   // 651
	    if (!_underscore2.default.isObject(data) || data instanceof Date || data instanceof File || EJSON.toJSONValue(data).$type === 'oid' || (typeof FS === 'undefined' ? 'undefined' : _typeof(FS)) === 'object' && data instanceof FS.File) return data;
                                                                                                                      // 653
	    var out = _underscore2.default.isArray(data) ? [] : {};                                                          // 654
                                                                                                                      // 655
	    _underscore2.default.each(data, function (v, k) {                                                                // 656
	      if (typeof k !== 'string' || k.charAt(0) !== '$') out[k] = self.stripDollarPrefixedKeys(v);                    // 657
	    });                                                                                                              // 658
                                                                                                                      // 659
	    return out;                                                                                                      // 660
	  };                                                                                                                 // 661
                                                                                                                      // 662
	  // Returns a callback which fulfills promise                                                                       // 663
	  this.fulfill = function (deferred, boundError, boundResult) {                                                      // 664
	    return function (err, result) {                                                                                  // 665
	      if (err) deferred.reject(boundError == null ? err : boundError);else if (typeof boundResult == "function") deferred.resolve(boundResult == null ? result : boundResult(result));else deferred.resolve(boundResult == null ? result : boundResult);
	    };                                                                                                               // 667
	  };                                                                                                                 // 668
                                                                                                                      // 669
	  // creates a function which invokes method with the given arguments and returns a promise                          // 670
	  this.promissor = function (obj, method) {                                                                          // 671
	    return function () {                                                                                             // 672
	      var deferred = $q.defer();                                                                                     // 673
	      var fulfill = self.fulfill(deferred);                                                                          // 674
	      var args = _underscore2.default.toArray(arguments).concat(fulfill);                                            // 675
	      obj[method].apply(obj, args);                                                                                  // 676
	      return deferred.promise;                                                                                       // 677
	    };                                                                                                               // 678
	  };                                                                                                                 // 679
                                                                                                                      // 680
	  // creates a $q.all() promise and call digestion loop on fulfillment                                               // 681
	  this.promiseAll = function (promises) {                                                                            // 682
	    var allPromise = $q.all(promises);                                                                               // 683
                                                                                                                      // 684
	    allPromise.finally(function () {                                                                                 // 685
	      // calls digestion loop with no conflicts                                                                      // 686
	      $timeout(angular.noop);                                                                                        // 687
	    });                                                                                                              // 688
                                                                                                                      // 689
	    return allPromise;                                                                                               // 690
	  };                                                                                                                 // 691
                                                                                                                      // 692
	  this.getCollectionByName = function (string) {                                                                     // 693
	    return Mongo.Collection.get(string);                                                                             // 694
	  };                                                                                                                 // 695
                                                                                                                      // 696
	  this.findIndexById = function (collection, doc) {                                                                  // 697
	    var foundDoc = _underscore2.default.find(collection, function (colDoc) {                                         // 698
	      // EJSON.equals used to compare Mongo.ObjectIDs and Strings.                                                   // 699
	      return EJSON.equals(colDoc._id, doc._id);                                                                      // 700
	    });                                                                                                              // 701
                                                                                                                      // 702
	    return _underscore2.default.indexOf(collection, foundDoc);                                                       // 703
	  };                                                                                                                 // 704
	}]);                                                                                                                 // 705
                                                                                                                      // 706
	angularMeteorUtils.run(['$rootScope', '$meteorUtils', function ($rootScope, $meteorUtils) {                          // 707
	  Object.getPrototypeOf($rootScope).$meteorAutorun = function (fn) {                                                 // 708
	    return $meteorUtils.autorun(this, fn);                                                                           // 709
	  };                                                                                                                 // 710
	}]);                                                                                                                 // 711
                                                                                                                      // 712
/***/ }),                                                                                                             // 713
/* 8 */                                                                                                               // 714
/***/ (function(module, exports) {                                                                                    // 715
                                                                                                                      // 716
	/*global                                                                                                             // 717
	 angular, Meteor                                                                                                     // 718
	 */                                                                                                                  // 719
                                                                                                                      // 720
	'use strict';                                                                                                        // 721
                                                                                                                      // 722
	var angularMeteorSubscribe = angular.module('angular-meteor.subscribe', ['angular-meteor.settings']);                // 723
                                                                                                                      // 724
	angularMeteorSubscribe.service('$meteorSubscribe', ['$q', '$angularMeteorSettings', function ($q, $angularMeteorSettings) {
                                                                                                                      // 726
	  var self = this;                                                                                                   // 727
                                                                                                                      // 728
	  this._subscribe = function (scope, deferred, args) {                                                               // 729
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.subscribe] Please note that this module is deprecated since 1.3.0 and will be removed in 1.4.0! Replace it with the new syntax described here: http://www.angular-meteor.com/api/1.3.6/subscribe. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 731
	    var subscription = null;                                                                                         // 732
	    var lastArg = args[args.length - 1];                                                                             // 733
                                                                                                                      // 734
	    // User supplied onStop callback                                                                                 // 735
	    // save it for later use and remove                                                                              // 736
	    // from subscription arguments                                                                                   // 737
	    if (angular.isObject(lastArg) && angular.isFunction(lastArg.onStop)) {                                           // 738
	      var _onStop = lastArg.onStop;                                                                                  // 739
                                                                                                                      // 740
	      args.pop();                                                                                                    // 741
	    }                                                                                                                // 742
                                                                                                                      // 743
	    args.push({                                                                                                      // 744
	      onReady: function onReady() {                                                                                  // 745
	        deferred.resolve(subscription);                                                                              // 746
	      },                                                                                                             // 747
	      onStop: function onStop(err) {                                                                                 // 748
	        if (!deferred.promise.$$state.status) {                                                                      // 749
	          if (err) deferred.reject(err);else deferred.reject(new Meteor.Error("Subscription Stopped", "Subscription stopped by a call to stop method. Either by the client or by the server."));
	        } else if (_onStop)                                                                                          // 751
	          // After promise was resolved or rejected                                                                  // 752
	          // call user supplied onStop callback.                                                                     // 753
	          _onStop.apply(this, Array.prototype.slice.call(arguments));                                                // 754
	      }                                                                                                              // 755
	    });                                                                                                              // 756
                                                                                                                      // 757
	    subscription = Meteor.subscribe.apply(scope, args);                                                              // 758
                                                                                                                      // 759
	    return subscription;                                                                                             // 760
	  };                                                                                                                 // 761
                                                                                                                      // 762
	  this.subscribe = function () {                                                                                     // 763
	    var deferred = $q.defer();                                                                                       // 764
	    var args = Array.prototype.slice.call(arguments);                                                                // 765
	    var subscription = null;                                                                                         // 766
                                                                                                                      // 767
	    self._subscribe(this, deferred, args);                                                                           // 768
                                                                                                                      // 769
	    return deferred.promise;                                                                                         // 770
	  };                                                                                                                 // 771
	}]);                                                                                                                 // 772
                                                                                                                      // 773
	angularMeteorSubscribe.run(['$rootScope', '$q', '$meteorSubscribe', function ($rootScope, $q, $meteorSubscribe) {    // 774
	  Object.getPrototypeOf($rootScope).$meteorSubscribe = function () {                                                 // 775
	    var deferred = $q.defer();                                                                                       // 776
	    var args = Array.prototype.slice.call(arguments);                                                                // 777
                                                                                                                      // 778
	    var subscription = $meteorSubscribe._subscribe(this, deferred, args);                                            // 779
                                                                                                                      // 780
	    this.$on('$destroy', function () {                                                                               // 781
	      subscription.stop();                                                                                           // 782
	    });                                                                                                              // 783
                                                                                                                      // 784
	    return deferred.promise;                                                                                         // 785
	  };                                                                                                                 // 786
	}]);                                                                                                                 // 787
                                                                                                                      // 788
/***/ }),                                                                                                             // 789
/* 9 */                                                                                                               // 790
/***/ (function(module, exports, __webpack_require__) {                                                               // 791
                                                                                                                      // 792
	'use strict';                                                                                                        // 793
                                                                                                                      // 794
	var _underscore = __webpack_require__(2);                                                                            // 795
                                                                                                                      // 796
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 797
                                                                                                                      // 798
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 799
                                                                                                                      // 800
	'use strict'; /*global                                                                                               // 801
	               angular, _, Tracker, check, Match, Mongo                                                              // 802
	               */                                                                                                    // 803
                                                                                                                      // 804
	var angularMeteorCollection = angular.module('angular-meteor.collection', ['angular-meteor.stopper', 'angular-meteor.subscribe', 'angular-meteor.utils', 'diffArray', 'angular-meteor.settings']);
                                                                                                                      // 806
	// The reason angular meteor collection is a factory function and not something                                      // 807
	// that inherit from array comes from here:                                                                          // 808
	// http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/                            // 809
	// We went with the direct extensions approach.                                                                      // 810
	angularMeteorCollection.factory('AngularMeteorCollection', ['$q', '$meteorSubscribe', '$meteorUtils', '$rootScope', '$timeout', 'diffArray', '$angularMeteorSettings', function ($q, $meteorSubscribe, $meteorUtils, $rootScope, $timeout, diffArray, $angularMeteorSettings) {
                                                                                                                      // 812
	  function AngularMeteorCollection(curDefFunc, collection, diffArrayFunc, autoClientSave) {                          // 813
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteorCollection] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/meteorCollection. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 815
	    var data = [];                                                                                                   // 816
	    // Server backup data to evaluate what changes come from client                                                  // 817
	    // after each server update.                                                                                     // 818
	    data._serverBackup = [];                                                                                         // 819
	    // Array differ function.                                                                                        // 820
	    data._diffArrayFunc = diffArrayFunc;                                                                             // 821
	    // Handler of the cursor observer.                                                                               // 822
	    data._hObserve = null;                                                                                           // 823
	    // On new cursor autorun handler                                                                                 // 824
	    // (autorun for reactive variables).                                                                             // 825
	    data._hNewCurAutorun = null;                                                                                     // 826
	    // On new data autorun handler                                                                                   // 827
	    // (autorun for cursor.fetch).                                                                                   // 828
	    data._hDataAutorun = null;                                                                                       // 829
                                                                                                                      // 830
	    if (angular.isDefined(collection)) {                                                                             // 831
	      data.$$collection = collection;                                                                                // 832
	    } else {                                                                                                         // 833
	      var cursor = curDefFunc();                                                                                     // 834
	      data.$$collection = $meteorUtils.getCollectionByName(cursor.collection.name);                                  // 835
	    }                                                                                                                // 836
                                                                                                                      // 837
	    _underscore2.default.extend(data, AngularMeteorCollection);                                                      // 838
	    data._startCurAutorun(curDefFunc, autoClientSave);                                                               // 839
                                                                                                                      // 840
	    return data;                                                                                                     // 841
	  }                                                                                                                  // 842
                                                                                                                      // 843
	  AngularMeteorCollection._startCurAutorun = function (curDefFunc, autoClientSave) {                                 // 844
	    var self = this;                                                                                                 // 845
                                                                                                                      // 846
	    self._hNewCurAutorun = Tracker.autorun(function () {                                                             // 847
	      // When the reactive func gets recomputated we need to stop any previous                                       // 848
	      // observeChanges.                                                                                             // 849
	      Tracker.onInvalidate(function () {                                                                             // 850
	        self._stopCursor();                                                                                          // 851
	      });                                                                                                            // 852
                                                                                                                      // 853
	      if (autoClientSave) self._setAutoClientSave();                                                                 // 854
	      self._updateCursor(curDefFunc(), autoClientSave);                                                              // 855
	    });                                                                                                              // 856
	  };                                                                                                                 // 857
                                                                                                                      // 858
	  AngularMeteorCollection.subscribe = function () {                                                                  // 859
	    $meteorSubscribe.subscribe.apply(this, arguments);                                                               // 860
	    return this;                                                                                                     // 861
	  };                                                                                                                 // 862
                                                                                                                      // 863
	  AngularMeteorCollection.save = function (docs, useUnsetModifier) {                                                 // 864
	    // save whole collection                                                                                         // 865
	    if (!docs) docs = this;                                                                                          // 866
	    // save single doc                                                                                               // 867
	    docs = [].concat(docs);                                                                                          // 868
                                                                                                                      // 869
	    var promises = docs.map(function (doc) {                                                                         // 870
	      return this._upsertDoc(doc, useUnsetModifier);                                                                 // 871
	    }, this);                                                                                                        // 872
                                                                                                                      // 873
	    return $meteorUtils.promiseAll(promises);                                                                        // 874
	  };                                                                                                                 // 875
                                                                                                                      // 876
	  AngularMeteorCollection._upsertDoc = function (doc, useUnsetModifier) {                                            // 877
	    var deferred = $q.defer();                                                                                       // 878
	    var collection = this.$$collection;                                                                              // 879
	    var createFulfill = _underscore2.default.partial($meteorUtils.fulfill, deferred, null);                          // 880
                                                                                                                      // 881
	    // delete $$hashkey                                                                                              // 882
	    doc = $meteorUtils.stripDollarPrefixedKeys(doc);                                                                 // 883
	    var docId = doc._id;                                                                                             // 884
	    var isExist = collection.findOne(docId);                                                                         // 885
                                                                                                                      // 886
	    // update                                                                                                        // 887
	    if (isExist) {                                                                                                   // 888
	      // Deletes _id property (from the copy) so that                                                                // 889
	      // it can be $set using update.                                                                                // 890
	      delete doc._id;                                                                                                // 891
	      var modifier = useUnsetModifier ? { $unset: doc } : { $set: doc };                                             // 892
	      // NOTE: do not use #upsert() method, since it does not exist in some collections                              // 893
	      collection.update(docId, modifier, createFulfill(function () {                                                 // 894
	        return { _id: docId, action: 'updated' };                                                                    // 895
	      }));                                                                                                           // 896
	    }                                                                                                                // 897
	    // insert                                                                                                        // 898
	    else {                                                                                                           // 899
	        collection.insert(doc, createFulfill(function (id) {                                                         // 900
	          return { _id: id, action: 'inserted' };                                                                    // 901
	        }));                                                                                                         // 902
	      }                                                                                                              // 903
                                                                                                                      // 904
	    return deferred.promise;                                                                                         // 905
	  };                                                                                                                 // 906
                                                                                                                      // 907
	  // performs $pull operations parallely.                                                                            // 908
	  // used for handling splice operations returned from getUpdates() to prevent conflicts.                            // 909
	  // see issue: https://github.com/Urigo/angular-meteor/issues/793                                                   // 910
	  AngularMeteorCollection._updateDiff = function (selector, update, callback) {                                      // 911
	    callback = callback || angular.noop;                                                                             // 912
	    var setters = _underscore2.default.omit(update, '$pull');                                                        // 913
	    var updates = [setters];                                                                                         // 914
                                                                                                                      // 915
	    _underscore2.default.each(update.$pull, function (pull, prop) {                                                  // 916
	      var puller = {};                                                                                               // 917
	      puller[prop] = pull;                                                                                           // 918
	      updates.push({ $pull: puller });                                                                               // 919
	    });                                                                                                              // 920
                                                                                                                      // 921
	    this._updateParallel(selector, updates, callback);                                                               // 922
	  };                                                                                                                 // 923
                                                                                                                      // 924
	  // performs each update operation parallely                                                                        // 925
	  AngularMeteorCollection._updateParallel = function (selector, updates, callback) {                                 // 926
	    var self = this;                                                                                                 // 927
	    var done = _underscore2.default.after(updates.length, callback);                                                 // 928
                                                                                                                      // 929
	    var next = function next(err, affectedDocsNum) {                                                                 // 930
	      if (err) return callback(err);                                                                                 // 931
	      done(null, affectedDocsNum);                                                                                   // 932
	    };                                                                                                               // 933
                                                                                                                      // 934
	    _underscore2.default.each(updates, function (update) {                                                           // 935
	      self.$$collection.update(selector, update, next);                                                              // 936
	    });                                                                                                              // 937
	  };                                                                                                                 // 938
                                                                                                                      // 939
	  AngularMeteorCollection.remove = function (keyOrDocs) {                                                            // 940
	    var keys;                                                                                                        // 941
                                                                                                                      // 942
	    // remove whole collection                                                                                       // 943
	    if (!keyOrDocs) {                                                                                                // 944
	      keys = _underscore2.default.pluck(this, '_id');                                                                // 945
	    }                                                                                                                // 946
	    // remove docs                                                                                                   // 947
	    else {                                                                                                           // 948
	        keyOrDocs = [].concat(keyOrDocs);                                                                            // 949
                                                                                                                      // 950
	        keys = _underscore2.default.map(keyOrDocs, function (keyOrDoc) {                                             // 951
	          return keyOrDoc._id || keyOrDoc;                                                                           // 952
	        });                                                                                                          // 953
	      }                                                                                                              // 954
                                                                                                                      // 955
	    // Checks if all keys are correct.                                                                               // 956
	    check(keys, [Match.OneOf(String, Mongo.ObjectID)]);                                                              // 957
                                                                                                                      // 958
	    var promises = keys.map(function (key) {                                                                         // 959
	      return this._removeDoc(key);                                                                                   // 960
	    }, this);                                                                                                        // 961
                                                                                                                      // 962
	    return $meteorUtils.promiseAll(promises);                                                                        // 963
	  };                                                                                                                 // 964
                                                                                                                      // 965
	  AngularMeteorCollection._removeDoc = function (id) {                                                               // 966
	    var deferred = $q.defer();                                                                                       // 967
	    var collection = this.$$collection;                                                                              // 968
	    var fulfill = $meteorUtils.fulfill(deferred, null, { _id: id, action: 'removed' });                              // 969
	    collection.remove(id, fulfill);                                                                                  // 970
	    return deferred.promise;                                                                                         // 971
	  };                                                                                                                 // 972
                                                                                                                      // 973
	  AngularMeteorCollection._updateCursor = function (cursor, autoClientSave) {                                        // 974
	    var self = this;                                                                                                 // 975
	    // XXX - consider adding an option for a non-orderd result for faster performance                                // 976
	    if (self._hObserve) self._stopObserving();                                                                       // 977
                                                                                                                      // 978
	    self._hObserve = cursor.observe({                                                                                // 979
	      addedAt: function addedAt(doc, atIndex) {                                                                      // 980
	        self.splice(atIndex, 0, doc);                                                                                // 981
	        self._serverBackup.splice(atIndex, 0, doc);                                                                  // 982
	        self._setServerUpdateMode();                                                                                 // 983
	      },                                                                                                             // 984
                                                                                                                      // 985
	      changedAt: function changedAt(doc, oldDoc, atIndex) {                                                          // 986
	        diffArray.deepCopyChanges(self[atIndex], doc);                                                               // 987
	        diffArray.deepCopyRemovals(self[atIndex], doc);                                                              // 988
	        self._serverBackup[atIndex] = self[atIndex];                                                                 // 989
	        self._setServerUpdateMode();                                                                                 // 990
	      },                                                                                                             // 991
                                                                                                                      // 992
	      movedTo: function movedTo(doc, fromIndex, toIndex) {                                                           // 993
	        self.splice(fromIndex, 1);                                                                                   // 994
	        self.splice(toIndex, 0, doc);                                                                                // 995
	        self._serverBackup.splice(fromIndex, 1);                                                                     // 996
	        self._serverBackup.splice(toIndex, 0, doc);                                                                  // 997
	        self._setServerUpdateMode();                                                                                 // 998
	      },                                                                                                             // 999
                                                                                                                      // 1000
	      removedAt: function removedAt(oldDoc) {                                                                        // 1001
	        var removedIndex = $meteorUtils.findIndexById(self, oldDoc);                                                 // 1002
                                                                                                                      // 1003
	        if (removedIndex != -1) {                                                                                    // 1004
	          self.splice(removedIndex, 1);                                                                              // 1005
	          self._serverBackup.splice(removedIndex, 1);                                                                // 1006
	          self._setServerUpdateMode();                                                                               // 1007
	        } else {                                                                                                     // 1008
	          // If it's been removed on client then it's already not in collection                                      // 1009
	          // itself but still is in the _serverBackup.                                                               // 1010
	          removedIndex = $meteorUtils.findIndexById(self._serverBackup, oldDoc);                                     // 1011
                                                                                                                      // 1012
	          if (removedIndex != -1) {                                                                                  // 1013
	            self._serverBackup.splice(removedIndex, 1);                                                              // 1014
	          }                                                                                                          // 1015
	        }                                                                                                            // 1016
	      }                                                                                                              // 1017
	    });                                                                                                              // 1018
                                                                                                                      // 1019
	    self._hDataAutorun = Tracker.autorun(function () {                                                               // 1020
	      cursor.fetch();                                                                                                // 1021
	      if (self._serverMode) self._unsetServerUpdateMode(autoClientSave);                                             // 1022
	    });                                                                                                              // 1023
	  };                                                                                                                 // 1024
                                                                                                                      // 1025
	  AngularMeteorCollection._stopObserving = function () {                                                             // 1026
	    this._hObserve.stop();                                                                                           // 1027
	    this._hDataAutorun.stop();                                                                                       // 1028
	    delete this._serverMode;                                                                                         // 1029
	    delete this._hUnsetTimeout;                                                                                      // 1030
	  };                                                                                                                 // 1031
                                                                                                                      // 1032
	  AngularMeteorCollection._setServerUpdateMode = function (name) {                                                   // 1033
	    this._serverMode = true;                                                                                         // 1034
	    // To simplify server update logic, we don't follow                                                              // 1035
	    // updates from the client at the same time.                                                                     // 1036
	    this._unsetAutoClientSave();                                                                                     // 1037
	  };                                                                                                                 // 1038
                                                                                                                      // 1039
	  // Here we use $timeout to combine multiple updates that go                                                        // 1040
	  // each one after another.                                                                                         // 1041
	  AngularMeteorCollection._unsetServerUpdateMode = function (autoClientSave) {                                       // 1042
	    var self = this;                                                                                                 // 1043
                                                                                                                      // 1044
	    if (self._hUnsetTimeout) {                                                                                       // 1045
	      $timeout.cancel(self._hUnsetTimeout);                                                                          // 1046
	      self._hUnsetTimeout = null;                                                                                    // 1047
	    }                                                                                                                // 1048
                                                                                                                      // 1049
	    self._hUnsetTimeout = $timeout(function () {                                                                     // 1050
	      self._serverMode = false;                                                                                      // 1051
	      // Finds updates that was potentially done from the client side                                                // 1052
	      // and saves them.                                                                                             // 1053
	      var changes = diffArray.getChanges(self, self._serverBackup, self._diffArrayFunc);                             // 1054
	      self._saveChanges(changes);                                                                                    // 1055
	      // After, continues following client updates.                                                                  // 1056
	      if (autoClientSave) self._setAutoClientSave();                                                                 // 1057
	    }, 0);                                                                                                           // 1058
	  };                                                                                                                 // 1059
                                                                                                                      // 1060
	  AngularMeteorCollection.stop = function () {                                                                       // 1061
	    this._stopCursor();                                                                                              // 1062
	    this._hNewCurAutorun.stop();                                                                                     // 1063
	  };                                                                                                                 // 1064
                                                                                                                      // 1065
	  AngularMeteorCollection._stopCursor = function () {                                                                // 1066
	    this._unsetAutoClientSave();                                                                                     // 1067
                                                                                                                      // 1068
	    if (this._hObserve) {                                                                                            // 1069
	      this._hObserve.stop();                                                                                         // 1070
	      this._hDataAutorun.stop();                                                                                     // 1071
	    }                                                                                                                // 1072
                                                                                                                      // 1073
	    this.splice(0);                                                                                                  // 1074
	    this._serverBackup.splice(0);                                                                                    // 1075
	  };                                                                                                                 // 1076
                                                                                                                      // 1077
	  AngularMeteorCollection._unsetAutoClientSave = function (name) {                                                   // 1078
	    if (this._hRegAutoBind) {                                                                                        // 1079
	      this._hRegAutoBind();                                                                                          // 1080
	      this._hRegAutoBind = null;                                                                                     // 1081
	    }                                                                                                                // 1082
	  };                                                                                                                 // 1083
                                                                                                                      // 1084
	  AngularMeteorCollection._setAutoClientSave = function () {                                                         // 1085
	    var self = this;                                                                                                 // 1086
                                                                                                                      // 1087
	    // Always unsets auto save to keep only one $watch handler.                                                      // 1088
	    self._unsetAutoClientSave();                                                                                     // 1089
                                                                                                                      // 1090
	    self._hRegAutoBind = $rootScope.$watch(function () {                                                             // 1091
	      return self;                                                                                                   // 1092
	    }, function (nItems, oItems) {                                                                                   // 1093
	      if (nItems === oItems) return;                                                                                 // 1094
                                                                                                                      // 1095
	      var changes = diffArray.getChanges(self, oItems, self._diffArrayFunc);                                         // 1096
	      self._unsetAutoClientSave();                                                                                   // 1097
	      self._saveChanges(changes);                                                                                    // 1098
	      self._setAutoClientSave();                                                                                     // 1099
	    }, true);                                                                                                        // 1100
	  };                                                                                                                 // 1101
                                                                                                                      // 1102
	  AngularMeteorCollection._saveChanges = function (changes) {                                                        // 1103
	    var self = this;                                                                                                 // 1104
                                                                                                                      // 1105
	    // Saves added documents                                                                                         // 1106
	    // Using reversed iteration to prevent indexes from changing during splice                                       // 1107
	    var addedDocs = changes.added.reverse().map(function (descriptor) {                                              // 1108
	      self.splice(descriptor.index, 1);                                                                              // 1109
	      return descriptor.item;                                                                                        // 1110
	    });                                                                                                              // 1111
                                                                                                                      // 1112
	    if (addedDocs.length) self.save(addedDocs);                                                                      // 1113
                                                                                                                      // 1114
	    // Removes deleted documents                                                                                     // 1115
	    var removedDocs = changes.removed.map(function (descriptor) {                                                    // 1116
	      return descriptor.item;                                                                                        // 1117
	    });                                                                                                              // 1118
                                                                                                                      // 1119
	    if (removedDocs.length) self.remove(removedDocs);                                                                // 1120
                                                                                                                      // 1121
	    // Updates changed documents                                                                                     // 1122
	    changes.changed.forEach(function (descriptor) {                                                                  // 1123
	      self._updateDiff(descriptor.selector, descriptor.modifier);                                                    // 1124
	    });                                                                                                              // 1125
	  };                                                                                                                 // 1126
                                                                                                                      // 1127
	  return AngularMeteorCollection;                                                                                    // 1128
	}]);                                                                                                                 // 1129
                                                                                                                      // 1130
	angularMeteorCollection.factory('$meteorCollectionFS', ['$meteorCollection', 'diffArray', '$angularMeteorSettings', function ($meteorCollection, diffArray, $angularMeteorSettings) {
	  function $meteorCollectionFS(reactiveFunc, autoClientSave, collection) {                                           // 1132
                                                                                                                      // 1133
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteorCollectionFS] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/files. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	    return new $meteorCollection(reactiveFunc, autoClientSave, collection, diffArray.shallow);                       // 1135
	  }                                                                                                                  // 1136
                                                                                                                      // 1137
	  return $meteorCollectionFS;                                                                                        // 1138
	}]);                                                                                                                 // 1139
                                                                                                                      // 1140
	angularMeteorCollection.factory('$meteorCollection', ['AngularMeteorCollection', '$rootScope', 'diffArray', function (AngularMeteorCollection, $rootScope, diffArray) {
	  function $meteorCollection(reactiveFunc, autoClientSave, collection, diffFn) {                                     // 1142
	    // Validate parameters                                                                                           // 1143
	    if (!reactiveFunc) {                                                                                             // 1144
	      throw new TypeError('The first argument of $meteorCollection is undefined.');                                  // 1145
	    }                                                                                                                // 1146
                                                                                                                      // 1147
	    if (!(angular.isFunction(reactiveFunc) || angular.isFunction(reactiveFunc.find))) {                              // 1148
	      throw new TypeError('The first argument of $meteorCollection must be a function or ' + 'a have a find function property.');
	    }                                                                                                                // 1150
                                                                                                                      // 1151
	    if (!angular.isFunction(reactiveFunc)) {                                                                         // 1152
	      collection = angular.isDefined(collection) ? collection : reactiveFunc;                                        // 1153
	      reactiveFunc = _underscore2.default.bind(reactiveFunc.find, reactiveFunc);                                     // 1154
	    }                                                                                                                // 1155
                                                                                                                      // 1156
	    // By default auto save - true.                                                                                  // 1157
	    autoClientSave = angular.isDefined(autoClientSave) ? autoClientSave : true;                                      // 1158
	    diffFn = diffFn || diffArray;                                                                                    // 1159
	    return new AngularMeteorCollection(reactiveFunc, collection, diffFn, autoClientSave);                            // 1160
	  }                                                                                                                  // 1161
                                                                                                                      // 1162
	  return $meteorCollection;                                                                                          // 1163
	}]);                                                                                                                 // 1164
                                                                                                                      // 1165
	angularMeteorCollection.run(['$rootScope', '$meteorCollection', '$meteorCollectionFS', '$meteorStopper', function ($rootScope, $meteorCollection, $meteorCollectionFS, $meteorStopper) {
	  var scopeProto = Object.getPrototypeOf($rootScope);                                                                // 1167
	  scopeProto.$meteorCollection = $meteorStopper($meteorCollection);                                                  // 1168
	  scopeProto.$meteorCollectionFS = $meteorStopper($meteorCollectionFS);                                              // 1169
	}]);                                                                                                                 // 1170
                                                                                                                      // 1171
/***/ }),                                                                                                             // 1172
/* 10 */                                                                                                              // 1173
/***/ (function(module, exports, __webpack_require__) {                                                               // 1174
                                                                                                                      // 1175
	'use strict';                                                                                                        // 1176
                                                                                                                      // 1177
	var _underscore = __webpack_require__(2);                                                                            // 1178
                                                                                                                      // 1179
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1180
                                                                                                                      // 1181
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1182
                                                                                                                      // 1183
	'use strict'; /*global                                                                                               // 1184
	                angular, _, Mongo                                                                                    // 1185
	              */                                                                                                     // 1186
                                                                                                                      // 1187
	var angularMeteorObject = angular.module('angular-meteor.object', ['angular-meteor.utils', 'angular-meteor.subscribe', 'angular-meteor.collection', 'getUpdates', 'diffArray', 'angular-meteor.settings']);
                                                                                                                      // 1189
	angularMeteorObject.factory('AngularMeteorObject', ['$q', '$meteorSubscribe', '$meteorUtils', 'diffArray', 'getUpdates', 'AngularMeteorCollection', '$angularMeteorSettings', function ($q, $meteorSubscribe, $meteorUtils, diffArray, getUpdates, AngularMeteorCollection, $angularMeteorSettings) {
                                                                                                                      // 1191
	  // A list of internals properties to not watch for, nor pass to the Document on update and etc.                    // 1192
	  AngularMeteorObject.$$internalProps = ['$$collection', '$$options', '$$id', '$$hashkey', '$$internalProps', '$$scope', 'bind', 'save', 'reset', 'subscribe', 'stop', 'autorunComputation', 'unregisterAutoBind', 'unregisterAutoDestroy', 'getRawObject', '_auto', '_setAutos', '_eventEmitter', '_serverBackup', '_updateDiff', '_updateParallel', '_getId'];
                                                                                                                      // 1194
	  function AngularMeteorObject(collection, selector, options) {                                                      // 1195
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteorObject] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/meteorObject. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	    // Make data not be an object so we can extend it to preserve                                                    // 1197
	    // Collection Helpers and the like                                                                               // 1198
	    var helpers = collection._helpers;                                                                               // 1199
	    var data = _underscore2.default.isFunction(helpers) ? Object.create(helpers.prototype) : {};                     // 1200
	    var doc = collection.findOne(selector, options);                                                                 // 1201
	    var collectionExtension = _underscore2.default.pick(AngularMeteorCollection, '_updateParallel');                 // 1202
	    _underscore2.default.extend(data, doc);                                                                          // 1203
	    _underscore2.default.extend(data, AngularMeteorObject);                                                          // 1204
	    _underscore2.default.extend(data, collectionExtension);                                                          // 1205
                                                                                                                      // 1206
	    // Omit options that may spoil document finding                                                                  // 1207
	    data.$$options = _underscore2.default.omit(options, 'skip', 'limit');                                            // 1208
	    data.$$collection = collection;                                                                                  // 1209
	    data.$$id = data._getId(selector);                                                                               // 1210
	    data._serverBackup = doc || {};                                                                                  // 1211
                                                                                                                      // 1212
	    return data;                                                                                                     // 1213
	  }                                                                                                                  // 1214
                                                                                                                      // 1215
	  AngularMeteorObject.getRawObject = function () {                                                                   // 1216
	    return angular.copy(_underscore2.default.omit(this, this.$$internalProps));                                      // 1217
	  };                                                                                                                 // 1218
                                                                                                                      // 1219
	  AngularMeteorObject.subscribe = function () {                                                                      // 1220
	    $meteorSubscribe.subscribe.apply(this, arguments);                                                               // 1221
	    return this;                                                                                                     // 1222
	  };                                                                                                                 // 1223
                                                                                                                      // 1224
	  AngularMeteorObject.save = function (custom) {                                                                     // 1225
	    var deferred = $q.defer();                                                                                       // 1226
	    var collection = this.$$collection;                                                                              // 1227
	    var createFulfill = _underscore2.default.partial($meteorUtils.fulfill, deferred, null);                          // 1228
	    var oldDoc = collection.findOne(this.$$id);                                                                      // 1229
	    var mods;                                                                                                        // 1230
                                                                                                                      // 1231
	    // update                                                                                                        // 1232
	    if (oldDoc) {                                                                                                    // 1233
	      if (custom) mods = { $set: custom };else {                                                                     // 1234
	        mods = getUpdates(oldDoc, this.getRawObject());                                                              // 1235
	        // If there are no updates, there is nothing to do here, returning                                           // 1236
	        if (_underscore2.default.isEmpty(mods)) {                                                                    // 1237
	          return $q.when({ action: 'updated' });                                                                     // 1238
	        }                                                                                                            // 1239
	      }                                                                                                              // 1240
                                                                                                                      // 1241
	      // NOTE: do not use #upsert() method, since it does not exist in some collections                              // 1242
	      this._updateDiff(mods, createFulfill({ action: 'updated' }));                                                  // 1243
	    }                                                                                                                // 1244
	    // insert                                                                                                        // 1245
	    else {                                                                                                           // 1246
	        if (custom) mods = _underscore2.default.clone(custom);else mods = this.getRawObject();                       // 1247
                                                                                                                      // 1248
	        mods._id = mods._id || this.$$id;                                                                            // 1249
	        collection.insert(mods, createFulfill({ action: 'inserted' }));                                              // 1250
	      }                                                                                                              // 1251
                                                                                                                      // 1252
	    return deferred.promise;                                                                                         // 1253
	  };                                                                                                                 // 1254
                                                                                                                      // 1255
	  AngularMeteorObject._updateDiff = function (update, callback) {                                                    // 1256
	    var selector = this.$$id;                                                                                        // 1257
	    AngularMeteorCollection._updateDiff.call(this, selector, update, callback);                                      // 1258
	  };                                                                                                                 // 1259
                                                                                                                      // 1260
	  AngularMeteorObject.reset = function (keepClientProps) {                                                           // 1261
	    var self = this;                                                                                                 // 1262
	    var options = this.$$options;                                                                                    // 1263
	    var id = this.$$id;                                                                                              // 1264
	    var doc = this.$$collection.findOne(id, options);                                                                // 1265
                                                                                                                      // 1266
	    if (doc) {                                                                                                       // 1267
	      // extend SubObject                                                                                            // 1268
	      var docKeys = _underscore2.default.keys(doc);                                                                  // 1269
	      var docExtension = _underscore2.default.pick(doc, docKeys);                                                    // 1270
	      var clientProps;                                                                                               // 1271
                                                                                                                      // 1272
	      _underscore2.default.extend(self, docExtension);                                                               // 1273
	      _underscore2.default.extend(self._serverBackup, docExtension);                                                 // 1274
                                                                                                                      // 1275
	      if (keepClientProps) {                                                                                         // 1276
	        clientProps = _underscore2.default.intersection(_underscore2.default.keys(self), _underscore2.default.keys(self._serverBackup));
	      } else {                                                                                                       // 1278
	        clientProps = _underscore2.default.keys(self);                                                               // 1279
	      }                                                                                                              // 1280
                                                                                                                      // 1281
	      var serverProps = _underscore2.default.keys(doc);                                                              // 1282
	      var removedKeys = _underscore2.default.difference(clientProps, serverProps, self.$$internalProps);             // 1283
                                                                                                                      // 1284
	      removedKeys.forEach(function (prop) {                                                                          // 1285
	        delete self[prop];                                                                                           // 1286
	        delete self._serverBackup[prop];                                                                             // 1287
	      });                                                                                                            // 1288
	    } else {                                                                                                         // 1289
	      _underscore2.default.keys(this.getRawObject()).forEach(function (prop) {                                       // 1290
	        delete self[prop];                                                                                           // 1291
	      });                                                                                                            // 1292
                                                                                                                      // 1293
	      self._serverBackup = {};                                                                                       // 1294
	    }                                                                                                                // 1295
	  };                                                                                                                 // 1296
                                                                                                                      // 1297
	  AngularMeteorObject.stop = function () {                                                                           // 1298
	    if (this.unregisterAutoDestroy) this.unregisterAutoDestroy();                                                    // 1299
                                                                                                                      // 1300
	    if (this.unregisterAutoBind) this.unregisterAutoBind();                                                          // 1301
                                                                                                                      // 1302
	    if (this.autorunComputation && this.autorunComputation.stop) this.autorunComputation.stop();                     // 1303
	  };                                                                                                                 // 1304
                                                                                                                      // 1305
	  AngularMeteorObject._getId = function (selector) {                                                                 // 1306
	    var options = _underscore2.default.extend({}, this.$$options, {                                                  // 1307
	      fields: { _id: 1 },                                                                                            // 1308
	      reactive: false,                                                                                               // 1309
	      transform: null                                                                                                // 1310
	    });                                                                                                              // 1311
                                                                                                                      // 1312
	    var doc = this.$$collection.findOne(selector, options);                                                          // 1313
                                                                                                                      // 1314
	    if (doc) return doc._id;                                                                                         // 1315
	    if (selector instanceof Mongo.ObjectID) return selector;                                                         // 1316
	    if (_underscore2.default.isString(selector)) return selector;                                                    // 1317
	    return new Mongo.ObjectID();                                                                                     // 1318
	  };                                                                                                                 // 1319
                                                                                                                      // 1320
	  return AngularMeteorObject;                                                                                        // 1321
	}]);                                                                                                                 // 1322
                                                                                                                      // 1323
	angularMeteorObject.factory('$meteorObject', ['$rootScope', '$meteorUtils', 'getUpdates', 'AngularMeteorObject', function ($rootScope, $meteorUtils, getUpdates, AngularMeteorObject) {
	  function $meteorObject(collection, id, auto, options) {                                                            // 1325
	    // Validate parameters                                                                                           // 1326
	    if (!collection) {                                                                                               // 1327
	      throw new TypeError("The first argument of $meteorObject is undefined.");                                      // 1328
	    }                                                                                                                // 1329
                                                                                                                      // 1330
	    if (!angular.isFunction(collection.findOne)) {                                                                   // 1331
	      throw new TypeError("The first argument of $meteorObject must be a function or a have a findOne function property.");
	    }                                                                                                                // 1333
                                                                                                                      // 1334
	    var data = new AngularMeteorObject(collection, id, options);                                                     // 1335
	    // Making auto default true - http://stackoverflow.com/a/15464208/1426570                                        // 1336
	    data._auto = auto !== false;                                                                                     // 1337
	    _underscore2.default.extend(data, $meteorObject);                                                                // 1338
	    data._setAutos();                                                                                                // 1339
	    return data;                                                                                                     // 1340
	  }                                                                                                                  // 1341
                                                                                                                      // 1342
	  $meteorObject._setAutos = function () {                                                                            // 1343
	    var self = this;                                                                                                 // 1344
                                                                                                                      // 1345
	    this.autorunComputation = $meteorUtils.autorun($rootScope, function () {                                         // 1346
	      self.reset(true);                                                                                              // 1347
	    });                                                                                                              // 1348
                                                                                                                      // 1349
	    // Deep watches the model and performs autobind                                                                  // 1350
	    this.unregisterAutoBind = this._auto && $rootScope.$watch(function () {                                          // 1351
	      return self.getRawObject();                                                                                    // 1352
	    }, function (item, oldItem) {                                                                                    // 1353
	      if (item !== oldItem) self.save();                                                                             // 1354
	    }, true);                                                                                                        // 1355
                                                                                                                      // 1356
	    this.unregisterAutoDestroy = $rootScope.$on('$destroy', function () {                                            // 1357
	      if (self && self.stop) self.stop();                                                                            // 1358
	    });                                                                                                              // 1359
	  };                                                                                                                 // 1360
                                                                                                                      // 1361
	  return $meteorObject;                                                                                              // 1362
	}]);                                                                                                                 // 1363
                                                                                                                      // 1364
	angularMeteorObject.run(['$rootScope', '$meteorObject', '$meteorStopper', function ($rootScope, $meteorObject, $meteorStopper) {
	  var scopeProto = Object.getPrototypeOf($rootScope);                                                                // 1366
	  scopeProto.$meteorObject = $meteorStopper($meteorObject);                                                          // 1367
	}]);                                                                                                                 // 1368
                                                                                                                      // 1369
/***/ }),                                                                                                             // 1370
/* 11 */                                                                                                              // 1371
/***/ (function(module, exports, __webpack_require__) {                                                               // 1372
                                                                                                                      // 1373
	'use strict';                                                                                                        // 1374
                                                                                                                      // 1375
	var _underscore = __webpack_require__(2);                                                                            // 1376
                                                                                                                      // 1377
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1378
                                                                                                                      // 1379
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1380
                                                                                                                      // 1381
	'use strict'; /*global                                                                                               // 1382
	               angular, _, Package, Meteor                                                                           // 1383
	               */                                                                                                    // 1384
                                                                                                                      // 1385
	var angularMeteorUser = angular.module('angular-meteor.user', ['angular-meteor.utils', 'angular-meteor.core', 'angular-meteor.settings']);
                                                                                                                      // 1387
	// requires package 'accounts-password'                                                                              // 1388
	angularMeteorUser.service('$meteorUser', ['$rootScope', '$meteorUtils', '$q', '$angularMeteorSettings', function ($rootScope, $meteorUtils, $q, $angularMeteorSettings) {
                                                                                                                      // 1390
	  var pack = Package['accounts-base'];                                                                               // 1391
	  if (!pack) return;                                                                                                 // 1392
                                                                                                                      // 1393
	  var self = this;                                                                                                   // 1394
	  var Accounts = pack.Accounts;                                                                                      // 1395
                                                                                                                      // 1396
	  this.waitForUser = function () {                                                                                   // 1397
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.waitForUser] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://info.meteor.com/blog/angular-meteor-1.3. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1399
	    var deferred = $q.defer();                                                                                       // 1400
                                                                                                                      // 1401
	    $meteorUtils.autorun($rootScope, function () {                                                                   // 1402
	      if (!Meteor.loggingIn()) deferred.resolve(Meteor.user());                                                      // 1403
	    }, true);                                                                                                        // 1404
                                                                                                                      // 1405
	    return deferred.promise;                                                                                         // 1406
	  };                                                                                                                 // 1407
                                                                                                                      // 1408
	  this.requireUser = function () {                                                                                   // 1409
	    if (!$angularMeteorSettings.suppressWarnings) {                                                                  // 1410
	      console.warn('[angular-meteor.requireUser] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://info.meteor.com/blog/angular-meteor-1.3. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	    }                                                                                                                // 1412
                                                                                                                      // 1413
	    var deferred = $q.defer();                                                                                       // 1414
                                                                                                                      // 1415
	    $meteorUtils.autorun($rootScope, function () {                                                                   // 1416
	      if (!Meteor.loggingIn()) {                                                                                     // 1417
	        if (Meteor.user() === null) deferred.reject("AUTH_REQUIRED");else deferred.resolve(Meteor.user());           // 1418
	      }                                                                                                              // 1419
	    }, true);                                                                                                        // 1420
                                                                                                                      // 1421
	    return deferred.promise;                                                                                         // 1422
	  };                                                                                                                 // 1423
                                                                                                                      // 1424
	  this.requireValidUser = function (validatorFn) {                                                                   // 1425
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.requireValidUser] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://info.meteor.com/blog/angular-meteor-1.3. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1427
	    return self.requireUser(true).then(function (user) {                                                             // 1428
	      var valid = validatorFn(user);                                                                                 // 1429
                                                                                                                      // 1430
	      if (valid === true) return user;else if (typeof valid === "string") return $q.reject(valid);else return $q.reject("FORBIDDEN");
	    });                                                                                                              // 1432
	  };                                                                                                                 // 1433
                                                                                                                      // 1434
	  this.loginWithPassword = $meteorUtils.promissor(Meteor, 'loginWithPassword');                                      // 1435
	  this.createUser = $meteorUtils.promissor(Accounts, 'createUser');                                                  // 1436
	  this.changePassword = $meteorUtils.promissor(Accounts, 'changePassword');                                          // 1437
	  this.forgotPassword = $meteorUtils.promissor(Accounts, 'forgotPassword');                                          // 1438
	  this.resetPassword = $meteorUtils.promissor(Accounts, 'resetPassword');                                            // 1439
	  this.verifyEmail = $meteorUtils.promissor(Accounts, 'verifyEmail');                                                // 1440
	  this.logout = $meteorUtils.promissor(Meteor, 'logout');                                                            // 1441
	  this.logoutOtherClients = $meteorUtils.promissor(Meteor, 'logoutOtherClients');                                    // 1442
	  this.loginWithFacebook = $meteorUtils.promissor(Meteor, 'loginWithFacebook');                                      // 1443
	  this.loginWithTwitter = $meteorUtils.promissor(Meteor, 'loginWithTwitter');                                        // 1444
	  this.loginWithGoogle = $meteorUtils.promissor(Meteor, 'loginWithGoogle');                                          // 1445
	  this.loginWithGithub = $meteorUtils.promissor(Meteor, 'loginWithGithub');                                          // 1446
	  this.loginWithMeteorDeveloperAccount = $meteorUtils.promissor(Meteor, 'loginWithMeteorDeveloperAccount');          // 1447
	  this.loginWithMeetup = $meteorUtils.promissor(Meteor, 'loginWithMeetup');                                          // 1448
	  this.loginWithWeibo = $meteorUtils.promissor(Meteor, 'loginWithWeibo');                                            // 1449
	}]);                                                                                                                 // 1450
                                                                                                                      // 1451
	angularMeteorUser.run(['$rootScope', '$angularMeteorSettings', '$$Core', function ($rootScope, $angularMeteorSettings, $$Core) {
                                                                                                                      // 1453
	  var ScopeProto = Object.getPrototypeOf($rootScope);                                                                // 1454
	  _underscore2.default.extend(ScopeProto, $$Core);                                                                   // 1455
                                                                                                                      // 1456
	  $rootScope.autorun(function () {                                                                                   // 1457
	    if (!Meteor.user) return;                                                                                        // 1458
	    $rootScope.currentUser = Meteor.user();                                                                          // 1459
	    $rootScope.loggingIn = Meteor.loggingIn();                                                                       // 1460
	  });                                                                                                                // 1461
	}]);                                                                                                                 // 1462
                                                                                                                      // 1463
/***/ }),                                                                                                             // 1464
/* 12 */                                                                                                              // 1465
/***/ (function(module, exports, __webpack_require__) {                                                               // 1466
                                                                                                                      // 1467
	'use strict';                                                                                                        // 1468
                                                                                                                      // 1469
	var _underscore = __webpack_require__(2);                                                                            // 1470
                                                                                                                      // 1471
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1472
                                                                                                                      // 1473
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1474
                                                                                                                      // 1475
	'use strict'; /*global                                                                                               // 1476
	               angular, _, Meteor                                                                                    // 1477
	               */                                                                                                    // 1478
                                                                                                                      // 1479
	var angularMeteorMethods = angular.module('angular-meteor.methods', ['angular-meteor.utils', 'angular-meteor.settings']);
                                                                                                                      // 1481
	angularMeteorMethods.service('$meteorMethods', ['$q', '$meteorUtils', '$angularMeteorSettings', function ($q, $meteorUtils, $angularMeteorSettings) {
	  this.call = function () {                                                                                          // 1483
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.$meteor.call] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/methods. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1485
	    var deferred = $q.defer();                                                                                       // 1486
	    var fulfill = $meteorUtils.fulfill(deferred);                                                                    // 1487
	    var args = _underscore2.default.toArray(arguments).concat(fulfill);                                              // 1488
	    Meteor.call.apply(this, args);                                                                                   // 1489
	    return deferred.promise;                                                                                         // 1490
	  };                                                                                                                 // 1491
	}]);                                                                                                                 // 1492
                                                                                                                      // 1493
/***/ }),                                                                                                             // 1494
/* 13 */                                                                                                              // 1495
/***/ (function(module, exports) {                                                                                    // 1496
                                                                                                                      // 1497
	/*global                                                                                                             // 1498
	 angular, Session                                                                                                    // 1499
	 */                                                                                                                  // 1500
                                                                                                                      // 1501
	'use strict';                                                                                                        // 1502
                                                                                                                      // 1503
	var angularMeteorSession = angular.module('angular-meteor.session', ['angular-meteor.utils', 'angular-meteor.settings']);
                                                                                                                      // 1505
	angularMeteorSession.factory('$meteorSession', ['$meteorUtils', '$parse', '$angularMeteorSettings', function ($meteorUtils, $parse, $angularMeteorSettings) {
	  return function (session) {                                                                                        // 1507
                                                                                                                      // 1508
	    return {                                                                                                         // 1509
                                                                                                                      // 1510
	      bind: function bind(scope, model) {                                                                            // 1511
	        if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.session.bind] Please note that this method is deprecated since 1.3.0 and will be removed in 1.4.0! http://www.angular-meteor.com/api/1.3.0/session. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1513
	        var getter = $parse(model);                                                                                  // 1514
	        var setter = getter.assign;                                                                                  // 1515
	        $meteorUtils.autorun(scope, function () {                                                                    // 1516
	          setter(scope, Session.get(session));                                                                       // 1517
	        });                                                                                                          // 1518
                                                                                                                      // 1519
	        scope.$watch(model, function (newItem, oldItem) {                                                            // 1520
	          Session.set(session, getter(scope));                                                                       // 1521
	        }, true);                                                                                                    // 1522
	      }                                                                                                              // 1523
	    };                                                                                                               // 1524
	  };                                                                                                                 // 1525
	}]);                                                                                                                 // 1526
                                                                                                                      // 1527
/***/ }),                                                                                                             // 1528
/* 14 */                                                                                                              // 1529
/***/ (function(module, exports) {                                                                                    // 1530
                                                                                                                      // 1531
	/*global                                                                                                             // 1532
	 angular, Package                                                                                                    // 1533
	 */                                                                                                                  // 1534
                                                                                                                      // 1535
	'use strict';                                                                                                        // 1536
                                                                                                                      // 1537
	var angularMeteorCamera = angular.module('angular-meteor.camera', ['angular-meteor.utils', 'angular-meteor.settings']);
                                                                                                                      // 1539
	// requires package 'mdg:camera'                                                                                     // 1540
	angularMeteorCamera.service('$meteorCamera', ['$q', '$meteorUtils', '$angularMeteorSettings', function ($q, $meteorUtils, $angularMeteorSettings) {
	  if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.camera] Please note that this module has moved to a separate package and is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/camera. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
	  var pack = Package['mdg:camera'];                                                                                  // 1543
	  if (!pack) return;                                                                                                 // 1544
                                                                                                                      // 1545
	  var MeteorCamera = pack.MeteorCamera;                                                                              // 1546
                                                                                                                      // 1547
	  this.getPicture = function (options) {                                                                             // 1548
	    if (!$angularMeteorSettings.suppressWarnings) console.warn('[angular-meteor.camera] Please note that this module has moved to a separate package and is deprecated since 1.3.0 and will be removed in 1.4.0! For more info: http://www.angular-meteor.com/api/1.3.0/camera. You can disable this warning by following this guide http://www.angular-meteor.com/api/1.3.6/settings');
                                                                                                                      // 1550
	    options = options || {};                                                                                         // 1551
	    var deferred = $q.defer();                                                                                       // 1552
	    MeteorCamera.getPicture(options, $meteorUtils.fulfill(deferred));                                                // 1553
	    return deferred.promise;                                                                                         // 1554
	  };                                                                                                                 // 1555
	}]);                                                                                                                 // 1556
                                                                                                                      // 1557
/***/ }),                                                                                                             // 1558
/* 15 */                                                                                                              // 1559
/***/ (function(module, exports) {                                                                                    // 1560
                                                                                                                      // 1561
	/*global                                                                                                             // 1562
	 angular                                                                                                             // 1563
	 */                                                                                                                  // 1564
                                                                                                                      // 1565
	'use strict';                                                                                                        // 1566
                                                                                                                      // 1567
	var angularMeteorStopper = angular.module('angular-meteor.stopper', ['angular-meteor.subscribe']);                   // 1568
                                                                                                                      // 1569
	angularMeteorStopper.factory('$meteorStopper', ['$q', '$meteorSubscribe', function ($q, $meteorSubscribe) {          // 1570
	  function $meteorStopper($meteorEntity) {                                                                           // 1571
	    return function () {                                                                                             // 1572
	      var args = Array.prototype.slice.call(arguments);                                                              // 1573
	      var meteorEntity = $meteorEntity.apply(this, args);                                                            // 1574
                                                                                                                      // 1575
	      angular.extend(meteorEntity, $meteorStopper);                                                                  // 1576
	      meteorEntity.$$scope = this;                                                                                   // 1577
                                                                                                                      // 1578
	      this.$on('$destroy', function () {                                                                             // 1579
	        meteorEntity.stop();                                                                                         // 1580
	        if (meteorEntity.subscription) meteorEntity.subscription.stop();                                             // 1581
	      });                                                                                                            // 1582
                                                                                                                      // 1583
	      return meteorEntity;                                                                                           // 1584
	    };                                                                                                               // 1585
	  }                                                                                                                  // 1586
                                                                                                                      // 1587
	  $meteorStopper.subscribe = function () {                                                                           // 1588
	    var args = Array.prototype.slice.call(arguments);                                                                // 1589
	    this.subscription = $meteorSubscribe._subscribe(this.$$scope, $q.defer(), args);                                 // 1590
	    return this;                                                                                                     // 1591
	  };                                                                                                                 // 1592
                                                                                                                      // 1593
	  return $meteorStopper;                                                                                             // 1594
	}]);                                                                                                                 // 1595
                                                                                                                      // 1596
/***/ }),                                                                                                             // 1597
/* 16 */                                                                                                              // 1598
/***/ (function(module, exports, __webpack_require__) {                                                               // 1599
                                                                                                                      // 1600
	'use strict';                                                                                                        // 1601
                                                                                                                      // 1602
	Object.defineProperty(exports, "__esModule", {                                                                       // 1603
	  value: true                                                                                                        // 1604
	});                                                                                                                  // 1605
	exports.utils = exports.name = undefined;                                                                            // 1606
                                                                                                                      // 1607
	var _underscore = __webpack_require__(2);                                                                            // 1608
                                                                                                                      // 1609
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1610
                                                                                                                      // 1611
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1612
                                                                                                                      // 1613
	var name = exports.name = 'angular-meteor.utilities';                                                                // 1614
	var utils = exports.utils = '$$utils';                                                                               // 1615
                                                                                                                      // 1616
	angular.module(name, [])                                                                                             // 1617
                                                                                                                      // 1618
	/*                                                                                                                   // 1619
	  A utility service which is provided with general utility functions                                                 // 1620
	 */                                                                                                                  // 1621
	.service(utils, ['$rootScope', function ($rootScope) {                                                               // 1622
	  var self = this;                                                                                                   // 1623
                                                                                                                      // 1624
	  // Checks if an object is a cursor                                                                                 // 1625
	  this.isCursor = function (obj) {                                                                                   // 1626
	    return obj instanceof Meteor.Collection.Cursor;                                                                  // 1627
	  };                                                                                                                 // 1628
                                                                                                                      // 1629
	  // Cheecks if an object is a scope                                                                                 // 1630
	  this.isScope = function (obj) {                                                                                    // 1631
	    return obj instanceof $rootScope.constructor;                                                                    // 1632
	  };                                                                                                                 // 1633
                                                                                                                      // 1634
	  // Checks if an object is a view model                                                                             // 1635
	  this.isViewModel = function (obj) {                                                                                // 1636
	    return _underscore2.default.isObject(obj) && obj.$$dependencies;                                                 // 1637
	  };                                                                                                                 // 1638
                                                                                                                      // 1639
	  // Checks if two objects are siblings                                                                              // 1640
	  this.areSiblings = function (obj1, obj2) {                                                                         // 1641
	    return _underscore2.default.isObject(obj1) && _underscore2.default.isObject(obj2) && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
	  };                                                                                                                 // 1643
                                                                                                                      // 1644
	  // Binds function into a scpecified context. If an object is provided, will bind every                             // 1645
	  // value in the object which is a function. If a tap function is provided, it will be                              // 1646
	  // called right after the function has been invoked.                                                               // 1647
	  this.bind = function (fn, context, tap) {                                                                          // 1648
	    tap = _underscore2.default.isFunction(tap) ? tap : angular.noop;                                                 // 1649
	    if (_underscore2.default.isFunction(fn)) return bindFn(fn, context, tap);                                        // 1650
	    if (_underscore2.default.isObject(fn)) return bindObj(fn, context, tap);                                         // 1651
	    return fn;                                                                                                       // 1652
	  };                                                                                                                 // 1653
                                                                                                                      // 1654
	  function bindFn(fn, context, tap) {                                                                                // 1655
	    return function () {                                                                                             // 1656
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                         // 1657
	        args[_key] = arguments[_key];                                                                                // 1658
	      }                                                                                                              // 1659
                                                                                                                      // 1660
	      var result = fn.apply(context, args);                                                                          // 1661
	      tap.call(context, {                                                                                            // 1662
	        result: result,                                                                                              // 1663
	        args: args                                                                                                   // 1664
	      });                                                                                                            // 1665
	      return result;                                                                                                 // 1666
	    };                                                                                                               // 1667
	  }                                                                                                                  // 1668
                                                                                                                      // 1669
	  function bindObj(obj, context, tap) {                                                                              // 1670
	    return _underscore2.default.keys(obj).reduce(function (bound, k) {                                               // 1671
	      bound[k] = self.bind(obj[k], context, tap);                                                                    // 1672
	      return bound;                                                                                                  // 1673
	    }, {});                                                                                                          // 1674
	  }                                                                                                                  // 1675
	}]);                                                                                                                 // 1676
                                                                                                                      // 1677
/***/ }),                                                                                                             // 1678
/* 17 */                                                                                                              // 1679
/***/ (function(module, exports, __webpack_require__) {                                                               // 1680
                                                                                                                      // 1681
	'use strict';                                                                                                        // 1682
                                                                                                                      // 1683
	Object.defineProperty(exports, "__esModule", {                                                                       // 1684
	  value: true                                                                                                        // 1685
	});                                                                                                                  // 1686
	exports.Mixer = exports.name = undefined;                                                                            // 1687
                                                                                                                      // 1688
	var _underscore = __webpack_require__(2);                                                                            // 1689
                                                                                                                      // 1690
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1691
                                                                                                                      // 1692
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1693
                                                                                                                      // 1694
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
                                                                                                                      // 1696
	var name = exports.name = 'angular-meteor.mixer';                                                                    // 1697
	var Mixer = exports.Mixer = '$Mixer';                                                                                // 1698
                                                                                                                      // 1699
	angular.module(name, [])                                                                                             // 1700
                                                                                                                      // 1701
	/*                                                                                                                   // 1702
	  A service which lets us apply mixins into Scope.prototype.                                                         // 1703
	  The flow is simple. Once we define a mixin, it will be stored in the `$Mixer`,                                     // 1704
	  and any time a `ChildScope` prototype is created                                                                   // 1705
	  it will be extended by the `$Mixer`.                                                                               // 1706
	  This concept is good because it keeps our code                                                                     // 1707
	  clean and simple, and easy to extend.                                                                              // 1708
	  So any time we would like to define a new behaviour to our scope,                                                  // 1709
	  we will just use the `$Mixer` service.                                                                             // 1710
	 */                                                                                                                  // 1711
	.service(Mixer, function () {                                                                                        // 1712
	  var _this = this;                                                                                                  // 1713
                                                                                                                      // 1714
	  // Used to store method's caller                                                                                   // 1715
	  var caller = void 0;                                                                                               // 1716
                                                                                                                      // 1717
	  this._mixins = [];                                                                                                 // 1718
	  // Apply mixins automatically on specified contexts                                                                // 1719
	  this._autoExtend = [];                                                                                             // 1720
	  this._autoConstruct = [];                                                                                          // 1721
                                                                                                                      // 1722
	  // Adds a new mixin                                                                                                // 1723
	  this.mixin = function (mixin) {                                                                                    // 1724
	    if (!_underscore2.default.isObject(mixin)) {                                                                     // 1725
	      throw Error('argument 1 must be an object');                                                                   // 1726
	    }                                                                                                                // 1727
                                                                                                                      // 1728
	    _this._mixins = _underscore2.default.union(_this._mixins, [mixin]);                                              // 1729
	    // Apply mixins to stored contexts                                                                               // 1730
	    _this._autoExtend.forEach(function (context) {                                                                   // 1731
	      return _this._extend(context);                                                                                 // 1732
	    });                                                                                                              // 1733
	    _this._autoConstruct.forEach(function (context) {                                                                // 1734
	      return _this._construct(context);                                                                              // 1735
	    });                                                                                                              // 1736
	    return _this;                                                                                                    // 1737
	  };                                                                                                                 // 1738
                                                                                                                      // 1739
	  // Removes a mixin. Useful mainly for test purposes                                                                // 1740
	  this._mixout = function (mixin) {                                                                                  // 1741
	    _this._mixins = _underscore2.default.without(_this._mixins, mixin);                                              // 1742
	    return _this;                                                                                                    // 1743
	  };                                                                                                                 // 1744
                                                                                                                      // 1745
	  // Invoke function mixins with the provided context and arguments                                                  // 1746
	  this._construct = function (context) {                                                                             // 1747
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {        // 1748
	      args[_key - 1] = arguments[_key];                                                                              // 1749
	    }                                                                                                                // 1750
                                                                                                                      // 1751
	    _this._mixins.filter(_underscore2.default.isFunction).forEach(function (mixin) {                                 // 1752
	      mixin.call.apply(mixin, [context].concat(args));                                                               // 1753
	    });                                                                                                              // 1754
                                                                                                                      // 1755
	    return context;                                                                                                  // 1756
	  };                                                                                                                 // 1757
                                                                                                                      // 1758
	  // Extend prototype with the defined mixins                                                                        // 1759
	  this._extend = function (obj, options) {                                                                           // 1760
	    var _$defaults = _underscore2.default.defaults({}, options, {                                                    // 1761
	      pattern: /.*/ }),                                                                                              // 1762
	        pattern = _$defaults.pattern,                                                                                // 1763
	        context = _$defaults.context;                                                                                // 1764
                                                                                                                      // 1765
	    var mixins = _this._mixins.map(function (mixin) {                                                                // 1766
	      // Filtering the keys by the specified pattern                                                                 // 1767
	      var keys = _underscore2.default.keys(mixin).filter(function (k) {                                              // 1768
	        return k.match(pattern);                                                                                     // 1769
	      }).filter(function (k) {                                                                                       // 1770
	        return _underscore2.default.isFunction(mixin[k]);                                                            // 1771
	      });                                                                                                            // 1772
                                                                                                                      // 1773
	      return keys.reduce(function (boundMixin, methodName) {                                                         // 1774
	        var methodHandler = mixin[methodName];                                                                       // 1775
                                                                                                                      // 1776
	        // Note that this is not an arrow function so we can conserve the conetxt                                    // 1777
	        boundMixin[methodName] = function () {                                                                       // 1778
	          // Storing original caller so we will know who actually called the                                         // 1779
	          // method event though it is bound to another context                                                      // 1780
	          var methodContext = context || this;                                                                       // 1781
	          var recentCaller = caller;                                                                                 // 1782
	          caller = this;                                                                                             // 1783
                                                                                                                      // 1784
	          try {                                                                                                      // 1785
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {             // 1786
	              args[_key2] = arguments[_key2];                                                                        // 1787
	            }                                                                                                        // 1788
                                                                                                                      // 1789
	            return methodHandler.apply(methodContext, args);                                                         // 1790
	          } finally {                                                                                                // 1791
	            // No matter what happens, restore variable to the previous one                                          // 1792
	            caller = recentCaller;                                                                                   // 1793
	          }                                                                                                          // 1794
	        };                                                                                                           // 1795
                                                                                                                      // 1796
	        return boundMixin;                                                                                           // 1797
	      }, {});                                                                                                        // 1798
	    });                                                                                                              // 1799
                                                                                                                      // 1800
	    return _underscore2.default.extend.apply(_underscore2.default, [obj].concat(_toConsumableArray(mixins)));        // 1801
	  };                                                                                                                 // 1802
                                                                                                                      // 1803
	  // Caller property can not be set                                                                                  // 1804
	  Object.defineProperty(this, 'caller', {                                                                            // 1805
	    configurable: true,                                                                                              // 1806
	    enumerable: true,                                                                                                // 1807
                                                                                                                      // 1808
	    get: function get() {                                                                                            // 1809
	      return caller;                                                                                                 // 1810
	    }                                                                                                                // 1811
	  });                                                                                                                // 1812
	});                                                                                                                  // 1813
                                                                                                                      // 1814
/***/ }),                                                                                                             // 1815
/* 18 */                                                                                                              // 1816
/***/ (function(module, exports, __webpack_require__) {                                                               // 1817
                                                                                                                      // 1818
	'use strict';                                                                                                        // 1819
                                                                                                                      // 1820
	Object.defineProperty(exports, "__esModule", {                                                                       // 1821
	  value: true                                                                                                        // 1822
	});                                                                                                                  // 1823
	exports.name = undefined;                                                                                            // 1824
                                                                                                                      // 1825
	var _mixer = __webpack_require__(17);                                                                                // 1826
                                                                                                                      // 1827
	var name = exports.name = 'angular-meteor.scope';                                                                    // 1828
                                                                                                                      // 1829
	angular.module(name, [_mixer.name]).run(['$rootScope', _mixer.Mixer, function ($rootScope, $Mixer) {                 // 1830
	  var Scope = $rootScope.constructor;                                                                                // 1831
	  var $new = $rootScope.$new;                                                                                        // 1832
                                                                                                                      // 1833
	  // Apply extensions whether a mixin in defined.                                                                    // 1834
	  // Note that this way mixins which are initialized later                                                           // 1835
	  // can be applied on rootScope.                                                                                    // 1836
	  $Mixer._autoExtend.push(Scope.prototype);                                                                          // 1837
	  $Mixer._autoConstruct.push($rootScope);                                                                            // 1838
                                                                                                                      // 1839
	  Scope.prototype.$new = function () {                                                                               // 1840
	    var scope = $new.apply(this, arguments);                                                                         // 1841
	    // Apply constructors to newly created scopes                                                                    // 1842
	    return $Mixer._construct(scope);                                                                                 // 1843
	  };                                                                                                                 // 1844
	}]);                                                                                                                 // 1845
                                                                                                                      // 1846
/***/ }),                                                                                                             // 1847
/* 19 */                                                                                                              // 1848
/***/ (function(module, exports, __webpack_require__) {                                                               // 1849
                                                                                                                      // 1850
	'use strict';                                                                                                        // 1851
                                                                                                                      // 1852
	Object.defineProperty(exports, "__esModule", {                                                                       // 1853
	  value: true                                                                                                        // 1854
	});                                                                                                                  // 1855
	exports.Core = exports.name = undefined;                                                                             // 1856
                                                                                                                      // 1857
	var _underscore = __webpack_require__(2);                                                                            // 1858
                                                                                                                      // 1859
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 1860
                                                                                                                      // 1861
	var _utils = __webpack_require__(16);                                                                                // 1862
                                                                                                                      // 1863
	var _mixer = __webpack_require__(17);                                                                                // 1864
                                                                                                                      // 1865
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 1866
                                                                                                                      // 1867
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
                                                                                                                      // 1869
	var name = exports.name = 'angular-meteor.core';                                                                     // 1870
	var Core = exports.Core = '$$Core';                                                                                  // 1871
                                                                                                                      // 1872
	angular.module(name, [_utils.name, _mixer.name])                                                                     // 1873
                                                                                                                      // 1874
	/*                                                                                                                   // 1875
	  A mixin which provides us with core Meteor functions.                                                              // 1876
	 */                                                                                                                  // 1877
	.factory(Core, ['$q', _utils.utils, _mixer.Mixer, function ($q, $$utils, $Mixer) {                                   // 1878
	  function $$Core() {}                                                                                               // 1879
                                                                                                                      // 1880
	  // Calls Meteor.autorun() which will be digested after each run and automatically destroyed                        // 1881
	  $$Core.autorun = function (fn) {                                                                                   // 1882
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};                            // 1883
                                                                                                                      // 1884
	    fn = this.$bindToContext($Mixer.caller, fn);                                                                     // 1885
                                                                                                                      // 1886
	    if (!_underscore2.default.isFunction(fn)) {                                                                      // 1887
	      throw Error('argument 1 must be a function');                                                                  // 1888
	    }                                                                                                                // 1889
	    if (!_underscore2.default.isObject(options)) {                                                                   // 1890
	      throw Error('argument 2 must be an object');                                                                   // 1891
	    }                                                                                                                // 1892
                                                                                                                      // 1893
	    var computation = Tracker.autorun(fn, options);                                                                  // 1894
	    // Reset to a function that will also stop the listener we just added                                            // 1895
	    computation.stop = this.$$autoStop(computation);                                                                 // 1896
	    return computation;                                                                                              // 1897
	  };                                                                                                                 // 1898
                                                                                                                      // 1899
	  // Calls Meteor.subscribe() which will be digested after each invokation                                           // 1900
	  // and automatically destroyed                                                                                     // 1901
	  $$Core.subscribe = function (subName, fn, cb) {                                                                    // 1902
	    fn = this.$bindToContext($Mixer.caller, fn || angular.noop);                                                     // 1903
	    cb = cb ? this.$bindToContext($Mixer.caller, cb) : angular.noop;                                                 // 1904
                                                                                                                      // 1905
	    // Additional callbacks specific for this library                                                                // 1906
	    // onStart - right after Meteor.subscribe()                                                                      // 1907
	    var hooks = {                                                                                                    // 1908
	      onStart: angular.noop                                                                                          // 1909
	    };                                                                                                               // 1910
                                                                                                                      // 1911
	    if (!_underscore2.default.isString(subName)) {                                                                   // 1912
	      throw Error('argument 1 must be a string');                                                                    // 1913
	    }                                                                                                                // 1914
	    if (!_underscore2.default.isFunction(fn)) {                                                                      // 1915
	      throw Error('argument 2 must be a function');                                                                  // 1916
	    }                                                                                                                // 1917
	    if (!_underscore2.default.isFunction(cb) && !_underscore2.default.isObject(cb)) {                                // 1918
	      throw Error('argument 3 must be a function or an object');                                                     // 1919
	    }                                                                                                                // 1920
                                                                                                                      // 1921
	    if (_underscore2.default.isObject(cb)) {                                                                         // 1922
	      for (var hook in hooks) {                                                                                      // 1923
	        if (hooks.hasOwnProperty(hook) && cb[hook]) {                                                                // 1924
	          // Don't use any of additional callbacks in Meteor.subscribe                                               // 1925
	          hooks[hook] = cb[hook];                                                                                    // 1926
	          delete cb[hook];                                                                                           // 1927
	        }                                                                                                            // 1928
	      }                                                                                                              // 1929
	    }                                                                                                                // 1930
                                                                                                                      // 1931
	    var result = {};                                                                                                 // 1932
                                                                                                                      // 1933
	    var computation = this.autorun(function () {                                                                     // 1934
	      var _Meteor;                                                                                                   // 1935
                                                                                                                      // 1936
	      var args = fn();                                                                                               // 1937
	      if (angular.isUndefined(args)) args = [];                                                                      // 1938
                                                                                                                      // 1939
	      if (!_underscore2.default.isArray(args)) {                                                                     // 1940
	        throw Error('reactive function\'s return value must be an array');                                           // 1941
	      }                                                                                                              // 1942
                                                                                                                      // 1943
	      var subscription = (_Meteor = Meteor).subscribe.apply(_Meteor, [subName].concat(_toConsumableArray(args), [cb]));
                                                                                                                      // 1945
	      hooks.onStart();                                                                                               // 1946
                                                                                                                      // 1947
	      result.ready = subscription.ready.bind(subscription);                                                          // 1948
	      result.subscriptionId = subscription.subscriptionId;                                                           // 1949
	    });                                                                                                              // 1950
                                                                                                                      // 1951
	    // Once the computation has been stopped,                                                                        // 1952
	    // any subscriptions made inside will be stopped as well                                                         // 1953
	    result.stop = computation.stop.bind(computation);                                                                // 1954
	    return result;                                                                                                   // 1955
	  };                                                                                                                 // 1956
                                                                                                                      // 1957
	  // Calls Meteor.call() wrapped by a digestion cycle                                                                // 1958
	  $$Core.callMethod = function () {                                                                                  // 1959
	    var _Meteor2;                                                                                                    // 1960
                                                                                                                      // 1961
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                           // 1962
	      args[_key] = arguments[_key];                                                                                  // 1963
	    }                                                                                                                // 1964
                                                                                                                      // 1965
	    var fn = args.pop();                                                                                             // 1966
	    if (_underscore2.default.isFunction(fn)) fn = this.$bindToContext($Mixer.caller, fn);                            // 1967
	    return (_Meteor2 = Meteor).call.apply(_Meteor2, args.concat([fn]));                                              // 1968
	  };                                                                                                                 // 1969
                                                                                                                      // 1970
	  // Calls Meteor.apply() wrapped by a digestion cycle                                                               // 1971
	  $$Core.applyMethod = function () {                                                                                 // 1972
	    var _Meteor3;                                                                                                    // 1973
                                                                                                                      // 1974
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {                     // 1975
	      args[_key2] = arguments[_key2];                                                                                // 1976
	    }                                                                                                                // 1977
                                                                                                                      // 1978
	    var fn = args.pop();                                                                                             // 1979
	    if (_underscore2.default.isFunction(fn)) fn = this.$bindToContext($Mixer.caller, fn);                            // 1980
	    return (_Meteor3 = Meteor).apply.apply(_Meteor3, args.concat([fn]));                                             // 1981
	  };                                                                                                                 // 1982
                                                                                                                      // 1983
	  // Stops a process once the scope has been destroyed                                                               // 1984
	  $$Core.$$autoStop = function (stoppable) {                                                                         // 1985
	    var removeListener = void 0;                                                                                     // 1986
	    var baseStop = stoppable.stop.bind(stoppable);                                                                   // 1987
                                                                                                                      // 1988
	    // Once the process has been stopped the destroy event listener will be removed                                  // 1989
	    // to avoid memory leaks and unexpected behaviours                                                               // 1990
	    var stop = function stop() {                                                                                     // 1991
	      removeListener();                                                                                              // 1992
	      return baseStop.apply(undefined, arguments);                                                                   // 1993
	    };                                                                                                               // 1994
                                                                                                                      // 1995
	    removeListener = this.$on('$destroy', stop);                                                                     // 1996
	    return stop;                                                                                                     // 1997
	  };                                                                                                                 // 1998
                                                                                                                      // 1999
	  // Digests scope only if there is no phase at the moment                                                           // 2000
	  $$Core.$$throttledDigest = function () {                                                                           // 2001
	    var _this = this;                                                                                                // 2002
                                                                                                                      // 2003
	    var isDigestable = !this.$$destroyed && !this.$$phase && !this.$root.$$phase;                                    // 2004
                                                                                                                      // 2005
	    if (isDigestable) {                                                                                              // 2006
	      // If a digest cycle in one autorun triggers another autorun,                                                  // 2007
	      // we want to run this second autorun in a non-reactive manner.                                                // 2008
	      // thus preventing inner autoruns from being dependent on their parents.                                       // 2009
	      Tracker.nonreactive(function () {                                                                              // 2010
	        return _this.$digest();                                                                                      // 2011
	      });                                                                                                            // 2012
	    }                                                                                                                // 2013
	  };                                                                                                                 // 2014
                                                                                                                      // 2015
	  // Creates a promise only that the digestion cycle will be called at its fulfillment                               // 2016
	  $$Core.$$defer = function () {                                                                                     // 2017
	    var deferred = $q.defer();                                                                                       // 2018
	    // Once promise has been fulfilled, digest                                                                       // 2019
	    deferred.promise = deferred.promise.finally(this.$$throttledDigest.bind(this));                                  // 2020
	    return deferred;                                                                                                 // 2021
	  };                                                                                                                 // 2022
                                                                                                                      // 2023
	  // Binds an object or a function to the provided context and digest it once it is invoked                          // 2024
	  $$Core.$bindToContext = function (context, fn) {                                                                   // 2025
	    if (_underscore2.default.isFunction(context)) {                                                                  // 2026
	      fn = context;                                                                                                  // 2027
	      context = this;                                                                                                // 2028
	    }                                                                                                                // 2029
                                                                                                                      // 2030
	    return $$utils.bind(fn, context, this.$$throttledDigest.bind(this));                                             // 2031
	  };                                                                                                                 // 2032
                                                                                                                      // 2033
	  return $$Core;                                                                                                     // 2034
	}]);                                                                                                                 // 2035
                                                                                                                      // 2036
/***/ }),                                                                                                             // 2037
/* 20 */                                                                                                              // 2038
/***/ (function(module, exports, __webpack_require__) {                                                               // 2039
                                                                                                                      // 2040
	'use strict';                                                                                                        // 2041
                                                                                                                      // 2042
	Object.defineProperty(exports, "__esModule", {                                                                       // 2043
	  value: true                                                                                                        // 2044
	});                                                                                                                  // 2045
	exports.reactive = exports.ViewModel = exports.name = undefined;                                                     // 2046
                                                                                                                      // 2047
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
                                                                                                                      // 2049
	var _underscore = __webpack_require__(2);                                                                            // 2050
                                                                                                                      // 2051
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 2052
                                                                                                                      // 2053
	var _utils = __webpack_require__(16);                                                                                // 2054
                                                                                                                      // 2055
	var _mixer = __webpack_require__(17);                                                                                // 2056
                                                                                                                      // 2057
	var _core = __webpack_require__(19);                                                                                 // 2058
                                                                                                                      // 2059
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 2060
                                                                                                                      // 2061
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
                                                                                                                      // 2063
	var name = exports.name = 'angular-meteor.view-model';                                                               // 2064
	var ViewModel = exports.ViewModel = '$$ViewModel';                                                                   // 2065
	var reactive = exports.reactive = '$reactive';                                                                       // 2066
                                                                                                                      // 2067
	angular.module(name, [_utils.name, _mixer.name, _core.name])                                                         // 2068
                                                                                                                      // 2069
	/*                                                                                                                   // 2070
	  A mixin which lets us bind a view model into a scope.                                                              // 2071
	  Note that only a single view model can be bound,                                                                   // 2072
	  otherwise the scope might behave unexpectedly.                                                                     // 2073
	  Mainly used to define the controller as the view model,                                                            // 2074
	  and very useful when wanting to use Angular's `controllerAs` syntax.                                               // 2075
	 */                                                                                                                  // 2076
	.factory(ViewModel, [_utils.utils, _mixer.Mixer, function ($$utils, $Mixer) {                                        // 2077
	  function $$ViewModel() {}                                                                                          // 2078
                                                                                                                      // 2079
	  // Gets an object, wraps it with scope functions and returns it                                                    // 2080
	  $$ViewModel.viewModel = function (vm) {                                                                            // 2081
	    if (!_underscore2.default.isObject(vm)) {                                                                        // 2082
	      throw Error('argument 1 must be an object');                                                                   // 2083
	    }                                                                                                                // 2084
                                                                                                                      // 2085
	    // Extend view model with mixin functions                                                                        // 2086
	    $Mixer._extend(vm, {                                                                                             // 2087
	      pattern: /^(?!\$\$).*$/, // Omitting methods which start with a $$ notation                                    // 2088
	      context: this // Binding methods to scope                                                                      // 2089
	    });                                                                                                              // 2090
                                                                                                                      // 2091
	    // Apply mixin constructors on scope with view model                                                             // 2092
	    $Mixer._construct(this, vm);                                                                                     // 2093
	    return vm;                                                                                                       // 2094
	  };                                                                                                                 // 2095
                                                                                                                      // 2096
	  return $$ViewModel;                                                                                                // 2097
	}])                                                                                                                  // 2098
                                                                                                                      // 2099
	/*                                                                                                                   // 2100
	  Illustrates the old API where a view model is created using $reactive service                                      // 2101
	 */                                                                                                                  // 2102
	.service(reactive, [_utils.utils, function ($$utils) {                                                               // 2103
	  var Reactive = function () {                                                                                       // 2104
	    function Reactive(vm) {                                                                                          // 2105
	      var _this = this;                                                                                              // 2106
                                                                                                                      // 2107
	      _classCallCheck(this, Reactive);                                                                               // 2108
                                                                                                                      // 2109
	      if (!_underscore2.default.isObject(vm)) {                                                                      // 2110
	        throw Error('argument 1 must be an object');                                                                 // 2111
	      }                                                                                                              // 2112
                                                                                                                      // 2113
	      _underscore2.default.defer(function () {                                                                       // 2114
	        if (!_this._attached) {                                                                                      // 2115
	          console.warn('view model was not attached to any scope');                                                  // 2116
	        }                                                                                                            // 2117
	      });                                                                                                            // 2118
                                                                                                                      // 2119
	      this._vm = vm;                                                                                                 // 2120
	    }                                                                                                                // 2121
                                                                                                                      // 2122
	    _createClass(Reactive, [{                                                                                        // 2123
	      key: 'attach',                                                                                                 // 2124
	      value: function attach(scope) {                                                                                // 2125
	        this._attached = true;                                                                                       // 2126
                                                                                                                      // 2127
	        if (!$$utils.isScope(scope)) {                                                                               // 2128
	          throw Error('argument 1 must be a scope');                                                                 // 2129
	        }                                                                                                            // 2130
                                                                                                                      // 2131
	        var viewModel = scope.viewModel(this._vm);                                                                   // 2132
                                                                                                                      // 2133
	        // Similar to the old/Meteor API                                                                             // 2134
	        viewModel.call = viewModel.callMethod;                                                                       // 2135
	        viewModel.apply = viewModel.applyMethod;                                                                     // 2136
                                                                                                                      // 2137
	        return viewModel;                                                                                            // 2138
	      }                                                                                                              // 2139
	    }]);                                                                                                             // 2140
                                                                                                                      // 2141
	    return Reactive;                                                                                                 // 2142
	  }();                                                                                                               // 2143
                                                                                                                      // 2144
	  return function (vm) {                                                                                             // 2145
	    return new Reactive(vm);                                                                                         // 2146
	  };                                                                                                                 // 2147
	}]);                                                                                                                 // 2148
                                                                                                                      // 2149
/***/ }),                                                                                                             // 2150
/* 21 */                                                                                                              // 2151
/***/ (function(module, exports, __webpack_require__) {                                                               // 2152
                                                                                                                      // 2153
	'use strict';                                                                                                        // 2154
                                                                                                                      // 2155
	Object.defineProperty(exports, "__esModule", {                                                                       // 2156
	  value: true                                                                                                        // 2157
	});                                                                                                                  // 2158
	exports.Reactive = exports.name = undefined;                                                                         // 2159
                                                                                                                      // 2160
	var _jsondiffpatch = __webpack_require__(22);                                                                        // 2161
                                                                                                                      // 2162
	var _jsondiffpatch2 = _interopRequireDefault(_jsondiffpatch);                                                        // 2163
                                                                                                                      // 2164
	var _underscore = __webpack_require__(2);                                                                            // 2165
                                                                                                                      // 2166
	var _underscore2 = _interopRequireDefault(_underscore);                                                              // 2167
                                                                                                                      // 2168
	var _utils = __webpack_require__(16);                                                                                // 2169
                                                                                                                      // 2170
	var _mixer = __webpack_require__(17);                                                                                // 2171
                                                                                                                      // 2172
	var _core = __webpack_require__(19);                                                                                 // 2173
                                                                                                                      // 2174
	var _viewModel = __webpack_require__(20);                                                                            // 2175
                                                                                                                      // 2176
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }                      // 2177
                                                                                                                      // 2178
	var name = exports.name = 'angular-meteor.reactive';                                                                 // 2179
	var Reactive = exports.Reactive = '$$Reactive';                                                                      // 2180
                                                                                                                      // 2181
	angular.module(name, [_utils.name, _mixer.name, _core.name, _viewModel.name])                                        // 2182
                                                                                                                      // 2183
	/*                                                                                                                   // 2184
	  A mixin which enhance our reactive abilities by providing methods                                                  // 2185
	  that are capable of updating our scope reactively.                                                                 // 2186
	 */                                                                                                                  // 2187
	.factory(Reactive, ['$parse', _utils.utils, _mixer.Mixer, function ($parse, $$utils, $Mixer) {                       // 2188
	  function $$Reactive() {                                                                                            // 2189
	    var vm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;                               // 2190
                                                                                                                      // 2191
	    // Helps us track changes made in the view model                                                                 // 2192
	    vm.$$dependencies = {};                                                                                          // 2193
	  }                                                                                                                  // 2194
                                                                                                                      // 2195
	  // Gets an object containing functions and define their results as reactive properties.                            // 2196
	  // Once a return value has been changed the property will be reset.                                                // 2197
	  $$Reactive.helpers = function (vm, props) {                                                                        // 2198
	    var _this = this;                                                                                                // 2199
                                                                                                                      // 2200
	    if ($$utils.isViewModel(vm)) {                                                                                   // 2201
	      if (!_underscore2.default.isObject(props)) {                                                                   // 2202
	        throw Error('argument 2 must be an object');                                                                 // 2203
	      }                                                                                                              // 2204
	    } else {                                                                                                         // 2205
	      props = vm;                                                                                                    // 2206
	      vm = $Mixer.caller;                                                                                            // 2207
                                                                                                                      // 2208
	      if (!_underscore2.default.isObject(props)) {                                                                   // 2209
	        throw Error('argument 1 must be an object');                                                                 // 2210
	      }                                                                                                              // 2211
	    }                                                                                                                // 2212
                                                                                                                      // 2213
	    _underscore2.default.each(props, function (v, k) {                                                               // 2214
	      if (!_underscore2.default.isFunction(v)) {                                                                     // 2215
	        throw Error('helper \'' + k + '\' must be a function');                                                      // 2216
	      }                                                                                                              // 2217
	    });                                                                                                              // 2218
                                                                                                                      // 2219
	    _underscore2.default.each(props, function (v, k) {                                                               // 2220
	      if (!vm.$$dependencies[k]) {                                                                                   // 2221
	        // Registers a new dependency to the specified helper                                                        // 2222
	        vm.$$dependencies[k] = new Tracker.Dependency();                                                             // 2223
	      }                                                                                                              // 2224
                                                                                                                      // 2225
	      _this.$$setFnHelper(vm, k, v);                                                                                 // 2226
	    });                                                                                                              // 2227
	  };                                                                                                                 // 2228
                                                                                                                      // 2229
	  // Gets a model reactively                                                                                         // 2230
	  $$Reactive.getReactively = function (vm, k, isDeep) {                                                              // 2231
	    if ($$utils.isViewModel(vm)) {                                                                                   // 2232
	      if (angular.isUndefined(isDeep)) isDeep = false;                                                               // 2233
                                                                                                                      // 2234
	      if (!_underscore2.default.isString(k)) {                                                                       // 2235
	        throw Error('argument 2 must be a string');                                                                  // 2236
	      }                                                                                                              // 2237
	      if (!_underscore2.default.isBoolean(isDeep)) {                                                                 // 2238
	        throw Error('argument 3 must be a boolean');                                                                 // 2239
	      }                                                                                                              // 2240
	    } else {                                                                                                         // 2241
	      isDeep = angular.isDefined(k) ? k : false;                                                                     // 2242
	      k = vm;                                                                                                        // 2243
	      vm = $Mixer.caller;                                                                                            // 2244
                                                                                                                      // 2245
	      if (!_underscore2.default.isString(k)) {                                                                       // 2246
	        throw Error('argument 1 must be a string');                                                                  // 2247
	      }                                                                                                              // 2248
	      if (!_underscore2.default.isBoolean(isDeep)) {                                                                 // 2249
	        throw Error('argument 2 must be a boolean');                                                                 // 2250
	      }                                                                                                              // 2251
	    }                                                                                                                // 2252
                                                                                                                      // 2253
	    return this.$$reactivateEntity(vm, k, this.$watch, isDeep);                                                      // 2254
	  };                                                                                                                 // 2255
                                                                                                                      // 2256
	  // Gets a collection reactively                                                                                    // 2257
	  $$Reactive.getCollectionReactively = function (vm, k) {                                                            // 2258
	    if ($$utils.isViewModel(vm)) {                                                                                   // 2259
	      if (!_underscore2.default.isString(k)) {                                                                       // 2260
	        throw Error('argument 2 must be a string');                                                                  // 2261
	      }                                                                                                              // 2262
	    } else {                                                                                                         // 2263
	      k = vm;                                                                                                        // 2264
	      vm = $Mixer.caller;                                                                                            // 2265
                                                                                                                      // 2266
	      if (!_underscore2.default.isString(k)) {                                                                       // 2267
	        throw Error('argument 1 must be a string');                                                                  // 2268
	      }                                                                                                              // 2269
	    }                                                                                                                // 2270
                                                                                                                      // 2271
	    return this.$$reactivateEntity(vm, k, this.$watchCollection);                                                    // 2272
	  };                                                                                                                 // 2273
                                                                                                                      // 2274
	  // Gets an entity reactively, and once it has been changed the computation will be recomputed                      // 2275
	  $$Reactive.$$reactivateEntity = function (vm, k, watcher) {                                                        // 2276
	    if (!vm.$$dependencies[k]) {                                                                                     // 2277
	      vm.$$dependencies[k] = new Tracker.Dependency();                                                               // 2278
                                                                                                                      // 2279
	      for (var _len = arguments.length, watcherArgs = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	        watcherArgs[_key - 3] = arguments[_key];                                                                     // 2281
	      }                                                                                                              // 2282
                                                                                                                      // 2283
	      this.$$watchEntity.apply(this, [vm, k, watcher].concat(watcherArgs));                                          // 2284
	    }                                                                                                                // 2285
                                                                                                                      // 2286
	    vm.$$dependencies[k].depend();                                                                                   // 2287
	    return $parse(k)(vm);                                                                                            // 2288
	  };                                                                                                                 // 2289
                                                                                                                      // 2290
	  // Watches for changes in the view model, and if so will notify a change                                           // 2291
	  $$Reactive.$$watchEntity = function (vm, k, watcher) {                                                             // 2292
	    var _this2 = this;                                                                                               // 2293
                                                                                                                      // 2294
	    // Gets a deep property from the caller                                                                          // 2295
	    var getVal = _underscore2.default.partial($parse(k), vm);                                                        // 2296
	    var initialVal = getVal();                                                                                       // 2297
                                                                                                                      // 2298
	    // Watches for changes in the view model                                                                         // 2299
                                                                                                                      // 2300
	    for (var _len2 = arguments.length, watcherArgs = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
	      watcherArgs[_key2 - 3] = arguments[_key2];                                                                     // 2302
	    }                                                                                                                // 2303
                                                                                                                      // 2304
	    watcher.call.apply(watcher, [this, getVal, function (val, oldVal) {                                              // 2305
	      var hasChanged = val !== initialVal || val !== oldVal;                                                         // 2306
                                                                                                                      // 2307
	      // Notify if a change has been detected                                                                        // 2308
	      if (hasChanged) _this2.$$changed(vm, k);                                                                       // 2309
	    }].concat(watcherArgs));                                                                                         // 2310
	  };                                                                                                                 // 2311
                                                                                                                      // 2312
	  // Invokes a function and sets the return value as a property                                                      // 2313
	  $$Reactive.$$setFnHelper = function (vm, k, fn) {                                                                  // 2314
	    var _this3 = this;                                                                                               // 2315
                                                                                                                      // 2316
	    var activeObservation = null;                                                                                    // 2317
	    var lastModel = null;                                                                                            // 2318
	    var lastModelData = [];                                                                                          // 2319
                                                                                                                      // 2320
	    this.autorun(function () /* computation */{                                                                      // 2321
	      // Invokes the reactive functon                                                                                // 2322
	      var model = fn.apply(vm);                                                                                      // 2323
                                                                                                                      // 2324
	      // Ignore notifications made by the following handler                                                          // 2325
	      Tracker.nonreactive(function () {                                                                              // 2326
	        // If a cursor, observe its changes and update acoordingly                                                   // 2327
	        if ($$utils.isCursor(model)) {                                                                               // 2328
	          var modelData = void 0;                                                                                    // 2329
                                                                                                                      // 2330
	          if (angular.isUndefined(vm[k])) {                                                                          // 2331
	            _this3.$$setValHelper(vm, k, [], false);                                                                 // 2332
	          }                                                                                                          // 2333
                                                                                                                      // 2334
	          if (activeObservation) {                                                                                   // 2335
	            lastModelData = lastModel.fetch();                                                                       // 2336
	            activeObservation.stop();                                                                                // 2337
	            activeObservation = null;                                                                                // 2338
	          }                                                                                                          // 2339
                                                                                                                      // 2340
	          var handle = _this3.$$handleCursor(vm, k, model);                                                          // 2341
                                                                                                                      // 2342
	          activeObservation = handle.observation;                                                                    // 2343
	          modelData = handle.data;                                                                                   // 2344
                                                                                                                      // 2345
	          if (lastModelData.length !== 0) {                                                                          // 2346
	            var diff = _jsondiffpatch2.default.diff(lastModelData, modelData);                                       // 2347
	            vm[k] = _jsondiffpatch2.default.patch(lastModelData, diff);                                              // 2348
	          } else {                                                                                                   // 2349
	            vm[k] = modelData;                                                                                       // 2350
	          }                                                                                                          // 2351
                                                                                                                      // 2352
	          lastModel = model;                                                                                         // 2353
	          lastModelData = modelData;                                                                                 // 2354
                                                                                                                      // 2355
	          /* computation.onInvalidate(() => {                                                                        // 2356
	            activeObservation.stop();                                                                                // 2357
	          });*/                                                                                                      // 2358
	        } else {                                                                                                     // 2359
	          _this3.$$handleNonCursor(vm, k, model);                                                                    // 2360
	        }                                                                                                            // 2361
                                                                                                                      // 2362
	        // Notify change and update the view model                                                                   // 2363
	        _this3.$$changed(vm, k);                                                                                     // 2364
	      });                                                                                                            // 2365
	    });                                                                                                              // 2366
	  };                                                                                                                 // 2367
                                                                                                                      // 2368
	  // Sets a value helper as a setter and a getter which will notify computations once used                           // 2369
	  $$Reactive.$$setValHelper = function (vm, k, v) {                                                                  // 2370
	    var _this4 = this;                                                                                               // 2371
                                                                                                                      // 2372
	    var watch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;                            // 2373
                                                                                                                      // 2374
	    // If set, reactives property                                                                                    // 2375
	    if (watch) {                                                                                                     // 2376
	      var isDeep = _underscore2.default.isObject(v);                                                                 // 2377
	      this.getReactively(vm, k, isDeep);                                                                             // 2378
	    }                                                                                                                // 2379
                                                                                                                      // 2380
	    Object.defineProperty(vm, k, {                                                                                   // 2381
	      configurable: true,                                                                                            // 2382
	      enumerable: true,                                                                                              // 2383
                                                                                                                      // 2384
	      get: function get() {                                                                                          // 2385
	        return v;                                                                                                    // 2386
	      },                                                                                                             // 2387
	      set: function set(newVal) {                                                                                    // 2388
	        v = newVal;                                                                                                  // 2389
	        _this4.$$changed(vm, k);                                                                                     // 2390
	      }                                                                                                              // 2391
	    });                                                                                                              // 2392
	  };                                                                                                                 // 2393
                                                                                                                      // 2394
	  // Fetching a cursor and updates properties once the result set has been changed                                   // 2395
	  $$Reactive.$$handleCursor = function (vm, k, cursor) {                                                             // 2396
	    var _this5 = this;                                                                                               // 2397
                                                                                                                      // 2398
	    var data = [];                                                                                                   // 2399
	    // Observe changes made in the result set                                                                        // 2400
	    var observation = cursor.observe({                                                                               // 2401
	      addedAt: function addedAt(doc, atIndex) {                                                                      // 2402
	        if (!observation) {                                                                                          // 2403
	          data.push(doc);                                                                                            // 2404
	          return;                                                                                                    // 2405
	        }                                                                                                            // 2406
	        vm[k].splice(atIndex, 0, doc);                                                                               // 2407
	        _this5.$$changed(vm, k);                                                                                     // 2408
	      },                                                                                                             // 2409
	      changedAt: function changedAt(doc, oldDoc, atIndex) {                                                          // 2410
	        var diff = _jsondiffpatch2.default.diff(vm[k][atIndex], doc);                                                // 2411
	        _jsondiffpatch2.default.patch(vm[k][atIndex], diff);                                                         // 2412
	        _this5.$$changed(vm, k);                                                                                     // 2413
	      },                                                                                                             // 2414
	      movedTo: function movedTo(doc, fromIndex, toIndex) {                                                           // 2415
	        vm[k].splice(fromIndex, 1);                                                                                  // 2416
	        vm[k].splice(toIndex, 0, doc);                                                                               // 2417
	        _this5.$$changed(vm, k);                                                                                     // 2418
	      },                                                                                                             // 2419
	      removedAt: function removedAt(oldDoc, atIndex) {                                                               // 2420
	        vm[k].splice(atIndex, 1);                                                                                    // 2421
	        _this5.$$changed(vm, k);                                                                                     // 2422
	      }                                                                                                              // 2423
	    });                                                                                                              // 2424
                                                                                                                      // 2425
	    return {                                                                                                         // 2426
	      observation: observation,                                                                                      // 2427
	      data: data                                                                                                     // 2428
	    };                                                                                                               // 2429
	  };                                                                                                                 // 2430
                                                                                                                      // 2431
	  $$Reactive.$$handleNonCursor = function (vm, k, data) {                                                            // 2432
	    var v = vm[k];                                                                                                   // 2433
                                                                                                                      // 2434
	    if (angular.isDefined(v)) {                                                                                      // 2435
	      delete vm[k];                                                                                                  // 2436
	      v = null;                                                                                                      // 2437
	    }                                                                                                                // 2438
                                                                                                                      // 2439
	    if (angular.isUndefined(v)) {                                                                                    // 2440
	      this.$$setValHelper(vm, k, data);                                                                              // 2441
	    }                                                                                                                // 2442
	    // Update property if the new value is from the same type                                                        // 2443
	    else if ($$utils.areSiblings(v, data)) {                                                                         // 2444
	        var diff = _jsondiffpatch2.default.diff(v, data);                                                            // 2445
	        _jsondiffpatch2.default.patch(v, diff);                                                                      // 2446
	        this.$$changed(vm, k);                                                                                       // 2447
	      } else {                                                                                                       // 2448
	        vm[k] = data;                                                                                                // 2449
	      }                                                                                                              // 2450
	  };                                                                                                                 // 2451
                                                                                                                      // 2452
	  // Notifies dependency in view model                                                                               // 2453
	  $$Reactive.$$depend = function (vm, k) {                                                                           // 2454
	    vm.$$dependencies[k].depend();                                                                                   // 2455
	  };                                                                                                                 // 2456
                                                                                                                      // 2457
	  // Notifies change in view model                                                                                   // 2458
	  $$Reactive.$$changed = function (vm, k) {                                                                          // 2459
	    this.$$throttledDigest();                                                                                        // 2460
	    vm.$$dependencies[k].changed();                                                                                  // 2461
	  };                                                                                                                 // 2462
                                                                                                                      // 2463
	  return $$Reactive;                                                                                                 // 2464
	}]);                                                                                                                 // 2465
                                                                                                                      // 2466
/***/ }),                                                                                                             // 2467
/* 22 */                                                                                                              // 2468
/***/ (function(module, exports) {                                                                                    // 2469
                                                                                                                      // 2470
	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;                                                                     // 2471
                                                                                                                      // 2472
/***/ }),                                                                                                             // 2473
/* 23 */                                                                                                              // 2474
/***/ (function(module, exports) {                                                                                    // 2475
                                                                                                                      // 2476
	'use strict';                                                                                                        // 2477
                                                                                                                      // 2478
	Object.defineProperty(exports, "__esModule", {                                                                       // 2479
	  value: true                                                                                                        // 2480
	});                                                                                                                  // 2481
	var name = exports.name = 'angular-templates';                                                                       // 2482
                                                                                                                      // 2483
	try {                                                                                                                // 2484
	  angular.module(name);                                                                                              // 2485
	} catch (e) {                                                                                                        // 2486
	  angular.module(name, []);                                                                                          // 2487
	}                                                                                                                    // 2488
                                                                                                                      // 2489
/***/ })                                                                                                              // 2490
/******/ ])                                                                                                           // 2491
});                                                                                                                   // 2492
;                                                                                                                     // 2493
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular-meteor-data'] = {};

})();
