const router = require("express").Router();
const auth = require("../middleware/auth.js")
const Build = require("../models/buildModel")

router.post("/", auth, async (req, res) => {
    try {
        const { title } = req.body;
        if (!title)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." });

        const newBuild = new Build({
            title,
            userId: req.user
        })


        const savedBuild = await newBuild.save();
        res.json(savedBuild);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }



})


router.get("/all", auth, async (req, res) => {
    const builds = await Build.find({ userId: req.user })
})

module.exports = router