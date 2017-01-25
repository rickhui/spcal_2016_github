import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularUI from 'angular-ui-bootstrap';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
// import 'angular-messages/angular-messages.min.js';
import 'angular-material/angular-material.css';
import ngDataTable from 'angular-material-data-table';
import jquery from 'jquery'

var Highcharts = require('highcharts/highstock');

var spcal = angular.module('spcal',[
  ngMaterial,
  ngMessages,
  angularMeteor,
  angularUI,
  ngDataTable
]);

spcal.controller('ValidationCtrl', function ($scope) {
  $scope.cal = {
    //tradeDate: new Date(),
    //currencyPair: 'AUD/HKD',
    //maturityDate: new Date(),
    amountDeposit: '10000',
    //currency: 'USD',
    interestRate: '5%',
    fixValue: 'Linked to Currency Exchange',
    refValue: 6.400,
    determinationDate: new Date(),
    closingPrice: 'The official closing price of the MTR shares on the Determination Data as published by the Exchange',
    cpnRate: '4.37%',
    spotPrice: '$98.5',
    stock: '0700.HK'
  };
  $scope.currencies = ('AUD, CAD, CHF, CNY, EUR, GBP, HKD, JPY, NZD, SGD, USD').split(', ').map(function(currency) {
    return {abbrev: currency};
  });
  $scope.minDate = new Date();
});

//TODO: Filter for linked currencies after choosing deposit currency
/*
angular.module('spcal', []).filter('linkedCurrencyFilter', function() {
  return function(depoCur) {
    var filteredLinkCur = [];
    var originalLinkCur = ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'HKD', 'JPY', 'NZD', 'SGD', 'USD'];
    //angular.forEach($scope.currencies, function())
    for(var i = 0; i < originalLinkCur.length; i++) {
      var linkCur = originalLinkCur[i];
      if (linkCur === depoCur) {
        continue;
      } else if ((linkCur === "USD" && depoCur === "HKD") || (linkCur === "HKD" && depoCur === "USD")) {
        continue;
      }
      filteredLinkCur.push(linkCur);
    }
    return filteredLinkCur;
  };
});
*/
// (function () {
  // 'use strict';
  // angular
  //     .module('spcal')
  //     .controller('DemoCtrl', DemoCtrl);

  //TODO: Calculate tenor

  //TODO: Add controller to config highcharts
  spcal.controller('DiagramCtrl', function ($scope) {
      $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
          // Create the chart
          Highcharts.stockChart('container', {
              rangeSelector: {
                  selected: 1
              },
              title: {
                  text: 'AUD-HKD FX RATE',
              },
              series: [{
                  name: 'AUD-HKD FX RATE',
                  data: data,
                  type: 'area',
                  threshold: null,
                  tooltip: {
                      valueDecimals: 2
                  },
                  fillColor: {
                      linearGradient: {
                          x1: 0,
                          y1: 0,
                          x2: 0,
                          y2: 1
                      },
                      stops: [
                          [0, Highcharts.getOptions().colors[0]],
                          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                      ]
                  }
              }]
          });
      });
  });

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

// ###### Datatable need to connect to DB ######
// angular.module('spcal').controller('sampleController', ['$nutrition', '$scope', function ($nutrition, $scope) {
//   'use strict';
//
//   $scope.selected = [];
//
//   $scope.query = {
//     order: 'name',
//     limit: 5,
//     page: 1
//   };
//
//   function success(desserts) {
//     $scope.desserts = desserts;
//   }
//
//   $scope.getDesserts = function () {
//     $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
//   };
//
// }]);
