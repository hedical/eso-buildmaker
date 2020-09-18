const mongoose = require('mongoose')

const buildSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: String, require: true },
},
)

module.exports = Build = mongoose.model("build", buildSchema)