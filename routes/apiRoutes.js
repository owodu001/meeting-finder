const db = require("../models");
const passport = require("../config/passport");

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
    app.get("/api/users/:username", function(req, res) {
      console.log(req.params.username);
      db.UserInfo.findAll({
        where: { username: req.params.username },
        attribute: "meeting_id"
      }).then(function(userData) {
        console.log(req.params.username + ">>>>>>>>>>>>>>>>>>>>>" + userData);
        res.json(userData[0]);
      });
    });
    //put request for adding favorite meeting
    app.put("/api/users/:username", function(req, res) {
      console.log(
        req.params.username + " ---- username ----- " + req.body.newValue
      );
      db.UserInfo.update(
        { meeting_id: req.body.newValue },
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

    //BEGIN AUTHORIZATION ROUTES-----------------------------------------------------------------------------------

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
      res.json("/members");
    });

    app.post("/api/signup", function(req, res) {
      console.log(req.body);
      db.UserInfo.create({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        days_sober: req.body.days_sober,
        sponsor_first: req.body.sponsor_first,
        Sponsor_first: req.body.Sponsor_last,
        sponsor_cell: req.body.sponsor_cell,
        meeting_id: req.body.meeting_id
      })
        .then(function() {
          res.redirect(307, "/api/login");
        })
        .catch(function(err) {
          console.log(err);
          res.json(err);
          // res.status(422).json(err.errors[0].message);
        });
    });
    //
    // Route for logging user out
    app.get("/logout", function(req, res) {
      req.logout();
      res.redirect("/");
    });
    //
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
      if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
      } else {
        res.json({
          username: req.user.username,
          meeting_id: req.user.meeting_id
        });
      }
    });
  }
};
