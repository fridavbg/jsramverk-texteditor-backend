const database = require("../db/database");

const { ObjectId } = require("mongodb");

const validator = require("email-validator");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const users = {
    register: async function register(newUser) {
        const email = newUser.email;
        const password = newUser.password;

        if (!email || !password) {
            return {
                errors: {
                    status: 400,
                    message: "E-mail or password is missing",
                },
            };
        }

        if (!validator.validate(email)) {
            return {
                errors: {
                    status: 400,
                    message: "E-mail is not in correct format",
                },
            };
        }
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return {
                    errors: {
                        status: 500,
                        message: "Could not hash password",
                    },
                };
            }
            let db = await database.getDb("users");

            console.log("HASH:", hash);
            return {
                data: hash,
            };
        });
    },
};

module.exports = users;
