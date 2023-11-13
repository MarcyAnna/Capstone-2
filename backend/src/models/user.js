"use strict";

const db = require("../db");

class User {

    // register a new user and save info to database
    static async register( {id, firstName, lastName, email, DOB} ) {
        const result = await db.query(
            `INSERT INTO users
            (id, 
            first_name,
            last_name,
            email,
            dob)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING first_name AS "firstName", last_name AS "lastName"`,
            [id, firstName, lastName, email, DOB],
        );
        const user = result.rows[0];
        return user;
    }
    //get a user profile and associated conditions using id from authentication token 
    static async getUser(id) {
        const result = await db.query(
            `SELECT first_name AS "firstName",
            last_name AS "lastName",
            comments AS user_comments
            FROM users WHERE id = $1`,
            [id],
        );
        const user = result.rows[0];

      if (user) {
        const userConditions = await db.query(
            `SELECT c.name AS condition_name 
            FROM users_conditions AS uc
            LEFT JOIN conditions AS c ON uc.condition_id = c.id
            WHERE uc.user_id = $1`,
            [id]);

        user.conditions = userConditions.rows.map(row => row.condition_name);
    }

        return user;
    }
    //add a condition to user profile
    static async addCondition(user_id, condition_id) {
        const result = await db.query(`
        INSERT INTO users_conditions 
        (user_id, condition_id) VALUES 
        ($1, $2)`,
        [user_id, condition_id]);
        
        const newCondition = result.rows[0];
        return newCondition;     
        
    }


}

module.exports = User;