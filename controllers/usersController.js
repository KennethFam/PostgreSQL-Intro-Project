const { body, validationResult } = require("express-validator");

const emptUserErr = "must not be blank."

const validateUser = [
    body("username").trim()
        .notEmpty().withMessage(`Username ${emptUserErr}`)
]

module.exports = {
    getUsers: (req, res) => {
        console.log("usernames will be logged here - wip");
    },
    getUserForm: (req, res) => {
        res.render("createUser", {title: "Add User"})
    },
    postNewUser: [
        validateUser, 
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("createUser", {
                    title: "Add User",
                    errors: errors.array()
                });
            }
            console.log("username to be saved: ", req.body.username)
            res.redirect("/");
        }
    ]
};