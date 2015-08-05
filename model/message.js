import mongoose from "mongoose";
import uuid from "node-uuid";
mongoose.connect("mongodb://localhost/spot");

var Message = mongoose.model("Message", {
  _id: String,
  spotId: Number,
  messengerId: String,
  messengerName: String,
  unixTime: Number,
  messageType: String,
  latitude: String,
  longitude: String,
  modelId: String,
  showCustomMsg: String,
  dateTime: String,
  batteryState: String,
  hidden: Number,
});

const create = (spotData, callback) => {
  let message = new Message({
    _id: uuid.v4(),
    spotId: spotData.spotId,
    messengerId: spotData.messengerId,
    messengerName: spotData.messengerName,
    unixTime: spotData.unixTime,
    messageType: spotData.messageType,
    latitude: spotData.latitude,
    longitude: spotData.longitude,
    modelId: spotData.modelId,
    showCustomMsg: spotData.showCustomMsg,
    dateTime: spotData.dateTime,
    batteryState: spotData.batteryState,
    hidden: spotData.hidden,
  });
  message.save((err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, {});
  });
};

const info = (params, callback) => {
  let message = mongoose.model("Message", Message);
  let query = {};
  if(params.id) {
    query = {_id: params.id};
  }
  if(params.spotId) {
    query = {spotId: params.spotId};
  }
  message.findOne(query, (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    if(!result) {
      callback(null, null);
      return;
    }

    callback(null, {
      id: result._id,
      spotId: result.spotId,
      messengerId: result.messengerId,
      messengerName: result.messengerName,
      unixTime: result.unixTime,
      messageType: result.messageType,
      latitude: result.latitude,
      longitude: result.longitude,
      modelId: result.modelId,
      showCustomMsg: result.showCustomMsg,
      dateTime: result.dateTime,
      batteryState: result.batteryState,
      hidden: result.hidden,
    });
  });
};

module.exports = {
  create: create,
  info: info,
}
