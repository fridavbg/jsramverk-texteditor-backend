const database = require("../db/database");

const { ObjectId } = require("mongodb");

const validator = require("email-validator");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const users = {
    register: async function register(res, newUser) {
        const email = newUser.email;
        const password = newUser.password;

        if (!email || !password) {
            return res.status(400).json({
                errors: {
                    status: 400,
                    message: "E-mail or password is missing",
                },
            });
        }

        if (!validator.validate(email)) {
            return res.status(400).json({
                errors: {
                    status: 400,
                    message: "E-mail is not in correct format",
                },
            });
        }
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        message: "Could not hash password",
                    },
                });
            }

            return res.status(201).json({
                user: {
                    email: email,
                    password: hash,
                },
            });
        });
    },
};

module.exports = users;
