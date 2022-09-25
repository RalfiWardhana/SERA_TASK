const router = require('express').Router()
const data = require('./controller')
const verifyJWT = require("./auth")

router.route("/register").post(data.add)
router.route("/login").post(data.login)
router.route("/get-data").get(verifyJWT.verifyJwt,data.list)


module.exports = router