const router = require("express").Router();

router.post("/register", async (req, res) => {
    const { email, password, passwodCheck, username } = req.body

    // validation
    if (!email || !password || !passwodCheck)
        return res.status(400).json(msg: "Not all fields have been entered")

})

module.exports = router