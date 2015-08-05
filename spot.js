import request from "superagent";
import nconf from "nconf";

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

fetchSpotData({}, function(err, messages) {
  if(err) {
    console.log(err);
    return;
  }
  console.log(messages);
});
