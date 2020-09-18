// post, patch and delete

const router = require("express").Router();
const auth = require("../middleware/auth.js")
const Gear = require('../models/gearModel')
const Build = require("../models/buildModel")


router.post("/", auth, async (req, res) => {
    // récupération de l'id du build
    try {
        const gearToCreate = { piece, image, weight, trait, glyph, bonus_item_1, bonus_item_2, bonus_item_3, bonus_item_4, bonus_item_5 } = req.body
        if (!piece)
            return res
                .status(400)
                .json({ msg: "You can't save a gear with no piece associated." });

        const newGear = new Gear(gearToCreate)

        const savedGear = await newGear.save();
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
    const buildToUpdate = await Build.updateOne({ id: req.params.build_id, "gears._id": req.params.id },
        { $set: {} })
    const gear = await Gear.findOne({ _id: req.params.id })
    if (!gear)
        return res
            .status(400)
            .json({ msg: "No build found with this ID that belongs to the current user." });

    let buildToUpdate = { title, role, race, iclass, food, stats } = req.body

    const patchedBuild = await Build.findByIdAndUpdate(req.params.id, buildToUpdate, { new: true })

    res.json(patchedBuild)
})