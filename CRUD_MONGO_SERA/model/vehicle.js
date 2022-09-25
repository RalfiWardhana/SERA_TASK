const moongose = require('mongoose')

const vehicleSchema = new moongose.Schema({
    brand: { type: String, required: true},
    desc: { type: String, required: true},
    car: [
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            size: {
                type:String,
                required:true             
            },
            Cc: {
                type: Number,
                required:true
            },
        }
    ]
}, { timestamps: true })

module.exports = moongose.model( "vehicle", vehicleSchema)