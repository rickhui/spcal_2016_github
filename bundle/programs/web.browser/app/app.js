var require = meteorInstall({"client":{"calculator.html":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/calculator.html                                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
      if (Meteor.isServer) return;                                                                                  // 2
                                                                                                                    // 3
      var templateUrl = "/client/calculator.html";                                                                  // 4
      var template = "<div layout=\"column\" class=\"container\" ng-cloak class=\"md-inline-form\"> <!-- <div layout=\"row\" layout-padding>\n    <div flex=\"66\"> --> <!-- <md-content md-colors=\"{background: 'blue'}\" layout-gt-sm=\"row\" layout-padding>\n    <div>\n      <h4>Deposit Plus</h4>md-dynamic-height\n    </div>style=\"min-height: 450px;\"\n    </md-content> --> <div class=\"tabsdemoDynamicHeight\" ng-cloak> <md-card> <md-tabs md-stretch-tabs=\"always\" style=\"min-height:865px\" md-border-bottom> <md-tab label=\"Deposit Plus\"> <md-content class=\"md-padding\"> <md-content layout-padding ng-controller=\"ValidationCtrl\"> <div> <form name=\"DpsInvForm\"> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Deposit Currency</label> <md-select ng-model=\"cal.dps.depositCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies\" value=\"{{currency.abbrev}}\">{{currency.abbrev}}</md-option> </md-select> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Linked Currency</label> <md-select ng-model=\"cal.dps.linkedCurrency\" ng-change=\"onCurPairChange(cal.dps.depositCurrency, cal.dps.linkedCurrency)\" required> <md-option ng-repeat=\"currency in currencies | filter:linkedCurrencyFilter\" value=\"{{currency.abbrev}}\"> {{currency.abbrev}} </md-option> </md-select> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Currency Pair</label> <input name=\"currencyPair\" ng-if=\"cal.dps.depositCurrency&&cal.dps.linkedCurrency\" value=\"{{cal.dps.depositCurrency}}-{{cal.dps.linkedCurrency}}\" disabled=\"disabled\"> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select ng-model=\"cal.dps.tenor\" required> <md-option ng-repeat=\"tenor in dpsTenors\" value=\"{{tenor}}\"> {{tenor}} </md-option> </md-select> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex-gt-sm> <label>Amount Deposit</label> <div style=\"font-size:11px\">{{cal.dps.depositCurrency}}</div> <input md-maxlength=\"10\" name=\"amountDeposit\" ng-model=\"cal.dps.amountDeposit\"> <!-- <div ng-show=\"DpsInvForm.amountDeposit.$error.required\">\n                        <div style=\"color:#D32F2F;font-size:11px\">This is required.</div>\n                      </div> --> <div ng-show=\"DpsInvForm.amountDeposit.$error.maxlength\"> <div style=\"color:#D32F2F;font-size:11px\">This should be less than 10 digits.</div> </div> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Interest Amount</label> <input name=\"interestAmount\" ng-if=\"cal.dps.amountDeposit && cal.dps.yieldPa\" value=\"{{cal.dps.amountDeposit*cal.dps.yieldPa/100}}\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <!-- <h4 style=\"color:#737373\">Yield P.A. &emsp;&emsp;</h4> --> <md-slider-container flex> <label style=\"color:#afaeae\">Yield P.A. *</label> <md-slider md-discrete flex min=\"2\" max=\"9.5\" step=\"0.5\" ng-model=\"cal.dps.yieldPa\" aria-label=\"yieldPaSlider\" required></md-slider> <md-input-container> <input flex ng-if=\"cal.dps.yieldPa\" value=\"{{cal.dps.yieldPa}}%\" aria-label=\"yieldPaInput\" readonly=\"readonly\"> </md-input-container> </md-slider-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>Coversion Rate</label> <input name=\"conversionRate\" ng-if=\"cal.dps.conversionRate\" value=\"{{cal.dps.conversionRate}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <!-- <label>Coversion Rate &emsp;&emsp;</label>\n                    <div style=\"font-size: 18px\"><b>{{cal.dps.conversionRate}}</b></div> --> </div> <div layout=\"row\" layout-align=\"end center\"> <div> <md-button ng-disabled=\"DpsInvForm.$invalid\" ng-click=\"calculateConversionRate()\" class=\"md-raised md-warn\" aria-label=\"DPS Calculate Button\"> <md-tooltip> See the conversion rate under the chosen criteria </md-tooltip> Query </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Preview </md-button> </div> </div> <br> <div layout=\"row\"> <div ng-controller=\"DiagramCtrl\" id=\"dpsChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> <md-tab label=\"DCDC\"> <md-content class=\"md-padding\"> <md-content layout-padding ng-controller=\"ValidationCtrl\"> <div> <form name=\"DcdcInvForm\"> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Linked Stock</label> <md-select ng-model=\"cal.dcdc.linkedStock\" ng-change=\"onStockChange(cal.dcdc.linkedStock)\" required> <md-option ng-repeat=\"stock in stocks\" value=\"{{stock}}\">{{stock}}</md-option> </md-select> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Spot Price</label> <input name=\"spotPrice\" ng-if=\"cal.dcdc.linkedStock\" value=\"190.2(Fake)\" disabled=\"disabled\"> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <div style=\"color:#afaeae\">Query for *</div> <md-radio-group layout=\"row\" ng-model=\"cal.dcdc.scenario\"> <md-radio-button value=\"1\" style=\"margin-right:100px\">Coupon P.A.</md-radio-button> <md-radio-button value=\"2\">Strike Price</md-radio-button> </md-radio-group> </md-input-container> </div> <div layout=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-model=\"cal.dcdc.strikePrice\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Coupon P.A.</label> <input name=\"couponPa\" ng-model=\"cal.dcdc.couponPa\" type=\"number\" min=\"1\" required> </md-input-container> <md-input-container class=\"md-block\" flex> <label>Tenor</label> <md-select ng-model=\"cal.dcdc.tenor\" required> <md-option ng-repeat=\"tenor in dcdcTenors\" value=\"{{tenor.value}}\"> {{tenor.name}} </md-option> </md-select> </md-input-container> </div> <div layout=\"row\"> <md-input-container class=\"md-block\" flex> <label>KO Type</label> <md-select ng-model=\"cal.dcdc.koType\" required> <md-option ng-repeat=\"koType in koTypes\" value=\"{{koType}}\">{{koType}}</md-option> </md-select> </md-input-container> <md-input-container class=\"md-block\" flex> <label>KO Barrier</label> <input name=\"koBarrier\" ng-model=\"cal.dcdc.koBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" required> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container class=\"md-block\" flex> <label>Barrier Type</label> <md-select ng-model=\"cal.dcdc.barrierType\" required> <md-option ng-repeat=\"barrierType in barrierTypes\" value=\"{{barrierType}}\">{{barrierType}}</md-option> </md-select> </md-input-container> <md-input-container class=\"md-block\" flex> <label>KI Barrier</label> <input name=\"kiBarrier\" ng-model=\"cal.dcdc.kiBarrier\" type=\"number\" min=\"1\" pattern=\"\\d+\" ng-required=\"cal.dcdc.barrierType !== 'NONE'\" ng-disabled=\"cal.dcdc.barrierType === 'NONE'\"> </md-input-container> </div> <div layout-gt-sm=\"row\"> <md-input-container ng-if=\"cal.dcdc.scenario == 1\" class=\"md-block\" flex> <label>Coupon P.A.</label> <input name=\"couponPa\" ng-if=\"cal.dcdc.couponPa\" value=\"{{cal.dcdc.couponPa}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> <md-input-container ng-if=\"cal.dcdc.scenario == 2\" class=\"md-block\" flex> <label>Strike Price</label> <input name=\"strikePrice\" ng-if=\"cal.dcdc.strikePrice\" value=\"{{cal.dcdc.strikePrice}}\" style=\"font-size:20px;font-weight:700\" readonly=\"readonly\"> </md-input-container> </div> <div layout=\"row\" layout-align=\"end center\"> <div ng-if=\"cal.dcdc.scenario == 1\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateCouponPa()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the coupon per annum under the chosen criteria </md-tooltip> Query </md-button> </div> <div ng-if=\"cal.dcdc.scenario == 2\"> <md-button ng-disabled=\"DcdcInvForm.$invalid\" ng-click=\"calculateStrikePrice()\" class=\"md-raised md-warn\" aria-label=\"DCDC Calculate Button\" style=\"margin-top:-24px\"> <md-tooltip> See the strike price under the chosen criteria </md-tooltip> Query </md-button> </div> <div md-theme=\"{{theme}}\"> <md-button ng-click=\"showAdvanced($event)\" class=\"md-raised md-warn\" aria-label=\"Menu with Tooltip Delay\" style=\"margin-top:-24px\"> <md-tooltip md-delay=\"demo.delayTooltip\"> See the Comparison of Other Products </md-tooltip> Preview </md-button> </div> </div> <br> <div layout=\"row\"> <div ng-controller=\"DiagramCtrl\" id=\"dcdcChartContainer\" style=\"width:100%;height:400px\"></div> </div> </form> </div> </md-content> </md-content> </md-tab> </md-tabs> </md-card> </div> </div> ";
                                                                                                                    // 6
      angular.module('angular-templates')                                                                           // 7
        .run(['$templateCache', function($templateCache) {                                                          // 8
          $templateCache.put(templateUrl, template);                                                                // 9
        }]);                                                                                                        // 10
                                                                                                                    // 11
      module.exports = {};                                                                                          // 12
      module.exports.__esModule = true;                                                                             // 13
      module.exports.default = templateUrl;                                                                         // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dialog1.tmpl.html":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/dialog1.tmpl.html                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
      if (Meteor.isServer) return;                                                                                  // 2
                                                                                                                    // 3
      var templateUrl = "/client/dialog1.tmpl.html";                                                                // 4
      var template = "<md-dialog aria-label=\"Comparison for HSBC\"> <form ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>Comparison for Other Products</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <md-icon md-svg-src=\"images/ic_cancel_white_48px.svg\" style=\"font-size:36px\" aria-label=\"Close dialog\"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class=\"md-dialog-content\" ng-controller=\"DiagramCtrl\"> <h2>Hello Hello Hello</h2> <p> HSBC is the best company in the world!HSBC is the best company in the world!HSBC is the best company in the world!HSBC is the best company in the world!HSBC is the best company in the world! </p> <div id=\"container_v2\" style=\"min-width:310px;height:400px;margin:0 auto\"></div> <div layout=\"row\"> <md-card flex> <div class=\"md-toolbar-tools\"> <span>HSBC</span> </div> <md-content> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> </md-list> </md-content> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>BOC</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> </md-list> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>Standard Charter</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> </md-list> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>Citi</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Bad</h3> </div> </md-list-item> </md-list> </md-card> <md-card flex> <div class=\"md-toolbar-tools\"> <span>Hang Seng</span> </div> <md-list class=\"md-dense\" flex> <md-subheader class=\"md-no-sticky\">Return</md-subheader> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> <md-list-item class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>Good</h3> </div> </md-list-item> </md-list> </md-card> </div> </div> </md-dialog-content> <md-dialog-actions layout=\"row\"> <md-button ng-click=\"\" target=\"_blank\" md-autofocus> More on Products </md-button> <span flex></span> <md-button ng-click=\"\" class=\"md-primary\"> Contact our Agents </md-button> <md-button ng-click=\"\" class=\"md-primary\"> Print PDF </md-button> </md-dialog-actions> </form> </md-dialog> ";
                                                                                                                    // 6
      angular.module('angular-templates')                                                                           // 7
        .run(['$templateCache', function($templateCache) {                                                          // 8
          $templateCache.put(templateUrl, template);                                                                // 9
        }]);                                                                                                        // 10
                                                                                                                    // 11
      module.exports = {};                                                                                          // 12
      module.exports.__esModule = true;                                                                             // 13
      module.exports.default = templateUrl;                                                                         // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"matrix.html":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/matrix.html                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
      if (Meteor.isServer) return;                                                                                  // 2
                                                                                                                    // 3
      var templateUrl = "/client/matrix.html";                                                                      // 4
      var template = "<md-card style=\"height:450px\"> <!-- <md-toolbar>\n    <h3>Coupon Rate p.a. Matrix</h3>\n  </md-toolbar> --> <md-card-title> <md-content class=\"container\"> <div id=\"parentContainer\"> <div class=\"handsontable\" ng-controller=\"MatrixCtrl\" id=\"example\"></div> </div> </md-content> </md-card-title> <md-card-actions layout=\"row\" layout-align=\"end center\"> <md-button class=\"md-raised\" style=\"background:#39f;color:#fff\">Conversion Rates</md-button> <md-button class=\"md-raised\" style=\"background:#c06;color:#fff\">Interest Rates</md-button> </md-card-actions> </md-card> ";
                                                                                                                    // 6
      angular.module('angular-templates')                                                                           // 7
        .run(['$templateCache', function($templateCache) {                                                          // 8
          $templateCache.put(templateUrl, template);                                                                // 9
        }]);                                                                                                        // 10
                                                                                                                    // 11
      module.exports = {};                                                                                          // 12
      module.exports.__esModule = true;                                                                             // 13
      module.exports.default = templateUrl;                                                                         // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav.html":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/nav.html                                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
      if (Meteor.isServer) return;                                                                                  // 2
                                                                                                                    // 3
      var templateUrl = "/client/nav.html";                                                                         // 4
      var template = "<md-toolbar style=\"background:#F5F5F5\" md-padding> <div layout=\"row\" layout-align=\"start center\" layout-padding> <img alt=\"Brand\" src=\"images/Hsbc-logo.svg\" width=\"120\"> <!-- <i class=\"material-icons md-48 md-dark md-inactive\">search</i> --> <span flex></span> <div ng-controller=\"AutoCompleteCtrl as ctrl\" ng-cloak> <form ng-submit=\"$event.preventDefault()\"> <md-autocomplete style=\"width:300px\" md-autofocus md-search-text-change=\"ctrl.searchTextChange(ctrl.searchText)\" md-search-text=\"ctrl.searchText\" md-selected-item-change=\"ctrl.selectedItemChange(item)\" md-selected-item=\"ctrl.selectedItem\" md-no-cache=\"ctrl.noCache\" ng-disabled=\"ctrl.isDisabled\" md-items=\"item in ctrl.querySearch(ctrl.searchText)\" md-item-text=\"item.display\" md-min-length=\"0\" placeholder=\"Currency/Equilty-linked Assets\"> <md-item-template> <span md-highlight-text=\"ctrl.searchText\" md-highlight-flags=\"^i\">{{item.display}}</span> </md-item-template> <md-not-found> No states matching \"{{ctrl.searchText}}\" were found. </md-not-found> </md-autocomplete> </form> </div> </div> </md-toolbar> ";
                                                                                                                    // 6
      angular.module('angular-templates')                                                                           // 7
        .run(['$templateCache', function($templateCache) {                                                          // 8
          $templateCache.put(templateUrl, template);                                                                // 9
        }]);                                                                                                        // 10
                                                                                                                    // 11
      module.exports = {};                                                                                          // 12
      module.exports.__esModule = true;                                                                             // 13
      module.exports.default = templateUrl;                                                                         // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reference.html":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/reference.html                                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
      if (Meteor.isServer) return;                                                                                  // 2
                                                                                                                    // 3
      var templateUrl = "/client/reference.html";                                                                   // 4
      var template = "<md-card> <div style=\"height:400px\" class=\"container\" id=\"video\" ng-controller=\"SubheaderAppCtrl\" layout=\"column\" flex layout-fill ng-cloak> <md-toolbar> <div class=\"md-toolbar-tools\" style=\"background-color:navy;color:#fff\">Reference Link</div> </md-toolbar> <md-content md-theme=\"altTheme\"> <section> <md-subheader style=\"font-size:16px\" class=\"md-primary\">Video</md-subheader> <md-list ng-controller=\"videoCtrl\" layout-padding> <md-list-item class=\"md-3-line\" ng-click=\"showAdvanced($event)\" ng-repeat=\"message in messages\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-warn\">Appendix</md-subheader> <md-list layout=\"column\" layout-padding> <md-list-item ng-click=\"showAdvanced($event)\" class=\"md-3-line\" ng-repeat=\"message in messages\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\">Terms</md-subheader> <md-list layout=\"column\" layout-padding> <md-list-item ng-click=\"showAdvanced($event)\" class=\"md-3-line\" ng-repeat=\"message in messages\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> <section> <md-subheader style=\"font-size:16px\" class=\"md-accent\">Expert Tips</md-subheader> <md-list layout=\"column\" layout-padding> <md-list-item class=\"md-3-line\" ng-repeat=\"message in messages\" ng-click=\"null\"> <img ng-src=\"{{message.face}}\" class=\"md-avatar\" alt=\"{{message.who}}\"> <div class=\"md-list-item-text\"> <h3>{{message.what}}</h3> <h4>{{message.who}}</h4> <p> {{message.notes}} </p> </div> </md-list-item> </md-list> </section> </md-content> </div> </md-card> ";
                                                                                                                    // 6
      angular.module('angular-templates')                                                                           // 7
        .run(['$templateCache', function($templateCache) {                                                          // 8
          $templateCache.put(templateUrl, template);                                                                // 9
        }]);                                                                                                        // 10
                                                                                                                    // 11
      module.exports = {};                                                                                          // 12
      module.exports.__esModule = true;                                                                             // 13
      module.exports.default = templateUrl;                                                                         // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"video.html":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/video.html                                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
      if (Meteor.isServer) return;                                                                                  // 2
                                                                                                                    // 3
      var templateUrl = "/client/video.html";                                                                       // 4
      var template = "<md-dialog aria-label=\"Video for HSBC\"> <md-dialog-content> <div ng-controller=\"videoCtrl\"> <div id=\"player\"></div> </div> </md-dialog-content> </md-dialog> ";
                                                                                                                    // 6
      angular.module('angular-templates')                                                                           // 7
        .run(['$templateCache', function($templateCache) {                                                          // 8
          $templateCache.put(templateUrl, template);                                                                // 9
        }]);                                                                                                        // 10
                                                                                                                    // 11
      module.exports = {};                                                                                          // 12
      module.exports.__esModule = true;                                                                             // 13
      module.exports.default = templateUrl;                                                                         // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.html.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/main.html.js                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
            Meteor.startup(function() {                                                                             // 2
              var attrs = {"ng-app":"spcal","ng-cloak":""};                                                         // 3
              for (var prop in attrs) {                                                                             // 4
                document.body.setAttribute(prop, attrs[prop]);                                                      // 5
              }                                                                                                     // 6
            });                                                                                                     // 7
                                                                                                                    // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["angular","angular-meteor","angular-material","handsontable-pro/dist/handsontable.full","angular-material/angular-material.css","handsontable-pro/dist/handsontable.full.css","highcharts","highcharts/highstock","highcharts/modules/data.js",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/main.js                                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                   //
                                                                                                                    //
var _angular = require('angular');                                                                                  //
                                                                                                                    //
var _angular2 = _interopRequireDefault(_angular);                                                                   //
                                                                                                                    //
var _angularMeteor = require('angular-meteor');                                                                     //
                                                                                                                    //
var _angularMeteor2 = _interopRequireDefault(_angularMeteor);                                                       //
                                                                                                                    //
var _angularMaterial = require('angular-material');                                                                 //
                                                                                                                    //
var _angularMaterial2 = _interopRequireDefault(_angularMaterial);                                                   //
                                                                                                                    //
var _handsontableProDistHandsontableFull = require('handsontable-pro/dist/handsontable.full');                      //
                                                                                                                    //
var _handsontableProDistHandsontableFull2 = _interopRequireDefault(_handsontableProDistHandsontableFull);           //
                                                                                                                    //
require('angular-material/angular-material.css');                                                                   //
                                                                                                                    //
require('handsontable-pro/dist/handsontable.full.css');                                                             //
                                                                                                                    //
var Highcharts = require('highcharts');                                                                             // 8
var Highstock = require('highcharts/highstock');                                                                    // 9
require('highcharts/modules/data.js')(Highcharts);                                                                  // 10
require('highcharts/modules/data.js')(Highstock);                                                                   // 11
                                                                                                                    //
var spcal = _angular2['default'].module('spcal', [_angularMeteor2['default'],                                       // 13
// 'ui.router',                                                                                                     //
// 'angularUtils.directives.dirPagination',                                                                         //
// 'uiGmapgoogle-maps',                                                                                             //
_angularMaterial2['default'], 'ngMessages', 'ngSanitize']);                                                         //
                                                                                                                    //
var dpsChart;                                                                                                       // 23
var dcdcChart;                                                                                                      // 24
                                                                                                                    //
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                 // 26
                                                                                                                    //
  $mdThemingProvider.theme('red').primaryPalette('red');                                                            // 28
                                                                                                                    //
  $mdThemingProvider.theme('blue').primaryPalette('blue');                                                          // 31
}]).controller('ValidationCtrl', ["$scope", "$mdDialog", "$interval", function ($scope, $mdDialog, $interval) {     //
  DialogController.$inject = ["$scope", "$mdDialog"];                                                               // 36
  $scope.theme = 'red';                                                                                             //
                                                                                                                    // 38
  var isThemeRed = true;                                                                                            //
                                                                                                                    // 40
  $interval(function () {                                                                                           // 41
    $scope.theme = isThemeRed ? 'blue' : 'red';                                                                     //
                                                                                                                    // 43
    isThemeRed = !isThemeRed;                                                                                       //
  }, 2000);                                                                                                         //
                                                                                                                    // 46
  $scope.onCurPairChange = function (depoCur, linkCur) {                                                            // 47
    if (depoCur && linkCur) {                                                                                       // 48
      var seq = depoCur + "-" + linkCur;                                                                            // 49
      var inv = linkCur + "-" + depoCur;                                                                            // 50
      var series = dpsChart.series;                                                                                 // 51
      for (var i = 0; i < series.length; i++) {                                                                     // 52
        var column = series[i];                                                                                     // 53
        if (column.name === seq || column.name === inv) {                                                           // 54
          column.show();                                                                                            //
        } else {                                                                                                    // 56
          column.hide();                                                                                            //
        }                                                                                                           //
      }                                                                                                             //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    // 62
  $scope.onStockChange = function (stockName) {                                                                     // 63
    var series = dcdcChart.series;                                                                                  // 64
    var navigatorIndex = series.length - 1;                                                                         // 65
    for (var i = 0; i < navigatorIndex; i++) {                                                                      // 66
      var column = series[i];                                                                                       // 67
      if (column.name === stockName) {                                                                              //
        //series[navigatorIndex].data = column.data;                                                                // 69
        column.showInNavigator = true;                                                                              //
        //dcdcChart.navigator.series = column;                                                                      // 71
        column.show();                                                                                              //
      } else {                                                                                                      // 73
        column.showInNavigator = false;                                                                             // 74
        column.hide();                                                                                              //
      }                                                                                                             //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    // 79
  $scope.calculateConversionRate = function () {                                                                    // 80
    var dps = $scope.cal.dps;                                                                                       // 81
    var dpsDoc = DpsData.findOne({ depo_cur: dps.depositCurrency, link_cur: dps.linkedCurrency,                     // 82
      tenor: dps.tenor, interest_rate: dps.yieldPa });                                                              // 83
    if (dpsDoc) {                                                                                                   // 84
      dps.conversionRate = dpsDoc.conversion_rate;                                                                  //
    } else {                                                                                                        // 86
      dps.conversionRate = undefined;                                                                               //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    // 90
  $scope.calculateCouponPa = function () {                                                                          // 91
    var dcdc = $scope.cal.dcdc;                                                                                     // 92
    if (dcdc.barrierType === 'NONE') {                                                                              // 93
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,          // 95
        ki_barrier: null });                                                                                        //
    } else {                                                                                                        // 97
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,          // 99
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                    //
    }                                                                                                               // 101
    if (dcdcDoc) {                                                                                                  // 102
      dcdc.couponPa = dcdcDoc.coupon_pa;                                                                            //
    } else {                                                                                                        // 104
      dcdc.couponPa = undefined;                                                                                    //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    // 108
  $scope.calculateStrikePrice = function () {                                                                       // 109
    var dcdc = $scope.cal.dcdc;                                                                                     // 110
    if (dcdc.barrierType === 'NONE') {                                                                              // 111
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,          // 113
        ki_barrier: null });                                                                                        //
    } else {                                                                                                        // 115
      var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
        ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,          // 117
        ki_barrier: parseInt(dcdc.kiBarrier) });                                                                    //
    }                                                                                                               // 119
    if (dcdcDoc) {                                                                                                  // 120
      dcdc.strikePrice = dcdcDoc.strike;                                                                            //
    } else {                                                                                                        // 122
      dcdc.strikePrice = undefined;                                                                                 //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    // 126
  $scope.showAdvanced = function (ev) {                                                                             // 127
    $mdDialog.show({                                                                                                // 128
      controller: DialogController,                                                                                 // 129
      templateUrl: 'client/dialog1.tmpl.html',                                                                      // 130
      parent: _angular2['default'].element(document.body),                                                          // 131
      targetEvent: ev,                                                                                              // 132
      clickOutsideToClose: true                                                                                     //
    }).then(function (answer) {                                                                                     // 135
      $scope.status = 'You said the information was "' + answer + '".';                                             //
    }, function () {                                                                                                // 137
      $scope.status = 'You cancelled the dialog.';                                                                  //
    });                                                                                                             //
  };                                                                                                                //
                                                                                                                    // 141
  function DialogController($scope, $mdDialog) {                                                                    // 142
    $scope.hide = function () {                                                                                     // 143
      $mdDialog.hide();                                                                                             //
    };                                                                                                              //
                                                                                                                    // 146
    $scope.cancel = function () {                                                                                   // 147
      $mdDialog.cancel();                                                                                           //
    };                                                                                                              //
                                                                                                                    // 150
    $scope.answer = function (answer) {                                                                             // 151
      $mdDialog.hide(answer);                                                                                       //
    };                                                                                                              //
  }                                                                                                                 //
                                                                                                                    // 155
  $scope.cal = {                                                                                                    // 156
    dps: {},                                                                                                        // 157
    dcdc: {                                                                                                         // 158
      scenario: 1                                                                                                   //
    }                                                                                                               //
  };                                                                                                                //
                                                                                                                    // 162
  $scope.currencies = 'AUD, CAD, CHF, CNY, EUR, GBP, HKD, JPY, NZD, SGD, USD'.split(', ').map(function (currency) {
    return { abbrev: currency };                                                                                    //
  });                                                                                                               //
                                                                                                                    // 166
  $scope.dpsTenors = ['1W', '2W', '3W', '1M', '2M', '3M'];                                                          //
                                                                                                                    // 168
  $scope.dcdcTenors = [{                                                                                            // 170
    name: '3M',                                                                                                     // 171
    value: 3                                                                                                        //
  }, {                                                                                                              // 173
    name: '6M',                                                                                                     // 174
    value: 6                                                                                                        //
  }, {                                                                                                              // 176
    name: '9M',                                                                                                     // 177
    value: 9                                                                                                        //
  }, {                                                                                                              // 179
    name: '12M',                                                                                                    // 180
    value: 12                                                                                                       //
  }];                                                                                                               //
                                                                                                                    // 184
  $scope.stocks = ['700 HK', '388 HK'];                                                                             //
                                                                                                                    // 186
  $scope.koTypes = ['Daily', 'Period End'];                                                                         //
                                                                                                                    // 188
  $scope.barrierTypes = ['NONE', 'AKI', 'EKI'];                                                                     //
                                                                                                                    //
  //dcdcview Button JS                                                                                              // 191
  $scope.demo = {                                                                                                   // 192
    showTooltip: false,                                                                                             // 193
    tipDirection: 'bottom'                                                                                          //
  };                                                                                                                //
                                                                                                                    // 196
  $scope.demo.delayTooltip = undefined;                                                                             // 197
  $scope.$watch('demo.delayTooltip', function (val) {                                                               // 198
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;                                                              //
  });                                                                                                               //
                                                                                                                    // 201
  $scope.linkedCurrencyFilter = function (inputCur) {                                                               // 202
    return inputCur.abbrev !== $scope.cal.dps.depositCurrency && !(inputCur.abbrev === 'USD' && $scope.cal.dps.depositCurrency === 'HKD') && !(inputCur.abbrev === 'HKD' && $scope.cal.dps.depositCurrency === 'USD');
  };                                                                                                                //
}]);                                                                                                                //
                                                                                                                    //
// (function () {                                                                                                   //
// 'use strict';                                                                                                    //
// angular                                                                                                          //
//     .module('spcal')                                                                                             //
//     .controller('DemoCtrl', DemoCtrl);                                                                           // 213
spcal.controller('AutoCompleteCtrl', ["$timeout", "$q", "$log", function ($timeout, $q, $log) {                     //
                                                                                                                    //
  // function DemoCtrl ($timeout, $q, $log) {                                                                       // 216
  var self = this;                                                                                                  //
                                                                                                                    // 218
  self.simulateQuery = true;                                                                                        // 219
  self.isDisabled = false;                                                                                          //
                                                                                                                    //
  // list of `state` value/display objects                                                                          // 222
  self.states = loadAll();                                                                                          // 223
  self.querySearch = querySearch;                                                                                   // 224
  self.selectedItemChange = selectedItemChange;                                                                     // 225
  self.searchTextChange = searchTextChange;                                                                         //
                                                                                                                    // 227
  self.newState = newState;                                                                                         //
                                                                                                                    // 229
  function newState(state) {                                                                                        // 230
    alert("Sorry! You'll need to create a Constitution for " + state + " first!");                                  //
  }                                                                                                                 //
                                                                                                                    //
  // ******************************                                                                                 //
  // Internal methods                                                                                               //
  // ******************************                                                                                 //
                                                                                                                    //
  /**                                                                                                               //
   * Search for states... use $timeout to simulate                                                                  //
   * remote dataservice call.                                                                                       //
   */                                                                                                               // 241
  function querySearch(query) {                                                                                     // 242
    var results = query ? self.states.filter(createFilterFor(query)) : self.states,                                 //
        deferred;                                                                                                   // 244
    if (self.simulateQuery) {                                                                                       // 245
      deferred = $q.defer();                                                                                        // 246
      $timeout(function () {                                                                                        // 246
        deferred.resolve(results);                                                                                  //
      }, Math.random() * 1000, false);                                                                              // 247
      return deferred.promise;                                                                                      //
    } else {                                                                                                        // 249
      return results;                                                                                               //
    }                                                                                                               //
  }                                                                                                                 //
                                                                                                                    // 253
  function searchTextChange(text) {                                                                                 // 254
    $log.info('Text changed to ' + text);                                                                           //
  }                                                                                                                 //
                                                                                                                    // 257
  function selectedItemChange(item) {                                                                               // 258
    $log.info('Item changed to ' + JSON.stringify(item));                                                           //
  }                                                                                                                 //
                                                                                                                    //
  /**                                                                                                               //
   * Build `states` list of key/value pairs                                                                         //
   */                                                                                                               // 264
  function loadAll() {                                                                                              // 265
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';                                                                                  //
                                                                                                                    // 273
    return allStates.split(/, +/g).map(function (state) {                                                           // 274
      return {                                                                                                      // 275
        value: state.toLowerCase(),                                                                                 // 276
        display: state                                                                                              //
      };                                                                                                            //
    });                                                                                                             //
  }                                                                                                                 //
                                                                                                                    //
  /**                                                                                                               //
   * Create filter function for a query string                                                                      //
   */                                                                                                               // 284
  function createFilterFor(query) {                                                                                 // 285
    var lowercaseQuery = _angular2['default'].lowercase(query);                                                     //
                                                                                                                    // 287
    return function filterFn(state) {                                                                               // 288
      return state.value.indexOf(lowercaseQuery) === 0;                                                             //
    };                                                                                                              //
  }                                                                                                                 //
  // }                                                                                                              //
}]);                                                                                                                //
                                                                                                                    // 296
var themeIcons = function themeIcons($mdIconProvider) {                                                             //
                                                                                                                    // 298
  $mdIconProvider.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg").iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg").iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg").iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg").iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg").iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg").iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
};                                                                                                                  //
                                                                                                                    // 322
_angular2['default'].module('spcal').config(themeIcons);                                                            //
                                                                                                                    // 326
spcal.controller('MatrixCtrl', ["$timeout", "$scope", function ($timeout, $scope) {                                 // 327
  var data = [["", "Ford", "Volvo", "Toyota", "Honda"], ["2016", 10, 11, 12, 13], ["2017", 20, 11, 14, 13], ["2018", 30, 15, 12, 13]];
                                                                                                                    // 334
  var rateData = [[0.7594, 0.7589, 0.7583, 0.7577, 0.7596, 0.7616], [0.76, 0.7599, 0.7597, 0.7595, 0.7627, 0.7658], [0.7606, 0.7608, 0.7609, 0.7611, 0.7655, 0.7696], [0.7611, 0.7617, 0.7621, 0.7626, 0.7681, 'N/A'], [0.7616, 0.7625, 0.7632, 0.764, 'N/A', 'N/A'], [0.7621, 0.7632, 0.7643, 0.7653, 'N/A', 'N/A'], [0.7625, 0.7639, 0.7652, 0.7665, 'N/A', 'N/A'], [0.7629, 0.7646, 0.7662, 0.7676, 'N/A', 'N/A'], [0.7633, 0.7653, 0.767, 0.7687, 'N/A', 'N/A']];
                                                                                                                    // 346
  var container = document.getElementById('example');                                                               // 347
  var hot = new _handsontableProDistHandsontableFull2['default'](container, {                                       // 348
    data: rateData,                                                                                                 // 349
    headerToolTips: true,                                                                                           // 350
    rowHeaders: ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'],                           // 351
    nestedHeaders: [[{ label: 'Conversion Rate', colspan: 6 }], ['1W', '2W', '3W', '1M', '2M', '3M']],              // 355
    colWidths: 100,                                                                                                 // 356
    rowHeights: 40,                                                                                                 // 357
    currentRowClassName: 'selectedRow',                                                                             // 358
    currentColClassName: 'selectedCol',                                                                             // 359
    editor: false                                                                                                   //
  });                                                                                                               //
                                                                                                                    // 362
  $timeout(function () {                                                                                            // 363
    hot.selectCell(0, 0);                                                                                           //
  }, 2);                                                                                                            //
}]);                                                                                                                //
                                                                                                                    // 367
spcal.controller('DiagramCtrl', ["$scope", function ($scope) {                                                      // 368
  $.get('fxRate.csv', function (data) {                                                                             //
    // Create the chart                                                                                             // 370
    dpsChart = Highcharts.chart('dpsChartContainer', {                                                              // 371
      data: {                                                                                                       // 372
        csv: data                                                                                                   //
      },                                                                                                            // 374
      plotOptions: {                                                                                                // 375
        series: {                                                                                                   // 376
          visible: false                                                                                            //
        }                                                                                                           //
      },                                                                                                            // 379
      title: {                                                                                                      // 380
        text: 'Deposit Plus'                                                                                        //
      },                                                                                                            // 382
      yAxis: {                                                                                                      // 383
        crosshair: true,                                                                                            // 384
        title: {                                                                                                    // 385
          text: 'FX Rate'                                                                                           //
        }                                                                                                           //
      }                                                                                                             //
    });                                                                                                             //
  });                                                                                                               // 390
  $.get('stockPrice.csv', function (data) {                                                                         //
    // Create the chart                                                                                             // 392
    dcdcChart = Highstock.stockChart('dcdcChartContainer', {                                                        // 393
      data: {                                                                                                       // 394
        csv: data                                                                                                   //
      },                                                                                                            // 396
      plotOptions: {                                                                                                // 397
        series: {                                                                                                   // 398
          visible: false                                                                                            //
        }                                                                                                           //
      },                                                                                                            // 401
      title: {                                                                                                      // 402
        text: 'DCDC'                                                                                                //
      },                                                                                                            // 404
      yAxis: {                                                                                                      // 405
        title: {                                                                                                    // 406
          text: 'Stock Price'                                                                                       //
        }                                                                                                           //
      }                                                                                                             //
    });                                                                                                             //
  });                                                                                                               //
  /*                                                                                                                //
  $.get('stockPrice.csv', function (data) {                                                                         //
    // Create the chart                                                                                             //
    Highstock.stockChart('container_v2', {                                                                          //
      chart: {                                                                                                      //
        type: 'column'                                                                                              //
      },                                                                                                            //
      title: {                                                                                                      //
        text: 'Performance on Deposit Plus from Other Financial Institutions'                                       //
      },                                                                                                            //
      xAxis: {                                                                                                      //
        categories: ['HSBC', 'BOC', 'Standard Charter', 'Citi', 'Hang Seng']                                        //
      },                                                                                                            //
      yAxis: {                                                                                                      //
        min: 0,                                                                                                     //
        title: {                                                                                                    //
          text: 'Criteria Distribution'                                                                             //
        }                                                                                                           //
      },                                                                                                            //
      tooltip: {                                                                                                    //
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true                                                                                                //
      },                                                                                                            //
      plotOptions: {                                                                                                //
        column: {                                                                                                   //
          stacking: 'percent'                                                                                       //
        }                                                                                                           //
      },                                                                                                            //
      series: [{                                                                                                    //
        name: 'Return',                                                                                             //
        data: [5, 3, 4, 7, 2]                                                                                       //
      }, {                                                                                                          //
        name: 'Stability',                                                                                          //
        data: [2, 2, 3, 2, 1]                                                                                       //
      }, {                                                                                                          //
        name: 'Volatility',                                                                                         //
        data: [3, 4, 4, 2, 5]                                                                                       //
      },{                                                                                                           //
        name: 'Momentum',                                                                                           //
        data: [6, 2, 4, 3, 1]                                                                                       //
      }]                                                                                                            //
    });                                                                                                             //
  });*/                                                                                                             //
}]);                                                                                                                //
                                                                                                                    // 456
spcal.config(["$mdThemingProvider", function ($mdThemingProvider) {                                                 // 457
  $mdThemingProvider.theme('altTheme').primaryPalette('purple');                                                    //
}]).controller('SubheaderAppCtrl', ["$scope", function ($scope) {                                                   // 461
  var imagePath = 'images/hsbc-icon.gif';                                                                           // 462
  $scope.messages = [{                                                                                              // 464
    face: imagePath,                                                                                                // 465
    what: 'Derivatives',                                                                                            // 466
    who: 'Basic Financial Concepts',                                                                                // 467
    when: '3:08PM',                                                                                                 // 468
    notes: " Get to know the products before investing"                                                             //
  }, {                                                                                                              // 471
    face: imagePath,                                                                                                // 472
    what: 'Deposit Plus',                                                                                           // 473
    who: 'A Currency Linked Investment',                                                                            // 474
    when: '3:08PM',                                                                                                 // 475
    notes: " Get to know the products before investing"                                                             //
  }, {                                                                                                              // 478
    face: imagePath,                                                                                                // 479
    what: 'Deposit Plus Example',                                                                                   // 480
    who: 'A Currency Linked Investment',                                                                            // 481
    when: '3:08PM',                                                                                                 // 482
    notes: " Get to know the products before investing"                                                             //
  }, {                                                                                                              // 485
    face: imagePath,                                                                                                // 486
    what: 'Deposit Plus Interest Calculation',                                                                      // 487
    who: 'A Currency Linked Investment',                                                                            // 488
    when: '3:08PM',                                                                                                 // 489
    notes: " Get to know the products before investing"                                                             //
  }, {                                                                                                              // 492
    face: imagePath,                                                                                                // 493
    what: 'DCDC',                                                                                                   // 494
    who: 'An Equity Linked Investment',                                                                             // 495
    when: '3:08PM',                                                                                                 // 496
    notes: " Get to know the products before investing"                                                             //
  }, {                                                                                                              // 499
    face: imagePath,                                                                                                // 500
    what: 'DCDC Example 1 - Auto Call',                                                                             // 501
    who: 'An Equity Linked Investment',                                                                             // 502
    when: '3:08PM',                                                                                                 // 503
    notes: " Get to know the products before investing"                                                             //
  }, {                                                                                                              // 506
    face: imagePath,                                                                                                // 507
    what: 'DCDC Example 2 - Airbag',                                                                                // 508
    who: 'An Equity Linked Investment',                                                                             // 509
    when: '3:08PM',                                                                                                 // 510
    notes: " Get to know the products before investing"                                                             //
  }];                                                                                                               //
}]);                                                                                                                //
                                                                                                                    // 515
spcal.controller('videoCtrl', ["$scope", "$mdDialog", function ($scope, $mdDialog) {                                // 516
  DialogController.$inject = ["$scope", "$mdDialog"];                                                               // 517
  $scope.showAdvanced = function (ev) {                                                                             // 518
    $mdDialog.show({                                                                                                // 519
      controller: DialogController,                                                                                 // 520
      templateUrl: 'client/video.html',                                                                             // 521
      parent: _angular2['default'].element(document.body),                                                          // 522
      targetEvent: ev,                                                                                              // 523
      clickOutsideToClose: true,                                                                                    //
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.                                         // 526
    }).then(function (answer) {                                                                                     //
      $scope.status = 'You said the information was "' + answer + '".';                                             // 528
    }, function () {                                                                                                //
      $scope.status = 'You cancelled the dialog.';                                                                  //
    });                                                                                                             //
  };                                                                                                                // 532
                                                                                                                    // 533
  function DialogController($scope, $mdDialog) {                                                                    // 534
    $scope.hide = function () {                                                                                     //
      $mdDialog.hide();                                                                                             //
    };                                                                                                              // 537
                                                                                                                    // 538
    $scope.cancel = function () {                                                                                   //
      $mdDialog.cancel();                                                                                           //
    };                                                                                                              // 541
                                                                                                                    // 542
    $scope.answer = function (answer) {                                                                             //
      $mdDialog.hide(answer);                                                                                       //
    };                                                                                                              //
  }                                                                                                                 // 546
                                                                                                                    //
  onYouTubeIframeAPIReady = function () {                                                                           //
                                                                                                                    //
    // New Video Player, the first argument is the id of the div.                                                   // 550
    // Make sure it's a global variable.                                                                            //
    player = new YT.Player("player", {                                                                              // 552
                                                                                                                    // 553
      height: "400",                                                                                                //
      width: "600",                                                                                                 //
                                                                                                                    // 556
      // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")        //
      videoId: "wO_-MtWejRM",                                                                                       //
                                                                                                                    // 559
      // Events like ready, state change,                                                                           //
      events: {                                                                                                     // 561
                                                                                                                    //
        onReady: function onReady(event) {                                                                          //
                                                                                                                    // 564
          // Play video when player ready.                                                                          //
          event.target.playVideo();                                                                                 //
        }                                                                                                           //
                                                                                                                    //
      }                                                                                                             //
                                                                                                                    //
    });                                                                                                             //
  };                                                                                                                // 573
                                                                                                                    //
  YT.load();                                                                                                        //
}]);                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"collections":{"dcdc.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// collections/dcdc.js                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
DcdcData = new Mongo.Collection("dcdc");                                                                            // 1
                                                                                                                    //
DcdcData.allow({                                                                                                    // 3
  insert: function insert() {                                                                                       // 4
    if (Meteor.isServer) {                                                                                          // 5
      return true;                                                                                                  // 6
    } else {                                                                                                        //
      return false;                                                                                                 // 8
    }                                                                                                               //
  },                                                                                                                //
  update: function update() {                                                                                       // 11
    if (Meteor.isServer) {                                                                                          // 12
      return true;                                                                                                  // 13
    } else {                                                                                                        //
      return false;                                                                                                 // 15
    }                                                                                                               //
  },                                                                                                                //
  remove: function remove() {                                                                                       // 18
    if (Meteor.isServer) {                                                                                          // 19
      return true;                                                                                                  // 20
    } else {                                                                                                        //
      return false;                                                                                                 // 22
    }                                                                                                               //
  }                                                                                                                 //
});                                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dps.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// collections/dps.js                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
DpsData = new Mongo.Collection("dps");                                                                              // 1
                                                                                                                    //
DpsData.allow({                                                                                                     // 3
  insert: function insert() {                                                                                       // 4
    if (Meteor.isServer) {                                                                                          // 5
      return true;                                                                                                  // 6
    } else {                                                                                                        //
      return false;                                                                                                 // 8
    }                                                                                                               //
  },                                                                                                                //
  update: function update() {                                                                                       // 11
    if (Meteor.isServer) {                                                                                          // 12
      return true;                                                                                                  // 13
    } else {                                                                                                        //
      return false;                                                                                                 // 15
    }                                                                                                               //
  },                                                                                                                //
  remove: function remove() {                                                                                       // 18
    if (Meteor.isServer) {                                                                                          // 19
      return true;                                                                                                  // 20
    } else {                                                                                                        //
      return false;                                                                                                 // 22
    }                                                                                                               //
  }                                                                                                                 //
});                                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".css",".html"]});
require("./client/calculator.html");
require("./client/dialog1.tmpl.html");
require("./client/matrix.html");
require("./client/nav.html");
require("./client/reference.html");
require("./client/video.html");
require("./collections/dcdc.js");
require("./collections/dps.js");
require("./client/main.html.js");
require("./client/main.js");