var  mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user : "murmur_db_user",
    password : "mmr",
    database : "murmur_db"
});
connection.on('error', function(err) {
    console.log("[mysql error]",err);
});
connection.connect(function (err){
    if(err) throw err;
    console.log("Coneected !")
});

module.exports = connection;