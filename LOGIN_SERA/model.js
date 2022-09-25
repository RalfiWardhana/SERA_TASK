const moongose = require('mongoose')

const userSchema = new moongose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String},
}, { timestamps: true })

module.exports = moongose.model("user",userSchema)