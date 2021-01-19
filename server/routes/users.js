let express = require('express');
let router = express.Router();
let db = require('../db');
let bodyParser = require('body-parser');

router.use(bodyParser.json());

// User Login
router.post('/login/', function (req, res, next) {
    let email = (req.body.email).toString();
    let sql = `SELECT * FROM \`users\` WHERE email =\"${email}\"`;
    db.query(sql, function (err, row, fields) {
        console.log(row)
        res.send({row})

    });

});

// User Login
router.post('/signup/', function (req, res, next) {
    let name = (req.body.name).toString();
    let password = (req.body.password).toString();
    let email = (req.body.email).toString();
    let sql = `INSERT INTO \`users\`(\`name\`, \`password\`, \`email\`)
               VALUES (\"${name}\", \"${password}\", \"${email}\")`;

    db.query(sql, function (err, row, fields) {
        console.log(row)
        res.send({row})

    });

});

// Get user
router.post('/profile/', function (req, res, next) {
    let user_id = req.body.user_id;
    let sql = `SELECT users.*, COUNT(DISTINCT flow.id) AS following , COUNT(DISTINCT flowing.id) AS follower FROM users LEFT JOIN followers flow ON flow.user_id=users.id LEFT JOIN followers flowing ON flowing.follower_id = users.id WHERE users.id=${user_id}`;
    db.query(sql, function (err, row, fields) {
        console.log(row)
        res.json(row)
    });
});

// Get follower
router.post('/isfollowing/', function (req, res, next) {
    let user_id = req.body.user_id
    let follower_id = req.body.follower_id
    console.log(user_id, follower_id)
    let sql = `SELECT follower_id FROM followers WHERE user_id=${user_id} AND follower_id = ${follower_id}`;
    db.query(sql, function (err, row, fields) {
        console.log("following  =>  ",row)
        if (row.length > 0) {
            res.send(200)
        } else {
            res.send(404)
        }
    });


});

// Post follower
router.post('/follower/', function (req, res, next) {
    let user_id = req.body.user_id;
    let follower_id = req.body.follower_id;
    let getStatus = `SELECT * FROM followers WHERE user_id = ${user_id} AND follower_id = ${follower_id}`;
    db.query(getStatus, function (err, row, fields) {


        if (row.length === 0) {
            let sql = `INSERT INTO followers (user_id, follower_id) VALUES (${user_id}, ${follower_id})`;
            db.query(sql, function (err, row, fields) {
                res.send(201)
            });

        } else {
            let query_data = `DELETE FROM followers WHERE  user_id=${user_id} AND follower_id=${follower_id}`;
            db.query(query_data, function (err, row, fields) {
                res.send(200)
            });

        }
    });
});


module.exports = router;
