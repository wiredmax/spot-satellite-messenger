import request from "superagent";
import nconf from "nconf";
import db from "./model";

nconf.file("./config.json");

const feedId = nconf.get("spot").feedId;

const spotUrl = "https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/" + feedId + "/message.json"

// Fetch data from spot.
function fetchSpotData(config, callback) {
  request
  .get(spotUrl)
  .end((err, res) => {
    if(err) {
      callback(err);
    }
    const spot = JSON.parse(res.text);
    if(spot.response && spot.response.feedMessageResponse) {
      let messages = spot.response.feedMessageResponse.messages.message;
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
    }, (err, result) => {
      if(err) {
        console.log(err);
        return;
      }
    });
  });
});
