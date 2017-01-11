import angular from 'angular';
import angularMeteor from 'angular-meteor';
import '/imports/components/materialize/materialize.js';

angular.module('materializeApp', ['ui.materialize', angularMeteor])
    .controller('BodyController', ["$scope", function ($scope) {
        $scope.select = {
            value: "Option1",
            choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
        };
    }]);
