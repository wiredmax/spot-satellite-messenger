import db from "../model";

module.exports = function (app) {
  app.get("/api/messages.json", (req, res) => {
    db.message.list({}, (err, result) => {
      if(err) {
        res.json({Error: err});
        return;
      }
      res.json(result);
    });
  });
}
