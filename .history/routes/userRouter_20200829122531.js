const router = require("express").Router();

router.post("/register", async (req, res) => {
    const { email, password, passwodCheck, username } = req.body

    // validation
    if (!email || !password || !passwodCheck)

})

module.exports = router