  DcdcData = new Mongo.Collection("dcdc");

  DcdcData.allow({
    insert() {
      if (Meteor.isServer) {
        return true;
      } else {
        return false;
      }
    },
    update() {
      if (Meteor.isServer) {
        return true;
      } else {
        return false;
      }
    },
    remove() {
      if (Meteor.isServer) {
        return true;
      } else {
        return false;
      }
    }
  });
