const router = require("express").Router();
const User = require("../models/userModel")
const auth = require("../middleware/auth")
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

        // Validation for email in database
        const user = await User.findOne({ email: email })

        if (!user) {
            return res
                .status(400)
                .json({ msg: "No user with this email was found." })
        }

        // Validation for password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password) // Boolean : first argument is what we pass into bcrypt, second is what we compare it to

        if (!isMatch) {
            return res
                .status(400)
                .json({ msg: "Invalid credentials." })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },

        })

    } catch (err) {
        res
            .status(500)
            .json({ error: error.message })
    }
})

router.delete("/delete", auth, async (req, res) => {

    try {
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)

    } catch (err) {
        res
            .status(500)
            .json({ error: error.message })
    }

})

router.post("/tokenIsValid", async (req, res) => {

    try {
        let token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false)

        return res.json(true)

    } catch (error) {
        res
            .status(500)
            .json({ error: error.message })
    }

})

// route used for the provider
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id
    });
})

module.exports = router