const JWT = require("jsonwebtoken")

exports.verifyJwt = (req, res, next) => {
    let authorization = req.header('Authorization')
    if (authorization) {
        const token = authorization.split(" ")[1]
        JWT.verify(token, process.env.JWT_SEC, function (err, user) {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: "token invalid"
                })
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({
            status: 401,
            message: "not authenticated"
        })
    }
}