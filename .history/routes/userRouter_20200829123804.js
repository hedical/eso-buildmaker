const router = require("express").Router();
const User = require("../models/userModel")

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
        const existingUser = await User.find({ email: email })
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "Account with this email already exists." })
        }
    } catch (err) {
        res
            .status(500)
            .json(err)
    }

})

module.exports = router