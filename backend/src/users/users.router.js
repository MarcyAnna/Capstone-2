const express = require("express");
const User = require("../models/user");


const usersRouter = express.Router();

/** GET /[id] => { user }
 *
 * Returns { firstName, lastName }
 *
 **/

router.get("/:id", async function (req, res, next) {
    try {
      const user = await User.getUser(req.params.id);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/", async function (req, res, next) {
    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (err) {
      return next(err);
    }
  });


module.exports = { usersRouter };