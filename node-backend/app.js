/**
 * Module dependencies.
 */

var express = require('express')
	, user = require('./routes/user')
	, localLogins = require("./logins")
	, http = require('http')
	, path = require('path')
	, cors = require('cors')
	, util = require('util')
	, passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
;

var app = express();

passport.use(new LocalStrategy(function(businessIdAndUsername, password, done) {
	var usernameBits = businessIdAndUsername.split("/");
	localLogins.findOne(usernameBits[0], usernameBits[1], function(err, user) {
		
		if (err) { return done(err); }
		
		if (!user) {
			return done(null, false, {message : 'Incorrect username.'});
		}
		
		if (!user.user.password === password) {
			return done(null, false, {message : 'Incorrect password.'});
		}
		
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	util.log("here in serialise");
	done(null, user.businessId + "/" + user.user.email);
});

passport.deserializeUser(function(businessIdAndUsername, done) {
	util.log("here in deserialise: " + businessIdAndUsername);
	var usernameBits = businessIdAndUsername.split("/");
	localLogins.findOne(usernameBits[0], usernameBits[1], function(err, user) {
		done(err, user);
	});
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser() );
app.use(express.session({secret: 'keyboard cat', cookie : {
    path : '/',
    httpOnly : false,
    maxAge : null
  }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({"origin": "http://localhost:8080","credentials": true})); // automatically supports pre-flighting
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.post('/api/login', passport.authenticate('local'), user.get);

app.get('/api/user', ensureAuthenticated, user.get);

app.get('/api/logout', ensureAuthenticated, function(req, res){
	  req.logout();
	  res.send("ok");
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
	util.log("Checking session....");
	if (req.isAuthenticated()) { return next(); }
	res.status(401).send("Unauthorized");
}
