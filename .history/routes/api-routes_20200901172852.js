const express = require("express");
const router = express.Router();
const { getSets, getSkills } = require('../api/esoAPI')

router.get("/api/sets", (req, res) => {
    getSets()
        .then((allSets) => res.json({ allSets }))
        .catch((err) => res.send(err));
})

router.get("/api/skills", (req, res) => {
    getSets()
        .then((allSkills) => res.json({ allSkills }))
        .catch((err) => res.send(err));
})