const express = require("express");
const Condition = require("../models/condition");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");


const conditionsRouter = express.Router();

//Get all conditions

conditionsRouter.get("/", async function (req, res, next) {
  try {
    const conditions = await Condition.getConditions();
    return res.json({ conditions });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

// Add condition to user profile

conditionsRouter.post("/", validateAccessToken, async function (req, res, next) {
  const conId = req.body;
  const auth = req.auth;
  try {
    const newCondition = await Condition.addCondition(auth.payload.sub, conId);
    return res.json({ newCondition });
  } catch (err) {
    return next(err);
  }
})


module.exports = { conditionsRouter };