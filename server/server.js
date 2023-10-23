require("dotenv").config();
const PORT = 3000;
const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const articleController = require("./controllers/articleController");
const cors = require("cors");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.PG_URI);

app.use(cors());

app.use(express.json());

app.use("/build", express.static(path.resolve(__dirname, "../build")));

app.use(express.static(path.resolve(__dirname, "../client")));

//route to homepage
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../client/src/index.html"));
});

app.get("/login", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../client/src/login.html"));
});

//route for github OAuth
// app.get("/getAccessToken", articleController.authorizeUser, (req, res) => {
//   res.status(200) /*.json(res.locals.authorizeUser)*/;
// });

// //route to loggedIn
app.get("/user", articleController.getUserPage, (req, res) => {
  res.status(200).json(res.locals.user);
});

// grab all articles route
app.get("/article", articleController.feedArticles, (req, res) => {
  console.log("get articles succesful");
  res.status(200).send(res.locals.articles);
});

//add article route
app.post("/article", articleController.addArticle, (req, res) => {
  res.status(200).send(res.locals.article);
});

//delete article route
app.delete("/article", articleController.deleteArticle, (req, res) => {
  console.log("article deleted, middleware completed");
  res.status(200).json({});
});
// GIT HUB AUTH
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const [user, created] = await user.findOrCreate(
        { where: { username: profile.id } },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("session user", req.session.passport.user);
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

//404 route
app.all("*", (req, res) => {
  res.status(404).send("The page you are looking for does not exist");
});

//global error handler
app.use((err, req, res, next) => {
  //define default error object
  const defaultErr = {
    log: "Express middleware error", //server sees this message
    status: 500,
    message: { err: "An error occured" }, //client sees this message
  };
  //assign default error object to an errorObj variable
  const errorObj = Object.assign(defaultErr, err);
  //return json response including error object status and error object message
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => console.log("The server is listening on port 3000"));
