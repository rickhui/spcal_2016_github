import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
//import Handsontable from 'handsontable-pro/dist/handsontable.full';
import 'angular-material/angular-material.css';
//import 'handsontable-pro/dist/handsontable.full.css';

var Highcharts = require('highcharts');
var Highstock = require('highcharts/highstock');
require('highcharts/modules/data.js')(Highcharts);
require('highcharts/modules/data.js')(Highstock);

var spcal = angular.module('spcal',[
      angularMeteor,
      // 'ui.router',
      // 'angularUtils.directives.dirPagination',
      // 'uiGmapgoogle-maps',
      ngMaterial,
      'ngMessages',
      'ngSanitize'
]);

spcal.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('red')
      .primaryPalette('red');

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue');
    })

  .controller('ValidationCtrl', function ($scope, $mdDialog, $interval) {
    $scope.theme = 'red';

  var isThemeRed = true;

  $interval(function () {
    $scope.theme = isThemeRed ? 'blue' : 'red';

    isThemeRed = !isThemeRed;
  }, 2000);

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'client/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
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
    dp: {},
    dcdc: {}
  };

  $scope.currencies = ('AUD, CAD, CHF, CNY, EUR, GBP, HKD, JPY, NZD, SGD, USD').split(', ').map(function(currency) {
    return {abbrev: currency};
  });

  $scope.stocks = ['700 HK', '388 HK'];

  $scope.earlyCallPrices = ['No Early Call Allowed', '110% of Strike Price', '120% of Strike Price', '130% of Strike Price'];

  $scope.airbagPrices = [
    'No Airbag Added',
    '80% of Strike Price',
    '75% of Strike Price',
    '70% of Strike Price'
  ];

  //Preview Button JS
  $scope.demo = {
    showTooltip: false,
    tipDirection: 'bottom'
  };

  $scope.demo.delayTooltip = undefined;
  $scope.$watch('demo.delayTooltip', function(val) {
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;
  });

  $scope.linkedCurrencyFilter = function(inputCur) {
    return (inputCur.abbrev !== $scope.cal.dp.depositCurrency)
      && (!(inputCur.abbrev === 'USD' && $scope.cal.dp.depositCurrency === 'HKD')
      && (!(inputCur.abbrev === 'HKD' && $scope.cal.dp.depositCurrency === 'USD')));
  };
});

// (function () {
  // 'use strict';
  // angular
  //     .module('spcal')
  //     .controller('DemoCtrl', DemoCtrl);
  spcal.controller('AutoCompleteCtrl', function ($timeout, $q, $log) {

  // function DemoCtrl ($timeout, $q, $log) {
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


spcal.controller('MatrixCtrl', function($timeout, $scope){
  var data = [
    ["", "Ford", "Volvo", "Toyota", "Honda"],
    ["2016", 10, 11, 12, 13],
    ["2017", 20, 11, 14, 13],
    ["2018", 30, 15, 12, 13]
  ];

  var rateData = [
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

  var container = document.getElementById('example');
/*
  var hot = new Handsontable(container, {
    data: rateData,
    headerToolTips: true,
    rowHeaders: ['4.0%', '4.5%', '5.0%', '5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'],
    nestedHeaders: [
      [{label: 'Conversion Rate', colspan: 6}],
      ['1W', '2W', '3W', '1M', '2M', '3M']
    ],
    colWidths: 100,
    rowHeights: 40,
    currentRowClassName: 'selectedRow',
    currentColClassName: 'selectedCol',
    editor: false,
  });

   $timeout(function () {
     hot.selectCell(0,0);
   }, 2);
   */
});

spcal.controller('DiagramCtrl', function ($scope) {
  $.get('fxRate.csv', function (data) {
    // Create the chart
    Highcharts.chart('dpChartContainer', {
      data: {
        csv: data
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
    Highstock.stockChart('dcdcChartContainer', {
      data: {
        csv: data
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
  $.get('stockPrice.csv', function (data) {
    // Create the chart
    Highstock.stockChart('container_v2', {
      chart: {
        type: 'column'
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
    });
  });
});

spcal.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple');
  })
  .controller('SubheaderAppCtrl', function($scope) {
    var imagePath = 'images/hsbc-icon.gif';
    $scope.messages = [
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
    ];
});

spcal.controller('videoCtrl',function($scope, $mdDialog){
  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'client/video.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
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

  onYouTubeIframeAPIReady = function () {

        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        player = new YT.Player("player", {

            height: "400",
            width: "600",

            // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
            videoId: "wO_-MtWejRM",

            // Events like ready, state change,
            events: {

                onReady: function (event) {

                    // Play video when player ready.
                    event.target.playVideo();
                }

            }

        });

    };

    YT.load();
});
