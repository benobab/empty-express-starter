//Set up, all the tools we need ==============================================================================
var express = require("express");
var app = express();

var path = require("path");
var port = process.env.PORT || '8080';
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressSession = require("express-session");

var UserHandler = require('./handlers/userHandler');
var AuthHandler = require('./handlers/authHandler');
var ActivityHandler = require('./handlers/activityHandler');

var config = require('./config/'+process.env.ENV + '.js');

//Configuration ==============================================================================================
mongoose.connect(config.db.url);

require("./config/passport")(passport); // pass passport for configuration

//To be able to access css for example 
app.use(express.static(path.join(__dirname, 'public')));

//Set up express application

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// get information from html forms
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine','pug'); // set up pug for templating

//Required for passport
app.use(expressSession({secret:config.session.secret,resave: true,
    saveUninitialized: true})); // Session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Put in every response the isAuthenticated OR Not, for the jade template


//Routes =====================================================================================================
app.use(function(req,res,next){
    res.locals.isauthenticated = req.isAuthenticated();
    next();
});
var routes = require("./routes");
var handlers = {
	user: new UserHandler(),
	auth: new AuthHandler(),
	activity: new ActivityHandler()
};
routes.setup(app,handlers);
//Launch =====================================================================================================
app.listen(port,function(){
    console.log("App running on "+ port + " let's start doing some magic");
});