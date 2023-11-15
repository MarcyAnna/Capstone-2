const db = require("../db");
const User = require("../models/user");


describe("Test User class", function () {
    test("can register", async () => {
        let u = await User.register(
            "12345678",
            "Test",
             "User",
            "12/12/1212",
            "testuser@gmail.com",
        );
        expect(u.id).toBe("12345678");
    });

    test("can get by id", async () => {
        let u = await User.getUser("12345678");
        expect(u.firstName).toBe("Test");
    })


    test("can delete", async () => {
        await User.deleteUser("12345678");
        const res = await db.query("SELECT * FROM users WHERE id = '12345678'");
        expect(res.rows.length).toEqual(0);
    })
})