const mongoose = require('mongoose')

const buildSchema = new mongooose.Schema({
    title: { type: String, required: true },
    userId: { type: String, require: true }
})