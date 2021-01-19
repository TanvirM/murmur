let express = require('express');
let router = express.Router();
let db = require('../db');
let bodyParser = require('body-parser');

router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: true}));


// Get user
// router.get('/user/', function (req, res, next) {
//     let sql = 'SELECT users.*, COUNT(DISTINCT flow.id) AS following , COUNT(DISTINCT flowing.id) AS follower FROM users LEFT JOIN followers flow ON flow.user_id=users.id LEFT JOIN followers flowing ON flowing.follower_id = users.id WHERE users.id=1';
//     db.query(sql, function (err, row, fields) {
//         res.json(row)
//     });
//
// });

/* GET user timeline listing. */
router.post('/murmurs/', function (req, res, next) {
    let user_id = req.body.user_id
    let sql = `SELECT murmurs.*, users.name as name, likes.user_id as wonlikes FROM murmurs LEFT JOIN users ON murmurs.user_id = users.id LEFT JOIN likes ON murmurs.user_id = likes.user_id AND murmurs.id=likes.murmur_id WHERE murmurs.user_id = 7 OR murmurs.user_id IN (SELECT follower_id FROM followers WHERE followers.user_id = ${user_id}) ORDER BY created_at DESC`;
    db.query(sql, function (err, row, fields) {
        res.json(row)
    });
});

// Like api
router.post('/murmur/like/', function (req, res, next) {
    let userId = req.body.user_id;
    let murmurId = req.body.murmur_id;

    let getStatus = `SELECT * FROM likes WHERE likes.user_id = ${userId} AND likes.murmur_id = ${murmurId};`;
    db.query(getStatus, function (err, row, fields) {

        if (row.length === 0) {
            let sql = `INSERT INTO likes (user_id, murmur_id) VALUES (${userId}, ${murmurId});`;
            db.query(sql, function (err, row, fields) {
                res.send(201)
            });
        } else {
            let query_data = `DELETE FROM likes WHERE  user_id=${userId} AND murmur_id=${murmurId};`;
            db.query(query_data, function (err, row, fields) {
                res.send(200)
            });
        }
    });
});

// Delete api
router.post('/murmur/delete/', function (req, res, next) {
    let userId = req.body.user_id;
    let murmurId = req.body.murmur_id;
    let query_data = `DELETE FROM murmurs WHERE  user_id=${userId} AND murmur_id=${murmurId};`;
    db.query(query_data, function (err, row, fields) {
    });
    res.end("Deleted")
});

// Create Post
router.post('/murmur/create/', function (req, res, next) {
    let userId = req.body.user_id;
    let post_data = (req.body.post_data.post_data);
    // let post_data = (req.body.post_data);
    console.log(userId, post_data)
    let query_data = `INSERT INTO murmurs(user_id, post_text) VALUES (${userId}, \'${post_data}\');`;
    let get_data = 'select * from murmurs WHERE id = last_insert_id()'
    db.query(query_data, function (err, row, fields) {
        if(!err){
            db.query(get_data, function (err, row, fields) {
                res.json(row)
            });
        }
    });
});


module.exports = router;

