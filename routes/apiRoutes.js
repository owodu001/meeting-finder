var db = require("../models");
module.exports = {
  postExampleApi: async function(req, res) {
    const dbExample = await db.Example.create(req.body);
    res.json(dbExample);
  },
  api: function(app) {
    // Get all
    app.get("/api/users", function(req, res) {
      db.UserInfo.findAll({}).then(function(dbExamples) {
        res.json(dbExamples);
      });
    });
    // Get an example
    app.get("/api/users/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.UserInfo.findAll({ where: { id: req.params.id } }).then(function(
        dbExamples
      ) {
        console.log(dbExamples);
        res.json(dbExamples[0]);
      });
    });
    //put request for adding favorite meeting
    app.put("/api/users/username", function(req, res) {
      console.log(req.params.username + "username" + req.body.newMeeting);
      db.UserInfo.update(
        { meeting_id: req.body.newMeeting },
        { where: { username: req.params.username } }
      ).then(function(dbExample) {
        console.log(dbExample);
        res.json(dbExample);
      });
    });
    // Create a new example
    app.post("/api/examples", this.postExampleApi);
    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(
        dbExample
      ) {
        res.json(dbExample);
      });
    });
  }
};
