const express = require("express");
const router = express.Router();
const { getSets, getSkills } = require('../api/esoAPI')
const auth = require("../middleware/auth")

router.get("/sets", auth, async (req, res) => {
    await getSets()
        .then((allSets) => res.json({ allSets }))
        .catch((err) => res.send(err));
})

router.get("/skills", auth, async (req, res) => {
    await getSets()
        .then((allSkills) => res.json({ allSkills }))
        .catch((err) => res.send(err));
})