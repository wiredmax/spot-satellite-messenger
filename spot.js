import path from "path";
import request from "superagent";
import async from "async";
import nconf from "nconf";
import express from "express";
import morgan from "morgan";
import db from "./model";
import {argv} from "yargs";

import React from "react";
import Router from "react-router";

import routes from "./routes";

nconf.file("./config.json");

const feedId = nconf.get("spot").feedId;

// Fetch data from spot.
function fetchSpotData(config, callback) {
  if(argv.dry) {
    var messages = require("./test/messages.js");
    callback(null, messages);
    return;
  }

  const spotUrl = `https://api.findmespot.com` +
    `/spot-main-web/consumer/rest-api/2.0/public/feed/${feedId}/message.json`;

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

// Run every 2.5 minutes as recommend in their API guidelines.
// http://faq.findmespot.com/index.php?action=showEntry&data=69
setInterval(function() {
  console.log("Checking spot API for new data...")
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
}, 2.5 * 60 * 1000);

const app = express();
app.use(morgan("dev"));

app.get("/api/messages.json", (req, res) => {
  db.message.list({}, (err, result) => {
    if(err) {
      res.json({Error: err});
      return;
    }
    res.json(result);
  });
});

app.use((req, res) => {
  Router.run(routes, req.path, (Root, state) => {
    res.send("<!DOCTYPE html>" + React.renderToString( <Root/> ));
  });
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
