"use strict";

const db = require("../db");

class Condition {
//This is where all the condition queries would be set- only the get all is available to users, the rest is admin only
   
 // Get all conditions 
    static async getConditions() {
        const result = await db.query(
            `SELECT id,
            name as "conditionName",
            description FROM conditions`
        );

        return result.rows;
    }

 //add a condition to user profile
    static async addCondition(user_id, condition_id) {
        console.log('Query for adding condition', user_id, condition_id);
        const result = await db.query(`
        INSERT INTO users_conditions 
        (user_id, condition_id) VALUES 
        ($1, $2)`,
        [user_id, condition_id.conditionId]);
        
        const newCondition = result.rows[0];
        return newCondition;     
        
    }

  


}

module.exports = Condition;