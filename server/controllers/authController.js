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
        const {email, password, repeatPassword} = req.body;
        try {
            const role = 'user';
            if (password === repeatPassword) {
                bcrypt.hash(password, saltRounds, async function(err, hash) {
                    if (err) console.error(err, "error");
                    const user = new User({
                        email: email,
                        password: hash,
                        role: role
                    })
                    user.save();
                    const jwtToken = createJwt(email, role);
                    await createCookie(res, jwtToken);
                    res.status(201).json({message: "Registered successfully", user: user});
                });
            } else {
                res.status(400).json({message: "Please check your signup"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: "Internal server error", error: error});
        }
    })
};

module.exports = authController;