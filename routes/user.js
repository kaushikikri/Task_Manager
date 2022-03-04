const express = require('express');
const router = express.Router();

//importing both models
const User = require('../models/User');
const Task = require('../models/task');

//fetching data from db
router.get('/', (req, res) => {
    User.find({}).then((result) => {
        res.send(result);
    })
})
//fetching task corresponding to user
router.get('/:userId/task', (req, res) => {
    Task.find({ _userId: req.params.userId }).then((result) => {
        res.send(result);
    })
})
//inserting data to collections
router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });
    user.save().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        })
    console.log(req.body);
})
//inserting task corresponding to user
router.post('/:userId/task', (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        _userId: req.params.userId
    });
    task.save().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        })
    console.log(req.body);
})
//deleting user
router.delete('/:id', (req, res) => {
    User.findOneAndRemove({ _id: req.params.id }).then((removed) => {
        res.send(removed);
    })
    //all tasks corresponding to user must get deleted
    Task.findOneAndRemove({ _userId: req.params.id }).then((removedtask) => {
        console.log(removedtask);
    })
});
//deleting task corresponding to user
router.delete('/:userId/task/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _userid: req.params.userId
    }).then((removed) => {
        res.send(removed);
    })
});
module.exports = router;