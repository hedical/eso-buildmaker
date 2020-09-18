// post, patch and delete

const router = require("express").Router();
const auth = require("../middleware/auth.js")
const Build = require("../models/buildModel")


router.post("/", auth, async (req, res) => {
    try {
        const gearToCreate = { piece, image, weight, trait, glyph, bonus_item_1, bonus_item_2, bonus_item_3, bonus_item_4, bonus_item_5 }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get("/:id", auth, async (req, res) => {

})

router.delete("/:id", auth, async (req, res) => {

})

router.put("/:id", auth, async (req, res) => {

})