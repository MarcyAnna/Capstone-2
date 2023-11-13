"use strict";

const db = require("../db");

class Condition {
//This is where all the condition queries would be set- only the get all is available to users, the rest is admin only
   
 // Get all conditions 
    static async getConditions() {
        const result = await db.query(
            `SELECT name as "conditionName",
            description FROM conditions`
        );

        return result.rows;
    }

  


}

module.exports = Condition;