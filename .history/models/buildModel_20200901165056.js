const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gear = new Schema({
    piece: { type: String },
    image: { type: String },
    weight: { type: String },
    trait: { type: String },
    glyph: { type: String },
    bonus_item_1: { type: String },
    bonus_item_2: { type: String },
    bonus_item_3: { type: String },
    bonus_item_4: { type: String },
    bonus_item_5: { type: String }
})

const skill = new Schema({
    name: { type: String },
    image: { type: String },
    effect: { type: String },
})

const stat = new Schema({
    magicka: { type: Number },
    health: { type: Number },
    stamina: { type: Number },
})

const c_point = new Schema({
    category: { type: String },
    name: { type: String },
    point: { type: Number },
})

const calcul = new Schema({
    magicka_occurrence: { type: Number },
    health_occurence: { type: Number },
    stamina_occurence: { type: Number },
    weapon_damage_occurence: { type: Number },
    spell_damage_occurence: { type: Number },
    stam_reco_occurence: { type: Number },
    mag_reco_occurence: { type: Number },
    health_reco_occurence: { type: Number },
    armor_occurence: { type: Number },
    spell_critical_occurence: { type: Number },
    weapon_critical_occurence: { type: Number }
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
    stats: [stat],
    c_points: [c_point],
    // coming from calculations
    calculs: { type: String },
    // social media features
    likes: { type: Number },
    comments: { type: String },
},
)

module.exports = Build = mongoose.model("build", buildSchema)