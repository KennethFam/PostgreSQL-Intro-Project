const { body, validationResult } = require("express-validator");
const db = require("../models/queries");

const emptUserErr = "must not be blank."

const validateUser = [
    body("username").trim()
        .notEmpty().withMessage(`Username ${emptUserErr}`)
]

module.exports = {
    getUsers: async (req, res) => {
        const usernames = await db.getAllUsernames();
        console.log("Usernames: ", usernames);
        res.send("Usernames: " + usernames.map(user => user.username).join(", "));
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
    ]
};