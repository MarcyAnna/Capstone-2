const express = require("express");
const User = require("../models/user");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");


const usersRouter = express.Router();

/** GET /[id] => { user }
 *
 * Returns { firstName, lastName }
 *
 **/

usersRouter.get("/:id", validateAccessToken, async function (req, res, next) {
   
    try {
      const user = await User.getUser(req.params.id);
      return res.json({ user });
    } catch (err) {
  
      return next(err);
    }
  });

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


module.exports = { usersRouter };