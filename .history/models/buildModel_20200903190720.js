const mongoose = require('mongoose')
const Gear = require('./gearModel')
const Schema = mongoose.Schema

const skill = new Schema({
    name: { type: String },
    image: { type: String },
    effect: { type: String },
})

const stat = new Schema({
    magicka: { type: Number, max: 64 },
    health: { type: Number, max: 64 },
    stamina: { type: Number, max: 64 },
    _id: false
})

const c_point = new Schema({
    constellation: { type: String },
    name: { type: String },
    point: { type: Number },
})

const calcul = new Schema({
    // TODO
    magicka_occurrence: { type: Number }, // Maximum Magicka
    health_occurence: { type: Number }, // Maximum Health, Healing taken, Health
    stamina_occurence: { type: Number }, // Maximum Stamina
    weapon_damage_occurence: { type: Number }, // Weapon Damage
    spell_damage_occurence: { type: Number }, // Spell Damage
    stam_reco_occurence: { type: Number }, // Stamina Recovery
    mag_reco_occurence: { type: Number }, // Magicka Recovery
    health_reco_occurence: { type: Number }, // Health Recovery
    // No TODO
    armor_occurence: { type: Number }, // Resistance
    spell_critical_occurence: { type: Number }, // Spell Critical
    weapon_critical_occurence: { type: Number }, // Weapon Critical
    buff_occurence: { type: Number }, // Expedition, Lifesteal, Courage, Empower, Berserk, Slayer, Protection, Evasion, Mending, Heroism, Vitality, Aegis, Speed ....
    group_occurence: { type: Number }, // group, allies
    pve_occurence: { type: Number }, // Dungeon
    pvp_occurence: { type: Number }, // Players
    light_pieces: { type: Number }, // based on gears
    medium_pieces: { type: Number }, // based on gears
    heavy_pieces: { type: Number }, // based on gears
    traits: { type: String } // based on gears
})

const buildSchema = new Schema({
    // coming from UserContext
    userId: { type: String, require: true },
    // coming from inputs
    title: { type: String, required: true, minlength: 5, maxlength: 30 },
    role: { type: String },
    iclass: { type: String },
    race: { type: String },
    food: { type: String },
    gears: [gear],
    skills: [skill],
    stats: stat,
    c_points: [c_point],
    // coming from calculations
    calculs: [calcul],
    // social media features
    likes: { type: Number },
    comments: { type: String },
},
)

module.exports = Build = mongoose.model("build", buildSchema)

