import request from "superagent";
import nconf from "nconf";

nconf.file("./config.json");

const feedId = nconf.get("spot").feedId;

const spotUrl = "https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/" + feedId + "/message.json"

request
.get(spotUrl)
.end((err, res) => {
  if(err) {
    console.log(err);
  }
  const spot = JSON.parse(res.text);
  if(spot.response && spot.response.feedMessageResponse) {
    let messages = spot.response.feedMessageResponse.messages.message;
    if(messages.length) {
      console.log(messages);
    } else {
      console.log("No spot messages");
    }
  }
});
