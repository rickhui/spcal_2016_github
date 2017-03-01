import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  //Insert pricing data from dcdc
  DcdcData = new Mongo.Collection("dcdc");
  var dcdcJson = JSON.parse(Assets.getText("dcdc.json"));
  dcdcJson.forEach(function (item) {
    let exists = DcdcData.findOne({ underlying: item.underlying, strike: item.strike, ko_type: item.ko_type, ko_barrier: item.ko_barrier, coupon_pa: item.coupon_pa, note_price: item.note_price, tenor: item.tenor, barrier_type: item.barrier_type, ki_barrier: item.ki_barrier });
    if(!exists) {
      DcdcData.insert(item);
    }
  });

});
