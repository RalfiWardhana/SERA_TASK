const router = require('express').Router()
const vehicle = require('./controller/vehicle')


router.route("/add-vehicle").post(vehicle.add)
router.route("/list-vehicle").get(vehicle.list)
router.route("/list-vehicle/:vehicleId").get(vehicle.vehicleOne)
router.route("/update-vehicle").put(vehicle.update)
router.route("/delete-vehicle").delete(vehicle.delete)
router.route("/vehicle-add-car/:vehicleId").post(vehicle.addCar)
router.route("/vehicle-delete-car/:vehicleId").delete(vehicle.removeCar)
router.route("/vehicle-update-car").put(vehicle.updateCar)

module.exports = router