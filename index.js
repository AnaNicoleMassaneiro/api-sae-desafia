var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : 'root', //mysql database password
  database : 'sae_desafia' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('Conecçt ')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all customers
app.get('/show', function (req, res) {
  connection.query('select * from show', function (error, results, fields) {
console.log('1')
   if (error) throw error;
   res.end(JSON.stringify(results));

   console.log(results)
 });
});
//rest api to get a single customer data
app.get('/show/:id', function (req, res) {
  connection.query('select * from show where Id=?',req.params.id, function (error, results, fields) {
    console.log('2')

   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to create a new customer record into mysql database
app.post('/show', function (req, res) {
  console.log('3')

  var params  = req.body;
  console.log(params);
  connection.query('INSERT INTO show SET ?', params, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to update record into mysql database
app.put('/show', function (req, res) {
  console.log('4')

  connection.query('UPDATE `show` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to delete record from mysql database
app.delete('/show', function (req, res) {
  console.log('5')

  console.log(req.body);
  connection.query('DELETE FROM `show` WHERE `Id`=?', req.body.Id, function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});

// ------------------------------------------------------------

//rest api to get all customers
app.get('/customer', function (req, res) {
   connection.query('select * from customer', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to get a single customer data
app.get('/customer/:id', function (req, res) {
   connection.query('select * from customers where Id=?', req.params.id, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new customer record into mysql database
app.post('/customer', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to update record into mysql database
app.put('/customer', function (req, res) {
   connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/customer', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `customer` WHERE `Id`=?', req.body.Id, function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});



//rest api to delete record from mysql database
app.delete('/show', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `show` WHERE `Id`=?', req.body.Id, function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});

// ------------------------------------------------------------

//rest api to get all customers
app.get('/mutants', function (req, res) {
   connection.query('select * from customer', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to get a single customer data
app.get('/mutants/:id', function (req, res) {
   connection.query('select * from customers where Id=?', req.params.id, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new customer record into mysql database
app.post('/mutants/cadastro', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to update record into mysql database
app.put('/mutants', function (req, res) {
   connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/mutants', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `customer` WHERE `Id`=?', req.body.Id, function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});