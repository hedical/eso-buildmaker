const router = require("express").Router();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res) => {
    try {
        const { email, password, passwordCheck, username } = req.body

        // validation
        if (!email || !password || !passwordCheck)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })
        if (password.length < 5) {
            return res
                .status(400)
                .json({ msg: "Password needs to be at least 5 characters long." })
        }
        if (password != passwordCheck) {
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." })
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "Account with this email already exists." })
        }
        // Create a random thing called salt that will be applied to the passwords
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            username
        })

    } catch (err) {
        res
            .status(500)
            .json(err)
    }

})

module.exports = router