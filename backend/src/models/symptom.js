"use strict";

const db = require("../db");

class Symptom {
//This is where all the condition queries would be set- only the get all is available to users, the rest is admin only
   
 // Get all symptoms 
    static async getSymptoms() {
        const result = await db.query(
            `SELECT name as "symptomName",
            description FROM symptoms`
        );

        const symptoms = result.rows.map(row => row.symptomName);

        return symptoms;

    }

// create daily symptom log
    static async createSymptomLog({user_id, symptom_id, severity}) {
        const result = await db.query(
            `INSERT INTO daily_symptoms_log
            (user_id, symptom_id, severity)
            VALUES ($1, $2, $3)`,
            [user_id, symptom_id, severity]
        );

        const symptomLog = result.rows[0];

        return symptomLog;
    }

// get symptom log by date
    static async getLogByDate({date, user_id}) {
        const result = await db.query(`
        SELECT FROM daily_symptoms_log
        WHERE log_date = $1 AND 
        user_id = $2`,
        [date, user_id]);


        const logByDate = result.rows[0];
        
        return logByDate;
    }

// get all dates of symptom log by symptom id
    static async getLogById({symptom_id, user_id}) {
        const result = await db.query(`
        SELECT FROM daily_symptoms_log
        WHERE symptom_id = $1 AND 
        user_id = $2`,
        [symptom_id, user_id]);

        const logBySymptom = result.rows;

        return logBySymptom;
    }

  


}

module.exports = Symptom;