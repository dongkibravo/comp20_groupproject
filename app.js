var express = require('express');
var app = express();
var mongo = require('mongodb');
var name; 
 
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(__dirname +'/public'));
app.listen(process.env.PORT || 3000);


var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/mydb';

var db = mongo.Db.connect(mongoUri, function(err, databaseConnection){
	db = databaseConnection;
});

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/', function(req, res){

	res.render('index.html');
	
});



app.post('/submit.json', function(req, res){


//posting portal information
	db.collection('portal-information', function(error, collection) {
		//collection.insert({_id:req.body.username, number:req.body.number, users:[]}, function(error, saved){
				collection.insert({_id:"dong", number:1234, users:[]}, function(error, saved){

			res.send(200);
		});
	});
	
	
});



app.get('/data.json', function(req, res){

	db.collection('portal-information', function(error, collection){
		collection.find().toArray(function(error, docs){
			res.send(JSON.stringify(docs));
		});
	});
	
});


