const express = require('express');
const orm = require('./model');
const bodyParser = require('body-parser');
const Router = express.Router();
Router.get('/users', function (req, res) {
    orm.then(function (model) {
        model.user.find({}, function (err, doc) {
            res.json({payload: doc})
        })
    })

})
Router.post('/update', function (req, res) {
    const {id, desc} = req.body;
    orm.then(function (modles) {
        modles.user.get(id, function (err, doc) {
            doc.desc = desc;
            doc.save(function () {
                res.redirect('/' + doc.role.name + '.html')
            });
        })
    })
})
Router.get('/course', function (req, res) {
    orm.then(models => {
        models.course.find({}, function (err, doc) {
            res.json({data: doc})
        })
    })
})
Router.post('/addCourse', function (req, res) {
    const {name} = req.body;
    orm.then(function (modles) {
        modles.course.create({name}, function () {
            res.end();
        })
    })
})
module.exports = Router;