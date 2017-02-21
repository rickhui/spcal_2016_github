import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import Handsontable from 'handsontable-pro/dist/handsontable.full';
import 'angular-material/angular-material.css';
import 'handsontable-pro/dist/handsontable.full.css';

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
    tradeDate: new Date(),
    currencyPair: 'AUD/HKD',
    maturityDate: new Date(),
    amountDeposit: '$10000',
    currency: 'USD',
    interestRate: '5%',
    fixValue: 'Linked to Currency Exchange',
    refValue: 6.400,
    determinationDate: new Date(),
    closingPrice: 'The official closing price of the MTR shares on the Determination Data as published by the Exchange',
    cpnRate: '4.37%',
    spotPrice: '$98.5',
    stock: '0700.HK',
    yieldPA: 50,
    finRate: 30
  };
  $scope.currencies = ('AUD CNY JPY USD EUR').split(' ').map(function(currency) {
       return {abbrev: currency};
  });

  //Preview Button JS
  $scope.demo = {
    showTooltip: false,
    tipDirection: 'bottom'
  };

  $scope.demo.delayTooltip = undefined;
  $scope.$watch('demo.delayTooltip', function(val) {
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;
  });
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


spcal.controller('matrixCtrl', function($timeout, $scope){
  var data = [
    ["", "Ford", "Volvo", "Toyota", "Honda"],
    ["2016", 10, 11, 12, 13],
    ["2017", 20, 11, 14, 13],
    ["2018", 30, 15, 12, 13]
  ];

  var container = document.getElementById('example');
  var hot = new Handsontable(container, {
    data: Handsontable.helper.createSpreadsheetData(100, 100),
    rowHeaders: true,
    colHeaders: true,
    currentRowClassName: 'selectedRow',
    currentColClassName: 'selectedCol',
    editor: false,
  });

   $timeout(function () {
     hot.selectCell(0,0);
   }, 2);
});

spcal.controller('DiagramCtrl', function ($scope) {
  $.get('fxRate.csv', function (data) {
    // Create the chart
    Highcharts.chart('container', {
      chart: {
        height: 400
      },
      title: {
        text: 'FX RATE'
      },
      subtitle: {
        text: ''
      },
      data: {
        csv: data
      },
      rangeSelector: {
        selected: 1
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
