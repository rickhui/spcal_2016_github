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
      var template = "<div layout=\"column\" class=\"container\" ng-cloak class=\"md-inline-form\" ng-controller=\"ValidationCtrl\"> <div class=\"tabsdemoDynamicHeight\" ng-cloak> <md-card> <md-tabs md-stretch-tabs=\"always\" style=\"min-height:865px\" md-border-bottom> <md-tab label=\"Deposit Plus\" ng-click=\"switchTable('dps')\"> <md-content class=\"md-padding\"> <!-- ng-controller=\"ValidationCtrl\" --> <md-content layout-padding> <div> <form name=\"DpsInvForm\"> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Deposit Currency</label> <md-select name=\"depoCurr\" ng-model=\"cal.dps.depositCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies\" value=\"{{currency.abbrev}}\">{{currency.abbrev}}</md-option> </md-select> <div ng-messages=\"DpsInvForm.depoCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Linked Currency</label> <md-select name=\"linkCurr\" ng-model=\"cal.dps.linkedCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies | filter:linkedCurrencyFilter\" value=\"{{currency.abbrev}}\"> {{currency.abbrev}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.linkCurr.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Currency Pair</label> <input name=\"currencyPair\" ng-if=\"cal.dps.depositCurrency&&cal.dps.linkedCurrency\" value=\"{{cal.dps.depositCurrency}}-{{cal.dps.linkedCurrency}}\" disabled=\"disabled\"> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dps.tenor\" required> <md-option ng-repeat=\"tenor in dpsTenors\" value=\"{{tenor}}\"> {{tenor.name}} </md-option> </md-select> <div ng-messages=\"DpsInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex-gt-sm> <label>Deposit Amount <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <span id=\"tempAmount\" style=\"display:none\">{{cal.dps.amountDeposit | number:0}}</span> <input md-maxlength=\"20\" ng-maxlength=\"20\" id=\"convertAmount\" name=\"amountDeposit\" ng-pattern=\"/^[0-9]*$/\" ng-model=\"cal.dps.amountDeposit\" ng-blur=\"convert2dp()\"> <div ng-messages=\"DpsInvForm.amountDeposit.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"maxlength\">Your field is too long.</div> <div ng-message=\"pattern\">Not a Valid Amount.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Interest Amount <span style=\"font-size:12px\" ng-if=\"cal.dps.depositCurrency\"> ({{cal.dps.depositCurrency}}) </span></label> <input name=\"interestAmount\" ng-if=\"cal.dps.amountDeposit && cal.dps.yieldPa\" value=\"{{cal.dps.amountDeposit*cal.dps.yieldPa/100 | number:2}}\" disabled=\"disabled\"> </md-input-container> </div> <!-- <h4 style=\"color:#737373\">Yield P.A. &emsp;&emsp;</h4> --> <div layout=\"row\"> <label style=\"color:#afaeae;display:block\">Interest Rate *</label> </div> <div layout=\"row\"> <div class=\"hint\">Please refer to the matrix on the right.</div> </div> <div layout=\"row\"> <md-slider-container flex> <md-slider md-discrete flex min=\"2\" max=\"9.5\" step=\"0.5\" ng-model=\"cal.dps.yieldPa\" aria-label=\"yieldPaSlider\" required></md-slider> <md-input-container> <input flex ng-if=\"cal.dps.yieldPa\" value=\"{{cal.dps.yieldPa}}%\" aria-label=\"yieldPaInput\" readonly=\"readonly\"> </md-input-container> </md-slider-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Conversion Rate</label> <input name=\"conversionRate\" ng-if=\"cal.dps.conversionRate\" value=\"{{cal.dps.conversionRate}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <!-- <label>Conversion Rate &emsp;&emsp;</label>\n                    <div style=\"font-size: 18px\"><b>{{cal.dps.conversionRate}}</b></div> --> </div> <div layout=\"row\" layout-align=\"end center\"> <!-- showAdvanced($event)\n                    resizeDiag($event) --> <input id=\"toggleBtn\" type=\"button\" style=\"display:none\" ng-click=\"resizeDiag($event)\"> <div> <md-button ng-disabled=\"DpsInvForm.$invalid\" ng-click=\"calculateConversionRate()\" class=\"md-raised md-warn\" aria-label=\"DPS Calculate Button\"> <md-tooltip> See the conversion rate under the chosen criteria </md-tooltip> Preview </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Compare </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <!-- <div ng-controller=\"DiagramCtrl\">\n\n                    </div> --> <div ng-controller=\"DiagramCtrl\" id=\"dpsChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> <md-tab label=\"DCDC\" ng-click=\"switchTable('dcdc')\"> <md-content class=\"md-padding\"> <!-- ng-controller=\"ValidationCtrl\" --> <md-content layout-padding> <div> <form name=\"DcdcInvForm\"> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Linked Stock</label> <md-select name=\"linkStock\" ng-model=\"cal.dcdc.linkedStock\" ng-change=\"onStockChange(cal.dcdc.linkedStock)\" required> <md-option ng-repeat=\"stock in stocks\" value=\"{{stock}}\">{{stock}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.linkStock.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Spot Price</label> <input name=\"spotPrice\" ng-if=\"cal.dcdc.linkedStock\" value=\"{{cal.dcdc.spotPrice}}\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <div style=\"color:#afaeae\">Query for</div> <md-radio-group layout=\"row\" ng-model=\"cal.dcdc.scenario\"> <md-radio-button value=\"1\" style=\"margin-right:100px\">Annual Coupon Rate</md-radio-button> <md-radio-button value=\"2\">Strike Price</md-radio-button> </md-radio-group> </md-input-container> </div> <div layout=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-model=\"cal.dcdc.strikePrice\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> <div class=\"hint\">Please refer to the matrix on the right.</div> <div ng-messages=\"DcdcInvForm.strikePrice.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Annual Coupon Rate</label> <input name=\"couponPa\" ng-model=\"cal.dcdc.couponPa\" type=\"number\" min=\"1\" required> <div class=\"hint\">Please refer to the matrix on the right.</div> <div ng-messages=\"DcdcInvForm.couponPa.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select name=\"tenor\" ng-model=\"cal.dcdc.tenor\" ng-change=\"onTenorChange(cal.dcdc.tenor)\" required> <md-option ng-repeat=\"tenor in dcdcTenors\" value=\"{{tenor.value}}\"> {{tenor.name}} </md-option> </md-select> <div ng-messages=\"DcdcInvForm.tenor.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Knock Out Type</label> <md-select name=\"koType\" ng-model=\"cal.dcdc.koType\" required> <md-option ng-repeat=\"koType in koTypes\" value=\"{{koType}}\">{{koType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.koType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Knock Out Barrier</label> <md-select name=\"koBarrier\" ng-model=\"cal.dcdc.koBarrier\" required> <md-option ng-repeat=\"koBarrier in koBarriers\" value=\"{{koBarrier}}\">{{koBarrier}}</md-option> </md-select> <!-- <input name=\"koBarrier\" ng-model=\"cal.dcdc.koBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> --> <div ng-messages=\"DcdcInvForm.koBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Barrier Type</label> <md-select name=\"barrierType\" ng-model=\"cal.dcdc.barrierType\" required> <md-option ng-repeat=\"barrierType in barrierTypes\" value=\"{{barrierType}}\">{{barrierType}}</md-option> </md-select> <div ng-messages=\"DcdcInvForm.barrierType.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Knock In Barrier</label> <md-select name=\"kiBarrier\" ng-disabled=\"cal.dcdc.barrierType !== 'AKI' && cal.dcdc.barrierType !== 'EKI'\" ng-model=\"cal.dcdc.kiBarrier\" ng-required=\"cal.dcdc.barrierType == 'AKI' || cal.dcdc.barrierType == 'EKI'\"> <md-option ng-repeat=\"kiBarrier in kiBarriers\" value=\"{{kiBarrier}}\">{{kiBarrier}}</md-option> </md-select> <!-- <input name=\"kiBarrier\" ng-model=\"cal.dcdc.kiBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" ng-required=\"cal.dcdc.barrierType !== 'NONE'\" ng-disabled=\"cal.dcdc.barrierType === 'NONE'\"> --> <div ng-messages=\"DcdcInvForm.kiBarrier.$error\" style=\"color:maroon\" role=\"alert\"> <div ng-message=\"required\">This field is required.</div> </div> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Annual Coupon Rate</label> <input name=\"couponPa\" ng-if=\"cal.dcdc.couponPa\" value=\"{{cal.dcdc.couponPa}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-if=\"cal.dcdc.strikePrice\" value=\"{{cal.dcdc.strikePrice}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> </div> <div layout=\"row\" layout-align=\"end center\"> <div ng-if=\"cal.dcdc.scenario == 1\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateCouponPa()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the coupon per annum under the chosen criteria </md-tooltip> Query </md-button> </div> <div ng-if=\"cal.dcdc.scenario == 2\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateStrikePrice()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the strike price under the chosen criteria </md-tooltip> Query </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\" style=\"margin-top:-24px\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Preview </md-button> </div> </div> <br> <md-divider></md-divider> <br> <div layout=\"row\"> <div ng-controller=\"DiagramCtrl\" id=\"dcdcChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> </md-tabs> </md-card> </div> </div> ";
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
      var template = "<md-card style=\"height:450px\" ng-controller=\"MatrixCtrl\"> <md-card-title> <md-content class=\"container\"> <div id=\"parentContainer\"> <input id=\"search_field\" type=\"hidden\"> <input id=\"search_button\" style=\"display:none\" type=\"button\"> <div class=\"handsontable\" id=\"matrixTable\"></div> </div> </md-content> </md-card-title> <md-card-actions layout=\"row\" layout-align=\"end center\"> <input style=\"display:none\" id=\"toggle_button\" type=\"checkbox\" ng-model=\"checked\"> <md-button ng-show=\"checked\" class=\"md-raised\" style=\"background:#fff;color:#000\">Conversion Rates</md-button> <md-button ng-show=\"checked\" class=\"md-raised\" style=\"background:#39f;color:#fff\">Tenors</md-button> <md-button ng-show=\"checked\" class=\"md-raised\" style=\"background:#c06;color:#fff\">Interest Rates</md-button> </md-card-actions> </md-card> ";
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
              var attrs = {"ng-cloak":""};                                                                         // 3
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
var temp;                                                                                                          // 20
var isDcdcData;                                                                                                    // 21
var dpsChart;                                                                                                      // 22
var dcdcChart;                                                                                                     // 23
var barChart;                                                                                                      // 24
var pairCurr;                                                                                                      // 25
var dpsColHeader = ['1W', '2W', '3W', '1M', '2M', '3M'];                                                           // 26
var dcdcColHeader = ['Underlying', 'Tenor', 'Strike Price', 'KO Type', 'KO Barrier', 'Barrier Type', 'KI Barrier', 'Coupon P.A.'];
var dpsRowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                       // 28
var dpsRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
var dcdcRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
var hot;                                                                                                           // 56
var videoToPlay;                                                                                                   // 57
var dps;                                                                                                           // 58
var dcdc;                                                                                                          // 59
var rowCnt = 0;                                                                                                    // 60
var colCnt = 0;                                                                                                    // 61
var rowCntTmp = 0;                                                                                                 // 62
var colCntTmp = 0;                                                                                                 // 63
var linkStock;                                                                                                     // 64
var dcdcTenor;                                                                                                     // 65
                                                                                                                   //
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                // 67
                                                                                                                   //
  $mdThemingProvider.theme('red').primaryPalette('red');                                                           // 69
                                                                                                                   //
  $mdThemingProvider.theme('blue').primaryPalette('blue');                                                         // 72
}]).controller('ValidationCtrl', ["$timeout", "$scope", "$mdDialog", "$interval", function ($timeout, $scope, $mdDialog, $interval) {
  DialogController.$inject = ["$scope", "$mdDialog"];                                                              // 77
  $scope.theme = 'red';                                                                                            //
                                                                                                                   // 79
  var isThemeRed = true;                                                                                           //
                                                                                                                   // 81
  $interval(function () {                                                                                          // 82
    $scope.theme = isThemeRed ? 'blue' : 'red';                                                                    //
                                                                                                                   // 84
    isThemeRed = !isThemeRed;                                                                                      //
  }, 2000);                                                                                                        //
                                                                                                                   // 87
  $scope.switchTable = function (option) {                                                                         // 88
    if (option == 'dps') {                                                                                         // 89
      if (!document.getElementById("toggle_button").checked) {                                                     // 90
        document.getElementById("toggle_button").click();                                                          //
      }                                                                                                            // 92
      hot.selectCell(0, 0);                                                                                        // 93
      hot.updateSettings({                                                                                         // 94
        rowHeaders: dpsRowHeader,                                                                                  // 95
        colHeaders: dpsColHeader,                                                                                  // 96
        fixedColumnsLeft: 0,                                                                                       // 97
        colWidths: [100, 100, 100, 100, 100, 100],                                                                 // 98
        search: {                                                                                                  // 99
          queryMethod: dpsExactMatch                                                                               //
        }                                                                                                          //
      });                                                                                                          // 102
      dpsRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
      hot.loadData(dpsRateData);                                                                                   //
    } else if (option == 'dcdc') {                                                                                 // 115
      if (document.getElementById("toggle_button").checked) {                                                      // 116
        document.getElementById("toggle_button").click();                                                          //
      }                                                                                                            // 118
      hot.selectCell(0, 0);                                                                                        // 119
      hot.updateSettings({                                                                                         // 120
        rowHeaders: true,                                                                                          // 121
        colWidths: [90, 70, 100, 100, 100, 100, 100, 100],                                                         // 122
        colHeaders: dcdcColHeader,                                                                                 // 123
        search: {                                                                                                  // 124
          queryMethod: dcdcExactMatch                                                                              //
        },                                                                                                         // 126
        fixedColumnsLeft: 2                                                                                        //
      });                                                                                                          // 128
      dcdcRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
      hot.loadData(dcdcRateData);                                                                                  //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 149
  function dpsExactMatch(queryStr, value) {                                                                        // 150
    var matchFlag = false;                                                                                         //
                                                                                                                   // 152
    if (queryStr.toString() === value.toString()) {                                                                // 153
      rowCnt = rowCntTmp;                                                                                          // 154
      colCnt = colCntTmp;                                                                                          // 155
      if (dps) {                                                                                                   // 156
        if (parseInt(colCnt) == parseInt(JSON.parse(dps.tenor).value)) {                                           // 157
          matchFlag = true;                                                                                        //
        }                                                                                                          //
      }                                                                                                            //
    }                                                                                                              //
                                                                                                                   // 162
    colCntTmp++;                                                                                                   // 163
    if (colCntTmp > 5) {                                                                                           // 164
      colCntTmp = 0;                                                                                               // 165
      rowCntTmp++;                                                                                                 //
    }                                                                                                              //
                                                                                                                   // 168
    return matchFlag;                                                                                              //
  }                                                                                                                //
                                                                                                                   // 171
  function dcdcExactMatch(queryStr, value) {                                                                       // 172
    var matchFlag = false;                                                                                         // 173
    console.log(queryStr);                                                                                         // 174
    if (queryStr.toString() === value.toString()) {                                                                // 175
      if ($scope.cal.dcdc.scenario == 1) {                                                                         // 176
        if (dcdcRateData[rowCntTmp][colCntTmp - 5].toString() === $scope.cal.dcdc.strikePrice.toString()) {        // 177
          matchFlag = true;                                                                                        //
        }                                                                                                          //
      } else {                                                                                                     // 180
        if (dcdcRateData[rowCntTmp][colCntTmp + 5].toString() === $scope.cal.dcdc.couponPa.toString()) {           // 181
          matchFlag = true;                                                                                        //
        }                                                                                                          //
      }                                                                                                            //
    }                                                                                                              //
                                                                                                                   // 186
    colCntTmp++;                                                                                                   // 187
    if (colCntTmp > 7) {                                                                                           // 188
      colCntTmp = 0;                                                                                               // 189
      rowCntTmp++;                                                                                                 //
    }                                                                                                              //
                                                                                                                   // 192
    return matchFlag;                                                                                              //
  }                                                                                                                //
                                                                                                                   // 195
  $scope.onCurPairChange = function (depoCur, linkCur) {                                                           // 196
    if (depoCur && linkCur) {                                                                                      // 197
      var seq = depoCur + "-" + linkCur;                                                                           // 198
      var inv = linkCur + "-" + depoCur;                                                                           // 199
      pairCurr = seq;                                                                                              // 200
      switch (pairCurr) {                                                                                          // 201
        case "HKD-AUD":                                                                                            // 202
          dpsRowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];                 // 203
          dpsRateData = [[5.9015, 5.8938, 5.8961, 5.894, 5.915, 5.9401], [5.9054, 5.9007, 5.9055, 5.906, 5.9362, 5.9683], [5.909, 5.9072, 5.9142, 5.9171, 5.9559, 'N/A'], [5.9124, 5.9132, 5.9223, 5.9274, 'N/A', 'N/A'], [5.9157, 5.919, 5.93, 5.9371, 'N/A', 'N/A'], [5.9188, 5.9244, 5.9372, 5.9462, 'N/A', 'N/A'], [5.9218, 5.9296, 5.9441, 5.9549, 'N/A', 'N/A'], [5.9246, 5.9345, 5.9507, 5.9632, 'N/A', 'N/A'], [5.9274, 5.9392, 5.957, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 214
        case "AUD-HKD":                                                                                            // 216
          dpsRowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];                 // 217
          dpsRateData = [[0.1694, 0.1697, 0.1696, 0.1697, 0.1691, 0.1683], [0.1693, 0.1695, 0.1693, 0.1693, 0.1685, 0.1676], [0.1692, 0.1693, 0.1691, 0.169, 0.1679, 'N/A'], [0.1691, 0.1691, 0.1689, 0.1687, 'N/A', 'N/A'], [0.169, 0.1689, 0.1686, 0.1684, 'N/A', 'N/A'], [0.169, 0.1688, 0.1684, 0.1682, 'N/A', 'N/A'], [0.1689, 0.1686, 0.1682, 0.1679, 'N/A', 'N/A'], [0.1688, 0.1685, 0.168, 0.1677, 'N/A', 'N/A'], [0.1687, 0.1684, 0.1679, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 228
        case "USD-AUD":                                                                                            // 230
          dpsRowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                 // 231
          dpsRateData = [[0.7594, 0.7589, 0.7583, 0.7577, 0.7596, 0.7616], [0.76, 0.7599, 0.7597, 0.7595, 0.7627, 0.7658], [0.7606, 0.7608, 0.7609, 0.7611, 0.7655, 0.7696], [0.7611, 0.7617, 0.7621, 0.7626, 0.7681, 'N/A'], [0.7616, 0.7625, 0.7632, 0.764, 'N/A', 'N/A'], [0.7621, 0.7632, 0.7643, 0.7653, 'N/A', 'N/A'], [0.7625, 0.7639, 0.7652, 0.7665, 'N/A', 'N/A'], [0.7629, 0.7646, 0.7662, 0.7676, 'N/A', 'N/A'], [0.7633, 0.7653, 0.767, 0.7687, 'N/A', 'N/A']];
          break;                                                                                                   // 242
        case "AUD-USD":                                                                                            // 244
          dpsRowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];                 // 245
          dpsRateData = [[1.3168, 1.3177, 1.3187, 1.3198, 1.3165, 1.313], [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058], [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058], [1.3139, 1.3129, 1.3122, 1.3113, 1.3019, 'N/A'], [1.313, 1.3115, 1.3103, 1.3089, 'N/A', 'N/A'], [1.3122, 1.3103, 1.3084, 1.3067, 'N/A', 'N/A'], [1.3115, 1.3091, 1.3068, 1.3046, 'N/A', 'N/A'], [1.3108, 1.3079, 1.3051, 1.3028, 'N/A', 'N/A'], [1.3101, 1.3067, 1.3038, 1.3009, 'N/A', 'N/A']];
          break;                                                                                                   // 256
        case "HKD-GBP":                                                                                            // 258
          dpsRowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];                 // 259
          dpsRateData = [[9.7533, 9.7583, 9.7561, 9.7433, 9.668, 'N/A'], [9.7475, 9.7482, 9.7424, 9.7268, 'N/A', 'N/A'], [9.7419, 9.7387, 9.7296, 9.7113, 'N/A', 'N/A'], [9.7367, 9.7298, 9.7174, 9.6965, 'N/A', 'N/A'], [9.7317, 9.7212, 9.7058, 9.6824, 'N/A', 'N/A'], [9.7268, 9.713, 9.6948, 9.6689, 'N/A', 'N/A'], [9.7222, 9.7052, 9.6841, 9.6559, 'N/A', 'N/A'], [9.7177, 9.6976, 9.6739, 9.6434, 'N/A', 'N/A'], [9.7134, 9.6903, 9.664, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 270
        case "GBP-HKD":                                                                                            // 272
          dpsRowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];                 // 273
          dpsRateData = [[0.1025, 0.1025, 0.1025, 0.1026, 0.1034, 'N/A'], [0.1026, 0.1026, 0.1026, 0.1028, 'N/A', 'N/A'], [0.1026, 0.1027, 0.1028, 0.103, 'N/A', 'N/A'], [0.1027, 0.1028, 0.1029, 0.1031, 'N/A', 'N/A'], [0.1028, 0.1029, 0.103, 0.1033, 'N/A', 'N/A'], [0.1028, 0.103, 0.1031, 0.1034, 'N/A', 'N/A'], [0.1029, 0.103, 0.1033, 0.1036, 'N/A', 'N/A'], [0.1029, 0.1031, 0.1034, 0.1037, 'N/A', 'N/A'], [0.103, 0.1032, 0.1035, 'N/A', 'N/A', 'N/A']];
          break;                                                                                                   // 284
        case "HKD-CAD":                                                                                            // 286
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                 // 287
          dpsRateData = [[5.9099, 5.9081, 5.8937, 5.885, 5.8985, 5.9098], [5.9146, 5.9159, 5.9056, 5.9005, 5.925, 5.9451], [5.9189, 5.9231, 5.9162, 5.9143, 5.9484, 5.976], [5.9229, 5.9296, 5.9259, 5.9268, 5.9693, 'N/A'], [5.9266, 5.9357, 5.9348, 5.9382, 'N/A', 'N/A'], [5.9302, 5.9414, 5.943, 5.9487, 'N/A', 'N/A'], [5.9335, 5.9467, 5.9507, 5.9584, 'N/A', 'N/A'], [5.9367, 5.9518, 5.958, 5.9676, 'N/A', 'N/A'], [5.9397, 5.9566, 5.9648, 5.9762, 'N/A', 'N/A']];
          break;                                                                                                   // 298
        case "CAD-HKD":                                                                                            // 300
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                 // 301
          dpsRateData = [[0.1692, 0.1693, 0.1697, 0.1699, 0.1695, 0.1692], [0.1691, 0.169, 0.1693, 0.1695, 0.1688, 0.1682], [0.169, 0.1688, 0.169, 0.1691, 0.1681, 0.1673], [0.1688, 0.1686, 0.1688, 0.1687, 0.1675, 'N/A'], [0.1687, 0.1685, 0.1685, 0.1684, 'N/A', 'N/A'], [0.1686, 0.1683, 0.1683, 0.1681, 'N/A', 'N/A'], [0.1685, 0.1682, 0.168, 0.1678, 'N/A', 'N/A'], [0.1684, 0.168, 0.1678, 0.1676, 'N/A', 'N/A'], [0.1684, 0.1679, 0.1677, 0.1673, 'N/A', 'N/A']];
          break;                                                                                                   // 312
        case "HKD-EUR":                                                                                            // 314
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                 // 315
          dpsRateData = [[8.4099, 8.4216, 8.4286, 8.4289, 8.435, 8.4295], [8.4038, 8.4111, 8.414, 8.411, 8.4037, 8.3881], [8.3982, 8.4015, 8.4009, 8.3949, 8.3755, 8.3505], [8.3931, 8.3927, 8.3889, 8.3802, 8.3495, 8.3157], [8.3882, 8.3846, 8.3779, 8.3667, 8.3254, 'N/A'], [8.3837, 8.3771, 8.3676, 8.3541, 'N/A', 'N/A'], [8.3795, 8.3699, 8.358, 8.3422, 'N/A', 'N/A'], [8.3755, 8.3632, 8.3488, 8.331, 'N/A', 'N/A'], [8.3716, 8.3568, 8.3401, 8.3202, 'N/A', 'N/A']];
          break;                                                                                                   // 326
        case "EUR-HKD":                                                                                            // 328
          dpsRowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];                 // 329
          dpsRateData = [[0.1189, 0.1187, 0.1186, 0.1186, 0.1186, 0.1186], [0.119, 0.1189, 0.1188, 0.1189, 0.119, 0.1192], [0.1191, 0.119, 0.119, 0.1191, 0.1194, 0.1198], [0.1191, 0.1192, 0.1192, 0.1193, 0.1198, 0.1203], [0.1192, 0.1193, 0.1194, 0.1195, 0.1201, 'N/A'], [0.1193, 0.1194, 0.1195, 0.1197, 'N/A', 'N/A'], [0.1193, 0.1195, 0.1196, 0.1199, 'N/A', 'N/A'], [0.1194, 0.1196, 0.1198, 0.12, 'N/A', 'N/A'], [0.1195, 0.1197, 0.1199, 0.1202, 'N/A', 'N/A']];
          break;                                                                                                   // 340
        case "HKD-CNH":                                                                                            // 342
          dpsRowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];                 // 343
          dpsRateData = [[1.1326, 1.1301, 1.128, 1.1254, 1.1188, 1.1147], [1.1336, 1.1319, 1.1304, 1.1287, 1.1248, 1.123], [1.1344, 1.1333, 1.1324, 1.1313, 1.1297, 1.1296], [1.1352, 1.1345, 1.1341, 1.1335, 1.1338, 1.1351], [1.1358, 1.1356, 1.1356, 1.1355, 1.1374, 1.1399], [1.1365, 1.1366, 1.137, 1.1373, 1.1406, 1.1441], [1.137, 1.1376, 1.1383, 1.1389, 1.1435, 'N/A'], [1.1375, 1.1384, 1.1395, 1.1404, 'N/A', 'N/A'], [1.138, 1.1393, 1.1406, 1.1418, 'N/A', 'N/A']];
          break;                                                                                                   // 354
        case "CNH-HKD":                                                                                            // 356
          dpsRowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];                 // 357
          dpsRateData = [[0.8829, 0.8849, 0.8865, 0.8886, 0.8938, 0.8971], [0.8821, 0.8835, 0.8846, 0.886, 0.889, 0.8905], [0.8815, 0.8824, 0.8831, 0.8839, 0.8852, 0.8853], [0.8809, 0.8814, 0.8818, 0.8822, 0.882, 0.881], [0.8804, 0.8806, 0.8806, 0.8807, 0.8792, 0.8773], [0.8799, 0.8798, 0.8795, 0.8793, 0.8767, 0.874], [0.8795, 0.879, 0.8785, 0.878, 0.8745, 'N/A'], [0.8791, 0.8784, 0.8776, 0.8769, 'N/A', 'N/A'], [0.8787, 0.8777, 0.8767, 0.8758, 'N/A', 'N/A']];
          break;                                                                                                   // 368
        default:                                                                                                   // 370
          dpsRateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'], ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];
      }                                                                                                            // 382
      hot.updateSettings({                                                                                         // 383
        rowHeaders: dpsRowHeader                                                                                   //
      });                                                                                                          // 385
      hot.loadData(dpsRateData);                                                                                   // 386
      var series = dpsChart.series;                                                                                // 387
      for (var i = 0; i < series.length; i++) {                                                                    // 388
        var column = series[i];                                                                                    // 389
        if (column.name === seq || column.name === inv) {                                                          // 390
          column.show();                                                                                           //
        } else {                                                                                                   // 392
          column.hide();                                                                                           //
        }                                                                                                          //
      }                                                                                                            //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 398
  $scope.convert2dp = function () {                                                                                // 399
    document.getElementById('convertAmount').value = document.getElementById('tempAmount').innerHTML;              //
  };                                                                                                               //
                                                                                                                   // 402
  $scope.$on('tableWithTenor', function (event, tenor) {                                                           // 403
    dcdcTenor = tenor;                                                                                             // 404
    if (linkStock) {                                                                                               // 405
      isDcdcData = DcdcData.find({ "underlying": linkStock, "tenor": parseInt(dcdcTenor) }, { sort: { "tenor": 1, "strike": 1, "ko_barrier": 1, "barrier_type": 1, "ki_barrier": 1, "coupon_pa": 1 } }).fetch();
      if (isDcdcData.length > 0) {                                                                                 // 407
        temp = [[]];                                                                                               // 408
        var j = 0;                                                                                                 // 409
        for (var i = 0; i < isDcdcData.length; i++) {                                                              // 410
          temp[j].push(isDcdcData[i].underlying);                                                                  // 411
          temp[j].push(isDcdcData[i].tenor);                                                                       // 412
          temp[j].push(isDcdcData[i].strike);                                                                      // 413
          temp[j].push(isDcdcData[i].ko_type);                                                                     // 414
          temp[j].push(isDcdcData[i].ko_barrier);                                                                  // 415
          temp[j].push(isDcdcData[i].barrier_type);                                                                // 416
          if (isDcdcData[i].barrier_type == 'NONE') {                                                              // 417
            temp[j].push('N/A');                                                                                   //
          } else {                                                                                                 // 419
            temp[j].push(isDcdcData[i].ki_barrier);                                                                //
          }                                                                                                        // 421
          temp[j].push(isDcdcData[i].coupon_pa);                                                                   // 422
          if (i < isDcdcData.length - 1) {                                                                         // 423
            temp.push(new Array());                                                                                // 424
            j++;                                                                                                   //
          }                                                                                                        //
        }                                                                                                          // 427
        dcdcRateData = temp;                                                                                       // 428
        hot.loadData(dcdcRateData);                                                                                //
      }                                                                                                            //
    }                                                                                                              //
  });                                                                                                              //
                                                                                                                   // 433
  $scope.$on('tableWithStock', function (event, stockName) {                                                       // 434
    linkStock = stockName;                                                                                         // 435
    if (dcdcTenor) {                                                                                               // 436
      isDcdcData = DcdcData.find({ "underlying": linkStock, "tenor": parseInt(dcdcTenor) }, { sort: { "tenor": 1, "strike": 1, "ko_barrier": 1, "barrier_type": 1, "ki_barrier": 1, "coupon_pa": 1 } }).fetch();
      if (isDcdcData.length > 0) {                                                                                 // 438
        temp = [[]];                                                                                               // 439
        var j = 0;                                                                                                 // 440
        for (var i = 0; i < isDcdcData.length; i++) {                                                              // 441
          temp[j].push(isDcdcData[i].underlying);                                                                  // 442
          temp[j].push(isDcdcData[i].tenor);                                                                       // 443
          temp[j].push(isDcdcData[i].strike);                                                                      // 444
          temp[j].push(isDcdcData[i].ko_type);                                                                     // 445
          temp[j].push(isDcdcData[i].ko_barrier);                                                                  // 446
          temp[j].push(isDcdcData[i].barrier_type);                                                                // 447
          if (isDcdcData[i].barrier_type == 'NONE') {                                                              // 448
            temp[j].push('N/A');                                                                                   //
          } else {                                                                                                 // 450
            temp[j].push(isDcdcData[i].ki_barrier);                                                                //
          }                                                                                                        // 452
          temp[j].push(isDcdcData[i].coupon_pa);                                                                   // 453
          if (i < isDcdcData.length - 1) {                                                                         // 454
            temp.push(new Array());                                                                                // 455
            j++;                                                                                                   //
          }                                                                                                        //
        }                                                                                                          // 458
        dcdcRateData = temp;                                                                                       // 459
        hot.loadData(dcdcRateData);                                                                                //
      }                                                                                                            //
    }                                                                                                              //
  });                                                                                                              //
                                                                                                                   // 464
  $scope.onTenorChange = function (tenor) {                                                                        // 465
    $scope.$emit('tableWithTenor', tenor);                                                                         //
  };                                                                                                               //
                                                                                                                   // 468
  $scope.onStockChange = function (stockName) {                                                                    // 469
    $scope.$emit('tableWithStock', stockName);                                                                     // 470
    if (stockName === '700 HK') {                                                                                  // 471
      $scope.cal.dcdc.spotPrice = 242.800;                                                                         //
    } else {                                                                                                       // 473
      $scope.cal.dcdc.spotPrice = 192.000;                                                                         //
    }                                                                                                              // 475
    var series = dcdcChart.series;                                                                                 // 476
    var navigatorIndex = series.length - 1;                                                                        // 477
    for (var i = 0; i < navigatorIndex; i++) {                                                                     // 478
      var column = series[i];                                                                                      // 479
      if (column.name === stockName) {                                                                             //
        //series[navigatorIndex].data = column.data;                                                               // 481
        column.showInNavigator = true;                                                                             //
        //dcdcChart.navigator.series = column;                                                                     // 483
        column.show();                                                                                             //
      } else {                                                                                                     // 485
        column.showInNavigator = false;                                                                            // 486
        column.hide();                                                                                             //
      }                                                                                                            //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 491
  $scope.calculateConversionRate = function () {                                                                   // 492
    dps = $scope.cal.dps;                                                                                          // 493
    var dpsDoc = DpsData.findOne({ depo_cur: dps.depositCurrency, link_cur: dps.linkedCurrency,                    // 494
      tenor: JSON.parse(dps.tenor).name, interest_rate: dps.yieldPa });                                            // 495
    if (dpsDoc) {                                                                                                  // 496
      dps.conversionRate = dpsDoc.conversion_rate;                                                                 // 497
      document.getElementById('search_field').value = dpsDoc.conversion_rate;                                      // 498
      colCntTmp = 0;                                                                                               // 499
      rowCntTmp = 0;                                                                                               // 500
      document.getElementById('search_button').click();                                                            //
    } else {                                                                                                       // 502
      dps.conversionRate = undefined;                                                                              //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 506
  $scope.calculateCouponPa = function () {                                                                         // 507
    dcdc = $scope.cal.dcdc;                                                                                        // 508
    if (dcdc.barrierType === 'NONE') {                                                                             // 509
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 511
        ki_barrier: null });                                                                                       //
    } else {                                                                                                       // 513
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 515
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                   //
    }                                                                                                              // 517
    if (dcdcDoc) {                                                                                                 // 518
      dcdc.couponPa = dcdcDoc.coupon_pa;                                                                           // 519
      document.getElementById('search_field').value = dcdcDoc.coupon_pa;                                           // 520
      colCntTmp = 0;                                                                                               // 521
      rowCntTmp = 0;                                                                                               // 522
      document.getElementById('search_button').click();                                                            //
    } else {                                                                                                       // 524
      dcdc.couponPa = undefined;                                                                                   //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 528
  $scope.calculateStrikePrice = function () {                                                                      // 529
    var dcdc = $scope.cal.dcdc;                                                                                    // 530
    if (dcdc.barrierType === 'NONE') {                                                                             // 531
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 533
        ki_barrier: null });                                                                                       //
    } else {                                                                                                       // 535
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,         // 537
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                   //
    }                                                                                                              // 539
    if (dcdcDoc) {                                                                                                 // 540
      dcdc.strikePrice = dcdcDoc.strike;                                                                           // 541
      document.getElementById('search_field').value = dcdcDoc.strike;                                              // 542
      colCntTmp = 0;                                                                                               // 543
      rowCntTmp = 0;                                                                                               // 544
      document.getElementById('search_button').click();                                                            //
    } else {                                                                                                       // 546
      dcdc.strikePrice = undefined;                                                                                //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 550
  $scope.resizeDiag = function (ev) {                                                                              // 551
    $mdDialog.show({                                                                                               // 552
      controller: DialogController,                                                                                // 553
      templateUrl: 'client/toggle.html',                                                                           // 554
      parent: _angular2['default'].element(document.body),                                                         // 555
      targetEvent: ev,                                                                                             // 556
      clickOutsideToClose: true                                                                                    //
    });                                                                                                            //
  };                                                                                                               //
                                                                                                                   // 560
  $scope.showAdvanced = function (ev) {                                                                            // 561
    $mdDialog.show({                                                                                               // 562
      controller: DialogController,                                                                                // 563
      templateUrl: 'client/dialog.html',                                                                           // 564
      parent: _angular2['default'].element(document.body),                                                         // 565
      targetEvent: ev,                                                                                             // 566
      clickOutsideToClose: true                                                                                    //
    });                                                                                                            //
  };                                                                                                               //
                                                                                                                   // 570
  function DialogController($scope, $mdDialog) {                                                                   // 571
    $scope.hide = function () {                                                                                    // 572
      $mdDialog.hide();                                                                                            //
    };                                                                                                             //
                                                                                                                   // 575
    $scope.cancel = function () {                                                                                  // 576
      $mdDialog.cancel();                                                                                          //
    };                                                                                                             //
                                                                                                                   // 579
    $scope.answer = function (answer) {                                                                            // 580
      $mdDialog.hide(answer);                                                                                      //
    };                                                                                                             //
  }                                                                                                                //
                                                                                                                   // 584
  $scope.cal = {                                                                                                   // 585
    dps: {},                                                                                                       // 586
    dcdc: {                                                                                                        // 587
      scenario: 1                                                                                                  //
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   // 591
  $scope.currencies = 'AUD, CAD, CNH, EUR, GBP, HKD, USD'.split(', ').map(function (currency) {                    // 592
    return { abbrev: currency };                                                                                   //
  });                                                                                                              //
                                                                                                                   // 595
  $scope.dpsTenors = [{                                                                                            // 597
    name: '1W',                                                                                                    // 598
    value: 0                                                                                                       //
  }, {                                                                                                             // 600
    name: '2W',                                                                                                    // 601
    value: 1                                                                                                       //
  }, {                                                                                                             // 603
    name: '3W',                                                                                                    // 604
    value: 2                                                                                                       //
  }, {                                                                                                             // 606
    name: '1M',                                                                                                    // 607
    value: 3                                                                                                       //
  }, {                                                                                                             // 609
    name: '2M',                                                                                                    // 610
    value: 4                                                                                                       //
  }, {                                                                                                             // 612
    name: '3M',                                                                                                    // 613
    value: 5                                                                                                       //
  }];                                                                                                              //
                                                                                                                   // 617
  $scope.dcdcTenors = [{                                                                                           // 619
    name: '3M',                                                                                                    // 620
    value: 3                                                                                                       //
  }, {                                                                                                             // 622
    name: '6M',                                                                                                    // 623
    value: 6                                                                                                       //
  }, {                                                                                                             // 625
    name: '9M',                                                                                                    // 626
    value: 9                                                                                                       //
  }, {                                                                                                             // 628
    name: '12M',                                                                                                   // 629
    value: 12                                                                                                      //
  }];                                                                                                              //
                                                                                                                   // 633
  $scope.stocks = ['700 HK', '388 HK'];                                                                            //
                                                                                                                   // 635
  $scope.koBarriers = ['95', '100', '105', '110'];                                                                 //
                                                                                                                   // 637
  $scope.koTypes = ['Daily', 'Period End'];                                                                        //
                                                                                                                   // 639
  $scope.kiBarriers = ['75', '78'];                                                                                //
                                                                                                                   // 641
  $scope.barrierTypes = ['NONE', 'AKI', 'EKI'];                                                                    //
                                                                                                                   //
  //dcdcview Button JS                                                                                             // 644
  $scope.demo = {                                                                                                  // 645
    showTooltip: false,                                                                                            // 646
    tipDirection: 'bottom'                                                                                         //
  };                                                                                                               //
                                                                                                                   // 649
  $scope.demo.delayTooltip = undefined;                                                                            // 650
  $scope.$watch('demo.delayTooltip', function (val) {                                                              // 651
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;                                                             //
  });                                                                                                              //
                                                                                                                   // 654
  $scope.linkedCurrencyFilter = function (inputCur) {                                                              // 655
    return inputCur.abbrev !== $scope.cal.dps.depositCurrency && !(inputCur.abbrev === 'USD' && $scope.cal.dps.depositCurrency === 'HKD') && !(inputCur.abbrev === 'HKD' && $scope.cal.dps.depositCurrency === 'USD');
  };                                                                                                               //
}]);                                                                                                               //
                                                                                                                   // 662
spcal.controller('AutoCompleteCtrl', ["$timeout", "$q", "$log", function ($timeout, $q, $log) {                    // 663
  var self = this;                                                                                                 //
                                                                                                                   // 665
  self.simulateQuery = true;                                                                                       // 666
  self.isDisabled = false;                                                                                         //
                                                                                                                   //
  // list of `state` value/display objects                                                                         // 669
  self.states = loadAll();                                                                                         // 670
  self.querySearch = querySearch;                                                                                  // 671
  self.selectedItemChange = selectedItemChange;                                                                    // 672
  self.searchTextChange = searchTextChange;                                                                        //
                                                                                                                   // 674
  self.newState = newState;                                                                                        //
                                                                                                                   // 676
  function newState(state) {                                                                                       // 677
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
   */                                                                                                              // 688
  function querySearch(query) {                                                                                    // 689
    var results = query ? self.states.filter(createFilterFor(query)) : self.states,                                //
        deferred;                                                                                                  // 691
    if (self.simulateQuery) {                                                                                      // 692
      deferred = $q.defer();                                                                                       // 693
      $timeout(function () {                                                                                       // 693
        deferred.resolve(results);                                                                                 //
      }, Math.random() * 1000, false);                                                                             // 694
      return deferred.promise;                                                                                     //
    } else {                                                                                                       // 696
      return results;                                                                                              //
    }                                                                                                              //
  }                                                                                                                //
                                                                                                                   // 700
  function searchTextChange(text) {                                                                                // 701
    $log.info('Text changed to ' + text);                                                                          //
  }                                                                                                                //
                                                                                                                   // 704
  function selectedItemChange(item) {                                                                              // 705
    $log.info('Item changed to ' + JSON.stringify(item));                                                          //
  }                                                                                                                //
                                                                                                                   //
  /**                                                                                                              //
   * Build `states` list of key/value pairs                                                                        //
   */                                                                                                              // 711
  function loadAll() {                                                                                             // 712
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';                                                                                 //
                                                                                                                   // 720
    return allStates.split(/, +/g).map(function (state) {                                                          // 721
      return {                                                                                                     // 722
        value: state.toLowerCase(),                                                                                // 723
        display: state                                                                                             //
      };                                                                                                           //
    });                                                                                                            //
  }                                                                                                                //
                                                                                                                   //
  /**                                                                                                              //
   * Create filter function for a query string                                                                     //
   */                                                                                                              // 731
  function createFilterFor(query) {                                                                                // 732
    var lowercaseQuery = _angular2['default'].lowercase(query);                                                    //
                                                                                                                   // 734
    return function filterFn(state) {                                                                              // 735
      return state.value.indexOf(lowercaseQuery) === 0;                                                            //
    };                                                                                                             //
  }                                                                                                                //
  // }                                                                                                             //
}]);                                                                                                               //
                                                                                                                   // 743
var themeIcons = function themeIcons($mdIconProvider) {                                                            //
                                                                                                                   // 745
  $mdIconProvider.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg").iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg").iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg").iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg").iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg").iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg").iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
};                                                                                                                 //
                                                                                                                   // 769
_angular2['default'].module('spcal').config(themeIcons);                                                           //
                                                                                                                   // 773
spcal.controller('MatrixCtrl', ["$mdDialog", "$timeout", "$scope", function ($mdDialog, $timeout, $scope) {        // 774
  $scope.checked = true;                                                                                           // 775
  var searchFiled = document.getElementById('search_field');                                                       // 776
  container = document.getElementById('matrixTable');                                                              //
                                                                                                                   // 778
  hot = new _handsontableProDistHandsontableFull2['default'](container, {                                          // 779
    data: dpsRateData,                                                                                             // 780
    headerToolTips: true,                                                                                          // 781
    rowHeaders: dpsRowHeader,                                                                                      // 782
    colHeaders: dpsColHeader,                                                                                      //
                                                                                                                   // 784
    colWidths: 100,                                                                                                // 785
    rowHeights: 40,                                                                                                // 786
    search: {                                                                                                      // 787
      queryMethod: dpsExactMatch                                                                                   //
    },                                                                                                             // 789
    currentRowClassName: 'selectedRow',                                                                            // 790
    currentColClassName: 'selectedCol',                                                                            // 791
    editor: false                                                                                                  //
  });                                                                                                              //
                                                                                                                   // 794
  function dpsExactMatch(queryStr, value) {                                                                        // 795
    var matchFlag = false;                                                                                         //
                                                                                                                   // 797
    if (queryStr.toString() === value.toString()) {                                                                // 798
      rowCnt = rowCntTmp;                                                                                          // 799
      colCnt = colCntTmp;                                                                                          // 800
      if (dps) {                                                                                                   // 801
        if (parseInt(colCnt) == parseInt(JSON.parse(dps.tenor).value)) {                                           // 802
          matchFlag = true;                                                                                        //
        }                                                                                                          //
      }                                                                                                            //
    }                                                                                                              //
                                                                                                                   // 807
    colCntTmp++;                                                                                                   // 808
    if (colCntTmp > 5) {                                                                                           // 809
      colCntTmp = 0;                                                                                               // 810
      rowCntTmp++;                                                                                                 //
    }                                                                                                              //
                                                                                                                   // 813
    return matchFlag;                                                                                              //
  }                                                                                                                //
                                                                                                                   // 816
  _handsontableProDistHandsontableFull2['default'].Dom.addEvent(search_button, 'click', function (event) {         // 817
    queryResult = hot.search.query(document.getElementById('search_field').value);                                 // 818
    hot.render();                                                                                                  // 819
    console.log(queryResult);                                                                                      // 820
    hot.selectCell(queryResult[0].row, queryResult[0].col);                                                        //
  });                                                                                                              //
                                                                                                                   // 823
  $timeout(function () {                                                                                           // 824
    hot.selectCell(0, 0);                                                                                          // 825
    document.getElementById('toggleBtn').click();                                                                  // 826
    $mdDialog.cancel();                                                                                            //
  }, 1);                                                                                                           //
}]);                                                                                                               //
                                                                                                                   // 830
spcal.controller('DiagramCtrl', ["$scope", function ($scope) {                                                     // 831
  $.get('fxRate.csv', function (data) {                                                                            //
    // Create the chart                                                                                            // 833
    dpsChart = Highcharts.chart('dpsChartContainer', {                                                             // 834
      data: {                                                                                                      // 835
        csv: data                                                                                                  //
      },                                                                                                           // 837
      plotOptions: {                                                                                               // 838
        series: {                                                                                                  // 839
          visible: false                                                                                           //
        }                                                                                                          //
      },                                                                                                           // 842
      title: {                                                                                                     // 843
        text: 'Deposit Plus'                                                                                       //
      },                                                                                                           // 845
      yAxis: {                                                                                                     // 846
        crosshair: true,                                                                                           // 847
        title: {                                                                                                   // 848
          text: 'FX Rate'                                                                                          //
        }                                                                                                          //
      }                                                                                                            //
    });                                                                                                            //
  });                                                                                                              // 853
  $.get('stockPrice.csv', function (data) {                                                                        //
    // Create the chart                                                                                            // 855
    dcdcChart = Highstock.stockChart('dcdcChartContainer', {                                                       // 856
      data: {                                                                                                      // 857
        csv: data                                                                                                  //
      },                                                                                                           // 859
      plotOptions: {                                                                                               // 860
        series: {                                                                                                  // 861
          visible: false                                                                                           //
        }                                                                                                          //
      },                                                                                                           // 864
      title: {                                                                                                     // 865
        text: 'DCDC'                                                                                               //
      },                                                                                                           // 867
      yAxis: {                                                                                                     // 868
        title: {                                                                                                   // 869
          text: 'Stock Price'                                                                                      //
        }                                                                                                          //
      }                                                                                                            //
    });                                                                                                            //
  });                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 877
spcal.controller('BarChartCtrl', ["$scope", function ($scope) {                                                    //
  // Create the chart                                                                                              // 879
  $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
    barChart = Highcharts.chart('barContainer', {                                                                  // 881
      chart: {                                                                                                     // 882
        type: 'column'                                                                                             //
      },                                                                                                           // 884
      title: {                                                                                                     // 885
        text: 'Performance of Structured Products Offered by HSBC'                                                 //
      },                                                                                                           // 887
      xAxis: {                                                                                                     // 888
        categories: ['Deposit Plus', 'Currency Linked III', 'Interest Rate Range Accrual', 'Capped and Floored Floater Deposit']
      },                                                                                                           // 890
      yAxis: {                                                                                                     // 891
        min: 0,                                                                                                    // 892
        title: {                                                                                                   // 893
          text: 'Criteria Distribution'                                                                            //
        }                                                                                                          //
      },                                                                                                           // 896
      tooltip: {                                                                                                   // 897
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true                                                                                               //
      },                                                                                                           // 900
      plotOptions: {                                                                                               // 901
        column: {                                                                                                  // 902
          stacking: 'percent'                                                                                      //
        }                                                                                                          //
      },                                                                                                           // 905
      series: [{                                                                                                   // 906
        name: 'Return',                                                                                            // 907
        data: [5, 3, 4, 7]                                                                                         //
      }, {                                                                                                         // 909
        name: 'Stability',                                                                                         // 910
        data: [2, 2, 3, 2]                                                                                         //
      }, {                                                                                                         // 912
        name: 'Volatility',                                                                                        // 913
        data: [3, 4, 4, 2]                                                                                         //
      }, {                                                                                                         // 915
        name: 'Momentum',                                                                                          // 916
        data: [6, 2, 4, 3]                                                                                         //
      }]                                                                                                           //
    });                                                                                                            //
  });                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 923
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                // 924
  $mdThemingProvider.theme('altTheme').primaryPalette('purple');                                                   //
}]).controller('SubheaderAppCtrl', ["$scope", function ($scope) {                                                  // 928
  var imagePath = 'images/hsbc-icon.gif';                                                                          // 929
  $scope.infolinks = [{                                                                                            // 931
    face: imagePath,                                                                                               // 932
    what: 'Glossary Of Banking Terms',                                                                             // 933
    who: 'HSBC Personal Banking',                                                                                  // 934
    notes: " A to Z guide on glossaries",                                                                          // 935
    link: "https://www.hsbc.com.hk/personal/help-and-support/glossary-of-banking-terms.html"                       //
  }, {                                                                                                             // 938
    face: imagePath,                                                                                               // 939
    what: 'Deposit Plus',                                                                                          // 940
    who: 'HSBC Personal Banking',                                                                                  // 941
    notes: " Set up your Deposit Plus investment now",                                                             // 942
    link: "https://www.hsbc.com.hk/personal/investments/structured-products/deposit-plus.html"                     //
  }];                                                                                                              // 945
  $scope.datalinks = [{                                                                                            // 947
    face: imagePath,                                                                                               // 948
    what: 'Deposit Interest Market Data',                                                                          // 949
    who: 'HSBC Personal Banking',                                                                                  // 950
    notes: " Check the current interest rate of normal deposit",                                                   // 951
    link: "https://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info/deposit-rates/interest-rates"              //
  }, {                                                                                                             // 954
    face: imagePath,                                                                                               // 955
    what: 'Equity Market Data',                                                                                    // 956
    who: 'HSBC Personal Banking',                                                                                  // 957
    notes: " Check the current market price of chosen equity",                                                     // 958
    link: "http://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info"                                            //
  }];                                                                                                              // 961
  $scope.videos = [{                                                                                               // 963
    face: imagePath,                                                                                               // 964
    what: 'Deposit Plus Overview',                                                                                 // 965
    who: 'A Currency Linked Investment',                                                                           // 966
    notes: " Get to know the products before investing",                                                           // 967
    link: '_-w3mMxkVdU'                                                                                            //
  }, {                                                                                                             // 970
    face: imagePath,                                                                                               // 971
    what: 'Deposit Plus Example',                                                                                  // 972
    who: 'A Currency Linked Investment',                                                                           // 973
    notes: " Get to know the products before investing",                                                           // 974
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 977
    face: imagePath,                                                                                               // 978
    what: 'Deposit Plus Interest Calculation',                                                                     // 979
    who: 'A Currency Linked Investment',                                                                           // 980
    notes: " Get to know the products before investing",                                                           // 981
    link: 'fBVv_BJ81bc'                                                                                            //
  }, {                                                                                                             // 984
    face: imagePath,                                                                                               // 985
    what: 'Deposit Plus Risk',                                                                                     // 986
    who: 'A Currency Linked Investment',                                                                           // 987
    notes: " Get to know the products before investing",                                                           // 988
    link: 'K-QcjbuNnwg'                                                                                            //
  }, {                                                                                                             // 991
    face: imagePath,                                                                                               // 992
    what: 'DCDC',                                                                                                  // 993
    who: 'An Equity Linked Investment',                                                                            // 994
    notes: " Get to know the products before investing",                                                           // 995
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 998
    face: imagePath,                                                                                               // 999
    what: 'DCDC Example 1 - Auto Call',                                                                            // 1000
    who: 'An Equity Linked Investment',                                                                            // 1001
    notes: " Get to know the products before investing",                                                           // 1002
    link: 'z3ZjrWkCrdY'                                                                                            //
  }, {                                                                                                             // 1005
    face: imagePath,                                                                                               // 1006
    what: 'DCDC Example 2 - Airbag',                                                                               // 1007
    who: 'An Equity Linked Investment',                                                                            // 1008
    notes: " Get to know the products before investing",                                                           // 1009
    link: 'z3ZjrWkCrdY'                                                                                            //
  }];                                                                                                              //
}]);                                                                                                               //
                                                                                                                   // 1014
spcal.controller('AppCtrl', ['$interval', function ($interval) {                                                   // 1016
  var self = this;                                                                                                 //
                                                                                                                   // 1018
  self.activated = true;                                                                                           // 1019
  self.determinateValue = 30;                                                                                      //
                                                                                                                   //
  // Iterate every 100ms, non-stop and increment                                                                   //
  // the Determinate loader.                                                                                       // 1023
  $interval(function () {                                                                                          //
                                                                                                                   // 1025
    self.determinateValue += 1;                                                                                    // 1026
    if (self.determinateValue > 100) {                                                                             // 1027
      self.determinateValue = 30;                                                                                  //
    }                                                                                                              //
  }, 100);                                                                                                         //
}]);                                                                                                               //
                                                                                                                   // 1034
spcal.controller('videoCtrl', ["$scope", "$mdDialog", function ($scope, $mdDialog) {                               // 1035
  DialogController.$inject = ["$scope", "$mdDialog"];                                                              // 1036
  $scope.showAdvanced = function (ev, id) {                                                                        // 1037
    $mdDialog.show({                                                                                               // 1038
      controller: DialogController,                                                                                // 1039
      templateUrl: 'client/video.html',                                                                            // 1040
      parent: _angular2['default'].element(document.body),                                                         // 1041
      targetEvent: ev,                                                                                             // 1042
      clickOutsideToClose: true,                                                                                   //
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.                                        //
    });                                                                                                            // 1045
    //player.videoId = id;                                                                                         //
    videoToPlay = id;                                                                                              //
  };                                                                                                               // 1048
                                                                                                                   // 1049
  function DialogController($scope, $mdDialog) {                                                                   // 1050
    $scope.hide = function () {                                                                                    //
      $mdDialog.hide();                                                                                            //
    };                                                                                                             // 1053
                                                                                                                   // 1054
    $scope.cancel = function () {                                                                                  //
      $mdDialog.cancel();                                                                                          //
    };                                                                                                             // 1057
                                                                                                                   // 1058
    $scope.answer = function (answer) {                                                                            //
      $mdDialog.hide(answer);                                                                                      //
    };                                                                                                             //
  }                                                                                                                // 1062
                                                                                                                   //
  onYouTubeIframeAPIReady = function () {                                                                          //
    // New Video Player, the first argument is the id of the div.                                                  // 1065
    // Make sure it's a global variable.                                                                           // 1066
    if (videoToPlay) {                                                                                             // 1067
      player = new YT.Player("player", {                                                                           // 1068
        height: "400",                                                                                             //
        width: "600",                                                                                              // 1070
        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")     //
        videoId: videoToPlay,                                                                                      // 1072
        // Events like ready, state change,                                                                        // 1073
        events: {                                                                                                  //
          onReady: function onReady(event) {                                                                       // 1075
            // Play video when player ready.                                                                       //
            event.target.playVideo();                                                                              //
          }                                                                                                        //
        }                                                                                                          // 1079
      });                                                                                                          //
      console.log(player);                                                                                         //
    }                                                                                                              // 1082
  };                                                                                                               //
  YT.load();                                                                                                       //
}]);                                                                                                               // 1086
                                                                                                                   // 1087
function onReady() {                                                                                               //
  _angular2['default'].bootstrap(document, ['spcal']);                                                             //
}                                                                                                                  // 1090
                                                                                                                   // 1091
if (Meteor.isCordova) {                                                                                            //
  _angular2['default'].element(document).on('deviceready', onReady);                                               // 1093
} else {                                                                                                           //
  _angular2['default'].element(document).ready(onReady);                                                           //
}                                                                                                                  //
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