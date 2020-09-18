const router = require("express").Router();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, username } = req.body

        // Validation for empty fields
        if (!email || !password || !passwordCheck || !username)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })

        // Validation for password lenght
        if (password.length < 5) {
            return res
                .status(400)
                .json({ msg: "Password needs to be at least 5 characters long." })
        }

        // Validation for passwordCheck
        if (password != passwordCheck) {
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." })
        }

        // Validation for existing user
        const existingUser = await User.findOne({ email: email })
        const existingUsername = await User.findOne({ username: username })
        if (existingUser || existingUsername) {
            return res
                .status(400)
                .json({ msg: "Account with this email already exists." })
        }

        // Password protection
        // Create a random thing called 'salt' that will be applied to the passwords
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // User creation
        const newUser = new User({
            email,
            password: passwordHash,
            username
        })


        // Save user to db
        const savedUser = await newUser.save()
        res.json(savedUser)

    } catch (err) {
        res
            .status(500)
            .json({ error: error.message })
    }

})


// LOGIN ROUTE
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation for empty fields
        if (!email || !password)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })


        const user = await User.findOne({ email: email })

        if (!user) {
            return res
                .status(400)
                .json({ msg: "No user with this email was found." })
        }

        const isMatch = await bcrypt.compare(password, user.password) // Boolean : first argument is what we pass into bcrypt, second is what we compare it to

        if (!isMatch) {
            return res
                .status(400)
                .json({ msg: "Invalid credentials." })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
    } catch (err) {
        res
            .status(500)
            .json({ error: error.message })
    }
})


module.exports = router