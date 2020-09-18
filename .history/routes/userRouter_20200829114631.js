const router = require("express").Router();

routuer.get("/test", (req, res) => {
    res.send("Hello, it is working")
})

module.exports = router