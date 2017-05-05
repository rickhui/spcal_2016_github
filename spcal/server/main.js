import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //Insert pricing data from dcdc
  var dpsJson = JSON.parse(Assets.getText("dps.json"));
  dpsJson.forEach(function (item) {
    let exists = DpsData.findOne({ depo_cur: item.depo_cur, link_cur: item.link_cur, tenor: item.tenor, interest_rate: item.interest_rate, conversion_rate: item.conversion_rate });
    if(!exists) {
      DpsData.insert(item);
    }
  });

  //Insert pricing data from dcdc
  var dcdcJson = JSON.parse(Assets.getText("dcdc.json"));
  dcdcJson.forEach(function (item) {
    let exists = DcdcData.findOne({ underlying: item.underlying, strike: item.strike, ko_type: item.ko_type, ko_barrier: item.ko_barrier, coupon_pa: item.coupon_pa, tenor: item.tenor, barrier_type: item.barrier_type, ki_barrier: item.ki_barrier });
    if(!exists) {
      DcdcData.insert(item);
      console.log(item);
    } else {
      console.log("skipped");
    }
  });

});
