const express = require("express");
const Symptom = require("../models/symptom");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");


const symptomsRouter = express.Router();

//Get all symptoms

  symptomsRouter.get("/", validateAccessToken,  async function (req, res, next) {
    console.log("symptoms route running");
    try {
      const symptoms = await Symptom.getSymptoms();
      console.log(symptoms);
      return res.json({ symptoms });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });

// get symptom log by date

// get symptom log by symptom id


module.exports = { symptomsRouter };