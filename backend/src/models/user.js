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
    //get a user profile using id from authentication token
    static async getUser(id) {
        const result = await db.query(
            `SELECT first_name AS "firstName",
            last_name AS "lastName"
            FROM users WHERE id = $1`,
            [id],
        );
        const user = result.rows[0];

        return user;
    }

    static async findAll() {
        const result = await db.query(
              `SELECT * FROM users`,
        );
    
        return result.rows;
      }

}

module.exports = User;