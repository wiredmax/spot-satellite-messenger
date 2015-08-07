import mongoose from "mongoose";
import uuid from "node-uuid";
mongoose.connect("mongodb://localhost/spot");

const Message = mongoose.model("Message", {
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

const list = (params, callback) => {
  let message = mongoose.model("Message", Message);

  message.find({}, (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    var currentResult = result.map((msg) => {
      return {
        id: msg._id,
        spotId: msg.spotId,
        messengerId: msg.messengerId,
        messengerName: msg.messengerName,
        unixTime: msg.unixTime,
        messageType: msg.messageType,
        latitude: msg.latitude,
        longitude: msg.longitude,
        modelId: msg.modelId,
        showCustomMsg: msg.showCustomMsg,
        dateTime: msg.dateTime,
        batteryState: msg.batteryState,
        hidden: msg.hidden,
      }
    });
    callback(null, currentResult);
  });
};

module.exports = {
  create: create,
  info: info,
  list: list,
}
