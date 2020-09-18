const router = require("express").Router();
const auth = require("../middleware/auth.js")
const Build = require("../models/buildModel")

// OPERATIONAL

router.post("/", auth, async (req, res) => {

    try {
        const buildToCreate = { title, role, race, iclass, gears, skills, stats, c_points, calculs, likes, comments } = req.body;
        if (!title)
            return res
                .status(400)
                .json({ msg: "You need to input a title to be able to save your build." });

        const newBuild = new Build(buildToCreate)

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

    let buildToUpdate = { title, role, race, iclass, food, stats } = req.body

    const patchedBuild = await Build.findByIdAndUpdate(req.params.id, buildToUpdate, { new: true })

    res.json(patchedBuild)
});

router.patch("/:id/:gearId", auth, async (req, res) => {
    const build = await Build.findOne({ userId: req.user, _id: req.params.id })

    const completeGearList = build.gears

    console.log(completeGearList);


    for (i in completeGearList) {
        // console.log(completeGearList[i]);
        if (completeGearList[i]._id == req.params.gearId) {
            let gearToUpdate = completeGearList[i]
            gearToUpdate.trait.push({
                // piece: req.body.piece,
                // set: req.body.set,
                // image: req.body.image,
                // weight: req.body.weight,
                trait: req.body.trait,
                // glyph: req.body.glyph,
                // bonus_item_1: req.body.bonus_item_1,
                // bonus_item_2: req.body.bonus_item_2,
                // bonus_item_3: req.body.bonus_item_3,
                // bonus_item_4: req.body.bonus_item_4,
                // bonus_item_5: req.body.bonus_item_5
            })
        }
    }



    const patchedGears = await build.set({ new: true })


    res.json(patchedGears)
});


module.exports = router


