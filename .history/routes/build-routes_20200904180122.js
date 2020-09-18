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


// UPDATE A GEAR - GEARS IS INITIALY AN EMPTY ARRAY
router.patch("/:id/:gearId", auth, async (req, res) => {
    const build = await Build.findOne({ userId: req.user, _id: req.params.id })

    const completeGearList = build.gears



    if (!_id) {
        // completeGearList.push(req.body)
        console.log(completeGearList);
        console.log(req.body);
    } else {
        for (i in completeGearList) {

            if (completeGearList[i]._id == req.params.gearId) {
                let gearToUpdate = completeGearList[i]

                gearToUpdate.trait = req.body.trait
                gearToUpdate.piece = req.body.piece
                gearToUpdate.set = req.body.set
                gearToUpdate.image = req.body.image
                gearToUpdate.weight = req.body.weight
                gearToUpdate.trait = req.body.trait
                gearToUpdate.glyph = req.body.glyph
                gearToUpdate.bonus_item_1 = req.body.bonus_item_1
                gearToUpdate.bonus_item_2 = req.body.bonus_item_2
                gearToUpdate.bonus_item_3 = req.body.bonus_item_3
                gearToUpdate.bonus_item_4 = req.body.bonus_item_4
                gearToUpdate.bonus_item_5 = req.body.bonus_item_5

                console.log(gearToUpdate);
            }
        }
    }





    const patchedGears = await build.save({ new: true })


    res.json(patchedGears)
});


module.exports = router


