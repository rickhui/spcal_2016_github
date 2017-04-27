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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/angularjs_angular-sanitize/packages/angularjs_angular-sanitize.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                                               //    // 4
// packages/angularjs:angular-sanitize/bower_components/angular-sanitize/angular-sanitize.js                     //    // 5
//                                                                                                               //    // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                                                 //    // 8
/**                                                                                                              // 1  // 9
 * @license AngularJS v1.3.15                                                                                    // 2  // 10
 * (c) 2010-2014 Google, Inc. http://angularjs.org                                                               // 3  // 11
 * License: MIT                                                                                                  // 4  // 12
 */                                                                                                              // 5  // 13
(function(window, angular, undefined) {'use strict';                                                             // 6  // 14
                                                                                                                 // 7  // 15
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                                     // 8  // 16
 *     Any commits to this file should be reviewed with security in mind.  *                                     // 9  // 17
 *   Changes to this file can potentially create security vulnerabilities. *                                     // 10
 *          An approval from 2 Core members with history of modifying      *                                     // 11
 *                         this file is required.                          *                                     // 12
 *                                                                         *                                     // 13
 *  Does the change somehow allow for arbitrary javascript to be executed? *                                     // 14
 *    Or allows for someone to change the prototype of built-in objects?   *                                     // 15
 *     Or gives undesired access to variables likes document or window?    *                                     // 16
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */                                    // 17
                                                                                                                 // 18
var $sanitizeMinErr = angular.$$minErr('$sanitize');                                                             // 19
                                                                                                                 // 20
/**                                                                                                              // 21
 * @ngdoc module                                                                                                 // 22
 * @name ngSanitize                                                                                              // 23
 * @description                                                                                                  // 24
 *                                                                                                               // 25
 * # ngSanitize                                                                                                  // 26
 *                                                                                                               // 27
 * The `ngSanitize` module provides functionality to sanitize HTML.                                              // 28
 *                                                                                                               // 29
 *                                                                                                               // 30
 * <div doc-module-components="ngSanitize"></div>                                                                // 31
 *                                                                                                               // 32
 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.                                                       // 33
 */                                                                                                              // 34
                                                                                                                 // 35
/*                                                                                                               // 36
 * HTML Parser By Misko Hevery (misko@hevery.com)                                                                // 37
 * based on:  HTML Parser By John Resig (ejohn.org)                                                              // 38
 * Original code by Erik Arvidsson, Mozilla Public License                                                       // 39
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js                                                      // 40
 *                                                                                                               // 41
 * // Use like so:                                                                                               // 42
 * htmlParser(htmlString, {                                                                                      // 43
 *     start: function(tag, attrs, unary) {},                                                                    // 44
 *     end: function(tag) {},                                                                                    // 45
 *     chars: function(text) {},                                                                                 // 46
 *     comment: function(text) {}                                                                                // 47
 * });                                                                                                           // 48
 *                                                                                                               // 49
 */                                                                                                              // 50
                                                                                                                 // 51
                                                                                                                 // 52
/**                                                                                                              // 53
 * @ngdoc service                                                                                                // 54
 * @name $sanitize                                                                                               // 55
 * @kind function                                                                                                // 56
 *                                                                                                               // 57
 * @description                                                                                                  // 58
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are              // 59
 *   then serialized back to properly escaped html string. This means that no unsafe input can make              // 60
 *   it into the returned string, however, since our parser is more strict than a typical browser                // 61
 *   parser, it's possible that some obscure input, which would be recognized as valid HTML by a                 // 62
 *   browser, won't make it through the sanitizer. The input may also contain SVG markup.                        // 63
 *   The whitelist is configured using the functions `aHrefSanitizationWhitelist` and                            // 64
 *   `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider `$compileProvider`}.                            // 65
 *                                                                                                               // 66
 * @param {string} html HTML input.                                                                              // 67
 * @returns {string} Sanitized HTML.                                                                             // 68
 *                                                                                                               // 69
 * @example                                                                                                      // 70
   <example module="sanitizeExample" deps="angular-sanitize.js">                                                 // 71
   <file name="index.html">                                                                                      // 72
     <script>                                                                                                    // 73
         angular.module('sanitizeExample', ['ngSanitize'])                                                       // 74
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {                          // 75
             $scope.snippet =                                                                                    // 76
               '<p style="color:blue">an html\n' +                                                               // 77
               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +                               // 78
               'snippet</p>';                                                                                    // 79
             $scope.deliberatelyTrustDangerousSnippet = function() {                                             // 80
               return $sce.trustAsHtml($scope.snippet);                                                          // 81
             };                                                                                                  // 82
           }]);                                                                                                  // 83
     </script>                                                                                                   // 84
     <div ng-controller="ExampleController">                                                                     // 85
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>                                     // 86
       <table>                                                                                                   // 87
         <tr>                                                                                                    // 88
           <td>Directive</td>                                                                                    // 89
           <td>How</td>                                                                                          // 90
           <td>Source</td>                                                                                       // 91
           <td>Rendered</td>                                                                                     // 92
         </tr>                                                                                                   // 93
         <tr id="bind-html-with-sanitize">                                                                       // 94
           <td>ng-bind-html</td>                                                                                 // 95
           <td>Automatically uses $sanitize</td>                                                                 // 96
           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>                               // 97
           <td><div ng-bind-html="snippet"></div></td>                                                           // 98
         </tr>                                                                                                   // 99
         <tr id="bind-html-with-trust">                                                                          // 100
           <td>ng-bind-html</td>                                                                                 // 101
           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>                                  // 102
           <td>                                                                                                  // 103
           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;                                   // 104
&lt;/div&gt;</pre>                                                                                               // 105
           </td>                                                                                                 // 106
           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>                               // 107
         </tr>                                                                                                   // 108
         <tr id="bind-default">                                                                                  // 109
           <td>ng-bind</td>                                                                                      // 110
           <td>Automatically escapes</td>                                                                        // 111
           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>                                    // 112
           <td><div ng-bind="snippet"></div></td>                                                                // 113
         </tr>                                                                                                   // 114
       </table>                                                                                                  // 115
       </div>                                                                                                    // 116
   </file>                                                                                                       // 117
   <file name="protractor.js" type="protractor">                                                                 // 118
     it('should sanitize the html snippet by default', function() {                                              // 119
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).                                   // 120
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');                                                   // 121
     });                                                                                                         // 122
                                                                                                                 // 123
     it('should inline raw snippet if bound to a trusted value', function() {                                    // 124
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).                                      // 125
         toBe("<p style=\"color:blue\">an html\n" +                                                              // 126
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +                                // 127
              "snippet</p>");                                                                                    // 128
     });                                                                                                         // 129
                                                                                                                 // 130
     it('should escape snippet without any filter', function() {                                                 // 131
       expect(element(by.css('#bind-default div')).getInnerHtml()).                                              // 132
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +                                                        // 133
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +                    // 134
              "snippet&lt;/p&gt;");                                                                              // 135
     });                                                                                                         // 136
                                                                                                                 // 137
     it('should update', function() {                                                                            // 138
       element(by.model('snippet')).clear();                                                                     // 139
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');                              // 140
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).                                   // 141
         toBe('new <b>text</b>');                                                                                // 142
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).toBe(                                 // 143
         'new <b onclick="alert(1)">text</b>');                                                                  // 144
       expect(element(by.css('#bind-default div')).getInnerHtml()).toBe(                                         // 145
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");                                                    // 146
     });                                                                                                         // 147
   </file>                                                                                                       // 148
   </example>                                                                                                    // 149
 */                                                                                                              // 150
function $SanitizeProvider() {                                                                                   // 151
  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {                                                        // 152
    return function(html) {                                                                                      // 153
      var buf = [];                                                                                              // 154
      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {                                          // 155
        return !/^unsafe/.test($$sanitizeUri(uri, isImage));                                                     // 156
      }));                                                                                                       // 157
      return buf.join('');                                                                                       // 158
    };                                                                                                           // 159
  }];                                                                                                            // 160
}                                                                                                                // 161
                                                                                                                 // 162
function sanitizeText(chars) {                                                                                   // 163
  var buf = [];                                                                                                  // 164
  var writer = htmlSanitizeWriter(buf, angular.noop);                                                            // 165
  writer.chars(chars);                                                                                           // 166
  return buf.join('');                                                                                           // 167
}                                                                                                                // 168
                                                                                                                 // 169
                                                                                                                 // 170
// Regular Expressions for parsing tags and attributes                                                           // 171
var START_TAG_REGEXP =                                                                                           // 172
       /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, // 173
  END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^>]*>/,                                                                     // 174
  ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,                       // 175
  BEGIN_TAG_REGEXP = /^</,                                                                                       // 176
  BEGING_END_TAGE_REGEXP = /^<\//,                                                                               // 177
  COMMENT_REGEXP = /<!--(.*?)-->/g,                                                                              // 178
  DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i,                                                                        // 179
  CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g,                                                                         // 180
  SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,                                                     // 181
  // Match everything outside of normal chars and " (quote character)                                            // 182
  NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;                                                                    // 183
                                                                                                                 // 184
                                                                                                                 // 185
// Good source of info about elements and attributes                                                             // 186
// http://dev.w3.org/html5/spec/Overview.html#semantics                                                          // 187
// http://simon.html5.org/html-elements                                                                          // 188
                                                                                                                 // 189
// Safe Void Elements - HTML5                                                                                    // 190
// http://dev.w3.org/html5/spec/Overview.html#void-elements                                                      // 191
var voidElements = makeMap("area,br,col,hr,img,wbr");                                                            // 192
                                                                                                                 // 193
// Elements that you can, intentionally, leave open (and which close themselves)                                 // 194
// http://dev.w3.org/html5/spec/Overview.html#optional-tags                                                      // 195
var optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),                     // 196
    optionalEndTagInlineElements = makeMap("rp,rt"),                                                             // 197
    optionalEndTagElements = angular.extend({},                                                                  // 198
                                            optionalEndTagInlineElements,                                        // 199
                                            optionalEndTagBlockElements);                                        // 200
                                                                                                                 // 201
// Safe Block Elements - HTML5                                                                                   // 202
var blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap("address,article," +                 // 203
        "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +              // 204
        "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));                                 // 205
                                                                                                                 // 206
// Inline Elements - HTML5                                                                                       // 207
var inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b," +              // 208
        "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +                // 209
        "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));                                                 // 210
                                                                                                                 // 211
// SVG Elements                                                                                                  // 212
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements                                                  // 213
var svgElements = makeMap("animate,animateColor,animateMotion,animateTransform,circle,defs," +                   // 214
        "desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient," +              // 215
        "line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set," +              // 216
        "stop,svg,switch,text,title,tspan,use");                                                                 // 217
                                                                                                                 // 218
// Special Elements (can contain anything)                                                                       // 219
var specialElements = makeMap("script,style");                                                                   // 220
                                                                                                                 // 221
var validElements = angular.extend({},                                                                           // 222
                                   voidElements,                                                                 // 223
                                   blockElements,                                                                // 224
                                   inlineElements,                                                               // 225
                                   optionalEndTagElements,                                                       // 226
                                   svgElements);                                                                 // 227
                                                                                                                 // 228
//Attributes that have href and hence need to be sanitized                                                       // 229
var uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href");                                   // 230
                                                                                                                 // 231
var htmlAttrs = makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +              // 232
    'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +                               // 233
    'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +                                            // 234
    'scope,scrolling,shape,size,span,start,summary,target,title,type,' +                                         // 235
    'valign,value,vspace,width');                                                                                // 236
                                                                                                                 // 237
// SVG attributes (without "id" and "name" attributes)                                                           // 238
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes                                                // 239
var svgAttrs = makeMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +                      // 240
    'attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,' +                   // 241
    'color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,' +                // 242
    'font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,' +                  // 243
    'gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,' +                         // 244
    'keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,' +                    // 245
    'markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,' +                         // 246
    'overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,' +                      // 247
    'repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,' +              // 248
    'stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,' +                     // 249
    'stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,' +                     // 250
    'stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,' +                   // 251
    'underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,' +                // 252
    'viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,' +                 // 253
    'xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,' +                 // 254
    'zoomAndPan');                                                                                               // 255
                                                                                                                 // 256
var validAttrs = angular.extend({},                                                                              // 257
                                uriAttrs,                                                                        // 258
                                svgAttrs,                                                                        // 259
                                htmlAttrs);                                                                      // 260
                                                                                                                 // 261
function makeMap(str) {                                                                                          // 262
  var obj = {}, items = str.split(','), i;                                                                       // 263
  for (i = 0; i < items.length; i++) obj[items[i]] = true;                                                       // 264
  return obj;                                                                                                    // 265
}                                                                                                                // 266
                                                                                                                 // 267
                                                                                                                 // 268
/**                                                                                                              // 269
 * @example                                                                                                      // 270
 * htmlParser(htmlString, {                                                                                      // 271
 *     start: function(tag, attrs, unary) {},                                                                    // 272
 *     end: function(tag) {},                                                                                    // 273
 *     chars: function(text) {},                                                                                 // 274
 *     comment: function(text) {}                                                                                // 275
 * });                                                                                                           // 276
 *                                                                                                               // 277
 * @param {string} html string                                                                                   // 278
 * @param {object} handler                                                                                       // 279
 */                                                                                                              // 280
function htmlParser(html, handler) {                                                                             // 281
  if (typeof html !== 'string') {                                                                                // 282
    if (html === null || typeof html === 'undefined') {                                                          // 283
      html = '';                                                                                                 // 284
    } else {                                                                                                     // 285
      html = '' + html;                                                                                          // 286
    }                                                                                                            // 287
  }                                                                                                              // 288
  var index, chars, match, stack = [], last = html, text;                                                        // 289
  stack.last = function() { return stack[stack.length - 1]; };                                                   // 290
                                                                                                                 // 291
  while (html) {                                                                                                 // 292
    text = '';                                                                                                   // 293
    chars = true;                                                                                                // 294
                                                                                                                 // 295
    // Make sure we're not in a script or style element                                                          // 296
    if (!stack.last() || !specialElements[stack.last()]) {                                                       // 297
                                                                                                                 // 298
      // Comment                                                                                                 // 299
      if (html.indexOf("<!--") === 0) {                                                                          // 300
        // comments containing -- are not allowed unless they terminate the comment                              // 301
        index = html.indexOf("--", 4);                                                                           // 302
                                                                                                                 // 303
        if (index >= 0 && html.lastIndexOf("-->", index) === index) {                                            // 304
          if (handler.comment) handler.comment(html.substring(4, index));                                        // 305
          html = html.substring(index + 3);                                                                      // 306
          chars = false;                                                                                         // 307
        }                                                                                                        // 308
      // DOCTYPE                                                                                                 // 309
      } else if (DOCTYPE_REGEXP.test(html)) {                                                                    // 310
        match = html.match(DOCTYPE_REGEXP);                                                                      // 311
                                                                                                                 // 312
        if (match) {                                                                                             // 313
          html = html.replace(match[0], '');                                                                     // 314
          chars = false;                                                                                         // 315
        }                                                                                                        // 316
      // end tag                                                                                                 // 317
      } else if (BEGING_END_TAGE_REGEXP.test(html)) {                                                            // 318
        match = html.match(END_TAG_REGEXP);                                                                      // 319
                                                                                                                 // 320
        if (match) {                                                                                             // 321
          html = html.substring(match[0].length);                                                                // 322
          match[0].replace(END_TAG_REGEXP, parseEndTag);                                                         // 323
          chars = false;                                                                                         // 324
        }                                                                                                        // 325
                                                                                                                 // 326
      // start tag                                                                                               // 327
      } else if (BEGIN_TAG_REGEXP.test(html)) {                                                                  // 328
        match = html.match(START_TAG_REGEXP);                                                                    // 329
                                                                                                                 // 330
        if (match) {                                                                                             // 331
          // We only have a valid start-tag if there is a '>'.                                                   // 332
          if (match[4]) {                                                                                        // 333
            html = html.substring(match[0].length);                                                              // 334
            match[0].replace(START_TAG_REGEXP, parseStartTag);                                                   // 335
          }                                                                                                      // 336
          chars = false;                                                                                         // 337
        } else {                                                                                                 // 338
          // no ending tag found --- this piece should be encoded as an entity.                                  // 339
          text += '<';                                                                                           // 340
          html = html.substring(1);                                                                              // 341
        }                                                                                                        // 342
      }                                                                                                          // 343
                                                                                                                 // 344
      if (chars) {                                                                                               // 345
        index = html.indexOf("<");                                                                               // 346
                                                                                                                 // 347
        text += index < 0 ? html : html.substring(0, index);                                                     // 348
        html = index < 0 ? "" : html.substring(index);                                                           // 349
                                                                                                                 // 350
        if (handler.chars) handler.chars(decodeEntities(text));                                                  // 351
      }                                                                                                          // 352
                                                                                                                 // 353
    } else {                                                                                                     // 354
      // IE versions 9 and 10 do not understand the regex '[^]', so using a workaround with [\W\w].              // 355
      html = html.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", 'i'),                  // 356
        function(all, text) {                                                                                    // 357
          text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1");                                 // 358
                                                                                                                 // 359
          if (handler.chars) handler.chars(decodeEntities(text));                                                // 360
                                                                                                                 // 361
          return "";                                                                                             // 362
      });                                                                                                        // 363
                                                                                                                 // 364
      parseEndTag("", stack.last());                                                                             // 365
    }                                                                                                            // 366
                                                                                                                 // 367
    if (html == last) {                                                                                          // 368
      throw $sanitizeMinErr('badparse', "The sanitizer was unable to parse the following block " +               // 369
                                        "of html: {0}", html);                                                   // 370
    }                                                                                                            // 371
    last = html;                                                                                                 // 372
  }                                                                                                              // 373
                                                                                                                 // 374
  // Clean up any remaining tags                                                                                 // 375
  parseEndTag();                                                                                                 // 376
                                                                                                                 // 377
  function parseStartTag(tag, tagName, rest, unary) {                                                            // 378
    tagName = angular.lowercase(tagName);                                                                        // 379
    if (blockElements[tagName]) {                                                                                // 380
      while (stack.last() && inlineElements[stack.last()]) {                                                     // 381
        parseEndTag("", stack.last());                                                                           // 382
      }                                                                                                          // 383
    }                                                                                                            // 384
                                                                                                                 // 385
    if (optionalEndTagElements[tagName] && stack.last() == tagName) {                                            // 386
      parseEndTag("", tagName);                                                                                  // 387
    }                                                                                                            // 388
                                                                                                                 // 389
    unary = voidElements[tagName] || !!unary;                                                                    // 390
                                                                                                                 // 391
    if (!unary)                                                                                                  // 392
      stack.push(tagName);                                                                                       // 393
                                                                                                                 // 394
    var attrs = {};                                                                                              // 395
                                                                                                                 // 396
    rest.replace(ATTR_REGEXP,                                                                                    // 397
      function(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {                               // 398
        var value = doubleQuotedValue                                                                            // 399
          || singleQuotedValue                                                                                   // 400
          || unquotedValue                                                                                       // 401
          || '';                                                                                                 // 402
                                                                                                                 // 403
        attrs[name] = decodeEntities(value);                                                                     // 404
    });                                                                                                          // 405
    if (handler.start) handler.start(tagName, attrs, unary);                                                     // 406
  }                                                                                                              // 407
                                                                                                                 // 408
  function parseEndTag(tag, tagName) {                                                                           // 409
    var pos = 0, i;                                                                                              // 410
    tagName = angular.lowercase(tagName);                                                                        // 411
    if (tagName)                                                                                                 // 412
      // Find the closest opened tag of the same type                                                            // 413
      for (pos = stack.length - 1; pos >= 0; pos--)                                                              // 414
        if (stack[pos] == tagName)                                                                               // 415
          break;                                                                                                 // 416
                                                                                                                 // 417
    if (pos >= 0) {                                                                                              // 418
      // Close all the open elements, up the stack                                                               // 419
      for (i = stack.length - 1; i >= pos; i--)                                                                  // 420
        if (handler.end) handler.end(stack[i]);                                                                  // 421
                                                                                                                 // 422
      // Remove the open elements from the stack                                                                 // 423
      stack.length = pos;                                                                                        // 424
    }                                                                                                            // 425
  }                                                                                                              // 426
}                                                                                                                // 427
                                                                                                                 // 428
var hiddenPre=document.createElement("pre");                                                                     // 429
/**                                                                                                              // 430
 * decodes all entities into regular string                                                                      // 431
 * @param value                                                                                                  // 432
 * @returns {string} A string with decoded entities.                                                             // 433
 */                                                                                                              // 434
function decodeEntities(value) {                                                                                 // 435
  if (!value) { return ''; }                                                                                     // 436
                                                                                                                 // 437
  hiddenPre.innerHTML = value.replace(/</g,"&lt;");                                                              // 438
  // innerText depends on styling as it doesn't display hidden elements.                                         // 439
  // Therefore, it's better to use textContent not to cause unnecessary reflows.                                 // 440
  return hiddenPre.textContent;                                                                                  // 441
}                                                                                                                // 442
                                                                                                                 // 443
/**                                                                                                              // 444
 * Escapes all potentially dangerous characters, so that the                                                     // 445
 * resulting string can be safely inserted into attribute or                                                     // 446
 * element text.                                                                                                 // 447
 * @param value                                                                                                  // 448
 * @returns {string} escaped text                                                                                // 449
 */                                                                                                              // 450
function encodeEntities(value) {                                                                                 // 451
  return value.                                                                                                  // 452
    replace(/&/g, '&amp;').                                                                                      // 453
    replace(SURROGATE_PAIR_REGEXP, function(value) {                                                             // 454
      var hi = value.charCodeAt(0);                                                                              // 455
      var low = value.charCodeAt(1);                                                                             // 456
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';                                  // 457
    }).                                                                                                          // 458
    replace(NON_ALPHANUMERIC_REGEXP, function(value) {                                                           // 459
      return '&#' + value.charCodeAt(0) + ';';                                                                   // 460
    }).                                                                                                          // 461
    replace(/</g, '&lt;').                                                                                       // 462
    replace(/>/g, '&gt;');                                                                                       // 463
}                                                                                                                // 464
                                                                                                                 // 465
/**                                                                                                              // 466
 * create an HTML/XML writer which writes to buffer                                                              // 467
 * @param {Array} buf use buf.jain('') to get out sanitized html string                                          // 468
 * @returns {object} in the form of {                                                                            // 469
 *     start: function(tag, attrs, unary) {},                                                                    // 470
 *     end: function(tag) {},                                                                                    // 471
 *     chars: function(text) {},                                                                                 // 472
 *     comment: function(text) {}                                                                                // 473
 * }                                                                                                             // 474
 */                                                                                                              // 475
function htmlSanitizeWriter(buf, uriValidator) {                                                                 // 476
  var ignore = false;                                                                                            // 477
  var out = angular.bind(buf, buf.push);                                                                         // 478
  return {                                                                                                       // 479
    start: function(tag, attrs, unary) {                                                                         // 480
      tag = angular.lowercase(tag);                                                                              // 481
      if (!ignore && specialElements[tag]) {                                                                     // 482
        ignore = tag;                                                                                            // 483
      }                                                                                                          // 484
      if (!ignore && validElements[tag] === true) {                                                              // 485
        out('<');                                                                                                // 486
        out(tag);                                                                                                // 487
        angular.forEach(attrs, function(value, key) {                                                            // 488
          var lkey=angular.lowercase(key);                                                                       // 489
          var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');                            // 490
          if (validAttrs[lkey] === true &&                                                                       // 491
            (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {                                         // 492
            out(' ');                                                                                            // 493
            out(key);                                                                                            // 494
            out('="');                                                                                           // 495
            out(encodeEntities(value));                                                                          // 496
            out('"');                                                                                            // 497
          }                                                                                                      // 498
        });                                                                                                      // 499
        out(unary ? '/>' : '>');                                                                                 // 500
      }                                                                                                          // 501
    },                                                                                                           // 502
    end: function(tag) {                                                                                         // 503
        tag = angular.lowercase(tag);                                                                            // 504
        if (!ignore && validElements[tag] === true) {                                                            // 505
          out('</');                                                                                             // 506
          out(tag);                                                                                              // 507
          out('>');                                                                                              // 508
        }                                                                                                        // 509
        if (tag == ignore) {                                                                                     // 510
          ignore = false;                                                                                        // 511
        }                                                                                                        // 512
      },                                                                                                         // 513
    chars: function(chars) {                                                                                     // 514
        if (!ignore) {                                                                                           // 515
          out(encodeEntities(chars));                                                                            // 516
        }                                                                                                        // 517
      }                                                                                                          // 518
  };                                                                                                             // 519
}                                                                                                                // 520
                                                                                                                 // 521
                                                                                                                 // 522
// define ngSanitize module and register $sanitize service                                                       // 523
angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);                                       // 524
                                                                                                                 // 525
/* global sanitizeText: false */                                                                                 // 526
                                                                                                                 // 527
/**                                                                                                              // 528
 * @ngdoc filter                                                                                                 // 529
 * @name linky                                                                                                   // 530
 * @kind function                                                                                                // 531
 *                                                                                                               // 532
 * @description                                                                                                  // 533
 * Finds links in text input and turns them into html links. Supports http/https/ftp/mailto and                  // 534
 * plain email address links.                                                                                    // 535
 *                                                                                                               // 536
 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.                                          // 537
 *                                                                                                               // 538
 * @param {string} text Input text.                                                                              // 539
 * @param {string} target Window (_blank|_self|_parent|_top) or named frame to open links in.                    // 540
 * @returns {string} Html-linkified text.                                                                        // 541
 *                                                                                                               // 542
 * @usage                                                                                                        // 543
   <span ng-bind-html="linky_expression | linky"></span>                                                         // 544
 *                                                                                                               // 545
 * @example                                                                                                      // 546
   <example module="linkyExample" deps="angular-sanitize.js">                                                    // 547
     <file name="index.html">                                                                                    // 548
       <script>                                                                                                  // 549
         angular.module('linkyExample', ['ngSanitize'])                                                          // 550
           .controller('ExampleController', ['$scope', function($scope) {                                        // 551
             $scope.snippet =                                                                                    // 552
               'Pretty text with some links:\n'+                                                                 // 553
               'http://angularjs.org/,\n'+                                                                       // 554
               'mailto:us@somewhere.org,\n'+                                                                     // 555
               'another@somewhere.org,\n'+                                                                       // 556
               'and one more: ftp://127.0.0.1/.';                                                                // 557
             $scope.snippetWithTarget = 'http://angularjs.org/';                                                 // 558
           }]);                                                                                                  // 559
       </script>                                                                                                 // 560
       <div ng-controller="ExampleController">                                                                   // 561
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>                                      // 562
       <table>                                                                                                   // 563
         <tr>                                                                                                    // 564
           <td>Filter</td>                                                                                       // 565
           <td>Source</td>                                                                                       // 566
           <td>Rendered</td>                                                                                     // 567
         </tr>                                                                                                   // 568
         <tr id="linky-filter">                                                                                  // 569
           <td>linky filter</td>                                                                                 // 570
           <td>                                                                                                  // 571
             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>                               // 572
           </td>                                                                                                 // 573
           <td>                                                                                                  // 574
             <div ng-bind-html="snippet | linky"></div>                                                          // 575
           </td>                                                                                                 // 576
         </tr>                                                                                                   // 577
         <tr id="linky-target">                                                                                  // 578
          <td>linky target</td>                                                                                  // 579
          <td>                                                                                                   // 580
            <pre>&lt;div ng-bind-html="snippetWithTarget | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>             // 581
          </td>                                                                                                  // 582
          <td>                                                                                                   // 583
            <div ng-bind-html="snippetWithTarget | linky:'_blank'"></div>                                        // 584
          </td>                                                                                                  // 585
         </tr>                                                                                                   // 586
         <tr id="escaped-html">                                                                                  // 587
           <td>no filter</td>                                                                                    // 588
           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>                                     // 589
           <td><div ng-bind="snippet"></div></td>                                                                // 590
         </tr>                                                                                                   // 591
       </table>                                                                                                  // 592
     </file>                                                                                                     // 593
     <file name="protractor.js" type="protractor">                                                               // 594
       it('should linkify the snippet with urls', function() {                                                   // 595
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).                // 596
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +                     // 597
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');                                     // 598
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);                                      // 599
       });                                                                                                       // 600
                                                                                                                 // 601
       it('should not linkify snippet without the linky filter', function() {                                    // 602
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).                        // 603
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +              // 604
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');                                     // 605
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);                                      // 606
       });                                                                                                       // 607
                                                                                                                 // 608
       it('should update', function() {                                                                          // 609
         element(by.model('snippet')).clear();                                                                   // 610
         element(by.model('snippet')).sendKeys('new http://link.');                                              // 611
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).                // 612
             toBe('new http://link.');                                                                           // 613
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);                                      // 614
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())                         // 615
             .toBe('new http://link.');                                                                          // 616
       });                                                                                                       // 617
                                                                                                                 // 618
       it('should work with the target property', function() {                                                   // 619
        expect(element(by.id('linky-target')).                                                                   // 620
            element(by.binding("snippetWithTarget | linky:'_blank'")).getText()).                                // 621
            toBe('http://angularjs.org/');                                                                       // 622
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');                     // 623
       });                                                                                                       // 624
     </file>                                                                                                     // 625
   </example>                                                                                                    // 626
 */                                                                                                              // 627
angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {                                 // 628
  var LINKY_URL_REGEXP =                                                                                         // 629
        /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/,                          // 630
      MAILTO_REGEXP = /^mailto:/;                                                                                // 631
                                                                                                                 // 632
  return function(text, target) {                                                                                // 633
    if (!text) return text;                                                                                      // 634
    var match;                                                                                                   // 635
    var raw = text;                                                                                              // 636
    var html = [];                                                                                               // 637
    var url;                                                                                                     // 638
    var i;                                                                                                       // 639
    while ((match = raw.match(LINKY_URL_REGEXP))) {                                                              // 640
      // We can not end in these as they are sometimes found at the end of the sentence                          // 641
      url = match[0];                                                                                            // 642
      // if we did not match ftp/http/www/mailto then assume mailto                                              // 643
      if (!match[2] && !match[4]) {                                                                              // 644
        url = (match[3] ? 'http://' : 'mailto:') + url;                                                          // 645
      }                                                                                                          // 646
      i = match.index;                                                                                           // 647
      addText(raw.substr(0, i));                                                                                 // 648
      addLink(url, match[0].replace(MAILTO_REGEXP, ''));                                                         // 649
      raw = raw.substring(i + match[0].length);                                                                  // 650
    }                                                                                                            // 651
    addText(raw);                                                                                                // 652
    return $sanitize(html.join(''));                                                                             // 653
                                                                                                                 // 654
    function addText(text) {                                                                                     // 655
      if (!text) {                                                                                               // 656
        return;                                                                                                  // 657
      }                                                                                                          // 658
      html.push(sanitizeText(text));                                                                             // 659
    }                                                                                                            // 660
                                                                                                                 // 661
    function addLink(url, text) {                                                                                // 662
      html.push('<a ');                                                                                          // 663
      if (angular.isDefined(target)) {                                                                           // 664
        html.push('target="',                                                                                    // 665
                  target,                                                                                        // 666
                  '" ');                                                                                         // 667
      }                                                                                                          // 668
      html.push('href="',                                                                                        // 669
                url.replace(/"/g, '&quot;'),                                                                     // 670
                '">');                                                                                           // 671
      addText(text);                                                                                             // 672
      html.push('</a>');                                                                                         // 673
    }                                                                                                            // 674
  };                                                                                                             // 675
}]);                                                                                                             // 676
                                                                                                                 // 677
                                                                                                                 // 678
})(window, window.angular);                                                                                      // 679
                                                                                                                 // 680
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    // 689
                                                                                                                       // 690
}).call(this);                                                                                                         // 691
                                                                                                                       // 692
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angularjs:angular-sanitize'] = {};

})();
