const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../middleware/auth")
const tokenESO = process.env.ESO_TOKEN

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
    try {

        const sets = await axios.get(
            'https://cors-anywhere.herokuapp.com/https://beast.pathfindermediagroup.com/api/eso/sets',
            {
                headers: {
                    Authorization: 'Bearer ' + "qUlHbeAuOuLLpmEf0f3VsUSm3hSn0f"
                }
            })
        console.log(sets);
        res.json(sets)
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message })
    }
})

module.exports = router