const express = require("express");
const router = express.Router();
const { getSets, getSkills } = require('../api/esoAPI')
const auth = require("../middleware/auth")

router.get("/sets", auth, async (req, res) => {

    const sets = await Build.find({ userId: req.user });
    await getSets()
        .then((allSets) => res.json({ allSets }))
        .catch((err) => res.send(err));
})

router.get("/skills", auth, async (req, res) => {
    await getSets()
        .then((allSkills) => res.json({ allSkills }))
        .catch((err) => res.send(err));
})

const sets = axios.get('https://cors-anywhere.herokuapp.com/https://beast.pathfindermediagroup.com/api/eso/sets', {
    headers: {
        Authorization: 'Bearer ' + token
    }
})

function getSets() {

    axios.get('https://cors-anywhere.herokuapp.com/https://beast.pathfindermediagroup.com/api/eso/sets', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((res) => {
        allSets.push(...res.data)
        console.log(allSets);
    }).catch((err) => reject(err))
}