import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import Handsontable from 'handsontable-pro/dist/handsontable.full';
import 'angular-material/angular-material.css';
import 'handsontable-pro/dist/handsontable.full.css';

var Highcharts = require('highcharts');
var HighBarCharts = require('highcharts/highstock');
var Highstock = require('highcharts/highstock');
require('highcharts/modules/data.js')(Highcharts);
require('highcharts/modules/data.js')(Highstock);

var spcal = angular.module('spcal',[
      angularMeteor,
      ngMaterial,
      'ngMessages',
      'ngSanitize'
]);

testing = null;
var dpsChart;
var dcdcChart;
var barChart;
var pairCurr;
var rowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];
var rateData = [['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
  ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']
];
var container;
var hot;
var videoToPlay;
var dps;
var dcdc;
var rowCnt = 0;
var colCnt = 0;
var rowCntTmp = 0;
var colCntTmp = 0;

spcal.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('red')
      .primaryPalette('red');

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue');
    })

  .controller('ValidationCtrl', function ($timeout, $scope, $mdDialog, $interval) {
    $scope.theme = 'red';

    var isThemeRed = true;

    $interval(function () {
      $scope.theme = isThemeRed ? 'blue' : 'red';

      isThemeRed = !isThemeRed;
    }, 2000);

    $scope.onCurPairChange = function(depoCur, linkCur) {
      if (depoCur && linkCur) {
        var seq = depoCur + "-" + linkCur;
        var inv = linkCur + "-" + depoCur;
        pairCurr = seq;
        switch (pairCurr){
          case "HKD-AUD":
            rowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];
            rateData = [
              [5.9015, 5.8938, 5.8961, 5.894, 5.915, 5.9401],
              [5.9054, 5.9007, 5.9055, 5.906, 5.9362, 5.9683],
              [5.909, 5.9072, 5.9142, 5.9171, 5.9559, 'N/A'],
              [5.9124, 5.9132, 5.9223, 5.9274, 'N/A', 'N/A'],
              [5.9157, 5.919, 5.93, 5.9371, 'N/A', 'N/A'],
              [5.9188, 5.9244, 5.9372, 5.9462, 'N/A', 'N/A'],
              [5.9218, 5.9296, 5.9441, 5.9549, 'N/A', 'N/A'],
              [5.9246, 5.9345, 5.9507, 5.9632, 'N/A', 'N/A'],
              [5.9274, 5.9392, 5.957, 'N/A', 'N/A', 'N/A']
            ];
            break;
          case "AUD-HKD":
            rowHeader = ['4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%'];
            rateData = [
              [0.1694, 0.1697, 0.1696, 0.1697, 0.1691, 0.1683],
              [0.1693, 0.1695, 0.1693, 0.1693, 0.1685, 0.1676],
              [0.1692, 0.1693, 0.1691, 0.169, 0.1679, 'N/A'],
              [0.1691, 0.1691, 0.1689, 0.1687, 'N/A', 'N/A'],
              [0.169, 0.1689, 0.1686, 0.1684, 'N/A', 'N/A'],
              [0.169, 0.1688, 0.1684, 0.1682, 'N/A', 'N/A'],
              [0.1689, 0.1686, 0.1682, 0.1679, 'N/A', 'N/A'],
              [0.1688, 0.1685, 0.168, 0.1677, 'N/A', 'N/A'],
              [0.1687, 0.1684, 0.1679, 'N/A', 'N/A', 'N/A']
            ];
            break;
          case "USD-AUD":
            rowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];
            rateData = [
              [0.7594, 0.7589, 0.7583, 0.7577, 0.7596, 0.7616],
              [0.76, 0.7599, 0.7597, 0.7595, 0.7627, 0.7658],
              [0.7606, 0.7608, 0.7609, 0.7611, 0.7655, 0.7696],
              [0.7611, 0.7617, 0.7621, 0.7626, 0.7681, 'N/A'],
              [0.7616, 0.7625, 0.7632, 0.764, 'N/A', 'N/A'],
              [0.7621, 0.7632, 0.7643, 0.7653, 'N/A', 'N/A'],
              [0.7625, 0.7639, 0.7652, 0.7665, 'N/A', 'N/A'],
              [0.7629, 0.7646, 0.7662, 0.7676, 'N/A', 'N/A'],
              [0.7633, 0.7653, 0.767, 0.7687, 'N/A', 'N/A']
            ];
            break;
          case "AUD-USD":
            rowHeader = ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];
            rateData = [
              [1.3168, 1.3177, 1.3187, 1.3198, 1.3165, 1.313],
              [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058],
              [1.3158, 1.316, 1.3163, 1.3167, 1.3111, 1.3058],
              [1.3139, 1.3129, 1.3122, 1.3113, 1.3019, 'N/A'],
              [1.313, 1.3115, 1.3103, 1.3089, 'N/A', 'N/A'],
              [1.3122, 1.3103, 1.3084, 1.3067, 'N/A', 'N/A'],
              [1.3115, 1.3091, 1.3068, 1.3046, 'N/A', 'N/A'],
              [1.3108, 1.3079, 1.3051, 1.3028, 'N/A', 'N/A'],
              [1.3101, 1.3067, 1.3038, 1.3009, 'N/A', 'N/A']
            ];
            break;
          case "HKD-GBP":
            rowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];
            rateData = [
              [9.7533, 9.7583, 9.7561, 9.7433, 9.668, 'N/A'],
              [9.7475, 9.7482, 9.7424, 9.7268, 'N/A', 'N/A'],
              [9.7419, 9.7387, 9.7296, 9.7113, 'N/A', 'N/A'],
              [9.7367, 9.7298, 9.7174, 9.6965, 'N/A', 'N/A'],
              [9.7317, 9.7212, 9.7058, 9.6824, 'N/A', 'N/A'],
              [9.7268, 9.713, 9.6948, 9.6689, 'N/A', 'N/A'],
              [9.7222, 9.7052, 9.6841, 9.6559, 'N/A', 'N/A'],
              [9.7177, 9.6976, 9.6739, 9.6434, 'N/A', 'N/A'],
              [9.7134, 9.6903, 9.664, 'N/A', 'N/A', 'N/A']
            ];
            break;
          case "GBP-HKD":
            rowHeader = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%', '8.5%', '9.0%', '9.5%'];
            rateData = [
              [0.1025, 0.1025, 0.1025, 0.1026, 0.1034, 'N/A'],
              [0.1026, 0.1026, 0.1026, 0.1028, 'N/A', 'N/A'],
              [0.1026, 0.1027, 0.1028, 0.103, 'N/A', 'N/A'],
              [0.1027, 0.1028, 0.1029, 0.1031, 'N/A', 'N/A'],
              [0.1028, 0.1029, 0.103, 0.1033, 'N/A', 'N/A'],
              [0.1028, 0.103, 0.1031, 0.1034, 'N/A', 'N/A'],
              [0.1029, 0.103, 0.1033, 0.1036, 'N/A', 'N/A'],
              [0.1029, 0.1031, 0.1034, 0.1037, 'N/A', 'N/A'],
              [0.103, 0.1032, 0.1035, 'N/A', 'N/A', 'N/A']
            ];
            break;
          case "HKD-CAD":
            rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];
            rateData = [
              [5.9099, 5.9081, 5.8937, 5.885, 5.8985, 5.9098],
              [5.9146, 5.9159, 5.9056, 5.9005, 5.925, 5.9451],
              [5.9189, 5.9231, 5.9162, 5.9143, 5.9484, 5.976],
              [5.9229, 5.9296, 5.9259, 5.9268, 5.9693, 'N/A'],
              [5.9266, 5.9357, 5.9348, 5.9382, 'N/A', 'N/A'],
              [5.9302, 5.9414, 5.943, 5.9487, 'N/A', 'N/A'],
              [5.9335, 5.9467, 5.9507, 5.9584, 'N/A', 'N/A'],
              [5.9367, 5.9518, 5.958, 5.9676, 'N/A', 'N/A'],
              [5.9397, 5.9566, 5.9648, 5.9762, 'N/A', 'N/A']
            ];
            break;
          case "CAD-HKD":
            rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];
            rateData = [
              [0.1692, 0.1693, 0.1697, 0.1699, 0.1695, 0.1692],
              [0.1691, 0.169, 0.1693, 0.1695, 0.1688, 0.1682],
              [0.169, 0.1688, 0.169, 0.1691, 0.1681, 0.1673],
              [0.1688, 0.1686, 0.1688, 0.1687, 0.1675, 'N/A'],
              [0.1687, 0.1685, 0.1685, 0.1684, 'N/A', 'N/A'],
              [0.1686, 0.1683, 0.1683, 0.1681, 'N/A', 'N/A'],
              [0.1685, 0.1682, 0.168, 0.1678, 'N/A', 'N/A'],
              [0.1684, 0.168, 0.1678, 0.1676, 'N/A', 'N/A'],
              [0.1684, 0.1679, 0.1677, 0.1673, 'N/A', 'N/A']
            ];
            break;
          case "HKD-EUR":
            rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];
            rateData = [
                [8.4099, 8.4216, 8.4286, 8.4289, 8.435, 8.4295],
                [8.4038, 8.4111, 8.414, 8.411, 8.4037, 8.3881],
                [8.3982, 8.4015, 8.4009, 8.3949, 8.3755, 8.3505],
                [8.3931, 8.3927, 8.3889, 8.3802, 8.3495, 8.3157],
                [8.3882, 8.3846, 8.3779, 8.3667, 8.3254, 'N/A'],
                [8.3837, 8.3771, 8.3676, 8.3541, 'N/A', 'N/A'],
                [8.3795, 8.3699, 8.358, 8.3422, 'N/A', 'N/A'],
                [8.3755, 8.3632, 8.3488, 8.331, 'N/A', 'N/A'],
                [8.3716, 8.3568, 8.3401, 8.3202, 'N/A', 'N/A']
              ];
              break;
          case "EUR-HKD":
            rowHeader = ['3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%'];
            rateData = [
                [0.1189, 0.1187, 0.1186, 0.1186, 0.1186, 0.1186],
                [0.119, 0.1189, 0.1188, 0.1189, 0.119, 0.1192],
                [0.1191, 0.119, 0.119, 0.1191, 0.1194, 0.1198],
                [0.1191, 0.1192, 0.1192, 0.1193, 0.1198, 0.1203],
                [0.1192, 0.1193, 0.1194, 0.1195, 0.1201, 'N/A'],
                [0.1193, 0.1194, 0.1195, 0.1197, 'N/A', 'N/A'],
                [0.1193, 0.1195, 0.1196, 0.1199, 'N/A', 'N/A'],
                [0.1194, 0.1196, 0.1198, 0.12, 'N/A', 'N/A'],
                [0.1195, 0.1197, 0.1199, 0.1202, 'N/A', 'N/A']
              ];
            break;
          case "HKD-CNH":
            rowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];
            rateData = [
                [1.1326, 1.1301, 1.128, 1.1254, 1.1188, 1.1147],
                [1.1336, 1.1319, 1.1304, 1.1287, 1.1248, 1.123],
                [1.1344, 1.1333, 1.1324, 1.1313, 1.1297, 1.1296],
                [1.1352, 1.1345, 1.1341, 1.1335, 1.1338, 1.1351],
                [1.1358, 1.1356, 1.1356, 1.1355, 1.1374, 1.1399],
                [1.1365, 1.1366, 1.137, 1.1373, 1.1406, 1.1441],
                [1.137, 1.1376, 1.1383, 1.1389, 1.1435, 'N/A'],
                [1.1375, 1.1384, 1.1395, 1.1404, 'N/A', 'N/A'],
                [1.138, 1.1393, 1.1406, 1.1418, 'N/A', 'N/A']
              ];
              break;
          case "CNH-HKD":
            rowHeader = ['2.0%', '2.5%', '3.0%', '3.5%', '4.0%', '4.5%', '5.0%', '5.5%', '6.0%'];
            rateData = [
                [0.8829, 0.8849, 0.8865, 0.8886, 0.8938, 0.8971],
                [0.8821, 0.8835, 0.8846, 0.886, 0.889, 0.8905],
                [0.8815, 0.8824, 0.8831, 0.8839, 0.8852, 0.8853],
                [0.8809, 0.8814, 0.8818, 0.8822, 0.882, 0.881],
                [0.8804, 0.8806, 0.8806, 0.8807, 0.8792, 0.8773],
                [0.8799, 0.8798, 0.8795, 0.8793, 0.8767, 0.874],
                [0.8795, 0.879, 0.8785, 0.878, 0.8745, 'N/A'],
                [0.8791, 0.8784, 0.8776, 0.8769, 'N/A', 'N/A'],
                [0.8787, 0.8777, 0.8767, 0.8758, 'N/A', 'N/A']
              ];
            break;
          default:
            rateData = [
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
              ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']
            ];
        }
        hot.updateSettings({
          rowHeaders: rowHeader
        });
        hot.loadData(rateData);
        var series = dpsChart.series;
        for (let i = 0; i < series.length; i++) {
          let column = series[i];
          if (column.name === seq || column.name === inv) {
            column.show();
          } else {
            column.hide();
          }
        }
      }
    };

    $scope.convert2dp = function(){
      document.getElementById('convertAmount').value = document.getElementById('tempAmount').innerHTML;
    };

    //TODO: multiple listener
    // $scope.$onMany(['event:onStockChange', 'event:'], function(){
    //
    // });



    $scope.onStockChange = function(stockName) {
      if (stockName === '700 HK') {
        $scope.cal.dcdc.spotPrice = 242.800;
        //TODO: test in find sort mongodb
        // find({"underlying": "700 HK", "ko_barrier": 105})
        testing = DcdcData;
      } else {
        $scope.cal.dcdc.spotPrice = 192.000;
      }
      var series = dcdcChart.series;
      var navigatorIndex = series.length - 1;
      for (let i = 0; i < navigatorIndex; i++) {
        let column = series[i];
        if (column.name === stockName) {
          //series[navigatorIndex].data = column.data;
          column.showInNavigator = true;
          //dcdcChart.navigator.series = column;
          column.show();
        } else {
          column.showInNavigator = false;
          column.hide();
        }
      }
    };

    $scope.calculateConversionRate = function() {
      dps = $scope.cal.dps;
      var dpsDoc = DpsData.findOne({ depo_cur: dps.depositCurrency, link_cur: dps.linkedCurrency,
        tenor: JSON.parse(dps.tenor).name, interest_rate: dps.yieldPa});
      if (dpsDoc) {
        dps.conversionRate = dpsDoc.conversion_rate;
        document.getElementById('search_field').value = dpsDoc.conversion_rate;
        document.getElementById('search_button').click();
      } else {
        dps.conversionRate = undefined;
      }
    };

    $scope.calculateCouponPa = function() {
      dcdc = $scope.cal.dcdc;
      if (dcdc.barrierType === 'NONE') {
        var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
                          ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,
                          ki_barrier: null });
      } else {
        var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, strike: parseInt(dcdc.strikePrice), ko_type: dcdc.koType,
                          ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,
                          ki_barrier: parseInt(dcdc.kiBarrier) });
      }
      if (dcdcDoc) {
        dcdc.couponPa = dcdcDoc.coupon_pa;
      } else {
        dcdc.couponPa = undefined;
      }
    };

    $scope.calculateStrikePrice = function() {
      var dcdc = $scope.cal.dcdc;
      if (dcdc.barrierType === 'NONE') {
        var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
                          ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,
                          ki_barrier: null });
      } else {
        var dcdcDoc = DcdcData.findOne({ underlying: dcdc.linkedStock, coupon_pa: parseFloat(dcdc.couponPa), ko_type: dcdc.koType,
                          ko_barrier: parseInt(dcdc.koBarrier), tenor: parseInt(dcdc.tenor), barrier_type: dcdc.barrierType,
                          ki_barrier: parseInt(dcdc.kiBarrier) });
      }
      if (dcdcDoc) {
        dcdc.strikePrice = dcdcDoc.strike;
      } else {
        dcdc.strikePrice = undefined;
      }
    };

    $scope.resizeDiag = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'client/toggle.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'client/dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

    $scope.cal = {
      dps: {},
      dcdc: {
        scenario: 1,
      }
    };

    $scope.currencies = ('AUD, CAD, CNH, EUR, GBP, HKD, USD').split(', ').map(function(currency) {
      return {abbrev: currency};
    });

    $scope.dpsTenors = [
      {
        name: '1W',
        value: 0
      },{
        name: '2W',
        value: 1
      },{
        name: '3W',
        value: 2
      },{
        name: '1M',
        value: 3
      },{
        name: '2M',
        value: 4
      },{
        name: '3M',
        value: 5
      }
    ];

    $scope.dcdcTenors = [
      {
        name: '3M',
        value: 3
      }, {
        name: '6M',
        value: 6
      }, {
        name: '9M',
        value: 9
      }, {
        name: '12M',
        value: 12
      }
    ];

    $scope.stocks = ['700 HK', '388 HK'];

    $scope.koBarriers = ['95', '100', '105', '110'];

    $scope.koTypes = ['Daily', 'Period End'];

    $scope.kiBarriers = ['75', '78'];

    $scope.barrierTypes = ['NONE', 'AKI', 'EKI'];

    //dcdcview Button JS
    $scope.demo = {
      showTooltip: false,
      tipDirection: 'bottom'
    };

    $scope.demo.delayTooltip = undefined;
    $scope.$watch('demo.delayTooltip', function(val) {
      $scope.demo.delayTooltip = parseInt(val, 10) || 0;
    });

    $scope.linkedCurrencyFilter = function(inputCur) {
      return (inputCur.abbrev !== $scope.cal.dps.depositCurrency)
        && (!(inputCur.abbrev === 'USD' && $scope.cal.dps.depositCurrency === 'HKD')
        && (!(inputCur.abbrev === 'HKD' && $scope.cal.dps.depositCurrency === 'USD')));
    };

  });

  spcal.controller('AutoCompleteCtrl', function ($timeout, $q, $log) {
    var self = this;

    self.simulateQuery = true;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  // }
});


var themeIcons = function ($mdIconProvider) {

  $mdIconProvider
    .iconSet("social",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")

    .iconSet("action",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")

    .iconSet("communication",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")

    .iconSet("content",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")

    .iconSet("toggle",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")

    .iconSet("navigation",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")

    .iconSet("image",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

};

angular.module('spcal')
  .config(themeIcons);


spcal.controller('MatrixCtrl', function($mdDialog, $timeout, $scope){
    var searchFiled = document.getElementById('search_field');
    container = document.getElementById('example');
    hot = new Handsontable(container, {
      data: rateData,
      headerToolTips: true,
      rowHeaders: rowHeader,
      nestedHeaders: [
        [{label: 'Conversion Rate', colspan: 6}],
        ['1W', '2W', '3W', '1M', '2M', '3M']
      ],
      colWidths: 100,
      rowHeights: 40,
      search: {
        queryMethod: onlyExactMatch
      },
      currentRowClassName: 'selectedRow',
      currentColClassName: 'selectedCol',
      editor: false,
    });

    function onlyExactMatch(queryStr, value) {
      var matchFlag = false;

      if (queryStr.toString() === value.toString()){
        rowCnt = rowCntTmp;
        colCnt = colCntTmp;
        if (dps) {
          if (parseInt(colCnt) == parseInt(JSON.parse(dps.tenor).value)){
            matchFlag = true;
          }
        }
      }

      colCntTmp++;
      if (colCntTmp > 5){
        colCntTmp = 0;
        rowCntTmp++;
      }

      return matchFlag;
    }

    Handsontable.Dom.addEvent(search_button, 'click', function (event) {
      queryResult = hot.search.query(document.getElementById('search_field').value);
      hot.render();
      console.log(queryResult);
      hot.selectCell(queryResult[0].row, queryResult[0].col);
    });

    $timeout(function () {
      hot.selectCell(0,0);
      document.getElementById('toggleBtn').click();
      $mdDialog.cancel();
    }, 1);
});

spcal.controller('DiagramCtrl', function ($scope) {
  $.get('fxRate.csv', function (data) {
    // Create the chart
    dpsChart = Highcharts.chart('dpsChartContainer', {
      data: {
        csv: data
      },
      plotOptions: {
        series: {
          visible: false
        }
      },
      title: {
        text: 'Deposit Plus'
      },
      yAxis: {
        crosshair: true,
        title: {
          text: 'FX Rate'
        }
      }
    });
  });
  $.get('stockPrice.csv', function (data) {
    // Create the chart
    dcdcChart = Highstock.stockChart('dcdcChartContainer', {
      data: {
        csv: data
      },
      plotOptions: {
        series: {
          visible: false
        }
      },
      title: {
        text: 'DCDC'
      },
      yAxis: {
        title: {
          text: 'Stock Price'
        }
      }
    });
  });

});

spcal.controller('BarChartCtrl', function ($scope) {
  // Create the chart
  $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
  barChart = HighBarCharts.chart('barContainer', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Performance on Deposit Plus from Other Financial Institutions'
    },
    xAxis: {
      categories: ['HSBC', 'BOC', 'Standard Charter', 'Citi', 'Hang Seng']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Criteria Distribution'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true
    },
    plotOptions: {
      column: {
        stacking: 'percent'
      }
    },
    series: [{
      name: 'Return',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Stability',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Volatility',
      data: [3, 4, 4, 2, 5]
    },{
      name: 'Momentum',
      data: [6, 2, 4, 3, 1]
    }]
  })
  });
});


spcal.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple');
  })
  .controller('SubheaderAppCtrl', function($scope) {
    var imagePath = 'images/hsbc-icon.gif';
    $scope.infolinks = [
      {
        face : imagePath,
        what: 'Glossary Of Banking Terms',
        who: 'HSBC Personal Banking',
        notes: " A to Z guide on glossaries",
        link: "https://www.hsbc.com.hk/personal/help-and-support/glossary-of-banking-terms.html"
      },
      {
        face : imagePath,
        what: 'Deposit Plus',
        who: 'HSBC Personal Banking',
        notes: " Set up your Deposit Plus investment now",
        link: "https://www.hsbc.com.hk/personal/investments/structured-products/deposit-plus.html"
      },
    ];
    $scope.datalinks = [
      {
        face : imagePath,
        what: 'Deposit Interest Market Data',
        who: 'HSBC Personal Banking',
        notes: " Check the current interest rate of normal deposit",
        link: "https://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info/deposit-rates/interest-rates"
      },
      {
        face : imagePath,
        what: 'Equity Market Data',
        who: 'HSBC Personal Banking',
        notes: " Check the current market price of chosen equity",
        link: "http://www.personal.hsbc.com.hk/1/2/hk/investments/mkt-info"
      },
    ];
    $scope.videos = [
      {
        face : imagePath,
        what: 'Deposit Plus Overview',
        who: 'A Currency Linked Investment',
        notes: " Get to know the products before investing",
        link: '_-w3mMxkVdU'
      },
      {
        face : imagePath,
        what: 'Deposit Plus Example',
        who: 'A Currency Linked Investment',
        notes: " Get to know the products before investing",
        link: 'z3ZjrWkCrdY'
      },
      {
        face : imagePath,
        what: 'Deposit Plus Interest Calculation',
        who: 'A Currency Linked Investment',
        notes: " Get to know the products before investing",
        link: 'fBVv_BJ81bc'
      },
      {
        face : imagePath,
        what: 'Deposit Plus Risk',
        who: 'A Currency Linked Investment',
        notes: " Get to know the products before investing",
        link: 'K-QcjbuNnwg'
      },
      {
        face : imagePath,
        what: 'DCDC',
        who: 'An Equity Linked Investment',
        notes: " Get to know the products before investing",
        link: 'z3ZjrWkCrdY'
      },
      {
        face : imagePath,
        what: 'DCDC Example 1 - Auto Call',
        who: 'An Equity Linked Investment',
        notes: " Get to know the products before investing",
        link: 'z3ZjrWkCrdY'
      },
      {
        face : imagePath,
        what: 'DCDC Example 2 - Airbag',
        who: 'An Equity Linked Investment',
        notes: " Get to know the products before investing",
        link: 'z3ZjrWkCrdY'
      },
    ];
});

spcal.controller('AppCtrl', ['$interval',
    function($interval) {
      var self = this;

      self.activated = true;
      self.determinateValue = 30;

      // Iterate every 100ms, non-stop and increment
      // the Determinate loader.
      $interval(function() {

        self.determinateValue += 1;
        if (self.determinateValue > 100) {
          self.determinateValue = 30;
        }

      }, 100);
    }
  ]);

spcal.controller('videoCtrl',function($scope, $mdDialog){
  $scope.showAdvanced = function(ev, id) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'client/video.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    //player.videoId = id;
    videoToPlay = id;
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  onYouTubeIframeAPIReady = function () {
    // New Video Player, the first argument is the id of the div.
    // Make sure it's a global variable.
    if (videoToPlay) {
      player = new YT.Player("player", {
        height: "400",
        width: "600",
        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
        videoId: videoToPlay,
        // Events like ready, state change,
        events: {
          onReady: function (event) {
            // Play video when player ready.
            event.target.playVideo();
          }
        }
      });
      console.log(player);
    }
  }
  YT.load();
});
