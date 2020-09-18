const express = require("express");
const router = express.Router();
const { getSets } = require('../api/esoAPI')

router.get("/api/sets", (req, res) => {
    getSets()
        .then((allSets) => res.json({ allSets }))
        .catch((err) => res.send(err));
})