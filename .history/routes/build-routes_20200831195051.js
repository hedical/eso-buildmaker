const router = require("express").Router
const auth = require("../middleware/auth.js")
const Build = require("../models/buildModel")

router.post("/", auth, async (req, res) => {
    try {
        const { title } = req.body;
    } catch (err) {
        res.status(500).json({ error: err.message })
    }



})

module.exports = router