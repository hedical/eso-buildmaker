const router = require("express").Router();

router.post("/register", async (req, res) => {
    const { email, password, passwordCheck, username } = req.body

    // validation
    if (!email || !password || !passwordCheck)
        return res
            .status(400)
            .json({ msg: "Not all fields have been entered" })
    if (password.length < 5) {
        return res
            .status(400)
            .json({ msg: "Password needs to be at least 5 characters long" })
    }

})

module.exports = router