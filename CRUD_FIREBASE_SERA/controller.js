const User = require("./config")
const Sentry = require('./sentry');

exports.list = async (req, res) => {
    try {
        const snapshot = await User.get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json({
            data: list,
            status: 200,
            message: "success find users"
        })
       
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
};

exports.getOne = async (req, res) => {
    try {
        let id = req.params.id
        const snapshot = await User.doc(id).get();
        const list = snapshot.data().data
        return res.status(200).json({
            data: list,
            status: 200,
            message: "success find users"
        })
       
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
};


exports.add = async (req, res) => {
    try {
        const data = req.body;
        await User.add({ data });
        return res.status(201).json({
            status: 201,
            message: "success add user"
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
};

exports.update = async (req, res) => {

    try {
        const id = req.params.id;
        let data = {}
        data.username=req.body.username,
        data.age =req.body.age,
        data.address= req.body.address,
        data.profession= req.body.profession
        await User.doc(id).update({data:data});
        return res.status(201).json({
            status: 201,
            message: "success update user"
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await User.doc(id).delete();
        return res.status(200).json({
            status: 200,
            message: "success delete user"
        })
    } catch (err) {
        Sentry.captureException(err)
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }

};