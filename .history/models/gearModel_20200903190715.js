const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gearSchema = new Schema({
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

module.exports = Gear = mongoose.model("gear", gearSchema)