const express = require("express");
const User = require("../models/user");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");


const usersRouter = express.Router();

// get user by id 

usersRouter.get("/:id", validateAccessToken, async function (req, res, next) {
   console.log(req.params.id);
    try {
      const user = await User.getUser(req.params.id);
      console.log(user);
      return res.json({ user });
    } catch (err) {
  
      return next(err);
    }
  });

//get all users

  usersRouter.get("/", async function (req, res, next) {
    console.log("users route running");
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
  

// add new condition to user 


module.exports = { usersRouter };