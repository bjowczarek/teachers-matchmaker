'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('./utils/logger');
var get = require('./api/get');
var upload = require('./api/upload');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('json spaces', 2);

var port = 8530;
var router = express.Router();

router.post('/uploadNewSet', function (req, res) {
    upload.uploadNewSet(req, res);
});
router.get('/getTeachers', function (req, res) {
    get.getTeachers(req, res);
});
app.use('/tsm', router);
app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
});
app.listen(port);
console.log('Server started to listen on: ' + port);

