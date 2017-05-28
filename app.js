var Twig = require("twig")
var bodyParser = require('body-parser')
var express = require('express')
var session = require('express-session');
var app = express()

//app.use(flash())

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'twig');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set("twig options", {
    strict_variables: false,
	debug: false
});


app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

//app.use(flash())
				  
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})

require('./routes/articles')(app)
require('./routes/users')(app)