const router = require("express").Router();
const auth = require("../middleware/auth.js")
const Build = require("../models/buildModel")

router.post("/", auth, async (req, res) => {
    try {
        const { title, role, race, iclass, gears, skills, stats, c_points, calculs, likes, comments } = req.body;
        if (!title)
            return res
                .status(400)
                .json({ msg: "You need to input a title to be able to save your build." });

        const newBuild = new Build({
            title,
            role,
            race,
            iclass,
            userId: req.user,
            gears,
            skills,
            stats,
            c_points,
            calculs,
            likes,
            comments,


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

router.patch("/:id", auth, async (req, res) => {
    const build = await Build.findOne({ userId: req.user, _id: req.params.id })
    if (!build)
        return res
            .status(400)
            .json({ msg: "No build found with this ID that belongs to the current user." });
    const patchedBuild = await Build.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        role: req.body.role,
        race: req.body.race,
        iclass: req.body.iclass,
        gears,
        stats,
    })

    res.json(patchedBuild)
    // res.send("Successfully updated")
});


module.exports = router