const router = require('express').Router()
const user = require('./controller')


router.route("/add-user").post(user.add)
router.route("/list-user").get(user.list)
router.route("/get-user/:id").get(user.getOne)
router.route("/update-user/:id").put(user.update)
router.route("/delete-user/:id").delete(user.delete)

module.exports = router