const express = require('express')
const app = express()
const router = require("./router")
const PORT = 5000
const User = require("./config")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)

app.use(function(req, res, next){
    res.status(404).send("Page Not Found")
  });

app.listen(PORT,()=>{
    console.log(`API RUN in PORT : ${PORT}`)
})