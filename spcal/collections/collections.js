import jquery from 'meteor/jquery'
import babyParse from 'babyparse'

DcdcData = new Mongo.Collection("dcdc");
/*
Meteor.methods({
  importFromCSV(data) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let exists = DcdcData.findOne({ })
    }
  }
});

$(document).ready(function () {
  $.get('dcdcSource.csv', function(data) {
    var dcdcJson = babyParse.parse(data);
    console.log(dcdcJson);
  });
});
*/
