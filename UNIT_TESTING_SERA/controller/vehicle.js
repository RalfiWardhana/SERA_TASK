const Vehicle = require("../db/models/vehicle").Vehicle
const moongose = require('mongoose')
const dotenv = require('dotenv')
const Joi = require("joi")
const Sentry = require('../sentry');
dotenv.config()

exports.add = async (req, res, next) => {
    try {

        let schemaFillTheCar = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            size: Joi.string().required(),
            Cc: Joi.number().required()
        })

        const schema = Joi.object({
            brand: Joi.string().required(),
            desc: Joi.string().required(),
            car: Joi.array().items(schemaFillTheCar)
        })

        let { error } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message
            })
        }

        let obj = {}
        obj.brand = req.body.brand
        obj.desc = req.body.desc

        let car = []

        req.body.car.map((list, index) => {

            let objCar = {}
            objCar.name = list.name,
                objCar.price = list.price,
                objCar.size = list.size,
                objCar.Cc = list.Cc

            car.push(objCar)
        })
        let result = { ...obj, car: car }

        const VehicleAdd = new Vehicle(result)

        const add = await VehicleAdd.save()
        return res.status(201).json({
            add: add,
            message: "success to add Vehicle",
            status: 201
        })

    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}

exports.list = async (req, res, next) => {
    try {
        let ObjectSearch = {}

        const brand = new RegExp(["^", req.query.brand].join(""), "i")
        const car = new RegExp(["^", req.query.car].join(""), "i")

        req.query.brand ? ObjectSearch.brand = brand : null
        if (req.query.car) {
            ObjectSearch = { ...ObjectSearch, "car.name": car }
        }

        const vehicle = req.query ? await Vehicle.find(ObjectSearch) : await Vehicle.find()
        return res.status(200).json({
            data: vehicle,
            status: 200,
            message: "success find vehicles"
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}

exports.vehicleOne = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        return res.status(200).json({
            data: vehicle,
            status: 200,
            message: "success find vehicle"
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}

exports.update = async (req, res, next) => {
    try {

        let schemaFillTheCar = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            size: Joi.string().required(),
            Cc: Joi.number().required()
        })

        const schema = Joi.object({
            id: Joi.string().required(),
            brand: Joi.string().required(),
            desc: Joi.string().required(),
            car: Joi.array().items(schemaFillTheCar)
        })

        let { error } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message
            })
        }

        let obj = {}
        obj.brand = req.body.brand
        obj.desc = req.body.desc

        let car = []

        req.body.car.map((list, index) => {

            let objCar = {}
            objCar.name = list.name,
                objCar.price = list.price,
                objCar.size = list.size,
                objCar.Cc = list.Cc

            car.push(objCar)
        })
        let result = { ...obj, car: car }

        const update = await Vehicle.findByIdAndUpdate(req.body.id, {
            $set: result
        })
        return res.status(200).json({
            status: 200,
            message: 'success update vehicle'
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const deleteData = await Vehicle.findByIdAndDelete(req.body.id)
        return res.status(200).json({
            status: 200,
            message: "success delete data"
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}

exports.addCar = async (req, res, next) => {
    try {
        let schemaFillTheCar = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            size: Joi.string().required(),
            Cc: Joi.number().required()
        })

        const schema = Joi.object({
            car: Joi.array().items(schemaFillTheCar)
        })

        let { error } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message
            })
        }
        const addCar = await Vehicle.updateOne({ _id: req.params.id }, {
            $push: {
                car: {
                    name: req.body.car[0].name,
                    price: req.body.car[0].price,
                    size: req.body.car[0].size,
                    Cc: req.body.car[0].Cc
                }
            }
        })
        return res.status(201).json({
            message: "success to add Car",
            status: 201
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}

exports.removeCar = async (req, res, next) => {
    try {
        const removeCar = await Vehicle.updateOne({
            '_id': req.params.id
        }, {
            $pull: { "car": { "_id": new moongose.Types.ObjectId(req.body.carId) } }
        }
        )
        return res.status(201).json({
            message: "success to remove Car",
            status: 201
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}

exports.updateCar = async (req, res, next) => {
    try {
        const updateCategory = await Vehicle.updateOne({
            car: {
                $elemMatch: {
                    _id: req.body.car[0]._id
                }
            }
        }, {
            $set: {
                "car.$": {
                    name: req.body.car[0].name,
                    price: req.body.car[0].price,
                    size: req.body.car[0].size,
                    Cc: req.body.car[0].Cc
                }
            }
        }
        )
        return res.status(201).json({
            message: "success to update Car",
            status: 201
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}
