var require = meteorInstall({"client":{"calculator.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/calculator.html                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/calculator.html";                                                                     // 4
      var template = "<div layout=\"column\" class=\"container\" ng-cloak class=\"md-inline-form\" ng-controller=\"ValidationCtrl\"> <div class=\"tabsdemoDynamicHeight\" ng-cloak> <md-card> <md-tabs md-stretch-tabs=\"always\" style=\"min-height:865px\" md-border-bottom> <md-tab label=\"Deposit Plus\" ng-click=\"switchTable('dps')\"> <md-content class=\"md-padding\"> <md-content layout-padding> <div> <form name=\"DpsInvForm\"> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Deposit Currency</label> <md-select name=\"depoCurr\" ng-model=\"cal.dps.depositCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies\" value=\"{{currency.abbrev}}\">{{currency.abbrev}}</md-option> </md-select> <div ng-messages=\"DpsInvForm.depoCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Linked Currency</label> <md-select name=\"linkCurr\" ng-model=\"cal.dps.linkedCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies | filter:linkedCurrencyFilter\" value=\"{{currency.abbrev}}\"> {{currency.abbrev}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.linkCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Currency Pair</label> <input name=\"currencyPair\" ng-if=\"cal.dps.depositCurrency&&cal.dps.linkedCurrency\" value=\"{{cal.dps.depositCurrency}}-{{cal.dps.linkedCurrency}}\" disabled=\"disabled\"> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dps.tenor\" required> <md-option ng-repeat=\"tenor in dpsTenors\" value=\"{{tenor}}\"> {{tenor.name}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex-gt-sm> <label>Deposit Amount <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <span id=\"tempAmount\" style=\"display:none\">{{cal.dps.amountDeposit | number:0}}</span> <input md-maxlength=\"20\" ng-maxlength=\"20\" id=\"convertAmount\" name=\"amountDeposit\" ng-pattern=\"/^[0-9]*$/\" ng-model=\"cal.dps.amountDeposit\" ng-blur=\"convert2dp()\"> <div ng-messages=\"DpsInvForm.amountDeposit.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"maxlength\">Your field is too long.</div> <div ng-message=\"pattern\">Not a Valid Amount.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Interest Amount <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <input name=\"interestAmount\" ng-if=\"cal.dps.amountDeposit && cal.dps.yieldPa\" value=\"{{cal.dps.amountDeposit*cal.dps.yieldPa/100 | number:2}}\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <label style=\"color:#afaeae;display:block\">Interest Rate *</label> </div> <div layout=\"row\"> <div class=\"hint\">Please refer to the matrix on the right.</div> </div> <div layout=\"row\"> <md-slider-container flex> <md-slider md-discrete flex min=\"2\" max=\"9.5\" step=\"0.5\" ng-model=\"cal.dps.yieldPa\" aria-label=\"yieldPaSlider\" required></md-slider> <md-input-container> <input flex ng-if=\"cal.dps.yieldPa\" value=\"{{cal.dps.yieldPa}}%\" aria-label=\"yieldPaInput\" readonly=\"readonly\"> </md-input-container> </md-slider-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Conversion Rate</label> <input name=\"conversionRate\" ng-if=\"cal.dps.conversionRate\" value=\"{{cal.dps.conversionRate}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> </div> <div layout=\"row\" layout-align=\"end center\"> <input id=\"toggleBtn\" type=\"button\" style=\"display:none\" ng-click=\"resizeDiag($event)\"> <div> <md-button ng-disabled=\"DpsInvForm.$invalid\" ng-click=\"calculateConversionRate()\" class=\"md-raised md-warn\" aria-label=\"DPS Calculate Button\"> <md-tooltip> See the conversion rate under the chosen criteria </md-tooltip> Preview </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Compare </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <div ng-controller=\"DiagramCtrl\" id=\"dpsChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> <md-tab label=\"DCDC\" ng-click=\"switchTable('dcdc')\"> <md-content class=\"md-padding\"> <md-content layout-padding> <div> <form name=\"DcdcInvForm\"> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Linked Stock</label> <md-select name=\"linkStock\" ng-model=\"cal.dcdc.linkedStock\" ng-change=\"onStockChange(cal.dcdc.linkedStock)\" required> <md-option ng-repeat=\"stock in stocks\" value=\"{{stock}}\">{{stock}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.linkStock.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Spot Price</label> <input name=\"spotPrice\" ng-if=\"cal.dcdc.linkedStock\" value=\"{{cal.dcdc.spotPrice}}\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <div style=\"color:#afaeae\">Query for</div> <md-radio-group layout=\"row\" ng-model=\"cal.dcdc.scenario\" ng-change=\"onRadioChange()\"> <md-radio-button value=\"1\" style=\"margin-right:100px\">Annual Coupon Rate</md-radio-button> <md-radio-button value=\"2\">Strike Price</md-radio-button> </md-radio-group> </md-input-container> </div> <div layout=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-model=\"cal.dcdc.strikePrice\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> <div class=\"hint\">Please refer to the matrix on the right.</div> <div ng-messages=\"DcdcInvForm.strikePrice.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Annual Coupon Rate</label> <input name=\"couponPa\" ng-model=\"cal.dcdc.couponPa\" type=\"number\" min=\"1\" required> <div class=\"hint\">Please refer to the matrix on the right.</div> <div ng-messages=\"DcdcInvForm.couponPa.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dcdc.tenor\" ng-change=\"onTenorChange()\" required> <md-option ng-repeat=\"tenor in dcdcTenors\" value=\"{{tenor.value}}\"> {{tenor.name}} </md-option> </md-select> <div ng-messages=\"DcdcInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Knock Out Type</label> <md-select name=\"koType\" ng-model=\"cal.dcdc.koType\" ng-change=\"onKOTypeChange()\" required> <md-option ng-repeat=\"koType in koTypes\" value=\"{{koType}}\">{{koType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.koType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Knock Out Barrier</label> <md-select name=\"koBarrier\" ng-model=\"cal.dcdc.koBarrier\" required> <md-option ng-repeat=\"koBarrier in koBarriers\" value=\"{{koBarrier}}\">{{koBarrier}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.koBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Barrier Type</label> <md-select name=\"barrierType\" ng-model=\"cal.dcdc.barrierType\" ng-change=\"onBarrierTypeChange()\" required> <md-option ng-repeat=\"barrierType in barrierTypes\" value=\"{{barrierType}}\">{{barrierType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.barrierType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Knock In Barrier</label> <md-select name=\"kiBarrier\" ng-disabled=\"cal.dcdc.barrierType !== 'AKI' && cal.dcdc.barrierType !== 'EKI'\" ng-model=\"cal.dcdc.kiBarrier\" ng-required=\"cal.dcdc.barrierType == 'AKI' || cal.dcdc.barrierType == 'EKI'\" ng-change=\"onKIBarrierChange()\"> <md-option ng-repeat=\"kiBarrier in kiBarriers\" value=\"{{kiBarrier}}\">{{kiBarrier}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.kiBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Annual Coupon Rate</label> <input name=\"couponPa\" ng-if=\"cal.dcdc.couponPa\" value=\"{{cal.dcdc.couponPa}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-if=\"cal.dcdc.strikePrice\" value=\"{{cal.dcdc.strikePrice}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> </div> <div layout=\"row\" layout-align=\"end center\"> <div ng-if=\"cal.dcdc.scenario == 1\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateCouponPa()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the coupon per annum under the chosen criteria </md-tooltip> Query </md-button> </div> <div ng-if=\"cal.dcdc.scenario == 2\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateStrikePrice()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the strike price under the chosen criteria </md-tooltip> Preview </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\" style=\"margin-top:-24px\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Compare </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <div ng-controller=\"DiagramCtrl\" id=\"dcdcChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> </md-tabs> </md-card> </div> </div> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dialog.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/dialog.html                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/dialog.html";                                                                         // 4
      var template = "<md-dialog aria-label=\"Comparison for HSBC\" ng-controller=\"BarChartCtrl\"> <form ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>Comparison for Other Products</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <md-icon md-svg-src=\"images/ic_cancel_white_48px.svg\" style=\"font-size:36px\" aria-label=\"Close dialog\"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class=\"md-dialog-content\"> <h2>Currency-Linked Deposit</h2> <p> Deposit Plus is a deposit investment for a fixed period of time with a fixed interest rate for the duration of the deposit. </p> <p> Upon maturity, you can receive the deposit and the interest in either deposit currency or linked currency. </p> <br> <!-- style=\"width: 100%; height: 400px; margin: 0 auto\" --> <!-- <div layout=\"row\"> --> <div id=\"barContainer\" style=\"min-width:310px;height:400px;margin:0 auto\"></div> <!-- </div> --> <br> <!--\n        <div layout=\"row\">\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>HSBC</span>\n            </div>\n            <md-content>\n              <md-list class=\"md-dense\" flex>\n                <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n                <md-list-item class=\"md-3-line\" >\n                <div class=\"md-list-item-text\" layout=\"column\">\n                <h3>Good</h3>\n                </div>\n                </md-list-item>\n                <md-list-item class=\"md-3-line\" >\n                <div class=\"md-list-item-text\" layout=\"column\">\n                <h3>Good</h3>\n                </div>\n                </md-list-item>\n                <md-list-item class=\"md-3-line\" >\n                <div class=\"md-list-item-text\" layout=\"column\">\n                <h3>Good</h3>\n                </div>\n                </md-list-item>\n              </md-list>\n            </md-content>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>BOC</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>Standard Charter</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>Citi</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Bad</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n          <md-card flex>\n            <div class=\"md-toolbar-tools\">\n              <span>Hang Seng</span>\n            </div>\n            <md-list class=\"md-dense\" flex>\n              <md-subheader class=\"md-no-sticky\">Return</md-subheader>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Good</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Good</h3>\n              </div>\n              </md-list-item>\n              <md-list-item class=\"md-3-line\" >\n              <div class=\"md-list-item-text\" layout=\"column\">\n              <h3>Good</h3>\n              </div>\n              </md-list-item>\n            </md-list>\n          </md-card>\n        </div> --> </div> </md-dialog-content> <md-dialog-actions layout=\"row\"> <md-button href=\"https://www.hsbc.com.hk/personal/investments/structured-products.html\" target=\"_blank\" md-autofocus> More Products </md-button> <span flex></span> <md-button ng-click=\"\" class=\"md-primary\"> Contact our Agents </md-button> <md-button ng-click=\"\" class=\"md-primary\"> Print PDF </md-button> </md-dialog-actions> </form> </md-dialog> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"matrix.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/matrix.html                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/matrix.html";                                                                         // 4
      var template = "<md-card style=\"height:450px\" ng-controller=\"MatrixCtrl\"> <md-card-title> <md-content class=\"container\"> <div id=\"parentContainer\"> <input id=\"search_field\" type=\"hidden\"> <input id=\"search_button\" style=\"display:none\" type=\"button\"> <div class=\"handsontable\" id=\"matrixTable\"></div> </div> </md-content> </md-card-title> <md-card-actions layout=\"row\" layout-align=\"end center\"> <input style=\"display:none\" id=\"toggle_button1\" type=\"checkbox\" ng-model=\"checked\"> <input style=\"display:none\" id=\"toggle_button2\" type=\"checkbox\" ng-model=\"switched\"> <md-button ng-show=\"checked\" class=\"md-raised\" style=\"background:#fff;color:#000\">Conversion Rates</md-button> <md-button ng-show=\"checked\" class=\"md-raised\" style=\"background:#39f;color:#fff\">Tenors</md-button> <md-button ng-show=\"checked\" class=\"md-raised\" style=\"background:#c06;color:#fff\">Interest Rates</md-button> <md-button ng-show=\"!checked && !switched\" class=\"md-raised\" style=\"background:#fff;color:#000\">Coupon PA</md-button> <md-button ng-show=\"!checked && !switched\" class=\"md-raised\" style=\"background:#39f;color:#fff\">KO Barrier</md-button> <md-button ng-show=\"!checked && !switched\" class=\"md-raised\" style=\"background:#c06;color:#fff\">Strike Price</md-button> <md-button ng-show=\"!checked && switched\" class=\"md-raised\" style=\"background:#fff;color:#000\">Strike Price</md-button> <md-button ng-show=\"!checked && switched\" class=\"md-raised\" style=\"background:#39f;color:#fff\">KO Barrier</md-button> <md-button ng-show=\"!checked && switched\" class=\"md-raised\" style=\"background:#c06;color:#fff\">Coupon PA</md-button> </md-card-actions> </md-card> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/nav.html                                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/nav.html";                                                                            // 4
      var template = "<md-toolbar style=\"background:#F5F5F5\" md-padding> <div layout=\"row\" layout-align=\"start center\" layout-padding> <img alt=\"Brand\" src=\"images/Hsbc-logo.svg\" width=\"120\"> <!-- <i class=\"material-icons md-48 md-dark md-inactive\">search</i> --> <span flex></span> <div ng-controller=\"AutoCompleteCtrl as ctrl\" ng-cloak> <form ng-submit=\"$event.preventDefault()\"> <md-autocomplete style=\"width:300px\" md-autofocus md-search-text-change=\"ctrl.searchTextChange(ctrl.searchText)\" md-search-text=\"ctrl.searchText\" md-selected-item-change=\"ctrl.selectedItemChange(item)\" md-selected-item=\"ctrl.selectedItem\" md-no-cache=\"ctrl.noCache\" ng-disabled=\"ctrl.isDisabled\" md-items=\"item in ctrl.querySearch(ctrl.searchText)\" md-item-text=\"item.display\" md-min-length=\"0\" placeholder=\"Currency/Equilty-linked Assets\"> <md-item-template> <span md-highlight-text=\"ctrl.searchText\" md-highlight-flags=\"^i\">{{item.display}}</span> </md-item-template> <md-not-found> No states matching \"{{ctrl.searchText}}\" were found. </md-not-found> </md-autocomplete> </form> </div> </div> </md-toolbar> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reference.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/reference.html                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/reference.html";                                                                      // 4
      var template = "<md-card> <div style=\"height:400px\" class=\"container\" id=\"video\" ng-controller=\"SubheaderAppCtrl\" layout=\"column\" flex layout-fill ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\" style=\"background-color:navy;color:#fff\">Reference Link</div> </md-toolbar> <md-content md-theme=\"altTheme\"> <section> <md-subheader style=\"font-size:16px\" class=\"md-warn\">Information Links</md-subheader> <md-list layout=\"column\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in infolinks\" ng-href=\"{{message.link}}\" target=\"_blank\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-accent\">Market Data</md-subheader> <md-list layout=\"column\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in datalinks\" ng-href=\"{{message.link}}\" target=\"_blank\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-primary\">Videos</md-subheader> <md-list ng-controller=\"videoCtrl\"> <md-list-item class=\"md-3-line\" ng-repeat=\"message in videos\" ng-click=\"showAdvanced($event, message.link)\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> <md-list-item class=\"secondary-button-padding\"> <p>Check out a full list of our videos and learn more about our products</p> <md-button class=\"md-secondary\" href=\"http://hkl103456.hk.hsbc/two/\" target=\"_blank\">Here</md-button> </md-list-item> </md-list> </section> </md-content> </div> </md-card> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toggle.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/toggle.html                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/toggle.html";                                                                         // 4
      var template = "<md-dialog class=\"transparent\" ng-controller=\"DiagramCtrl\"></md-dialog> ";                   // 5
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"video.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/video.html                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/video.html";                                                                          // 4
      var template = "<md-dialog aria-label=\"Video for HSBC\"> <md-dialog-content> <div ng-controller=\"videoCtrl\"> <div id=\"player\"></div> </div> </md-dialog-content> </md-dialog> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.html.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.html.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
            Meteor.startup(function() {                                                                                // 2
              var attrs = {"ng-cloak":""};                                                                             // 3
              for (var prop in attrs) {                                                                                // 4
                document.body.setAttribute(prop, attrs[prop]);                                                         // 5
              }                                                                                                        // 6
            });                                                                                                        // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["angular","angular-meteor","angular-material","handsontable-pro/dist/handsontable.full","angular-material/angular-material.css","handsontable-pro/dist/handsontable.full.css","highcharts","highcharts/highstock","highcharts/modules/data.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var _angular = require('angular');                                                                                     //
                                                                                                                       //
var _angular2 = _interopRequireDefault(_angular);                                                                      //
                                                                                                                       //
var _angularMeteor = require('angular-meteor');                                                                        //
                                                                                                                       //
var _angularMeteor2 = _interopRequireDefault(_angularMeteor);                                                          //
                                                                                                                       //
var _angularMaterial = require('angular-material');                                                                    //
                                                                                                                       //
var _angularMaterial2 = _interopRequireDefault(_angularMaterial);                                                      //
                                                                                                                       //
var _handsontableProDistHandsontableFull = require('handsontable-pro/dist/handsontable.full');                         //
                                                                                                                       //
var _handsontableProDistHandsontableFull2 = _interopRequireDefault(_handsontableProDistHandsontableFull);              //
                                                                                                                       //
require('angular-material/angular-material.css');                                                                      //
                                                                                                                       //
require('handsontable-pro/dist/handsontable.full.css');                                                                //
                                                                                                                       //
var Highcharts = require('highcharts');                                                                                // 8
var Highstock = require('highcharts/highstock');                                                                       // 9
require('highcharts/modules/data.js')(Highcharts);                                                                     // 10
require('highcharts/modules/data.js')(Highstock);                                                                      // 11
                                                                                                                       //
var spcal = _angular2['default'].module('spcal', [_angularMeteor2['default'], _angularMaterial2['default'], 'ngMessages', 'ngSanitize']);
                                                                                                                       //
var temp;                                                                                                              // 20
var dpsChart;                                                                                                          // 21
var dcdcChart;                                                                                                         // 22
var barChart;                                                                                                          // 23
var pairCurr;                                                                                                          // 24
var dpsColHeader = ['1W', '2W', '3W', '1M', '2M', '3M'];                                                               // 25
var dcdcColHeader = ['N/A', 'N/A'];                                                                                    // 26
var dcdcRowHeader = ['N/A', 'N/A', 'N/A'];                                                                             // 27
var dpsRowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                           // 28
var dpsRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
                                                                                                                       //
var dcdcRateData = [['N/A', 'N/A'], ['N/A', 'N/A'], ['N/A', 'N/A']];                                                   // 40
var hot;                                                                                                               // 45
var videoToPlay;                                                                                                       // 46
var dps;                                                                                                               // 47
var dcdc;                                                                                                              // 48
var rowCnt = 0;                                                                                                        // 49
var colCnt = 0;                                                                                                        // 50
var rowCntTmp = 0;                                                                                                     // 51
var colCntTmp = 0;                                                                                                     // 52
                                                                                                                       //
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                    // 54
                                                                                                                       //
  $mdThemingProvider.theme('red').primaryPalette('red');                                                               // 56
                                                                                                                       //
  $mdThemingProvider.theme('blue').primaryPalette('blue');                                                             // 59
}]).controller('ValidationCtrl', ["$timeout", "$scope", "$mdDialog", "$interval", function ($timeout, $scope, $mdDialog, $interval) {
  DialogController.$inject = ["$scope", "$mdDialog"];                                                                  // 64
  $scope.theme = 'red';                                                                                                //
                                                                                                                       // 66
  var isThemeRed = true;                                                                                               //
                                                                                                                       // 68
  $interval(function () {                                                                                              // 69
    $scope.theme = isThemeRed ? 'blue' : 'red';                                                                        //
                                                                                                                       // 71
    isThemeRed = !isThemeRed;                                                                                          //
  }, 2000);                                                                                                            //
                                                                                                                       // 74
  $scope.switchTable = function (option) {                                                                             // 75
    if (option == 'dps') {                                                                                             // 76
      if (!document.getElementById("toggle_button1").checked) {                                                        // 77
        document.getElementById("toggle_button1").click();                                                             //
      }                                                                                                                // 79
      hot.selectCell(0, 0);                                                                                            // 80
      hot.updateSettings({                                                                                             // 81
        rowHeaders: dpsRowHeader,                                                                                      // 82
        colHeaders: dpsColHeader,                                                                                      // 83
        search: {                                                                                                      // 84
          queryMethod: dpsExactMatch                                                                                   //
        }                                                                                                              //
      });                                                                                                              // 87
      dpsRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
      hot.loadData(dpsRateData);                                                                                       //
    } else if (option == 'dcdc') {                                                                                     // 100
      if (document.getElementById("toggle_button1").checked) {                                                         // 101
        document.getElementById("toggle_button1").click();                                                             //
      }                                                                                                                // 103
      hot.selectCell(0, 0);                                                                                            // 104
      hot.updateSettings({                                                                                             // 105
        rowHeaders: dcdcRowHeader,                                                                                     // 106
        colHeaders: dcdcColHeader,                                                                                     // 107
        search: {                                                                                                      // 108
          queryMethod: dcdcExactMatch                                                                                  //
        }                                                                                                              //
      });                                                                                                              // 111
      dcdcRateData = [['N/A', 'N/A'], ['N/A', 'N/A'], ['N/A', 'N/A']];                                                 // 116
      hot.loadData(dcdcRateData);                                                                                      //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 120
  $scope.onRadioChange = function () {                                                                                 // 121
    document.getElementById("toggle_button2").click();                                                                 // 122
    $scope.$emit('tableChange', $scope.cal.dcdc.linkedStock, $scope.cal.dcdc.tenor, $scope.cal.dcdc.koType, $scope.cal.dcdc.barrierType, $scope.cal.dcdc.kiBarrier);
  };                                                                                                                   //
                                                                                                                       // 125
  function dpsExactMatch(queryStr, value) {                                                                            // 126
    var matchFlag = false;                                                                                             //
                                                                                                                       // 128
    if (queryStr.toString() === value.toString()) {                                                                    // 129
      rowCnt = rowCntTmp;                                                                                              // 130
      colCnt = colCntTmp;                                                                                              // 131
      if (dps) {                                                                                                       // 132
        if (parseInt(colCnt) == parseInt(JSON.parse(dps.tenor).value)) {                                               // 133
          matchFlag = true;                                                                                            //
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       // 138
    colCntTmp++;                                                                                                       // 139
    if (colCntTmp > 5) {                                                                                               // 140
      colCntTmp = 0;                                                                                                   // 141
      rowCntTmp++;                                                                                                     //
    }                                                                                                                  //
                                                                                                                       // 144
    return matchFlag;                                                                                                  //
  }                                                                                                                    //
                                                                                                                       // 147
  function dcdcExactMatch(queryStr, value) {                                                                           // 148
    var matchFlag = false;                                                                                             //
                                                                                                                       // 150
    if (queryStr.toString() === value.toString()) {                                                                    // 151
      rowCnt = rowCntTmp;                                                                                              // 152
      colCnt = colCntTmp;                                                                                              //
                                                                                                                       // 154
      if ($scope.cal.dcdc.scenario == 1) {                                                                             // 155
        if (dcdcRowHeader[rowCnt] == $scope.cal.dcdc.strikePrice && dcdcColHeader[colCnt] == $scope.cal.dcdc.koBarrier) {
          matchFlag = true;                                                                                            //
        }                                                                                                              //
      } else {                                                                                                         // 159
        if (dcdcRowHeader[rowCnt] == $scope.cal.dcdc.couponPa && dcdcColHeader[colCnt] == $scope.cal.dcdc.koBarrier) {
          matchFlag = true;                                                                                            //
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       // 166
    colCntTmp++;                                                                                                       // 167
    if (colCntTmp > dcdcColHeader.length - 1) {                                                                        // 168
      colCntTmp = 0;                                                                                                   // 169
      rowCntTmp++;                                                                                                     //
    }                                                                                                                  //
                                                                                                                       // 172
    return matchFlag;                                                                                                  //
  }                                                                                                                    //
                                                                                                                       // 175
  $scope.onCurPairChange = function (depoCur, linkCur) {                                                               // 176
    if (depoCur && linkCur) {                                                                                          // 177
      var seq = depoCur + "-" + linkCur;                                                                               // 178
      var inv = linkCur + "-" + depoCur;                                                                               // 179
      pairCurr = seq;                                                                                                  // 180
      switch (pairCurr) {                                                                                              // 181
        case "HKD-AUD":                                                                                                // 182
          dpsRowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];                     // 183
          dpsRateData = [[5.9015, 5.8938, 5.8961, 5.894, 5.915, 5.9401], [5.9054, 5.9007, 5.9055, 5.906, 5.9362, 5.9683], [5.909, 5.9072, 5.9142, 5.9171, 5.9559, 'N/A'], [5.9124, 5.9132, 5.9223, 5.9274, 'N/A', 'N/A'], [5.9157, 5.919, 5.93, 5.9371, 'N/A', 'N/A'], [5.9188, 5.9244, 5.9372, 5.9462, 'N/A', 'N/A'], [5.9218, 5.9296, 5.9441, 5.9549, 'N/A', 'N/A'], [5.9246, 5.9345, 5.9507, 5.9632, 'N/A', 'N/A'], [5.9274, 5.9392, 5.957, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                       // 194
        case "AUD-HKD":                                                                                                // 196
          dpsRowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];                     // 197
          dpsRateData = [[0.1694, 0.1697, 0.1696, 0.1697, 0.1691, 0.1683], [0.1693, 0.1695, 0.1693, 0.1693, 0.1685, 0.1676], [0.1692, 0.1693, 0.1691, 0.169, 0.1679, 'N/A'], [0.1691, 0.1691, 0.1689, 0.1687, 'N/A', 'N/A'], [0.169, 0.1689, 0.1686, 0.1684, 'N/A', 'N/A'], [0.169, 0.1688, 0.1684, 0.1682, 'N/A', 'N/A'], [0.1689, 0.1686, 0.1682, 0.1679, 'N/A', 'N/A'], [0.1688, 0.1685, 0.168, 0.1677, 'N/A', 'N/A'], [0.1687, 0.1684, 0.1679, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                       // 208
        case "USD-AUD":                                                                                                // 210
          dpsRowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                     // 211
          dpsRateData = [[0.7594, 0.7589, 0.7583, 0.7577, 0.7596, 0.7616], [0.76, 0.7599, 0.7597, 0.7595, 0.7627, 0.7658], [0.7606, 0.7608, 0.7609, 0.7611, 0.7655, 0.7696], [0.7611, 0.7617, 0.7621, 0.7626, 0.7681, 'N/A'], [0.7616, 0.7625, 0.7632, 0.764, 'N/A', 'N/A'], [0.7621, 0.7632, 0.7643, 0.7653, 'N/A', 'N/A'], [0.7625, 0.7639, 0.7652, 0.7665, 'N/A', 'N/A'], [0.7629, 0.7646, 0.7662, 0.7676, 'N/A', 'N/A'], [0.7633, 0.7653, 0.767, 0.7687, 'N/A', 'N/A']];
          break;                                                                                                       // 222
        case "AUD-USD":                                                                                                // 224
          dpsRowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                     // 225
          dpsRateData = [[1.3168, 1.3177, 1.3187, 1.3198, 1.3165, 1.313], [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058], [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058], [1.3139, 1.3129, 1.3122, 1.3113, 1.3019, 'N/A'], [1.313, 1.3115, 1.3103, 1.3089, 'N/A', 'N/A'], [1.3122, 1.3103, 1.3084, 1.3067, 'N/A', 'N/A'], [1.3115, 1.3091, 1.3068, 1.3046, 'N/A', 'N/A'], [1.3108, 1.3079, 1.3051, 1.3028, 'N/A', 'N/A'], [1.3101, 1.3067, 1.3038, 1.3009, 'N/A', 'N/A']];
          break;                                                                                                       // 236
        case "HKD-GBP":                                                                                                // 238
          dpsRowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];                     // 239
          dpsRateData = [[9.7533, 9.7583, 9.7561, 9.7433, 9.668, 'N/A'], [9.7475, 9.7482, 9.7424, 9.7268, 'N/A', 'N/A'], [9.7419, 9.7387, 9.7296, 9.7113, 'N/A', 'N/A'], [9.7367, 9.7298, 9.7174, 9.6965, 'N/A', 'N/A'], [9.7317, 9.7212, 9.7058, 9.6824, 'N/A', 'N/A'], [9.7268, 9.713, 9.6948, 9.6689, 'N/A', 'N/A'], [9.7222, 9.7052, 9.6841, 9.6559, 'N/A', 'N/A'], [9.7177, 9.6976, 9.6739, 9.6434, 'N/A', 'N/A'], [9.7134, 9.6903, 9.664, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                       // 250
        case "GBP-HKD":                                                                                                // 252
          dpsRowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];                     // 253
          dpsRateData = [[0.1025, 0.1025, 0.1025, 0.1026, 0.1034, 'N/A'], [0.1026, 0.1026, 0.1026, 0.1028, 'N/A', 'N/A'], [0.1026, 0.1027, 0.1028, 0.103, 'N/A', 'N/A'], [0.1027, 0.1028, 0.1029, 0.1031, 'N/A', 'N/A'], [0.1028, 0.1029, 0.103, 0.1033, 'N/A', 'N/A'], [0.1028, 0.103, 0.1031, 0.1034, 'N/A', 'N/A'], [0.1029, 0.103, 0.1033, 0.1036, 'N/A', 'N/A'], [0.1029, 0.1031, 0.1034, 0.1037, 'N/A', 'N/A'], [0.103, 0.1032, 0.1035, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                       // 264
        case "HKD-CAD":                                                                                                // 266
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                     // 267
          dpsRateData = [[5.9099, 5.9081, 5.8937, 5.885, 5.8985, 5.9098], [5.9146, 5.9159, 5.9056, 5.9005, 5.925, 5.9451], [5.9189, 5.9231, 5.9162, 5.9143, 5.9484, 5.976], [5.9229, 5.9296, 5.9259, 5.9268, 5.9693, 'N/A'], [5.9266, 5.9357, 5.9348, 5.9382, 'N/A', 'N/A'], [5.9302, 5.9414, 5.943, 5.9487, 'N/A', 'N/A'], [5.9335, 5.9467, 5.9507, 5.9584, 'N/A', 'N/A'], [5.9367, 5.9518, 5.958, 5.9676, 'N/A', 'N/A'], [5.9397, 5.9566, 5.9648, 5.9762, 'N/A', 'N/A']];
          break;                                                                                                       // 278
        case "CAD-HKD":                                                                                                // 280
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                     // 281
          dpsRateData = [[0.1692, 0.1693, 0.1697, 0.1699, 0.1695, 0.1692], [0.1691, 0.169, 0.1693, 0.1695, 0.1688, 0.1682], [0.169, 0.1688, 0.169, 0.1691, 0.1681, 0.1673], [0.1688, 0.1686, 0.1688, 0.1687, 0.1675, 'N/A'], [0.1687, 0.1685, 0.1685, 0.1684, 'N/A', 'N/A'], [0.1686, 0.1683, 0.1683, 0.1681, 'N/A', 'N/A'], [0.1685, 0.1682, 0.168, 0.1678, 'N/A', 'N/A'], [0.1684, 0.168, 0.1678, 0.1676, 'N/A', 'N/A'], [0.1684, 0.1679, 0.1677, 0.1673, 'N/A', 'N/A']];
          break;                                                                                                       // 292
        case "HKD-EUR":                                                                                                // 294
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                     // 295
          dpsRateData = [[8.4099, 8.4216, 8.4286, 8.4289, 8.435, 8.4295], [8.4038, 8.4111, 8.414, 8.411, 8.4037, 8.3881], [8.3982, 8.4015, 8.4009, 8.3949, 8.3755, 8.3505], [8.3931, 8.3927, 8.3889, 8.3802, 8.3495, 8.3157], [8.3882, 8.3846, 8.3779, 8.3667, 8.3254, 'N/A'], [8.3837, 8.3771, 8.3676, 8.3541, 'N/A', 'N/A'], [8.3795, 8.3699, 8.358, 8.3422, 'N/A', 'N/A'], [8.3755, 8.3632, 8.3488, 8.331, 'N/A', 'N/A'], [8.3716, 8.3568, 8.3401, 8.3202, 'N/A', 'N/A']];
          break;                                                                                                       // 306
        case "EUR-HKD":                                                                                                // 308
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                     // 309
          dpsRateData = [[0.1189, 0.1187, 0.1186, 0.1186, 0.1186, 0.1186], [0.119, 0.1189, 0.1188, 0.1189, 0.119, 0.1192], [0.1191, 0.119, 0.119, 0.1191, 0.1194, 0.1198], [0.1191, 0.1192, 0.1192, 0.1193, 0.1198, 0.1203], [0.1192, 0.1193, 0.1194, 0.1195, 0.1201, 'N/A'], [0.1193, 0.1194, 0.1195, 0.1197, 'N/A', 'N/A'], [0.1193, 0.1195, 0.1196, 0.1199, 'N/A', 'N/A'], [0.1194, 0.1196, 0.1198, 0.12, 'N/A', 'N/A'], [0.1195, 0.1197, 0.1199, 0.1202, 'N/A', 'N/A']];
          break;                                                                                                       // 320
        case "HKD-CNH":                                                                                                // 322
          dpsRowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];                     // 323
          dpsRateData = [[1.1326, 1.1301, 1.128, 1.1254, 1.1188, 1.1147], [1.1336, 1.1319, 1.1304, 1.1287, 1.1248, 1.123], [1.1344, 1.1333, 1.1324, 1.1313, 1.1297, 1.1296], [1.1352, 1.1345, 1.1341, 1.1335, 1.1338, 1.1351], [1.1358, 1.1356, 1.1356, 1.1355, 1.1374, 1.1399], [1.1365, 1.1366, 1.137, 1.1373, 1.1406, 1.1441], [1.137, 1.1376, 1.1383, 1.1389, 1.1435, 'N/A'], [1.1375, 1.1384, 1.1395, 1.1404, 'N/A', 'N/A'], [1.138, 1.1393, 1.1406, 1.1418, 'N/A', 'N/A']];
          break;                                                                                                       // 334
        case "CNH-HKD":                                                                                                // 336
          dpsRowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];                     // 337
          dpsRateData = [[0.8829, 0.8849, 0.8865, 0.8886, 0.8938, 0.8971], [0.8821, 0.8835, 0.8846, 0.886, 0.889, 0.8905], [0.8815, 0.8824, 0.8831, 0.8839, 0.8852, 0.8853], [0.8809, 0.8814, 0.8818, 0.8822, 0.882, 0.881], [0.8804, 0.8806, 0.8806, 0.8807, 0.8792, 0.8773], [0.8799, 0.8798, 0.8795, 0.8793, 0.8767, 0.874], [0.8795, 0.879, 0.8785, 0.878, 0.8745, 'N/A'], [0.8791, 0.8784, 0.8776, 0.8769, 'N/A', 'N/A'], [0.8787, 0.8777, 0.8767, 0.8758, 'N/A', 'N/A']];
          break;                                                                                                       // 348
        default:                                                                                                       // 350
          dpsRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
      }                                                                                                                // 362
      hot.updateSettings({                                                                                             // 363
        rowHeaders: dpsRowHeader                                                                                       //
      });                                                                                                              // 365
      hot.loadData(dpsRateData);                                                                                       // 366
      var series = dpsChart.series;                                                                                    // 367
      for (var i = 0; i < series.length; i++) {                                                                        // 368
        var column = series[i];                                                                                        // 369
        if (column.name === seq || column.name === inv) {                                                              // 370
          column.show();                                                                                               //
        } else {                                                                                                       // 372
          column.hide();                                                                                               //
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 378
  $scope.convert2dp = function () {                                                                                    // 379
    document.getElementById('convertAmount').value = document.getElementById('tempAmount').innerHTML;                  //
  };                                                                                                                   //
                                                                                                                       // 382
  $scope.$on('tableChange', function (event, linkedStock, tenor, koType, barrierType, kiBarrier) {                     // 383
    var tmpColHeader = [];                                                                                             // 384
    var tmpRowHeader = [];                                                                                             // 385
    var tmpData;                                                                                                       // 386
    var sortDcdcDataKOBarrier;                                                                                         // 387
    var sortDcdcDataQuery;                                                                                             //
                                                                                                                       // 390
    if (barrierType == "NONE") {                                                                                       // 391
      sortDcdcDataKOBarrier = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType }, { sort: { "ko_barrier": 1 } }).fetch();
      if ($scope.cal.dcdc.scenario == 1) {                                                                             // 393
        sortDcdcDataQuery = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType }, { sort: { "strike": 1 } }).fetch();
      } else {                                                                                                         // 395
        sortDcdcDataQuery = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType }, { sort: { "coupon_pa": 1 } }).fetch();
      }                                                                                                                //
    } else {                                                                                                           // 398
      sortDcdcDataKOBarrier = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType, "ki_barrier": parseInt(kiBarrier) }, { sort: { "ko_barrier": 1 } }).fetch();
      if ($scope.cal.dcdc.scenario == 1) {                                                                             // 400
        sortDcdcDataQuery = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType, "ki_barrier": parseInt(kiBarrier) }, { sort: { "strike": 1 } }).fetch();
      } else {                                                                                                         // 402
        sortDcdcDataQuery = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType, "ki_barrier": parseInt(kiBarrier) }, { sort: { "coupon_pa": 1 } }).fetch();
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       // 406
    if (sortDcdcDataKOBarrier.length > 0) {                                                                            // 407
      temp = [[]];                                                                                                     // 408
      var tmpIdx = 0;                                                                                                  //
                                                                                                                       // 410
      tmpColHeader.push(sortDcdcDataKOBarrier[0].ko_barrier);                                                          // 411
      if ($scope.cal.dcdc.scenario == 1) {                                                                             // 412
        tmpRowHeader.push(sortDcdcDataQuery[0].strike);                                                                //
      } else {                                                                                                         // 414
        tmpRowHeader.push(sortDcdcDataQuery[0].coupon_pa);                                                             //
      }                                                                                                                //
                                                                                                                       // 417
      for (var i = 0; i < sortDcdcDataKOBarrier.length; i++) {                                                         // 418
        for (var a = 0; a < tmpColHeader.length; a++) {                                                                // 419
          if (!tmpColHeader.includes(sortDcdcDataKOBarrier[i].ko_barrier)) {                                           // 420
            tmpColHeader.push(sortDcdcDataKOBarrier[i].ko_barrier);                                                    //
          }                                                                                                            //
        }                                                                                                              //
                                                                                                                       // 424
        for (var b = 0; b < tmpRowHeader.length; b++) {                                                                // 425
          if ($scope.cal.dcdc.scenario == 1) {                                                                         // 426
            if (!tmpRowHeader.includes(sortDcdcDataQuery[i].strike)) {                                                 // 427
              tmpRowHeader.push(sortDcdcDataQuery[i].strike);                                                          //
            }                                                                                                          //
          } else {                                                                                                     // 430
            if (!tmpRowHeader.includes(sortDcdcDataQuery[i].coupon_pa)) {                                              // 431
              tmpRowHeader.push(sortDcdcDataQuery[i].coupon_pa);                                                       //
            }                                                                                                          //
          }                                                                                                            //
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       // 437
      for (var i = 0; i < tmpRowHeader.length - 1; i++) {                                                              // 438
        temp.push(new Array());                                                                                        //
      }                                                                                                                //
                                                                                                                       // 441
      for (var a = 0; a < tmpRowHeader.length; a++) {                                                                  // 442
        for (var b = 0; b < tmpColHeader.length; b++) {                                                                // 443
          if ($scope.cal.dcdc.scenario == 1) {                                                                         // 444
            if (barrierType == "NONE") {                                                                               // 445
              tmpData = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType, "strike": tmpRowHeader[a], "ko_barrier": tmpColHeader[b] }, { sort: { "ko_barrier": 1, "coupon_pa": 1 } }).fetch();
            } else {                                                                                                   // 447
              tmpData = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType, "strike": tmpRowHeader[a], "ko_barrier": tmpColHeader[b], "ki_barrier": parseInt(kiBarrier) }, { sort: { "ko_barrier": 1, "coupon_pa": 1 } }).fetch();
            }                                                                                                          //
          } else {                                                                                                     // 450
            if (barrierType == "NONE") {                                                                               // 451
              tmpData = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType, "coupon_pa": tmpRowHeader[a], "ko_barrier": tmpColHeader[b] }, { sort: { "ko_barrier": 1, "strike": 1 } }).fetch();
            } else {                                                                                                   // 453
              tmpData = DcdcData.find({ "underlying": linkedStock, "tenor": parseInt(tenor), "ko_type": koType, "barrier_type": barrierType, "coupon_pa": tmpRowHeader[a], "ko_barrier": tmpColHeader[b], "ki_barrier": parseInt(kiBarrier) }, { sort: { "ko_barrier": 1, "strike": 1 } }).fetch();
            }                                                                                                          //
          }                                                                                                            //
                                                                                                                       // 457
          if (tmpData.length > 0) {                                                                                    // 458
            if ($scope.cal.dcdc.scenario == 1) {                                                                       // 459
              temp[a].push(tmpData[0].coupon_pa);                                                                      //
            } else {                                                                                                   // 461
              temp[a].push(tmpData[0].strike);                                                                         //
            }                                                                                                          //
          } else {                                                                                                     // 464
            temp[a].push('N/A');                                                                                       //
          }                                                                                                            //
        }                                                                                                              //
      }                                                                                                                // 468
      dcdcRateData = temp;                                                                                             // 469
      dcdcRowHeader = tmpRowHeader;                                                                                    // 470
      dcdcColHeader = tmpColHeader;                                                                                    //
    } else {                                                                                                           // 472
      dcdcColHeader = ['N/A', 'N/A'];                                                                                  // 473
      dcdcRowHeader = ['N/A', 'N/A', 'N/A'];                                                                           // 474
      dcdcRateData = [['N/A', 'N/A'], ['N/A', 'N/A'], ['N/A', 'N/A']];                                                 //
    }                                                                                                                  // 480
    hot.updateSettings({                                                                                               // 481
      rowHeaders: dcdcRowHeader,                                                                                       // 482
      colHeaders: dcdcColHeader                                                                                        //
    });                                                                                                                // 484
    hot.loadData(dcdcRateData);                                                                                        //
  });                                                                                                                  //
                                                                                                                       // 487
  $scope.onKIBarrierChange = function () {                                                                             // 488
    if ($scope.cal.dcdc.linkedStock && $scope.cal.dcdc.tenor && $scope.cal.dcdc.koType && $scope.cal.dcdc.barrierType && $scope.cal.dcdc.kiBarrier) {
      $scope.$emit('tableChange', $scope.cal.dcdc.linkedStock, $scope.cal.dcdc.tenor, $scope.cal.dcdc.koType, $scope.cal.dcdc.barrierType, $scope.cal.dcdc.kiBarrier);
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 493
  $scope.onKOTypeChange = function () {                                                                                // 494
    if ($scope.cal.dcdc.linkedStock && $scope.cal.dcdc.tenor && $scope.cal.dcdc.koType && $scope.cal.dcdc.barrierType) {
      $scope.$emit('tableChange', $scope.cal.dcdc.linkedStock, $scope.cal.dcdc.tenor, $scope.cal.dcdc.koType, $scope.cal.dcdc.barrierType, $scope.cal.dcdc.kiBarrier);
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 499
  $scope.onBarrierTypeChange = function () {                                                                           // 500
    if ($scope.cal.dcdc.linkedStock && $scope.cal.dcdc.tenor && $scope.cal.dcdc.koType && $scope.cal.dcdc.barrierType) {
      $scope.$emit('tableChange', $scope.cal.dcdc.linkedStock, $scope.cal.dcdc.tenor, $scope.cal.dcdc.koType, $scope.cal.dcdc.barrierType, $scope.cal.dcdc.kiBarrier);
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 505
  $scope.onTenorChange = function () {                                                                                 // 506
    if ($scope.cal.dcdc.linkedStock && $scope.cal.dcdc.tenor && $scope.cal.dcdc.koType && $scope.cal.dcdc.barrierType) {
      $scope.$emit('tableChange', $scope.cal.dcdc.linkedStock, $scope.cal.dcdc.tenor, $scope.cal.dcdc.koType, $scope.cal.dcdc.barrierType, $scope.cal.dcdc.kiBarrier);
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 511
  $scope.onStockChange = function (stockName) {                                                                        // 512
    if ($scope.cal.dcdc.linkedStock && $scope.cal.dcdc.tenor && $scope.cal.dcdc.koType && $scope.cal.dcdc.barrierType) {
      $scope.$emit('tableChange', $scope.cal.dcdc.linkedStock, $scope.cal.dcdc.tenor, $scope.cal.dcdc.koType, $scope.cal.dcdc.barrierType, $scope.cal.dcdc.kiBarrier);
    }                                                                                                                  // 515
    if (stockName === '700 HK') {                                                                                      // 516
      $scope.cal.dcdc.spotPrice = 242.800;                                                                             //
    } else {                                                                                                           // 518
      $scope.cal.dcdc.spotPrice = 192.000;                                                                             //
    }                                                                                                                  // 520
    var series = dcdcChart.series;                                                                                     // 521
    var navigatorIndex = series.length - 1;                                                                            // 522
    for (var i = 0; i < navigatorIndex; i++) {                                                                         // 523
      var column = series[i];                                                                                          // 524
      if (column.name === stockName) {                                                                                 //
        //series[navigatorIndex].data = column.data;                                                                   // 526
        column.showInNavigator = true;                                                                                 //
        //dcdcChart.navigator.series = column;                                                                         // 528
        column.show();                                                                                                 //
      } else {                                                                                                         // 530
        column.showInNavigator = false;                                                                                // 531
        column.hide();                                                                                                 //
      }                                                                                                                //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 536
  $scope.calculateConversionRate = function () {                                                                       // 537
    dps = $scope.cal.dps;                                                                                              // 538
    var dpsDoc = DpsData.findOne({ depo_cur: dps.depositCurrency, link_cur: dps.linkedCurrency,                        // 539
      tenor: JSON.parse(dps.tenor).name, interest_rate: dps.yieldPa });                                                // 540
    if (dpsDoc) {                                                                                                      // 541
      dps.conversionRate = dpsDoc.conversion_rate;                                                                     // 542
      document.getElementById('search_field').value = dpsDoc.conversion_rate;                                          // 543
      colCntTmp = 0;                                                                                                   // 544
      rowCntTmp = 0;                                                                                                   // 545
      document.getElementById('search_button').click();                                                                //
    } else {                                                                                                           // 547
      dps.conversionRate = undefined;                                                                                  //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 551
  $scope.calculateCouponPa = function () {                                                                             // 552
    dcdc = $scope.cal.dcdc;                                                                                            // 553
    if (dcdc.barrierType === 'NONE') {                                                                                 // 554
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,             // 556
        ki_barrier: null });                                                                                           //
    } else {                                                                                                           // 558
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,             // 560
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                       //
    }                                                                                                                  // 562
    if (dcdcDoc) {                                                                                                     // 563
      dcdc.couponPa = dcdcDoc.coupon_pa;                                                                               // 564
      document.getElementById('search_field').value = dcdcDoc.coupon_pa;                                               // 565
      colCntTmp = 0;                                                                                                   // 566
      rowCntTmp = 0;                                                                                                   // 567
      document.getElementById('search_button').click();                                                                //
    } else {                                                                                                           // 569
      dcdc.couponPa = undefined;                                                                                       //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 573
  $scope.calculateStrikePrice = function () {                                                                          // 574
    var dcdc = $scope.cal.dcdc;                                                                                        // 575
    if (dcdc.barrierType === 'NONE') {                                                                                 // 576
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,             // 578
        ki_barrier: null });                                                                                           //
    } else {                                                                                                           // 580
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,             // 582
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                       //
    }                                                                                                                  // 584
    if (dcdcDoc) {                                                                                                     // 585
      dcdc.strikePrice = dcdcDoc.strike;                                                                               // 586
      document.getElementById('search_field').value = dcdcDoc.strike;                                                  // 587
      colCntTmp = 0;                                                                                                   // 588
      rowCntTmp = 0;                                                                                                   // 589
      document.getElementById('search_button').click();                                                                //
    } else {                                                                                                           // 591
      dcdc.strikePrice = undefined;                                                                                    //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 595
  $scope.resizeDiag = function (ev) {                                                                                  // 596
    $mdDialog.show({                                                                                                   // 597
      controller: DialogController,                                                                                    // 598
      templateUrl: 'client/toggle.html',                                                                               // 599
      parent: _angular2['default'].element(document.body),                                                             // 600
      targetEvent: ev,                                                                                                 // 601
      clickOutsideToClose: true                                                                                        //
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       // 605
  $scope.showAdvanced = function (ev) {                                                                                // 606
    $mdDialog.show({                                                                                                   // 607
      controller: DialogController,                                                                                    // 608
      templateUrl: 'client/dialog.html',                                                                               // 609
      parent: _angular2['default'].element(document.body),                                                             // 610
      targetEvent: ev,                                                                                                 // 611
      clickOutsideToClose: true                                                                                        //
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       // 615
  function DialogController($scope, $mdDialog) {                                                                       // 616
    $scope.hide = function () {                                                                                        // 617
      $mdDialog.hide();                                                                                                //
    };                                                                                                                 //
                                                                                                                       // 620
    $scope.cancel = function () {                                                                                      // 621
      $mdDialog.cancel();                                                                                              //
    };                                                                                                                 //
                                                                                                                       // 624
    $scope.answer = function (answer) {                                                                                // 625
      $mdDialog.hide(answer);                                                                                          //
    };                                                                                                                 //
  }                                                                                                                    //
                                                                                                                       // 629
  $scope.cal = {                                                                                                       // 630
    dps: {},                                                                                                           // 631
    dcdc: {                                                                                                            // 632
      scenario: 1                                                                                                      //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       // 636
  $scope.currencies = 'AUD, CAD, CNH, EUR, GBP, HKD, USD'.split(', ').map(function (currency) {                        // 637
    return { abbrev: currency };                                                                                       //
  });                                                                                                                  //
                                                                                                                       // 640
  $scope.dpsTenors = [{                                                                                                // 642
    name: '1W',                                                                                                        // 643
    value: 0                                                                                                           //
  }, {                                                                                                                 // 645
    name: '2W',                                                                                                        // 646
    value: 1                                                                                                           //
  }, {                                                                                                                 // 648
    name: '3W',                                                                                                        // 649
    value: 2                                                                                                           //
  }, {                                                                                                                 // 651
    name: '1M',                                                                                                        // 652
    value: 3                                                                                                           //
  }, {                                                                                                                 // 654
    name: '2M',                                                                                                        // 655
    value: 4                                                                                                           //
  }, {                                                                                                                 // 657
    name: '3M',                                                                                                        // 658
    value: 5                                                                                                           //
  }];                                                                                                                  //
                                                                                                                       // 662
  $scope.dcdcTenors = [{                                                                                               // 664
    name: '3M',                                                                                                        // 665
    value: 3                                                                                                           //
  }, {                                                                                                                 // 667
    name: '6M',                                                                                                        // 668
    value: 6                                                                                                           //
  }, {                                                                                                                 // 670
    name: '9M',                                                                                                        // 671
    value: 9                                                                                                           //
  }, {                                                                                                                 // 673
    name: '12M',                                                                                                       // 674
    value: 12                                                                                                          //
  }];                                                                                                                  //
                                                                                                                       // 678
  $scope.stocks = ['700 HK', '388 HK'];                                                                                //
                                                                                                                       // 680
  $scope.koBarriers = ['95', '100', '105', '110'];                                                                     //
                                                                                                                       // 682
  $scope.koTypes = ['Daily', 'Period End'];                                                                            //
                                                                                                                       // 684
  $scope.kiBarriers = ['75', '78'];                                                                                    //
                                                                                                                       // 686
  $scope.barrierTypes = ['NONE', 'AKI', 'EKI'];                                                                        //
                                                                                                                       //
  //dcdcview Button JS                                                                                                 // 689
  $scope.demo = {                                                                                                      // 690
    showTooltip: false,                                                                                                // 691
    tipDirection: 'bottom'                                                                                             //
  };                                                                                                                   //
                                                                                                                       // 694
  $scope.demo.delayTooltip = undefined;                                                                                // 695
  $scope.$watch('demo.delayTooltip', function (val) {                                                                  // 696
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;                                                                 //
  });                                                                                                                  //
                                                                                                                       // 699
  $scope.linkedCurrencyFilter = function (inputCur) {                                                                  // 700
    return inputCur.abbrev !== $scope.cal.dps.depositCurrency && !(inputCur.abbrev === 'USD' && $scope.cal.dps.depositCurrency === 'HKD') && !(inputCur.abbrev === 'HKD' && $scope.cal.dps.depositCurrency === 'USD');
  };                                                                                                                   //
}]);                                                                                                                   //
                                                                                                                       // 707
spcal.controller('AutoCompleteCtrl', ["$timeout", "$q", "$log", function ($timeout, $q, $log) {                        // 708
  var self = this;                                                                                                     //
                                                                                                                       // 710
  self.simulateQuery = true;                                                                                           // 711
  self.isDisabled = false;                                                                                             //
                                                                                                                       //
  // list of `state` value/display objects                                                                             // 714
  self.states = loadAll();                                                                                             // 715
  self.querySearch = querySearch;                                                                                      // 716
  self.selectedItemChange = selectedItemChange;                                                                        // 717
  self.searchTextChange = searchTextChange;                                                                            //
                                                                                                                       // 719
  self.newState = newState;                                                                                            //
                                                                                                                       // 721
  function newState(state) {                                                                                           // 722
    alert("Sorry! You'll need to create a Constitution for " + state + " first!");                                     //
  }                                                                                                                    //
                                                                                                                       //
  // ******************************                                                                                    //
  // Internal methods                                                                                                  //
  // ******************************                                                                                    //
                                                                                                                       //
  /**                                                                                                                  //
   * Search for states... use $timeout to simulate                                                                     //
   * remote dataservice call.                                                                                          //
   */                                                                                                                  // 733
  function querySearch(query) {                                                                                        // 734
    var results = query ? self.states.filter(createFilterFor(query)) : self.states,                                    //
        deferred;                                                                                                      // 736
    if (self.simulateQuery) {                                                                                          // 737
      deferred = $q.defer();                                                                                           // 738
      $timeout(function () {                                                                                           // 738
        deferred.resolve(results);                                                                                     //
      }, Math.random() * 1000, false);                                                                                 // 739
      return deferred.promise;                                                                                         //
    } else {                                                                                                           // 741
      return results;                                                                                                  //
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       // 745
  function searchTextChange(text) {                                                                                    // 746
    $log.info('Text changed to ' + text);                                                                              //
  }                                                                                                                    //
                                                                                                                       // 749
  function selectedItemChange(item) {                                                                                  // 750
    $log.info('Item changed to ' + JSON.stringify(item));                                                              //
  }                                                                                                                    //
                                                                                                                       //
  /**                                                                                                                  //
   * Build `states` list of key/value pairs                                                                            //
   */                                                                                                                  // 756
  function loadAll() {                                                                                                 // 757
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';                                                                                     //
                                                                                                                       // 765
    return allStates.split(/, +/g).map(function (state) {                                                              // 766
      return {                                                                                                         // 767
        value: state.toLowerCase(),                                                                                    // 768
        display: state                                                                                                 //
      };                                                                                                               //
    });                                                                                                                //
  }                                                                                                                    //
                                                                                                                       //
  /**                                                                                                                  //
   * Create filter function for a query string                                                                         //
   */                                                                                                                  // 776
  function createFilterFor(query) {                                                                                    // 777
    var lowercaseQuery = _angular2['default'].lowercase(query);                                                        //
                                                                                                                       // 779
    return function filterFn(state) {                                                                                  // 780
      return state.value.indexOf(lowercaseQuery) === 0;                                                                //
    };                                                                                                                 //
  }                                                                                                                    //
  // }                                                                                                                 //
}]);                                                                                                                   //
                                                                                                                       // 788
var themeIcons = function themeIcons($mdIconProvider) {                                                                //
                                                                                                                       // 790
  $mdIconProvider.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg").iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg").iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg").iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg").iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg").iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg").iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
};                                                                                                                     //
                                                                                                                       // 814
_angular2['default'].module('spcal').config(themeIcons);                                                               //
                                                                                                                       // 818
spcal.controller('MatrixCtrl', ["$mdDialog", "$timeout", "$scope", function ($mdDialog, $timeout, $scope) {            // 819
  $scope.checked = true;                                                                                               // 820
  var searchFiled = document.getElementById('search_field');                                                           // 821
  container = document.getElementById('matrixTable');                                                                  //
                                                                                                                       // 823
  hot = new _handsontableProDistHandsontableFull2['default'](container, {                                              // 824
    data: dpsRateData,                                                                                                 // 825
    headerToolTips: true,                                                                                              // 826
    rowHeaders: dpsRowHeader,                                                                                          // 827
    colHeaders: dpsColHeader,                                                                                          //
                                                                                                                       // 829
    colWidths: 100,                                                                                                    // 830
    rowHeights: 40,                                                                                                    // 831
    search: {                                                                                                          // 832
      queryMethod: dpsExactMatch                                                                                       //
    },                                                                                                                 // 834
    currentRowClassName: 'selectedRow',                                                                                // 835
    currentColClassName: 'selectedCol',                                                                                // 836
    editor: false                                                                                                      //
  });                                                                                                                  //
                                                                                                                       // 839
  function dpsExactMatch(queryStr, value) {                                                                            // 840
    var matchFlag = false;                                                                                             //
                                                                                                                       // 842
    if (queryStr.toString() === value.toString()) {                                                                    // 843
      rowCnt = rowCntTmp;                                                                                              // 844
      colCnt = colCntTmp;                                                                                              // 845
      if (dps) {                                                                                                       // 846
        if (parseInt(colCnt) == parseInt(JSON.parse(dps.tenor).value)) {                                               // 847
          matchFlag = true;                                                                                            //
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       // 852
    colCntTmp++;                                                                                                       // 853
    if (colCntTmp > 5) {                                                                                               // 854
      colCntTmp = 0;                                                                                                   // 855
      rowCntTmp++;                                                                                                     //
    }                                                                                                                  // 857
    return matchFlag;                                                                                                  //
  }                                                                                                                    //
                                                                                                                       // 860
  _handsontableProDistHandsontableFull2['default'].Dom.addEvent(search_button, 'click', function (event) {             // 861
    queryResult = hot.search.query(document.getElementById('search_field').value);                                     // 862
    hot.render();                                                                                                      // 863
    hot.selectCell(queryResult[0].row, queryResult[0].col);                                                            //
  });                                                                                                                  //
                                                                                                                       // 866
  $timeout(function () {                                                                                               // 867
    hot.selectCell(0, 0);                                                                                              // 868
    document.getElementById('toggleBtn').click();                                                                      // 869
    $mdDialog.cancel();                                                                                                //
  }, 1);                                                                                                               //
}]);                                                                                                                   //
                                                                                                                       // 873
spcal.controller('DiagramCtrl', ["$scope", function ($scope) {                                                         // 874
  $.get('fxRate.csv', function (data) {                                                                                //
    // Create the chart                                                                                                // 876
    dpsChart = Highcharts.chart('dpsChartContainer', {                                                                 // 877
      data: {                                                                                                          // 878
        csv: data                                                                                                      //
      },                                                                                                               // 880
      plotOptions: {                                                                                                   // 881
        series: {                                                                                                      // 882
          visible: false                                                                                               //
        }                                                                                                              //
      },                                                                                                               // 885
      title: {                                                                                                         // 886
        text: 'Deposit Plus'                                                                                           //
      },                                                                                                               // 888
      yAxis: {                                                                                                         // 889
        crosshair: true,                                                                                               // 890
        title: {                                                                                                       // 891
          text: 'FX Rate'                                                                                              //
        }                                                                                                              //
      }                                                                                                                //
    });                                                                                                                //
  });                                                                                                                  // 896
  $.get('stockPrice.csv', function (data) {                                                                            //
    // Create the chart                                                                                                // 898
    dcdcChart = Highstock.stockChart('dcdcChartContainer', {                                                           // 899
      data: {                                                                                                          // 900
        csv: data                                                                                                      //
      },                                                                                                               // 902
      plotOptions: {                                                                                                   // 903
        series: {                                                                                                      // 904
          visible: false                                                                                               //
        }                                                                                                              //
      },                                                                                                               // 907
      title: {                                                                                                         // 908
        text: 'DCDC'                                                                                                   //
      },                                                                                                               // 910
      yAxis: {                                                                                                         // 911
        title: {                                                                                                       // 912
          text: 'Stock Price'                                                                                          //
        }                                                                                                              //
      }                                                                                                                //
    });                                                                                                                //
  });                                                                                                                  //
}]);                                                                                                                   //
                                                                                                                       // 920
spcal.controller('BarChartCtrl', ["$scope", function ($scope) {                                                        //
  // Create the chart                                                                                                  // 922
  $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {     // 923
    barChart = Highcharts.chart('barContainer', {                                                                      // 924
      chart: {                                                                                                         // 925
        type: 'column'                                                                                                 //
      },                                                                                                               // 927
      title: {                                                                                                         // 928
        text: 'Performance of Structured Products Offered by HSBC'                                                     //
      },                                                                                                               // 930
      xAxis: {                                                                                                         // 931
        categories: ['Deposit Plus', 'Currency Linked III', 'Interest Rate Range Accrual', 'Capped and Floored Floater Deposit']
      },                                                                                                               // 933
      yAxis: {                                                                                                         // 934
        min: 0,                                                                                                        // 935
        title: {                                                                                                       // 936
          text: 'Criteria Distribution'                                                                                //
        }                                                                                                              //
      },                                                                                                               // 939
      tooltip: {                                                                                                       // 940
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true                                                                                                   //
      },                                                                                                               // 943
      plotOptions: {                                                                                                   // 944
        column: {                                                                                                      // 945
          stacking: 'percent'                                                                                          //
        }                                                                                                              //
      },                                                                                                               // 948
      series: [{                                                                                                       // 949
        name: 'Return',                                                                                                // 950
        data: [5, 3, 4, 7]                                                                                             //
      }, {                                                                                                             // 952
        name: 'Stability',                                                                                             // 953
        data: [2, 2, 3, 2]                                                                                             //
      }, {                                                                                                             // 955
        name: 'Volatility',                                                                                            // 956
        data: [3, 4, 4, 2]                                                                                             //
      }, {                                                                                                             // 958
        name: 'Momentum',                                                                                              // 959
        data: [6, 2, 4, 3]                                                                                             //
      }]                                                                                                               //
    });                                                                                                                //
  });                                                                                                                  //
}]);                                                                                                                   //
                                                                                                                       // 965
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                    // 966
  $mdThemingProvider.theme('altTheme').primaryPalette('purple');                                                       //
}]).controller('SubheaderAppCtrl', ["$scope", function ($scope) {                                                      // 970
  var imagePath = 'images/hsbc-icon.gif';                                                                              // 971
  $scope.infolinks = [{                                                                                                // 973
    face: imagePath,                                                                                                   // 974
    what: 'Glossary Of Banking Terms',                                                                                 // 975
    who: 'HSBC Personal Banking',                                                                                      // 976
    notes: " A to Z guide on glossaries",                                                                              // 977
    link: "https://www.hsbc.com.hk/personal/help-and-support/glossary-of-banking-terms.html"                           //
  }, {                                                                                                                 // 980
    face: imagePath,                                                                                                   // 981
    what: 'Deposit Plus',                                                                                              // 982
    who: 'HSBC Personal Banking',                                                                                      // 983
    notes: " Set up your Deposit Plus investment now",                                                                 // 984
    link: "https://www.hsbc.com.hk/personal/investments/structured-products/deposit-plus.html"                         //
  }];                                                                                                                  // 987
  $scope.datalinks = [{                                                                                                // 989
    face: imagePath,                                                                                                   // 990
    what: 'Deposit Interest Market Data',                                                                              // 991
    who: 'HSBC Personal Banking',                                                                                      // 992
    notes: " Check the current interest rate of normal deposit",                                                       // 993
    link: "https://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info/deposit-rates/interest-rates"                  //
  }, {                                                                                                                 // 996
    face: imagePath,                                                                                                   // 997
    what: 'Equity Market Data',                                                                                        // 998
    who: 'HSBC Personal Banking',                                                                                      // 999
    notes: " Check the current market price of chosen equity",                                                         // 1000
    link: "http://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info"                                                //
  }];                                                                                                                  // 1003
  $scope.videos = [{                                                                                                   // 1005
    face: imagePath,                                                                                                   // 1006
    what: 'Deposit Plus Overview',                                                                                     // 1007
    who: 'A Currency Linked Investment',                                                                               // 1008
    notes: " Get to know the products before investing",                                                               // 1009
    link: '_-w3mMxkVdU'                                                                                                //
  }, {                                                                                                                 // 1012
    face: imagePath,                                                                                                   // 1013
    what: 'Deposit Plus Example',                                                                                      // 1014
    who: 'A Currency Linked Investment',                                                                               // 1015
    notes: " Get to know the products before investing",                                                               // 1016
    link: 'z3ZjrWkCrdY'                                                                                                //
  }, {                                                                                                                 // 1019
    face: imagePath,                                                                                                   // 1020
    what: 'Deposit Plus Interest Calculation',                                                                         // 1021
    who: 'A Currency Linked Investment',                                                                               // 1022
    notes: " Get to know the products before investing",                                                               // 1023
    link: 'fBVv_BJ81bc'                                                                                                //
  }, {                                                                                                                 // 1026
    face: imagePath,                                                                                                   // 1027
    what: 'Deposit Plus Risk',                                                                                         // 1028
    who: 'A Currency Linked Investment',                                                                               // 1029
    notes: " Get to know the products before investing",                                                               // 1030
    link: 'K-QcjbuNnwg'                                                                                                //
  }, {                                                                                                                 // 1033
    face: imagePath,                                                                                                   // 1034
    what: 'DCDC',                                                                                                      // 1035
    who: 'An Equity Linked Investment',                                                                                // 1036
    notes: " Get to know the products before investing",                                                               // 1037
    link: 'z3ZjrWkCrdY'                                                                                                //
  }, {                                                                                                                 // 1040
    face: imagePath,                                                                                                   // 1041
    what: 'DCDC Example 1 - Auto Call',                                                                                // 1042
    who: 'An Equity Linked Investment',                                                                                // 1043
    notes: " Get to know the products before investing",                                                               // 1044
    link: 'z3ZjrWkCrdY'                                                                                                //
  }, {                                                                                                                 // 1047
    face: imagePath,                                                                                                   // 1048
    what: 'DCDC Example 2 - Airbag',                                                                                   // 1049
    who: 'An Equity Linked Investment',                                                                                // 1050
    notes: " Get to know the products before investing",                                                               // 1051
    link: 'z3ZjrWkCrdY'                                                                                                //
  }];                                                                                                                  //
}]);                                                                                                                   //
                                                                                                                       // 1056
spcal.controller('AppCtrl', ['$interval', function ($interval) {                                                       // 1058
  var self = this;                                                                                                     //
                                                                                                                       // 1060
  self.activated = true;                                                                                               // 1061
  self.determinateValue = 30;                                                                                          //
                                                                                                                       //
  // Iterate every 100ms, non-stop and increment                                                                       //
  // the Determinate loader.                                                                                           // 1065
  $interval(function () {                                                                                              //
                                                                                                                       // 1067
    self.determinateValue += 1;                                                                                        // 1068
    if (self.determinateValue > 100) {                                                                                 // 1069
      self.determinateValue = 30;                                                                                      //
    }                                                                                                                  //
  }, 100);                                                                                                             //
}]);                                                                                                                   //
                                                                                                                       // 1076
spcal.controller('videoCtrl', ["$scope", "$mdDialog", function ($scope, $mdDialog) {                                   // 1077
  DialogController.$inject = ["$scope", "$mdDialog"];                                                                  // 1078
  $scope.showAdvanced = function (ev, id) {                                                                            // 1079
    $mdDialog.show({                                                                                                   // 1080
      controller: DialogController,                                                                                    // 1081
      templateUrl: 'client/video.html',                                                                                // 1082
      parent: _angular2['default'].element(document.body),                                                             // 1083
      targetEvent: ev,                                                                                                 // 1084
      clickOutsideToClose: true,                                                                                       //
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.                                            //
    });                                                                                                                // 1087
    //player.videoId = id;                                                                                             //
    videoToPlay = id;                                                                                                  //
  };                                                                                                                   // 1090
                                                                                                                       // 1091
  function DialogController($scope, $mdDialog) {                                                                       // 1092
    $scope.hide = function () {                                                                                        //
      $mdDialog.hide();                                                                                                //
    };                                                                                                                 // 1095
                                                                                                                       // 1096
    $scope.cancel = function () {                                                                                      //
      $mdDialog.cancel();                                                                                              //
    };                                                                                                                 // 1099
                                                                                                                       // 1100
    $scope.answer = function (answer) {                                                                                //
      $mdDialog.hide(answer);                                                                                          //
    };                                                                                                                 //
  }                                                                                                                    // 1104
                                                                                                                       //
  onYouTubeIframeAPIReady = function () {                                                                              //
    // New Video Player, the first argument is the id of the div.                                                      // 1107
    // Make sure it's a global variable.                                                                               // 1108
    if (videoToPlay) {                                                                                                 // 1109
      player = new YT.Player("player", {                                                                               // 1110
        height: "400",                                                                                                 //
        width: "600",                                                                                                  // 1112
        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")         //
        videoId: videoToPlay,                                                                                          // 1114
        // Events like ready, state change,                                                                            // 1115
        events: {                                                                                                      //
          onReady: function onReady(event) {                                                                           // 1117
            // Play video when player ready.                                                                           //
            event.target.playVideo();                                                                                  //
          }                                                                                                            //
        }                                                                                                              //
      });                                                                                                              //
    }                                                                                                                  // 1123
  };                                                                                                                   //
  YT.load();                                                                                                           //
}]);                                                                                                                   // 1127
                                                                                                                       // 1128
function onReady() {                                                                                                   //
  _angular2['default'].bootstrap(document, ['spcal']);                                                                 //
}                                                                                                                      // 1131
                                                                                                                       // 1132
if (Meteor.isCordova) {                                                                                                //
  _angular2['default'].element(document).on('deviceready', onReady);                                                   // 1134
} else {                                                                                                               //
  _angular2['default'].element(document).ready(onReady);                                                               //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"collections":{"dcdc.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// collections/dcdc.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
DcdcData = new Mongo.Collection("dcdc");                                                                               // 1
                                                                                                                       //
DcdcData.allow({                                                                                                       // 3
  insert: function insert() {                                                                                          // 4
    if (Meteor.isServer) {                                                                                             // 5
      return true;                                                                                                     // 6
    } else {                                                                                                           //
      return false;                                                                                                    // 8
    }                                                                                                                  //
  },                                                                                                                   //
  update: function update() {                                                                                          // 11
    if (Meteor.isServer) {                                                                                             // 12
      return true;                                                                                                     // 13
    } else {                                                                                                           //
      return false;                                                                                                    // 15
    }                                                                                                                  //
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 18
    if (Meteor.isServer) {                                                                                             // 19
      return true;                                                                                                     // 20
    } else {                                                                                                           //
      return false;                                                                                                    // 22
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dps.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// collections/dps.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
DpsData = new Mongo.Collection("dps");                                                                                 // 1
                                                                                                                       //
DpsData.allow({                                                                                                        // 3
  insert: function insert() {                                                                                          // 4
    if (Meteor.isServer) {                                                                                             // 5
      return true;                                                                                                     // 6
    } else {                                                                                                           //
      return false;                                                                                                    // 8
    }                                                                                                                  //
  },                                                                                                                   //
  update: function update() {                                                                                          // 11
    if (Meteor.isServer) {                                                                                             // 12
      return true;                                                                                                     // 13
    } else {                                                                                                           //
      return false;                                                                                                    // 15
    }                                                                                                                  //
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 18
    if (Meteor.isServer) {                                                                                             // 19
      return true;                                                                                                     // 20
    } else {                                                                                                           //
      return false;                                                                                                    // 22
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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