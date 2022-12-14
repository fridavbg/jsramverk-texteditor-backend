const database = require("../db/database");

const validator = require("email-validator");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const jwt = require("jsonwebtoken");

const users = {
    getAllUsers: async function getAllUsers() {
        let db = await database.getDb("users");

        try {
            const allUsers = await db.collection.find().toArray();

            return allUsers;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                },
            };
        } finally {
            await db.client.close();
        }
    },
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

            let db = await database.getDb("users");

            try {
                const user = {
                    email: email,
                    password: hash,
                };

                await db.collection.insertOne(user);
                return res.status(201).json({
                    data: {
                        message: "User has been registered",
                    },
                });
            } catch (error) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        message: "Unable to register user",
                    },
                });
            } finally {
                await db.client.close();
            }
        });
    },
    login: async function login(res, userInfo) {
        const email = userInfo.email;
        const password = userInfo.password;

        if (!email || !password) {
            return res.status(400).json({
                errors: {
                    status: 400,
                    message: "E-mail or password is missing",
                },
            });
        }
        let db = await database.getDb("users");

        try {
            const query = { email: email };

            const user = await db.collection.findOne(query);

            if (user) {
                return users.comparePasswords(res, user, password);
            }

            return res.status(401).json({
                data: {
                    message: "User does not exist.",
                },
            });
        } catch (error) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    message: "Could not find user",
                },
            });
        } finally {
            await db.client.close();
        }
    },
    comparePasswords: async function comparePasswords(res, user, password) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        message: "Could not decrypt password.",
                    },
                });
            }

            if (result) {
                const payload = { email: user.email };
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign(payload, secret, { expiresIn: "1h" });

                return res.status(201).json({
                    data: {
                        _id: user["_id"],
                        email: user.email,
                        token: token,
                        msg: "User logged in",
                    },
                });
            }

            return res.status(401).json({
                errors: {
                    status: 401,
                    message: "Password not correct",
                },
            });
        });
    },
    checkToken: function checkToken(req, res, next) {
        const token = req.headers["x-access-token"];

        // eslint-disable-next-line no-unused-vars
        jwt.verify(token, process.env.JWT_SECRET, function (err, _decoded) {
            if (err) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        message: "Token is not valid.",
                    },
                });
            }
            // Valid token send on the request
            next();
        });
    },
};

module.exports = users;
