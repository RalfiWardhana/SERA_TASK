const User = require("./model")
const CryptoJS = require("crypto-js")
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
const Sentry = require('./sentry');

dotenv.config()

exports.add = async (req, res) => {
    try {
        if (req.body.password) {
            const hashPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
            req.body.password = hashPassword
        }

        const userAdd = new User(req.body)

        const add = await userAdd.save()
        return res.status(201).json({
            message: "success to add user",
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

exports.login = async (req, res) => {
    try {
        const dataUser = await User.findOne({ email: req.body.email })
        !dataUser && res.status(401).json("Wrong creddentials")

        let originalPassword = CryptoJS.AES.decrypt(dataUser.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json("Wrong creddentials")

        const token = JWT.sign({
            id: dataUser._id,
            isAdmin: dataUser.isAdmin
        },
            process.env.JWT_SEC,
            { expiresIn: "1d" })

        const { password, ...other } = dataUser._doc

        return res.status(200).json({ ...other, token })
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
        let objectSearch = {}

        const email = new RegExp(["^", req.query.email].join(""), "i")
        const username = new RegExp(["^", req.query.username].join(""), "i")
        
        req.query.email ? objectSearch.email = email : null
        req.query.username ? objectSearch.username = username : null

        const listUser = req.query ? await User.find(
            objectSearch,{ password: 0}
         )
         : await User.find({},{password: 0})
 

        return res.status(200).json({
            data: listUser,
            status: 200,
            message: "Success find user"
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