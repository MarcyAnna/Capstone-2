"use strict";

const db = require("../db");

class Symptom {
    //This is where all the symptom queries would be set

    // Get all symptoms 
    static async getSymptoms() {
        const result = await db.query(
            `SELECT name as "symptomName",
            description FROM symptoms
            ORDER BY name`
        );

        const symptoms = result.rows.map(row => row.symptomName);

        return symptoms;

    }

    // create daily symptom log
    static async createSymptomLog(user_id, symptomName, severity) {
        
            const result = await db.query(
                `INSERT INTO daily_symptoms_log
            (user_id, symptom_name, severity)
            VALUES ($1, $2, $3)`,
                [user_id, symptomName, severity]
            );

            const symptomLog = result.rows[0];

            return symptomLog;
    };

    // get symptom log by date
    static async getLogByDate({ date, user_id }) {
       
        const result = await db.query(`
        SELECT symptom_name, severity FROM daily_symptoms_log
        WHERE log_date = $1::date AND 
        user_id = $2`,
            [date, user_id]);


        const logByDate = result.rows;
        
        return logByDate;
    }

    // get all dates of symptom log by symptom id
    static async getLogByName(  user_id , symptom_name) {
      
        const result = await db.query(`
        SELECT log_date FROM daily_symptoms_log
        WHERE symptom_name = $1 AND 
        user_id = $2`,
            [symptom_name, user_id]);

        const logBySymptom = result.rows;

        return logBySymptom;
    }

}

module.exports = Symptom;