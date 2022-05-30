var express = require('express');
var app = express();
var mysql = require("mysql");
var con = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE});

con.connect(function(err){
  if(err){
    console.log('Error conectando a la db: ', err);
    return;
  }
  console.log('Conexion a la db realizada');
  con.query('CREATE TABLE IF NOT EXISTS visits (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, ts BIGINT)',function(err) {
    if(err) throw err;
  });
});

// Manejo de solicitudes
app.get('/', function (req, res) {
  // creacion de tabla en caso que no exista
  con.query('INSERT INTO visits (ts) values (?)', Date.now(),function(err, dbRes) {
    if(err) throw err;
    res.send('Hola mundo! Sos el visitante numero '+dbRes.insertId);
  });
});


// server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Aplicacion de prueba escuchando a http://%s:%s', host, port);
});
