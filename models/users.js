const database = require("../db/database");

const { ObjectId } = require("mongodb");

const validator = require("email-validator");

const bcrypt = require("bcryptjs");

const users = {
    register: async function register(res, newUser) {
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

        return {
            email: email,
            password: password,
            message: "User successfully created.",
        };
    },
};

module.exports = users;
