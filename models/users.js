const database = require("../db/database");

const { ObjectId } = require("mongodb");

const validator = require("email-validator");

const bcrypt = require("bcryptjs");

const users = {
    register: async function register(body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return {
                errors: {
                    status: 400,
                    message: "Email or password is missing",
                },
            };
        }

        if (!validator.validate(email)) {
            return {
                errors: {
                    status: 400,
                    message: "Email has an invalid format",
                },
            };
        }

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                return {
                    errors: {
                        status: 500,
                        message: "Could not hash password",
                    },
                };
            }
            return {
                data: hash,
            };
        });
    },
};

module.exports = users;
