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
            userId: req.user,
            role: req.body
        })

        const savedBuild = await newBuild.save();
        res.json(savedBuild);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.get("/all", auth, async (req, res) => {
    const builds = await Build.find({ userId: req.user });
    res.json(builds)
})

router.delete("/:id", auth, async (req, res) => {
    const build = await Build.findOne({ userId: req.user, _id: req.params.id })
    if (!build)
        return res
            .status(400)
            .json({ msg: "No build found with this ID that belongs to the current user." });
    const deletedBuild = await Build.findByIdAndDelete(req.params.id)
    res.json(deletedBuild)
});


module.exports = router