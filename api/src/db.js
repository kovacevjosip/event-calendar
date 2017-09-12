var mysql = require('mysql');

var connObj = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'event_calendar'
};

// Connect
var connection = mysql.createConnection(connObj);
connection.connect(function (err) {
    if (!err) {
        console.log('Database is connected!');
    } else {
        console.log('Error connecting database: ', err);
    }
});

module.exports = connection;