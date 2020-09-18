const express = require("express");
const router = express.Router();
const { getSets, getSkills } = require('../api/esoAPI')
const auth = require("../middleware/auth")
const token = process.env.ESO_TOKEN

// router.get("/sets", auth, async (req, res) => {
//     await getSets()
//         .then((allSets) => res.json({ allSets }))
//         .catch((err) => res.send(err));
// })

// router.get("/skills", auth, async (req, res) => {
//     await getSets()
//         .then((allSkills) => res.json({ allSkills }))
//         .catch((err) => res.send(err));
// })


router.get("/sets", auth, async (req, res) => {
    const sets = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://beast.pathfindermediagroup.com/api/eso/sets',
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    res.json(sets)
})
