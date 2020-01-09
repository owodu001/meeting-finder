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

    //BEGIN AUTHORIZATION ROUTES-----------------------------------------------------------------------------------

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
      // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
      // So we're sending the user back the route to the members page because the redirect will happen on the front end
      // They won't get this or even be able to access this page if they aren't authed
      const sendBack = { url: "/members", user: req.body.username }; //do this to send back the meeting ID to then display on the user's member page
      res.json(sendBack);
    });
    //
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
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
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
          username: req.user.username,
          id: req.user.id
        });
      }
    });
  }
};
