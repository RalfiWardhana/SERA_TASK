const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./router')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB Connected')
    })
    .catch((err) => {
        console.log(err)
    })

app.get("/", function (req, res, next) {
    res.status(200).json({
        message: "success connect API"
    })
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(function (req, res, next) {
    res.status(404).send("Page Not Found")
});

app.listen(process.env.PORT, () => {
    console.log(`we are connected server at port : ${process.env.PORT}`)
})