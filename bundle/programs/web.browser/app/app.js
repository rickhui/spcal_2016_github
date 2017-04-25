var require = meteorInstall({"client":{"calculator.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/calculator.html                                                                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
      if (Meteor.isServer) return;                                                                                 // 2
                                                                                                                   // 3
      var templateUrl = "/client/calculator.html";                                                                 // 4
      var template = "<div layout=\"column\" class=\"container\" ng-cloak class=\"md-inline-form\"> <div class=\"tabsdemoDynamicHeight\" ng-cloak> <md-card> <md-tabs md-stretch-tabs=\"always\" style=\"min-height:865px\" md-border-bottom> <md-tab label=\"Deposit Plus\"> <md-content class=\"md-padding\"> <md-content layout-padding ng-controller=\"ValidationCtrl\"> <div> <form name=\"DpsInvForm\"> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Deposit Currency</label> <md-select name=\"depoCurr\" ng-model=\"cal.dps.depositCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies\" value=\"{{currency.abbrev}}\">{{currency.abbrev}}</md-option> </md-select> <div ng-messages=\"DpsInvForm.depoCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Linked Currency</label> <md-select name=\"linkCurr\" ng-model=\"cal.dps.linkedCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies | filter:linkedCurrencyFilter\" value=\"{{currency.abbrev}}\"> {{currency.abbrev}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.linkCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Currency Pair</label> <input name=\"currencyPair\" ng-if=\"cal.dps.depositCurrency&&cal.dps.linkedCurrency\" value=\"{{cal.dps.depositCurrency}}-{{cal.dps.linkedCurrency}}\" disabled=\"disabled\"> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dps.tenor\" required> <md-option ng-repeat=\"tenor in dpsTenors\" value=\"{{tenor}}\"> {{tenor}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex-gt-sm> <label>Amount Deposit <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <span id=\"tempAmount\" style=\"display:none\">{{cal.dps.amountDeposit | number:0}}</span> <input md-maxlength=\"20\" ng-maxlength=\"20\" id=\"convertAmount\" name=\"amountDeposit\" ng-pattern=\"/^[0-9]*$/\" ng-model=\"cal.dps.amountDeposit\" ng-blur=\"convert2dp()\"> <div ng-messages=\"DpsInvForm.amountDeposit.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"maxlength\">Your field is too long.</div> <div ng-message=\"pattern\">Not a Valid Amount.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Interest Amount <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <input name=\"interestAmount\" ng-if=\"cal.dps.amountDeposit && cal.dps.yieldPa\" value=\"{{cal.dps.amountDeposit*cal.dps.yieldPa/100 | number:2}}\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <!-- <h4 style=\"color:#737373\">Yield P.A. &emsp;&emsp;</h4> --> <md-slider-container flex> <label style=\"color:#afaeae\">Yield P.A. *</label> <md-slider md-discrete flex min=\"2\" max=\"9.5\" step=\"0.5\" ng-model=\"cal.dps.yieldPa\" aria-label=\"yieldPaSlider\" required></md-slider> <md-input-container> <input flex ng-if=\"cal.dps.yieldPa\" value=\"{{cal.dps.yieldPa}}%\" aria-label=\"yieldPaInput\" readonly=\"readonly\"> </md-input-container> </md-slider-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Conversion Rate</label> <input name=\"conversionRate\" ng-if=\"cal.dps.conversionRate\" value=\"{{cal.dps.conversionRate}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <!-- <label>Conversion Rate &emsp;&emsp;</label>\n                    <div style=\"font-size: 18px\"><b>{{cal.dps.conversionRate}}</b></div> --> </div> <div layout=\"row\" layout-align=\"end center\"> <!-- showAdvanced($event)\n                    resizeDiag($event) --> <input id=\"toggleBtn\" type=\"button\" style=\"display:none\" ng-click=\"resizeDiag($event)\"> <div> <md-button ng-disabled=\"DpsInvForm.$invalid\" ng-click=\"calculateConversionRate()\" class=\"md-raised md-warn\" aria-label=\"DPS Calculate Button\"> <md-tooltip> See the conversion rate under the chosen criteria </md-tooltip> Query </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Preview </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <!-- <div ng-controller=\"DiagramCtrl\">\n\n                    </div> --> <div ng-controller=\"DiagramCtrl\" id=\"dpsChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> <md-tab label=\"DCDC\"> <md-content class=\"md-padding\"> <md-content layout-padding ng-controller=\"ValidationCtrl\"> <div> <form name=\"DcdcInvForm\"> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Linked Stock</label> <md-select name=\"linkStock\" ng-model=\"cal.dcdc.linkedStock\" ng-change=\"onStockChange(cal.dcdc.linkedStock)\" required> <md-option ng-repeat=\"stock in stocks\" value=\"{{stock}}\">{{stock}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.linkStock.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Spot Price</label> <input name=\"spotPrice\" ng-if=\"cal.dcdc.linkedStock\" value=\"190.2(Fake)\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <div style=\"color:#afaeae\">Query for</div> <md-radio-group layout=\"row\" ng-model=\"cal.dcdc.scenario\"> <md-radio-button value=\"1\" style=\"margin-right:100px\">Coupon P.A.</md-radio-button> <md-radio-button value=\"2\">Strike Price</md-radio-button> </md-radio-group> </md-input-container> </div> <div layout=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-model=\"cal.dcdc.strikePrice\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> <div ng-messages=\"DcdcInvForm.strikePrice.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Coupon P.A.</label> <input name=\"couponPa\" ng-model=\"cal.dcdc.couponPa\" type=\"number\" min=\"1\" required> <div ng-messages=\"DcdcInvForm.couponPa.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dcdc.tenor\" required> <md-option ng-repeat=\"tenor in dcdcTenors\" value=\"{{tenor.value}}\"> {{tenor.name}} </md-option> </md-select> <div ng-messages=\"DcdcInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>KO Type</label> <md-select name=\"koType\" ng-model=\"cal.dcdc.koType\" required> <md-option ng-repeat=\"koType in koTypes\" value=\"{{koType}}\">{{koType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.koType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>KO Barrier</label> <input name=\"koBarrier\" ng-model=\"cal.dcdc.koBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> <div ng-messages=\"DcdcInvForm.koBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Barrier Type</label> <md-select name=\"barrierType\" ng-model=\"cal.dcdc.barrierType\" required> <md-option ng-repeat=\"barrierType in barrierTypes\" value=\"{{barrierType}}\">{{barrierType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.barrierType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>KI Barrier</label> <input name=\"kiBarrier\" ng-model=\"cal.dcdc.kiBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" ng-required=\"cal.dcdc.barrierType !== 'NONE'\" ng-disabled=\"cal.dcdc.barrierType === 'NONE'\"> <div ng-messages=\"DcdcInvForm.kiBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Coupon P.A.</label> <input name=\"couponPa\" ng-if=\"cal.dcdc.couponPa\" value=\"{{cal.dcdc.couponPa}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-if=\"cal.dcdc.strikePrice\" value=\"{{cal.dcdc.strikePrice}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> </div> <div layout=\"row\" layout-align=\"end center\"> <div ng-if=\"cal.dcdc.scenario == 1\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateCouponPa()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the coupon per annum under the chosen criteria </md-tooltip> Query </md-button> </div> <div ng-if=\"cal.dcdc.scenario == 2\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateStrikePrice()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the strike price under the chosen criteria </md-tooltip> Query </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\" style=\"margin-top:-24px\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Preview </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <div ng-controller=\"DiagramCtrl\" id=\"dcdcChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> </md-tabs> </md-card> </div> </div> ";
                                                                                                                   // 6
      angular.module('angular-templates')                                                                          // 7
        .run(['$templateCache', function($templateCache) {                                                         // 8
          $templateCache.put(templateUrl, template);                                                               // 9
        }]);                                                                                                       // 10
                                                                                                                   // 11
      module.exports = {};                                                                                         // 12
      module.exports.__esModule = true;                                                                            // 13
      module.exports.default = templateUrl;                                                                        // 14
                                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dialog.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/dialog.html                                                                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
      if (Meteor.isServer) return;                                                                                 // 2
                                                                                                                   // 3
      var templateUrl = "/client/dialog.html";                                                                     // 4
      var template = "<md-dialog aria-label=\"Comparison for HSBC\"> <form ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>Comparison for Other Products</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <md-icon md-svg-src=\"images/ic_cancel_white_48px.svg\" style=\"font-size:36px\" aria-label=\"Close dialog\"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class=\"md-dialog-content\" ng-controller=\"BarChartCtrl\"> <h2>Hello Hello Hello</h2> <p> HSBC is the best company in the world!HSBC is the best company in the world!HSBC is the best company in the world!HSBC is the best company in the world!HSBC is the best company in the world! </p> <br> <!-- style=\"width: 100%; height: 400px; margin: 0 auto\" --> <!-- <div layout=\"row\"> --> <div id=\"barContainer\" style=\"min-width:310px;height:400px;margin:0 auto\"></div> <!-- </div> --> <br> <div layout=\"row\"> <md-card flex> <div class=\"md-toolbar-tools\"> <span>HSBC</span> </div> <md-content> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> </md-list> </md-content> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>BOC</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> </md-list> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>Standard Charter</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> </md-list> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>Citi</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> </md-list> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>Hang Seng</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> </md-list> </md-card> </div> </div> </md-dialog-content> <md-dialog-actions layout=\"row\"> <md-button ng-click=\"\" target=\"_blank\" md-autofocus> More on Products </md-button> <span flex></span> <md-button ng-click=\"\" class=\"md-primary\"> Contact our Agents </md-button> <md-button ng-click=\"\" class=\"md-primary\"> Print PDF </md-button> </md-dialog-actions> </form> </md-dialog> ";
                                                                                                                   // 6
      angular.module('angular-templates')                                                                          // 7
        .run(['$templateCache', function($templateCache) {                                                         // 8
          $templateCache.put(templateUrl, template);                                                               // 9
        }]);                                                                                                       // 10
                                                                                                                   // 11
      module.exports = {};                                                                                         // 12
      module.exports.__esModule = true;                                                                            // 13
      module.exports.default = templateUrl;                                                                        // 14
                                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"matrix.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/matrix.html                                                                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
      if (Meteor.isServer) return;                                                                                 // 2
                                                                                                                   // 3
      var templateUrl = "/client/matrix.html";                                                                     // 4
      var template = "<md-card style=\"height:450px\"> <!-- <md-toolbar>\n    <h3>Coupon Rate p.a. Matrix</h3>\n  </md-toolbar> --> <md-card-title> <md-content class=\"container\"> <div id=\"parentContainer\"> <input id=\"search_field\" type=\"hidden\"> <input id=\"search_button\" style=\"display:none\" type=\"button\"> <div class=\"handsontable\" ng-controller=\"MatrixCtrl\" id=\"example\"></div> </div> </md-content> </md-card-title> <md-card-actions layout=\"row\" layout-align=\"end center\"> <md-button class=\"md-raised\" style=\"background:#39f;color:#fff\">Conversion Rates</md-button> <md-button class=\"md-raised\" style=\"background:#c06;color:#fff\">Interest Rates</md-button> </md-card-actions> </md-card> ";
                                                                                                                   // 6
      angular.module('angular-templates')                                                                          // 7
        .run(['$templateCache', function($templateCache) {                                                         // 8
          $templateCache.put(templateUrl, template);                                                               // 9
        }]);                                                                                                       // 10
                                                                                                                   // 11
      module.exports = {};                                                                                         // 12
      module.exports.__esModule = true;                                                                            // 13
      module.exports.default = templateUrl;                                                                        // 14
                                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/nav.html                                                                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
      if (Meteor.isServer) return;                                                                                 // 2
                                                                                                                   // 3
      var templateUrl = "/client/nav.html";                                                                        // 4
      var template = "<md-toolbar style=\"background:#F5F5F5\" md-padding> <div layout=\"row\" layout-align=\"start center\" layout-padding> <img alt=\"Brand\" src=\"images/Hsbc-logo.svg\" width=\"120\"> <!-- <i class=\"material-icons md-48 md-dark md-inactive\">search</i> --> <span flex></span> <div ng-controller=\"AutoCompleteCtrl as ctrl\" ng-cloak> <form ng-submit=\"$event.preventDefault()\"> <md-autocomplete style=\"width:300px\" md-autofocus md-search-text-change=\"ctrl.searchTextChange(ctrl.searchText)\" md-search-text=\"ctrl.searchText\" md-selected-item-change=\"ctrl.selectedItemChange(item)\" md-selected-item=\"ctrl.selectedItem\" md-no-cache=\"ctrl.noCache\" ng-disabled=\"ctrl.isDisabled\" md-items=\"item in ctrl.querySearch(ctrl.searchText)\" md-item-text=\"item.display\" md-min-length=\"0\" placeholder=\"Currency/Equilty-linked Assets\"> <md-item-template> <span md-highlight-text=\"ctrl.searchText\" md-highlight-flags=\"^i\">{{item.display}}</span> </md-item-template> <md-not-found> No states matching \"{{ctrl.searchText}}\" were found. </md-not-found> </md-autocomplete> </form> </div> </div> </md-toolbar> ";
                                                                                                                   // 6
      angular.module('angular-templates')                                                                          // 7
        .run(['$templateCache', function($templateCache) {                                                         // 8
          $templateCache.put(templateUrl, template);                                                               // 9
        }]);                                                                                                       // 10
                                                                                                                   // 11
      module.exports = {};                                                                                         // 12
      module.exports.__esModule = true;                                                                            // 13
      module.exports.default = templateUrl;                                                                        // 14
                                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reference.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/reference.html                                                                                           //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
      if (Meteor.isServer) return;                                                                                 // 2
                                                                                                                   // 3
      var templateUrl = "/client/reference.html";                                                                  // 4
      var template = "<md-card> <div style=\"height:400px\" class=\"container\" id=\"video\" ng-controller=\"SubheaderAppCtrl\" layout=\"column\" flex layout-fill ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\" style=\"background-color:navy;color:#fff\">Reference Link</div> </md-toolbar> <md-content md-theme=\"altTheme\"> <section> <md-subheader style=\"font-size:16px\" class=\"md-warn\">Information Links</md-subheader> <md-list layout=\"column\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in infolinks\" ng-href=\"{{message.link}}\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-accent\">Market Data</md-subheader> <md-list layout=\"column\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in datalinks\" ng-href=\"{{message.link}}\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-primary\">Videos</md-subheader> <md-list ng-controller=\"videoCtrl\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in videos\" ng-click=\"showAdvanced($event, message.link)\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> <md-list-item class=\"secondary-button-padding\"> <p>Check out a full list of our videos and learn more about our products</p> <md-button class=\"md-secondary\" href=\"two\">Here</md-button> </md-list-item> </md-list> </section> </md-content> </div> </md-card> ";
                                                                                                                   // 6
      angular.module('angular-templates')                                                                          // 7
        .run(['$templateCache', function($templateCache) {                                                         // 8
          $templateCache.put(templateUrl, template);                                                               // 9
        }]);                                                                                                       // 10
                                                                                                                   // 11
      module.exports = {};                                                                                         // 12
      module.exports.__esModule = true;                                                                            // 13
      module.exports.default = templateUrl;                                                                        // 14
                                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toggle.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/toggle.html                                                                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
      if (Meteor.isServer) return;                                                                                 // 2
                                                                                                                   // 3
      var templateUrl = "/client/toggle.html";                                                                     // 4
      var template = "<md-dialog class=\"transparent\" ng-controller=\"DiagramCtrl\"></md-dialog> ";               // 5
                                                                                                                   // 6
      angular.module('angular-templates')                                                                          // 7
        .run(['$templateCache', function($templateCache) {                                                         // 8
          $templateCache.put(templateUrl, template);                                                               // 9
        }]);                                                                                                       // 10
                                                                                                                   // 11
      module.exports = {};                                                                                         // 12
      module.exports.__esModule = true;                                                                            // 13
      module.exports.default = templateUrl;                                                                        // 14
                                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"video.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/video.html                                                                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
      if (Meteor.isServer) return;                                                                                 // 2
                                                                                                                   // 3
      var templateUrl = "/client/video.html";                                                                      // 4
      var template = "<md-dialog aria-label=\"Video for HSBC\"> <md-dialog-content> <div ng-controller=\"videoCtrl\"> <div id=\"player\"></div> </div> </md-dialog-content> </md-dialog> ";
                                                                                                                   // 6
      angular.module('angular-templates')                                                                          // 7
        .run(['$templateCache', function($templateCache) {                                                         // 8
          $templateCache.put(templateUrl, template);                                                               // 9
        }]);                                                                                                       // 10
                                                                                                                   // 11
      module.exports = {};                                                                                         // 12
      module.exports.__esModule = true;                                                                            // 13
      module.exports.default = templateUrl;                                                                        // 14
                                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.html.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/main.html.js                                                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
            Meteor.startup(function() {                                                                            // 2
              var attrs = {"ng-app":"spcal","ng-cloak":""};                                                        // 3
              for (var prop in attrs) {                                                                            // 4
                document.body.setAttribute(prop, attrs[prop]);                                                     // 5
              }                                                                                                    // 6
            });                                                                                                    // 7
                                                                                                                   // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["angular","angular-meteor","angular-material","handsontable-pro/dist/handsontable.full","angular-material/angular-material.css","handsontable-pro/dist/handsontable.full.css","highcharts","highcharts/highstock","highcharts/modules/data.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/main.js                                                                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                  //
                                                                                                                   //
var _angular = require('angular');                                                                                 //
                                                                                                                   //
var _angular2 = _interopRequireDefault(_angular);                                                                  //
                                                                                                                   //
var _angularMeteor = require('angular-meteor');                                                                    //
                                                                                                                   //
var _angularMeteor2 = _interopRequireDefault(_angularMeteor);                                                      //
                                                                                                                   //
var _angularMaterial = require('angular-material');                                                                //
                                                                                                                   //
var _angularMaterial2 = _interopRequireDefault(_angularMaterial);                                                  //
                                                                                                                   //
var _handsontableProDistHandsontableFull = require('handsontable-pro/dist/handsontable.full');                     //
                                                                                                                   //
var _handsontableProDistHandsontableFull2 = _interopRequireDefault(_handsontableProDistHandsontableFull);          //
                                                                                                                   //
require('angular-material/angular-material.css');                                                                  //
                                                                                                                   //
require('handsontable-pro/dist/handsontable.full.css');                                                            //
                                                                                                                   //
var Highcharts = require('highcharts');                                                                            // 8
var HighBarCharts = require('highcharts/highstock');                                                               // 9
var Highstock = require('highcharts/highstock');                                                                   // 10
require('highcharts/modules/data.js')(Highcharts);                                                                 // 11
require('highcharts/modules/data.js')(Highstock);                                                                  // 12
                                                                                                                   //
var spcal = _angular2['default'].module('spcal', [_angularMeteor2['default'], _angularMaterial2['default'], 'ngMessages', 'ngSanitize']);
                                                                                                                   //
var dpsChart;                                                                                                      // 21
var dcdcChart;                                                                                                     // 22
var barChart;                                                                                                      // 23
var pairCurr;                                                                                                      // 24
var rateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
var container;                                                                                                     // 35
var hot;                                                                                                           // 36
var videoToPlay;                                                                                                   // 37
                                                                                                                   //
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                // 39
                                                                                                                   //
  $mdThemingProvider.theme('red').primaryPalette('red');                                                           // 41
                                                                                                                   //
  $mdThemingProvider.theme('blue').primaryPalette('blue');                                                         // 44
}]).controller('ValidationCtrl', ["$timeout", "$scope", "$mdDialog", "$interval", function ($timeout, $scope, $mdDialog, $interval) {
  DialogController.$inject = ["$scope", "$mdDialog"];                                                              // 49
  $scope.theme = 'red';                                                                                            //
                                                                                                                   // 51
  var isThemeRed = true;                                                                                           //
                                                                                                                   // 53
  $interval(function () {                                                                                          // 54
    $scope.theme = isThemeRed ? 'blue' : 'red';                                                                    //
                                                                                                                   // 56
    isThemeRed = !isThemeRed;                                                                                      //
  }, 2000);                                                                                                        //
                                                                                                                   // 59
  $scope.onCurPairChange = function (depoCur, linkCur) {                                                           // 60
    if (depoCur && linkCur) {                                                                                      // 61
      var seq = depoCur + "-" + linkCur;                                                                           // 62
      var inv = linkCur + "-" + depoCur;                                                                           // 63
      pairCurr = seq;                                                                                              // 64
      switch (pairCurr) {                                                                                          // 65
        case "HKD-AUD":                                                                                            // 66
          rateData = [[5.9015, 5.8938, 5.8961, 5.894, 5.915, 5.9401], [5.9054, 5.9007, 5.9055, 5.906, 5.9362, 5.9683], [5.909, 5.9072, 5.9142, 5.9171, 5.9559, 'N/A'], [5.9124, 5.9132, 5.9223, 5.9274, 'N/A', 'N/A'], [5.9157, 5.919, 5.93, 5.9371, 'N/A', 'N/A'], [5.9188, 5.9244, 5.9372, 5.9462, 'N/A', 'N/A'], [5.9218, 5.9296, 5.9441, 5.9549, 'N/A', 'N/A'], [5.9246, 5.9345, 5.9507, 5.9632, 'N/A', 'N/A'], [5.9274, 5.9392, 5.957, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 77
        case "AUD-HKD":                                                                                            //
          //TODO:Add rateData                                                                                      // 80
          break;                                                                                                   // 80
        case "USD-AUD":                                                                                            // 82
          rateData = [[0.7594, 0.7589, 0.7583, 0.7577, 0.7596, 0.7616], [0.76, 0.7599, 0.7597, 0.7595, 0.7627, 0.7658], [0.7606, 0.7608, 0.7609, 0.7611, 0.7655, 0.7696], [0.7611, 0.7617, 0.7621, 0.7626, 0.7681, 'N/A'], [0.7616, 0.7625, 0.7632, 0.764, 'N/A', 'N/A'], [0.7621, 0.7632, 0.7643, 0.7653, 'N/A', 'N/A'], [0.7625, 0.7639, 0.7652, 0.7665, 'N/A', 'N/A'], [0.7629, 0.7646, 0.7662, 0.7676, 'N/A', 'N/A'], [0.7633, 0.7653, 0.767, 0.7687, 'N/A', 'N/A']];
          break;                                                                                                   // 93
        case "AUD-USD":                                                                                            //
          //TODO:Add rateData                                                                                      // 96
          break;                                                                                                   // 96
        case "HKD-GBP":                                                                                            // 98
          rateData = [[9.7533, 9.7583, 9.7561, 9.7433, 9.668, 'N/A'], [9.7475, 9.7482, 9.7424, 9.7268, 'N/A', 'N/A'], [9.7419, 9.7387, 9.7296, 9.7113, 'N/A', 'N/A'], [9.7367, 9.7298, 9.7174, 9.6965, 'N/A', 'N/A'], [9.7317, 9.7212, 9.7058, 9.6824, 'N/A', 'N/A'], [9.7268, 9.713, 9.6948, 9.6689, 'N/A', 'N/A'], [9.7222, 9.7052, 9.6841, 9.6559, 'N/A', 'N/A'], [9.7177, 9.6976, 9.6739, 9.6434, 'N/A', 'N/A'], [9.7134, 9.6903, 9.664, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 109
        case "HKD-CAD":                                                                                            // 111
          rateData = [[5.9099, 5.9081, 5.8937, 5.885, 5.8985, 5.9098], [5.9146, 5.9159, 5.9056, 5.9005, 5.925, 5.9451], [5.9189, 5.9231, 5.9162, 5.9143, 5.9484, 5.976], [5.9229, 5.9296, 5.9259, 5.9268, 5.9693, 'N/A'], [5.9266, 5.9357, 5.9348, 5.9382, 'N/A', 'N/A'], [5.9302, 5.9414, 5.943, 5.9487, 'N/A', 'N/A'], [5.9335, 5.9467, 5.9507, 5.9584, 'N/A', 'N/A'], [5.9367, 5.9518, 5.958, 5.9676, 'N/A', 'N/A'], [5.9397, 5.9566, 5.9648, 5.9762, 'N/A', 'N/A']];
          break;                                                                                                   // 122
        case "CAD-HKD":                                                                                            // 124
          rateData = [[6.0066, 6.0108, 6.0259, 6.0321, 6.0222, 6.0196], [6.0015, 6.0022, 6.0135, 6.0165, 5.997, 5.9863], [5.9969, 5.9946, 6.0025, 6.0029, 5.9749, 5.9571], [5.9927, 5.9878, 5.9928, 5.9908, 5.955, 5.9307], [5.9887, 5.9815, 5.9839, 5.9798, 5.9367, 'N/A'], [5.9851, 5.9757, 5.9757, 5.9697, 'N/A', 'N/A'], [5.9816, 5.9702, 5.968, 5.9602, 'N/A', 'N/A'], [5.9784, 5.9651, 5.9608, 5.9514, 'N/A', 'N/A'], [5.9753, 5.9603, 5.9541, 5.943, 'N/A', 'N/A']];
          break;                                                                                                   // 135
        case "HKD-EUR":                                                                                            // 137
          rateData = [[8.4099, 8.4216, 8.4286, 8.4289, 8.435, 8.4295], [8.4038, 8.4111, 8.414, 8.411, 8.4037, 8.3881], [8.3982, 8.4015, 8.4009, 8.3949, 8.3755, 8.3505], [8.3931, 8.3927, 8.3889, 8.3802, 8.3495, 8.3157], [8.3882, 8.3846, 8.3779, 8.3667, 8.3254, 'N/A'], [8.3837, 8.3771, 8.3676, 8.3541, 'N/A', 'N/A'], [8.3795, 8.3699, 8.358, 8.3422, 'N/A', 'N/A'], [8.3755, 8.3632, 8.3488, 8.331, 'N/A', 'N/A'], [8.3716, 8.3568, 8.3401, 8.3202, 'N/A', 'N/A']];
          break;                                                                                                   // 148
        case "HKD-CNH":                                                                                            // 150
          rateData = [[1.1326, 1.1301, 1.128, 1.1254, 1.1188, 1.1147], [1.1336, 1.1319, 1.1304, 1.1287, 1.1248, 1.123], [1.1344, 1.1333, 1.1324, 1.1313, 1.1297, 1.1296], [1.1352, 1.1345, 1.1341, 1.1335, 1.1338, 1.1351], [1.1358, 1.1356, 1.1356, 1.1355, 1.1374, 1.1399], [1.1365, 1.1366, 1.137, 1.1373, 1.1406, 1.1441], [1.137, 1.1376, 1.1383, 1.1389, 1.1435, 'N/A'], [1.1375, 1.1384, 1.1395, 1.1404, 'N/A', 'N/A'], [1.138, 1.1393, 1.1406, 1.1418, 'N/A', 'N/A']];
          break;                                                                                                   // 161
        default:                                                                                                   // 163
          rateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
      }                                                                                                            // 175
      hot.loadData(rateData);                                                                                      // 176
      var series = dpsChart.series;                                                                                // 177
      for (var i = 0; i < series.length; i++) {                                                                    // 178
        var column = series[i];                                                                                    // 179
        if (column.name === seq || column.name === inv) {                                                          // 180
          column.show();                                                                                           //
        } else {                                                                                                   // 182
          column.hide();                                                                                           //
        }                                                                                                          //
      }                                                                                                            //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 188
  $scope.convert2dp = function () {                                                                                // 189
    document.getElementById('convertAmount').value = document.getElementById('tempAmount').innerHTML;              //
  };                                                                                                               //
                                                                                                                   // 192
  $scope.onStockChange = function (stockName) {                                                                    // 193
    var series = dcdcChart.series;                                                                                 // 194
    var navigatorIndex = series.length - 1;                                                                        // 195
    for (var i = 0; i < navigatorIndex; i++) {                                                                     // 196
      var column = series[i];                                                                                      // 197
      if (column.name === stockName) {                                                                             //
        //series[navigatorIndex].data = column.data;                                                               // 199
        column.showInNavigator = true;                                                                             //
        //dcdcChart.navigator.series = column;                                                                     // 201
        column.show();                                                                                             //
      } else {                                                                                                     // 203
        column.showInNavigator = false;                                                                            // 204
        column.hide();                                                                                             //
      }                                                                                                            //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 209
  $scope.calculateConversionRate = function () {                                                                   // 210
    var dps = $scope.cal.dps;                                                                                      // 211
    var dpsDoc = DpsData.findOne({ depo_cur: dps.depositCurrency, link_cur: dps.linkedCurrency,                    // 212
      tenor: dps.tenor, interest_rate: dps.yieldPa });                                                             // 213
    if (dpsDoc) {                                                                                                  // 214
      dps.conversionRate = dpsDoc.conversion_rate;                                                                 // 215
      document.getElementById('search_field').value = dpsDoc.conversion_rate;                                      // 216
      document.getElementById('search_button').click();                                                            //
    } else {                                                                                                       // 218
      dps.conversionRate = undefined;                                                                              //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 222
  $scope.calculateCouponPa = function () {                                                                         // 223
    var dcdc = $scope.cal.dcdc;                                                                                    // 224
    if (dcdc.barrierType === 'NONE') {                                                                             // 225
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 227
        ki_barrier: null });                                                                                       //
    } else {                                                                                                       // 229
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 231
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                   //
    }                                                                                                              // 233
    if (dcdcDoc) {                                                                                                 // 234
      dcdc.couponPa = dcdcDoc.coupon_pa;                                                                           //
    } else {                                                                                                       // 236
      dcdc.couponPa = undefined;                                                                                   //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 240
  $scope.calculateStrikePrice = function () {                                                                      // 241
    var dcdc = $scope.cal.dcdc;                                                                                    // 242
    if (dcdc.barrierType === 'NONE') {                                                                             // 243
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 245
        ki_barrier: null });                                                                                       //
    } else {                                                                                                       // 247
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 249
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                   //
    }                                                                                                              // 251
    if (dcdcDoc) {                                                                                                 // 252
      dcdc.strikePrice = dcdcDoc.strike;                                                                           //
    } else {                                                                                                       // 254
      dcdc.strikePrice = undefined;                                                                                //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 258
  $scope.resizeDiag = function (ev) {                                                                              // 259
    $mdDialog.show({                                                                                               // 260
      controller: DialogController,                                                                                // 261
      templateUrl: 'client/toggle.html',                                                                           // 262
      parent: _angular2['default'].element(document.body),                                                         // 263
      targetEvent: ev,                                                                                             // 264
      clickOutsideToClose: true                                                                                    //
    });                                                                                                            //
  };                                                                                                               //
                                                                                                                   // 268
  $scope.showAdvanced = function (ev) {                                                                            // 269
    $mdDialog.show({                                                                                               // 270
      controller: DialogController,                                                                                // 271
      templateUrl: 'client/dialog.html',                                                                           // 272
      parent: _angular2['default'].element(document.body),                                                         // 273
      targetEvent: ev,                                                                                             // 274
      clickOutsideToClose: true                                                                                    //
    });                                                                                                            //
  };                                                                                                               //
                                                                                                                   // 278
  function DialogController($scope, $mdDialog) {                                                                   // 279
    $scope.hide = function () {                                                                                    // 280
      $mdDialog.hide();                                                                                            //
    };                                                                                                             //
                                                                                                                   // 283
    $scope.cancel = function () {                                                                                  // 284
      $mdDialog.cancel();                                                                                          //
    };                                                                                                             //
                                                                                                                   // 287
    $scope.answer = function (answer) {                                                                            // 288
      $mdDialog.hide(answer);                                                                                      //
    };                                                                                                             //
  }                                                                                                                //
                                                                                                                   // 292
  $scope.cal = {                                                                                                   // 293
    dps: {},                                                                                                       // 294
    dcdc: {                                                                                                        // 295
      scenario: 1                                                                                                  //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 299
  $scope.currencies = 'AUD, CAD, CNH, EUR, GBP, HKD, USD'.split(', ').map(function (currency) {                    // 300
    return { abbrev: currency };                                                                                   //
  });                                                                                                              //
                                                                                                                   // 303
  $scope.dpsTenors = ['1W', '2W', '3W', '1M', '2M', '3M'];                                                         //
                                                                                                                   // 305
  $scope.dcdcTenors = [{                                                                                           // 307
    name: '3M',                                                                                                    // 308
    value: 3                                                                                                       //
  }, {                                                                                                             // 310
    name: '6M',                                                                                                    // 311
    value: 6                                                                                                       //
  }, {                                                                                                             // 313
    name: '9M',                                                                                                    // 314
    value: 9                                                                                                       //
  }, {                                                                                                             // 316
    name: '12M',                                                                                                   // 317
    value: 12                                                                                                      //
  }];                                                                                                              //
                                                                                                                   // 321
  $scope.stocks = ['700 HK', '388 HK'];                                                                            //
                                                                                                                   // 323
  $scope.koTypes = ['Daily', 'Period End'];                                                                        //
                                                                                                                   // 325
  $scope.barrierTypes = ['NONE', 'AKI', 'EKI'];                                                                    //
                                                                                                                   //
  //dcdcview Button JS                                                                                             // 328
  $scope.demo = {                                                                                                  // 329
    showTooltip: false,                                                                                            // 330
    tipDirection: 'bottom'                                                                                         //
  };                                                                                                               //
                                                                                                                   // 333
  $scope.demo.delayTooltip = undefined;                                                                            // 334
  $scope.$watch('demo.delayTooltip', function (val) {                                                              // 335
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;                                                             //
  });                                                                                                              //
                                                                                                                   // 338
  $scope.linkedCurrencyFilter = function (inputCur) {                                                              // 339
    return inputCur.abbrev !== $scope.cal.dps.depositCurrency && !(inputCur.abbrev === 'USD' && $scope.cal.dps.depositCurrency === 'HKD') && !(inputCur.abbrev === 'HKD' && $scope.cal.dps.depositCurrency === 'USD');
  };                                                                                                               //
}]);                                                                                                               //
                                                                                                                   // 346
spcal.controller('AutoCompleteCtrl', ["$timeout", "$q", "$log", function ($timeout, $q, $log) {                    // 347
  var self = this;                                                                                                 //
                                                                                                                   // 349
  self.simulateQuery = true;                                                                                       // 350
  self.isDisabled = false;                                                                                         //
                                                                                                                   //
  // list of `state` value/display objects                                                                         // 353
  self.states = loadAll();                                                                                         // 354
  self.querySearch = querySearch;                                                                                  // 355
  self.selectedItemChange = selectedItemChange;                                                                    // 356
  self.searchTextChange = searchTextChange;                                                                        //
                                                                                                                   // 358
  self.newState = newState;                                                                                        //
                                                                                                                   // 360
  function newState(state) {                                                                                       // 361
    alert("Sorry! You'll need to create a Constitution for " + state + " first!");                                 //
  }                                                                                                                //
                                                                                                                   //
  // ******************************                                                                                //
  // Internal methods                                                                                              //
  // ******************************                                                                                //
                                                                                                                   //
  /**                                                                                                              //
   * Search for states... use $timeout to simulate                                                                 //
   * remote dataservice call.                                                                                      //
   */                                                                                                              // 372
  function querySearch(query) {                                                                                    // 373
    var results = query ? self.states.filter(createFilterFor(query)) : self.states,                                //
        deferred;                                                                                                  // 375
    if (self.simulateQuery) {                                                                                      // 376
      deferred = $q.defer();                                                                                       // 377
      $timeout(function () {                                                                                       // 377
        deferred.resolve(results);                                                                                 //
      }, Math.random() * 1000, false);                                                                             // 378
      return deferred.promise;                                                                                     //
    } else {                                                                                                       // 380
      return results;                                                                                              //
    }                                                                                                              //
  }                                                                                                                //
                                                                                                                   // 384
  function searchTextChange(text) {                                                                                // 385
    $log.info('Text changed to ' + text);                                                                          //
  }                                                                                                                //
                                                                                                                   // 388
  function selectedItemChange(item) {                                                                              // 389
    $log.info('Item changed to ' + JSON.stringify(item));                                                          //
  }                                                                                                                //
                                                                                                                   //
  /**                                                                                                              //
   * Build `states` list of key/value pairs                                                                        //
   */                                                                                                              // 395
  function loadAll() {                                                                                             // 396
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';                                                                                 //
                                                                                                                   // 404
    return allStates.split(/, +/g).map(function (state) {                                                          // 405
      return {                                                                                                     // 406
        value: state.toLowerCase(),                                                                                // 407
        display: state                                                                                             //
      };                                                                                                           //
    });                                                                                                            //
  }                                                                                                                //
                                                                                                                   //
  /**                                                                                                              //
   * Create filter function for a query string                                                                     //
   */                                                                                                              // 415
  function createFilterFor(query) {                                                                                // 416
    var lowercaseQuery = _angular2['default'].lowercase(query);                                                    //
                                                                                                                   // 418
    return function filterFn(state) {                                                                              // 419
      return state.value.indexOf(lowercaseQuery) === 0;                                                            //
    };                                                                                                             //
  }                                                                                                                //
  // }                                                                                                             //
}]);                                                                                                               //
                                                                                                                   // 427
var themeIcons = function themeIcons($mdIconProvider) {                                                            //
                                                                                                                   // 429
  $mdIconProvider.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg").iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg").iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg").iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg").iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg").iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg").iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
};                                                                                                                 //
                                                                                                                   // 453
_angular2['default'].module('spcal').config(themeIcons);                                                           //
                                                                                                                   // 457
spcal.controller('MatrixCtrl', ["$mdDialog", "$timeout", "$scope", function ($mdDialog, $timeout, $scope) {        // 458
  var searchFiled = document.getElementById('search_field');                                                       // 459
  container = document.getElementById('example');                                                                  // 460
  hot = new _handsontableProDistHandsontableFull2['default'](container, {                                          // 461
    data: rateData,                                                                                                // 462
    headerToolTips: true,                                                                                          // 463
    rowHeaders: ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'],                          // 464
    nestedHeaders: [[{ label: 'Conversion Rate', colspan: 6 }], ['1W', '2W', '3W', '1M', '2M', '3M']],             // 468
    colWidths: 100,                                                                                                // 469
    rowHeights: 40,                                                                                                // 470
    search: {                                                                                                      // 471
      queryMethod: onlyExactMatch                                                                                  //
    },                                                                                                             // 473
    currentRowClassName: 'selectedRow',                                                                            // 474
    currentColClassName: 'selectedCol',                                                                            // 475
    editor: false                                                                                                  //
  });                                                                                                              //
                                                                                                                   // 478
  function onlyExactMatch(queryStr, value) {                                                                       // 479
    return queryStr.toString() === value.toString();                                                               //
  }                                                                                                                //
                                                                                                                   // 482
  _handsontableProDistHandsontableFull2['default'].Dom.addEvent(search_button, 'click', function (event) {         // 483
    queryResult = hot.search.query(document.getElementById('search_field').value);                                 // 484
    console.log(queryResult);                                                                                      // 485
    hot.render();                                                                                                  // 486
    hot.selectCell(queryResult[0].row, queryResult[0].col);                                                        //
  });                                                                                                              //
                                                                                                                   // 489
  $timeout(function () {                                                                                           // 490
    hot.selectCell(0, 0);                                                                                          // 491
    document.getElementById('toggleBtn').click();                                                                  // 492
    $mdDialog.cancel();                                                                                            //
  }, 1);                                                                                                           //
}]);                                                                                                               //
                                                                                                                   // 496
spcal.controller('DiagramCtrl', ["$scope", function ($scope) {                                                     // 497
  $.get('fxRate.csv', function (data) {                                                                            //
    // Create the chart                                                                                            // 499
    dpsChart = Highcharts.chart('dpsChartContainer', {                                                             // 500
      data: {                                                                                                      // 501
        csv: data                                                                                                  //
      },                                                                                                           // 503
      plotOptions: {                                                                                               // 504
        series: {                                                                                                  // 505
          visible: false                                                                                           //
        }                                                                                                          //
      },                                                                                                           // 508
      title: {                                                                                                     // 509
        text: 'Deposit Plus'                                                                                       //
      },                                                                                                           // 511
      yAxis: {                                                                                                     // 512
        crosshair: true,                                                                                           // 513
        title: {                                                                                                   // 514
          text: 'FX Rate'                                                                                          //
        }                                                                                                          //
      }                                                                                                            //
    });                                                                                                            //
  });                                                                                                              // 519
  $.get('stockPrice.csv', function (data) {                                                                        //
    // Create the chart                                                                                            // 521
    dcdcChart = Highstock.stockChart('dcdcChartContainer', {                                                       // 522
      data: {                                                                                                      // 523
        csv: data                                                                                                  //
      },                                                                                                           // 525
      plotOptions: {                                                                                               // 526
        series: {                                                                                                  // 527
          visible: false                                                                                           //
        }                                                                                                          //
      },                                                                                                           // 530
      title: {                                                                                                     // 531
        text: 'DCDC'                                                                                               //
      },                                                                                                           // 533
      yAxis: {                                                                                                     // 534
        title: {                                                                                                   // 535
          text: 'Stock Price'                                                                                      //
        }                                                                                                          //
      }                                                                                                            //
    });                                                                                                            //
  });                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 543
spcal.controller('BarChartCtrl', ["$scope", function ($scope) {                                                    //
  // Create the chart                                                                                              // 545
  $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
    barChart = HighBarCharts.chart('barContainer', {                                                               // 547
      chart: {                                                                                                     // 548
        type: 'column'                                                                                             //
      },                                                                                                           // 550
      title: {                                                                                                     // 551
        text: 'Performance on Deposit Plus from Other Financial Institutions'                                      //
      },                                                                                                           // 553
      xAxis: {                                                                                                     // 554
        categories: ['HSBC', 'BOC', 'Standard Charter', 'Citi', 'Hang Seng']                                       //
      },                                                                                                           // 556
      yAxis: {                                                                                                     // 557
        min: 0,                                                                                                    // 558
        title: {                                                                                                   // 559
          text: 'Criteria Distribution'                                                                            //
        }                                                                                                          //
      },                                                                                                           // 562
      tooltip: {                                                                                                   // 563
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true                                                                                               //
      },                                                                                                           // 566
      plotOptions: {                                                                                               // 567
        column: {                                                                                                  // 568
          stacking: 'percent'                                                                                      //
        }                                                                                                          //
      },                                                                                                           // 571
      series: [{                                                                                                   // 572
        name: 'Return',                                                                                            // 573
        data: [5, 3, 4, 7, 2]                                                                                      //
      }, {                                                                                                         // 575
        name: 'Stability',                                                                                         // 576
        data: [2, 2, 3, 2, 1]                                                                                      //
      }, {                                                                                                         // 578
        name: 'Volatility',                                                                                        // 579
        data: [3, 4, 4, 2, 5]                                                                                      //
      }, {                                                                                                         // 581
        name: 'Momentum',                                                                                          // 582
        data: [6, 2, 4, 3, 1]                                                                                      //
      }]                                                                                                           //
    });                                                                                                            //
  });                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 589
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                // 590
  $mdThemingProvider.theme('altTheme').primaryPalette('purple');                                                   //
}]).controller('SubheaderAppCtrl', ["$scope", function ($scope) {                                                  // 594
  var imagePath = 'images/hsbc-icon.gif';                                                                          // 595
  $scope.infolinks = [{                                                                                            // 597
    face: imagePath,                                                                                               // 598
    what: 'Glossary Of Banking Terms',                                                                             // 599
    who: 'HSBC Personal Banking',                                                                                  // 600
    notes: " A to Z guide on glossaries",                                                                          // 601
    link: "https://www.hsbc.com.hk/personal/help-and-support/glossary-of-banking-terms.html"                       //
  }, {                                                                                                             // 604
    face: imagePath,                                                                                               // 605
    what: 'Deposit Plus',                                                                                          // 606
    who: 'HSBC Personal Banking',                                                                                  // 607
    notes: " Set up your Deposit Plus investment now",                                                             // 608
    link: "https://www.hsbc.com.hk/personal/investments/structured-products/deposit-plus.html"                     //
  }];                                                                                                              // 611
  $scope.datalinks = [{                                                                                            // 613
    face: imagePath,                                                                                               // 614
    what: 'Deposit Interest Market Data',                                                                          // 615
    who: 'HSBC Personal Banking',                                                                                  // 616
    notes: " Check the current interest rate of normal deposit",                                                   // 617
    link: "https://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info/deposit-rates/interest-rates"              //
  }, {                                                                                                             // 620
    face: imagePath,                                                                                               // 621
    what: 'Equity Market Data',                                                                                    // 622
    who: 'HSBC Personal Banking',                                                                                  // 623
    notes: " Check the current market price of chosen equity",                                                     // 624
    link: "http://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info"                                            //
  }];                                                                                                              // 627
  $scope.videos = [{                                                                                               // 629
    face: imagePath,                                                                                               // 630
    what: 'Deposit Plus Overview',                                                                                 // 631
    who: 'A Currency Linked Investment',                                                                           // 632
    notes: " Get to know the products before investing",                                                           // 633
    link: '_-w3mMxkVdU'                                                                                            //
  }, {                                                                                                             // 636
    face: imagePath,                                                                                               // 637
    what: 'Deposit Plus Example',                                                                                  // 638
    who: 'A Currency Linked Investment',                                                                           // 639
    notes: " Get to know the products before investing",                                                           // 640
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 643
    face: imagePath,                                                                                               // 644
    what: 'Deposit Plus Interest Calculation',                                                                     // 645
    who: 'A Currency Linked Investment',                                                                           // 646
    notes: " Get to know the products before investing",                                                           // 647
    link: 'fBVv_BJ81bc'                                                                                            //
  }, {                                                                                                             // 650
    face: imagePath,                                                                                               // 651
    what: 'Deposit Plus Risk',                                                                                     // 652
    who: 'A Currency Linked Investment',                                                                           // 653
    notes: " Get to know the products before investing",                                                           // 654
    link: 'K-QcjbuNnwg'                                                                                            //
  }, {                                                                                                             // 657
    face: imagePath,                                                                                               // 658
    what: 'DCDC',                                                                                                  // 659
    who: 'An Equity Linked Investment',                                                                            // 660
    notes: " Get to know the products before investing",                                                           // 661
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 664
    face: imagePath,                                                                                               // 665
    what: 'DCDC Example 1 - Auto Call',                                                                            // 666
    who: 'An Equity Linked Investment',                                                                            // 667
    notes: " Get to know the products before investing",                                                           // 668
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 671
    face: imagePath,                                                                                               // 672
    what: 'DCDC Example 2 - Airbag',                                                                               // 673
    who: 'An Equity Linked Investment',                                                                            // 674
    notes: " Get to know the products before investing",                                                           // 675
    link: 'z3ZjrWkCrdY'                                                                                            //
  }];                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 680
spcal.controller('AppCtrl', ['$interval', function ($interval) {                                                   // 682
  var self = this;                                                                                                 //
                                                                                                                   // 684
  self.activated = true;                                                                                           // 685
  self.determinateValue = 30;                                                                                      //
                                                                                                                   //
  // Iterate every 100ms, non-stop and increment                                                                   //
  // the Determinate loader.                                                                                       // 689
  $interval(function () {                                                                                          //
                                                                                                                   // 691
    self.determinateValue += 1;                                                                                    // 692
    if (self.determinateValue > 100) {                                                                             // 693
      self.determinateValue = 30;                                                                                  //
    }                                                                                                              //
  }, 100);                                                                                                         //
}]);                                                                                                               //
                                                                                                                   // 700
spcal.controller('videoCtrl', ["$scope", "$mdDialog", function ($scope, $mdDialog) {                               // 701
  DialogController.$inject = ["$scope", "$mdDialog"];                                                              // 702
  $scope.showAdvanced = function (ev, id) {                                                                        // 703
    $mdDialog.show({                                                                                               // 704
      controller: DialogController,                                                                                // 705
      templateUrl: 'client/video.html',                                                                            // 706
      parent: _angular2['default'].element(document.body),                                                         // 707
      targetEvent: ev,                                                                                             // 708
      clickOutsideToClose: true,                                                                                   //
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.                                        //
    });                                                                                                            // 711
    //player.videoId = id;                                                                                         //
    videoToPlay = id;                                                                                              //
  };                                                                                                               // 714
                                                                                                                   // 715
  function DialogController($scope, $mdDialog) {                                                                   // 716
    $scope.hide = function () {                                                                                    //
      $mdDialog.hide();                                                                                            //
    };                                                                                                             // 719
                                                                                                                   // 720
    $scope.cancel = function () {                                                                                  //
      $mdDialog.cancel();                                                                                          //
    };                                                                                                             // 723
                                                                                                                   // 724
    $scope.answer = function (answer) {                                                                            //
      $mdDialog.hide(answer);                                                                                      //
    };                                                                                                             //
  }                                                                                                                // 728
                                                                                                                   //
  onYouTubeIframeAPIReady = function () {                                                                          //
    // New Video Player, the first argument is the id of the div.                                                  // 731
    // Make sure it's a global variable.                                                                           // 732
    if (videoToPlay) {                                                                                             // 733
      player = new YT.Player("player", {                                                                           // 734
        height: "400",                                                                                             //
        width: "600",                                                                                              // 736
        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")     //
        videoId: videoToPlay,                                                                                      // 738
        // Events like ready, state change,                                                                        // 739
        events: {                                                                                                  //
          onReady: function onReady(event) {                                                                       // 741
            // Play video when player ready.                                                                       //
            event.target.playVideo();                                                                              //
          }                                                                                                        //
        }                                                                                                          // 745
      });                                                                                                          //
      console.log(player);                                                                                         //
    }                                                                                                              // 748
  };                                                                                                               //
  YT.load();                                                                                                       //
}]);                                                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"collections":{"dcdc.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// collections/dcdc.js                                                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
DcdcData = new Mongo.Collection("dcdc");                                                                           // 1
                                                                                                                   //
DcdcData.allow({                                                                                                   // 3
  insert: function insert() {                                                                                      // 4
    if (Meteor.isServer) {                                                                                         // 5
      return true;                                                                                                 // 6
    } else {                                                                                                       //
      return false;                                                                                                // 8
    }                                                                                                              //
  },                                                                                                               //
  update: function update() {                                                                                      // 11
    if (Meteor.isServer) {                                                                                         // 12
      return true;                                                                                                 // 13
    } else {                                                                                                       //
      return false;                                                                                                // 15
    }                                                                                                              //
  },                                                                                                               //
  remove: function remove() {                                                                                      // 18
    if (Meteor.isServer) {                                                                                         // 19
      return true;                                                                                                 // 20
    } else {                                                                                                       //
      return false;                                                                                                // 22
    }                                                                                                              //
  }                                                                                                                //
});                                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dps.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// collections/dps.js                                                                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
DpsData = new Mongo.Collection("dps");                                                                             // 1
                                                                                                                   //
DpsData.allow({                                                                                                    // 3
  insert: function insert() {                                                                                      // 4
    if (Meteor.isServer) {                                                                                         // 5
      return true;                                                                                                 // 6
    } else {                                                                                                       //
      return false;                                                                                                // 8
    }                                                                                                              //
  },                                                                                                               //
  update: function update() {                                                                                      // 11
    if (Meteor.isServer) {                                                                                         // 12
      return true;                                                                                                 // 13
    } else {                                                                                                       //
      return false;                                                                                                // 15
    }                                                                                                              //
  },                                                                                                               //
  remove: function remove() {                                                                                      // 18
    if (Meteor.isServer) {                                                                                         // 19
      return true;                                                                                                 // 20
    } else {                                                                                                       //
      return false;                                                                                                // 22
    }                                                                                                              //
  }                                                                                                                //
});                                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".css",".html"]});
require("./client/calculator.html");
require("./client/dialog.html");
require("./client/matrix.html");
require("./client/nav.html");
require("./client/reference.html");
require("./client/toggle.html");
require("./client/video.html");
require("./collections/dcdc.js");
require("./collections/dps.js");
require("./client/main.html.js");
require("./client/main.js");