require('dotenv').config();
var express = require('express');
var app = express();
var geocoder = require('geocoder');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
var port = process.env.PORT || 1000;

app.get('/', function(req, res) {
	console.log('GET - /');
	db.place.findAll().then(function(data) {
		res.render('index', {places: data});
	});
});

app.post('/', function(req, res) {
	db.place.create({
		name: req.body.name,
		address: req.body.address
	}).then(function(data) {
		res.redirect('/');
	});
});

app.get('/new', function(req, res) {
	console.log('get - /new');
	res.render('new');
});

app.listen(port, function() {
	console.log('Working on Port ' + port);
});