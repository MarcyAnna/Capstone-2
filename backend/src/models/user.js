"use strict";

const db = require("../db");

class User {

    // register a new user and save info to database
    static async register( id, firstName, lastName, DOB, email ) {
        const result = await db.query(
            `INSERT INTO users
            (id, 
            first_name,
            last_name,
            dob,
            email
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name AS "firstName", last_name AS "lastName"`,
            [id, firstName, lastName, DOB, email],
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

    static async deleteUser(id) {
        const result  = await db.query(`DELETE FROM users WHERE id = $1 RETURNING id`,
        [id]);
        const user = result.rows[0];

        if (!user) throw error(`No user with id ${id}`);
    }


}

module.exports = User;