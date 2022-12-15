const userService = require('../services/userService');


//user register
exports.addNewUser = async (req, res) => {
    await userService.register(req.body).then((result) => {
        res.json({ "status": "success", "token": result, "message": "new user register successfully" });
    }).catch((err) => {
        res.json({ "status": "failed", "message": err });
    });
};
//user log-in
exports.userLogin = async (req, res) => {
    await userService.login(req).then((result) => {
        res.json({ "status": "success", "user": result.name, "message": "user log-in successfully " });
    }).catch(err => {
        res.json({ "status": "failed", "user": err, "message": "please provide valid email and password " });

    });
};
//user update
exports.updateUser = async (req, res) => {
    await userService.update(req.body).then((result) => {
        res.json({ "status": "success", "user": result.name, "message": "user update successfully " });
    }).catch(err => {
        res.json({ "status": "failed", "user": err, "message": "user email not found" });

    })
};
// get all users 
exports.getUsers = async (req, res) => {
    await userService.allUsers().then((result) => {
        res.json({ "status": "success", "users": result });
    }).catch(err => {
        res.json({ "status": "failed", "users": err });
    });
};