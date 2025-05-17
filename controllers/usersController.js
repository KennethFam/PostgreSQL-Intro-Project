const { body, validationResult } = require("express-validator");
const db = require("../models/queries");

const emptUserErr = "must not be blank."

const validateUser = [
    body("username").trim()
        .notEmpty().withMessage(`Username ${emptUserErr}`)
]

module.exports = {
    getUsers: async (req, res) => {
        var usernames = "";
        if (req.query.search) {
            usernames = await db.searchUser(req.query.search);
        } else {
            usernames = await db.getAllUsernames();
        }
        console.log("Username(s): ", usernames);
        res.send("Username(s): " + usernames.map(user => user.username).join(", "));
    },
    getUserForm: (req, res) => {
        res.render("createUser", {title: "Add User"})
    },
    postNewUser: [
        validateUser, 
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("createUser", {
                    title: "Add User",
                    errors: errors.array()
                });
            }
            const { username } = req.body;
            await db.insertUsername(username);
            res.redirect("/");
        }
    ],
    deleteAllUsers: async (req, res) => {
        await db.deleteAllUsers();
        res.redirect("/");
    }
};