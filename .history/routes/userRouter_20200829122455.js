const router = require("express").Router();

router.post("/register", async (req, res) => {
    const { email, password, passwodCheck, username } = req.body
})

module.exports = router