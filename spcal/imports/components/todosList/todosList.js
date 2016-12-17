import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Tasks } from '../../api/tasks.js';

class TodosListCtrl {
  constructor($scope) {
     $scope.viewModel(this);

     this.helpers({
       tasks() {
      //    return Tasks.find({});
      // Show newest tasks at the top
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
       }
     })
   }
   addTask(newTask) {
   // Insert a task into the collection
    Tasks.insert({
      text: newTask,
      createdAt: new Date
    });

    // Clear form
    this.newTask = '';
  }


  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked
      },
    });
  }

  removeTask(task) {
    Tasks.remove(task._id);
  }
  // constructor() {
  //   this.tasks = [{
  //     text: 'This is task 1'
  //   }, {
  //     text: 'This is task 2'
  //   }, {
  //     text: 'This is task 3'
  //   }];
  // }
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
    // controller: TodosListCtrl
  });
