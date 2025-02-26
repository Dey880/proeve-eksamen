const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const createJwt = require("../utils/createJwt.js");
const createCookie = require("../utils/createCookie.js");

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const authController = {
    login:(async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await User.findOne({email: email});
            if (!user) {
                return res.status(404).send({ msg: "User not found" });
            }
            const role = "user";
            let hashedPassword = user.password;
            const isPassword = await bcrypt.compare(password, hashedPassword);
            if (isPassword) {
                const jwtToken = createJwt(email, role);
                createCookie(res, jwtToken);
                res.status(202).send({ msg: "User found!", user: user });
            } else {
                res.status(404).send({ msg: "User not found" });
            }

        } catch (error) {
            console.error(error);
        }
    }),
    register:((req, res) => {
        const {name, email, password, repeatPassword, language, phone} = req.body;
        try {
            const role = 'user';
            if (password === repeatPassword) {
                bcrypt.hash(password, saltRounds, async function(err, hash) {
                    if (err) console.error(err, "error");
                    const user = new User({
                        name: name,
                        role: role,
                        email: email,
                        password: hash,
                        language: language,
                        phone: phone,
                    })
                    user.save();
                    const jwtToken = createJwt(email, role);
                    await createCookie(res, jwtToken);
                    res.status(201).send({message: "Registered successfully", user: user});
                });
            } else {
                res.status(400).send({message: "Please check your signup"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: "Internal server error", error: error});
        }
    }),
    logout: ((req, res) => {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0)
        });
        res.status(200).json({ message: "Logged out" });
    }),
    getUser: (async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (user) {
                res.status(200).send({ msg: "User found", user: user });
            } else {
                res.status(404).send({ msg: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),
    user: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ msg: "Unauthorized, please log in" });
            }
    
            const email = req.user.email;
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
    
            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Bad Request", error });
        }
    }
};

module.exports = authController;