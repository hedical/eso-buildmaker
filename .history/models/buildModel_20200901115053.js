const mongoose = require('mongoose')

const buildSchema = new mongoose.Schema({
    // coming from UserContext
    userId: { type: String, require: true },
    // coming from inputs
    title: { type: String, required: true, minlength: 5, maxlength: 30 },
    role: { type: String },
    iclass: { type: String },
    race: { type: String },
    gears: { type: String },
    skills: { type: String },
    stats: { type: String },
    cp: { type: String },
    food: { type: String },
    // coming from calculations
    calcul: { type: String },
    // social media features
    likes: { type: Number },
    comments: { type: String },
},
)

module.exports = Build = mongoose.model("build", buildSchema)