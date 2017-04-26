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
      var template = "<div layout=\"column\" class=\"container\" ng-cloak class=\"md-inline-form\"> <div class=\"tabsdemoDynamicHeight\" ng-cloak> <md-card> <md-tabs md-stretch-tabs=\"always\" style=\"min-height:865px\" md-border-bottom> <md-tab label=\"Deposit Plus\"> <md-content class=\"md-padding\"> <md-content layout-padding ng-controller=\"ValidationCtrl\"> <div> <form name=\"DpsInvForm\"> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Deposit Currency</label> <md-select name=\"depoCurr\" ng-model=\"cal.dps.depositCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies\" value=\"{{currency.abbrev}}\">{{currency.abbrev}}</md-option> </md-select> <div ng-messages=\"DpsInvForm.depoCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Linked Currency</label> <md-select name=\"linkCurr\" ng-model=\"cal.dps.linkedCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies | filter:linkedCurrencyFilter\" value=\"{{currency.abbrev}}\"> {{currency.abbrev}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.linkCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Currency Pair</label> <input name=\"currencyPair\" ng-if=\"cal.dps.depositCurrency&&cal.dps.linkedCurrency\" value=\"{{cal.dps.depositCurrency}}-{{cal.dps.linkedCurrency}}\" disabled=\"disabled\"> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dps.tenor\" required> <md-option ng-repeat=\"tenor in dpsTenors\" value=\"{{tenor}}\"> {{tenor.name}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex-gt-sm> <label>Amount Deposit <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <span id=\"tempAmount\" style=\"display:none\">{{cal.dps.amountDeposit | number:0}}</span> <input md-maxlength=\"20\" ng-maxlength=\"20\" id=\"convertAmount\" name=\"amountDeposit\" ng-pattern=\"/^[0-9]*$/\" ng-model=\"cal.dps.amountDeposit\" ng-blur=\"convert2dp()\"> <div ng-messages=\"DpsInvForm.amountDeposit.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"maxlength\">Your field is too long.</div> <div ng-message=\"pattern\">Not a Valid Amount.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Interest Amount <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <input name=\"interestAmount\" ng-if=\"cal.dps.amountDeposit && cal.dps.yieldPa\" value=\"{{cal.dps.amountDeposit*cal.dps.yieldPa/100 | number:2}}\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <!-- <h4 style=\"color:#737373\">Yield P.A. &emsp;&emsp;</h4> --> <md-slider-container flex> <label style=\"color:#afaeae\">Yield P.A. *</label> <md-slider md-discrete flex min=\"2\" max=\"9.5\" step=\"0.5\" ng-model=\"cal.dps.yieldPa\" aria-label=\"yieldPaSlider\" required></md-slider> <md-input-container> <input flex ng-if=\"cal.dps.yieldPa\" value=\"{{cal.dps.yieldPa}}%\" aria-label=\"yieldPaInput\" readonly=\"readonly\"> </md-input-container> </md-slider-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Conversion Rate</label> <input name=\"conversionRate\" ng-if=\"cal.dps.conversionRate\" value=\"{{cal.dps.conversionRate}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <!-- <label>Conversion Rate &emsp;&emsp;</label>\n                    <div style=\"font-size: 18px\"><b>{{cal.dps.conversionRate}}</b></div> --> </div> <div layout=\"row\" layout-align=\"end center\"> <!-- showAdvanced($event)\n                    resizeDiag($event) --> <input id=\"toggleBtn\" type=\"button\" style=\"display:none\" ng-click=\"resizeDiag($event)\"> <div> <md-button ng-disabled=\"DpsInvForm.$invalid\" ng-click=\"calculateConversionRate()\" class=\"md-raised md-warn\" aria-label=\"DPS Calculate Button\"> <md-tooltip> See the conversion rate under the chosen criteria </md-tooltip> Query </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Preview </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <!-- <div ng-controller=\"DiagramCtrl\">\n\n                    </div> --> <div ng-controller=\"DiagramCtrl\" id=\"dpsChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> <md-tab label=\"DCDC\"> <md-content class=\"md-padding\"> <md-content layout-padding ng-controller=\"ValidationCtrl\"> <div> <form name=\"DcdcInvForm\"> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Linked Stock</label> <md-select name=\"linkStock\" ng-model=\"cal.dcdc.linkedStock\" ng-change=\"onStockChange(cal.dcdc.linkedStock)\" required> <md-option ng-repeat=\"stock in stocks\" value=\"{{stock}}\">{{stock}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.linkStock.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Spot Price</label> <input name=\"spotPrice\" ng-if=\"cal.dcdc.linkedStock\" value=\"{{cal.dcdc.spotPrice}}\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <div style=\"color:#afaeae\">Query for</div> <md-radio-group layout=\"row\" ng-model=\"cal.dcdc.scenario\"> <md-radio-button value=\"1\" style=\"margin-right:100px\">Coupon P.A.</md-radio-button> <md-radio-button value=\"2\">Strike Price</md-radio-button> </md-radio-group> </md-input-container> </div> <div layout=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-model=\"cal.dcdc.strikePrice\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> <div class=\"hint\">Please refer to the matrix on the right.</div> <div ng-messages=\"DcdcInvForm.strikePrice.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Coupon P.A.</label> <input name=\"couponPa\" ng-model=\"cal.dcdc.couponPa\" type=\"number\" min=\"1\" required> <div class=\"hint\">Please refer to the matrix on the right.</div> <div ng-messages=\"DcdcInvForm.couponPa.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dcdc.tenor\" required> <md-option ng-repeat=\"tenor in dcdcTenors\" value=\"{{tenor.value}}\"> {{tenor.name}} </md-option> </md-select> <div ng-messages=\"DcdcInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>KO Type</label> <md-select name=\"koType\" ng-model=\"cal.dcdc.koType\" required> <md-option ng-repeat=\"koType in koTypes\" value=\"{{koType}}\">{{koType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.koType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>KO Barrier</label> <md-select name=\"koBarrier\" ng-model=\"cal.dcdc.koBarrier\" required> <md-option ng-repeat=\"koBarrier in koBarriers\" value=\"{{koBarrier}}\">{{koBarrier}}</md-option> </md-select> <!-- <input name=\"koBarrier\" ng-model=\"cal.dcdc.koBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> --> <div ng-messages=\"DcdcInvForm.koBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Barrier Type</label> <md-select name=\"barrierType\" ng-model=\"cal.dcdc.barrierType\" required> <md-option ng-repeat=\"barrierType in barrierTypes\" value=\"{{barrierType}}\">{{barrierType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.barrierType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>KI Barrier</label> <md-select name=\"kiBarrier\" ng-disabled=\"cal.dcdc.barrierType !== 'AKI' && cal.dcdc.barrierType !== 'EKI'\" ng-model=\"cal.dcdc.kiBarrier\" ng-required=\"cal.dcdc.barrierType == 'AKI' || cal.dcdc.barrierType == 'EKI'\"> <md-option ng-repeat=\"kiBarrier in kiBarriers\" value=\"{{kiBarrier}}\">{{kiBarrier}}</md-option> </md-select> <!-- <input name=\"kiBarrier\" ng-model=\"cal.dcdc.kiBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" ng-required=\"cal.dcdc.barrierType !== 'NONE'\" ng-disabled=\"cal.dcdc.barrierType === 'NONE'\"> --> <div ng-messages=\"DcdcInvForm.kiBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Coupon P.A.</label> <input name=\"couponPa\" ng-if=\"cal.dcdc.couponPa\" value=\"{{cal.dcdc.couponPa}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-if=\"cal.dcdc.strikePrice\" value=\"{{cal.dcdc.strikePrice}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> </div> <div layout=\"row\" layout-align=\"end center\"> <div ng-if=\"cal.dcdc.scenario == 1\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateCouponPa()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the coupon per annum under the chosen criteria </md-tooltip> Query </md-button> </div> <div ng-if=\"cal.dcdc.scenario == 2\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateStrikePrice()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the strike price under the chosen criteria </md-tooltip> Query </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\" style=\"margin-top:-24px\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Preview </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <div ng-controller=\"DiagramCtrl\" id=\"dcdcChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> </md-tabs> </md-card> </div> </div> ";
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
      var template = "<md-dialog aria-label=\"Comparison for HSBC\"> <form ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>Comparison for Other Products</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <md-icon md-svg-src=\"images/ic_cancel_white_48px.svg\" style=\"font-size:36px\" aria-label=\"Close dialog\"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class=\"md-dialog-content\" ng-controller=\"BarChartCtrl\"> <h2>Currency-Linked Deposit</h2> <p> Deposit Plus is a deposit investment for a fixed period of time with a fixed interest rate for the duration of the deposit. </p> <p> Upon maturity, you can receive the deposit and the interest in either deposit currency or linked currency. </p> <br> <!-- style=\"width: 100%; height: 400px; margin: 0 auto\" --> <!-- <div layout=\"row\"> --> <div id=\"barContainer\" style=\"min-width:310px;height:400px;margin:0 auto\"></div> <!-- </div> --> <br> <!--\n        <div layout=\"row\">\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>HSBC</span>\n            </div>\n            <md-content>\n              <md-list class=\"md-dense\" flex>\n                <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n                <md-list-item class=\"md-3-line\" >\n                <div class=\"md-list-item-text\" layout=\"column\">\n                <h3>Good</h3>\n                </div>\n                </md-list-item>\n                <md-list-item class=\"md-3-line\" >\n                <div class=\"md-list-item-text\" layout=\"column\">\n                <h3>Good</h3>\n                </div>\n                </md-list-item>\n                <md-list-item class=\"md-3-line\" >\n                <div class=\"md-list-item-text\" layout=\"column\">\n                <h3>Good</h3>\n                </div>\n                </md-list-item>\n              </md-list>\n            </md-content>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>BOC</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>Standard Charter</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>Citi</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>Hang Seng</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Good</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Good</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Good</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n        </div> --> </div> </md-dialog-content> <md-dialog-actions layout=\"row\"> <md-button href=\"https://www.hsbc.com.hk/personal/investments/structured-products.html\" target=\"_blank\" md-autofocus> More Products </md-button> <span flex></span> <md-button ng-click=\"\" class=\"md-primary\"> Contact our Agents </md-button> <md-button ng-click=\"\" class=\"md-primary\"> Print PDF </md-button> </md-dialog-actions> </form> </md-dialog> ";
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
      var template = "<md-card style=\"height:450px\"> <!-- <md-toolbar>\n    <h3>Coupon Rate p.a. Matrix</h3>\n  </md-toolbar> --> <md-card-title> <md-content class=\"container\"> <div id=\"parentContainer\"> <input id=\"search_field\" type=\"hidden\"> <input id=\"search_button\" style=\"display:none\" type=\"button\"> <div class=\"handsontable\" ng-controller=\"MatrixCtrl\" id=\"example\"></div> </div> </md-content> </md-card-title> <md-card-actions layout=\"row\" layout-align=\"end center\"> <md-button class=\"md-raised\" style=\"background:#39f;color:#fff\" disabled=\"disabled\">Tenors</md-button> <md-button class=\"md-raised\" style=\"background:#c06;color:#fff\" disabled=\"disabled\">Interest Rates</md-button> <md-button class=\"md-raised\" style=\"background:grey;color:#fff\" disabled=\"disabled\">Conversion Rates</md-button> </md-card-actions> </md-card> ";
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
      var template = "<md-card> <div style=\"height:400px\" class=\"container\" id=\"video\" ng-controller=\"SubheaderAppCtrl\" layout=\"column\" flex layout-fill ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\" style=\"background-color:navy;color:#fff\">Reference Link</div> </md-toolbar> <md-content md-theme=\"altTheme\"> <section> <md-subheader style=\"font-size:16px\" class=\"md-warn\">Information Links</md-subheader> <md-list layout=\"column\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in infolinks\" ng-href=\"{{message.link}}\" target=\"_blank\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-accent\">Market Data</md-subheader> <md-list layout=\"column\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in datalinks\" ng-href=\"{{message.link}}\" target=\"_blank\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-primary\">Videos</md-subheader> <md-list ng-controller=\"videoCtrl\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in videos\" ng-click=\"showAdvanced($event, message.link)\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> <md-list-item class=\"secondary-button-padding\"> <p>Check out a full list of our videos and learn more about our products</p> <md-button class=\"md-secondary\" href=\"http://hkl103456.hk.hsbc/two/\">Here</md-button> </md-list-item> </md-list> </section> </md-content> </div> </md-card> ";
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
var Highstock = require('highcharts/highstock');                                                                   // 9
require('highcharts/modules/data.js')(Highcharts);                                                                 // 10
require('highcharts/modules/data.js')(Highstock);                                                                  // 11
                                                                                                                   //
var spcal = _angular2['default'].module('spcal', [_angularMeteor2['default'], _angularMaterial2['default'], 'ngMessages', 'ngSanitize']);
                                                                                                                   //
testing = null;                                                                                                    // 20
var dpsChart;                                                                                                      // 21
var dcdcChart;                                                                                                     // 22
var barChart;                                                                                                      // 23
var pairCurr;                                                                                                      // 24
var rowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                          // 25
var rateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
var container;                                                                                                     // 36
var hot;                                                                                                           // 37
var videoToPlay;                                                                                                   // 38
var dps;                                                                                                           // 39
var dcdc;                                                                                                          // 40
var rowCnt = 0;                                                                                                    // 41
var colCnt = 0;                                                                                                    // 42
var rowCntTmp = 0;                                                                                                 // 43
var colCntTmp = 0;                                                                                                 // 44
                                                                                                                   //
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                // 46
                                                                                                                   //
  $mdThemingProvider.theme('red').primaryPalette('red');                                                           // 48
                                                                                                                   //
  $mdThemingProvider.theme('blue').primaryPalette('blue');                                                         // 51
}]).controller('ValidationCtrl', ["$timeout", "$scope", "$mdDialog", "$interval", function ($timeout, $scope, $mdDialog, $interval) {
  DialogController.$inject = ["$scope", "$mdDialog"];                                                              // 56
  $scope.theme = 'red';                                                                                            //
                                                                                                                   // 58
  var isThemeRed = true;                                                                                           //
                                                                                                                   // 60
  $interval(function () {                                                                                          // 61
    $scope.theme = isThemeRed ? 'blue' : 'red';                                                                    //
                                                                                                                   // 63
    isThemeRed = !isThemeRed;                                                                                      //
  }, 2000);                                                                                                        //
                                                                                                                   // 66
  $scope.onCurPairChange = function (depoCur, linkCur) {                                                           // 67
    if (depoCur && linkCur) {                                                                                      // 68
      var seq = depoCur + "-" + linkCur;                                                                           // 69
      var inv = linkCur + "-" + depoCur;                                                                           // 70
      pairCurr = seq;                                                                                              // 71
      switch (pairCurr) {                                                                                          // 72
        case "HKD-AUD":                                                                                            // 73
          rowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];                    // 74
          rateData = [[5.9015, 5.8938, 5.8961, 5.894, 5.915, 5.9401], [5.9054, 5.9007, 5.9055, 5.906, 5.9362, 5.9683], [5.909, 5.9072, 5.9142, 5.9171, 5.9559, 'N/A'], [5.9124, 5.9132, 5.9223, 5.9274, 'N/A', 'N/A'], [5.9157, 5.919, 5.93, 5.9371, 'N/A', 'N/A'], [5.9188, 5.9244, 5.9372, 5.9462, 'N/A', 'N/A'], [5.9218, 5.9296, 5.9441, 5.9549, 'N/A', 'N/A'], [5.9246, 5.9345, 5.9507, 5.9632, 'N/A', 'N/A'], [5.9274, 5.9392, 5.957, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 85
        case "AUD-HKD":                                                                                            // 87
          rowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];                    // 88
          rateData = [[0.1694, 0.1697, 0.1696, 0.1697, 0.1691, 0.1683], [0.1693, 0.1695, 0.1693, 0.1693, 0.1685, 0.1676], [0.1692, 0.1693, 0.1691, 0.169, 0.1679, 'N/A'], [0.1691, 0.1691, 0.1689, 0.1687, 'N/A', 'N/A'], [0.169, 0.1689, 0.1686, 0.1684, 'N/A', 'N/A'], [0.169, 0.1688, 0.1684, 0.1682, 'N/A', 'N/A'], [0.1689, 0.1686, 0.1682, 0.1679, 'N/A', 'N/A'], [0.1688, 0.1685, 0.168, 0.1677, 'N/A', 'N/A'], [0.1687, 0.1684, 0.1679, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 99
        case "USD-AUD":                                                                                            // 101
          rowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                    // 102
          rateData = [[0.7594, 0.7589, 0.7583, 0.7577, 0.7596, 0.7616], [0.76, 0.7599, 0.7597, 0.7595, 0.7627, 0.7658], [0.7606, 0.7608, 0.7609, 0.7611, 0.7655, 0.7696], [0.7611, 0.7617, 0.7621, 0.7626, 0.7681, 'N/A'], [0.7616, 0.7625, 0.7632, 0.764, 'N/A', 'N/A'], [0.7621, 0.7632, 0.7643, 0.7653, 'N/A', 'N/A'], [0.7625, 0.7639, 0.7652, 0.7665, 'N/A', 'N/A'], [0.7629, 0.7646, 0.7662, 0.7676, 'N/A', 'N/A'], [0.7633, 0.7653, 0.767, 0.7687, 'N/A', 'N/A']];
          break;                                                                                                   // 113
        case "AUD-USD":                                                                                            // 115
          rowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                    // 116
          rateData = [[1.3168, 1.3177, 1.3187, 1.3198, 1.3165, 1.313], [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058], [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058], [1.3139, 1.3129, 1.3122, 1.3113, 1.3019, 'N/A'], [1.313, 1.3115, 1.3103, 1.3089, 'N/A', 'N/A'], [1.3122, 1.3103, 1.3084, 1.3067, 'N/A', 'N/A'], [1.3115, 1.3091, 1.3068, 1.3046, 'N/A', 'N/A'], [1.3108, 1.3079, 1.3051, 1.3028, 'N/A', 'N/A'], [1.3101, 1.3067, 1.3038, 1.3009, 'N/A', 'N/A']];
          break;                                                                                                   // 127
        case "HKD-GBP":                                                                                            // 129
          rowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];                    // 130
          rateData = [[9.7533, 9.7583, 9.7561, 9.7433, 9.668, 'N/A'], [9.7475, 9.7482, 9.7424, 9.7268, 'N/A', 'N/A'], [9.7419, 9.7387, 9.7296, 9.7113, 'N/A', 'N/A'], [9.7367, 9.7298, 9.7174, 9.6965, 'N/A', 'N/A'], [9.7317, 9.7212, 9.7058, 9.6824, 'N/A', 'N/A'], [9.7268, 9.713, 9.6948, 9.6689, 'N/A', 'N/A'], [9.7222, 9.7052, 9.6841, 9.6559, 'N/A', 'N/A'], [9.7177, 9.6976, 9.6739, 9.6434, 'N/A', 'N/A'], [9.7134, 9.6903, 9.664, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 141
        case "GBP-HKD":                                                                                            // 143
          rowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];                    // 144
          rateData = [[0.1025, 0.1025, 0.1025, 0.1026, 0.1034, 'N/A'], [0.1026, 0.1026, 0.1026, 0.1028, 'N/A', 'N/A'], [0.1026, 0.1027, 0.1028, 0.103, 'N/A', 'N/A'], [0.1027, 0.1028, 0.1029, 0.1031, 'N/A', 'N/A'], [0.1028, 0.1029, 0.103, 0.1033, 'N/A', 'N/A'], [0.1028, 0.103, 0.1031, 0.1034, 'N/A', 'N/A'], [0.1029, 0.103, 0.1033, 0.1036, 'N/A', 'N/A'], [0.1029, 0.1031, 0.1034, 0.1037, 'N/A', 'N/A'], [0.103, 0.1032, 0.1035, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 155
        case "HKD-CAD":                                                                                            // 157
          rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                    // 158
          rateData = [[5.9099, 5.9081, 5.8937, 5.885, 5.8985, 5.9098], [5.9146, 5.9159, 5.9056, 5.9005, 5.925, 5.9451], [5.9189, 5.9231, 5.9162, 5.9143, 5.9484, 5.976], [5.9229, 5.9296, 5.9259, 5.9268, 5.9693, 'N/A'], [5.9266, 5.9357, 5.9348, 5.9382, 'N/A', 'N/A'], [5.9302, 5.9414, 5.943, 5.9487, 'N/A', 'N/A'], [5.9335, 5.9467, 5.9507, 5.9584, 'N/A', 'N/A'], [5.9367, 5.9518, 5.958, 5.9676, 'N/A', 'N/A'], [5.9397, 5.9566, 5.9648, 5.9762, 'N/A', 'N/A']];
          break;                                                                                                   // 169
        case "CAD-HKD":                                                                                            // 171
          rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                    // 172
          rateData = [[0.1692, 0.1693, 0.1697, 0.1699, 0.1695, 0.1692], [0.1691, 0.169, 0.1693, 0.1695, 0.1688, 0.1682], [0.169, 0.1688, 0.169, 0.1691, 0.1681, 0.1673], [0.1688, 0.1686, 0.1688, 0.1687, 0.1675, 'N/A'], [0.1687, 0.1685, 0.1685, 0.1684, 'N/A', 'N/A'], [0.1686, 0.1683, 0.1683, 0.1681, 'N/A', 'N/A'], [0.1685, 0.1682, 0.168, 0.1678, 'N/A', 'N/A'], [0.1684, 0.168, 0.1678, 0.1676, 'N/A', 'N/A'], [0.1684, 0.1679, 0.1677, 0.1673, 'N/A', 'N/A']];
          break;                                                                                                   // 183
        case "HKD-EUR":                                                                                            // 185
          rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                    // 186
          rateData = [[8.4099, 8.4216, 8.4286, 8.4289, 8.435, 8.4295], [8.4038, 8.4111, 8.414, 8.411, 8.4037, 8.3881], [8.3982, 8.4015, 8.4009, 8.3949, 8.3755, 8.3505], [8.3931, 8.3927, 8.3889, 8.3802, 8.3495, 8.3157], [8.3882, 8.3846, 8.3779, 8.3667, 8.3254, 'N/A'], [8.3837, 8.3771, 8.3676, 8.3541, 'N/A', 'N/A'], [8.3795, 8.3699, 8.358, 8.3422, 'N/A', 'N/A'], [8.3755, 8.3632, 8.3488, 8.331, 'N/A', 'N/A'], [8.3716, 8.3568, 8.3401, 8.3202, 'N/A', 'N/A']];
          break;                                                                                                   // 197
        case "EUR-HKD":                                                                                            // 199
          rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                    // 200
          rateData = [[0.1189, 0.1187, 0.1186, 0.1186, 0.1186, 0.1186], [0.119, 0.1189, 0.1188, 0.1189, 0.119, 0.1192], [0.1191, 0.119, 0.119, 0.1191, 0.1194, 0.1198], [0.1191, 0.1192, 0.1192, 0.1193, 0.1198, 0.1203], [0.1192, 0.1193, 0.1194, 0.1195, 0.1201, 'N/A'], [0.1193, 0.1194, 0.1195, 0.1197, 'N/A', 'N/A'], [0.1193, 0.1195, 0.1196, 0.1199, 'N/A', 'N/A'], [0.1194, 0.1196, 0.1198, 0.12, 'N/A', 'N/A'], [0.1195, 0.1197, 0.1199, 0.1202, 'N/A', 'N/A']];
          break;                                                                                                   // 211
        case "HKD-CNH":                                                                                            // 213
          rowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];                    // 214
          rateData = [[1.1326, 1.1301, 1.128, 1.1254, 1.1188, 1.1147], [1.1336, 1.1319, 1.1304, 1.1287, 1.1248, 1.123], [1.1344, 1.1333, 1.1324, 1.1313, 1.1297, 1.1296], [1.1352, 1.1345, 1.1341, 1.1335, 1.1338, 1.1351], [1.1358, 1.1356, 1.1356, 1.1355, 1.1374, 1.1399], [1.1365, 1.1366, 1.137, 1.1373, 1.1406, 1.1441], [1.137, 1.1376, 1.1383, 1.1389, 1.1435, 'N/A'], [1.1375, 1.1384, 1.1395, 1.1404, 'N/A', 'N/A'], [1.138, 1.1393, 1.1406, 1.1418, 'N/A', 'N/A']];
          break;                                                                                                   // 225
        case "CNH-HKD":                                                                                            // 227
          rowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];                    // 228
          rateData = [[0.8829, 0.8849, 0.8865, 0.8886, 0.8938, 0.8971], [0.8821, 0.8835, 0.8846, 0.886, 0.889, 0.8905], [0.8815, 0.8824, 0.8831, 0.8839, 0.8852, 0.8853], [0.8809, 0.8814, 0.8818, 0.8822, 0.882, 0.881], [0.8804, 0.8806, 0.8806, 0.8807, 0.8792, 0.8773], [0.8799, 0.8798, 0.8795, 0.8793, 0.8767, 0.874], [0.8795, 0.879, 0.8785, 0.878, 0.8745, 'N/A'], [0.8791, 0.8784, 0.8776, 0.8769, 'N/A', 'N/A'], [0.8787, 0.8777, 0.8767, 0.8758, 'N/A', 'N/A']];
          break;                                                                                                   // 239
        default:                                                                                                   // 241
          rateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
      }                                                                                                            // 253
      hot.updateSettings({                                                                                         // 254
        rowHeaders: rowHeader                                                                                      //
      });                                                                                                          // 256
      hot.loadData(rateData);                                                                                      // 257
      var series = dpsChart.series;                                                                                // 258
      for (var i = 0; i < series.length; i++) {                                                                    // 259
        var column = series[i];                                                                                    // 260
        if (column.name === seq || column.name === inv) {                                                          // 261
          column.show();                                                                                           //
        } else {                                                                                                   // 263
          column.hide();                                                                                           //
        }                                                                                                          //
      }                                                                                                            //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 269
  $scope.convert2dp = function () {                                                                                // 270
    document.getElementById('convertAmount').value = document.getElementById('tempAmount').innerHTML;              //
  };                                                                                                               //
                                                                                                                   //
  //TODO: multiple listener                                                                                        //
  // $scope.$onMany(['event:onStockChange', 'event:'], function(){                                                 //
  //                                                                                                               //
  // });                                                                                                           //
                                                                                                                   // 280
  $scope.onStockChange = function (stockName) {                                                                    // 281
    if (stockName === '700 HK') {                                                                                  // 282
      $scope.cal.dcdc.spotPrice = 242.800;                                                                         //
      //TODO: test in find sort mongodb                                                                            //
      // find({"underlying": "700 HK", "ko_barrier": 105})                                                         // 285
      testing = DcdcData;                                                                                          //
    } else {                                                                                                       // 287
      $scope.cal.dcdc.spotPrice = 192.000;                                                                         //
    }                                                                                                              // 289
    var series = dcdcChart.series;                                                                                 // 290
    var navigatorIndex = series.length - 1;                                                                        // 291
    for (var i = 0; i < navigatorIndex; i++) {                                                                     // 292
      var column = series[i];                                                                                      // 293
      if (column.name === stockName) {                                                                             //
        //series[navigatorIndex].data = column.data;                                                               // 295
        column.showInNavigator = true;                                                                             //
        //dcdcChart.navigator.series = column;                                                                     // 297
        column.show();                                                                                             //
      } else {                                                                                                     // 299
        column.showInNavigator = false;                                                                            // 300
        column.hide();                                                                                             //
      }                                                                                                            //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 305
  $scope.calculateConversionRate = function () {                                                                   // 306
    dps = $scope.cal.dps;                                                                                          // 307
    var dpsDoc = DpsData.findOne({ depo_cur: dps.depositCurrency, link_cur: dps.linkedCurrency,                    // 308
      tenor: JSON.parse(dps.tenor).name, interest_rate: dps.yieldPa });                                            // 309
    if (dpsDoc) {                                                                                                  // 310
      dps.conversionRate = dpsDoc.conversion_rate;                                                                 // 311
      document.getElementById('search_field').value = dpsDoc.conversion_rate;                                      // 312
      document.getElementById('search_button').click();                                                            //
    } else {                                                                                                       // 314
      dps.conversionRate = undefined;                                                                              //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 318
  $scope.calculateCouponPa = function () {                                                                         // 319
    dcdc = $scope.cal.dcdc;                                                                                        // 320
    if (dcdc.barrierType === 'NONE') {                                                                             // 321
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 323
        ki_barrier: null });                                                                                       //
    } else {                                                                                                       // 325
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 327
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                   //
    }                                                                                                              // 329
    if (dcdcDoc) {                                                                                                 // 330
      dcdc.couponPa = dcdcDoc.coupon_pa;                                                                           //
    } else {                                                                                                       // 332
      dcdc.couponPa = undefined;                                                                                   //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 336
  $scope.calculateStrikePrice = function () {                                                                      // 337
    var dcdc = $scope.cal.dcdc;                                                                                    // 338
    if (dcdc.barrierType === 'NONE') {                                                                             // 339
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 341
        ki_barrier: null });                                                                                       //
    } else {                                                                                                       // 343
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 345
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                   //
    }                                                                                                              // 347
    if (dcdcDoc) {                                                                                                 // 348
      dcdc.strikePrice = dcdcDoc.strike;                                                                           //
    } else {                                                                                                       // 350
      dcdc.strikePrice = undefined;                                                                                //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 354
  $scope.resizeDiag = function (ev) {                                                                              // 355
    $mdDialog.show({                                                                                               // 356
      controller: DialogController,                                                                                // 357
      templateUrl: 'client/toggle.html',                                                                           // 358
      parent: _angular2['default'].element(document.body),                                                         // 359
      targetEvent: ev,                                                                                             // 360
      clickOutsideToClose: true                                                                                    //
    });                                                                                                            //
  };                                                                                                               //
                                                                                                                   // 364
  $scope.showAdvanced = function (ev) {                                                                            // 365
    $mdDialog.show({                                                                                               // 366
      controller: DialogController,                                                                                // 367
      templateUrl: 'client/dialog.html',                                                                           // 368
      parent: _angular2['default'].element(document.body),                                                         // 369
      targetEvent: ev,                                                                                             // 370
      clickOutsideToClose: true                                                                                    //
    });                                                                                                            //
  };                                                                                                               //
                                                                                                                   // 374
  function DialogController($scope, $mdDialog) {                                                                   // 375
    $scope.hide = function () {                                                                                    // 376
      $mdDialog.hide();                                                                                            //
    };                                                                                                             //
                                                                                                                   // 379
    $scope.cancel = function () {                                                                                  // 380
      $mdDialog.cancel();                                                                                          //
    };                                                                                                             //
                                                                                                                   // 383
    $scope.answer = function (answer) {                                                                            // 384
      $mdDialog.hide(answer);                                                                                      //
    };                                                                                                             //
  }                                                                                                                //
                                                                                                                   // 388
  $scope.cal = {                                                                                                   // 389
    dps: {},                                                                                                       // 390
    dcdc: {                                                                                                        // 391
      scenario: 1                                                                                                  //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 395
  $scope.currencies = 'AUD, CAD, CNH, EUR, GBP, HKD, USD'.split(', ').map(function (currency) {                    // 396
    return { abbrev: currency };                                                                                   //
  });                                                                                                              //
                                                                                                                   // 399
  $scope.dpsTenors = [{                                                                                            // 401
    name: '1W',                                                                                                    // 402
    value: 0                                                                                                       //
  }, {                                                                                                             // 404
    name: '2W',                                                                                                    // 405
    value: 1                                                                                                       //
  }, {                                                                                                             // 407
    name: '3W',                                                                                                    // 408
    value: 2                                                                                                       //
  }, {                                                                                                             // 410
    name: '1M',                                                                                                    // 411
    value: 3                                                                                                       //
  }, {                                                                                                             // 413
    name: '2M',                                                                                                    // 414
    value: 4                                                                                                       //
  }, {                                                                                                             // 416
    name: '3M',                                                                                                    // 417
    value: 5                                                                                                       //
  }];                                                                                                              //
                                                                                                                   // 421
  $scope.dcdcTenors = [{                                                                                           // 423
    name: '3M',                                                                                                    // 424
    value: 3                                                                                                       //
  }, {                                                                                                             // 426
    name: '6M',                                                                                                    // 427
    value: 6                                                                                                       //
  }, {                                                                                                             // 429
    name: '9M',                                                                                                    // 430
    value: 9                                                                                                       //
  }, {                                                                                                             // 432
    name: '12M',                                                                                                   // 433
    value: 12                                                                                                      //
  }];                                                                                                              //
                                                                                                                   // 437
  $scope.stocks = ['700 HK', '388 HK'];                                                                            //
                                                                                                                   // 439
  $scope.koBarriers = ['95', '100', '105', '110'];                                                                 //
                                                                                                                   // 441
  $scope.koTypes = ['Daily', 'Period End'];                                                                        //
                                                                                                                   // 443
  $scope.kiBarriers = ['75', '78'];                                                                                //
                                                                                                                   // 445
  $scope.barrierTypes = ['NONE', 'AKI', 'EKI'];                                                                    //
                                                                                                                   //
  //dcdcview Button JS                                                                                             // 448
  $scope.demo = {                                                                                                  // 449
    showTooltip: false,                                                                                            // 450
    tipDirection: 'bottom'                                                                                         //
  };                                                                                                               //
                                                                                                                   // 453
  $scope.demo.delayTooltip = undefined;                                                                            // 454
  $scope.$watch('demo.delayTooltip', function (val) {                                                              // 455
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;                                                             //
  });                                                                                                              //
                                                                                                                   // 458
  $scope.linkedCurrencyFilter = function (inputCur) {                                                              // 459
    return inputCur.abbrev !== $scope.cal.dps.depositCurrency && !(inputCur.abbrev === 'USD' && $scope.cal.dps.depositCurrency === 'HKD') && !(inputCur.abbrev === 'HKD' && $scope.cal.dps.depositCurrency === 'USD');
  };                                                                                                               //
}]);                                                                                                               //
                                                                                                                   // 466
spcal.controller('AutoCompleteCtrl', ["$timeout", "$q", "$log", function ($timeout, $q, $log) {                    // 467
  var self = this;                                                                                                 //
                                                                                                                   // 469
  self.simulateQuery = true;                                                                                       // 470
  self.isDisabled = false;                                                                                         //
                                                                                                                   //
  // list of `state` value/display objects                                                                         // 473
  self.states = loadAll();                                                                                         // 474
  self.querySearch = querySearch;                                                                                  // 475
  self.selectedItemChange = selectedItemChange;                                                                    // 476
  self.searchTextChange = searchTextChange;                                                                        //
                                                                                                                   // 478
  self.newState = newState;                                                                                        //
                                                                                                                   // 480
  function newState(state) {                                                                                       // 481
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
   */                                                                                                              // 492
  function querySearch(query) {                                                                                    // 493
    var results = query ? self.states.filter(createFilterFor(query)) : self.states,                                //
        deferred;                                                                                                  // 495
    if (self.simulateQuery) {                                                                                      // 496
      deferred = $q.defer();                                                                                       // 497
      $timeout(function () {                                                                                       // 497
        deferred.resolve(results);                                                                                 //
      }, Math.random() * 1000, false);                                                                             // 498
      return deferred.promise;                                                                                     //
    } else {                                                                                                       // 500
      return results;                                                                                              //
    }                                                                                                              //
  }                                                                                                                //
                                                                                                                   // 504
  function searchTextChange(text) {                                                                                // 505
    $log.info('Text changed to ' + text);                                                                          //
  }                                                                                                                //
                                                                                                                   // 508
  function selectedItemChange(item) {                                                                              // 509
    $log.info('Item changed to ' + JSON.stringify(item));                                                          //
  }                                                                                                                //
                                                                                                                   //
  /**                                                                                                              //
   * Build `states` list of key/value pairs                                                                        //
   */                                                                                                              // 515
  function loadAll() {                                                                                             // 516
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';                                                                                 //
                                                                                                                   // 524
    return allStates.split(/, +/g).map(function (state) {                                                          // 525
      return {                                                                                                     // 526
        value: state.toLowerCase(),                                                                                // 527
        display: state                                                                                             //
      };                                                                                                           //
    });                                                                                                            //
  }                                                                                                                //
                                                                                                                   //
  /**                                                                                                              //
   * Create filter function for a query string                                                                     //
   */                                                                                                              // 535
  function createFilterFor(query) {                                                                                // 536
    var lowercaseQuery = _angular2['default'].lowercase(query);                                                    //
                                                                                                                   // 538
    return function filterFn(state) {                                                                              // 539
      return state.value.indexOf(lowercaseQuery) === 0;                                                            //
    };                                                                                                             //
  }                                                                                                                //
  // }                                                                                                             //
}]);                                                                                                               //
                                                                                                                   // 547
var themeIcons = function themeIcons($mdIconProvider) {                                                            //
                                                                                                                   // 549
  $mdIconProvider.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg").iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg").iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg").iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg").iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg").iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg").iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
};                                                                                                                 //
                                                                                                                   // 573
_angular2['default'].module('spcal').config(themeIcons);                                                           //
                                                                                                                   // 577
spcal.controller('MatrixCtrl', ["$mdDialog", "$timeout", "$scope", function ($mdDialog, $timeout, $scope) {        // 578
  var searchFiled = document.getElementById('search_field');                                                       // 579
  container = document.getElementById('example');                                                                  // 580
  hot = new _handsontableProDistHandsontableFull2['default'](container, {                                          // 581
    data: rateData,                                                                                                // 582
    headerToolTips: true,                                                                                          // 583
    rowHeaders: rowHeader,                                                                                         // 584
    colHeaders: ['1W', '2W', '3W', '1M', '2M', '3M'],                                                              // 585
    colWidths: 100,                                                                                                // 586
    rowHeights: 40,                                                                                                // 587
    search: {                                                                                                      // 588
      queryMethod: onlyExactMatch                                                                                  //
    },                                                                                                             // 590
    currentRowClassName: 'selectedRow',                                                                            // 591
    currentColClassName: 'selectedCol',                                                                            // 592
    editor: false                                                                                                  //
  });                                                                                                              //
                                                                                                                   // 595
  function onlyExactMatch(queryStr, value) {                                                                       // 596
    var matchFlag = false;                                                                                         //
                                                                                                                   // 598
    if (queryStr.toString() === value.toString()) {                                                                // 599
      rowCnt = rowCntTmp;                                                                                          // 600
      colCnt = colCntTmp;                                                                                          // 601
      if (dps) {                                                                                                   // 602
        if (parseInt(colCnt) == parseInt(JSON.parse(dps.tenor).value)) {                                           // 603
          matchFlag = true;                                                                                        //
        }                                                                                                          //
      }                                                                                                            //
    }                                                                                                              //
                                                                                                                   // 608
    colCntTmp++;                                                                                                   // 609
    if (colCntTmp > 5) {                                                                                           // 610
      colCntTmp = 0;                                                                                               // 611
      rowCntTmp++;                                                                                                 //
    }                                                                                                              //
                                                                                                                   // 614
    return matchFlag;                                                                                              //
  }                                                                                                                //
                                                                                                                   // 617
  _handsontableProDistHandsontableFull2['default'].Dom.addEvent(search_button, 'click', function (event) {         // 618
    queryResult = hot.search.query(document.getElementById('search_field').value);                                 // 619
    hot.render();                                                                                                  // 620
    console.log(queryResult);                                                                                      // 621
    hot.selectCell(queryResult[0].row, queryResult[0].col);                                                        //
  });                                                                                                              //
                                                                                                                   // 624
  $timeout(function () {                                                                                           // 625
    hot.selectCell(0, 0);                                                                                          // 626
    document.getElementById('toggleBtn').click();                                                                  // 627
    $mdDialog.cancel();                                                                                            //
  }, 1);                                                                                                           //
}]);                                                                                                               //
                                                                                                                   // 631
spcal.controller('DiagramCtrl', ["$scope", function ($scope) {                                                     // 632
  $.get('fxRate.csv', function (data) {                                                                            //
    // Create the chart                                                                                            // 634
    dpsChart = Highcharts.chart('dpsChartContainer', {                                                             // 635
      data: {                                                                                                      // 636
        csv: data                                                                                                  //
      },                                                                                                           // 638
      plotOptions: {                                                                                               // 639
        series: {                                                                                                  // 640
          visible: false                                                                                           //
        }                                                                                                          //
      },                                                                                                           // 643
      title: {                                                                                                     // 644
        text: 'Deposit Plus'                                                                                       //
      },                                                                                                           // 646
      yAxis: {                                                                                                     // 647
        crosshair: true,                                                                                           // 648
        title: {                                                                                                   // 649
          text: 'FX Rate'                                                                                          //
        }                                                                                                          //
      }                                                                                                            //
    });                                                                                                            //
  });                                                                                                              // 654
  $.get('stockPrice.csv', function (data) {                                                                        //
    // Create the chart                                                                                            // 656
    dcdcChart = Highstock.stockChart('dcdcChartContainer', {                                                       // 657
      data: {                                                                                                      // 658
        csv: data                                                                                                  //
      },                                                                                                           // 660
      plotOptions: {                                                                                               // 661
        series: {                                                                                                  // 662
          visible: false                                                                                           //
        }                                                                                                          //
      },                                                                                                           // 665
      title: {                                                                                                     // 666
        text: 'DCDC'                                                                                               //
      },                                                                                                           // 668
      yAxis: {                                                                                                     // 669
        title: {                                                                                                   // 670
          text: 'Stock Price'                                                                                      //
        }                                                                                                          //
      }                                                                                                            //
    });                                                                                                            //
  });                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 678
spcal.controller('BarChartCtrl', ["$scope", function ($scope) {                                                    //
  // Create the chart                                                                                              // 680
  $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
    barChart = Highcharts.chart('barContainer', {                                                                  // 682
      chart: {                                                                                                     // 683
        type: 'column'                                                                                             //
      },                                                                                                           // 685
      title: {                                                                                                     // 686
        text: 'Performance of Structured Products Offered by HSBC'                                                 //
      },                                                                                                           // 688
      xAxis: {                                                                                                     // 689
        categories: ['Deposit Plus', 'Currency Linked III', 'Interest Rate Range Accrual', 'Capped and Floored Floater Deposit']
      },                                                                                                           // 691
      yAxis: {                                                                                                     // 692
        min: 0,                                                                                                    // 693
        title: {                                                                                                   // 694
          text: 'Criteria Distribution'                                                                            //
        }                                                                                                          //
      },                                                                                                           // 697
      tooltip: {                                                                                                   // 698
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true                                                                                               //
      },                                                                                                           // 701
      plotOptions: {                                                                                               // 702
        column: {                                                                                                  // 703
          stacking: 'percent'                                                                                      //
        }                                                                                                          //
      },                                                                                                           // 706
      series: [{                                                                                                   // 707
        name: 'Return',                                                                                            // 708
        data: [5, 3, 4, 7]                                                                                         //
      }, {                                                                                                         // 710
        name: 'Stability',                                                                                         // 711
        data: [2, 2, 3, 2]                                                                                         //
      }, {                                                                                                         // 713
        name: 'Volatility',                                                                                        // 714
        data: [3, 4, 4, 2]                                                                                         //
      }, {                                                                                                         // 716
        name: 'Momentum',                                                                                          // 717
        data: [6, 2, 4, 3]                                                                                         //
      }]                                                                                                           //
    });                                                                                                            //
  });                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 724
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                // 725
  $mdThemingProvider.theme('altTheme').primaryPalette('purple');                                                   //
}]).controller('SubheaderAppCtrl', ["$scope", function ($scope) {                                                  // 729
  var imagePath = 'images/hsbc-icon.gif';                                                                          // 730
  $scope.infolinks = [{                                                                                            // 732
    face: imagePath,                                                                                               // 733
    what: 'Glossary Of Banking Terms',                                                                             // 734
    who: 'HSBC Personal Banking',                                                                                  // 735
    notes: " A to Z guide on glossaries",                                                                          // 736
    link: "https://www.hsbc.com.hk/personal/help-and-support/glossary-of-banking-terms.html"                       //
  }, {                                                                                                             // 739
    face: imagePath,                                                                                               // 740
    what: 'Deposit Plus',                                                                                          // 741
    who: 'HSBC Personal Banking',                                                                                  // 742
    notes: " Set up your Deposit Plus investment now",                                                             // 743
    link: "https://www.hsbc.com.hk/personal/investments/structured-products/deposit-plus.html"                     //
  }];                                                                                                              // 746
  $scope.datalinks = [{                                                                                            // 748
    face: imagePath,                                                                                               // 749
    what: 'Deposit Interest Market Data',                                                                          // 750
    who: 'HSBC Personal Banking',                                                                                  // 751
    notes: " Check the current interest rate of normal deposit",                                                   // 752
    link: "https://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info/deposit-rates/interest-rates"              //
  }, {                                                                                                             // 755
    face: imagePath,                                                                                               // 756
    what: 'Equity Market Data',                                                                                    // 757
    who: 'HSBC Personal Banking',                                                                                  // 758
    notes: " Check the current market price of chosen equity",                                                     // 759
    link: "http://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info"                                            //
  }];                                                                                                              // 762
  $scope.videos = [{                                                                                               // 764
    face: imagePath,                                                                                               // 765
    what: 'Deposit Plus Overview',                                                                                 // 766
    who: 'A Currency Linked Investment',                                                                           // 767
    notes: " Get to know the products before investing",                                                           // 768
    link: '_-w3mMxkVdU'                                                                                            //
  }, {                                                                                                             // 771
    face: imagePath,                                                                                               // 772
    what: 'Deposit Plus Example',                                                                                  // 773
    who: 'A Currency Linked Investment',                                                                           // 774
    notes: " Get to know the products before investing",                                                           // 775
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 778
    face: imagePath,                                                                                               // 779
    what: 'Deposit Plus Interest Calculation',                                                                     // 780
    who: 'A Currency Linked Investment',                                                                           // 781
    notes: " Get to know the products before investing",                                                           // 782
    link: 'fBVv_BJ81bc'                                                                                            //
  }, {                                                                                                             // 785
    face: imagePath,                                                                                               // 786
    what: 'Deposit Plus Risk',                                                                                     // 787
    who: 'A Currency Linked Investment',                                                                           // 788
    notes: " Get to know the products before investing",                                                           // 789
    link: 'K-QcjbuNnwg'                                                                                            //
  }, {                                                                                                             // 792
    face: imagePath,                                                                                               // 793
    what: 'DCDC',                                                                                                  // 794
    who: 'An Equity Linked Investment',                                                                            // 795
    notes: " Get to know the products before investing",                                                           // 796
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 799
    face: imagePath,                                                                                               // 800
    what: 'DCDC Example 1 - Auto Call',                                                                            // 801
    who: 'An Equity Linked Investment',                                                                            // 802
    notes: " Get to know the products before investing",                                                           // 803
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 806
    face: imagePath,                                                                                               // 807
    what: 'DCDC Example 2 - Airbag',                                                                               // 808
    who: 'An Equity Linked Investment',                                                                            // 809
    notes: " Get to know the products before investing",                                                           // 810
    link: 'z3ZjrWkCrdY'                                                                                            //
  }];                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 815
spcal.controller('AppCtrl', ['$interval', function ($interval) {                                                   // 817
  var self = this;                                                                                                 //
                                                                                                                   // 819
  self.activated = true;                                                                                           // 820
  self.determinateValue = 30;                                                                                      //
                                                                                                                   //
  // Iterate every 100ms, non-stop and increment                                                                   //
  // the Determinate loader.                                                                                       // 824
  $interval(function () {                                                                                          //
                                                                                                                   // 826
    self.determinateValue += 1;                                                                                    // 827
    if (self.determinateValue > 100) {                                                                             // 828
      self.determinateValue = 30;                                                                                  //
    }                                                                                                              //
  }, 100);                                                                                                         //
}]);                                                                                                               //
                                                                                                                   // 835
spcal.controller('videoCtrl', ["$scope", "$mdDialog", function ($scope, $mdDialog) {                               // 836
  DialogController.$inject = ["$scope", "$mdDialog"];                                                              // 837
  $scope.showAdvanced = function (ev, id) {                                                                        // 838
    $mdDialog.show({                                                                                               // 839
      controller: DialogController,                                                                                // 840
      templateUrl: 'client/video.html',                                                                            // 841
      parent: _angular2['default'].element(document.body),                                                         // 842
      targetEvent: ev,                                                                                             // 843
      clickOutsideToClose: true,                                                                                   //
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.                                        //
    });                                                                                                            // 846
    //player.videoId = id;                                                                                         //
    videoToPlay = id;                                                                                              //
  };                                                                                                               // 849
                                                                                                                   // 850
  function DialogController($scope, $mdDialog) {                                                                   // 851
    $scope.hide = function () {                                                                                    //
      $mdDialog.hide();                                                                                            //
    };                                                                                                             // 854
                                                                                                                   // 855
    $scope.cancel = function () {                                                                                  //
      $mdDialog.cancel();                                                                                          //
    };                                                                                                             // 858
                                                                                                                   // 859
    $scope.answer = function (answer) {                                                                            //
      $mdDialog.hide(answer);                                                                                      //
    };                                                                                                             //
  }                                                                                                                // 863
                                                                                                                   //
  onYouTubeIframeAPIReady = function () {                                                                          //
    // New Video Player, the first argument is the id of the div.                                                  // 866
    // Make sure it's a global variable.                                                                           // 867
    if (videoToPlay) {                                                                                             // 868
      player = new YT.Player("player", {                                                                           // 869
        height: "400",                                                                                             //
        width: "600",                                                                                              // 871
        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")     //
        videoId: videoToPlay,                                                                                      // 873
        // Events like ready, state change,                                                                        // 874
        events: {                                                                                                  //
          onReady: function onReady(event) {                                                                       // 876
            // Play video when player ready.                                                                       //
            event.target.playVideo();                                                                              //
          }                                                                                                        //
        }                                                                                                          // 880
      });                                                                                                          //
      console.log(player);                                                                                         //
    }                                                                                                              // 883
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