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

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/angular_angular-messages/angular-messages.js                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
 * @license AngularJS v1.5.3                                                                                          // 2
 * (c) 2010-2016 Google, Inc. http://angularjs.org                                                                    // 3
 * License: MIT                                                                                                       // 4
 */                                                                                                                   // 5
(function(window, angular, undefined) {'use strict';                                                                  // 6
                                                                                                                      // 7
/* jshint ignore:start */                                                                                             // 8
// this code is in the core, but not in angular-messages.js                                                           // 9
var isArray = angular.isArray;                                                                                        // 10
var forEach = angular.forEach;                                                                                        // 11
var isString = angular.isString;                                                                                      // 12
var jqLite = angular.element;                                                                                         // 13
/* jshint ignore:end */                                                                                               // 14
                                                                                                                      // 15
/**                                                                                                                   // 16
 * @ngdoc module                                                                                                      // 17
 * @name ngMessages                                                                                                   // 18
 * @description                                                                                                       // 19
 *                                                                                                                    // 20
 * The `ngMessages` module provides enhanced support for displaying messages within templates                         // 21
 * (typically within forms or when rendering message objects that return key/value data).                             // 22
 * Instead of relying on JavaScript code and/or complex ng-if statements within your form template to                 // 23
 * show and hide error messages specific to the state of an input field, the `ngMessages` and                         // 24
 * `ngMessage` directives are designed to handle the complexity, inheritance and priority                             // 25
 * sequencing based on the order of how the messages are defined in the template.                                     // 26
 *                                                                                                                    // 27
 * Currently, the ngMessages module only contains the code for the `ngMessages`, `ngMessagesInclude`                  // 28
 * `ngMessage` and `ngMessageExp` directives.                                                                         // 29
 *                                                                                                                    // 30
 * # Usage                                                                                                            // 31
 * The `ngMessages` directive allows keys in a key/value collection to be associated with a child element             // 32
 * (or 'message') that will show or hide based on the truthiness of that key's value in the collection. A common use  // 33
 * case for `ngMessages` is to display error messages for inputs using the `$error` object exposed by the             // 34
 * {@link ngModel ngModel} directive.                                                                                 // 35
 *                                                                                                                    // 36
 * The child elements of the `ngMessages` directive are matched to the collection keys by a `ngMessage` or            // 37
 * `ngMessageExp` directive. The value of these attributes must match a key in the collection that is provided by     // 38
 * the `ngMessages` directive.                                                                                        // 39
 *                                                                                                                    // 40
 * Consider the following example, which illustrates a typical use case of `ngMessages`. Within the form `myForm` we  // 41
 * have a text input named `myField` which is bound to the scope variable `field` using the {@link ngModel ngModel}   // 42
 * directive.                                                                                                         // 43
 *                                                                                                                    // 44
 * The `myField` field is a required input of type `email` with a maximum length of 15 characters.                    // 45
 *                                                                                                                    // 46
 * ```html                                                                                                            // 47
 * <form name="myForm">                                                                                               // 48
 *   <label>                                                                                                          // 49
 *     Enter text:                                                                                                    // 50
 *     <input type="email" ng-model="field" name="myField" required maxlength="15" />                                 // 51
 *   </label>                                                                                                         // 52
 *   <div ng-messages="myForm.myField.$error" role="alert">                                                           // 53
 *     <div ng-message="required">Please enter a value for this field.</div>                                          // 54
 *     <div ng-message="email">This field must be a valid email address.</div>                                        // 55
 *     <div ng-message="maxlength">This field can be at most 15 characters long.</div>                                // 56
 *   </div>                                                                                                           // 57
 * </form>                                                                                                            // 58
 * ```                                                                                                                // 59
 *                                                                                                                    // 60
 * In order to show error messages corresponding to `myField` we first create an element with an `ngMessages` attribute
 * set to the `$error` object owned by the `myField` input in our `myForm` form.                                      // 62
 *                                                                                                                    // 63
 * Within this element we then create separate elements for each of the possible errors that `myField` could have.    // 64
 * The `ngMessage` attribute is used to declare which element(s) will appear for which error - for example,           // 65
 * setting `ng-message="required"` specifies that this particular element should be displayed when there              // 66
 * is no value present for the required field `myField` (because the key `required` will be `true` in the object      // 67
 * `myForm.myField.$error`).                                                                                          // 68
 *                                                                                                                    // 69
 * ### Message order                                                                                                  // 70
 *                                                                                                                    // 71
 * By default, `ngMessages` will only display one message for a particular key/value collection at any time. If more  // 72
 * than one message (or error) key is currently true, then which message is shown is determined by the order of messages
 * in the HTML template code (messages declared first are prioritised). This mechanism means the developer does not have
 * to prioritise messages using custom JavaScript code.                                                               // 75
 *                                                                                                                    // 76
 * Given the following error object for our example (which informs us that the field `myField` currently has both the
 * `required` and `email` errors):                                                                                    // 78
 *                                                                                                                    // 79
 * ```javascript                                                                                                      // 80
 * <!-- keep in mind that ngModel automatically sets these error flags -->                                            // 81
 * myField.$error = { required : true, email: true, maxlength: false };                                               // 82
 * ```                                                                                                                // 83
 * The `required` message will be displayed to the user since it appears before the `email` message in the DOM.       // 84
 * Once the user types a single character, the `required` message will disappear (since the field now has a value)    // 85
 * but the `email` message will be visible because it is still applicable.                                            // 86
 *                                                                                                                    // 87
 * ### Displaying multiple messages at the same time                                                                  // 88
 *                                                                                                                    // 89
 * While `ngMessages` will by default only display one error element at a time, the `ng-messages-multiple` attribute can
 * be applied to the `ngMessages` container element to cause it to display all applicable error messages at once:     // 91
 *                                                                                                                    // 92
 * ```html                                                                                                            // 93
 * <!-- attribute-style usage -->                                                                                     // 94
 * <div ng-messages="myForm.myField.$error" ng-messages-multiple>...</div>                                            // 95
 *                                                                                                                    // 96
 * <!-- element-style usage -->                                                                                       // 97
 * <ng-messages for="myForm.myField.$error" multiple>...</ng-messages>                                                // 98
 * ```                                                                                                                // 99
 *                                                                                                                    // 100
 * ## Reusing and Overriding Messages                                                                                 // 101
 * In addition to prioritization, ngMessages also allows for including messages from a remote or an inline            // 102
 * template. This allows for generic collection of messages to be reused across multiple parts of an                  // 103
 * application.                                                                                                       // 104
 *                                                                                                                    // 105
 * ```html                                                                                                            // 106
 * <script type="text/ng-template" id="error-messages">                                                               // 107
 *   <div ng-message="required">This field is required</div>                                                          // 108
 *   <div ng-message="minlength">This field is too short</div>                                                        // 109
 * </script>                                                                                                          // 110
 *                                                                                                                    // 111
 * <div ng-messages="myForm.myField.$error" role="alert">                                                             // 112
 *   <div ng-messages-include="error-messages"></div>                                                                 // 113
 * </div>                                                                                                             // 114
 * ```                                                                                                                // 115
 *                                                                                                                    // 116
 * However, including generic messages may not be useful enough to match all input fields, therefore,                 // 117
 * `ngMessages` provides the ability to override messages defined in the remote template by redefining                // 118
 * them within the directive container.                                                                               // 119
 *                                                                                                                    // 120
 * ```html                                                                                                            // 121
 * <!-- a generic template of error messages known as "my-custom-messages" -->                                        // 122
 * <script type="text/ng-template" id="my-custom-messages">                                                           // 123
 *   <div ng-message="required">This field is required</div>                                                          // 124
 *   <div ng-message="minlength">This field is too short</div>                                                        // 125
 * </script>                                                                                                          // 126
 *                                                                                                                    // 127
 * <form name="myForm">                                                                                               // 128
 *   <label>                                                                                                          // 129
 *     Email address                                                                                                  // 130
 *     <input type="email"                                                                                            // 131
 *            id="email"                                                                                              // 132
 *            name="myEmail"                                                                                          // 133
 *            ng-model="email"                                                                                        // 134
 *            minlength="5"                                                                                           // 135
 *            required />                                                                                             // 136
 *   </label>                                                                                                         // 137
 *   <!-- any ng-message elements that appear BEFORE the ng-messages-include will                                     // 138
 *        override the messages present in the ng-messages-include template -->                                       // 139
 *   <div ng-messages="myForm.myEmail.$error" role="alert">                                                           // 140
 *     <!-- this required message has overridden the template message -->                                             // 141
 *     <div ng-message="required">You did not enter your email address</div>                                          // 142
 *                                                                                                                    // 143
 *     <!-- this is a brand new message and will appear last in the prioritization -->                                // 144
 *     <div ng-message="email">Your email address is invalid</div>                                                    // 145
 *                                                                                                                    // 146
 *     <!-- and here are the generic error messages -->                                                               // 147
 *     <div ng-messages-include="my-custom-messages"></div>                                                           // 148
 *   </div>                                                                                                           // 149
 * </form>                                                                                                            // 150
 * ```                                                                                                                // 151
 *                                                                                                                    // 152
 * In the example HTML code above the message that is set on required will override the corresponding                 // 153
 * required message defined within the remote template. Therefore, with particular input fields (such                 // 154
 * email addresses, date fields, autocomplete inputs, etc...), specialized error messages can be applied              // 155
 * while more generic messages can be used to handle other, more general input errors.                                // 156
 *                                                                                                                    // 157
 * ## Dynamic Messaging                                                                                               // 158
 * ngMessages also supports using expressions to dynamically change key values. Using arrays and                      // 159
 * repeaters to list messages is also supported. This means that the code below will be able to                       // 160
 * fully adapt itself and display the appropriate message when any of the expression data changes:                    // 161
 *                                                                                                                    // 162
 * ```html                                                                                                            // 163
 * <form name="myForm">                                                                                               // 164
 *   <label>                                                                                                          // 165
 *     Email address                                                                                                  // 166
 *     <input type="email"                                                                                            // 167
 *            name="myEmail"                                                                                          // 168
 *            ng-model="email"                                                                                        // 169
 *            minlength="5"                                                                                           // 170
 *            required />                                                                                             // 171
 *   </label>                                                                                                         // 172
 *   <div ng-messages="myForm.myEmail.$error" role="alert">                                                           // 173
 *     <div ng-message="required">You did not enter your email address</div>                                          // 174
 *     <div ng-repeat="errorMessage in errorMessages">                                                                // 175
 *       <!-- use ng-message-exp for a message whose key is given by an expression -->                                // 176
 *       <div ng-message-exp="errorMessage.type">{{ errorMessage.text }}</div>                                        // 177
 *     </div>                                                                                                         // 178
 *   </div>                                                                                                           // 179
 * </form>                                                                                                            // 180
 * ```                                                                                                                // 181
 *                                                                                                                    // 182
 * The `errorMessage.type` expression can be a string value or it can be an array so                                  // 183
 * that multiple errors can be associated with a single error message:                                                // 184
 *                                                                                                                    // 185
 * ```html                                                                                                            // 186
 *   <label>                                                                                                          // 187
 *     Email address                                                                                                  // 188
 *     <input type="email"                                                                                            // 189
 *            ng-model="data.email"                                                                                   // 190
 *            name="myEmail"                                                                                          // 191
 *            ng-minlength="5"                                                                                        // 192
 *            ng-maxlength="100"                                                                                      // 193
 *            required />                                                                                             // 194
 *   </label>                                                                                                         // 195
 *   <div ng-messages="myForm.myEmail.$error" role="alert">                                                           // 196
 *     <div ng-message-exp="'required'">You did not enter your email address</div>                                    // 197
 *     <div ng-message-exp="['minlength', 'maxlength']">                                                              // 198
 *       Your email must be between 5 and 100 characters long                                                         // 199
 *     </div>                                                                                                         // 200
 *   </div>                                                                                                           // 201
 * ```                                                                                                                // 202
 *                                                                                                                    // 203
 * Feel free to use other structural directives such as ng-if and ng-switch to further control                        // 204
 * what messages are active and when. Be careful, if you place ng-message on the same element                         // 205
 * as these structural directives, Angular may not be able to determine if a message is active                        // 206
 * or not. Therefore it is best to place the ng-message on a child element of the structural                          // 207
 * directive.                                                                                                         // 208
 *                                                                                                                    // 209
 * ```html                                                                                                            // 210
 * <div ng-messages="myForm.myEmail.$error" role="alert">                                                             // 211
 *   <div ng-if="showRequiredError">                                                                                  // 212
 *     <div ng-message="required">Please enter something</div>                                                        // 213
 *   </div>                                                                                                           // 214
 * </div>                                                                                                             // 215
 * ```                                                                                                                // 216
 *                                                                                                                    // 217
 * ## Animations                                                                                                      // 218
 * If the `ngAnimate` module is active within the application then the `ngMessages`, `ngMessage` and                  // 219
 * `ngMessageExp` directives will trigger animations whenever any messages are added and removed from                 // 220
 * the DOM by the `ngMessages` directive.                                                                             // 221
 *                                                                                                                    // 222
 * Whenever the `ngMessages` directive contains one or more visible messages then the `.ng-active` CSS                // 223
 * class will be added to the element. The `.ng-inactive` CSS class will be applied when there are no                 // 224
 * messages present. Therefore, CSS transitions and keyframes as well as JavaScript animations can                    // 225
 * hook into the animations whenever these classes are added/removed.                                                 // 226
 *                                                                                                                    // 227
 * Let's say that our HTML code for our messages container looks like so:                                             // 228
 *                                                                                                                    // 229
 * ```html                                                                                                            // 230
 * <div ng-messages="myMessages" class="my-messages" role="alert">                                                    // 231
 *   <div ng-message="alert" class="some-message">...</div>                                                           // 232
 *   <div ng-message="fail" class="some-message">...</div>                                                            // 233
 * </div>                                                                                                             // 234
 * ```                                                                                                                // 235
 *                                                                                                                    // 236
 * Then the CSS animation code for the message container looks like so:                                               // 237
 *                                                                                                                    // 238
 * ```css                                                                                                             // 239
 * .my-messages {                                                                                                     // 240
 *   transition:1s linear all;                                                                                        // 241
 * }                                                                                                                  // 242
 * .my-messages.ng-active {                                                                                           // 243
 *   // messages are visible                                                                                          // 244
 * }                                                                                                                  // 245
 * .my-messages.ng-inactive {                                                                                         // 246
 *   // messages are hidden                                                                                           // 247
 * }                                                                                                                  // 248
 * ```                                                                                                                // 249
 *                                                                                                                    // 250
 * Whenever an inner message is attached (becomes visible) or removed (becomes hidden) then the enter                 // 251
 * and leave animation is triggered for each particular element bound to the `ngMessage` directive.                   // 252
 *                                                                                                                    // 253
 * Therefore, the CSS code for the inner messages looks like so:                                                      // 254
 *                                                                                                                    // 255
 * ```css                                                                                                             // 256
 * .some-message {                                                                                                    // 257
 *   transition:1s linear all;                                                                                        // 258
 * }                                                                                                                  // 259
 *                                                                                                                    // 260
 * .some-message.ng-enter {}                                                                                          // 261
 * .some-message.ng-enter.ng-enter-active {}                                                                          // 262
 *                                                                                                                    // 263
 * .some-message.ng-leave {}                                                                                          // 264
 * .some-message.ng-leave.ng-leave-active {}                                                                          // 265
 * ```                                                                                                                // 266
 *                                                                                                                    // 267
 * {@link ngAnimate Click here} to learn how to use JavaScript animations or to learn more about ngAnimate.           // 268
 */                                                                                                                   // 269
angular.module('ngMessages', [])                                                                                      // 270
                                                                                                                      // 271
   /**                                                                                                                // 272
    * @ngdoc directive                                                                                                // 273
    * @module ngMessages                                                                                              // 274
    * @name ngMessages                                                                                                // 275
    * @restrict AE                                                                                                    // 276
    *                                                                                                                 // 277
    * @description                                                                                                    // 278
    * `ngMessages` is a directive that is designed to show and hide messages based on the state                       // 279
    * of a key/value object that it listens on. The directive itself complements error message                        // 280
    * reporting with the `ngModel` $error object (which stores a key/value state of validation errors).               // 281
    *                                                                                                                 // 282
    * `ngMessages` manages the state of internal messages within its container element. The internal                  // 283
    * messages use the `ngMessage` directive and will be inserted/removed from the page depending                     // 284
    * on if they're present within the key/value object. By default, only one message will be displayed               // 285
    * at a time and this depends on the prioritization of the messages within the template. (This can                 // 286
    * be changed by using the `ng-messages-multiple` or `multiple` attribute on the directive container.)             // 287
    *                                                                                                                 // 288
    * A remote template can also be used to promote message reusability and messages can also be                      // 289
    * overridden.                                                                                                     // 290
    *                                                                                                                 // 291
    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.                          // 292
    *                                                                                                                 // 293
    * @usage                                                                                                          // 294
    * ```html                                                                                                         // 295
    * <!-- using attribute directives -->                                                                             // 296
    * <ANY ng-messages="expression" role="alert">                                                                     // 297
    *   <ANY ng-message="stringValue">...</ANY>                                                                       // 298
    *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>                                                   // 299
    *   <ANY ng-message-exp="expressionValue">...</ANY>                                                               // 300
    * </ANY>                                                                                                          // 301
    *                                                                                                                 // 302
    * <!-- or by using element directives -->                                                                         // 303
    * <ng-messages for="expression" role="alert">                                                                     // 304
    *   <ng-message when="stringValue">...</ng-message>                                                               // 305
    *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>                                           // 306
    *   <ng-message when-exp="expressionValue">...</ng-message>                                                       // 307
    * </ng-messages>                                                                                                  // 308
    * ```                                                                                                             // 309
    *                                                                                                                 // 310
    * @param {string} ngMessages an angular expression evaluating to a key/value object                               // 311
    *                 (this is typically the $error object on an ngModel instance).                                   // 312
    * @param {string=} ngMessagesMultiple|multiple when set, all messages will be displayed with true                 // 313
    *                                                                                                                 // 314
    * @example                                                                                                        // 315
    * <example name="ngMessages-directive" module="ngMessagesExample"                                                 // 316
    *          deps="angular-messages.js"                                                                             // 317
    *          animations="true" fixBase="true">                                                                      // 318
    *   <file name="index.html">                                                                                      // 319
    *     <form name="myForm">                                                                                        // 320
    *       <label>                                                                                                   // 321
    *         Enter your name:                                                                                        // 322
    *         <input type="text"                                                                                      // 323
    *                name="myName"                                                                                    // 324
    *                ng-model="name"                                                                                  // 325
    *                ng-minlength="5"                                                                                 // 326
    *                ng-maxlength="20"                                                                                // 327
    *                required />                                                                                      // 328
    *       </label>                                                                                                  // 329
    *       <pre>myForm.myName.$error = {{ myForm.myName.$error | json }}</pre>                                       // 330
    *                                                                                                                 // 331
    *       <div ng-messages="myForm.myName.$error" style="color:maroon" role="alert">                                // 332
    *         <div ng-message="required">You did not enter a field</div>                                              // 333
    *         <div ng-message="minlength">Your field is too short</div>                                               // 334
    *         <div ng-message="maxlength">Your field is too long</div>                                                // 335
    *       </div>                                                                                                    // 336
    *     </form>                                                                                                     // 337
    *   </file>                                                                                                       // 338
    *   <file name="script.js">                                                                                       // 339
    *     angular.module('ngMessagesExample', ['ngMessages']);                                                        // 340
    *   </file>                                                                                                       // 341
    * </example>                                                                                                      // 342
    */                                                                                                                // 343
   .directive('ngMessages', ['$animate', function($animate) {                                                         // 344
     var ACTIVE_CLASS = 'ng-active';                                                                                  // 345
     var INACTIVE_CLASS = 'ng-inactive';                                                                              // 346
                                                                                                                      // 347
     return {                                                                                                         // 348
       require: 'ngMessages',                                                                                         // 349
       restrict: 'AE',                                                                                                // 350
       controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {                              // 351
         var ctrl = this;                                                                                             // 352
         var latestKey = 0;                                                                                           // 353
         var nextAttachId = 0;                                                                                        // 354
                                                                                                                      // 355
         this.getAttachId = function getAttachId() { return nextAttachId++; };                                        // 356
                                                                                                                      // 357
         var messages = this.messages = {};                                                                           // 358
         var renderLater, cachedCollection;                                                                           // 359
                                                                                                                      // 360
         this.render = function(collection) {                                                                         // 361
           collection = collection || {};                                                                             // 362
                                                                                                                      // 363
           renderLater = false;                                                                                       // 364
           cachedCollection = collection;                                                                             // 365
                                                                                                                      // 366
           // this is true if the attribute is empty or if the attribute value is truthy                              // 367
           var multiple = isAttrTruthy($scope, $attrs.ngMessagesMultiple) ||                                          // 368
                          isAttrTruthy($scope, $attrs.multiple);                                                      // 369
                                                                                                                      // 370
           var unmatchedMessages = [];                                                                                // 371
           var matchedKeys = {};                                                                                      // 372
           var messageItem = ctrl.head;                                                                               // 373
           var messageFound = false;                                                                                  // 374
           var totalMessages = 0;                                                                                     // 375
                                                                                                                      // 376
           // we use != instead of !== to allow for both undefined and null values                                    // 377
           while (messageItem != null) {                                                                              // 378
             totalMessages++;                                                                                         // 379
             var messageCtrl = messageItem.message;                                                                   // 380
                                                                                                                      // 381
             var messageUsed = false;                                                                                 // 382
             if (!messageFound) {                                                                                     // 383
               forEach(collection, function(value, key) {                                                             // 384
                 if (!messageUsed && truthy(value) && messageCtrl.test(key)) {                                        // 385
                   // this is to prevent the same error name from showing up twice                                    // 386
                   if (matchedKeys[key]) return;                                                                      // 387
                   matchedKeys[key] = true;                                                                           // 388
                                                                                                                      // 389
                   messageUsed = true;                                                                                // 390
                   messageCtrl.attach();                                                                              // 391
                 }                                                                                                    // 392
               });                                                                                                    // 393
             }                                                                                                        // 394
                                                                                                                      // 395
             if (messageUsed) {                                                                                       // 396
               // unless we want to display multiple messages then we should                                          // 397
               // set a flag here to avoid displaying the next message in the list                                    // 398
               messageFound = !multiple;                                                                              // 399
             } else {                                                                                                 // 400
               unmatchedMessages.push(messageCtrl);                                                                   // 401
             }                                                                                                        // 402
                                                                                                                      // 403
             messageItem = messageItem.next;                                                                          // 404
           }                                                                                                          // 405
                                                                                                                      // 406
           forEach(unmatchedMessages, function(messageCtrl) {                                                         // 407
             messageCtrl.detach();                                                                                    // 408
           });                                                                                                        // 409
                                                                                                                      // 410
           unmatchedMessages.length !== totalMessages                                                                 // 411
              ? $animate.setClass($element, ACTIVE_CLASS, INACTIVE_CLASS)                                             // 412
              : $animate.setClass($element, INACTIVE_CLASS, ACTIVE_CLASS);                                            // 413
         };                                                                                                           // 414
                                                                                                                      // 415
         $scope.$watchCollection($attrs.ngMessages || $attrs['for'], ctrl.render);                                    // 416
                                                                                                                      // 417
         // If the element is destroyed, proactively destroy all the currently visible messages                       // 418
         $element.on('$destroy', function() {                                                                         // 419
           forEach(messages, function(item) {                                                                         // 420
             item.message.detach();                                                                                   // 421
           });                                                                                                        // 422
         });                                                                                                          // 423
                                                                                                                      // 424
         this.reRender = function() {                                                                                 // 425
           if (!renderLater) {                                                                                        // 426
             renderLater = true;                                                                                      // 427
             $scope.$evalAsync(function() {                                                                           // 428
               if (renderLater) {                                                                                     // 429
                 cachedCollection && ctrl.render(cachedCollection);                                                   // 430
               }                                                                                                      // 431
             });                                                                                                      // 432
           }                                                                                                          // 433
         };                                                                                                           // 434
                                                                                                                      // 435
         this.register = function(comment, messageCtrl) {                                                             // 436
           var nextKey = latestKey.toString();                                                                        // 437
           messages[nextKey] = {                                                                                      // 438
             message: messageCtrl                                                                                     // 439
           };                                                                                                         // 440
           insertMessageNode($element[0], comment, nextKey);                                                          // 441
           comment.$$ngMessageNode = nextKey;                                                                         // 442
           latestKey++;                                                                                               // 443
                                                                                                                      // 444
           ctrl.reRender();                                                                                           // 445
         };                                                                                                           // 446
                                                                                                                      // 447
         this.deregister = function(comment) {                                                                        // 448
           var key = comment.$$ngMessageNode;                                                                         // 449
           delete comment.$$ngMessageNode;                                                                            // 450
           removeMessageNode($element[0], comment, key);                                                              // 451
           delete messages[key];                                                                                      // 452
           ctrl.reRender();                                                                                           // 453
         };                                                                                                           // 454
                                                                                                                      // 455
         function findPreviousMessage(parent, comment) {                                                              // 456
           var prevNode = comment;                                                                                    // 457
           var parentLookup = [];                                                                                     // 458
                                                                                                                      // 459
           while (prevNode && prevNode !== parent) {                                                                  // 460
             var prevKey = prevNode.$$ngMessageNode;                                                                  // 461
             if (prevKey && prevKey.length) {                                                                         // 462
               return messages[prevKey];                                                                              // 463
             }                                                                                                        // 464
                                                                                                                      // 465
             // dive deeper into the DOM and examine its children for any ngMessage                                   // 466
             // comments that may be in an element that appears deeper in the list                                    // 467
             if (prevNode.childNodes.length && parentLookup.indexOf(prevNode) == -1) {                                // 468
               parentLookup.push(prevNode);                                                                           // 469
               prevNode = prevNode.childNodes[prevNode.childNodes.length - 1];                                        // 470
             } else if (prevNode.previousSibling) {                                                                   // 471
               prevNode = prevNode.previousSibling;                                                                   // 472
             } else {                                                                                                 // 473
               prevNode = prevNode.parentNode;                                                                        // 474
               parentLookup.push(prevNode);                                                                           // 475
             }                                                                                                        // 476
           }                                                                                                          // 477
         }                                                                                                            // 478
                                                                                                                      // 479
         function insertMessageNode(parent, comment, key) {                                                           // 480
           var messageNode = messages[key];                                                                           // 481
           if (!ctrl.head) {                                                                                          // 482
             ctrl.head = messageNode;                                                                                 // 483
           } else {                                                                                                   // 484
             var match = findPreviousMessage(parent, comment);                                                        // 485
             if (match) {                                                                                             // 486
               messageNode.next = match.next;                                                                         // 487
               match.next = messageNode;                                                                              // 488
             } else {                                                                                                 // 489
               messageNode.next = ctrl.head;                                                                          // 490
               ctrl.head = messageNode;                                                                               // 491
             }                                                                                                        // 492
           }                                                                                                          // 493
         }                                                                                                            // 494
                                                                                                                      // 495
         function removeMessageNode(parent, comment, key) {                                                           // 496
           var messageNode = messages[key];                                                                           // 497
                                                                                                                      // 498
           var match = findPreviousMessage(parent, comment);                                                          // 499
           if (match) {                                                                                               // 500
             match.next = messageNode.next;                                                                           // 501
           } else {                                                                                                   // 502
             ctrl.head = messageNode.next;                                                                            // 503
           }                                                                                                          // 504
         }                                                                                                            // 505
       }]                                                                                                             // 506
     };                                                                                                               // 507
                                                                                                                      // 508
     function isAttrTruthy(scope, attr) {                                                                             // 509
      return (isString(attr) && attr.length === 0) || //empty attribute                                               // 510
             truthy(scope.$eval(attr));                                                                               // 511
     }                                                                                                                // 512
                                                                                                                      // 513
     function truthy(val) {                                                                                           // 514
       return isString(val) ? val.length : !!val;                                                                     // 515
     }                                                                                                                // 516
   }])                                                                                                                // 517
                                                                                                                      // 518
   /**                                                                                                                // 519
    * @ngdoc directive                                                                                                // 520
    * @name ngMessagesInclude                                                                                         // 521
    * @restrict AE                                                                                                    // 522
    * @scope                                                                                                          // 523
    *                                                                                                                 // 524
    * @description                                                                                                    // 525
    * `ngMessagesInclude` is a directive with the purpose to import existing ngMessage template                       // 526
    * code from a remote template and place the downloaded template code into the exact spot                          // 527
    * that the ngMessagesInclude directive is placed within the ngMessages container. This allows                     // 528
    * for a series of pre-defined messages to be reused and also allows for the developer to                          // 529
    * determine what messages are overridden due to the placement of the ngMessagesInclude directive.                 // 530
    *                                                                                                                 // 531
    * @usage                                                                                                          // 532
    * ```html                                                                                                         // 533
    * <!-- using attribute directives -->                                                                             // 534
    * <ANY ng-messages="expression" role="alert">                                                                     // 535
    *   <ANY ng-messages-include="remoteTplString">...</ANY>                                                          // 536
    * </ANY>                                                                                                          // 537
    *                                                                                                                 // 538
    * <!-- or by using element directives -->                                                                         // 539
    * <ng-messages for="expression" role="alert">                                                                     // 540
    *   <ng-messages-include src="expressionValue1">...</ng-messages-include>                                         // 541
    * </ng-messages>                                                                                                  // 542
    * ```                                                                                                             // 543
    *                                                                                                                 // 544
    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.                          // 545
    *                                                                                                                 // 546
    * @param {string} ngMessagesInclude|src a string value corresponding to the remote template.                      // 547
    */                                                                                                                // 548
   .directive('ngMessagesInclude',                                                                                    // 549
     ['$templateRequest', '$document', '$compile', function($templateRequest, $document, $compile) {                  // 550
                                                                                                                      // 551
     return {                                                                                                         // 552
       restrict: 'AE',                                                                                                // 553
       require: '^^ngMessages', // we only require this for validation sake                                           // 554
       link: function($scope, element, attrs) {                                                                       // 555
         var src = attrs.ngMessagesInclude || attrs.src;                                                              // 556
         $templateRequest(src).then(function(html) {                                                                  // 557
           $compile(html)($scope, function(contents) {                                                                // 558
             element.after(contents);                                                                                 // 559
                                                                                                                      // 560
             // the anchor is placed for debugging purposes                                                           // 561
             var comment = $compile.$$createComment ?                                                                 // 562
                 $compile.$$createComment('ngMessagesInclude', src) :                                                 // 563
                 $document[0].createComment(' ngMessagesInclude: ' + src + ' ');                                      // 564
             var anchor = jqLite(comment);                                                                            // 565
             element.after(anchor);                                                                                   // 566
                                                                                                                      // 567
             // we don't want to pollute the DOM anymore by keeping an empty directive element                        // 568
             element.remove();                                                                                        // 569
           });                                                                                                        // 570
         });                                                                                                          // 571
       }                                                                                                              // 572
     };                                                                                                               // 573
   }])                                                                                                                // 574
                                                                                                                      // 575
   /**                                                                                                                // 576
    * @ngdoc directive                                                                                                // 577
    * @name ngMessage                                                                                                 // 578
    * @restrict AE                                                                                                    // 579
    * @scope                                                                                                          // 580
    *                                                                                                                 // 581
    * @description                                                                                                    // 582
    * `ngMessage` is a directive with the purpose to show and hide a particular message.                              // 583
    * For `ngMessage` to operate, a parent `ngMessages` directive on a parent DOM element                             // 584
    * must be situated since it determines which messages are visible based on the state                              // 585
    * of the provided key/value map that `ngMessages` listens on.                                                     // 586
    *                                                                                                                 // 587
    * More information about using `ngMessage` can be found in the                                                    // 588
    * {@link module:ngMessages `ngMessages` module documentation}.                                                    // 589
    *                                                                                                                 // 590
    * @usage                                                                                                          // 591
    * ```html                                                                                                         // 592
    * <!-- using attribute directives -->                                                                             // 593
    * <ANY ng-messages="expression" role="alert">                                                                     // 594
    *   <ANY ng-message="stringValue">...</ANY>                                                                       // 595
    *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>                                                   // 596
    * </ANY>                                                                                                          // 597
    *                                                                                                                 // 598
    * <!-- or by using element directives -->                                                                         // 599
    * <ng-messages for="expression" role="alert">                                                                     // 600
    *   <ng-message when="stringValue">...</ng-message>                                                               // 601
    *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>                                           // 602
    * </ng-messages>                                                                                                  // 603
    * ```                                                                                                             // 604
    *                                                                                                                 // 605
    * @param {expression} ngMessage|when a string value corresponding to the message key.                             // 606
    */                                                                                                                // 607
  .directive('ngMessage', ngMessageDirectiveFactory())                                                                // 608
                                                                                                                      // 609
                                                                                                                      // 610
   /**                                                                                                                // 611
    * @ngdoc directive                                                                                                // 612
    * @name ngMessageExp                                                                                              // 613
    * @restrict AE                                                                                                    // 614
    * @priority 1                                                                                                     // 615
    * @scope                                                                                                          // 616
    *                                                                                                                 // 617
    * @description                                                                                                    // 618
    * `ngMessageExp` is a directive with the purpose to show and hide a particular message.                           // 619
    * For `ngMessageExp` to operate, a parent `ngMessages` directive on a parent DOM element                          // 620
    * must be situated since it determines which messages are visible based on the state                              // 621
    * of the provided key/value map that `ngMessages` listens on.                                                     // 622
    *                                                                                                                 // 623
    * @usage                                                                                                          // 624
    * ```html                                                                                                         // 625
    * <!-- using attribute directives -->                                                                             // 626
    * <ANY ng-messages="expression">                                                                                  // 627
    *   <ANY ng-message-exp="expressionValue">...</ANY>                                                               // 628
    * </ANY>                                                                                                          // 629
    *                                                                                                                 // 630
    * <!-- or by using element directives -->                                                                         // 631
    * <ng-messages for="expression">                                                                                  // 632
    *   <ng-message when-exp="expressionValue">...</ng-message>                                                       // 633
    * </ng-messages>                                                                                                  // 634
    * ```                                                                                                             // 635
    *                                                                                                                 // 636
    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.                          // 637
    *                                                                                                                 // 638
    * @param {expression} ngMessageExp|whenExp an expression value corresponding to the message key.                  // 639
    */                                                                                                                // 640
  .directive('ngMessageExp', ngMessageDirectiveFactory());                                                            // 641
                                                                                                                      // 642
function ngMessageDirectiveFactory() {                                                                                // 643
  return ['$animate', function($animate) {                                                                            // 644
    return {                                                                                                          // 645
      restrict: 'AE',                                                                                                 // 646
      transclude: 'element',                                                                                          // 647
      priority: 1, // must run before ngBind, otherwise the text is set on the comment                                // 648
      terminal: true,                                                                                                 // 649
      require: '^^ngMessages',                                                                                        // 650
      link: function(scope, element, attrs, ngMessagesCtrl, $transclude) {                                            // 651
        var commentNode = element[0];                                                                                 // 652
                                                                                                                      // 653
        var records;                                                                                                  // 654
        var staticExp = attrs.ngMessage || attrs.when;                                                                // 655
        var dynamicExp = attrs.ngMessageExp || attrs.whenExp;                                                         // 656
        var assignRecords = function(items) {                                                                         // 657
          records = items                                                                                             // 658
              ? (isArray(items)                                                                                       // 659
                    ? items                                                                                           // 660
                    : items.split(/[\s,]+/))                                                                          // 661
              : null;                                                                                                 // 662
          ngMessagesCtrl.reRender();                                                                                  // 663
        };                                                                                                            // 664
                                                                                                                      // 665
        if (dynamicExp) {                                                                                             // 666
          assignRecords(scope.$eval(dynamicExp));                                                                     // 667
          scope.$watchCollection(dynamicExp, assignRecords);                                                          // 668
        } else {                                                                                                      // 669
          assignRecords(staticExp);                                                                                   // 670
        }                                                                                                             // 671
                                                                                                                      // 672
        var currentElement, messageCtrl;                                                                              // 673
        ngMessagesCtrl.register(commentNode, messageCtrl = {                                                          // 674
          test: function(name) {                                                                                      // 675
            return contains(records, name);                                                                           // 676
          },                                                                                                          // 677
          attach: function() {                                                                                        // 678
            if (!currentElement) {                                                                                    // 679
              $transclude(scope, function(elm) {                                                                      // 680
                $animate.enter(elm, null, element);                                                                   // 681
                currentElement = elm;                                                                                 // 682
                                                                                                                      // 683
                // Each time we attach this node to a message we get a new id that we can match                       // 684
                // when we are destroying the node later.                                                             // 685
                var $$attachId = currentElement.$$attachId = ngMessagesCtrl.getAttachId();                            // 686
                                                                                                                      // 687
                // in the event that the element or a parent element is destroyed                                     // 688
                // by another structural directive then it's time                                                     // 689
                // to deregister the message from the controller                                                      // 690
                currentElement.on('$destroy', function() {                                                            // 691
                  if (currentElement && currentElement.$$attachId === $$attachId) {                                   // 692
                    ngMessagesCtrl.deregister(commentNode);                                                           // 693
                    messageCtrl.detach();                                                                             // 694
                  }                                                                                                   // 695
                });                                                                                                   // 696
              });                                                                                                     // 697
            }                                                                                                         // 698
          },                                                                                                          // 699
          detach: function() {                                                                                        // 700
            if (currentElement) {                                                                                     // 701
              var elm = currentElement;                                                                               // 702
              currentElement = null;                                                                                  // 703
              $animate.leave(elm);                                                                                    // 704
            }                                                                                                         // 705
          }                                                                                                           // 706
        });                                                                                                           // 707
      }                                                                                                               // 708
    };                                                                                                                // 709
  }];                                                                                                                 // 710
                                                                                                                      // 711
  function contains(collection, key) {                                                                                // 712
    if (collection) {                                                                                                 // 713
      return isArray(collection)                                                                                      // 714
          ? collection.indexOf(key) >= 0                                                                              // 715
          : collection.hasOwnProperty(key);                                                                           // 716
    }                                                                                                                 // 717
  }                                                                                                                   // 718
}                                                                                                                     // 719
                                                                                                                      // 720
                                                                                                                      // 721
})(window, window.angular);                                                                                           // 722
                                                                                                                      // 723
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-messages'] = {};

})();
