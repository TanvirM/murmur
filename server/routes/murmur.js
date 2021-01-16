let express = require('express');
let router = express.Router();
let db = require('../db');
let bodyParser = require('body-parser');

router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: true}));

/* GET users listing. */

function getlikes() {
    let sql = 'SELECT DISTINCT murmurs.*, likes.user_id as likes FROM `murmurs`LEFT JOIN likes ON murmurs.id=likes.murmur_id AND likes.user_id = 1 WHERE murmurs.user_id=1 OR murmurs.user_id IN (SELECT followers.follower_id FROM `followers` WHERE followers.user_id = 1)'
    db.query(sql, function (err, row, fields) {
        console.log(JSON.stringify(row, null, 2));
        return row
    });
}

function getfollower() {
    let sql = 'SELECT followers.follower_id FROM `followers` WHERE followers.user_id = 1'
    db.query(sql, function (err, row, fields) {
        // console.log(JSON.stringify(row, null, 2));
        return row
    });
}

// Get user
router.get('/user/', function (req, res, next) {
    let sql = 'SELECT users.*, COUNT(DISTINCT flow.id) AS following , COUNT(DISTINCT flowing.id) AS follower FROM users LEFT JOIN followers flow ON flow.user_id=users.id LEFT JOIN followers flowing ON flowing.follower_id = users.id WHERE users.id=1';
    db.query(sql, function (err, row, fields) {
        res.json(row)
    });

});

/* GET user timeline listing. */
router.get('/murmurs/', function (req, res, next) {
    let sql = 'SELECT DISTINCT murmurs.*, likes.user_id as wonlikes FROM `murmurs`LEFT JOIN likes ON murmurs.id=likes.murmur_id AND likes.user_id = 1 WHERE murmurs.user_id=1 OR murmurs.user_id IN (SELECT followers.follower_id FROM `followers` WHERE followers.user_id = 1)';
    db.query(sql, function (err, row, fields) {
        console.log(res.json(row))
    });

});

module.exports = router;