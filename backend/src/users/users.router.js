const express = require("express");
const User = require("../models/user");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");


const usersRouter = express.Router();

// get user by id 

usersRouter.get("/", validateAccessToken, async function (req, res, next) {
  const auth = req.auth;
  console.log(auth.payload); //user id
  console.log(auth.payload["https://myhealth/email"]); //email
  try {
    const user = await User.getUser(auth.payload.sub);
    console.log(user);
    return res.json({ user });
  } catch (err) {

    return next(err);
  }
});

//get all users

usersRouter.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    console.log(users);
    return res.json({ users });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});
// register new user

usersRouter.post("/register", validateAccessToken, async function (req, res, next) {
  const values = { ...req.body };
  const auth = req.auth;
  try {
    const newUser = await User.register(auth.payload.sub,
      values.firstName,
      values.lastName,
      values.DOB,
      auth.payload["https://myhealth/email"]);
    return res.json({ newUser });
  } catch (err) {
    return next(err);
  }
})

// get symptom log by date

// get symptom log by symptom id



module.exports = { usersRouter };