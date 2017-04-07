var require = meteorInstall({"collections":{"dcdc.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// collections/dcdc.js                                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
DcdcData = new Mongo.Collection("dcdc");                             // 1
                                                                     //
DcdcData.allow({                                                     // 3
  insert: function insert() {                                        // 4
    if (Meteor.isServer) {                                           // 5
      return true;                                                   // 6
    } else {                                                         //
      return false;                                                  // 8
    }                                                                //
  },                                                                 //
  update: function update() {                                        // 11
    if (Meteor.isServer) {                                           // 12
      return true;                                                   // 13
    } else {                                                         //
      return false;                                                  // 15
    }                                                                //
  },                                                                 //
  remove: function remove() {                                        // 18
    if (Meteor.isServer) {                                           // 19
      return true;                                                   // 20
    } else {                                                         //
      return false;                                                  // 22
    }                                                                //
  }                                                                  //
});                                                                  //
///////////////////////////////////////////////////////////////////////

},"dps.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// collections/dps.js                                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
DpsData = new Mongo.Collection("dps");                               // 1
                                                                     //
DpsData.allow({                                                      // 3
  insert: function insert() {                                        // 4
    if (Meteor.isServer) {                                           // 5
      return true;                                                   // 6
    } else {                                                         //
      return false;                                                  // 8
    }                                                                //
  },                                                                 //
  update: function update() {                                        // 11
    if (Meteor.isServer) {                                           // 12
      return true;                                                   // 13
    } else {                                                         //
      return false;                                                  // 15
    }                                                                //
  },                                                                 //
  remove: function remove() {                                        // 18
    if (Meteor.isServer) {                                           // 19
      return true;                                                   // 20
    } else {                                                         //
      return false;                                                  // 22
    }                                                                //
  }                                                                  //
});                                                                  //
///////////////////////////////////////////////////////////////////////

}},"server":{"main.js":["meteor/meteor",function(require){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var _meteorMeteor = require('meteor/meteor');                        //
                                                                     //
_meteorMeteor.Meteor.startup(function () {                           // 3
  // code to run on server at startup                                //
  //Insert pricing data from dcdc                                    //
  var dpsJson = JSON.parse(Assets.getText("dps.json"));              // 6
  dpsJson.forEach(function (item) {                                  // 7
    var exists = DpsData.findOne({ depo_cur: item.depo_cur, link_cur: item.link_cur, tenor: item.tenor, interest_rate: item.interest_rate, conversion_rate: item.conversion_rate });
    if (!exists) {                                                   // 9
      DpsData.insert(item);                                          // 10
    }                                                                //
  });                                                                //
                                                                     //
  //Insert pricing data from dcdc                                    //
  var dcdcJson = JSON.parse(Assets.getText("dcdc.json"));            // 15
  dcdcJson.forEach(function (item) {                                 // 16
    var exists = DcdcData.findOne({ underlying: item.underlying, strike: item.strike, ko_type: item.ko_type, ko_barrier: item.ko_barrier, coupon_pa: item.coupon_pa, tenor: item.tenor, barrier_type: item.barrier_type, ki_barrier: item.ki_barrier });
    if (!exists) {                                                   // 18
      DcdcData.insert(item);                                         // 19
    }                                                                //
  });                                                                //
});                                                                  //
///////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".html"]});
require("./collections/dcdc.js");
require("./collections/dps.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
