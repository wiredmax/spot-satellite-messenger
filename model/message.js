import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/spot");

var Message = mongoose.model("Message", {
  id: String,
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
    id: spotData.id,
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

module.exports = {
  create: create,
}
