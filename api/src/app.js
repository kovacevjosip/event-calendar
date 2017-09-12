var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var hostname = '127.0.0.1';
var port = '8000';

var app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

var db = require('./db');
app.get('/list', function (req, res) {
    db.query('SELECT * FROM events', function (err, result) {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
});

app.post('/create', function (req, res) {
    var event = req.body;

    var queryData = [event.name, new Date(event.date), event.time, event.color];
    var query = 'INSERT INTO events VALUES (DEFAULT, ?, ?, ?, ?)';

    db.query(query, queryData, function (err, result) {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
});

app.delete('/remove', function (req, res) {
    var id = parseInt(req.query.id, 10);
    var query = 'DELETE FROM events WHERE id=' + id;

    db.query(query, function (err, result) {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
});

module.exports = {
    start: function () {
        // Pokreni server
        http.createServer(app).listen(port, hostname);
        console.log('Server running at http://' + hostname + ':' + port + '/');
    }
};