const express = require("express");
const Symptom = require("../models/symptom");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");


const symptomsRouter = express.Router();

//Get all symptoms

symptomsRouter.get("/", validateAccessToken, async function (req, res, next) {
  try {
    const symptoms = await Symptom.getSymptoms();
    return res.json({ symptoms });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

// create daily symptom log
symptomsRouter.post("/", validateAccessToken, async function (req, res, next) {
  const values = req.body.symptom;
  const auth = req.auth;
  try {
    const logSymptom = await Symptom.createSymptomLog(auth.payload.sub, values.symptom, values.value);
    return res.json({ logSymptom });
  } catch (err) {
    return next(err);
  }
});

symptomsRouter.get("/name", validateAccessToken, async function (req, res, next) {
  const symptomName = req.query.name;
  const auth = req.auth;
  try {
    const getLog= await Symptom.getLogByName(auth.payload.sub, symptomName);
    return res.json({ getLog });
  } catch (err) {
    return next(err);
  }
});

symptomsRouter.get("/date", validateAccessToken, async function (req, res, next) {
  const symDate = req.query.date;
  const auth = req.auth;
  try {
    const getLog= await Symptom.getLogByDate({date: symDate, user_id: auth.payload.sub});
    return res.json({ getLog });
  } catch (err) {
    return next(err);
  }
});


module.exports = { symptomsRouter };