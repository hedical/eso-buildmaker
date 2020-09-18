// post, patch and delete

const router = require("express").Router();
const auth = require("../middleware/auth.js")
const Gear = require('../models/gearModel')
const Build = require("../models/buildModel")


router.post("/", auth, async (req, res) => {

    const build = await Build.findOne({ _id: req.params.build_id })


    try {
        const gearToCreate = { piece, image, weight, trait, glyph, bonus_item_1, bonus_item_2, bonus_item_3, bonus_item_4, bonus_item_5 } = req.body
        if (!piece)
            return res
                .status(400)
                .json({ msg: "You can't save a gear with no piece associated." });

        const newGear = new Gear(gearToCreate)

        // const savedGear = await newGear.save();

        build.gears.push(newGear)
        await build.save()
        res.json(savedGear);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get("/all", auth, async (req, res) => {
    const gears = await Gear.find({});
    res.json(gears)
})

router.delete("/:id", auth, async (req, res) => {
    const gear = await Gear.findOne({ _id: req.params.id })
    if (!gear)
        return res
            .status(400)
            .json({ msg: "No gear found with this ID that belongs to the current user." });
    const deletedBuild = await Gear.findByIdAndDelete(req.params.id)
    res.json(deletedBuild)
})

router.put("/:id", auth, async (req, res) => {
    const gearToUpdate = { piece, image, weight, trait, glyph, bonus_item_1, bonus_item_2, bonus_item_3, bonus_item_4, bonus_item_5 } = req.body
    await Build.updateOne(
        { _id: req.params.build_id, "gears._id": req.params.id },
        { $set: { "gears.$": gearToUpdate } }
    )

    res.json(await Build.findOne({ _id: req.params.build_id }))
})