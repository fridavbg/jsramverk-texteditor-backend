const database = require("../db/database");

const { ObjectId } = require("mongodb");

const validator = require("email-validator");

const bcrypt = require("bcryptjs");

const users = {
    register: async function register(res, newUser) {
        const user = {
            email: newUser.email,
            password: newUser.password,
        };

        if (!user.email || !user.password) {
            return res.status(400).json({
                errors: {
                    status: 400,
                    message: "E-mail or password is missing",
                },
            });
        }
        return user;
    },
};

module.exports = users;
