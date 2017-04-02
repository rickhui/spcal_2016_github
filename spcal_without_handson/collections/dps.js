  DpsData = new Mongo.Collection("dps");

  DpsData.allow({
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
