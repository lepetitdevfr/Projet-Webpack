var express    = require('express');     
var app        = express();               
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'blog'
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


app.get('/articles',function (req,res) {

	connection.query('SELECT * FROM articles', function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.json(results);
	});
})

app.post('/articles', function(req, res, next) {
	var params = req.body;
	console.log(params);

	connection.query('INSERT INTO `articles`(`title`, `authors`, `date`, `content`) VALUES ("'+params.title+'","'+params.authors+'","'+params.date+'","'+params.content+'")', function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.json(results);
	});
});

app.post('/sendMail', function(req, res, next) {
	var mailOptions = req.body;
	console.log(mailOptions);
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'YourGmailAddress',
			pass: 'yourPassword'
		}
	});
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
			res.json({code:500,data:error});

		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		res.json({code:200,data:info});
	});

});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);