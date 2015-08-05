import request from "superagent";
import async from "async";
import nconf from "nconf";
import db from "./model";
import {argv} from "yargs";

nconf.file("./config.json");

const feedId = nconf.get("spot").feedId;

// Fetch data from spot.
function fetchSpotData(config, callback) {
  if(argv.dry) {
    var messages = require("./test/messages.js");
    callback(null, messages);
    return;
  }

  const spotUrl = "https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/" + feedId + "/message.json";

  request
  .get(spotUrl)
  .end((err, res) => {
    if(err) {
      callback(err);
    }
    const spot = JSON.parse(res.text);
    if(spot.response && spot.response.feedMessageResponse) {
      let messages = spot.response.feedMessageResponse.messages.message;
      console.log(messages);
      callback(null, messages);
    }
  });
}

fetchSpotData({}, (err, messages) => {
  if(err) {
    console.log(err);
    return;
  }

  messages.forEach(message => {
    async.waterfall([
        // Check if message already exists in database.
        next => {
          db.message.info({
            spotId: message.id,
          }, next);
        },
        // Save or not the message.
        (result, next) => {
          if(!result) {
            db.message.create({
              spotId: message.id,
              messengerId: message.messengerId,
              messengerName: message.messengerName,
              unixTime: message.unixTime,
              messageType: message.messageType,
              latitude: message.latitude,
              longitude: message.longitude,
              modelId: message.modelId,
              showCustomMsg: message.showCustomMsg,
              dateTime: message.dateTime,
              batteryState: message.batteryState,
              hidden: message.hidden,
            }, next);
            next();
            return;
          }
          next();
        },
    ], (err) => {
      if(err) {
        console.log(err);
      }
    });
  });
});
