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
<<<<<<< HEAD
		//collection.insert({_id:req.body.username, number:req.body.number, users:[]}, function(error, saved){
				collection.insert({_id:"dong", number:1234, users:[]}, function(error, saved){

			res.send(200);
		});
	});
	
	
});
=======
		collection.insert({username:req.body.username, number:req.body.number, subusers:[]}, function(error, saved){
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


//use this submit2.json post function when you add yourself to an existing portal

app.post('/submit2.json', function(req, res){


	//qeustion!! if i type in url as /submit2.json?username=dong when i use jquery.post function
	//will i be able to get this x value as dong
	//or if this doesnt work, we can just add the portal owner name to the data that we are posting
	//like in data there would be username="portal owner name"	

	var x = req.query.username;
	
	db.collection('portal-information', function(error, collection){
		collection.update({username:x}, { $push: { usbusers: [{name:req.body.name, trip:[]}]}}, function(error, saved){
			res.send(200);
		});
	});
	
	
	
	
});


//adding a trip to under your name
app.post('/addTrip.json', function(req, res){


	db.collection('portal-information', function(error, collection){
		collection.update({username:req.body.username, "subusers.name": {req.body.myname}}, {$push:
						   { "subusers.$.trip": { $each: { Descrip: req.body.des, date:req.body.date, 
					          Price:req.body.price, Miles:req.body.miles}}}}, function(error, saved){
					    		res.send(200);
					           });
		});



});

/*
app.get('/portal', function(req, res){

	name = req.query.username;
	
	res.render('portal.html');
	in portal
	//<body onload = "init()">
	 init(){
			
	$.ajax({
  		type: "get",
  		url:"",
  		data: data,
  		dataType: JSON
	});
	and use data
	
>>>>>>> FETCH_HEAD

}


<<<<<<< HEAD
app.get('/data.json', function(req, res){

	db.collection('portal-information', function(error, collection){
		collection.find().toArray(function(error, docs){
			res.send(JSON.stringify(docs));
		});
	});
	
});
=======
*/


>>>>>>> FETCH_HEAD


