const express = require("express");
const Condition = require("../models/condition");



const conditionsRouter = express.Router();

//Get all conditions
  conditionsRouter.get("/", async function (req, res, next) {
    try {
      const conditions = await Condition.getConditions();
      console.log(conditions);
      return res.json({ conditions });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });


module.exports = { conditionsRouter };