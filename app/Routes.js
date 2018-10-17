let express = require('express');
let taskRouter = express.Router();
let User = require('./User');
let Task = require('./Task');

taskRouter.post('/login', function (req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password) {
        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };
        User.create(userData, function (error, user) {
            if (error) {
                res.sendStatus(500)
            } else {
                console.log(user._id)
                req.session.path = req.headers.origin;
                res.session.userID = user.id;
                res.status(200).send(user.id)
            }
        });
    } else if (req.body.logusername && req.body.logpassword) {
        User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
            if (error || !user) {
                let err = new Error('Wrong email or password.');
                res.status(400).send(err.message)
            } else {
                //res.session.userID = user._id
                console.log(res.session)
                res.status(200).send(user._id)
            }
        });
    } else {
        let err = new Error('All fields required.');
        res.status(400).send(err.message)
    }
});
taskRouter.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200)
            }
        });
    }
});
taskRouter.get('/authenticated', function (req, res, next) {
    console.log(req.session)
    User.findById(req.session.userID)
        .exec(function (error, user) {
            if (error) {
                res.sendStatus(401)
            } else {
                if (user === null) {
                    res.sendStatus(401)
                } else {
                    res.sendStatus(200)
                }
            }
        });
});
taskRouter.post('/task', function (req, res, next) {
    User.verify(req.session.userID, function (result) {
        if (result) {
            taskData = {
                name: req.body.name,
                dueDate: req.body.due,
                priority: req.body.priority,
                done: req.body.finished,
                comment: "",
                finished_at: null,
                updated_at: new Date(),
                created_at: new Date()
            }
            Task.create(taskData, function (error, task) {
                    if (error) {
                        res.stats(500).send(error.message)
                    } else {
                        res.sendStatus(200)
                    }
                }
            )
        } else {
            console.log(req)
            res.sendStatus(401)
        }
    })
});
taskRouter.get('/tasks', function (req, res, next) {

})
module.exports = taskRouter;