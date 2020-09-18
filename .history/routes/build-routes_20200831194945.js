const router = require("express").Router
const auth = require("../middleware/auth.js")
const Build = require("../models/buildModel")

router.post("/", auth, async (req, res) => {

})

module.exports = router