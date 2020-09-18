const router = require("express").Router();

router.get("/test", (req, res) => {
    res.send("Hello, it is working")
})

module.exports = router