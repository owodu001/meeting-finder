const db = require("../models");

module.exports = {
  postExampleApi: async function(req, res) {
    const user = await db.userInfo.create(req.body);
    res.json(user);
  },
  api: function(app) {
    // Get all examples
    app.get("/api/user", function(req, res) {
      db.UserInfo.findAll({}).then(function(user) {
        res.json(user);
      });
    });

    // Get an example
    app.get("/api/user/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Example.findAll({ where: { id: req.params.id } }).then(function(
        dbExamples
      ) {
        console.log(dbExamples);
        res.json(dbExamples[0]);
      });
    });

    //add meeting route
    app.get("/api/user/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.UserInfo.update(
        { meeting_id: req.body.meetingId },
        { where: { id: req.params.id } }
      ).then(function(dbExamples) {
        console.log(dbExamples);
        res.json(dbExamples[0]);
      });
    });

    // Create a new example
    app.post("/api/user", this.postExampleApi);

    // Delete an example by id
    app.delete("/api/user/:id", function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(
        dbExample
      ) {
        res.json(dbExample);
      });
    });
  }
};
